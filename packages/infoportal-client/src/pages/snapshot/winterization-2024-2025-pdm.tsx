import {ThemeProvider} from '@mui/material'

import {muiTheme} from '@/core/theme'
import {WinterizationSnapshot} from '@/features/Snapshot/Winterization'

const WinterizationSpanshotPage = () => {
  return (
    <ThemeProvider
      theme={muiTheme({
        dark: false,
        fontSize: 14,
        mainColor: '#af161e',
        backgroundDefault: '#fff',
        backgroundPaper: '#f6f7f9',
        cardElevation: 1,
      })}
    >
      <WinterizationSnapshot />
    </ThemeProvider>
  )
}

export default WinterizationSpanshotPage
