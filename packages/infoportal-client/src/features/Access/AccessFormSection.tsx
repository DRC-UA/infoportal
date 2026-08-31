import type {ReactNode} from 'react'
import {Box, Icon, useTheme, type SxProps} from '@mui/material'

import {Txt} from '@/shared/Txt'

export const AccessFormSection = ({
  label,
  icon,
  children,
  sx,
  childrenBoxSx,
}: {
  icon?: string
  children: ReactNode
  label: string
  sx?: SxProps
  childrenBoxSx?: SxProps
}) => {
  const t = useTheme()
  return (
    <Box sx={{ml: -0.5, ...sx}}>
      <Box sx={{display: 'flex', alignItems: 'center', mb: 1}}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mr: 1,
            background: t.palette.divider,
            borderRadius: '200px',
            height: 26,
            width: 26,
            color: t.palette.text.secondary,
            lineHeight: 1,
          }}
        >
          <Icon fontSize="small">{icon ?? 'check_circle'}</Icon>
        </Box>
        <Txt block uppercase bold color="hint" fontSize="small">
          {label}
        </Txt>
      </Box>
      <Box
        sx={{
          borderLeft: `1px solid ${t.palette.divider}`,
          ml: '11px',
          pl: 2,
          pb: 2,
          mb: 1,
          ...childrenBoxSx,
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
