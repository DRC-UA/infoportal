import React, {useMemo, useState} from 'react'
import {map, match, seq} from '@axanc/ts-utils'

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
  const {translateField, translateOption} = useKoboTranslations('va_tia_pdm')
  const translateLabels = (option: string) =>
    translateOption(option)?.reduce(
      (result, {value, label}) => ({
        ...result,
        [value]: label,
      }),
      {} as Record<string, string>,
    )
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
                  label={Va_tia_pdm.options.without_DRC_no}
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
