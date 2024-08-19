import {Navigate, NavLink, Route, Routes} from 'react-router-dom'
import {Sidebar, SidebarBody, SidebarHr, SidebarItem} from '@/shared/Layout/Sidebar'
import {Layout} from '@/shared/Layout'
import {useI18n} from '@/core/i18n'
import React, {useMemo} from 'react'
import {AppHeader} from '@/shared/Layout/Header/AppHeader'
import {useSession} from '@/core/Session/SessionContext'
import {appFeaturesIndex} from '@/features/appFeatureId'
import {NoFeatureAccessPage} from '@/shared/NoFeatureAccessPage'
import {SidebarSection} from '@/shared/Layout/Sidebar/SidebarSection'
import {KoboFormName} from 'infoportal-common'
import {SafetyIncidentDashboard} from '@/features/Safety/IncidentsDashboard/SafetyIncidentDashboard'
import {getKoboFormRouteProps, SidebarKoboLink} from '@/features/SidebarKoboLink'

const relatedKoboForms: (KoboFormName)[] = [
  'safety_incident',
]

export const safetyIndex = {
  basePath: '/safety',
  siteMap: {
    incidentDashboard: '/incident-dashboard',
    form: (id = ':id') => '/form/' + id,
  }
}

const MpcaSidebar = () => {
  const path = (page: string) => '' + page
  const {m, formatLargeNumber} = useI18n()
  return (
    <Sidebar>
      <SidebarBody>
        <NavLink to={path(safetyIndex.siteMap.incidentDashboard)}>
          {({isActive, isPending}) => (
            <SidebarItem icon="equalizer" active={isActive}>{m.safety.incidentTrackerTitle}</SidebarItem>
          )}
        </NavLink>
        <SidebarHr/>
        <SidebarSection title={m.koboForms}>
          {relatedKoboForms.map(_ =>
            <SidebarKoboLink key={_} path={path(safetyIndex.siteMap.form(_))} name={_}/>
          )}
        </SidebarSection>
      </SidebarBody>
    </Sidebar>
  )
}

export const Safety = () => {
  const {session, accesses} = useSession()
  const access = useMemo(() => !!appFeaturesIndex.safety.showIf?.(session, accesses), [accesses])
  if (!access) {
    return (
      <NoFeatureAccessPage/>
    )
  }
  return (
    <Layout
      title={appFeaturesIndex.safety.name}
      sidebar={<MpcaSidebar/>}
      header={<AppHeader id="app-header"/>}
    >
      <Routes>
        <Route index element={<Navigate to={safetyIndex.siteMap.incidentDashboard}/>}/>
        <Route index path={safetyIndex.siteMap.incidentDashboard} element={<SafetyIncidentDashboard/>}/>
        {relatedKoboForms.map(_ =>
          <Route key={_} {...getKoboFormRouteProps({path: safetyIndex.siteMap.form(_), name: _})}/>
        )}
      </Routes>
    </Layout>
  )
}

