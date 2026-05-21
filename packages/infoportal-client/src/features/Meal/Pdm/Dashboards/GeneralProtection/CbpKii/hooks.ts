import {useEffect, useMemo, useState} from 'react'
import {seq, type Seq} from '@axanc/ts-utils'

import {Meal_kiiCbpPam, type Period, type KoboSubmissionFlat} from 'infoportal-common'

import {useI18n} from '@/core/i18n'
import {useKoboSchemaContext} from '@/features/KoboSchema/KoboSchemaContext'
import {useAppSettings} from '@/core/context/ConfigContext'
import {DataFilter} from '@/shared/DataFilter/DataFilter'
import {useFetcher} from '@/shared/hook/useFetcher'

const useCbpKiiData = () => {
  const {api} = useAppSettings()
  const {m} = useI18n()
  const schema = useKoboSchemaContext({autoFetch: ['meal_kiiCbpPam']}).byName.meal_kiiCbpPam.get
  const [periodFilter, setPeriodFilter] = useState<Partial<Period>>({})
  const [optionFilter, setOptionFilters] = useState<Record<string, string[] | undefined>>({})
  const answersFetcher = useFetcher(async (): Promise<Seq<KoboSubmissionFlat<Meal_kiiCbpPam.T>>> => {
    return api.kobo.typedAnswers.search.meal_kiiCbpPam({filters: periodFilter}).then(({data}) => seq(data))
  })

  const filterShape = useMemo(() => {
    return DataFilter.makeShape<Meal_kiiCbpPam.T>({
      oblast: {
        icon: 'place',
        label: m.oblast,
        getValue: ({oblast}) => oblast,
        getOptions: () => DataFilter.buildOptionsFromObject(Meal_kiiCbpPam.options.oblast),
      },
      raion: {
        icon: 'place',
        label: m.raion,
        getValue: ({raion}) => raion,
        getOptions: () => DataFilter.buildOptionsFromObject(Meal_kiiCbpPam.options.raion),
      },
      hromada: {
        icon: 'place',
        label: m.hromada,
        getValue: ({hromada}) => hromada,
        getOptions: () => DataFilter.buildOptionsFromObject(Meal_kiiCbpPam.options.hromada),
      },
      project: {
        icon: 'business',
        label: m.project,
        getValue: ({project}) => project,
        getOptions: () => DataFilter.buildOptionsFromObject(Meal_kiiCbpPam.options.project),
      },
    })
  }, [schema, Meal_kiiCbpPam])

  useEffect(() => {
    answersFetcher.fetch({force: true, clean: false})
  }, [periodFilter])

  return {
    data: seq(DataFilter.filterData(answersFetcher.get ?? [], filterShape, optionFilter)),
    loading: answersFetcher.loading,
    filterShape,
    optionFilter,
    setOptionFilters,
    periodFilter,
    setPeriodFilter,
  }
}

export {useCbpKiiData}
