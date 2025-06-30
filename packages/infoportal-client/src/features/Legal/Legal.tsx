import type {FC} from 'react'
import {Navigate, Route, Routes, Outlet} from 'react-router-dom'

import {appFeaturesIndex} from '@/features/appFeatureId'
import {Layout} from '@/shared/Layout'
import {AppHeader} from '@/shared/Layout/Header/AppHeader'

import {pages} from './config'
import {Dashboard as IndividualAidDashboard, Data as IndividualAidData} from './IndividualAid'
import LegalSidebar from './LegalSidebar'

const Legal: FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout
            title={appFeaturesIndex.legal.name}
            sidebar={<LegalSidebar />}
            header={<AppHeader id="app-header" />}
          />
        }
      >
        <Route index element={<Navigate to={pages.individualLegalAid.slug} replace />} />
        <Route path={pages.individualLegalAid.slug} Component={Outlet}>
          <Route index element={<Navigate to={pages.individualLegalAid.dashboard.slug} replace />} />
          <Route path={pages.individualLegalAid.dashboard.slug} element={<IndividualAidDashboard />} />
          <Route path={pages.individualLegalAid.data.slug} element={<IndividualAidData />} />
        </Route>
      </Route>
    </Routes>
  )
}

export {Legal}
