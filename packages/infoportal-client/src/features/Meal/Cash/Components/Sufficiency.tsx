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

export const Sufficiency: React.FC<{
  data: Seq<CashPdmData<Meal_cashPdm.T>>
}> = ({data}) => {
  const {m} = useI18n()

  return (
    <>
      <PdfSectionTitle>{m.mealMonitoringPdm.sufficiency}</PdfSectionTitle>
      <PdfSlide>
        <PdfSlideBody>
          <Div responsive>
            <Div column sx={{maxHeight: '33%'}}>
              <SlidePanel title={m.mealMonitoringPdm.livestockSaf}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.received_feed_livestock_winter}
                  label={Meal_cashPdm.options.any_member_household}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.lifestockEnough}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.received_feed_livestock_winter_long}
                  label={Meal_cashPdm.options.received_feed_livestock_winter_long}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.whatPrefer}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.cash_modality_inkind}
                  label={Meal_cashPdm.options.cash_modality_inkind}
                  includeNullish
                />
              </SlidePanel>
            </Div>
            <Div column sx={{maxHeight: '33%'}}>
              <SlidePanel title={m.mealMonitoringPdm.trainingNeed}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.training_inductions_agricultural}
                  label={Meal_cashPdm.options.any_member_household}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.renovate}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.amount_received_renovation_shelter}
                  label={Meal_cashPdm.options.any_member_household}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.completed}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.completed_renovation_livestock}
                  label={Meal_cashPdm.options.any_member_household}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.amountEnoughSpring}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.received_enough_agricultural_needs}
                  label={Meal_cashPdm.options.any_member_household}
                  includeNullish
                />
              </SlidePanel>
            </Div>
            <Div column sx={{maxHeight: '33%'}}>
              <SlidePanel title={m.mealMonitoringPdm.prevented}>
                <ChartBarMultipleBy
                  data={data}
                  by={(_) => _.answers.completed_renovation_livestock_no}
                  label={Meal_cashPdm.options.completed_renovation_livestock_no}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.typeRenovate}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.type_renovation}
                  label={Meal_cashPdm.options.type_renovation}
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
          </Div>
        </PdfSlideBody>
      </PdfSlide>
      <PdfSlide>
        <PdfSlideBody>
          <Div responsive>
            <Div column sx={{maxHeight: '50%'}}>
              <SlidePanel title={m.mealMonitoringPdm.timely}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.cash_assistance_timely}
                  label={Meal_cashPdm.options.any_member_household}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.typePrefer}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.type_assistance_agricultural}
                  label={Meal_cashPdm.options.type_assistance_agricultural}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.itemsHelpful}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.items_helpful_agriculture}
                  label={Meal_cashPdm.options.items_helpful_agriculture}
                  includeNullish
                />
              </SlidePanel>
            </Div>
            <Div column sx={{maxHeight: '50%'}}>
              <SlidePanel title={m.mealMonitoringPdm.trainingImprove}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.training_improve_agricultural}
                  label={Meal_cashPdm.options.training_improve_agricultural}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.infoTraining}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.type_training_helpful}
                  label={Meal_cashPdm.options.type_training_helpful}
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
