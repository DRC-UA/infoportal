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
import {KoboSubmissionFlat, KoboXmlMapper, Meal_winterizationPdm, OblastIndex, PeriodHelper} from 'infoportal-common'
import {DataFilterLayout} from '@/shared/DataFilter/DataFilterLayout'
import {Page} from '@/shared/Page'
import {useKoboSchemaContext} from '@/features/KoboSchema/KoboSchemaContext'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import {useMealWinterizationContext} from '@/features/Meal/Winter/MealWinterizationContext'
import {appConfig} from '@/conf/AppConfig'
import {Panel, PanelBody} from '@/shared/Panel'
import {AgeGroupTable, Lazy} from '@/shared'
import {Box} from '@mui/material'
import {formatLargeNumber} from '@/core/i18n/localization/en'

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
      raion: {
        icon: 'location_on',
        getValue: (_) => _.ben_det_raion,
        getOptions: () => DataFilter.buildOptionsFromObject(Meal_winterizationPdm.options.ben_det_raion),
        label: m.raion,
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
            <Div column>
              <SlidePanel>
                <Box display="flex" justifyContent="space-between" alignItems="center" gap={4}>
                  {[
                    {
                      icon: 'fingerprint',
                      label: m.individualsInterviewed,
                      valueFn: () => seq(data).length,
                    },
                    {
                      icon: 'location_on',
                      label: m.coveredOblasts,
                      valueFn: () => {
                        const values = seq(data)
                          .map((_) => _.ben_det_oblast)
                          .compact()
                        return values.distinct((_) => _).length
                      },
                    },
                    {
                      icon: 'location_on',
                      label: m.coveredRaions,
                      valueFn: () => {
                        const values = seq(data)
                          .map((_) => _.ben_det_raion)
                          .compact()
                        return values.distinct((_) => _).length
                      },
                    },
                    {
                      icon: 'payments',
                      label: m.individualsAssistance,
                      valueFn: () => {
                        return seq(data).filter((_) => _.spent_cash_assistance_received === 'yes').length
                      },
                    },
                  ].map(({icon, label, valueFn}) => (
                    <Box key={label} display="flex" flexDirection="column" alignItems="center" flex={1}>
                      <Lazy deps={[data]} fn={valueFn}>
                        {(value) => (
                          <Box display="flex" alignItems="center" gap={1}>
                            <span className="material-icons" style={{fontSize: 20, color: '#555'}}>
                              {icon}
                            </span>
                            <strong style={{fontSize: 18}}>{formatLargeNumber(value)}</strong>
                          </Box>
                        )}
                      </Lazy>
                      <Box fontSize={12} mt={0.5} textAlign="center">
                        {label.toUpperCase()}
                      </Box>
                    </Box>
                  ))}
                </Box>
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
              <SlidePanel>
                <SlidePanel title={m.project}>
                  <ChartBarSingleBy data={data} by={(_) => _.donor} label={Meal_winterizationPdm.options.donor} />
                </SlidePanel>
                <SlidePanel title={m.mealMonitoringPdm.pdmType}>
                  <ChartBarSingleBy data={data} by={(_) => _.pdmtype} label={Meal_winterizationPdm.options.pdmtype} />
                </SlidePanel>
              </SlidePanel>
              <SlidePanel>
                <SlidePanel title={m.mealMonitoringPdm.priorityNeeds}>
                  <ChartBarMultipleBy
                    data={data}
                    by={(_) => _.needs_community_currently}
                    label={Meal_winterizationPdm.options.needs_community_currently}
                  />
                </SlidePanel>
              </SlidePanel>
            </Div>
            <Div column sx={{maxHeight: '33%'}}>
              <SlidePanel>
                <ChartPieWidgetBy
                  title={m.mealMonitoringPdm.cashOrKind}
                  filter={(_) => _.cash_modality_inkind === 'yes'}
                  data={data}
                  sx={{mb: 1}}
                />
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.cash_modality_inkind}
                  label={Meal_winterizationPdm.options.cash_modality_inkind}
                />
              </SlidePanel>
              <SlidePanel>
                <ChartPieWidgetBy
                  title={m.mealMonitoringPdm.spent}
                  filter={(_) => _.spent_cash_assistance_received === 'yes'}
                  filterBase={(_) =>
                    _.spent_cash_assistance_received === 'yes' || _.spent_cash_assistance_received === 'no'
                  }
                  data={data}
                  sx={{mb: 1}}
                />
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.spent_cash_assistance_received}
                  label={Meal_winterizationPdm.options.amount_cash_received_correspond}
                />
              </SlidePanel>
              <SlidePanel>
                <SlidePanel title={m.mealMonitoringPdm.fuelCommon}>
                  <ChartBarMultipleBy
                    data={data}
                    by={(_) => _.type_fuel_most}
                    label={Meal_winterizationPdm.options.type_fuel_most}
                  />
                </SlidePanel>
                <SlidePanel title={m.mealMonitoringPdm.manage}>
                  <ChartBarSingleBy
                    data={data}
                    by={(_) => _.manage_solid_fuel}
                    label={Meal_winterizationPdm.options.were_informed_timeframe}
                  />
                </SlidePanel>
                <SlidePanel title={m.mealMonitoringPdm.longCover}>
                  <ChartBarSingleBy
                    data={data}
                    by={(_) => _.enough_hh_winter_season_cover}
                    label={Meal_winterizationPdm.options.time_elapsed_registration}
                  />
                </SlidePanel>
              </SlidePanel>
              <SlidePanel>
                <ChartPieWidgetBy
                  title={m.mealMonitoringPdm.isEnough}
                  filter={(_) => _.enough_hh_winter_season === 'yes'}
                  data={data}
                  sx={{mb: 1}}
                />
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.enough_hh_winter_season}
                  label={Meal_winterizationPdm.options.any_member_household}
                />
              </SlidePanel>
              <SlidePanel>
                <ChartPieWidgetBy
                  title={m.mealMonitoringPdm.access}
                  filter={(_) => _.access_basic_facilities === 'yes'}
                  data={data}
                  sx={{mb: 1}}
                />
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.access_basic_facilities}
                  label={Meal_winterizationPdm.options.any_member_household}
                />
              </SlidePanel>
            </Div>
            <Div column>
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
                  title={m.mealMonitoringPdm.feelSafe}
                  data={data}
                  filter={(_) => _.feel_safe_travelling === 'rcyc' || _.feel_safe_travelling === 'rcnt'}
                  filterBase={(_) =>
                    _.feel_safe_travelling === 'rcyc' ||
                    _.feel_safe_travelling === 'rcnr' ||
                    _.feel_safe_travelling === 'rcmy' ||
                    _.feel_safe_travelling === 'rcdk' ||
                    _.feel_safe_travelling === 'rcna' ||
                    _.feel_safe_travelling === 'rcnt'
                  }
                />
                <ChartPieWidgetBy
                  dense
                  title={m.mealMonitoringPdm.problems}
                  data={data}
                  filter={(_) => _.experience_problems === 'yes'}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.betterInform}>
                <ChartBarMultipleBy
                  data={data}
                  by={(_) => _.better_inform_distribution}
                  label={Meal_winterizationPdm.options.better_inform_distribution}
                />
              </SlidePanel>
              <SlidePanel>
                <SlidePanel>
                  <ChartPieWidgetBy
                    title={m.mealMonitoringPdm.inAdvance}
                    filter={(_) => _.informed_amount_cash_receive === 'yes'}
                    data={data}
                    sx={{mb: 1}}
                  />
                  <ChartBarSingleBy
                    data={data}
                    by={(_) => _.informed_amount_cash_receive}
                    label={Meal_winterizationPdm.options.were_informed_timeframe}
                  />
                </SlidePanel>
                <SlidePanel>
                  <ChartPieWidgetBy
                    title={m.mealMonitoringPdm.assistanceCorrespond}
                    filter={(_) => _.amount_received_correspond === 'yes'}
                    data={data}
                    sx={{mb: 1}}
                  />
                  <ChartBarSingleBy
                    data={data}
                    by={(_) => _.amount_received_correspond}
                    label={Meal_winterizationPdm.options.were_informed_timeframe}
                  />
                </SlidePanel>
              </SlidePanel>
            </Div>
          </Div>
        </>
      )}
    </Page>
  )
}
