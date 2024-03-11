import {format} from 'date-fns'
import {Enum, map} from '@alexandreannic/ts-utils'
import React, {useMemo} from 'react'
import {ChartLine, ChartLineProps} from '@/shared/charts/ChartLine'

export type DateKeys<T> = {
  [K in keyof T]: T[K] extends (Date | undefined) ? K : never;
}[keyof T]

export const ChartLineByDate = <T, K extends DateKeys<T>>({
  data,
  curves,
  label,
  height,
  start,
  end = new Date(),
  // translations,
  ...props
}: {
  height?: number
  curves: Record<string, (_: T) => Date | undefined>
  label?: string | string[]
  data: T[]
  start?: Date
  end?: Date
  // @ts-ignore
  // translations?: Partial<Record<T[K], string>>
} & Pick<ChartLineProps, 'colors' | 'sx'>) => {
  const curve = useMemo(() => {
    // const questions = ([question].flat() as K[])
    // const _end = format(end, 'yyyy-MM')
    const res: Record<string, Record<string, number>> = {}
    data.forEach(d => {
      Enum.entries(curves).map(([q, fn]) => {
        const date = map(fn(d), d => typeof d === 'string' ? new Date(d) : d) as Date | undefined
        try {
          if (!date) return
          const yyyyMM = format(date, 'yyyy-MM')
          if (date.getTime() > end.getTime() || (start && date.getTime() < start.getTime())) return
          if (!res[yyyyMM]) res[yyyyMM] = {} as any
          if (!res[yyyyMM][q]) res[yyyyMM][q] = 0
          res[yyyyMM][q] += 1
        } catch (e) {
          console.error('Invalid date', date, e)
        }
      }).filter(_ => _ !== undefined)
    })
    return Enum.entries(res)
      .map(([date, v]) => {
        Enum.keys(curves).forEach(q => {
          if (!v[q]) v[q] = 0
        })
        return [date, v] as [string, Record<K, number>]
      })
      .map(([date, v]) => ({name: date, ...v}))
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [data, curves, end])

  return (
    <>
      <ChartLine
        {...props}
        hideLabelToggle={true}
        height={height ?? 220}
        data={curve}
        // translation={translations as any}
      />
      {/*<Txt color="hint" size="small" sx={{display: 'flex', justifyContent: 'space-between'}}>*/}
      {/*{map(curve.head, start => <Box>{start.label}</Box>)}*/}
      {/*{map(_.last, end => <Box>{format(new Date(end.label), 'LLL yyyy')}</Box>)}*/}
      {/*</Txt>*/}
    </>
  )
}