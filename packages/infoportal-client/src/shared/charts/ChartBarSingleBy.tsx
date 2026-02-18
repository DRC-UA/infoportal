import {useMemo, type ReactNode} from 'react'
import {Obj, seq, Seq} from '@axanc/ts-utils'
import {Checkbox} from '@mui/material'

import {KeyOf} from 'infoportal-common'

import {useI18n} from '@/core/i18n'
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
  forceShowEmptyLabels = false,
  limitChartHeight,
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
  forceShowEmptyLabels?: boolean
  limitChartHeight?: number
}) => {
  const {m} = useI18n()
  const res = useMemo(() => {
    const source = seq(data)
      .filter(filter ?? ((_) => _))
      .map((d) => {
        if (by(d) === undefined) return
        if (mergeOptions) return (mergeOptions as any)[by(d)] ?? by(d)
        return by(d)
      })

    return ChartHelper.single({data: includeNullish ? source : source.compact()})
      .setLabel({
        ...label,
        undefined: m.notSpecified,
      })
      .sortBy.value()
      .filterValue((_) => (min ? _.value > min : true))
      .take(limit)
      .map(finalTransform)
      .get() as Record<K, ChartDataVal>
  }, [data, by, label])

  const finalData = useMemo(() => {
    if (!forceShowEmptyLabels || !label) return res
    return seq(Obj.keys(label)).reduceObject((key) => [
      key as unknown as K,
      res[key as unknown as K] ?? {value: 0, label: label[key as unknown as K], percent: 0},
    ])
  }, [res, forceShowEmptyLabels, label])

  return (
    <ChartBar
      data={finalData}
      onClickData={(_) => onClickData?.(_ as K)}
      limitChartHeight={limitChartHeight}
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
