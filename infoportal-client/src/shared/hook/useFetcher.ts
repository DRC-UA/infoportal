import {Dispatch, SetStateAction, useRef, useState} from 'react'

export type Func<R = any> = (...args: any[]) => R

export type Fetch<T extends Func<Promise<FetcherResult<T>>>> = (p?: {force?: boolean, clean?: boolean}, ..._: Parameters<T>) => ReturnType<T>;

export interface FetchParams {
  force?: boolean,
  clean?: boolean
}

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T

type FetcherResult<T extends Func> = ThenArg<ReturnType<T>>

export type UseFetcher<F extends Func<Promise<FetcherResult<F>>>, E = any> = {
  get?: FetcherResult<F>,
  set: Dispatch<SetStateAction<FetcherResult<F> | undefined>>,
  loading: boolean,
  error?: E
  fetch: Fetch<F>,
  callIndex: number
  clearCache: () => void,
};

/**
 * Factorize fetching logic which goal is to prevent unneeded fetchs and expose loading indicator + error status.
 */
export const useFetcher = <F extends Func<Promise<any>>, E = any>(
  fetcher: F,
  {
    initialValue,
    mapError = _ => _,
  }: {
    initialValue?: FetcherResult<F>,
    mapError?: (_: any) => E
  } = {}
): UseFetcher<F, E> => {
  const [entity, setEntity] = useState<FetcherResult<F> | undefined>(initialValue)
  const [error, setError] = useState<E | undefined>()
  const [loading, setLoading] = useState<boolean>(false)
  const [callIndex, setCallIndex] = useState(0)
  const fetch$ = useRef<Promise<FetcherResult<F>>>()

  const fetch = ({force = true, clean = true}: FetchParams = {}, ...args: any[]): Promise<FetcherResult<F>> => {
    if (!force) {
      if (fetch$.current) {
        return fetch$.current!
      }
      if (entity) {
        return Promise.resolve(entity)
      }
    } else {
      fetch$.current = undefined
    }
    if (clean) {
      setError(undefined)
      setEntity(undefined)
    }
    setLoading(true)
    fetch$.current = fetcher(...args)
    fetch$.current
      .then((x: FetcherResult<F>) => {
        setCallIndex(_ => _ + 1)
        setLoading(false)
        setEntity(x)
        fetch$.current = undefined
      })
      .catch((e) => {
        setCallIndex(_ => _ + 1)
        setLoading(false)
        fetch$.current = undefined
        setError(mapError(e))
        setEntity(undefined)
        // return Promise.reject(e)
        throw e
      })
    return fetch$.current
  }

  const clearCache = () => {
    setEntity(undefined)
    setError(undefined)
    fetch$.current = undefined
  }

  return {
    get: entity,
    set: setEntity,
    loading,
    error,
    callIndex,
    // TODO(Alex) not sure the error is legitimate
    fetch: fetch as any,
    clearCache
  }
}
