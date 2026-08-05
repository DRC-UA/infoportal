import {useCallback, useEffect, useMemo, useState, type FC} from 'react'
import {Paper, Table, TableContainer, useTheme} from '@mui/material'
import {isBefore, isAfter, isWithinInterval} from 'date-fns'

import {DrcProject, KoboIndex} from 'infoportal-common'

import {useKoboAnswersContext} from '@/core/context/KoboAnswersContext'
import {useI18n} from '@/core/i18n'
import {Page, DebouncedInput} from '@/shared'
import {DataFilterLayout} from '@/shared/DataFilter/DataFilterLayout'
import {DataFilter} from '@/shared/DataFilter/DataFilter'
import {PeriodPicker} from '@/shared/PeriodPicker/PeriodPicker'

import {EchoTableBody, EchoTableHead} from './components'
import {gbvWgssPdmMapper, isUndefined, prepareTableData} from './tools'
import type {EchoPmKoiTableData, EchoPmKoiRecord, DateRange} from './types'

const EchoPmKoi: FC = () => {
  const [loading, setLoading] = useState(true)
  const {m} = useI18n()
  const [mappedData, setMappedData] = useState<EchoPmKoiRecord[]>()
  const [tableBodyData, setTableBodyData] = useState<EchoPmKoiTableData['body']>()
  const [sampleSizes, setSampleSizes] = useState<EchoPmKoiTableData['sampleSizes']>()
  const [filters, setFilters] = useState<Record<string, string[] | undefined>>({
    project: [],
    source: [],
  })
  const [periodFilter, setPeriodFilter] = useState<DateRange>([undefined, undefined])
  const {byName} = useKoboAnswersContext()
  const stopLoadingIndication = () => setLoading(false)
  const theme = useTheme()
  const applyFilters = useCallback(
    (rawData: EchoPmKoiRecord[]) => {
      if (Object.values(filters).every((filter) => filter?.length === 0) && periodFilter.every(isUndefined)) {
        // filters unset
        return rawData
      }

      return rawData
        .filter(({date}) => {
          const [start, end] = periodFilter

          if (periodFilter.every(isUndefined)) return true

          if (!date) return false

          if (!end) return isAfter(date, start!)

          if (!start) return isBefore(date, end!)

          return isWithinInterval(date, {start, end})
        })
        .filter(({project}) => {
          if (filters.project === undefined || filters.project.length === 0) return true

          return project !== undefined && filters.project.includes(project)
        })
        .filter(({source}) => {
          if (filters.source === undefined || filters.source.length === 0) return true

          return source !== undefined && filters.source?.includes(source)
        })
    },
    [periodFilter, filters],
  )

  const filterShape = useMemo(() => {
    return DataFilter.makeShape<EchoPmKoiRecord>({
      project: {
        icon: 'business',
        label: m.project,
        getValue: ({project}) => project,
        getOptions: () =>
          DataFilter.buildOptions([
            DrcProject['UKR-000269 ECHO1'],
            DrcProject['UKR-000322 ECHO2'],
            DrcProject['UKR-000371 ECHO3'],
            DrcProject['UKR-000372 ECHO3'],
            DrcProject['UKR-000423 ECHO4'],
            DrcProject['UKR-000462 ECHO'],
          ]),
      },
      source: {
        icon: 'source',
        label: 'Data source',
        getValue: ({source}) => source,
        getOptions: () =>
          DataFilter.buildOptionsFromObject(
            Array.from(new Set(mappedData?.map(({source}) => source))).reduce(
              (accum, current) => ({...accum, [current]: KoboIndex.searchById(current)?.translation}),
              {},
            ),
          ),
      },
    })
  }, [mappedData])

  useEffect(() => {
    if (!mappedData) return

    const filteredData = applyFilters(mappedData)
    const {body, sampleSizes} = prepareTableData(filteredData)
    prepareTableData(filteredData)
    setTableBodyData(body)
    setSampleSizes(sampleSizes)
  }, [applyFilters, mappedData])

  useEffect(() => {
    Promise.all([byName('gbv_wgssPdm').fetch()])
      .then(([gbvWgssPdmData]) => [...gbvWgssPdmMapper(gbvWgssPdmData)])
      .then(setMappedData)
      .finally(stopLoadingIndication)
  }, [])

  return (
    <Page width="full" loading={loading} paddingInline={2}>
      <DataFilterLayout
        shapes={filterShape}
        filters={filters}
        setFilters={setFilters}
        onClear={() => {
          setFilters({})
          setPeriodFilter([undefined, undefined])
        }}
        before={
          <DebouncedInput<DateRange> debounce={400} value={periodFilter} onChange={setPeriodFilter}>
            {(value, onChange) => (
              <PeriodPicker
                defaultValue={value ?? [undefined, undefined]}
                value={value ?? [undefined, undefined]}
                onChange={onChange}
                fullWidth={false}
              />
            )}
          </DebouncedInput>
        }
      />
      <TableContainer
        component={Paper}
        sx={{
          maxHeight: 'calc(100vh - 62px)',
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Table
          aria-label="ECHO PM KOI Table"
          stickyHeader
          size="small"
          sx={{
            th: {whiteSpace: 'nowrap'},
            td: {textAlign: 'right'},
            'thead th': {textAlign: 'center'},
            'thead th+th': {borderLeft: `1px solid ${theme.palette.divider}`},
            'thead tr:first-of-type th': {textTransform: 'uppercase'},
            'thead tr:last-of-type th': {textAlign: 'right'},
            'tbody tr:last-of-type th': {borderBottom: 'none'},
            'tbody tr:last-of-type td': {borderBottom: 'none'},
            'tbody td': {borderLeft: `1px solid ${theme.palette.divider}`},
          }}
        >
          <EchoTableHead sampleSizes={sampleSizes} />
          <EchoTableBody {...tableBodyData} />
        </Table>
      </TableContainer>
    </Page>
  )
}

export default EchoPmKoi
