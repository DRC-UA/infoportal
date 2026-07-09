import {useEffect, useState} from 'react'
import {seq, match, Obj, type Seq} from '@axanc/ts-utils'
import {endOfMonth, startOfMonth, subMonths} from 'date-fns'

import {
  DrcSector,
  groupBy,
  KoboIndex,
  KoboMetaStatus,
  Ecrec_vet_bha388,
  Ecrec_msmeGrantReg,
  Ecrec_subsistance,
  Period,
  IKoboMeta,
  DrcProgram,
} from 'infoportal-common'

import {useAppSettings} from '@/core/context/ConfigContext'
import {AiMapper, type Bundle} from '@/features/ActivityInfo/shared'
import {useFetcher} from '@/shared/hook/useFetcher'

import {ecrecMapper} from './ecrecMapper'

const useEcrecData = () => {
  const {api} = useAppSettings()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<Bundle[]>([])
  const [metaData, setMetaData] = useState<IKoboMeta[]>([])
  const [amountsData, setAmountsData] = useState<Record<string, number>>({})
  const [columns, setColumns] = useState<Seq<{key: string; type: string}>>(seq([]))
  const [period, setPeriod] = useState<Partial<Period>>({
    start: startOfMonth(subMonths(new Date(), 1)),
    end: endOfMonth(subMonths(new Date(), 1)),
  })

  // create fetcher for Meta data
  const metaFetcher = useFetcher(
    async () =>
      await api.koboMeta
        .search({
          activities: [DrcProgram.SectoralCashForAgriculture, DrcProgram.SectoralCashMixed],
          sectors: [DrcSector.Livelihoods],
          status: [KoboMetaStatus.Committed],
          ...period,
        })
        .then(({data}) => setMetaData(data)),
  )

  // Meta data lacks amounts paid, so load Kobo data for selected IDs
  useEffect(() => {
    const formAndKoboIds = groupBy({
      data: metaData ?? [],
      groups: [{by: ({formId}) => formId}],
      finalTransform: (data) => data.map(({koboId}) => koboId),
    }).groups

    Promise.all(
      Object.entries(formAndKoboIds).map(([formId, koboIds]) => {
        api.kobo.answer
          .search({
            formId,
            filters: {
              ids: koboIds,
            },
          })
          .then(({data}) => {
            if (formId === KoboIndex.byName('ecrec_subsistance').id) {
              setAmountsData((before) => ({
                ...before,
                ...Object.fromEntries(
                  (data as unknown as (Ecrec_subsistance.T & {id: string})[]).map(({id, cal_amount}) => [
                    [id],
                    [Number(cal_amount ?? 0)],
                  ]),
                ),
              }))
            }

            if (formId === KoboIndex.byName('ecrec_msmeGrantReg').id) {
              setAmountsData((before) => ({
                ...before,
                ...Object.fromEntries(
                  (data as unknown as (Ecrec_msmeGrantReg.T & {id: string})[]).map(({id, amount_payment}) => [
                    [id],
                    [Number(amount_payment ?? 0)],
                  ]),
                ),
              }))
            }
          })
      }),
    ).finally(() => {
      setLoading(false)
    })
  }, [metaData])

  // augment Meta data with amounts on change of kodo data and set the final data and columns to render the table
  useEffect(() => {
    if (loading) return

    const data = metaData.map(({koboId, formId, ...record}) => {
      return {
        koboId,
        formId,
        amount: match(formId)
          .cases({[KoboIndex.byName('ecrec_subsistance').id]: amountsData[koboId] ?? 0})
          .default(0),
        ...record,
      }
    })

    ecrecMapper({
      data,
      period: AiMapper.getPeriodStr(period),
    }).then((aiBundles) => {
      setData(aiBundles)
      setColumns(
        seq(aiBundles)
          .flatMap(({activity}) => Obj.keys(activity))
          .distinct((key) => key)
          .map((key) => ({
            key,
            type: aiBundles?.some(({activity}) => typeof activity[key] === 'number') ? 'number' : 'select_one',
          })),
      )
    })
  }, [loading, metaData, amountsData])

  // fetch Meta data on period change, including the first render
  useEffect(() => {
    metaFetcher.fetch()
  }, [period.start, period.end])

  return {
    loading,
    data,
    columns,
    period,
    setPeriod,
  }
}

export {useEcrecData}
