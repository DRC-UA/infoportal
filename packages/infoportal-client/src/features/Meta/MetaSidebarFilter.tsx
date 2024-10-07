import {DebouncedInput, IpIconBtn} from '@/shared'
import React from 'react'
import {Badge, Box, capitalize, useTheme} from '@mui/material'
import {SidebarSubSection} from '@/shared/Layout/Sidebar/SidebarSubSection'
import {DataFilter} from '@/shared/DataFilter/DataFilter'
import {useMetaContext} from '@/features/Meta/MetaContext'

export const MetaSidebarFilter = ({
  name,
  shape,
}: {
  shape: DataFilter.Shape<any>
  name: string
}) => {
  const {data: ctx} = useMetaContext()
  const t = useTheme()
  return (
    <SidebarSubSection
      icon={shape.icon}
      title={
        <Box sx={{display: 'flex', alignItems: 'center'}}>
          {capitalize(name)}
          <Badge
            color="primary"
            // anchorOrigin={{
            //   vertical: 'top',
            //   horizontal: 'left',
            variant={ctx.shapeFilters[name]?.length ?? 0 > 0 ? 'dot' : undefined}
            // badgeContent={filters[name]?.length}
            sx={{color: t.palette.text.secondary, marginLeft: 'auto', mr: .25}}
          >
            <IpIconBtn children="clear" size="small" onClick={() => {
              ctx.setShapeFilters(_ => ({
                ..._,
                [name]: []
              }))
            }}/>
          </Badge>
        </Box>
      }
      key={name}
      defaultOpen={ctx.shapeFilters[name] !== undefined}
    >
      <DebouncedInput<string[]>
        key={name}
        debounce={50}
        value={ctx.shapeFilters[name] ?? []}
        onChange={_ => ctx.setShapeFilters((prev: any) => ({...prev, [name]: _}))}
      >
        {(value, onChange) => (
          <></>
        )}
      </DebouncedInput>
    </SidebarSubSection>
  )
}