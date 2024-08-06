import React, {useMemo} from 'react'
import {Period} from '@infoportal-common'
import {Pdf} from '@/shared/PdfLayout/PdfLayout'
import {Box, Icon} from '@mui/material'
import {Txt} from 'mui-extension'
import {periodToString} from '@/features/Snapshot/SnapshotPeriod'
import {DRCLogo} from '@/shared/logo/logo'
import {MetaSnapshotOverview} from '@/features/Meta/Snapshot/MetaSnapshotOverview'
import {MetaSnapshotCashAssistance} from '@/features/Meta/Snapshot/MetaSnapshotCashAssistance'
import {subDays} from 'date-fns'
import {MetaSnapshotProtection} from '@/features/Meta/Snapshot/MetaSnapshotProtection'

export const MetaSnapshotHeader = ({period}: {period: Period}) => {
  const asString = useMemo(() => periodToString(period), [period])
  return (
    <Box sx={{
      px: 2,
      py: 1,
      borderBottom: t => `1px solid ${t.palette.divider}`,
      mb: 0,
      display: 'flex',
      alignItems: 'center'
    }}>
      <Box>
        <Txt bold sx={{fontSize: '1.6em', fontWeight: '700'}} color="primary">
          Activities Snapshot
          <Box sx={{display: 'inline', fontWeight: 'lighter'}}> - Ukraine</Box>
        </Txt>
        <Txt color="hint" sx={{fontSize: '1.1em', display: 'flex', alignItems: 'center'}}>
          <Icon fontSize="small" sx={{mr: 1}}>date_range</Icon> {asString.start}
          {asString.end !== asString.start && (
            <>&nbsp;-&nbsp;{asString.end}</>
          )}
        </Txt>
      </Box>
      <Box sx={{display: 'flex', alignItems: 'center', marginLeft: 'auto'}}>
        <DRCLogo/>
      </Box>
    </Box>
  )
}

export interface MetaSnapshotProps {
  period: Period
}

export const MetaSnapshot = () => {
  const period = {
    start: new Date(2024, 0, 1),
    end: subDays(new Date(2024, 7, 1), 1),
  }
  return (
    <Pdf>
      <MetaSnapshotOverview period={period}/>
      <MetaSnapshotProtection period={period}/>
      <MetaSnapshotCashAssistance period={period}/>
    </Pdf>
  )
}