import React, {useEffect} from 'react'
import {Box, Typography} from '@mui/material'
import {DRCLogo} from '@/shared/logo/logo'
import {makeStyles} from 'tss-react/mui'

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
  const {classes, cx} = useStyles()
  useEffect(() => {
    document.title = 'DRC - GBV Survey for Social Service Providers Snapshot'
  }, [])

  return (
    <Box className={classes.container}>
      <Box className={classes.titleContainer}>
        <Typography variant="h1" className={classes.title}>
          GBV Survey for Social Service Providers Snapshot
        </Typography>
        <Typography variant="h2" className={classes.subTitle}>
          Ukraine - Mykolaiv (2024)
        </Typography>
      </Box>
      <Box className={classes.logo}>
        <DRCLogo height={24}/>
      </Box>
    </Box>
  )
}

export default GbvSurveyHeader
