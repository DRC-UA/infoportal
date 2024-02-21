import {useCallback, useMemo, useState} from 'react'
import {ApiPaginateHelper, KeyOf, multipleFilters, safeNumber} from '@infoportal-common'
import {Enum, fnSwitch, map} from '@alexandreannic/ts-utils'
import {
  SheetFilterValue,
  SheetFilterValueDate,
  SheetFilterValueNumber,
  SheetFilterValueSelect,
  SheetFilterValueString,
  SheetInnerColumnProps,
  SheetRow,
  SheetSearch,
  SheetTableProps
} from '@/shared/Sheet/util/sheetType'
import {OrderBy} from '@alexandreannic/react-hooks-lib'

export type UseSheetData<T extends SheetRow> = ReturnType<typeof useSheetData<T>>

export const useSheetData = <T extends SheetRow>({
  id,
  data,
  columnsIndex,
  defaultLimit = 20,
  defaultFilters,
}: {
  id: string
  defaultLimit?: number
  defaultFilters?: SheetTableProps<T>['defaultFilters']
  data?: T[]
  columnsIndex: Record<KeyOf<T>, SheetInnerColumnProps<T>>
}) => {
  const [filters, setFilters] = useState<Record<KeyOf<T>, SheetFilterValue>>(defaultFilters ?? {} as any)
  const [search, setSearch] = useState<SheetSearch<any>>({
    limit: defaultLimit,
    offset: 0,
  })
  // const [search, setSearch] = usePersistentState<SheetSearch<any>>({
  //   limit: defaultLimit,
  //   offset: 0,
  // }, {
  //   storageKey: `datatable-paginate-${id}`,
  // })

  const resetSearch = () => setSearch({limit: defaultLimit, offset: 0,})

  const onOrderBy = useCallback((columnId: string, orderBy?: OrderBy) => {
    setSearch(prev => ({...prev, orderBy, sortBy: columnId}))
  }, [])

  const filteredData = useMemo(() => {
    return filterBy({data, filters, columnsIndex})
  }, [data, filters])

  const filterExceptBy = useCallback((key: KeyOf<T>) => {
    const filtersCopy = {...filters}
    delete filtersCopy[key]
    return filterBy({data, filters: filtersCopy, columnsIndex})
  }, [data, filters])

  const filteredAndSortedData = useMemo(() => {
    return map(filteredData, search.sortBy, (d, sortBy) => {
      const col = columnsIndex[sortBy]
      if (!col.type) return
      const sorted = d.sort(fnSwitch(col.type, {
        number: () => (a: T, b: T) => {
          const av = safeNumber(col.renderValue(a) as number, Number.MIN_SAFE_INTEGER)
          const bv = safeNumber(col.renderValue(b) as number, Number.MIN_SAFE_INTEGER)
          return (av - bv) * (search.orderBy === 'asc' ? -1 : 1)
        },
        date: () => (a: T, b: T) => {
          try {
            const av = (col.renderValue(a) as Date).getTime() ?? 0
            const bv = (col.renderValue(b) as Date).getTime() ?? 0
            return (av - bv) * (search.orderBy === 'asc' ? -1 : 1)
          } catch (e) {
            console.warn('Invalid date', col.renderValue(a))
            return -1
          }
        },
      }, () => (a: T, b: T) => {
        const av = ('' + col.renderValue(a)) ?? ''
        const bv = ('' + col.renderValue(b)) ?? ''
        return av.localeCompare(bv) * (search.orderBy === 'asc' ? -1 : 1)
      }))
      return [...sorted]
    }) ?? filteredData
  }, [filteredData, search.sortBy, search.orderBy])

  const filteredSortedAndPaginatedData = useMemo(() => {
    if (!filteredAndSortedData) return
    return ApiPaginateHelper.make(search.limit, search.offset)<T>(filteredAndSortedData)
  }, [search.limit, search.offset, filteredAndSortedData])

  return {
    filters,
    filterExceptBy,
    setFilters,
    search,
    setSearch,
    resetSearch,
    data,
    onOrderBy,
    filteredData,
    filteredAndSortedData,
    filteredSortedAndPaginatedData,
  }
}

const filterBy = <T extends SheetRow>({
  data,
  filters,
  columnsIndex,
}: {
  data?: T[],
  filters: Record<KeyOf<T>, SheetFilterValue>
  columnsIndex: Record<KeyOf<T>, SheetInnerColumnProps<T>>
}) => {
  if (!data) return
  return multipleFilters(data, Enum.keys(filters).map((k, i) => {
    const filter = filters[k]
    if (filter === undefined) return
    const col = columnsIndex[k]
    switch (col.type) {
      case 'date': {
        return row => {
          const typedFilter = filter as SheetFilterValueDate
          const v = col.renderValue(row) as Date | undefined
          if (v === undefined) return false
          if (!((v as any) instanceof Date)) {
            console.warn(`Value of ${String(k)} is`, v, `but Date expected.`)
            throw new Error(`Value of ${String(k)} is ${v} but Date expected.`)
          }
          const [min, max] = typedFilter
          return (!min || v.getTime() >= min.getTime()) && (!max || v.getTime() <= max.getTime())
        }
      }
      case 'select_one': {
        return row => {
          const typedFilter = filter as SheetFilterValueSelect
          const v = col.renderValue(row) as string
          if (v === undefined) return false
          return (typedFilter).includes(v)
        }
      }
      case 'select_multiple': {
        return row => {
          const typedFilter = filter as SheetFilterValueSelect
          const v = col.renderValue(row) as string[]
          const vArray = Array.isArray(v) ? v : [v]
          return !!vArray.find(_ => (typedFilter).includes(_))
        }
      }
      case 'number': {
        return row => {
          const typedFilter = filter as SheetFilterValueNumber
          const v = col.renderValue(row) as number | undefined
          const min = typedFilter[0] as number | undefined
          const max = typedFilter[1] as number | undefined
          return v !== undefined && (max === undefined || v <= max) && (min === undefined || v >= min)
        }
      }
      default: {
        if (!col.type) return
        return row => {
          const typedFilter = filter as SheetFilterValueString
          const v = col.renderValue(row)
          if (v === undefined && typedFilter?.filterBlank !== false) return false
          if (typedFilter?.value === undefined) return true
          if (typeof v !== 'string' && typeof v !== 'number') {
            console.warn('Value of ${String(k)} is', v)
            throw new Error(`Value of ${String(k)} is ${v} but expected string.`)
          }
          return ('' + v).toLowerCase().includes(typedFilter.value.toLowerCase())
        }
      }
    }
  }))
}