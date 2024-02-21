import {v4} from 'uuid'
import {addMonths, differenceInMonths, format, isAfter, isBefore, startOfMonth} from 'date-fns'
import * as _yup from 'yup'
import {Obj} from '@alexandreannic/ts-utils'

export const getObj = <K extends string, V extends any>(o: Record<K, V>, key: string): V | undefined => {
  // @ts-ignore
  return o[key]
}

export const yup = _yup

export const genUUID = v4

export const toYYYYMMDD = (_: Date) => format(_, 'yyyy-MM-dd')//_.toString().substring(0, 10)

export type MappedColumn<T, O = string> = {
  [P in keyof T]: T[P] extends undefined | Date | string | number | boolean | any[] ? O : MappedColumn<T[P], O>
}

export const renameObjectProperties = <O>(propsMap: Partial<MappedColumn<O>>) => (input: any): O => {
  return Obj.keys(propsMap).reduce((acc, key) => {
    if (typeof propsMap[key] === 'object') {
      return {
        ...acc,
        [key]: renameObjectProperties(propsMap[key]!)(input)
      }
    }
    return {
      ...acc,
      [key]: input[propsMap[key]]
    }
  }, {} as O)
}

export const mapMultipleChoices = <T>(value: string | undefined, map: {[key: string]: T}, defaultValue: T[] = []): T[] => {
  const res: T[] = []
  if (!value) {
    return defaultValue
  }
  Object.keys(map).forEach(k => {
    if (value?.includes(k)) res.push(map[k])
  })
  return res
}

export const msToString = (duration: number) => format(duration, 'dd hh:mm:ss')

export namespace Util {

  export const promiseSequentially = async <T>(promises: (() => Promise<T>)[]): Promise<T[]> => {
    const results: T[] = []
    for (const promise of promises) {
      const result = await promise()
      results.push(result)
    }
    return results
  }

  export const logThen = (log: string) => <T>(args: T): T => {
    console.log(log, args)
    return args
  }

  export const removeUndefined = <T extends object>(t: T): T => {
    for (const i in t) {
      if (t[i] === undefined || t[i] === null) {
        delete t[i]
      }
    }
    return t
  }
}

export const getOverlapMonths = (startDate1: Date, endDate1: Date, startDate2: Date, endDate2: Date) => {
  const start1 = startOfMonth(startDate1)
  const end1 = startOfMonth(endDate1)
  const start2 = startOfMonth(startDate2)
  const end2 = startOfMonth(endDate2)

  const overlapStart = isBefore(start1, start2) ? start2 : start1
  const overlapEnd = isAfter(end1, end2) ? end2 : end1

  const overlapMonths = differenceInMonths(addMonths(overlapEnd, 1), overlapStart)

  return overlapMonths > 0 ? overlapMonths : 0
}
