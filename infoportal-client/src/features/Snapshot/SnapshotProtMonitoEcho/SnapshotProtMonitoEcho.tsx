import {Pdf} from '@/shared/PdfLayout/PdfLayout'
import React, {useMemo, useState} from 'react'
import {SnapshotProtMonitoringProvider} from '@/features/Snapshot/SnapshotProtMonitoEcho/SnapshotProtMonitoContext'
import {SnapshotProtMonitoEchoSafety} from '@/features/Snapshot/SnapshotProtMonitoEcho/SnapshotProtMonitoEchoSafety'
import {ChartPieIndicatorProps} from '@/shared/charts/ChartPieWidget'
import {SnapshotProtMonitoEchoNeeds} from '@/features/Snapshot/SnapshotProtMonitoEcho/SnapshotProtMonitoEchoNeeds'
import {SnapshotProtMonitoEchoLivelihood} from '@/features/Snapshot/SnapshotProtMonitoEcho/SnapshotProtMonitoEchoLivelihood'
import {SnapshotProtMonitoEchoSample} from '@/features/Snapshot/SnapshotProtMonitoEcho/SnapshotProtMonitoEchoSample'
import {SnapshotProtMonitoEchoDisplacement} from '@/features/Snapshot/SnapshotProtMonitoEcho/SnapshotProtMonitoEchoDisplacement'
import {SnapshotProtMonitoEchoRegistration} from '@/features/Snapshot/SnapshotProtMonitoEcho/SnapshotProtMonitoEchoRegistration'
import {alpha, Box, Theme} from '@mui/material'
import {endOfMonth, startOfMonth, subMonths} from 'date-fns'
import {PeriodPicker} from '@/shared/PeriodPicker/PeriodPicker'
import {Period} from '@infoportal-common'

export const snapshotAlternateColor = (t: Theme) => alpha(t.palette.primary.main, .26)//t.palette.grey[500]

export const snapshotColors = (t: Theme) => [
  t.palette.primary.main,
  snapshotAlternateColor(t),
]

export const snapShotDefaultPieIndicatorsProps: Partial<Pick<ChartPieIndicatorProps, 'hideIndicatorTooltip' | 'dense' | 'evolution' | 'showValue' | 'sx' | 'showBase'>> = {
  dense: true,
  hideIndicatorTooltip: true,
  showBase: true,
  showValue: true,
  sx: {
    mb: 1,
  }
}

export const SnapshotProtMonitoEcho = () => {
  const [period, setPeriod] = useState<Partial<Period>>({
    start: startOfMonth(subMonths(new Date(), 1)),
    end: endOfMonth(subMonths(new Date(), 1)),
  })
  const value: [Date | undefined, Date | undefined] = useMemo(() => [period.start, period.end], [period])
  return (
    <>
      <Box sx={{'@media print': {display: 'none'}}}>
        <PeriodPicker value={value} onChange={_ => setPeriod({start: _[0], end: _[1]})}/>
      </Box>
      <SnapshotProtMonitoringProvider period={{start: period.start ?? new Date(2023, 0, 1), end: period.end ?? new Date()}}>
        <_SnapshotProtMonitoring/>
      </SnapshotProtMonitoringProvider>
    </>
  )
}

const _SnapshotProtMonitoring = () => {
  return (
    <Pdf>
      <SnapshotProtMonitoEchoSample/>
      <SnapshotProtMonitoEchoDisplacement/>
      <SnapshotProtMonitoEchoRegistration/>
      <SnapshotProtMonitoEchoSafety/>
      <SnapshotProtMonitoEchoNeeds/>
      <SnapshotProtMonitoEchoLivelihood/>
    </Pdf>
  )
}