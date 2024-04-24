import {Pdf} from '@/shared/PdfLayout/PdfLayout'
import React, {useMemo, useState} from 'react'
import {SnapshotProtMonitoringProvider, useSnapshotProtMonitoringContext} from '@/features/Snapshot/SnapshotProtMonitoEcho/SnapshotProtMonitoContext'
import {useI18n} from '@/core/i18n'
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

export const snapShotDefaultPieProps: Partial<Pick<ChartPieIndicatorProps, 'dense' | 'evolution' | 'showValue' | 'sx' | 'showBase'>> & {
  hideEvolution?: boolean
} = {
  dense: true,
  evolution: null as any,
  hideEvolution: true,
  showBase: true,
  showValue: true,
  compare: null,
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
      <SnapshotProtMonitoringProvider period={period}>
        <_SnapshotProtMonitoring/>
      </SnapshotProtMonitoringProvider>
    </>
  )
}

const _SnapshotProtMonitoring = () => {
  const {data, computed, period} = useSnapshotProtMonitoringContext()
  const {formatLargeNumber, m} = useI18n()
  if (!data || !computed) return <>...</>
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