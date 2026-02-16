import React, {useMemo, useState} from 'react'
import {map, seq} from '@axanc/ts-utils'

import {OblastISO, Va_tia_pdm} from 'infoportal-common'

import {useI18n} from '@/core/i18n'
import {useKoboSchemaContext} from '@/features/KoboSchema/KoboSchemaContext'
import {PdmData, PdmForm, useMealPdmContext} from '@/features/Meal/Pdm/Context/MealPdmContext'
import {usePdmFilters} from '@/features/Meal/Pdm/Context/usePdmFilter'
import {AgeGroupTable, DebouncedInput, Page} from '@/shared'
import {DataFilter} from '@/shared/DataFilter/DataFilter'
import {DataFilterLayout} from '@/shared/DataFilter/DataFilterLayout'
import {PeriodPicker} from '@/shared/PeriodPicker/PeriodPicker'
import {Panel, PanelBody} from '@/shared/Panel'
import {Div, SlidePanel, SlideWidget} from '@/shared/PdfLayout/PdfSlide'
import {MapSvgByOblast} from '@/shared/maps/MapSvgByOblast'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import {ChartBarMultipleBy} from '@/shared/charts/ChartBarMultipleBy'
import {useKoboTranslations} from '@/utils/hooks'

const isVictimPdm = (_: PdmData<PdmForm>): _ is PdmData<Va_tia_pdm.T> => {
  return _.type === 'Victim'
}

const officeToOblast: Record<string, OblastISO> = {
  umy: 'UA59',
  hrk: 'UA63',
  cej: 'UA74',
  nlv: 'UA48',
  iev: 'UA80',
  dnk: 'UA12',
  slo: 'UA14',
}

export const MealPdmVaDashboard = () => {
  const ctx = useMealPdmContext()
  const {shape: commonShape} = usePdmFilters(seq(ctx.fetcherAnswers.get).filter(isVictimPdm))
  const ctxSchema = useKoboSchemaContext()
  const schema = ctxSchema.byName.va_tia_pdm.get!
  const {m, formatLargeNumber} = useI18n()
  const [optionFilter, setOptionFilters] = useState<Record<string, string[] | undefined>>({})
  const {translateField} = useKoboTranslations('va_tia_pdm')

  const filterShape = useMemo(() => {
    return DataFilter.makeShape<PdmData<Va_tia_pdm.T>>({
      ...commonShape,
      access: {
        icon: 'check_circle',
        getOptions: () => DataFilter.buildOptionsFromObject(Va_tia_pdm.options.receive_help_drc),
        label: m.mealMonitoringPdm.accessibilityInterview,
        getValue: (_) => _.answers.accessibility_interview,
      },
      received: {
        icon: 'check_circle',
        getOptions: () => DataFilter.buildOptionsFromObject(Va_tia_pdm.options.receive_help_drc),
        label: m.mealMonitoringPdm.received,
        getValue: (_) => _.answers.receive_help_drc,
      },
    })
  }, [commonShape, schema])

  const data = useMemo(() => {
    return map(ctx.fetcherAnswers.get, (_) => {
      return seq(DataFilter.filterData(_.filter(isVictimPdm), filterShape, optionFilter))
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
              <Panel savableAsImg expendable title={m.location}>
                <PanelBody>
                  <MapSvgByOblast
                    sx={{maxWidth: 500, mt: 5, margin: 'auto'}}
                    data={data}
                    getOblast={(row) => officeToOblast[row.answers.office! || '']}
                    fillBaseOn="value"
                    value={(_) => true}
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
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.project_ID}
                  label={Va_tia_pdm.options.project_ID}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={translateField && translateField('receive_help_drc')}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.receive_help_drc}
                  label={Va_tia_pdm.options.receive_help_drc}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={translateField && translateField('what_assistance_drc')}>
                <ChartBarMultipleBy
                  data={data}
                  by={(_) => _.answers.what_assistance_drc}
                  label={Va_tia_pdm.options.what_assistance_drc}
                  includeNullish
                />
              </SlidePanel>
            </Div>
            <Div column>
              <SlidePanel title={m.mealMonitoringPdm.assistanceSpent}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.money_spent_yn}
                  label={Va_tia_pdm.options.money_spent}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.spentIntended}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.money_spent}
                  label={Va_tia_pdm.options.money_spent}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.rateSatisfaction}>
                <ChartBarMultipleBy
                  data={data}
                  by={({answers}) => [
                    answers.rate_satisfaction_assistance,
                    answers.rate_satisfaction_assistance_partially,
                  ]}
                  label={Va_tia_pdm.options.feel_drc_staff_security_no_001}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.scalePartially}>
                <ChartBarMultipleBy
                  data={data}
                  by={({answers}) => [answers.scale_assistance_time, answers.scale_assistance_time_partially]}
                  label={Va_tia_pdm.options.scale_assistance_time_no}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.changedFamily}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.scale_changed_family}
                  label={Va_tia_pdm.options.scale_changed_family}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.address}>
                <ChartBarMultipleBy
                  data={data}
                  by={({answers}) => [answers.know_address_feedback, answers.know_address_feedback_partially]}
                  label={Va_tia_pdm.options.feel_drc_staff_security_no_001}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.safeVa}>
                <ChartBarMultipleBy
                  data={data}
                  by={({answers}) => [answers.feel_drc_staff_security, answers.feel_drc_staff_security_partially]}
                  label={Va_tia_pdm.options.feel_drc_staff_security_no_001}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.feelTreated}>
                <ChartBarMultipleBy
                  data={data}
                  by={({answers}) => [answers.feel_drc_staff_respect, answers.feel_drc_staff_respect_partially]}
                  label={Va_tia_pdm.options.supported_improving_life_no_intended}
                  includeNullish
                />
              </SlidePanel>
            </Div>
            <Div column>
              <SlideWidget sx={{flex: 1}} icon="group" title={m.submissions}>
                {formatLargeNumber(data.length)}
              </SlideWidget>
              <SlidePanel title={m.mealMonitoringPdm.viewInConsideration}>
                <ChartBarMultipleBy
                  data={data}
                  by={({answers}) => [
                    answers.scale_situation_consideration,
                    answers.scale_situation_consideration_partially,
                  ]}
                  label={Va_tia_pdm.options.without_DRC_no}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.informingPartially}>
                <ChartBarMultipleBy
                  data={data}
                  by={({answers}) => [answers.informing, answers.informing_partially]}
                  label={Va_tia_pdm.options.without_DRC_no}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.resolveProblem}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.scale_resolve_problem}
                  label={Va_tia_pdm.options.without_DRC_no}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.challengeInAccess}>
                <ChartBarMultipleBy
                  data={data}
                  by={({answers}) => [
                    answers.scale_challenges_accessing_drc_assistance,
                    answers.scale_challenges_accessing_drc_assistance_partially,
                  ]}
                  label={Va_tia_pdm.options.scale_challenges_accessing_drc_assistance_no}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.withoutDrc}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.without_DRC}
                  label={Va_tia_pdm.options.without_DRC_no}
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
