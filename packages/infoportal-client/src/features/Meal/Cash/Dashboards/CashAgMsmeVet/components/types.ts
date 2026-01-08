import type {Seq} from '@axanc/ts-utils'

import {Meal_ecrec_agMsmeVetPam} from 'infoportal-common'

import type {EcrecPdmDataType} from '../types'

type PdmDataConsumerProps = {data: Seq<EcrecPdmDataType>}
type PdmSectionProps = PdmDataConsumerProps & {title: string}
type OverviewProps = PdmDataConsumerProps & {
  pdmType?: string[]
}
type ChartWidgetProps = PdmDataConsumerProps & {
  field: keyof Meal_ecrec_agMsmeVetPam.T
  limitChartHeight?: number
}

export type {PdmDataConsumerProps, PdmSectionProps, OverviewProps, ChartWidgetProps}
