import {Gbv_csPdm, OblastIndex} from 'infoportal-common'
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
import {ChartBarMultipleBy} from '@/shared/charts/ChartBarMultipleBy'

const mapOblast = OblastIndex.koboOblastIndexIso

const isCsPdm = (_: PdmData<PdmForm>): _ is PdmData<Gbv_csPdm.T> => {
  return _.type === 'CaseManagement'
}

export const PdmGbvCsDashboard = () => {
  const ctx = useMealPdmContext()
  const ctxSchema = useKoboSchemaContext()
  const schema = ctxSchema.byName.gbv_cs_pdm.get!
  const {shape: commonShape} = usePdmFilters(seq(ctx.fetcherAnswers.get).filter(isCsPdm))
  const langIndex = ctxSchema.langIndex
  const {m, formatLargeNumber} = useI18n()
  const [optionFilter, setOptionFilters] = useState<Record<string, string[] | undefined>>({})
  const filterShape = useMemo(() => {
    return DataFilter.makeShape(commonShape)
  }, [commonShape])

  const data = useMemo(() => {
    return map(ctx.fetcherAnswers.get, (_) => {
      return seq(DataFilter.filterData(_.filter(isCsPdm), filterShape, optionFilter))
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
              <Panel savableAsImg expendable title={m.location}>
                <PanelBody>
                  <MapSvgByOblast
                    sx={{maxWidth: 480, margin: 'auto'}}
                    fillBaseOn="value"
                    data={data}
                    getOblast={(_) => OblastIndex.byName(_.oblast)?.iso!}
                    value={(_) => true}
                    base={(_) => _.answers.location !== undefined}
                  />
                </PanelBody>
              </Panel>
              <SlidePanel title={m.donor}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.project_code}
                  label={Gbv_csPdm.options.project_code}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.howFindServices}>
                <ChartBarMultipleBy
                  data={data}
                  by={(_) => _.answers.find_about_services}
                  label={Gbv_csPdm.options.find_about_services}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.viewsTaken}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.views_into_account}
                  label={Gbv_csPdm.options.satisfied_assistance}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.receivedInfo}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.received_information_available}
                  label={Gbv_csPdm.options.satisfied_assistance}
                />
              </SlidePanel>
            </Div>
            <Div column sx={{maxHeight: '50%'}}>
              <SlideWidget sx={{flex: 1}} icon="group" title={m.submissions}>
                {formatLargeNumber(data.length)}
              </SlideWidget>
              <SlidePanel title={m.mealMonitoringPdm.samePerson}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.same_person_return_visit}
                  label={Gbv_csPdm.options.satisfied_assistance}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.offeredSupport}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.offered_having_support}
                  label={Gbv_csPdm.options.caseworker_other_staff_private}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.supportAttention}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.access_support_drawing_attention}
                  label={Gbv_csPdm.options.caseworker_other_staff_private}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.staffConfidential}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.staff_respects_confidentiality}
                  label={Gbv_csPdm.options.satisfied_assistance}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.caseworkerProvide}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.caseworker_provide_complaint}
                  label={Gbv_csPdm.options.satisfied_assistance}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.suggestionsResponded}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.made_complaint_responded}
                  label={Gbv_csPdm.options.satisfied_assistance}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.recommendFriend}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.recommend_friend_gbv}
                  label={Gbv_csPdm.options.satisfied_assistance}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.satisfiedAssistance}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.satisfied_assistance}
                  label={Gbv_csPdm.options.satisfied_assistance}
                />
              </SlidePanel>
            </Div>
          </Div>
        </>
      )}
    </Page>
  )
}
