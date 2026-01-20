import type {Seq} from '@axanc/ts-utils'

import {groupBy, Protection_pss, Person} from 'infoportal-common'

import type {ProtectionPssWithPersons, ProtectionPssWithPersonsFlat} from './types'

const prePostSummaryBuilder = (
  data?: Seq<ProtectionPssWithPersons>,
): Partial<Record<keyof Protection_pss.T, {pre: number; post: number; difference: number}>> | undefined => {
  if (data === undefined) return

  let count = 0

  const totals = data
    .filter(({type_testing}) => type_testing?.length === 2) // includes both 'pre' and 'post'
    .reduce(
      (
        accum,
        {
          cal_total_psychological_distress_pre,
          cal_total_psychological_distress_post,
          cal_total_psychological_distress_changes,

          cal_total_psycosocial_coping_pre,
          cal_total_psycosocial_coping_post,
          cal_total_psycosocial_coping_changes,

          cal_total_who_pre,
          cal_total_who_post,
          cal_total_who_changes,
        },
      ) => {
        count++

        return {
          cal_total_psychological_distress_pre: {
            pre: parseInt(cal_total_psychological_distress_pre, 10) + accum.cal_total_psychological_distress_pre.pre,
            post: parseInt(cal_total_psychological_distress_post, 10) + accum.cal_total_psychological_distress_pre.post,
            difference:
              parseInt(cal_total_psychological_distress_changes, 10) +
              accum.cal_total_psychological_distress_pre.difference,
          },

          cal_total_psycosocial_coping_pre: {
            pre: parseInt(cal_total_psycosocial_coping_pre, 10) + accum.cal_total_psycosocial_coping_pre.pre,
            post: parseInt(cal_total_psycosocial_coping_post, 10) + accum.cal_total_psycosocial_coping_pre.post,
            difference:
              parseInt(cal_total_psycosocial_coping_changes, 10) + accum.cal_total_psycosocial_coping_pre.difference,
          },

          cal_total_who_pre: {
            pre: parseInt(cal_total_who_pre, 10) + accum.cal_total_who_pre.pre,
            post: parseInt(cal_total_who_post, 10) + accum.cal_total_who_pre.post,
            difference: parseInt(cal_total_who_changes, 10) + accum.cal_total_who_pre.difference,
          },
        }
      },
      {
        cal_total_psychological_distress_pre: {pre: 0, post: 0, difference: 0},
        cal_total_psycosocial_coping_pre: {pre: 0, post: 0, difference: 0},
        cal_total_who_pre: {pre: 0, post: 0, difference: 0},
      },
    )

  // calculate average figures
  return Object.entries(totals).reduce(
    (accum, total) =>
      ({
        ...accum,
        [total[0]]: Object.entries(total[1]).reduce(
          (subAccum, subTotal) => ({...subAccum, [subTotal[0]]: subTotal[1] / count}),
          {},
        ),
      }) as const,
    {},
  )
}

const baseColors = ['#6b0606', '#a12222', '#cf5959']
const colorByQuestion: Record<string, string> = Object.fromEntries(
  ['pre', 'post', 'difference'].map((q, i) => [q, baseColors[i % baseColors.length]]),
)

const pickUnique = (data: Seq<ProtectionPssWithPersonsFlat>): Person.Details[] =>
  groupBy({
    data:
      data
        .flatMap(
          ({persons, id}) =>
            persons?.map((person) => ({
              ...(person as Person.Details & {code_beneficiary: string}),
              id,
            })) ?? [],
        )
        .compact() ?? [],
    groups: [
      {
        by: ({code_beneficiary}) => code_beneficiary!,
      },
    ],
    finalTransform: (input) =>
      input.flatMap(({age, gender, displacement, disability}) => ({age, gender, displacement, disability}))[0],
  }).transforms

export {colorByQuestion, prePostSummaryBuilder, pickUnique}
