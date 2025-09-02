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
            <Div column sx={{maxHeight: '33%'}}>
              <SlidePanel title={m.mealMonitoringPdm.extentHH}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.extent_household_basic_needs}
                  label={Meal_cashPdm.options.extent_household_basic_needs}
                  includeNullish
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.extentDefine}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.extent_household_basic_needs_define}
                  label={Meal_cashPdm.options.extent_household_basic_needs_define}
                  includeNullish
                />
              </SlidePanel>
            </Div>
            <Div column sx={{maxHeight: '33%'}}>
              <SlidePanel title={m.mealMonitoringPdm.unableFulfill}>
                <ChartBarMultipleBy
                  data={data}
                  by={(_) => _.answers.basic_needs_unable_fulfill_bha345}
                  label={Meal_cashPdm.options.basic_needs_unable_fulfill_bha345}
                  includeNullish
                />
              </SlidePanel>
            </Div>
            <Div column sx={{maxHeight: '33%'}}>
              <SlidePanel title={m.mealMonitoringPdm.whyUnable}>
                <ChartBarMultipleBy
                  data={data}
                  by={(_) => _.answers.basic_needs_unable_fully_reason_bha345}
                  label={Meal_cashPdm.options.basic_needs_unable_fully_reason_bha345}
                  includeNullish
                />
              </SlidePanel>
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
    </>
  )
}
