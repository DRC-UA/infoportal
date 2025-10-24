import {NavLink, Route, Routes} from 'react-router-dom'
import Link from 'next/link'

import {KoboFormName} from 'infoportal-common'

import {appConfig} from '@/conf/AppConfig'
import {useAppSettings} from '@/core/context/ConfigContext'
import {useI18n} from '@/core/i18n'
import {useReactRouterDefaultRoute} from '@/core/useReactRouterDefaultRoute'
import {appFeaturesIndex} from '@/features/appFeatureId'
import {ProtectionOverview} from '@/features/Protection/Overview/ProtectionOverview'
import {ProtectionDashboardTabs} from '@/features/Protection/ProtectionDashboardTabs'
import {shelterIndex} from '@/features/Shelter/Shelter'
import {getKoboFormRouteProps, SidebarKoboLink} from '@/features/SidebarKoboLink'
import {Layout} from '@/shared/Layout'
import {AppHeader} from '@/shared/Layout/Header/AppHeader'
import {Sidebar, SidebarBody, SidebarItem} from '@/shared/Layout/Sidebar'
import {SidebarSection} from '@/shared/Layout/Sidebar/SidebarSection'

import DashboardPss from './DashboardPss'

const relatedKoboForms: KoboFormName[] = [
  'protection_communityMonitoring',
  'protection_groupSession',
  'protection_pss',
  'protection_gbv',
  'protection_coc',
  'safeguarding_psea',
]

export const protectionIndex = {
  basePath: '/protection',
  siteMap: {
    dashboard: '/dashboard',
    dashboardPss: '/dashboard-pss',
    dashboardTabs: '/dashboard-tabs',
    form: (id = ':id') => '/form/' + id,
  },
}

export const ProtectionSidebar = () => {
  const path = (page: string) => '' + page
  const {conf} = useAppSettings()
  const {m} = useI18n()

  return (
    <Sidebar>
      <SidebarBody>
        <SidebarSection title={m.general}>
          <NavLink to={path(protectionIndex.siteMap.dashboard)}>
            {({isActive}) => (
              <SidebarItem icon="home" active={isActive}>
                {m.overview}
              </SidebarItem>
            )}
          </NavLink>
          <NavLink to={path(protectionIndex.siteMap.dashboardPss)}>
            {({isActive}) => (
              <SidebarItem icon={appConfig.icons.dashboard} active={isActive}>
                PSS Dashboard
              </SidebarItem>
            )}
          </NavLink>
          {relatedKoboForms.map((_) => (
            <SidebarKoboLink size="tiny" key={_} path={path(shelterIndex.siteMap.form(_))} name={_} />
          ))}
        </SidebarSection>
        <SidebarSection title={m.protHHS2.descTitle}>
          <Link target="_blank" href={conf.linkToFeature('dashboard/protection-monitoring' as any, '')}>
            <SidebarItem icon={appConfig.icons.dashboard} iconEnd="open_in_new">
              {m.dashboard}
            </SidebarItem>
          </Link>
          <SidebarKoboLink
            size="tiny"
            path={path(protectionIndex.siteMap.form('protection_hhs3'))}
            name="protection_hhs3"
          />
        </SidebarSection>
        <SidebarSection title={m._protection.psea}>
          <SidebarItem href={appConfig.externalLink.cocDashboard} icon="open_in_new" target="_blank">
            {m._protection.cocCasesDashboard}
          </SidebarItem>
          <NavLink to={path(protectionIndex.siteMap.dashboardTabs)}>
            {({isActive}) => (
              <SidebarItem icon={appConfig.icons.dashboard} active={isActive}>
                {m.dashboard}
              </SidebarItem>
            )}
          </NavLink>
          <SidebarKoboLink
            size="tiny"
            path={path(protectionIndex.siteMap.form('protection_coc'))}
            name="protection_coc"
          />
          <SidebarKoboLink
            size="tiny"
            path={path(protectionIndex.siteMap.form('safeguarding_psea'))}
            name="safeguarding_psea"
          />
        </SidebarSection>
      </SidebarBody>
    </Sidebar>
  )
}

export const Protection = () => {
  useReactRouterDefaultRoute(protectionIndex.siteMap.dashboard)

  return (
    <Layout
      title={appFeaturesIndex.protection.name}
      sidebar={<ProtectionSidebar />}
      header={<AppHeader id="app-header" />}
    >
      <Routes>
        <Route path={protectionIndex.siteMap.dashboard} element={<ProtectionOverview />} />
        <Route path={protectionIndex.siteMap.dashboardPss} element={<DashboardPss />} />
        <Route path="/dashboard-tabs" element={<ProtectionDashboardTabs />} />
        {relatedKoboForms.map((_) => (
          <Route key={_} {...getKoboFormRouteProps({path: protectionIndex.siteMap.form(_), name: _})} />
        ))}
      </Routes>
    </Layout>
  )
}
