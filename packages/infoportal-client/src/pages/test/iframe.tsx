import {useState, type ChangeEvent} from 'react'
import {Box, Input} from '@mui/material'

export default () => {
  const [uri, setUri] = useState('https://ee-kobo.drc.ngo/x/hhh7Pffz')
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUri(e.target.value)
  }

  return (
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
    </Box>
  )
}
