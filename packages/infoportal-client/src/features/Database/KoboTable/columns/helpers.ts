import {KoboIndex} from 'infoportal-common'
import type {Ecrec_small_scale, Ecrec_subsistance, Ecrec_msmeGrantReg} from 'infoportal-common/kobo/generated'

const dictionary: Partial<Record<(typeof KoboIndex.names)[number], Set<string>>> = {
  ecrec_small_scale: new Set<keyof Ecrec_small_scale.T>([
    'cal_eligibility',
    'cal_tot_vulnerability',
    'calc_tot_dis',
    'cal_tot_idp',
    'cal_tot_idp_less_1y',
    'cal_tot_idp_more_1y',
    'cal_tot_long_res',
    'cal_tot_ret',
  ] as const),
  ecrec_subsistance: new Set<keyof Ecrec_subsistance.T>([
    'calc_tot_dis',
    'cal_tot_chronic_disease',
    'cal_tot_idp',
    'cal_tot_idp_less_1y',
    'cal_tot_idp_more_1y',
    'cal_tot_long_res',
    'cal_tot_ret',
    'cal_tot_vulnerability',
  ] as const),
  ecrec_msmeGrantReg: new Set<keyof Ecrec_msmeGrantReg.T>(['cal_scoring_business', 'cal_total_vulnerability'] as const),
}

const isCalculateNumeric = (formId: string, fieldName: string): boolean => {
  return dictionary[KoboIndex.searchById(formId)?.name!]?.has(fieldName) ?? false
}

export {isCalculateNumeric}
