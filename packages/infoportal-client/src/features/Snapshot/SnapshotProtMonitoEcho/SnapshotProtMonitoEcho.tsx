import {Pdf} from '@/shared/PdfLayout/PdfLayout'
import React from 'react'
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
import {ProtectionMonito} from '@/features/Protection/DashboardMonito/ProtectionMonitoContext'

export const snapshotAlternateColor = (t: Theme) => alpha(t.palette.primary.main, 0.26) //t.palette.grey[500]

export const snapshotColors = (t: Theme) => [t.palette.primary.main, snapshotAlternateColor(t)]

export const snapShotDefaultPieIndicatorsProps: Partial<
  Pick<ChartPieIndicatorProps, 'hideIndicatorTooltip' | 'dense' | 'evolution' | 'showValue' | 'sx' | 'showBase'>
> = {
  dense: true,
  hideIndicatorTooltip: true,
  showBase: true,
  showValue: true,
  evolution: undefined,
  sx: {
    mb: 1,
  },
}

export const SnapshotProtMonitoEcho = () => {
  return (
    <>
      <ProtectionMonito.Provider
        periodDefault={{
          start: startOfMonth(subMonths(new Date(), 1)),
          end: endOfMonth(subMonths(new Date(), 1)),
        }}
        periodCompare={(p) => ({
          start: subMonths(p.start, 1),
          end: subMonths(p.end, 1),
        })}
      >
        <_SnapshotProtMonitoring />
      </ProtectionMonito.Provider>
    </>
  )
}

const _SnapshotProtMonitoring = () => {
  const ctx = ProtectionMonito.useContext()
  return (
    <Pdf>
      <Box sx={{'@media print': {display: 'none'}}}>
        <PeriodPicker
          value={[ctx.period.start, ctx.period.end]}
          onChange={(_) => ctx.setPeriod({start: _[0], end: _[1]})}
        />
      </Box>
      <SnapshotProtMonitoEchoSample />
      <SnapshotProtMonitoEchoDisplacement />
      <SnapshotProtMonitoEchoRegistration />
      <SnapshotProtMonitoEchoSafety />
      <SnapshotProtMonitoEchoNeeds />
      <SnapshotProtMonitoEchoLivelihood />
    </Pdf>
  )
}
