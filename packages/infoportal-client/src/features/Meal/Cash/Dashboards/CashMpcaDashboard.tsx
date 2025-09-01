import {DebouncedInput, Page} from '@/shared'
import React, {useMemo, useState} from 'react'
import {CashPdmData, useCashPdm} from '@/features/Meal/Cash/Context/CashContext'
import {useCashFilter} from '@/features/Meal/Cash/Context/useCashFilter'
import {Seq, seq} from '@axanc/ts-utils'
import {Meal_cashPdm} from 'infoportal-common'
import {DataFilterLayout} from '@/shared/DataFilter/DataFilterLayout'
import {Box, TextField} from '@mui/material'
import {PeriodPicker} from '@/shared/PeriodPicker/PeriodPicker'
import {CashOverview} from '@/features/Meal/Cash/Components/CashOverview'
import {DataFilter} from '@/shared/DataFilter/DataFilter'
import {Div, PdfSlide, PdfSlideBody, SlidePanel} from '@/shared/PdfLayout/PdfSlide'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import {ChartBarMultipleBy} from '@/shared/charts/ChartBarMultipleBy'
import {useI18n} from '@/core/i18n'
import {Registration} from '@/features/Meal/Cash/Components/Registration'
import {AbilityCover} from '@/features/Meal/Cash/Components/AbilityCover'
import {Outcome} from '@/features/Meal/Cash/Components/Outcome'
import {Accountability} from '@/features/Meal/Cash/Components/Accountability'

export const CashMpcaDashboard = () => {
  const ctx = useCashPdm()
  const {shape} = useCashFilter(ctx.fetcherAnswers.get)
  const [filters, setFilters] = useState<Record<string, string[] | undefined>>({})
  const [search, setSearch] = useState<string>('')
  const {m} = useI18n()

  const cashOnly: Seq<CashPdmData<Meal_cashPdm.T>> = useMemo(
    () => seq(ctx.fetcherAnswers.get).filter((_) => _.source === 'pdm') as Seq<CashPdmData<Meal_cashPdm.T>>,
    [ctx.fetcherAnswers.get],
  )

  const data: Seq<CashPdmData<Meal_cashPdm.T>> = useMemo(() => {
    let rows = cashOnly

    const ids = search
      .split(/\s+/)
      .map((s) => s.trim())
      .filter(Boolean)

    if (ids.length) {
      rows = rows.filter((_) => {
        const unique = _.answers.unique_number?.toString()
        return ids.some((id) => unique?.includes(id))
      })
    }

    return DataFilter.filterData(rows, shape, filters) as Seq<CashPdmData<Meal_cashPdm.T>>
  }, [cashOnly, shape, filters, search])

  return (
    <Page width="lg" loading={ctx.fetcherAnswers.loading}>
      <DataFilterLayout
        shapes={shape}
        filters={filters}
        setFilters={setFilters}
        before={
          <>
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
                  min={ctx.fetcherPeriod.get?.cashPdm.start}
                  max={ctx.fetcherPeriod.get?.cashPdm.end}
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
          {seq(data).length > 0 && <CashOverview data={data} />}
          <PdfSlide>
            <PdfSlideBody>
              <Div responsive>
                <Div column sx={{maxHeight: '33%'}}>
                  <SlidePanel title={m.mealMonitoringPdm.spent}>
                    <ChartBarSingleBy
                      data={data}
                      by={(_) => _.answers.spent_cash_assistance_received}
                      label={Meal_cashPdm.options.sufficient_living_spaces}
                      includeNullish
                    />
                  </SlidePanel>
                  <SlidePanel title={m.mealMonitoringPdm.spendOn}>
                    <ChartBarSingleBy
                      data={data}
                      by={(_) => _.answers.spend_cash_received}
                      label={Meal_cashPdm.options.any_member_household}
                      includeNullish
                    />
                  </SlidePanel>
                  <SlidePanel title={m.mealMonitoringPdm.howLong}>
                    <ChartBarSingleBy
                      data={data}
                      by={(_) => _.answers.received_enough_agricultural_needs_long}
                      label={Meal_cashPdm.options.received_enough_agricultural_needs_long}
                      includeNullish
                    />
                  </SlidePanel>
                </Div>
                <Div column sx={{maxHeight: '33%'}}>
                  <SlidePanel title={m.mealMonitoringPdm.threeSectors}>
                    <ChartBarMultipleBy
                      data={data}
                      by={(_) => _.answers.sectors_cash_assistance}
                      label={Meal_cashPdm.options.sectors_cash_assistance}
                      includeNullish
                    />
                  </SlidePanel>
                </Div>
                <Div column sx={{maxHeight: '33%'}}>
                  <SlidePanel title={m.mealMonitoringPdm.businessNeeds}>
                    <ChartBarSingleBy
                      data={data}
                      by={(_) => _.answers.cash_sufficient}
                      label={Meal_cashPdm.options.cash_sufficient}
                      includeNullish
                    />
                  </SlidePanel>
                  <SlidePanel title={m.mealMonitoringPdm.taxPay}>
                    <ChartBarMultipleBy
                      data={data}
                      by={(_) => _.answers.contacted_pay_amount}
                      label={Meal_cashPdm.options.contacted_pay_amount}
                      includeNullish
                    />
                  </SlidePanel>
                  <SlidePanel title={m.mealMonitoringPdm.timely}>
                    <ChartBarSingleBy
                      data={data}
                      by={(_) => _.answers.cash_assistance_timely}
                      label={Meal_cashPdm.options.any_member_household}
                      includeNullish
                    />
                  </SlidePanel>
                </Div>
              </Div>
            </PdfSlideBody>
          </PdfSlide>
          {seq(data).length > 0 && <Registration data={data} />}
          {seq(data).length > 0 && <AbilityCover data={data} />}
          {seq(data).length > 0 && <Outcome data={data} />}
          <PdfSlide>
            <PdfSlideBody>
              <Div responsive>
                <Div column sx={{maxHeight: '33%'}}>
                  <SlidePanel title={m.mealMonitoringPdm.priorityNeeds}>
                    <ChartBarMultipleBy
                      data={data}
                      by={(_) => _.answers.needs_community_currently}
                      label={Meal_cashPdm.options.needs_community_currently}
                      includeNullish
                    />
                  </SlidePanel>
                </Div>
                <Div column sx={{maxHeight: '33%'}}>
                  <SlidePanel title={m.mealMonitoringPdm.threeSectors}>
                    <ChartBarMultipleBy
                      data={data}
                      by={(_) => _.answers.sectors_cash_assistance}
                      label={Meal_cashPdm.options.sectors_cash_assistance}
                      forceShowEmptyLabels
                      includeNullish
                    />
                  </SlidePanel>
                </Div>
                <Div column sx={{maxHeight: '33%'}}>
                  <SlidePanel title={m.mealMonitoringPdm.businessNeeds}>
                    <ChartBarSingleBy
                      data={data}
                      by={(_) => _.answers.cash_sufficient}
                      label={Meal_cashPdm.options.cash_sufficient}
                      includeNullish
                    />
                  </SlidePanel>
                  <SlidePanel title={m.mealMonitoringPdm.taxPay}>
                    <ChartBarSingleBy
                      data={data}
                      by={(_) => _.answers.contacted_pay_amount_tax_local}
                      label={Meal_cashPdm.options.contacted_pay_amount_tax_local}
                      includeNullish
                    />
                  </SlidePanel>
                  <SlidePanel title={m.mealMonitoringPdm.timely}>
                    <ChartBarSingleBy
                      data={data}
                      by={(_) => _.answers.cash_assistance_timely}
                      label={Meal_cashPdm.options.any_member_household}
                      includeNullish
                    />
                  </SlidePanel>
                </Div>
              </Div>
            </PdfSlideBody>
          </PdfSlide>
          {seq(data).length > 0 && <Accountability data={data} />}
        </>
      )}
    </Page>
  )
}
