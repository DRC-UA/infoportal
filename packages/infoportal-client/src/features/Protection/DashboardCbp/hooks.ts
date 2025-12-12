import {useCallback, useEffect, useMemo, useState} from 'react'
import {Seq, match} from '@axanc/ts-utils'

import {Cbp_pre_post, groupBy, PeriodHelper, type Period} from 'infoportal-common'

import {appConfig} from '@/conf/AppConfig'
import {useI18n} from '@/core/i18n'
import {useKoboSchemaContext} from '@/features/KoboSchema/KoboSchemaContext'
import {DataFilter} from '@/shared/DataFilter/DataFilter'
import {usePersistentState} from '@/shared/hook/usePersistantState'

type UseCbpFilter = ReturnType<typeof useCbpFilters>

const useTranslations = () => {
  const schemaContext = useKoboSchemaContext({autoFetch: ['cbp_pre_post']})
  const cbpSchema = schemaContext.byName['cbp_pre_post'].get

  const getOptionTranslations = useCallback(
    (option: keyof Cbp_pre_post.T | keyof typeof Cbp_pre_post.options) => {
      return cbpSchema?.helper.getOptionsByQuestionName(option).map(({name}) => ({
        value: name,
        label: cbpSchema.translate.choice(option, name) ?? name,
      }))
    },
    [cbpSchema],
  )

  return {
    translateOption: getOptionTranslations,
    translateField: cbpSchema?.translate.question,
  }
}

const useCbpFilters = (data: Seq<Cbp_pre_post.T> | undefined) => {
  const {m, currentLang} = useI18n()
  const [period, setPeriod] = useState<Partial<Period>>({})
  const schemaContext = useKoboSchemaContext({autoFetch: ['cbp_pre_post']})
  const {translateOption} = useTranslations()

  useEffect(() => {
    schemaContext.setLangIndex(match(currentLang).cases({en: 1}).default(0))
  }, [currentLang])

  const shape = useMemo(() => {
    return DataFilter.makeShape<Cbp_pre_post.T>({
      office: {
        icon: appConfig.icons.oblast,
        label: m.oblast,
        getValue: ({location}) => location,
        getOptions: () => translateOption('location'),
      },
      topic: {
        icon: appConfig.icons.topic,
        label: m.topic,
        getValue: ({topic}) => topic,
        getOptions: () => translateOption('topic'),
      },
      project: {
        icon: appConfig.icons.project,
        label: m.project,
        getValue: ({training_gffo}) => training_gffo,
        getOptions: () =>
          translateOption('training_gffo')?.map(({value}) =>
            match(value)
              .cases({
                yes: {value, label: 'GFFO'},
                no: {
                  value,
                  label: match(currentLang)
                    .cases({
                      en: 'non-GFFO',
                      uk: 'не GFFO',
                    })
                    .default(undefined),
                },
              })
              .default({value, label: 'Undefined'}),
          ),
      },
      type: {
        icon: appConfig.icons.prePost,
        label: m.testType,
        getValue: ({complete_training}) => complete_training,
        getOptions: () => translateOption('complete_training'),
      },
    })
  }, [data, translateOption])

  const [filters, setFilters] = usePersistentState<DataFilter.InferShape<typeof shape>>(
    {},
    {storageKey: 'pss-dashboard-filters'},
  )

  const filteredData = useMemo(() => {
    if (!data) return
    const filteredBy_date = data.filter((d) => {
      try {
        const isDateIn = PeriodHelper.isDateIn(period, d.date)
        if (!isDateIn) return false
        return true
      } catch (e) {
        console.log(e, d)
      }
    })

    return DataFilter.filterData(filteredBy_date, shape, filters)
  }, [data, filters, period, shape])

  return {
    period,
    setPeriod,
    filters,
    setFilters,
    data: filteredData,
    scoredData: filteredData?.filter(
      ({
        cal_total_hum_pri_pro_mai,
        cal_total_safe_referrals,
        cal_total_advocacy,
        cal_total_pfa,
        cal_total_pseah,
        cal_total_group_facilitation_skills,
        cal_total_roles_responsibilities_cbs,
        cal_total_leadership_self_organization,
        cal_total_protection_risks_analysis,
      }) =>
        [
          cal_total_hum_pri_pro_mai,
          cal_total_safe_referrals,
          cal_total_advocacy,
          cal_total_pfa,
          cal_total_pseah,
          cal_total_group_facilitation_skills,
          cal_total_roles_responsibilities_cbs,
          cal_total_leadership_self_organization,
          cal_total_protection_risks_analysis,
        ].some((score) => typeof score !== undefined), // keep only records with training score
    ),
    shape,
  }
}

export {useCbpFilters, useTranslations, type UseCbpFilter}
