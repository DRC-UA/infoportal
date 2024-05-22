import {Navigate, NavLink, Route, Routes} from 'react-router-dom'
import {Layout} from '@/shared/Layout'
import {appFeaturesIndex} from '@/features/appFeatureId'
import {AppHeader} from '@/shared/Layout/Header/AppHeader'
import React from 'react'
import {useI18n} from '@/core/i18n'
import {Sidebar, SidebarBody, SidebarHr, SidebarItem} from '@/shared/Layout/Sidebar'
import {PartnershipProvider} from '@/features/Partnership/PartnershipContext'
import {PartnershipDashboard} from '@/features/Partnership/Dashboard/PartnershipDashboard'
import {KoboFormName} from '@infoportal-common'
import {SidebarSection} from '@/shared/Layout/Sidebar/SidebarSection'
import {getKoboFormRouteProps, SidebarKoboLink} from '@/features/SidebarKoboLink'

const relatedKoboForms: KoboFormName[] = [
  'partnership_partnersDatabase',
  'partnership_assessment',
  'partnership_initialQuestionnaire',
]

export const partnershipIndex = {
  basePath: '/partnership',
  siteMap: {
    data: '/data',
    // access: '/access',
    dashboard: '/dashboard',
    form: (id = ':id') => '/form/' + id,
  }
}

const PartnershipSidebar = () => {
  const path = (page: string) => '' + page
  const {m} = useI18n()
  return (
    <Sidebar>
      <SidebarBody>
        <NavLink to={path(partnershipIndex.siteMap.dashboard)}>
          {({isActive, isPending}) => (
            <SidebarItem icon="insights" active={isActive}>{m.dashboard}</SidebarItem>
          )}
        </NavLink>
        {/*<NavLink to={path(partnershipModule.siteMap.data)}>*/}
        {/*  {({isActive, isPending}) => (*/}
        {/*    <SidebarItem icon="table_chart" active={isActive}>{m.data}</SidebarItem>*/}
        {/*  )}*/}
        {/*</NavLink>*/}
        <SidebarHr/>
        <SidebarSection title={m.koboForms}>
          {relatedKoboForms.map(_ =>
            <SidebarKoboLink size="small" key={_} path={path(partnershipIndex.siteMap.form(_))} name={_}/>
          )}
        </SidebarSection>
      </SidebarBody>
    </Sidebar>
  )
}

export const Partnership = () => {
  return (
    <Layout
      title={appFeaturesIndex.partnership.name}
      sidebar={<PartnershipSidebar/>}
      header={<AppHeader id="app-header"/>}
    >
      <PartnershipProvider>
        <Routes>
          <Route index element={<Navigate to={partnershipIndex.siteMap.dashboard}/>}/>
          <Route path={partnershipIndex.siteMap.dashboard} element={<PartnershipDashboard/>}/>
          {relatedKoboForms.map(_ =>
            <Route key={_} {...getKoboFormRouteProps({path: partnershipIndex.siteMap.form(_), name: _})}/>
          )}
        </Routes>
      </PartnershipProvider>
    </Layout>
  )
}