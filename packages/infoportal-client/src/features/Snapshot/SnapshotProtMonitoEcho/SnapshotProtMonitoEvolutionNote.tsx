import {Txt} from '@/shared/Txt'
import {Box, BoxProps, Icon} from '@mui/material'
import {format} from 'date-fns-tz'
import {subMonths} from 'date-fns'
import React from 'react'
import {ProtectionMonito} from '@/features/Protection/DashboardMonito/ProtectionMonitoContext'

export const SnapshotProtMonitoEvolutionNote = (props: BoxProps) => {
  const ctx = ProtectionMonito.useContext()
  return (
    <Box {...props}>
      {ctx.period.start && ctx.period.end && (
        <Txt color="disabled">
          <Icon sx={{mr: 1, fontSize: '15px !important'}} color="disabled">
            info
          </Icon>
          {'Compared with the previous monthly monitoring period '}(
          {format(subMonths(ctx.period.start, 1), 'MMMM yyyy')})
        </Txt>
      )}
    </Box>
  )
}
