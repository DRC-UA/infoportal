import React, {Dispatch, ReactNode, SetStateAction, useCallback, useContext, useEffect, useState} from 'react'
import {useEffectFn} from '@alexandreannic/react-hooks-lib'
import {useI18n} from '@/core/i18n'
import {useAppSettings} from '@/core/context/ConfigContext'
import {UserSession} from '@/core/sdk/server/session/Session'
import {mapPromise} from '@alexandreannic/ts-utils'
import {Box, CircularProgress} from '@mui/material'
import {useIpToast} from '@/core/useToast'
import {Access} from '@/core/sdk/server/access/Access'
import {SessionLoginForm} from '@/core/Session/SessionLoginForm'
import {SessionInitForm} from '@/core/Session/SessionInitForm'
import {CenteredContent} from '@/shared/CenteredContent'
import {Fender} from 'mui-extension'
import {IpIconBtn} from '@/shared/IconBtn'
import {useFetcher} from '@/shared/hook/useFetcher'
import {useAsync} from '@/shared/hook/useAsync'

export interface SessionContext {
  session: UserSession
  accesses: Access[]
  logout: () => void
  setSession: Dispatch<SetStateAction<UserSession | undefined>>
}

export const Context = React.createContext({} as SessionContext)

export const useSession = () => useContext(Context)

export const SessionProvider = ({
  children,
  adminOnly
}: {
  adminOnly?: boolean
  children: ReactNode
}) => {
  const {m} = useI18n()
  const {toastError} = useIpToast()
  const {api} = useAppSettings()
  const [session, setSession] = useState<UserSession | undefined>()
  const [isInitialLoading, setIsInitialLoading] = useState(true)

  const _access = useFetcher<any>(api.access.searchForConnectedUser)
  const _revertConnectAs = useAsync<any>(async () => {
    const session = await api.session.revertConnectAs()
    setSession(session)
  })

  const _getSession = useAsync(mapPromise({
    promise: api.session.get,
    mapThen: setSession,
  }))

  const logout = useCallback(() => {
    api.session.logout()
    setSession(undefined)
  }, [])

  useEffect(() => {
    if (session?.email)
      _access.fetch({force: true, clean: true})
  }, [session?.email, session?.drcOffice, session?.drcJob])

  useEffect(() => {
    _getSession.call()
    setIsInitialLoading(false)
  }, [])

  useEffectFn(_getSession.error, () => toastError(m.youDontHaveAccess))

  if (_getSession.loading || _access.loading) {
    return (
      <CenteredContent>
        <CircularProgress/>
      </CenteredContent>
    )
  }
  if (!session || !_access.get) {
    return (
      <CenteredContent>
        <SessionLoginForm setSession={setSession}/>
      </CenteredContent>
    )
  }
  if (adminOnly && !session.admin) {
    return (
      <CenteredContent>
        <Fender type="error"/>
      </CenteredContent>
    )
  }
  return (
    !session.drcOffice ? (
      <CenteredContent>
        <SessionInitForm
          user={session}
          onChangeAccount={logout}
          onSelectOffice={drcOffice => setSession(prev => prev && ({...prev, drcOffice: drcOffice}))}
        />
      </CenteredContent>
    ) : (
      <Context.Provider value={{
        session,
        setSession,
        accesses: _access.get,
        logout,
      }}>
        {session.originalEmail && (
          <Box sx={{px: 2, py: .25, background: t => t.palette.background.paper}}>
            Connected as <b>{session.email}</b>. Go back as <b>{session.originalEmail}</b>
            <IpIconBtn loading={_revertConnectAs.loading} onClick={_revertConnectAs.call} color="primary">logout</IpIconBtn>
          </Box>
        )}
        {children}
      </Context.Provider>
    )
  )
}
