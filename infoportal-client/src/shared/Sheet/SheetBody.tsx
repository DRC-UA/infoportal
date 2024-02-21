import {Checkbox} from '@mui/material'
import {fnSwitch} from '@alexandreannic/ts-utils'
import React from 'react'
import {SheetContext} from '@/shared/Sheet/context/SheetContext'
import {SheetRow, SheetTableProps} from '@/shared/Sheet/util/sheetType'

export const SheetBody = (() => {
  const Component = <T extends SheetRow>({
    data,
    select,
    columns,
    getRenderRowKey,
    selected,
    onClickRows,
  }: Pick<SheetTableProps<any>, 'onClickRows'> & Pick<SheetContext<T>,
    'selected' |
    'select' |
    'columns' |
    'getRenderRowKey'
  > & {
    data: T[]
  }) => {
    return (
      <>
        {data.map((item, rowI) => (
          <tr
            className={'tr' + (onClickRows ? ' tr-clickable' : '')}
            key={getRenderRowKey ? getRenderRowKey(item, rowI) : rowI}
            onClick={e => onClickRows?.(item, e)}
          >
            {select && (
              <td className="td td-center td-sticky-start">
                <Checkbox size="small" checked={selected.has(select.getId(item))} onChange={() => selected.toggle(select.getId(item))}/>
              </td>
            )}
            {columns.map((_, i) => {
              const render = _.render(item)
              return (
                <td
                  title={_.tooltip !== null ? (_.tooltip?.(item) ?? (render as any)) : undefined}
                  key={i}
                  style={_.style?.(item)}
                  onClick={_.onClick ? () => _.onClick?.(item) : undefined}
                  className={[
                    'td',
                    _.stickyEnd ? 'td-sticky-end' : '',
                    _.type === 'number' ? 'td-right' : '',
                    fnSwitch(_.align!, {
                      'center': 'td-center',
                      'right': 'td-right'
                    }, _ => '')
                  ].join(' ')}
                >
                  {render}
                </td>
              )
            })}
          </tr>
        ))}
      </>
    )
  }
  return React.memo(Component) as typeof Component
})()