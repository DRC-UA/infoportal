import {KeyOf, KoboId, KoboIndex, KoboSchemaHelper} from 'infoportal-common'
import {seq} from '@alexandreannic/ts-utils'
import {InferTypedAnswer, KoboFormNameMapped} from '@/core/sdk/server/kobo/KoboTypedAnswerSdk'

export const mealVerificationConf = {
  sampleSizeRatioDefault: .2,
  numericToleranceMargin: .1,
}

export type VerifiedColumnsMapping<
  TReg extends KoboFormNameMapped = any,
  TVerif extends KoboFormNameMapped = any,
> = {
  reg: (_: InferTypedAnswer<TReg>, schema: KoboSchemaHelper.Bundle) => any,
  verif: (_: InferTypedAnswer<TVerif>, schema: KoboSchemaHelper.Bundle) => any
}

export const MEAL_VERIF_AUTO_MAPPING = 'AUTO_MAPPING'

export type MealVerificationActivity<
  TReg extends KoboFormNameMapped = any,
  TVerif extends KoboFormNameMapped = any,
> = {
  sampleSizeRatio: number,
  label: string
  id: string
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
  dataColumns?: KeyOf<InferTypedAnswer<TReg>>[]
  verifiedColumns: {
    [K in KeyOf<InferTypedAnswer<TVerif>>]?: VerifiedColumnsMapping<TReg, TVerif> | typeof MEAL_VERIF_AUTO_MAPPING;
  }
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
    verifiedColumns: {
      back_consent: 'AUTO_MAPPING',
      back_consen_no_reas: 'AUTO_MAPPING',
      ben_det_surname: 'AUTO_MAPPING',
      ben_det_first_name: 'AUTO_MAPPING',
      ben_det_pat_name: 'AUTO_MAPPING',
      ben_det_ph_number: 'AUTO_MAPPING',
      ben_det_oblast: 'AUTO_MAPPING',
      ben_det_raion: 'AUTO_MAPPING',
      ben_det_hromada: 'AUTO_MAPPING',
      ben_det_res_stat: 'AUTO_MAPPING',
      ben_det_income: 'AUTO_MAPPING',
      ben_det_hh_size: 'AUTO_MAPPING',
      // 'ben_det_settlement': 'MEAL_VERIF_AUTO_MAPPING
    }
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
    verifiedColumns: {
      back_consent: 'AUTO_MAPPING',
      back_consen_no_reas: 'AUTO_MAPPING',
      ben_det_surname: 'AUTO_MAPPING',
      ben_det_first_name: 'AUTO_MAPPING',
      ben_det_pat_name: 'AUTO_MAPPING',
      ben_det_ph_number: 'AUTO_MAPPING',
      ben_det_oblast: 'AUTO_MAPPING',
      ben_det_raion: 'AUTO_MAPPING',
      ben_det_hromada: 'AUTO_MAPPING',
      ben_det_res_stat: 'AUTO_MAPPING',
      ben_det_income: 'AUTO_MAPPING',
      ben_det_hh_size: 'AUTO_MAPPING',
      you_currently_employed: 'AUTO_MAPPING',
      you_currently_employed_no: 'AUTO_MAPPING',
      registered_training_facility: 'AUTO_MAPPING',
      registered_training_facility_yes: 'AUTO_MAPPING',
      training_activities_support: 'AUTO_MAPPING',
      training_activities_support_yes_paid: 'AUTO_MAPPING',
      training_activities_support_yes_consequence: 'AUTO_MAPPING',
      // 'ben_det_settlement',
    }
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
      back_consent: 'AUTO_MAPPING',
      back_consen_no_reas: 'AUTO_MAPPING',
      ben_det_surname: 'AUTO_MAPPING',
      ben_det_first_name: 'AUTO_MAPPING',
      ben_det_pat_name: 'AUTO_MAPPING',
      ben_det_ph_number: 'AUTO_MAPPING',
      ben_det_oblast: 'AUTO_MAPPING',
      ben_det_raion: 'AUTO_MAPPING',
      ben_det_hromada: 'AUTO_MAPPING',
      ben_det_settlement: 'AUTO_MAPPING',
      ben_det_res_stat: 'AUTO_MAPPING',
      ben_det_prev_oblast: 'AUTO_MAPPING',
      ben_det_income: 'AUTO_MAPPING',
      ben_det_hh_size: 'AUTO_MAPPING',
      current_gov_assist_cff: 'AUTO_MAPPING',
      utilities_fuel: 'AUTO_MAPPING',
      mains_utilities: 'AUTO_MAPPING',
      mains_utilities_other: 'AUTO_MAPPING',
      mains_fuel: 'AUTO_MAPPING',
      // mains_fuel: {
      //   reg: (_, sch) => handleMultiSelect(_, 'mains_fuel', sch),
      //   verif: (_, sch) => handleMultiSelect(_, 'mains_fuel', sch)
      // },
      mains_fuel_other: 'AUTO_MAPPING',
    },
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
    verifiedColumns: {
      back_consent: 'AUTO_MAPPING',
      ben_det_surname: 'AUTO_MAPPING',
      ben_det_ph_number: 'AUTO_MAPPING',
      ben_det_first_name: 'AUTO_MAPPING',
      ben_det_pat_name: 'AUTO_MAPPING',
      ben_det_oblast: 'AUTO_MAPPING',
      ben_det_raion: 'AUTO_MAPPING',
      ben_det_hromada: 'AUTO_MAPPING',
      ben_det_settlement: 'AUTO_MAPPING',
      ben_det_res_stat: 'AUTO_MAPPING',
      ben_det_income: 'AUTO_MAPPING',
      ben_det_hh_size: 'AUTO_MAPPING',
      land_own: 'AUTO_MAPPING',
      land_cultivate: 'AUTO_MAPPING',
      not_many_livestock: 'AUTO_MAPPING',
      many_sheep_goat: 'AUTO_MAPPING',
      many_milking: 'AUTO_MAPPING',
      many_cow: 'AUTO_MAPPING',
      many_pig: 'AUTO_MAPPING',
      many_poultry: 'AUTO_MAPPING',
    },
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
    verifiedColumns: {
      back_consent: 'AUTO_MAPPING',
      ben_det_surname: 'AUTO_MAPPING',
      ben_det_first_name: 'AUTO_MAPPING',
      ben_det_pat_name: 'AUTO_MAPPING',
      ben_det_ph_number: 'AUTO_MAPPING',
      ben_det_oblast: 'AUTO_MAPPING',
      ben_det_raion: 'AUTO_MAPPING',
      ben_det_hromada: 'AUTO_MAPPING',
      ben_det_settlement: 'AUTO_MAPPING',
      ben_det_res_stat: 'AUTO_MAPPING',
      ben_det_income: 'AUTO_MAPPING',
      ben_det_hh_size: 'AUTO_MAPPING',
      has_agriculture_exp: 'AUTO_MAPPING',
      depend_basic_needs: 'AUTO_MAPPING',
      consume_majority: 'AUTO_MAPPING',
      land_cultivate: 'AUTO_MAPPING',
    },
  }),
  registerActivity({
    sampleSizeRatio: .1,
    label: 'Partner LAMPA',
    id: 'Partner LAMPA',
    registration: {
      koboFormId: KoboIndex.byName('partner_lampa').id,
      fetch: 'partner_lampa',
      joinBy: _ => _.pay_det_tax_id_num!,
    },
    verification: {
      koboFormId: KoboIndex.byName('meal_verificationPartnerBnre').id,
      fetch: 'meal_verificationPartnerBnre',
      joinBy: _ => _.pay_det_tax_id_num!,
    },
    verifiedColumns: {
      back_consent: 'AUTO_MAPPING',
      ben_det_surname: 'AUTO_MAPPING',
      ben_det_first_name: 'AUTO_MAPPING',
      ben_det_pat_name: 'AUTO_MAPPING',
      ben_det_ph_number: 'AUTO_MAPPING',
      ben_det_oblast: 'AUTO_MAPPING',
      ben_det_raion: 'AUTO_MAPPING',
      ben_det_hromada: 'AUTO_MAPPING',
      ben_det_settlement: 'AUTO_MAPPING',
      ben_det_res_stat: 'AUTO_MAPPING',
      ben_det_income: 'AUTO_MAPPING',
      ben_det_hh_size: 'AUTO_MAPPING',
    },
  }),
  registerActivity({
    sampleSizeRatio: .1,
    label: 'Partner Pomagaem',
    id: 'Partner Pomagaem',
    registration: {
      koboFormId: KoboIndex.byName('partner_pomogaem').id,
      fetch: 'partner_pomogaem',
      joinBy: _ => _.pay_det_tax_id_num!,
    },
    verification: {
      koboFormId: KoboIndex.byName('meal_verificationPartnerBnre').id,
      fetch: 'meal_verificationPartnerBnre',
      joinBy: _ => _.pay_det_tax_id_num!,
    },
    verifiedColumns: {
      back_consent: 'AUTO_MAPPING',
      ben_det_surname: 'AUTO_MAPPING',
      ben_det_first_name: 'AUTO_MAPPING',
      ben_det_pat_name: 'AUTO_MAPPING',
      ben_det_ph_number: 'AUTO_MAPPING',
      ben_det_oblast: 'AUTO_MAPPING',
      ben_det_raion: 'AUTO_MAPPING',
      ben_det_hromada: 'AUTO_MAPPING',
      ben_det_settlement: 'AUTO_MAPPING',
      ben_det_res_stat: 'AUTO_MAPPING',
      ben_det_income: 'AUTO_MAPPING',
      ben_det_hh_size: 'AUTO_MAPPING',
    },
  }),
])

export const mealVerificationActivitiesIndex = mealVerificationActivities.groupByFirst(_ => _.id)
