import React, {type FC} from 'react'
import {format} from 'date-fns'

import {Conflict_trainings, OblastISO} from 'infoportal-common'

import {useI18n} from '@/core/i18n'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import {Panel} from '@/shared/Panel'
import {Div, SlidePanel, SlideWidget} from '@/shared/PdfLayout/PdfSlide'

import {usePeacebuildingContext} from './Context'
import {ChartPieWidgetBy} from '@/shared/charts/ChartPieWidgetBy'
import {MapSvgByOblast} from '@/shared/maps/MapSvgByOblast'
import {Lazy, Txt} from '@/shared'
import {ChartLineByDate} from '@/shared/charts/ChartLineByDate'

export const DashboardWidgets: FC = () => {
  const {m, formatLargeNumber} = useI18n()
  const ctx = usePeacebuildingContext()

  const officeToOblast: Record<string, OblastISO> = {
    sumy: 'UA59',
    kharkiv: 'UA63',
    chernihiv: 'UA74',
    mykolaiv: 'UA48',
    kyiv: 'UA80',
    dnipro: 'UA12',
    kherson: 'UA65',
    ivankiv: 'UA32',
    sloviansk: 'UA14',
  }

  return (
    <Div column>
      <Div responsive>
        <Div column>
          <Div sx={{alignItems: 'stretch'}}>
            <SlideWidget sx={{flex: 1}} icon="group" title={m.individualsTrained}>
              {formatLargeNumber(ctx.dataFiltered.length)}
              {ctx.drcUsers.length > 0 && (
                <Txt sx={{ml: 0.5, fontSize: '0.7em', color: (t) => t.palette.text.secondary}}>
                  ({((ctx.dataFiltered.length / ctx.drcUsers.length) * 100).toFixed(1)}%)
                </Txt>
              )}
            </SlideWidget>
          </Div>
          <Div sx={{alignItems: 'stretch'}}>
            <SlideWidget sx={{flex: 1}} icon="female" title={m.female}>
              <Lazy
                deps={[ctx.dataFiltered]}
                fn={() => {
                  const count = ctx.dataFiltered.filter((_) => _.gender === 'female').length
                  const total = ctx.dataFiltered.length
                  const percent = total > 0 ? ((count / total) * 100).toFixed(1) : '0'
                  return {count, percent}
                }}
              >
                {({count, percent}) => (
                  <>
                    {formatLargeNumber(count)}
                    <Txt sx={{ml: 0.5, fontSize: '0.7em', color: (t) => t.palette.primary.main}}>({percent}%)</Txt>
                  </>
                )}
              </Lazy>
            </SlideWidget>
            <SlideWidget sx={{flex: 1}} icon="male" title={m.male}>
              <Lazy
                deps={[ctx.dataFiltered]}
                fn={() => {
                  const count = ctx.dataFiltered.filter((_) => _.gender === 'male').length
                  const total = ctx.dataFiltered.length
                  const percent = total > 0 ? ((count / total) * 100).toFixed(1) : '0'
                  return {count, percent}
                }}
              >
                {({count, percent}) => (
                  <>
                    {formatLargeNumber(count)}
                    <Txt sx={{ml: 0.5, fontSize: '0.7em', color: (t) => t.palette.primary.main}}>({percent}%)</Txt>
                  </>
                )}
              </Lazy>
            </SlideWidget>
          </Div>
          <Panel title={m.trainingTrends}>
            <ChartLineByDate
              data={ctx.dataFiltered}
              start={ctx.period.start}
              end={ctx.period.end}
              curves={{
                [m.participants]: (_) => _.start,
              }}
              label={[m.participants]}
              formatLabel={(date) => format(date, 'yyyy-MM-dd')}
            />
          </Panel>

          <Div sx={{alignItems: 'stretch'}}>
            <SlideWidget sx={{flex: 1}} icon="wifi" title={m.onlineTraining}>
              {formatLargeNumber(ctx.dataFiltered.filter((_) => _.training_format === 'online').length)}
            </SlideWidget>
            <SlideWidget sx={{flex: 1}} icon="wifi_off" title={m.offlineTraining}>
              {formatLargeNumber(ctx.dataFiltered.filter((_) => _.training_format === 'offline').length)}
            </SlideWidget>
          </Div>
          <SlidePanel title={m.byDuration}>
            <ChartBarSingleBy
              data={ctx.dataFiltered}
              by={(_) => _.training_duration}
              label={Conflict_trainings.options.training_duration}
            />
          </SlidePanel>
        </Div>
        <Div column>
          <Panel title={m.participantsLoc}>
            <MapSvgByOblast
              sx={{maxWidth: 500, mt: 5, margin: 'auto'}}
              data={ctx.dataFiltered}
              getOblast={(row) => officeToOblast[row.office?.toLowerCase() || '']}
              fillBaseOn="value"
              value={(_) => true}
            />
          </Panel>
          <SlidePanel>
            <ChartPieWidgetBy
              title={m.byOrganisation}
              filter={(_) => _.organisation === 'drc'}
              data={ctx.dataFiltered}
              sx={{mb: 1}}
            />
            <ChartBarSingleBy
              data={ctx.dataFiltered}
              by={(_) => _.organisation}
              forceShowEmptyLabels={true}
              label={{
                ...Conflict_trainings.options.organisation,
                drc: 'DRC',
                partner: 'Partner',
                other: 'Other',
              }}
            />
          </SlidePanel>
          <SlidePanel title={m.team}>
            <ChartBarSingleBy
              data={ctx.dataFiltered}
              by={(_) => _.sector_team}
              label={Conflict_trainings.options.sector_team}
            />
          </SlidePanel>
        </Div>
      </Div>
    </Div>
  )
}
