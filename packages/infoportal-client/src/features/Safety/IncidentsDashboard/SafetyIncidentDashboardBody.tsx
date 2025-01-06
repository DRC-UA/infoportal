import {fnSwitch, Obj} from '@alexandreannic/ts-utils'
import {useI18n} from '@/core/i18n'
import {Div, SlidePanel, SlideWidget} from '@/shared/PdfLayout/PdfSlide'
import {MapSvgByOblast} from '@/shared/maps/MapSvgByOblast'
import {Lazy} from '@/shared/Lazy'
import {format} from 'date-fns'
import {ChartLine} from '@/shared/charts/ChartLine'
import {ScRadioGroup, ScRadioGroupItem} from '@/shared/RadioGroup'
import {ChartPieWidgetBy} from '@/shared/charts/ChartPieWidgetBy'
import {useSession} from '@/core/Session/SessionContext'
import {MinusRusChartPanel} from '@/features/Safety/IncidentsDashboard/MinusRusChartPanel'
import {CommentsPanel, CommentsPanelProps} from '@/shared/CommentsPanel'
import {ChartBarMultipleBy} from '@/shared/charts/ChartBarMultipleBy'
import {Safety_incident} from 'infoportal-common'
import {useState} from 'react'
import {SafetyIncidentDashboardAlert} from '@/features/Safety/IncidentsDashboard/SafetyIncidentDashboardAlert'
import {Panel, PanelBody, PanelTitle} from '@/shared/Panel'
import {Divider} from '@mui/material'
import {useSafetyIncidentContext} from '@/features/Safety/IncidentsDashboard/SafetyIncidentContext'

export enum AlertType {
  green = 'green',
  blue = 'blue',
  yellow = 'yellow',
  red = 'red',
}

export const SafetyIncidentDashboardBody = () => {
  const {m, formatLargeNumber} = useI18n()
  const [mapType, setMapType] = useState<'incident' | 'attack'>('incident')
  const {session} = useSession()
  const {dataFiltered, dataFilteredLastPeriod} = useSafetyIncidentContext()
  return (
    <Div sx={{alignItems: 'flex-start'}} responsive>
      <Div column>
        <Panel>
          <Div sx={{alignItems: 'stretch'}}></Div>
          <PanelBody>
            <ChartPieWidgetBy
              title={m.safety.attacks}
              filter={(_) => _.attack === 'yes'}
              showValue
              showBase
              compare={dataFilteredLastPeriod ? {before: dataFilteredLastPeriod} : undefined}
              data={dataFiltered}
            />
          </PanelBody>
          <Divider />
          <PanelBody>
            <ScRadioGroup value={mapType} onChange={setMapType} dense inline sx={{mb: 2}}>
              <ScRadioGroupItem dense hideRadio value="incident" title={m.safety.incidents} />
              <ScRadioGroupItem dense hideRadio value="attack" title={m.safety.attacks} />
            </ScRadioGroup>
            {fnSwitch(mapType, {
              incident: (
                <MapSvgByOblast
                  sx={{maxWidth: 480}}
                  fillBaseOn="value"
                  data={dataFiltered}
                  getOblast={(_) => _.oblastISO!}
                  value={(_) => true}
                  base={(_) => _.oblastISO !== undefined}
                />
              ),
              attack: (
                <MapSvgByOblast
                  sx={{maxWidth: 480}}
                  fillBaseOn="value"
                  data={dataFiltered}
                  getOblast={(_) => _.oblastISO}
                  value={(_) => _.attack === 'yes'}
                  base={(_) => _.oblastISO !== undefined}
                />
              ),
            })}
          </PanelBody>
          <Divider />
          <PanelBody>
            <PanelTitle sx={{mb: 1}}>{m.safety.attackTypes}</PanelTitle>
            <ChartBarMultipleBy
              data={dataFiltered}
              by={(_) => _.attack_type}
              label={Safety_incident.options.attack_type}
            />
          </PanelBody>
          <Divider />
          <PanelBody>
            <PanelTitle sx={{mb: 1}}>{m.safety.target}</PanelTitle>
            <ChartBarMultipleBy
              data={dataFiltered}
              by={(_) => _.what_destroyed}
              label={Safety_incident.options.what_destroyed}
            />
          </PanelBody>
          <Divider />
          <PanelBody>
            <PanelTitle sx={{mb: 1}}>{m.safety.typeOfCasualties}</PanelTitle>
            <ChartBarMultipleBy
              data={dataFiltered}
              by={(_) => _.type_casualties}
              label={Safety_incident.options.type_casualties}
            />
          </PanelBody>
          <Divider />
          <PanelBody>
            <PanelTitle sx={{mb: 1}}>{m.safety.lastAttacks}</PanelTitle>
            <Lazy
              deps={[dataFiltered]}
              fn={() =>
                dataFiltered
                  ?.filter((_) => _.attack === 'yes')
                  .map(
                    (_) =>
                      ({
                        id: _.id,
                        title: m.safety.attackOfOn(_.oblastISO, _.attack_type),
                        date: _.date_time,
                        desc: _.report_summary,
                      }) as CommentsPanelProps['data'][0],
                  )
              }
            >
              {(_) => <CommentsPanel pageSize={10} data={_} />}
            </Lazy>
          </PanelBody>
        </Panel>
      </Div>
      <Div column>
        <SafetyIncidentDashboardAlert />
        <SlidePanel title={m.safety.casualties}>
          <Div sx={{mt: -2}}>
            <Lazy deps={[dataFiltered]} fn={() => dataFiltered?.sum((_) => _.dead ?? 0)}>
              {(_) => (
                <SlideWidget sx={{minHeight: 'auto', flex: 1}} title={m.safety.dead}>
                  {formatLargeNumber(_)}
                </SlideWidget>
              )}
            </Lazy>
            <Lazy deps={[dataFiltered]} fn={() => dataFiltered?.sum((_) => _.injured ?? 0)}>
              {(_) => (
                <SlideWidget sx={{minHeight: 'auto', flex: 1}} title={m.safety.injured}>
                  {formatLargeNumber(_)}
                </SlideWidget>
              )}
            </Lazy>
          </Div>
          <Lazy
            deps={[dataFiltered]}
            fn={() => {
              const x = dataFiltered?.groupBy((_) => (_.date_time ? format(_.date_time, 'yyyy-MM') : 'no_date'))
              return new Obj(x)
                .transform((k, v) => [
                  k,
                  {
                    total: v.length,
                    dead: v.sum((_) => _.dead ?? 0),
                    injured: v.sum((_) => _.injured ?? 0),
                  },
                ])
                .sort(([bk], [ak]) => bk.localeCompare(ak))
                .entries()
                .filter(([k]) => k !== 'no_date')
                .map(([k, v]) => ({name: k, ...v}))
            }}
          >
            {(_) => (
              <ChartLine
                fixMissingMonths
                height={200}
                data={_ as any}
                translation={
                  {
                    total: m.safety.incidents,
                    dead: m.safety.dead,
                    injured: m.safety.injured,
                  } as any
                }
              />
            )}
          </Lazy>
        </SlidePanel>
        {(session?.admin || session?.drcJob === 'Head of Safety') && <MinusRusChartPanel />}
      </Div>
    </Div>
  )
}
