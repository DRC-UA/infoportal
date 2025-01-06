import {Pdf} from '@/shared/PdfLayout/PdfLayout'
import React from 'react'
import {SnapshotProtMonitoNN2Safety} from '@/features/Snapshot/SnapshotProtMonitoNN2/SnapshotProtMonitoNN2Safety'
import {SnapshotProtMonitoNN2Needs} from '@/features/Snapshot/SnapshotProtMonitoNN2/SnapshotProtMonitoNN2Needs'
import {SnapshotProtMonitoNN2Livelihood} from '@/features/Snapshot/SnapshotProtMonitoNN2/SnapshotProtMonitoNN2Livelihood'
import {SnapshotProtMonitoNN2Sample} from '@/features/Snapshot/SnapshotProtMonitoNN2/SnapshotProtMonitoNN2Sample'
import {Box} from '@mui/material'
import {OblastIndex} from 'infoportal-common'
import {endOfMonth, startOfMonth} from 'date-fns'
import {PeriodPicker} from '@/shared/PeriodPicker/PeriodPicker'
import {DRCLogo} from '@/shared/logo/logo'
import {ProtectionMonito} from '@/features/Protection/DashboardMonito/ProtectionMonitoContext'

export const snapshotProtMonitoNn2Logo = (
  <>
    <DRCLogo />
  </>
)

export const SnapshotProtMonitoNN2 = () => {
  return (
    <ProtectionMonito.Provider
      filterDefault={{
        oblast: [OblastIndex.byName('Mykolaivska').iso],
      }}
      periodDefault={{
        start: startOfMonth(new Date(2024, 1, 1)),
        end: endOfMonth(new Date(2024, 2, 31)),
      }}
    >
      <_SnapshotProtMonitoring />
    </ProtectionMonito.Provider>
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
      <SnapshotProtMonitoNN2Sample />
      {/* <SnapshotProtMonitoNN2Displacement/> */}
      <SnapshotProtMonitoNN2Safety />
      <SnapshotProtMonitoNN2Needs />
      <SnapshotProtMonitoNN2Livelihood />
    </Pdf>
  )
}
