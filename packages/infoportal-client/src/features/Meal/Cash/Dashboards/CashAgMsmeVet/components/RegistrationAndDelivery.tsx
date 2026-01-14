import type {FC} from 'react'
import {Box, Card} from '@mui/material'

import {Meal_ecrec_agMsmeVetPam} from 'infoportal-common'

import {Div} from '@/shared/PdfLayout/PdfSlide'

import ChartBarWidget from './ChartBarWidget'
import Subtitle from './Subtitle'
import type {PdmSectionProps} from './types'

const RegistrationAndDelivery: FC<PdmSectionProps> = ({data, title}) => (
  <Box mt={2}>
    <Subtitle text={title} />
    <Div responsive>
      <Div column>
        <Card>
          {(['assistance_delivered', 'assistance_delivered_other'] satisfies (keyof Meal_ecrec_agMsmeVetPam.T)[]).map(
            (field) => (
              <ChartBarWidget key={field} data={data} field={field} />
            ),
          )}
        </Card>
        <Card>
          {(['satisfied_process', 'satisfied_process_no'] satisfies (keyof Meal_ecrec_agMsmeVetPam.T)[]).map(
            (field) => (
              <ChartBarWidget key={field} data={data} field={field} />
            ),
          )}
        </Card>
      </Div>
      <Div column>
        <Card>
          {(['satisfied_cash_amount', 'satisfied_cash_amount_no'] satisfies (keyof Meal_ecrec_agMsmeVetPam.T)[]).map(
            (field) => (
              <ChartBarWidget key={field} data={data} field={field} />
            ),
          )}
        </Card>
        <Card>
          {(
            [
              'amount_cash_received_correspond',
              'amount_cash_received_correspond_yes',
            ] satisfies (keyof Meal_ecrec_agMsmeVetPam.T)[]
          ).map((field) => (
            <ChartBarWidget key={field} data={data} field={field} />
          ))}
        </Card>
      </Div>
      <Div column>
        <Card>
          {(
            [
              'time_registered_assistance',
              'experience_problems',
              'experience_problems_yes',
              'experience_problems_yes_other',
              'organization_provide_information',
              'organization_provide_information_no',
              'better_inform_distribution',
              'better_inform_distribution_other',
            ] satisfies (keyof Meal_ecrec_agMsmeVetPam.T)[]
          ).map((field) => (
            <ChartBarWidget key={field} data={data} field={field} />
          ))}
        </Card>
      </Div>
    </Div>
  </Box>
)

export default RegistrationAndDelivery
