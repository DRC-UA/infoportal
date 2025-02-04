import React, {useMemo, useState} from 'react'
import {seq} from '@alexandreannic/ts-utils'

import {DrcOffice, IKoboMeta, KoboIndex, Period, toPercent} from 'infoportal-common'

import {appConfig} from '@/conf/AppConfig'
import {useI18n} from '@/core/i18n'
import {Page} from '@/shared/Page'
import {Div, SlideWidget} from '@/shared/PdfLayout/PdfSlide'
import {PeriodPicker} from '@/shared/PeriodPicker/PeriodPicker'
import {Lazy} from '@/shared/Lazy'
import {usePersistentState} from '@/shared/hook/usePersistantState'
import {DataFilter} from '@/shared/DataFilter/DataFilter'
import {DataFilterLayout} from '@/shared/DataFilter/DataFilterLayout'

import {useEcrecContext} from '../EcrecContext'

export const today = new Date()

export const EcrecDashboard = () => {
  const {data, fetcherData} = useEcrecContext()
  const [periodFilter, setPeriodFilter] = useState<Partial<Period>>({})
  const {m, formatLargeNumber} = useI18n()

  const filterShape = useMemo(() => {
    const d = data ?? seq([])
    return DataFilter.makeShape<IKoboMeta>({
      source: {
        icon: appConfig.icons.koboForm,
        label: m.kobo,
        getValue: (_) => _.formId,
        getOptions: () =>
          d
            .map((_) => _.formId)
            .distinct((_) => _)
            .map((_) => DataFilter.buildOption(_, KoboIndex.searchById(_)?.translation)),
      },
      prog: {
        icon: appConfig.icons.program,
        label: m.program,
        getValue: (_) => _.activity,
        getOptions: () =>
          DataFilter.buildOptions(
            d.map((_) => _.activity!).distinct((_) => _),
            false,
          ),
      },
      finalDonor: {
        icon: appConfig.icons.donor,
        label: m.donor,
        getValue: (_) => _.donor ?? DataFilter.blank,
        getOptions: () =>
          DataFilter.buildOptions(
            d.flatMap((_) => _.donor).distinct((_) => _),
            true,
          ),
        multiple: true,
      },
      finalProject: {
        icon: appConfig.icons.project,
        label: m.project,
        getValue: (_) => _.project ?? DataFilter.blank,
        getOptions: () =>
          DataFilter.buildOptions(
            d.flatMap((_) => _.project).distinct((_) => _),
            true,
          ),
        multiple: true,
      },
      office: {
        icon: 'business',
        label: m.office,
        getValue: (_) => _.office,
        getOptions: () => DataFilter.buildOptionsFromObject(DrcOffice, false),
      },
      oblast: {
        icon: 'location_on',
        label: m.oblast,
        getValue: (_) => _.oblast,
        getOptions: () =>
          DataFilter.buildOptions(
            d
              .map((_) => _.oblast!)
              .distinct((_) => _)
              .sort(),
          ),
      },
      raion: {
        label: m.raion,
        getValue: (_) => _.raion,
        getOptions: (get) =>
          get()
            .map((_) => _.raion)
            .compact()
            .distinct((_) => _)
            .sort()
            .map((_) => DataFilter.buildOption(_)),
      },
      hromada: {
        label: m.hromada,
        getValue: (_) => _.hromada,
        getOptions: (get) =>
          get()
            .map((_) => _.hromada)
            .compact()
            .distinct((_) => _)
            .sort()
            .sort()
            .map((_) => DataFilter.buildOption(_)),
      },
    })
  }, [data])

  const [filters, setFilters] = usePersistentState<DataFilter.InferShape<typeof filterShape>>(
    {},
    {storageKey: 'ecrec-dashboard-filters'},
  )

  const filteredData = useMemo(() => {
    if (!data) return
    const filteredBy_date = data.filter((d) => {
      if (periodFilter?.start && periodFilter.start.getTime() >= d.date.getTime()) return false
      if (periodFilter?.end && periodFilter.end.getTime() <= d.date.getTime()) return false
      return true
    })
    return DataFilter.filterData(filteredBy_date, filterShape, filters)
  }, [data, filters, periodFilter, filterShape])

  return (
    <Page width="lg" loading={fetcherData.loading}>
      <DataFilterLayout
        filters={filters}
        shapes={filterShape}
        data={data}
        setFilters={setFilters}
        onClear={() => {
          setFilters({})
          setPeriodFilter({})
        }}
        before={
          <PeriodPicker
            defaultValue={[periodFilter.start, periodFilter.end]}
            onChange={([start, end]) => setPeriodFilter((prev) => ({...prev, start, end}))}
            label={[m.start, m.endIncluded]}
            max={today}
          />
        }
      />
      <Div column>
        <Div responsive>
          <Div sx={{alignItems: 'stretch'}}>
            <SlideWidget sx={{flex: 1}} icon="person" title="Beneficiaries">
              <Lazy deps={[filteredData]} fn={() => filteredData?.sum((_) => _.personsCount ?? 0)}>
                {(_) => formatLargeNumber(_)}
              </Lazy>
            </SlideWidget>
          </Div>
        </Div>
      </Div>
    </Page>
  )
}
