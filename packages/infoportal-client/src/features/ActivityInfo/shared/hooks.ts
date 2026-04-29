import {useEffect, useState} from 'react'
import {seq, Obj, type Seq} from '@axanc/ts-utils'
import {endOfMonth, startOfMonth} from 'date-fns'

import {DrcProgram, IKoboMeta, KoboMetaStatus, type Period} from 'infoportal-common'

import {useAppSettings} from '@/core/context/ConfigContext'
import {useFetcher} from '@/shared/hook/useFetcher'

import {AiMapper, type Bundle} from '@/features/ActivityInfo/shared'

const useMetaFetcher = (
  drcPrograms: DrcProgram[],
  mapper: (data: IKoboMeta[], period: string) => Promise<Bundle[]>,
) => {
  const today = new Date()
  const [data, setData] = useState<Bundle[]>([])
  const [columns, setColumns] = useState<Seq<{key: string; type: string}>>(seq([]))
  const [period, setPeriod] = useState<Partial<Period>>({
    start: startOfMonth(today),
    end: endOfMonth(today),
  })
  const {api} = useAppSettings()
  const fetcher = useFetcher(
    async () =>
      await api.koboMeta
        .search({
          activities: drcPrograms,
          status: [KoboMetaStatus.Committed],
          ...period,
        })
        .then(async ({data}) => {
          setData(await mapper(data, AiMapper.getPeriodStr(period)))
        }),
  )

  useEffect(() => {
    fetcher.fetch()
  }, [period.start, period.end])

  useEffect(() => {
    setColumns(
      seq(data)
        .flatMap(({activity}) => Obj.keys(activity))
        .distinct((key) => key)
        .map((key) => ({
          key,
          type: data?.some(({activity}) => typeof activity[key] === 'number') ? 'number' : 'select_one',
        })),
    )
  }, [data])

  return {fetcher, period, setPeriod, data, setData, columns}
}

export {useMetaFetcher}
