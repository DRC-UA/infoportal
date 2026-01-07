import type {FC} from 'react'

import {Meal_ecrec_agMsmeVetPam} from 'infoportal-common'

import {Div} from '@/shared/PdfLayout/PdfSlide'

import {useTranslations} from '../hooks'

import ChartWidget from './ChartWidget'
import Subtitle from './Subtitle'
import type {SufficiencyAgProps} from './types'

const SufficiencyAg: FC<SufficiencyAgProps> = ({data}) => {
  const {translateField} = useTranslations()

  return (
    <>
      <Subtitle text={translateField ? translateField('sufficiency') : 'Loading data'} />
      <Div responsive>
        <Div column>
          {(
            [
              'cash_modality_inkind',
              'training_inductions_agricultural',
              'training_inductions_agricultural_yes',
            ] satisfies (keyof Meal_ecrec_agMsmeVetPam.T)[]
          ).map((field) => (
            <ChartWidget key={field} data={data} field={field} />
          ))}
        </Div>
        <Div column>
          {(
            [
              'received_enough_agricultural_needs_long',
              'received_enough_agricultural_needs_long_other',
              'hectares_use_assistance',
              'cash_agricultural_inputs',
              'agricultural_inputs_purchased',
              'agricultural_inputs_purchased_other',
              'no_purchase_agricultural_inputs',
              'no_purchase_agricultural_inputs_other',
              'planning_use_money',
            ] satisfies (keyof Meal_ecrec_agMsmeVetPam.T)[]
          ).map((field) => (
            <ChartWidget key={field} data={data} field={field} />
          ))}
        </Div>
        <Div column>
          {(
            [
              'improve_planning_management',
              'improve_planning_management_001',
              'improve_planning_agricultural',
              'improve_planning_agricultural_001',
            ] satisfies (keyof Meal_ecrec_agMsmeVetPam.T)[]
          ).map((field) => (
            <ChartWidget key={field} data={data} field={field} />
          ))}
        </Div>
      </Div>
    </>
  )
}

export default SufficiencyAg
