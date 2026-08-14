import {match, Obj} from '@axanc/ts-utils'

import {DrcProject, Gbv_wgss_pdm, KoboIndex, Meal_pssPdm, Person, groupBy, safeNumber} from 'infoportal-common'

import type {EchoPmKoiRecord} from './types'

const echoAgeGroups = Obj.keys(Person.ageGroup.ECHO).filter((group) => group !== '0 - 4')

const gbvWgssAnswerMatcher = (
  answer:
    | 'yes_completely'
    | 'mostly_yes'
    | 'yes'
    | 'no'
    | 'not_all'
    | 'no_complaints'
    | 'not_really'
    | 'pna'
    | 'na'
    | 'dk'
    | 'partially'
    | undefined,
) => {
  return match(answer)
    .cases({
      yes_completely: 'yes',
      mostly_yes: 'yes',
      yes: 'yes',
      partially: 'yes',
      no: 'no',
      not_really: 'no',
      not_all: 'no',
      no_complaints: 'no',
      pna: 'dk',
      dk: 'dk',
      na: 'na',
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

const pssPdmMapper = (input: {data: Meal_pssPdm.T[]}): EchoPmKoiRecord[] => {
  return input.data
    .filter(({gido: project}) => project !== undefined && project.includes('_echo'))
    .map(
      ({
        giage: age,
        gis: gender,
        gid: date,
        gido: project,
        qdy: sdh1,
        qda: sdh2,
        satisfied_activities_provided: mea1,
        know_people_needing_pss: mea2,
        know_where_address_suggestions: acc1,
        suggestions_complaints_responded: acc2,
        feel_integrated_activity: pem1,
        well_informed_service: pem2,
      }) => ({
        source: KoboIndex.byName('meal_pssPdm').id,
        gender: match(gender)
          .cases({
            female: Person.Gender.Female,
            male: Person.Gender.Male,
          })
          .default(Person.Gender.Other),
        age: safeNumber(age),
        disability: undefined,
        date,
        project: match(project)
          .cases({
            ukr000322_echo2: DrcProject['UKR-000322 ECHO2'],
            ukr000372_echo3: DrcProject['UKR-000372 ECHO3'],
            ukr000423_echo4: DrcProject['UKR-000423 ECHO4'],
            ukr000462_echo: DrcProject['UKR-000462 ECHO'],
          })
          .default(undefined),
        answers: {
          sdh1: gbvWgssAnswerMatcher(sdh1),
          sdh2: gbvWgssAnswerMatcher(sdh2),
          mea1: gbvWgssAnswerMatcher(mea1),
          mea2: gbvWgssAnswerMatcher(mea2),
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

export {echoAgeGroups, gbvWgssPdmMapper, prepareTableData, pssPdmMapper, isUndefined}
