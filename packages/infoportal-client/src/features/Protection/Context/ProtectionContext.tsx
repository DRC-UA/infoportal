import React, {ReactNode, useContext, useEffect, useMemo} from 'react'
import {useAppSettings} from '@/core/context/ConfigContext'
import {UseFetcher, useFetcher} from '@/shared/hook/useFetcher'
import {ProtectionActivityFlat} from '@/features/Protection/Context/protectionType'
import {seq, Seq} from '@alexandreannic/ts-utils'
import {UseProtectionFilter, useProtectionFilters} from '@/features/Protection/Context/useProtectionFilter'
import {DrcProgram, IKoboMeta} from 'infoportal-common'

export interface ProtectionContext {
  filters: Omit<UseProtectionFilter, 'data'>
  fetching: boolean
  fetcher: UseFetcher<() => Promise<Seq<IKoboMeta>>>
  data?: {
    filtered: Seq<IKoboMeta>
    all: Seq<IKoboMeta>
    flat: Seq<ProtectionActivityFlat>
    flatFiltered: Seq<ProtectionActivityFlat>
  }
}

const Context = React.createContext({} as ProtectionContext)

export const useProtectionContext = () => useContext<ProtectionContext>(Context)

export const ProtectionProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const {api} = useAppSettings()
  const reqProtection = () => api.koboMeta.search({
    activities: [
      DrcProgram.ProtectionMonitoring,
      DrcProgram.PSS,
      DrcProgram.FGD,
      DrcProgram.AwarenessRaisingSession,
      DrcProgram.CommunityLevelPm,
    ]
  }).then(_ => seq(_.data))
  const fetcher = useFetcher(reqProtection)

  const mappedData = fetcher.get

  const flatData = useMemo(() => {
    return mappedData?.flatMap(r => (r.persons ?? []).map(p => ({...r, ...p}))).compact()
  }, [mappedData])

  const filters = useProtectionFilters(mappedData, flatData)

  const flatFilteredData = useMemo(() => {
    return filters.data?.flatMap(r => (r.persons ?? []).map(p => ({...r, ...p}))).compact()
  }, [filters.data])

  useEffect(() => {
    fetcher.fetch()
  }, [])

  return (
    <Context.Provider value={{
      data: mappedData && filters.data && flatData && flatFilteredData ? {
        all: mappedData,
        filtered: filters.data,
        flat: flatData,
        flatFiltered: flatFilteredData,
      } : undefined,
      fetcher,
      fetching: fetcher.loading,
      filters,
    }}>
      {children}
    </Context.Provider>
  )
}
