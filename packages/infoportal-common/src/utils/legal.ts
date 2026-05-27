import {Legal_individual_aid} from '../kobo/generated/index.js'
import {DrcProgram} from '../type/Drc.js'

import {isDate} from './Common.js'

const pickPrioritizedAid = (
  aids: Legal_individual_aid.T['number_case'],
): {
  aid?: NonNullable<Legal_individual_aid.T['number_case']> extends Array<infer E> ? E : never
  activity?: DrcProgram
} => {
  if (aids === undefined) return {}

  const hlpAssistanceWithDoc: NonNullable<Legal_individual_aid.T['number_case']>[number] | undefined = aids.find(
    ({beneficiary_application_type, counselling_matter_documentation_yes, date_document_received_assistance}) => {
      return (
        beneficiary_application_type?.includes('assistance') &&
        counselling_matter_documentation_yes?.includes('hlp') &&
        isDate(date_document_received_assistance)
      )
    },
  )

  const hlpAssistance: NonNullable<Legal_individual_aid.T['number_case']>[number] | undefined = aids.find(
    ({beneficiary_application_type, category_issue, date_document_received_assistance}) => {
      return (
        beneficiary_application_type?.includes('assistance') &&
        category_issue === 'hlp' &&
        !isDate(date_document_received_assistance)
      )
    },
  )

  const civilAssistanceWithDoc: NonNullable<Legal_individual_aid.T['number_case']>[number] | undefined = aids.find(
    ({beneficiary_application_type, category_issue, date_document_received_assistance}) => {
      return (
        beneficiary_application_type?.includes('assistance') &&
        category_issue !== 'hlp' &&
        isDate(date_document_received_assistance)
      )
    },
  )

  const civilAssistance: NonNullable<Legal_individual_aid.T['number_case']>[number] | undefined = aids.find(
    ({beneficiary_application_type, category_issue, date_document_received_assistance}) => {
      return (
        beneficiary_application_type?.includes('assistance') &&
        category_issue !== 'hlp' &&
        !isDate(date_document_received_assistance)
      )
    },
  )

  if (hlpAssistanceWithDoc) return {aid: hlpAssistanceWithDoc, activity: DrcProgram.LegalAssistanceHlpDocs}

  if (hlpAssistance) return {aid: hlpAssistance, activity: DrcProgram.LegalAssistanceHlp}

  if (civilAssistanceWithDoc) return {aid: civilAssistanceWithDoc, activity: DrcProgram.LegalAssistanceCivilDocs}

  if (civilAssistance) return {aid: civilAssistance, activity: DrcProgram.LegalAssistanceCivil}

  return {aid: aids[0], activity: DrcProgram.LegalCounselling}
}

const getActivityType = ({
  beneficiary_application_type,
  category_issue,
  date_document_received_assistance,
  counselling_matter_documentation_yes,
}: NonNullable<Legal_individual_aid.T['number_case']>[number]): DrcProgram | undefined => {
  if (beneficiary_application_type?.includes('assistance') && category_issue === 'hlp') {
    return isDate(date_document_received_assistance) && counselling_matter_documentation_yes?.includes('hlp')
      ? DrcProgram.LegalAssistanceHlpDocs
      : DrcProgram.LegalAssistanceHlp
  }

  if (beneficiary_application_type?.includes('assistance') && category_issue !== 'hlp') {
    return isDate(date_document_received_assistance) &&
      counselling_matter_documentation_yes?.includes('civil_documentation')
      ? DrcProgram.LegalAssistanceCivilDocs
      : DrcProgram.LegalAssistanceCivil
  }

  return DrcProgram.LegalCounselling
}

export {getActivityType, pickPrioritizedAid}
