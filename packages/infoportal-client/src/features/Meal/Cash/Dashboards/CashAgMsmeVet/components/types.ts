import type {Seq} from '@axanc/ts-utils'

import {Meal_ecrec_agMsmeVetPam} from 'infoportal-common'

import type {EcrecPdmDataType} from '../types'

type CashIndividualsProps = {data: Seq<EcrecPdmDataType>}
type OverviewProps = {
  data: Seq<EcrecPdmDataType>
  pdmType?: string[]
}
type SufficiencyAgProps = {data: Seq<EcrecPdmDataType>}
type ChartWidgetProps = {
  data: Seq<EcrecPdmDataType>
  field: keyof Meal_ecrec_agMsmeVetPam.T
}

export type {CashIndividualsProps, OverviewProps, SufficiencyAgProps, ChartWidgetProps}
