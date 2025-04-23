import {useMemo, type FC} from 'react'
import {Navigate, Route, Routes, generatePath} from 'react-router-dom'

import {appFeaturesIndex} from '@/features/appFeatureId'
import {getKoboFormRouteProps} from '@/features/SidebarKoboLink'
import {useSession} from '@/core/Session/SessionContext'
import {NoFeatureAccessPage} from '@/shared/NoFeatureAccessPage'

import {hdpIndex} from '../constants'

import {VictimAssistanceDashboard} from './Dashboard'
import {relatedKoboForms} from './constants'

export const VictimAssistance: FC = () => {
  const {session, accesses} = useSession()
  const access = useMemo(() => !!appFeaturesIndex.hdp.showIf?.(session, accesses), [accesses])

  if (!access) <NoFeatureAccessPage />

  return (
    <Routes>
      <Route index element={<Navigate to={hdpIndex.victimAssistance.dashboard.slug} replace />} />
      <Route path={hdpIndex.victimAssistance.dashboard.slug} element={<VictimAssistanceDashboard />} />
      {relatedKoboForms.map((name) => (
        <Route
          key={name}
          {...getKoboFormRouteProps({path: generatePath(hdpIndex.victimAssistance.form.slug, {name}), name})}
        />
      ))}
    </Routes>
  )
}
