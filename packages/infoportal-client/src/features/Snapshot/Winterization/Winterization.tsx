import {Box} from '@mui/material'

import {Pdf} from '@/shared/PdfLayout/PdfLayout'
import {MealWinterizationProvider, useMealWinterizationContext} from '@/features/Meal/Winter/MealWinterizationContext'
import {PeriodPicker} from '@/shared/PeriodPicker/PeriodPicker'
import {DRCLogo} from '@/shared/logo/logo'

import {WinterizationIntro} from './WinterizationIntro'

export const snapshotProtMonitoNn2Logo = <DRCLogo />

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
    </Pdf>
  )
}
