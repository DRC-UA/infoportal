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

export const Coping: React.FC<{
  data: Seq<CashPdmData<Meal_cashPdm.T>>
}> = ({data}) => {
  const {m} = useI18n()
  return (
    <>
      <PdfSectionTitle>{m.coping}</PdfSectionTitle>

      <PdfSlide>
        <PdfSlideBody>
          <Div responsive>
            <Div column sx={{maxHeight: '50%'}}>
              <SlidePanel title={m.mealMonitoringPdm.lcs_sell_hh_assets}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.lcs_sell_hh_assets}
                  label={Meal_cashPdm.options.lcs_decrease_fertilizer}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.lcs_spent_savings}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.lcs_spent_savings}
                  label={Meal_cashPdm.options.lcs_decrease_fertilizer}
                  includeNullish
                />
              </SlidePanel>
            </Div>
            <Div column sx={{maxHeight: '50%'}}>
              <SlidePanel title={m.mealMonitoringPdm.lcs_sell_productive_assets}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.lcs_sell_productive_assets}
                  label={Meal_cashPdm.options.lcs_decrease_fertilizer}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.lcs_reduce_health_expenditures}>
                <ChartBarSingleBy
                  data={data}
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
                  data={data}
                  by={(_) => _.answers.lcs_sell_house}
                  label={Meal_cashPdm.options.lcs_decrease_fertilizer}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.lcs_forrowed_food}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.lcs_forrowed_food}
                  label={Meal_cashPdm.options.lcs_decrease_fertilizer}
                  includeNullish
                />
              </SlidePanel>
            </Div>
            <Div column sx={{maxHeight: '33%'}}>
              <SlidePanel title={m.mealMonitoringPdm.lcs_degrading_income_source}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.lcs_degrading_income_source}
                  label={Meal_cashPdm.options.lcs_decrease_fertilizer}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.lcs_ask_stranger}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.lcs_ask_stranger}
                  label={Meal_cashPdm.options.lcs_decrease_fertilizer}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.lcs_eat_elsewhere}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.lcs_eat_elsewhere}
                  label={Meal_cashPdm.options.lcs_decrease_fertilizer}
                  includeNullish
                />
              </SlidePanel>
            </Div>
            <Div column sx={{maxHeight: '33%'}}>
              <SlidePanel title={m.mealMonitoringPdm.lcs_reason}>
                <ChartBarMultipleBy
                  data={data}
                  by={(_) => _.answers.lcs_reason}
                  label={Meal_cashPdm.options.lcs_reason}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.lcs_move_elsewhere}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.lcs_move_elsewhere}
                  label={Meal_cashPdm.options.lcs_decrease_fertilizer}
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
