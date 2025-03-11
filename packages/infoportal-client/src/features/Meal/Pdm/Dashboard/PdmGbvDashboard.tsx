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
import {formatLargeNumber} from '@/core/i18n/localization/en'

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
  const {m, formatDateTime, formatDate} = useI18n()
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
                defaultValue={value ?? [undefined, undefined]}
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
              <SlidePanel title={m.mealMonitoringPdm.feedback}>
                <ChartPieWidgetBy
                  dense
                  title={m.mealMonitoringPdm.kitContentTold}
                  data={data}
                  filter={(_) => _.answers.items_received_kit === 'yes' || _.answers.items_received_kit === 'no'}
                  filterBase={(_) =>
                    _.answers.items_received_kit === 'yes' ||
                    _.answers.items_received_kit === 'no' ||
                    _.answers.items_received_kit === 'pna'
                  }
                />
                <ChartPieWidgetBy
                  dense
                  title={m.mealMonitoringPdm.esk_used}
                  data={data}
                  filter={(_) => _.answers.used_items_kit === 'yes'}
                  filterBase={(_) =>
                    _.answers.used_items_kit === 'yes' ||
                    _.answers.used_items_kit === 'no' ||
                    _.answers.used_items_kit === 'pna' ||
                    _.answers.used_items_kit === 'not_yet'
                  }
                />
                <ChartPieWidgetBy
                  dense
                  title={m.mealMonitoringPdm.treated}
                  data={data}
                  filter={(_) => _.answers.feel_staff_respect === 'yes'}
                  filterBase={(_) =>
                    _.answers.feel_staff_respect === 'no' ||
                    _.answers.feel_staff_respect === 'yes' ||
                    _.answers.feel_staff_respect === 'pna'
                  }
                />
                <ChartPieWidgetBy
                  dense
                  title={m.mealMonitoringPdm.satisfiedNumber}
                  data={data}
                  filter={(_) => _.answers.satisfied_quantity_items === 'satisfied'}
                  filterBase={(_) =>
                    _.answers.satisfied_quantity_items === 'satisfied' ||
                    _.answers.satisfied_quantity_items === 'pna' ||
                    _.answers.satisfied_quantity_items === 'dissatisfied' ||
                    _.answers.satisfied_quantity_items === 'partially'
                  }
                />
                <ChartPieWidgetBy
                  dense
                  title={m.mealMonitoringPdm.satisfiedQuality}
                  data={data}
                  filter={(_) => _.answers.satisfied_quality_items === 'satisfied'}
                  filterBase={(_) =>
                    _.answers.satisfied_quality_items === 'satisfied' ||
                    _.answers.satisfied_quality_items === 'dissatisfied' ||
                    _.answers.satisfied_quality_items === 'partially' ||
                    _.answers.satisfied_quality_items === 'pna'
                  }
                />
                <ChartPieWidgetBy
                  dense
                  title={m.mealMonitoringPdm.relevant}
                  data={data}
                  filter={(_) => _.answers.kit_received_relevant === 'yes'}
                  filterBase={(_) =>
                    _.answers.kit_received_relevant === 'yes' ||
                    _.answers.kit_received_relevant === 'no' ||
                    _.answers.kit_received_relevant === 'pna'
                  }
                />
              </SlidePanel>
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
            </Div>
            <Div column sx={{maxHeight: '50%'}}>
              <SlideWidget sx={{flex: 1}} icon="group" title={m.mealMonitoringPdm.kits}>
                {formatLargeNumber(data.length)}
              </SlideWidget>
              <SlidePanel title={m.mealMonitoringPdm.implementation}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.type_implementation ?? 'drc'}
                  label={Protection_gbvPdm.options.type_implementation}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.partner_type}>
                <ChartBarSingleBy data={data} by={(_) => _.answers.partner} label={Protection_gbvPdm.options.partner} />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.info_used}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.information_use_items}
                  label={Protection_gbvPdm.options.feel_staff_respect}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.overall}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.satisfied_assistance_provided}
                  label={Protection_gbvPdm.options.feel_staff_respect}
                />
              </SlidePanel>
            </Div>
          </Div>
        </>
      )}
    </Page>
  )
}
