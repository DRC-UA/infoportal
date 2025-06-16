import React, {useMemo, useState} from 'react'
import {map, seq} from '@axanc/ts-utils'
import {useI18n} from '@/core/i18n'
import {PeriodPicker} from '@/shared/PeriodPicker/PeriodPicker'
import {DebouncedInput} from '@/shared/DebouncedInput'
import {Div, SlidePanel} from '@/shared/PdfLayout/PdfSlide'
import {DataFilter} from '@/shared/DataFilter/DataFilter'
import {OblastIndex} from 'infoportal-common'
import {DataFilterLayout} from '@/shared/DataFilter/DataFilterLayout'
import {Page} from '@/shared/Page'
import {useKoboSchemaContext} from '@/features/KoboSchema/KoboSchemaContext'
import {PdmData, PdmForm, useMealPdmContext} from '@/features/Meal/Pdm/Context/MealPdmContext'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import {ChartPieWidgetBy} from '@/shared/charts/ChartPieWidgetBy'
import {AgeGroupTable} from '@/shared/AgeGroupTable'
import {Panel, PanelBody} from '@/shared/Panel'
import {MapSvgByOblast} from '@/shared/maps/MapSvgByOblast'
import {Meal_shelterPdm} from 'infoportal-common'
import {usePdmFilters} from '@/features/Meal/Pdm/Context/usePdmFilter'
import {ChartBarMultipleBy} from '@/shared/charts/ChartBarMultipleBy'
import {Txt} from '@/shared'

const mapOblast = OblastIndex.koboOblastIndexIso

const isShelterPdm = (_: PdmData<PdmForm>): _ is PdmData<Meal_shelterPdm.T> => {
  return _.type === 'Shelter'
}

const DashboardPanelTitle = ({children}: {children: React.ReactNode}) => (
  <Txt
    bold
    sx={{
      fontSize: '1.75rem',
      lineHeight: 1.3,
      color: 'text.primary',
      mt: 0.5,
      mb: 1,
    }}
  >
    {children}
  </Txt>
)

export const MealPdmShelterDashboard = () => {
  const ctx = useMealPdmContext()
  const ctxSchema = useKoboSchemaContext()
  const schema = ctxSchema.byName.meal_shelterPdm.get!
  const {shape: commonShape} = usePdmFilters(seq(ctx.fetcherAnswers.get).filter(isShelterPdm))
  const langIndex = ctxSchema.langIndex
  const {m, formatDateTime, formatDate} = useI18n()
  const [optionFilter, setOptionFilters] = useState<Record<string, string[] | undefined>>({})
  const filterShape = useMemo(() => {
    return DataFilter.makeShape<PdmData<Meal_shelterPdm.T>>({
      ...commonShape,
      raion: {
        icon: 'location_on',
        getValue: (_) => _.answers.raion,
        getOptions: () => DataFilter.buildOptionsFromObject(Meal_shelterPdm.options.raion),
        label: m.raion,
      },
      hromada: {
        icon: 'location_on',
        getValue: (_) => _.answers.hromada,
        getOptions: () => DataFilter.buildOptionsFromObject(Meal_shelterPdm.options.hromada),
        label: m.hromada,
      },
      received: {
        icon: 'check_circle',
        getOptions: () => DataFilter.buildOptionsFromObject(Meal_shelterPdm.options.responded_complaint_feed),
        label: m.mealMonitoringPdm.received,
        getValue: (_) => _.answers.Have_you_received_assistance_t,
      },
      type: {
        icon: 'handshake',
        getOptions: () => DataFilter.buildOptionsFromObject(Meal_shelterPdm.options.which_type_of_assistance_have),
        label: m.mealMonitoringPdm.type,
        getValue: (_) => _.answers.which_type_of_assistance_have,
      },
    })
  }, [commonShape, schema])

  const data = useMemo(() => {
    return map(ctx.fetcherAnswers.get, (_) => {
      return seq(DataFilter.filterData(_.filter(isShelterPdm), filterShape, optionFilter))
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
              <SlidePanel title={m.mealMonitoringPdm.whichType}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.which_type_of_assistance_have}
                  label={Meal_shelterPdm.options.which_type_of_assistance_have}
                />
              </SlidePanel>
              <SlidePanel>
                <ChartPieWidgetBy
                  dense
                  data={data}
                  title={m.mealMonitoringPdm.spent}
                  filter={(_) => _.answers.spent_cash_assistance_received === 'yes'}
                  filterBase={(_) =>
                    _.answers.spent_cash_assistance_received === 'yes' ||
                    _.answers.spent_cash_assistance_received === 'no'
                  }
                />
                <ChartPieWidgetBy
                  dense
                  data={data}
                  title={m.mealMonitoringPdm.spendOn}
                  filter={(_) => _.answers.spend_cash_received === 'yes'}
                  filterBase={(_) => _.answers.spend_cash_received === 'yes' || _.answers.spend_cash_received === 'no'}
                />
              </SlidePanel>
              <DashboardPanelTitle> {m.mealMonitoringPdm.esk} </DashboardPanelTitle>
              <SlidePanel>
                <ChartPieWidgetBy
                  dense
                  data={data}
                  title={m.mealMonitoringPdm.usedEsk}
                  filter={(_) => _.answers.used_provided_esk === 'yes'}
                  filterBase={(_) => _.answers.used_provided_esk === 'yes' || _.answers.used_provided_esk === 'no'}
                />
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.used_provided_esk}
                  label={Meal_shelterPdm.options.responded_complaint_feed}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.whoAssisted}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.used_provided_esk_001}
                  label={Meal_shelterPdm.options.Who_assisted_you_with_the_hous}
                />
              </SlidePanel>
              <SlidePanel>
                <ChartPieWidgetBy
                  dense
                  data={data}
                  title={m.mealMonitoringPdm.quantityKit}
                  filter={(_) => _.answers.quantity_given_sufficient === 'yes'}
                  filterBase={(_) =>
                    _.answers.quantity_given_sufficient === 'yes' || _.answers.quantity_given_sufficient === 'no'
                  }
                />
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.quantity_given_sufficient}
                  label={Meal_shelterPdm.options.responded_complaint_feed}
                />
              </SlidePanel>
              <SlidePanel>
                <ChartPieWidgetBy
                  dense
                  data={data}
                  title={m.mealMonitoringPdm.findUseful}
                  filter={(_) => _.answers.find_kits_useful === 'yes'}
                  filterBase={(_) => _.answers.find_kits_useful === 'yes' || _.answers.find_kits_useful === 'no'}
                />
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.find_kits_useful}
                  label={Meal_shelterPdm.options.responded_complaint_feed}
                />
              </SlidePanel>
              <DashboardPanelTitle> {m.mealMonitoringPdm.cashAssistance} </DashboardPanelTitle>
              <SlidePanel title={m.mealMonitoringPdm.whatSpent}>
                <ChartBarMultipleBy
                  data={data}
                  by={(_) => _.answers.What_have_you_spent_the_money__001}
                  label={Meal_shelterPdm.options.What_have_you_spent_the_money__001}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.coverEnough}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.Was_the_cash_assistance_enough}
                  label={Meal_shelterPdm.options._17_Are_you_planning_on_stayin}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.useBrochure}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.brochure_provided}
                  label={Meal_shelterPdm.options.brochure_provided}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.hadQuestions}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.questions_complete_repairs}
                  label={Meal_shelterPdm.options.questions_complete_repairs}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.hlpIssues}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers._9_Do_you_have_any_HLP_issues_}
                  label={Meal_shelterPdm.options.responded_complaint_feed}
                />
              </SlidePanel>
              <DashboardPanelTitle> {m.mealMonitoringPdm.overcomeBarrier} </DashboardPanelTitle>
              <SlidePanel>
                <SlidePanel title={m.mealMonitoringPdm.anotherLoc}>
                  <ChartBarSingleBy
                    data={data}
                    by={(_) => _.answers._9_Did_you_and_your_family_ha}
                    label={Meal_shelterPdm.options.responded_complaint_feed}
                  />
                </SlidePanel>
                <SlidePanel title={m.mealMonitoringPdm.enableReturn}>
                  <ChartBarSingleBy
                    data={data}
                    by={(_) => _.answers._10_Did_shelter_assistance_hel}
                    label={Meal_shelterPdm.options._17_Are_you_planning_on_stayin}
                  />
                </SlidePanel>
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.preferFuture}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers._12_How_would_your_HH_prefer_t}
                  label={Meal_shelterPdm.options._12_How_would_your_HH_prefer_t}
                />
              </SlidePanel>
              <DashboardPanelTitle> {m.mealMonitoringPdm.outcome} </DashboardPanelTitle>
              <SlidePanel title={m.mealMonitoringPdm.peopleExclude}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.needing_repair_excluded}
                  label={Meal_shelterPdm.options.report_drc_employee}
                />
              </SlidePanel>
              <SlidePanel>
                <ChartPieWidgetBy
                  dense
                  title={m.mealMonitoringPdm.treated}
                  data={data}
                  filter={(_) => _.answers.feel_treated_respect === 'yesc' || _.answers.feel_treated_respect === 'myes'}
                  filterBase={(_) =>
                    _.answers.feel_treated_respect === 'yesc' ||
                    _.answers.feel_treated_respect === 'myes' ||
                    _.answers.feel_treated_respect === 'notr' ||
                    _.answers.feel_treated_respect === 'nota' ||
                    _.answers.feel_treated_respect === 'dk' ||
                    _.answers.feel_treated_respect === 'na'
                  }
                />
                <ChartPieWidgetBy
                  dense
                  title={m.mealMonitoringPdm.wellInformed}
                  data={data}
                  filter={(_) => _.answers.feel_informed_repair === 'yesc' || _.answers.feel_informed_repair === 'myes'}
                  filterBase={(_) =>
                    _.answers.feel_informed_repair === 'yesc' ||
                    _.answers.feel_informed_repair === 'myes' ||
                    _.answers.feel_informed_repair === 'notr' ||
                    _.answers.feel_informed_repair === 'nota' ||
                    _.answers.feel_informed_repair === 'dk' ||
                    _.answers.feel_informed_repair === 'na'
                  }
                />
                <ChartPieWidgetBy
                  dense
                  title={m.mealMonitoringPdm.safeReceiving}
                  data={data}
                  filter={(_) =>
                    _.answers.safe_during_distribution === 'yesc' || _.answers.safe_during_distribution === 'myes'
                  }
                  filterBase={(_) =>
                    _.answers.safe_during_distribution === 'yesc' ||
                    _.answers.safe_during_distribution === 'myes' ||
                    _.answers.safe_during_distribution === 'notr' ||
                    _.answers.safe_during_distribution === 'nota' ||
                    _.answers.safe_during_distribution === 'dk' ||
                    _.answers.safe_during_distribution === 'na'
                  }
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
              <DashboardPanelTitle> {m.mealMonitoringPdm.safeSolution} </DashboardPanelTitle>
              <SlidePanel title={m.mealMonitoringPdm.largelySecure}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.place_largely_secure}
                  label={Meal_shelterPdm.options.place_largely_secure}
                />
              </SlidePanel>
              <SlidePanel>
                <ChartPieWidgetBy
                  dense
                  title={m.mealMonitoringPdm.culturalNeeds}
                  data={data}
                  filter={(_) => _.answers.shelter_culturally_acceptable === 'yes'}
                  filterBase={(_) =>
                    _.answers.shelter_culturally_acceptable === 'yes' ||
                    _.answers.shelter_culturally_acceptable === 'no'
                  }
                />
                <ChartPieWidgetBy
                  dense
                  title={m.mealMonitoringPdm.wishesConsider}
                  data={data}
                  filter={(_) => _.answers.planning_support_activity === 'yes'}
                  filterBase={(_) =>
                    _.answers.planning_support_activity === 'yes' || _.answers.planning_support_activity === 'no'
                  }
                />
                <ChartPieWidgetBy
                  dense
                  title={m.mealMonitoringPdm.sleepSpace}
                  data={data}
                  filter={(_) => _.answers.appropriate_sleeping_space === 'yes'}
                  filterBase={(_) =>
                    _.answers.appropriate_sleeping_space === 'yes' || _.answers.appropriate_sleeping_space === 'no'
                  }
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.howInvolved}>
                <ChartBarMultipleBy
                  data={data}
                  by={(_) => _.answers.involved_repairs_home}
                  label={Meal_shelterPdm.options.involved_repairs_home}
                />
              </SlidePanel>
              <DashboardPanelTitle> {m.mealMonitoringPdm.shelterConditions} </DashboardPanelTitle>
              <SlidePanel>
                <ChartPieWidgetBy
                  dense
                  title={m.mealMonitoringPdm.coverBasic}
                  data={data}
                  filter={(_) => _.answers.Are_you_currently_able === 'yes'}
                  filterBase={(_) =>
                    _.answers.Are_you_currently_able === 'yes' ||
                    _.answers.Are_you_currently_able === 'no' ||
                    _.answers.Are_you_currently_able === 'dk'
                  }
                />
                <ChartPieWidgetBy
                  dense
                  title={m.mealMonitoringPdm.metersPerson}
                  data={data}
                  filter={(_) => _.answers.meters_person_space === 'yes'}
                  filterBase={(_) =>
                    _.answers.meters_person_space === 'yes' ||
                    _.answers.meters_person_space === 'no' ||
                    _.answers.meters_person_space === 'dk'
                  }
                />
                <ChartPieWidgetBy
                  dense
                  title={m.mealMonitoringPdm.suitable}
                  data={data}
                  filter={(_) => _.answers.shelter_solution_standards === 'yes'}
                  filterBase={(_) =>
                    _.answers.shelter_solution_standards === 'yes' || _.answers.shelter_solution_standards === 'no'
                  }
                />
                <ChartPieWidgetBy
                  dense
                  title={m.mealMonitoringPdm.ableToFind}
                  data={data}
                  filter={(_) => _.answers.find_good_materials === 'yes'}
                  filterBase={(_) => _.answers.find_good_materials === 'yes' || _.answers.find_good_materials === 'no'}
                />
                <ChartPieWidgetBy
                  dense
                  title={m.mealMonitoringPdm.insulation}
                  data={data}
                  filter={(_) => _.answers.repairs_done_accordance === 'yes'}
                  filterBase={(_) =>
                    _.answers.repairs_done_accordance === 'yes' || _.answers.repairs_done_accordance === 'no'
                  }
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.rateQuality}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers._6_Please_rate_the_quality_of}
                  label={Meal_shelterPdm.options._6_Please_rate_the_quality_of}
                />
              </SlidePanel>
              <SlidePanel>
                <ChartPieWidgetBy
                  dense
                  title={m.mealMonitoringPdm.materialSat}
                  data={data}
                  filter={(_) => _.answers._7_Are_you_satisfied_with_the_ === 'yes'}
                  filterBase={(_) =>
                    _.answers._7_Are_you_satisfied_with_the_ === 'yes' ||
                    _.answers._7_Are_you_satisfied_with_the_ === 'no' ||
                    _.answers._7_Are_you_satisfied_with_the_ === 'other'
                  }
                />
                <ChartPieWidgetBy
                  dense
                  title={m.mealMonitoringPdm.correspondNeeds}
                  data={data}
                  filter={(_) => _.answers.received_correspond_needs === 'yes'}
                  filterBase={(_) =>
                    _.answers.received_correspond_needs === 'yes' ||
                    _.answers.received_correspond_needs === 'no' ||
                    _.answers.received_correspond_needs === 'dk'
                  }
                />
                <ChartPieWidgetBy
                  dense
                  title={m.mealMonitoringPdm.conditionsImproved}
                  data={data}
                  filter={(_) => _.answers._5_Have_living_conditions_been === 'yes'}
                  filterBase={(_) =>
                    _.answers._5_Have_living_conditions_been === 'yes' ||
                    _.answers._5_Have_living_conditions_been === 'no' ||
                    _.answers._5_Have_living_conditions_been === 'other'
                  }
                />
                <ChartPieWidgetBy
                  dense
                  title={m.mealMonitoringPdm.warmComfort}
                  data={data}
                  filter={(_) => _.answers.living_sufficiently_comfort === 'yes'}
                  filterBase={(_) =>
                    _.answers.living_sufficiently_comfort === 'yes' ||
                    _.answers.living_sufficiently_comfort === 'no' ||
                    _.answers.living_sufficiently_comfort === 'dk'
                  }
                />
                <ChartPieWidgetBy
                  dense
                  title={m.mealMonitoringPdm.thermalComfort}
                  data={data}
                  filter={(_) => _.answers.helped_thermal_comfort === 'yes'}
                  filterBase={(_) =>
                    _.answers.helped_thermal_comfort === 'yes' ||
                    _.answers.helped_thermal_comfort === 'no' ||
                    _.answers.helped_thermal_comfort === 'other'
                  }
                />
                <ChartPieWidgetBy
                  dense
                  title={m.mealMonitoringPdm.houseActivities}
                  data={data}
                  filter={(_) => _.answers._8_Has_the_re_construction_be === 'yes'}
                  filterBase={(_) =>
                    _.answers._8_Has_the_re_construction_be === 'yes' ||
                    _.answers._8_Has_the_re_construction_be === 'no' ||
                    _.answers._8_Has_the_re_construction_be === 'other'
                  }
                />
              </SlidePanel>
              <DashboardPanelTitle> {m.mealMonitoringPdm.accountabilityCRM} </DashboardPanelTitle>
              <SlidePanel>
                <ChartPieWidgetBy
                  dense
                  title={m.mealMonitoringPdm.communication}
                  data={data}
                  filter={(_) => _.answers.did_you_have_regular_commu === 'yes'}
                  filterBase={(_) =>
                    _.answers.did_you_have_regular_commu === 'yes' ||
                    _.answers.did_you_have_regular_commu === 'no' ||
                    _.answers.did_you_have_regular_commu === 'other'
                  }
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.address}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.where_address_feedback}
                  label={Meal_shelterPdm.options.report_drc_employee}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.provideFeedback}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.where_address_feedback_yes}
                  label={Meal_shelterPdm.options.where_address_feedback_yes}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.respond}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.responded_complaint_feed}
                  label={Meal_shelterPdm.options.responded_complaint_feed}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.notProvide}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.where_address_feedback_yes_no}
                  label={Meal_shelterPdm.options.where_address_feedback_yes_no}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.howReport}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.report_drc_employee}
                  label={Meal_shelterPdm.options.report_drc_employee}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.planToStay}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers._17_Are_you_planning_on_stayin}
                  label={Meal_shelterPdm.options._17_Are_you_planning_on_stayin}
                />
              </SlidePanel>
            </Div>
            <Div column>
              <Panel savableAsImg expendable title={m.location}>
                <PanelBody>
                  <MapSvgByOblast
                    sx={{maxWidth: 480, margin: 'auto'}}
                    fillBaseOn="value"
                    data={data}
                    getOblast={(_) => mapOblast[_.answers.oblast!]}
                    value={(_) => true}
                    base={(_) => _.answers.oblast !== undefined}
                  />
                </PanelBody>
              </Panel>
              <DashboardPanelTitle> {m.mealMonitoringPdm.feedback} </DashboardPanelTitle>
              <SlidePanel>
                <ChartPieWidgetBy
                  dense
                  title={m.mealMonitoringPdm.satisfiedAssistance}
                  data={data}
                  filter={(_) =>
                    _.answers.satisfied_assistance_provided === 'yesc' ||
                    _.answers.satisfied_assistance_provided === 'myes'
                  }
                  filterBase={(_) =>
                    _.answers.satisfied_assistance_provided === 'yesc' ||
                    _.answers.satisfied_assistance_provided === 'myes' ||
                    _.answers.satisfied_assistance_provided === 'notr' ||
                    _.answers.satisfied_assistance_provided === 'nota' ||
                    _.answers.satisfied_assistance_provided === 'dk' ||
                    _.answers.satisfied_assistance_provided === 'na'
                  }
                />
                <ChartPieWidgetBy
                  dense
                  title={m.mealMonitoringPdm.repaired}
                  data={data}
                  filter={(_) =>
                    _.answers.satisfied_repaired_premises === 'yesc' || _.answers.satisfied_repaired_premises === 'myes'
                  }
                  filterBase={(_) =>
                    _.answers.satisfied_repaired_premises === 'yesc' ||
                    _.answers.satisfied_repaired_premises === 'myes' ||
                    _.answers.satisfied_repaired_premises === 'notr' ||
                    _.answers.satisfied_repaired_premises === 'na' ||
                    _.answers.satisfied_repaired_premises === 'dk' ||
                    _.answers.satisfied_repaired_premises === 'nota'
                  }
                />
                <ChartPieWidgetBy
                  dense
                  title={m.mealMonitoringPdm.eskContent}
                  data={data}
                  filter={(_) =>
                    _.answers.satisfied_esk_content === 'yesc' || _.answers.satisfied_esk_content === 'myes'
                  }
                  filterBase={(_) =>
                    _.answers.satisfied_esk_content === 'yesc' ||
                    _.answers.satisfied_esk_content === 'myes' ||
                    _.answers.satisfied_esk_content === 'notr' ||
                    _.answers.satisfied_esk_content === 'nota' ||
                    _.answers.satisfied_esk_content === 'dk' ||
                    _.answers.satisfied_esk_content === 'na'
                  }
                />
                <ChartPieWidgetBy
                  dense
                  title={m.mealMonitoringPdm.qualityKit}
                  data={data}
                  filter={(_) =>
                    _.answers.satisfied_esk_quality === 'yesc' || _.answers.satisfied_esk_quality === 'myes'
                  }
                  filterBase={(_) =>
                    _.answers.satisfied_esk_quality === 'yesc' ||
                    _.answers.satisfied_esk_quality === 'myes' ||
                    _.answers.satisfied_esk_quality === 'notr' ||
                    _.answers.satisfied_esk_quality === 'nota' ||
                    _.answers.satisfied_esk_quality === 'dk' ||
                    _.answers.satisfied_esk_quality === 'na'
                  }
                />
                <ChartPieWidgetBy
                  dense
                  title={m.mealMonitoringPdm.timely}
                  data={data}
                  filter={(_) => _.answers.assistance_provided_project === 'yes'}
                  filterBase={(_) =>
                    _.answers.assistance_provided_project === 'yes' ||
                    _.answers.assistance_provided_project === 'no' ||
                    _.answers.assistance_provided_project === 'other'
                  }
                />
              </SlidePanel>
              <DashboardPanelTitle> {m.mealMonitoringPdm.delivery} </DashboardPanelTitle>
              <SlidePanel title={m.mealMonitoringPdm.assistanceReceive}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.assistance_delivered}
                  label={Meal_shelterPdm.options.assistance_delivered}
                />
              </SlidePanel>
              <SlidePanel>
                <ChartPieWidgetBy
                  dense
                  title={m.mealMonitoringPdm.satisfiedProcess}
                  data={data}
                  filter={(_) => _.answers.satisfied_process === 'ndyl' || _.answers.satisfied_process === 'ndyf'}
                  filterBase={(_) =>
                    _.answers.satisfied_process === 'ndna' ||
                    _.answers.satisfied_process === 'ndyl' ||
                    _.answers.satisfied_process === 'ndnr' ||
                    _.answers.satisfied_process === 'ndyf'
                  }
                />
                <ChartPieWidgetBy
                  dense
                  title={m.mealMonitoringPdm.satisfiedAmount}
                  data={data}
                  filter={(_) => _.answers.satisfied_cash_amount === 'yes'}
                  filterBase={(_) =>
                    _.answers.satisfied_cash_amount === 'yes' || _.answers.satisfied_cash_amount === 'no'
                  }
                />
                <ChartPieWidgetBy
                  dense
                  title={m.mealMonitoringPdm.howMuch}
                  data={data}
                  filter={(_) => _.answers.how_much_money === 'yes'}
                  filterBase={(_) => _.answers.how_much_money === 'yes' || _.answers.how_much_money === 'no'}
                />
                <ChartPieWidgetBy
                  dense
                  title={m.mealMonitoringPdm.provideInfo}
                  data={data}
                  filter={(_) => _.answers.organization_provide_information === 'yes'}
                  filterBase={(_) =>
                    _.answers.organization_provide_information === 'yes' ||
                    _.answers.organization_provide_information === 'no'
                  }
                />
                <ChartPieWidgetBy
                  dense
                  title={m.mealMonitoringPdm.problems}
                  data={data}
                  filter={(_) => _.answers.experience_problems === 'yes'}
                  filterBase={(_) => _.answers.experience_problems === 'yes' || _.answers.experience_problems === 'no'}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.receiveLess}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.how_much_money_yes}
                  label={Meal_shelterPdm.options.how_much_money_yes}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.howMuchTake}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.time_registered_assistance}
                  label={Meal_shelterPdm.options.time_registered_assistance}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.doneBetter}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.better_inform_distribution}
                  label={Meal_shelterPdm.options.better_inform_distribution}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.overallEvaluate}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.process_assistance_delivery}
                  label={Meal_shelterPdm.options.process_assistance_delivery}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.carryKit}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.carry_kit_received}
                  label={Meal_shelterPdm.options.carry_kit_received}
                />
              </SlidePanel>
              <DashboardPanelTitle> {m.mealMonitoringPdm.outstandingNeeds} </DashboardPanelTitle>
              <SlidePanel title={m.mealMonitoringPdm.priorityNeeds}>
                <ChartBarMultipleBy
                  data={data}
                  by={(_) => _.answers.top3_priority_needs}
                  label={Meal_shelterPdm.options.top3_priority_needs}
                />
              </SlidePanel>
            </Div>
          </Div>
        </>
      )}
    </Page>
  )
}
