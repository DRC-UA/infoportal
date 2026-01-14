import {Obj, seq, Seq} from '@axanc/ts-utils'
import React, {ReactNode, useMemo} from 'react'
import {BarChartData, ChartBar} from '@/shared/charts/ChartBar'
import {Checkbox} from '@mui/material'
import {ChartHelper} from '@/shared/charts/chartHelper'
import {KeyOf} from 'infoportal-common'

export interface ChartBarMultipleByProps<
  D extends Record<string, any>,
  R extends string | undefined,
  O extends Record<NonNullable<R>, string>,
> {
  onClickData?: (_: R) => void
  limit?: number
  // sortBy?: typeof ChartHelper2.sortBy.value
  data: Seq<D>
  mergeOptions?: Partial<Record<KeyOf<O>, KeyOf<O>>>
  label?: O
  filterValue?: KeyOf<O>[]
  by: (_: D) => R[] | undefined
  checked?: Record<NonNullable<R>, boolean>
  onToggle?: (_: R) => void
  base?: 'percentOfTotalAnswers' | 'percentOfTotalChoices'
  forceShowEmptyLabels?: boolean
  includeNullish?: boolean
  limitChartHeight?: number
}

export const ChartBarMultipleBy = <
  D extends Record<string, any>,
  K extends string | undefined,
  O extends Record<NonNullable<K>, string>,
>({
  by,
  data,
  limit,
  onClickData,
  // sortBy,
  checked,
  onToggle,
  label,
  filterValue,
  base,
  mergeOptions,
  forceShowEmptyLabels,
  includeNullish,
  limitChartHeight,
}: ChartBarMultipleByProps<D, K, O>) => {
  const res = useMemo(() => {
    const sourceRaw = data.map((d) => {
      const val = by(d)
      if (val === undefined) return undefined
      const values = mergeOptions
        ? seq(val)
            .map((v) => (mergeOptions as any)[v] ?? v)
            .distinct((_) => _)
            .get()
        : val
      return values
    })

    const source = includeNullish ? sourceRaw : sourceRaw.compact()

    return ChartHelper.multiple({
      data: source,
      filterValue,
      base,
    })
      .setLabel({
        ...label,
        undefined: 'Not specified',
      })
      .take(limit)
      .get()
  }, [data, by, label, includeNullish])

  const finalData = useMemo(() => {
    if (!forceShowEmptyLabels || !label) return res

    return seq(Obj.keys(label)).reduceObject((key) => [
      key as unknown as NonNullable<K>,
      res[key as unknown as NonNullable<K>] ?? {
        value: 0,
        label: label[key as unknown as NonNullable<K>],
        percent: 0,
      },
    ]) as Record<NonNullable<K>, BarChartData>
  }, [res, forceShowEmptyLabels, label])

  return (
    <ChartBar
      data={finalData}
      onClickData={(_) => onClickData?.(_ as K)}
      limitChartHeight={limitChartHeight}
      labels={
        !onToggle
          ? undefined
          : seq(Obj.keys(res)).reduceObject<Record<string, ReactNode>>((option) => [
              option,
              <Checkbox
                key={option as string}
                size="small"
                checked={(checked as any)?.[option] ?? false}
                onChange={() => onToggle(option)}
              />,
            ])
      }
    />
  )
}
