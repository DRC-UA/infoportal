import {OblastIndex, Protection_ipa_pdm} from 'infoportal-common'
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
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import {Panel, PanelBody} from '@/shared/Panel'
import {MapSvgByOblast} from '@/shared/maps/MapSvgByOblast'

const isIpaPdm = (_: PdmData<PdmForm>): _ is PdmData<Protection_ipa_pdm.T> => {
  return _.type === 'Ipa'
}

export const PdmIpaDashboard = () => {
  const ctx = useMealPdmContext()
  const ctxSchema = useKoboSchemaContext()
  const schema = ctxSchema.byName.protection_ipaPdm.get!
  const {shape: commonShape} = usePdmFilters(seq(ctx.fetcherAnswers.get).filter(isIpaPdm))
  const langIndex = ctxSchema.langIndex
  const {m, formatLargeNumber} = useI18n()
  const [optionFilter, setOptionFilters] = useState<Record<string, string[] | undefined>>({})

  const filterShape = useMemo(() => {
    return DataFilter.makeShape<PdmData<Protection_ipa_pdm.T>>({
      ...commonShape,
      type_implementation: {
        icon: 'handshake',
        getOptions: () => DataFilter.buildOptionsFromObject(Protection_ipa_pdm.options.type_assistance),
        label: m.assistance,
        getValue: (_) => _.answers.type_assistance,
      },
    })
  }, [commonShape, schema])

  const data = useMemo(() => {
    return map(ctx.fetcherAnswers.get, (_) => {
      return seq(DataFilter.filterData(_.filter(isIpaPdm), filterShape, optionFilter))
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
            <Div column sx={{maxHeight: '50%'}}>
              <SlideWidget sx={{flex: 1}} icon="group" title={m.submissions}>
                {formatLargeNumber(data.length)}
              </SlideWidget>
              <Panel savableAsImg expendable title={m.location}>
                <PanelBody>
                  <MapSvgByOblast
                    sx={{maxWidth: 480, margin: 'auto'}}
                    fillBaseOn="value"
                    data={data}
                    getOblast={(_) => OblastIndex.byName(_.oblast)?.iso!}
                    value={(_) => true}
                    base={(_) => _.answers.oblast_residence !== undefined}
                  />
                </PanelBody>
              </Panel>
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
              <SlidePanel title={m.donor}>
                <ChartBarSingleBy data={data} by={(_) => _.answers.donor} label={Protection_ipa_pdm.options.donor} />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.receiveHelp}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.receive_help_drc}
                  label={Protection_ipa_pdm.options.provide_staff_commission}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.interview}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.type_interview}
                  label={Protection_ipa_pdm.options.type_interview}
                />
              </SlidePanel>
              <SlidePanel title={m.assistance}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.type_assistance}
                  label={Protection_ipa_pdm.options.type_assistance}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.specify}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.specify}
                  label={Protection_ipa_pdm.options.specify}
                />
              </SlidePanel>
            </Div>
            <Div column sx={{maxHeight: '50%'}}>
              <SlidePanel title={m.mealMonitoringPdm.satisfiedAssistance}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.satisfied_assistance_provided}
                  label={Protection_ipa_pdm.options.know_address_suggestions}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.satisfiedAssistanceNo}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.satisfied_assistance_provided_no}
                  label={Protection_ipa_pdm.options.satisfied_assistance_provided_no}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.resolveProblem}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.assistance_help_problem}
                  label={Protection_ipa_pdm.options.assistance_help_problem}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.timely}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.assistance_provided_timely}
                  label={Protection_ipa_pdm.options.assistance_meet_needs}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.sessionMeet}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.assistance_meet_needs}
                  label={Protection_ipa_pdm.options.assistance_meet_needs}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.viewsTaken}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.views_needs_assistance}
                  label={Protection_ipa_pdm.options.know_address_suggestions}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.anyRisk}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.exposed_risk_receiving}
                  label={Protection_ipa_pdm.options.provide_staff_commission}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.receiveGift}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.provide_staff_commission}
                  label={Protection_ipa_pdm.options.provide_staff_commission}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.assistanceTreated}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.staff_respect_assistance}
                  label={Protection_ipa_pdm.options.know_address_suggestions}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.safeVa}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.feel_safe_communicating}
                  label={Protection_ipa_pdm.options.know_address_suggestions}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.address}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.know_address_suggestions}
                  label={Protection_ipa_pdm.options.know_address_suggestions}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.provideFeedback}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.know_address_suggestions_yes}
                  label={Protection_ipa_pdm.options.know_address_suggestions_yes}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.respond}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.know_address_suggestions_coqu}
                  label={Protection_ipa_pdm.options.know_address_suggestions_coqu}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.howReport}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.report_employee_requested}
                  label={Protection_ipa_pdm.options.report_employee_requested}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.producedOutcome}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.assistance_produced_protection}
                  label={Protection_ipa_pdm.options.assistance_produced_protection}
                />
              </SlidePanel>
            </Div>
          </Div>
        </>
      )}
    </Page>
  )
}
