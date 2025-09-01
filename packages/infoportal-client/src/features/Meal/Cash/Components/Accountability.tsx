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

export const Accountability: React.FC<{
  data: Seq<CashPdmData<Meal_cashPdm.T>>
}> = ({data}) => {
  const {m} = useI18n()

  return (
    <>
      <PdfSectionTitle>{m.accountability}</PdfSectionTitle>
      <PdfSlide>
        <PdfSlideBody>
          <Div responsive>
            <Div column sx={{maxHeight: '33%'}}>
              <SlidePanel title={m.mealMonitoringPdm.anyRisk}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.any_member_household}
                  label={Meal_cashPdm.options.any_member_household}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.receiveGift}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.provide_someone_commission}
                  label={Meal_cashPdm.options.provide_someone_commission}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.responseReceived}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.submitted_feedback_complaint}
                  label={Meal_cashPdm.options.submitted_feedback_complaint}
                  includeNullish
                />
              </SlidePanel>
            </Div>
            <Div column sx={{maxHeight: '33%'}}>
              <SlidePanel title={m.mealMonitoringPdm.address}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.know_address_suggestions}
                  label={Meal_cashPdm.options.know_address_suggestions}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.yesProvide}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.know_address_suggestions_yes}
                  label={Meal_cashPdm.options.know_address_suggestions_yes}
                  includeNullish
                />
              </SlidePanel>
            </Div>
            <Div column sx={{maxHeight: '33%'}}>
              <SlidePanel title={m.mealMonitoringPdm.noProvideWhy}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.know_address_suggestions_yes_ndnp}
                  label={Meal_cashPdm.options.know_address_suggestions_yes_ndnp}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.noWhy}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.know_address_suggestions_no}
                  label={Meal_cashPdm.options.know_address_suggestions_no}
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
