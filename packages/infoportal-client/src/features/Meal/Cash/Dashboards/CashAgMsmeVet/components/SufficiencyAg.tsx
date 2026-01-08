import type {FC} from 'react'
import {Box, Card} from '@mui/material'

import {Meal_ecrec_agMsmeVetPam} from 'infoportal-common'

import {Div} from '@/shared/PdfLayout/PdfSlide'

import ChartWidget from './ChartWidget'
import Subtitle from './Subtitle'
import type {PdmSectionProps} from './types'

const SufficiencyAg: FC<PdmSectionProps> = ({data, title}) => (
  <Box mt={2}>
    <Subtitle text={title} />
    <Div responsive>
      <Div column>
        <ChartWidget data={data} field="cash_modality_inkind" />
        <Card>
          {(
            [
              'training_inductions_agricultural',
              'training_inductions_agricultural_yes',
            ] satisfies (keyof Meal_ecrec_agMsmeVetPam.T)[]
          ).map((field) => (
            <ChartWidget key={field} data={data} field={field} limitChartHeight={456} />
          ))}
        </Card>
        <Card>
          {(
            [
              'received_enough_agricultural_needs_long',
              'received_enough_agricultural_needs_long_other',
            ] satisfies (keyof Meal_ecrec_agMsmeVetPam.T)[]
          ).map((field) => (
            <ChartWidget key={field} data={data} field={field} limitChartHeight={456} />
          ))}
        </Card>
      </Div>
      <Div column>
        <Card>
          {(
            [
              'hectares_use_assistance',
              'cash_agricultural_inputs',
              'agricultural_inputs_purchased',
              'agricultural_inputs_purchased_other',
              'no_purchase_agricultural_inputs',
              'no_purchase_agricultural_inputs_other',
              'planning_use_money',
            ] satisfies (keyof Meal_ecrec_agMsmeVetPam.T)[]
          ).map((field) => (
            <ChartWidget key={field} data={data} field={field} limitChartHeight={456} />
          ))}
        </Card>
      </Div>
      <Div column>
        <Card>
          {(
            [
              'improve_planning_management',
              'improve_planning_management_001',
            ] satisfies (keyof Meal_ecrec_agMsmeVetPam.T)[]
          ).map((field) => (
            <ChartWidget key={field} data={data} field={field} limitChartHeight={456} />
          ))}
        </Card>
        <Card>
          {(
            [
              'improve_planning_agricultural',
              'improve_planning_agricultural_001',
            ] satisfies (keyof Meal_ecrec_agMsmeVetPam.T)[]
          ).map((field) => (
            <ChartWidget key={field} data={data} field={field} limitChartHeight={456} />
          ))}
        </Card>
      </Div>
    </Div>
  </Box>
)

export default SufficiencyAg
