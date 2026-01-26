import {useCallback, useEffect, useMemo} from 'react'
import {seq, match} from '@axanc/ts-utils'

import {groupBy, PeriodHelper, Protection_gbv_concepts_pre_post, type Period} from 'infoportal-common'

import {appConfig} from '@/conf/AppConfig'
import {useI18n} from '@/core/i18n'
import {useKoboSchemaContext} from '@/features/KoboSchema/KoboSchemaContext'
import {DataFilter} from '@/shared/DataFilter/DataFilter'
import {usePersistentState} from '@/shared/hook/usePersistantState'
import {useKoboAnswersContext} from '@/core/context/KoboAnswersContext'

const useTranslations = () => {
  const schemaContext = useKoboSchemaContext({autoFetch: ['protection_gbv_concepts_pre_post']})
  const gbvConceptsSchema = schemaContext.byName['protection_gbv_concepts_pre_post'].get

  const getOptionTranslations = useCallback(
    (option: keyof Protection_gbv_concepts_pre_post.T | keyof typeof Protection_gbv_concepts_pre_post.options) => {
      return gbvConceptsSchema?.helper.getOptionsByQuestionName(option)?.map(({name}) => ({
        value: name,
        label: gbvConceptsSchema.translate.choice(option, name) ?? name,
      }))
    },
    [gbvConceptsSchema],
  )

  return {
    translateOption: getOptionTranslations,
    translateField: gbvConceptsSchema?.translate.question,
  }
}

const useGbvConceptsFilters = () => {
  const {m, currentLang} = useI18n()
  const [period, setPeriod] = usePersistentState<Partial<Period>>(
    {},
    {
      storageKey: 'gbv-concepts-dashboard-period',
      transformFromStorage: (period) => ({
        ...(period.start && {start: new Date(period.start)}),
        ...(period.end && {end: new Date(period.end)}),
      }),
    },
  )
  const schemaContext = useKoboSchemaContext({autoFetch: ['protection_gbv_concepts_pre_post']})
  const gbvConceptsFetcher = useKoboAnswersContext().byName('protection_gbv_concepts_pre_post')
  const {translateOption} = useTranslations()

  useEffect(() => {
    gbvConceptsFetcher.fetch()
  }, [])

  useEffect(() => {
    schemaContext.setLangIndex(match(currentLang).cases({uk: 1}).default(0))
  }, [currentLang])

  const shape = useMemo(() => {
    return DataFilter.makeShape<Protection_gbv_concepts_pre_post.T>({
      oblast: {
        icon: appConfig.icons.oblast,
        label: 'Oblast',
        getValue: ({oblast_training}) => oblast_training,
        getOptions: () => translateOption('oblast_training'),
      },
      location: {
        icon: appConfig.icons.oblast,
        label: 'Location',
        getValue: ({location}) => location,
        getOptions: () => {
          return DataFilter.buildOptions(
            Array.from(
              new Set(
                (gbvConceptsFetcher.get?.data ?? [])
                  .map(({location}) => location)
                  .filter((location) => location !== undefined),
              ),
            ),
          )
        },
      },
      project: {
        icon: appConfig.icons.project,
        label: m.project,
        getValue: ({project_code}) => project_code,
        getOptions: () => translateOption('project_code'),
      },
      topic: {
        icon: appConfig.icons.topic,
        label: m.topic,
        getValue: ({topic}) => topic,
        getOptions: () => translateOption('topic'),
      },
      completion: {
        icon: 'done',
        label: 'PRE or POST?',
        getValue: ({complete_training}) => complete_training,
        getOptions: () =>
          seq([
            {value: 'yes', label: 'POST'},
            {value: 'no', label: 'PRE'},
          ]),
      },
    })
  }, [translateOption, gbvConceptsFetcher.get?.data])

  const [filters, setFilters] = usePersistentState<DataFilter.InferShape<typeof shape>>(
    {},
    {storageKey: 'gbv-concepts-dashboard-filters'},
  )

  const data = useMemo(() => {
    if (!gbvConceptsFetcher.get?.data) return

    const filteredBy_date = gbvConceptsFetcher.get.data.filter((d) => {
      try {
        const isDateIn = PeriodHelper.isDateIn(period, d.date)
        if (!isDateIn) return false
        return true
      } catch (e) {
        console.log(e, d)
      }
    })

    return DataFilter.filterData(filteredBy_date, shape, filters)
  }, [gbvConceptsFetcher.get?.data, filters, period, shape])

  const stats = useMemo(
    () =>
      data === undefined
        ? undefined
        : groupBy({
            data,
            groups: [{by: ({complete_training}) => complete_training!}],
            finalTransform: (group) => group,
          }).groups,
    [data],
  )

  return {
    count: gbvConceptsFetcher.get?.data.length,
    data,
    filters,
    loading: gbvConceptsFetcher.loading,
    period,
    setFilters,
    setPeriod,
    shape,
    stats,
  }
}

export {useGbvConceptsFilters, useTranslations}
