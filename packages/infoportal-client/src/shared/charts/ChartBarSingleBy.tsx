import {useMemo, type ReactNode} from 'react'
import {Obj, seq, Seq} from '@axanc/ts-utils'
import {Checkbox} from '@mui/material'

import {KeyOf} from 'infoportal-common'

import {ChartData, ChartDataVal, ChartHelper} from '@/shared/charts/chartHelper'
import {ChartBar} from '@/shared/charts/ChartBar'

export const ChartBarSingleBy = <D extends Record<string, any>, K extends string, O extends Record<K, ReactNode>>({
  by,
  data,
  limit,
  finalTransform = (_) => _,
  onClickData,
  checked,
  onToggle,
  label,
  filter,
  mergeOptions,
  min,
  includeNullish = false,
}: {
  debug?: boolean
  onClickData?: (_: K) => void
  limit?: number
  finalTransform?: (_: ChartData<KeyOf<O>>) => ChartData<any>
  data: Seq<D>
  mergeOptions?: Partial<Record<KeyOf<O>, KeyOf<O>>>
  label?: O
  min?: number
  by: (_: D) => K | undefined
  filter?: (_: D) => boolean
  checked?: Record<K, boolean>
  onToggle?: (_: K) => void
  includeNullish?: boolean
}) => {
  const res = useMemo(() => {
    const source = seq(data)
      .filter(filter ?? ((_) => _))
      .map((d) => {
        if (by(d) === undefined) return
        if (mergeOptions) return (mergeOptions as any)[by(d)] ?? by(d)
        return by(d)
      })

    return ChartHelper.single({data: includeNullish ? source : source.compact()})
      .setLabel(label)
      .sortBy.value()
      .filterValue((_) => (min ? _.value > min : true))
      .take(limit)
      .map(finalTransform)
      .get() as Record<K, ChartDataVal>
  }, [data, by, label])

  return (
    <ChartBar
      data={res}
      onClickData={(_) => onClickData?.(_ as K)}
      labels={
        !onToggle
          ? undefined
          : seq(Obj.keys(res)).reduceObject((option) => [
              option,
              <Checkbox
                key={option as string}
                size="small"
                checked={checked?.[option] ?? false}
                onChange={() => onToggle(option)}
              />,
            ])
      }
    />
  )
}
