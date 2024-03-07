import {Page} from '@/shared/Page'
import React, {useEffect, useState} from 'react'
import {useAppSettings} from '@/core/context/ConfigContext'
import {endOfDay, endOfMonth, format, startOfMonth, subMonths} from 'date-fns'
import {add, AILocationHelper, groupBy, Person} from '@infoportal-common'
import {fnSwitch} from '@alexandreannic/ts-utils'
import {Sheet} from '@/shared/Sheet/Sheet'
import {AiMpcaInterface} from '@/features/ActivityInfo/Mpca/AiMpcaInterface'
import {Panel} from '@/shared/Panel'
import {useI18n} from '@/core/i18n'
import {AiPreviewActivity, AiPreviewRequest, AiSendBtn, AiViewAnswers} from '@/features/ActivityInfo/shared/ActivityInfoActions'
import {ActivityInfoSdk} from '@/core/sdk/server/activity-info/ActiviftyInfoSdk'
import {Box} from '@mui/material'
import {IpInput} from '@/shared/Input/Input'
import {IpBtn} from '@/shared/Btn'
import {useIpToast} from '@/core/useToast'
import {Txt} from 'mui-extension'
import {useAsync} from '@/shared/hook/useAsync'
import {AiBundle} from '@/features/ActivityInfo/shared/AiBundle'
import {useFetcher} from '@/shared/hook/useFetcher'
import {activitiesConfig} from '@/features/ActivityInfo/ActivityInfo'

type AiMpcaBundle = AiBundle<AiMpcaInterface.Type> & {
  // Properties not asked in the AI form
  oblast?: string
  raion?: string
}

export const AiMpca = () => {
  const {api, conf} = useAppSettings()
  const [period, setPeriod] = useState(format(subMonths(new Date(), 1), 'yyyy-MM'))
  const {formatLargeNumber, m} = useI18n()
  const {toastHttpError} = useIpToast()

  const _submit = useAsync((i: number, p: any) => api.activityInfo.submitActivity(p), {
    requestKey: ([i]) => i
  })

  const fetcher = useFetcher(async (period: string) => {
    const [year, month] = period.split('-')
    const filters = {
      start: startOfMonth(new Date(+year, +month - 1, 1)),
      end: endOfDay(endOfMonth(new Date(+year, +month - 1, 1))),
    }

    return api.mpca.search({filters}).then(res => {
      const mapped: AiMpcaBundle[] = []
      let i = 0
      // const mapped: (AiTypeMpcaRmm.Type & {
      //   oblast?: string,
      //   raion?: string
      // })[] = []
      groupBy({
        data: res.data.filter(_ => _.date.getTime() >= filters.start.getTime() && _.date.getTime() <= filters.end.getTime()),
        groups: [
          {by: (_) => _.oblast ?? ''},
          {by: (_, [oblast,]) => _.raion && AILocationHelper.findRaion(oblast, _.raion)?.en || ''},
          {by: (_, [oblast, raion]) => _.hromada && AILocationHelper.findHromada(oblast, raion, _.hromada)?.en || ''},
          {by: (_) => _.finalDonor ?? ''},
          {
            by: _ => fnSwitch(_.benefStatus!, {
              idp: 'IDPs',
              long_res: 'Non-Displaced',
              ret: 'Returnees',
              ref_asy: 'Returnees',
            }, () => 'Unknown')
          },
        ],
        finalTransform: (group, [oblast, raion, Hromada, donor, populationGroup]) => {
          const disag = Person.groupByGenderAndGroup(Person.ageGroup.UNHCR)(group.flatMap(_ => _.persons).compact())
          const activity: AiMpcaInterface.Type = {
            Hromada: AILocationHelper.findHromada(oblast, raion, Hromada)?._5w as any,
            'Population Group': populationGroup,
            'Amount of cash in USD distributed through multi-purpose cash assistance': Math.round(group.sum(_ => _.amountUahFinal ?? 0) * conf.uahToUsd),
            'Donor': fnSwitch(donor!, {
              UHF: 'Ukraine Humanitarian Fund (UHF)',
              NovoNordisk: 'Novo Nordisk (NN)',
              OKF: `Ole Kirk's Foundation (OKF)`,
              SDCS: `Swiss Agency for Development and Cooperation (SDC)`,
              BHA: `USAID's Bureau for Humanitarian Assistance (USAID/BHA)`,
              FINM: 'Ministry of Foreign Affairs - Finland (MFA Finland)',
              FCDO: 'Foreign, Commonwealth & Development Office (FCDO)',
              AugustinusFonden: 'Augustinus Foundation (Augustinus)',
              EUIC: `EU\'s Instrument contributing to Stability and Peace (IcSP)`,
              DUT: 'Dutch Relief Alliance (DutchRelief)',
              ECHO: 'European Commission Humanitarian Aid Department and Civil Protection (ECHO)',
              DANI: `Danish International Development Agency - Ministry of Foreign Affairs - Denmark (DANIDA)`,
            }, () => undefined) as any,
            Girls: disag['0 - 17']?.Female,
            Boys: disag['0 - 17']?.Male,
            'Adult Women': disag['18 - 59']?.Female,
            'Adult Men': disag['18 - 59']?.Male,
            'Elderly Women': disag['60+']?.Female,
            'Elderly Men': disag['60+']?.Male,
            'Partner Organization': 'Danish Refugee Council',
            'Reporting Month': period,
            'Total # of people assisted with multi-purpose cash assistance': add(
              disag['0 - 17']?.Female,
              disag['0 - 17']?.Male,
              disag['18 - 59']?.Female,
              disag['18 - 59']?.Male,
              disag['60+']?.Female,
              disag['60+']?.Male,
            ),
            Durations: 'Three months',
            'People with disability': 0,
          } as const
          mapped.push({
            data: group,
            oblast: oblast === '' ? undefined : oblast,
            raion,
            activity,
            requestBody: ActivityInfoSdk.makeRecordRequest({
              activityIdPrefix: 'drcmpca',
              activity: AiMpcaInterface.map(activity),
              activityYYYYMM: period.replace('-', '').replace(/^\d\d/, ''),
              activityIndex: i++,
              formId: activitiesConfig.mpca.id,
            })
          })
        },
      })
      return mapped
      // return mapped.map((_, i) => ({
      //   ..._,
      //   req: ActivityInfoSdk.makeRecordRequest({
      //     activityIdPrefix: 'drcmpca',
      //     activity: AiTypeMpcaRmm.map(_),
      //     activityYYYYMM: period.replace('-', '').replace(/^\d\d/, ''),
      //     activityIndex: i,
      //     formId: ActivityInfoSdk.formId.mpca,
      //   })
      // })
      // )
    })
  })

  useEffect(() => {
    fetcher.fetch({}, period)
  }, [period])

  return (
    <Page width="full">
      <Panel>
        <Sheet
          id="ai-mpca"
          header={
            <Box sx={{display: 'flex', alignItems: 'center', flex: 1,}}>
              <IpInput helperText={null} sx={{width: 200}} type="month" value={period} onChange={e => setPeriod(e.target.value)}/>
              <Txt color="hint" sx={{ml: 1}}>
                USD to UAH: <b>{conf.uahToUsd}</b>
              </Txt>
              <IpBtn icon="send" variant="contained" loading={_submit.anyLoading} sx={{ml: 'auto'}} onClick={() => {
                if (!fetcher.get) return
                _submit.call(-1, fetcher.get.filter(_ => !!_.activity.Hromada).map((_, i) => _.requestBody)).catch(toastHttpError)
              }}>
                {m.submitAll}
              </IpBtn>
            </Box>
          }
          loading={fetcher.loading}
          data={fetcher.get}
          columns={[
            {
              width: 130,
              id: 'actions',
              render: (_: AiMpcaBundle) => {
                return (
                  <>
                    <AiSendBtn disabled={!_.activity.Hromada} onClick={() =>
                      _submit.call(_.requestBody.changes[0].recordId as any, [_.requestBody])
                    }/>
                    <AiViewAnswers answers={_.data}/>
                    <AiPreviewActivity activity={_.activity}/>
                    <AiPreviewRequest request={_.requestBody}/>
                  </>
                )
              }
            },
            {
              id: 'id',
              type: 'string',
              head: 'Record ID',
              render: _ => _.requestBody.changes[0].recordId,
            },
            {head: 'oblast', id: 'oblast', type: 'string', render: _ => _.oblast},
            {head: 'raion', id: 'raion', type: 'string', render: _ => _.raion},
            {head: 'Hromada', id: 'Hromada', type: 'string', render: _ => _.activity.Hromada},
            {head: 'Partner Organization', id: 'Partner Organization', type: 'string', render: _ => _.activity['Partner Organization']},
            {head: 'Population Group', id: 'Population Group', type: 'string', render: _ => _.activity['Population Group']},
            {
              head: 'Amount (USD)',
              id: 'Amount USD',
              type: 'number',
              renderValue: _ => _.activity['Amount of cash in USD distributed through multi-purpose cash assistance'],
              render: _ => formatLargeNumber(_.activity['Amount of cash in USD distributed through multi-purpose cash assistance'], {maximumFractionDigits: 0})
            },
            {width: 0, head: 'Durations', id: 'Durations', type: 'number', render: _ => _.activity['Durations']},
            {width: 0, head: 'Total', id: 'Total', type: 'number', render: _ => formatLargeNumber(_.activity['Total # of people assisted with multi-purpose cash assistance'])},
            {width: 0, head: 'Adult Men', id: 'Adult Men', type: 'number', render: _ => formatLargeNumber(_.activity['Adult Men'])},
            {width: 0, head: 'Adult Women', id: 'Adult Women', type: 'number', render: _ => formatLargeNumber(_.activity['Adult Women'])},
            {width: 0, head: 'Elderly Men', id: 'Elderly Men', type: 'number', render: _ => formatLargeNumber(_.activity['Elderly Men'])},
            {width: 0, head: 'Elderly Women', id: 'Elderly Women', type: 'number', render: _ => formatLargeNumber(_.activity['Elderly Women'])},
            {width: 0, head: 'Boys', id: 'Boys', type: 'number', render: _ => formatLargeNumber(_.activity['Boys'])},
            {width: 0, head: 'Girls', id: 'Girls', type: 'number', render: _ => formatLargeNumber(_.activity['Girls'])},
            {width: 0, head: 'People with disability', id: 'People with disability', type: 'number', render: _ => formatLargeNumber(_.activity['People with disability'])},
          ]}
        />
      </Panel>
    </Page>
  )
}