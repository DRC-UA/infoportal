import type {FC} from 'react'
import {match, seq} from '@axanc/ts-utils'
import {endOfMonth, format} from 'date-fns'
import {enUS, uk} from 'date-fns/locale'
import {UaLocation} from 'ua-location'

import {capitalize, DrcSector} from 'infoportal-common'

import {useI18n} from '@/core/i18n'
import {ALERT} from '@/shared/constants'
import {Datatable} from '@/shared/Datatable/Datatable'
import {DatatableHeadIconByType} from '@/shared/Datatable/DatatableHead'
import {Page} from '@/shared/Page'
import {Panel} from '@/shared/Panel'
import {PeriodPicker} from '@/shared/PeriodPicker/PeriodPicker'

import {useInterimReport} from './hooks'

const formatMonthString = (date: Date): string => {
  const monthEn = format(date, 'MMM', {locale: enUS})
  const monthUk = capitalize(format(date, 'LLLL', {locale: uk}))
  const year = format(date, 'yyyy')
  return `${monthEn} / ${monthUk} ${year}`
}

const InterimReport: FC = () => {
  const {data, loading, period, setPeriod} = useInterimReport()
  const {m} = useI18n()

  return (
    <Page width="full" loading={loading}>
      <Panel>
        <Datatable
          id="interim-reports-ocha"
          showExportBtn
          header={
            <PeriodPicker
              value={[period.start, period.end]}
              onChange={([start, end]) => setPeriod({start, end})}
              fullWidth={false}
              max={endOfMonth(new Date())}
              sx={{mr: 'auto'}}
            />
          }
          columns={[
            {
              id: 'ids',
              head: m.koboId,
              type: 'string',
              typeIcon: <DatatableHeadIconByType type="id" />,
              className: 'td-id',
              noCsvExport: true,
              renderQuick: ({ids}) => Array.from(ids).join(' '),
            },
            {
              id: 'partner_reporting',
              head: m.reportingPartner,
              type: 'string',
              renderQuick: () => 'Danish Refugee Council (DRC)',
            },
            {
              id: 'sector',
              head: m.sector,
              type: 'select_one',
              render: ({sector}) => ({
                value: sector,
                label: match(sector)
                  .cases({
                    [DrcSector.MPCA]: 'Cash Working Group (CW) Грошова допомога',
                    [DrcSector.GeneralProtection]: 'Protection (PR) Захист',
                    [DrcSector.PSS]: 'Protection (PR) Захист',
                    [DrcSector.Legal]: 'Protection (PR) Захист',
                    [DrcSector.ChildProtection]: 'Child Protection (CP) Захист дітей',
                    [DrcSector.GBV]: 'Gender Based Violence (GB) Гендерно зумовлене насильство',
                    [DrcSector.Shelter]: 'Shelter & Non-Food Items (SN) Житло та непродовольчі товари',
                    [DrcSector.WaSH]: 'Water, Sanitation and Hygiene (WA) Вода, санітарія та гігієна',
                    [DrcSector.NFI]: 'Water, Sanitation and Hygiene (WA) Вода, санітарія та гігієна',
                    [DrcSector.Education]: 'Education (ED) Освіта',
                    [DrcSector.Health]: 'Health (HE) Охорона здоров’я',
                  })
                  .default(`${ALERT} Missing sector ${sector}`),
              }),
            },
            {
              id: 'adm1',
              head: m.oblast,
              type: 'select_one',
              options: () => {
                return seq(data)
                  .flatMap(({oblast}) => oblast)
                  .distinct((oblast) => oblast)
                  .compact()
                  .map((oblast) => ({
                    value: oblast,
                    label: UaLocation.Oblast.findByName(oblast)._5w ?? `${ALERT} can't find oblast "${oblast}"`,
                  }))
              },
              render: ({oblast}) => ({
                value: oblast,
                label: UaLocation.Oblast.findByName(oblast)._5w ?? `${ALERT} can't find oblast "${oblast}"`,
              }),
            },
            {
              id: 'adm2',
              head: m.raion,
              type: 'select_one',
              options: () => {
                return seq(data)
                  .flatMap(({raion}) => raion)
                  .distinct((raion) => raion)
                  .compact()
                  .map((raion) => ({
                    value: raion,
                    label: UaLocation.Raion.findByName(raion)?._5w ?? `${ALERT} can't find raion "${raion}"`,
                  }))
              },
              render: ({raion}) => ({
                value: raion,
                label: raion
                  ? (UaLocation.Raion.findByName(raion)?._5w ?? `${ALERT} can't find raion "${raion}"`)
                  : `${ALERT} no raion provided`,
              }),
            },
            {
              id: 'adm3',
              head: m.hromada,
              type: 'select_one',
              options: () => {
                return seq(data)
                  .flatMap(({hromada}) => hromada)
                  .distinct((hromada) => hromada)
                  .compact()
                  .map((hromada) => ({
                    value: hromada,
                    label: UaLocation.Hromada.findByName(hromada)?._5w ?? `${ALERT} can't find hromada "${hromada}"`,
                  }))
              },
              render: ({hromada: inputHromada}) => {
                const hromada = inputHromada === 'Kyivska' ? 'Kyiv' : inputHromada

                return {
                  value: hromada,
                  label: hromada
                    ? (UaLocation.Hromada.findByName(hromada)?._5w ?? `${ALERT} can't find hromada "${hromada}"`)
                    : `${ALERT} no hromada provided`,
                }
              },
            },
            {
              id: 'month',
              head: m.month,
              type: 'string',
              renderQuick: () =>
                period.start &&
                period.end &&
                period.start.getMonth() === period.end.getMonth() &&
                period.start.getFullYear() === period.end.getFullYear()
                  ? formatMonthString(period.start)
                  : `${ALERT} please select monthly range`,
            },
            {
              id: 'reached_idp',
              head: m.idp,
              type: 'number',
              renderQuick: ({idp}) => idp,
            },
            {
              id: 'reached_ndp',
              head: m.nonDisplaced,
              type: 'number',
              renderQuick: ({ndp}) => ndp,
            },
          ]}
          data={data}
        />
      </Panel>
    </Page>
  )
}

export default InterimReport
