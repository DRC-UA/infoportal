import type {FC} from 'react'
import {Box, Typography} from '@mui/material'

const Subtitle: FC<{text: string}> = ({text}) => (
  <Box
    sx={{
      borderBottom: '2px solid',
      borderColor: (t) => t.palette.divider,
      paddingBlock: 1,
      marginBlock: 2,
    }}
  >
    <Typography variant="h4" fontWeight="bold" color="text.primary">
      {text}
    </Typography>
  </Box>
)

export default Subtitle
