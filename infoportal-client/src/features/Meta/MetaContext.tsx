import React, {ReactNode, useContext, useEffect} from 'react'
import {UseFetcher, useFetcher} from '@/shared/hook/useFetcher'
import {useAppSettings} from '@/core/context/ConfigContext'
import {useMetaDashboardData, UseMetaData} from '@/features/Meta/useMetaData'
import {map, seq} from '@alexandreannic/ts-utils'
import {ApiSdk} from '@/core/sdk/server/ApiSdk'

export type MetaContext = {
  fetcher: UseFetcher<ApiSdk['koboMeta']['search']>
  data: UseMetaData
}

const Context = React.createContext({} as MetaContext)

export const useMetaContext = () => useContext<MetaContext>(Context)

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
