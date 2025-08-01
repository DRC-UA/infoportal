import {Legal_individual_aid} from '../kobo/generated'
import {DrcProgram} from '../type/Drc'

import {isDate} from './Common'

const civilDocDateFields = [
  'date_recipt_personal_identity',
  'date_recipt_personal_territorial',
  'date_recipt_personal_education',
  'date_recipt_personal_other',
  'date_recipt_citizenship_confirming',
  'date_recipt_citizenship_stateless',
  'date_recipt_citizenship_extending',
  'date_recipt_citizenship_other',
  'date_recipt_civil_birth',
  'date_recipt_civil_death',
  'date_recipt_civil_marriage',
  'date_recipt_civil_adoption',
  'date_recipt_civil_other',
  'date_recipt_statuses_idp',
  'date_recipt_statuses_affected_child',
  'date_recipt_statuses_general_disability',
  'date_recipt_statuses_disability_civilians',
  'date_recipt_statuses_disability_veterans',
  'date_recipt_statuses_prisoner_status',
  'date_recipt_statuses_appointment',
  'date_recipt_statuses_chernobyl_disaster',
  'date_recipt_statuses_pension_certificate',
  'date_recipt_statuses_many_children',
  'date_recipt_statuses_other',
] as const satisfies readonly (keyof NonNullable<Legal_individual_aid.T['number_case']>[number])[]

const hlpDocDateFields = [
  'date_recipt_ownership_documents_housing',
  'date_recipt_ownership_documents_land',
] as const satisfies readonly (keyof NonNullable<Legal_individual_aid.T['number_case']>[number])[]

const pickPrioritizedAid = (
  aids: Legal_individual_aid.T['number_case'],
): {
  aid?: NonNullable<Legal_individual_aid.T['number_case']> extends Array<infer E> ? E : never
  activity?: DrcProgram
} => {
  if (aids === undefined) return {}

  const hlpAssistanceWithDoc = aids.find(({beneficiary_application_type, ...aid}) => {
    return (
      beneficiary_application_type === 'assistance' &&
      hlpDocDateFields.some((field) => {
        return isDate(aid[field])
      })
    )
  })

  const hlpAssistance = aids.find(({beneficiary_application_type, category_issue, ...aid}) => {
    return (
      beneficiary_application_type === 'assistance' &&
      category_issue === 'hlp' &&
      !hlpDocDateFields.some((field) => {
        return isDate(aid[field])
      })
    )
  })

  const civilAssistanceWithDoc = aids.find(({beneficiary_application_type, ...aid}) => {
    return beneficiary_application_type === 'assistance' && civilDocDateFields.some((field) => isDate(aid[field]))
  })

  const civilAssistance = aids.find(({beneficiary_application_type, category_issue, ...aid}) => {
    return beneficiary_application_type === 'assistance' && category_issue !== 'hlp'
  })

  if (hlpAssistanceWithDoc) return {aid: hlpAssistanceWithDoc, activity: DrcProgram.LegalAssistanceHlpDocs}

  if (hlpAssistance) return {aid: hlpAssistance, activity: DrcProgram.LegalAssistanceHlp}

  if (civilAssistanceWithDoc) return {aid: civilAssistanceWithDoc, activity: DrcProgram.LegalAssistanceCivilDocs}

  if (civilAssistance) return {aid: civilAssistance, activity: DrcProgram.LegalAssistanceCivil}

  return {aid: aids[0], activity: DrcProgram.LegalCounselling}
}

const getActivityType = (aid: NonNullable<Legal_individual_aid.T['number_case']>[number]): DrcProgram | undefined => {
  if (aid === undefined) return undefined

  if (aid.beneficiary_application_type === 'assistance' && aid.category_issue === 'hlp') {
    return hlpDocDateFields.some((field) => typeof aid[field] === 'string')
      ? DrcProgram.LegalAssistanceHlpDocs
      : DrcProgram.LegalAssistanceHlp
  }

  if (aid.beneficiary_application_type === 'assistance' && aid.category_issue === 'general_protection') {
    return civilDocDateFields.some((field) => typeof aid[field] === 'string')
      ? DrcProgram.LegalAssistanceCivilDocs
      : DrcProgram.LegalAssistanceCivil
  }

  return DrcProgram.LegalCounselling
}

export {civilDocDateFields, getActivityType, hlpDocDateFields, pickPrioritizedAid}
