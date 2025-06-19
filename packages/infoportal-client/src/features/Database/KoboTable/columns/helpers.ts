import {KoboIndex} from 'infoportal-common'
import type {Ecrec_small_scale, Ecrec_subsistance} from 'infoportal-common/kobo/generated'

const ecrec_small_scale = new Set<keyof Ecrec_small_scale.T>([
  'cal_eligibility',
  'cal_tot_vulnerability',
  'calc_tot_dis',
  'cal_tot_idp',
  'cal_tot_idp_less_1y',
  'cal_tot_idp_more_1y',
  'cal_tot_long_res',
  'cal_tot_ret',
] as const)

const ecrec_subsistance = new Set<keyof Ecrec_subsistance.T>([
  'calc_tot_dis',
  'cal_tot_chronic_disease',
  'cal_tot_idp',
  'cal_tot_idp_less_1y',
  'cal_tot_idp_more_1y',
  'cal_tot_long_res',
  'cal_tot_ret',
] as const)

const dictionary: Record<string, Set<string>> = {
  ecrec_small_scale,
  ecrec_subsistance,
}

const isCalculateNumeric = (formId: string, fieldName: string): boolean => {
  return dictionary[KoboIndex.searchById(formId)?.name as string]?.has(fieldName) ?? false
}

export {isCalculateNumeric}
