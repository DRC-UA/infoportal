import {PdmData, PdmForm, useMealPdmContext} from '@/features/Meal/Pdm/Context/MealPdmContext'
import {Legal_pam, OblastIndex} from 'infoportal-common'
import React, {useMemo, useState} from 'react'
import {map, seq} from '@axanc/ts-utils'
import {DataFilter} from '@/shared/DataFilter/DataFilter'
import {useKoboSchemaContext} from '@/features/KoboSchema/KoboSchemaContext'
import {usePdmFilters} from '@/features/Meal/Pdm/Context/usePdmFilter'
import {useI18n} from '@/core/i18n'
import {AgeGroupTable, DebouncedInput, Page, Txt} from '@/shared'
import {DataFilterLayout} from '@/shared/DataFilter/DataFilterLayout'
import {PeriodPicker} from '@/shared/PeriodPicker/PeriodPicker'
import {Div, SlidePanel} from '@/shared/PdfLayout/PdfSlide'
import {Panel, PanelBody} from '@/shared/Panel'
import {MapSvgByOblast} from '@/shared/maps/MapSvgByOblast'
import {ChartPieWidgetBy} from '@/shared/charts/ChartPieWidgetBy'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import {ChartBarMultipleBy} from '@/shared/charts/ChartBarMultipleBy'
import {Box, TextField} from '@mui/material'

const isLegalPdm = (_: PdmData<PdmForm>): _ is PdmData<Legal_pam.T> => {
  return _.type === 'Legal'
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

export const PdmLegalDashboard = () => {
  const ctx = useMealPdmContext()
  const ctxSchema = useKoboSchemaContext()
  const schema = ctxSchema.byName.legal_pam.get!
  const {shape: commonShape} = usePdmFilters(seq(ctx.fetcherAnswers.get).filter(isLegalPdm))
  const langIndex = ctxSchema.langIndex
  const {m, formatDateTime, formatDate} = useI18n()
  const [optionFilter, setOptionFilters] = useState<Record<string, string[] | undefined>>({})
  const [interviewPeriod, setInterviewPeriod] = useState<[Date | undefined, Date | undefined]>([undefined, undefined])
  const [uniqueId, setUniqueId] = useState<string>('')
  const filterShape = useMemo(() => {
    return DataFilter.makeShape<PdmData<Legal_pam.T>>({
      ...commonShape,
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
      <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2}}>
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
              <Panel>
                <SlidePanel title={m.assistance}>
                  <ChartBarSingleBy
                    data={data}
                    by={(_) => _.answers.type_assistance}
                    label={Legal_pam.options.type_assistance}
                    includeNullish
                  />
                </SlidePanel>
                <SlidePanel title={m.mealMonitoringPdm.benefits}>
                  <ChartBarMultipleBy
                    data={data}
                    by={(_) => _.answers.received_additional_benefits}
                    label={Legal_pam.options.received_additional_benefits}
                    includeNullish
                  />
                </SlidePanel>
              </Panel>
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
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.provisionHelped}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.provision_legal_enhanced}
                  label={Legal_pam.options.provision_legal_enhanced}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.howHear}>
                <ChartBarMultipleBy
                  data={data}
                  by={(_) => _.answers.how_hear_drc}
                  label={Legal_pam.options.how_hear_drc}
                  includeNullish
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
                    getOblast={(_) => OblastIndex.byName(_.oblast)?.iso!}
                    value={(_) => true}
                    base={(_) => _.answers.ben_det_oblast !== undefined}
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
              <Panel title={<DashboardPanelTitle>{m.mealMonitoringPdm.outcomeAssistance}</DashboardPanelTitle>}>
                <SlidePanel title={m.mealMonitoringPdm.legalIssue}>
                  <ChartBarSingleBy
                    data={data}
                    by={(_) => _.answers.support_resolving_issue}
                    label={Legal_pam.options.support_resolving_issue}
                    includeNullish
                  />
                </SlidePanel>
                <SlidePanel title={m.mealMonitoringPdm.secondTime}>
                  <ChartBarSingleBy
                    data={data}
                    by={(_) => _.answers.applied_second}
                    label={Legal_pam.options.applied_second}
                    includeNullish
                  />
                </SlidePanel>
              </Panel>
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
            </Div>
            <Div column>
              <Panel title={<DashboardPanelTitle>{m.mealMonitoringPdm.accountability}</DashboardPanelTitle>}>
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
                </SlidePanel>
                <SlidePanel title={m.mealMonitoringPdm.contactedChannel}>
                  <ChartBarSingleBy
                    data={data}
                    by={(_) => _.answers.yes_suggestion_problem}
                    label={Legal_pam.options.yes_suggestion_problem}
                    includeNullish
                  />
                </SlidePanel>
                <SlidePanel title={m.mealMonitoringPdm.responded}>
                  <ChartBarSingleBy
                    data={data}
                    by={(_) => _.answers.knowledge_suggestions_complained}
                    label={Legal_pam.options.overall_satisfied_assistance_accountability}
                    includeNullish
                  />
                </SlidePanel>
                <SlidePanel title={m.mealMonitoringPdm.putContact}>
                  <ChartBarSingleBy
                    data={data}
                    by={(_) => _.answers.immediately_contact_lawyer}
                    label={Legal_pam.options.outstanding_legal_needs}
                    includeNullish
                  />
                </SlidePanel>
                <SlidePanel title={m.mealMonitoringPdm.consideration}>
                  <ChartBarSingleBy
                    data={data}
                    by={(_) => _.answers.situation_into_consideration}
                    label={Legal_pam.options.overall_satisfied_assistance_accountability}
                    includeNullish
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
                </SlidePanel>
                <SlidePanel title={m.mealMonitoringPdm.peopleExcluded}>
                  <ChartBarSingleBy
                    data={data}
                    by={(_) => _.answers.know_people_need_legal}
                    label={Legal_pam.options.know_people_need_legal}
                    includeNullish
                  />
                </SlidePanel>
                <SlidePanel title={m.mealMonitoringPdm.peopleSpecify}>
                  <ChartBarMultipleBy
                    data={data}
                    by={(_) => _.answers.people_need_legal}
                    label={Legal_pam.options.people_need_legal}
                    includeNullish
                  />
                </SlidePanel>
              </Panel>
            </Div>
          </Div>
        </>
      )}
    </Page>
  )
}
