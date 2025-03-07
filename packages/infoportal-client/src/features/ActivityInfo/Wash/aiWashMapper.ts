import {DrcProgram, DrcProject, groupBy, KoboMetaStatus, PeriodHelper} from 'infoportal-common'
import {aiInvalidValueFlag, AiTable, checkAiValid} from '@/features/ActivityInfo/shared/AiTable'
import {AiWashType} from '@/features/ActivityInfo/Wash/aiWashType'
import {ApiSdk} from '@/core/sdk/server/ApiSdk'
import {fnSwitch} from '@axanc/ts-utils'
import {AiMapper} from '@/features/ActivityInfo/shared/AiMapper'
import {ActivityInfoSdk} from '@/core/sdk/server/activity-info/ActiviftyInfoSdk'
import {activitiesConfig} from '@/features/ActivityInfo/ActivityInfo'
import {Period} from 'infoportal-common'

export namespace AiWashMapper {
  const planCodes = {
    [DrcProject['UKR-000270 Pooled Funds']]: 'WASH-DRC-00002',
  }

  const getPlanCode = (p: DrcProject): AiWashType.Type['Plan/Project Code'] => {
    // @ts-ignore
    // TODO Assign
    return planCodes[p] ?? `${aiInvalidValueFlag} ${p}`
  }

  export type Bundle = AiTable<AiWashType.Type>

  export const req = (api: ApiSdk) => {
    return (period: Partial<Period>): Promise<Bundle[]> => {
      const periodStr = AiMapper.getPeriodStr(period)
      return api.koboMeta
        .search({
          status: [KoboMetaStatus.Committed],
          activities: [DrcProgram.NFI, DrcProgram.HygieneKit],
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
                const ai: AiWashType.Type = {
                  Oblast: oblast,
                  Raion: raion,
                  Hromada: hromada,
                  Settlement: settlement,
                  'Type of institution / Beneficiary': 'Individuals/households',
                  'Plan/Project Code': getPlanCode(project),
                  'Implementing Partner': 'Danish Refugee Council (DRC)',
                  'Reporting Organization': 'Danish Refugee Council (DRC)',
                  Indictors:
                    'WASH NFI distributions (in-kind) > # of individuals benefiting from hygiene kit/items distribution (in-kind)',
                  'Reporting Month': periodStr === '2025-01' ? '2025-02' : periodStr,
                  'Is the disaggregation by population group, gender and age known?': 'Yes',
                  'Population Group': AiMapper.mapPopulationGroup(displacement),
                  'Total Reached (No Disaggregation)': null as any, //disaggregation['Total Individuals Reached']
                  'Girls (0-17)': disaggregation['Girls (0-17)'] ?? 0,
                  'Boys (0-17)': disaggregation['Boys (0-17)'] ?? 0,
                  'Adult Women (18-59)': disaggregation['Adult Women (18-59)'] ?? 0,
                  'Adult Men (18-59)': disaggregation['Adult Men (18-59)'] ?? 0,
                  'Older Women (60+)': disaggregation['Older Women (60+)'] ?? 0,
                  'Older Men (60+)': disaggregation['Older Men (60+)'] ?? 0,
                  'People with disability': disaggregation['People with Disability'] ?? 0,
                }
                const recordId = ActivityInfoSdk.makeRecordId({
                  prefix: 'drcwash',
                  periodStr,
                  index: i++,
                })
                const request = AiWashType.buildRequest(
                  {
                    ...ai,
                    ...AiMapper.getLocationRecordIdByMeta({oblast, raion, hromada, settlement}),
                  },
                  recordId,
                )
                return {
                  submit: checkAiValid(ai.Oblast, ai.Raion, ai.Hromada, ai['Settlement'], ai['Plan/Project Code']),
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
}
