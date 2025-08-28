import {useEffect} from 'react'
import {Box} from '@mui/material'
import {endOfMonth, startOfMonth} from 'date-fns'

import {OblastIndex} from 'infoportal-common'

import {useAppSettings} from '@/core/context/ConfigContext'
import {ProtectionMonito} from '@/features/Protection/DashboardMonito/ProtectionMonitoContext'
import {SnapshotProtMonitoNN2Safety} from '@/features/Snapshot/SnapshotProtMonitoNN2/SnapshotProtMonitoNN2Safety'
import {SnapshotProtMonitoNN2Needs} from '@/features/Snapshot/SnapshotProtMonitoNN2/SnapshotProtMonitoNN2Needs'
import {SnapshotProtMonitoNN2Livelihood} from '@/features/Snapshot/SnapshotProtMonitoNN2/SnapshotProtMonitoNN2Livelihood'
import {SnapshotProtMonitoNN2Sample} from '@/features/Snapshot/SnapshotProtMonitoNN2/SnapshotProtMonitoNN2Sample'
import {LanguageSwitch} from '@/shared/LanguageSwitch'
import {DRCLogo} from '@/shared/logo/logo'
import {Pdf} from '@/shared/PdfLayout/PdfLayout'
import {PeriodPicker} from '@/shared/PeriodPicker/PeriodPicker'

export const snapshotProtMonitoNn2Logo = (
  <>
    <DRCLogo />
  </>
)

export const SnapshotProtMonitoNN2 = () => {
  const {
    theme: {brightness, setBrightness},
  } = useAppSettings()

  useEffect(() => {
    const previousTheme = brightness
    setBrightness('light') // coming from dark theme it switch to the light one for printing

    return () => setBrightness(previousTheme) // switch back to the previous theme on exit
  }, [])

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
      <Box
        sx={{'@media print': {display: 'none'}}}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        pb={2}
      >
        <PeriodPicker
          value={[ctx.period.start, ctx.period.end]}
          onChange={(_) => ctx.setPeriod({start: _[0], end: _[1]})}
          sx={{width: 'auto'}}
        />
        <LanguageSwitch />
      </Box>
      <SnapshotProtMonitoNN2Sample />
      {/* <SnapshotProtMonitoNN2Displacement/> */}
      <SnapshotProtMonitoNN2Safety />
      <SnapshotProtMonitoNN2Needs />
      <SnapshotProtMonitoNN2Livelihood />
    </Pdf>
  )
}
