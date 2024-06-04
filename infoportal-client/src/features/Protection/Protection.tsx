import {KoboFormName} from '@infoportal-common'
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
import {ProtectionProvider, useProtectionContext} from '@/features/Protection/Context/ProtectionContext'
import {shelterIndex} from '@/features/Shelter/Shelter'
import {appFeaturesIndex} from '@/features/appFeatureId'

const relatedKoboForms: (KoboFormName)[] = [
  // 'protection_hhs2_1',
  'protection_communityMonitoring',
  'protection_groupSession',
  'protection_pss',
  // 'protection_hhs1',
  'protection_gbv',
]

export const protectionIndex = {
  basePath: '/protection',
  siteMap: {
    dashboard: '/dashboard',
    form: (id = ':id') => '/form/' + id,
  }
}

export const ProtectionSidebar = () => {
  const path = (page: string) => '' + page
  const {conf} = useAppSettings()
  const {m} = useI18n()
  return (
    <Sidebar>
      <SidebarBody>
        <NavLink to={path(protectionIndex.siteMap.dashboard)}>
          {({isActive, isPending}) => (
            <SidebarItem icon="home" active={isActive}>{m.overview}</SidebarItem>
          )}
        </NavLink>
        <SidebarSection title={m.protHHS2.descTitle}>
          <Link target="_blank" href={conf.linkToFeature('dashboard/protection-monitoring' as any, '')}>
            <SidebarItem icon="insights" iconEnd="open_in_new">{m.dashboard}</SidebarItem>
          </Link>
          <SidebarKoboLink size="small" path={path(protectionIndex.siteMap.form('protection_hhs3'))} name="protection_hhs3"/>
        </SidebarSection>
        <SidebarSection title={m.koboForms}>
          {relatedKoboForms.map(_ =>
            <SidebarKoboLink key={_} path={path(shelterIndex.siteMap.form(_))} name={_}/>
          )}
        </SidebarSection>
      </SidebarBody>
    </Sidebar>
  )
}

export const Protection = () => {
  return (
    <ProtectionProvider>
      <ProtectionWithContext/>
    </ProtectionProvider>
  )
}

export const ProtectionWithContext = () => {
  const ctx = useProtectionContext()

  return (
    <Layout
      title={appFeaturesIndex.protection.name}
      loading={ctx.fetching}
      sidebar={<ProtectionSidebar/>}
      header={<AppHeader id="app-header"/>}
    >
      <Routes>
        <Route index element={<Navigate to={protectionIndex.siteMap.dashboard}/>}/>
        <Route path={protectionIndex.siteMap.dashboard} element={<ProtectionOverview/>}/>
        {relatedKoboForms.map(_ =>
          <Route key={_} {...getKoboFormRouteProps({path: protectionIndex.siteMap.form(_), name: _})}/>
        )}
      </Routes>
    </Layout>
  )
}