import type {FC} from 'react'
import {Box, Card} from '@mui/material'

import {useI18n} from '@/core/i18n'
import {Div} from '@/shared/PdfLayout/PdfSlide'

import {useTranslations} from '../hooks'

import ChartWidget from './ChartWidget'
import Subtitle from './Subtitle'
import type {PdmDataConsumerProps} from './types'
import {Meal_ecrec_agMsmeVetPam} from 'infoportal-common'

const RegistrationAndDelivery: FC<PdmDataConsumerProps> = ({data}) => {
  const {m} = useI18n()
  const {translateField} = useTranslations()

  return (
    <Box mt={2}>
      <Subtitle
        text={translateField ? translateField('delivery_process') : m.mealMonitoringPdm.loadingDataSubtitlePlaceholder}
      />
      <Div responsive>
        <Div column>
          <Card>
            {(['assistance_delivered', 'assistance_delivered_other'] satisfies (keyof Meal_ecrec_agMsmeVetPam.T)[]).map(
              (field) => (
                <ChartWidget key={field} data={data} field={field} />
              ),
            )}
          </Card>
          <Card>
            {(['satisfied_process', 'satisfied_process_no'] satisfies (keyof Meal_ecrec_agMsmeVetPam.T)[]).map(
              (field) => (
                <ChartWidget key={field} data={data} field={field} />
              ),
            )}
          </Card>
        </Div>
        <Div column>
          <Card>
            {(['satisfied_cash_amount', 'satisfied_cash_amount_no'] satisfies (keyof Meal_ecrec_agMsmeVetPam.T)[]).map(
              (field) => (
                <ChartWidget key={field} data={data} field={field} />
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
              <ChartWidget key={field} data={data} field={field} />
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
              <ChartWidget key={field} data={data} field={field} />
            ))}
          </Card>
        </Div>
      </Div>
    </Box>
  )
}

export default RegistrationAndDelivery
