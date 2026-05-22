import {Obj} from '@axanc/ts-utils'
import {KoboIndex} from 'infoportal-common'

const FORM_LABELS_DATA = Obj.entries(KoboIndex.namesIdsRecord).map(([name, formId]) => ({
  label: KoboIndex.byName(name).translation,
  formId,
}))

const FORMS_TO_PASS_AVG_HOUSEHOLD_SIZE_CALCULATION = [
  KoboIndex.byName('protection_counselling').id,
  KoboIndex.byName('protection_groupSession').id,
  KoboIndex.byName('protection_referral').id,
  KoboIndex.byName('protection_communityMonitoring').id,
  KoboIndex.byName('legal_individual_aid').id,
  KoboIndex.byName('shelter_commonSpaces').id,
  KoboIndex.byName('va_bio_tia').id,
  KoboIndex.byName('protection_gbv').id,
]

export {FORM_LABELS_DATA, FORMS_TO_PASS_AVG_HOUSEHOLD_SIZE_CALCULATION}
