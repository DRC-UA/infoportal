import {OblastIndex, Protection_gbvPdm} from 'infoportal-common'
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
import {ChartPieWidgetBy} from '@/shared/charts/ChartPieWidgetBy'
import {Panel, PanelBody} from '@/shared/Panel'
import {MapSvgByOblast} from '@/shared/maps/MapSvgByOblast'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'

const mapOblast = OblastIndex.koboOblastIndexIso

const isGbvPdm = (_: PdmData<PdmForm>): _ is PdmData<Protection_gbvPdm.T> => {
  return _.type === 'Gbv'
}

export const PdmGbvDashboard = () => {
  const ctx = useMealPdmContext()
  const ctxSchema = useKoboSchemaContext()
  const schema = ctxSchema.byName.protection_gbvPdm.get!
  const {shape: commonShape} = usePdmFilters(seq(ctx.fetcherAnswers.get).filter(isGbvPdm))
  const langIndex = ctxSchema.langIndex
  const {m, formatLargeNumber} = useI18n()
  const [optionFilter, setOptionFilters] = useState<Record<string, string[] | undefined>>({})
  const filterShape = useMemo(() => {
    return DataFilter.makeShape(commonShape)
  }, [commonShape])

  const data = useMemo(() => {
    return map(ctx.fetcherAnswers.get, (_) => {
      return seq(DataFilter.filterData(_.filter(isGbvPdm), filterShape, optionFilter))
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
                    base={(_) => _.answers.ben_det_oblast !== undefined}
                  />
                </PanelBody>
              </Panel>
              <SlidePanel title={m.donor}>
                <ChartBarSingleBy data={data} by={(_) => _.answers.donor} label={Protection_gbvPdm.options.donor} />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.implementation}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.type_implementation ?? 'drc'}
                  label={Protection_gbvPdm.options.type_implementation}
                  includeNullish={true}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.partner_type}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.partner}
                  label={Protection_gbvPdm.options.partner}
                  includeNullish={true}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.kitContentTold}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.items_received_kit}
                  label={Protection_gbvPdm.options.informed_distribution_kits}
                  includeNullish={true}
                />
              </SlidePanel>
            </Div>
            <Div column sx={{maxHeight: '50%'}}>
              <SlideWidget sx={{flex: 1}} icon="group" title={m.mealMonitoringPdm.kits}>
                {formatLargeNumber(data.length)}
              </SlideWidget>
              <SlidePanel title={m.mealMonitoringPdm.itemsEskUsed}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.used_items_kit}
                  label={Protection_gbvPdm.options.used_items_kit}
                  includeNullish={true}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.treated}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.feel_staff_respect}
                  label={Protection_gbvPdm.options.informed_distribution_kits}
                  includeNullish={true}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.satisfiedNumber}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.satisfied_quantity_items}
                  label={Protection_gbvPdm.options.satisfied_quality_items}
                  includeNullish={true}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.satisfiedQuality}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.satisfied_quality_items}
                  label={Protection_gbvPdm.options.satisfied_quality_items}
                  includeNullish={true}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.relevant}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.kit_received_relevant}
                  label={Protection_gbvPdm.options.informed_distribution_kits}
                  includeNullish={true}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.info_used}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.information_use_items}
                  label={Protection_gbvPdm.options.informed_distribution_kits}
                  includeNullish={true}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.overall}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.satisfied_assistance_provided}
                  label={Protection_gbvPdm.options.informed_distribution_kits}
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
