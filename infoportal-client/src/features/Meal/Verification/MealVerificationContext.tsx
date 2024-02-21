import React, {ReactNode, useContext, useEffect, useMemo} from 'react'
import {useAppSettings} from '@/core/context/ConfigContext'
import {ApiSdk} from '@/core/sdk/server/ApiSdk'
import {Access, AccessSum} from '@/core/sdk/server/access/Access'
import {useSession} from '@/core/Session/SessionContext'
import {useAsync, UseAsyncMultiple} from '@/shared/hook/useAsync'
import {useFetcher, UseFetcher} from '@/shared/hook/useFetcher'

export interface MealVerificationContext {
  fetcherVerifications: UseFetcher<ApiSdk['mealVerification']['getAll']>
  access: AccessSum,
  asyncUpdate: UseAsyncMultiple<ApiSdk['mealVerification']['update']>
}

const Context = React.createContext({} as MealVerificationContext)

export const useMealVerificationContext = () => useContext<MealVerificationContext>(Context)

export const MealVerificationProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const {api} = useAppSettings()
  const {session, accesses} = useSession()
  const fetcherGetAll = useFetcher(api.mealVerification.getAll)
  const asyncUpdate = useAsync(api.mealVerification.update, {requestKey: _ => _[0]})

  useEffect(() => {
    fetcherGetAll.fetch({force: true, clean: false})
  }, [asyncUpdate.callIndex])

  const access: AccessSum = useMemo(() => {
    return {
      read: true,
      write: session.admin || Access.getAccessToKobo(accesses, 'meal_verificationEcrec').write,
      admin: !!session.admin,
    }
  }, [])

  return (
    <Context.Provider value={{
      access,
      asyncUpdate,
      fetcherVerifications: fetcherGetAll,
    }}>
      {children}
    </Context.Provider>
  )
}
