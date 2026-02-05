import {useLayoutEffect} from 'react'
import {Box, LinearProgress} from '@mui/material'

import {useAppSettings} from '@/core/context/ConfigContext'
import {useKoboAnswersContext} from '@/core/context/KoboAnswersContext'
import {LanguageSwitch} from '@/shared/LanguageSwitch'
import {Pdf} from '@/shared/PdfLayout/PdfLayout'

import Page1 from './Page1'
import Page2 from './Page2'
import Page3 from './Page3'
import Page4 from './Page4'

const GbvNeedsAssessment2025 = () => {
  const ctxAnswers = useKoboAnswersContext()
  const fetcher = ctxAnswers.byName('protection_gbv_capacity_needs_assessment_2026')
  const {
    theme: {brightness: initialBrightness, setBrightness},
  } = useAppSettings()

  useLayoutEffect(() => {
    setBrightness('light')
    fetcher.fetch()

    return () => setBrightness(initialBrightness)
  }, [])

  return (
    <>
      {fetcher.loading && <LinearProgress sx={{position: 'absolute', width: '100%'}} />}
      <Pdf sx={{width: '21cm'}}>
        <Box
          sx={{'@media print': {display: 'none'}}}
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          pb={2}
        >
          <LanguageSwitch />
        </Box>
        <Page1 />
        <Page2 />
        <Page3 />
        <Page4 />
      </Pdf>
    </>
  )
}

export default GbvNeedsAssessment2025
