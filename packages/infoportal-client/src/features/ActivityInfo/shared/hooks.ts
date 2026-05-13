import {useEffect, useMemo, useState} from 'react'
import {seq, Obj, type Seq} from '@axanc/ts-utils'
import {endOfMonth, startOfMonth, subMonths, isDate} from 'date-fns'

import {
  DrcProgram,
  DrcSector,
  IKoboMeta,
  KoboMetaStatus,
  PeriodHelper,
  Bn_rapidResponse2,
  type Period,
  type KoboSubmissionFlat,
  type KoboTagStatus,
} from 'infoportal-common'

import {useAppSettings} from '@/core/context/ConfigContext'
import {useFetcher} from '@/shared/hook/useFetcher'

import {AiMapper, type Bundle} from '@/features/ActivityInfo/shared'

const useMetaFetcher = ({
  sectors,
  activities,
  status = [KoboMetaStatus.Committed],
  mapper,
}: {
  sectors?: DrcSector[]
  activities?: DrcProgram[]
  status?: KoboMetaStatus[]
  mapper: (args: {data: IKoboMeta[]; period: string}) => Promise<Bundle[]>
}) => {
  const [data, setData] = useState<Bundle[]>([])
  const [columns, setColumns] = useState<Seq<{key: string; type: string}>>(seq([]))
  const [period, setPeriod] = useState<Partial<Period>>({
    start: startOfMonth(subMonths(new Date(), 1)),
    end: endOfMonth(subMonths(new Date(), 1)),
  })
  const {api} = useAppSettings()
  const fetcher = useFetcher(
    async () =>
      await api.koboMeta
        .search({
          sectors,
          activities,
          status,
          ...period,
        })
        .then(async ({data}) => {
          setData(await mapper({data, period: AiMapper.getPeriodStr(period)}))
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

const useKoboFetcher = ({mapper}: {mapper: (args: {data: any[]; period: string}) => Promise<Bundle[]>}) => {
  const {api} = useAppSettings()
  const [period, setPeriod] = useState<Partial<Period>>({
    start: startOfMonth(subMonths(new Date(), 1)),
    end: endOfMonth(subMonths(new Date(), 1)),
  })
  const [data, setData] = useState<KoboSubmissionFlat<Bn_rapidResponse2.T, KoboTagStatus>[]>([])
  const [filteredMappedData, setFilteredMappedData] = useState<Bundle[]>([])
  const [columns, setColumns] = useState<Seq<{key: string; type: string}>>(seq([]))
  const bnFetcher = useFetcher(async () => {
    await api.kobo.typedAnswers.search.bn_rapidResponse2().then(({data}) => {
      setData(data)
    })
  })

  useEffect(() => {
    const filteredRawData = data.filter(({tags}) => {
      return (
        tags?.status === 'Paid' &&
        isDate(tags?.lastStatusUpdate) &&
        PeriodHelper.isDateIn(period, tags.lastStatusUpdate)
      )
    })

    mapper({data: filteredRawData, period: AiMapper.getPeriodStr(period)}).then((result) => {
      setFilteredMappedData(result)
      setColumns(
        seq(result)
          .flatMap(({activity}) => Obj.keys(activity))
          .distinct((key) => key)
          .map((key) => ({
            key,
            type: result?.some(({activity}) => typeof activity[key] === 'number') ? 'number' : 'select_one',
          })),
      )
    })
  }, [data, period])

  useEffect(() => {
    bnFetcher.fetch()
  }, [])

  return {
    columns,
    data: filteredMappedData,
    loading: bnFetcher.loading,
    period,
    setPeriod,
  }
}

export {useMetaFetcher, useKoboFetcher}
