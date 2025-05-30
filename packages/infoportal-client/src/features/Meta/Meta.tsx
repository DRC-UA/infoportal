import {Route, Routes} from 'react-router-dom'

import {useReactRouterDefaultRoute} from '@/core/useReactRouterDefaultRoute'
import {appFeaturesIndex} from '@/features/appFeatureId'
import {MetaDashboardProvider, useMetaContext} from '@/features/Meta/MetaContext'
import {MetaDashboard} from '@/features/Meta/Dashboard/MetaDashboard'
import {MetaSidebar} from '@/features/Meta/MetaSidebar'
import {MetaTable} from '@/features/Meta/Table/MetaTable'
import {Layout} from '@/shared/Layout'

export const Meta = () => {
  return (
    <MetaDashboardProvider>
      <_Meta />
    </MetaDashboardProvider>
  )
}

export const metaSiteMap = {
  basePath: 'meta-dashboard',
  routes: {
    dashboard: '/dashboard',
    data: '/data',
  },
}

const _Meta = () => {
  const ctx = useMetaContext()
  useReactRouterDefaultRoute(metaSiteMap.routes.dashboard)
  const isDevEnv = process?.env.NODE_ENV === 'development'

  return (
    <Layout title={appFeaturesIndex.metaDashboard.name} loading={ctx.fetcher.loading} sidebar={<MetaSidebar />}>
      {ctx.fetcher.get && (
        <Routes>
          <Route path={metaSiteMap.routes.dashboard} element={<MetaDashboard />} />
          {isDevEnv && <Route path={metaSiteMap.routes.data} element={<MetaTable />} />}
        </Routes>
      )}
    </Layout>
  )
}
