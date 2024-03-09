import {useAppSettings} from '@/core/context/ConfigContext'
import React from 'react'
import {AiBundle2, BundleTable} from '@/features/ActivityInfo/shared/AiBundle'
import {add, groupBy, PeriodHelper} from '@infoportal-common'
import {Panel} from '@/shared/Panel'
import {Page} from '@/shared/Page'
import {ActivityInfoSdk} from '@/core/sdk/server/activity-info/ActiviftyInfoSdk'
import {AiTypeGbv} from '@/features/ActivityInfo/Gbv/AiTypeGbv'
import {AiGbvMapper} from '@/features/ActivityInfo/Gbv/AiGbvMapper'
import {activitiesConfig} from '@/features/ActivityInfo/ActivityInfo'
import {useFetcher} from '@/shared/hook/useFetcher'

type AiGbvBundle = AiBundle2<AiTypeGbv.Type, AiTypeGbv.TypeSub>

export const AiGbv = () => {
  const {api} = useAppSettings()

  const req = (period: string) => {
    const filters = PeriodHelper.fromYYYYMM(period)
    return api.kobo.typedAnswers.searchProtection_gbv({filters}).then(AiGbvMapper.mapGbvActivity(period)).then(data => {
      const bundles: AiGbvBundle[] = []
      let i = 0
      groupBy({
        data,
        groups: [
          {by: _ => _.Oblast!},
          {by: _ => _.Raion!},
          {by: _ => _.Hromada!},
          {by: _ => _['Plan/Project Code']!},

        ],
        finalTransform: (grouped, [Oblast, Raion, Hromada, PlanCode]) => {
          const activity: AiTypeGbv.Type = {
            Oblast, Raion, Hromada,
            'Reporting Organization': 'Danish Refugee Council',
            'Response Theme': 'No specific theme',
            'Plan/Project Code': PlanCode,
          }
          const subActivities: AiTypeGbv.TypeSub[] = []
          groupBy({
            data: grouped,
            groups: [
              {by: _ => _['Indicators']!},
              {by: _ => _['Population Group']!},
            ],
            finalTransform: (grouped, [Indicators, PopulationGroup]) => {
              subActivities.push({
                'Reporting Month': period,
                'Population Group': PopulationGroup,
                'Indicators': Indicators,
                'Total Individuals Reached': grouped.sum(_ => add(
                  _['Girls (0-17)'],
                  _['Boys (0-17)'],
                  _['Adult Women (18-59)'],
                  _['Adult Men (18-59)'],
                  _['Older Women (60+)'],
                  _['Older Men (60+)'],
                )),
                'Girls (0-17)': grouped.sum(_ => add(_['Girls (0-17)'])),
                'Boys (0-17)': grouped.sum(_ => add(_['Boys (0-17)'])),
                'Adult Women (18-59)': grouped.sum(_ => add(_['Adult Women (18-59)'])),
                'Adult Men (18-59)': grouped.sum(_ => add(_['Adult Men (18-59)'])),
                'Older Women (60+)': grouped.sum(_ => add(_['Older Women (60+)'])),
                'Older Men (60+)': grouped.sum(_ => add(_['Older Men (60+)'])),
              })
            }
          })
          const request = ActivityInfoSdk.makeRecordRequests({
            activityIdPrefix: 'drcgbv',
            activityYYYYMM: period,
            formId: activitiesConfig.gbv.id,
            activity,
            subActivities,
            activityIndex: i++,
            subformId: activitiesConfig.protection_general.subId,
          })
          subActivities.forEach(s => {
            bundles.push({
              recordId: request.changes[0].recordId,
              activity: activity,
              subActivity: s,
              data: grouped.map(_ => _.answer),
              requestBody: request,
            })
          })
        }
      })
      return bundles
    })
  }
  const fetcher = useFetcher(req)

  return (
    <Page width="full">
      <Panel>
        <BundleTable id="gbv" fetcher={fetcher}/>
      </Panel>
    </Page>
  )
}