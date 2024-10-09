import {ReactNode} from 'react'
import {NonNullableKey} from 'infoportal-common'

export interface ChartDataValPercent extends NonNullableKey<ChartDataVal, 'base'> {
  percent: number
}

export interface ChartDataVal {
  value: number
  base?: number
  label?: ReactNode
  desc?: string
}

export const makeChartData: {
  (_: ChartDataValPercent): ChartDataValPercent
  (_: ChartDataVal): ChartDataVal
} = (_) => {
  return _ as any
}

export type ChartData<K extends string = string> = Record<K, ChartDataVal>