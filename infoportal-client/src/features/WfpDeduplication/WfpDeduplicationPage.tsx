import {Layout} from '@/shared/Layout'
import {WfpDeduplicationData} from '@/features/WfpDeduplication/WfpDeduplicationData'
import {Sidebar, SidebarBody, SidebarHr, SidebarItem} from '@/shared/Layout/Sidebar'
import {BtnUploader} from 'mui-extension'
import React, {useMemo} from 'react'
import {useEffectFn} from '@alexandreannic/react-hooks-lib'
import {useI18n} from '@/core/i18n'
import {useIpToast} from '@/core/useToast'
import {useAppSettings} from '@/core/context/ConfigContext'
import {appFeaturesIndex} from '@/features/appFeatureId'
import {useSession} from '@/core/Session/SessionContext'
import {NoFeatureAccessPage} from '@/shared/NoFeatureAccessPage'
import {IpBtn} from '@/shared/Btn'
import {HashRouter as Router, NavLink, Route, Routes} from 'react-router-dom'
import {WfpDeduplicationAccess} from '@/features/WfpDeduplication/WfpDeduplicationAccess'
import {useAsync} from '@/shared/hook/useAsync'

export const wfpDeduplicationIndex = {
  basePath: '/wfp-deduplication',
  siteMap: {
    data: '/',
    access: '/access',
  }
}

const WpfDeduplicationSidebar = () => {
  const {api} = useAppSettings()
  const {session} = useSession()

  const _uploadTaxIdMapping = useAsync(api.wfpDeduplication.uploadTaxIdsMapping)
  const _refreshData = useAsync(api.wfpDeduplication.refresh)
  const {m} = useI18n()
  const {toastHttpError} = useIpToast()
  const path = (page: string) => '' + page

  useEffectFn(_uploadTaxIdMapping.error, toastHttpError)
  useEffectFn(_refreshData.error, toastHttpError)

  return (
    <Sidebar headerId="app-header">
      <SidebarBody>
        {session.admin && (
          <>
            <SidebarItem>
              <BtnUploader
                fullWidth
                variant="outlined"
                uploading={_uploadTaxIdMapping.loading}
                onUpload={_uploadTaxIdMapping.call}
                onDelete={console.log}
                msg={{
                  invalidSize: m.error,
                  loading: m.loading,
                  upload: m.mpca.uploadWfpTaxIdMapping,
                }}
              />
            </SidebarItem>
            <SidebarItem>
              <IpBtn variant="outlined" icon="refresh" onClick={_refreshData.call} loading={_refreshData.loading}>
                {m.refresh}
              </IpBtn>
            </SidebarItem>
            <SidebarHr sx={{my: 2}}/>
          </>
        )}
        <NavLink to={path(wfpDeduplicationIndex.siteMap.data)}>
          {({isActive}) =>
            <SidebarItem icon="list_alt" active={isActive}>
              {m.data}
            </SidebarItem>
          }
        </NavLink>
        {/*<SidebarItem icon="bar_chart">*/}
        {/*  {m.dashboard}*/}
        {/*</SidebarItem>*/}
        <NavLink to={path(wfpDeduplicationIndex.siteMap.access)}>
          {({isActive}) =>
            <SidebarItem icon="person_add" active={isActive}>
              {m.accesses}
            </SidebarItem>
          }
        </NavLink>
      </SidebarBody>
    </Sidebar>
  )
}

export const WfpDeduplicationPage = () => {
  const {accesses, session} = useSession()
  const access = useMemo(() => appFeaturesIndex.wfp_deduplication.showIf?.(session, accesses), [session, accesses])
  if (!access) {
    return (
      <NoFeatureAccessPage/>
    )
  }
  return (
    <Router>
      <Layout title={appFeaturesIndex.wfp_deduplication.name} sidebar={<WpfDeduplicationSidebar/>}>
        <Routes>
          <Route index element={<WfpDeduplicationData/>}/>
          <Route path={wfpDeduplicationIndex.siteMap.access} element={<WfpDeduplicationAccess/>}/>
        </Routes>
      </Layout>
    </Router>
  )
}
