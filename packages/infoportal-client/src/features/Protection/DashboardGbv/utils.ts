import {match, type Seq} from '@axanc/ts-utils'

import {groupBy, Protection_gbv_concepts_pre_post, KoboBaseTags, KoboSubmissionFlat} from 'infoportal-common'

import type {Scores} from './types'

type TestResult = {
  type: 'pre' | 'post'
  score: string | undefined
}

const groupTrainingsByTopic = (
  data: Seq<KoboSubmissionFlat<Protection_gbv_concepts_pre_post.T, KoboBaseTags>> | undefined,
) => {
  if (!data) return

  return groupBy({
    data,
    groups: [{by: ({topic}) => topic!}, {by: ({unique_code}) => unique_code!}],
    finalTransform: (group): Seq<{type: 'pre' | 'post'; score: string | undefined}> =>
      group.map(
        ({
          topic,
          complete_training,
          cal_total_crsv,
          cal_total_gbv_core_concepts,
          cal_total_gbv_core_concepts_001,
          cal_total_girl_shine,
          cal_total_minimum_standards_gbv_emergencies,
          cal_total_promoting_gender_equality,
          cal_total_protection_gbv_im,
          score_gbv_ipv,
          cm_quiz_score,
        }) => ({
          type: complete_training === 'yes' ? 'post' : 'pre',
          score: match(topic)
            .cases({
              crsv: cal_total_crsv,
              gbv_advanced_concepts_intimate: undefined,
              gbv_basic_concepts_intimate: undefined,
              gbv_case_management: cm_quiz_score,
              gbv_core_concepts: cal_total_gbv_core_concepts,
              gbv_ipv: score_gbv_ipv,
              girl_shine: cal_total_girl_shine,
              legal_aspects_gbv: cal_total_gbv_core_concepts_001,
              minimum_standards_gbv_emergencies: cal_total_minimum_standards_gbv_emergencies,
              promoting_gender_equality: cal_total_promoting_gender_equality,
              protection_gbv_im: cal_total_protection_gbv_im,
            })
            .default(undefined),
        }),
      ),
  }).groups
}

const sanitizeTests = (tests: TestResult[]) => {
  return tests.reduce(
    (accum, current) => {
      const preTests = tests.filter(({type}) => type === 'pre')
      const postTests = tests.filter(({type}) => type === 'post')
      const missingScore = tests.some(({score}) => score === undefined)

      if (preTests.length !== 1 || postTests.length !== 1 || missingScore) {
        return {
          issues: true,
        } as const
      }

      if (current.type === 'pre') {
        return {...accum, pre: Number(current.score)}
      } else if (current.type === 'post') {
        return {...accum, post: Number(current.score)}
      }

      return accum
    },
    {} as
      | {
          pre: number
          post: number
        }
      | {
          issues: true
        },
  )
}

const baseColors = ['#6b0606', '#a12222', '#cf5959']

const colorByQuestion: Record<string, string> = Object.fromEntries(
  ['pre', 'post', 'difference'].map((q, i) => [q, baseColors[i % baseColors.length]]),
)

const meanCounter = (data: Seq<Scores>) => {
  const count = data.length
  const meanPre = data.map(({pre}) => pre).sum() / count
  const meanPost = data.map(({post}) => post).sum() / count

  return {pre: meanPre, post: meanPost, difference: meanPost - meanPre}
}

export {colorByQuestion, groupTrainingsByTopic, meanCounter, sanitizeTests}
