import React, {type FC} from 'react'
import {format} from 'date-fns'

import {Conflict_trainings} from 'infoportal-common'

import {useI18n} from '@/core/i18n'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import {ChartLineBy} from '@/shared/charts/ChartLineBy'
import {Panel} from '@/shared/Panel'
import {Div, SlidePanel, SlideWidget} from '@/shared/PdfLayout/PdfSlide'

import {usePeacebuildingContext} from './Context'
import {Datatable} from '@/shared/Datatable/Datatable'
import {ChartPieWidgetBy} from '@/shared/charts/ChartPieWidgetBy'

export const DashboardWidgets: FC = () => {
  const {m, formatLargeNumber} = useI18n()
  const ctx = usePeacebuildingContext()

  return (
    <Div column>
      <Div responsive>
        <Div column>
          <Div sx={{alignItems: 'stretch'}}>
            <SlideWidget sx={{flex: 1}} icon="group" title={m.individuals}>
              {formatLargeNumber(ctx.dataFiltered.length)}
            </SlideWidget>
            <SlideWidget sx={{flex: 1}} icon="wifi" title={m.online}>
              {formatLargeNumber(ctx.dataFiltered.filter((_) => _.training_format === 'online').length)}
            </SlideWidget>
            <SlideWidget sx={{flex: 1}} icon="wifi_off" title={m.offline}>
              {formatLargeNumber(ctx.dataFiltered.filter((_) => _.training_format === 'offline').length)}
            </SlideWidget>
          </Div>
          <SlidePanel>
            <ChartPieWidgetBy
              title={m.organisation}
              filter={(_) => _.organisation === 'drc'}
              data={ctx.dataFiltered}
              sx={{mb: 1}}
            />
            <ChartBarSingleBy
              data={ctx.dataFiltered}
              by={(_) => _.organisation}
              label={Conflict_trainings.options.organisation}
            />
          </SlidePanel>
          <SlidePanel title={m.duration}>
            <ChartBarSingleBy
              data={ctx.dataFiltered}
              by={(_) => _.training_duration}
              label={Conflict_trainings.options.training_duration}
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
        <Div column>
          <Panel title={m.submissions}>
            <ChartLineBy
              sx={{mt: 1}}
              data={ctx.dataFiltered}
              getX={(_) => format(_.start, 'yyyy-MM')}
              getY={(_) => 1}
              label={m.count}
            />
          </Panel>
          <Div sx={{alignItems: 'stretch'}}>
            <SlideWidget sx={{flex: 1}} icon="female" title={m.female}>
              {formatLargeNumber(ctx.dataFiltered.filter((_) => _.gender === 'female').length)}
            </SlideWidget>
            <SlideWidget sx={{flex: 1}} icon="male" title={m.male}>
              {formatLargeNumber(ctx.dataFiltered.filter((_) => _.gender === 'male').length)}
            </SlideWidget>
          </Div>
          <Panel>
            <Datatable
              id="cs-list"
              data={ctx.dataFiltered}
              loading={ctx.fetcherAnswer.loading}
              defaultLimit={10}
              rowsPerPageOptions={[10, 20, 50]}
              columns={[
                {
                  type: 'string',
                  id: 'name',
                  head: m.firstName,
                  renderQuick: (_) => _.first_name,
                },
                {
                  type: 'string',
                  id: 'second',
                  head: m.lastName,
                  renderQuick: (_) => _.last_name,
                },
                {
                  type: 'select_one',
                  id: 'office',
                  head: m.office,
                  render: (_) => {
                    return {
                      value: _.office,
                      label: Conflict_trainings.options.office[_.office as keyof typeof Conflict_trainings.options.office] ?? _.office,
                    }
                  }
                },
              ]}
            ></Datatable>
          </Panel>
        </Div>
      </Div>
    </Div>
  )
}