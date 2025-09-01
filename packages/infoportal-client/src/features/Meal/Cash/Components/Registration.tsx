import React from 'react'
import {Seq} from '@axanc/ts-utils'
import {Meal_cashPdm} from 'infoportal-common'
import {useI18n} from '@/core/i18n'
import {Box, Typography} from '@mui/material'
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

export const Registration: React.FC<{
  data: Seq<CashPdmData<Meal_cashPdm.T>>
}> = ({data}) => {
  const {m} = useI18n()

  return (
    <>
      <PdfSectionTitle>{m.registration}</PdfSectionTitle>
      <PdfSlide>
        <PdfSlideBody>
          <Div responsive>
            <Div column sx={{maxHeight: '25%'}}>
              <SlidePanel title={m.mealMonitoringPdm.satisfiedProcess}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.satisfied_process}
                  label={Meal_cashPdm.options.satisfied_process}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.satisfiedAmount}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.satisfied_cash_amount}
                  label={Meal_cashPdm.options.any_member_household}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.assistanceCorrespond}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.amount_cash_received_correspond}
                  label={Meal_cashPdm.options.sufficient_living_spaces}
                  includeNullish
                />
              </SlidePanel>
            </Div>
            <Div column sx={{maxHeight: '25%'}}>
              <SlidePanel title={m.mealMonitoringPdm.problems}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.experience_problems}
                  label={Meal_cashPdm.options.any_member_household}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.problemsYes}>
                <ChartBarMultipleBy
                  data={data}
                  by={(_) => _.answers.experience_problems_yes}
                  label={Meal_cashPdm.options.experience_problems_yes}
                  includeNullish
                />
              </SlidePanel>
            </Div>
            <Div column sx={{maxHeight: '25%'}}>
              <SlidePanel title={m.mealMonitoringPdm.provideInfo}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.organization_provide_information}
                  label={Meal_cashPdm.options.any_member_household}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.betterInform}>
                <ChartBarMultipleBy
                  data={data}
                  by={(_) => _.answers.better_inform_distribution}
                  label={Meal_cashPdm.options.better_inform_distribution}
                  includeNullish
                />
              </SlidePanel>
            </Div>
            <Div column sx={{maxHeight: '25%'}}>
              <SlidePanel title={m.mealMonitoringPdm.assistanceReceive}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.assistance_delivered}
                  label={Meal_cashPdm.options.assistance_delivered}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.timeToTake}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.time_registered_assistance}
                  label={Meal_cashPdm.options.time_registered_assistance}
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
