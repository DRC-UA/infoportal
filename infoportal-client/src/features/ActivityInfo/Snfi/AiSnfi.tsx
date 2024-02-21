import React, {useEffect, useState} from 'react'
import {Page} from '@/shared/Page'
import {Panel} from '@/shared/Panel'
import {useAppSettings} from '@/core/context/ConfigContext'
import {IpInput} from '@/shared/Input/Input'
import {format, subMonths} from 'date-fns'
import {Sheet} from '@/shared/Sheet/Sheet'
import {useI18n} from '@/core/i18n'
import {AiPreviewActivity, AiPreviewRequest, AiSendBtn, AiViewAnswers} from '@/features/ActivityInfo/shared/ActivityInfoActions'
import {AiShelterData} from '@/features/ActivityInfo/Snfi/aiSnfiData'
import {IpBtn} from '@/shared/Btn'
import {useIpToast} from '@/core/useToast'
import {useAsync} from '@/shared/hook/useAsync'
import {AiSnfiInterface} from '@/features/ActivityInfo/Snfi/AiSnfiInterface'
import {useFetcher} from '@/shared/hook/useFetcher'
import {Period, PeriodHelper} from '@infoportal-common'

export const AiSnfi = () => {
  const {api} = useAppSettings()
  const {toastHttpError} = useIpToast()
  const fetcher = useFetcher((p: Period) => {
    const res = Promise.all([
      AiShelterData.reqRepairs(api)(p),
      AiShelterData.reqEsk(api)(p),
    ]).then(_ => _.reduce((acc, r) => [...acc, ...r], []))
    return res
  })
  const [period, setPeriod] = useState(format(subMonths(new Date(), 1), 'yyyy-MM'))
  const {m} = useI18n()

  useEffect(() => {
    fetcher.fetch({}, PeriodHelper.fromYYYYMM(period))
  }, [period])

  const _submit = useAsync((id: string, p: any) => api.activityInfo.submitActivity(p), {
    requestKey: ([i]) => i
  })

  // console.log(fetcher.get?.map(_ => _.nta).compact().map(_ => {
  //   const a = add(
  //     _.total_apt_damage_light,
  //     _.total_apt_damage_medium,
  //     _.total_damage_heavy,
  //     _.total_damage_light,
  //     _.total_damage_medium
  //   )
  //   if (a === 0) return _.id
  // }))

  return (
    <Page width="full">
      <Panel>
        <Sheet
          header={
            <>
              <IpInput type="month" sx={{width: 200, mr: 1}} helperText={null} value={period} onChange={_ => setPeriod(_.target.value)}/>
              <IpBtn
                loading={_submit.anyLoading}
                icon="send"
                variant="contained"
                sx={{ml: 'auto'}}
                onClick={() => {
                  if (!fetcher.get) return
                  _submit.call('all', fetcher.get.map(_ => _.requestBody)).catch(toastHttpError)
                }}
              >
                {m.submitAll}
              </IpBtn>
            </>
          }
          defaultLimit={100}
          id="ai-shelter"
          data={fetcher.get}
          loading={fetcher.loading}
          columns={[
            {
              id: 'actions', width: 150, head: '', render: _ => (
                <>
                  <AiSendBtn
                    disabled={!_.activity.Hromada} color="primary"
                    onClick={() => {
                      _submit.call(_.requestBody.changes[0].recordId, [_.requestBody])
                      // _submit.call(_.id, [indexActivity[_.id]!.request]).catch(toastHttpError)
                    }}
                  />
                  {_.esk && <AiViewAnswers tooltip="esk" answers={_.esk}/>}
                  {_.nta && <AiViewAnswers tooltip="nta" answers={_.nta}/>}
                  {_.ta && <AiViewAnswers tooltip="ta" answers={_.ta}/>}
                  <AiPreviewActivity activity={_.activity}/>
                  <AiPreviewRequest request={_.requestBody}/>
                </>
              )
            },
            {type: 'select_one', id: 'Report to a planned project', head: 'Report to a planned project', render: row => row.activity['Report to a planned project']},
            {type: 'select_one', id: 'Project', head: 'Project', render: row => row.activity['Plan Code']},
            {type: 'select_one', id: 'Plan Code', head: 'Plan Code ID', render: row => (AiSnfiInterface.options['Plan Code'] as any)[row.activity['Plan Code']]},
            {type: 'select_one', id: 'SNFI indictors', head: 'SNFI indictors', render: row => row.activity['SNFI indictors']},
            {type: 'select_one', id: 'Oblast', head: 'Oblast', render: row => row.activity['Oblast']},
            {type: 'select_one', id: 'Raion', head: 'Raion', render: row => row.activity['Raion']},
            {type: 'select_one', id: 'Hromada', head: 'Hromada', render: row => row.activity['Hromada']},
            {type: 'select_one', id: 'Implementation status', head: 'Implementation status', render: row => row.activity['Implementation status']},
            {type: 'select_one', id: 'Population Group', head: 'Population Group', render: row => row.activity['Population Group']},
            {type: 'number', id: 'Indicator Value (HHs reached, buildings, etc.)', head: 'Indicator Value (HHs reached, buildings, etc.)', render: row => row.activity['Indicator Value (HHs reached, buildings, etc.)']},
            {type: 'number', id: '# Individuals Reached', head: '# Individuals Reached', render: row => row.activity['# Individuals Reached']},
            {type: 'number', id: 'Girls (0-17)', head: 'Girls (0-17)', render: row => row.activity['Girls (0-17)']},
            {type: 'number', id: 'Boys (0-17)', head: 'Boys (0-17)', render: row => row.activity['Boys (0-17)']},
            {type: 'number', id: 'Women (18-59)', head: 'Women (18-59)', render: row => row.activity['Women (18-59)']},
            {type: 'number', id: 'Men (18-59)', head: 'Men (18-59)', render: row => row.activity['Men (18-59)']},
            {type: 'number', id: 'Elderly Women (60+)', head: 'Elderly Women (60+)', render: row => row.activity['Elderly Women (60+)']},
            {type: 'number', id: 'Elderly Men (60+)', head: 'Elderly Men (60+)', render: row => row.activity['Elderly Men (60+)']},
            {type: 'number', id: 'People with disability', head: 'People with disability', render: row => row.activity['People with disability']},
          ]}
        />
      </Panel>
    </Page>
  )
}