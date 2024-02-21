import {fnSwitch, map} from '@alexandreannic/ts-utils'
import {Box, Checkbox} from '@mui/material'
import React from 'react'
import {TableIcon, TableIconBtn} from '@/features/Mpca/MpcaData/TableIcon'
import {SheetContext} from '@/shared/Sheet/context/SheetContext'
import {SheetColumnProps, SheetRow} from '@/shared/Sheet/util/sheetType'

export const SheetHead = (() => {
  const Component = <T extends SheetRow>({
    onOpenStats,
    data,
    selected,
    select,
    columns,
    filters,
    search,
    onOpenFilter,
  }: {
    onOpenFilter: (columnId: string, event: any) => void
    onOpenStats: (columnId: string, event: any) => void
  } & Pick<SheetContext<T>, 'selected' | 'columns' | 'columnsIndex' | 'select'> & {
    data?: T[]
    search: SheetContext<T>['data']['search']
    filters: SheetContext<T>['data']['filters']
  }) => {
    return (
      <thead>
      <tr className="tr trh">
        {map(select?.getId, getId => (
          <th className="td th td-center td-width0 td-sticky-start">
            <Checkbox
              size="small"
              checked={selected.size === data?.length}
              indeterminate={selected.size !== data?.length && selected.size !== 0}
              onChange={() => {
                if (!data) return
                if (selected.size === 0) selected.add(data.map(getId))
                else selected.clear()
              }}
            />
          </th>
        ))}
        {columns.map((_, i) => {
          const sortedByThis = search?.sortBy === _.id ?? true
          const active = sortedByThis || filters[_.id]
          return (
            <th
              style={_.styleHead}
              key={_.id}
              title={_.head}
              // onClick={() => onSortBy(_.id)}
              className={[
                'td th',
                _.width ? 'th-width-fit-content' : '',
                _.stickyEnd ? 'td-sticky-end' : '',
                active ? 'th-active' : '',
                fnSwitch(_.align!, {
                  'center': 'td-center',
                  'right': 'td-right'
                }, _ => '')
              ].join(' ')}
            >
              <Box className="th-resize" style={{width: _.width}}>
                {_.head}
              </Box>
            </th>
          )
        })}
      </tr>
      <tr>
        {select?.getId && (
          <td className="td-sticky-start"/>
        )}
        {columns.map(c => {
          const sortedByThis = search.sortBy === c.id ?? false
          const active = sortedByThis || !!filters[c.id]
          return (
            <td key={c.id} style={c.styleHead} className={[
              'td-sub-head',
              c.stickyEnd ? 'td-sticky-end' : ''
            ].join(' ')}>
              <SheetHeadContent
                column={c}
                active={active}
                onOpenStats={e => onOpenStats(c.id, e)}
                onOpenFilter={e => onOpenFilter(c.id, e)}
              />
            </td>
          )
        })}
      </tr>
      </thead>
    )
  }
  return React.memo(Component) as typeof Component
})()

export const SheetHeadTypeIcon = (props: {
  tooltip: string,
  children: string,
}) => {
  return <TableIcon className="table-head-type-icon" fontSize="small" {...props}/>
}

export const SheetHeadContent = ({
  active,
  column,
  onOpenFilter,
  onOpenStats,
}: {
  column: SheetColumnProps<any>
  onOpenFilter: (e: any) => void
  onOpenStats: (e: any) => void
  active?: boolean
}) => {
  return (
    <span style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
      {column.typeIcon}
      {/*(() => {
        if (column.typeIcon) return column.typeIcon
        // switch (column.type) {
        //   case 'date':
        //     return <SheetHeadTypeIcon children="event" tooltip={column.type}/>
        //   case 'select_multiple':
        //     return <SheetHeadTypeIcon children="check_box" tooltip={column.type}/>
        //   case 'select_one':
        //     return <SheetHeadTypeIcon children="radio_button_checked" tooltip={column.type}/>
        //   case 'number':
        //     return <SheetHeadTypeIcon children="tag" tooltip={column.type}/>
        //   case 'string':
        //     return <SheetHeadTypeIcon children="short_text" tooltip={column.type}/>
        //   default:
        //     return column.type
        // }
      })()*/}
      {['select_one', 'select_multiple', 'date', 'number'].includes(column.type!) && (
        <TableIconBtn children="bar_chart" onClick={e => onOpenStats(e)}/>
      )}
      {column.type && (
        <TableIconBtn
          color={active ? 'primary' : undefined}
          children="filter_alt"
          onClick={e => onOpenFilter(e)}
        />
      )}
    </span>
  )
}
