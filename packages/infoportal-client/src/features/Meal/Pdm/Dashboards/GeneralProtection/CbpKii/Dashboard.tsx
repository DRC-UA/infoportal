import {OblastIndex} from 'infoportal-common'

import {useI18n} from '@/core/i18n'
import {DebouncedInput, Page} from '@/shared'
import {ChartBarMultipleBy} from '@/shared/charts/ChartBarMultipleBy'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import {DataFilterLayout} from '@/shared/DataFilter/DataFilterLayout'
import {MapSvgByOblast} from '@/shared/maps/MapSvgByOblast'
import {Panel, PanelBody} from '@/shared/Panel'
import {PeriodPicker} from '@/shared/PeriodPicker/PeriodPicker'
import {Div, SlidePanel, SlideWidget} from '@/shared/PdfLayout/PdfSlide'
import {useKoboTranslations} from '@/utils/hooks'

import {Explanations, Quotation} from './Explanations'
import {useCbpKiiData} from './hooks'

const CommunityKiiDashboard = () => {
  const {data, loading, filterShape, optionFilter, setOptionFilters, periodFilter, setPeriodFilter} = useCbpKiiData()
  const {m, formatLargeNumber} = useI18n()
  const {translateField, translateOption} = useKoboTranslations('meal_kiiCbpPam', {uk: 1, en: 0})
  const translateLabels = (option: string) =>
    translateOption(option)?.reduce(
      (result, {value, label}) => ({
        ...result,
        [value]: label,
      }),
      {} as Record<string, string>,
    )

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
        <Div column>
          <SlideWidget sx={{flex: 1}} icon="group" title={m.submissions}>
            {formatLargeNumber(data?.length)}
          </SlideWidget>
          <Panel savableAsImg expendable title={m.location}>
            <PanelBody>
              <MapSvgByOblast
                sx={{maxWidth: 480, margin: 'auto'}}
                fillBaseOn="value"
                data={data}
                getOblast={({oblast}) => OblastIndex.byKoboName(oblast)?.iso}
                total={data.length}
                base={({oblast}) => oblast !== undefined}
              />
            </PanelBody>
          </Panel>
          <SlidePanel title={translateField && translateField('project')}>
            <ChartBarSingleBy data={data} by={({project}) => project} label={translateLabels('project')} />
          </SlidePanel>
          <SlidePanel title={translateField && translateField('respondent_role')}>
            {data.map(({id, respondent_role}) => (
              <Quotation key={`${id}-${respondent_role}`}>{respondent_role}</Quotation>
            ))}
          </SlidePanel>
          <SlidePanel title={translateField && translateField('type_support')}>
            <ChartBarMultipleBy
              data={data}
              by={({type_support}) => type_support}
              label={translateLabels('type_support')}
            />
            <Explanations data={data} question={'type_support'} answer={'other'} explanation={'type_support_other'} />
          </SlidePanel>
          {[['support_community_ability', 'other', 'community_ability_situation_worsened'] as const].map(
            ([question, answer, explanation]) => (
              <SlidePanel key={question} title={translateField && translateField(question)}>
                <ChartBarSingleBy data={data} by={(record) => record[question]} label={translateLabels(question)} />
                {explanation && answer && (
                  <Explanations data={data} question={question} answer={answer} explanation={explanation} />
                )}
              </SlidePanel>
            ),
          )}
          <SlidePanel title={translateField && translateField('issues_better_respond')}>
            {data.map(({id, issues_better_respond}) => (
              <Quotation key={`${id}-${issues_better_respond}`}>{issues_better_respond}</Quotation>
            ))}
          </SlidePanel>
          {[
            ['reported_feeling_safe'] as const,
            ['satisfied_support', ['dissatisfied', 'very_dissatisfied'] as any, 'satisfied_support_bad'] as const,
            ['support_meet', ['partially', 'not'] as any, 'support_meet_bad'] as const,
            ['support_improving_ability', 'not', 'support_improving_ability_bad'] as const,
          ].map(([question, answer, explanation]) => (
            <SlidePanel key={question} title={translateField && translateField(question)}>
              <ChartBarSingleBy data={data} by={(record) => record[question]} label={translateLabels(question)} />
              {explanation && answer && (
                <Explanations data={data} question={question} answer={answer} explanation={explanation} />
              )}
            </SlidePanel>
          ))}
        </Div>
        <Div column>
          {[['support_vulnerable_groups', 'no', 'support_vulnerable_groups_no'] as const].map(
            ([question, answer, explanation]) => (
              <SlidePanel key={question} title={translateField && translateField(question)}>
                <ChartBarSingleBy data={data} by={(record) => record[question]} label={translateLabels(question)} />
                {explanation && answer && (
                  <Explanations data={data} question={question} answer={answer} explanation={explanation} />
                )}
              </SlidePanel>
            ),
          )}
          <SlidePanel
            key="groups_barriers_participating"
            title={translateField && translateField('groups_barriers_participating')}
          >
            {data.map(({id, groups_barriers_participating}) => (
              <Quotation key={`${id}-${groups_barriers_participating}`}>{groups_barriers_participating}</Quotation>
            ))}
          </SlidePanel>
          {[['continue_supporting_community'] as const].map(([question]) => (
            <SlidePanel key={question} title={translateField && translateField(question)}>
              <ChartBarSingleBy data={data} by={(record) => record[question]} label={translateLabels(question)} />
            </SlidePanel>
          ))}
          <SlidePanel key="additional_support_need" title={translateField && translateField('additional_support_need')}>
            {data.map(({id, additional_support_need}) => (
              <Quotation key={`${id}-${additional_support_need}`}>{additional_support_need}</Quotation>
            ))}
          </SlidePanel>
          {[['activities_making_safer'] as const].map(([question]) => (
            <SlidePanel key={question} title={translateField && translateField(question)}>
              <ChartBarSingleBy data={data} by={(record) => record[question]} label={translateLabels(question)} />
            </SlidePanel>
          ))}
          {[
            ['informed_services', 'no', 'informed_services_no'] as const,
            ['taken_into_account', 'no', 'taken_into_account_no'] as const,
            ['report_employee', 'no', 'report_employee_no'] as const,
            ['channel_suggestion', 'no', 'channel_suggestion_no'] as const,
            ['channel_suggestion_yes'] as const,
            ['complaint_question'] as const,
            ['staff_respect', 'no', 'staff_respect_no'] as const,
          ].map(([question, answer, explanation]) => (
            <SlidePanel key={question} title={translateField && translateField(question)}>
              <ChartBarSingleBy data={data} by={(record) => record[question]} label={translateLabels(question)} />
              {explanation && answer && (
                <Explanations data={data} question={question} answer={answer} explanation={explanation} />
              )}
            </SlidePanel>
          ))}
          <SlidePanel title={translateField && translateField('information_relevant')}>
            {data.map(({id, information_relevant}) => (
              <Quotation key={`${id}-${information_relevant}`}>{information_relevant}</Quotation>
            ))}
          </SlidePanel>
        </Div>
      </Div>
    </Page>
  )
}

export default CommunityKiiDashboard
