import {Meal_pssPdm, OblastIndex} from 'infoportal-common'
import {PdmData, PdmForm, useMealPdmContext} from '@/features/Meal/Pdm/Context/MealPdmContext'
import {useKoboSchemaContext} from '@/features/KoboSchema/KoboSchemaContext'
import {Div, SlidePanel} from '@/shared/PdfLayout/PdfSlide'
import {usePdmFilters} from '@/features/Meal/Pdm/Context/usePdmFilter'
import {useI18n} from '@/core/i18n'
import React, {useMemo, useState} from 'react'
import {DataFilter} from '@/shared/DataFilter/DataFilter'
import {map, seq} from '@axanc/ts-utils'
import {AgeGroupTable, DebouncedInput, Page} from '@/shared'
import {DataFilterLayout} from '@/shared/DataFilter/DataFilterLayout'
import {PeriodPicker} from '@/shared/PeriodPicker/PeriodPicker'
import {Panel, PanelBody} from '@/shared/Panel'
import {MapSvgByOblast} from '@/shared/maps/MapSvgByOblast'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'

const isPssPdm = (_: PdmData<PdmForm>): _ is PdmData<Meal_pssPdm.T> => {
  return _.type === 'Pss'
}

export const MealPdmPssDashboard = () => {
  const ctx = useMealPdmContext()
  const {shape: commonShape} = usePdmFilters(seq(ctx.fetcherAnswers.get).filter(isPssPdm))
  const ctxSchema = useKoboSchemaContext()
  const schema = ctxSchema.byName.meal_pssPdm.get!
  const {m} = useI18n()
  const [optionFilter, setOptionFilters] = useState<Record<string, string[] | undefined>>({})

  const filterShape = useMemo(() => {
    return DataFilter.makeShape<PdmData<Meal_pssPdm.T>>({
      ...commonShape,
      received: {
        icon: 'check_circle',
        getOptions: () => DataFilter.buildOptionsFromObject(Meal_pssPdm.options.type_session),
        label: m.mealMonitoringPdm.sessionType,
        getValue: (_) => _.answers.type_session,
      },
    })
  }, [commonShape, schema])

  const data = useMemo(() => {
    return map(ctx.fetcherAnswers.get, (_) => {
      return seq(DataFilter.filterData(_.filter(isPssPdm), filterShape, optionFilter))
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
              <SlidePanel title={m.mealMonitoringPdm.similarPss}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.received_similar_pss}
                  label={Meal_pssPdm.options.received_similar_pss}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.rateSession}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.received_similar_pss_yes}
                  label={Meal_pssPdm.options.rate_activities_session}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.rateExperience}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.rate_activities_session}
                  label={Meal_pssPdm.options.rate_activities_session}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.overallHelpful}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.overall_sessions_helpful}
                  label={Meal_pssPdm.options.overall_sessions_helpful}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.emotionalBenefit}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.feel_emotional_benefits}
                  label={Meal_pssPdm.options.feel_emotional_benefits}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.feelIntegrated}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.feel_integrated_activity}
                  label={Meal_pssPdm.options.know_where_address_suggestions}
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
              <Panel savableAsImg expendable title={m.location}>
                <PanelBody>
                  <MapSvgByOblast
                    sx={{maxWidth: 480, margin: 'auto'}}
                    fillBaseOn="value"
                    data={data}
                    getOblast={(_) => OblastIndex.byName(_.oblast)?.iso!}
                    value={(_) => true}
                    base={(_) => _.answers.oblast !== undefined}
                  />
                </PanelBody>
              </Panel>
              <SlidePanel title={m.mealMonitoringPdm.satWithActivity}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.satisfied_activities_provided}
                  label={Meal_pssPdm.options.report_misconduct_employees}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.satActivityBad}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.satisfied_activities_provided_bad}
                  label={Meal_pssPdm.options.satisfied_activities_provided_bad}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.respect}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.feel_staff_respect}
                  label={Meal_pssPdm.options.know_where_address_suggestions}
                />
              </SlidePanel>
            </Div>
            <Div column>
              <SlidePanel title={m.mealMonitoringPdm.wellInformPss}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.well_informed_service}
                  label={Meal_pssPdm.options.report_misconduct_employees}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.safePss}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.feel_safe_sessions}
                  label={Meal_pssPdm.options.know_where_address_suggestions}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.pssExcluded}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.know_people_needing_pss}
                  label={Meal_pssPdm.options.report_misconduct_employees}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.address}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.know_where_address_suggestions}
                  label={Meal_pssPdm.options.know_where_address_suggestions}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.howReport}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.report_misconduct_employees}
                  label={Meal_pssPdm.options.report_misconduct_employees}
                />
              </SlidePanel>
            </Div>
          </Div>
        </>
      )}
    </Page>
  )
}
