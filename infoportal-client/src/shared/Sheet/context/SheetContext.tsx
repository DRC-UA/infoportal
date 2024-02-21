import React, {ReactNode, useContext, useEffect, useMemo} from 'react'
import {UseSetState} from '@alexandreannic/react-hooks-lib'
import {UseSheetData, useSheetData} from '@/shared/Sheet/context/useSheetData'
import {SheetModal, useSheetModal} from '@/shared/Sheet/context/useSheetModal'
import {useSetStateIp} from '@/shared/hook/useSetState'
import {seq} from '@alexandreannic/ts-utils'
import {SheetInnerColumnProps, SheetRow, SheetTableProps} from '@/shared/Sheet/util/sheetType'
import {UseSheetOptions, useSheetOptions} from '@/shared/Sheet/context/useSheetOptions'

export interface SheetContext<T extends SheetRow> {
  data: UseSheetData<T>
  columnsIndex: Record<string, SheetInnerColumnProps<T>>
  select: SheetTableProps<T>['select']
  columns: SheetInnerColumnProps<T>[]
  getRenderRowKey: SheetTableProps<T>['getRenderRowKey']
  selected: UseSetState<string>
  modal: SheetModal<T>
  options: UseSheetOptions<T>
}

const SheetContext = React.createContext({} as SheetContext<any>)

export const useSheetContext = <T extends SheetRow>() => useContext<SheetContext<T>>(SheetContext)

export const SheetProvider = <T extends SheetRow>({
  children,
  defaultLimit,
  columns,
  select,
  // sortBy,
  // orderBy,
  onDataChange,
  onFiltersChange,
  getRenderRowKey,
  defaultFilters,
  data: _data,
  id,
}: {
  id: string
  defaultLimit?: number
  columns: SheetInnerColumnProps<T>[]
  data: SheetTableProps<T>['data']
  getRenderRowKey: SheetTableProps<T>['getRenderRowKey']
  select: SheetTableProps<T>['select']
  onFiltersChange: SheetTableProps<T>['onFiltersChange']
  onDataChange: SheetTableProps<T>['onDataChange']
  defaultFilters: SheetTableProps<T>['defaultFilters']
  // sortBy?: KeyOf<T>
  // orderBy?: OrderBy

  children: ReactNode
}) => {
  const selected = useSetStateIp<string>()
  const columnsIndex = useMemo(() => seq(columns).reduceObject<Record<string, SheetInnerColumnProps<T>>>(_ => [_.id, _]), [columns])
  const data = useSheetData<T>({
    id,
    columnsIndex,
    data: _data,
    defaultLimit,
    defaultFilters,
  })

  useEffect(() => {
    onFiltersChange?.(data.filters)
    onDataChange?.({
      data: data.data,
      filteredData: data.filteredData,
      filteredAndSortedData: data.filteredAndSortedData,
      filteredSortedAndPaginatedData: data.filteredSortedAndPaginatedData,
    })
  }, [data.filters])

  const options = useSheetOptions<T>({
    data,
    columns: columns,
    columnsIndex,
  })

  const modal = useSheetModal<T>({data})

  const typeSafeContext: SheetContext<T> = {
    columnsIndex,
    selected,
    data,
    modal,
    columns,
    select,
    options,
    getRenderRowKey,
  }

  return (
    <SheetContext.Provider value={typeSafeContext}>
      {children}
    </SheetContext.Provider>
  )
}
