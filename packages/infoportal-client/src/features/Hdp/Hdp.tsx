import type {FC} from 'react'
import {Route, Routes} from 'react-router-dom'

import {appFeaturesIndex} from '@/features/appFeatureId'
import {Layout} from '@/shared/Layout'
import {AppHeader} from '@/shared/Layout/Header/AppHeader'

import {VictimAssistance} from './VictimAssistance'
import {HdpSidebar} from './HdpSidebar'
import {hdpIndex} from './constants'

export const Hdp: FC = () => (
  <Routes>
    <Route
      path="/"
      element={
        <Layout title={appFeaturesIndex.hdp.name} sidebar={<HdpSidebar />} header={<AppHeader id="app-header" />} />
      }
    >
      <Route path={`${hdpIndex.victimAssistance.slug}/*`} Component={VictimAssistance} />
      <Route path="*" element={<p>TODO a proper 404 page</p>} />
    </Route>
  </Routes>
)
