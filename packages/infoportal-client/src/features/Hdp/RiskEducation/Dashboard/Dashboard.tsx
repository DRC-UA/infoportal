import {useEffect, type FC} from 'react'
import {seq} from '@axanc/ts-utils'

import {Page} from '@/shared/Page'

import {useRistEducationData} from '../hooks'

import {DashboardFilters} from './DashboardFilters'
import {DashboardWidgets} from './DashboardWidgets'

export const Dashboard: FC = () => {
  const {fetcher, filterShape, period, setPeriod, optionFilter, setOptionFilters} = useRistEducationData()

  const data = seq(fetcher.get?.recordset) ?? []

  return (
    <Page width="lg" loading={fetcher.loading}>
      <DashboardFilters
        period={period}
        setPeriod={setPeriod}
        optionFilter={optionFilter}
        setOptionFilters={setOptionFilters}
        filterShape={filterShape}
      />
      <DashboardWidgets data={data} />
      <pre>
        <code>{JSON.stringify(data[0], null, 2)}</code>
      </pre>
    </Page>
  )
}
