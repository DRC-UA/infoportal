import {useState, useEffect, type ChangeEvent} from 'react'
import {Box, Input} from '@mui/material'

import {ProtectRoute} from '@/core/Session/SessionContext'

export default () => {
  const [iframeReady, setIframeReady] = useState(false)
  const [uri, setUri] = useState('https://ee-kobo.drc.ngo/x/hhh7Pffz')
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUri(e.target.value)
  }

  useEffect(() => {
    setIframeReady(true)
    // force routing handover from Next's to React's router to fix the blank page
    if (window.location.hash === '') {
      window.location.replace(`test/iframe#`)
    }
  }, [])

  return (
    <ProtectRoute>
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
        {iframeReady && (
          <iframe title="Embedded Kobo Form" width="100%" style={{flexGrow: 1, border: 'none'}} src={uri}></iframe>
        )}
      </Box>
    </ProtectRoute>
  )
}
