import {KeyOf, KoboId, KoboIndex} from 'infoportal-common'
import {seq} from '@alexandreannic/ts-utils'
import {InferTypedAnswer, KoboFormNameMapped} from '@/core/sdk/server/kobo/KoboTypedAnswerSdk'

export const mealVerificationConf = {
  sampleSizeRatioDefault: .2,
  numericToleranceMargin: .1,
}

export type MealVerificationActivity<
  TReg extends KoboFormNameMapped = any,
  TVerif extends KoboFormNameMapped = any,
> = {
  sampleSizeRatio: number,
  label: string
  id: string
  // /** @deprecated*/
  // registration: {
  //   koboFormId: KoboId,
  //   fetch: TReg
  //   filters?: (_: InferTypedAnswer<TReg>) => boolean
  //   joinColumn: (KeyOf<InferTypedAnswer<TReg>>)
  // }
  // /** @deprecated*/
  // verification: {
  //   fetch: TVerif
  //   koboFormId: KoboId,
  //   joinColumn: (KeyOf<InferTypedAnswer<TVerif>>)
  // },
  registration: {
    koboFormId: KoboId,
    fetch: TReg
    filters?: (_: InferTypedAnswer<TReg>) => boolean
    joinBy: (_: InferTypedAnswer<TReg>) => string | number
  }
  verification: {
    fetch: TVerif
    koboFormId: KoboId,
    joinBy: (_: InferTypedAnswer<TVerif>) => string | number
  },
  verifiedColumns: Record<string, {reg: (_: InferTypedAnswer<TReg>) => any, verif: (_: InferTypedAnswer<TVerif>) => any}>
  // verifiedColumns: (KeyOf<InferTypedAnswer<TVerif>> & KeyOf<InferTypedAnswer<TReg>>)[]
  // joinColumn: (KeyOf<InferTypedAnswer<TCheck>> & KeyOf<InferTypedAnswer<TData>>)
  dataColumns?: KeyOf<InferTypedAnswer<TReg>>[]
}

const registerActivity = <
  TData extends KoboFormNameMapped,
  TCheck extends KoboFormNameMapped,
>(_: MealVerificationActivity<TData, TCheck>) => {
  return _
}

export const mealVerificationActivities = seq([
  registerActivity({
    sampleSizeRatio: .1,
    label: 'EC-REC Sectoral Cash for Businesses BHA',
    id: 'MSME',
    registration: {
      koboFormId: KoboIndex.byName('ecrec_msmeGrantEoi').id,
      fetch: 'ecrec_msmeGrantEoi',
      joinBy: _ => _.ben_det_tax_id_num!,
    },
    verification: {
      koboFormId: KoboIndex.byName('meal_verificationEcrec').id,
      joinBy: _ => _.pay_det_tax_id_num!,
      fetch: 'meal_verificationEcrec',
    },
    dataColumns: [],
    verifiedColumns: {},
    //   'back_consent',
    //   'back_consen_no_reas',
    //   'ben_det_surname',
    //   'ben_det_first_name',
    //   'ben_det_pat_name',
    //   'ben_det_ph_number',
    //   'ben_det_oblast',
    //   'ben_det_raion',
    //   'ben_det_hromada',
    //   // 'ben_det_settlement',
    //   'ben_det_res_stat',
    //   'ben_det_income',
    //   'ben_det_hh_size',
    // ]
  }),
  registerActivity({
    sampleSizeRatio: .1,
    label: 'VET - Training grants',
    id: 'Training grants',
    registration: {
      koboFormId: KoboIndex.byName('ecrec_vetApplication').id,
      fetch: 'ecrec_vetApplication',
      joinBy: _ => _.ben_det_ph_number!,
    },
    verification: {
      koboFormId: KoboIndex.byName('meal_verificationEcrec').id,
      fetch: 'meal_verificationEcrec',
      joinBy: _ => _.ben_det_ph_number!,
    },
    dataColumns: [],
    verifiedColumns: {},
    //   'back_consent',
    //   'back_consen_no_reas',
    //   'ben_det_surname',
    //   'ben_det_first_name',
    //   'ben_det_pat_name',
    //   'ben_det_ph_number',
    //   'ben_det_oblast',
    //   'ben_det_raion',
    //   'ben_det_hromada',
    //   // 'ben_det_settlement',
    //   'ben_det_res_stat',
    //   'ben_det_income',
    //   'ben_det_hh_size',
    //   'you_currently_employed',
    //   'you_currently_employed_no',
    //   'registered_training_facility',
    //   'registered_training_facility_yes',
    //   'training_activities_support',
    //   'training_activities_support_yes_paid',
    //   'training_activities_support_yes_consequence',
    // ]
  }),
  registerActivity({
    sampleSizeRatio: .2,
    label: 'Cash for Fuel & Cash for Utilities',
    id: 'Cash for Fuel & Cash for Utilities',
    registration: {
      koboFormId: KoboIndex.byName('bn_re').id,
      fetch: 'bn_re',
      filters: _ => !!(_.back_prog_type && [_.back_prog_type].flat().find(_ => /^c(sf|fu)/.test(_))),
      joinBy: _ => _.pay_det_tax_id_num!,
    },
    verification: {
      koboFormId: KoboIndex.byName('meal_verificationWinterization').id,
      fetch: 'meal_verificationWinterization',
      joinBy: _ => _.pay_det_tax_id_num!,
    },
    dataColumns: [
      'back_enum',
      'back_donor',
      'back_prog_type',
    ],
    verifiedColumns: {
      back_consent: {reg: _ => _.back_consent, verif: _ => _.back_consent},
      back_consen_no_reas: {reg: _ => _.back_consen_no_reas, verif: _ => _.back_consen_no_reas},
      ben_det_surname: {reg: _ => _.ben_det_surname, verif: _ => _.ben_det_surname},
      ben_det_first_name: {reg: _ => _.ben_det_first_name, verif: _ => _.ben_det_first_name},
      ben_det_pat_name: {reg: _ => _.ben_det_pat_name, verif: _ => _.ben_det_pat_name},
      ben_det_ph_number: {reg: _ => _.ben_det_ph_number, verif: _ => _.ben_det_ph_number},
      ben_det_oblast: {reg: _ => _.ben_det_oblast, verif: _ => _.ben_det_oblast},
      ben_det_raion: {reg: _ => _.ben_det_raion, verif: _ => _.ben_det_raion},
      ben_det_hromada: {reg: _ => _.ben_det_hromada, verif: _ => _.ben_det_hromada},
      ben_det_settlement: {reg: _ => _.ben_det_settlement, verif: _ => _.ben_det_settlement},
      ben_det_res_stat: {reg: _ => _.ben_det_res_stat, verif: _ => _.ben_det_res_stat},
      ben_det_prev_oblast: {reg: _ => _.ben_det_prev_oblast, verif: _ => _.ben_det_prev_oblast},
      ben_det_income: {reg: _ => _.ben_det_income, verif: _ => _.ben_det_income},
      ben_det_hh_size: {reg: _ => _.ben_det_hh_size, verif: _ => _.ben_det_hh_size},
      current_gov_assist_cff: {reg: _ => _.current_gov_assist_cff, verif: _ => _.current_gov_assist_cff},
      utilities_fuel: {reg: _ => _.utilities_fuel, verif: _ => _.utilities_fuel},
      mains_utilities: {reg: _ => _.mains_utilities, verif: _ => _.mains_utilities},
      mains_utilities_other: {reg: _ => _.mains_utilities_other, verif: _ => _.mains_utilities_other},
      mains_fuel: {reg: _ => _.mains_fuel, verif: _ => _.mains_fuel},
      mains_fuel_other: {reg: _ => _.mains_fuel_other, verif: _ => _.mains_fuel_other},
      functioning_fuel_delivery: {reg: _ => _.functioning_fuel_delivery, verif: _ => _.functioning_fuel_delivery},
    },
    // verifiedColumns: [
    //   'back_consent',
    //   'back_consen_no_reas',
    //   'ben_det_surname',
    //   'ben_det_first_name',
    //   'ben_det_pat_name',
    //   'ben_det_ph_number',
    //   'ben_det_oblast',
    //   'ben_det_raion',
    //   'ben_det_hromada',
    //   'ben_det_settlement',
    //   'ben_det_res_stat',
    //   'ben_det_prev_oblast',
    //   'ben_det_income',
    //   'ben_det_hh_size',
    //   'current_gov_assist_cff',
    //   'utilities_fuel',
    //   'mains_utilities',
    //   'mains_utilities_other',
    //   'mains_fuel',
    //   'mains_fuel_other',
    //   'functioning_fuel_delivery',
    // ]
  }),
  registerActivity({
    sampleSizeRatio: .2,
    label: 'ECREC Cash Registration UHF',
    id: 'ECREC Cash Registration',
    registration: {
      koboFormId: KoboIndex.byName('ecrec_cashRegistration').id,
      fetch: 'ecrec_cashRegistration',
      joinBy: _ => _.pay_det_tax_id_num!,
    },
    verification: {
      koboFormId: KoboIndex.byName('meal_verificationEcrec').id,
      fetch: 'meal_verificationEcrec',
      joinBy: _ => _.pay_det_tax_id_num!,
    },
    verifiedColumns: {},
    // 'back_consent',
    // 'ben_det_surname',
    // 'ben_det_ph_number',
    // 'ben_det_first_name',
    // 'ben_det_pat_name',
    // 'ben_det_oblast',
    // 'ben_det_raion',
    // 'ben_det_hromada',
    // 'ben_det_settlement',
    // 'ben_det_res_stat',
    // 'ben_det_income',
    // 'ben_det_hh_size',
    // 'land_own',
    // 'land_cultivate',
    // 'not_many_livestock',
    // 'many_sheep_goat',
    // 'many_milking',
    // 'many_cow',
    // 'many_pig',
    // 'many_poultry',
    // ],
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
      fetch: 'ecrec_cashRegistrationBha',
      joinBy: _ => _.pay_det_tax_id_num!,
    },
    verification: {
      koboFormId: KoboIndex.byName('meal_verificationEcrec').id,
      fetch: 'meal_verificationEcrec',
      joinBy: _ => _.pay_det_tax_id_num!,
    },
    verifiedColumns: {},
    //   'back_consent',
    //   'ben_det_surname',
    //   'ben_det_first_name',
    //   'ben_det_pat_name',
    //   'ben_det_ph_number',
    //   'ben_det_oblast',
    //   'ben_det_raion',
    //   'ben_det_hromada',
    //   'ben_det_settlement',
    //   'ben_det_res_stat',
    //   'ben_det_income',
    //   'ben_det_hh_size',
    //   'has_agriculture_exp',
    //   'depend_basic_needs',
    //   'consume_majority',
    //   'land_cultivate',
    // ]
  }),
])

export const mealVerificationActivitiesIndex = mealVerificationActivities.groupByFirst(_ => _.id)
