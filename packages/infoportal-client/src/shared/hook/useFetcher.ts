import {Dispatch, SetStateAction, useMemo, useRef, useState} from 'react'

export type Func<R = any> = (...args: any[]) => R

export type Fetch<T extends Func<Promise<FetcherResult<T>>>> = (
  p?: {force?: boolean; clean?: boolean},
  ..._: Parameters<T>
) => ReturnType<T>

export interface FetchParams {
  force?: boolean
  clean?: boolean
}

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T

type FetcherResult<T extends Func> = ThenArg<ReturnType<T>>

export type UseFetcher<F extends Func<Promise<FetcherResult<F>>>, E = any> = {
  get?: FetcherResult<F>
  set: Dispatch<SetStateAction<FetcherResult<F> | undefined>>
  loading: boolean
  error?: E
  fetch: Fetch<F>
  callIndex: number
  clearCache: () => void
}

/**
 * Factorize fetching logic which goal is to prevent unneeded fetchs and expose loading indicator + error status.
 */
export const useFetcher = <F extends Func<Promise<any>>, E = any>(
  fetcher: F,
  {
    initialValue,
    mapError = (_) => _,
  }: {
    initialValue?: FetcherResult<F>
    mapError?: (_: any) => E
  } = {},
) => {
  const [entity, setEntity] = useState<FetcherResult<F> | undefined>(initialValue)
  const [error, setError] = useState<E | undefined>()
  const [loading, setLoading] = useState<boolean>(false)
  const [callIndex, setCallIndex] = useState(0)
  const fetch$ = useRef<{queryRef: number; query?: Promise<undefined | FetcherResult<F>>}>({
    queryRef: 0,
  })

  const clear = () => {
    setError(undefined)
    setEntity(undefined)
  }

  const fetch = (
    {force = true, clean = true}: FetchParams = {},
    ...args: Parameters<F>
  ): Promise<undefined | FetcherResult<F>> => {
    fetch$.current.queryRef += 1
    const currQueryRef = fetch$.current.queryRef
    setCallIndex((prev) => prev + 1)

    if (!force) {
      if (fetch$.current.query) {
        return fetch$.current.query // Return existing in-flight request
      }
      if (entity) {
        return Promise.resolve(entity)
      }
    } else {
      fetch$.current.query = undefined
    }

    if (clean) {
      clear()
    }

    setLoading((_) => {
      if (currQueryRef === fetch$.current.queryRef) return true
      return _
    })

    const promise = fetcher(...args)
      .then((x: FetcherResult<F>) => {
        if (currQueryRef === fetch$.current.queryRef) {
          setEntity(x)
          setLoading(false)
        }
        fetch$.current.query = undefined
        return x
      })
      .catch((e) => {
        if (currQueryRef === fetch$.current.queryRef) {
          setEntity(undefined)
          setError(mapError(e))
          setLoading(false)
        }
        fetch$.current.query = undefined
        return undefined
      })

    fetch$.current.query = promise
    return promise
  }

  const clearCache = () => {
    setEntity(undefined)
    setError(undefined)
    fetch$.current.query = undefined
  }

  return useMemo(
    () => ({
      get: entity,
      set: setEntity,
      loading,
      error,
      callIndex,
      fetch,
      clearCache,
    }),
    [entity, error, loading, callIndex],
  )
}
