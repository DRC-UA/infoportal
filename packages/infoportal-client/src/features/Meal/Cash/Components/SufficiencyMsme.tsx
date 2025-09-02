import React from 'react'
import {Box, Typography} from '@mui/material'
import {Seq} from '@axanc/ts-utils'
import {Meal_cashPdm} from 'infoportal-common'
import {useI18n} from '@/core/i18n'
import {CashPdmData} from '@/features/Meal/Cash/Context/CashContext'
import {Div, PdfSlide, PdfSlideBody, SlidePanel} from '@/shared/PdfLayout/PdfSlide'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import {ChartBarMultipleBy} from '@/shared/charts/ChartBarMultipleBy'

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

export const SufficiencyMsme: React.FC<{
  data: Seq<CashPdmData<Meal_cashPdm.T>>
}> = ({data}) => {
  const {m} = useI18n()

  return (
    <>
      <PdfSectionTitle>{m.sufficiencyMsme}</PdfSectionTitle>
      <PdfSlide>
        <PdfSlideBody>
          <Div responsive>
            <Div column sx={{maxHeight: '33%'}}>
              <SlidePanel title={m.mealMonitoringPdm.cashReceivedMsme}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.cash_received_msme}
                  label={Meal_cashPdm.options.any_member_household}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.useBusiness}>
                <ChartBarMultipleBy
                  data={data}
                  by={(_) => _.answers.cash_usage}
                  label={Meal_cashPdm.options.cash_usage}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.cashSufficientBusiness}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.cash_sufficient}
                  label={Meal_cashPdm.options.cash_sufficient}
                  includeNullish
                />
              </SlidePanel>
            </Div>
            <Div column sx={{maxHeight: '33%'}}>
              <SlidePanel title={m.mealMonitoringPdm.businessImprove}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.business_improvement}
                  label={Meal_cashPdm.options.any_member_household}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.improvementsNotice}>
                <ChartBarMultipleBy
                  data={data}
                  by={(_) => _.answers.improvements_noticed}
                  label={Meal_cashPdm.options.improvements_noticed}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.challengeFaced}>
                <ChartBarMultipleBy
                  data={data}
                  by={(_) => _.answers.challenges_faced}
                  label={Meal_cashPdm.options.challenges_faced}
                  includeNullish
                />
              </SlidePanel>
            </Div>
            <Div column sx={{maxHeight: '33%'}}>
              <SlidePanel title={m.mealMonitoringPdm.trainingAttend}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.training_attended}
                  label={Meal_cashPdm.options.any_member_household}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.trainingSatis}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.training_satisfaction}
                  label={Meal_cashPdm.options.training_satisfaction}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.trainingExpect}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.training_expectations_met}
                  label={Meal_cashPdm.options.training_expectations_met}
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
              <SlidePanel title={m.mealMonitoringPdm.trainingRelevant}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.training_relevance}
                  label={Meal_cashPdm.options.training_relevance}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.onlineFormat}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.training_format_suitability}
                  label={Meal_cashPdm.options.training_format_suitability}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.durationSuitable}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.training_duration_sufficient}
                  label={Meal_cashPdm.options.training_duration_sufficient}
                  includeNullish
                />
              </SlidePanel>
            </Div>
            <Div column sx={{maxHeight: '50%'}}>
              <SlidePanel title={m.mealMonitoringPdm.revenueGenerate}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.revenue_generated}
                  label={Meal_cashPdm.options.any_member_household}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.netIncome}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.net_income}
                  label={Meal_cashPdm.options.any_member_household}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.likelyRecommend}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.recommendation_likelihood}
                  label={Meal_cashPdm.options.recommendation_likelihood}
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
