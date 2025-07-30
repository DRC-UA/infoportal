import {match, seq} from '@axanc/ts-utils'

import {
  civilDocDateFields,
  DrcProject,
  DrcProjectHelper,
  groupBy,
  hlpDocDateFields,
  KoboIndex,
  KoboXmlMapper,
  Legal_individual_aid,
  PeriodHelper,
  Person,
  pickPrioritizedAid,
  type Period,
} from 'infoportal-common'

import {ActivityInfoSdk} from '@/core/sdk/server/activity-info/ActiviftyInfoSdk'
import {ApiSdk} from '@/core/sdk/server/ApiSdk'
import {AiMapper} from '@/features/ActivityInfo/shared/AiMapper'
import {aiInvalidValueFlag, AiTable, checkAiValid} from '@/features/ActivityInfo/shared/AiTable'

import {AiLegalType} from './AiLegalTypes'

namespace AiLegalMapper {
  type Bundle = AiTable<AiLegalType.Type, AiLegalType.AiTypeActivitiesAndPeople>

  const getPlanCode = (project?: DrcProject): AiLegalType.Type['Plan/Project Code'] => {
    // @ts-expect-error It's OK to get an error here, we expect it to flag missing or mismatching data
    return match(project)
      .cases({
        [DrcProject['UKR-000397 GFFO']]: 'PRT-DRC-00001',
        [DrcProject['UKR-000355 Danish MFA']]: 'PRT-DRC-00004',
        [DrcProject['UKR-000423 ECHO4']]: 'PRT-DRC-00009',
      })
      .default(() => `${aiInvalidValueFlag} ${project}`)
  }

  const getActivityType = (
    aid: NonNullable<Legal_individual_aid.T['number_case']>[number],
  ):
    | 'assistance-hlp-with-docs'
    | 'assistance-hlp'
    | 'assistance-with-docs'
    | 'assistance'
    | 'counselling'
    | undefined => {
    if (aid === undefined) return undefined

    if (
      aid.beneficiary_application_type === 'assistance' &&
      aid.category_issue === 'hlp' &&
      hlpDocDateFields.some((field) => typeof aid[field] === 'string')
    )
      return 'assistance-hlp-with-docs'

    if (aid.beneficiary_application_type === 'assistance' && aid.category_issue === 'hlp') return 'assistance-hlp'

    if (
      aid.beneficiary_application_type === 'assistance' &&
      aid.category_issue === 'general_protection' &&
      civilDocDateFields.some((field) => typeof aid[field] === 'string')
    )
      return 'assistance-with-docs'

    if (aid.beneficiary_application_type === 'assistance' && aid.category_issue === 'general_protection')
      return 'assistance'

    return 'counselling'
  }

  const legalAidKoboMapper = (data: Legal_individual_aid.T[]) => {
    // @ts-expect-error No id is expected in type, but it really is there
    return data.map(({oblast, raion, hromada, displacement, id, ...record}) => {
      return {
        ...record,
        koboId: id,
        oblast: KoboXmlMapper.Location.mapOblast(oblast)?.name,
        raion: KoboXmlMapper.Location.searchRaion(raion),
        hromada: KoboXmlMapper.Location.searchHromada(hromada),
        project: DrcProjectHelper.search(record.number_case?.[0]!.project)!,
        activity: getActivityType(
          record.number_case?.[0] as NonNullable<Legal_individual_aid.T['number_case']>[number],
        ),
        displacement: match(displacement)
          .cases({
            idp: Person.DisplacementStatus.Idp,
            non_idp: Person.DisplacementStatus.NonDisplaced,
            returnee: Person.DisplacementStatus.NonDisplaced,
          })
          .default(Person.DisplacementStatus.Idp),
      }
    })
  }

  export const req =
    (api: ApiSdk) =>
    async (period: Partial<Period>): Promise<Bundle[]> => {
      const periodStr = AiMapper.getPeriodStr(period)

      return api.kobo.answer
        .searchByAccess({formId: KoboIndex.byName('legal_individual_aid').id})
        .then(({data}) =>
          (data as unknown as Legal_individual_aid.T[]).map(({number_case, ...rest}) => {
            // select only closed and ready to be reported
            const aids = number_case?.filter(
              ({status_case, date_case_closure}) =>
                status_case === 'closed_ready' &&
                date_case_closure !== undefined &&
                PeriodHelper.isDateIn(period, new Date(date_case_closure)),
            )

            return aids !== undefined && aids.length > 0
              ? {
                  ...rest,
                  number_case: [pickPrioritizedAid(aids)],
                }
              : undefined
          }),
        )
        .then(seq)
        .then((data) => data.compact())
        .then((data) => mapActivity(data, periodStr))
    }

  const mapActivity = async (data: Legal_individual_aid.T[], periodStr: string): Promise<Bundle[]> => {
    const res: Bundle[] = []
    let i = 0
    await Promise.all(
      groupBy({
        data: legalAidKoboMapper(data),
        groups: [
          {by: (_) => _.oblast!},
          {by: (_) => _.raion!},
          {by: (_) => _.hromada!},
          {by: (_) => _.settlement!},
          {by: (_) => _.project},
          {by: (_) => _.displacement},
        ],
        finalTransform: async (grouped, [oblast, raion, hromada, settlement, project, displacement]) => {
          const recordId = ActivityInfoSdk.makeRecordId({
            prefix: 'drcila',
            periodStr,
            index: i++,
          })
          const activity: AiLegalType.Type = {
            Oblast: oblast,
            Raion: raion,
            Hromada: hromada,
            Settlement: settlement,
            'Plan/Project Code': getPlanCode(project),
            'Reporting Organization': 'Danish Refugee Council (DRC)',
          }
          const subActivities = mapSubActivity(
            grouped.filter((item) => item.displacement === displacement),
            periodStr,
          )
          const activityPrebuilt = {
            ...activity,
            ...(await AiMapper.getLocationRecordIdByMeta({oblast, raion, hromada, settlement})),
            'Activities and People': subActivities.map((_) => _.activity),
          }
          const requestBody = ActivityInfoSdk.wrapRequest(AiLegalType.buildRequest(activityPrebuilt, recordId))
          subActivities.map((subActivity) => {
            res.push({
              activity,
              requestBody,
              data: subActivity.data,
              subActivity: subActivity.activity,
              recordId,
              submit: checkAiValid(
                activity.Oblast,
                activity.Raion,
                activity.Hromada,
                activity.Settlement,
                activity['Plan/Project Code'],
                ...(activity['Activities and People']?.map(
                  (_: AiLegalType.AiTypeActivitiesAndPeople) => _.Indicators,
                ) ?? []),
              ),
            })
          })
        },
      }).transforms,
    ).then((_) => _.flat())

    return res
  }

  const mapSubActivity = (
    data: ReturnType<typeof legalAidKoboMapper>,
    periodStr: string,
  ): {activity: AiLegalType.AiTypeActivitiesAndPeople.Type; data: ReturnType<typeof legalAidKoboMapper>}[] => {
    const res: {
      activity: AiLegalType.AiTypeActivitiesAndPeople.Type
      data: ReturnType<typeof legalAidKoboMapper>
    }[] = []

    groupBy({
      data,
      groups: [{by: (_) => _.activity!}],
      finalTransform: (grouped, [activity]) => {
        const displacement = grouped[0].displacement
        const disaggregation = AiMapper.disaggregatePersons(
          grouped
            .map(({age, gender, vulnerability_detail}) => ({
              age,
              gender: match(gender).cases({male: Person.Gender.Male, female: Person.Gender.Female}).default(undefined),
              ...(vulnerability_detail?.includes('pwd') ? {disability: [Person.WgDisability.See]} : {}),
            }))
            .compact(),
        )
        res.push({
          data: grouped,
          activity: {
            'Response Theme': 'No specific theme',
            Indicators: match(activity)
              .cases({
                'assistance-hlp-with-docs':
                  'Legal assistance - HLP > # of individuals who successfully secured HLP documentation',
                'assistance-hlp':
                  'Legal assistance - HLP > # of individuals who received legal assistance on HLP issues',
                'assistance-with-docs':
                  'Legal assistance - Protection > # of individuals who successfully secured civil documentation',
                assistance: 'Legal assistance - Protection > # of individuals who received legal assistance',
                counselling: 'Protection counselling > # of individuals who received protection counselling',
              } as const)
              .default(() => `${aiInvalidValueFlag} acivity` as AiLegalType.AiTypeActivitiesAndPeople['Indicators']),
            'Population Group': AiMapper.mapPopulationGroup(displacement),
            'Reporting Month': periodStr === '2025-05' ? '2025-06' : periodStr,
            'Total Individuals Reached': disaggregation['Total Individuals Reached'] ?? 0,
            'Girls (0-17)': disaggregation['Girls (0-17)'] ?? 0,
            'Boys (0-17)': disaggregation['Boys (0-17)'] ?? 0,
            'Adult Women (18-59)': disaggregation['Adult Women (18-59)'] ?? 0,
            'Adult Men (18-59)': disaggregation['Adult Men (18-59)'] ?? 0,
            'Older Women (60+)': disaggregation['Older Women (60+)'] ?? 0,
            'Older Men (60+)': disaggregation['Older Men (60+)'] ?? 0,
            'People with Disability': disaggregation['People with Disability'] ?? 0,
          },
        })
      },
    }).transforms

    return res
  }
}

export {AiLegalMapper}
