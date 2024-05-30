import {Enum, fnSwitch, Seq} from '@alexandreannic/ts-utils'
import {useI18n} from '@/core/i18n'
import {Div, SlidePanel, SlideWidget} from '@/shared/PdfLayout/PdfSlide'
import {UaMapBy} from '../../DrcUaMap/UaMapBy'
import {Lazy} from '@/shared/Lazy'
import {format} from 'date-fns'
import {ChartLine} from '@/shared/charts/ChartLine'
import {ScRadioGroup, ScRadioGroupItem} from '@/shared/RadioGroup'
import {ChartPieWidgetBy} from '@/shared/charts/ChartPieWidgetBy'
import {useSession} from '@/core/Session/SessionContext'
import {MinusRusChartPanel} from '@/features/Safety/IncidentsDashboard/MinusRusChartPanel'
import {CommentsPanel, CommentsPanelProps} from '@/shared/CommentsPanel'
import {ChartBarMultipleBy} from '@/shared/charts/ChartBarMultipleBy'
import {Safety_incident} from '@infoportal-common'
import {useState} from 'react'
import {InferTypedAnswer} from '@/core/sdk/server/kobo/KoboTypedAnswerSdk'
import {SafetyIncidentDashboardAlert} from '@/features/Safety/IncidentsDashboard/SafetyIncidentDashboardAlert'

export const SafetyIncidentDashboardBody = ({
  data: {
    data,
    dataAlert,
    dataIncident,
    dataIncidentFiltered,
    dataIncidentFilteredLastPeriod,
  }
}: {
  data: {
    data: Seq<InferTypedAnswer<'safety_incident'>>
    dataAlert: Seq<InferTypedAnswer<'safety_incident'>>
    dataIncident: Seq<InferTypedAnswer<'safety_incident'>>
    dataIncidentFiltered: Seq<InferTypedAnswer<'safety_incident'>>
    dataIncidentFilteredLastPeriod?: Seq<InferTypedAnswer<'safety_incident'>>
  }
}) => {
  const {m, formatLargeNumber} = useI18n()
  const [mapType, setMapType] = useState<'incident' | 'attack'>('incident')
  const {session} = useSession()
  console.log(dataIncidentFiltered)
  return (
    <Div sx={{alignItems: 'flex-start'}} responsive>
      <Div column>
        <Div sx={{alignItems: 'stretch'}}>
          <SlideWidget sx={{flex: 1}} icon="report" title={m.safety.incidents}>
            {formatLargeNumber(dataIncidentFiltered.length)}
          </SlideWidget>
          <SlidePanel BodyProps={{sx: {p: '0px !important'}}} sx={{flex: 1, m: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <ChartPieWidgetBy
              title={m.safety.attacks}
              filter={_ => _.attack === 'yes'}
              showValue
              compare={dataIncidentFilteredLastPeriod ? {before: dataIncidentFilteredLastPeriod} : undefined}
              filterBase={_ => _.attack !== undefined}
              data={dataIncidentFiltered}
            />
          </SlidePanel>
        </Div>
        <SlidePanel>
          <ScRadioGroup value={mapType} onChange={setMapType} dense inline sx={{mb: 2}}>
            <ScRadioGroupItem dense hideRadio value="incident" title={m.safety.incidents}/>
            <ScRadioGroupItem dense hideRadio value="attack" title={m.safety.attacks}/>
          </ScRadioGroup>
          {fnSwitch(mapType, {
            'incident': (
              <UaMapBy
                sx={{maxWidth: 480}}
                fillBaseOn="value"
                data={dataIncidentFiltered}
                getOblast={_ => _.oblastISO!}
                value={_ => true}
                base={_ => _.oblastISO !== undefined}
              />
            ),
            'attack': (
              <UaMapBy
                sx={{maxWidth: 480}}
                fillBaseOn="value"
                data={dataIncidentFiltered}
                getOblast={_ => _.oblastISO}
                value={_ => _.attack === 'yes'}
                base={_ => _.oblastISO !== undefined}
              />
            ),
          })}
        </SlidePanel>
        <SlidePanel title={m.safety.attackTypes}>
          <ChartBarMultipleBy
            data={dataIncidentFiltered}
            by={_ => _.attack_type}
            label={Safety_incident.options.attack_type}
          />
        </SlidePanel>
        <SlidePanel title={m.safety.target}>
          <ChartBarMultipleBy
            data={dataIncidentFiltered}
            by={_ => _.what_destroyed}
            label={Safety_incident.options.what_destroyed}
          />
        </SlidePanel>
        <SlidePanel title={m.safety.typeOfCasualties}>
          <ChartBarMultipleBy
            data={dataIncidentFiltered}
            by={_ => _.type_casualties}
            label={Safety_incident.options.type_casualties}
          />
        </SlidePanel>
      </Div>
      <Div column>
        <SafetyIncidentDashboardAlert data={{
          data: dataIncidentFiltered,
          dataAlert,
        }}/>
        <SlidePanel title={m.safety.casualties}>
          <Div sx={{mt: -2}}>
            <Lazy deps={[dataIncidentFiltered]} fn={() => dataIncidentFiltered?.sum(_ => _.dead ?? 0)}>
              {_ => (
                <SlideWidget sx={{minHeight: 'auto', flex: 1}} title={m.safety.dead}>
                  {formatLargeNumber(_)}
                </SlideWidget>
              )}
            </Lazy>
            <Lazy deps={[dataIncidentFiltered]} fn={() => dataIncidentFiltered?.sum(_ => _.injured ?? 0)}>
              {_ => (
                <SlideWidget sx={{minHeight: 'auto', flex: 1}} title={m.safety.injured}>
                  {formatLargeNumber(_)}
                </SlideWidget>
              )}
            </Lazy>
          </Div>
          <Lazy deps={[dataIncidentFiltered]} fn={() => {
            const x = dataIncidentFiltered?.groupBy(_ => _.date_time ? format(_.date_time, 'yyyy-MM') : 'no_date')
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
        <SlidePanel title={m.safety.lastAttacks}>
          <Lazy deps={[dataIncidentFiltered]} fn={() => dataIncidentFiltered?.filter(_ => _.attack === 'yes').map(_ => ({
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
