import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react'
import {map, seq, Seq} from '@axanc/ts-utils'
import {Kobo} from 'kobo-sdk'

import {KoboSubmissionFlat, KoboIndex, Meal_winterizationPdm, Period} from 'infoportal-common'

import {useAppSettings} from '@/core/context/ConfigContext'
import {useFetcher, UseFetcher} from '@/shared/hook/useFetcher'

export interface MealWinterizationContext {
  fetcherAnswers: UseFetcher<
    (filter: Partial<Period>) => Promise<Seq<KoboSubmissionFlat<Meal_winterizationPdm.T, any>>>
  >
  fetcherPeriod: UseFetcher<() => Promise<Period>>
  periodFilter: Partial<Period>
  setPeriodFilter: Dispatch<SetStateAction<Partial<Period>>>
  answersIndex?: Record<Kobo.SubmissionId, KoboSubmissionFlat<Meal_winterizationPdm.T, any>>
}

const Context = createContext({} as MealWinterizationContext)

export const useMealWinterizationContext = () => useContext<MealWinterizationContext>(Context)

export const MealWinterizationProvider = ({children}: {children: ReactNode}) => {
  const {api} = useAppSettings()
  const [periodFilter, setPeriodFilter] = useState<Partial<Period>>({})

  const request = (filter: Partial<Period>) =>
    api.kobo.typedAnswers.search
      .meal_winterizationPdm({
        filters: {
          start: filter.start,
          end: filter.end,
        },
      })
      .then((_) => _.data)

  const fetcherPeriod = useFetcher(() => api.kobo.answer.getPeriod(KoboIndex.byName('meal_winterizationPdm').id))
  const fetcherAnswers = useFetcher(request)
  const answersIndex = useMemo(() => {
    return seq(fetcherAnswers.get).groupByFirst((_) => _.id)
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
    <Context.Provider
      value={{
        fetcherAnswers,
        periodFilter,
        setPeriodFilter,
        fetcherPeriod,
        answersIndex,
      }}
    >
      {children}
    </Context.Provider>
  )
}
