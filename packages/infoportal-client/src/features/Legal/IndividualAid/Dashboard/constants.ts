import {Legal_individual_aid} from 'infoportal-common'

const civic_doc_date_fields = [
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

const hlp_doc_date_fields = [
  'date_recipt_ownership_documents_housing',
  'date_recipt_ownership_documents_land',
] as const satisfies readonly (keyof NonNullable<Legal_individual_aid.T['number_case']>[number])[]

export {civic_doc_date_fields, hlp_doc_date_fields}
