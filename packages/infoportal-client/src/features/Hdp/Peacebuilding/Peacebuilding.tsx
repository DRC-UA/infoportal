import {type FC} from 'react'
import {Navigate, Route, Routes, generatePath} from 'react-router-dom'

import {getKoboFormRouteProps} from '@/features/SidebarKoboLink'

import {hdpIndex} from '../constants'

import {PeacebuildingDashboard} from './Dashboard'
import {relatedKoboForms} from './constants'

export const Peacebuilding: FC = () => {

  return (
    <Routes>
      <Route index element={<Navigate to={hdpIndex.peacebuilding.dashboard.slug} replace />} />
      <Route path={hdpIndex.peacebuilding.dashboard.slug} element={<PeacebuildingDashboard />} />
      {relatedKoboForms.map((name) => (
        <Route
          key={name}
          {...getKoboFormRouteProps({path: generatePath(hdpIndex.peacebuilding.form.slug, {name}), name})}
        />
      ))}
    </Routes>
  )
}