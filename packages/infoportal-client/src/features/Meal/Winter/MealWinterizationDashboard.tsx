import React, {useMemo, useState} from 'react'
import {map, seq, Seq} from '@axanc/ts-utils'
import {useI18n} from '@/core/i18n'
import {PeriodPicker} from '@/shared/PeriodPicker/PeriodPicker'
import {ChartBarMultipleBy} from '@/shared/charts/ChartBarMultipleBy'
import {DebouncedInput} from '@/shared/DebouncedInput'
import {Div, SlidePanel} from '@/shared/PdfLayout/PdfSlide'
import {ChartPieWidgetBy} from '@/shared/charts/ChartPieWidgetBy'
import {DataFilter} from '@/shared/DataFilter/DataFilter'
import {MapSvgByOblast} from '@/shared/maps/MapSvgByOblast'
import {KoboSubmissionFlat, KoboXmlMapper, Meal_winterizationPdm, OblastIndex} from 'infoportal-common'
import {DataFilterLayout} from '@/shared/DataFilter/DataFilterLayout'
import {Page} from '@/shared/Page'
import {useKoboSchemaContext} from '@/features/KoboSchema/KoboSchemaContext'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import {useMealWinterizationContext} from '@/features/Meal/Winter/MealWinterizationContext'
import {appConfig} from '@/conf/AppConfig'
import {Panel, PanelBody} from '@/shared/Panel'
import {AgeGroupTable} from '@/shared'

export interface DashboardPageProps {
  filters: Record<string, string[]>
  data: Seq<KoboSubmissionFlat<Meal_winterizationPdm.T>>
}

const mapOblast = OblastIndex.koboOblastIndexIso

export const MealWinterizationDashboard = () => {
  const ctx = useMealWinterizationContext()
  const ctxSchema = useKoboSchemaContext()
  const schema = ctxSchema.byName.meal_winterizationPdm.get!
  const langIndex = ctxSchema.langIndex
  const {m, formatDateTime, formatDate} = useI18n()
  const [optionFilter, setOptionFilters] = useState<Record<string, string[] | undefined>>({})

  const filterShape = useMemo(() => {
    return DataFilter.makeShape<KoboSubmissionFlat<Meal_winterizationPdm.T>>({
      oblast: {
        icon: 'location_on',
        getValue: (_) => _.ben_det_oblast,
        getOptions: () => DataFilter.buildOptionsFromObject(Meal_winterizationPdm.options.ben_det_oblast),
        label: m.oblast,
      },
      office: {
        icon: 'share',
        getValue: (_) => _.office,
        getOptions: () => DataFilter.buildOptionsFromObject(Meal_winterizationPdm.options.office),
        label: m.office,
      },
      donor: {
        icon: 'handshake',
        getValue: (_) => _.donor,
        getOptions: () => DataFilter.buildOptionsFromObject(Meal_winterizationPdm.options.donor),
        label: m.donor,
      },
      pdmtype: {
        icon: appConfig.icons.project,
        getValue: (_) => _.pdmtype,
        getOptions: () => DataFilter.buildOptionsFromObject(Meal_winterizationPdm.options.pdmtype),
        label: m.mealMonitoringPdm.pdmType,
      },
    })
  }, [schema])

  const data = useMemo(() => {
    return map(ctx.fetcherAnswers.get, (_) => seq(DataFilter.filterData(_, filterShape, optionFilter)))
  }, [ctx.fetcherAnswers.get, optionFilter, filterShape])

  const persons = useMemo(() => {
    return data ? data.flatMap((entry) => KoboXmlMapper.Persons.winter_pdm(entry) ?? []) : []
  }, [data])

  return (
    <Page width="full" loading={ctx.fetcherAnswers.loading}>
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
                defaultValue={value ?? [undefined, undefined]}
                value={value ?? [undefined, undefined]}
                onChange={onChange}
                min={ctx.fetcherPeriod.get?.start}
                max={ctx.fetcherPeriod.get?.end}
                fullWidth={false}
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
                  title={m.mealMonitoringPdm.satisfiedAssistance}
                  data={data}
                  filter={(_) =>
                    _.satisfied_assistance_provided === 'rcyc' || _.satisfied_assistance_provided === 'rcnt'
                  }
                  filterBase={(_) =>
                    _.satisfied_assistance_provided === 'rcyc' ||
                    _.satisfied_assistance_provided === 'rcnr' ||
                    _.satisfied_assistance_provided === 'rcmy' ||
                    _.satisfied_assistance_provided === 'rcdk' ||
                    _.satisfied_assistance_provided === 'rcna' ||
                    _.satisfied_assistance_provided === 'rcnt'
                  }
                />
                <ChartPieWidgetBy
                  dense
                  title={m.mealMonitoringPdm.treated}
                  data={data}
                  filter={(_) => _.feel_treated_respect === 'rcyc' || _.feel_treated_respect === 'rcnt'}
                  filterBase={(_) =>
                    _.feel_treated_respect === 'rcyc' ||
                    _.feel_treated_respect === 'rcnr' ||
                    _.feel_treated_respect === 'rcmy' ||
                    _.feel_treated_respect === 'rcdk' ||
                    _.feel_treated_respect === 'rcna' ||
                    _.feel_treated_respect === 'rcnt'
                  }
                />
                <ChartPieWidgetBy
                  dense
                  title={m.mealMonitoringPdm.provideInfo}
                  data={data}
                  filter={(_) =>
                    _.organization_provide_information === 'yes' || _.organization_provide_information === 'no'
                  }
                />
                <ChartPieWidgetBy
                  dense
                  title={m.mealMonitoringPdm.helpedThermal}
                  data={data}
                  filter={(_) =>
                    _.helped_thermal_comfort === 'yes' ||
                    _.helped_thermal_comfort === 'no' ||
                    _.helped_thermal_comfort === 'other'
                  }
                />
                <ChartPieWidgetBy
                  dense
                  title={m.mealMonitoringPdm.satisfiedProcess}
                  data={data}
                  filter={(_) => _.satisfied_process === 'ndyl' || _.satisfied_process === 'ndna'}
                />
                <ChartPieWidgetBy
                  dense
                  title={m.mealMonitoringPdm.problems}
                  data={data}
                  filter={(_) => _.experience_problems === 'yes'}
                />
              </SlidePanel>
              <Panel savableAsImg expendable title={m.location}>
                <PanelBody>
                  <MapSvgByOblast
                    sx={{maxWidth: 480, margin: 'auto'}}
                    fillBaseOn="value"
                    data={data}
                    getOblast={(_) => mapOblast[_.ben_det_oblast!]}
                    value={(_) => true}
                    base={(_) => _.ben_det_oblast !== undefined}
                  />
                </PanelBody>
              </Panel>
              <Panel title={m.ageGroup}>
                <PanelBody>
                  <AgeGroupTable
                    tableId="pdm-dashboard"
                    persons={persons}
                    enableDisplacementStatusFilter
                    enablePwdFilter
                  />
                </PanelBody>
              </Panel>
              <SlidePanel title={m.project}>
                <ChartBarSingleBy data={data} by={(_) => _.donor} label={Meal_winterizationPdm.options.donor} />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.pdmType}>
                <ChartBarSingleBy data={data} by={(_) => _.pdmtype} label={Meal_winterizationPdm.options.pdmtype} />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.fuelCommon}>
                <ChartBarMultipleBy
                  data={data}
                  by={(_) => _.type_fuel_most}
                  label={Meal_winterizationPdm.options.type_fuel_most}
                />
              </SlidePanel>
            </Div>
            <Div column sx={{maxHeight: '50%'}}>
              <SlidePanel title={m.mealMonitoringPdm.betterInform}>
                <ChartBarMultipleBy
                  data={data}
                  by={(_) => _.better_inform_distribution}
                  label={Meal_winterizationPdm.options.better_inform_distribution}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.cashOrKind}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.cash_modality_inkind}
                  label={Meal_winterizationPdm.options.cash_modality_inkind}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.inAdvance}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.informed_amount_cash_receive}
                  label={Meal_winterizationPdm.options.were_informed_timeframe}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.assistanceCorrespond}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.amount_received_correspond}
                  label={Meal_winterizationPdm.options.were_informed_timeframe}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.isEnough}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.enough_hh_winter_season}
                  label={Meal_winterizationPdm.options.any_member_household}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.longCover}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.enough_hh_winter_season_cover}
                  label={Meal_winterizationPdm.options.time_elapsed_registration}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.access}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.access_basic_facilities}
                  label={Meal_winterizationPdm.options.any_member_household}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.priorityNeeds}>
                <ChartBarMultipleBy
                  data={data}
                  by={(_) => _.needs_community_currently}
                  label={Meal_winterizationPdm.options.needs_community_currently}
                />
              </SlidePanel>
            </Div>
          </Div>
        </>
      )}
    </Page>
  )
}
