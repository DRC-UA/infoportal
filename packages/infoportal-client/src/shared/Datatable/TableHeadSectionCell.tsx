import {map, Obj, seq} from '@axanc/ts-utils'
import {Icon, styled, useTheme} from '@mui/material'

import {styleUtils} from '@/core/theme'
import {IpBtn} from '@/shared'
import type {DatatableColumn} from '@/shared/Datatable/util/datatableType'

const colors = [
  '#2196F3',
  '#FF9800',
  '#673AB7',
  '#009688',
  '#F44336',
  '#00BCD4',
  '#FFEE58',
  '#9C27B0',
  '#CDDC39',
  '#E91E63',
]

const HeadRow = styled('tr')(({theme}) => ({
  cursor: 'pointer',
  fontSize: styleUtils(theme).fontSize.small,
  '&:hover .TableHeadSectionCell-content': {
    opacity: 1,
    height: 32,
  },
}))

export const TableHeadSectionCell = ({
  columns,
  hasCheckboxColumn,
  onHideColumns,
}: {
  hasCheckboxColumn: boolean
  columns: DatatableColumn.InnerProps<any>[]
  onHideColumns: (_: string[]) => void
}) => {
  const t = useTheme()

  return (
    <HeadRow className="tr">
      {map(
        Obj.entries(seq(columns).groupBy((_) => _.groupLabel ?? 'None')),
        (groups) =>
          groups.length > 1 &&
          groups.map(([group, cols], i) => (
            <th
              key={group}
              style={{
                color: t.palette.getContrastText(colors[i % colors.length]),
                background: colors[i % colors.length],
                padding: 0,
                height: 6,
                maxWidth: 0,
              }}
              colSpan={i === 0 ? cols.length + (hasCheckboxColumn ? 1 : 0) : cols.length}
            >
              <div
                className="TableHeadSectionCell-content"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: t.transitions.create('all'),
                  opacity: 0,
                  height: 0,
                }}
              >
                {group}&nbsp;
                <IpBtn
                  size="small"
                  variant="contained"
                  color="primary"
                  sx={{minWidth: 30}}
                  onClick={() => onHideColumns(cols.map((_) => _.id))}
                >
                  <Icon fontSize="small">visibility_off</Icon>
                </IpBtn>
              </div>
            </th>
          )),
      )}
    </HeadRow>
  )
}
