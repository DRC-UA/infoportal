import {match} from '@axanc/ts-utils'

import {DrcProgram, DrcProject, groupBy, KoboMetaStatus, Period, PeriodHelper, type IKoboMeta} from 'infoportal-common'

import type {ApiSdk} from '@/core/sdk/server/ApiSdk'
import {ActivityInfoSdk} from '@/core/sdk/server/activity-info/ActiviftyInfoSdk'
import {AiMapper} from '@/features/ActivityInfo/shared/AiMapper'
import {aiInvalidValueFlag, AiTable, checkAiValid} from '@/features/ActivityInfo/shared/AiTable'

import {AiTypeChildProtectionAorRmm} from './AiChildProtectionType'

export namespace AiChildProtectionMapper {
  type Bundle = AiTable<AiTypeChildProtectionAorRmm.Type, AiTypeChildProtectionAorRmm.AiTypeActivitiesAndPeople>

  export const request =
    (api: ApiSdk) =>
    async (period: Partial<Period>): Promise<Bundle[]> => {
      const periodStr = AiMapper.getPeriodStr(period)

      return api.koboMeta
        .search({activities: [DrcProgram.TIA], status: [KoboMetaStatus.Committed]})
        .then(({data}) => data.filter((record) => PeriodHelper.isDateIn(period, record.lastStatusUpdate)))
        .then((dataInPeriod) => dataInPeriod.filter(({persons}) => persons?.some(({age}) => age! < 18)))
        .then((families) =>
          // filter adults out
          families.map(({persons, ...rest}) => ({...rest, persons: persons?.filter(({age}) => age! < 18)})),
        )
        .then((childrenData) => mapTiaActivity(childrenData, periodStr))
    }

  const tiaPlanCode: Partial<Record<DrcProject, AiTypeChildProtectionAorRmm['Plan/Project Code']>> = {
    [DrcProject['UKR-000397 GFFO']]: 'CP-DRC-00001',
    [DrcProject['UKR-000372 ECHO3']]: 'CP-DRC-00002',
    [DrcProject['UKR-000363 UHF8']]: 'CP-DRC-00003',
    [DrcProject['UKR-000350 SIDA']]: 'CP-DRC-00004',
  } as const

  const mapTiaActivity = (data: IKoboMeta[], periodStr: string): Bundle[] => {
    const res: Bundle[] = []
    let i = 0
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
        const settlementIso = settlement.split('_')[1]?.toUpperCase()
        const activity: AiTypeChildProtectionAorRmm.Type = {
          // @ts-expect-error it's an intention to flag an error here
          'Plan/Project Code': tiaPlanCode[project] ?? `${aiInvalidValueFlag} ${project}`,
          'Reporting Organization': 'Danish Refugee Council (DRC)',
          'Response theme': 'No specific theme',
          Oblast: oblast,
          Raion: raion,
          Hromada: hromada,
          Settlement: settlement,
          ID: `${tiaPlanCode[project] ?? `${aiInvalidValueFlag} `}${settlementIso ?? `UA ${aiInvalidValueFlag}`}`,
        }
        const subActivities = mapSubActivity(grouped, periodStr)
        const activityPrebuilt = {
          ...activity,
          ...(await AiMapper.getLocationRecordIdByMeta({oblast, raion, hromada, settlement: settlementIso})),
          'Activities and People': subActivities.map((_) => _.activity),
        }
        const recordId = ActivityInfoSdk.makeRecordId({
          prefix: 'drccp',
          periodStr,
          index: i++,
        })
        return subActivities.map((subActivity) => {
          res.push({
            activity,
            data: subActivity.data,
            requestBody: ActivityInfoSdk.wrapRequest(
              AiTypeChildProtectionAorRmm.buildRequest(activityPrebuilt, recordId),
            ),
            subActivity: subActivity.activity,
            recordId,
            submit: checkAiValid(
              activity.Oblast,
              activity.Raion,
              activity.Hromada,
              activity.Settlement,
              activity['Plan/Project Code'],
              ...(activity['Activities and People']?.map(
                (_: AiTypeChildProtectionAorRmm.AiTypeActivitiesAndPeople) => _.Indicators,
              ) ?? []),
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
  ): {activity: AiTypeChildProtectionAorRmm.AiTypeActivitiesAndPeople; data: IKoboMeta[]}[] => {
    const res: {activity: AiTypeChildProtectionAorRmm.AiTypeActivitiesAndPeople; data: IKoboMeta[]}[] = []

    groupBy({
      data,
      groups: [{by: (_) => _.activity!}, {by: (_) => _.displacement!}],
      finalTransform: (grouped, [activity, displacement]) => {
        const disaggregation = AiMapper.disaggregatePersons(grouped.flatMap((_) => _.persons).compact())
        res.push({
          data: grouped,
          activity: {
            'Non-individuals Reached/Quantity': grouped.length,
            'Reporting Month': periodStr,
            'Population Group': AiMapper.mapPopulationGroup(displacement),
            Indicators: match(activity)
              .cases({
                TIA: 'Service for children affected by, or at-risk victims of, explosive ordnance (EO)/victim assistance > # of children and caregivers who have been affected by landmine or other explosive weapons received by prevention and/or survivor assistance interventions',
              })
              .default((value: unknown) => `${aiInvalidValueFlag} ${value}` as any),
            ...disaggregation,
            'Response theme': 'No specific theme',
          },
        })
      },
    })

    return res
  }
}
