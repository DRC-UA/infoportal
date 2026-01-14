import type {FC} from 'react'
import {Box, Card} from '@mui/material'

import {Meal_ecrec_agMsmeVetPam} from 'infoportal-common'

import {Div} from '@/shared/PdfLayout/PdfSlide'

import ChartBarWidget from './ChartBarWidget'
import Subtitle from './Subtitle'
import type {PdmSectionProps} from './types'

const ReceivingAndUsage: FC<PdmSectionProps> = ({data, title}) => (
  <Box mt={2}>
    <Subtitle text={title} />
    <Div responsive>
      <Div column>
        {(['did_receive_cash', 'did_receive_cash_no'] satisfies (keyof Meal_ecrec_agMsmeVetPam.T)[]).map((field) => (
          <ChartBarWidget key={field} data={data} field={field} />
        ))}
      </Div>
      <Div column>
        <ChartBarWidget data={data} field={'spend_cash_received'} />
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
            <ChartBarWidget key={field} data={data} field={field} />
          ))}
        </Card>
      </Div>
    </Div>
  </Box>
)

export default ReceivingAndUsage
