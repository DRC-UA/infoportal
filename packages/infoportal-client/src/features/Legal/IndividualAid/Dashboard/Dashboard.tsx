import type {FC} from 'react'

import {Page} from '@/shared/Page'
import {withContext} from '@/utils'

import {IndividualAidProvider, useIndividualAidContext} from './context'
import Filters from './DashboardFilters'
import Widgets from './DashboardWidgets'

const Dashboard: FC = () => {
  const ctx = useIndividualAidContext()

  return (
    <Page width="lg" loading={ctx.fetcherAnswer.loading}>
      <Filters />
      <Widgets />
      <pre>
        <code>
          {JSON.stringify(
            ctx.dataFiltered.find(({number_case}) => number_case.length > 1),
            null,
            2,
          )}
        </code>
      </pre>
    </Page>
  )
}

export default withContext({provider: IndividualAidProvider, component: Dashboard})
