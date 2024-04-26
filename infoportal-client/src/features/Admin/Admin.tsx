import {HashRouter as Router, Navigate, NavLink, Route, Routes} from 'react-router-dom'
import React from 'react'
import {AdminUsers} from '@/features/Admin/AdminUsers'
import {AppHeader} from '@/shared/Layout/Header/AppHeader'
import {Sidebar, SidebarBody, SidebarItem} from '@/shared/Layout/Sidebar'
import {useI18n} from '@/core/i18n'
import {Layout} from '@/shared/Layout'
import {AdminProxy} from '@/features/Admin/AdminProxy'
import {AdminGroups} from '@/features/Admin/AdminGroups'
import {appFeaturesIndex} from '@/features/appFeatureId'
import {IpIconBtn} from '@/shared/IconBtn'
import {useAppSettings} from '@/core/context/ConfigContext'
import {useIpToast} from '@/core/useToast'
import {useAsync} from '@/shared/hook/useAsync'

export const adminModule = {
  basePath: '/admin',
  siteMap: {
    users: '/users',
    proxy: '/proxy',
    group: '/group',
  }
}

const AdminSidebar = () => {
  const path = (page: string) => '' + page
  const {m} = useI18n()
  const {api} = useAppSettings()
  const {toastInfo} = useIpToast()
  const asyncRefresh = useAsync(api.koboMeta.sync)
  return (
    <Sidebar>
      <SidebarBody>
        <NavLink to={path(adminModule.siteMap.users)}>
          {({isActive}) =>
            <SidebarItem icon="group" active={isActive}>{m.users}</SidebarItem>
          }
        </NavLink>
        <NavLink to={path(adminModule.siteMap.group)}>
          {({isActive}) =>
            <SidebarItem icon="groups" active={isActive}>{m.group}</SidebarItem>
          }
        </NavLink>
        <NavLink to={path(adminModule.siteMap.proxy)}>
          {({isActive}) =>
            <SidebarItem icon="settings_input_antenna" active={isActive}>{m.proxy}</SidebarItem>
          }
        </NavLink>
        <SidebarItem
          icon={appFeaturesIndex.metaDashboard.materialIcons}
          onClick={() => asyncRefresh.call().then(() => toastInfo(m._meta.refreshLong))}
        >
          {m._meta.refresh}
          <IpIconBtn
            color="primary"
            loading={asyncRefresh.loading}
            children="cloud_sync"
          />
        </SidebarItem>
      </SidebarBody>
    </Sidebar>
  )
}

export const Admin = () => {
  return (
    <Router>
      <Layout
        title={appFeaturesIndex.admin.name}
        sidebar={<AdminSidebar/>}
        header={<AppHeader id="app-header"/>}
      >
        <Routes>
          <Route index element={<Navigate to={adminModule.siteMap.users}/>}/>
          <Route path={adminModule.siteMap.users} element={<AdminUsers/>}/>
          <Route path={adminModule.siteMap.proxy} element={<AdminProxy/>}/>
          <Route path={adminModule.siteMap.group} element={<AdminGroups/>}/>
        </Routes>
      </Layout>
    </Router>
  )
}