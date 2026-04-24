import {useEffect, useState} from 'react'
import {seq, Obj, type Seq} from '@axanc/ts-utils'
import {endOfMonth, startOfMonth} from 'date-fns'

import {type Period, DrcProgram, KoboMetaStatus} from 'infoportal-common'

import {useAppSettings} from '@/core/context/ConfigContext'
import {useFetcher} from '@/shared/hook/useFetcher'

import {AiMapper} from '../shared/AiMapper'

import {mapVictimAssistance, type Bundle} from './utils'

const useMetaFetcher = (drcPrograms: DrcProgram[]) => {
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
        .then(({data}) => data),
  )

  useEffect(() => {
    fetcher.fetch()
  }, [period.start, period.end])

  useEffect(() => {
    setColumns(
      seq(data)
        .flatMap((row) => Obj.keys(row.activity))
        .distinct((key) => key)
        .map((key) => ({
          key,
          type: data?.some(({activity}) => typeof activity[key] === 'number') ? 'number' : 'select_one',
        })),
    )
  }, [data])

  return {fetcher, period, setPeriod, data, setData, columns}
}

const useVaDataColumns = () => {
  const {fetcher, period, setPeriod, data, setData, columns} = useMetaFetcher([DrcProgram.TIA])

  useEffect(() => {
    mapVictimAssistance(fetcher.get ?? [], AiMapper.getPeriodStr(period)).then((result) => {
      setData(result)
    })
  }, [fetcher.get])

  return {
    data,
    columns,
    period,
    setPeriod,
    loading: fetcher.loading,
  }
}

export {useVaDataColumns}
