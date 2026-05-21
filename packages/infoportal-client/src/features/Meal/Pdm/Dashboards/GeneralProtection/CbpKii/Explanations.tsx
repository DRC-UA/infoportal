import type {FC} from 'react'
import {Box, Typography, type TypographyProps} from '@mui/material'

import {useI18n} from '@/core/i18n'
import {useKoboTranslations} from '@/utils/hooks'

const Quotation: FC<TypographyProps> = (props) => {
  const {sx, ...restOfProps} = props

  return (
    <Typography
      sx={{
        pl: 2,
        borderLeftWidth: 2,
        borderLeftStyle: 'solid',
        borderLeftColor: 'InactiveBorder',
        '& + &': {mt: 2},
        ...sx,
      }}
      {...restOfProps}
    />
  )
}

type ExplanationsProps<T> = {
  data: T[]
  question: keyof T
  answer: string | string[]
  explanation: keyof T
}

const Explanations = <T,>({data, question, answer, explanation}: ExplanationsProps<T>) => {
  const {m} = useI18n()
  const {translateOption} = useKoboTranslations('meal_kiiCbpPam', {uk: 1, en: 0})

  // Normalize answer to array
  const answers = Array.isArray(answer) ? answer : [answer]

  // Find all explanations for records where any answer is present (even in arrays)
  const explanations = data
    .filter((record) => {
      const value = record[question]
      if (Array.isArray(value)) {
        return value.some((v) => answers.includes(v))
      }
      return answers.includes(value as string)
    })
    .map((record) => record[explanation] as string)
    .filter(Boolean)

  // Get labels for the answers
  const labels = translateOption(question as string)
  const answerLabels = answers.map((ans) => labels?.find((opt) => opt.value === ans)?.label ?? ans).join(', ')

  if (explanations.length === 0) return null

  return (
    <Box pt={1} gap={0.5} display="flex" flexDirection="column">
      <Typography>
        {m.mealMonitoringPdm.explanationsSubtitleFor} "{answerLabels}":
      </Typography>
      {explanations.map((explanation, index) => (
        <Quotation key={`${index}-${explanation}`} sx={{'& + &': {mt: 2}}}>
          {explanation}
        </Quotation>
      ))}
    </Box>
  )
}

export {Explanations, Quotation}
