import {useCallback, useEffect, useMemo, useState} from 'react'
import {seq, match, type Seq} from '@axanc/ts-utils'

import {groupBy, PeriodHelper, Protection_pss, type Person, type Period} from 'infoportal-common'

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
  return useMemo(() => {
    const initialStats = {
      general: {positive: 0, negative: 0},
      distress: {positive: 0, negative: 0},
      coping: {positive: 0, negative: 0},
      who5: {positive: 0, negative: 0},
      base: 0,
    }

    const {pgs, ais} = groupBy({
      data,
      groups: [{by: ({activity}) => activity!}],
      finalTransform: (record) => record,
    }).groups

    const improvements = [...(pgs ?? []), ...(ais ?? [])]
      .filter(({type_testing}) => type_testing?.length === 2)
      .filter(
        ({cal_total_psychological_distress_changes, cal_total_psycosocial_coping_changes, cal_total_who_changes}) =>
          [cal_total_psychological_distress_changes, cal_total_psycosocial_coping_changes, cal_total_who_changes].every(
            (record) => record !== undefined,
          ),
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
      )

    const individuals = groupBy({
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
    }).transforms.length

    return {improvements, individuals}
  }, [data])
}

const useResilienceStats = (data: Seq<ProtectionPssWithPersonsFlat> = seq([])) => {
  return useMemo(() => {
    const pssSessions = data.filter(
      ({activity, complete_testing}) => (activity === 'pgs' || activity === 'ais') && complete_testing === 'yes',
    )

    const {ais, pgs} = groupBy({
      data: pssSessions,
      groups: [{by: ({activity}) => activity!}],
      finalTransform: (input) =>
        input.map(
          ({
            type_testing,
            complete_testing,
            participant_code,
            cal_people_support_pre,
            cal_ask_support_pre,
            cal_connected_people_pre,
            cal_share_experiences_pre,
            cal_hope_future_pre,
            cal_difficult_situations_pre,
            cal_life_purpose_pre,
            cal_goals_life_pre,
            cal_meaning_life_pre,
            cal_past_experiences_pre,
            cal_overcoming_difficulties_pre,
            cal_influence_wellbeing_pre,
            cal_skills_cope_pre,
            cal_faith_hope_pre,
            cal_difficult_moments_pre,
            cal_life_worth_pre,
            cal_believe_things_pre,
            cal_people_support_post,
            cal_ask_support_post,
            cal_connected_people_post,
            cal_share_experiences_post,
            cal_hope_future_post,
            cal_difficult_situations_post,
            cal_life_purpose_post,
            cal_goals_life_post,
            cal_meaning_life_post,
            cal_past_experiences_post,
            cal_overcoming_difficulties_post,
            cal_influence_wellbeing_post,
            cal_skills_cope_post,
            cal_faith_hope_post,
            cal_difficult_moments_post,
            cal_life_worth_post,
            cal_believe_things_post,
          }) => ({
            type_testing,
            complete_testing,
            participant_code,
            pre: {
              socialSupport:
                Number(cal_people_support_pre) +
                Number(cal_ask_support_pre) +
                Number(cal_connected_people_pre) +
                Number(cal_share_experiences_pre),
              senseMeaning:
                Number(cal_hope_future_pre) +
                Number(cal_difficult_situations_pre) +
                Number(cal_life_purpose_pre) +
                Number(cal_goals_life_pre) +
                Number(cal_meaning_life_pre),
              senseAgency:
                Number(cal_past_experiences_pre) +
                Number(cal_overcoming_difficulties_pre) +
                Number(cal_influence_wellbeing_pre) +
                Number(cal_skills_cope_pre),
              senseHope:
                Number(cal_faith_hope_pre) +
                Number(cal_difficult_moments_pre) +
                Number(cal_life_worth_pre) +
                Number(cal_believe_things_pre),
            },
            post: {
              socialSupport:
                Number(cal_people_support_post) +
                Number(cal_ask_support_post) +
                Number(cal_connected_people_post) +
                Number(cal_share_experiences_post),
              senseMeaning:
                Number(cal_hope_future_post) +
                Number(cal_difficult_situations_post) +
                Number(cal_life_purpose_post) +
                Number(cal_goals_life_post) +
                Number(cal_meaning_life_post),
              senseAgency:
                Number(cal_past_experiences_post) +
                Number(cal_overcoming_difficulties_post) +
                Number(cal_influence_wellbeing_post) +
                Number(cal_skills_cope_post),
              senseHope:
                Number(cal_faith_hope_post) +
                Number(cal_difficult_moments_post) +
                Number(cal_life_worth_post) +
                Number(cal_believe_things_post),
            },
          }),
        ),
    }).groups

    const flatFilteredAis = (ais ?? seq([]))
      .filter(({complete_testing, participant_code}) => complete_testing === 'yes' && participant_code !== undefined)
      .flatMap(({type_testing, ...rest}) => type_testing?.map((type) => ({type_testing: type, ...rest})))
      .compact()

    const sanitizedAisPrePostPairs = groupBy({
      data: flatFilteredAis,
      groups: [{by: ({participant_code}) => participant_code!}],
      finalTransform: (result) => result,
    })
      .transforms.filter((transform) => transform.length === 2)
      .filter(([{type_testing: first}, {type_testing: second}]) => first !== second)

    // current[0].pre.socialSupport >

    const aisPre = sanitizedAisPrePostPairs
      .flat()
      .filter(({type_testing}) => type_testing === 'pre')
      .map(({pre}) => pre)
    const aisPost = sanitizedAisPrePostPairs
      .flat()
      .filter(({type_testing}) => type_testing === 'post')
      .map(({post}) => post)

    const sanitizedPgsPrePostPairs = (pgs ?? seq([])).filter(
      ({type_testing}) => type_testing?.length === 2 && type_testing.includes('post') && type_testing.includes('pre'),
    )

    const improvementStats = [
      ...sanitizedAisPrePostPairs.map(([sibling]) => sibling),
      ...sanitizedPgsPrePostPairs,
    ].reduce(
      (accumulator, current) => {
        return Object.fromEntries(
          (['socialSupport', 'senseMeaning', 'senseHope', 'senseAgency'] as const).map((metric) => [
            metric,
            current.post[metric] > current.pre[metric]
              ? {
                  positive: accumulator?.[metric]?.positive + 1,
                  negative: accumulator?.[metric]?.negative,
                }
              : {
                  positive: accumulator?.[metric]?.positive,
                  negative: accumulator?.[metric]?.negative + 1,
                },
          ]),
        ) as Record<
          'socialSupport' | 'senseMeaning' | 'senseHope' | 'senseAgency',
          {positive: number; negative: number}
        >
      },
      {
        socialSupport: {positive: 0, negative: 0},
        senseMeaning: {positive: 0, negative: 0},
        senseHope: {positive: 0, negative: 0},
        senseAgency: {positive: 0, negative: 0},
      },
    )

    const pgsPre = sanitizedPgsPrePostPairs.map(({pre}) => pre)
    const pgsPost = sanitizedPgsPrePostPairs.map(({post}) => post)

    const pre = [...aisPre, ...pgsPre]
    const post = [...aisPost, ...pgsPost]

    const avgPre = calcAvgFigures(pre)
    const avgPost = calcAvgFigures(post)

    return {
      socialSupport: {
        pre: avgPre.socialSupport,
        post: avgPost.socialSupport,
        difference: avgPost.socialSupport - avgPre.socialSupport,
        improvements: improvementStats.socialSupport,
      },
      senseMeaning: {
        pre: avgPre.senseMeaning,
        post: avgPost.senseMeaning,
        difference: avgPost.senseMeaning - avgPre.senseMeaning,
        improvements: improvementStats.senseMeaning,
      },
      senseHope: {
        pre: avgPre.senseHope,
        post: avgPost.senseHope,
        difference: avgPost.senseHope - avgPre.senseHope,
        improvements: improvementStats.senseHope,
      },
      senseAgency: {
        pre: avgPre.senseAgency,
        post: avgPost.senseAgency,
        difference: avgPost.senseAgency - avgPre.senseAgency,
        improvements: improvementStats.senseAgency,
      },
    }
  }, [data])
}

const calcAvgFigures = (
  array: {
    socialSupport: number
    senseMeaning: number
    senseAgency: number
    senseHope: number
  }[],
) => {
  return Object.fromEntries(
    Object.entries(
      array.reduce(
        (accumulator, current) => ({
          socialSupport: accumulator.socialSupport + current.socialSupport,
          senseMeaning: accumulator.senseMeaning + current.senseMeaning,
          senseAgency: accumulator.senseAgency + current.senseAgency,
          senseHope: accumulator.senseHope + current.senseHope,
        }),
        {socialSupport: 0, senseMeaning: 0, senseAgency: 0, senseHope: 0},
      ),
    ).map(([key, value]) => [key, value / array.length]),
  )
}

export {usePssFilters, useResilienceStats, useSessionsCounter, useStats, useTranslations, type UsePssFilter}
