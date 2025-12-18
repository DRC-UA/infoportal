import {useContext, useEffect, createContext, useMemo, type ReactNode} from 'react'
import {seq, type Seq} from '@axanc/ts-utils'

import {Cbp_pre_post} from 'infoportal-common'

import {useAppSettings} from '@/core/context/ConfigContext'
import {UseFetcher, useFetcher} from '@/shared/hook/useFetcher'

import {useCbpFilters, type UseCbpFilter} from './hooks'

interface CbpContext {
  filters: Omit<UseCbpFilter, 'data'>
  fetching: boolean
  fetcher: UseFetcher<() => Promise<Seq<Cbp_pre_post.T>>>
  data?: {
    filtered: Seq<Cbp_pre_post.T>
    raw: Seq<Cbp_pre_post.T>
    scored: Seq<Cbp_pre_post.T>
    counter: {
      pre: Set<string | undefined>
      post: Set<string | undefined>
    }
  }
}

const Context = createContext({} as CbpContext)

const useCbpContext = () => useContext<CbpContext>(Context)

const PssContextProvider = ({children}: {children: ReactNode}) => {
  const {api} = useAppSettings()
  const apiRequest = () => api.kobo.typedAnswers.search.cbp_pre_post().then(({data}) => seq(data))
  const fetcher = useFetcher(apiRequest)

  const data: Seq<Cbp_pre_post.T> | undefined = fetcher.get

  const filters = useCbpFilters(data)

  useEffect(() => {
    fetcher.fetch()
  }, [])

  return (
    <Context.Provider
      value={{
        data:
          data && filters.data && filters.scoredData
            ? {
                raw: data,
                filtered: filters.data,
                scored: filters.scoredData,
                counter: filters.counter,
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

export {PssContextProvider, useCbpContext, type CbpContext}
