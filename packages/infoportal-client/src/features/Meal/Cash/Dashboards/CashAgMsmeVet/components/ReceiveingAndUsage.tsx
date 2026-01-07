import type {FC} from 'react'
import {Box, Card} from '@mui/material'

import {useI18n} from '@/core/i18n'
import {Div} from '@/shared/PdfLayout/PdfSlide'

import {useTranslations} from '../hooks'

import ChartWidget from './ChartWidget'
import Subtitle from './Subtitle'
import type {PdmDataConsumerProps} from './types'
import {Meal_ecrec_agMsmeVetPam} from 'infoportal-common'

const ReceivingAndUsage: FC<PdmDataConsumerProps> = ({data}) => {
  const {m} = useI18n()
  const {translateField} = useTranslations()

  return (
    <Box mt={2}>
      <Subtitle
        text={
          translateField ? translateField('use_mpca_assistance') : m.mealMonitoringPdm.loadingDataSubtitlePlaceholder
        }
      />
      <Div responsive>
        <Div column>
          {(['did_receive_cash', 'did_receive_cash_no'] satisfies (keyof Meal_ecrec_agMsmeVetPam.T)[]).map((field) => (
            <ChartWidget key={field} data={data} field={field} />
          ))}
        </Div>
        <Div column>
          <ChartWidget data={data} field={'spend_cash_received'} />
        </Div>
        <Div column>
          <Card>
            {(
              [
                'spent_cash_assistance_received',
                'spent_cash_assistance_received_no',
                'spent_cash_assistance_received_no_mait_reason',
                'spent_cash_assistance_received_dk',
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

export default ReceivingAndUsage
