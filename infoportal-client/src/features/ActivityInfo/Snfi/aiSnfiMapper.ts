import {Bn_Re, DisplacementStatus, DrcProgram, DrcProject, groupBy, KoboMetaShelterRepairTags, KoboMetaStatus, PeriodHelper, ShelterTaPriceLevel} from '@infoportal-common'
import {fnSwitch} from '@alexandreannic/ts-utils'
import {ActivityInfoSdk} from '@/core/sdk/server/activity-info/ActiviftyInfoSdk'
import {ApiSdk} from '@/core/sdk/server/ApiSdk'
import {AiBundle, aiInvalidValueFlag, checkAiValid} from '@/features/ActivityInfo/shared/AiBundle'
import {AiSnfiType} from '@/features/ActivityInfo/Snfi/aiSnfiType'
import {AiMapper} from '@/features/ActivityInfo/shared/AiMapper'
import {activitiesConfig} from '@/features/ActivityInfo/ActivityInfo'

export namespace AiShelterMapper {

  const planCodes = {
    [DrcProject['UKR-000298 Novo-Nordisk']]: 'SNFI-DRC-00001',
    [DrcProject['UKR-000314 UHF4']]: 'SNFI-DRC-00002',
    [DrcProject['UKR-000336 UHF6']]: 'SNFI-DRC-00003',
    [DrcProject['UKR-000355 Danish MFA']]: 'SNFI-DRC-00004',
    [DrcProject['UKR-000360 Novo-Nordisk']]: 'SNFI-DRC-00005',
    [DrcProject['UKR-000322 ECHO2']]: 'SNFI-DRC-00006',
    [DrcProject['UKR-000308 UNHCR']]: 'SNFI-DRC-00007',
    [DrcProject['UKR-000284 BHA']]: 'SNFI-DRC-00008',
  }

  const getPlanCode = (p: DrcProject): AiSnfiType.Type['Plan/Project Code'] => {
    // @ts-ignore
    return planCodes[p] ?? `${aiInvalidValueFlag} ${p}`
  }

  export type Bundle = AiBundle<AiSnfiType.Type>

  const mapBnreDonor = (_?: keyof typeof Bn_Re.options.back_donor) => {
    if (!_) return
    if (_.includes('uhf_')) return DrcProject['UKR-000314 UHF4']
    if (_.includes('bha_')) return DrcProject['UKR-000345 BHA2']
    if (_.includes('echo_')) return DrcProject['UKR-000322 ECHO2']
    if (_.includes('okf_')) return DrcProject['UKR-000309 OKF']
    if (_.includes('pool_')) return DrcProject['UKR-000342 Pooled Funds']
    if (_.includes('sdc_')) return DrcProject['UKR-000330 SDC2']
    if (_.includes('_danida')) return DrcProject['UKR-000347 DANIDA']
    if (_.includes('uhf7_')) return DrcProject['UKR-000352 UHF7']
  }

  // static getShelterNorth = () => {
  //   const bundle: Bundle[] = []
  //   let index = 0
  //   groupBy({
  //     data: ShelterNorth202312,
  //     groups: [
  //       {by: _ => _.Project},
  //       {by: _ => Object.keys(aiOblasts).find(o => o.includes(_.Oblast))!},
  //       {by: _ => Object.keys(aiRaions).find(o => o.includes(_.Raion))!},
  //       {by: _ => Object.keys(aiHromadas).find(o => o.includes(_.Hromada))!},
  //       {by: _ => _.levelDamage},
  //     ],
  //     finalTransform: (grouped, [project, Oblast, Raion, Hromada, level]) => {
  //       const activity: AiTypeSnfi.Type = {
  //         Oblast, Raion, Hromada,
  //         'Implementing Partner': 'Danish Refugee Council',
  //         'Plan/Project Code': fnSwitch(project, {
  //           'UKR-000284 BHA': DrcProject['UKR-000284 BHA'],
  //           'UKR-000308 UNHCR': DrcProject['UKR-000308 UNHCR'],
  //           'UKR-000336 UHF-6': DrcProject['UKR-000336 UHF6'],
  //           'UKR-000322 ECHO': 'SNFI-DRC-00006',
  //         }),
  //         'Reporting Partner': 'Danish Refugee Council',
  //         'SNFI indictors': level,
  //         'Implementation status': 'Complete',
  //         'Reporting Date (YYYY-MM-DD)': '2023-12-01',
  //         'Indicator Value (HHs reached, buildings, etc.)': grouped.length,
  //       }
  //       bundle.push({
  //         activity,
  //         requestBody: ActivityInfoSdk.makeRecordRequest({
  //           activity: AiSnfiInterface.map(activity),
  //           formId: 'ckrgu2uldtxbgbg1h',
  //           activityYYYYMM: '202312',
  //           activityIdPrefix: 'drcstan',
  //           activityIndex: index++,
  //         })
  //       })
  //     }
  //   })
  //   return bundle
  // }

  export const reqEsk = (api: ApiSdk) => (periodStr: string): Promise<Bundle[]> => {
    const period = PeriodHelper.fromYYYYMM(periodStr)
    return api.koboMeta.search({
      status: [KoboMetaStatus.Committed],
      activities: [
        DrcProgram.ESK,
        DrcProgram.CashForFuel,
        DrcProgram.CashForUtilities,
        DrcProgram.CashForRent,
        DrcProgram.CashForRepair,
      ]
    })
      .then(_ => _.data.filter(_ => PeriodHelper.isDateIn(period, _.lastStatusUpdate)))
      .then(data => {
        const bundle: Bundle[] = []
        let i = 0
        groupBy({
          data,
          groups: [
            {by: _ => _.project?.[0]!,},
            {by: _ => _.oblast!},
            {by: _ => _.raion!},
            {by: _ => _.hromada!},
            {
              by: _ => fnSwitch(_.displacement!, {
                Idp: 'Internally Displaced',
                NonDisplaced: 'Non-Displaced',
                Returnee: 'Returnees',
                Refugee: 'Non-Displaced',
              }, () => 'Non-Displaced')
            },
            {by: _ => _.activity!}
          ],
          finalTransform: (grouped, [project, oblast, raion, hromada, displacement, activity]) => {
            const disaggregation = AiMapper.disaggregatePersons(grouped.flatMap(_ => _.persons).compact())
            const ai: AiSnfiType.Type = {
              'Indicators - SNFI': fnSwitch(activity, {
                [DrcProgram.ESK]: '# of individuals supported with emergency shelter support',
                [DrcProgram.CashForFuel]: '# of individuals reached with support for winter energy needs (cash/voucher/fuel)',
                [DrcProgram.CashForUtilities]: '# of individuals supported with cash for utilities',
                [DrcProgram.CashForRent]: '# of individuals supported by cash for rent (RMI)',
                [DrcProgram.CashForRepair]: '# of individuals supported with light humanitarian repairs',
              }, () => aiInvalidValueFlag as keyof typeof AiSnfiType.options['Indicators - SNFI']),
              'Implementing Partner': 'Danish Refugee Council',
              'Plan/Project Code': getPlanCode(project),
              'Reporting Organization': 'Danish Refugee Council',
              ...AiMapper.getLocationByMeta(oblast, raion, hromada),
              'Reporting Date (YYYY-MM-DD)': periodStr + '-01',
              'Reporting Month': fnSwitch(periodStr, {
                '2024-01': '2024-03',
                '2024-02': '2024-03'
              }, () => periodStr),
              // 'Reporting Month': periodStr === '2024-01' ? '2024-02' : periodStr,
              'Population Group': displacement,
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
              'Distribution through inter-agency convoy (HOPC)': 'No',
            }
            const request = ActivityInfoSdk.makeRecordRequests({
              activityIdPrefix: 'drcsnfi',
              activityYYYYMM: periodStr,
              formId: activitiesConfig.snfi.id,
              activity: AiSnfiType.map(AiMapper.mapLocationToRecordId(ai)),
              activityIndex: i++,
            })

            bundle.push({
              submit: checkAiValid(ai.Oblast, ai.Raion, ai.Hromada, ai['Plan/Project Code']),
              recordId: request.changes[0].recordId,
              data: grouped,
              activity: ai,
              requestBody: request,
            })
          }
        })
        return bundle
      })
  }

  export const reqRepairs = (api: ApiSdk) => (periodStr: string) => {
    const period = PeriodHelper.fromYYYYMM(periodStr)
    return api.koboMeta.search<KoboMetaShelterRepairTags>({
      status: [KoboMetaStatus.Committed],
      activities: [DrcProgram.ShelterRepair]
    })
      .then(_ => _.data.filter(_ => PeriodHelper.isDateIn(period, _.lastStatusUpdate)))
      // .then(_ => _.data.flatMap(({persons, ...row}) => (persons ?? []).map(_ => ({...row, ..._}))))
      .then(data => {
        const bundle: Bundle[] = []
        let i = 0
        groupBy({
          data: data,
          groups: [
            {by: _ => _.project?.[0]!},
            {by: _ => _.oblast!},
            {by: _ => _.raion!},
            {by: _ => _.hromada!},
            {
              by: _ => {
                return fnSwitch(_.tags?.damageLevel!, {
                  [ShelterTaPriceLevel.Heavy]: ShelterTaPriceLevel.Medium,
                  [ShelterTaPriceLevel.Medium]: ShelterTaPriceLevel.Medium,
                  [ShelterTaPriceLevel.Light]: ShelterTaPriceLevel.Light,
                }, _ => _)
              },
            },
            {
              by: row => fnSwitch(row.displacement!, {
                [DisplacementStatus.Idp]: 'IDPs',
                [DisplacementStatus.Returnee]: 'Returnees',
              }, () => 'Non-Displaced') as AiSnfiType.Type['Population Group']
            }
          ],
          finalTransform: (grouped, [project, oblast, raion, hromada, damageLevel, status]) => {
            const disagg = AiMapper.disaggregatePersons(grouped.flatMap(_ => _.persons ?? []))
            const activity: AiSnfiType.Type = {
              'Indicators - SNFI': fnSwitch(damageLevel, {
                [ShelterTaPriceLevel.Light]: '# of individuals supported with light humanitarian repairs',
                [ShelterTaPriceLevel.Medium]: '# of individuals supported with medium humanitarian repairs',
                [ShelterTaPriceLevel.Heavy]: '# of individuals supported with heavy humanitarian repairs',
              }, () => '# of individuals supported with medium humanitarian repairs'),
              'Implementing Partner': 'Danish Refugee Council',
              'Plan/Project Code': getPlanCode(project),
              'Reporting Organization': 'Danish Refugee Council',
              'Oblast': oblast,
              'Raion': raion,
              'Hromada': hromada,
              'Reporting Date (YYYY-MM-DD)': periodStr + '-01',
              'Reporting Month': periodStr === '2024-01' ? '2024-02' : periodStr,
              'Population Group': status,
              'Non-individuals Reached': grouped.length,
              'Adult Men (18-59)': disagg['Adult Men (18-59)'] ?? 0,
              'Adult Women (18-59)': disagg['Adult Women (18-59)'] ?? 0,
              'Boys (0-17)': disagg['Boys (0-17)'] ?? 0,
              'Girls (0-17)': disagg['Girls (0-17)'] ?? 0,
              'Older Women (60+)': disagg['Older Women (60+)'] ?? 0,
              'Older Men (60+)': disagg['Older Men (60+)'] ?? 0,
              'Total Individuals Reached': disagg['Total Individuals Reached'] ?? 0,
              'Distribution through Common Pipeline': 'No',
              'Distribution through inter-agency convoy (HOPC)': 'No',
            }
            const request = ActivityInfoSdk.makeRecordRequests({
              activityIdPrefix: 'drcsnfi',
              activityYYYYMM: periodStr,
              formId: activitiesConfig.snfi.id,
              activity,
              activityIndex: i++,
            })

            bundle.push({
              recordId: request.changes[0].recordId,
              data: grouped,
              activity,
              requestBody: request,
            })
          },
        })
        return bundle
      })
  }
}
