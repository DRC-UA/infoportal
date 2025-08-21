import {useMemo} from 'react'
import {useEffectFn} from '@alexandreannic/react-hooks-lib'
import {NavLink, Route, Routes} from 'react-router-dom'

import {useAppSettings} from '@/core/context/ConfigContext'
import {useI18n} from '@/core/i18n'
import {useSession} from '@/core/Session/SessionContext'
import {useReactRouterDefaultRoute} from '@/core/useReactRouterDefaultRoute'
import {useIpToast} from '@/core/useToast'
import {appFeaturesIndex} from '@/features/appFeatureId'
import {WfpDeduplicationAccess} from '@/features/WfpDeduplication/WfpDeduplicationAccess'
import {WfpDeduplicationData} from '@/features/WfpDeduplication/WfpDeduplicationData'
import {IpBtn} from '@/shared/Btn'
import {BtnUploader} from '@/shared/BtnUploader'
import {useAsync} from '@/shared/hook/useAsync'
import {Layout} from '@/shared/Layout'
import {Sidebar, SidebarBody, SidebarHr, SidebarItem} from '@/shared/Layout/Sidebar'
import {NoFeatureAccessPage} from '@/shared/NoFeatureAccessPage'

export const wfpDeduplicationIndex = {
  basePath: '/wfp-deduplication',
  siteMap: {
    data: '/',
    access: '/access',
  },
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
            <SidebarHr sx={{my: 2}} />
          </>
        )}
        <NavLink to={path(wfpDeduplicationIndex.siteMap.data)}>
          {({isActive}) => (
            <SidebarItem icon="list_alt" active={isActive}>
              {m.data}
            </SidebarItem>
          )}
        </NavLink>
        <NavLink to={path(wfpDeduplicationIndex.siteMap.access)}>
          {({isActive}) => (
            <SidebarItem icon="person_add" active={isActive}>
              {m.accesses}
            </SidebarItem>
          )}
        </NavLink>
      </SidebarBody>
    </Sidebar>
  )
}

export const WfpDeduplicationPage = () => {
  const {accesses, session} = useSession()
  const access = useMemo(() => appFeaturesIndex.wfp_deduplication.showIf?.(session, accesses), [session, accesses])
  useReactRouterDefaultRoute(wfpDeduplicationIndex.siteMap.data)
  if (!access) {
    return <NoFeatureAccessPage />
  }
  return (
    <Layout title={appFeaturesIndex.wfp_deduplication.name} sidebar={<WpfDeduplicationSidebar />}>
      <Routes>
        <Route path={wfpDeduplicationIndex.siteMap.data} element={<WfpDeduplicationData />} />
        <Route path={wfpDeduplicationIndex.siteMap.access} element={<WfpDeduplicationAccess />} />
      </Routes>
    </Layout>
  )
}
