import {ChangeEvent, useState} from 'react'
import {Box, Input} from '@mui/material'

import {ProtectRoute} from '@/core/Session/SessionContext'

export default () => {
  const [uri, setUri] = useState('https://ee-kobo.drc.ngo/x/hhh7Pffz')
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUri(e.target.value)
  }

  return (
    <ProtectRoute>
      <Box
        component="main"
        sx={{
          width: '100%',
          maxWidth: 840,
          height: '90vh',
          marginInline: 'auto',
          display: 'flex',
          gap: 2,
          padding: 2,
          flexDirection: 'column',
        }}
      >
        <Input value={uri} onChange={handleChange} />
        <iframe width="100%" height="100%" src={uri}></iframe>
      </Box>
    </ProtectRoute>
  )
}
