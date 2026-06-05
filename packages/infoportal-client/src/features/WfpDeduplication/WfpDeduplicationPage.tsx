import {useCallback, useMemo, useState, type FC, type Dispatch, type SetStateAction} from 'react'
import {useEffectFn} from '@alexandreannic/react-hooks-lib'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import {Box, Button} from '@mui/material'
import {NavLink, Route, Routes} from 'react-router-dom'

import {DrcOffice} from 'infoportal-common'

import {useAppSettings} from '@/core/context/ConfigContext'
import {useI18n} from '@/core/i18n'
import {useSession} from '@/core/Session/SessionContext'
import {useReactRouterDefaultRoute} from '@/core/useReactRouterDefaultRoute'
import {useIpToast} from '@/core/useToast'
import {appFeaturesIndex} from '@/features/appFeatureId'
import {WfpDeduplicationAccess} from '@/features/WfpDeduplication/WfpDeduplicationAccess'
import {WfpDeduplicationData} from '@/features/WfpDeduplication/WfpDeduplicationData'
import {useAsync} from '@/shared/hook/useAsync'
import {usePersistentState} from '@/shared/hook/usePersistantState'
import {Layout} from '@/shared/Layout'
import {Sidebar, SidebarBody, SidebarHr, SidebarItem} from '@/shared/Layout/Sidebar'
import {NoFeatureAccessPage} from '@/shared/NoFeatureAccessPage'

import FileUploadDialog from './WfpDeduplicationFileUploadDialog'

export const wfpDeduplicationIndex = {
  basePath: '/wfp-deduplication',
  siteMap: {
    data: '/',
    access: '/access',
  },
}

const WpfDeduplicationSidebar: FC<{setRerender: Dispatch<SetStateAction<boolean>>}> = ({setRerender}) => {
  const {api} = useAppSettings()
  const {session} = useSession()
  const [drcOffice, setDrcOffice] = usePersistentState<DrcOffice | undefined>(session.drcOffice, {
    storageKey: 'wfp-deduplication-office',
  })
  const [files, setFiles] = useState<File[]>([])
  const upload = useAsync(api.wfpDeduplication.uploadDeduplicationResults)
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const {m} = useI18n()
  const {toastHttpError} = useIpToast()
  const path = (page: string) => '' + page
  const toggleUploadDialog = () => setUploadDialogOpen((prev) => !prev)
  const closeUploadDialog = () => setUploadDialogOpen(false)
  const onReset = () => setFiles([])
  const onUpload = useCallback(async () => {
    if (drcOffice)
      upload
        .call({office: drcOffice, files})
        .catch(toastHttpError)
        .finally(() => {
          setRerender((prev) => !prev)
        })
    closeUploadDialog()
  }, [upload, drcOffice, files, closeUploadDialog])

  useEffectFn(upload.error, toastHttpError)

  return (
    <Sidebar headerId="app-header">
      <SidebarBody>
        <Button
          startIcon={<FileUploadIcon />}
          variant="outlined"
          loading={upload.loading}
          onClick={toggleUploadDialog}
          sx={{width: 'calc(100% - 6px)', ml: 0.75, mr: 0, mt: 0, mb: 1.5}}
          title={m.uploadDeduplicationFiles}
        >
          <Box sx={{whiteSpace: 'nowrap', overflowX: 'hidden', textOverflow: 'ellipsis'}}>
            {m.uploadDeduplicationFiles}
          </Box>
        </Button>
        <SidebarHr sx={{my: 2}} />
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
      <FileUploadDialog
        open={uploadDialogOpen}
        onClose={closeUploadDialog}
        enableOfficeSelection={session.admin ?? false}
        drcOffice={drcOffice}
        setDrcOffice={setDrcOffice}
        onReset={onReset}
        files={files}
        setFiles={setFiles}
        onUpload={onUpload}
      />
    </Sidebar>
  )
}

export const WfpDeduplicationPage = () => {
  const {accesses, session} = useSession()
  const [rerender, setRerender] = useState(false)
  const access = useMemo(() => appFeaturesIndex.wfp_deduplication.showIf?.(session, accesses), [session, accesses])

  useReactRouterDefaultRoute(wfpDeduplicationIndex.siteMap.data)

  if (!access) <NoFeatureAccessPage />

  return (
    <Layout
      title={appFeaturesIndex.wfp_deduplication.name}
      sidebar={<WpfDeduplicationSidebar setRerender={setRerender} />}
    >
      <Routes>
        <Route path={wfpDeduplicationIndex.siteMap.data} element={<WfpDeduplicationData rerender={rerender} />} />
        <Route path={wfpDeduplicationIndex.siteMap.access} element={<WfpDeduplicationAccess />} />
      </Routes>
    </Layout>
  )
}
