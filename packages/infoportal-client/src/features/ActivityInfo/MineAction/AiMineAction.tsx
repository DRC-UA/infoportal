import {Page} from '@/shared/Page'
import React from 'react'
import {useAppSettings} from '@/core/context/ConfigContext'
import {Panel} from '@/shared/Panel'
import {AiBundleTable, aiInvalidValueFlag, AiTable, checkAiValid} from '@/features/ActivityInfo/shared/AiTable'
import {useFetcher} from '@/shared/hook/useFetcher'
import {AiMineActionType} from '@/features/ActivityInfo/MineAction/aiMineActionType'
import {ActivityInfoSdk} from '@/core/sdk/server/activity-info/ActiviftyInfoSdk'
import {activitiesConfig} from '@/features/ActivityInfo/ActivityInfo'
import {AiMapper} from '@/features/ActivityInfo/shared/AiMapper'
import {OblastName, Period} from 'infoportal-common'

type Bundle = AiTable<AiMineActionType.Type, AiMineActionType.AiTypeActivitiesAndPeople>

export const AiMineAction = () => {
  const {api} = useAppSettings()
  const fetcher = useFetcher(async (period: Partial<Period>) =>
    api.hdp.fetchRiskEducation().then((res) => {
      const periodStr = AiMapper.getPeriodStr(period)
      return Promise.all(
        res
          .filter((_) => _['Reporting Month'] === periodStr)
          .map(async (_, i) => {
            const addFlagIfNotInList = (value: string, options: Record<string, string>): any => {
              if (!options[value]) return aiInvalidValueFlag + ' ' + value
              return value
            }
            const rawActivity: AiMineActionType.Type = {
              'Reporting Organization': 'Danish Refugee Council (DRC)',
              'Plan/Project Code': addFlagIfNotInList(
                _['Plan/Project Code'],
                AiMineActionType.options['Activity Planning Module (Mine Action AoR)'],
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
          }),
      )
    }),
  )

  return (
    <Page width="full">
      <Panel>
        <AiBundleTable fetcher={fetcher} id="snfi" />
      </Panel>
    </Page>
  )
}
