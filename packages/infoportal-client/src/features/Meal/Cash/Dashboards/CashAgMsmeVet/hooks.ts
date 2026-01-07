import {useCallback, useEffect, useMemo, useState, type Dispatch, type SetStateAction} from 'react'
import {match, seq, Seq} from '@axanc/ts-utils'

import {Meal_ecrec_agMsmeVetPam, KoboSubmissionFlat, Period} from 'infoportal-common'

import {useAppSettings} from '@/core/context/ConfigContext'
import {useI18n} from '@/core/i18n'
import {useIpToast} from '@/core/useToast'
import {useKoboSchemaContext} from '@/features/KoboSchema/KoboSchemaContext'
import {DataFilter} from '@/shared/DataFilter/DataFilter'
import {useFetcher} from '@/shared/hook/useFetcher'

import {pdmAdapter} from './utils'

const useTranslations = () => {
  const schemaContext = useKoboSchemaContext({autoFetch: ['meal_ecrec_agMsmeVetPam']})
  const schema = schemaContext.byName['meal_ecrec_agMsmeVetPam'].get
  const {currentLang} = useI18n()

  const getOptionTranslations = useCallback(
    (option: keyof Meal_ecrec_agMsmeVetPam.T | keyof typeof Meal_ecrec_agMsmeVetPam.options) => {
      return (schema?.helper.getOptionsByQuestionName(option) ?? []).map(({name}) => ({
        value: name,
        label: schema?.translate.choice(option, name) ?? name,
      }))
    },
    [schema],
  )

  useEffect(() => {
    schemaContext.setLangIndex(match(currentLang).cases({en: 0, uk: 1}).exhaustive())
  }, [currentLang])

  return {
    translateOption: getOptionTranslations,
    translateField: schema?.translate.question,
  }
}

const useCashAgMsmeVet = () => {
  const {api} = useAppSettings()
  const [periodFilter, setPeriodFilter] = useState<Partial<Period>>({})
  const [filters, setFilters] = useState<Record<string, string[] | undefined>>({})
  const [data, setData] = useState<Seq<KoboSubmissionFlat<Meal_ecrec_agMsmeVetPam.T>>>(seq([]))
  const {toastHttpError} = useIpToast()
  const {m} = useI18n()
  const {translateOption} = useTranslations()
  const labelFinder =
    <K extends keyof typeof Meal_ecrec_agMsmeVetPam.options>(entity: K) =>
    (item: Meal_ecrec_agMsmeVetPam.Option<K> | undefined) =>
      (translateOption(entity) ?? []).find(({value}) => value === item)?.label

  function labelMaker<K extends keyof typeof Meal_ecrec_agMsmeVetPam.options>(
    option: K,
  ): [
    (
      result: Record<Meal_ecrec_agMsmeVetPam.Option<K>, string>,
      value: Meal_ecrec_agMsmeVetPam.Option<K>,
    ) => Record<Meal_ecrec_agMsmeVetPam.Option<K>, string>,
    Record<Meal_ecrec_agMsmeVetPam.Option<K>, string>,
  ] {
    const reducer = (
      result: Record<Meal_ecrec_agMsmeVetPam.Option<K>, string>,
      value: Meal_ecrec_agMsmeVetPam.Option<K>,
    ) => ({
      ...result,
      [value]: labelFinder(option)(value) ?? (value as string),
    })

    const initial = {} as Record<Meal_ecrec_agMsmeVetPam.Option<K>, string>

    return [reducer, initial]
  }

  const shape = useMemo(
    () =>
      DataFilter.makeShape<KoboSubmissionFlat<Meal_ecrec_agMsmeVetPam.T>>({
        oblast: {
          icon: 'location_on',
          label: m.oblast,
          getValue: ({ben_det_oblast}) => ben_det_oblast,
          getOptions: () => {
            return DataFilter.buildOptionsFromObject(
              data
                .flatMap(({ben_det_oblast}) => ben_det_oblast!)
                .distinct((oblast) => oblast)
                .sort()
                .reduce(...labelMaker('ben_det_oblast')),
            )
          },
        },
        raion: {
          icon: 'location_on',
          label: m.raion,
          getValue: ({ben_det_raion}) => ben_det_raion,
          getOptions: () =>
            DataFilter.buildOptionsFromObject(
              data
                .flatMap(({ben_det_raion}) => ben_det_raion!)
                .distinct((raion) => raion)
                .sort()
                .reduce(...labelMaker('ben_det_raion')),
            ),
        },
        hromada: {
          icon: 'location_on',
          label: m.hromada,
          getValue: ({ben_det_hromada}) => ben_det_hromada,
          getOptions: () =>
            DataFilter.buildOptionsFromObject(
              data
                .flatMap(({ben_det_hromada}) => ben_det_hromada!)
                .distinct((hromada) => hromada)
                .sort()
                .reduce(...labelMaker('ben_det_hromada')),
            ),
        },
        office: {
          icon: 'share',
          label: m.office,
          getValue: (_) => _.office,
          getOptions: () =>
            DataFilter.buildOptionsFromObject(
              data
                .flatMap((_) => _.office!)
                .distinct((_) => _)
                .sort()
                .reduce(...labelMaker('office')),
            ),
        },
        project: {
          icon: 'business',
          label: m.project,
          getValue: ({donor}) => donor,
          getOptions: () =>
            DataFilter.buildOptionsFromObject(
              data
                .flatMap(({donor}) => donor!)
                .distinct((donor) => donor)
                .sort()
                .reduce(...labelMaker('donor')),
            ),
        },
        pdmtype: {
          icon: 'category',
          label: m.mealMonitoringPdm.pdmType,
          getValue: ({pdmtype}) => pdmtype,
          getOptions: () => DataFilter.buildOptionsFromObject(Meal_ecrec_agMsmeVetPam.options.pdmtype),
        },
        received: {
          icon: 'check_circle',
          label: m.mealMonitoringPdm.received,
          getValue: ({did_receive_cash}) => did_receive_cash,
          getOptions: () => DataFilter.buildOptionsFromObject(Meal_ecrec_agMsmeVetPam.options.any_member_household),
        },
      }),
    [data, m],
  )

  const request = async (): Promise<void> => {
    try {
      const response = await api.kobo.typedAnswers.search.meal_ecrec_agMsmeVetPam({filters: periodFilter})
      setData(seq(response.data))
    } catch (error) {
      toastHttpError(error)
    }
  }

  const fetcher = useFetcher(request)

  useEffect(() => {
    fetcher.fetch()
  }, [periodFilter])

  return {
    data: DataFilter.filterData(data, shape, filters).map(pdmAdapter),
    fetcher,
    shape,
    filters,
    setFilters,
    periodFilter,
    setPeriodFilter,
  }
}

export {useCashAgMsmeVet, useTranslations}
