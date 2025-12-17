import {GlobalStyles, ThemeProvider} from '@mui/material'

import {muiTheme} from '@/core/theme'
import GbvNeedsAssessment from '@/features/Snapshot/GbvNeedsAssessment2025'

const generalStyles = (
  <GlobalStyles
    styles={{
      body: {
        background: '#fff',
      },
    }}
  />
)

const SnapshotProtectionMonitoringPage = () => {
  return (
    <ThemeProvider
      theme={muiTheme({
        dark: false,
        fontSize: 13,
        mainColor: '#af161e',
        backgroundDefault: '#fff',
        backgroundPaper: '#f6f7f9',
        cardElevation: 1,
      })}
    >
      {generalStyles}
      <GbvNeedsAssessment />
    </ThemeProvider>
  )
}

export default SnapshotProtectionMonitoringPage
