import {match} from '@axanc/ts-utils'

import {
  DrcDonor,
  DrcProgram,
  DrcProject,
  DrcProjectHelper,
  groupBy,
  KoboIndex,
  KoboMetaStatus,
  PeriodHelper,
  type KoboBaseTags,
  type KoboSubmissionFlat,
  type MpcaEntity,
  type OblastName,
  type Period,
} from 'infoportal-common'

import {appConfig} from '@/conf/AppConfig'
import {ActivityInfoSdk} from '@/core/sdk/server/activity-info/ActiviftyInfoSdk'
import {ApiSdk} from '@/core/sdk/server/ApiSdk'
import {AiMapper} from '@/features/ActivityInfo/shared/AiMapper'
import {AiMpcaType} from '@/features/ActivityInfo/Mpca/aiMpcaType'
import {aiInvalidValueFlag, AiTable, checkAiValid} from '@/features/ActivityInfo/shared/AiTable'

export namespace AiMpcaMapper {
  type Bundle = AiTable<AiMpcaType.Type>

  const getPlanCode = (drcProject: DrcProject) => {
    return match(drcProject)
      .cases({
        [DrcProject['UKR-000380 DANIDA']]: 'MPCA-DRC-00001',
        [DrcProject['UKR-000386 Pooled Funds']]: 'MPCA-DRC-00001',
        [DrcProject['UKR-000423 ECHO4']]: 'MPCA-DRC-00003',
      })
      .default(() => aiInvalidValueFlag + drcProject)
  }

  const themeSelector = (
    {koboId}: MpcaEntity,
    answer?: KoboSubmissionFlat<Record<string, any>, KoboBaseTags>,
  ): AiMpcaType.Type['Theme'] => {
    if (answer?.leave_regular_place === 'yes') return 'Evacuations'

    if (
      answer?.leave_regular_place === 'no' &&
      ['member_injured', 'member_passed', 'member_sick_leave'].includes(answer?.reduction_income)
    ) {
      return 'Emergency response after strikes'
    }

    if (
      answer?.leave_regular_place === 'no' &&
      answer?.reduction_income === 'no_events' &&
      answer?.safe_room === 'no' &&
      answer?.recent_shock === 'yes'
    ) {
      return 'Emergency response after strikes'
    }

    return 'Evacuations; Emergency response after strikes'
  }

  export const reqCashRegistration =
    (api: ApiSdk) =>
    async (period: Partial<Period>): Promise<Bundle[]> => {
      const periodStr = AiMapper.getPeriodStr(period)
      let i = 0
      const data = await api.mpca.search({}).then((record) =>
        record.data.filter(({activity, status, lastStatusUpdate}) => {
          if (activity !== DrcProgram.MPCA) return false
          if (status !== KoboMetaStatus.Committed) return false
          return lastStatusUpdate && PeriodHelper.isDateIn(period, lastStatusUpdate)
        }),
      )
      const allFormIds = Array.from(new Set(data.map(({formId}) => formId)))
      const koboIds = data.map(({koboId}) => koboId)
      const rawAnswers = (await Promise.all(allFormIds.map((formId) => api.kobo.answer.searchByAccess({formId}))))
        .flat()
        .map(({data}) => data)
        .flat()
        .filter(({id}) => koboIds.includes(id))
      const idToAnswerMap = new Map(rawAnswers.map((answer) => [answer.id, answer]))
      const dataWithTheme = data.map((record) => ({
        ...record,
        theme: themeSelector(record, idToAnswerMap.get(record.id)),
      }))

      return Promise.all(
        groupBy({
          data: dataWithTheme,
          groups: [
            {by: ({formId}) => formId},
            {by: ({oblast}: {oblast: OblastName}) => oblast!},
            {by: ({raion}) => raion!},
            {by: ({hromada}) => hromada!},
            {by: ({settlement}) => settlement!},
            {by: ({project}) => project?.[0]},
            {by: ({displacement}) => AiMapper.mapPopulationGroup(displacement) ?? 'Non-Displaced'},
            {by: ({theme}) => theme},
          ],
          finalTransform: async (grouped, groups) => {
            const [formId, oblast, raion, hromada, settlement, project, displacement, theme] = groups as [
              string,
              OblastName,
              AiMpcaType.Type['Raion'],
              AiMpcaType.Type['Hromada'],
              AiMpcaType.Type['Settlement'],
              DrcProject,
              AiMpcaType.Type['Population Group'],
              AiMpcaType.Type['Theme'],
            ]
            const disag = AiMapper.disaggregatePersons(grouped.flatMap(({persons}) => persons).compact())
            const activity: AiMpcaType.Type = {
              'Reporting Organization': 'Danish Refugee Council (DRC)',
              'Implementing Partner': 'Danish Refugee Council (DRC)',
              Oblast: oblast,
              Raion: raion,
              Hromada: hromada,
              Settlement: settlement,
              Donor: match<DrcDonor>(DrcProjectHelper.donorByProject[project as DrcProject])
                .cases({
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
                } as const)
                .default(() => aiInvalidValueFlag as AiMpcaType.Type['Donor']),
              'Number of Covered Months': 'Three months (recommended)',
              'Financial Service Provider (FSP)': 'Bank Transfer',
              Theme: theme,
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
            const request = AiMpcaType.buildRequest(
              {
                ...activity,
                ...(await AiMapper.getLocationRecordIdByMeta({oblast, raion, hromada, settlement})),
              },
              recordId,
            )

            return {
              submit: checkAiValid(
                activity.Raion,
                activity.Hromada,
                activity.Settlement,
                activity['Plan/Project Code'],
              ),
              recordId,
              data: grouped,
              activity,
              requestBody: ActivityInfoSdk.wrapRequest(request),
            }
          },
        }).transforms,
      )
    }
}
