import {match} from '@axanc/ts-utils'

import {
  AssistanceModality,
  DrcProgram,
  DrcProject,
  groupBy,
  KoboMetaShelterRepairTags,
  KoboMetaStatus,
  Period,
  PeriodHelper,
  ShelterTaPriceLevel,
} from 'infoportal-common'

import {ActivityInfoSdk} from '@/core/sdk/server/activity-info/ActiviftyInfoSdk'
import {ApiSdk} from '@/core/sdk/server/ApiSdk'
import {aiInvalidValueFlag, AiTable, checkAiValid} from '@/features/ActivityInfo/shared/AiTable'
import {AiTypeSnfiRmm} from '@/features/ActivityInfo/Snfi/aiSnfiType'
import {AiMapper} from '@/features/ActivityInfo/shared/AiMapper'

export namespace AiShelterMapper {
  const planCodes = {
    [DrcProject['UKR-000345 BHA2']]: 'SNFI-DRC-00004',
    [DrcProject['UKR-000355 Danish MFA']]: 'SNFI-DRC-00005',
    [DrcProject['UKR-000363 UHF8']]: 'SNFI-DRC-00006',
    [DrcProject['UKR-000372 ECHO3']]: 'SNFI-DRC-00003',
    [DrcProject['UKR-000386 Pooled Funds']]: 'SNFI-DRC-00011',
    [DrcProject['UKR-000390 UHF9']]: 'SNFI-DRC-00007',
    [DrcProject['UKR-000397 GFFO']]: 'SNFI-DRC-00008',
    [DrcProject['UKR-000399 SDC']]: 'SNFI-DRC-00009',
    [DrcProject['UKR-000423 ECHO4']]: 'SNFI-DRC-00010',
  }

  const getPlanCode = (p: DrcProject): AiTypeSnfiRmm.Type['Plan/Project Code'] => {
    // @ts-expect-error This is intentional
    return planCodes[p] ?? `${aiInvalidValueFlag} ${p}`
  }

  export type Bundle = AiTable<AiTypeSnfiRmm.Type>

  export const reqEsk =
    (api: ApiSdk) =>
    async (period: Partial<Period>): Promise<Bundle[]> => {
      const periodStr = AiMapper.getPeriodStr(period)
      let index = 0
      return api.koboMeta
        .search({
          status: [KoboMetaStatus.Committed],
          activities: [
            DrcProgram.ESK,
            DrcProgram.CashForFuel,
            DrcProgram.CashForUtilities,
            DrcProgram.CashForRent,
            DrcProgram.CashForRepair,
          ],
        })
        .then((response) => response.data.filter((record) => PeriodHelper.isDateIn(period, record.lastStatusUpdate)))
        .then((data) => {
          return Promise.all(
            groupBy({
              data,
              groups: [
                {by: (_) => _.project?.[0]!},
                {by: (_) => _.oblast!},
                {by: (_) => _.raion!},
                {by: (_) => _.hromada!},
                {by: (_) => _.settlement!},
                {by: (_) => _.displacement!},
                {by: (_) => _.activity!},
              ],
              finalTransform: async (
                grouped,
                [project, oblast, raion, hromada, settlement, displacement, activity],
              ) => {
                const disaggregation = AiMapper.disaggregatePersons(
                  grouped.flatMap((record) => record.persons).compact(),
                )
                const ai: AiTypeSnfiRmm.Type = {
                  Oblast: oblast,
                  Raion: raion,
                  Hromada: hromada,
                  Settlement: settlement,
                  'Indicators - SNFI': match(activity)
                    .cases({
                      [DrcProgram.ESK]: 'Emergency Shelter Support > # supported with emergency shelter kits > in-kind',
                      [DrcProgram.CashForFuel]: 'Winter Heating > # supported with winter energy > cash-voucher',
                      [DrcProgram.CashForUtilities]:
                        'Winter Heating > # supported with cash for utilities > cash-voucher',
                      [DrcProgram.CashForRent]: 'Rental support > # received rental support (RMI) > cash-voucher',
                      [DrcProgram.CashForRepair]: 'Humanitarian repair > # supported with light repairs > cash-voucher',
                    } as const)
                    .default(() => aiInvalidValueFlag as keyof (typeof AiTypeSnfiRmm.options)['Indicators - SNFI']),
                  'Implementing Partner': 'Danish Refugee Council (DRC)',
                  'Plan/Project Code': getPlanCode(project),
                  'Reporting Organization': 'Danish Refugee Council (DRC)',
                  'Reporting Month': match(periodStr)
                    .cases({
                      '2024-01': '2024-03',
                      '2024-02': '2024-03',
                    })
                    .default(() => periodStr),
                  'Population Group': AiMapper.mapPopulationGroup(displacement),
                  'Non-individuals Reached': grouped.length,
                  'Total Individuals Reached': disaggregation['Total Individuals Reached'] ?? 0,
                  'Girls (0-17)': disaggregation['Girls (0-17)'] ?? 0,
                  'Boys (0-17)': disaggregation['Boys (0-17)'] ?? 0,
                  'Adult Women (18-59)': disaggregation['Adult Women (18-59)'] ?? 0,
                  'Adult Men (18-59)': disaggregation['Adult Men (18-59)'] ?? 0,
                  'Older Women (60+)': disaggregation['Older Women (60+)'] ?? 0,
                  'Older Men (60+)': disaggregation['Older Men (60+)'] ?? 0,
                  'People with disability': 0,
                  'Distribution through Common Pipeline': 'No',
                }
                const recordId = ActivityInfoSdk.makeRecordId({
                  prefix: 'drcsnfiesk',
                  periodStr,
                  index: index++,
                })
                const request = AiTypeSnfiRmm.buildRequest(
                  {
                    ...ai,
                    ...(await AiMapper.getLocationRecordIdByMeta({oblast, raion, hromada, settlement})),
                  },
                  recordId,
                )
                return {
                  submit: checkAiValid(ai.Oblast, ai.Raion, ai.Hromada, ai.Settlement, ai['Plan/Project Code']),
                  recordId,
                  data: grouped,
                  activity: ai,
                  requestBody: ActivityInfoSdk.wrapRequest(request),
                }
              },
            }).transforms,
          )
        })
    }

  export const reqRepairs = (api: ApiSdk) => async (period: Partial<Period>) => {
    const periodStr = AiMapper.getPeriodStr(period)
    return api.koboMeta
      .search<KoboMetaShelterRepairTags>({
        status: [KoboMetaStatus.Committed],
        activities: [DrcProgram.ShelterRepair],
      })
      .then((response) => response.data.filter((row) => PeriodHelper.isDateIn(period, row.lastStatusUpdate)))
      .then((data) => {
        let index = 0
        return Promise.all(
          groupBy({
            data: data,
            groups: [
              {by: (_) => _.project?.[0]!},
              {by: (_) => _.oblast!},
              {by: (_) => _.raion!},
              {by: (_) => _.hromada!},
              {by: (_) => _.settlement!},
              {
                by: (_) =>
                  match(_.tags?.damageLevel!)
                    .cases({
                      [ShelterTaPriceLevel.Heavy]: ShelterTaPriceLevel.Medium,
                      [ShelterTaPriceLevel.Medium]: ShelterTaPriceLevel.Medium,
                      [ShelterTaPriceLevel.Light]: ShelterTaPriceLevel.Light,
                    })
                    .default((_: unknown) => _ as any),
              },
              {by: (row) => row.displacement!},
            ],
            finalTransform: async (grouped, [project, oblast, raion, hromada, settlement, damageLevel, status]) => {
              const disagg = AiMapper.disaggregatePersons(grouped.flatMap((record) => record.persons ?? []))
              const ai: AiTypeSnfiRmm.Type = {
                Oblast: oblast,
                Raion: raion,
                Hromada: hromada,
                Settlement: settlement,
                'Indicators - SNFI': match(damageLevel)
                  .cases({
                    [ShelterTaPriceLevel.Light]: 'Humanitarian repair > # supported with light repairs > in-kind',
                    [ShelterTaPriceLevel.Medium]: 'Humanitarian repair > # supported with medium repairs > in-kind',
                    [ShelterTaPriceLevel.Heavy]: 'Humanitarian repair > # supported with heavy repairs > in-kind',
                  } as const)
                  .default(() => 'Humanitarian repair > # supported with medium repairs > in-kind'),
                'Implementing Partner': 'Danish Refugee Council (DRC)',
                'Plan/Project Code': getPlanCode(project),
                'Reporting Organization': 'Danish Refugee Council (DRC)',
                'Reporting Month': periodStr === '2025-01' ? '2025-02' : periodStr,
                'Population Group': AiMapper.mapPopulationGroup(status),
                'Non-individuals Reached': grouped.length,
                'Adult Men (18-59)': disagg['Adult Men (18-59)'] ?? 0,
                'Adult Women (18-59)': disagg['Adult Women (18-59)'] ?? 0,
                'Boys (0-17)': disagg['Boys (0-17)'] ?? 0,
                'Girls (0-17)': disagg['Girls (0-17)'] ?? 0,
                'Older Women (60+)': disagg['Older Women (60+)'] ?? 0,
                'Older Men (60+)': disagg['Older Men (60+)'] ?? 0,
                'Total Individuals Reached': disagg['Total Individuals Reached'] ?? 0,
                'Distribution through Common Pipeline': 'No',
              }
              const recordId = ActivityInfoSdk.makeRecordId({
                prefix: 'drcsnfirep',
                periodStr: periodStr,
                index: index++,
              })
              const request = AiTypeSnfiRmm.buildRequest(
                {
                  ...ai,
                  ...(await AiMapper.getLocationRecordIdByMeta({oblast, raion, hromada, settlement})),
                },
                recordId,
              )

              return {
                recordId,
                data: grouped,
                activity: ai,
                requestBody: ActivityInfoSdk.wrapRequest(request),
                submit: checkAiValid(ai.Oblast, ai.Raion, ai.Hromada, ai.Settlement, ai['Plan/Project Code']),
              }
            },
          }).transforms,
        )
      })
  }

  export const reqCommonSpacesRepairs = (api: ApiSdk) => async (period: Partial<Period>) => {
    const periodStr = AiMapper.getPeriodStr(period)
    return api.koboMeta
      .search<KoboMetaShelterRepairTags>({
        status: [KoboMetaStatus.Committed],
        activities: [DrcProgram.ShelterCommonSpacesRepair],
      })
      .then((response) => response.data.filter((row) => PeriodHelper.isDateIn(period, row.lastStatusUpdate)))
      .then((data) => {
        let index = 0
        return Promise.all(
          groupBy({
            data: data,
            groups: [
              {by: ({project}) => project?.[0]!},
              {by: ({oblast}) => oblast!},
              {by: ({raion}) => raion!},
              {by: ({hromada}) => hromada!},
              {by: ({settlement}) => settlement!},
              {by: ({modality}) => modality!},
              {by: (row) => row.displacement!},
            ],
            finalTransform: async (grouped, [project, oblast, raion, hromada, settlement, modality, status]) => {
              const disagg = AiMapper.disaggregatePersons(grouped.flatMap((record) => record.persons ?? []))
              const ai: AiTypeSnfiRmm.Type = {
                Oblast: oblast,
                Raion: raion,
                Hromada: hromada,
                Settlement: settlement,
                'Indicators - SNFI': match(modality)
                  .cases({
                    [AssistanceModality.Cash]:
                      'Humanitarian repair > # supported through repairs of common spaces > cash-voucher',
                  } as const)
                  .default(() => 'Humanitarian repair > # supported through repairs of common spaces > in-kind'),
                'Implementing Partner': 'Danish Refugee Council (DRC)',
                'Plan/Project Code': getPlanCode(project),
                'Reporting Organization': 'Danish Refugee Council (DRC)',
                'Reporting Month': periodStr,
                'Population Group': AiMapper.mapPopulationGroup(status),
                'Non-individuals Reached': grouped.length,
                'Adult Men (18-59)': disagg['Adult Men (18-59)'] ?? 0,
                'Adult Women (18-59)': disagg['Adult Women (18-59)'] ?? 0,
                'Boys (0-17)': disagg['Boys (0-17)'] ?? 0,
                'Girls (0-17)': disagg['Girls (0-17)'] ?? 0,
                'Older Women (60+)': disagg['Older Women (60+)'] ?? 0,
                'Older Men (60+)': disagg['Older Men (60+)'] ?? 0,
                'Total Individuals Reached': disagg['Total Individuals Reached'] ?? 0,
              }
              const recordId = ActivityInfoSdk.makeRecordId({
                prefix: 'drcsnficsr',
                periodStr: periodStr,
                index: index++,
              })
              const request = AiTypeSnfiRmm.buildRequest(
                {
                  ...ai,
                  ...(await AiMapper.getLocationRecordIdByMeta({oblast, raion, hromada, settlement})),
                },
                recordId,
              )

              return {
                recordId,
                data: grouped,
                activity: ai,
                requestBody: ActivityInfoSdk.wrapRequest(request),
                submit: checkAiValid(ai.Oblast, ai.Raion, ai.Hromada, ai.Settlement, ai['Plan/Project Code']),
              }
            },
          }).transforms,
        )
      })
  }
}
