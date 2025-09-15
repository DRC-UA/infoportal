import React from 'react'
import {Box, Typography} from '@mui/material'
import {Seq} from '@axanc/ts-utils'
import {Meal_cashPdm} from 'infoportal-common'
import {useI18n} from '@/core/i18n'
import {CashPdmData} from '@/features/Meal/Cash/Context/CashContext'
import {Div, PdfSlide, PdfSlideBody, SlidePanel} from '@/shared/PdfLayout/PdfSlide'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'

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

export const SufficiencyRent: React.FC<{
  data: Seq<CashPdmData<Meal_cashPdm.T>>
}> = ({data}) => {
  const {m} = useI18n()

  return (
    <>
      <PdfSectionTitle>{m.mealMonitoringPdm.sufficiency}</PdfSectionTitle>
      <PdfSlide>
        <PdfSlideBody>
          <Div responsive>
            <Div column sx={{maxHeight: '50%'}}>
              <SlidePanel title={m.mealMonitoringPdm.rentBenefit}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.rent_benefit}
                  label={Meal_cashPdm.options.any_member_household}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.accessHousing}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.access_adequate_housing}
                  label={Meal_cashPdm.options.any_member_household}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.improveLiving}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.improve_living}
                  label={Meal_cashPdm.options.improve_living}
                  includeNullish
                />
              </SlidePanel>
            </Div>
            <Div column sx={{maxHeight: '50%'}}>
              <SlidePanel title={m.mealMonitoringPdm.spentCashOther}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.spent_cash_assistance}
                  label={Meal_cashPdm.options.any_member_household}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.moneyReceived}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.money_received}
                  label={Meal_cashPdm.options.money_received}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.assistanceEnoughCover}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.assistance_enough}
                  label={Meal_cashPdm.options.any_member_household}
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
              <SlidePanel title={m.mealMonitoringPdm.spentCashOtherRepairs}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.assistance_other_repairs}
                  label={Meal_cashPdm.options.any_member_household}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.assistanceRepairsRate}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.assistance_other_repairs_rate}
                  label={Meal_cashPdm.options.assistance_other_repairs_rate}
                  includeNullish
                />
              </SlidePanel>
            </Div>
            <Div column sx={{maxHeight: '50%'}}>
              <SlidePanel title={m.mealMonitoringPdm.whoAssisted}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.who_assisted}
                  label={Meal_cashPdm.options.who_assisted}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.useBrochure}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.brochure_provided}
                  label={Meal_cashPdm.options.brochure_provided}
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
