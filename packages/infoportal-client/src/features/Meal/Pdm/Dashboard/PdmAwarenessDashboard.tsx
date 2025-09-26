import {Awareness_raising_feedback, OblastIndex} from 'infoportal-common'
import {PdmData, PdmForm, useMealPdmContext} from '@/features/Meal/Pdm/Context/MealPdmContext'
import {useKoboSchemaContext} from '@/features/KoboSchema/KoboSchemaContext'
import {Div, SlidePanel, SlideWidget} from '@/shared/PdfLayout/PdfSlide'
import {usePdmFilters} from '@/features/Meal/Pdm/Context/usePdmFilter'
import {useI18n} from '@/core/i18n'
import React, {useMemo, useState} from 'react'
import {DataFilter} from '@/shared/DataFilter/DataFilter'
import {map, seq} from '@axanc/ts-utils'
import {DebouncedInput, Page} from '@/shared'
import {DataFilterLayout} from '@/shared/DataFilter/DataFilterLayout'
import {PeriodPicker} from '@/shared/PeriodPicker/PeriodPicker'
import {Panel, PanelBody} from '@/shared/Panel'
import {MapSvgByOblast} from '@/shared/maps/MapSvgByOblast'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import {Box, Typography} from '@mui/material'

const mapOblast = OblastIndex.koboOblastIndexIso

const isAwarenessPdm = (_: PdmData<PdmForm>): _ is PdmData<Awareness_raising_feedback.T> => {
  return _.type === 'Awareness'
}

const PdfSectionTitle = ({children}: {children: React.ReactNode}) => {
  return (
    <Box
      sx={{
        px: 1,
        pb: 1,
        borderBottom: '2px solid',
        borderColor: (t) => t.palette.divider,
        mb: 2,
      }}
    >
      <Typography variant="h4" fontWeight="bold" color="text.primary">
        {children}
      </Typography>
    </Box>
  )
}

export const PdmAwarenessDashboard = () => {
  const ctx = useMealPdmContext()
  const ctxSchema = useKoboSchemaContext()
  const schema = ctxSchema.byName.awareness_raising_feedback.get!
  const {shape: commonShape} = usePdmFilters(seq(ctx.fetcherAnswers.get).filter(isAwarenessPdm))
  const langIndex = ctxSchema.langIndex
  const {m, formatLargeNumber} = useI18n()
  const [optionFilter, setOptionFilters] = useState<Record<string, string[] | undefined>>({})
  const filterShape = useMemo(() => {
    return DataFilter.makeShape<PdmData<Awareness_raising_feedback.T>>({
      ...commonShape,
      received: {
        icon: 'check_circle',
        getOptions: () => DataFilter.buildOptionsFromObject(Awareness_raising_feedback.options.type_awareness_raising),
        label: m.mealMonitoringPdm.awarenessType,
        getValue: (_): string | undefined => {
          if (_.type === 'Awareness') {
            const awarenessAnswers = _.answers as Awareness_raising_feedback.T
            return awarenessAnswers.type_awareness_raising
          }
          return undefined
        },
      },
    })
  }, [commonShape, schema])

  const data = useMemo(() => {
    return map(ctx.fetcherAnswers.get, (_) => {
      return seq(DataFilter.filterData(_.filter(isAwarenessPdm), filterShape, optionFilter))
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
            <Div column sx={{maxHeight: '25%'}}>
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
                    base={(_) => _.answers.ben_det_oblast !== undefined}
                  />
                </PanelBody>
              </Panel>
              <SlidePanel title={m.donor}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.donor}
                  label={Awareness_raising_feedback.options.donor}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.informClear}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.information_presented_clear}
                  label={Awareness_raising_feedback.options.informed_cfm}
                  includeNullish={true}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.facilitatorEngage}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.facilitator_engage}
                  label={Awareness_raising_feedback.options.informed_cfm}
                  includeNullish={true}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.locConvenient}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.location_timing_convenient}
                  label={Awareness_raising_feedback.options.informed_cfm}
                  includeNullish={true}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.moreInformed}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.more_informed_topic}
                  label={Awareness_raising_feedback.options.informed_cfm}
                  includeNullish={true}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.sessionMeet}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.session_meet_expectations}
                  label={Awareness_raising_feedback.options.informed_cfm}
                  includeNullish={true}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.recommendSession}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.recommend_session}
                  label={Awareness_raising_feedback.options.informed_cfm}
                  includeNullish={true}
                />
              </SlidePanel>
            </Div>
            <Div column sx={{maxHeight: '25%'}}>
              <PdfSectionTitle>{m.legalPdm}</PdfSectionTitle>
              <SlidePanel title={m.mealMonitoringPdm.informedLegal}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.informed_legal_session}
                  label={Awareness_raising_feedback.options.informed_cfm}
                  includeNullish={true}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.safeLegal}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.safe_travelling}
                  label={Awareness_raising_feedback.options.informed_cfm}
                  includeNullish={true}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.lawyerRespect}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.lawyer_respect}
                  label={Awareness_raising_feedback.options.informed_cfm}
                  includeNullish={true}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.sessionSatisfied}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.satisfied_session}
                  label={Awareness_raising_feedback.options.informed_cfm}
                  includeNullish={true}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.peopleNeeding}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.people_needing}
                  label={Awareness_raising_feedback.options.people_needing}
                  includeNullish={true}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.cfmMechanism}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.informed_cfm}
                  label={Awareness_raising_feedback.options.informed_cfm}
                  includeNullish={true}
                />
              </SlidePanel>
            </Div>
            <Div column sx={{maxHeight: '25%'}}>
              <PdfSectionTitle>{m.pss}</PdfSectionTitle>
              <SlidePanel title={m.mealMonitoringPdm.informClear}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.information_presented_clear_pss}
                  label={Awareness_raising_feedback.options.recommend_session_gbv}
                  includeNullish={true}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.facilitatorEngage}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.facilitator_engage_pss}
                  label={Awareness_raising_feedback.options.more_informed_topic_gbv}
                  includeNullish={true}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.locConvenient}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.location_timing_convenient_pss}
                  label={Awareness_raising_feedback.options.recommend_session_gbv}
                  includeNullish={true}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.moreInformed}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.more_informed_topic_pss}
                  label={Awareness_raising_feedback.options.more_informed_topic_gbv}
                  includeNullish={true}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.sessionMeet}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.session_meet_expectations_pss}
                  label={Awareness_raising_feedback.options.recommend_session_gbv}
                  includeNullish={true}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.recommendSession}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.recommend_session_pss}
                  label={Awareness_raising_feedback.options.recommend_session_gbv}
                  includeNullish={true}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.cfmMechanism}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.informed_cfm_pss}
                  label={Awareness_raising_feedback.options.recommend_session_gbv}
                  includeNullish={true}
                />
              </SlidePanel>
            </Div>
            <Div column sx={{maxHeight: '25%'}}>
              <PdfSectionTitle>{m.gbv}</PdfSectionTitle>
              <SlidePanel title={m.mealMonitoringPdm.howSatisfiedAwareness}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.satisfied_overall_gbv}
                  label={Awareness_raising_feedback.options.satisfied_overall_gbv}
                  includeNullish={true}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.informClear}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.information_presented_clear_gbv}
                  label={Awareness_raising_feedback.options.recommend_session_gbv}
                  includeNullish={true}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.facilitatorEngage}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.facilitator_engage_gbv}
                  label={Awareness_raising_feedback.options.more_informed_topic_gbv}
                  includeNullish={true}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.locConvenient}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.location_timing_convenient_gbv}
                  label={Awareness_raising_feedback.options.recommend_session_gbv}
                  includeNullish={true}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.wellInformed}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.informed_session_gbv}
                  label={Awareness_raising_feedback.options.feedback_responded_gbv}
                  includeNullish={true}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.moreInformed}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.more_informed_topic_gbv}
                  label={Awareness_raising_feedback.options.more_informed_topic_gbv}
                  includeNullish={true}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.sessionMeet}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.session_meet_expectations_gbv}
                  label={Awareness_raising_feedback.options.recommend_session_gbv}
                  includeNullish={true}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.recommendSession}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.recommend_session_gbv}
                  label={Awareness_raising_feedback.options.recommend_session_gbv}
                  includeNullish={true}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.safeGbv}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.safe_travelling_gbv}
                  label={Awareness_raising_feedback.options.feedback_responded_gbv}
                  includeNullish={true}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.respect}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.treated_respect_gbv}
                  label={Awareness_raising_feedback.options.feedback_responded_gbv}
                  includeNullish={true}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.cfmMechanism}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.feedback_responded_gbv}
                  label={Awareness_raising_feedback.options.feedback_responded_gbv}
                  includeNullish={true}
                />
              </SlidePanel>
            </Div>
          </Div>
        </>
      )}
    </Page>
  )
}
