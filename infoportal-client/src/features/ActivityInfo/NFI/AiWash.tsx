import {useAppSettings} from '@/core/context/ConfigContext'
import React, {useEffect, useState} from 'react'
import {Page} from '@/shared/Page'
import {map, seq, Seq} from '@alexandreannic/ts-utils'
import {mapWashRMM, WashRMM} from './aiWashInterface'
import {ActivityInfoActions, AiSendBtn} from '../shared/ActivityInfoActions'
import {format, subMonths} from 'date-fns'
import {useI18n} from '@/core/i18n'
import {AILocationHelper, Bn_OldMpcaNfi, Bn_Re, groupBy, KoboBnReHelper, NonNullableKeys, Person} from '@infoportal-common'
import {IpBtn} from '@/shared/Btn'
import {useIpToast} from '@/core/useToast'
import {Panel} from '@/shared/Panel'
import {IpInput} from '@/shared/Input/Input'
import {Sheet} from '@/shared/Sheet/Sheet'
import {KoboAnswerId} from '@/core/sdk/server/kobo/Kobo'
import {ActivityInfoSdk} from '@/core/sdk/server/activity-info/ActiviftyInfoSdk'
import {ActiviftyInfoRecords} from '@/core/sdk/server/activity-info/ActiviftyInfoType'
import {useFetcher} from '@/shared/hook/useFetcher'
import {useAsync} from '@/shared/hook/useAsync'

interface AiWashAnswer {
  id: KoboAnswerId
  start: Date
  oblast: keyof typeof Bn_OldMpcaNfi.options['oblast'] | undefined
  raion: keyof typeof Bn_OldMpcaNfi.options['raion'] | undefined
  hromada: keyof typeof Bn_OldMpcaNfi.options['hromada'] | undefined
  settlement: string,
  HKF_: NonNullable<Bn_OldMpcaNfi.T['HKF_']>
  HKMV_: NonNullable<Bn_OldMpcaNfi.T['HKMV_']>
  BK1: NonNullable<Bn_OldMpcaNfi.T['BK_Baby_Kit_']>
  BK2: NonNullable<Bn_OldMpcaNfi.T['BK_Baby_Kit']>
  BK3: NonNullable<Bn_OldMpcaNfi.T['BK_Baby_Kit_001']>
  BK4: NonNullable<Bn_OldMpcaNfi.T['BK_Baby_Kit_002']>
  persons: NonNullableKeys<Person.Person>[]
}


// export const getLocation = <K extends string>(loc: Record<K, string>, name: string, type: string, rows: any): K => {
//   if (name === 'Cnernivetskyi') {
//     name = 'Chernivetskyi'
//   }
//   const mapped = Enum.keys(loc).find(_ => _.includes(name))
//   if (!mapped) {
//     console.error(`Cannot find location ${type} ${name}`, rows)
//   }
//   return mapped!
// }

interface Row {
  rows: AiWashAnswer[],
  activity: WashRMM
  request: ActiviftyInfoRecords
}

const toFormData = ({
  answers,
  period,
  formId,
}: {
  formId: string
  answers: Seq<AiWashAnswer>
  period: string
}) => {
  const activities: Row[] = []
  let index = 0

  const pushActivity = (
    rows: AiWashAnswer[],
    a: Pick<WashRMM,
      'WASH - APM' |
      'Boys' |
      'Oblast' |
      'Raion' |
      'Hromada' |
      'Settlement' |
      'Girls' |
      'Men' |
      'Women' |
      'Elderly Women' |
      'Elderly Men' |
      'People with disability' |
      'Total Reached (No Disaggregation)'
    >,
  ) => {
    if (a['Total Reached (No Disaggregation)'] === 0) return
    index++
    const activity = Object.freeze({
      'Reporting Month': period,
      'Reporting Against a plan?': 'Yes',
      'Location Type': 'Individuals/households',
      'Population Group': 'Overall (all groups)',
      'Activities & Indicators': '# of individuals benefiting from hygiene kit/items distribution (in-kind)',
      'Breakdown known?': 'Yes',
      'Implementing Partner': 'Danish Refugee Council',
      Organisation: 'Danish Refugee Council',
      'Disaggregation by population group, gender and age known?': 'Yes',
      ...a,
    })
    activities.push({
      rows,
      activity,
      request: ActivityInfoSdk.makeRecordRequest({
        activity: mapWashRMM(activity),
        formId,
        activityYYYYMM: period.replace('-', ''),
        activityIdPrefix: 'drcnfi' + 'i',
        activityIndex: index
      })
    })
  }

  groupBy({
    data: answers,
    groups: [
      {by: _ => Bn_Re.options.ben_det_prev_oblast[_.oblast!] ?? _.oblast},
      {by: _ => Bn_Re.options.ben_det_raion[_.raion!] ?? _.raion},
      {by: _ => Bn_Re.options.ben_det_hromada[_.hromada!] ?? _.hromada},
      {by: _ => _.settlement},
    ],
    finalTransform: async (grouped, [enOblast, enRaion, enHromada, settlement]) => {
      const planBK = grouped.filter(_ => _.BK1 > 0 || _.BK2 > 0 || _.BK3 > 0 || _.BK4 > 0)
      const planHK = grouped.filter(_ => _.HKMV_ > 0 || _.HKF_ > 0)
      const planBKPersons = planBK.flatMap(_ => _.persons).filter(_ => _.age < 3)
      const planHKPersons = planHK.flatMap(_ => _.persons)
      const location = {
        Oblast: AILocationHelper.findOblast(enOblast) ?? '⚠️' + enOblast,
        Raion: AILocationHelper.findRaion(enOblast, enRaion)?._5w ?? '⚠️' + enRaion,
        Hromada: AILocationHelper.findHromada(enOblast, enRaion, enHromada)?._5w ?? '⚠️' + enHromada,
        Settlement: await AILocationHelper.findSettlement(enOblast, enRaion, enHromada, settlement).then(_ => _?._5w ?? '⚠️' + settlement),
      }
      const planHkGrouped = Person.groupByGenderAndGroup(Person.ageGroup.UNHCR)(planHKPersons)
      pushActivity(planBK, {
        ...location,
        'WASH - APM': 'DRC-00003',
        'Boys': planBKPersons.filter(_ => _.gender === 'Male').length,
        'Girls': planBKPersons.filter(_ => _.gender === 'Female').length,
        'Men': 0,
        'Women': 0,
        'Elderly Women': 0,
        'Elderly Men': 0,
        'People with disability': planBK.length,
        'Total Reached (No Disaggregation)': planBKPersons.length,
      })
      pushActivity(planHK, {
        ...location,
        'WASH - APM': 'DRC-00001',
        'Total Reached (No Disaggregation)': planHKPersons.length,
        'Boys': planHkGrouped['0 - 17'].Male,
        'Girls': planHkGrouped['0 - 17'].Female,
        'Men': planHkGrouped['18 - 59'].Male,
        'Women': planHkGrouped['18 - 59'].Female,
        'Elderly Men': planHkGrouped['60+'].Male,
        'Elderly Women': planHkGrouped['60+'].Female,
        'People with disability': planHK.length,
      })
    }
  })
  return activities
}

export const AiWash = () => {
  const {api} = useAppSettings()
  const [period, setPeriod] = useState(format(subMonths(new Date(), 1), 'yyyy-MM'))

  const _data = useFetcher((p) => {
    const [year, month] = p.split('-')
    const filters = (year === '2023' && month === '04') ? undefined : {
      start: new Date(parseInt(year), parseInt(month) - 1),
      end: new Date(parseInt(year), parseInt(month)),
    }
    return api.kobo.typedAnswers.searchBn_Re({filters})
      .then(_ => {
        return _.data.filter(_ => _.back_office === 'chj').map((_, i) => ({
          id: _.id,
          oblast: _.ben_det_oblast,
          raion: _.ben_det_raion,
          hromada: _.ben_det_hromada,
          settlement: _.ben_det_settlement,
          start: _.start,
          HKF_: _.nfi_dist_hkf ?? 0,
          HKMV_: _.nfi_dist_hkmv ?? 0,
          BK1: (_.nfi_dist_wkb1 ?? 0) + (_.nfi_dist_bk ?? 0),
          BK2: _.nfi_dist_wkb2 ?? 0,
          BK3: _.nfi_dist_wkb3 ?? 0,
          BK4: _.nfi_dist_wkb4 ?? 0,
          persons: Person.filterDefined(KoboBnReHelper.getPersons(_)),
        }))
      })
      .then(_ => toFormData({
        formId: 'crvtph7lg6d5dhq2',
        answers: seq(_),
        period,
      }))
  })

  useEffect(() => {
    _data.fetch({clean: false}, period)
  }, [period])

  return (
    <Page width={1200} loading={_data.loading}>
      <IpInput type="month" sx={{minWidth: 200, width: 200}} value={period} onChange={_ => setPeriod(_.target.value)}/>
      {map(_data.get, _ => (
        <_ActivityInfo data={_}/>
      ))}
    </Page>
  )
}

const _ActivityInfo = ({
  data,
  // period,
}: {
  data: Row[]
  // period: Date
}) => {
  const {toastHttpError} = useIpToast()
  const {formatDate} = useI18n()
  const {api} = useAppSettings()
  const {m} = useI18n()
  const _submit = useAsync((i: number, p: any) => api.activityInfo.submitActivity(p), {
    requestKey: ([i]) => i
  })
  return (
    <>
      <Panel>
        <Sheet<Row>
          getRenderRowKey={_ => _.request.changes[0].recordId}
          header={
            <IpBtn sx={{marginLeft: 'auto'}} icon="send" color="primary" variant="contained" loading={_submit.loading[-1]} onClick={() => {
              _submit.call(-1, data.map(_ => _.request)).catch(toastHttpError)
            }}>
              {m.submitAll} {seq(data).map(_ => _.activity['Total Reached (No Disaggregation)']).sum()}
            </IpBtn>
          }
          id="ai-nfi" data={data} columns={[
          {
            id: 'actions', head: '', width: 120, render: _ =>
              <>
                <AiSendBtn
                  loading={_submit.loading[-1]}
                  onClick={() => {
                    _submit.call(-1, [_.request]).catch(toastHttpError)
                  }}
                />
                <ActivityInfoActions
                  data={_.rows}
                  activity={_.activity}
                  requestBody={_.request}
                />
              </>
          },
          {id: 'wash', head: 'WASH - APM', render: _ => <>{_.activity['WASH - APM']}</>},
          {
            type: 'select_one', id: 'Oblast', head: 'Oblast',
            render: _ => <>{AILocationHelper.get5w(_.activity['Oblast'])}</>,
            renderValue: _ => AILocationHelper.get5w(_.activity['Oblast']),
          },
          {
            type: 'select_one', id: 'Raion', head: 'Raion',
            render: _ => <>{AILocationHelper.get5w(_.activity['Raion'])}</>,
            renderValue: _ => AILocationHelper.get5w(_.activity['Raion']),
          },
          {
            type: 'select_one', id: 'Hromada', head: 'Hromada',
            render: _ => <>{AILocationHelper.get5w(_.activity['Hromada'])}</>,
            renderValue: _ => AILocationHelper.get5w(_.activity['Hromada']),
          },
          {
            type: 'select_one', id: 'Settlement', head: 'Settlement',
            render: _ => <>{AILocationHelper.get5w(_.activity['Settlement'])}</>,
            renderValue: _ => AILocationHelper.get5w(_.activity['Settlement']),
          },
          {
            type: 'select_one', id: 'location', head: 'Location Type',
            render: _ => <>{_.activity['Location Type']}</>,
            renderValue: _ => _.activity['Location Type'],
          },
          {
            type: 'select_one', id: 'population', head: 'Population Group',
            render: _ => <>{_.activity['Population Group']}</>,
            renderValue: _ => _.activity['Population Group'],
          },
          {
            type: 'number', id: 'boys', head: 'Boys',
            render: _ => _.activity['Boys']
          },
          {
            type: 'number', id: 'girls', head: 'Girls',
            render: _ => _.activity['Girls']
          },
          {
            type: 'number', id: 'women', head: 'Women',
            render: _ => _.activity['Women']
          },
          {
            type: 'number', id: 'men', head: 'Men',
            render: _ => _.activity['Men']
          },
          {
            type: 'number', id: 'elderly w', head: 'Elderly Women',
            render: _ => _.activity['Elderly Women']
          },
          {
            type: 'number', id: 'elderly m', head: 'Elderly Men',
            render: _ => _.activity['Elderly Men']
          },
          {
            type: 'number', id: 'people', head: 'People with disability',
            render: _ => _.activity['People with disability']
          },
          {
            type: 'number', id: 'total', head: 'Total Reached (No Disaggregation)',
            render: _ => _.activity['Total Reached (No Disaggregation)']
          },
        ]}/>
      </Panel>
    </>
  )
}
