import React from 'react'
import {Meal_cashPdm, OblastIndex} from 'infoportal-common'
import {Seq} from '@axanc/ts-utils'
import {useI18n} from '@/core/i18n'
import {Div, PdfSlide, PdfSlideBody, SlidePanel} from '@/shared/PdfLayout/PdfSlide'
import {Panel, PanelBody} from '@/shared/Panel'
import {AgeGroupTable} from '@/shared'
import {MapSvgByOblast} from '@/shared/maps/MapSvgByOblast'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import {ChartBarMultipleBy} from '@/shared/charts/ChartBarMultipleBy'
import {Box, Typography} from '@mui/material'
import {CashPdmData} from '@/features/Meal/Cash/Context/CashContext'
import {CashIndividuals} from '@/features/Meal/Cash/Components/CashIndividuals'

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

export const CashOverview: React.FC<{
  data: Seq<CashPdmData<Meal_cashPdm.T>>
}> = ({data}) => {
  const {m} = useI18n()

  return (
    <>
      <PdfSectionTitle>{m.overview}</PdfSectionTitle>
      <PdfSlide>
        <PdfSlideBody>
          <Div responsive>
            <Div column sx={{maxHeight: '33%'}}>
              <CashIndividuals data={data} />
              <Panel title={m.ageGroup}>
                <PanelBody>
                  <AgeGroupTable
                    tableId="cash-dashboard"
                    persons={data.flatMap((_) => _.persons).compact()}
                    enableDisplacementStatusFilter
                    enablePwdFilter
                  />
                </PanelBody>
              </Panel>

              <Panel savableAsImg expendable title={m.location}>
                <PanelBody>
                  <MapSvgByOblast
                    sx={{maxWidth: 480, margin: 'auto'}}
                    fillBaseOn="value"
                    data={data}
                    getOblast={(_) => OblastIndex.koboOblastIndexIso[_.answers.ben_det_oblast!]}
                    value={() => true}
                    base={(_) => _.answers.ben_det_oblast !== undefined}
                  />
                </PanelBody>
              </Panel>
            </Div>

            <Div column sx={{maxHeight: '33%'}}>
              <SlidePanel title={m.mealMonitoringPdm.didReceive}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.did_receive_cash}
                  label={Meal_cashPdm.options.any_member_household}
                  includeNullish
                />
              </SlidePanel>

              <SlidePanel title={m.mealMonitoringPdm.pdmType}>
                <ChartBarMultipleBy data={data} by={(_) => _.answers.pdmtype} label={Meal_cashPdm.options.pdmtype} />
              </SlidePanel>
            </Div>

            <Div column sx={{maxHeight: '33%'}}>
              <SlidePanel title={m.project}>
                <ChartBarSingleBy
                  data={data}
                  by={(_) => _.answers.donor}
                  label={Meal_cashPdm.options.donor}
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
