import {ApiSdk} from '@/core/sdk/server/ApiSdk'
import {AiFslcType} from '@/features/ActivityInfo/Fslc/aiFslcType'
import {DrcProgram, DrcProject, groupBy, KoboMetaStatus, PeriodHelper} from '@infoportal-common'
import {fnSwitch} from '@alexandreannic/ts-utils'
import {ActivityInfoSdk} from '@/core/sdk/server/activity-info/ActiviftyInfoSdk'
import {activitiesConfig} from '@/features/ActivityInfo/ActivityInfo'
import {AiBundle, aiInvalidValueFlag, checkAiValid} from '@/features/ActivityInfo/shared/AiBundle'
import {AiMapper} from '@/features/ActivityInfo/shared/AiMapper'

export namespace AiFslcMapper {
  export type Bundle = AiBundle<AiFslcType.Type>

  const getPlanCode = (_: DrcProject) => {
    return fnSwitch(_, {
      [DrcProject['UKR-000348 BHA3']]: 'FSLC-DRC-00001',
      [DrcProject['UKR-000336 UHF6']]: 'FSLC-DRC-00002',
      [DrcProject['UKR-000352 UHF7']]: 'FSLC-DRC-00003',
    }, () => aiInvalidValueFlag + _)
  }

  export const reqCashRegistration = (api: ApiSdk) => (periodStr: string): Promise<Bundle[]> => {
    const period = PeriodHelper.fromYYYYMM(periodStr)
    let i = 0
    return api.koboMeta.search({
      activities: [
        DrcProgram.SectoralCashForAgriculture,
        DrcProgram.SectoralCashForAnimalShelterRepair,
        DrcProgram.SectoralCashForAnimalFeed,
      ],
      status: [KoboMetaStatus.Committed]
    })
      .then(_ => _.data.filter(_ => PeriodHelper.isDateIn(period, _.lastStatusUpdate)))
      .then(data => {
        return Promise.all(groupBy({
          data,
          groups: [
            {by: _ => _.activity!},
            {by: _ => _.project?.[0]!,},
            {by: _ => _.oblast!},
            {by: _ => _.raion!},
            {by: _ => _.hromada!},
            {by: _ => _.settlement!},
            {
              by: _ => fnSwitch(_.displacement!, {
                Idp: 'Internally Displaced',
                NonDisplaced: 'Non-Displaced',
                Returnee: 'Returnees',
                Refugee: 'Non-Displaced',
              }, () => 'Non-Displaced')
            },
          ],
          finalTransform: async (grouped, [activity, project, oblast, raion, hromada, settlment, displacement]) => {
            const disaggregation = AiMapper.disaggregatePersons(grouped.flatMap(_ => _.persons).compact())
            const ai: AiFslcType.Type = {
              'Reporting Month': fnSwitch(periodStr, {
                '2024-01': '2024-03',
                '2024-02': '2024-03'
              }, () => periodStr),
              'Reporting Organization': 'Danish Refugee Council',
              'Activity and indicator': activity as any,
              'Implementing Partner': 'Danish Refugee Council',
              'Activity Plan Code': getPlanCode(project) as never,
              ...await AiMapper.getLocationByMeta(oblast, raion, hromada, settlment),
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
              formId: activitiesConfig.fslc.id,
              activity: AiFslcType.map(AiMapper.mapLocationToRecordId(ai)),
              activityIndex: i++,
            })

            return {
              submit: checkAiValid(ai.Oblast, ai.Raion, ai.Hromada, ai['Activity Plan Code']),
              recordId: request.changes[0].recordId,
              data: grouped,
              activity: ai,
              requestBody: request,
            }
          }
        }).transforms)
      })
  }
}