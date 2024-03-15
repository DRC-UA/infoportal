import {MetaDashboardProvider, useMetaContext} from '@/features/Meta/MetaContext'
import React from 'react'
import {MetaDashboard} from '@/features/Meta/Dashboard/MetaDashboard'
import {Layout} from '@/shared/Layout'
import {appFeaturesIndex} from '@/features/appFeatureId'
import {MetaSidebar} from '@/features/Meta/MetaSidebar'
import {HashRouter as Router, Route, Routes} from 'react-router-dom'
import {MetaTable} from '@/features/Meta/Table/MetaTable'

export const Meta = () => {
  return (
    <MetaDashboardProvider>
      <_Meta/>
    </MetaDashboardProvider>
  )
}

export const metaSiteMap = {
  basePath: 'meta-dashboard',
  routes: {
    dashboard: '/',
    data: '/data',
  },
}

const _Meta = () => {
  const ctx = useMetaContext()
  return (
    <Router>
      <Layout
        title={appFeaturesIndex.metaDashboard.name}
        loading={ctx.fetcher.loading}
        sidebar={<MetaSidebar/>}
      >
        {ctx.fetcher.get && (
          <Routes>
            <Route path={metaSiteMap.routes.dashboard} element={<MetaDashboard/>}/>
            <Route path={metaSiteMap.routes.data} element={<MetaTable/>}/>
          </Routes>
        )}
      </Layout>
    </Router>
  )
}