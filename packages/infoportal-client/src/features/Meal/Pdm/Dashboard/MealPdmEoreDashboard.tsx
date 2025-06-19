import {Meal_eorePdm, OblastIndex} from 'infoportal-common'
import {PdmData, PdmForm, useMealPdmContext} from '@/features/Meal/Pdm/Context/MealPdmContext'
import {useKoboSchemaContext} from '@/features/KoboSchema/KoboSchemaContext'
import {Div, SlidePanel} from '@/shared/PdfLayout/PdfSlide'
import {usePdmFilters} from '@/features/Meal/Pdm/Context/usePdmFilter'
import {useI18n} from '@/core/i18n'
import React, {useMemo, useState} from 'react'
import {DataFilter} from '@/shared/DataFilter/DataFilter'
import {map, seq} from '@axanc/ts-utils'
import {AgeGroupTable, DebouncedInput, Page} from '@/shared'
import {DataFilterLayout} from '@/shared/DataFilter/DataFilterLayout'
import {PeriodPicker} from '@/shared/PeriodPicker/PeriodPicker'
import {Panel, PanelBody} from '@/shared/Panel'
import {MapSvgByOblast} from '@/shared/maps/MapSvgByOblast'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'

const isEorePdm = (_: PdmData<PdmForm>): _ is PdmData<Meal_eorePdm.T> => {
  return _.type === 'Eore'
}

export const MealPdmEoreDashboard = () => {
  const ctx = useMealPdmContext()
  const {shape: commonShape} = usePdmFilters(seq(ctx.fetcherAnswers.get).filter(isEorePdm))
  const ctxSchema = useKoboSchemaContext()
  const schema = ctxSchema.byName.meal_pssPdm.get!
  const {m} = useI18n()
  const [optionFilter, setOptionFilters] = useState<Record<string, string[] | undefined>>({})

  const filterShape = useMemo(() => {
    return DataFilter.makeShape(commonShape)
  }, [commonShape])

  const data = useMemo(() => {
    return map(ctx.fetcherAnswers.get, (_) => {
      return seq(DataFilter.filterData(_.filter(isEorePdm), filterShape, optionFilter))
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
                    sx={{maxWidth: 480, margin: 'auto'}}
                    fillBaseOn="value"
                    data={data}
                    getOblast={(_) => OblastIndex.byName(_.oblast)?.iso!}
                    value={(_) => true}
                    base={(_) => _.answers.oblast !== undefined}
                  />
                </PanelBody>
              </Panel>
              <SlidePanel title={m.mealMonitoringPdm.eoreSafety}>
                <ChartBarSingleBy data={data} by={(_) => _.answers.safety} label={Meal_eorePdm.options.info_clear} />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.eoreRespect}>
                <ChartBarSingleBy data={data} by={(_) => _.answers.respect} label={Meal_eorePdm.options.info_clear} />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.eoreSharing}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.info_sharing}
                  label={Meal_eorePdm.options.accountability}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.eoreUseful}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.usefulness}
                  label={Meal_eorePdm.options.info_clear}
                />
              </SlidePanel>
            </Div>
            <Div column>
              <SlidePanel title={m.mealMonitoringPdm.eoreSatis}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.satisfaction}
                  label={Meal_eorePdm.options.info_clear}
                />
              </SlidePanel>
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
              <SlidePanel title={m.mealMonitoringPdm.address}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.accountability}
                  label={Meal_eorePdm.options.accountability}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.eoreTrainer}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.trainer_answers}
                  label={Meal_eorePdm.options.info_clear}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.eoreInfo}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.info_clear}
                  label={Meal_eorePdm.options.info_clear}
                />
              </SlidePanel>
            </Div>
          </Div>
        </>
      )}
    </Page>
  )
}
