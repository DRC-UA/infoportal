import {CashPdmData, useCashPdm} from '@/features/Meal/Cash/Context/CashContext'
import {useCashFilter} from '@/features/Meal/Cash/Context/useCashFilter'
import React, {useMemo, useState} from 'react'
import {Seq, seq} from '@axanc/ts-utils'
import {Meal_cashPdm} from 'infoportal-common'
import {DebouncedInput, Page} from '@/shared'
import {DataFilterLayout} from '@/shared/DataFilter/DataFilterLayout'
import {PeriodPicker} from '@/shared/PeriodPicker/PeriodPicker'
import {Box, TextField, Typography} from '@mui/material'
import {CashOverview} from '@/features/Meal/Cash/Components/CashOverview'
import {Registration} from '@/features/Meal/Cash/Components/Registration'
import {Accountability} from '@/features/Meal/Cash/Components/Accountability'
import {DataFilter} from '@/shared/DataFilter/DataFilter'
import {Div, PdfSlide, PdfSlideBody, SlidePanel} from '@/shared/PdfLayout/PdfSlide'
import {ChartBarMultipleBy} from '@/shared/charts/ChartBarMultipleBy'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import {useI18n} from '@/core/i18n'
import {SufficiencyRent} from '@/features/Meal/Cash/Components/SufficiencyRent'
import {Safe} from '@/features/Meal/Cash/Components/Safe'

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

export const CashRentRepairDashboard = () => {
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
                  <SlidePanel title={m.mealMonitoringPdm.preferFuture}>
                    <ChartBarSingleBy
                      data={data}
                      by={(_) => _.answers.receive_shelter_assistance}
                      label={Meal_cashPdm.options.receive_shelter_assistance}
                      includeNullish
                    />
                  </SlidePanel>
                </Div>
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
              </Div>
            </PdfSlideBody>
          </PdfSlide>
          {seq(data).length > 0 && <Registration data={data} />}
          {seq(data).length > 0 && <SufficiencyRent data={data} />}
          <PdfSectionTitle>{m.outcome}</PdfSectionTitle>
          <PdfSlide>
            <PdfSlideBody>
              <Div responsive>
                <Div column sx={{maxHeight: '50%'}}>
                  <SlidePanel title={m.mealMonitoringPdm.extentHH}>
                    <ChartBarSingleBy
                      data={data}
                      by={(_) => _.answers.extent_household_basic_needs}
                      label={Meal_cashPdm.options.extent_household_basic_needs}
                      includeNullish
                    />
                  </SlidePanel>
                </Div>
                <Div column sx={{maxHeight: '50%'}}>
                  <SlidePanel title={m.mealMonitoringPdm.feelSafe}>
                    <ChartBarSingleBy
                      data={data}
                      by={(_) => _.answers.feel_safe_travelling}
                      label={Meal_cashPdm.options.know_address_suggestions}
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
                  <SlidePanel title={m.mealMonitoringPdm.respect}>
                    <ChartBarSingleBy
                      data={data}
                      by={(_) => _.answers.feel_treated_respect}
                      label={Meal_cashPdm.options.know_address_suggestions}
                      includeNullish
                    />
                  </SlidePanel>
                  <SlidePanel title={m.mealMonitoringPdm.eoreSatis}>
                    <ChartBarSingleBy
                      data={data}
                      by={(_) => _.answers.satisfied_assistance_provided}
                      label={Meal_cashPdm.options.know_address_suggestions}
                      includeNullish
                    />
                  </SlidePanel>
                </Div>
                <Div column sx={{maxHeight: '33%'}}>
                  <SlidePanel title={m.mealMonitoringPdm.exclude}>
                    <ChartBarSingleBy
                      data={data}
                      by={(_) => _.answers.know_people_needing}
                      label={Meal_cashPdm.options.know_address_suggestions}
                      includeNullish
                    />
                  </SlidePanel>
                </Div>
                <Div column sx={{maxHeight: '33%'}}>
                  <SlidePanel title={m.mealMonitoringPdm.viewsTaken}>
                    <ChartBarSingleBy
                      data={data}
                      by={(_) => _.answers.account_organization_assistance}
                      label={Meal_cashPdm.options.know_address_suggestions}
                      includeNullish
                    />
                  </SlidePanel>
                  <SlidePanel title={m.mealMonitoringPdm.wellInformed}>
                    <ChartBarSingleBy
                      data={data}
                      by={(_) => _.answers.feel_informed_assistance}
                      label={Meal_cashPdm.options.know_address_suggestions}
                      includeNullish
                    />
                  </SlidePanel>
                </Div>
              </Div>
            </PdfSlideBody>
          </PdfSlide>
          {seq(data).length > 0 && <Safe data={data} />}
          {seq(data).length > 0 && <Accountability data={data} />}
        </>
      )}
    </Page>
  )
}
