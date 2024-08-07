import React, {useMemo} from 'react'
import {Period} from '@infoportal-common'
import {Pdf} from '@/shared/PdfLayout/PdfLayout'
import {Box, Icon, useTheme} from '@mui/material'
import {Txt} from 'mui-extension'
import {periodToString} from '@/features/Snapshot/SnapshotPeriod'
import {DRCLogo} from '@/shared/logo/logo'
import {MetaSnapshotOverview} from '@/features/Meta/Snapshot/MetaSnapshotOverview'
import {MetaSnapshotCashAssistance} from '@/features/Meta/Snapshot/MetaSnapshotCashAssistance'
import {subDays} from 'date-fns'
import {MetaSnapshotProtection} from '@/features/Meta/Snapshot/MetaSnapshotProtection'
import {MetaSnapshotEcrec} from '@/features/Meta/Snapshot/MetaSnapshotEcrec'
import {MetaSnapshotSnfi} from '@/features/Meta/Snapshot/MetaSnapshotSnfi'

export const MetaSnapshotHeader = ({
  period,
  subTitle,
  icon,
  color,
}: {
  period: Period
  subTitle: string
  icon: string
  color?: string
}) => {
  const t = useTheme()
  if (!color) color = t.palette.primary.main
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
        <Txt bold sx={{
          fontSize: '1.6em',
          fontWeight: 300,
          display: 'flex',
          alignItems: 'center',
          // color: t.palette.text.secondary,
        }}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            fontWeight: 500,
            // color: t.palette.primary.main,
          }}>
            {/*<Icon sx={{mr: 1, fontSize: 24}}>{icon}</Icon>*/}
            {subTitle}
            &nbsp;-&nbsp;
          </Box>
          Activity Snapshot
          {/*<Box sx={{*/}
          {/*  ml: 2,*/}
          {/*  display: 'flex',*/}
          {/*  alignItems: 'center',*/}
          {/*  fontWeight: 'lighter',*/}
          {/*  borderRadius: 500,*/}
          {/*  pl: 1.5,*/}
          {/*  pr: 2,*/}
          {/*  fontSize: '16px',*/}
          {/*  color: color,*/}
          {/*  background: alpha(color, .1),*/}
          {/*  border: '1px solid ' + color,*/}
          {/*}}>*/}
          {/*  <Icon sx={{mr: 1}}>{icon}</Icon>*/}
          {/*  {subTitle}*/}
          {/*</Box>*/}
        </Txt>
        <Txt color="hint" sx={{fontSize: '1.1em', display: 'flex', alignItems: 'center'}}>
          <Icon fontSize="small" sx={{mr: .5}}>date_range</Icon> {asString.start}
          {asString.end !== asString.start && (
            <>&nbsp;-&nbsp;{asString.end}</>
          )}
          <Icon fontSize="small" sx={{mr: .5, ml: 2,}}>location_on</Icon> Ukraine
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
      {/*<MetaSnapshotSnfi period={period}/>*/}
      {/*<MetaSnapshotEcrec period={period}/>*/}
      {/*<MetaSnapshotOverview period={period}/>*/}
      <MetaSnapshotProtection period={period}/>
      {/*<MetaSnapshotCashAssistance period={period}/>*/}
    </Pdf>
  )
}