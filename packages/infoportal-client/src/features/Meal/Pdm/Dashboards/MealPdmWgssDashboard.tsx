import {Gbv_wgss_pdm} from 'infoportal-common'
import {PdmData, PdmForm, useMealPdmContext} from '@/features/Meal/Pdm/Context/MealPdmContext'
import {useKoboSchemaContext} from '@/features/KoboSchema/KoboSchemaContext'
import {Div, SlidePanel, SlideWidget} from '@/shared/PdfLayout/PdfSlide'
import {usePdmFilters} from '@/features/Meal/Pdm/Context/usePdmFilter'
import {useI18n} from '@/core/i18n'
import React, {useMemo, useState} from 'react'
import {DataFilter} from '@/shared/DataFilter/DataFilter'
import {map, seq} from '@axanc/ts-utils'
import {AgeGroupTable, DebouncedInput, Page} from '@/shared'
import {DataFilterLayout} from '@/shared/DataFilter/DataFilterLayout'
import {PeriodPicker} from '@/shared/PeriodPicker/PeriodPicker'
import {Panel, PanelBody} from '@/shared/Panel'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'

const isWgssPdm = (_: PdmData<PdmForm>): _ is PdmData<Gbv_wgss_pdm.T> => {
  return _.type === 'Wgss'
}

export const MealPdmWgssDashboard = () => {
  const ctx = useMealPdmContext()
  const {shape: commonShape} = usePdmFilters(seq(ctx.fetcherAnswers.get).filter(isWgssPdm))
  const ctxSchema = useKoboSchemaContext()
  const schema = ctxSchema.byName.gbv_wgssPdm.get!
  const {m, formatLargeNumber} = useI18n()
  const [optionFilter, setOptionFilters] = useState<Record<string, string[] | undefined>>({})

  const filterShape = useMemo(() => {
    return DataFilter.makeShape(commonShape)
  }, [commonShape])

  const data = useMemo(() => {
    return map(ctx.fetcherAnswers.get, (_) => {
      return seq(DataFilter.filterData(_.filter(isWgssPdm), filterShape, optionFilter))
    })
  }, [ctx.fetcherAnswers.get, optionFilter, filterShape])

  return (
    <Page width="lg" loading={ctx.fetcherAnswers.loading}>
      <DataFilterLayout
        shapes={filterShape}
        filters={optionFilter}
        setFilters={setOptionFilters}
        before={
          <DebouncedInput<[Date | undefined, Date | undefined]>
            debounce={400}
            value={[ctx.periodFilter.start, ctx.periodFilter.end]}
            onChange={([start, end]) => ctx.setPeriodFilter((prev) => ({...prev, start, end}))}
          >
            {(value, onChange) => (
              <PeriodPicker
                sx={{marginTop: '-6px'}}
                value={value ?? [undefined, undefined]}
                onChange={onChange}
                min={ctx.fetcherPeriod.get?.start}
                max={ctx.fetcherPeriod.get?.end}
              />
            )}
          </DebouncedInput>
        }
      />
      {data && (
        <>
          <Div responsive>
            <Div column>
              <SlideWidget sx={{flex: 1}} icon="group" title={m.submissions}>
                {formatLargeNumber(data.length)}
              </SlideWidget>
              <SlidePanel title={m.mealMonitoringPdm.longSafe}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.long_safe_space}
                  label={Gbv_wgss_pdm.options.long_safe_space}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.wgssSafeTravel}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.safe_travelling}
                  label={Gbv_wgss_pdm.options.complaint_responded}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.respect}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.staff_treated_respect}
                  label={Gbv_wgss_pdm.options.complaint_responded}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.accessSafeSpace}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.difficulties_accessing_safe_space}
                  label={Gbv_wgss_pdm.options.complaint_responded}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.enjoyActivities}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.enjoy_participating_activities}
                  label={Gbv_wgss_pdm.options.staff_considerate_feedback}
                  includeNullish
                />
              </SlidePanel>
            </Div>
            <Div column>
              <SlidePanel title={m.mealMonitoringPdm.activitiesRelevant}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.activities_relevant_needs}
                  label={Gbv_wgss_pdm.options.staff_considerate_feedback}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.talkProblems}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.feel_staff_problems}
                  label={Gbv_wgss_pdm.options.staff_considerate_feedback}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.girlSupport}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.know_girl_support}
                  label={Gbv_wgss_pdm.options.complaint_responded}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.staffWelcomed}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.feel_welcomed_staff}
                  label={Gbv_wgss_pdm.options.staff_considerate_feedback}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.considerateFeedback}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.staff_considerate_feedback}
                  label={Gbv_wgss_pdm.options.staff_considerate_feedback}
                  includeNullish
                />
              </SlidePanel>
            </Div>
            <Div column>
              <Panel title={m.ageGroup}>
                <PanelBody>
                  <AgeGroupTable
                    tableId="pdm-dashboard"
                    persons={data.flatMap((_) => _.persons).compact()}
                    enableDisplacementStatusFilter
                    enablePwdFilter
                  />
                </PanelBody>
              </Panel>
              <SlidePanel title={m.mealMonitoringPdm.wellInformed}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.informed_service_available}
                  label={Gbv_wgss_pdm.options.complaint_responded}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.eoreSatis}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.satisfied_assistance_provided}
                  label={Gbv_wgss_pdm.options.complaint_responded}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.channel}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.channel_complaint}
                  label={Gbv_wgss_pdm.options.complaint_responded}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.suggestionsResponded}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.complaint_responded}
                  label={Gbv_wgss_pdm.options.complaint_responded}
                  includeNullish
                />
              </SlidePanel>
            </Div>
          </Div>
        </>
      )}
    </Page>
  )
}
