import React, {Dispatch, ReactNode, SetStateAction, useContext, useEffect, useMemo, useState} from 'react'
import {KoboAnswerFlat, KoboAnswerId, KoboIndex, Meal_cashPdm, Period} from 'infoportal-common'
import {map, seq, Seq} from '@alexandreannic/ts-utils'
import {useAppSettings} from '@/core/context/ConfigContext'
import {useFetcher, UseFetcher} from '@/shared/hook/useFetcher'
import {InferTypedAnswer} from '@/core/sdk/server/kobo/KoboTypedAnswerSdk'

export interface MealPdmContext {
  fetcherAnswers: UseFetcher<(filter: Partial<Period>) => Promise<Seq<InferTypedAnswer<'meal_cashPdm'>>>>
  fetcherPeriod: UseFetcher<() => Promise<Period>>
  periodFilter: Partial<Period>
  setPeriodFilter: Dispatch<SetStateAction<Partial<Period>>>
  answersIndex?: Record<KoboAnswerId, KoboAnswerFlat<Meal_cashPdm.T, any>>
}

const Context = React.createContext({} as MealPdmContext)

export const useMealPdmContext = () => useContext<MealPdmContext>(Context)

export const MealPdmProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const {api} = useAppSettings()
  const [periodFilter, setPeriodFilter] = useState<Partial<Period>>({})

  const request = (filter: Partial<Period>) => api.kobo.typedAnswers.search.meal_cashPdm({
    filters: {
      start: filter.start,
      end: filter.end,
    }
  }).then(_ => seq(_.data))

  const fetcherPeriod = useFetcher(() => api.kobo.answer.getPeriod(KoboIndex.byName('meal_cashPdm').id))
  const fetcherAnswers = useFetcher(request)

  const answersIndex = useMemo(() => {
    return seq(fetcherAnswers.get).groupByFirst(_ => _.id)
  }, [fetcherAnswers.get])

  useEffect(() => {
    fetcherPeriod.fetch()
  }, [])

  useEffect(() => {
    map(fetcherPeriod.get, setPeriodFilter)
  }, [fetcherPeriod.get])

  useEffect(() => {
    fetcherAnswers.fetch({force: true, clean: false}, periodFilter)
  }, [periodFilter])


  return (
    <Context.Provider value={{
      fetcherAnswers,
      periodFilter,
      setPeriodFilter,
      fetcherPeriod,
      answersIndex
    }}>
      {children}
    </Context.Provider>
  )
}
