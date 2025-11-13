import {useContext, useEffect, createContext, useMemo, type ReactNode} from 'react'
import {seq, type Seq} from '@axanc/ts-utils'

import {KoboXmlMapper, Protection_pss} from 'infoportal-common'

import {useAppSettings} from '@/core/context/ConfigContext'
import {UseFetcher, useFetcher} from '@/shared/hook/useFetcher'

import {usePssFilters, type UsePssFilter} from './hooks'
import type {ProtectionPssWithPersons, ProtectionPssWithPersonsFlat} from './types'

interface PssContext {
  filters: Omit<UsePssFilter, 'data'>
  fetching: boolean
  fetcher: UseFetcher<() => Promise<Seq<Protection_pss.T>>>
  data?: {
    filtered: Seq<ProtectionPssWithPersons>
    all: Seq<ProtectionPssWithPersons>
    flat: Seq<ProtectionPssWithPersonsFlat>
    flatFiltered: Seq<ProtectionPssWithPersonsFlat>
  }
}

const Context = createContext({} as PssContext)

const usePssContext = () => useContext<PssContext>(Context)

const attachRecordToEachPerson = (r: ProtectionPssWithPersons) => (r.persons ?? []).map((p) => ({...r, ...p}))

const PssContextProvider = ({children}: {children: ReactNode}) => {
  const {api} = useAppSettings()
  const apiRequest = () => api.kobo.typedAnswers.search.protection_pss().then(({data}) => seq(data))
  const fetcher = useFetcher(apiRequest)

  const data: Seq<ProtectionPssWithPersons> | undefined = fetcher.get?.map((record) => ({
    ...record,
    persons: KoboXmlMapper.Persons.protection_pss(record),
  }))

  const flatData = useMemo(() => {
    return data?.flatMap(attachRecordToEachPerson).compact()
  }, [data])

  const filters = usePssFilters(data)

  const flatFilteredData = useMemo(() => {
    return filters.data?.flatMap(attachRecordToEachPerson).compact()
  }, [filters.data])

  useEffect(() => {
    fetcher.fetch()
  }, [])

  return (
    <Context.Provider
      value={{
        data:
          data && filters.data && flatData && flatFilteredData
            ? {
                all: data,
                filtered: filters.data,
                flat: flatData,
                flatFiltered: flatFilteredData,
              }
            : undefined,
        fetcher,
        fetching: fetcher.loading,
        filters,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export {PssContextProvider, usePssContext, type PssContext}
