import {SheetFilterValue} from '@/shared/Sheet/util/sheetType'
import {SheetFilterModal} from '@/shared/Sheet/popover/SheetFilterModal'
import React from 'react'
import {map} from '@alexandreannic/ts-utils'
import {useSheetContext} from '@/shared/Sheet/context/SheetContext'
import {DatesPopover, MultipleChoicesPopover, NumberChoicesPopover} from '@/shared/Sheet/popover/SheetPopover'

export const SheetModal = () => {
  const ctx = useSheetContext()
  return (
    <>
      {map(ctx.modal.filterPopover.get, popover => {
        const id = popover.columnId
        const column = ctx.columnsIndex[id]
        if (!column.type) return
        return (
          <SheetFilterModal
            data={ctx.data.filterExceptBy(id) ?? []}
            title={column.head}
            anchorEl={popover.event.target}
            columnId={id}
            renderValue={column.renderValue}
            options={ctx.options(id)}
            type={column.type}
            orderBy={ctx.data.search.orderBy}
            sortBy={ctx.data.search.sortBy}
            onOrderByChange={_ => ctx.data.onOrderBy(id, _)}
            value={ctx.data.filters[id] as any}
            filterActive={!!ctx.data.filters[id]}
            onClose={ctx.modal.filterPopover.close}
            onClear={() => ctx.data.setFilters(prev => {
              if (prev) {
                delete prev[id]
              }
              // setFilteringProperty(undefined)
              return {...prev}
            })}
            onChange={(p: string, v: SheetFilterValue) => {
              ctx.data.setFilters(_ => ({..._, [p]: v}))
              ctx.data.setSearch(prev => ({...prev, offset: 0}))
              ctx.modal.filterPopover.close()
            }}
          />
        )
      })}

      {map(ctx.modal.statsPopover.get, popover => {
        const id = popover.columnId
        const column = ctx.columnsIndex[id]
        switch (column.type) {
          case 'number':
            return <NumberChoicesPopover
              anchorEl={popover.event.target}
              question={id}
              mapValues={column.renderValue}
              data={ctx.data.filteredData ?? []}
              onClose={ctx.modal.statsPopover.close}
            />
          case 'date': {
            return (
              <DatesPopover
                anchorEl={popover.event.target}
                title={column.head ?? id}
                getValue={column.renderValue}
                data={ctx.data.filteredData ?? []}
                onClose={ctx.modal.statsPopover.close}
              />
            )
          }
          case 'select_multiple':
          case 'select_one': {
            return <MultipleChoicesPopover
              translations={ctx.options(id)}
              anchorEl={popover.event.target}
              multiple={column.type === 'select_multiple'}
              getValue={column.renderValue as any}
              title={column.head}
              data={ctx.data.filteredData ?? []}
              onClose={ctx.modal.statsPopover.close}
            />
          }
        }
      })}
    </>
  )
}