import {KoboFormName} from 'infoportal-common'
import {Navigate, NavLink, Route, Routes} from 'react-router-dom'
import React from 'react'
import {Sidebar, SidebarBody, SidebarItem} from '@/shared/Layout/Sidebar'
import {useI18n} from '@/core/i18n'
import {AppHeader} from '@/shared/Layout/Header/AppHeader'
import {Layout} from '@/shared/Layout'
import {getKoboFormRouteProps, SidebarKoboLink} from '@/features/SidebarKoboLink'
import {useAppSettings} from '@/core/context/ConfigContext'
import {ProtectionOverview} from '@/features/Protection/Overview/ProtectionOverview'
import Link from 'next/link'
import {SidebarSection} from '@/shared/Layout/Sidebar/SidebarSection'
import {shelterIndex} from '@/features/Shelter/Shelter'
import {appFeaturesIndex} from '@/features/appFeatureId'
import {appConfig} from '@/conf/AppConfig'
import {ProtectionDashboardPsea} from '@/features/Protection/DashboardPsea/ProtectionDashboardPsea'
import {useReactRouterDefaultRoute} from '@/core/useReactRouterDefaultRoute'

const relatedKoboForms: KoboFormName[] = [
  // 'protection_hhs2_1',
  'protection_communityMonitoring',
  'protection_groupSession',
  'protection_pss',
  // 'protection_hhs1',
  'protection_gbv',
  'protection_coc',
]

export const protectionIndex = {
  basePath: '/protection',
  siteMap: {
    dashboardPsea: '/dashboard-psea',
    dashboard: '/dashboard',
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
            {({isActive, isPending}) => (
              <SidebarItem icon="home" active={isActive}>
                {m.overview}
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
          <NavLink to={path(protectionIndex.siteMap.dashboardPsea)}>
            {({isActive, isPending}) => (
              <SidebarItem icon={appConfig.icons.dashboard} active={isActive}>
                {m.dashboard}
              </SidebarItem>
            )}
          </NavLink>
          <SidebarItem href={appConfig.externalLink.cocDashboard} icon="open_in_new" target="_blank">
            {m._protection.cocCasesDashboard}
          </SidebarItem>
          <SidebarKoboLink
            size="tiny"
            path={path(protectionIndex.siteMap.form('protection_coc'))}
            name="protection_coc"
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
        <Route path={protectionIndex.siteMap.dashboardPsea} element={<ProtectionDashboardPsea />} />
        {relatedKoboForms.map((_) => (
          <Route key={_} {...getKoboFormRouteProps({path: protectionIndex.siteMap.form(_), name: _})} />
        ))}
      </Routes>
    </Layout>
  )
}
