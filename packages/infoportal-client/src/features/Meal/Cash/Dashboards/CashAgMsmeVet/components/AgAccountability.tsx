import type {FC} from 'react'
import {Box, Card} from '@mui/material'

import {Meal_ecrec_agMsmeVetPam} from 'infoportal-common'

import {Div} from '@/shared/PdfLayout/PdfSlide'

import ChartWidget from './ChartWidget'
import Subtitle from './Subtitle'
import type {PdmSectionProps} from './types'

const AgAccountability: FC<PdmSectionProps> = ({data, title}) => (
  <Box mt={2}>
    <Subtitle text={title} />
    <Div responsive>
      <Div column>
        <Card>
          {(['any_member_household', 'any_member_household_yes'] satisfies (keyof Meal_ecrec_agMsmeVetPam.T)[]).map(
            (field) => (
              <ChartWidget key={field} data={data} field={field} limitChartHeight={456} />
            ),
          )}
        </Card>
        <Card>
          {(
            [
              'provide_someone_commission',
              'provide_someone_commission_yes',
              'provide_someone_commission_yes_other',
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
              'know_address_suggestions',
              'know_address_suggestions_yes',
              'know_address_suggestions_yes_ndnp',
              'know_address_suggestions_yes_ndnp_other',
              'know_address_suggestions_no',
              'know_address_suggestions_no_other',
            ] satisfies (keyof Meal_ecrec_agMsmeVetPam.T)[]
          ).map((field) => (
            <ChartWidget key={field} data={data} field={field} limitChartHeight={456} />
          ))}
        </Card>
      </Div>
      <Div column>
        <Card>
          {(['submitted_feedback_complaint', 'comment'] satisfies (keyof Meal_ecrec_agMsmeVetPam.T)[]).map((field) => (
            <ChartWidget key={field} data={data} field={field} limitChartHeight={456} />
          ))}
        </Card>
      </Div>
    </Div>
  </Box>
)

export default AgAccountability
