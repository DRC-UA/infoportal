import {useState, type ChangeEvent} from 'react'
import {Box, Input} from '@mui/material'
import {Route, Routes} from 'react-router-dom'

import {ProtectRoute} from '@/core/Session/SessionContext'

export default () => {
  const [uri, setUri] = useState('https://ee-kobo.drc.ngo/x/hhh7Pffz')
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUri(e.target.value)
  }

  return (
    <ProtectRoute>
      <Routes>
        <Route
          index
          element={
            <Box
              component="main"
              sx={{
                width: '100%',
                maxWidth: 840,
                height: '100vh',
                marginInline: 'auto',
                display: 'flex',
                gap: 2,
                padding: 2,
                flexDirection: 'column',
              }}
            >
              <Input value={uri} onChange={handleChange} />
              <iframe title="Embedded Kobo Form" width="100%" style={{flexGrow: 1, border: 'none'}} src={uri}></iframe>
            </Box>
          }
        />
      </Routes>
    </ProtectRoute>
  )
}
