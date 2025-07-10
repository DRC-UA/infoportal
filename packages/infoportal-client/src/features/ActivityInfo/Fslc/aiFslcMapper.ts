import {match, Seq} from '@axanc/ts-utils'

import {
  add,
  Ecrec_msmeGrantReg,
  DrcProgram,
  DrcProject,
  groupBy,
  KoboIndex,
  KoboMetaStatus,
  PeriodHelper,
  Person,
  safeNumber,
  type IKoboMeta,
  type KoboMetaEcrecTags,
  type Period,
} from 'infoportal-common'

import {ActivityInfoSdk} from '@/core/sdk/server/activity-info/ActiviftyInfoSdk'
import {ApiSdk} from '@/core/sdk/server/ApiSdk'
import {AiFslcType, AiFslType} from '@/features/ActivityInfo/Fslc/aiFslcType'
import {AiMapper} from '@/features/ActivityInfo/shared/AiMapper'
import {aiInvalidValueFlag, AiTable, checkAiValid} from '@/features/ActivityInfo/shared/AiTable'

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
      const {data} = await api.koboMeta.search({
        activities: [
          DrcProgram.SectoralCashForAgriculture,
          DrcProgram.SectoralCashForAnimalShelterRepair,
          DrcProgram.SectoralCashForAnimalFeed,
          DrcProgram.MSME,
          DrcProgram.VET,
        ],
        status: [KoboMetaStatus.Committed],
      })
      const filteredData = data.filter((_) => PeriodHelper.isDateIn(period, _.lastStatusUpdate))
      const msmeGrantRegFormId = KoboIndex.byName('ecrec_msmeGrantReg').id
      const msmeIds: Set<string> = new Set()
      filteredData.forEach(({formId, koboId}) => {
        if (formId === msmeGrantRegFormId) msmeIds.add(koboId)
      })
      const msmeRecords = new Map(
        (await api.kobo.answer.searchByAccess({formId: msmeGrantRegFormId})).data
          .filter(({id}) => msmeIds.has(id))
          .map(({id, amount_payment, ...rest}) => [
            id,
            {
              amount_payment: amount_payment !== undefined ? Math.round(Number(amount_payment)) : 0,
              ...rest,
            } as unknown as Ecrec_msmeGrantReg.T,
          ]),
      )

      return Promise.all(
        groupBy({
          data: filteredData,
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
                  const msmeDisaggregation = AiMapper.disaggregatePersons(
                    grouped
                      .map(({koboId}) => msmeRecords.get(koboId))
                      .compact()
                      .map(({gender, res_stat, age, dis_select}) => ({
                        age,
                        gender: match(gender)
                          .cases({male: Person.Gender.Male, female: Person.Gender.Female})
                          .default(undefined),
                        displacement: match(res_stat)
                          .cases({
                            idp: Person.DisplacementStatus.Idp,
                            long_res: Person.DisplacementStatus.NonDisplaced,
                            ret: Person.DisplacementStatus.Returnee,
                          })
                          .default(undefined),
                        disability: (Array.isArray(dis_select) ? dis_select : [dis_select]).map((disability) =>
                          match(disability)
                            .cases({
                              diff_care: Person.WgDisability.Care,
                              diff_comm: Person.WgDisability.Comm,
                              diff_hear: Person.WgDisability.Hear,
                              diff_rem: Person.WgDisability.Rem,
                              diff_see: Person.WgDisability.See,
                              diff_walk: Person.WgDisability.Walk,
                            })
                            .default(Person.WgDisability.None),
                        ),
                      })),
                  )

                  return {
                    'Total People Assisted': msmeDisaggregation['Total Individuals Reached'] ?? 0,
                    'Girls (0-17)': 0,
                    'Boys (0-17)': 0,
                    'Adult Women (18-59)': msmeDisaggregation['Adult Women (18-59)'] ?? 0,
                    'Adult Men (18-59)': msmeDisaggregation['Adult Men (18-59)'] ?? 0,
                    'Older Women (60+)': msmeDisaggregation['Older Women (60+)'] ?? 0,
                    'Older Men (60+)': msmeDisaggregation['Older Men (60+)'] ?? 0,
                    'People With Disabilities': msmeDisaggregation['People with Disability'] ?? 0,
                    'Households Assisted': grouped.length,
                    'New beneficiaries (assisted for the first time in 2025)': grouped.length,
                    Frequency: 'One-off',
                    'Total Cash Value (local currency)':
                      grouped.sum((_) => _.tags?.amount ?? 0) ||
                      grouped.reduce((accum, {koboId}) => accum + (msmeRecords.get(koboId)?.amount_payment ?? 0), 0),
                    Currency: 'UAH',
                    'Cash Delivery Mechanism': 'Bank Transfer',
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
    }
}
