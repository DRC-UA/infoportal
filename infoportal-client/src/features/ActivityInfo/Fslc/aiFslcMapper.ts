import {ApiSdk} from '@/core/sdk/server/ApiSdk'
import {AiTypeFslc} from '@/features/ActivityInfo/Fslc/AiTypeFslc'
import {DrcProgram, DrcProject, groupBy, KoboMetaStatus, PeriodHelper, Person} from '@infoportal-common'
import {fnSwitch} from '@alexandreannic/ts-utils'
import {ActivityInfoSdk} from '@/core/sdk/server/activity-info/ActiviftyInfoSdk'
import {activitiesConfig} from '@/features/ActivityInfo/ActivityInfo'
import {AiBundle2} from '@/features/ActivityInfo/shared/AiBundle'
import {AiMapper} from '@/features/ActivityInfo/shared/AiMapper'

export namespace AiFslcMapper {
  export type Bundle = AiBundle2<AiTypeFslc.Type>

  const getPlanCode = (_: DrcProject) => '!!! TODO' as any

  export const reqCashRegistration = (api: ApiSdk) => (periodStr: string): Promise<Bundle[]> => {
    const period = PeriodHelper.fromYYYYMM(periodStr)
    const bundle: Bundle[] = []
    let i = 0
    return api.koboMeta.search({
      filters: {
        activities: [DrcProgram.SectoralCash],
        status: [KoboMetaStatus.Committed]
      }
    })
      .then(_ => _.data.filter(_ => PeriodHelper.isDateIn(period, _.lastStatusUpdate)))
      .then(data => {
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
            const ai: AiTypeFslc.Type = {
              'Reporting Month': periodStr,
              'Reporting Organization': 'Danish Refugee Council',
              'Activity and indicator': '!!! TODO' as any,
              'Implementing Partner': 'Danish Refugee Council',
              'Activity Plan Code': getPlanCode(project) as never,
              'Oblast': oblast,
              'Raion': raion,
              'Hromada': hromada,
              'Population Group': displacement,
              'New beneficiaries (same activity)': disaggregation['Total Individuals Reached'] ?? 0,
              'Number of people reached': disaggregation['Total Individuals Reached'] ?? 0,
              'Girls (0-17)': disaggregation['Girls (0-17)'] ?? 0,
              'Boys (0-17)': disaggregation['Boys (0-17)'] ?? 0,
              'Adult Women (18-59)': disaggregation['Adult Women (18-59)'] ?? 0,
              'Adult Men (18-59)': disaggregation['Adult Men (18-59)'] ?? 0,
              'Older Women (60+)': disaggregation['Older Women (60+)'] ?? 0,
              'Older Men (60+)': disaggregation['Older Men (60+)'] ?? 0,
              'Number of people with disability': disaggregation['People with Disability'],
              'Number of reached households': grouped.length,
              'Implementation Status': 'Completed',
              'Modality': 'Cash',
              'Were these people reached in 2024 by another FSL sub-activity?': 'No',
            }
            const request = ActivityInfoSdk.makeRecordRequests({
              activityIdPrefix: 'drcflsc',
              activityYYYYMM: periodStr,
              formId: activitiesConfig.snfi.id,
              activity,
              activityIndex: i++,
            })

            bundle.push({
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

  // export const reqEcrecCashRegistration = (api: ApiSdk) => (period: Period): Promise<AiFslcBundle[]> => {
  //   return api.kobo.typedAnswers.searchEcrec_cashRegistration({filters: period})
  //     .then(_ => {
  //       return _.data
  //         // .filter(_ => _.tags?.status === EcrecCashRegistrationPaymentStatus.Paid)
  //         .map(_ => ({..._, ...AiProtectionMapper.getAiLocation(_)}))
  //     })
  //     .then(data => {
  //       console.log('after,', data.length)
  //       const formatted: AiFslcBundle[] = []
  //       let index = 0
  //       groupBy({
  //         data,
  //         groups: [
  //           {
  //             by: _ => fnSwitch(_.back_donor!, {
  //               uhf6: DrcProject['UKR-000336 UHF6'],
  //               uhf7: DrcProject['UKR-000352 UHF7']
  //             }, () => undefined)!
  //           },
  //           {by: _ => _.Oblast!},
  //           {by: _ => _.Raion!},
  //           {by: _ => _.Hromada!},
  //           {
  //             by: _ => fnSwitch(_.back_donor!, {
  //               uhf6: 'Newly retaken areas',
  //               uhf7: 'Winter response',
  //             }, () => undefined)!
  //           },
  //           {
  //             by: _ => fnSwitch(_.ben_det_res_stat!, {
  //               idp: 'IDPs',
  //               long_res: 'Non-Displaced',
  //               ret: 'Returnees',
  //               ref_asy: 'Non-Displaced',
  //             }, () => 'Non-Displaced')
  //           },
  //           {
  //             by: _ => fnSwitch(_.tags?.program!, {
  //               CashforAnimalFeed: 450,
  //               CashforAnimalShelter: 400,
  //             }, () => 7500)
  //           },
  //         ],
  //         finalTransform: (grouped, [project, oblast, raion, hromada, responseTheme, populationGroup, amount]) => {
  //           const persons = seq([
  //             ...grouped.flatMap(_ => ({hh_char_hh_det_age: _.hh_char_hhh_age, hh_char_hh_det_gender: _.hh_char_hhh_gender})),
  //             ...grouped.flatMap(_ => _.hh_char_hh_det ?? [])
  //           ]).compactBy('hh_char_hh_det_age').compactBy('hh_char_hh_det_gender').map(_ => {
  //             return {
  //               gender: fnSwitch(_.hh_char_hh_det_gender!, {
  //                 female: Gender.Female,
  //                 male: Gender.Male,
  //               }, () => undefined),
  //               age: _.hh_char_hh_det_age
  //             }
  //           })
  //           const desagreg = groupByGenderAndGroup(Person.ageGroup.UNHCR)(persons)
  //           const activity: AiTypeFslc.Type = {
  //             'Partner Organization': 'Danish Refugee Council',
  //             // 'Donor'?: '',
  //             // @ts-ignore
  //             length: grouped.length,
  //             'Report to a planned project?': 'Yes',
  //             'Project (FSLC-Updated)': project,
  //             'Oblast': oblast,
  //             'Raion': raion,
  //             'Hromada': hromada,
  //             // 'Settlement'?: '',
  //             // 'Collective Sites'?: '',
  //             'Response Theme': responseTheme,
  //             'Response Plan': 'HRP 2023',
  //             'Reporting Month': format(addDays(period.start, 1), 'yyyy-MM'),
  //             'Population Group': populationGroup,
  //             'FSLC Indicators': 'Agriculture and livestock inputs (cash)',
  //             'Activity status': 'Ongoing',
  //             // 'Activity Start Date'?: '',
  //             // 'Activity End Date'?: '',
  //             'Assistance Modality': 'Cash or Voucher',
  //             'Cash Delivery Mechanism': 'Bank Transfer',
  //             'Value per unit': amount,
  //             'Currency': 'UAH',
  //             'Frequency': 'One-off',
  //             'Households': grouped.length,
  //             'Total Individuals Reached': grouped.sum(_ => _.ben_det_hh_size ?? 0),
  //             'New unique Individuals Reached': grouped.sum(_ => _.ben_det_hh_size ?? 0),
  //             'Girls': desagreg['0 - 17']?.Female,
  //             'Boys': desagreg['0 - 17']?.Male,
  //             'Adult Women': desagreg['18 - 59']?.Female,
  //             'Adult Men': desagreg['18 - 59']?.Male,
  //             'Elderly Women': desagreg['60+']?.Female,
  //             'Elderly Men': desagreg['60+']?.Male,
  //             'People with Disability': grouped.sum(_ => _.hh_char_dis_select && _.hh_char_dis_select.includes('diff_none') ? 1 : 0),
  //             'Comments': ('Kobo IDs: ' + grouped.map(_ => _.id).join(',')).slice(0, 1000),
  //           }
  //           formatted.push({
  //             data: grouped,
  //             activity,
  //             requestBody: ActivityInfoSdk.makeRecordRequest({
  //               activity: AiTypeFslc.map(activity),
  //               formId: activitiesConfig.fslc.id,
  //               activityIdPrefix: 'drcecrec',
  //               activityYYYYMM: format(period.start, 'yyMM'),
  //               activityIndex: index++,
  //             })
  //
  //           })
  //         }
  //       })
  //       return formatted
  //     })

}