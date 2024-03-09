import {DrcProgram, DrcProjectHelper, groupBy, KoboMetaStatus, PeriodHelper} from '@infoportal-common'
import {fnSwitch} from '@alexandreannic/ts-utils'
import {ActivityInfoSdk} from '@/core/sdk/server/activity-info/ActiviftyInfoSdk'
import {AiBundle2} from '@/features/ActivityInfo/shared/AiBundle'
import {activitiesConfig} from '@/features/ActivityInfo/ActivityInfo'
import {ApiSdk} from '@/core/sdk/server/ApiSdk'
import {AiMapper} from '@/features/ActivityInfo/shared/AiMapper'
import {AiTypeMpca} from '@/features/ActivityInfo/Mpca/AiTypeMpca'

export namespace AiMpcaMapper {

  type Bundle = AiBundle2<AiTypeMpca.Type>

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
              {by: _ => _.oblast},
              {by: _ => _.raion!},
              {by: _ => _.hromada!},
              {by: _ => _.project?.[0]!},
              {
                by: _ => AiMapper.mapPopulationGroup(_.displacement)
              },
            ],
            finalTransform: (grouped, [oblast, raion, hromada, project, displacement]) => {
              const disag = AiMapper.disaggregatePersons(grouped.flatMap(_ => _.persons).compact())
              const ai: AiTypeMpca.Type = {
                'Reporting Organization': 'Danish Refugee Council',
                'Implementing Partner': 'Danish Refugee Council',
                'Raion': raion,
                'Donor': fnSwitch(DrcProjectHelper.donorByProject[project], {
                  UHF: 'Ukraine Humanitarian Fund (UHF)',
                  NovoNordisk: 'Novo Nordisk (NN)',
                  OKF: `Ole Kirk's Foundation (OKF)`,
                  SDCS: `Swiss Agency for Development and Cooperation (SDC)`,
                  BHA: `USAID's Bureau for Humanitarian Assistance (USAID/BHA)`,
                  FINM: 'Ministry of Foreign Affairs - Finland (MFA Finland)',
                  FCDO: 'Foreign, Commonwealth & Development Office (FCDO)',
                  AugustinusFonden: 'Augustinus Foundation (Augustinus)',
                  EUIC: `EU\'s Instrument contributing to Stability and Peace (IcSP)`,
                  DUT: 'Dutch Relief Alliance (DutchRelief)',
                  ECHO: 'European Commission Humanitarian Aid Department and Civil Protection (ECHO)',
                  DANI: `Danish International Development Agency - Ministry of Foreign Affairs - Denmark (DANIDA)`,
                }, () => undefined) as any,
                'Response Theme': 'No specific theme',
                'Number of Covered Months': 'Three months (recommended)',
                'Financial Service Provider (FSP)': 'Bank Transfer',
                'Hromada': hromada,
                'Population Group': displacement,
                'Total amount (USD) distributed through multi-purpose cash assistance': 'TODO' as any,
                'Payments Frequency': 'Multiple payments',
                'Activity Plan Code': project as never,
                'Indicators - MPCA': '# of individuals assisted with multi-purpose cash assistance',
                'Reporting Month': periodStr,
                'Girls (0-17)': disag['Girls (0-17)'] ?? 0,
                'Boys (0-17)': disag['Boys (0-17)'] ?? 0,
                'Adult Women (18-59)': disag['Adult Women (18-59)'] ?? 0,
                'Adult Men (18-59)': disag['Adult Men (18-59)'] ?? 0,
                'Older Women (60+)': disag['Older Women (60+)'] ?? 0,
                'Older Men (60+)': disag['Older Men (60+)'] ?? 0,
                'Total Individuals Reached': disag['Total Individuals Reached'] ?? 0,
                'People with disability': disag['People with Disability'] ?? 0,
                'Girls with disability (0-17)': disag['Girls with disability (0-17)'] ?? 0,
                'Boys with disability (0-17)': disag['Boys with disability (0-17)'] ?? 0,
                'Adult Women with disability (18-59)': disag['Adult Women with disability (18-59)'] ?? 0,
                'Adult Men with disability (18-59)': disag['Adult Men with disability (18-59)'] ?? 0,
                'Older Women with disability (60+)': disag['Older Women with disability (60+)'] ?? 0,
                'Older Men with disability (60+)': disag['Older Men with disability (60+)'] ?? 0,
              } as const
              const request = ActivityInfoSdk.makeRecordRequests({
                activityIdPrefix: 'drcflsc',
                activityYYYYMM: periodStr,
                formId: activitiesConfig.snfi.id,
                activity: ai,
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
        }
      )
  }
}