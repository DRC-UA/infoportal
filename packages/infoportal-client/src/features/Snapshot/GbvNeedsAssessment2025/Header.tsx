import {useEffect} from 'react'
import {styled, Box, Typography} from '@mui/material'

import {useI18n} from '@/core/i18n'
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
  const {m} = useI18n()

  useEffect(() => {
    document.title = `DRC - ${m.gbvNeedsAssessmentSnapshot.mykolaiv[2025].title}`
  }, [m])

  return (
    <BoxContainer>
      <Box display="flex" flexDirection="column">
        <Typography variant="h1" fontSize="1.5em" fontWeight="bold" color="primary.main">
          {m.gbvNeedsAssessmentSnapshot.mykolaiv[2025].title}
        </Typography>
        <Typography variant="h2" fontSize="1.2em" fontWeight="300" color="text.secondary">
          {m.gbvNeedsAssessmentSnapshot.mykolaiv[2025].subTitle}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" marginLeft="auto">
        <DRCLogo height={24} />
      </Box>
    </BoxContainer>
  )
}

export default GbvSurveyHeader
