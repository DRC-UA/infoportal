import {useEffect, useState, type FC} from 'react'
import {seq} from '@axanc/ts-utils'
import {Box} from '@mui/material'
import {endOfMonth} from 'date-fns'

import type {Period} from 'infoportal-common'

import {useAppSettings} from '@/core/context/ConfigContext'
import {useI18n} from '@/core/i18n'
import {Datatable} from '@/shared/Datatable/Datatable'
import {useFetcher} from '@/shared/hook/useFetcher'
import {Page} from '@/shared/Page'
import {Panel} from '@/shared/Panel'
import {PeriodPicker} from '@/shared/PeriodPicker/PeriodPicker'

import {YearlyReportMapper} from './mapper'
import {useOptionsBuilder} from './hooks'

export const YearlyReport: FC = () => {
  const {m} = useI18n()
  const {api} = useAppSettings()
  const [period, setPeriod] = useState<Partial<Period>>({
    start: new Date(new Date().getFullYear() - 1, 10),
    end: endOfMonth(new Date(new Date().getFullYear(), 9)),
  })

  const fetcher = useFetcher((period: Partial<Period>) => YearlyReportMapper.request(api)(period))

  useEffect(() => {
    fetcher.fetch({}, period)
  }, [period])

  const options = useOptionsBuilder({
    options: ['oblast', 'sector', 'indicator'],
    data: seq(fetcher.get?.flat()),
  })

  return (
    <Page width="full">
      <Panel>
        <Datatable
          defaultLimit={100}
          showExportBtn
          id="yearly-report"
          loading={fetcher.loading}
          data={fetcher.get?.flat()}
          header={
            <Box sx={{display: 'flex', alignItems: 'center', flex: 1}}>
              <PeriodPicker
                value={[period.start, period.end]}
                onChange={([start, end]) => setPeriod({start, end})}
                fullWidth={false}
                max={endOfMonth(new Date())}
              />
            </Box>
          }
          columns={[
            {
              id: 'sector',
              head: 'Sector',
              width: 180,
              type: 'select_multiple',
              options: options.sector,
              render: ({sector}) => ({value: [sector], label: sector}),
            },
            {
              id: 'oblast',
              head: 'Oblast',
              type: 'select_multiple',
              options: options.oblast,
              render: ({oblast}) => ({value: [oblast], label: oblast}),
            },
            {
              id: 'indicator',
              type: 'select_multiple',
              head: 'Indicator',
              options: options.indicator,
              render: ({indicator}) => ({value: [indicator], label: indicator}),
            },
            {
              id: 'total-individuals',
              type: 'number',
              head: 'Total Individuals Reached',
              renderQuick: ({beneficiaries}) => beneficiaries['Total Individuals Reached'],
            },
            {
              id: 'girls',
              type: 'number',
              head: 'Girls',
              renderQuick: ({beneficiaries}) =>
                beneficiaries['Girls (0-17)'] + beneficiaries['Girls with disability (0-17)'],
            },
            {
              id: 'boys',
              type: 'number',
              head: 'Boys',
              renderQuick: ({beneficiaries}) =>
                beneficiaries['Boys (0-17)'] + beneficiaries['Boys with disability (0-17)'],
            },
            {
              id: 'women',
              type: 'number',
              head: 'Adult Women',
              renderQuick: ({beneficiaries}) =>
                beneficiaries['Adult Women (18-59)'] + beneficiaries['Adult Women with disability (18-59)'],
            },
            {
              id: 'men',
              type: 'number',
              head: 'Adult Men',
              renderQuick: ({beneficiaries}) =>
                beneficiaries['Adult Men (18-59)'] + beneficiaries['Adult Men with disability (18-59)'],
            },
            {
              id: 'women-60plus',
              type: 'number',
              head: 'Women (60+)',
              renderQuick: ({beneficiaries}) =>
                beneficiaries['Older Women (60+)'] + beneficiaries['Older Women with disability (60+)'],
            },
            {
              id: 'men-60plus',
              type: 'number',
              head: 'Men (60+)',
              renderQuick: ({beneficiaries}) =>
                beneficiaries['Older Men (60+)'] + beneficiaries['Older Men with disability (60+)'],
            },
            {
              id: 'total-paid',
              type: 'number',
              head: 'Total Value (UAH)',
              renderQuick: ({totalPaid}) => totalPaid,
            },
          ]}
        />
      </Panel>
    </Page>
  )
}
