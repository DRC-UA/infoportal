import {
  DrcDonor,
  DrcProgram,
  DrcProject,
  DrcProjectHelper,
  groupBy,
  KoboIndex,
  KoboMetaStatus,
  PeriodHelper,
} from 'infoportal-common'
import {fnSwitch, match} from '@axanc/ts-utils'
import {ActivityInfoSdk} from '@/core/sdk/server/activity-info/ActiviftyInfoSdk'
import {aiInvalidValueFlag, AiTable, checkAiValid} from '@/features/ActivityInfo/shared/AiTable'
import {activitiesConfig} from '@/features/ActivityInfo/ActivityInfo'
import {ApiSdk} from '@/core/sdk/server/ApiSdk'
import {AiMapper} from '@/features/ActivityInfo/shared/AiMapper'
import {AiMpcaType} from '@/features/ActivityInfo/Mpca/aiMpcaType'
import {appConfig} from '@/conf/AppConfig'
import {Period} from 'infoportal-common'

export namespace AiMpcaMapper {
  type Bundle = AiTable<AiMpcaType.Type>

  const getPlanCode = (_: DrcProject) => {
    return match(_ as any)
      .cases({
        // [DrcProject['UKR-000380 DANIDA']]: 'MPCA-DRC-00011',
      })
      .default(() => aiInvalidValueFlag + _)
  }

  export const reqCashRegistration =
    (api: ApiSdk) =>
    (period: Partial<Period>): Promise<Bundle[]> => {
      const periodStr = AiMapper.getPeriodStr(period)
      let i = 0
      return api.mpca
        .search({})
        .then((_) =>
          _.data.filter((_) => {
            if (_.activity !== DrcProgram.MPCA) return false
            if (_.status !== KoboMetaStatus.Committed) return false
            return _.lastStatusUpdate && PeriodHelper.isDateIn(period, _.lastStatusUpdate)
          }),
        )
        .then((data) => {
          return Promise.all(
            groupBy({
              data,
              groups: [
                {by: (_) => _.formId},
                {by: (_) => _.oblast},
                {by: (_) => _.raion!},
                {by: (_) => _.hromada!},
                {by: (_) => _.settlement!},
                {by: (_) => _.project?.[0]!},
                {
                  by: (_) => AiMapper.mapPopulationGroup(_.displacement),
                },
              ],
              finalTransform: async (grouped, [formId, oblast, raion, hromada, settlement, project, displacement]) => {
                const disag = AiMapper.disaggregatePersons(grouped.flatMap((_) => _.persons).compact())

                const ai: AiMpcaType.Type = {
                  'Reporting Organization': 'Danish Refugee Council (DRC)',
                  'Implementing Partner': 'Danish Refugee Council (DRC)',
                  Oblast: oblast,
                  Raion: raion,
                  Hromada: hromada,
                  Settlement: settlement,
                  Donor: fnSwitch<DrcDonor, AiMpcaType.Type['Donor']>(
                    DrcProjectHelper.donorByProject[project],
                    {
                      SIDA: 'Swedish International Development Cooperation Agency (Sida)',
                      UHF: 'Ukraine Humanitarian Fund (UHF)',
                      NovoNordisk: 'Novo Nordisk (NN)',
                      OKF: `Ole Kirk's Foundation (OKF)`,
                      PoolFunds: 'Private Donor (PDonor)',
                      HoffmansAndHusmans: 'Private Donor (PDonor)',
                      SDCS: `Swiss Agency for Development and Cooperation (SDC)`,
                      BHA: `USAID's Bureau for Humanitarian Assistance (USAID/BHA)`,
                      FINM: 'Ministry of Foreign Affairs - Finland (MFA Finland)',
                      FCDO: 'Foreign, Commonwealth & Development Office (FCDO)',
                      AugustinusFonden: 'Augustinus Foundation (Augustinus)',
                      EUIC: `EU\'s Instrument contributing to Stability and Peace (IcSP)`,
                      DUT: 'Dutch Relief Alliance (DutchRelief)',
                      ECHO: 'European Commission Humanitarian Aid Department and Civil Protection (ECHO)',
                      DANI: `Danish International Development Agency - Ministry of Foreign Affairs - Denmark (DANIDA)`,
                      SDC: 'Swiss Agency for Development and Cooperation (SDC)',
                    },
                    () => aiInvalidValueFlag as AiMpcaType.Type['Donor'],
                  ),
                  'Number of Covered Months': 'Three months (recommended)',
                  'Financial Service Provider (FSP)': 'Bank Transfer',
                  'Population Group': displacement,
                  'Total amount (USD) distributed through MPCA':
                    grouped.sum((_) => _.amountUahFinal ?? 0) * appConfig.uahToUsd,
                  'Payment Frequency': 'Multiple payments',
                  'Plan/Project Code': getPlanCode(project) as any as never,
                  Activity:
                    formId === KoboIndex.byName('bn_rapidResponse2').id
                      ? 'Rapid MPCA > Provision of multi-purpose cash > # individuals assisted with rapid MPC'
                      : 'MPCA > Provision of multi-purpose cash > # individuals assisted with MPC',
                  'Reporting Month': periodStr === '2025-01' ? '2025-02' : periodStr,
                  'Girls (0-17)': disag['Girls (0-17)'] ?? 0,
                  'Boys (0-17)': disag['Boys (0-17)'] ?? 0,
                  'Adult Women (18-59)': disag['Adult Women (18-59)'] ?? 0,
                  'Adult Men (18-59)': disag['Adult Men (18-59)'] ?? 0,
                  'Older Women (60+)': disag['Older Women (60+)'] ?? 0,
                  'Older Men (60+)': disag['Older Men (60+)'] ?? 0,
                  'Total People Assisted': disag['Total Individuals Reached'] ?? 0,
                  'People with disability': disag['People with Disability'] ?? 0,
                  'Girls with disability (0-17)': disag['Girls with disability (0-17)'] ?? 0,
                  'Boys with disability (0-17)': disag['Boys with disability (0-17)'] ?? 0,
                  'Adult Women with disability (18-59)': disag['Adult Women with disability (18-59)'] ?? 0,
                  'Adult Men with disability (18-59)': disag['Adult Men with disability (18-59)'] ?? 0,
                  'Older Women with disability (60+)': disag['Older Women with disability (60+)'] ?? 0,
                  'Older Men with disability (60+)': disag['Older Men with disability (60+)'] ?? 0,
                } as const
                const recordId = ActivityInfoSdk.makeRecordId({
                  prefix: 'drcmpc',
                  periodStr: periodStr,
                  index: i++,
                })
                const request = AiMpcaType.buildRequest(ai, recordId)
                return {
                  submit: checkAiValid(ai.Raion, ai.Hromada, ai.Settlement, ai['Plan/Project Code']),
                  recordId,
                  data: grouped,
                  activity: ai,
                  requestBody: request,
                }
              },
            }).transforms,
          )
        })
    }
}
