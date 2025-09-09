import {match, seq, type Seq} from '@axanc/ts-utils'

import {DrcProgram, DrcProject, groupBy, IKoboMeta, KoboMetaStatus, PeriodHelper, type Period} from 'infoportal-common'

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

  export const req =
    (api: ApiSdk) =>
    async (period: Partial<Period>): Promise<Bundle[]> => {
      const periodStr = AiMapper.getPeriodStr(period)

      return api.koboMeta
        .search({
          activities: [
            DrcProgram.Legal,
            DrcProgram.LegalAid,
            DrcProgram.LegalAssistanceHlpDocs,
            DrcProgram.LegalAssistanceHlp,
            DrcProgram.LegalAssistanceCivilDocs,
            DrcProgram.LegalAssistanceCivil,
            DrcProgram.LegalCounselling,
          ],
          status: [KoboMetaStatus.Committed],
        })
        .then(({data}) => data.filter((row) => PeriodHelper.isDateIn(period, row.lastStatusUpdate)))
        .then(seq)
        .then((data) => mapActivity(data, periodStr))
    }

  const mapActivity = async (data: Seq<IKoboMeta>, periodStr: string): Promise<Bundle[]> => {
    const res: Bundle[] = []
    let i = 0
    await Promise.all(
      groupBy({
        data,
        groups: [
          {by: (_) => _.oblast!},
          {by: (_) => _.raion!},
          {by: (_) => _.hromada!},
          {by: (_) => _.settlement!},
          {by: (_) => _.project[0]},
        ],
        finalTransform: async (grouped, [oblast, raion, hromada, settlement, project]) => {
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
          const subActivities = mapSubActivity(grouped, periodStr)
          subActivities.map(async (subActivity) => {
            res.push({
              activity,
              requestBody: {
                ...activity,
                ...(await AiMapper.getLocationRecordIdByMeta({oblast, raion, hromada, settlement})),
                'Activities and People': [subActivity.activity],
              },
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
    data: IKoboMeta[],
    periodStr: string,
  ): {activity: AiLegalType.AiTypeActivitiesAndPeople.Type; data: IKoboMeta[]}[] => {
    const res: {
      activity: AiLegalType.AiTypeActivitiesAndPeople.Type
      data: IKoboMeta[]
    }[] = []

    groupBy({
      data,
      groups: [{by: ({activity}) => activity!}, {by: ({displacement}) => displacement!}],
      finalTransform: (grouped, [activity, displacement]) => {
        const disaggregation = AiMapper.disaggregatePersons(grouped.flatMap(({persons}) => persons).compact())
        res.push({
          data: grouped,
          activity: {
            'Response Theme': 'No specific theme',
            Indicators: match(activity)
              .cases({
                [DrcProgram.LegalAssistanceHlpDocs]:
                  'Legal assistance - HLP > # of individuals who successfully secured HLP documentation',
                [DrcProgram.LegalAssistanceHlp]:
                  'Legal assistance - HLP > # of individuals who received legal assistance on HLP issues',
                [DrcProgram.LegalAssistanceCivilDocs]:
                  'Legal assistance - Protection > # of individuals who successfully secured civil documentation',
                [DrcProgram.LegalAssistanceCivil]:
                  'Legal assistance - Protection > # of individuals who received legal assistance',
                [DrcProgram.LegalCounselling]:
                  'Protection counselling > # of individuals who received protection counselling',
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
