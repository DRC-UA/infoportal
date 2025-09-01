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

export const AbilityCover: React.FC<{
  data: Seq<CashPdmData<Meal_cashPdm.T>>
}> = ({data}) => {
  const {m} = useI18n()

  return (
    <>
      <PdfSectionTitle>{m.abilityCover}</PdfSectionTitle>
      <PdfSlide>
        <PdfSlideBody>
          <Div responsive>
            <Div column sx={{maxHeight: '33%'}}>
              <SlidePanel title={m.mealMonitoringPdm.enoughBasic}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.household_currently_have_clothing}
                  label={Meal_cashPdm.options.any_member_household}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.whatExtent}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.extent_basic_needs}
                  label={Meal_cashPdm.options.extent_basic_needs}
                  includeNullish
                />
              </SlidePanel>
            </Div>
            <Div column sx={{maxHeight: '33%'}}>
              <SlidePanel title={m.mealMonitoringPdm.whichBasicNeed}>
                <ChartBarMultipleBy
                  data={data}
                  by={(_) => _.answers.household_currently_have_clothing_no}
                  label={Meal_cashPdm.options.household_currently_have_clothing_no}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.enoughWater}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.enough_water_household}
                  label={Meal_cashPdm.options.any_member_household}
                  includeNullish
                />
              </SlidePanel>
            </Div>
            <Div column sx={{maxHeight: '33%'}}>
              <SlidePanel title={m.mealMonitoringPdm.basicUnable}>
                <ChartBarMultipleBy
                  data={data}
                  by={(_) => _.answers.basic_needs_unable_fulfil}
                  label={Meal_cashPdm.options.most_important_things}
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
              <SlidePanel title={m.mealMonitoringPdm.unableFood}>
                <ChartBarMultipleBy
                  data={data}
                  by={(_) => _.answers.unable_fulfil_basic_food}
                  label={Meal_cashPdm.options.unable_fulfil_other}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.unableFoodChildren}>
                <ChartBarMultipleBy
                  data={data}
                  by={(_) => _.answers.unable_fulfil_food_children}
                  label={Meal_cashPdm.options.unable_fulfil_other}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.unableWater}>
                <ChartBarMultipleBy
                  data={data}
                  by={(_) => _.answers.unable_fulfil_water_needs}
                  label={Meal_cashPdm.options.unable_fulfil_other}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.unableHygiene}>
                <ChartBarMultipleBy
                  data={data}
                  by={(_) => _.answers.unable_fulfil_hygiene_needs}
                  label={Meal_cashPdm.options.unable_fulfil_other}
                  includeNullish
                />
              </SlidePanel>
            </Div>
            <Div column sx={{maxHeight: '33%'}}>
              <SlidePanel title={m.mealMonitoringPdm.unableHealth}>
                <ChartBarMultipleBy
                  data={data}
                  by={(_) => _.answers.unable_fulfil_healthcare_needs}
                  label={Meal_cashPdm.options.unable_fulfil_other}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.unableHealthChildren}>
                <ChartBarMultipleBy
                  data={data}
                  by={(_) => _.answers.unable_fulfil_healthcare_children}
                  label={Meal_cashPdm.options.unable_fulfil_other}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.unableHealthPregnant}>
                <ChartBarMultipleBy
                  data={data}
                  by={(_) => _.answers.unable_fulfil_healthcare_pregnant}
                  label={Meal_cashPdm.options.unable_fulfil_other}
                  includeNullish
                />
              </SlidePanel>
            </Div>
            <Div column sx={{maxHeight: '33%'}}>
              <SlidePanel title={m.mealMonitoringPdm.unableShelter}>
                <ChartBarMultipleBy
                  data={data}
                  by={(_) => _.answers.unable_fulfil_shelter_needs}
                  label={Meal_cashPdm.options.unable_fulfil_other}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.unableTransport}>
                <ChartBarMultipleBy
                  data={data}
                  by={(_) => _.answers.unable_fulfil_transportation_needs}
                  label={Meal_cashPdm.options.unable_fulfil_other}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.unableCommunication}>
                <ChartBarMultipleBy
                  data={data}
                  by={(_) => _.answers.unable_fulfil_communication_needs}
                  label={Meal_cashPdm.options.unable_fulfil_other}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.unableEdu}>
                <ChartBarMultipleBy
                  data={data}
                  by={(_) => _.answers.unable_fulfil_education_needs}
                  label={Meal_cashPdm.options.unable_fulfil_other}
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
              <SlidePanel title={m.mealMonitoringPdm.unableCloth}>
                <ChartBarMultipleBy
                  data={data}
                  by={(_) => _.answers.unable_fulfil_clothing_needs}
                  label={Meal_cashPdm.options.unable_fulfil_other}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.unableUti}>
                <ChartBarMultipleBy
                  data={data}
                  by={(_) => _.answers.unable_fulfil_utilities}
                  label={Meal_cashPdm.options.unable_fulfil_other}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.unableOther}>
                <ChartBarMultipleBy
                  data={data}
                  by={(_) => _.answers.unable_fulfil_other}
                  label={Meal_cashPdm.options.unable_fulfil_other}
                  includeNullish
                />
              </SlidePanel>
            </Div>
            <Div column sx={{maxHeight: '50%'}}>
              <SlidePanel title={m.mealMonitoringPdm.mostImportant}>
                <ChartBarMultipleBy
                  data={data}
                  by={(_) => _.answers.most_important_things}
                  label={Meal_cashPdm.options.most_important_things}
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
