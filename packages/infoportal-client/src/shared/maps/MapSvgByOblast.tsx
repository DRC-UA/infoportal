import {MapSvg} from '@/shared/maps/MapSvg'
import React, {useMemo} from 'react'
import {Seq} from '@alexandreannic/ts-utils'
import {BoxProps} from '@mui/material'
import {OblastISO} from 'infoportal-common'
import {ChartHelper} from '@/shared/charts/chartHelper'

export const MapSvgByOblast = <D extends Record<string, any>>({
  data,
  getOblast,
  total,
  value = () => true,
  base = () => true,
  fillBaseOn = 'percent',
  ...props
}: {
  fillBaseOn?: 'percent' | 'value'
  value?: (_: D) => boolean
  base?: (_: D) => boolean
  total?: number
  getOblast: (_: D) => OblastISO
  data: Seq<D>
  legend?: boolean
} & Pick<BoxProps, 'sx'>) => {
  const res = useMemo(() => {
    return ChartHelper.groupBy({
      data: data,
      groupBy: _ => getOblast(_),
      filter: value,
      filterBase: base,
    })
  }, [data, value, getOblast])
  return (
    <MapSvg data={res} fillBaseOn={fillBaseOn} base={total} {...props}/>
  )
}