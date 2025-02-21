import {NavLink, Route, Routes} from 'react-router-dom'
import {Sidebar, SidebarBody, SidebarItem} from '@/shared/Layout/Sidebar'
import {Layout} from '@/shared/Layout'
import {useI18n} from '@/core/i18n'
import React, {useMemo} from 'react'
import {AppHeader} from '@/shared/Layout/Header/AppHeader'
import {useSession} from '@/core/Session/SessionContext'
import {appFeaturesIndex} from '@/features/appFeatureId'
import {NoFeatureAccessPage} from '@/shared/NoFeatureAccessPage'
import {KoboFormName} from 'infoportal-common'
import {SidebarSection} from '@/shared/Layout/Sidebar/SidebarSection'
import {getKoboFormRouteProps, SidebarKoboLink} from '@/features/SidebarKoboLink'
import {useReactRouterDefaultRoute} from '@/core/useReactRouterDefaultRoute'
import {VictimDashboard} from '@/features/Victim/VictimDashboard/VictimDashboard'

const relatedKoboForms: KoboFormName[] = ['va_bio_tia']

export const vaIndex = {
  basePath: '/va',
  siteMap: {
    dashboard: '/va-dashboard',
    form: (id = ':id') => '/form/' + id,
  },
}

const VictimSidebar = () => {
  const path = (page: string) => '' + page
  const {m} = useI18n()
  return (
    <Sidebar>
      <SidebarBody>
        <NavLink to={path(vaIndex.siteMap.dashboard)}>
          {({isActive, isPending}) => (
            <SidebarItem icon="insights" active={isActive}>
              {m.dashboard}
            </SidebarItem>
          )}
        </NavLink>
        <SidebarSection title={m.koboForms}>
          {relatedKoboForms.map((_) => (
            <SidebarKoboLink key={_} path={path(vaIndex.siteMap.form(_))} name={_} />
          ))}
        </SidebarSection>
      </SidebarBody>
    </Sidebar>
  )
}

export const Victim = () => {
  useReactRouterDefaultRoute(vaIndex.siteMap.dashboard)
  const {session, accesses} = useSession()
  const access = useMemo(() => !!appFeaturesIndex.hdp.showIf?.(session, accesses), [accesses])
  if (!access) {
    return <NoFeatureAccessPage />
  }
  return (
    <Layout title={appFeaturesIndex.hdp.name} sidebar={<VictimSidebar />} header={<AppHeader id="app-header" />}>
      <Routes>
        <Route path={vaIndex.siteMap.dashboard} element={<VictimDashboard />} />
        {relatedKoboForms.map((_) => (
          <Route key={_} {...getKoboFormRouteProps({path: vaIndex.siteMap.form(_), name: _})} />
        ))}
      </Routes>
    </Layout>
  )
}
