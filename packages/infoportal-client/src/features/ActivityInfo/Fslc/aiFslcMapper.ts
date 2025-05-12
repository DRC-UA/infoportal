import {ApiSdk} from '@/core/sdk/server/ApiSdk'
import {AiFslcType, AiFslType} from '@/features/ActivityInfo/Fslc/aiFslcType'
import {
  add,
  DrcProgram,
  DrcProject,
  groupBy,
  IKoboMeta,
  KoboMetaEcrecTags,
  KoboMetaStatus,
  Period,
  PeriodHelper,
  safeNumber,
} from 'infoportal-common'
import {match, Seq} from '@axanc/ts-utils'
import {ActivityInfoSdk} from '@/core/sdk/server/activity-info/ActiviftyInfoSdk'
import {aiInvalidValueFlag, AiTable, checkAiValid} from '@/features/ActivityInfo/shared/AiTable'
import {AiMapper} from '@/features/ActivityInfo/shared/AiMapper'

export namespace AiFslcMapper {
  export type Bundle = AiTable<AiFslcType>

  const getPlanCode = (_: DrcProject) => {
    return match(_)
      .cases({
        [DrcProject['UKR-000388 BHA']]: 'FSLC-DRC-00001',
        [DrcProject['UKR-000372 ECHO3']]: 'FSLC-DRC-00002',
      })
      .default(() => aiInvalidValueFlag + _)
  }

  export const reqCashRegistration =
    (api: ApiSdk) =>
    async (period: Partial<Period>): Promise<Bundle[]> => {
      const periodStr = AiMapper.getPeriodStr(period)
      let i = 0
      return api.koboMeta
        .search({
          activities: [
            DrcProgram.SectoralCashForAgriculture,
            DrcProgram.SectoralCashForAnimalShelterRepair,
            DrcProgram.SectoralCashForAnimalFeed,
            DrcProgram.MSME,
            DrcProgram.VET,
          ],
          status: [KoboMetaStatus.Committed],
        })
        .then((_) => _.data.filter((_) => PeriodHelper.isDateIn(period, _.lastStatusUpdate)))
        .then((data) => {
          return Promise.all(
            groupBy({
              data,
              groups: [
                {by: (_) => _.activity!},
                {by: (_) => _.project?.[0]!},
                {by: (_) => _.oblast!},
                {by: (_) => _.raion!},
                {by: (_) => _.hromada!},
                {by: (_) => _.settlement!},
                {by: (_) => _.displacement!},
              ],
              finalTransform: async (
                grouped: Seq<IKoboMeta<KoboMetaEcrecTags>>,
                [activity, project, oblast, raion, hromada, settlement, displacement],
              ) => {
                let disaggregation = AiMapper.disaggregatePersons(grouped.flatMap((_) => _.persons).compact())
                if (activity === DrcProgram.VET) {
                  const total = add(disaggregation['Adult Men (18-59)'] + disaggregation['Adult Women (18-59)'])
                  disaggregation = {
                    'Adult Men (18-59)': safeNumber(disaggregation['Adult Men (18-59)']),
                    'Adult Women (18-59)': safeNumber(disaggregation['Adult Women (18-59)']),
                    'Total Individuals Reached': total,
                    'People with Disability': Math.min(total, disaggregation['People with Disability']),
                  } as any
                }
                const ai: AiFslcType = {
                  'Reporting Month': match(periodStr)
                    .cases({
                      '2025-01': '2025-02',
                    })
                    .default(() => periodStr),
                  'Reporting Organization': 'Danish Refugee Council (DRC)',
                  'Activity and indicator': match(activity)
                    .cases({
                      [DrcProgram.SectoralCashForAgriculture]:
                        'Provision of agricultural inputs > # of individuals provided with emergency agriculture inputs, contributing to their food consumption > Multi purpose Agricultural grants or vouchers > Cash/Voucher',
                      [DrcProgram.SectoralCashForAnimalShelterRepair]:
                        'Provision of productive animal survival > # of individuals provided with emergency livestock inputs, contributing to their food consumption > Livestock shelter/barnes > Cash/Voucher',
                      [DrcProgram.SectoralCashForAnimalFeed]:
                        'Provision of productive animal survival > # of individuals provided with emergency livestock inputs, contributing to their food consumption > Livestock health > Cash/Voucher',
                      [DrcProgram.MSME]:
                        'Protection of emergency off-farm livelihoods > # of individuals provided with livelihoods assets restoration support, assistance in establishing small business, and skills enhancing employability > Emergency business grants > Cash/Voucher',
                      [DrcProgram.VET]:
                        'Protection of emergency off-farm livelihoods > # of individuals provided with livelihoods assets restoration support, assistance in establishing small business, and skills enhancing employability > Vocational and reskilling training > Service',
                    })
                    .default(() => (aiInvalidValueFlag + activity) as any),
                  'Implementing Partner': 'Danish Refugee Council (DRC)',
                  'Activity Plan Code': getPlanCode(project) as never,
                  Oblast: oblast,
                  Raion: raion,
                  Hromada: hromada,
                  Settlement: settlement,
                  'Population Group': AiMapper.mapPopulationGroup(displacement!),
                  ...(() => {
                    if (activity === DrcProgram.MSME) {
                      const total = Math.round(grouped.sum((_) => _.tags?.employeesCount ?? 0) * 2.6)
                      const women = Math.floor(total / 2)
                      return {
                        'New beneficiaries (assisted for the first time in 2025)': total,
                        'Households Assisted': grouped.length,
                        'Total People Assisted': total,
                        'Adult Women (18-59)': women,
                        'Adult Men (18-59)': total - women,
                        Frequency: 'One-off',
                        'Total Cash Value (local currency)': grouped.sum((_) => _.tags?.amount ?? 0),
                        Currency: 'UAH',
                        'Cash Delivery Mechanism': 'Bank Transfer',
                        'Girls (0-17)': null as any,
                        'Boys (0-17)': null as any,
                        'Older Women (60+)': null as any,
                        'Older Men (60+)': null as any,
                      }
                    }
                    return {
                      'New beneficiaries (assisted for the first time in 2025)':
                        disaggregation['Total Individuals Reached'] ?? 0,
                      'Total People Assisted': disaggregation['Total Individuals Reached'] ?? 0,
                      'Girls (0-17)': disaggregation['Girls (0-17)'] ?? 0,
                      'Boys (0-17)': disaggregation['Boys (0-17)'] ?? 0,
                      'Adult Women (18-59)': disaggregation['Adult Women (18-59)'] ?? 0,
                      'Adult Men (18-59)': disaggregation['Adult Men (18-59)'] ?? 0,
                      'Older Women (60+)': disaggregation['Older Women (60+)'] ?? 0,
                      'Older Men (60+)': disaggregation['Older Men (60+)'] ?? 0,
                      'People With Disabilities': disaggregation['People with Disability'],
                      'Households Assisted': grouped.length,
                    }
                  })(),
                  'Were these people reached in 2025 by another FSL sub-indicator?': 'No',
                  'If yes, which sub-indicator': null as any,
                  'If yes, how many people received from both sub-activities': null as any,
                  'Implementation Status': 'Completed',
                }
                const recordId = ActivityInfoSdk.makeRecordId({
                  prefix: 'drcfsl',
                  periodStr,
                  index: i++,
                })
                const request = AiFslType.buildRequest(
                  {
                    ...ai,
                    ...(await AiMapper.getLocationRecordIdByMeta({oblast, raion, hromada, settlement})),
                  },
                  recordId,
                )

                return {
                  submit: checkAiValid(ai.Oblast, ai.Raion, ai.Hromada, ai['Activity Plan Code']),
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
}
