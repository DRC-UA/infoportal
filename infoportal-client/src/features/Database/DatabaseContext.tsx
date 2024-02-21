import React, {ReactNode, useContext, useEffect, useMemo} from 'react'
import {useAppSettings} from '@/core/context/ConfigContext'
import {ApiSdk} from '@/core/sdk/server/ApiSdk'
import {useEffectFn} from '@alexandreannic/react-hooks-lib'
import {useIpToast} from '@/core/useToast'
import {Access} from '@/core/sdk/server/access/Access'
import {AppFeatureId} from '@/features/appFeatureId'
import {useSession} from '@/core/Session/SessionContext'
import {KoboForm, KoboId} from '@/core/sdk/server/kobo/Kobo'
import {seq} from '@alexandreannic/ts-utils'
import {KoboFormSdk} from '@/core/sdk/server/kobo/KoboFormSdk'
import {useFetcher, UseFetcher} from '@/shared/hook/useFetcher'

export interface DatabaseContext {
  _forms: UseFetcher<ApiSdk['kobo']['form']['getAll']>
  isAdmin?: boolean
  getForm: (_: KoboId) => KoboForm | undefined
  formAccess?: KoboForm[]
  // servers: UseFetcher<ApiSdk['kobo']['server']['getAll']>
}

export const Context = React.createContext({} as DatabaseContext)

export const useDatabaseContext = () => useContext(Context)

export const DatabaseProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const {session, accesses} = useSession()
  const {api} = useAppSettings()
  const _forms = useFetcher(() => api.kobo.form.getAll().then(_ => seq(_).sortByString(_ => KoboFormSdk.parseFormName(_.name).program ?? '')) as Promise<KoboForm[]>)
  const {toastHttpError} = useIpToast()

  const getForm = useMemo(() => {
    const index = seq(_forms.get).reduceObject<Record<KoboId, KoboForm>>(_ => [_.id, _])
    return (_: KoboId) => index[_]
  }, [_forms.get])
  // const servers = useFetcher(() => api.kobo.server.getAll())

  // useEffect(() => {
  //   servers.fetch()
  // }, [])
  useEffect(() => {
    _forms.fetch()
  }, [])

  const koboAccesses = useMemo(() => {
    return accesses.filter(Access.filterByFeature(AppFeatureId.kobo_database)).map(_ => _.params?.koboFormId)
  }, [accesses])

  const formAccess = useMemo(() => {
    return _forms.get?.filter(_ => session.admin || koboAccesses.includes(_.id))
  }, [koboAccesses, _forms.get])

  useEffectFn(_forms.error, toastHttpError)

  return (
    <Context.Provider value={{
      _forms,
      isAdmin: session.admin,
      formAccess,
      getForm,
    }}>
      {children}
    </Context.Provider>
  )
}
