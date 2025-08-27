import React, {useMemo, useState} from 'react'
import {Seq, seq} from '@axanc/ts-utils'
import {useI18n} from '@/core/i18n'
import {PeriodPicker} from '@/shared/PeriodPicker/PeriodPicker'
import {DebouncedInput} from '@/shared/DebouncedInput'
import {Div, PdfSlide, PdfSlideBody, SlidePanel} from '@/shared/PdfLayout/PdfSlide'
import {DataFilter} from '@/shared/DataFilter/DataFilter'
import {Meal_cashPdm, Ecrec_cashRegistration, OblastIndex, Shelter_nta} from 'infoportal-common'
import {DataFilterLayout} from '@/shared/DataFilter/DataFilterLayout'
import {Page} from '@/shared/Page'
import {useKoboSchemaContext} from '@/features/KoboSchema/KoboSchemaContext'
import {PdmData, PdmForm, useMealPdmContext} from '@/features/Meal/Pdm/Context/MealPdmContext'
import {appConfig} from '@/conf/AppConfig'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import {ChartPieWidgetBy} from '@/shared/charts/ChartPieWidgetBy'
import {ChartBarMultipleBy} from '@/shared/charts/ChartBarMultipleBy'
import {AgeGroupTable} from '@/shared/AgeGroupTable'
import {Panel, PanelBody} from '@/shared/Panel'
import {MapSvgByOblast} from '@/shared/maps/MapSvgByOblast'
import {usePdmFilters} from '@/features/Meal/Pdm/Context/usePdmFilter'
import {Box, Checkbox, FormControlLabel, Tab, Tabs, TextField, Typography} from '@mui/material'
import {Lazy} from '@/shared'
import {ChartBarGrouped, ChartBarVerticalGrouped} from '@/shared/charts/ChartBarGrouped'

const mapOblast = OblastIndex.koboOblastIndexIso

const isCashOrEcrec = (_: PdmData<PdmForm>): _ is PdmData<Meal_cashPdm.T | Ecrec_cashRegistration.T> =>
  _.type === 'Cash' || _.type === 'Ecrec'

const PdfSectionTitle = ({children}: {children: React.ReactNode}) => {
  return (
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
}

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
]

const buildLcsChartData = (data: PdmData<any>[], m: Record<string, string>): Record<string, ChartBarGrouped[]> => {
  return Object.fromEntries(
    lcsSections.map(({severity, questions}) => {
      const bars = questions.map((qName) => {
        const valid = data.filter((d) => d.answers[qName] != null)
        return {
          key: qName,
          label: m[qName] ?? qName,
          value: valid.filter((d) => d.answers[qName] === 'yes').length,
          base: valid.length,
          color: colorByQuestion[qName],
        }
      })
      return [severity, [{category: severity, bars}]]
    }),
  )
}

export const MealPdmCashDashboard = () => {
  const ctx = useMealPdmContext()
  const ctxSchema = useKoboSchemaContext()
  const schema = ctxSchema.byName.meal_cashPdm.get!
  const langIndex = ctxSchema.langIndex
  const {m, formatLargeNumber} = useI18n()
  const {shape: commonShape} = usePdmFilters(ctx.fetcherAnswers.get?.filter(isCashOrEcrec))
  const [formTab, setFormTab] = useState<'PDM' | 'Registration'>('PDM')
  const [searchUniqueId, setSearchUniqueId] = useState<string>('')
  const [optionFilter, setOptionFilters] = useState<Record<string, string[] | undefined>>({})
  const [onlyPdmEntries, setOnlyPdmEntries] = useState(false)
  const filterShape = useMemo(() => {
    return DataFilter.makeShape<PdmData<Meal_cashPdm.T | Ecrec_cashRegistration.T>>({
      ...commonShape,
      pdmtype: {
        icon: appConfig.icons.project,
        getOptions: () =>
          schema.helper.getOptionsByQuestionName('pdmtype').map((_) => ({
            value: _.name,
            label: _.label[langIndex],
          })),
        label: m.mealMonitoringPdm.pdmType,
        getValue: (_): string | undefined => {
          if (_.type === 'Cash') {
            const cashAnswers = _.answers as Meal_cashPdm.T
            return cashAnswers.pdmtype?.[0]
          }
          return undefined
        },
      },
      received: {
        icon: 'check_circle',
        getOptions: () => DataFilter.buildOptionsFromObject(Meal_cashPdm.options.any_member_household),
        label: m.mealMonitoringPdm.received,
        getValue: (_): string | undefined => {
          if (_.type === 'Cash') {
            const cashAnswers = _.answers as Meal_cashPdm.T
            return cashAnswers.did_receive_cash
          }
          return undefined
        },
      },
    })
  }, [commonShape, schema])

  const data = useMemo(() => {
    if (!ctx.fetcherAnswers.get) return seq<PdmData<Meal_cashPdm.T | Ecrec_cashRegistration.T>>([])
    let all = ctx.fetcherAnswers.get.filter(isCashOrEcrec)
    const ids = searchUniqueId
      .split(/\s+/)
      .map((id) => id.trim())
      .filter(Boolean)

    if (ids.length > 0) {
      all = all.filter((entry) => {
        if (entry.type === 'Cash') {
          const unique = (entry.answers as Meal_cashPdm.T).unique_number?.toString()
          return ids.some((id) => unique?.includes(id))
        }
        if (entry.type === 'Ecrec') {
          const phone = (entry.answers as Ecrec_cashRegistration.T).ben_det_ph_number?.toString()
          return ids.some((id) => phone?.includes(id))
        }
        return false
      })
    }

    if (onlyPdmEntries) {
      const pdmPhones = new Set(
        all
          .filter((_) => _.type === 'Cash')
          .map((_) => (_.answers as Meal_cashPdm.T).unique_number)
          .filter(Boolean),
      )
      all = all.filter((entry) => {
        if (entry.type === 'Cash') return true
        if (entry.type === 'Ecrec') {
          const phone = (entry.answers as Ecrec_cashRegistration.T).ben_det_ph_number
          return phone !== undefined && pdmPhones.has(phone)
        }
        return false
      })
    }
    return DataFilter.filterData(all, filterShape, optionFilter)
  }, [ctx.fetcherAnswers.get, filterShape, optionFilter, onlyPdmEntries])

  const dataCash = useMemo(() => seq(data).filter((_) => _.type === 'Cash') as Seq<PdmData<Meal_cashPdm.T>>, [data])
  const dataEcrec = useMemo(
    () => seq(data).filter((_) => _.type === 'Ecrec') as Seq<PdmData<Ecrec_cashRegistration.T>>,
    [data],
  )

  const chartDataCash = useMemo(() => buildLcsChartData(dataCash, m.mealMonitoringPdm), [dataCash, m])
  const chartDataEcrec = useMemo(() => buildLcsChartData(dataEcrec, m.mealMonitoringPdm), [dataEcrec, m])

  const OnlyPdmToggle = (
    <Box>
      <FormControlLabel
        control={<Checkbox checked={onlyPdmEntries} onChange={(e) => setOnlyPdmEntries(e.target.checked)} />}
        label={m.mealMonitoringPdm.onlyPdm}
      />
    </Box>
  )

  return (
    <Page width="lg" loading={ctx.fetcherAnswers.loading}>
      <DataFilterLayout
        shapes={filterShape}
        filters={optionFilter}
        setFilters={setOptionFilters}
        before={
          <>
            {OnlyPdmToggle}
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
                  min={ctx.fetcherPeriod.get?.start}
                  max={ctx.fetcherPeriod.get?.end}
                  fullWidth={false}
                />
              )}
            </DebouncedInput>
            <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'}}>
              <DebouncedInput<string> debounce={300} value={searchUniqueId} onChange={setSearchUniqueId}>
                {(value, onChange) => (
                  <TextField
                    label="Unique ID or Phone"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    size="small"
                    placeholder="Search by Unique ID or Phone"
                    sx={{minWidth: 220}}
                  />
                )}
              </DebouncedInput>
            </Box>
          </>
        }
      />
      {data && (
        <>
          <PdfSectionTitle>{m.overview}</PdfSectionTitle>
          <PdfSlide>
            <PdfSlideBody>
              <Div responsive>
                <Div column sx={{maxHeight: '33%'}}>
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
                  <Panel savableAsImg expendable title={m.location}>
                    <PanelBody>
                      <MapSvgByOblast
                        sx={{maxWidth: 480, margin: 'auto'}}
                        fillBaseOn="value"
                        data={dataCash}
                        getOblast={(_) => mapOblast[_.answers.ben_det_oblast!]}
                        value={(_) => true}
                        base={(_) => _.answers.ben_det_oblast !== undefined}
                      />
                    </PanelBody>
                  </Panel>
                </Div>
                <Div column sx={{maxHeight: '33%'}}>
                  <SlidePanel title={m.mealMonitoringPdm.didReceive}>
                    <ChartBarSingleBy
                      data={dataCash}
                      by={(_) => _.answers.did_receive_cash}
                      label={Meal_cashPdm.options.any_member_household}
                      includeNullish
                    />
                  </SlidePanel>
                  <SlidePanel title={m.mealMonitoringPdm.pdmType}>
                    <ChartBarMultipleBy
                      data={dataCash}
                      by={(_) => _.answers.pdmtype}
                      label={Meal_cashPdm.options.pdmtype}
                    />
                  </SlidePanel>
                </Div>
                <Div column sx={{maxHeight: '33%'}}>
                  <SlidePanel title={m.project}>
                    <ChartBarSingleBy
                      data={dataCash}
                      by={(_) => _.answers.donor}
                      label={Meal_cashPdm.options.donor}
                      includeNullish
                    />
                  </SlidePanel>
                </Div>
              </Div>
            </PdfSlideBody>
          </PdfSlide>
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
                      title={m.mealMonitoringPdm.lifestock}
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
          <PdfSlide>
            <PdfSlideBody>
              <PdfSectionTitle>{m.mealMonitoringPdm.pdm}</PdfSectionTitle>
              <Div responsive>
                <Div column sx={{maxHeight: '33%'}}>
                  <SlidePanel title={m.mealMonitoringPdm.lcs_sell_hh_assets}>
                    <ChartBarSingleBy
                      data={dataCash}
                      by={(_) => _.answers.lcs_sell_hh_assets}
                      label={Meal_cashPdm.options.lcs_decrease_fertilizer}
                      includeNullish
                    />
                  </SlidePanel>
                  <SlidePanel title={m.mealMonitoringPdm.lcs_spent_savings}>
                    <ChartBarSingleBy
                      data={dataCash}
                      by={(_) => _.answers.lcs_spent_savings}
                      label={Meal_cashPdm.options.lcs_decrease_fertilizer}
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
                          valueFn: () => seq(dataCash).length,
                        },
                        {
                          icon: 'person',
                          label: m.male,
                          valueFn: () =>
                            seq(dataCash)
                              .map((_) => _.answers.number_male)
                              .compact()
                              .sum(),
                        },
                        {
                          icon: 'person',
                          label: m.female,
                          valueFn: () =>
                            seq(dataCash)
                              .map((_) => _.answers.number_female)
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
                      data={dataCash}
                      by={(_) => _.answers.lcs_forrowed_food}
                      label={Meal_cashPdm.options.lcs_decrease_fertilizer}
                      includeNullish
                    />
                  </SlidePanel>
                </Div>
                <Div column sx={{maxHeight: '33%'}}>
                  <SlidePanel title={m.mealMonitoringPdm.lcs_sell_productive_assets}>
                    <ChartBarSingleBy
                      data={dataCash}
                      by={(_) => _.answers.lcs_sell_productive_assets}
                      label={Meal_cashPdm.options.lcs_decrease_fertilizer}
                      includeNullish
                    />
                  </SlidePanel>
                  <SlidePanel title={m.mealMonitoringPdm.lcs_reduce_health_expenditures}>
                    <ChartBarSingleBy
                      data={dataCash}
                      by={(_) => _.answers.lcs_reduce_health_expenditures}
                      label={Meal_cashPdm.options.lcs_decrease_fertilizer}
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
                      data={dataCash}
                      by={(_) => _.answers.lcs_sell_house}
                      label={Meal_cashPdm.options.lcs_decrease_fertilizer}
                      includeNullish
                    />
                  </SlidePanel>
                  <SlidePanel title={m.mealMonitoringPdm.lcs_move_elsewhere}>
                    <ChartBarSingleBy
                      data={dataCash}
                      by={(_) => _.answers.lcs_move_elsewhere}
                      label={Meal_cashPdm.options.lcs_decrease_fertilizer}
                      includeNullish
                    />
                  </SlidePanel>
                </Div>
                <Div column sx={{maxHeight: '33%'}}>
                  <SlidePanel title={m.mealMonitoringPdm.lcs_reason}>
                    <ChartBarMultipleBy
                      data={dataCash}
                      by={(_) => _.answers.lcs_reason}
                      label={Meal_cashPdm.options.lcs_reason}
                    />
                  </SlidePanel>
                  <SlidePanel title={m.mealMonitoringPdm.lcs_eat_elsewhere}>
                    <ChartBarSingleBy
                      data={dataCash}
                      by={(_) => _.answers.lcs_eat_elsewhere}
                      label={Meal_cashPdm.options.lcs_decrease_fertilizer}
                      includeNullish
                    />
                  </SlidePanel>
                </Div>
                <Div column sx={{maxHeight: '33%'}}>
                  <SlidePanel title={m.mealMonitoringPdm.lcs_degrading_income_source}>
                    <ChartBarSingleBy
                      data={dataCash}
                      by={(_) => _.answers.lcs_degrading_income_source}
                      label={Meal_cashPdm.options.lcs_decrease_fertilizer}
                      includeNullish
                    />
                  </SlidePanel>
                  <SlidePanel title={m.mealMonitoringPdm.lcs_ask_stranger}>
                    <ChartBarSingleBy
                      data={dataCash}
                      by={(_) => _.answers.lcs_ask_stranger}
                      label={Meal_cashPdm.options.lcs_decrease_fertilizer}
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
