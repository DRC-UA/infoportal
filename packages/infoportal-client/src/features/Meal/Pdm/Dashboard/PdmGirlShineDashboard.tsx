import {Gbv_girl_shine} from 'infoportal-common'
import {PdmData, PdmForm, useMealPdmContext} from '@/features/Meal/Pdm/Context/MealPdmContext'
import {useKoboSchemaContext} from '@/features/KoboSchema/KoboSchemaContext'
import {Div, SlidePanel, SlideWidget} from '@/shared/PdfLayout/PdfSlide'
import {usePdmFilters} from '@/features/Meal/Pdm/Context/usePdmFilter'
import {useI18n} from '@/core/i18n'
import React, {useMemo, useState} from 'react'
import {DataFilter} from '@/shared/DataFilter/DataFilter'
import {map, seq} from '@axanc/ts-utils'
import {AgeGroupTable, DebouncedInput, Page} from '@/shared'
import {DataFilterLayout} from '@/shared/DataFilter/DataFilterLayout'
import {PeriodPicker} from '@/shared/PeriodPicker/PeriodPicker'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import {Panel, PanelBody} from '@/shared/Panel'

const isGirlPdm = (_: PdmData<PdmForm>): _ is PdmData<Gbv_girl_shine.T> => {
  return _.type === 'GirlShine'
}

export const PdmGirlShineDashboard = () => {
  const ctx = useMealPdmContext()
  const ctxSchema = useKoboSchemaContext()
  const schema = ctxSchema.byName.gbv_girlShine.get!
  const {shape: commonShape} = usePdmFilters(seq(ctx.fetcherAnswers.get).filter(isGirlPdm))
  const langIndex = ctxSchema.langIndex
  const {m, formatLargeNumber} = useI18n()
  const [optionFilter, setOptionFilters] = useState<Record<string, string[] | undefined>>({})
  const filterShape = useMemo(() => {
    return DataFilter.makeShape(commonShape)
  }, [commonShape])

  const data = useMemo(() => {
    return map(ctx.fetcherAnswers.get, (_) => {
      return seq(DataFilter.filterData(_.filter(isGirlPdm), filterShape, optionFilter))
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
              <SlideWidget sx={{flex: 1}} icon="group" title={m.submissions}>
                {formatLargeNumber(data.length)}
              </SlideWidget>
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
                  by={(_) => _.answers.project_code}
                  label={Gbv_girl_shine.options.project_code}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.thinkFacilitator}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.think_about_facilitator}
                  label={Gbv_girl_shine.options.knew_enough_participate}
                />
              </SlidePanel>
            </Div>
            <Div column sx={{maxHeight: '50%'}}>
              <SlidePanel title={m.mealMonitoringPdm.girlShineSafe}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.safe_whole_time}
                  label={Gbv_girl_shine.options.knew_enough_participate}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.girlShineHappy}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.happy_gs}
                  label={Gbv_girl_shine.options.knew_enough_participate}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.ideaBetter}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.idea_make_better}
                  label={Gbv_girl_shine.options.knew_enough_participate}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.girlShineComplaints}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.ideas_complaints_people}
                  label={Gbv_girl_shine.options.knew_enough_participate}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.facilitatorsListened}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.facilitators_listen_opinion}
                  label={Gbv_girl_shine.options.knew_enough_participate}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.knewEnoughParticipate}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.knew_enough_participate}
                  label={Gbv_girl_shine.options.knew_enough_participate}
                />
              </SlidePanel>
            </Div>
          </Div>
        </>
      )}
    </Page>
  )
}
