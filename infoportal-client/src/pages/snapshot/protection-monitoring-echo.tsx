import React, {useEffect} from 'react'
import {SnapshotProtMonitoEcho} from '@/features/Snapshot/SnapshotProtMonitoEcho/SnapshotProtMonitoEcho'
import {GlobalStyles, useTheme} from '@mui/material'
import {useAppSettings} from '@/core/context/ConfigContext'

const generalStyles = <GlobalStyles styles={{
  body: {
    // background: '#fff',
  }
}}/>

const SnapshotProtectionMonitoringPage = () => {
  const {theme} = useAppSettings()
  const t = useTheme()
  useEffect(() => {
    theme.setAppThemeParams({
      dark: true,
      backgroundDefault: t.palette.background.paper,
      backgroundPaper: t.palette.background.default,
      fontSize: 14,
      cardElevation: 1,
    })
  }, [])
  return (
    <>
      {generalStyles}
      <SnapshotProtMonitoEcho/>
    </>
  )
}

export default SnapshotProtectionMonitoringPage