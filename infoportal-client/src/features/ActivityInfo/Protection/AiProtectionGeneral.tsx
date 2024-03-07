import {Page} from '@/shared/Page'
import React from 'react'
import {useAppSettings} from '@/core/context/ConfigContext'
import {Panel} from '@/shared/Panel'
import {AiProtectionMapper} from '@/features/ActivityInfo/Protection/aiProtectionGeneralMapper'
import {add, groupBy, PeriodHelper} from '@infoportal-common'
import {Obj} from '@alexandreannic/ts-utils'
import {AiBundle2, BundleTable} from '@/features/ActivityInfo/shared/AiBundle'
import {useFetcher} from '@/shared/hook/useFetcher'
import {AiTypeGeneralProtection} from '@/features/ActivityInfo/Protection/AiTypeGeneralProtection'
import {ActivityInfoSdk} from '@/core/sdk/server/activity-info/ActiviftyInfoSdk'
import {activitiesConfig} from '@/features/ActivityInfo/ActivityInfo'

type AiProtectionGeneralBundle = AiBundle2<AiTypeGeneralProtection.Type, AiTypeGeneralProtection.TypeSub>

export const AiProtectionGeneral = () => {
  const {api} = useAppSettings()

  const fetcher = useFetcher(async (period: string) => {
    const filters = PeriodHelper.fromYYYYMM(period)
    const mappedData = await Promise.all([
      // searchProtection_pss
      api.kobo.typedAnswers.searchProtection_groupSession({filters}).then(AiProtectionMapper.mapGroupSession(period)),
      api.kobo.typedAnswers.searchProtection_communityMonitoring({filters}).then(AiProtectionMapper.mapCommunityMonitoring(period)),
      api.kobo.typedAnswers.searchProtection_hhs3({filters}).then(AiProtectionMapper.mapHhs(period)),
    ]).then(_ => _.reduce((acc, curr) => [...acc, ...curr], []))

    const bundles: AiProtectionGeneralBundle[] = []
    let i = 0
    groupBy({
      data: mappedData,
      groups: [
        {by: _ => _.Oblast ?? ''},
        {by: _ => _.Raion ?? ''},
        {by: _ => _.Hromada ?? ''},
        {by: _ => _['Plan/Project Code'] ?? ''},
      ],
      finalTransform: (grouped, [Oblast, Raion, Hromada, PlanCode]) => {
        const activity: AiTypeGeneralProtection.Type = {
          Oblast,
          Raion,
          Hromada,
          'Plan/Project Code': PlanCode,
          'Reporting Organization': 'Danish Refugee Council',
          'Response Theme': 'No specific theme',
        }
        const subActivities = Obj.entries(grouped.groupBy(_ => _['Indicators']))
          .flatMap(([indicator, byIndicator]) => {
            return Obj.entries(byIndicator.groupBy(_ => _['Population Group'])).map(([group, v]) => {
              const x: AiTypeGeneralProtection.TypeSub = {
                'Indicators': indicator,
                'Population Group': group,
                'Reporting Month': period,
                'Adult Men (18-59)': v.sum(_ => add(_['Adult Men (18-59)'])),
                'Adult Women (18-59)': v.sum(_ => add(_['Adult Women (18-59)'])),
                'Boys (0-17)': v.sum(_ => add(_['Boys (0-17)'])),
                'Girls (0-17)': v.sum(_ => add(_['Girls (0-17)'])),
                'Older Women (60+)': v.sum(_ => add(_['Older Women (60+)'])),
                'Older Men (60+)': v.sum(_ => add(_['Older Men (60+)'])),
                'Total Individuals Reached': v.sum(_ => add(_['Total Individuals Reached'])),
              }
              return x
            })
          })
        const request = ActivityInfoSdk.makeRecordRequests({
          activityIdPrefix: 'drcprot',
          activityYYYYMM: period,
          formId: activitiesConfig.protection_general.id,
          activity,
          subActivities,
          activityIndex: i++,
          subformId: activitiesConfig.protection_general.subId,
        })
        subActivities.forEach((s) => {
          bundles.push({
            recordId: request.changes[0].recordId,
            activity: activity,
            subActivity: s,
            data: grouped.map(_ => _.answer),
            requestBody: request,
          })
        })
      },
    })
    return bundles
  })

  return (
    <Page width="full">
      <Panel>
        <BundleTable fetcher={fetcher}/>
      </Panel>
    </Page>
  )
}