import {
  DrcProgram,
  DrcProject,
  groupBy,
  KoboMetaShelterRepairTags,
  KoboMetaStatus,
  PeriodHelper,
  Person,
  ShelterTaPriceLevel,
} from 'infoportal-common'
import {fnSwitch} from '@axanc/ts-utils'
import {ActivityInfoSdk} from '@/core/sdk/server/activity-info/ActiviftyInfoSdk'
import {ApiSdk} from '@/core/sdk/server/ApiSdk'
import {aiInvalidValueFlag, AiTable, checkAiValid} from '@/features/ActivityInfo/shared/AiTable'
import {AiSnfiType} from '@/features/ActivityInfo/Snfi/aiSnfiType'
import {AiMapper} from '@/features/ActivityInfo/shared/AiMapper'
import {activitiesConfig} from '@/features/ActivityInfo/ActivityInfo'
import {Period} from 'infoportal-common'
import {AiMpcaType} from '@/features/ActivityInfo/Mpca/aiMpcaType'

export namespace AiShelterMapper {
  const planCodes = {
    // TODO Setup new projects
    // [DrcProject['UKR-000390 UHF9']]: 'SNFI-DRC-00016',
  }

  const getPlanCode = (p: DrcProject): AiSnfiType.Type['Plan/Project Code'] => {
    // @ts-ignore
    return planCodes[p] ?? `${aiInvalidValueFlag} ${p}`
  }

  export type Bundle = AiTable<AiSnfiType.Type>

  export const reqEsk =
    (api: ApiSdk) =>
    (period: Partial<Period>): Promise<Bundle[]> => {
      const periodStr = AiMapper.getPeriodStr(period)
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
        .then((_) => _.data.filter((_) => PeriodHelper.isDateIn(period, _.lastStatusUpdate)))
        .then((data) => {
          let i = 0
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
                const disaggregation = AiMapper.disaggregatePersons(grouped.flatMap((_) => _.persons).compact())
                const ai: AiSnfiType.Type = {
                  Oblast: oblast,
                  Raion: raion,
                  Hromada: hromada,
                  Settlement: settlement,
                  'Indicators - SNFI': fnSwitch(
                    activity,
                    {
                      [DrcProgram.ESK]: 'Emergency Shelter Support > # supported with emergency shelter kits > in-kind',
                      [DrcProgram.CashForFuel]: 'Winter Heating > # supported with winter energy > cash-voucher',
                      [DrcProgram.CashForUtilities]:
                        'Winter Heating > # supported with cash for utilities > cash-voucher',
                      [DrcProgram.CashForRent]: 'Rental support > # received rental support (RMI) > cash-voucher',
                      [DrcProgram.CashForRepair]: 'Humanitarian repair > # supported with light repairs > cash-voucher',
                    },
                    () => aiInvalidValueFlag as keyof (typeof AiSnfiType.options)['Indicators - SNFI'],
                  ),
                  'Implementing Partner': 'Danish Refugee Council (DRC)',
                  'Plan/Project Code': getPlanCode(project),
                  'Reporting Organization': 'Danish Refugee Council (DRC)',
                  'Reporting Month': fnSwitch(
                    periodStr,
                    {
                      '2024-01': '2024-03',
                      '2024-02': '2024-03',
                    },
                    () => periodStr,
                  ),
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
                  prefix: 'drcsnfi',
                  periodStr,
                  index: i++,
                })
                const request = AiSnfiType.buildRequest(
                  {
                    ...ai,
                    ...AiMapper.getLocationRecordIdByMeta({oblast, raion, hromada, settlement}),
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

  export const reqRepairs = (api: ApiSdk) => (period: Partial<Period>) => {
    const periodStr = AiMapper.getPeriodStr(period)
    return api.koboMeta
      .search<KoboMetaShelterRepairTags>({
        status: [KoboMetaStatus.Committed],
        activities: [DrcProgram.ShelterRepair],
      })
      .then((_) => _.data.filter((_) => PeriodHelper.isDateIn(period, _.lastStatusUpdate)))
      .then(async (data) => {
        let i = 0
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
                by: (_) => {
                  return fnSwitch(
                    _.tags?.damageLevel!,
                    {
                      [ShelterTaPriceLevel.Heavy]: ShelterTaPriceLevel.Medium,
                      [ShelterTaPriceLevel.Medium]: ShelterTaPriceLevel.Medium,
                      [ShelterTaPriceLevel.Light]: ShelterTaPriceLevel.Light,
                    },
                    (_) => _,
                  )
                },
              },
              {by: (row) => row.displacement!},
            ],
            finalTransform: async (grouped, [project, oblast, raion, hromada, settlement, damageLevel, status]) => {
              const disagg = AiMapper.disaggregatePersons(grouped.flatMap((_) => _.persons ?? []))
              const ai: AiSnfiType.Type = {
                Oblast: oblast,
                Raion: raion,
                Hromada: hromada,
                Settlement: settlement,
                'Indicators - SNFI': fnSwitch(
                  damageLevel,
                  {
                    [ShelterTaPriceLevel.Light]: 'Humanitarian repair > # supported with light repairs > in-kind',
                    [ShelterTaPriceLevel.Medium]: 'Humanitarian repair > # supported with medium repairs > in-kind',
                    [ShelterTaPriceLevel.Heavy]: 'Humanitarian repair > # supported with heavy repairs > in-kind',
                  },
                  () => 'Humanitarian repair > # supported with medium repairs > in-kind',
                ),
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
                prefix: 'drcsnfi',
                periodStr: periodStr,
                index: i++,
              })
              const request = AiSnfiType.buildRequest(
                {
                  ...ai,
                  ...AiMapper.getLocationRecordIdByMeta({oblast, raion, hromada, settlement}),
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
