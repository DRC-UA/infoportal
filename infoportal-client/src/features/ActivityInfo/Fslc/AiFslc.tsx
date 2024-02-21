import React, {useEffect, useState} from 'react'
import {Page} from '@/shared/Page'
import {Panel} from '@/shared/Panel'
import {useAppSettings} from '@/core/context/ConfigContext'
import {IpInput} from '@/shared/Input/Input'
import {format, subMonths} from 'date-fns'
import {Sheet} from '@/shared/Sheet/Sheet'
import {useI18n} from '@/core/i18n'
import {AiPreviewActivity, AiPreviewRequest, AiSendBtn, AiViewAnswers} from '@/features/ActivityInfo/shared/ActivityInfoActions'
import {IpBtn} from '@/shared/Btn'
import {useIpToast} from '@/core/useToast'
import {useAsync} from '@/shared/hook/useAsync'
import {AiFslcData} from '@/features/ActivityInfo/Fslc/aiFslcData'
import {useFetcher} from '@/shared/hook/useFetcher'
import {PeriodHelper} from '@infoportal-common'

export const AiFslc = () => {
  const {api} = useAppSettings()
  const {toastHttpError} = useIpToast()
  const fetcher = useFetcher(AiFslcData.reqEcrecCashRegistration(api))
  const [period, setPeriod] = useState(format(subMonths(new Date(), 1), 'yyyy-MM'))
  const {m} = useI18n()

  useEffect(() => {
    fetcher.fetch({}, PeriodHelper.fromYYYYMM(period))
  }, [period])

  const _submit = useAsync((id: string, p: any) => api.activityInfo.submitActivity(p), {
    requestKey: ([i]) => i
  })

  return (
    <Page width="full">
      <Panel>
        <Sheet
          showExportBtn
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
          defaultLimit={100} id="ai-fslc" data={fetcher.get} loading={fetcher.loading} columns={[
          {
            id: 'actions', renderExport: false, width: 120, head: '', render: _ => (
              <>
                <AiSendBtn
                  disabled={!_.activity.Hromada}
                  onClick={() => {
                    // _submit.call(_.id, [indexActivity[_.id]!.request]).catch(toastHttpError)
                  }}
                />
                <AiViewAnswers answers={_.data}/>
                <AiPreviewActivity activity={_.activity}/>
                <AiPreviewRequest request={_.requestBody}/>
              </>
            )
          },
          {type: 'number', id: 'lgth', head: 'Count', width: 0, render: row => (row.activity as any).length},
          {type: 'select_one', id: 'ai-id', head: 'Record ID', render: row => row.requestBody.changes[0].recordId},
          {type: 'select_one', id: 'Project (FSLC-Updated)', head: 'Project (FSLC-Updated)', render: row => row.activity['Project (FSLC-Updated)']},
          {type: 'select_one', id: 'Oblast', head: 'Oblast', render: row => row.activity['Oblast']},
          {type: 'select_one', id: 'Raion', head: 'Raion', render: row => row.activity['Raion']},
          {type: 'select_one', id: 'Hromada', head: 'Hromada', render: row => row.activity['Hromada']},
          {type: 'select_one', id: 'Response Theme', head: 'Response Theme', render: row => row.activity['Response Theme']},
          {type: 'select_one', id: 'Response Plan', head: 'Response Plan', render: row => row.activity['Response Plan']},
          {type: 'select_one', id: 'Reporting Month', head: 'Reporting Month', render: row => row.activity['Reporting Month']},
          {type: 'select_one', id: 'Population Group', head: 'Population Group', render: row => row.activity['Population Group']},
          {type: 'select_one', id: 'FSLC Indicators', head: 'FSLC Indicators', render: row => row.activity['FSLC Indicators']},
          {type: 'select_one', id: 'Activity status', head: 'Activity status', render: row => row.activity['Activity status']},
          {type: 'select_one', id: 'Assistance Modality', head: 'Assistance Modality', render: row => row.activity['Assistance Modality']},
          {type: 'select_one', id: 'Cash Delivery Mechanism', head: 'Cash Delivery Mechanism', render: row => row.activity['Cash Delivery Mechanism']},
          {type: 'number', id: 'Value per unit', head: 'Value per unit', render: row => row.activity['Value per unit']},
          {type: 'select_one', id: 'Currency', head: 'Currency', render: row => row.activity['Currency']},
          {type: 'select_one', id: 'Frequency', head: 'Frequency', render: row => row.activity['Frequency']},
          {type: 'number', id: 'Households', head: 'Households', render: row => row.activity['Households']},
          {type: 'number', id: 'Total Individuals Reached', head: 'Total Individuals Reached', render: row => row.activity['Total Individuals Reached']},
          {type: 'number', id: 'New unique Individuals Reached', head: 'New unique Individuals Reached', render: row => row.activity['New unique Individuals Reached']},
          {type: 'number', id: 'Girls', head: 'Girls', render: row => row.activity['Girls']},
          {type: 'number', id: 'Boys', head: 'Boys', render: row => row.activity['Boys']},
          {type: 'number', id: 'Adult Women', head: 'Adult Women', render: row => row.activity['Adult Women']},
          {type: 'number', id: 'Adult Men', head: 'Adult Men', render: row => row.activity['Adult Men']},
          {type: 'number', id: 'Elderly Women', head: 'Elderly Women', render: row => row.activity['Elderly Women']},
          {type: 'number', id: 'Elderly Men', head: 'Elderly Men', render: row => row.activity['Elderly Men']},
          {type: 'number', id: 'People with Disability', head: 'People with Disability', render: row => row.activity['People with Disability']},
        ]}/>
      </Panel>
    </Page>
  )
}