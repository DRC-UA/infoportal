import {ChartDataVal} from '@/shared/charts/chartHelperOld'
import {Obj, seq, Seq} from '@alexandreannic/ts-utils'
import React, {ReactNode, useMemo} from 'react'
import {KeyOf} from 'infoportal-common'
import {ChartBar} from '@/shared/charts/ChartBar'
import {Checkbox} from '@mui/material'
import {ChartData, ChartHelper} from '@/shared/charts/chartHelper'

export const ChartBarSingleBy = <
  D extends Record<string, any>,
  K extends string,
  O extends Record<K, ReactNode>,
>({
  by,
  data,
  limit,
  finalTransform = _ => _,
  onClickData,
  checked,
  onToggle,
  label,
  filter,
  mergeOptions,
  min,
  debug
}: {
  debug?: boolean
  onClickData?: (_: K) => void
  limit?: number
  finalTransform?: (_: ChartData<K>) => ChartData<K>
  data: Seq<D>,
  mergeOptions?: Partial<Record<KeyOf<O>, KeyOf<O>>>
  label?: O
  min?: number
  by: (_: D) => K | undefined,
  filter?: (_: D) => boolean,
  checked?: Record<K, boolean>
  onToggle?: (_: K) => void
}) => {
  const res = useMemo(() => {
    const source = seq(data).filter(filter ?? (_ => _)).map(d => {
      if (by(d) === undefined) return
      if (mergeOptions) return (mergeOptions as any)[by(d)] ?? by(d)
      return by(d)
    }).compact()
    return ChartHelper.single({data: source})
      .setLabel(label)
      .sortBy.value()
      .filterValue(_ => min ? _.value > min : true)
      .take(limit)
      .map(finalTransform)
      .get() as Record<K, ChartDataVal>
  }, [data, by, label])
  return (
    <ChartBar
      data={res}
      onClickData={_ => onClickData?.(_ as K)}
      labels={!onToggle ? undefined :
        seq(Obj.keys(res)).reduceObject((option => [
            option,
            <Checkbox
              key={option as string}
              size="small"
              checked={checked?.[option] ?? false}
              onChange={() => onToggle(option)}
            />
          ]
        ))
      }
    />
  )
}