import {match} from '@axanc/ts-utils'

import {
  DrcProgram,
  DrcProject,
  groupBy,
  KoboMetaStatus,
  Period,
  PeriodHelper,
  OblastName,
  type IKoboMeta,
} from 'infoportal-common'

import type {ApiSdk} from '@/core/sdk/server/ApiSdk'
import {ActivityInfoSdk} from '@/core/sdk/server/activity-info/ActiviftyInfoSdk'
import type {AiMinactionSqlType} from '@/core/sdk/server/hdp/HdpSdkType'
import {AiMapper} from '@/features/ActivityInfo/shared/AiMapper'
import {aiInvalidValueFlag, AiTable, checkAiValid} from '@/features/ActivityInfo/shared/AiTable'
import {AiMineActionType} from '@/features/ActivityInfo/MineAction/aiMineActionType'

export namespace AiMineActionMapper {
  type Bundle = AiTable<AiMineActionType.Type, AiMineActionType.AiTypeActivitiesAndPeople>

  export const request =
    (api: ApiSdk) =>
    async (period: Partial<Period>): Promise<Bundle[]> => {
      const periodStr = AiMapper.getPeriodStr(period)

      return Promise.all([
        api.hdp
          .fetchAiRiskEducation()
          .then((response) => response.filter((_) => _['Reporting Month'] === periodStr))
          .then((filteredData) => mapHdpActivity(filteredData, periodStr)),
        api.koboMeta
          .search({activities: [DrcProgram.TIA], status: [KoboMetaStatus.Committed]})
          .then(({data}) => data.filter((record) => PeriodHelper.isDateIn(period, record.lastStatusUpdate)))
          .then(
            (dataInPeriod) =>
              dataInPeriod.map(({persons, ...rest}) => ({...rest, ...(persons?.[0] && {persons: [persons[0]]})})),
            // the first row is the beneficiary
          )
          .then((beneficiariesOnly) => beneficiariesOnly.filter(({persons}) => persons?.[0].age! > 17))
          .then((adultsData) => mapTiaActivity(adultsData, periodStr)),
      ]).then((processedResponses) => processedResponses.reduce((acc, r) => [...acc, ...r], []))
    }

  const mapHdpActivity = async (data: AiMinactionSqlType[], periodStr: string): Promise<Bundle[]> => {
    return Promise.all(
      data.map(async (submission, i): Promise<Bundle> => {
        const addFlagIfNotInList = (value: string, options: Record<string, string>): any => {
          if (!options[value]) return aiInvalidValueFlag + ' ' + value
          return value
        }
        const rawActivity: AiMineActionType.Type = {
          'Reporting Organization': 'Danish Refugee Council (DRC)',
          'Plan/Project Code': addFlagIfNotInList(
            submission['Plan/Project Code'],
            AiMineActionType.options['Activity Planning Module (Mine Action)'],
          ),
          Oblast: submission['Oblast Oblast ENG/UKR'] as OblastName,
          Raion: submission['Raion Raion ENG/UKR'],
          Hromada: submission['Hromada Hromada ENG/PCODE/UKR'],
          Settlement: undefined,
          'Response Theme': addFlagIfNotInList(
            submission['Response Theme'],
            AiMineActionType.options['Response Theme'],
          ),
        }
        const rawSubActivity: AiMineActionType.AiTypeActivitiesAndPeople = {
          'Reporting Month': submission['Reporting Month'],
          'Population Group': addFlagIfNotInList(
            submission['Population Group'],
            AiMineActionType.AiTypeActivitiesAndPeople.options['Population Group'],
          ),
          Indicators: addFlagIfNotInList(
            submission['Indicator'],
            AiMineActionType.AiTypeActivitiesAndPeople.options['Indicators - Protection'],
          ),
          'Total Individuals Reached': submission['Total Individuals Reached'] ?? 0,
          'Girls (0-17)': submission['Girls (0-17)'] ?? 0,
          'Boys (0-17)': submission['Boys (0-17)'] ?? 0,
          'Adult Women (18-59)': submission['Adult Women (18-59)'] ?? 0,
          'Adult Men (18-59)': submission['Adult Men (18-59)'] ?? 0,
          'Older Women (60+)': submission['Older Women (60+)'] ?? 0,
          'Older Men (60+)': submission['Older Men (60+)'] ?? 0,
          'Non-individuals Reached/Quantity': 0,
          'People with Disability': submission['People with Disability'] ?? 0,
        }
        const recordId = ActivityInfoSdk.makeRecordId({
          index: i,
          prefix: 'drcma',
          periodStr,
        })
        const request = AiMineActionType.buildRequest(
          {
            ...rawActivity,
            'Activities and People': [rawSubActivity],
            ...(await AiMapper.getLocationRecordIdByMeta({
              oblast: rawActivity.Oblast as OblastName,
              raion: rawActivity.Raion,
              hromada: rawActivity.Hromada,
              settlement: rawActivity.Settlement,
            })),
          },
          recordId,
        )

        return {
          submit: checkAiValid(
            submission['Oblast Oblast ENG/UKR'],
            submission['Raion Raion ENG/UKR'],
            submission['Hromada Hromada ENG/PCODE/UKR'],
            submission['Plan/Project Code'],
          ),
          recordId,
          activity: rawActivity,
          subActivity: rawSubActivity,
          data: [submission],
          requestBody: ActivityInfoSdk.wrapRequest(request),
        }
      }),
    )
  }

  const tiaPlanCode: Partial<Record<DrcProject, AiMineActionType['Plan/Project Code']>> = {
    [DrcProject['UKR-000372 ECHO3']]: 'MA-DRC-00004',
    [DrcProject['UKR-000363 UHF8']]: 'MA-DRC-00005',
    [DrcProject['UKR-000350 SIDA']]: 'MA-DRC-00009',
    [DrcProject['UKR-000397 GFFO']]: 'MA-DRC-00008',
    [DrcProject['UKR-000423 ECHO4']]: 'MA-DRC-00012',
    [DrcProject['UKR-000386 Pooled Funds']]: 'MA-DRC-00013',
  } as const

  const mapTiaActivity = (data: IKoboMeta[], periodStr: string): Bundle[] => {
    const res: Bundle[] = []
    let i = 0
    groupBy({
      data,
      groups: [
        {by: ({oblast}) => oblast},
        {by: ({raion}) => raion!},
        {by: ({hromada}) => hromada!},
        {by: ({settlement}) => settlement!},
        {by: ({project}) => project[0]},
      ],
      finalTransform: async (grouped, [oblast, raion, hromada, settlement, project]) => {
        const activity: AiMineActionType = {
          // @ts-expect-error it's an intention to flag an error here
          'Plan/Project Code': tiaPlanCode[project] ?? `${aiInvalidValueFlag} ${project}`,
          'Reporting Organization': 'Danish Refugee Council (DRC)',
          'Response Theme': 'No specific theme',
          Oblast: oblast,
          Raion: raion,
          Hromada: hromada,
          Settlement: settlement,
        }
        const subActivities = mapSubActivity(grouped, periodStr)
        const activityPrebuilt = {
          ...activity,
          ...(await AiMapper.getLocationRecordIdByMeta({oblast, raion, hromada, settlement})),
          'Activities and People': subActivities.map((_) => _.activity),
        }
        const recordId = ActivityInfoSdk.makeRecordId({
          prefix: 'drctia',
          periodStr,
          index: i++,
        })
        return subActivities.map((subActivity) => {
          res.push({
            activity,
            data: subActivity.data,
            requestBody: ActivityInfoSdk.wrapRequest(AiMineActionType.buildRequest(activityPrebuilt, recordId)),
            subActivity: subActivity.activity,
            recordId,
            submit: checkAiValid(
              activity.Oblast,
              activity.Raion,
              activity.Hromada,
              activity.Settlement,
              activity['Plan/Project Code'],
              ...(activity['Activities and People']?.map(
                ({Indicators}: AiMineActionType.AiTypeActivitiesAndPeople) => Indicators,
              ) ?? []),
            ),
          })
        })
      },
    }).transforms

    return res
  }

  const mapSubActivity = (
    data: IKoboMeta[],
    periodStr: string,
  ): {activity: AiMineActionType.AiTypeActivitiesAndPeople; data: IKoboMeta[]}[] => {
    const res: {activity: AiMineActionType.AiTypeActivitiesAndPeople; data: IKoboMeta[]}[] = []
    groupBy({
      data,
      groups: [{by: ({activity}) => activity!}, {by: ({displacement}) => displacement!}],
      finalTransform: (grouped, [activity, displacement]) => {
        const disaggregation = AiMapper.disaggregatePersons(grouped.flatMap(({persons}) => persons).compact())
        res.push({
          data: grouped,
          activity: {
            'Non-individuals Reached/Quantity': grouped.length,
            'Reporting Month': periodStr,
            'Population Group': AiMapper.mapPopulationGroup(displacement),
            Indicators: match(activity)
              .cases({
                TIA: 'Cash assistance provided to mine / ERW survivor (SADD) > # EO survivors who received cash assistance (SADD)',
              })
              .default((value: unknown) => `${aiInvalidValueFlag} ${value}` as any),
            ...disaggregation,
          },
        })
      },
    })
    return res
  }
}
