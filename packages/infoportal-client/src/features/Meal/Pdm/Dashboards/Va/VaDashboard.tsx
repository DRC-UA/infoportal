import type {FC} from 'react'
import {match} from '@axanc/ts-utils'

import {OblastISO} from 'infoportal-common'

import {useI18n} from '@/core/i18n'
import {AgeGroupTable, DebouncedInput, Page} from '@/shared'
import {DataFilterLayout} from '@/shared/DataFilter/DataFilterLayout'
import {PeriodPicker} from '@/shared/PeriodPicker/PeriodPicker'
import {Panel, PanelBody} from '@/shared/Panel'
import {Div, SlidePanel, SlideWidget} from '@/shared/PdfLayout/PdfSlide'
import {MapSvgByOblast} from '@/shared/maps/MapSvgByOblast'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import {ChartBarMultipleBy} from '@/shared/charts/ChartBarMultipleBy'
import {useKoboTranslations} from '@/utils/hooks'

const officeToOblast: Record<string, OblastISO> = {
  umy: 'UA59',
  hrk: 'UA63',
  cej: 'UA74',
  nlv: 'UA48',
  iev: 'UA80',
  dnk: 'UA12',
  slo: 'UA14',
}

import {useVaPdmData} from './hooks'

const VaDashboard: FC = () => {
  const {data, loading, filterShape, optionFilter, setOptionFilters, periodFilter, setPeriodFilter} = useVaPdmData()
  const {m, formatLargeNumber} = useI18n()
  const {translateField, translateOption} = useKoboTranslations('va_tia_pdm')
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
      {data && (
        <>
          <Div responsive>
            <Div column>
              <Panel savableAsImg expendable title={m.location}>
                <PanelBody>
                  <MapSvgByOblast
                    sx={{maxWidth: 500, mt: 5, margin: 'auto'}}
                    data={data}
                    getOblast={(row) => officeToOblast[row.answers.office || '']}
                    fillBaseOn="value"
                    value={(_) => true}
                  />
                </PanelBody>
              </Panel>
              <Panel title={m.ageGroup}>
                <PanelBody>
                  <AgeGroupTable
                    tableId="pdm-dashboard"
                    persons={data.flatMap(({persons}) => persons).compact()}
                    enableDisplacementStatusFilter
                    enablePwdFilter
                  />
                </PanelBody>
              </Panel>
              <SlidePanel title={m.donor}>
                <ChartBarSingleBy
                  data={data}
                  by={({answers}) => answers.project_ID}
                  label={translateLabels('project_ID')}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={translateField && translateField('receive_help_drc')}>
                <ChartBarSingleBy
                  data={data}
                  by={({answers}) => answers.receive_help_drc}
                  label={translateLabels('receive_help_drc')}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={translateField && translateField('what_assistance_drc')}>
                <ChartBarMultipleBy
                  data={data}
                  by={({answers}) => answers.what_assistance_drc}
                  label={translateLabels('what_assistance_drc')}
                  includeNullish
                />
              </SlidePanel>
            </Div>
            <Div column>
              <SlidePanel title={translateField && translateField('money_spent_yn')}>
                <ChartBarSingleBy
                  data={data}
                  by={({answers}) => answers.money_spent_yn}
                  label={translateLabels('money_spent_yn')}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={translateField && translateField('money_spent')}>
                <ChartBarSingleBy
                  data={data}
                  by={({answers}) => answers.money_spent}
                  label={translateLabels('money_spent')}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={translateField && translateField('rate_satisfaction_assistance')}>
                <ChartBarSingleBy
                  data={data}
                  by={({answers}) =>
                    match(answers.money_spent_yn)
                      .cases({partially: answers.rate_satisfaction_assistance_partially})
                      .default(answers.rate_satisfaction_assistance)
                  }
                  label={translateLabels('feel_drc_staff_security_no_001')}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={translateField && translateField('scale_assistance_time')}>
                <ChartBarSingleBy
                  data={data}
                  by={({answers}) =>
                    match(answers.money_spent_yn)
                      .cases({partially: answers.scale_assistance_time_partially})
                      .default(answers.scale_assistance_time)
                  }
                  label={translateLabels('scale_assistance_time_no')}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={translateField && translateField('scale_changed_family')}>
                <ChartBarSingleBy
                  data={data}
                  by={({answers}) => answers.scale_changed_family}
                  label={translateLabels('scale_changed_family')}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={translateField && translateField('know_address_feedback')}>
                <ChartBarSingleBy
                  data={data}
                  by={({answers}) =>
                    match(answers.money_spent_yn)
                      .cases({partially: answers.know_address_feedback_partially})
                      .default(answers.know_address_feedback)
                  }
                  label={translateLabels('know_address_feedback')}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={translateField && translateField('feel_drc_staff_security')}>
                <ChartBarSingleBy
                  data={data}
                  by={({answers}) =>
                    match(answers.money_spent_yn)
                      .cases({partially: answers.feel_drc_staff_security_partially})
                      .default(answers.feel_drc_staff_security)
                  }
                  label={translateLabels('feel_drc_staff_security')}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={translateField && translateField('feel_drc_staff_respect')}>
                <ChartBarSingleBy
                  data={data}
                  by={({answers}) =>
                    match(answers.money_spent_yn)
                      .cases({partially: answers.feel_drc_staff_respect_partially})
                      .default(answers.feel_drc_staff_respect)
                  }
                  label={translateLabels('supported_improving_life_no_intended')}
                  includeNullish
                />
              </SlidePanel>
            </Div>
            <Div column>
              <SlideWidget sx={{flex: 1}} icon="group" title={m.submissions}>
                {formatLargeNumber(data.length)}
              </SlideWidget>
              <SlidePanel title={translateField && translateField('scale_situation_consideration')}>
                <ChartBarSingleBy
                  data={data}
                  by={({answers}) =>
                    match(answers.money_spent_yn)
                      .cases({partially: answers.scale_situation_consideration_partially})
                      .default(answers.scale_situation_consideration)
                  }
                  label={translateLabels('scale_situation_consideration')}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={translateField && translateField('informing')}>
                <ChartBarSingleBy
                  data={data}
                  by={({answers}) =>
                    match(answers.money_spent_yn)
                      .cases({partially: answers.informing_partially})
                      .default(answers.informing)
                  }
                  label={translateLabels('informing')}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={translateField && translateField('scale_resolve_problem')}>
                <ChartBarSingleBy
                  data={data}
                  by={({answers}) => answers.scale_resolve_problem}
                  label={translateLabels('scale_resolve_problem')}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={translateField && translateField('scale_challenges_accessing_drc_assistance')}>
                <ChartBarSingleBy
                  data={data}
                  by={({answers}) =>
                    match(answers.money_spent_yn)
                      .cases({
                        partially: answers.scale_challenges_accessing_drc_assistance_partially,
                      })
                      .default(answers.scale_challenges_accessing_drc_assistance)
                  }
                  label={translateLabels('scale_challenges_accessing_drc_assistance')}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={translateField && translateField('without_DRC')}>
                <ChartBarSingleBy
                  data={data}
                  by={({answers}) => answers.without_DRC}
                  label={translateLabels('without_DRC')}
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

export default VaDashboard
