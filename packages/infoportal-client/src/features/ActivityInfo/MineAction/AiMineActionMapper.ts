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
    (period: Partial<Period>): Promise<Bundle[]> => {
      const periodStr = AiMapper.getPeriodStr(period)

      return Promise.all([
        api.hdp
          .fetchRiskEducation()
          .then((response) => response.filter((_) => _['Reporting Month'] === periodStr))
          .then((filteredData) => mapHdpActivity(filteredData, periodStr)),
        api.koboMeta
          .search({activities: [DrcProgram.TIA], status: [KoboMetaStatus.Committed]})
          .then(({data}) => data.filter((record) => PeriodHelper.isDateIn(period, record.lastStatusUpdate)))
          .then((filteredData) => mapTiaActivity(filteredData, periodStr)),
      ]).then((processedResponses) => processedResponses.reduce((acc, r) => [...acc, ...r], []))
    }

  const mapHdpActivity = (data: AiMinactionSqlType[], periodStr: string): Bundle[] => {
    return data.map((_, i): Bundle => {
      const addFlagIfNotInList = (value: string, options: Record<string, string>): any => {
        if (!options[value]) return aiInvalidValueFlag + ' ' + value
        return value
      }
      const rawActivity: AiMineActionType.Type = {
        'Reporting Organization': 'Danish Refugee Council (DRC)',
        'Plan/Project Code': addFlagIfNotInList(
          _['Plan/Project Code'],
          AiMineActionType.options['Activity Planning Module (Mine Action)'],
        ),
        Oblast: _['Oblast Oblast ENG/UKR'] as OblastName,
        Raion: _['Raion Raion ENG/UKR'],
        Hromada: _['Hromada Hromada ENG/PCODE/UKR'],
        Settlement: undefined,
        'Response Theme': addFlagIfNotInList(_['Response Theme'], AiMineActionType.options['Response Theme']),
      }
      const rawSubActivity: AiMineActionType.AiTypeActivitiesAndPeople = {
        'Reporting Month': _['Reporting Month'],
        'Population Group': addFlagIfNotInList(
          _['Population Group'],
          AiMineActionType.AiTypeActivitiesAndPeople.options['Population Group'],
        ),
        Indicators: addFlagIfNotInList(
          _['Indicator'],
          AiMineActionType.AiTypeActivitiesAndPeople.options['Indicators - Protection'],
        ),
        'Total Individuals Reached': _['Total Individuals Reached'],
        'Girls (0-17)': _['Girls (0-17)'],
        'Boys (0-17)': _['Boys (0-17)'],
        'Adult Women (18-59)': _['Adult Women (18-59)'],
        'Adult Men (18-59)': _['Adult Men (18-59)'],
        'Older Women (60+)': _['Older Women (60+)'],
        'Older Men (60+)': _['Older Men (60+)'],
        'Non-individuals Reached/Quantity': 0,
        'People with Disability': _['People with Disability'],
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
          ...AiMapper.getLocationRecordIdByMeta({
            oblast: rawActivity.Oblast as OblastName,
            raion: rawActivity.Raion,
            hromada: rawActivity.Hromada,
            settlement: rawActivity.Settlement,
          }),
        },
        recordId,
      )
      const bundles: Bundle = {
        submit: checkAiValid(
          _['Oblast Oblast ENG/UKR'],
          _['Raion Raion ENG/UKR'],
          _['Hromada Hromada ENG/PCODE/UKR'],
          _['Plan/Project Code'],
        ),
        recordId,
        activity: rawActivity,
        subActivity: rawSubActivity,
        data: [_],
        requestBody: ActivityInfoSdk.wrapRequest(request),
      }
      return bundles
    })
  }

  const tiaPlanCode: Partial<Record<DrcProject, AiMineActionType['Plan/Project Code']>> = {
    [DrcProject['UKR-000372 ECHO3']]: 'MA-DRC-00004',
    [DrcProject['UKR-000363 UHF8']]: 'MA-DRC-00005',
    [DrcProject['UKR-000350 SIDA']]: 'MA-DRC-00009',
    [DrcProject['UKR-000397 GFFO']]: 'MA-DRC-00008',
  } as const

  const mapTiaActivity = (data: IKoboMeta[], periodStr: string): Bundle[] => {
    const res: Bundle[] = []
    let i = 0
    groupBy({
      data,
      groups: [
        {by: (_) => _.oblast!},
        {by: (_) => _.raion!},
        {by: (_) => _.hromada!},
        {by: (_) => _.settlement!},
        {by: (_) => _.project?.[0]!},
      ],
      finalTransform: (grouped, [oblast, raion, hromada, settlement, project]) => {
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
          ...AiMapper.getLocationRecordIdByMeta({oblast, raion, hromada, settlement}),
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
                (_: AiMineActionType.AiTypeActivitiesAndPeople) => _.Indicators,
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
      groups: [{by: (_) => _.activity!}, {by: (_) => _.displacement!}],
      finalTransform: (grouped, [activity, displacement]) => {
        const disaggregation = AiMapper.disaggregatePersons(grouped.flatMap((_) => _.persons).compact())
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
