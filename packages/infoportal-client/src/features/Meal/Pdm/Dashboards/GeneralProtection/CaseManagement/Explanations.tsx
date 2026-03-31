import type {FC} from 'react'
import {Box, Icon, Typography, TypographyProps} from '@mui/material'

import {Gp_case_management} from 'infoportal-common'

import {useKoboTranslations} from '@/utils/hooks'
import {useI18n} from '@/core/i18n'

const ANSWER_KEYS = [
  'yes',
  'no',
  'completely',
  'somewhat',
  'not_all',
  'not_answer',
  'increased',
  'not_changed',
  'decreased',
] as const
type AnswerKey = (typeof ANSWER_KEYS)[number]

type QuestionsExplanations = {
  question:
    | 'option_support_person'
    | 'services_accessible_location'
    | 'accessible_operating_hours'
    | 'information_services_available'
    | 'satisfied_caseworke_knowledge'
    | 'service_meet_expectations'
    | 'comfortable_talking_caseworker'
    | 'caseworker_supported_decisions'
    | 'pressured_time_caseworker'
    | 'views_case_management'
    | 'caseworker_communication_skills'
    | 'comfortable_staff_members'
    | 'channel_suggestion_complaint'
    | 'made_complaint_responded'
    | 'caseworker_agreed_contact'
    | 'staff_treated_respect'
    | 'extent_problem_addressed'
    | 'ability_solve_problems'
    | 'overall_satisfied_services'

  explanation:
    | 'option_support_person_explain'
    | 'services_accessible_location_explain'
    | 'accessible_operating_hours_explain'
    | 'information_services_available_explain'
    | 'satisfied_caseworke_knowledge_explain'
    | 'service_meet_expectations_explain'
    | 'comfortable_talking_caseworker_explain'
    | 'caseworker_supported_decisions_explain'
    | 'pressured_time_caseworker_yes'
    | 'views_case_management_no'
    | 'caseworker_communication_skills_explain'
    | 'comfortable_staff_members_explain'
    | 'channel_suggestion_complaint_explain'
    | 'made_complaint_responded_no'
    | 'caseworker_agreed_contact_explain'
    | 'staff_treated_respect_no'
    | 'extent_problem_addressed_explain'
    | 'ability_solve_problems_001'
    | 'overall_satisfied_services_explain'
}

const extractExplanations = (
  input: Gp_case_management.T[],
  {question, explanation}: QuestionsExplanations,
): Partial<Record<AnswerKey, string[]>> => {
  return input
    .filter(
      (record) =>
        record[question] !== undefined && record[explanation] !== undefined && ANSWER_KEYS.includes(record[question]),
    )
    .map((record) => ({answer: record[question]!, explanation: record[explanation]}))
    .reduce(
      (accum, current) => ({
        ...accum,
        [current.answer]: [current.explanation, ...(accum[current.answer] ?? [])],
      }),
      {} as Partial<Record<AnswerKey, string[]>>,
    )
}

const Quotation: FC<TypographyProps> = (props) => (
  <Typography
    sx={{pl: 2, borderLeftWidth: 2, borderLeftStyle: 'solid', borderLeftColor: 'InactiveBorder'}}
    {...props}
  />
)

const Explanations: FC<{
  data: Gp_case_management.T[]
  question: QuestionsExplanations['question']
  explanation: QuestionsExplanations['explanation']
}> = ({data, question, explanation}) => {
  const {m} = useI18n()
  const {translateOption} = useKoboTranslations('gp_case_management', {uk: 1, en: 0})
  const translateLabels = (option: string) =>
    translateOption(option)?.reduce(
      (result, {value, label}) => ({
        ...result,
        [value]: label,
      }),
      {} as Record<string, string>,
    )
  const answersExplanationsMap = extractExplanations(data, {
    question,
    explanation,
  })

  return Object.entries(answersExplanationsMap).map(([answer, explanations]) => (
    <Box key={`${question} - ${answer}`} pt={1} gap={0.5} display="flex" flexDirection="column">
      <Typography>
        {m.mealMonitoringPdm.explanationsSubtitleFor} "{translateLabels(question)?.[answer]}":
      </Typography>
      {explanations.map((explanation, index) => (
        <Quotation key={`${index}-${explanation}`}>{explanation}</Quotation>
      ))}
    </Box>
  ))
}

const MissingData: FC = () => {
  const {m} = useI18n()

  return (
    <Box
      sx={{
        textAlign: 'center',
        mt: 2,
        color: (t) => t.palette.text.disabled,
      }}
    >
      <Icon sx={{fontSize: '3em !important'}}>block</Icon>
      <Box>{m.noDataAtm}</Box>
    </Box>
  )
}

export {Explanations, MissingData, Quotation}
