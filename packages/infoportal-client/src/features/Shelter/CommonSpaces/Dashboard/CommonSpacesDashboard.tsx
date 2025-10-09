import React from 'react'
import {Page} from '@/shared/Page'
import {DataFilterLayout} from '@/shared/DataFilter/DataFilterLayout'
import {PeriodPicker} from '@/shared/PeriodPicker/PeriodPicker'
import {Panel, PanelBody} from '@/shared/Panel'
import {useI18n} from '@/core/i18n'
import {CommonSpacesProvider, useCommonSpacesContext} from '@/features/Shelter/CommonSpaces/Data/CommonSpacesContext'
import {OblastIndex, Shelter_commonSpaces} from 'infoportal-common'
import {Obj, seq} from '@axanc/ts-utils'
import {makeChartData} from '@/shared/charts/chartHelper'
import {Div, SlidePanel, SlideWidget} from '@/shared/PdfLayout/PdfSlide'
import {ChartBarMultipleBy} from '@/shared/charts/ChartBarMultipleBy'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import {MapSvg} from '@/shared/maps/MapSvg'
import {DashboardFilterLabel} from '@/shared/DashboardLayout/DashboardFilterLabel'

export const CommonSpacesDashboard = () => (
  <CommonSpacesProvider>
    <CommonSpacesDashboardInner />
  </CommonSpacesProvider>
)

const CommonSpacesDashboardInner: React.FC = () => {
  const {m} = useI18n()
  const ctx = useCommonSpacesContext()

  return (
    <Page width="full" loading={!!ctx.answers.loading}>
      <DataFilterLayout
        shapes={ctx.filterShape}
        filters={ctx.filters}
        setFilters={ctx.setFilters}
        onClear={() => {
          ctx.setFilters({})
          ctx.setPeriodSubmission({})
          ctx.setPeriodWorkDone({})
        }}
        before={
          <>
            <DashboardFilterLabel icon="event" label={m.submissionTime} active>
              {() => (
                <PeriodPicker
                  value={[ctx.periodSubmission.start, ctx.periodSubmission.end]}
                  onChange={([start, end]) => ctx.setPeriodSubmission({start, end})}
                  label={[m.submissionStart, m.endIncluded]}
                />
              )}
            </DashboardFilterLabel>
            <DashboardFilterLabel icon="build" label={m._shelter.workDoneAt} active>
              {() => (
                <PeriodPicker
                  value={[ctx.periodWorkDone.start, ctx.periodWorkDone.end]}
                  onChange={([start, end]) => ctx.setPeriodWorkDone({start, end})}
                  label={[m._shelter.workDoneStart, m.endIncluded]}
                />
              )}
            </DashboardFilterLabel>
          </>
        }
      />
      <_CommonSpacesDashboardBody />
    </Page>
  )
}
const _CommonSpacesDashboardBody: React.FC = () => {
  const {m, formatLargeNumber} = useI18n()
  const ctx = useCommonSpacesContext()
  const data = ctx.dataFiltered

  const oblastMapData = React.useMemo(() => {
    const gb = seq(data).groupBy((_) => OblastIndex.byKoboName(_.ben_det_oblast)?.iso!)
    return new Obj(gb).transform((k, v) => [k, makeChartData({value: v.length})]).get()
  }, [data])

  return (
    <Div responsive>
      <Div column>
        <Div>
          <SlideWidget title={m.households} icon="home">
            {formatLargeNumber(ctx.kpi.households)}
          </SlideWidget>
          <SlideWidget title={m.individuals} icon="person">
            {formatLargeNumber(ctx.kpi.persons)}
          </SlideWidget>
          <SlideWidget title={m.hhSize} icon="person">
            {formatLargeNumber(ctx.kpi.hhSize, {maximumFractionDigits: 2})}
          </SlideWidget>
        </Div>
        <Panel title={m._shelter.assessmentLocations}>
          <PanelBody>
            <MapSvg data={oblastMapData} sx={{mx: 1}} maximumFractionDigits={0} base={data.length} />
          </PanelBody>
        </Panel>
      </Div>
      <Div column>
        <Panel title={m.project}>
          <PanelBody>
            <ChartBarSingleBy data={data} by={(_) => _.project!} label={Shelter_commonSpaces.options.project} />
          </PanelBody>
        </Panel>
        <SlidePanel title={m._shelter.damage}>
          <ChartBarMultipleBy
            data={data.filter((_) => Array.isArray(_.damage) && _.damage.length > 0)}
            by={(_) => _.damage ?? []}
            label={Shelter_commonSpaces.options.damage}
          />
        </SlidePanel>
        <SlidePanel title={m._shelter.managementModel}>
          <ChartBarMultipleBy
            data={data.filter((_) => Array.isArray(_.management_model) && _.management_model.length > 0)}
            by={(_) => _.management_model ?? []}
            label={Shelter_commonSpaces.options.management_model}
          />
        </SlidePanel>
        <SlidePanel title={m.modality}>
          <ChartBarSingleBy
            data={data}
            by={(_) => _.modality_assistance}
            label={Shelter_commonSpaces.options.modality_assistance}
          />
        </SlidePanel>
        <SlidePanel title={m.status}>
          <ChartBarSingleBy data={data} by={(_) => _.status} label={Shelter_commonSpaces.options.status} />
        </SlidePanel>
      </Div>
    </Div>
  )
}
