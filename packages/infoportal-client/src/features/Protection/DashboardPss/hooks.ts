import {useCallback, useEffect, useMemo, useState} from 'react'
import {seq, match, type Seq} from '@axanc/ts-utils'

import {groupBy, PeriodHelper, Protection_pss, Person, type Period} from 'infoportal-common'

import {appConfig} from '@/conf/AppConfig'
import {useI18n} from '@/core/i18n'
import {useKoboSchemaContext} from '@/features/KoboSchema/KoboSchemaContext'
import {DataFilter} from '@/shared/DataFilter/DataFilter'
import {usePersistentState} from '@/shared/hook/usePersistantState'

import type {PssContext} from './Context'
import type {ProtectionPssWithPersons, ProtectionPssWithPersonsFlat} from './types'

type UsePssFilter = ReturnType<typeof usePssFilters>

const useTranslations = () => {
  const schemaContext = useKoboSchemaContext({autoFetch: ['protection_pss']})
  const pssSchema = schemaContext.byName['protection_pss'].get

  const getOptionTranslations = useCallback(
    (option: keyof Protection_pss.T | keyof typeof Protection_pss.options) => {
      return pssSchema?.helper.getOptionsByQuestionName(option).map(({name}) => ({
        value: name,
        label: pssSchema.translate.choice(option, name) ?? name,
      }))
    },
    [pssSchema],
  )

  return {
    translateOption: getOptionTranslations,
    translateField: pssSchema?.translate.question,
  }
}

const useTranslateField = (): ((key: string) => string) | undefined => {
  const schemaContext = useKoboSchemaContext({autoFetch: ['protection_pss']})
  const pssSchema = schemaContext.byName['protection_pss'].get

  return pssSchema?.translate.question
}

const usePssFilters = (data: Seq<ProtectionPssWithPersons> | undefined) => {
  const {m, currentLang} = useI18n()
  const [period, setPeriod] = useState<Partial<Period>>({})
  const schemaContext = useKoboSchemaContext({autoFetch: ['protection_pss']})
  const {translateOption} = useTranslations()

  useEffect(() => {
    schemaContext.setLangIndex(match(currentLang).cases({en: 1}).default(0))
  }, [currentLang])

  const shape = useMemo(() => {
    return DataFilter.makeShape<ProtectionPssWithPersons>({
      office: {
        icon: appConfig.icons.office,
        label: m.office,
        getValue: ({staff_to_insert_their_DRC_office}) => staff_to_insert_their_DRC_office,
        getOptions: () => translateOption('staff_to_insert_their_DRC_office'),
      },
      oblast: {
        icon: appConfig.icons.oblast,
        label: m.oblast,
        getValue: ({ben_det_oblast}) => ben_det_oblast,
        getOptions: () => translateOption('ben_det_oblast'),
      },
      raion: {
        label: m.raion,
        getValue: ({ben_det_raion}) => ben_det_raion,
        getOptions: () => translateOption('ben_det_raion'),
      },
      hromada: {
        label: m.hromada,
        getValue: ({ben_det_hromada}) => ben_det_hromada,
        getOptions: () => translateOption('ben_det_hromada'),
      },
      project: {
        icon: appConfig.icons.project,
        label: m.project,
        getValue: ({project}) => project,
        getOptions: () => translateOption('project'),
      },
      activity: {
        // icon: appConfig.icons.project,
        label: m.activity,
        getValue: ({activity}) => activity,
        getOptions: () => translateOption('activity'),
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
    shape,
  }
}

const useSessionsCounter = (data: PssContext['data']) =>
  useMemo(() => {
    const {pgs, ais, mhpss, community_dialogues_session} = groupBy({
      data: data?.filtered ?? [],
      groups: [
        {
          by: ({activity}) => activity!,
        },
      ],
      finalTransform: (input) => input,
    }).groups

    return {
      pgs:
        groupBy({
          data: pgs?.filter(({cycle_code}) => cycle_code !== undefined),
          groups: [{by: ({cycle_code}) => cycle_code!}],
          finalTransform: (group) => ({cycle_length: group[0]?.cycle_type}),
        }).transforms.reduce((accum, {cycle_length}) => {
          return match(cycle_length)
            .cases({
              short: accum + 5,
              short_6: accum + 6,
              long: accum + 8,
            })
            .default(0)
        }, 0) || undefined,
      ais:
        ais?.reduce((counter, submission) => {
          const sessionsCount = [
            submission.date_session1,
            submission.date_session2,
            submission.date_session3,
            submission.date_session4,
            submission.date_session5,
            submission.date_session6,
            submission.date_session7,
            submission.date_session8,
          ].filter(Boolean).length

          return counter + sessionsCount
        }, 0) || undefined,
      mhpss: mhpss?.length,
      community_dialogues_session: community_dialogues_session?.length,
    }
  }, [data?.filtered])

const useStats = (data: Seq<ProtectionPssWithPersonsFlat> = seq([])) => {
  const initialStats = {
    general: {positive: 0, negative: 0},
    distress: {positive: 0, negative: 0},
    coping: {positive: 0, negative: 0},
    who5: {positive: 0, negative: 0},
    base: 0,
  }
  const [improvements, setImprovements] = useState(initialStats)
  const [individuals, setIndividuals] = useState(0)

  useEffect(() => {
    const {pgs, ais} = groupBy({
      data,
      groups: [{by: ({activity}) => activity!}],
      finalTransform: (record) => record,
    }).groups

    setImprovements(
      [...(pgs ?? []), ...(ais ?? [])]
        .filter(({type_testing}) => type_testing?.length === 2)
        .filter(
          ({cal_total_psychological_distress_changes, cal_total_psycosocial_coping_changes, cal_total_who_changes}) =>
            [
              cal_total_psychological_distress_changes,
              cal_total_psycosocial_coping_changes,
              cal_total_who_changes,
            ].every((record) => record !== undefined),
        )
        .reduce(
          (
            {base, general, distress, coping, who5},
            {cal_total_psychological_distress_changes, cal_total_psycosocial_coping_changes, cal_total_who_changes},
          ) => {
            const distressImprovement = Math.sign(Number(cal_total_psychological_distress_changes))
            const copingImprovement = Math.sign(Number(cal_total_psycosocial_coping_changes))
            const whoImprovement = Math.sign(Number(cal_total_who_changes))

            const generalScore = distressImprovement + copingImprovement + whoImprovement

            return {
              base: ++base,
              general: {
                ...(generalScore >= 1 &&
                ![distressImprovement, copingImprovement, whoImprovement].some((subScore) => subScore === -1)
                  ? {positive: ++general.positive, negative: general.negative}
                  : {positive: general.positive, negative: ++general.negative}),
              },
              distress: {
                ...(distressImprovement === 1
                  ? {positive: ++distress.positive, negative: distress.negative}
                  : {positive: distress.positive, negative: ++distress.negative}),
              },
              coping: {
                ...(copingImprovement === 1
                  ? {positive: ++coping.positive, negative: coping.negative}
                  : {positive: coping.positive, negative: ++coping.negative}),
              },
              who5: {
                ...(whoImprovement === 1
                  ? {positive: ++who5.positive, negative: who5.negative}
                  : {positive: who5.positive, negative: ++who5.negative}),
              },
            }
          },
          initialStats,
        ),
    )

    setIndividuals(
      groupBy({
        data:
          data
            .flatMap(
              ({persons, id}) =>
                persons?.map((person) => ({
                  ...(person as Person.Details & {code_beneficiary: string}), // safe to cast due to a custom KoboXmlMapper.Persons.protection_pss mapper
                  id,
                })) ?? [],
            )
            .filter(({code_beneficiary}) => code_beneficiary !== undefined)
            .compact() ?? [],
        groups: [
          {
            by: ({code_beneficiary}) => code_beneficiary!,
          },
        ],
        finalTransform: (input) => ({occurrences: input.length, ids: input?.map(({id}) => id)}),
      }).transforms.length,
    )
  }, [data])

  return {improvements, individuals}
}

export {useStats, usePssFilters, useSessionsCounter, useTranslations, type UsePssFilter}
