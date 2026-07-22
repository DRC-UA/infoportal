import type {FC, ReactNode} from 'react'
import {Typography} from '@mui/material'

import {uppercaseHandlingAcronyms} from 'infoportal-common'

const ChartSubtitle: FC<{subtitle: string | undefined}> = ({subtitle}): ReactNode => {
  if (!subtitle) return null

  return (
    <Typography
      sx={{lineHeight: 1, marginTop: 3, marginBottom: 2}}
      fontSize="0.90em"
      fontWeight="bold"
      color="textSecondary"
    >
      {uppercaseHandlingAcronyms(subtitle)}
    </Typography>
  )
}

const SectionTitle: FC<{title: string | undefined}> = ({title}): ReactNode => {
  if (!title) return null

  return (
    <Typography
      sx={{lineHeight: 1.3, marginTop: 3, marginBottom: 3}}
      fontSize="1.75em"
      fontWeight="bold"
      color="textPrimary"
    >
      {uppercaseHandlingAcronyms(title)}
    </Typography>
  )
}

export {ChartSubtitle, SectionTitle}
