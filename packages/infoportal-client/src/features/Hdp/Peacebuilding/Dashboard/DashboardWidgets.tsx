import React, {type FC} from 'react'

import {Cs_tracker, OblastISO} from 'infoportal-common'

import {useI18n} from '@/core/i18n'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import {Panel} from '@/shared/Panel'
import {Div, SlidePanel, SlideWidget} from '@/shared/PdfLayout/PdfSlide'

import {usePeacebuildingContext} from './Context'
import {MapSvgByOblast} from '@/shared/maps/MapSvgByOblast'
import {Txt} from '@/shared'
import {ChartBarMultipleBy} from '@/shared/charts/ChartBarMultipleBy'
import {ChartLineBy} from '@/shared/charts/ChartLineBy'
import {seq} from '@axanc/ts-utils'
import {ChartPieWidgetBy} from '@/shared/charts/ChartPieWidgetBy'

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
              {formatLargeNumber(ctx.dataFiltered.reduce((acc, row) => acc + (row.total_participants || 0), 0))}
              {ctx.drcUsers.length > 0 && (
                <Txt sx={{ml: 0.5, fontSize: '0.7em', color: (t) => t.palette.text.secondary}}>
                  ({((ctx.dataFiltered.length / ctx.drcUsers.length) * 100).toFixed(1)}%)
                </Txt>
              )}
            </SlideWidget>
          </Div>
          <Div sx={{alignItems: 'stretch'}}>
            <SlideWidget sx={{flex: 1}} icon="female" title={m.female}>
              {(() => {
                const totalFemale = ctx.dataFiltered.reduce((acc, row) => acc + (row.participants_female || 0), 0)
                const totalAll = ctx.dataFiltered.reduce((acc, row) => acc + (row.total_participants || 0), 0)
                const percent = totalAll > 0 ? ((totalFemale / totalAll) * 100).toFixed(1) : '0'
                return (
                  <>
                    {formatLargeNumber(totalFemale)}
                    <Txt sx={{ml: 0.5, fontSize: '0.7em', color: (t) => t.palette.primary.main}}>({percent}%)</Txt>
                  </>
                )
              })()}
            </SlideWidget>
            <SlideWidget sx={{flex: 1}} icon="male" title={m.male}>
              {(() => {
                const totalMale = ctx.dataFiltered.reduce((acc, row) => acc + (row.participants_male || 0), 0)
                const totalAll = ctx.dataFiltered.reduce((acc, row) => acc + (row.total_participants || 0), 0)
                const percent = totalAll > 0 ? ((totalMale / totalAll) * 100).toFixed(1) : '0'
                return (
                  <>
                    {formatLargeNumber(totalMale)}
                    <Txt sx={{ml: 0.5, fontSize: '0.7em', color: (t) => t.palette.primary.main}}>({percent}%)</Txt>
                  </>
                )
              })()}
            </SlideWidget>
          </Div>
          <Panel title={m.trainingTrends}>
            <ChartLineBy
              data={seq(ctx.dataFiltered)}
              getX={(row) => row.training_date?.toISOString().slice(0, 10) ?? 'Unknown'}
              getY={(row) => row.total_participants || 0}
              label={m.participants}
              height={220}
            />
          </Panel>
          <Div sx={{alignItems: 'stretch', mt: 2}}>
            <SlideWidget sx={{flex: 1}} icon="school" title={m.trainingOfTrainers}>
              <Div sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Txt sx={{fontSize: '1.1em', fontWeight: 500}}>
                  8{' '}
                  <Txt component="span" sx={{fontWeight: 400}}>
                    trained
                  </Txt>
                </Txt>
                <Txt sx={{fontSize: '0.95em', color: (t) => t.palette.text.secondary}}>
                  5 facilitated{' '}
                  <Txt component="span" sx={{ml: 0.5}}>
                    {' '}
                    (62.5%)
                  </Txt>
                </Txt>
              </Div>
            </SlideWidget>
          </Div>
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
              label={Cs_tracker.options.training_duration}
            />
          </SlidePanel>
        </Div>
        <Div column>
          <Panel title={m.participantsLoc}>
            <MapSvgByOblast
              sx={{maxWidth: 500, mt: 5, margin: 'auto'}}
              data={ctx.dataFiltered}
              getOblast={(row) => officeToOblast[row.location?.toLowerCase() || '']}
              fillBaseOn="value"
              value={(_) => true}
            />
          </Panel>
          <SlidePanel>
            <ChartPieWidgetBy
              title={m.byOrganisation}
              filter={(_) => !!_.organisation?.includes('drc')}
              data={ctx.dataFiltered}
              sx={{mb: 1}}
            />
            <ChartBarMultipleBy
              data={ctx.dataFiltered}
              by={(_) => _.organisation}
              forceShowEmptyLabels
              label={{
                ...Cs_tracker.options.organisation,
                drc: 'DRC',
                partner: 'Partner',
                other: 'Other',
              }}
            />
          </SlidePanel>
          <SlidePanel title={m.team}>
            <ChartBarMultipleBy
              data={ctx.dataFiltered}
              by={(_) => _.sector_team}
              label={Cs_tracker.options.sector_team}
            />
          </SlidePanel>
        </Div>
      </Div>
    </Div>
  )
}
