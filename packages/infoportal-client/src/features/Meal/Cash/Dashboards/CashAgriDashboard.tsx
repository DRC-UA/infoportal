import React, {useMemo, useState} from 'react'
import {Seq, seq} from '@axanc/ts-utils'
import {Checkbox, FormControlLabel, Box, Tab, Tabs, Typography, TextField} from '@mui/material'

import {formatLargeNumber, useI18n} from '@/core/i18n'
import {DebouncedInput} from '@/shared/DebouncedInput'
import {Page} from '@/shared/Page'
import {Div, PdfSlide, PdfSlideBody, SlidePanel} from '@/shared/PdfLayout/PdfSlide'
import {Lazy} from '@/shared'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import {ChartBarMultipleBy} from '@/shared/charts/ChartBarMultipleBy'
import {ChartPieWidgetBy} from '@/shared/charts/ChartPieWidgetBy'
import {ChartBarGrouped, ChartBarVerticalGrouped} from '@/shared/charts/ChartBarGrouped'
import {useCashPdm, CashPdmData, CashPdmForm} from '@/features/Meal/Cash/Context/CashContext'

import {DataFilter} from '@/shared/DataFilter/DataFilter'
import {Meal_cashPdm, Ecrec_cashRegistration} from 'infoportal-common'
import {CashOverview} from '@/features/Meal/Cash/Components/CashOverview'
import {DataFilterLayout} from '@/shared/DataFilter/DataFilterLayout'
import {PeriodPicker} from '@/shared/PeriodPicker/PeriodPicker'
import {Registration} from '@/features/Meal/Cash/Components/Registration'
import {AbilityCover} from '@/features/Meal/Cash/Components/AbilityCover'
import {Outcome} from '@/features/Meal/Cash/Components/Outcome'
import {useCashFilter} from '@/features/Meal/Cash/Context/useCashFilter'
import {Coping} from '@/features/Meal/Cash/Components/Coping'

const PdfSectionTitle = ({children}: {children: React.ReactNode}) => (
  <Box
    sx={{
      px: 1,
      pb: 1,
      borderBottom: '2px solid',
      borderColor: (t) => t.palette.divider,
      mb: 2,
    }}
  >
    <Typography variant="h4" fontWeight="bold" color="text.primary">
      {children}
    </Typography>
  </Box>
)

const baseColors = ['#6b0606', '#a12222', '#cf5959', '#e89b9b']
const colorByQuestion: Record<string, string> = Object.fromEntries(
  [
    'lcs_sell_hh_assets',
    'lcs_spent_savings',
    'lcs_forrowed_food',
    'lcs_eat_elsewhere',
    'lcs_sell_productive_assets',
    'lcs_reduce_health_expenditures',
    'lcs_reduce_education_expenditures',
    'lcs_sell_house',
    'lcs_move_elsewhere',
    'lcs_degrading_income_source',
    'lcs_ask_stranger',
  ].map((q, i) => [q, baseColors[i % baseColors.length]]),
)

const lcsSections = [
  {
    severity: 'Crisis',
    questions: ['lcs_sell_productive_assets', 'lcs_reduce_health_expenditures', 'lcs_reduce_education_expenditures'],
  },
  {
    severity: 'Stress',
    questions: ['lcs_sell_hh_assets', 'lcs_spent_savings', 'lcs_forrowed_food', 'lcs_eat_elsewhere'],
  },
  {
    severity: 'Emergency',
    questions: ['lcs_sell_house', 'lcs_move_elsewhere', 'lcs_degrading_income_source', 'lcs_ask_stranger'],
  },
] as const

const buildLcsChartData = (data: CashPdmData<any>[], m: Record<string, string>): Record<string, ChartBarGrouped[]> =>
  Object.fromEntries(
    lcsSections.map(({severity, questions}) => {
      const bars = questions.map((qName) => {
        const valid = data.filter((d) => (d.answers as any)[qName] != null)
        return {
          key: qName,
          label: m[qName] ?? qName,
          value: valid.filter((d) => (d.answers as any)[qName] === 'yes').length,
          base: valid.length,
          color: colorByQuestion[qName],
        }
      })
      return [severity, [{category: severity, bars}]]
    }),
  )

export const CashAgriDashboard = () => {
  const ctx = useCashPdm()
  const {m} = useI18n()

  const {shape} = useCashFilter(ctx.fetcherAnswers.get)

  const [formTab, setFormTab] = useState<'PDM' | 'Registration'>('PDM')
  const [filters, setFilters] = useState<Record<string, string[] | undefined>>({})
  const [search, setSearch] = useState<string>('')
  const [onlyPdmEntries, setOnlyPdmEntries] = useState(false)

  const periodBounds = useMemo(() => {
    const p = ctx.fetcherPeriod.get
    if (!p) return {min: undefined as Date | undefined, max: undefined as Date | undefined}
    const starts = [p.cashPdm.start, p.ecrec.start].filter(Boolean) as Date[]
    const ends = [p.cashPdm.end, p.ecrec.end].filter(Boolean) as Date[]
    const min = starts.length ? new Date(Math.min(...starts.map((d) => d.getTime()))) : undefined
    const max = ends.length ? new Date(Math.max(...ends.map((d) => d.getTime()))) : undefined
    return {min, max}
  }, [ctx.fetcherPeriod.get])

  const data = useMemo(() => {
    if (!ctx.fetcherAnswers.get) return seq<CashPdmData<CashPdmForm>>([])

    let all = ctx.fetcherAnswers.get

    const ids = search
      .split(/\s+/)
      .map((id) => id.trim())
      .filter(Boolean)

    if (ids.length > 0) {
      all = all.filter((entry) => {
        if (entry.source === 'pdm') {
          const unique = (entry.answers as Meal_cashPdm.T).unique_number?.toString()
          return ids.some((id) => unique?.includes(id))
        }
        if (entry.source === 'ecrec') {
          const phone = (entry.answers as Ecrec_cashRegistration.T).ben_det_ph_number?.toString()
          return ids.some((id) => phone?.includes(id))
        }
        return false
      })
    }

    if (onlyPdmEntries) {
      const pdmIds = new Set(
        all
          .filter((_) => _.source === 'pdm')
          .map((_) => (_.answers as Meal_cashPdm.T).unique_number as any)
          .filter(Boolean),
      )
      all = all.filter((entry) => {
        if (entry.source === 'pdm') return true
        if (entry.source === 'ecrec') {
          const phone = (entry.answers as Ecrec_cashRegistration.T).ben_det_ph_number
          return phone !== undefined && pdmIds.has(phone)
        }
        return false
      })
    }

    return DataFilter.filterData(all, shape, filters)
  }, [ctx.fetcherAnswers.get, shape, filters, search, onlyPdmEntries])

  const dataCash = useMemo(
    () => seq(data).filter((_) => _.source === 'pdm') as Seq<CashPdmData<Meal_cashPdm.T>>,
    [data],
  )
  const dataEcrec = useMemo(
    () => seq(data).filter((_) => _.source === 'ecrec') as Seq<CashPdmData<Ecrec_cashRegistration.T>>,
    [data],
  )

  const chartDataCash = useMemo(() => buildLcsChartData(dataCash, m.mealMonitoringPdm), [dataCash, m])
  const chartDataEcrec = useMemo(() => buildLcsChartData(dataEcrec, m.mealMonitoringPdm), [dataEcrec, m])

  return (
    <Page width="lg" loading={ctx.fetcherAnswers.loading}>
      <DataFilterLayout
        shapes={shape}
        filters={filters}
        setFilters={setFilters}
        before={
          <>
            <FormControlLabel
              control={<Checkbox checked={onlyPdmEntries} onChange={(e) => setOnlyPdmEntries(e.target.checked)} />}
              label={m.mealMonitoringPdm.onlyPdm}
            />
            <DebouncedInput<[Date | undefined, Date | undefined]>
              debounce={400}
              value={[ctx.periodFilter.start, ctx.periodFilter.end]}
              onChange={([start, end]) => ctx.setPeriodFilter((prev) => ({...prev, start, end}))}
            >
              {(value, onChange) => (
                <PeriodPicker
                  defaultValue={value}
                  value={value}
                  onChange={onChange}
                  min={periodBounds.min}
                  max={periodBounds.max}
                  fullWidth={false}
                />
              )}
            </DebouncedInput>

            <Box sx={{display: 'flex', alignItems: 'center'}}>
              <TextField
                label="Unique ID or Phone"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                size="small"
                placeholder="Search by Unique ID or Phone"
                sx={{minWidth: 220, ml: 1}}
              />
            </Box>
          </>
        }
      />
      {data && (
        <>
          {seq(dataCash).length > 0 && <CashOverview data={dataCash} />}
          {seq(dataCash).length > 0 && <Registration data={dataCash} />}

          <PdfSectionTitle>{m.mealMonitoringPdm.sufficiency}</PdfSectionTitle>
          <PdfSlide>
            <PdfSlideBody>
              <Div responsive>
                <Div column sx={{maxHeight: '33%'}}>
                  <SlidePanel title={m.mealMonitoringPdm.whatPrefer}>
                    <ChartBarSingleBy
                      data={dataCash}
                      by={(_) => _.answers.cash_modality_inkind}
                      label={Meal_cashPdm.options.cash_modality_inkind}
                      includeNullish
                    />
                  </SlidePanel>
                  <SlidePanel title={m.mealMonitoringPdm.sufficient}>
                    <ChartPieWidgetBy
                      dense
                      title={m.mealMonitoringPdm.livestock}
                      data={dataCash}
                      filter={(_) =>
                        _.answers.received_feed_livestock_winter === 'yes' ||
                        _.answers.received_feed_livestock_winter === 'no'
                      }
                      filterBase={(_) =>
                        _.answers.received_feed_livestock_winter === 'yes' ||
                        _.answers.received_feed_livestock_winter === 'no'
                      }
                    />
                    <ChartPieWidgetBy
                      dense
                      title={m.mealMonitoringPdm.spring}
                      data={dataCash}
                      filter={(_) =>
                        _.answers.received_enough_agricultural_needs === 'yes' ||
                        _.answers.received_enough_agricultural_needs === 'no'
                      }
                      filterBase={(_) =>
                        _.answers.received_enough_agricultural_needs === 'yes' ||
                        _.answers.received_enough_agricultural_needs === 'no'
                      }
                    />
                    <ChartPieWidgetBy
                      dense
                      title={m.mealMonitoringPdm.renovate}
                      data={dataCash}
                      filter={(_) =>
                        _.answers.amount_received_renovation_shelter === 'yes' ||
                        _.answers.amount_received_renovation_shelter === 'no'
                      }
                      filterBase={(_) =>
                        _.answers.amount_received_renovation_shelter === 'yes' ||
                        _.answers.amount_received_renovation_shelter === 'no'
                      }
                    />
                  </SlidePanel>
                </Div>

                <Div column sx={{maxHeight: '33%'}}>
                  <SlidePanel title={m.mealMonitoringPdm.lifestockEnough}>
                    <ChartBarSingleBy
                      data={dataCash}
                      by={(_) => _.answers.received_feed_livestock_winter_long}
                      label={Meal_cashPdm.options.received_feed_livestock_winter_long}
                      includeNullish
                    />
                  </SlidePanel>
                  <SlidePanel title={m.mealMonitoringPdm.trainingNeed}>
                    <ChartBarSingleBy
                      data={dataCash}
                      by={(_) => _.answers.training_inductions_agricultural}
                      label={Meal_cashPdm.options.any_member_household}
                      includeNullish
                    />
                  </SlidePanel>
                </Div>

                <Div column sx={{maxHeight: '33%'}}>
                  <SlidePanel title={m.mealMonitoringPdm.completed}>
                    <ChartBarSingleBy
                      data={dataCash}
                      by={(_) => _.answers.completed_renovation_livestock}
                      label={Meal_cashPdm.options.any_member_household}
                      includeNullish
                    />
                  </SlidePanel>
                  <SlidePanel title={m.mealMonitoringPdm.howLong}>
                    <ChartBarSingleBy
                      data={dataCash}
                      by={(_) => _.answers.received_enough_agricultural_needs_long}
                      label={Meal_cashPdm.options.received_enough_agricultural_needs_long}
                      includeNullish
                    />
                  </SlidePanel>
                </Div>
              </Div>
            </PdfSlideBody>
          </PdfSlide>
          <PdfSlide>
            <PdfSlideBody>
              <Div responsive>
                <Div column sx={{maxHeight: '50%'}}>
                  <SlidePanel title={m.mealMonitoringPdm.typePrefer}>
                    <ChartBarSingleBy
                      data={dataCash}
                      by={(_) => _.answers.type_assistance_agricultural}
                      label={Meal_cashPdm.options.type_assistance_agricultural}
                      includeNullish
                    />
                  </SlidePanel>
                  <SlidePanel title={m.mealMonitoringPdm.itemsHelpful}>
                    <ChartBarSingleBy
                      data={dataCash}
                      by={(_) => _.answers.items_helpful_agriculture}
                      label={Meal_cashPdm.options.items_helpful_agriculture}
                      includeNullish
                    />
                  </SlidePanel>
                </Div>
                <Div column sx={{maxHeight: '50%'}}>
                  <SlidePanel title={m.mealMonitoringPdm.infoTraining}>
                    <ChartBarSingleBy
                      data={dataCash}
                      by={(_) => _.answers.type_training_helpful}
                      label={Meal_cashPdm.options.type_training_helpful}
                      includeNullish
                    />
                  </SlidePanel>
                  <SlidePanel title={m.mealMonitoringPdm.trainingImprove}>
                    <ChartBarSingleBy
                      data={dataCash}
                      by={(_) => _.answers.training_improve_agricultural}
                      label={Meal_cashPdm.options.training_improve_agricultural}
                      includeNullish
                    />
                  </SlidePanel>
                </Div>
              </Div>
            </PdfSlideBody>
          </PdfSlide>

          <PdfSectionTitle>{m.mealMonitoringPdm.lcs}</PdfSectionTitle>
          <PdfSlide>
            <PdfSlideBody>
              <Box display="flex" justifyContent="center" mb={2}>
                <Tabs value={formTab} onChange={(_, v) => setFormTab(v)}>
                  <Tab value="PDM" label="PDM" />
                  <Tab value="Registration" label="Registration" />
                </Tabs>
              </Box>
              <Div responsive>
                {['Emergency', 'Crisis', 'Stress'].map((severity) => (
                  <Div key={severity} column>
                    <SlidePanel
                      title={`${severity}`}
                      sx={{
                        '& .MuiTypography-root': {
                          textAlign: 'center',
                          width: '100%',
                        },
                      }}
                    >
                      <ChartBarVerticalGrouped
                        data={formTab === 'PDM' ? chartDataCash[severity] : chartDataEcrec[severity]}
                      />
                    </SlidePanel>
                  </Div>
                ))}
              </Div>
            </PdfSlideBody>
          </PdfSlide>

          <PdfSlide>
            <PdfSlideBody>
              <PdfSectionTitle>{m.mealMonitoringPdm.baseline}</PdfSectionTitle>
              <Div responsive>
                <Div column sx={{maxHeight: '33%'}}>
                  <SlidePanel title={m.mealMonitoringPdm.lcs_sell_hh_assets}>
                    <ChartBarSingleBy
                      data={dataEcrec}
                      by={(_) => _.answers.lcs_sell_hh_assets}
                      label={Ecrec_cashRegistration.options.lost_breadwiner}
                      includeNullish
                    />
                  </SlidePanel>
                  <SlidePanel title={m.mealMonitoringPdm.lcs_spent_savings}>
                    <ChartBarSingleBy
                      data={dataEcrec}
                      by={(_) => _.answers.lcs_spent_savings}
                      label={Ecrec_cashRegistration.options.lost_breadwiner}
                      includeNullish
                    />
                  </SlidePanel>
                </Div>
                <Div column sx={{maxHeight: '33%'}}>
                  <SlidePanel>
                    <Box display="flex" justifyContent="space-between" alignItems="center" gap={2}>
                      {[
                        {
                          icon: 'fingerprint',
                          label: m.households,
                          valueFn: () => seq(dataEcrec).length,
                        },
                        {
                          icon: 'person',
                          label: m.individuals,
                          valueFn: () =>
                            seq(dataEcrec)
                              .map((_) => _.answers.ben_det_hh_size)
                              .compact()
                              .sum(),
                        },
                      ].map(({icon, label, valueFn}) => (
                        <Box key={label} display="flex" flexDirection="column" alignItems="center" flex={1}>
                          <Lazy deps={[dataEcrec]} fn={valueFn}>
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
                  <SlidePanel title={m.mealMonitoringPdm.lcs_forrowed_food}>
                    <ChartBarSingleBy
                      data={dataEcrec}
                      by={(_) => _.answers.lcs_forrowed_food}
                      label={Ecrec_cashRegistration.options.lost_breadwiner}
                      includeNullish
                    />
                  </SlidePanel>
                </Div>
                <Div column sx={{maxHeight: '33%'}}>
                  <SlidePanel title={m.mealMonitoringPdm.lcs_sell_productive_assets}>
                    <ChartBarSingleBy
                      data={dataEcrec}
                      by={(_) => _.answers.lcs_sell_productive_assets}
                      label={Ecrec_cashRegistration.options.lost_breadwiner}
                      includeNullish
                    />
                  </SlidePanel>
                  <SlidePanel title={m.mealMonitoringPdm.lcs_reduce_health_expenditures}>
                    <ChartBarSingleBy
                      data={dataEcrec}
                      by={(_) => _.answers.lcs_reduce_health_expenditures}
                      label={Ecrec_cashRegistration.options.lost_breadwiner}
                      includeNullish
                    />
                  </SlidePanel>
                </Div>
              </Div>
            </PdfSlideBody>
          </PdfSlide>

          <PdfSlide>
            <PdfSlideBody>
              <Div responsive>
                <Div column sx={{maxHeight: '33%'}}>
                  <SlidePanel title={m.mealMonitoringPdm.lcs_sell_house}>
                    <ChartBarSingleBy
                      data={dataEcrec}
                      by={(_) => _.answers.lcs_sell_house}
                      label={Ecrec_cashRegistration.options.lost_breadwiner}
                      includeNullish
                    />
                  </SlidePanel>
                  <SlidePanel title={m.mealMonitoringPdm.lcs_move_elsewhere}>
                    <ChartBarSingleBy
                      data={dataEcrec}
                      by={(_) => _.answers.lcs_move_elsewhere}
                      label={Ecrec_cashRegistration.options.lost_breadwiner}
                      includeNullish
                    />
                  </SlidePanel>
                </Div>
                <Div column sx={{maxHeight: '33%'}}>
                  <SlidePanel title={m.mealMonitoringPdm.lcs_reason}>
                    <ChartBarMultipleBy
                      data={dataEcrec}
                      by={(_) => _.answers.lcs_reason}
                      label={Ecrec_cashRegistration.options.lcs_reason}
                    />
                  </SlidePanel>
                  <SlidePanel title={m.mealMonitoringPdm.lcs_eat_elsewhere}>
                    <ChartBarSingleBy
                      data={dataEcrec}
                      by={(_) => _.answers.lcs_eat_elsewhere}
                      label={Ecrec_cashRegistration.options.lost_breadwiner}
                      includeNullish
                    />
                  </SlidePanel>
                </Div>
                <Div column sx={{maxHeight: '33%'}}>
                  <SlidePanel title={m.mealMonitoringPdm.lcs_degrading_income_source}>
                    <ChartBarSingleBy
                      data={dataEcrec}
                      by={(_) => _.answers.lcs_degrading_income_source}
                      label={Ecrec_cashRegistration.options.lost_breadwiner}
                      includeNullish
                    />
                  </SlidePanel>
                  <SlidePanel title={m.mealMonitoringPdm.lcs_ask_stranger}>
                    <ChartBarSingleBy
                      data={dataEcrec}
                      by={(_) => _.answers.lcs_ask_stranger}
                      label={Ecrec_cashRegistration.options.lost_breadwiner}
                      includeNullish
                    />
                  </SlidePanel>
                </Div>
              </Div>
            </PdfSlideBody>
          </PdfSlide>
          {seq(dataCash).length > 0 && <Coping data={dataCash} />}
          {seq(dataCash).length > 0 && <AbilityCover data={dataCash} />}
          {seq(dataCash).length > 0 && <Outcome data={dataCash} />}
          <PdfSlide>
            <PdfSlideBody>
              <Div responsive>
                <Div column sx={{maxHeight: '33%'}}>
                  <SlidePanel title={m.mealMonitoringPdm.feedback}>
                    <ChartPieWidgetBy
                      dense
                      title={m.mealMonitoringPdm.satisfiedAmount}
                      data={dataCash}
                      filter={(_) =>
                        _.answers.satisfied_cash_amount === 'yes' || _.answers.satisfied_cash_amount === 'no'
                      }
                    />
                    <ChartPieWidgetBy
                      dense
                      title={m.mealMonitoringPdm.treated}
                      data={dataCash}
                      filter={(_) =>
                        _.answers.feel_treated_respect === 'rcyc' || _.answers.feel_treated_respect === 'rcnt'
                      }
                      filterBase={(_) =>
                        _.answers.feel_treated_respect === 'rcyc' ||
                        _.answers.feel_treated_respect === 'rcnt' ||
                        _.answers.feel_treated_respect === 'rcnr' ||
                        _.answers.feel_treated_respect === 'rcmy' ||
                        _.answers.feel_treated_respect === 'rcdk' ||
                        _.answers.feel_treated_respect === 'rcna'
                      }
                    />
                    <ChartPieWidgetBy
                      dense
                      title={m.mealMonitoringPdm.provideInfo}
                      data={dataCash}
                      filter={(_) => _.answers.organization_provide_information === 'yes'}
                    />
                    <ChartPieWidgetBy
                      dense
                      title={m.mealMonitoringPdm.satisfiedProcess}
                      data={dataCash}
                      filter={(_) => _.answers.satisfied_process === 'ndyl' || _.answers.satisfied_process === 'ndna'}
                    />
                    <ChartPieWidgetBy
                      dense
                      title={m.mealMonitoringPdm.correspond}
                      data={dataCash}
                      filter={(_) => _.answers.amount_cash_received_correspond === 'yes'}
                    />
                    <ChartPieWidgetBy
                      dense
                      title={m.mealMonitoringPdm.problems}
                      data={dataCash}
                      filter={(_) => _.answers.experience_problems === 'yes'}
                    />
                  </SlidePanel>
                  <SlidePanel title={m.mealMonitoringPdm.betterInform}>
                    <ChartBarMultipleBy
                      data={dataCash}
                      by={(_) => _.answers.better_inform_distribution}
                      label={Meal_cashPdm.options.better_inform_distribution}
                    />
                  </SlidePanel>
                </Div>
                <Div column sx={{maxHeight: '33%'}}>
                  <SlidePanel title={m.mealMonitoringPdm.assistanceReceive}>
                    <ChartBarSingleBy
                      data={dataCash}
                      by={(_) => _.answers.assistance_delivered}
                      label={Meal_cashPdm.options.assistance_delivered}
                    />
                  </SlidePanel>
                  <SlidePanel title={m.mealMonitoringPdm.timeToTake}>
                    <ChartBarSingleBy
                      data={dataCash}
                      by={(_) => _.answers.time_registered_assistance}
                      label={Meal_cashPdm.options.time_registered_assistance}
                    />
                  </SlidePanel>
                </Div>
                <Div column sx={{maxHeight: '33%'}}>
                  <SlidePanel title={m.mealMonitoringPdm.priorityNeeds}>
                    <ChartBarMultipleBy
                      data={dataCash}
                      by={(_) => _.answers.needs_community_currently}
                      label={Meal_cashPdm.options.needs_community_currently}
                    />
                  </SlidePanel>
                </Div>
              </Div>
            </PdfSlideBody>
          </PdfSlide>
        </>
      )}
    </Page>
  )
}
