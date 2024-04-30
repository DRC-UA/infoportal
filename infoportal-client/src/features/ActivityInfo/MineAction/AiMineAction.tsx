import {Page} from '@/shared/Page'
import React from 'react'
import {useAppSettings} from '@/core/context/ConfigContext'
import {Panel} from '@/shared/Panel'
import {AiBundle, AiBundleTable, checkAiValid} from '@/features/ActivityInfo/shared/AiBundle'
import {useFetcher} from '@/shared/hook/useFetcher'
import {AiMineActionType} from '@/features/ActivityInfo/MineAction/aiMineActionType'
import {AiProtectionType} from '@/features/ActivityInfo/Protection/aiProtectionType'
import {ActivityInfoSdk} from '@/core/sdk/server/activity-info/ActiviftyInfoSdk'
import {activitiesConfig} from '@/features/ActivityInfo/ActivityInfo'
import {AiMapper} from '@/features/ActivityInfo/shared/AiMapper'

type Bundle = AiBundle<AiMineActionType.Type, AiMineActionType.TypeSub>

export const AiMineAction = () => {
  const {api} = useAppSettings()
  const fetcher = useFetcher((periodStr: string) => api.hdp.fetchRiskEducation().then(res => res.map((_, i) => {
    const request = ActivityInfoSdk.makeRecordRequests({
      activityIdPrefix: 'drcmine',
      activityYYYYMM: periodStr,
      formId: activitiesConfig.mineAction.id,
      activity: AiProtectionType.map({
        'Reporting Organization': _['Reporting Organization'],
        'Implementing Partner'?: _['Implementing Partner'],
        'Implementing Partner 2'?: _['Implementing Partner 2'],
        'Plan/Project Code': _['Plan/Project Code'],
        'Oblast': _['Oblast'],
        'Raion': _['Raion'],
        'Hromada': _['Hromada'],
        'Settlement': _['Settlement'],
        'Collective Site'?: _['Collective Site'],
        'Response Theme': _['Response Theme'],
      }),
      subActivities: [AiProtectionType.mapSub(_)],
      activityIndex: i,
      subformId: activitiesConfig.protection_general.subId,
    })
    const bundles: Bundle = {
      submit: checkAiValid(_.Oblast, _.Raion, _.Hromada, _['Plan/Project Code']),
      recordId: request.changes[0].recordId,
      activity: _,
      data: _,
      requestBody: request,
    }
    return bundles
  })))

  return (
    <Page width="full">
      <Panel>
        <AiBundleTable fetcher={fetcher} id="snfi"/>
      </Panel>
    </Page>
  )
}