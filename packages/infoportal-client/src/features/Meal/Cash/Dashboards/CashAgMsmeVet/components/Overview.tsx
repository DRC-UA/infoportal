import {Seq} from '@axanc/ts-utils'
import {Box, Typography} from '@mui/material'

import {Meal_cashPdm, OblastIndex} from 'infoportal-common'

import {useI18n} from '@/core/i18n'
import {CashPdmData} from '@/features/Meal/Cash/Context/CashContext'
import {CashIndividuals} from '@/features/Meal/Cash/Components/CashIndividuals'
import {AgeGroupTable} from '@/shared'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import {ChartBarMultipleBy} from '@/shared/charts/ChartBarMultipleBy'
import {MapSvgByOblast} from '@/shared/maps/MapSvgByOblast'
import {Panel, PanelBody} from '@/shared/Panel'
import {Div, SlidePanel} from '@/shared/PdfLayout/PdfSlide'

export const CashOverview: React.FC<{
  data: Seq<CashPdmData<Meal_cashPdm.T>>
}> = ({data}) => {
  const {m} = useI18n()

  return (
    <>
      <Box
        sx={{
          pb: 1,
          borderBottom: '2px solid',
          borderColor: (t) => t.palette.divider,
          mb: 2,
        }}
      >
        <Typography variant="h4" fontWeight="bold" color="text.primary">
          {m.overview}
        </Typography>
      </Box>
      <Div responsive>
        <Div column sx={{maxHeight: '33%'}}>
          <CashIndividuals data={data} />
          <Panel title={m.ageGroup}>
            <PanelBody>
              <AgeGroupTable
                tableId="cash-dashboard"
                persons={data.flatMap(({persons}) => persons).compact()}
                enableDisplacementStatusFilter
                enablePwdFilter
              />
            </PanelBody>
          </Panel>
        </Div>

        <Div column sx={{maxHeight: '33%'}}>
          <SlidePanel title={m.mealMonitoringPdm.didReceive}>
            <ChartBarSingleBy
              data={data}
              by={({received}) => received}
              label={Meal_cashPdm.options.any_member_household}
              includeNullish
            />
          </SlidePanel>

          <SlidePanel title={m.project}>
            <ChartBarSingleBy data={data} by={({project}) => project} includeNullish />
          </SlidePanel>

          <SlidePanel title={m.mealMonitoringPdm.pdmType}>
            <ChartBarSingleBy data={data} by={({pdmType}) => pdmType} label={Meal_cashPdm.options.pdmtype} />
          </SlidePanel>
        </Div>

        <Div column sx={{maxHeight: '33%'}}>
          <Panel savableAsImg expendable title={m.location}>
            <PanelBody>
              <MapSvgByOblast
                sx={{maxWidth: 480, margin: 'auto'}}
                fillBaseOn="value"
                data={data}
                getOblast={({oblast}) => OblastIndex.byName(oblast)?.iso!}
                value={() => true}
                total={data.length}
                base={({oblast}) => oblast !== undefined}
              />
            </PanelBody>
          </Panel>
        </Div>
      </Div>
    </>
  )
}
