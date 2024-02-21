import {useEffectFn} from '@alexandreannic/react-hooks-lib'
import {KoboAnswerId} from '@/core/sdk/server/kobo/Kobo'
import {useAppSettings} from '@/core/context/ConfigContext'
import {useMemo} from 'react'
import {useAsync} from '@/shared/hook/useAsync'
import {kobo, KoboIndex} from '@infoportal-common'
import {seq} from '@alexandreannic/ts-utils'
import {useIpToast} from '@/core/useToast'
import {useFetcher} from '@/shared/hook/useFetcher'

export type UseShelterData = ReturnType<typeof useShelterData>

export const useShelterData = () => {
  const {api} = useAppSettings()
  const {toastHttpError} = useIpToast()

  const req = () => api.shelter.search().then(_ => _.data)
  const fetcher = useFetcher(req)
  useEffectFn(fetcher.error, toastHttpError)

  const index: undefined | Record<KoboAnswerId, number> = useMemo(() => {
    if (!fetcher.get) return
    return fetcher.get.reduce((acc, _, i) => {
      acc[_.id] = i
      return acc
    }, {} as Record<KoboAnswerId, number>)
    // const index: Record<'all' | 'nta' | 'ta', Record<KoboAnswerId, number>> = {
    //   all: {},
    //   nta: {},
    //   ta: {},
    // }
    // fetcher.get.forEach((_, i) => {
    //   index.all[_.id] = i
    //   if (_.nta) index.all[_.nta.id] = i
    //   if (_.ta) index.all[_.ta.id] = i
    // })
    // return index
  }, [fetcher.get])

  const fetchAll = fetcher.fetch

  const asyncSyncAnswers = useAsync(async () => {
    await Promise.all([
      api.koboApi.synchronizeAnswers(kobo.drcUa.server.prod, KoboIndex.byName('shelter_ta').id),
      api.koboApi.synchronizeAnswers(kobo.drcUa.server.prod, KoboIndex.byName('shelter_nta').id),
    ])
    await fetchAll()
  })

  return {
    loading: fetcher.loading,
    fetcher,
    fetchAll,
    asyncSyncAnswers,
    fetching: fetcher.loading,
    mappedData: seq(fetcher.get),
    index,
  } as const
}