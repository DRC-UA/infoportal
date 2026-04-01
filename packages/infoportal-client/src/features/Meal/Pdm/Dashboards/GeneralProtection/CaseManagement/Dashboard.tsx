import {useMemo} from 'react'

import {KoboXmlMapper, OblastIndex} from 'infoportal-common'

import {useI18n} from '@/core/i18n'
import {AgeGroupTable, DebouncedInput, Page} from '@/shared'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import {DataFilterLayout} from '@/shared/DataFilter/DataFilterLayout'
import {MapSvgByOblast} from '@/shared/maps/MapSvgByOblast'
import {Panel, PanelBody} from '@/shared/Panel'
import {PeriodPicker} from '@/shared/PeriodPicker/PeriodPicker'
import {Div, SlidePanel, SlideWidget} from '@/shared/PdfLayout/PdfSlide'
import {useKoboTranslations} from '@/utils/hooks'

import {Explanations, MissingData, Quotation} from './Explanations'
import {useGpCaseManagementData} from './hooks'

const ANSWER_KEYS = ['yes', 'no', 'completely', 'somewhat', 'not_all'] as const
type AnswerKey = keyof typeof ANSWER_KEYS

const PdmGPCaseManagementDashboard = () => {
  const {data, loading, filterShape, optionFilter, setOptionFilters, periodFilter, setPeriodFilter} =
    useGpCaseManagementData()
  const {m, formatLargeNumber} = useI18n()
  const {translateField, translateOption} = useKoboTranslations('gp_case_management', {uk: 1, en: 0})
  const translateLabels = (option: string) =>
    translateOption(option)?.reduce(
      (result, {value, label}) => ({
        ...result,
        [value]: label,
      }),
      {} as Record<string, string>,
    )
  const avgMeetings = useMemo(() => {
    return data.length > 0
      ? (data
          .map(({many_met_caseworker}) => many_met_caseworker)
          .reduce((accum, current) => (accum ?? 0) + (current ?? 0), 0) ?? 0) / data.length
      : undefined
  }, [data])

  return (
    <Page width="lg" loading={loading}>
      <DataFilterLayout
        shapes={filterShape}
        filters={optionFilter}
        setFilters={setOptionFilters}
        before={
          <DebouncedInput<[Date | undefined, Date | undefined]>
            debounce={400}
            value={[periodFilter.start, periodFilter.end]}
            onChange={([start, end]) => setPeriodFilter((prev) => ({...prev, start, end}))}
          >
            {(value, onChange) => (
              <PeriodPicker fullWidth={false} value={value ?? [undefined, undefined]} onChange={onChange} />
            )}
          </DebouncedInput>
        }
      />
      <Div responsive>
        <Div column sx={{maxHeight: '50%'}}>
          <SlideWidget sx={{flex: 1}} icon="group" title={m.submissions}>
            {formatLargeNumber(data?.length)}
          </SlideWidget>
          <Panel savableAsImg expendable title={m.location}>
            <PanelBody>
              <MapSvgByOblast
                sx={{maxWidth: 480, margin: 'auto'}}
                fillBaseOn="value"
                data={data}
                getOblast={({oblast_provision}) => OblastIndex.byKoboName(oblast_provision!)?.iso}
                total={data.length}
                base={({oblast_provision}) => oblast_provision !== undefined}
              />
            </PanelBody>
          </Panel>
          <Panel title={m.ageGroup}>
            <PanelBody>
              <AgeGroupTable
                tableId="pdm-dashboard"
                persons={data?.flatMap(KoboXmlMapper.Persons.gp_case_management).compact()}
                enableDisplacementStatusFilter
                enablePwdFilter
              />
            </PanelBody>
          </Panel>
          <SlidePanel title={translateField && translateField('gender')}>
            <ChartBarSingleBy data={data} by={({gender}) => gender} label={translateLabels('gender')} />
          </SlidePanel>
          <SlidePanel title={translateField && translateField('project')}>
            <ChartBarSingleBy data={data} by={({project}) => project} label={translateLabels('project')} />
          </SlidePanel>
          <SlidePanel title={translateField && translateField('office')}>
            <ChartBarSingleBy data={data} by={({office}) => office} label={translateLabels('office')} includeNullish />
          </SlidePanel>
          <SlidePanel title={translateField && translateField('staff_code')}>
            <ChartBarSingleBy data={data} by={({staff_code}) => staff_code} label={translateLabels('staff_code')} />
          </SlidePanel>
        </Div>
        <Div column>
          <SlideWidget
            sx={{flex: 1}}
            icon="repeat"
            title={(translateField && translateField('many_met_caseworker')) ?? ''}
          >
            {avgMeetings ? formatLargeNumber(avgMeetings) : 0}
          </SlideWidget>
          {[
            ['option_support_person', 'option_support_person_explain'] as const,
            ['services_accessible_location', 'services_accessible_location_explain'] as const,
            ['accessible_operating_hours', 'accessible_operating_hours_explain'] as const,
            ['information_services_available', 'information_services_available_explain'] as const,
            ['satisfied_caseworke_knowledge', 'satisfied_caseworke_knowledge_explain'] as const,
          ].map(([question, explanation]) => (
            <SlidePanel key={question} title={translateField && translateField(question)}>
              <ChartBarSingleBy data={data} by={(record) => record[question]} label={translateLabels(question)} />
              <Explanations data={data} question={question} explanation={explanation} />
            </SlidePanel>
          ))}
          {[
            ['service_meet_expectations', 'service_meet_expectations_explain'] as const,
            ['comfortable_talking_caseworker', 'comfortable_talking_caseworker_explain'] as const,
            ['caseworker_supported_decisions', 'caseworker_supported_decisions_explain'] as const,
            ['pressured_time_caseworker', 'pressured_time_caseworker_yes'] as const,
            ['views_case_management', 'views_case_management_no'] as const,
          ].map(([question, explanation]) => (
            <SlidePanel key={question} title={translateField && translateField(question)}>
              <ChartBarSingleBy data={data} by={(record) => record[question]} label={translateLabels(question)} />
              <Explanations data={data} question={question} explanation={explanation} />
            </SlidePanel>
          ))}
          {[
            ['caseworker_communication_skills', 'caseworker_communication_skills_explain'] as const,
            ['comfortable_staff_members', 'comfortable_staff_members_explain'] as const,
          ].map(([question, explanation]) => (
            <SlidePanel key={question} title={translateField && translateField(question)}>
              <ChartBarSingleBy data={data} by={(record) => record[question]} label={translateLabels(question)} />
              <Explanations data={data} question={question} explanation={explanation} />
            </SlidePanel>
          ))}
          {(['caseworker_attitude_towards', 'services_most_helpful'] as const).map((question) => (
            <SlidePanel key={question} title={translateField && translateField(question)}>
              {(() => {
                const answers = data.map((record) => record[question]).compact()

                return answers.length === 0 ? (
                  <MissingData />
                ) : (
                  answers.map((answer, index) => <Quotation key={`${index} - ${answer}`}>{answer}</Quotation>)
                )
              })()}
            </SlidePanel>
          ))}
          {[
            ['channel_suggestion_complaint', 'channel_suggestion_complaint_explain'] as const,
            ['made_complaint_responded', 'made_complaint_responded_no'] as const,
          ].map(([question, explanation]) => (
            <SlidePanel key={question} title={translateField && translateField(question)}>
              <ChartBarSingleBy data={data} by={(record) => record[question]} label={translateLabels(question)} />
              <Explanations data={data} question={question} explanation={explanation} />
            </SlidePanel>
          ))}
          <SlidePanel title={translateField && translateField('explain_rights_beginning')}>
            <ChartBarSingleBy
              data={data}
              by={({explain_rights_beginning}) => explain_rights_beginning}
              label={translateLabels('explain_rights_beginning')}
            />
          </SlidePanel>
          {[
            ['caseworker_agreed_contact', 'caseworker_agreed_contact_explain'] as const,
            ['staff_treated_respect', 'staff_treated_respect_no'] as const,
          ].map(([question, explanation]) => (
            <SlidePanel key={question} title={translateField && translateField(question)}>
              <ChartBarSingleBy data={data} by={(record) => record[question]} label={translateLabels(question)} />
              <Explanations data={data} question={question} explanation={explanation} />
            </SlidePanel>
          ))}
          {[
            ['extent_problem_addressed', 'extent_problem_addressed_explain'] as const,
            ['ability_solve_problems', 'ability_solve_problems_001'] as const,
            ['overall_satisfied_services', 'overall_satisfied_services_explain'] as const,
          ].map(([question, explanation]) => (
            <SlidePanel key={question} title={translateField && translateField(question)}>
              <ChartBarSingleBy data={data} by={(record) => record[question]} label={translateLabels(question)} />
              <Explanations data={data} question={question} explanation={explanation} />
            </SlidePanel>
          ))}
          <SlidePanel title={translateField && translateField('comment')}>
            {(() => {
              const answers = data.map(({comment}) => comment).compact()

              return answers.length === 0 ? (
                <MissingData />
              ) : (
                answers.map((answer, index) => <Quotation key={`${index} - ${answer}`}>{answer}</Quotation>)
              )
            })()}
          </SlidePanel>
        </Div>
      </Div>
    </Page>
  )
}

export default PdmGPCaseManagementDashboard
