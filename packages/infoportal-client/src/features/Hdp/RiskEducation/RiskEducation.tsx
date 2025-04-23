import type {FC} from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'

import {hdpIndex} from '../constants'

import {RiskEducationDashboard} from './Dashboard'

export const RiskEducation: FC = () => {
  return (
    <Routes>
      <Route index element={<Navigate to={hdpIndex.riskEducation.dashboard.slug} replace />} />
      <Route path={hdpIndex.riskEducation.dashboard.slug} Component={RiskEducationDashboard} />
      <Route path="*" element={<p>TODO a proper 404 page</p>} />
    </Routes>
  )
}
