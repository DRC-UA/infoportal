import {Fragment, useMemo, useState} from 'react'
import {map, seq} from '@axanc/ts-utils'
import {Box, TextField} from '@mui/material'

import {Legal_pam, OblastIndex, uppercaseHandlingAcronyms} from 'infoportal-common'

import {useI18n} from '@/core/i18n'
import {PdmData, PdmForm, useMealPdmContext} from '@/features/Meal/Pdm/Context/MealPdmContext'
import {useKoboSchemaContext} from '@/features/KoboSchema/KoboSchemaContext'
import {usePdmFilters} from '@/features/Meal/Pdm/Context/usePdmFilter'
import {AgeGroupTable, DebouncedInput, Page, Txt} from '@/shared'
import {ChartPieWidgetBy} from '@/shared/charts/ChartPieWidgetBy'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import {ChartBarMultipleBy} from '@/shared/charts/ChartBarMultipleBy'
import {DataFilter} from '@/shared/DataFilter/DataFilter'
import {DataFilterLayout} from '@/shared/DataFilter/DataFilterLayout'
import {MapSvgByOblast} from '@/shared/maps/MapSvgByOblast'
import {Panel, PanelBody} from '@/shared/Panel'
import {PeriodPicker} from '@/shared/PeriodPicker/PeriodPicker'
import {Div, SlidePanel} from '@/shared/PdfLayout/PdfSlide'
import {useKoboTranslations} from '@/utils'

import {ChartSubtitle, SectionTitle} from './shared'

const isLegalPdm = (_: PdmData<PdmForm>): _ is PdmData<Legal_pam.T> => {
  return _.type === 'Legal'
}

export const PdmLegalDashboard = () => {
  const ctx = useMealPdmContext()
  const ctxSchema = useKoboSchemaContext()
  const schema = ctxSchema.byName.legal_pam.get!
  const {shape: commonShape} = usePdmFilters(seq(ctx.fetcherAnswers.get).filter(isLegalPdm))
  const {m} = useI18n()
  const [optionFilter, setOptionFilters] = useState<Record<string, string[] | undefined>>({})
  const [interviewPeriod, setInterviewPeriod] = useState<[Date | undefined, Date | undefined]>([undefined, undefined])
  const [uniqueId, setUniqueId] = useState<string>('')
  const {translateField, translateLabels} = useKoboTranslations('legal_pam')
  const filterShape = useMemo(() => {
    const {oblast, office, project} = commonShape
    return DataFilter.makeShape<PdmData<Legal_pam.T>>({
      office,
      oblast,
      raion: {
        icon: 'location_on',
        getValue: (_) => _.answers.ben_det_raion,
        getOptions: () => DataFilter.buildOptionsFromObject(Legal_pam.options.ben_det_raion),
        label: m.raion,
      },
      hromada: {
        icon: 'location_on',
        getValue: (_) => _.answers.ben_det_hromada,
        getOptions: () => DataFilter.buildOptionsFromObject(Legal_pam.options.ben_det_hromada),
        label: m.hromada,
      },
      project,
      type_implementation: {
        icon: 'handshake',
        getOptions: () => DataFilter.buildOptionsFromObject(Legal_pam.options.implanting_actor),
        label: m.mealMonitoringPdm.partner_type,
        getValue: (_) => _.answers.implanting_actor,
      },
      partner: {
        icon: 'forum',
        getOptions: () => DataFilter.buildOptionsFromObject(Legal_pam.options.name_partner),
        label: m.partnerName,
        getValue: (_) => _.answers.name_partner,
      },
      assistanceType: {
        icon: 'check_box',
        getOptions: () => DataFilter.buildOptionsFromObject(Legal_pam.options.type_assistance),
        label: translateField('type_assistance') ?? '',
        getValue: (_) => _.answers.type_assistance,
      },
    })
  }, [commonShape, schema])

  const data = useMemo(() => {
    return map(ctx.fetcherAnswers.get, (_) => {
      let filtered = _.filter(isLegalPdm)

      const ids = uniqueId
        .split(/\s+/)
        .map((id) => id.trim())
        .filter(Boolean)

      if (ids.length > 0) {
        filtered = filtered.filter((d) => ids.some((id) => d.answers.unique_number?.toString().includes(id)))
      }

      if (interviewPeriod[0] || interviewPeriod[1]) {
        filtered = filtered.filter((d) => {
          const date = d.answers.date_interview
          if (!date) return false
          return (
            (!interviewPeriod[0] || date >= interviewPeriod[0]) && (!interviewPeriod[1] || date <= interviewPeriod[1])
          )
        })
      }

      if (ctx.periodFilter.start || ctx.periodFilter.end) {
        filtered = filtered.filter((d) => {
          const date = d.answers.date
          if (!date) return false
          return (
            (!ctx.periodFilter.start || date >= ctx.periodFilter.start) &&
            (!ctx.periodFilter.end || date <= ctx.periodFilter.end)
          )
        })
      }

      return seq(DataFilter.filterData(filtered, filterShape, optionFilter))
    })
  }, [ctx.fetcherAnswers.get, optionFilter, filterShape, uniqueId, interviewPeriod, ctx.periodFilter])

  return (
    <Page width="lg" loading={ctx.fetcherAnswers.loading}>
      <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2}}>
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
          <Txt size="small" color="primary" sx={{ml: 0.5, mb: 0.5}}>
            Submitted at
          </Txt>
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
                fullWidth={false}
              />
            )}
          </DebouncedInput>
        </Box>

        <Box sx={{display: 'flex', flexDirection: 'column'}}>
          <Txt size="small" color="primary" sx={{ml: 0.5, mb: 0.5}}>
            Date of Interview
          </Txt>
          <DebouncedInput<[Date | undefined, Date | undefined]>
            debounce={400}
            value={interviewPeriod}
            onChange={setInterviewPeriod}
          >
            {(value, onChange) => <PeriodPicker value={value} onChange={onChange} fullWidth={false} />}
          </DebouncedInput>
        </Box>

        <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'}}>
          <TextField
            placeholder="Unique ID"
            variant="outlined"
            size="small"
            value={uniqueId}
            onChange={(e) => setUniqueId(e.target.value)}
            sx={{minWidth: 220}}
          />
        </Box>
      </Box>

      <Box sx={{mb: 3}}>
        <DataFilterLayout shapes={filterShape} filters={optionFilter} setFilters={setOptionFilters} />
      </Box>
      {data && (
        <>
          <Div responsive>
            <Div column>
              <Panel savableAsImg expendable title={m.location}>
                <PanelBody>
                  <MapSvgByOblast
                    sx={{maxWidth: 480, margin: 'auto'}}
                    fillBaseOn="value"
                    data={data}
                    getOblast={(_) => OblastIndex.byName(_.oblast)?.iso!}
                    total={data.filter(({answers: {ben_det_oblast}}) => ben_det_oblast !== undefined).length}
                  />
                </PanelBody>
              </Panel>
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
            </Div>
            <Div column>
              <SlidePanel title={m.assistance}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.type_assistance}
                  label={Legal_pam.options.type_assistance}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.partnerName}>
                <ChartBarSingleBy
                  data={data}
                  by={({answers: {name_partner}}) => name_partner}
                  label={Legal_pam.options.name_partner}
                />
                <ChartSubtitle subtitle={translateField('name_partner_other')} />
                <ChartBarSingleBy data={data} by={({answers: {name_partner_other}}) => name_partner_other} />
              </SlidePanel>
            </Div>
          </Div>
          <SectionTitle title={m.mealMonitoringPdm.outcomeAssistance} />
          <Div responsive>
            <Div column>
              <SlidePanel title={m.mealMonitoringPdm.legalIssue}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.support_resolving_issue}
                  label={Legal_pam.options.support_resolving_issue}
                  includeNullish
                />
                <ChartSubtitle subtitle={translateField('support_resolving_issue_other')} />
                <ChartBarSingleBy
                  data={data}
                  by={({answers: {support_resolving_issue_other}}) => support_resolving_issue_other}
                  limitChartHeight={360}
                />
                <ChartSubtitle subtitle={translateField('applied_second')} />
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.applied_second}
                  label={Legal_pam.options.applied_second}
                />
                <ChartSubtitle subtitle={translateField('not_applied_second')} />
                <ChartBarSingleBy
                  data={data}
                  by={({answers: {not_applied_second}}) => not_applied_second}
                  limitChartHeight={360}
                />
              </SlidePanel>
            </Div>
            <Div column>
              <SlidePanel title={m.mealMonitoringPdm.benefits}>
                <ChartBarMultipleBy
                  data={data}
                  by={(_) => _.answers.received_additional_benefits}
                  label={Legal_pam.options.received_additional_benefits}
                  includeNullish
                />
                <ChartSubtitle subtitle={translateField('received_additional_benefits_other')} />
                <ChartBarSingleBy
                  data={data}
                  by={({answers: {received_additional_benefits_other}}) => received_additional_benefits_other}
                  limitChartHeight={360}
                />
                <ChartSubtitle subtitle={translateField('not_received_benefits')} />
                <ChartBarSingleBy
                  data={data}
                  by={({answers: {not_received_benefits}}) => not_received_benefits}
                  limitChartHeight={360}
                />
              </SlidePanel>
            </Div>
            <Div column>
              <SlidePanel>
                <ChartPieWidgetBy
                  dense
                  title={m.mealMonitoringPdm.contactedAdd}
                  data={data}
                  filter={(_) => _.answers.contacted_additionally_lawyer === 'yes'}
                  sx={{mb: 1, minHeight: 20}}
                />
                <ChartPieWidgetBy
                  dense
                  title={m.mealMonitoringPdm.incurFees}
                  data={data}
                  filter={(_) => _.answers.incur_legal_fees === 'no'}
                  sx={{mb: 1, minHeight: 20}}
                />
                <ChartPieWidgetBy
                  title={m.mealMonitoringPdm.independtlyResolve}
                  dense
                  data={data}
                  filter={(_) => _.answers.legal_fees_covered === 'no'}
                  sx={{mb: 1, minHeight: 20}}
                />
              </SlidePanel>
              <SlidePanel title={translateField('legal_fees_covered')}>
                <ChartBarSingleBy
                  data={data}
                  by={({answers: {legal_fees_covered}}) => legal_fees_covered}
                  label={translateLabels('legal_fees_covered')}
                  includeNullish
                />
                <ChartSubtitle subtitle={translateField('legal_fees_covered_no')} />
                <ChartBarSingleBy
                  data={data}
                  by={({answers: {legal_fees_covered_no}}) => legal_fees_covered_no}
                  limitChartHeight={360}
                />
              </SlidePanel>
            </Div>
          </Div>
          <SectionTitle title={translateField('quality')} />
          <Div responsive>
            <Div column>
              <SlidePanel title={m.mealMonitoringPdm.feedback}>
                <ChartPieWidgetBy
                  dense
                  title={m.mealMonitoringPdm.satisfiedAssistance}
                  sx={{mb: 1, minHeight: 20}}
                  data={data}
                  filter={(_) =>
                    _.answers.overall_satisfied_assistance_outcome === 'yes_completely' ||
                    _.answers.overall_satisfied_assistance_outcome === 'mostly_yes'
                  }
                  filterBase={(_) =>
                    _.answers.overall_satisfied_assistance_outcome === 'yes_completely' ||
                    _.answers.overall_satisfied_assistance_outcome === 'mostly_yes' ||
                    _.answers.overall_satisfied_assistance_outcome === 'not_really' ||
                    _.answers.overall_satisfied_assistance_outcome === 'not_all' ||
                    _.answers.overall_satisfied_assistance_outcome === 'dk' ||
                    _.answers.overall_satisfied_assistance_outcome === 'no_answer'
                  }
                />
                <ChartPieWidgetBy
                  dense
                  title={m.mealMonitoringPdm.treated}
                  sx={{mb: 1, minHeight: 20}}
                  data={data}
                  filter={(_) =>
                    _.answers.feel_staff_respect === 'yes_completely' || _.answers.feel_staff_respect === 'mostly_yes'
                  }
                  filterBase={(_) =>
                    _.answers.feel_staff_respect === 'yes_completely' ||
                    _.answers.feel_staff_respect === 'mostly_yes' ||
                    _.answers.feel_staff_respect === 'not_really' ||
                    _.answers.feel_staff_respect === 'not_all' ||
                    _.answers.feel_staff_respect === 'dk' ||
                    _.answers.feel_staff_respect === 'no_answer'
                  }
                />
                <ChartPieWidgetBy
                  dense
                  title={m.mealMonitoringPdm.safeReceiving}
                  sx={{mb: 1, minHeight: 20}}
                  data={data}
                  filter={(_) =>
                    _.answers.safe_times_receiving === 'yes_completely' ||
                    _.answers.safe_times_receiving === 'mostly_yes'
                  }
                  filterBase={(_) =>
                    _.answers.safe_times_receiving === 'yes_completely' ||
                    _.answers.safe_times_receiving === 'mostly_yes' ||
                    _.answers.safe_times_receiving === 'not_really' ||
                    _.answers.safe_times_receiving === 'not_all' ||
                    _.answers.safe_times_receiving === 'dk' ||
                    _.answers.safe_times_receiving === 'no_answer'
                  }
                />
                <ChartPieWidgetBy
                  dense
                  title={m.mealMonitoringPdm.wellInformed}
                  data={data}
                  filter={(_) =>
                    _.answers.informed_free_legal === 'yes_completely' || _.answers.informed_free_legal === 'mostly_yes'
                  }
                  filterBase={(_) =>
                    _.answers.informed_free_legal === 'yes_completely' ||
                    _.answers.informed_free_legal === 'mostly_yes' ||
                    _.answers.informed_free_legal === 'not_really' ||
                    _.answers.informed_free_legal === 'not_all' ||
                    _.answers.informed_free_legal === 'dk' ||
                    _.answers.informed_free_legal === 'no_answer'
                  }
                />
                <ChartPieWidgetBy
                  dense
                  title={m.mealMonitoringPdm.clearExplanation}
                  sx={{mb: 1, minHeight: 20}}
                  data={data}
                  filter={(_) =>
                    Array.isArray(_.answers.clear_explanations_legal) &&
                    (_.answers.clear_explanations_legal.includes('always') ||
                      _.answers.clear_explanations_legal.includes('mostly'))
                  }
                  filterBase={(_) =>
                    Array.isArray(_.answers.clear_explanations_legal) &&
                    (_.answers.clear_explanations_legal.includes('always') ||
                      _.answers.clear_explanations_legal.includes('mostly') ||
                      _.answers.clear_explanations_legal.includes('not'))
                  }
                />
                <ChartPieWidgetBy
                  dense
                  title={m.mealMonitoringPdm.infoUnderstandable}
                  sx={{mb: 1, minHeight: 20}}
                  data={data}
                  filter={(_) =>
                    _.answers.information_provided_clear === 'yes' || _.answers.information_provided_clear === 'mostly'
                  }
                  filterBase={(_) =>
                    _.answers.information_provided_clear === 'yes' ||
                    _.answers.information_provided_clear === 'mostly' ||
                    _.answers.information_provided_clear === 'not'
                  }
                />
                <ChartSubtitle subtitle={translateField('overall_satisfied_assistance_outcome_no')} />
                <ChartBarSingleBy
                  data={data}
                  by={({answers: {overall_satisfied_assistance_outcome_no}}) => overall_satisfied_assistance_outcome_no}
                  limitChartHeight={360}
                />
              </SlidePanel>
            </Div>
            <Div column>
              <SlidePanel title={translateField('information_provided_clear')}>
                <ChartBarSingleBy
                  data={data}
                  by={({answers: {information_provided_clear}}) => information_provided_clear}
                  label={translateLabels('information_provided_clear')}
                />
                <ChartSubtitle subtitle={translateField('information_not_clear')} />
                <ChartBarSingleBy
                  data={data}
                  by={({answers: {information_not_clear}}) => information_not_clear}
                  label={translateLabels('information_not_clear')}
                  limitChartHeight={360}
                />
                <ChartSubtitle subtitle={translateField('clear_explanations_legal')} />
                <ChartBarMultipleBy
                  data={data}
                  by={({answers: {clear_explanations_legal}}) => clear_explanations_legal}
                  label={translateLabels('clear_explanations_legal')}
                />
                <ChartSubtitle subtitle={translateField('clarify_explanations_not_clear')} />
                <ChartBarSingleBy
                  data={data}
                  by={({answers: {clarify_explanations_not_clear}}) => clarify_explanations_not_clear}
                  limitChartHeight={360}
                />
                <ChartSubtitle subtitle={translateField('more_explanations_not_clear')} />
                <ChartBarSingleBy
                  data={data}
                  by={({answers: {more_explanations_not_clear}}) => more_explanations_not_clear}
                  limitChartHeight={360}
                />
              </SlidePanel>
            </Div>
            <Div column>
              <SlidePanel title={m.mealMonitoringPdm.provisionHelped}>
                <ChartBarSingleBy
                  data={data}
                  by={({answers: {provision_legal_enhanced}}) => provision_legal_enhanced}
                  label={translateLabels('provision_legal_enhanced')}
                  includeNullish
                />
                <ChartSubtitle subtitle={translateField('provision_legal_enhanced_no')} />
                <ChartBarSingleBy
                  data={data}
                  by={({answers: {provision_legal_enhanced_no}}) => provision_legal_enhanced_no}
                  limitChartHeight={360}
                />
              </SlidePanel>
            </Div>
          </Div>
          <SectionTitle title={m.mealMonitoringPdm.accountability} />
          <Div responsive>
            <Div column>
              <SlidePanel title={translateField('informed_free_legal')}>
                <ChartBarSingleBy
                  data={data}
                  by={({answers: {informed_free_legal}}) => informed_free_legal}
                  label={translateLabels('informed_free_legal')}
                  includeNullish
                />
                <ChartSubtitle subtitle={translateField('informed_free_legal_not')} />
                <ChartBarSingleBy
                  data={data}
                  by={({answers: {informed_free_legal_not}}) => informed_free_legal_not}
                  limitChartHeight={360}
                />
              </SlidePanel>
              <SlidePanel title={translateField('how_hear_drc')}>
                <ChartBarMultipleBy
                  data={data}
                  by={({answers: {how_hear_drc}}) => how_hear_drc}
                  label={translateLabels('how_hear_drc')}
                  includeNullish
                />
                {(['how_hear_friend', 'how_hear_ngo', 'how_hear_other'] as const).map((field) => (
                  <Fragment key={field}>
                    <ChartSubtitle subtitle={translateField(field)} />
                    <ChartBarSingleBy data={data} by={({answers}) => answers[field]} limitChartHeight={360} />
                  </Fragment>
                ))}
              </SlidePanel>
            </Div>
            <Div column>
              <SlidePanel title={m.mealMonitoringPdm.howReport}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.report_drc_employee}
                  label={Legal_pam.options.overall_satisfied_assistance_accountability}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.channel}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.suggestion_problem_assistance}
                  label={Legal_pam.options.overall_satisfied_assistance_accountability}
                  includeNullish
                />
                <ChartSubtitle subtitle={translateField('yes_suggestion_problem')} />
                <ChartBarSingleBy
                  data={data}
                  by={({answers: {yes_suggestion_problem}}) => yes_suggestion_problem}
                  label={translateLabels('yes_suggestion_problem')}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.responded}>
                <ChartBarSingleBy
                  data={data}
                  by={({answers: {knowledge_suggestions_complained}}) => knowledge_suggestions_complained}
                  label={translateLabels('knowledge_suggestions_complained')}
                  includeNullish
                />
                <ChartSubtitle subtitle={translateField('knowledge_suggestions_complained_no')} />
                <ChartBarSingleBy
                  data={data}
                  by={({answers: {knowledge_suggestions_complained_no}}) => knowledge_suggestions_complained_no}
                  label={translateLabels('knowledge_suggestions_complained_no')}
                  limitChartHeight={360}
                />
              </SlidePanel>
              <SlidePanel title={translateField('immediately_contact_lawyer')}>
                <ChartBarSingleBy
                  data={data}
                  by={({answers: {immediately_contact_lawyer}}) => immediately_contact_lawyer}
                  label={translateLabels('immediately_contact_lawyer')}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={`${translateField('waiting_time_point')} [ in weeks ]`}>
                <ChartBarSingleBy
                  data={data}
                  by={({answers: {waiting_time_point}}) => String(waiting_time_point)}
                  label={translateLabels('waiting_time_point')}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={translateField('opinion_legal_assistance')}>
                <ChartBarSingleBy
                  data={data}
                  by={({answers: {opinion_legal_assistance}}) => opinion_legal_assistance}
                  label={translateLabels('opinion_legal_assistance')}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={translateField('situation_into_consideration')}>
                <ChartBarSingleBy
                  data={data}
                  by={({answers: {situation_into_consideration}}) => situation_into_consideration}
                  label={translateLabels('situation_into_consideration')}
                  includeNullish
                />
                <ChartSubtitle subtitle={translateField('situation_into_consideration_no')} />
                <ChartBarSingleBy
                  data={data}
                  by={({answers: {situation_into_consideration_no}}) => situation_into_consideration_no}
                  label={translateLabels('situation_into_consideration_no')}
                  limitChartHeight={360}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.listened}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.lawyer_listened_actively}
                  label={Legal_pam.options.lawyer_listened_actively}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.difficultiesLawyer}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.encounter_difficulties_lawyer}
                  label={Legal_pam.options.encounter_difficulties_lawyer}
                  includeNullish
                />
                <ChartSubtitle subtitle={translateField('encounter_difficulties_lawyer_yes')} />
                <ChartBarSingleBy
                  data={data}
                  by={({answers: {encounter_difficulties_lawyer_yes}}) => encounter_difficulties_lawyer_yes}
                  label={translateLabels('encounter_difficulties_lawyer_yes')}
                />
              </SlidePanel>
            </Div>
            <Div column>
              <SlidePanel title={translateField('safe_times_receiving')}>
                <ChartBarSingleBy
                  data={data}
                  by={({answers: {safe_times_receiving}}) => safe_times_receiving}
                  label={translateLabels('safe_times_receiving')}
                  includeNullish
                />
                <ChartSubtitle subtitle={translateField('safe_times_receiving_no')} />
                <ChartBarSingleBy
                  data={data}
                  by={({answers: {safe_times_receiving_no}}) => safe_times_receiving_no}
                  label={translateLabels('safe_times_receiving_no')}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.peopleExcluded}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.know_people_need_legal}
                  label={Legal_pam.options.know_people_need_legal}
                  includeNullish
                />
                <ChartSubtitle subtitle={translateField('people_need_legal')} />
                <ChartBarMultipleBy
                  data={data}
                  by={({answers: {people_need_legal}}) => people_need_legal}
                  label={translateLabels('people_need_legal')}
                  includeNullish
                />
                <ChartSubtitle subtitle={translateField('people_need_legal_other')} />
                <ChartBarSingleBy
                  data={data}
                  by={({answers: {people_need_legal_other}}) => people_need_legal_other}
                  limitChartHeight={360}
                />
              </SlidePanel>
              <SlidePanel title={translateField('feel_staff_respect')}>
                <ChartBarSingleBy
                  data={data}
                  by={({answers: {feel_staff_respect}}) => feel_staff_respect}
                  label={translateLabels('feel_staff_respect')}
                  includeNullish
                />
                <ChartSubtitle subtitle={translateField('feel_staff_respect_no')} />
                <ChartBarSingleBy
                  data={data}
                  by={({answers: {feel_staff_respect_no}}) => feel_staff_respect_no}
                  label={translateLabels('feel_staff_respect_no')}
                  limitChartHeight={360}
                />
              </SlidePanel>
              <SlidePanel title={translateField('overall_satisfied_assistance_accountability')}>
                <ChartBarSingleBy
                  data={data}
                  by={({answers: {overall_satisfied_assistance_accountability}}) =>
                    overall_satisfied_assistance_accountability
                  }
                  label={translateLabels('overall_satisfied_assistance_accountability')}
                  includeNullish
                />
                <ChartSubtitle subtitle={translateField('overall_satisfied_assistance_accountability_no')} />
                <ChartBarSingleBy
                  data={data}
                  by={({answers: {overall_satisfied_assistance_accountability_no}}) =>
                    overall_satisfied_assistance_accountability_no
                  }
                  label={translateLabels('overall_satisfied_assistance_accountability_no')}
                  limitChartHeight={360}
                />
              </SlidePanel>
            </Div>
          </Div>
          <SectionTitle title={translateField('outstanding')} />
          <Div responsive>
            <Div column>
              <SlidePanel title={translateField('outstanding_legal_needs')}>
                <ChartBarSingleBy
                  data={data}
                  by={({answers: {outstanding_legal_needs}}) => outstanding_legal_needs}
                  label={translateLabels('outstanding_legal_needs')}
                  includeNullish
                />
                <ChartSubtitle subtitle={translateField('outstanding_legal_needs_yes')} />
                <ChartBarMultipleBy
                  data={data}
                  by={({answers: {outstanding_legal_needs_yes}}) => outstanding_legal_needs_yes}
                  label={translateLabels('outstanding_legal_needs_yes')}
                  limitChartHeight={360}
                />
              </SlidePanel>
            </Div>
            <Div column>
              <SlidePanel title={translateField('further_comments')}>
                <ChartBarSingleBy
                  data={data}
                  by={({answers: {further_comments}}) => further_comments}
                  label={translateLabels('further_comments')}
                  limitChartHeight={360}
                />
              </SlidePanel>
            </Div>
            <Div column>
              <SlidePanel title={translateField('interviewer_comments')}>
                <ChartBarSingleBy
                  data={data}
                  by={({answers: {interviewer_comments}}) => interviewer_comments}
                  label={translateLabels('interviewer_comments')}
                  limitChartHeight={360}
                />
              </SlidePanel>
            </Div>
          </Div>
        </>
      )}
    </Page>
  )
}
