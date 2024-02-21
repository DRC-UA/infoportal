import {Badge, Checkbox, Icon, IconButtonProps, Menu, MenuItem, Tooltip} from '@mui/material'
import React from 'react'
import {IconBtn, Txt} from 'mui-extension'
import {DatatableColumn} from '@/shared/Datatable/util/datatableType'

interface Props extends Omit<IconButtonProps, 'onChange'> {
  // Hack because there is no way to make TS understand that the key of an object can
  // only be a string ({[key: string]: string} does not work...)
  columns: DatatableColumn.InnerProps<any>[]
  hiddenColumns: string[]
  onChange: (_: string[]) => void
  title?: string
}

export const DatatableColumnToggle = ({className, title, columns, hiddenColumns, onChange, ...props}: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  return (
    <>
      <Tooltip title={title ?? ''}>
        <IconBtn {...props} onClick={handleClick}>
          <Badge
            color="primary"
            badgeContent={columns.length === hiddenColumns.length ? '!' : columns.length - hiddenColumns.length}
            invisible={hiddenColumns.length === 0}
          >
            <Icon>table_chart</Icon>
          </Badge>
        </IconBtn>
      </Tooltip>
      <Menu anchorEl={anchorEl} keepMounted open={!!anchorEl} onClose={() => setAnchorEl(null)}>
        {columns.map(col => {
          const checked = !hiddenColumns.includes(col.id)
          return (
            <MenuItem
              key={col.id}
              title={col.head as string}
              dense
              onClick={() => onChange(checked ? [...hiddenColumns, col.id] : hiddenColumns.filter(_ => _ !== col.id))}
            >
              <Checkbox
                size="small"
                sx={{
                  pl: 0,
                  pb: 0.25,
                  pt: 0.25,
                }}
                checked={checked}
              />
              <Txt truncate sx={{maxWidth: 400}} dangerouslySetInnerHTML={{__html: col.head as string}}/>
            </MenuItem>
          )
        })}
      </Menu>
    </>
  )
}
