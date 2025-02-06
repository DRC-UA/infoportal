import {useMemo} from 'react'
import {NavLink, Route, Routes} from 'react-router-dom'
import {useI18n} from '@/core/i18n'
import {Sidebar, SidebarBody, SidebarHr, SidebarItem} from '@/shared/Layout/Sidebar'
import {Layout} from '@/shared/Layout'
import {AppHeader} from '@/shared/Layout/Header/AppHeader'
import {useSession} from '@/core/Session/SessionContext'
import {appFeaturesIndex} from '@/features/appFeatureId'
import {NoFeatureAccessPage} from '@/shared/NoFeatureAccessPage'
import {IpBtn} from '@/shared/Btn'
import {Box, Tooltip} from '@mui/material'
import {Txt} from '@/shared/Txt'
import {useReactRouterDefaultRoute} from '@/core/useReactRouterDefaultRoute'

import {EcrecProvider, useEcrecContext} from './EcrecContext'
import {EcrecDataTable} from './EcrecDataTable'
import {EcrecDashboard} from './Dashboard/EcrecDashboard'

export const ecrecIndex = {
  basePath: '/ecrec',
  siteMap: {
    data: '/data',
    dashboard: '/dashboard',
  },
}

const EcrecSidebar = () => {
  const path = (page: string) => '' + page
  const {m, formatLargeNumber} = useI18n()
  const ctx = useEcrecContext()

  return (
    <Sidebar>
      <SidebarBody>
        <SidebarItem
          sx={{pr: 0}}
          iconEnd={
            <Tooltip placement="right" title={m.mpca.pullLastDataDesc + ' ' + m.timeConsumingOperation}>
              <IpBtn onClick={ctx.refresh.call} loading={ctx.refresh.loading} icon="cloud_sync">
                {m.pullLast}
              </IpBtn>
            </Tooltip>
          }
        >
          <Box>
            <Txt color="hint" block uppercase sx={{fontSize: '0.75rem'}}>
              {m.data}
            </Txt>
            <Txt color="default">{formatLargeNumber(ctx.data?.length)}</Txt>
          </Box>
        </SidebarItem>
        <SidebarHr />
        <NavLink to={path(ecrecIndex.siteMap.dashboard)}>
          {({isActive, isPending}) => (
            <SidebarItem icon="equalizer" active={isActive}>
              {m.dashboard}
            </SidebarItem>
          )}
        </NavLink>
        <NavLink to={path(ecrecIndex.siteMap.data)}>
          {({isActive, isPending}) => (
            <SidebarItem icon="table_chart" active={isActive}>
              {m.data}
            </SidebarItem>
          )}
        </NavLink>
      </SidebarBody>
    </Sidebar>
  )
}

export const Ecrec = () => {
  useReactRouterDefaultRoute(ecrecIndex.siteMap.dashboard)
  const {session, accesses} = useSession()
  const access = useMemo(() => !!appFeaturesIndex.ecrec.showIf?.(session, accesses), [accesses])

  if (!access) return <NoFeatureAccessPage />

  return (
    <EcrecProvider>
      <Layout title={appFeaturesIndex.ecrec.name} sidebar={<EcrecSidebar />} header={<AppHeader id="app-header" />}>
        <Routes>
          <Route path={ecrecIndex.siteMap.dashboard} element={<EcrecDashboard />} />
          <Route path={ecrecIndex.siteMap.data} element={<EcrecDataTable />} />
        </Routes>
      </Layout>
    </EcrecProvider>
  )
}
