import React, {ReactNode, useContext, useEffect, useMemo} from 'react'
import {useAppSettings} from '@/core/context/ConfigContext'
import {UseFetcher, useFetcher} from '@/shared/hook/useFetcher'
import {ProtectionActivity, ProtectionActivityFlat} from '@/features/Protection/Context/protectionType'
import {Seq, seq} from '@alexandreannic/ts-utils'
import {ProtectionDataHelper} from '@/features/Protection/Context/protectionDataHelper'
import {UseProtectionFilter, useProtectionFilters} from '@/features/Protection/Context/useProtectionFilter'
import {KoboUnwrapAnswer} from '@/core/sdk/server/kobo/KoboTypedAnswerSdk'

export interface ProtectionContext {
  filters: Omit<UseProtectionFilter, 'data'>
  fetching: boolean
  fetcherGbv: UseFetcher<() => Promise<KoboUnwrapAnswer<'searchProtection_gbv'>[]>>
  fetcherPss: UseFetcher<() => Promise<KoboUnwrapAnswer<'searchProtection_pss'>[]>>
  fetcherHhs: UseFetcher<() => Promise<KoboUnwrapAnswer<'searchProtection_hhs3'>[]>>
  fetcherGroupSession: UseFetcher<() => Promise<KoboUnwrapAnswer<'searchProtection_groupSession'>[]>>
  data?: {
    filtered: Seq<ProtectionActivity>
    all: Seq<ProtectionActivity>
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
  const reqGbv = () => api.kobo.typedAnswers.searchProtection_gbv().then(_ => _.data)
  const reqPss = () => api.kobo.typedAnswers.searchProtection_pss().then(_ => _.data)
  const reqHhs = () => api.kobo.typedAnswers.searchProtection_hhs3().then(_ => _.data)
  const reqGroupSession = () => api.kobo.typedAnswers.searchProtection_groupSession().then(_ => _.data)
  const fetcherGbv = useFetcher(reqGbv)
  const fetcherPss = useFetcher(reqPss)
  const fetcherHhs = useFetcher(reqHhs)
  const fetcherGroupSession = useFetcher(reqGroupSession)

  const allFetchers = [fetcherGbv, fetcherPss, fetcherHhs, fetcherGroupSession]
  const fetched = allFetchers.reduce((acc, _) => acc + _.callIndex, 0)
  const fetching = !!allFetchers.find(_ => _.loading)

  const mappedData = useMemo(() => {
    if (allFetchers.find(_ => _.get === undefined)) return
    const res: Seq<ProtectionActivity> = seq()
    res.push(...fetcherGbv.get?.map(ProtectionDataHelper.mapGbv) ?? [])
    res.push(...fetcherPss.get?.map(ProtectionDataHelper.mapPss) ?? [])
    res.push(...fetcherGroupSession.get?.map(ProtectionDataHelper.mapGroupSession) ?? [])
    res.push(...fetcherHhs.get
      ?.filter(_ => _.have_you_filled_out_this_form_before === 'no' && _.present_yourself === 'yes')
      .map(ProtectionDataHelper.mapHhs) ?? [])
    return res
  }, [fetched])

  const flatData = useMemo(() => {
    return mappedData?.flatMap(r => (r.persons ?? []).map(p => ({...p, ...r}))).compact()
  }, [mappedData])

  const filters = useProtectionFilters(mappedData, flatData)

  const flatFilteredData = useMemo(() => {
    return filters.data?.flatMap(r => (r.persons ?? []).map(p => ({...p, ...r}))).compact()
  }, [filters.data])

  useEffect(() => {
    allFetchers.forEach(_ => _.fetch({}))
  }, [])

  return (
    <Context.Provider value={{
      fetcherGbv,
      fetcherPss,
      fetcherHhs,
      data: mappedData && filters.data && flatData && flatFilteredData ? {
        all: mappedData,
        filtered: filters.data,
        flat: flatData,
        flatFiltered: flatFilteredData,
      } : undefined,
      fetcherGroupSession,
      fetching,
      filters,
    }}>
      {children}
    </Context.Provider>
  )
}
