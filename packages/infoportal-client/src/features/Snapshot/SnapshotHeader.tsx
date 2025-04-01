import {format} from 'date-fns'
import {NullableKey, Period} from 'infoportal-common'
import React, {ReactNode, useEffect} from 'react'
import {Box} from '@mui/material'
import {Txt} from '@/shared/Txt'
import {SnapshotPeriod} from '@/features/Snapshot/SnapshotPeriod'
import {useI18n} from '@/core/i18n'

const periodToString = (period: NullableKey<Period, 'end'>) => {
  return {
    start: format(period.start, 'LLLL yyyy'),
    end: period.end && period.start.getMonth() !== period.end.getMonth() ? format(period.end, 'LLLL yyyy') : undefined,
  }
}

export const SnapshotHeader = ({
  period,
  logo,
  title,
  subTitle,
  dashBoardHref,
  showDashboardLink = true,
}: {
  title?: string
  subTitle?: string
  period: Partial<Period>
  logo?: ReactNode
  dashBoardHref?: string
  showDashboardLink?: boolean
}) => {
  const {m} = useI18n()
  useEffect(() => {
    document.title =
      'DRC - Protection Monitoring Snapshot' + (period.start ? ' - ' + format(period.start, 'yyyy-MM') : '')
  }, [period])
  return (
    <Box
      sx={{
        px: 2,
        py: 1,
        borderBottom: (t) => `1px solid ${t.palette.divider}`,
        mb: 0,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Box>
        <Txt bold sx={{fontSize: '1.65em', fontWeight: '700'}} color="primary">
          {title ?? m.protHHSnapshot.title}&nbsp;
          <Box sx={{display: 'inline', fontWeight: 'lighter'}}>- {subTitle ?? m.protHHSnapshot.title2}</Box>
        </Txt>
        <SnapshotPeriod period={period} href={dashBoardHref} showLink={showDashboardLink !== false} />
      </Box>
      <Box sx={{display: 'flex', alignItems: 'center', marginLeft: 'auto'}}>{logo}</Box>
    </Box>
  )
}
