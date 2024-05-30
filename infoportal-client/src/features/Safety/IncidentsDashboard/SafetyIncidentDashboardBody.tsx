import {Enum, fnSwitch, map, Obj, Seq} from '@alexandreannic/ts-utils'
import {useI18n} from '@/core/i18n'
import {Div, SlidePanel, SlideWidget} from '@/shared/PdfLayout/PdfSlide'
import {UaMapBy} from '../../DrcUaMap/UaMapBy'
import {Lazy} from '@/shared/Lazy'
import {differenceInDays, format, subDays} from 'date-fns'
import {ChartLine} from '@/shared/charts/ChartLine'
import {ScRadioGroup, ScRadioGroupItem} from '@/shared/RadioGroup'
import {ChartPieWidgetBy} from '@/shared/charts/ChartPieWidgetBy'
import {useSession} from '@/core/Session/SessionContext'
import {MinusRusChartPanel} from '@/features/Safety/IncidentsDashboard/MinusRusChartPanel'
import {CommentsPanel, CommentsPanelProps} from '@/shared/CommentsPanel'
import {ChartBarMultipleBy} from '@/shared/charts/ChartBarMultipleBy'
import {Period, PeriodHelper, Safety_incident} from '@infoportal-common'
import {useMemo, useState} from 'react'
import {InferTypedAnswer} from '@/core/sdk/server/kobo/KoboTypedAnswerSdk'
import {SafetyIncidentDashboardAlert} from '@/features/Safety/IncidentsDashboard/SafetyIncidentDashboardAlert'
import {Panel, PanelBody, PanelHead, PanelTitle} from '@/shared/Panel'
import {Divider} from '@mui/material'
import {IpSelectMultiple, IpSelectMultipleHelper} from '@/shared/Select/SelectMultiple'
import {protectionDashboardMonitoPreviousPeriodDeltaDays} from '@/features/Protection/DashboardMonito/useProtectionDashboardMonitoData'

export const SafetyIncidentDashboardBody = ({
  period,
  data: {
    data,
    dataAlertFiltered,
    dataAlert,
    dataIncident,
    dataIncidentFiltered,
  }
}: {
  period: Partial<Period>
  data: {
    data: Seq<InferTypedAnswer<'safety_incident'>>
    dataAlert: Seq<InferTypedAnswer<'safety_incident'>>
    dataAlertFiltered: Seq<InferTypedAnswer<'safety_incident'>>
    dataIncident: Seq<InferTypedAnswer<'safety_incident'>>
    dataIncidentFiltered: Seq<InferTypedAnswer<'safety_incident'>>
  }
}) => {
  const {m, formatLargeNumber} = useI18n()
  const [mapType, setMapType] = useState<'incident' | 'attack'>('incident')
  const {session} = useSession()
  const [filterAttack, setFilterAttack] = useState<string[]>([])

  const filteredData = useMemo(() => {
    return dataIncidentFiltered.filter(_ => filterAttack.length === 0 || _.attack_type?.find(x => filterAttack.includes(x)))
  }, [dataIncidentFiltered, filterAttack])

  const dataIncidentFilteredLastPeriod = useMemo(() => map(period.start, period.end, (start, end) => {
    const lastPeriod = {
      start: start,
      end: subDays(end, protectionDashboardMonitoPreviousPeriodDeltaDays)
    }
    if (differenceInDays(end, start) <= protectionDashboardMonitoPreviousPeriodDeltaDays) return
    return filteredData.filter(_ => PeriodHelper.isDateIn(lastPeriod, _.date))
  }), [dataIncident])

  return (
    <Div sx={{alignItems: 'flex-start'}} responsive>
      <Div column>
        <Panel>
          <PanelHead action={
            <IpSelectMultiple
              sx={{minWidth: 140}}
              label={m.safety.attackTypes}
              value={filterAttack}
              onChange={setFilterAttack}
              options={Obj.entries(Safety_incident.options.attack_type).map(([k, v]) => IpSelectMultipleHelper.makeOption({value: k, children: v}))}
            />
          }>
            {m.safety.incidents + ` (${formatLargeNumber(dataIncidentFiltered.length)})`}
          </PanelHead>
          <Div sx={{alignItems: 'stretch'}}>
          </Div>
          <PanelBody>
            <ChartPieWidgetBy
              title={m.safety.attacks}
              filter={_ => _.attack === 'yes'}
              showValue
              compare={dataIncidentFilteredLastPeriod ? {before: dataIncidentFilteredLastPeriod} : undefined}
              filterBase={_ => _.attack !== undefined}
              data={filteredData}
            />
          </PanelBody>
          <Divider/>
          <PanelBody>
            <ScRadioGroup value={mapType} onChange={setMapType} dense inline sx={{mb: 2}}>
              <ScRadioGroupItem dense hideRadio value="incident" title={m.safety.incidents}/>
              <ScRadioGroupItem dense hideRadio value="attack" title={m.safety.attacks}/>
            </ScRadioGroup>
            {fnSwitch(mapType, {
              'incident': (
                <UaMapBy
                  sx={{maxWidth: 480}}
                  fillBaseOn="value"
                  data={filteredData}
                  getOblast={_ => _.oblastISO!}
                  value={_ => true}
                  base={_ => _.oblastISO !== undefined}
                />
              ),
              'attack': (
                <UaMapBy
                  sx={{maxWidth: 480}}
                  fillBaseOn="value"
                  data={filteredData}
                  getOblast={_ => _.oblastISO}
                  value={_ => _.attack === 'yes'}
                  base={_ => _.oblastISO !== undefined}
                />
              ),
            })}
          </PanelBody>
          <Divider/>
          <PanelBody>
            <PanelTitle sx={{mb: 1}}>{m.safety.attackTypes}</PanelTitle>
            <ChartBarMultipleBy
              data={filteredData}
              by={_ => _.attack_type}
              label={Safety_incident.options.attack_type}
            />
          </PanelBody>
          <Divider/>
          <PanelBody>
            <PanelTitle sx={{mb: 1}}>{m.safety.target}</PanelTitle>
            <ChartBarMultipleBy
              data={filteredData}
              by={_ => _.what_destroyed}
              label={Safety_incident.options.what_destroyed}
            />
          </PanelBody>
          <Divider/>
          <PanelBody>
            <PanelTitle sx={{mb: 1}}>{m.safety.typeOfCasualties}</PanelTitle>
            <ChartBarMultipleBy
              data={filteredData}
              by={_ => _.type_casualties}
              label={Safety_incident.options.type_casualties}
            />
          </PanelBody>
          <Divider/>
          <PanelBody>
            <PanelTitle sx={{mb: 1}}>{m.safety.lastAttacks}</PanelTitle>
            <Lazy deps={[filteredData]} fn={() => filteredData?.filter(_ => _.attack === 'yes').map(_ => ({
              id: _.id,
              title: m.safety.attackOfOn(_.oblastISO, _.attack_type),
              date: _.date_time,
              desc: _.report_summary,
            }) as CommentsPanelProps['data'][0])}>
              {_ => <CommentsPanel pageSize={10} data={_}/>}
            </Lazy>
          </PanelBody>
        </Panel>
      </Div>
      <Div column>
        <SafetyIncidentDashboardAlert data={{
          data,
          dataAlert: dataAlertFiltered,
        }}/>
        <SlidePanel title={m.safety.casualties}>
          <Div sx={{mt: -2}}>
            <Lazy deps={[filteredData]} fn={() => filteredData?.sum(_ => _.dead ?? 0)}>
              {_ => (
                <SlideWidget sx={{minHeight: 'auto', flex: 1}} title={m.safety.dead}>
                  {formatLargeNumber(_)}
                </SlideWidget>
              )}
            </Lazy>
            <Lazy deps={[filteredData]} fn={() => filteredData?.sum(_ => _.injured ?? 0)}>
              {_ => (
                <SlideWidget sx={{minHeight: 'auto', flex: 1}} title={m.safety.injured}>
                  {formatLargeNumber(_)}
                </SlideWidget>
              )}
            </Lazy>
          </Div>
          <Lazy deps={[filteredData]} fn={() => {
            const x = filteredData?.groupBy(_ => _.date_time ? format(_.date_time, 'yyyy-MM') : 'no_date')
            return new Enum(x)
              .transform((k, v) => [k, {
                total: v.length,
                dead: v.sum(_ => _.dead ?? 0),
                injured: v.sum(_ => _.injured ?? 0),
              }])
              .sort(([bk], [ak]) => bk.localeCompare(ak))
              .entries()
              .filter(([k]) => k !== 'no_date')
              .map(([k, v]) => ({name: k, ...v}))
          }}>
            {_ => (
              <ChartLine height={200} data={_ as any} translation={{
                total: m.safety.incidents,
                dead: m.safety.dead,
                injured: m.safety.injured,
              } as any}/>
            )}
          </Lazy>
        </SlidePanel>
        {(session?.admin || session?.drcJob === 'Head of Safety') && (
          <MinusRusChartPanel/>
        )}
      </Div>
    </Div>
  )
}
