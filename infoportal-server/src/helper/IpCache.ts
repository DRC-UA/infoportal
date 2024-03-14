import {duration, Duration, filterUndefined, hashArgs} from '@alexandreannic/ts-utils'
import {logger, Logger} from './Logger'

export interface CacheData<V> {
  lastUpdate: Date;
  expiration?: number;
  value: V;
}

export interface CacheParams<P> {
  ttl?: Duration,
  cleaningCheckupInterval?: Duration,
  ifParams?: (p: P) => boolean
}

export enum SytemCache {
  Meta = 'Meta',
}

export class GlobalCache {

  constructor(
    private cache: IpCache<IpCache<any>>,
    private log: Logger = logger('GlobalCache')
  ) {

  }

  readonly request = <T, P extends Array<any>>(key: SytemCache, fn: ((...p: P) => Promise<T>), params?: CacheParams<P>): (...p: P) => Promise<T> => {
    this.log.info(`Initialize cache ${key}.`)
    if (!this.cache.has(key)) {
      // TODO Is called twice by some black magic
      //   throw new Error(`Already registered cash ` + key)
      this.cache.set(key, new IpCache(params))
    }
    const getCache = () => {
      if (!this.cache.has(key)) {
        this.cache.set(key, new IpCache(params))
      }
      return this.cache.get(key)!
    }
    return async (...p: P) => {
      if (params?.ifParams?.(p) === false) return fn(...p)
      const argsHashed = hashArgs(p)
      const cachedValue = getCache().get(argsHashed)
      if (cachedValue === undefined) {
        const value = await fn(...p)
        getCache().set(argsHashed, value)
        return value
      }
      return cachedValue
    }
  }

  readonly clear = (key: SytemCache) => {
    this.log.info(`Reset cache ${key}.`)
    this.cache.remove(key)
  }
}

export class IpCache<V = undefined> {

  /** @deprecated preare to use GlobalCache for this app */
  static readonly request = <T, P extends Array<any>>(fn: ((...p: P) => Promise<T>), params?: CacheParams<P>): (...p: P) => Promise<T> => {
    const cache = new IpCache(params)
    return async (...p: P) => {
      if (params?.ifParams?.(p) === false) return fn(...p)
      const argsHashed = hashArgs(p)
      const cachedValue = cache.get(argsHashed)
      if (cachedValue === undefined) {
        const value = await fn(...p)
        cache.set(argsHashed, value)
        return value
      }
      return cachedValue
    }
  }

  constructor({
    ttl = duration(1, 'hour'),
    cleaningCheckupInterval = duration(2, 'day'),
  }: CacheParams<any> = {}) {
    this.ttl = ttl
    this.cleaningCheckupInterval = cleaningCheckupInterval
    this.intervalRef = setInterval(this.cleanCheckup, cleaningCheckupInterval)
  }

  private readonly ttl: Duration

  private readonly cleaningCheckupInterval: Duration

  private readonly intervalRef

  private cache: Map<string, CacheData<V>> = new Map()

  private readonly isExpired = (_: CacheData<V>) => _.expiration && _.lastUpdate.getTime() + _.expiration < new Date().getTime()

  readonly get = <T = any>(key: string): undefined | (V extends undefined ? T : V) => {
    const data = this.cache.get(key)
    if (data) {
      if (this.isExpired(data)) {
        this.remove(key)
      } else {
        return data.value as any
      }
    }
  }

  readonly getAll = (): (V extends undefined ? any : V)[] => {
    this.cleanCheckup()
    return filterUndefined(Array.from(this.cache.values()).map(_ => _.value)) as any
  }

  readonly getAllKeys = (): string[] => {
    this.cleanCheckup()
    return Array.from(this.cache.keys())
  }

  readonly set = <T = any>(key: string, value: V extends undefined ? T : V, ttl?: Duration): void => {
    this.cache.set(key, {
      // @ts-ignore
      value,
      expiration: ttl || this.ttl,
      lastUpdate: new Date(),
    })
  }

  readonly has = (key: string): boolean => this.cache.has(key)

  readonly remove = (key: string): void => {
    this.cache.delete(key)
  }

  readonly removeAll = (): void => {
    this.cache = new Map()
  }

  private cleanCheckup = () => {
    this.cache.forEach((data: CacheData<V>, key: string) => {
      if (this.isExpired(data)) {
        this.remove(key)
      }
    })
  }
}
