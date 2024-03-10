import {ApiSdk} from '@/core/sdk/server/ApiSdk'
import {AiFslcType} from '@/features/ActivityInfo/Fslc/aiFslcType'
import {DrcProgram, DrcProject, groupBy, KoboMetaStatus, PeriodHelper} from '@infoportal-common'
import {fnSwitch} from '@alexandreannic/ts-utils'
import {ActivityInfoSdk} from '@/core/sdk/server/activity-info/ActiviftyInfoSdk'
import {activitiesConfig} from '@/features/ActivityInfo/ActivityInfo'
import {AiBundle2} from '@/features/ActivityInfo/shared/AiBundle'
import {AiMapper} from '@/features/ActivityInfo/shared/AiMapper'

export namespace AiFslcMapper {
  export type Bundle = AiBundle2<AiFslcType.Type>

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
            const ai: AiFslcType.Type = {
              'Reporting Month': periodStr,
              'Reporting Organization': 'Danish Refugee Council',
              'Activity and indicator': '!!! TODO' as any,
              'Implementing Partner': 'Danish Refugee Council',
              'Activity Plan Code': getPlanCode(project) as never,
              ...AiMapper.getLocationByMeta(oblast, raion, hromada),
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
              activity: AiFslcType.map(AiMapper.mapLocationToRecordId(ai)),
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
}