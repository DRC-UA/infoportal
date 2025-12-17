import {useEffect} from 'react'
import {Box, Typography} from '@mui/material'
import {makeStyles} from 'tss-react/mui'

import {useI18n} from '@/core/i18n'
import {DRCLogo} from '@/shared/logo/logo'

const useStyles = makeStyles()((t) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `${t.spacing(1)} ${t.spacing(2)}`,
    backgroundColor: t.palette.background.default,
    boxShadow: t.shadows[2],
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: '1.5em',
    fontWeight: 'bold',
    color: t.palette.primary.main,
  },
  subTitle: {
    fontSize: '1.2em',
    fontWeight: '300',
    color: t.palette.text.secondary,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 'auto',
  },
}))

const GbvSurveyHeader = () => {
  const {classes} = useStyles()
  const {m} = useI18n()

  useEffect(() => {
    document.title = `DRC - ${m.gbvNeedsAssessmentSnapshot.mykolaiv[2025].title}`
  }, [m])

  return (
    <Box className={classes.container}>
      <Box className={classes.titleContainer}>
        <Typography variant="h1" className={classes.title}>
          {m.gbvNeedsAssessmentSnapshot.mykolaiv[2025].title}
        </Typography>
        <Typography variant="h2" className={classes.subTitle}>
          {m.gbvNeedsAssessmentSnapshot.mykolaiv[2025].subTitle}
        </Typography>
      </Box>
      <Box className={classes.logo}>
        <DRCLogo height={24} />
      </Box>
    </Box>
  )
}

export default GbvSurveyHeader
