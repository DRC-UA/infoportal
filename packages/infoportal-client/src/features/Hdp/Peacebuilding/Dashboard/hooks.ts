import {useEffect, useMemo, useState} from 'react'
import {map, seq} from '@axanc/ts-utils'

import {KoboIndex, Period, PeriodHelper, Cs_tracker} from 'infoportal-common'

import {appConfig} from '@/conf/AppConfig'
import {useAppSettings} from '@/core/context/ConfigContext'
import {useI18n} from '@/core/i18n'
import {InferTypedAnswer} from '@/core/sdk/server/kobo/KoboTypedAnswerSdk'
import {DataFilter} from '@/shared/DataFilter/DataFilter'
import {useFetcher} from '@/shared/hook/useFetcher'
import {startOfDay} from 'date-fns'

export type UsePeacebuildingData = ReturnType<typeof usePeacebuildingData>

export const usePeacebuildingData = () => {
  const {m} = useI18n()
  const {api} = useAppSettings()
  const fetcherAnswer = useFetcher(() => api.kobo.typedAnswers.search.cs_tracker())
  const fetcherPrePost = useFetcher(() => api.kobo.typedAnswers.search.conflict_pre_post())
  const fetcherPeriod = useFetcher(() => api.kobo.answer.getPeriod(KoboIndex.byName('cs_tracker').id))

  const filterShape = useMemo(
    () =>
      DataFilter.makeShape<InferTypedAnswer<'cs_tracker'>>({
        office: {
          icon: appConfig.icons.office,
          getValue: (_) => _.location,
          getOptions: () => DataFilter.buildOptionsFromObject(Cs_tracker.options.office),
          label: m.office,
        },
        format: {
          icon: 'share',
          getValue: (_) => _.training_format,
          getOptions: () => DataFilter.buildOptionsFromObject(Cs_tracker.options.training_format),
          label: m.format,
        },
        project: {
          icon: appConfig.icons.project,
          getValue: (_) => _.project_code,
          getOptions: () => DataFilter.buildOptionsFromObject(Cs_tracker.options.project_code),
          label: m.project,
        },
      }),
    [m],
  )
  const [optionFilter, setOptionFilters] = useState<DataFilter.InferShape<typeof filterShape>>({})
  const [period, setPeriod] = useState<Partial<Period>>({})

  const data = seq(fetcherAnswer.get?.data) ?? []

  const dataPrePost = useMemo(() => {
    return seq(fetcherPrePost.get?.data)
      .filter((row) => row.cal_score && row.complete_training)
      .map((row) => ({
        ...row,
        cal_score_num: Number(row.cal_score),
      }))
      .compact()
      .get()
  }, [fetcherPrePost.get?.data])

  const normalizeDate = (d?: Date) => (d ? startOfDay(d) : undefined)

  const dataFiltered = useMemo(() => {
    const normalizedStart = normalizeDate(period.start)
    const normalizedEnd = normalizeDate(period.end)

    const filtered = DataFilter.filterData(data, filterShape, optionFilter).filter((_) => {
      const entryDate = normalizeDate(_.start)
      const isInRange = PeriodHelper.isDateIn({start: normalizedStart, end: normalizedEnd}, entryDate)
      return isInRange
    })

    return filtered
  }, [data, filterShape, optionFilter, period])

  useEffect(() => {
    map(fetcherPeriod.get, setPeriod)
  }, [fetcherPeriod.get])

  const fetcherUsers = useFetcher(api.user.getCount)

  useEffect(() => {
    fetcherUsers.fetch({clean: false})
  }, [])

  useEffect(() => {
    fetcherUsers.fetch({clean: false})
  }, [])

  return {
    data,
    dataPrePost,
    dataFiltered,
    filterShape,
    fetcherAnswer,
    fetcherPrePost,
    fetcherPeriod,
    fetcherUsers,
    optionFilter,
    setOptionFilters,
    period,
    setPeriod,
  }
}
