import {useEffect, useMemo, useState} from 'react'
import {seq, Obj, type Seq} from '@axanc/ts-utils'
import {Box, Divider, TextField, Typography} from '@mui/material'
import {isWithinInterval, isAfter, isBefore} from 'date-fns'

import {Bn_pam, Meal_cashPdm, OblastIndex} from 'infoportal-common'

import {useI18n} from '@/core/i18n'
import {useAppSettings} from '@/core/context/ConfigContext'
import {CashPdmData, useCashPdm} from '@/features/Meal/Cash/Context/CashContext'
import {useCashFilter} from '@/features/Meal/Cash/Context/useCashFilter'
import {AgeGroupTable, DebouncedInput, Page} from '@/shared'
import {ChartBarMultipleBy} from '@/shared/charts/ChartBarMultipleBy'
import {DataFilterLayout} from '@/shared/DataFilter/DataFilterLayout'
import {DataFilter} from '@/shared/DataFilter/DataFilter'
import {useFetcher} from '@/shared/hook/useFetcher'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import {PeriodPicker} from '@/shared/PeriodPicker/PeriodPicker'
import {Div, SlidePanel} from '@/shared/PdfLayout/PdfSlide'
import {Panel, PanelBody} from '@/shared/Panel'
import {MapSvgByOblast} from '@/shared/maps/MapSvgByOblast'
import {useKoboTranslations} from '@/utils'

import Subtitle from './CashAgMsmeVet/components/Subtitle'
import {useCopingStrategiesFigures} from './hooks'
import {Code} from './styled-components'

export const CashMpcaDashboard = () => {
  const ctx = useCashPdm()
  const {shape} = useCashFilter(ctx.fetcherAnswers.get, {isBn: true})
  const {api} = useAppSettings()
  const rrmFetcher = useFetcher(api.kobo.typedAnswers.search.bn_rapidResponse2)
  const [filters, setFilters] = useState<Record<string, string[] | undefined>>({})
  const [search, setSearch] = useState<string>('')
  const {m} = useI18n()
  const [interviewPeriodFilter, setInterviewPeriodFilter] = useState<{
    start?: Date
    end?: Date
  }>(ctx.periodFilter)
  const {translateField, translateOption} = useKoboTranslations('bn_pam', {en: 0, uk: 1})
  const translateLabels = (option: string) =>
    translateOption(option)?.reduce(
      (result, {value, label}) => ({
        ...result,
        [value]: label,
      }),
      {} as Record<string, string>,
    )

  const cashOnly: Seq<CashPdmData<Meal_cashPdm.T>> = useMemo(
    () => seq(ctx.fetcherAnswers.get).filter(({source}) => source === 'pdm') as Seq<CashPdmData<Meal_cashPdm.T>>,
    [ctx.fetcherAnswers.get],
  )

  const data: Seq<CashPdmData<Meal_cashPdm.T>> = useMemo(() => {
    let rows = cashOnly

    const ids = search
      .split(/\s+/)
      .map((s) => s.trim())
      .filter(Boolean)

    if (ids.length) {
      rows = rows.filter(({answers: {unique_number}}) => {
        const unique = unique_number?.toString()
        return ids.some((id) => unique?.includes(id))
      })
    }

    if (Object.values(ctx.periodFilter).some(Boolean)) {
      rows = rows.filter(({answers: {date}}) => {
        if (date === undefined) return

        if (ctx.periodFilter.start !== undefined && ctx.periodFilter.end !== undefined) {
          return isWithinInterval(date, {
            start: ctx.periodFilter.start,
            end: ctx.periodFilter.end,
          })
        }

        if (ctx.periodFilter.start !== undefined) {
          return isAfter(date, ctx.periodFilter.start)
        }

        if (ctx.periodFilter.end !== undefined) {
          return isBefore(date, ctx.periodFilter.end)
        }

        return false
      })
    }

    if (Object.values(interviewPeriodFilter).some(Boolean)) {
      rows = rows.filter(({answers: {date_interview}}) => {
        if (date_interview === undefined) return

        if (interviewPeriodFilter.start !== undefined && interviewPeriodFilter.end !== undefined)
          return isWithinInterval(date_interview, {
            start: interviewPeriodFilter.start,
            end: interviewPeriodFilter.end,
          })

        if (interviewPeriodFilter.start !== undefined) return isAfter(date_interview, interviewPeriodFilter.start)

        if (interviewPeriodFilter.end !== undefined) return isBefore(date_interview, interviewPeriodFilter.end)

        return false
      })
    }

    return DataFilter.filterData(rows, shape, filters) as Seq<CashPdmData<Meal_cashPdm.T>>
  }, [cashOnly, shape, filters, search, ctx.periodFilter, interviewPeriodFilter])

  useEffect(() => {
    rrmFetcher.fetch()
  }, [])

  const copingStrategies = useCopingStrategiesFigures(data)

  return (
    <Page width="lg" loading={ctx.fetcherAnswers.loading}>
      <DataFilterLayout
        shapes={shape}
        filters={filters}
        setFilters={setFilters}
        slotProps={{
          wrapperBox: {flexDirection: 'row'},
          filtersBox: {marginBottom: 0.25},
          controlsBox: {sx: {alignSelf: 'flex-end', marginBottom: 1.5}},
        }}
        sx={{alignItems: 'flex-end'}}
        before={
          <>
            <DebouncedInput<[Date | undefined, Date | undefined]>
              debounce={400}
              value={[ctx.periodFilter.start, ctx.periodFilter.end]}
              onChange={([start, end]) => ctx.setPeriodFilter((prev) => ({...prev, start, end}))}
            >
              {(value, onChange) => (
                <Box
                  sx={{
                    '.MuiPopover-root &': {
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 1,
                    },
                    mr: 'unset',
                  }}
                >
                  <Typography fontSize="small">Date</Typography>
                  <PeriodPicker
                    value={value}
                    onChange={onChange}
                    label={[m.start, m.endIncluded]}
                    sx={{'.MuiPopover-root &': {maxWidth: '250px'}}}
                  />
                </Box>
              )}
            </DebouncedInput>
            <DebouncedInput<[Date | undefined, Date | undefined]>
              debounce={400}
              value={[interviewPeriodFilter.start, interviewPeriodFilter.end]}
              onChange={([start, end]) => setInterviewPeriodFilter((prev) => ({...prev, start, end}))}
            >
              {(value, onChange) => (
                <Box
                  sx={{
                    '.MuiPopover-root &': {
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 1,
                    },
                    mr: 'unset',
                  }}
                >
                  <Typography fontSize="small">Interview Date</Typography>
                  <PeriodPicker
                    value={value}
                    onChange={onChange}
                    label={[m.start, m.endIncluded]}
                    sx={{'.MuiPopover-root &': {maxWidth: '250px'}}}
                  />
                </Box>
              )}
            </DebouncedInput>
            <TextField
              label="Unique ID or Phone"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              size="small"
              placeholder="Search by Unique ID or Phone"
              sx={{
                minWidth: 180,
                '.MuiPopover-root &': {
                  width: '100%',
                  maxWidth: '250px',
                  marginLeft: 'auto',
                },
              }}
            />
          </>
        }
      />
      <Subtitle text={m.overview} />
      <Div responsive>
        <Div column flex={2}>
          <Panel title={m.ageGroup}>
            <PanelBody>
              <AgeGroupTable
                tableId="cash-dashboard"
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
                data={data}
                getOblast={(_) => OblastIndex.koboOblastIndexIso[_.answers.ben_det_oblast!]}
                value={() => true}
                base={(_) => _.answers.ben_det_oblast !== undefined}
              />
            </PanelBody>
          </Panel>
          <SlidePanel title={m.project}>
            <ChartBarSingleBy
              data={data}
              by={({answers}) => answers.donor}
              label={Meal_cashPdm.options.donor}
              includeNullish
            />
          </SlidePanel>
          <SlidePanel title={translateField && translateField('did_receive_cash')}>
            <ChartBarSingleBy
              data={data}
              by={({answers}) => answers.did_receive_cash}
              label={Meal_cashPdm.options.any_member_household}
              includeNullish
            />
          </SlidePanel>
          <SlidePanel title={m.mealMonitoringPdm.pdmType}>
            <ChartBarMultipleBy data={data} by={({answers}) => answers.pdmtype} label={Meal_cashPdm.options.pdmtype} />
          </SlidePanel>
        </Div>
        <Div column>
          <SlidePanel title={translateField && translateField('spent_cash_assistance_received')}>
            <ChartBarSingleBy
              data={data}
              by={({answers}) => answers.spent_cash_assistance_received}
              label={translateLabels('spent_cash_assistance_received')}
              includeNullish
            />
          </SlidePanel>
          <SlidePanel title={translateField && translateField('spent_cash_assistance_received')}>
            <ChartBarSingleBy
              data={data}
              by={({answers}) => answers.spent_cash_assistance_received}
              label={translateLabels('spent_cash_assistance_received')}
              includeNullish
            />
          </SlidePanel>
          <SlidePanel title={translateField && translateField('spent_cash_assistance_received_no')}>
            <ChartBarSingleBy
              data={data}
              by={({answers}) => answers.spent_cash_assistance_received_no}
              label={translateLabels('spent_cash_assistance_received_no')}
              limitChartHeight={480}
              includeNullish
            />
          </SlidePanel>
          <SlidePanel title={translateField && translateField('spent_cash_assistance_received_no_mait_reason')}>
            <ChartBarSingleBy
              data={data}
              by={({answers}) => answers.spent_cash_assistance_received_no_mait_reason}
              label={translateLabels('spent_cash_assistance_received_no_mait_reason')}
              limitChartHeight={480}
              includeNullish
            />
          </SlidePanel>
          <SlidePanel title={m.mealMonitoringPdm.howLong}>
            <ChartBarSingleBy
              data={data}
              by={({answers}) => answers.received_enough_agricultural_needs_long}
              label={Meal_cashPdm.options.received_enough_agricultural_needs_long}
              includeNullish
            />
          </SlidePanel>
        </Div>
        <Div column>
          <SlidePanel title={m.mealMonitoringPdm.threeSectors}>
            <ChartBarMultipleBy
              data={data}
              by={({answers}) => answers.sectors_cash_assistance}
              label={Meal_cashPdm.options.sectors_cash_assistance}
              includeNullish
            />
          </SlidePanel>
          <SlidePanel title={m.mealMonitoringPdm.businessNeeds}>
            <ChartBarSingleBy
              data={data}
              by={({answers}) => answers.cash_sufficient}
              label={Meal_cashPdm.options.cash_sufficient}
              includeNullish
            />
          </SlidePanel>
          <SlidePanel title={m.mealMonitoringPdm.taxPay}>
            <ChartBarMultipleBy
              data={data}
              by={({answers}) => answers.contacted_pay_amount}
              label={Meal_cashPdm.options.contacted_pay_amount}
              includeNullish
            />
          </SlidePanel>
          <SlidePanel title={m.mealMonitoringPdm.timely}>
            <ChartBarSingleBy
              data={data}
              by={({answers}) => answers.cash_assistance_timely}
              label={Meal_cashPdm.options.any_member_household}
              includeNullish
            />
          </SlidePanel>
        </Div>
      </Div>
      <Subtitle text={m.registration} />
      <Div responsive>
        <Div column>
          <SlidePanel title={m.mealMonitoringPdm.satisfiedProcess}>
            <ChartBarSingleBy
              data={data}
              by={({answers}) => answers.satisfied_process}
              label={Meal_cashPdm.options.satisfied_process}
              includeNullish
            />
          </SlidePanel>
          <SlidePanel title={m.mealMonitoringPdm.satisfiedAmount}>
            <ChartBarSingleBy
              data={data}
              by={({answers}) => answers.satisfied_cash_amount}
              label={Meal_cashPdm.options.any_member_household}
              includeNullish
            />
          </SlidePanel>
          <SlidePanel title={translateField && translateField('amount_cash_received_correspond')}>
            <ChartBarSingleBy
              data={data}
              by={({answers}) => answers.amount_cash_received_correspond}
              label={Meal_cashPdm.options.sufficient_living_spaces}
              includeNullish
            />
          </SlidePanel>
          <SlidePanel title={translateField && translateField('amount_cash_received_correspond_no')}>
            <ChartBarSingleBy
              data={data as unknown as Seq<CashPdmData<Bn_pam.T>>}
              by={({answers}) => answers.amount_cash_received_correspond_no}
              label={{
                ...Meal_cashPdm.options.sufficient_living_spaces,
                ...Bn_pam.options.amount_cash_received_correspond_no,
              }}
              includeNullish
            />
          </SlidePanel>
        </Div>
        <Div column>
          <SlidePanel title={m.mealMonitoringPdm.problems}>
            <ChartBarSingleBy
              data={data}
              by={({answers}) => answers.experience_problems}
              label={Meal_cashPdm.options.any_member_household}
              includeNullish
            />
          </SlidePanel>
          <SlidePanel title={m.mealMonitoringPdm.problemsYes}>
            <ChartBarMultipleBy
              data={data}
              by={({answers}) => answers.experience_problems_yes}
              label={translateLabels('experience_problems_yes')}
              includeNullish
            />
          </SlidePanel>
          <SlidePanel title={translateField && translateField('experience_problems_yes_other')}>
            <ChartBarSingleBy
              data={data as unknown as Seq<CashPdmData<Bn_pam.T>>}
              by={({answers}) => answers.experience_problems_yes_other}
              limitChartHeight={360}
              includeNullish
            />
          </SlidePanel>
        </Div>
        <Div column>
          <SlidePanel title={m.mealMonitoringPdm.provideInfo}>
            <ChartBarSingleBy
              data={data}
              by={({answers}) => answers.organization_provide_information}
              label={Meal_cashPdm.options.any_member_household}
              includeNullish
            />
          </SlidePanel>
          <SlidePanel title={translateField && translateField('organization_provide_information_no')}>
            <ChartBarSingleBy
              data={data as unknown as Seq<CashPdmData<Bn_pam.T>>}
              by={({answers}) => answers.organization_provide_information_no}
              includeNullish
            />
          </SlidePanel>
          <SlidePanel title={m.mealMonitoringPdm.betterInform}>
            <ChartBarMultipleBy
              data={data}
              by={({answers}) => answers.better_inform_distribution}
              label={Meal_cashPdm.options.better_inform_distribution}
              includeNullish
            />
          </SlidePanel>
        </Div>
        <Div column>
          <SlidePanel title={m.mealMonitoringPdm.assistanceReceive}>
            <ChartBarSingleBy
              data={data}
              by={({answers}) => answers.assistance_delivered}
              label={Meal_cashPdm.options.assistance_delivered}
              includeNullish
            />
          </SlidePanel>
          <SlidePanel title={m.mealMonitoringPdm.timeToTake}>
            <ChartBarSingleBy
              data={data}
              by={({answers}) => answers.time_registered_assistance}
              label={Meal_cashPdm.options.time_registered_assistance}
              includeNullish
            />
          </SlidePanel>
        </Div>
      </Div>
      <Subtitle text={m.abilityCover} />
      <Div responsive>
        <Div column>
          <SlidePanel title={translateField && translateField('ben_det_income')}>
            <ChartBarSingleBy
              data={data as unknown as Seq<CashPdmData<Bn_pam.T>>}
              by={({answers}) => String(answers.ben_det_income)}
              limitChartHeight={480}
              includeNullish
            />
          </SlidePanel>
          <SlidePanel title={m.mealMonitoringPdm.enoughBasic}>
            <ChartBarSingleBy
              data={data}
              by={({answers}) => answers.household_currently_have_clothing}
              label={Meal_cashPdm.options.any_member_household}
              includeNullish
            />
          </SlidePanel>
          <SlidePanel title={m.mealMonitoringPdm.whatExtent}>
            <ChartBarSingleBy
              data={data}
              by={({answers}) => answers.extent_basic_needs}
              label={Meal_cashPdm.options.extent_basic_needs}
              includeNullish
            />
          </SlidePanel>
          <SlidePanel title={m.mealMonitoringPdm.whichBasicNeed}>
            <ChartBarMultipleBy
              data={data}
              by={({answers}) => answers.household_currently_have_clothing_no}
              label={Meal_cashPdm.options.household_currently_have_clothing_no}
              includeNullish
            />
          </SlidePanel>
          <SlidePanel title={m.mealMonitoringPdm.enoughWater}>
            <ChartBarSingleBy
              data={data}
              by={({answers}) => answers.enough_water_household}
              label={Meal_cashPdm.options.any_member_household}
              includeNullish
            />
          </SlidePanel>
        </Div>
        <Div column>
          <Typography lineHeight={1.2}>{translateField && translateField('monthly_expenditures_needs')}</Typography>
          {(
            [
              'food_expenditures',
              'hygiene_expenditures',
              'domestic_expenditures',
              'nfi_expenditures',
              'clothing_expenditures',
              'heating_expenditures',
              'utilities_expenditures',
              'drinking_expenditures',
            ] as const
          ).map((field) => (
            <SlidePanel key={field} title={translateField && translateField(field)}>
              <ChartBarSingleBy
                data={data as unknown as Seq<CashPdmData<Bn_pam.T>>}
                by={({answers}) => String(answers[field])}
                label={translateLabels(field)}
                limitChartHeight={360}
                includeNullish
              />
            </SlidePanel>
          ))}
        </Div>
        <Div column>
          {(
            [
              'rent_expenditures',
              'healthcare_expenditures',
              'special_expenditures',
              'transportation_expenditures',
              'education_expenditures',
              'communication_needs',
              'value_monthly_expenditures',
            ] as const
          ).map((field) => (
            <SlidePanel key={field} title={translateField && translateField(field)}>
              <ChartBarSingleBy
                data={data as unknown as Seq<CashPdmData<Bn_pam.T>>}
                by={({answers}) => String(answers[field])}
                label={translateLabels(field)}
                limitChartHeight={360}
                includeNullish
              />
            </SlidePanel>
          ))}
          <SlidePanel title={translateField && translateField('cal_meb')}>
            <ChartBarSingleBy
              data={data as unknown as Seq<CashPdmData<Bn_pam.T>>}
              by={({answers}) => answers.cal_meb}
              label={{'0': 'MEB Covers Expanditures', '1': 'Expanditures Exceed MEB'}}
              includeNullish
            />
          </SlidePanel>
          <Typography lineHeight={1.2}>
            <pre>
              <Code>
                {
                  'if((8422 + ((family size - 1) * 3028)) <= total expenses, "Expanditures Exceed MEB", "MEB Covers Expanditures")'
                }
              </Code>
            </pre>
            The "6,318 UAH" of subsistance minimum income is outdated text, the formula used for calculation is using
            "8,422 UAH". The formula in words: "if subsistance base of 8,422UAH + 3,028UAH per each additional person in
            the household is less than the total expenses, then print 'MEB Covers Expanditures' (0), otherwise print
            'Expanditures Exceed MEB' (1)"
          </Typography>
        </Div>
      </Div>
      <Subtitle text={m.outcome} />
      <Div responsive marginBottom={2}>
        <Typography lineHeight={1.2}>{translateField && translateField('use_mpca_assistance')}</Typography>
      </Div>
      <Div responsive marginBottom={2}>
        <Div column>
          <SlidePanel title={translateField && translateField('sectors_cash_assistance')}>
            <ChartBarMultipleBy
              data={data}
              by={({answers}) => answers.sectors_cash_assistance}
              label={{...Bn_pam.options.sectors_cash_assistance, ...Meal_cashPdm.options.sectors_cash_assistance}}
              limitChartHeight={480}
              includeNullish
            />
          </SlidePanel>
          <SlidePanel title={translateField && translateField('sectors_cash_assistance_other')}>
            <ChartBarSingleBy
              data={data as unknown as Seq<CashPdmData<Bn_pam.T>>}
              by={({answers}) => answers.sectors_cash_assistance_other}
              limitChartHeight={360}
              includeNullish
            />
          </SlidePanel>
        </Div>
        <Div column>
          {(
            [
              'sectors_cash_assistance_food',
              'sectors_cash_assistance_hh_nfis',
              'sectors_cash_assistance_clothing',
              'sectors_cash_assistance_heating',
              'sectors_cash_assistance_healthcare',
              'sectors_cash_assistance_utilities',
            ] as const
          ).map((field) => (
            <SlidePanel key={field} title={translateField && translateField(field)}>
              <ChartBarSingleBy
                data={data as unknown as Seq<CashPdmData<Bn_pam.T>>}
                by={({answers}) => String(answers[field])}
                limitChartHeight={360}
                includeNullish
              />
            </SlidePanel>
          ))}
        </Div>
        <Div column>
          {(
            [
              'sectors_cash_assistance_renovation_materials',
              'sectors_cash_assistance_rent',
              'sectors_cash_assistance_agricultural_inputs',
              'sectors_cash_assistance_hygiene_items',
              'sectors_cash_assistance_medication',
              'sectors_cash_assistance_education_materials',
              'sectors_cash_assistance_other_spend',
            ] as const
          ).map((field) => (
            <SlidePanel key={field} title={translateField && translateField(field)}>
              <ChartBarSingleBy
                data={data as unknown as Seq<CashPdmData<Bn_pam.T>>}
                by={({answers}) => String(answers[field])}
                limitChartHeight={360}
                includeNullish
              />
            </SlidePanel>
          ))}
          <SlidePanel title={translateField && translateField('feel_safe_travelling')}>
            <ChartBarSingleBy
              data={data as unknown as Seq<CashPdmData<Bn_pam.T>>}
              by={({answers}) => answers.feel_safe_travelling}
              label={translateLabels('feel_safe_travelling')}
              limitChartHeight={360}
              includeNullish
            />
          </SlidePanel>
          <SlidePanel title={translateField && translateField('feel_safe_travelling_bad')}>
            <ChartBarSingleBy
              data={data as unknown as Seq<CashPdmData<Bn_pam.T>>}
              by={({answers}) => answers.feel_safe_travelling_bad}
              label={translateLabels('feel_safe_travelling_bad')}
              limitChartHeight={360}
              includeNullish
            />
          </SlidePanel>
        </Div>
      </Div>
      <Divider sx={{borderWidth: 1, marginBottom: 2}} />
      <Div responsive marginBottom={2}>
        <Typography>Basic Needs PAM-specific section</Typography>
      </Div>
      <Div responsive marginBottom={2}>
        <Div column>
          <SlidePanel title={translateField && translateField('prior_receiving_assistance')}>
            <ChartBarMultipleBy
              data={data as unknown as Seq<CashPdmData<Bn_pam.T>>}
              by={({answers}) => answers.prior_receiving_assistance}
              label={Bn_pam.options.important_helped_household}
              includeNullish
            />
          </SlidePanel>
        </Div>
        <Div column>
          {(
            [
              'extent_needs_define',
              'most_important_things',
              'unable_fully_basic_food_needs',
              'unable_fully_basic_food_needs_other',
              'unable_fully_food_children_0_23m',
              'unable_fully_food_children_0_23m_other',
              'unable_fully_food_pregnant_lactating',
              'unable_fully_food_pregnant_lactating_other',
              'unable_fully_water',
              'unable_fully_water_other',
              'unable_fully_hygiene',
              'unable_fully_hygiene_other',
              'unable_fully_shelter',
              'unable_fully_shelter_other',
              'unable_fully_healthcare',
              'unable_fully_healthcare_other',
            ] as const
          ).map((field) => (
            <SlidePanel key={field} title={translateField && translateField(field)}>
              {data.some(({answers}) => Array.isArray((answers as unknown as Bn_pam.T)[field])) ? (
                <ChartBarMultipleBy
                  data={data as unknown as Seq<CashPdmData<Bn_pam.T>>}
                  by={({answers}) => (Array.isArray(answers[field]) ? answers[field] : [answers[field]])}
                  label={translateLabels(field)}
                  limitChartHeight={480}
                  includeNullish
                />
              ) : (
                <ChartBarSingleBy
                  data={data as unknown as Seq<CashPdmData<Bn_pam.T>>}
                  by={({answers}) => answers[field] as string}
                  label={translateLabels(field)}
                  limitChartHeight={480}
                  includeNullish
                />
              )}
            </SlidePanel>
          ))}
        </Div>
        <Div column>
          {(
            [
              'unable_fully_healthcare_children_0_23m',
              'unable_fully_healthcare_children_0_23m_other',
              'unable_fully_healthcare_pregnant_lactating',
              'unable_fully_healthcare_pregnant_lactating_other',
              'unable_fully_transportation',
              'unable_fully_transportation_other',
              'unable_fully_communication',
              'unable_fully_communication_other',
              'unable_fully_education_children',
              'unable_fully_education_children_other',
              'unable_fully_clothing',
              'unable_fully_clothing_other',
              'unable_fully_utilities',
              'unable_fully_utilities_other',
              'most_important_things_other',
              'unable_fully_other',
              'unable_fully_other_other',
              'important_helped_household',
              'important_helped_household_other',
            ] as const
          ).map((field) => (
            <SlidePanel key={field} title={translateField && translateField(field)}>
              {data.some(({answers}) => Array.isArray((answers as unknown as Bn_pam.T)[field])) ? (
                <ChartBarMultipleBy
                  data={data as unknown as Seq<CashPdmData<Bn_pam.T>>}
                  by={({answers}) => (Array.isArray(answers[field]) ? answers[field] : [answers[field]])}
                  label={translateLabels(field)}
                  limitChartHeight={480}
                  includeNullish
                />
              ) : (
                <ChartBarSingleBy
                  data={data as unknown as Seq<CashPdmData<Bn_pam.T>>}
                  by={({answers}) => answers[field] as string}
                  label={translateLabels(field)}
                  limitChartHeight={480}
                  includeNullish
                />
              )}
            </SlidePanel>
          ))}
        </Div>
      </Div>
      <Divider sx={{borderWidth: 1, marginBottom: 2}} />
      <Div responsive marginBottom={2}>
        <Typography>Coping mechanisms</Typography>
      </Div>
      <Div responsive marginBottom={2}>
        <Div column>
          <SlidePanel title="Before">
            <ChartBarMultipleBy
              data={copingStrategies.before}
              by={(field) => field}
              label={[
                'lcs_spent_savings',
                'lcs_forrowed_food',
                'lcs_reduced_utilities',
                'lcs_reduce_education_expenditures',
                'lcs_sell_productive_assets',
                'lcs_reduce_health_expenditures',
                'lcs_sell_hh_assets',
                'lcs_sell_house',
                'lcs_strangers_money',
                'lcs_degrading_income_source',
                'lcs_move_elsewhere',
                'lcs_withdrew_children',
              ].reduce((dict, value) => ({...dict, [value]: translateField && translateField(value)}), {})}
              limitChartHeight={480}
              includeNullish
            />
          </SlidePanel>
          <SlidePanel title="After">
            <ChartBarMultipleBy
              data={copingStrategies.after}
              by={(field) => field}
              label={[
                'lcs_spent_savings',
                'lcs_forrowed_food',
                'lcs_reduced_utilities',
                'lcs_reduce_education_expenditures',
                'lcs_sell_productive_assets',
                'lcs_reduce_health_expenditures',
                'lcs_sell_hh_assets',
                'lcs_sell_house',
                'lcs_strangers_money',
                'lcs_degrading_income_source',
              ].reduce((dict, value) => ({...dict, [value]: translateField && translateField(value)}), {})}
              limitChartHeight={480}
              includeNullish
            />
          </SlidePanel>

          {(
            [
              'resort_any_following',
              'income_spent_food',
              'income_spent_nonfood',
              'lcs_spent_savings',
              'lcs_forrowed_food',
            ] as const
          ).map((field) => (
            <SlidePanel key={field} title={translateField && translateField(field)}>
              {data.some(({answers}) => Array.isArray((answers as unknown as Bn_pam.T)[field])) ? (
                <ChartBarMultipleBy
                  data={data as unknown as Seq<CashPdmData<Bn_pam.T>>}
                  by={({answers}) => (Array.isArray(answers[field]) ? answers[field] : [String(answers[field])])}
                  label={translateLabels(field)}
                  limitChartHeight={480}
                  includeNullish
                />
              ) : (
                <ChartBarSingleBy
                  data={data as unknown as Seq<CashPdmData<Bn_pam.T>>}
                  by={({answers}) => answers[field] as string}
                  label={translateLabels(field)}
                  limitChartHeight={480}
                  includeNullish
                />
              )}
            </SlidePanel>
          ))}
        </Div>
        <Div column>
          {(
            [
              'lcs_reduced_utilities',
              'lcs_reduce_education_expenditures',
              'lcs_sell_productive_assets',
              'lcs_reduce_health_expenditures',
              'lcs_sell_hh_assets',
            ] as const
          ).map((field) => (
            <SlidePanel key={field} title={translateField && translateField(field)}>
              {data.some(({answers}) => Array.isArray((answers as unknown as Bn_pam.T)[field])) ? (
                <ChartBarMultipleBy
                  data={data as unknown as Seq<CashPdmData<Bn_pam.T>>}
                  by={({answers}) => (Array.isArray(answers[field]) ? answers[field] : [String(answers[field])])}
                  label={translateLabels(field)}
                  limitChartHeight={480}
                  includeNullish
                />
              ) : (
                <ChartBarSingleBy
                  data={data as unknown as Seq<CashPdmData<Bn_pam.T>>}
                  by={({answers}) => answers[field] as string}
                  label={translateLabels(field)}
                  limitChartHeight={480}
                  includeNullish
                />
              )}
            </SlidePanel>
          ))}
        </Div>
        <Div column>
          {(
            [
              'lcs_sell_hh_assets',
              'lcs_sell_house',
              'lcs_strangers_money',
              'lcs_degrading_income_source',
              'lcs_reason',
              'lcs_reason_other',
            ] as const
          ).map((field) => (
            <SlidePanel key={field} title={translateField && translateField(field)}>
              {data.some(({answers}) => Array.isArray((answers as unknown as Bn_pam.T)[field])) ? (
                <ChartBarMultipleBy
                  data={data as unknown as Seq<CashPdmData<Bn_pam.T>>}
                  by={({answers}) => (Array.isArray(answers[field]) ? answers[field] : [String(answers[field])])}
                  label={translateLabels(field)}
                  limitChartHeight={480}
                  includeNullish
                />
              ) : (
                <ChartBarSingleBy
                  data={data as unknown as Seq<CashPdmData<Bn_pam.T>>}
                  by={({answers}) => answers[field] as string}
                  label={translateLabels(field)}
                  limitChartHeight={480}
                  includeNullish
                />
              )}
            </SlidePanel>
          ))}
        </Div>
      </Div>
      <Divider sx={{borderWidth: 1, marginBottom: 2}} />
      <Div responsive>
        <Div column>
          <SlidePanel title={m.mealMonitoringPdm.extentHH}>
            <ChartBarSingleBy
              data={data}
              by={({answers}) => answers.extent_household_basic_needs}
              label={Meal_cashPdm.options.extent_household_basic_needs}
              includeNullish
            />
          </SlidePanel>
          <SlidePanel title={m.mealMonitoringPdm.extentDefine}>
            <ChartBarSingleBy
              data={data}
              by={({answers}) => answers.extent_household_basic_needs_define}
              label={Meal_cashPdm.options.extent_household_basic_needs_define}
              includeNullish
            />
          </SlidePanel>
          <SlidePanel title={translateField && translateField('feel_treated_respect')}>
            <ChartBarSingleBy
              data={data}
              by={({answers}) => answers.feel_treated_respect}
              label={translateLabels('feel_treated_respect')}
              includeNullish
            />
          </SlidePanel>
          <SlidePanel title={translateField && translateField('satisfied_assistance_provided')}>
            <ChartBarSingleBy
              data={data}
              by={({answers}) => answers.satisfied_assistance_provided}
              label={translateLabels('satisfied_assistance_provided')}
              includeNullish
            />
          </SlidePanel>
          <SlidePanel title={m.mealMonitoringPdm.priorityNeeds}>
            <ChartBarMultipleBy
              data={data}
              by={({answers}) => answers.needs_community_currently}
              label={Meal_cashPdm.options.needs_community_currently}
              includeNullish
            />
          </SlidePanel>
        </Div>
        <Div column>
          <SlidePanel title={m.mealMonitoringPdm.unableFulfill}>
            <ChartBarMultipleBy
              data={data}
              by={({answers}) => answers.basic_needs_unable_fulfill_bha345}
              label={Meal_cashPdm.options.basic_needs_unable_fulfill_bha345}
              includeNullish
            />
          </SlidePanel>
          <SlidePanel title={translateField && translateField('know_people_needing')}>
            <ChartBarSingleBy
              data={data}
              by={({answers}) => answers.know_people_needing}
              label={translateLabels('know_people_needing')}
              includeNullish
            />
          </SlidePanel>
          <SlidePanel title={m.mealMonitoringPdm.threeSectors}>
            <ChartBarMultipleBy
              data={data}
              by={({answers}) => answers.sectors_cash_assistance}
              label={Meal_cashPdm.options.sectors_cash_assistance}
              forceShowEmptyLabels
              includeNullish
            />
          </SlidePanel>
        </Div>
        <Div column>
          <SlidePanel title={m.mealMonitoringPdm.whyUnable}>
            <ChartBarMultipleBy
              data={data}
              by={({answers}) => answers.basic_needs_unable_fully_reason_bha345}
              label={Meal_cashPdm.options.basic_needs_unable_fully_reason_bha345}
              includeNullish
            />
          </SlidePanel>
          <SlidePanel title={m.mealMonitoringPdm.feelSafe}>
            <ChartBarSingleBy
              data={data}
              by={({answers}) => answers.feel_safe_travelling}
              label={Meal_cashPdm.options.know_address_suggestions}
              includeNullish
            />
          </SlidePanel>
          <SlidePanel title={translateField && translateField('account_organization_assistance')}>
            <ChartBarSingleBy
              data={data}
              by={({answers}) => answers.account_organization_assistance}
              label={translateLabels('account_organization_assistance')}
              includeNullish
            />
          </SlidePanel>
          <SlidePanel title={translateField && translateField('where_are_staying')}>
            <ChartBarSingleBy
              data={data}
              by={({answers}) => answers.where_are_staying}
              label={translateLabels('where_are_staying')}
              includeNullish
            />
          </SlidePanel>
          <SlidePanel title={translateField && translateField('feel_informed_assistance')}>
            <ChartBarSingleBy
              data={data}
              by={({answers}) => answers.feel_informed_assistance}
              label={translateLabels('feel_informed_assistance')}
              includeNullish
            />
          </SlidePanel>
          <SlidePanel title={m.mealMonitoringPdm.businessNeeds}>
            <ChartBarSingleBy
              data={data}
              by={({answers}) => answers.cash_sufficient}
              label={Meal_cashPdm.options.cash_sufficient}
              includeNullish
            />
          </SlidePanel>
          <SlidePanel title={m.mealMonitoringPdm.taxPay}>
            <ChartBarSingleBy
              data={data}
              by={({answers}) => answers.contacted_pay_amount_tax_local}
              label={Meal_cashPdm.options.contacted_pay_amount_tax_local}
              includeNullish
            />
          </SlidePanel>
          <SlidePanel title={m.mealMonitoringPdm.timely}>
            <ChartBarSingleBy
              data={data}
              by={({answers}) => answers.cash_assistance_timely}
              label={Meal_cashPdm.options.any_member_household}
              includeNullish
            />
          </SlidePanel>
        </Div>
      </Div>
      <Subtitle text={m.accountability} />
      <Div responsive>
        <Div column>
          <SlidePanel title={translateField && translateField('any_member_household')}>
            <ChartBarSingleBy
              data={data}
              by={({answers}) => answers.any_member_household}
              label={translateLabels('any_member_household')}
              includeNullish
            />
          </SlidePanel>
          <SlidePanel title={translateField && translateField('provide_someone_commission')}>
            <ChartBarSingleBy
              data={data}
              by={({answers}) => answers.provide_someone_commission}
              label={translateLabels('provide_someone_commission')}
              includeNullish
            />
          </SlidePanel>
          <SlidePanel title={translateField && translateField('provide_someone_commission_yes')}>
            <ChartBarSingleBy
              data={data}
              by={({answers}) => answers.provide_someone_commission_yes}
              label={translateLabels('provide_someone_commission_yes')}
              includeNullish
            />
          </SlidePanel>
          <SlidePanel title={m.mealMonitoringPdm.responseReceived}>
            <ChartBarSingleBy
              data={data}
              by={({answers}) => answers.submitted_feedback_complaint}
              label={Meal_cashPdm.options.submitted_feedback_complaint}
              includeNullish
            />
          </SlidePanel>
        </Div>
        <Div column>
          <SlidePanel title={translateField && translateField('know_address_suggestions')}>
            <ChartBarSingleBy
              data={data}
              by={({answers}) => answers.know_address_suggestions}
              label={translateLabels('know_address_suggestions')}
              includeNullish
            />
          </SlidePanel>
          <SlidePanel title={translateField && translateField('know_address_suggestions_yes')}>
            <ChartBarSingleBy
              data={data}
              by={({answers}) => answers.know_address_suggestions_yes}
              label={translateLabels('know_address_suggestions_yes')}
              includeNullish
            />
          </SlidePanel>
          <SlidePanel title={translateField && translateField('know_address_suggestions_yes_ndnp')}>
            <ChartBarSingleBy
              data={data}
              by={({answers}) => answers.know_address_suggestions_yes_ndnp}
              label={translateLabels('know_address_suggestions_yes_ndnp')}
              includeNullish
            />
          </SlidePanel>
          <SlidePanel title={m.mealMonitoringPdm.yesProvide}>
            <ChartBarSingleBy
              data={data}
              by={({answers}) => answers.know_address_suggestions_yes}
              label={Meal_cashPdm.options.know_address_suggestions_yes}
              includeNullish
            />
          </SlidePanel>
        </Div>
        <Div column>
          <SlidePanel title={m.mealMonitoringPdm.noProvideWhy}>
            <ChartBarSingleBy
              data={data}
              by={({answers}) => answers.know_address_suggestions_yes_ndnp}
              label={Meal_cashPdm.options.know_address_suggestions_yes_ndnp}
              includeNullish
            />
          </SlidePanel>
          <SlidePanel title={translateField && translateField('know_address_suggestions_no')}>
            <ChartBarSingleBy
              data={data}
              by={({answers}) => answers.know_address_suggestions_no}
              label={translateLabels('know_address_suggestions_no')}
              includeNullish
            />
          </SlidePanel>
          <SlidePanel title={translateField && translateField('submitted_complaint')}>
            <ChartBarSingleBy
              data={data as unknown as Seq<CashPdmData<Bn_pam.T>>}
              by={({answers}) => answers.submitted_complaint}
              label={translateLabels('submitted_complaint')}
              includeNullish
            />
          </SlidePanel>
          <SlidePanel title={translateField && translateField('report_drc_employee')}>
            <ChartBarSingleBy
              data={data as unknown as Seq<CashPdmData<Bn_pam.T>>}
              by={({answers}) => answers.report_drc_employee}
              label={translateLabels('report_drc_employee')}
              includeNullish
            />
          </SlidePanel>
        </Div>
      </Div>
    </Page>
  )
}
