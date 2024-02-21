import {ApiSdk} from '@/core/sdk/server/ApiSdk'
import {KeyOf, KoboIndex} from '@infoportal-common'
import {KoboTypedAnswerSdk} from '@/core/sdk/server/kobo/KoboTypedAnswerSdk'
import {KoboId} from '@/core/sdk/server/kobo/Kobo'
import {seq} from '@alexandreannic/ts-utils'

export const mealVerificationConf = {
  sampleSizeRatio: .2,
  numericToleranceMargin: .1,
}

export type MealVerificationActivity<
  TData extends keyof ApiSdk['kobo']['typedAnswers'] = any,
  TCheck extends keyof ApiSdk['kobo']['typedAnswers'] = any,
> = {
  name: string
  registration: {
    koboFormId: KoboId,
    fetch: TData
    filters: (_: Awaited<ReturnType<KoboTypedAnswerSdk[TData]>>['data'][0]) => boolean
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
    name: 'ECREC Cash Registration',
    registration: {
      koboFormId: KoboIndex.byName('ecrec_cashRegistration').id,
      fetch: 'searchEcrec_cashRegistration',
      filters: _ => true,
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
    name: 'Cash for Fuel & Cash for Utilities',
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
  })
])

export const mealVerificationActivitiesIndex = mealVerificationActivities.groupByFirst(_ => _.name)
