import {fnSwitch, Obj, seq, Seq} from '@alexandreannic/ts-utils'
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

/** @deprecated */
export namespace ChartHelperOld {

  export const sortBy = {
    custom: <T extends string>(order: T[]) => <V>(obj: Record<T, V>): Record<T, V> => {
      return new Obj(obj as Record<T, V>).sort(([aK, aV], [bK, bV]) => {
        return order.indexOf(aK) - order.indexOf(bK)
      }).get()
    },
    percent: <T extends string>(obj: Record<T, ChartDataVal>): Record<T, ChartDataVal> => {
      return new Obj(obj as Record<string, ChartDataVal>).sort(([aK, aV], [bK, bV]) => {
        try {
          return bV.value / (bV.base ?? 1) - aV.value / (aV.base ?? 1)
        } catch (e) {
          return 0
        }
      }).get()
    },
    value: <T extends string>(obj: Record<T, ChartDataVal>): Record<T, ChartDataVal> => {
      return new Obj(obj as Record<string, ChartDataVal>).sort(([aK, aV], [bK, bV]) => {
        return bV.value - aV.value
      }).get()
    },
    label: <T extends string>(obj: Record<T, ChartDataVal>): Record<T, ChartDataVal> => {
      return new Obj(obj as Record<string, ChartDataVal>).sort(([aK, aV], [bK, bV]) => {
        return (bV.label as string ?? '').localeCompare(aV.label as string ?? '')
      }).get()
    }
  }
  
  export const sumByCategory = <A extends Record<string, any>, K extends string>({
    data,
    filter,
    sumBase,
    categories,
  }: {
    data: A[]
    filter: (_: A) => number
    sumBase?: (_: A) => number
    categories: Record<K, (_: A) => boolean>
  }): Record<K, ChartDataVal> => {
    const res = Obj.keys(categories).reduce((acc, category) => ({...acc, [category]: {value: 0, base: 0}}), {} as Record<K, {value: number, base: 0}>)
    data.forEach(x => {
      Obj.entries(categories).forEach(([category, isCategory]) => {
        if (!isCategory(x)) return
        const base = sumBase ? sumBase(x) : 1
        if (base) {
          res[category].base += base
          res[category].value += filter(x) ?? 0
        }
      })
    })
    return res
  }

  export const setLabel = <A extends string>(m: Record<A, ReactNode>) => (data: ChartData<A>): ChartData<A> => {
    Obj.keys(data).forEach(k => {
      data[k].label = m[k]
    })
    return data
  }


}
