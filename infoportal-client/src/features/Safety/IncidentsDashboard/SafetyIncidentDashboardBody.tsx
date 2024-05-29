import {Enum, fnSwitch} from '@alexandreannic/ts-utils'
import {useI18n} from '@/core/i18n'
import {Div, SlidePanel, SlideWidget} from '@/shared/PdfLayout/PdfSlide'
import {UaMapBy} from '../../DrcUaMap/UaMapBy'
import {Lazy} from '@/shared/Lazy'
import {format} from 'date-fns'
import {ChartLine} from '@/shared/charts/ChartLine'
import {ScRadioGroup, ScRadioGroupItem} from '@/shared/RadioGroup'
import {ChartPieWidgetBy} from '@/shared/charts/ChartPieWidgetBy'
import {useSession} from '@/core/Session/SessionContext'
import {DashboardSafetyIncidentsPageProps} from '@/features/Safety/IncidentsDashboard/SafetyIncidentDashboard'
import {MinusRusChartPanel} from '@/features/Safety/IncidentsDashboard/MinusRusChartPanel'
import {CommentsPanel, CommentsPanelProps} from '@/shared/CommentsPanel'
import {ChartBarMultipleBy} from '@/shared/charts/ChartBarMultipleBy'
import {Safety_incidentTracker} from '@infoportal-common'
import {Theme} from '@mui/material'
import {useMemo, useState} from 'react'

const colors = (t: Theme) => ({
  blue: '#5249CD',
  yellow: '#F2E866',
  red: '#C62222',
})

export const SafetyIncidentDashboardBody = ({
  data,
  computed
}: {
  data: DashboardSafetyIncidentsPageProps['data']
  computed: DashboardSafetyIncidentsPageProps['computed']
}) => {
  const {m, formatLargeNumber} = useI18n()
  const [mapType, setMapType] = useState<'incident' | 'attack' | 'alerts'>('incident')
  const {session} = useSession()
  const totalAlerts = useMemo(() => {
    return data?.sum(_ => (_.alert_blue_num ?? 0) + (_.alert_yellow_num ?? 0) + (_.alert_red_num ?? 0)) ?? 0
  }, [data])
  return (
    <Div sx={{alignItems: 'flex-start'}} responsive>
      <Div column>
        <Div sx={{alignItems: 'stretch'}}>
          <SlideWidget sx={{flex: 1}} icon="report" title={m.safety.incidents}>
            {formatLargeNumber(data.length)}
          </SlideWidget>
          <SlidePanel BodyProps={{sx: {p: '0px !important'}}} sx={{flex: 1, m: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <ChartPieWidgetBy
              title={m.safety.attacks}
              filter={_ => _.attack === 'yes'}
              showValue
              compare={{before: computed.lastMonth}}
              filterBase={_ => _.attack !== undefined}
              data={data}
            />
          </SlidePanel>
        </Div>
        <SlidePanel>
          <ScRadioGroup value={mapType} onChange={setMapType} dense inline sx={{mb: 2}}>
            <ScRadioGroupItem dense hideRadio value="incident" title={m.safety.incidents}/>
            <ScRadioGroupItem dense hideRadio value="attack" title={m.safety.attacks}/>
            <ScRadioGroupItem dense hideRadio value="alerts" title={m.safety.alerts}/>
          </ScRadioGroup>
          {fnSwitch(mapType, {
            'incident': (
              <UaMapBy
                sx={{mx: 3}}
                fillBaseOn="value"
                data={data}
                getOblast={_ => _.oblastISO!}
                value={_ => true}
                base={_ => _.oblastISO !== undefined}
              />
            ),
            'attack': (
              <UaMapBy
                sx={{mx: 3}}
                fillBaseOn="value"
                data={data}
                getOblast={_ => _.oblastISO}
                value={_ => _.attack === 'yes'}
                base={_ => _.oblastISO !== undefined}
              />
            ),
            'alerts': (
              <UaMapBy
                sx={{mx: 3}}
                fillBaseOn="value"
                data={data}
                getOblast={(_) => _.oblastISO}
                value={(_) => totalAlerts > 0}
              />
            ),
          })}
        </SlidePanel>
        <SlidePanel title={m.safety.attackTypes}>
          <ChartBarMultipleBy
            data={data}
            by={_ => _.attack_type}
            label={Safety_incidentTracker.options.attack_type}
          />
        </SlidePanel>
        <SlidePanel title={m.safety.target}>
          <ChartBarMultipleBy
            data={data}
            by={_ => _.what_destroyed}
            label={Safety_incidentTracker.options.what_destroyed}
          />
        </SlidePanel>
        <SlidePanel title={m.safety.typeOfCasualties}>
          <ChartBarMultipleBy
            data={data}
            by={_ => _.type_casualties}
            label={Safety_incidentTracker.options.type_casualties}
          />
        </SlidePanel>
      </Div>
      <Div column>
        <Div sx={{alignItems: 'stretch'}}>
          <SlideWidget sx={{flex: 1}} title={m.safety.alerts}>
            {formatLargeNumber(totalAlerts)}
          </SlideWidget>
          <Lazy deps={[data]} fn={() => data?.sum(_ => _.dead ?? 0)}>
            {_ => (
              <SlideWidget sx={{flex: 1}} title={m.safety.dead}>
                {formatLargeNumber(_)}
              </SlideWidget>
            )}
          </Lazy>
          <Lazy deps={[data]} fn={() => data?.sum(_ => _.injured ?? 0)}>
            {_ => (
              <SlideWidget sx={{flex: 1}} title={m.safety.injured}>
                {formatLargeNumber(_)}
              </SlideWidget>
            )}
          </Lazy>
        </Div>
        <SlidePanel>
          <Lazy deps={[data]} fn={() => {
            const x = data?.groupBy(_ => _.date_time ? format(_.date_time, 'yyyy-MM') : 'no_date')
            return new Enum(x)
              .transform((k, v) => [k, {
                blue: v.sum(_ => +(_.alert_blue_num ?? 0)),
                yellow: v.sum(_ => +(_.alert_yellow_num ?? 0)),
                red: v.sum(_ => +(_.alert_red_num ?? 0)),
              }])
              .sort(([bk], [ak]) => bk.localeCompare(ak))
              .entries()
              .filter(([k]) => k !== 'no_date')
              .map(([k, v]) => ({name: k, ...v}))
          }}>
            {_ => (
              <ChartLine
                height={280}
                data={_ as any}
                translation={{
                  blue: m.safety.blue,
                  yellow: m.safety.yellow,
                  red: m.safety.red,
                } as any}
                colorsByKey={colors}
              />
            )}
          </Lazy>
        </SlidePanel>
        <SlidePanel>
          <Lazy deps={[data]} fn={() => {
            const x = data?.groupBy(_ => _.date_time ? format(_.date_time, 'yyyy-MM') : 'no_date')
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
              <ChartLine height={280} data={_ as any} translation={{
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
        <SlidePanel title={m.safety.lastAttacks}>
          <Lazy deps={[data]} fn={() => data?.filter(_ => _.attack === 'yes').map(_ => ({
            id: _.id,
            title: m.safety.attackOfOn(_.oblastISO, _.attack_type),
            date: _.date_time,
            desc: _.report_summary,
          }) as CommentsPanelProps['data'][0])}>
            {_ => <CommentsPanel pageSize={10} data={_}/>}
          </Lazy>
        </SlidePanel>
      </Div>
    </Div>
  )
}
