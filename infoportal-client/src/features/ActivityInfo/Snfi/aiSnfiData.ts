import {Bn_Re, DisplacementStatus, DrcProgram, DrcProject, groupBy, KoboMetaShelterRepairTags, PeriodHelper, ShelterTaPriceLevel} from '@infoportal-common'
import {fnSwitch} from '@alexandreannic/ts-utils'
import {ActivityInfoSdk} from '@/core/sdk/server/activity-info/ActiviftyInfoSdk'
import {ApiSdk} from '@/core/sdk/server/ApiSdk'
import {AiBundle2} from '@/features/ActivityInfo/shared/AiBundle'
import {AiTypeSnfi} from '@/features/ActivityInfo/Snfi/AiTypeSnfi'
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
  }

  const getPlanCode = (p: DrcProject): AiTypeSnfi.Type['Plan/Project Code'] => {
    // @ts-ignore
    return planCodes[p] ?? `!!! ${p}`
  }

  export type Bundle = AiBundle2<AiTypeSnfi.Type>

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

  // export const reqEsk = (api: ApiSdk) => (period: string): Promise<Bundle[]> => {
  //   return api.kobo.typedAnswers.searchBn_Re({filters: period})
  //     .then(_ => _.data.filter(_ => _.back_prog_type?.find(p => p.includes('esk') || p.includes('nfi'))).map(_ => ({..._, ...AiMapper.getLocation(_)})))
  //     .then(data => {
  //       const bundle: Bundle[] = []
  //       let index = 0
  //       groupBy({
  //         data,
  //         groups: [
  //           {
  //             by: (_): DrcProject => mapBnreDonor(_.donor_esk ?? _.back_donor?.[0])!,
  //           },
  //           {by: _ => _.Oblast!},
  //           {by: _ => _.Raion!},
  //           {by: _ => _.Hromada!},
  //           {
  //             by: _ => fnSwitch(_.ben_det_res_stat!, {
  //               idp: 'IDPs',
  //               long_res: 'Non-Displaced',
  //               ret: 'Returnees',
  //               ref_asy: 'Non-Displaced',
  //             }, () => 'Non-Displaced')
  //           },
  //           {by: _ => _.back_prog_type!.find(p => p.includes('esk')) ? 'esk' : 'nfi'}
  //         ],
  //         finalTransform: (grouped, [project, oblast, raion, hromada, status, kitType]) => {
  //           const persons: Person.Person[] = grouped.flatMap(_ => Person.filterDefined(KoboBnReHelper.getPersons(_)))
  //           const disaggregation = Person.groupByGenderAndGroup(Person.ageGroup.UNHCR)(persons)
  //           const activity: AiTypeSnfi.Type = {
  //             'SNFI indictors': kitType,
  //             'Implementing Partner': 'Danish Refugee Council',
  //             'Report to a planned project': DrcProject ? 'Yes' : 'No',
  //             ...(DrcProject ? {'Plan Code': project} : {}) as any,
  //             // 'Plan Code': AiShelterData.planCode[project],
  //             'Reporting Partner': 'Danish Refugee Council',
  //             'Oblast': oblast,
  //             'Raion': raion,
  //             'Hromada': hromada,
  //             'Implementation status': 'Complete',
  //             'Reporting Date (YYYY-MM-DD)': format(period.end, 'yyyy-MM-dd'),
  //             'Population Group': status,
  //             'Indicator Value (HHs reached, buildings, etc.)': grouped.length,
  //             '# Individuals Reached': persons.length,
  //             'Girls (0-17)': disaggregation['0 - 17'].Female,
  //             'Boys (0-17)': disaggregation['0 - 17'].Male,
  //             'Women (18-59)': disaggregation['18 - 59'].Female,
  //             'Men (18-59)': disaggregation['18 - 59'].Male,
  //             'Elderly Women (60+)': disaggregation['60+'].Female,
  //             'Elderly Men (60+)': disaggregation['60+'].Male,
  //             'People with disability': 0,
  //           }
  //           bundle.push({
  //             activity,
  //             esk: grouped,
  //             requestBody: ActivityInfoSdk.makeRecordRequest({
  //               activity: AiSnfiInterface.map(activity),
  //               formId: 'ckrgu2uldtxbgbg1h',
  //               activityYYYYMM: format(period.start, 'yyyyMM'),
  //               activityIdPrefix: 'drcesk',
  //               activityIndex: index++,
  //             })
  //           })
  //         }
  //       })
  //       return bundle
  //     })
  // }

  // export const reqRepairs = (api: ApiSdk) => (periodStr: string) => {
  //   const period = PeriodHelper.fromYYYYMM(periodStr)
  //   return api.shelter.search().then(res =>
  //     seq(res.data)
  //       .compactBy('nta')
  //       .compactBy('ta')
  //       .map(_ => ({
  //         ..._,
  //         ...AiMapper.getLocation(_.nta),
  //         ...AiMapper.disaggregatePersons(_.nta.hh_char_hh_det),
  //       }))
  //   ).then(res => {
  //     return mapRepair(periodStr)(res.filter(_ => PeriodHelper.isDateIn(period, _.ta.tags?.workDoneAt)))
  //   })
  // }

  export const reqRepairs = (api: ApiSdk) => (periodStr: string) => {
    const period = PeriodHelper.fromYYYYMM(periodStr)
    return api.koboMeta.search<KoboMetaShelterRepairTags>({
      filters: {
        activities: [DrcProgram.ShelterRepair]
      }
    })
      .then(_ => _.data)
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
              }, () => 'Non-Displaced') as AiTypeSnfi.Type['Population Group']
            }
          ],
          finalTransform: (grouped, [project, oblast, raion, hromada, damageLevel, status]) => {
            const disagg = AiMapper.disaggregatePersons(grouped.flatMap(_ => _.persons ?? []))
            const activity: AiTypeSnfi.Type = {
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
              'Reporting Month': periodStr,
              'Population Group': status,
              'Non-individuals Reached': grouped.length,
              'Adult Men (18-59)': disagg['Adult Men (18-59)'],
              'Adult Women (18-59)': disagg['Adult Women (18-59)'],
              'Boys (0-17)': disagg['Boys (0-17)'],
              'Girls (0-17)': disagg['Girls (0-17)'],
              'Older Women (60+)': disagg['Older Women (60+)'],
              'Older Men (60+)': disagg['Older Men (60+)'],
              'Total Individuals Reached': disagg['Total Individuals Reached'],
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
