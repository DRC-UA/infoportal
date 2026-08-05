import {match, Obj, seq, groupsBy} from '@axanc/ts-utils'

import {DrcProject, Gbv_wgss_pdm, KoboIndex, Person, groupBy, safeNumber} from 'infoportal-common'

import type {EchoPmKoiRecord} from './types'

const echoAgeGroups = Obj.keys(Person.ageGroup.ECHO).filter((group) => group !== '0 - 4')

const gbvWgssAnswerMatcher = (answer: 'yes' | 'no' | 'pna' | 'partially' | undefined) => {
  return match(answer)
    .cases({
      yes: 'yes',
      partially: 'yes',
      no: 'no',
      pna: 'dk',
    } as const)
    .default('na')
}

const gbvWgssPdmMapper = (input: {data: Gbv_wgss_pdm.T[]}): EchoPmKoiRecord[] => {
  return input.data
    .filter(({project}) => project !== undefined && ['ukr000372_echo', 'ukr000423'].includes(project))
    .map(
      ({
        age,
        date_survey: date,
        project,
        safe_travelling: sdh1,
        staff_treated_respect: sdh2,
        satisfied_assistance_provided: mea1,
        channel_complaint: acc1,
        complaint_responded: acc2,
        staff_considerate_feedback: pem1,
        informed_service_available: pem2,
      }) => ({
        source: KoboIndex.byName('gbv_wgssPdm').id,
        gender: Person.Gender.Female,
        age: safeNumber(age),
        disability: undefined,
        date,
        project: match(project)
          .cases({
            ukr000372_echo: DrcProject['UKR-000372 ECHO3'],
            ukr000423: DrcProject['UKR-000423 ECHO4'],
          })
          .default(undefined),
        answers: {
          sdh1: gbvWgssAnswerMatcher(sdh1),
          sdh2: gbvWgssAnswerMatcher(sdh2),
          mea1: gbvWgssAnswerMatcher(mea1),
          mea2: gbvWgssAnswerMatcher(undefined),
          acc1: gbvWgssAnswerMatcher(acc1),
          acc2: gbvWgssAnswerMatcher(acc2),
          pem1: gbvWgssAnswerMatcher(pem1),
          pem2: gbvWgssAnswerMatcher(pem2),
        },
      }),
    )
}

const prepareTableData = (echoPmKoiRecords: EchoPmKoiRecord[]) => {
  const flattenedByQuestions = echoPmKoiRecords
    .map(({gender, age, disability, answers}) =>
      Object.entries(answers).map(([question, answer]) => ({gender, age, disability, question, answer})),
    )
    .flat()

  return {
    sampleSizes: Person.groupByGenderAndGroup(Person.ageGroup.ECHO)(echoPmKoiRecords),
    body: groupBy({
      data: flattenedByQuestions,
      groups: [{by: ({question}) => question}],
      finalTransform: (questionGroup, [question]) => {
        return groupBy({
          data: questionGroup,
          groups: [{by: ({answer}) => answer!}],
          finalTransform: (answerGroupData) =>
            groupBy({
              data: answerGroupData,
              groups: [{by: ({gender}) => gender!}],
              finalTransform: (genderGroupData) => {
                const ageGenderEchoGroups = Person.groupByGenderAndGroup(Person.ageGroup.ECHO)(genderGroupData)
                const ageGenderEchoEntries = Object.entries(ageGenderEchoGroups).map(([ageGroup, genderStats]) => [
                  ageGroup,
                  Object.values(genderStats)[0],
                ])

                return {
                  ...Object.fromEntries(ageGenderEchoEntries),
                  Disability: genderGroupData.count(({disability}) => !!disability),
                }
              },
            }).groups,
        }).groups
      },
    }).groups,
  }
}

const isUndefined = (input: unknown): boolean => {
  return input === undefined ? true : false
}

export {echoAgeGroups, gbvWgssPdmMapper, prepareTableData, isUndefined}
