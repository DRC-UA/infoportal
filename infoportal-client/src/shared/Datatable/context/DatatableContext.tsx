import React, {ReactNode, useContext, useEffect, useMemo, useState} from 'react'
import {UseSetState} from '@alexandreannic/react-hooks-lib'
import {UseDatatableData, useDatatableData} from '@/shared/Datatable/context/useDatatableData'
import {DatatableModal, useDatatableModal} from '@/shared/Datatable/context/useDatatableModal'
import {useSetStateIp} from '@/shared/hook/useSetState'
import {seq} from '@alexandreannic/ts-utils'
import {DatatableColumn, DatatableRow, DatatableTableProps} from '@/shared/Datatable/util/datatableType'
import {UseDatatableOptions, useDatatableOptions} from '@/shared/Datatable/context/useDatatableOptions'

export interface DatatableContext<T extends DatatableRow> {
  data: UseDatatableData<T>
  columnsIndex: Record<string, DatatableColumn.InnerProps<T>>
  select: DatatableTableProps<T>['select']
  columns: DatatableColumn.InnerProps<T>[]
  getRenderRowKey: DatatableTableProps<T>['getRenderRowKey']
  selected: UseSetState<string>
  modal: DatatableModal<T>
  options: UseDatatableOptions<T>
}

const DatatableContext = React.createContext({} as DatatableContext<any>)

export const useDatatableContext = <T extends DatatableRow>() => useContext<DatatableContext<T>>(DatatableContext)

export const DatatableProvider = <T extends DatatableRow>({
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
  columns: DatatableColumn.InnerProps<T>[]
  data: DatatableTableProps<T>['data']
  getRenderRowKey: DatatableTableProps<T>['getRenderRowKey']
  select: DatatableTableProps<T>['select']
  onFiltersChange: DatatableTableProps<T>['onFiltersChange']
  onDataChange: DatatableTableProps<T>['onDataChange']
  defaultFilters: DatatableTableProps<T>['defaultFilters']
  // sortBy?: KeyOf<T>
  // orderBy?: OrderBy

  children: ReactNode
}) => {
  const selected = useSetStateIp<string>()
  const columnsIndex = useMemo(() => seq(columns).reduceObject<Record<string, DatatableColumn.InnerProps<T>>>(_ => [_.id, _]), [columns])
  const data = useDatatableData<T>({
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

  const options = useDatatableOptions<T>({
    data,
    columns: columns,
    columnsIndex,
  })

  const modal = useDatatableModal<T>({data})

  const typeSafeContext: DatatableContext<T> = {
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
    <DatatableContext.Provider value={typeSafeContext}>
      {children}
    </DatatableContext.Provider>
  )
}
