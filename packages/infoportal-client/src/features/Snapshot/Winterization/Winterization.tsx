import {Box} from '@mui/material'

import {Pdf} from '@/shared/PdfLayout/PdfLayout'
import {MealWinterizationProvider, useMealWinterizationContext} from '@/features/Meal/Winter/MealWinterizationContext'
import {PeriodPicker} from '@/shared/PeriodPicker/PeriodPicker'
import {DRCLogo, EULogo, UhfLogo} from '@/shared/logo/logo'

import {WinterizationIntro} from './WinterizationIntro'
import {WinterizationFeedback} from './WinterizationFeedback'
import {WinterizationMonitoring} from './WinterizationMonitoring'
import {WinterizationMonitoringAnother} from './WinterizationMonitoringAnother'
import React from 'react'

export const SnapshotLogoPDM = (
  <>
    <UhfLogo sx={{mr: 2.5}} />
    <EULogo sx={{mr: 2.5}} />
    <DRCLogo />
  </>
)

export const WinterizationSnapshot = () => {
  return (
    <MealWinterizationProvider>
      <_SnapshotProtMonitoring />
    </MealWinterizationProvider>
  )
}

const _SnapshotProtMonitoring = () => {
  const ctx = useMealWinterizationContext()
  return (
    <Pdf>
      <Box sx={{'@media print': {display: 'none'}}}>
        <PeriodPicker
          value={[ctx.periodFilter.start, ctx.periodFilter.end]}
          onChange={(_) => ctx.setPeriodFilter({start: _[0], end: _[1]})}
        />
      </Box>
      <WinterizationIntro />
      <WinterizationMonitoring />
      <WinterizationMonitoringAnother />
      <WinterizationFeedback />
    </Pdf>
  )
}
