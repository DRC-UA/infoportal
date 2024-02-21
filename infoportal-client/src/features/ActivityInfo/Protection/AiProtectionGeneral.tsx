import {Page} from '@/shared/Page'
import React, {useEffect, useMemo, useState} from 'react'
import {useAppSettings} from '@/core/context/ConfigContext'
import {format, subMonths} from 'date-fns'
import {Sheet} from '@/shared/Sheet/Sheet'
import {Panel} from '@/shared/Panel'
import {useI18n} from '@/core/i18n'
import {AiPreviewActivity, AiPreviewRequest, AiSendBtn, AiViewAnswers} from '@/features/ActivityInfo/shared/ActivityInfoActions'
import {Box} from '@mui/material'
import {IpInput} from '@/shared/Input/Input'
import {IpBtn} from '@/shared/Btn'
import {useIpToast} from '@/core/useToast'
import {ActivityInfoProtectionMapper} from '@/features/ActivityInfo/Protection/aiProtectionGeneralMapper'
import {groupBy, PeriodHelper} from '@infoportal-common'
import {Enum, seq} from '@alexandreannic/ts-utils'
import {AiTypeProtectionRmm} from '@/features/ActivityInfo/Protection/aiProtectionGeneralInterface'
import {SheetUtils} from '@/shared/Sheet/util/sheetUtils'
import {AiBundle} from '@/features/ActivityInfo/shared/AiType'
import {useAsync} from '@/shared/hook/useAsync'
import {useFetcher} from '@/shared/hook/useFetcher'

type AiProtectionGeneralBundle = AiBundle<AiTypeProtectionRmm.FormParams>

export const AiProtectionGeneral = () => {
  const {api, conf} = useAppSettings()
  const [period, setPeriod] = useState(format(subMonths(new Date(), 1), 'yyyy-MM'))
  const {formatLargeNumber, m} = useI18n()
  const {toastHttpError} = useIpToast()

  const _submit = useAsync((id: string, p: any) => api.activityInfo.submitActivity(p), {
    requestKey: ([i]) => i
  })

  const fetcher = useFetcher(async (period: string) => {
    const [year, month] = period.split('-')
    const filters = PeriodHelper.fromYYYYMM(period)
    const mappedData = await Promise.all([
      // searchProtection_pss
      api.kobo.typedAnswers.searchProtection_groupSession({filters}).then(ActivityInfoProtectionMapper.mapGroupSession(period)),
      api.kobo.typedAnswers.searchProtection_communityMonitoring({filters}).then(ActivityInfoProtectionMapper.mapCommunityMonitoring(period)),
      api.kobo.typedAnswers.searchProtection_hhs3({filters}).then(ActivityInfoProtectionMapper.mapHhs(period)),
    ]).then(_ => _.reduce((acc, curr) => [...acc, ...curr], []))
      .then(_ => _.filter(_ => {
        const hasAlreadyBeenSubmittedManually = period === '2023-09'
          && _.Oblast === 'Dnipropetrovska_Дніпропетровська'
          && (
            _['Protection Indicators'] === '# of key informants reached through community level protection monitoring' ||
            _['Protection Indicators'] === '# of persons who participated in awareness raising activities - GP'
          )
        return !hasAlreadyBeenSubmittedManually
      }))

    // const form: (AiProtectionGeneralType.Data & {
    //   answer: any[]
    // })[] = []
    const form: AiProtectionGeneralBundle[] = []
    let i = 0
    groupBy({
      data: mappedData,
      groups: [
        {by: _ => _.Oblast ?? ''},
        {by: _ => _.Raion ?? ''},
        {by: _ => _.Hromada ?? ''},
        {by: _ => _['Plan Code'] ?? ''},
        // {by: _ => _['Population Group']},
        // {by: _ => _['Protection Indicators']},
      ],
      finalTransform: (grouped, [Oblast, Raion, Hromada, PlanCode]) => {
        // form.push({
        //   answer: group,
        //   Oblast,
        //   Raion,
        //   Hromada,
        //   'Plan Code': PlanCode,
        //   'Population Group': populationGroup,
        //   'Reporting Month': period,
        //   'Protection Indicators': indicator,
        //   'Adult Men': group.sum(_ => _['Adult Men']),
        //   'Adult Women': group.sum(_ => _['Adult Women']),
        //   'Boys': group.sum(_ => _['Boys']),
        //   'Girls': group.sum(_ => _['Girls']),
        //   'Elderly Women': group.sum(_ => _['Elderly Women']),
        //   'Elderly Men': group.sum(_ => _['Elderly Men']),
        //   'Total Individuals Reached': group.sum(_ => _['Total Individuals Reached']),
        // })
        const activity = {
          Oblast,
          Raion,
          Hromada,
          'Plan Code': PlanCode,
          subActivities: Enum.entries(grouped.groupBy(_ => _['Protection Indicators'])).flatMap(([indicator, byIndicator]) => {
            return Enum.entries(byIndicator.groupBy(_ => _['Population Group'])).map(([group, v]) => {
              return {
                'Protection Indicators': indicator,
                'Population Group': group,
                'Reporting Month': period,
                'Adult Men': v.sum(_ => _['Adult Men']),
                'Adult Women': v.sum(_ => _['Adult Women']),
                'Boys': v.sum(_ => _['Boys']),
                'Girls': v.sum(_ => _['Girls']),
                'Elderly Women': v.sum(_ => _['Elderly Women']),
                'Elderly Men': v.sum(_ => _['Elderly Men']),
                'Total Individuals Reached': v.sum(_ => _['Total Individuals Reached']),
              }
            })
          })
        }
        form.push({
          activity: activity,
          requestBody: AiTypeProtectionRmm.makeForm(activity, period, i++),
          data: grouped.map(_ => _.answer),
        })
      },
    })
    return form
    // return mapped.map((_, i) => ({
    //   ..._,
    //   req: ActivityInfoSdk.makeRequest({
    //     activityIdPrefix: 'drcmpca',
    //     activity: AiTypeMpcaRmm.map(_),
    //     activityIndex: i,
    //     formId: ActivityInfoSdk.formId.mpca,
    //   })
    // }))
  })

  useEffect(() => {
    fetcher.fetch({}, period)
  }, [period])

  const flatData = useMemo(() => fetcher.get?.flatMap(d => {
    return d.activity.subActivities.map(a => {
      return {
        id: d.requestBody.changes[0].recordId,
        Oblast: d.activity.Oblast,
        Raion: d.activity.Raion,
        Hromada: d.activity.Hromada,
        'Plan Code': d.activity['Plan Code'],
        ...a,
      }
    })
  }), [fetcher.get])

  const indexActivity = useMemo(() => {
    const gb = seq(fetcher.get)?.groupBy(_ => _.requestBody.changes[0].recordId)
    return new Enum(gb).transform((k, v) => {
      if (v.length !== 1) throw new Error('Should contains 1 request by ID.')
      return [k, v[0]]
    }).get()
  }, [fetcher.get])

  return (
    <Page width="full">
      <Panel>
        <Sheet
          showExportBtn
          id="ai-prot"
          header={
            <Box sx={{display: 'flex', alignItems: 'center', flex: 1,}}>
              <IpInput helperText={null} sx={{width: 200}} type="month" value={period} onChange={e => setPeriod(e.target.value)}/>
              <IpBtn icon="send" variant="contained" sx={{ml: 'auto'}} onClick={() => {
                if (!fetcher.get) return
                _submit.call('all', fetcher.get.map(_ => _.requestBody)).catch(toastHttpError)
              }}>
                {m.submitAll}
              </IpBtn>
            </Box>
          }
          loading={fetcher.loading}
          data={flatData}
          columns={[
            {
              width: 120,
              id: 'actions',
              renderExport: false,
              render: _ => {
                return (
                  <>
                    <AiSendBtn
                      disabled={!_.Hromada}
                      onClick={() => {
                        _submit.call(_.id, [indexActivity[_.id]!.requestBody]).catch(toastHttpError)
                      }}
                    />
                    <AiViewAnswers answers={indexActivity[_.id]!.data}/>
                    <AiPreviewActivity activity={indexActivity[_.id]!.activity}/>
                    <AiPreviewRequest request={indexActivity[_.id]!.requestBody}/>
                  </>
                )
              }
            },
            {
              id: 'id',
              type: 'string',
              head: 'ActivityInfo ID',
              render: _ => _.id,
            },
            {head: 'Oblast', id: 'Oblast', type: 'select_one', render: _ => _.Oblast},
            {head: 'Raion', id: 'Raion', type: 'select_one', render: _ => _.Raion},
            {head: 'Hromada', id: 'Hromada', type: 'select_one', render: _ => _.Hromada},
            {head: 'Plan Code', id: 'Plan Code', type: 'string', render: _ => _['Plan Code']},
            {head: 'Population Group', id: 'Population Group', type: 'string', render: _ => _['Population Group']},
            {
              head: 'Protection Indicators',
              id: 'Protection Indicators',
              options: () => seq(flatData).map(_ => _['Protection Indicators']).distinct(_ => _).map(SheetUtils.buildOption),
              type: 'select_one',
              render: _ => _['Protection Indicators'],
            },
            {width: 0, head: 'Adult Men', id: 'Adult Men', type: 'number', render: _ => formatLargeNumber(_['Adult Men'])},
            {width: 0, head: 'Adult Women', id: 'Adult Women', type: 'number', render: _ => formatLargeNumber(_['Adult Women'])},
            {width: 0, head: 'Elderly Men', id: 'Elderly Men', type: 'number', render: _ => formatLargeNumber(_['Elderly Men'])},
            {width: 0, head: 'Elderly Women', id: 'Elderly Women', type: 'number', render: _ => formatLargeNumber(_['Elderly Women'])},
            {width: 0, head: 'Boys', id: 'Boys', type: 'number', render: _ => formatLargeNumber(_['Boys'])},
            {width: 0, head: 'Girls', id: 'Girls', type: 'number', render: _ => formatLargeNumber(_['Girls'])},
            {width: 0, head: 'Total Individuals Reached', id: 'Total Individuals Reached', type: 'number', render: _ => formatLargeNumber(_['Total Individuals Reached'])},
          ]}
        />
      </Panel>
    </Page>
  )
}