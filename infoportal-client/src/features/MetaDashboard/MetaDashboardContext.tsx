import React, {ReactNode, useContext, useEffect} from 'react'
import {UseFetcher, useFetcher} from '@/shared/hook/useFetcher'
import {useAppSettings} from '@/core/context/ConfigContext'
import {UseMetaDashboardData, useMetaDashboardData} from '@/features/MetaDashboard/useMetaDashboardData'
import {map, seq} from '@alexandreannic/ts-utils'
import {ApiSdk} from '@/core/sdk/server/ApiSdk'

export type MetaDashboardContext = {
  fetcher: UseFetcher<ApiSdk['koboMeta']['search']>
  data: UseMetaDashboardData
}

const Context = React.createContext({} as MetaDashboardContext)

export const useMetaDashboardContext = () => useContext<MetaDashboardContext>(Context)

export const MetaDashboardProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const {api} = useAppSettings()
  const fetcher = useFetcher(api.koboMeta.search)
  const data = map(fetcher.get, _ => seq(_.data))
  const ctx = useMetaDashboardData(data ?? seq())

  useEffect(() => {
    fetcher.fetch()
  }, [])

  return (
    <Context.Provider value={{
      data: ctx,
      fetcher,
    }}>
      {children}
    </Context.Provider>
  )
}
