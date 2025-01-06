import React, {ReactNode, useCallback, useContext, useEffect} from 'react'
import {useAppSettings} from '@/core/context/ConfigContext'
import {useSession} from '@/core/Session/SessionContext'
import {UsePartnershipData, usePartnershipData} from '@/features/Partnership/usePartnershipData'

export interface PartnershipContext {
  data: UsePartnershipData
  fetchAll: () => Promise<void>
}

const Context = React.createContext({} as PartnershipContext)

export const usePartnershipContext = () => useContext<PartnershipContext>(Context)

export const PartnershipProvider = ({children}: {children: ReactNode}) => {
  const {api} = useAppSettings()
  const {session, accesses} = useSession()

  const data = usePartnershipData()

  const fetchAll = useCallback(async () => {
    data.fetcherPartnersDb.fetch()
  }, [])

  useEffect(() => {
    fetchAll()
  }, [])

  return (
    <Context.Provider
      value={{
        data,
        fetchAll,
      }}
    >
      {children}
    </Context.Provider>
  )
}
