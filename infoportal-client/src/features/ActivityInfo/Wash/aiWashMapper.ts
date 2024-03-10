import {AILocationHelper, DrcProgram, DrcProject, groupBy, KoboMetaStatus, OblastIndex, PeriodHelper} from '@infoportal-common'
import {AiBundle2} from '@/features/ActivityInfo/shared/AiBundle'
import {AiTypeWash} from '@/features/ActivityInfo/Wash/AiTypeWash'
import {ApiSdk} from '@/core/sdk/server/ApiSdk'
import {fnSwitch} from '@alexandreannic/ts-utils'
import {AiMapper} from '@/features/ActivityInfo/shared/AiMapper'
import {ActivityInfoSdk} from '@/core/sdk/server/activity-info/ActiviftyInfoSdk'
import {activitiesConfig} from '@/features/ActivityInfo/ActivityInfo'

export namespace AiWashMapper {

  const planCodes = {}

  const getPlanCode = (p: DrcProject): AiTypeWash.Type['Activity Plan Code'] => {
    // @ts-ignore
    return planCodes[p] ?? `!!! ${p}`
  }

  export type Bundle = AiBundle2<AiTypeWash.Type>

  export const req = (api: ApiSdk) => (periodStr: string): Promise<Bundle[]> => {
    const period = PeriodHelper.fromYYYYMM(periodStr)
    return api.koboMeta.search({
      filters: {
        status: [KoboMetaStatus.Committed],
        activities: [
          DrcProgram.NFI,
          DrcProgram.HygieneKit,
        ]
      }
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
            {by: _ => _.settlement!},
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
          finalTransform: async (grouped, [project, enOblast, enRaion, enHromada, settlement, displacement, activity]) => {
            const disaggregation = AiMapper.disaggregatePersons(grouped.flatMap(_ => _.persons).compact())
            const ai: AiTypeWash.Type = {
              'Activity Plan Code': getPlanCode(project),
              'Implementing Partner': 'Danish Refugee Council',
              'Reporting Organization': 'Danish Refugee Council',
              'WASH': '# of individuals benefiting from hygiene kit/items distribution (in-kind)',
              'Response Theme': 'No specific theme',
              'Oblast': AILocationHelper.findOblast(enOblast) ?? '⚠️' + enOblast as any,
              'Raion': AILocationHelper.findRaion(enOblast, enRaion)?._5w ?? '⚠️' + enRaion as any,
              'Hromada': AILocationHelper.findHromada(enOblast, enRaion, enHromada)?._5w ?? '⚠️' + enHromada as any,
              'Settlement': await AILocationHelper.findSettlement(enOblast, enRaion, enHromada, settlement).then(_ => _?._5w ?? '⚠️' + settlement),
              'Location Type': 'Individuals/households',
              'Reporting Month': periodStr,
              'Disaggregation by population group and/or gender and age known?': 'Yes',
              'Population Group': displacement,
              'Total Reached (No Disaggregation)': disaggregation['Total Individuals Reached'] ?? 0,
              'Girls (0-17)': disaggregation['Girls (0-17)'] ?? 0,
              'Boys (0-17)': disaggregation['Boys (0-17)'] ?? 0,
              'Adult Women (18-59)': disaggregation['Adult Women (18-59)'] ?? 0,
              'Adult Men (18-59)': disaggregation['Adult Men (18-59)'] ?? 0,
              'Older Women (60+)': disaggregation['Older Women (60+)'] ?? 0,
              'Older Men (60+)': disaggregation['Older Men (60+)'] ?? 0,
              'People with disability': disaggregation['People with Disability'] ?? 0,
            }
            const request = ActivityInfoSdk.makeRecordRequests({
              activityIdPrefix: 'drcwash',
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

}