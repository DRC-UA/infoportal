import {format} from 'date-fns'
import React, {useMemo} from 'react'
import {Box, Icon} from '@mui/material'
import {Txt} from '@/shared/Txt'
import {Period} from 'infoportal-common'

export const periodToString = (period: Partial<Period>) => {
  return {
    start: period.start ? format(period.start, 'LLLL yyyy') : undefined,
    end: period.end ? format(period.end, 'LLLL yyyy') : undefined,
  }
}

export const SnapshotPeriod = ({
  period,
  href = 'https://infoportal-ua.drc.ngo/dashboard/protection-monitoring',
}: {
  period: Partial<Period>
  href?: string
}) => {
  const asString = useMemo(() => (period && (period.start || period.end) ? periodToString(period) : ''), [period])
  return (
    <Txt color="hint" sx={{fontSize: '1.1em', display: 'flex', alignItems: 'center'}}>
      {asString && (
        <>
          <Icon sx={{mr: 1}}>date_range</Icon> {asString.start}
          {asString.end !== asString.start && <>&nbsp;-&nbsp;{asString.end}</>}
        </>
      )}
      <Icon sx={{mx: 1.5, fontSize: 10}}>fiber_manual_record</Icon>
      <Box component="a" target="_blank" href={href} sx={{color: '#4c8cca', display: 'flex', alignItems: 'center'}}>
        <Icon sx={{mr: 0.5}} fontSize="small">
          open_in_new
        </Icon>
        Interactive dashboard
      </Box>
    </Txt>
  )
}
