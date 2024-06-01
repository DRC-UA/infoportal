import {fnSwitch, map} from '@alexandreannic/ts-utils'
import {Box, Checkbox, IconProps} from '@mui/material'
import React from 'react'
import {TableIcon, TableIconBtn} from '@/features/Mpca/MpcaData/TableIcon'
import {DatatableContext} from '@/shared/Datatable/context/DatatableContext'
import {DatatableColumn, DatatableRow} from '@/shared/Datatable/util/datatableType'
import {KoboApiColumType} from '@infoportal-common'

export const DatatableHead = (() => {
  const Component = <T extends DatatableRow>({
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
  } & Pick<DatatableContext<T>, 'selected' | 'columns' | 'columnsIndex' | 'select'> & {
    data?: T[]
    search: DatatableContext<T>['data']['search']
    filters: DatatableContext<T>['data']['filters']
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
                _.classHead ?? '',
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
              <DatatableHeadContent
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

const koboIconMap = {
  image: 'short_text',
  file: 'functions',
  calculate: 'functions',
  select_one_from_file: 'attach_file',
  username: 'short_text',
  text: 'short_text',
  decimal: 'tag',
  integer: 'tag',
  note: 'info',
  end: 'event',
  start: 'event',
  datetime: 'event',
  today: 'event',
  date: 'event',
  begin_repeat: 'repeat',
  select_one: 'radio_button_checked',
  select_multiple: 'check_box',
  geopoint: 'location_on',
}

export const DatatableHeadTypeIconByKoboType = ({children, ...props}: {
  children: KoboApiColumType,
} & Pick<IconProps, 'sx' | 'color'>) => {
  return <DatatableHeadTypeIcon children={fnSwitch(children, koboIconMap, () => 'short_text')} tooltip={children} {...props}/>
}

export const DatatableHeadTypeIcon = (props: {
  tooltip: string,
  children: string,
} & Pick<IconProps, 'sx' | 'color'>) => {
  return <TableIcon className="table-head-type-icon" fontSize="small" color="disabled" {...props}/>
}

export const DatatableHeadContent = ({
  active,
  column,
  onOpenFilter,
  onOpenStats,
}: {
  column: DatatableColumn.InnerProps<any>
  onOpenFilter: (e: any) => void
  onOpenStats: (e: any) => void
  active?: boolean
}) => {
  return (
    <span style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
      {column.typeIcon}
      {column.subHeader}
      {/*(() => {
        if (column.typeIcon) return column.typeIcon
        // switch (column.type) {
        //   case 'date':
        //     return <DatatableHeadTypeIcon children="event" tooltip={column.type}/>
        //   case 'select_multiple':
        //     return <DatatableHeadTypeIcon children="check_box" tooltip={column.type}/>
        //   case 'select_one':
        //     return <DatatableHeadTypeIcon children="radio_button_checked" tooltip={column.type}/>
        //   case 'number':
        //     return <DatatableHeadTypeIcon children="tag" tooltip={column.type}/>
        //   case 'string':
        //     return <DatatableHeadTypeIcon children="short_text" tooltip={column.type}/>
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
