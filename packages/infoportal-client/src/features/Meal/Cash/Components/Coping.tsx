import React from 'react'
import {Box, Typography} from '@mui/material'
import {seq, Seq} from '@axanc/ts-utils'
import {Meal_cashPdm} from 'infoportal-common'
import {formatLargeNumber, useI18n} from '@/core/i18n'
import {Div, PdfSlide, PdfSlideBody, SlidePanel} from '@/shared/PdfLayout/PdfSlide'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import {ChartBarMultipleBy} from '@/shared/charts/ChartBarMultipleBy'
import {CashPdmData} from '@/features/Meal/Cash/Context/CashContext'
import {Lazy} from '@/shared'

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
            <Div column sx={{maxHeight: '33%'}}>
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
            <Div column sx={{maxHeight: '33%'}}>
              <SlidePanel>
                <Box display="flex" justifyContent="space-between" alignItems="center" gap={2}>
                  {[
                    {
                      icon: 'fingerprint',
                      label: m.households,
                      valueFn: () => seq(data).length,
                    },
                    {
                      icon: 'person',
                      label: m.male,
                      valueFn: () =>
                        seq(data)
                          .map((_) => _.answers.number_male)
                          .compact()
                          .sum(),
                    },
                    {
                      icon: 'person',
                      label: m.female,
                      valueFn: () =>
                        seq(data)
                          .map((_) => _.answers.number_female)
                          .compact()
                          .sum(),
                    },
                  ].map(({icon, label, valueFn}) => (
                    <Box key={label} display="flex" flexDirection="column" alignItems="center" flex={1}>
                      <Lazy deps={[data]} fn={valueFn}>
                        {(value) => (
                          <Box display="flex" alignItems="center" gap={1}>
                            <span className="material-icons" style={{fontSize: 20, color: '#555'}}>
                              {icon}
                            </span>
                            <strong style={{fontSize: 18}}>{formatLargeNumber(value)}</strong>
                          </Box>
                        )}
                      </Lazy>
                      <Box fontSize={12} mt={0.5} textAlign="center">
                        {label.toUpperCase()}
                      </Box>
                    </Box>
                  ))}
                </Box>
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
              <SlidePanel title={m.mealMonitoringPdm.lcs_move_elsewhere}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.lcs_move_elsewhere}
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
            </Div>
          </Div>
        </PdfSlideBody>
      </PdfSlide>
    </>
  )
}
