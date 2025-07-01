import {useEffect, type FC} from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'

import {appFeaturesIndex} from '@/features/appFeatureId'
import {Layout} from '@/shared/Layout'
import {AppHeader} from '@/shared/Layout/Header/AppHeader'

import {pages} from './config'
import {Dashboard as IndividualAidDashboard, Data as IndividualAidData} from './IndividualAid'
import LegalSidebar from './LegalSidebar'

const Legal: FC = () => {
  useEffect(() => {
    // force routing handover from Next's to React's router to fix the blank page
    if (window.location.hash === '') {
      window.location.replace(`legal#/${pages.individualLegalAid.slug}`)
    }
  }, [])

  return (
    <Layout title={appFeaturesIndex.legal.name} sidebar={<LegalSidebar />} header={<AppHeader id="app-header" />}>
      <Routes>
        <Route index element={<Navigate to={pages.individualLegalAid.slug} replace />} />
        <Route path={pages.individualLegalAid.slug}>
          <Route index element={<Navigate to={pages.individualLegalAid.dashboard.slug} replace />} />
          <Route path={pages.individualLegalAid.dashboard.slug} element={<IndividualAidDashboard />} />
          <Route path={pages.individualLegalAid.data.slug} element={<IndividualAidData />} />
        </Route>
      </Routes>
    </Layout>
  )
}

export {Legal}
