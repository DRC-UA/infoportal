import {seq} from '@axanc/ts-utils'
import {format} from 'date-fns'
import {Kobo} from 'kobo-sdk'

import {KeyOf, KoboIndex, KoboSchemaHelper} from 'infoportal-common'

import {InferTypedAnswer, KoboFormNameMapped} from '@/core/sdk/server/kobo/KoboTypedAnswerSdk'

export const mealVerificationConf = {
  sampleSizeRatioDefault: 0.2,
  numericToleranceMargin: 0.1,
}

export type VerifiedColumnsMapping<TReg extends KoboFormNameMapped = any, TVerif extends KoboFormNameMapped = any> = {
  reg: (_: InferTypedAnswer<TReg>, schema: KoboSchemaHelper.Bundle) => any
  verif: (_: InferTypedAnswer<TVerif>, schema: KoboSchemaHelper.Bundle) => any
}

export const MEAL_VERIF_AUTO_MAPPING = 'AUTO_MAPPING'

export type MealVerificationActivity<TReg extends KoboFormNameMapped = any, TVerif extends KoboFormNameMapped = any> = {
  sampleSizeRatio: number
  label: string
  id: string
  registration: {
    koboFormId: Kobo.FormId
    fetch: TReg
    filters?: (_: InferTypedAnswer<TReg>) => boolean
    joinBy: (_: InferTypedAnswer<TReg>) => string | number
  }
  verification: {
    fetch: TVerif
    koboFormId: Kobo.FormId
    filters?: (_: InferTypedAnswer<TVerif>) => boolean
    joinBy: (_: InferTypedAnswer<TVerif>) => string | number
  }
  dataColumns?: KeyOf<InferTypedAnswer<TReg>>[]
  verifiedColumns: {
    [K in KeyOf<InferTypedAnswer<TVerif>>]?: VerifiedColumnsMapping<TReg, TVerif> | typeof MEAL_VERIF_AUTO_MAPPING
  }
}

const registerActivity = <TData extends KoboFormNameMapped, TCheck extends KoboFormNameMapped>(
  _: MealVerificationActivity<TData, TCheck>,
) => _

export const mealVerificationActivities = seq([
  registerActivity({
    sampleSizeRatio: 0.1,
    label: 'ECREC MBG',
    id: 'ECREC MBG',
    registration: {
      koboFormId: KoboIndex.byName('ecrec_mbg').id,
      fetch: 'ecrec_mbg',
      joinBy: (_) => _.tax_id_num!,
    },
    verification: {
      koboFormId: KoboIndex.byName('meal_verificationEcrec').id,
      joinBy: (_) => _.pay_det_tax_id_num!,
      fetch: 'meal_verificationEcrec',
    },
    dataColumns: [],
    verifiedColumns: {
      back_consent: {reg: (_) => _.consent, verif: (_) => _.back_consent},
      ben_det_surname: {reg: (_) => _.surname, verif: (_) => _.ben_det_surname},
      ben_det_first_name: {reg: (_) => _.first_name, verif: (_) => _.ben_det_first_name},
      ben_det_pat_name: {reg: (_) => _.pat_name, verif: (_) => _.ben_det_pat_name},
      ben_det_ph_number: {reg: (_) => _.ph_number, verif: (_) => _.ben_det_ph_number},
      ben_det_oblast: {reg: (_) => _.oblast, verif: (_) => _.ben_det_oblast},
      ben_det_raion: {reg: (_) => _.raion, verif: (_) => _.ben_det_raion},
      ben_det_hromada: {reg: (_) => _.hromada, verif: (_) => _.ben_det_hromada},
      ben_det_res_stat: {reg: (_) => _.res_stat, verif: (_) => _.ben_det_res_stat},
      business_name: {reg: (_) => _.business_name, verif: (_) => _.business_name},
      business_type: {reg: (_) => _.business_type, verif: (_) => _.business_type},
      enterprise_tax_id: {reg: (_) => _.enterprise_tax_id, verif: (_) => _.enterprise_tax_id},
      legal_address_business: {reg: (_) => _.legal_address_business, verif: (_) => _.legal_address_business},

      date_business_registration: {
        reg: (_) => {
          if (_.date_business_registration) return format(_.date_business_registration, 'yyyy-MM-dd')
          else return ''
        },
        verif: (_) => {
          if (_.date_business_registration) return format(_.date_business_registration, 'yyyy-MM-dd')
          else return ''
        },
      },

      business_currently_operational_mbg: {
        reg: (_) => _.business_currently_operational,
        verif: (_) => _.business_currently_operational_mbg,
      },
      key_business_activities: {reg: (_) => _.key_business_activities, verif: (_) => _.key_business_activities},
      key_business_activities_other: {
        reg: (_) => _.key_business_activities_other,
        verif: (_) => _.key_business_activities_other,
      },
      produce_buy_processing: {reg: (_) => _.produce_buy_processing, verif: (_) => _.produce_buy_processing},
      have_data_bought_goods: {reg: (_) => _.have_data_bought_goods, verif: (_) => _.have_data_bought_goods},
      how_bought_goods: {reg: (_) => _.how_bought_goods, verif: (_) => _.how_bought_goods},
      received_local_produce: {reg: (_) => _.received_local_produce, verif: (_) => _.received_local_produce},
      years_experience_business_mbg: {
        reg: (_) => _.years_experience_business,
        verif: (_) => _.years_experience_business_mbg,
      },
      number_employees_business_mbg: {
        reg: (_) => _.number_employees_business,
        verif: (_) => _.number_employees_business_mbg,
      },
      turnover_exceeded_9m: {reg: (_) => _.turnover_exceeded_9m, verif: (_) => _.turnover_exceeded_9m},
      have_debt_repayment_mbg: {reg: (_) => _.have_debt_repayment, verif: (_) => _.have_debt_repayment_mbg},
      repayment_debt_loan_mbg: {reg: (_) => _.repayment_debt_loan, verif: (_) => _.repayment_debt_loan_mbg},
      access_business_loans: {reg: (_) => _.access_business_loans, verif: (_) => _.access_business_loans},
      your_main_customers: {reg: (_) => _.your_main_customers, verif: (_) => _.your_main_customers},
      main_barriers_business: {reg: (_) => _.main_barriers_business, verif: (_) => _.main_barriers_business},
      escalation_conflict_affected_business: {
        reg: (_) => _.escalation_conflict_affected_business,
        verif: (_) => _.escalation_conflict_affected_business,
      },
      amount_implement_plan: {reg: (_) => _.amount_implement_plan, verif: (_) => _.amount_implement_plan},
      amount_co_funding: {reg: (_) => _.amount_co_funding, verif: (_) => _.amount_co_funding},
      project_spend_grant: {reg: (_) => _.project_spend_grant, verif: (_) => _.project_spend_grant},
    },
  }),
  registerActivity({
    sampleSizeRatio: 0.1,
    label: 'ECREC VET DMFA-355',
    id: 'ECREC VET DMFA-355',
    registration: {
      koboFormId: KoboIndex.byName('ecrec_vet2_dmfa').id,
      fetch: 'ecrec_vet2_dmfa',
      joinBy: (_) => _.tax_id_num!,
    },
    verification: {
      koboFormId: KoboIndex.byName('meal_verificationEcrec').id,
      joinBy: (_) => _.pay_det_tax_id_num!,
      fetch: 'meal_verificationEcrec',
    },
    dataColumns: [],
    verifiedColumns: {
      back_consent: {reg: (_) => _.consent, verif: (_) => _.back_consent},
      ben_det_surname: {reg: (_) => _.surname, verif: (_) => _.ben_det_surname},
      ben_det_first_name: {reg: (_) => _.first_name, verif: (_) => _.ben_det_first_name},
      ben_det_pat_name: {reg: (_) => _.pat_name, verif: (_) => _.ben_det_pat_name},
      ben_det_ph_number: {reg: (_) => _.ph_number, verif: (_) => _.ben_det_ph_number},
      ben_det_oblast: {reg: (_) => _.oblast, verif: (_) => _.ben_det_oblast},
      ben_det_raion: {reg: (_) => _.raion, verif: (_) => _.ben_det_raion},
      ben_det_hromada: {reg: (_) => _.hromada, verif: (_) => _.ben_det_hromada},
      ben_det_res_stat: {
        reg: (_) => {
          if (_.res_stat === 'displaced') return 'idp'
          else if (_.res_stat === 'returnee') return 'ret'
          return _.res_stat
        },
        verif: (_) => _.ben_det_res_stat,
      },
      ben_det_income: {reg: (_) => _.household_income, verif: (_) => _.ben_det_income},
      ben_det_hh_size: {reg: (_) => _.number_people, verif: (_) => _.ben_det_hh_size},
      current_employment_situation: {
        reg: (_) => _.current_employment_situation,
        verif: (_) => _.current_employment_situation,
      },
      long_unemployed: {reg: (_) => _.long_unemployed, verif: (_) => _.long_unemployed},
      interested_formally_employed: {
        reg: (_) => _.interested_formally_employed,
        verif: (_) => _.interested_formally_employed,
      },
      interested_formally_employed_other: {
        reg: (_) => _.interested_formally_employed_other,
        verif: (_) => _.interested_formally_employed_other,
      },
      aware_training_facility_operating: {
        reg: (_) => _.aware_training_facility_operating,
        verif: (_) => _.aware_training_facility_operating,
      },
      information_training_center: {
        reg: (_) => _.information_training_center,
        verif: (_) => _.information_training_center,
      },
      know_cost_training: {reg: (_) => _.know_cost_training, verif: (_) => _.know_cost_training},
      cost_training: {reg: (_) => _.cost_training, verif: (_) => _.cost_training},
      format_training: {reg: (_) => _.format_training, verif: (_) => _.format_training},
      access_computer_internet: {reg: (_) => _.access_computer_internet, verif: (_) => _.access_computer_internet},
      ability_regularly_attend: {reg: (_) => _.ability_regularly_attend, verif: (_) => _.ability_regularly_attend},
      enrolled_other_training: {reg: (_) => _.enrolled_other_training, verif: (_) => _.enrolled_other_training},
      who_paid_training: {reg: (_, schema) => _.who_paid_training, verif: (_, schema) => _.who_paid_training},
    },
  }),
  registerActivity({
    sampleSizeRatio: 0.1,
    label: 'ECREC VET BHA-388',
    id: 'ECREC VET BHA-388',
    registration: {
      koboFormId: KoboIndex.byName('ecrec_vet_bha388').id,
      fetch: 'ecrec_vet_bha388',
      joinBy: (_) => _.tax_id_num!,
    },
    verification: {
      koboFormId: KoboIndex.byName('meal_verificationEcrec').id,
      joinBy: (_) => _.pay_det_tax_id_num!,
      fetch: 'meal_verificationEcrec',
    },
    dataColumns: [],
    verifiedColumns: {
      back_consent: {reg: (_) => _.consent, verif: (_) => _.back_consent},
      ben_det_surname: {reg: (_) => _.surname, verif: (_) => _.ben_det_surname},
      ben_det_first_name: {reg: (_) => _.first_name, verif: (_) => _.ben_det_first_name},
      ben_det_pat_name: {reg: (_) => _.pat_name, verif: (_) => _.ben_det_pat_name},
      ben_det_ph_number: {reg: (_) => _.ph_number, verif: (_) => _.ben_det_ph_number},
      ben_det_oblast: {reg: (_) => _.oblast, verif: (_) => _.ben_det_oblast},
      ben_det_raion: {reg: (_) => _.raion, verif: (_) => _.ben_det_raion},
      ben_det_hromada: {reg: (_) => _.hromada, verif: (_) => _.ben_det_hromada},
      ben_det_res_stat: {
        reg: (_) => {
          if (_.res_stat === 'displaced') return 'idp'
          else if (_.res_stat === 'returnee') return 'ret'
          return _.res_stat
        },
        verif: (_) => _.ben_det_res_stat,
      },
      ben_det_income: {reg: (_) => _.household_income, verif: (_) => _.ben_det_income},
      ben_det_hh_size: {reg: (_) => _.number_people, verif: (_) => _.ben_det_hh_size},
      current_employment_situation: {
        reg: (_) => _.current_employment_situation,
        verif: (_) => _.current_employment_situation,
      },
      long_unemployed: {reg: (_) => _.long_unemployed, verif: (_) => _.long_unemployed},
      interested_formally_employed: {
        reg: (_) => _.interested_formally_employed,
        verif: (_) => _.interested_formally_employed,
      },
      interested_formally_employed_other: {
        reg: (_) => _.interested_formally_employed_other,
        verif: (_) => _.interested_formally_employed_other,
      },
      aware_training_facility_operating: {
        reg: (_) => _.aware_training_facility_operating,
        verif: (_) => _.aware_training_facility_operating,
      },
      information_training_center: {
        reg: (_) => _.information_training_center,
        verif: (_) => _.information_training_center,
      },
      know_cost_training: {reg: (_) => _.know_cost_training, verif: (_) => _.know_cost_training},
      cost_training: {reg: (_) => _.cost_training, verif: (_) => _.cost_training},
      format_training: {reg: (_) => _.format_training, verif: (_) => _.format_training},
      access_computer_internet: {reg: (_) => _.access_computer_internet, verif: (_) => _.access_computer_internet},
      ability_regularly_attend: {reg: (_) => _.ability_regularly_attend, verif: (_) => _.ability_regularly_attend},
      enrolled_other_training: {reg: (_) => _.enrolled_other_training, verif: (_) => _.enrolled_other_training},
      who_paid_training: {reg: (_, schema) => _.who_paid_training, verif: (_, schema) => _.who_paid_training},
    },
  }),
  registerActivity({
    sampleSizeRatio: 0.1,
    label: '[Ecrec] Small Scale Farmer Registration Form',
    id: '[Ecrec] Small Scale Farmer Registration Form',
    registration: {
      koboFormId: KoboIndex.byName('ecrec_small_scale').id,
      fetch: 'ecrec_small_scale',
      joinBy: (_) => _.pay_det_tax_id_num!,
    },
    verification: {
      koboFormId: KoboIndex.byName('meal_verificationEcrec').id,
      fetch: 'meal_verificationEcrec',
      filters: (record) => record.which_support_registered === 'small_scall_farmer',
      joinBy: (_) => _.pay_det_tax_id_num!,
    },
    dataColumns: [],
    verifiedColumns: {
      back_consent: {reg: (_) => _.back_consent, verif: (_) => _.back_consent},
      ben_det_surname: {reg: (_) => _.surname, verif: (_) => _.ben_det_surname},
      ben_det_first_name: {reg: (_) => _.first_name, verif: (_) => _.ben_det_first_name},
      ben_det_pat_name: {reg: (_) => _.pat_name, verif: (_) => _.ben_det_pat_name},
      ben_det_ph_number: {reg: (_) => _.ben_det_ph_number, verif: (_) => _.ben_det_ph_number},
      ben_det_oblast: {reg: (_) => _.oblast, verif: (_) => _.ben_det_oblast},
      ben_det_raion: {reg: (_) => _.raion, verif: (_) => _.ben_det_raion},
      ben_det_hromada: {reg: (_) => _.hromada, verif: (_) => _.ben_det_hromada},
      ben_det_res_stat: {
        reg: (_) => _.hh_char_hh_det?.[0].hh_char_hh_res_stat,
        verif: (_) => _.ben_det_res_stat,
      },
      ben_det_income: {reg: (_) => _.ben_det_income, verif: (_) => _.ben_det_income},
      ben_det_hh_size: {reg: (_) => _.ben_det_hh_size, verif: (_) => _.ben_det_hh_size},
      know_contamination_land: {reg: (_) => _.know_contamination_land, verif: (_) => _.know_contamination_land},
      know_contamination_land_neighbour: {
        reg: (_) => _.know_contamination_land_neighbour,
        verif: (_) => _.know_contamination_land_neighbour,
      },
      individual_continues_land: {reg: (_) => _.individual_continues_land, verif: (_) => _.individual_continues_land},
      primary_source_livelihoods: {
        reg: (_) => _.primary_source_livelihoods,
        verif: (_) => _.primary_source_livelihoods,
      },
      registered_farming_enterprise: {
        reg: (_) => _.registered_farming_enterprise,
        verif: (_) => _.registered_farming_enterprise,
      },
      land_own_small: {reg: (_) => _.land_own, verif: (_) => _.land_own_small},
      land_cultivate_small: {reg: (_) => _.land_cultivate, verif: (_) => _.land_cultivate_small},
      land_rent_other_small: {reg: (_) => _.land_rent_other, verif: (_) => _.land_rent_other_small},
      land_rent_other_yes: {reg: (_) => _.land_rent_other_yes, verif: (_) => _.land_rent_other_yes},
      many_poultry_small: {reg: (_) => _.many_poultry, verif: (_) => _.many_poultry_small},
      many_cattle_small: {reg: (_) => _.many_cattle, verif: (_) => _.many_cattle_small},
      many_sheep_small: {reg: (_) => _.many_sheep, verif: (_) => _.many_sheep_small},
      many_goats_small: {reg: (_) => _.many_goats, verif: (_) => _.many_goats_small},
      many_pigs_small: {reg: (_) => _.many_pigs, verif: (_) => _.many_pigs_small},
      many_ostriches_small: {reg: (_) => _.many_ostriches, verif: (_) => _.many_ostriches_small},
      many_rabbit_nutria_small: {reg: (_) => _.many_rabbit_nutria, verif: (_) => _.many_rabbit_nutria_small},
      many_bee_families_small: {reg: (_) => _.many_bee_families, verif: (_) => _.many_bee_families_small},
      many_other_small: {reg: (_) => _.many_other, verif: (_) => _.many_other_small},
      income_generate_agricultural: {
        reg: (_) => _.income_generate_agricultural,
        verif: (_) => _.income_generate_agricultural,
      },
      years_engaged_agricultural: {
        reg: (_) => _.years_engaged_agricultural,
        verif: (_) => _.years_engaged_agricultural,
      },
      sell_agricultural_products: {
        reg: (_) => _.sell_agricultural_products,
        verif: (_) => _.sell_agricultural_products,
      },
      selling_reliably_produce: {reg: (_) => _.selling_reliably_produce, verif: (_) => _.selling_reliably_produce},
      agricultural_inputs_purchase: {
        reg: (_) => _.agricultural_inputs_purchase,
        verif: (_) => _.agricultural_inputs_purchase,
      },
      confirm_capacity_productive: {
        reg: (_) => _.confirm_capacity_productive,
        verif: (_) => _.confirm_capacity_productive,
      },
      interested_training_agriculture_small: {
        reg: (_) => _.interested_training_agriculture,
        verif: (_) => _.interested_training_agriculture_small,
      },
      any_support_february2022: {reg: (_) => _.any_support_february2022, verif: (_) => _.any_support_february2022},
      plan_government_support_future: {
        reg: (_) => _.plan_government_support_future,
        verif: (_) => _.plan_government_support_future,
      },
    },
  }),
  registerActivity({
    sampleSizeRatio: 0.1,
    label: '[Ecrec] Subsistance farmer registration',
    id: '[Ecrec] Subsistance farmer registration',
    registration: {
      koboFormId: KoboIndex.byName('ecrec_subsistance').id,
      fetch: 'ecrec_subsistance',
      joinBy: (_) => _.pay_det_tax_id_num!,
    },
    verification: {
      koboFormId: KoboIndex.byName('meal_verificationEcrec').id,
      joinBy: (_) => _.pay_det_tax_id_num!,
      fetch: 'meal_verificationEcrec',
    },
    dataColumns: [],
    verifiedColumns: {
      back_consent: {reg: (_) => _.back_consent, verif: (_) => _.back_consent},
      ben_det_surname: {reg: (_) => _.ben_det_surname, verif: (_) => _.ben_det_surname},
      ben_det_first_name: {reg: (_) => _.ben_det_first_name, verif: (_) => _.ben_det_first_name},
      ben_det_pat_name: {reg: (_) => _.ben_det_pat_name, verif: (_) => _.ben_det_pat_name},
      ben_det_ph_number: {reg: (_) => _.ben_det_ph_number, verif: (_) => _.ben_det_ph_number},
      ben_det_oblast: {reg: (_) => _.ben_det_oblast, verif: (_) => _.ben_det_oblast},
      ben_det_raion: {reg: (_) => _.ben_det_raion, verif: (_) => _.ben_det_raion},
      ben_det_hromada: {reg: (_) => _.ben_det_hromada, verif: (_) => _.ben_det_hromada},
      ben_det_res_stat: {
        reg: (_) => _.hh_char_hh_det?.[0].hh_char_hh_res_stat,
        verif: (_) => _.ben_det_res_stat,
      },
      ben_det_income: {reg: (_) => _.ben_det_income, verif: (_) => _.ben_det_income},
      ben_det_hh_size: {reg: (_) => _.ben_det_hh_size, verif: (_) => _.ben_det_hh_size},
      have_concerns_contamination: {
        reg: (_) => _.have_concerns_contamination,
        verif: (_) => _.have_concerns_contamination,
      },
      known_contamination_your: {reg: (_) => _.known_contamination_your, verif: (_) => _.known_contamination_your},
      contamination_impact_your: {reg: (_) => _.contamination_impact_your, verif: (_) => _.contamination_impact_your},
      what_primary_livelihood: {reg: (_) => _.what_primary_livelihood, verif: (_) => _.what_primary_livelihood},
      consume_majority_sub: {reg: (_) => _.consume_majority, verif: (_) => _.consume_majority_sub},
      land_own_sub: {reg: (_) => _.land_own, verif: (_) => _.land_own_sub},
      land_cultivate_sub: {reg: (_) => _.land_cultivate, verif: (_) => _.land_cultivate_sub},
      land_rent_other: {reg: (_) => _.land_rent_other, verif: (_) => _.land_rent_other},
      rent_receive_year: {reg: (_) => _.rent_receive_year, verif: (_) => _.rent_receive_year},
      poultry: {reg: (_) => _.poultry, verif: (_) => _.poultry},
      cattle: {reg: (_) => _.cattle, verif: (_) => _.cattle},
      sheep: {reg: (_) => _.sheep, verif: (_) => _.sheep},
      goats: {reg: (_) => _.goats, verif: (_) => _.goats},
      pigs: {reg: (_) => _.pigs, verif: (_) => _.pigs},
      ostriches: {reg: (_) => _.ostriches, verif: (_) => _.ostriches},
      rabbits_nutrias: {reg: (_) => _.rabbits_nutrias, verif: (_) => _.rabbits_nutrias},
      bee_families: {reg: (_) => _.bee_families, verif: (_) => _.bee_families},
      other_animals: {reg: (_) => _.other_animals, verif: (_) => _.other_animals},
      household_access_water: {reg: (_) => _.household_access_water, verif: (_) => _.household_access_water},
      access_basic_farming_tools: {
        reg: (_) => _.access_basic_farming_tools,
        verif: (_) => _.access_basic_farming_tools,
      },
      eligible_assistance_agricultural: {
        reg: (_) => _.eligible_assistance_agricultural,
        verif: (_) => _.eligible_assistance_agricultural,
      },
      interested_training_agriculture: {
        reg: (_) => _.interested_training_agriculture,
        verif: (_) => _.interested_training_agriculture,
      },
    },
  }),
  registerActivity({
    sampleSizeRatio: 0.1,
    label: 'EC-REC Sectoral Cash for Businesses BHA',
    id: 'MSME',
    registration: {
      koboFormId: KoboIndex.byName('ecrec_msmeGrantEoi').id,
      fetch: 'ecrec_msmeGrantEoi',
      joinBy: (_) => _.ben_det_tax_id_num!,
    },
    verification: {
      koboFormId: KoboIndex.byName('meal_verificationEcrec').id,
      joinBy: (_) => _.pay_det_tax_id_num!,
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
    },
  }),
  registerActivity({
    sampleSizeRatio: 0.1,
    label: 'ECREC MSME BHA-388',
    id: 'ECREC MSME BHA-388',
    registration: {
      koboFormId: KoboIndex.byName('ecrec_msmeGrantReg').id,
      fetch: 'ecrec_msmeGrantReg',
      joinBy: (_) => _.tax_id_num!,
    },
    verification: {
      koboFormId: KoboIndex.byName('meal_verificationEcrec').id,
      joinBy: (_) => _.pay_det_tax_id_num!,
      fetch: 'meal_verificationEcrec',
      filters: (record) => record.which_support_registered === 'msme',
    },
    dataColumns: [],
    verifiedColumns: {
      back_consent: {reg: (_) => _.consent, verif: (_) => _.back_consent},
      ben_det_surname: {reg: (_) => _.surname, verif: (_) => _.ben_det_surname},
      ben_det_first_name: {reg: (_) => _.first_name, verif: (_) => _.ben_det_first_name},
      ben_det_pat_name: {reg: (_) => _.pat_name, verif: (_) => _.ben_det_pat_name},
      ben_det_ph_number: {reg: (_) => _.ph_number, verif: (_) => _.ben_det_ph_number},
      ben_det_oblast: {reg: (_) => _.oblast, verif: (_) => _.ben_det_oblast},
      ben_det_raion: {reg: (_) => _.raion, verif: (_) => _.ben_det_raion},
      ben_det_hromada: {reg: (_) => _.hromada, verif: (_) => _.ben_det_hromada},
      ben_det_res_stat: {reg: (_) => _.res_stat, verif: (_) => _.ben_det_res_stat},
      ben_det_income: {reg: (_) => _.household_income, verif: (_) => _.ben_det_income},
      ben_det_hh_size: {reg: (_) => _.number_people, verif: (_) => _.ben_det_hh_size},
      business_currently_operational_bha388: {
        reg: (_) => _.business_currently_operational,
        verif: (_) => _.business_currently_operational_bha388,
      },
      years_experience_business: 'AUTO_MAPPING',
      number_employees_business: 'AUTO_MAPPING',
      income_past12: 'AUTO_MAPPING',
      monthly_business_expenditure: 'AUTO_MAPPING',
      have_debt_repayment: 'AUTO_MAPPING',
      repayment_debt_loan: 'AUTO_MAPPING',
      received_previous_support: 'AUTO_MAPPING',
      who_previous_support: 'AUTO_MAPPING',
      amount_previous_support: 'AUTO_MAPPING',
      when_previous_support: {
        reg: (_) => {
          if (_.when_previous_support) return format(_.when_previous_support, 'yyyy-MM-dd')
          else return ''
        },
        verif: (_) => {
          if (_.when_previous_support) return format(_.when_previous_support, 'yyyy-MM-dd')
          else return ''
        },
      },
    },
  }),
  registerActivity({
    sampleSizeRatio: 0.1,
    label: 'VET - Training grants',
    id: 'Training grants',
    registration: {
      koboFormId: KoboIndex.byName('ecrec_vetApplication').id,
      fetch: 'ecrec_vetApplication',
      joinBy: (_) => _.ben_det_ph_number!,
    },
    verification: {
      koboFormId: KoboIndex.byName('meal_verificationEcrec').id,
      fetch: 'meal_verificationEcrec',
      joinBy: (_) => _.ben_det_ph_number!,
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
    },
  }),
  registerActivity({
    sampleSizeRatio: 0.2,
    label: 'Cash for Fuel & Cash for Utilities',
    id: 'Cash for Fuel & Cash for Utilities',
    registration: {
      koboFormId: KoboIndex.byName('bn_re').id,
      fetch: 'bn_re',
      filters: (_) => !!(_.back_prog_type && [_.back_prog_type].flat().find((_) => /^c(sf|fu)/.test(_))),
      joinBy: (_) => _.pay_det_tax_id_num!,
    },
    verification: {
      koboFormId: KoboIndex.byName('meal_verificationWinterization').id,
      fetch: 'meal_verificationWinterization',
      joinBy: (_) => _.pay_det_tax_id_num!,
    },
    dataColumns: ['back_enum', 'back_donor', 'back_prog_type'],
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
    sampleSizeRatio: 0.2,
    label: 'ECREC Cash Registration UHF',
    id: 'ECREC Cash Registration',
    registration: {
      koboFormId: KoboIndex.byName('ecrec_cashRegistration').id,
      fetch: 'ecrec_cashRegistration',
      joinBy: (_) => _.pay_det_tax_id_num!,
    },
    verification: {
      koboFormId: KoboIndex.byName('meal_verificationEcrec').id,
      fetch: 'meal_verificationEcrec',
      joinBy: (_) => _.pay_det_tax_id_num!,
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
    dataColumns: ['back_donor'],
  }),
  registerActivity({
    sampleSizeRatio: 0.1,
    label: 'ECREC Cash Registration BHA',
    id: 'ECREC Cash Registration BHA',
    registration: {
      koboFormId: KoboIndex.byName('ecrec_cashRegistrationBha').id,
      fetch: 'ecrec_cashRegistrationBha',
      joinBy: (_) => _.pay_det_tax_id_num!,
    },
    verification: {
      koboFormId: KoboIndex.byName('meal_verificationEcrec').id,
      fetch: 'meal_verificationEcrec',
      joinBy: (_) => _.pay_det_tax_id_num!,
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
    sampleSizeRatio: 0.1,
    label: 'Partner LAMPA',
    id: 'Partner LAMPA',
    registration: {
      koboFormId: KoboIndex.byName('partner_lampa').id,
      fetch: 'partner_lampa',
      joinBy: (_) => _.pay_det_tax_id_num!,
    },
    verification: {
      koboFormId: KoboIndex.byName('meal_verificationPartnerBnre').id,
      fetch: 'meal_verificationPartnerBnre',
      joinBy: (_) => _.pay_det_tax_id_num!,
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
      ben_det_res_stat: {
        reg: (_, s) => _.ben_det_res_stat,
        verif: (_, s) => _.ben_det_res_stat,
      },
      ben_det_income: 'AUTO_MAPPING',
      ben_det_hh_size: 'AUTO_MAPPING',
      current_gov_assist_cff: 'AUTO_MAPPING',
      type_property_living: 'AUTO_MAPPING',
      utilities_fuel: 'AUTO_MAPPING',
      functioning_fuel_delivery: 'AUTO_MAPPING',
    },
  }),
  registerActivity({
    sampleSizeRatio: 0.1,
    label: 'Partner Pomagaem',
    id: 'Partner Pomagaem',
    registration: {
      koboFormId: KoboIndex.byName('partner_pomogaem').id,
      fetch: 'partner_pomogaem',
      joinBy: (_) => _.pay_det_tax_id_num!,
    },
    verification: {
      koboFormId: KoboIndex.byName('meal_verificationPartnerBnre').id,
      fetch: 'meal_verificationPartnerBnre',
      joinBy: (_) => _.pay_det_tax_id_num!,
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
      ben_det_settlement: {
        reg: (_) => _.ben_det_settlement,
        verif: (_) => {
          const tokens = _.ben_det_settlement?.split('_ua') || []
          return tokens[0] || ''
        },
      },
      ben_det_res_stat: 'AUTO_MAPPING',
      ben_det_income: 'AUTO_MAPPING',
      ben_det_hh_size: 'AUTO_MAPPING',
      current_gov_assist_cff: 'AUTO_MAPPING',
      type_property_living: 'AUTO_MAPPING',
      utilities_fuel: 'AUTO_MAPPING',
      functioning_fuel_delivery: 'AUTO_MAPPING',
    },
  }),
  registerActivity({
    sampleSizeRatio: 0.1,
    label: 'Partner Angels of Salvations',
    id: 'Partner Angels of Salvations',
    registration: {
      koboFormId: KoboIndex.byName('partner_angels').id,
      fetch: 'partner_angels',
      joinBy: (_) => _.pay_det_tax_id_num!,
    },
    verification: {
      koboFormId: KoboIndex.byName('meal_verificationPartnerBnre').id,
      fetch: 'meal_verificationPartnerBnre',
      joinBy: (_) => _.pay_det_tax_id_num!,
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
      current_gov_assist_cff: 'AUTO_MAPPING',
      type_property_living: 'AUTO_MAPPING',
      utilities_fuel: 'AUTO_MAPPING',
      functioning_fuel_delivery: 'AUTO_MAPPING',
    },
  }),
  registerActivity({
    sampleSizeRatio: 0.1,
    label: 'Partner Misto Syly',
    id: 'Partner Misto Syly',
    registration: {
      koboFormId: KoboIndex.byName('partner_misto_syly').id,
      fetch: 'partner_misto_syly',
      joinBy: (_) => _.cal_head_pib!,
    },
    verification: {
      koboFormId: KoboIndex.byName('meal_verificationPartnerBnre').id,
      fetch: 'meal_verificationPartnerBnre',
      joinBy: (_) => _.pay_det_tax_id_num!,
    },
    verifiedColumns: {
      back_consent: 'AUTO_MAPPING',
      ben_det_surname: {
        reg: (_) => _.hh_char_hh_det?.[0].ben_det_surname,
        verif: (_) => _.ben_det_surname,
      },
      ben_det_first_name: {
        reg: (_) => _.hh_char_hh_det?.[0].ben_det_first_name,
        verif: (_) => _.ben_det_first_name,
      },
      ben_det_pat_name: {
        reg: (_) => _.hh_char_hh_det?.[0].ben_det_pat_name,
        verif: (_) => _.ben_det_pat_name,
      },
      ben_det_ph_number: {
        reg: (_) => _.hh_char_hh_det?.[0].member_ph_number,
        verif: (_) => _.ben_det_ph_number,
      },
      ben_det_oblast: 'AUTO_MAPPING',
      ben_det_raion: 'AUTO_MAPPING',
      ben_det_hromada: 'AUTO_MAPPING',
      ben_det_settlement: 'AUTO_MAPPING',
      ben_det_res_stat: {
        reg: (_) => _.hh_char_hh_det?.[0].ben_det_res_stat,
        verif: (_) => _.ben_det_res_stat,
      },
      ben_det_income: 'AUTO_MAPPING',
      ben_det_hh_size: 'AUTO_MAPPING',
      current_gov_assist_cff: 'AUTO_MAPPING',
      type_property_living: 'AUTO_MAPPING',
      utilities_fuel: 'AUTO_MAPPING',
      functioning_fuel_delivery: 'AUTO_MAPPING',
    },
  }),
])

export const mealVerificationActivitiesIndex = mealVerificationActivities.groupByFirst((_) => _.id)
