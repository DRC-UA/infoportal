import type {FC} from 'react'
import {Box, Card} from '@mui/material'

import {Meal_ecrec_agMsmeVetPam} from 'infoportal-common'

import {Div} from '@/shared/PdfLayout/PdfSlide'

import ChartBarWidget from './ChartBarWidget'
import Subtitle from './Subtitle'
import type {PdmSectionProps} from './types'

const AgOutcome: FC<PdmSectionProps> = ({data, title}) => (
  <Box mt={2}>
    <Subtitle text={title} />
    <Div responsive>
      <Div column>
        <Card>
          {(['feel_safe_travelling', 'feel_safe_travelling_bad'] satisfies (keyof Meal_ecrec_agMsmeVetPam.T)[]).map(
            (field) => (
              <ChartBarWidget key={field} data={data} field={field} limitChartHeight={456} />
            ),
          )}
        </Card>
      </Div>
      <Div column>
        <Card>
          {(['feel_treated_respect', 'feel_treated_respect_bad'] satisfies (keyof Meal_ecrec_agMsmeVetPam.T)[]).map(
            (field) => (
              <ChartBarWidget key={field} data={data} field={field} limitChartHeight={456} />
            ),
          )}
        </Card>
        <Card>
          {(
            [
              'satisfied_assistance_provided',
              'satisfied_assistance_provided_bad',
            ] satisfies (keyof Meal_ecrec_agMsmeVetPam.T)[]
          ).map((field) => (
            <ChartBarWidget key={field} data={data} field={field} limitChartHeight={456} />
          ))}
        </Card>
        <Card>
          {(['know_people_needing', 'know_people_needing_yes'] satisfies (keyof Meal_ecrec_agMsmeVetPam.T)[]).map(
            (field) => (
              <ChartBarWidget key={field} data={data} field={field} limitChartHeight={456} />
            ),
          )}
        </Card>
      </Div>
      <Div column>
        <Card>
          {(
            [
              'account_organization_assistance',
              'account_organization_assistance_bad',
            ] satisfies (keyof Meal_ecrec_agMsmeVetPam.T)[]
          ).map((field) => (
            <ChartBarWidget key={field} data={data} field={field} limitChartHeight={456} />
          ))}
        </Card>
        <Card>
          {(
            ['feel_informed_assistance', 'feel_informed_assistance_bad'] satisfies (keyof Meal_ecrec_agMsmeVetPam.T)[]
          ).map((field) => (
            <ChartBarWidget key={field} data={data} field={field} limitChartHeight={456} />
          ))}
        </Card>
      </Div>
    </Div>
  </Box>
)

export default AgOutcome
