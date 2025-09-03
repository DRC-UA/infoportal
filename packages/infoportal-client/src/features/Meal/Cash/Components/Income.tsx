import React from 'react'
import {Box, Typography} from '@mui/material'
import {Seq} from '@axanc/ts-utils'
import {Meal_cashPdm} from 'infoportal-common'
import {useI18n} from '@/core/i18n'
import {Div, PdfSlide, PdfSlideBody, SlidePanel} from '@/shared/PdfLayout/PdfSlide'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import {ChartBarMultipleBy} from '@/shared/charts/ChartBarMultipleBy'
import {CashPdmData} from '@/features/Meal/Cash/Context/CashContext'

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

export const Income: React.FC<{
  data: Seq<CashPdmData<Meal_cashPdm.T>>
}> = ({data}) => {
  const {m} = useI18n()
  return (
    <>
      <PdfSectionTitle>{m.income}</PdfSectionTitle>
      <PdfSlide>
        <PdfSlideBody>
          <Div responsive>
            <Div column sx={{maxHeight: '50%'}}>
              <SlidePanel title={m.mealMonitoringPdm.foodExpand}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.food_expenditures_assistance}
                  label={Meal_cashPdm.options.after_assistance_natural_products}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.proportion}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.receiving_cash_purchase_produce}
                  label={Meal_cashPdm.options.receiving_cash_purchase_produce}
                  includeNullish
                />
              </SlidePanel>
            </Div>
            <Div column sx={{maxHeight: '50%'}}>
              <SlidePanel title={m.mealMonitoringPdm.mainChallenges}>
                <ChartBarMultipleBy
                  data={data}
                  by={(_) => _.answers.challenges_prevented_meeting}
                  label={Meal_cashPdm.options.challenges_prevented_meeting}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.hhIncrease}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.household_increase_decrease_livestock_receiving}
                  label={Meal_cashPdm.options.after_assistance_natural_products}
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
              <SlidePanel title={m.mealMonitoringPdm.opportunitySell}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.opportunity_sell_production_excesses}
                  label={Meal_cashPdm.options.any_member_household}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.comparison}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.comparison_last_year}
                  label={Meal_cashPdm.options.after_assistance_natural_products}
                  includeNullish
                />
              </SlidePanel>
            </Div>
            <Div column sx={{maxHeight: '50%'}}>
              <SlidePanel title={m.mealMonitoringPdm.consumeMajor}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.consume_majority_crops}
                  label={Meal_cashPdm.options.any_member_household}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.naturalProd}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.after_assistance_natural_products}
                  label={Meal_cashPdm.options.after_assistance_natural_products}
                  includeNullish
                />
              </SlidePanel>
            </Div>
          </Div>
        </PdfSlideBody>
      </PdfSlide>
    </>
  )
}
