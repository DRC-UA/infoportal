import {ApiSdk} from '@/core/sdk/server/ApiSdk'
import {aiInvalidValueFlag, AiTable, checkAiValid} from '@/features/ActivityInfo/shared/AiTable'
import {AiProtectionType} from '@/features/ActivityInfo/Protection/aiProtectionType'
import {DrcProgram, DrcProject, groupBy, IKoboMeta, KoboMetaStatus, Period, PeriodHelper} from 'infoportal-common'
import {match} from '@axanc/ts-utils'
import {AiMapper} from '@/features/ActivityInfo/shared/AiMapper'
import {ActivityInfoSdk} from '@/core/sdk/server/activity-info/ActiviftyInfoSdk'

export namespace AiProtectionMapper {
  type Bundle = AiTable<AiProtectionType.Type, AiProtectionType.AiTypeActivitiesAndPeople>

  const getPlanCode = (project?: DrcProject): AiProtectionType.Type['Plan/Project Code'] => {
    // @ts-expect-error It's OK to get an error here, we expect it to flag missing or mismatching data
    return match(project)
      .cases({
        // [DrcProject['UKR-000336 UHF6']]: 'PRT-DRC-0000_',
        [DrcProject['UKR-000363 UHF8']]: 'PRT-DRC-00003',
        [DrcProject['UKR-000372 ECHO3']]: 'PRT-DRC-00002',
        [DrcProject['UKR-000355 Danish MFA']]: 'PRT-DRC-00004',
        // [DrcProject['UKR-000345 BHA2']]: 'PRT-DRC-0000_',
        // UKR-000372 ECHO3
        // UKR-000363 UHF8
        // UKR-000345 BHA2
        // UKR-000336 UHF6
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
            DrcProgram.Counselling,
            DrcProgram.MHPSSActivities,
            DrcProgram.PGS,
            DrcProgram.ProtectionMonitoring,
            DrcProgram.CommunityLevelPm,
            DrcProgram.Referral,
          ],
          status: [KoboMetaStatus.Committed],
        })
        .then((response) => response.data.filter((row) => PeriodHelper.isDateIn(period, row.lastStatusUpdate)))
        .then((data) => mapActivity(data, periodStr))
    }

  const mapActivity = async (data: IKoboMeta[], periodStr: string): Promise<Bundle[]> => {
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
          const activity: AiProtectionType.Type = {
            Oblast: oblast,
            Raion: raion,
            Hromada: hromada,
            Settlement: settlement,
            'Plan/Project Code': getPlanCode(project),
            'Reporting Organization': 'Danish Refugee Council (DRC)',
            'Response Theme': 'No specific theme',
          }
          const subActivities = mapSubActivity(grouped, periodStr)
          const activityPrebuilt = {
            ...activity,
            ...(await AiMapper.getLocationRecordIdByMeta({oblast, raion, hromada, settlement})),
            'Activities and People': subActivities.map((_) => _.activity),
          }
          subActivities.map((subActivity) => {
            const recordId = ActivityInfoSdk.makeRecordId({
              prefix: 'drcprot',
              periodStr,
              index: i++,
            })
            res.push({
              activity,
              requestBody: ActivityInfoSdk.wrapRequest(AiProtectionType.buildRequest(activityPrebuilt, recordId)),
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
                  (_: AiProtectionType.AiTypeActivitiesAndPeople) => _.Indicators,
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
  ): {activity: AiProtectionType.AiTypeActivitiesAndPeople; data: IKoboMeta[]}[] => {
    const res: {activity: AiProtectionType.AiTypeActivitiesAndPeople; data: IKoboMeta[]}[] = []
    groupBy({
      data,
      groups: [{by: (_) => _.activity!}, {by: (_) => _.displacement!}],
      finalTransform: (grouped, [activity, displacement]) => {
        const disaggregation = AiMapper.disaggregatePersons(grouped.flatMap((_) => _.persons).compact())
        res.push({
          data: grouped,
          activity: {
            Indicators: match<DrcProgram>(activity)
              .cases({
                [DrcProgram.Counselling]:
                  'Protection counselling > # of individuals who received protection counselling',
                [DrcProgram.FGD]:
                  'Protection monitoring at the community level > # of key informants reached through community level protection monitoring',
                [DrcProgram.PGS]:
                  'Psychosocial support (individual and groups) - Protection > # of individuals who received individual or group-based psychosocial support',
                [DrcProgram.MHPSSActivities]:
                  'Psychosocial support (individual and groups) - Protection > # of individuals who received individual or group-based psychosocial support',
                [DrcProgram.ProtectionMonitoring]:
                  'Protection monitoring at household level > # of individuals reached through protection monitoring at the household level',
                [DrcProgram.CommunityLevelPm]:
                  'Protection monitoring at the community level > # of key informants reached through community level protection monitoring',
                [DrcProgram.AwarenessRaisingSession]:
                  'Awareness raising - Protection & HLP > # of individuals who participated in awareness raising activities on Protection',
                [DrcProgram.Referral]:
                  'Referral to specialized services > # of individuals with specific needs referred to specialized services and assistance (Internal/External referrals)',
              } as const)
              .default(
                () => `${aiInvalidValueFlag} acivity` as AiProtectionType.AiTypeActivitiesAndPeople['Indicators'],
              ),
            'Population Group': AiMapper.mapPopulationGroup(displacement),
            'Reporting Month': periodStr === '2025-01' ? '2025-02' : periodStr,
            ...match<DrcProgram>(activity)
              .cases({
                [DrcProgram.FGD]: {
                  'Total Individuals Reached': null as any,
                  'Girls (0-17)': null as any,
                  'Boys (0-17)': null as any,
                  'Adult Women (18-59)': null as any,
                  'Adult Men (18-59)': null as any,
                  'Older Women (60+)': null as any,
                  'Older Men (60+)': null as any,
                  'People with Disability': null as any,
                  'Non-individuals Reached/Quantity': grouped.length,
                },
                [DrcProgram.CommunityLevelPm]: {
                  'Total Individuals Reached': disaggregation['Total Individuals Reached'] ?? 0,
                  'Girls (0-17)': disaggregation['Girls (0-17)'] ?? 0,
                  'Boys (0-17)': disaggregation['Boys (0-17)'] ?? 0,
                  'Adult Women (18-59)': disaggregation['Adult Women (18-59)'] ?? 0,
                  'Adult Men (18-59)': disaggregation['Adult Men (18-59)'] ?? 0,
                  'Older Women (60+)': disaggregation['Older Women (60+)'] ?? 0,
                  'Older Men (60+)': disaggregation['Older Men (60+)'] ?? 0,
                  'People with Disability': disaggregation['People with Disability'] ?? 0,
                  'Non-individuals Reached/Quantity': null as any,
                },
              })
              .default(() => {
                return {
                  'Total Individuals Reached': disaggregation['Total Individuals Reached'] ?? 0,
                  'Girls (0-17)': disaggregation['Girls (0-17)'] ?? 0,
                  'Boys (0-17)': disaggregation['Boys (0-17)'] ?? 0,
                  'Adult Women (18-59)': disaggregation['Adult Women (18-59)'] ?? 0,
                  'Adult Men (18-59)': disaggregation['Adult Men (18-59)'] ?? 0,
                  'Older Women (60+)': disaggregation['Older Women (60+)'] ?? 0,
                  'Older Men (60+)': disaggregation['Older Men (60+)'] ?? 0,
                  'People with Disability': null as any,
                  'Non-individuals Reached/Quantity': null as any,
                }
              }),
          },
        })
      },
    }).transforms

    return res
  }
}
