import {DrcProject, DrcSector, groupBy, IKoboMeta, KoboMetaStatus, Period, PeriodHelper} from 'infoportal-common'

import {AiGbvType} from '@/features/ActivityInfo/Gbv/aiGbvType'
import {aiInvalidValueFlag, AiTable, checkAiValid} from '@/features/ActivityInfo/shared/AiTable'
import {ApiSdk} from '@/core/sdk/server/ApiSdk'
import {AiMapper} from '@/features/ActivityInfo/shared/AiMapper'
import {match} from '@axanc/ts-utils'
import {ActivityInfoSdk} from '@/core/sdk/server/activity-info/ActiviftyInfoSdk'

export namespace AiGbvMapper2 {
  export type Bundle = AiTable<AiGbvType>

  const planCode: Record<DrcProject, AiGbvType['Plan/Project code']> = {
    [DrcProject['UKR-000345 BHA2']]: 'MISSING APM',
    [DrcProject['UKR-000372 ECHO3']]: 'GBV-DRC-00002',
    [DrcProject['UKR-000363 UHF8']]: 'GBV-DRC-00001',
    [DrcProject['UKR-000355 Danish MFA']]: 'GBV-DRC-00003',
    [DrcProject['UKR-000386 Pooled Funds']]: 'GBV-DRC-00004',
    [DrcProject['UKR-000423 ECHO4']]: 'GBV-DRC-00005',
  } as any

  export const req =
    (api: ApiSdk) =>
    async (period: Partial<Period>): Promise<Bundle[]> => {
      const periodStr = AiMapper.getPeriodStr(period)
      return api.koboMeta
        .search({
          sectors: [DrcSector.GBV],
          status: [KoboMetaStatus.Committed],
        })
        .then(({data}) => data.filter((record) => PeriodHelper.isDateIn(period, record.lastStatusUpdate)))
        .then((filteredData) => mapActivity(filteredData, periodStr))
    }

  const mapActivity = (data: IKoboMeta[], periodStr: string): Bundle[] => {
    const res: Bundle[] = []
    let i = 0
    groupBy({
      data,
      groups: [
        {by: (_) => _.oblast!},
        {by: (_) => _.raion!},
        {by: (_) => _.hromada!},
        {by: (_) => _.settlement!},
        {by: (_) => _.project?.[0]!},
      ],
      finalTransform: async (grouped, [oblast, raion, hromada, settlement, project]) => {
        const activity: AiGbvType = {
          'Plan/Project code': planCode[project],
          'Reporting Organization': 'Danish Refugee Council (DRC)',
          'Response Theme': 'No specific theme',
          Oblast: oblast,
          Raion: raion,
          Hromada: hromada,
          Settlement: settlement,
        }
        const subActivities = mapSubActivity(grouped, periodStr)
        const activityPrebuilt = {
          ...activity,
          ...(await AiMapper.getLocationRecordIdByMeta({oblast, raion, hromada, settlement})),
          'Activities and People': subActivities.map((_) => _.activity),
        }
        return subActivities.map((subActivity) => {
          const recordId = ActivityInfoSdk.makeRecordId({
            prefix: 'drcgbv',
            periodStr,
            index: i++,
          })
          res.push({
            activity,
            data: subActivity.data,
            requestBody: ActivityInfoSdk.wrapRequest(AiGbvType.buildRequest(activityPrebuilt, recordId)),
            subActivity: subActivity.activity,
            recordId,
            submit: checkAiValid(
              activity.Oblast,
              activity.Raion,
              activity.Hromada,
              activity.Settlement,
              activity['Plan/Project code'],
              ...(activity['Activities and People']?.map((_: AiGbvType.AiTypeActivitiesAndPeople) => _.Indicators) ??
                []),
            ),
          })
        })
      },
    }).transforms

    return res
  }

  const mapSubActivity = (
    data: IKoboMeta[],
    periodStr: string,
  ): {activity: AiGbvType.AiTypeActivitiesAndPeople; data: IKoboMeta[]}[] => {
    const res: {activity: AiGbvType.AiTypeActivitiesAndPeople; data: IKoboMeta[]}[] = []
    groupBy({
      data,
      groups: [{by: (_) => _.activity!}, {by: (_) => _.displacement!}],
      finalTransform: (grouped, [activity, displacement]) => {
        const disaggregation = AiMapper.disaggregatePersons(grouped.flatMap((_) => _.persons).compact())
        res.push({
          data: grouped,
          activity: {
            'Non-individuals Reached/Quantity': grouped.length,
            'Reporting Month': periodStr === '2025-01' ? '2025-02' : periodStr,
            'Population Group': AiMapper.mapPopulationGroup(displacement),
            Indicators: match(activity)
              .cases({
                WGSS: 'Support through Women and Girls Safe Spaces (WGSS) > # of women and girls who participated in skill-building, recreational, or livelihood (including vocational education) activities in women and girls safe spaces',
                DignityKits:
                  'Dignity kits to GBV survivors and those at-risk > # of women and girls at risk who received dignity kits',
                AwarenessRaisingSession:
                  'Conduct awareness raising campaigns on GBV > # of individuals reached with awareness-raising activities and GBV-lifesaving information',
                PSS: 'Psychosocial (mobile & static) support to GBV survivors and those at-risk > # of individuals provided with specialized individual or group GBV psychosocial support that meet GBViE minimum standards (not including recreational activities)',
                CapacityBuilding:
                  'Capacity Building of GBV service providers to deliver in accordance with the GBViE minimum standards > # of GBV service providers trained to deliver services in accordance with the GBViE minimum standards',
              })
              .default(() => aiInvalidValueFlag as any),
            ...disaggregation,
          },
        })
      },
    })
    return res
  }
}
