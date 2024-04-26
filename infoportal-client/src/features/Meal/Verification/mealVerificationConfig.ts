import {ApiSdk} from '@/core/sdk/server/ApiSdk'
import {KeyOf, KoboId, KoboIndex} from '@infoportal-common'
import {KoboTypedAnswerSdk} from '@/core/sdk/server/kobo/KoboTypedAnswerSdk'
import {seq} from '@alexandreannic/ts-utils'

export const mealVerificationConf = {
  sampleSizeRatioDefault: .2,
  numericToleranceMargin: .1,
}

export type MealVerificationActivity<
  TData extends keyof ApiSdk['kobo']['typedAnswers'] = any,
  TCheck extends keyof ApiSdk['kobo']['typedAnswers'] = any,
> = {
  sampleSizeRatio: number,
  label: string
  id: string
  registration: {
    koboFormId: KoboId,
    fetch: TData
    filters?: (_: Awaited<ReturnType<KoboTypedAnswerSdk[TData]>>['data'][0]) => boolean
  }
  verification: {
    fetch: TCheck
    koboFormId: KoboId,
  },
  verifiedColumns: (KeyOf<Awaited<ReturnType<KoboTypedAnswerSdk[TCheck]>>['data'][0]> & KeyOf<Awaited<ReturnType<KoboTypedAnswerSdk[TData]>>['data'][0]>)[]
  joinColumn: (KeyOf<Awaited<ReturnType<KoboTypedAnswerSdk[TCheck]>>['data'][0]> & KeyOf<Awaited<ReturnType<KoboTypedAnswerSdk[TData]>>['data'][0]>)
  dataColumns?: KeyOf<Awaited<ReturnType<KoboTypedAnswerSdk[TData]>>['data'][0]>[]
}

const registerActivity = <
  TData extends keyof ApiSdk['kobo']['typedAnswers'],
  TCheck extends keyof ApiSdk['kobo']['typedAnswers'],
>(_: MealVerificationActivity<TData, TCheck>) => {
  return _
}

export const mealVerificationActivities = seq([
  registerActivity({
    sampleSizeRatio: .1,
    label: 'Training grants',
    id: 'Training grants',
    registration: {
      koboFormId: KoboIndex.byName('ecrec_trainingGrants').id,
      fetch: 'searchEcrec_trainingGrants',
    },
    verification: {
      koboFormId: KoboIndex.byName('meal_verificationEcrec').id,
      fetch: 'searchMeal_verificationEcrec',
    },
    joinColumn: 'ben_det_ph_number',
    dataColumns: [],
    verifiedColumns: [
      'back_consent',
      'back_consen_no_reas',
      'ben_det_surname',
      'ben_det_first_name',
      'ben_det_pat_name',
      'ben_det_ph_number',
      'ben_det_oblast',
      'ben_det_raion',
      'ben_det_hromada',
      // 'ben_det_settlement',
      'ben_det_res_stat',
      'ben_det_income',
      'ben_det_hh_size',
      'you_currently_employed',
      'you_currently_employed_no',
      'registered_training_facility',
      'registered_training_facility_yes',
      'training_activities_support',
      'training_activities_support_yes_paid',
      'training_activities_support_yes_consequence',
    ]
  }),
  registerActivity({
    sampleSizeRatio: .2,
    label: 'Cash for Fuel & Cash for Utilities',
    id: 'Cash for Fuel & Cash for Utilities',
    registration: {
      koboFormId: KoboIndex.byName('bn_re').id,
      fetch: 'searchBn_Re',
      filters: _ => !!(_.back_prog_type && [_.back_prog_type].flat().find(_ => /^c(sf|fu)/.test(_))),
    },
    verification: {
      koboFormId: KoboIndex.byName('meal_verificationWinterization').id,
      fetch: 'searchMeal_verificationWinterization',
    },
    joinColumn: 'pay_det_tax_id_num',
    dataColumns: [
      'back_enum',
      'back_donor',
      'back_prog_type',
    ],
    verifiedColumns: [
      'back_consent',
      'back_consen_no_reas',
      'ben_det_surname',
      'ben_det_first_name',
      'ben_det_pat_name',
      'ben_det_ph_number',
      'ben_det_oblast',
      'ben_det_raion',
      'ben_det_hromada',
      'ben_det_settlement',
      'ben_det_res_stat',
      'ben_det_prev_oblast',
      'ben_det_income',
      'ben_det_hh_size',
      'current_gov_assist_cff',
      'utilities_fuel',
      'mains_utilities',
      'mains_utilities_other',
      'mains_fuel',
      'mains_fuel_other',
      'functioning_fuel_delivery',
    ]
  }),
  registerActivity({
    sampleSizeRatio: .2,
    label: 'ECREC Cash Registration UHF',
    id: 'ECREC Cash Registration',
    registration: {
      koboFormId: KoboIndex.byName('ecrec_cashRegistration').id,
      fetch: 'searchEcrec_cashRegistration',
    },
    verification: {
      koboFormId: KoboIndex.byName('meal_verificationEcrec').id,
      fetch: 'searchMeal_verificationEcrec',
    },
    joinColumn: 'pay_det_tax_id_num',
    verifiedColumns: [
      // 'back_donor',
      'back_consent',
      // 'back_consent_no_note',
      'ben_det_surname',
      'ben_det_first_name',
      'ben_det_pat_name',
      'ben_det_ph_number',
      'ben_det_oblast',
      'ben_det_raion',
      'ben_det_hromada',
      'ben_det_settlement',
      'ben_det_res_stat',
      'ben_det_income',
      'ben_det_hh_size',
      'land_own',
      'land_cultivate',
      'not_many_livestock',
      'many_sheep_goat',
      'many_milking',
      'many_cow',
      'many_pig',
      'many_poultry',
    ],
    dataColumns: [
      'back_donor',
    ]
  }),
  registerActivity({
    sampleSizeRatio: .1,
    label: 'ECREC Cash Registration BHA',
    id: 'ECREC Cash Registration BHA',
    registration: {
      koboFormId: KoboIndex.byName('ecrec_cashRegistrationBha').id,
      fetch: 'searchEcrec_cashRegistrationBha',
    },
    verification: {
      koboFormId: KoboIndex.byName('meal_verificationEcrec').id,
      fetch: 'searchMeal_verificationEcrec',
    },
    joinColumn: 'pay_det_tax_id_num',
    verifiedColumns: [
      'back_consent',
      'ben_det_surname',
      'ben_det_first_name',
      'ben_det_pat_name',
      'ben_det_ph_number',
      'ben_det_oblast',
      'ben_det_raion',
      'ben_det_hromada',
      'ben_det_settlement',
      'ben_det_res_stat',
      'ben_det_income',
      'ben_det_hh_size',
      'has_agriculture_exp',
      'depend_basic_needs',
      'consume_majority',
      'land_cultivate',
    ]
  }),
])

export const mealVerificationActivitiesIndex = mealVerificationActivities.groupByFirst(_ => _.id)
