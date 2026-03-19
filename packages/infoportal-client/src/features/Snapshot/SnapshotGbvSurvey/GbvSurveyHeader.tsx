import {useEffect} from 'react'
import {Box, styled, Typography} from '@mui/material'

import {DRCLogo} from '@/shared/logo/logo'

const BoxContainer = styled(Box)(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
  backgroundColor: theme.palette.background.default,
  boxShadow: theme.shadows[2],
}))

const GbvSurveyHeader = () => {
  useEffect(() => {
    document.title = 'DRC - GBV Survey for Social Service Providers Snapshot'
  }, [])

  return (
    <BoxContainer>
      <Box display="flex" flexDirection="column">
        <Typography variant="h1" fontSize="1.5em" fontWeight="bold" color="primary.main">
          GBV Survey for Social Service Providers Snapshot
        </Typography>
        <Typography variant="h2" fontSize="1.2em" fontWeight="300" color="text.secondary">
          Ukraine - Mykolaiv (2024)
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" marginLeft="auto">
        <DRCLogo height={24} />
      </Box>
    </BoxContainer>
  )
}

export default GbvSurveyHeader
