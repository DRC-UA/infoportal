import {Meal_cashPdm, Meal_pdmStandardised} from '@infoportal-common'
import {parse, setHours} from 'date-fns'

export namespace ImportMpca {

  export interface Csv {
    Validation: string;
    ID: string;
    Submission: string;
    interwiever_name: string;
    type_interview: string;
    donor: string;
    pdmtype: string;
    office: string;
    unique_number: string;
    not_loc: string;
    ben_det_oblast: string;
    ben_det_raion: string;
    ben_det_hromada: string;
    gps_coordinates: string;
    not_mpca: string;
    not_cash_for_rent: string;
    not_cash_for_repair: string;
    agree_interviewed: string;
    age: string;
    sex: string;
    status_person: string;
    how_many_family: string;
    family: string;
    did_receive_cash: string;
    did_receive_cash_no: string;
    cash_repair_type: string;
    cash_repair_type_other: string;
    register_receive: string;
    register_receive_other: string;
    assistance_delivered: string;
    assistance_delivered_other: string;
    satisfied_process: string;
    satisfied_process_no: string;
    satisfied_cash_amount: string;
    how_much_money: string;
    how_much_money_yes: string;
    time_registered_assistance: string;
    experience_problems: string;
    experience_problems_yes: string;
    assistance_delivered_other_001: string;
    know_people_needing: string;
    know_people_needing_yes: string;
    organization_provide_information: string;
    better_inform_distribution: string;
    better_inform_distribution_other: string;
    rate_quality_assistance: string;
    rate_quality_assistance_dis: string;
    sectors_cash_assistance: string;
    sectors_cash_assistance_other: string;
    sectors_cash_assistance_food: string;
    sectors_cash_assistance_clothing: string;
    sectors_cash_assistance_utilities_heating: string;
    sectors_cash_assistance_healthcare: string;
    sectors_cash_assistance_hygiene_items: string;
    receive_additional: string;
    rent_benefit: string;
    rent_benefit_no: string;
    access_adequate_housing: string;
    improve_living: string;
    improve_living_other: string;
    spent_cash_assistance: string;
    spent_cash_assistance_yes: string;
    spent_cash_assistance_rent: string;
    money_received: string;
    money_received_other: string;
    assistance_enough: string;
    assistance_enough_no: string;
    assistance_other_repairs: string;
    assistance_other_repairs_yes: string;
    assistance_other_repairs_rate: string;
    brochure_provided: string;
    basic_needs_priorities: string;
    living_conditions_interventions: string;
    living_conditions_interventions_no: string;
    who_assisted: string;
    who_assisted_other: string;
    issues_regarding_repaired: string;
    issues_regarding_repaired_yes: string;
    shelter_assistance_return: string;
    shelter_assistance_return_no: string;
    planning_staying_repaired: string;
    planning_staying_repaired_other: string;
    planning_staying_repaired_no: string;
    square_metres: string;
    dwelling_water_proof: string;
    access_running_water: string;
    access_hot_water: string;
    access_washing_facilities: string;
    access_sanitation_facilities: string;
    access_heating: string;
    property_draft_proofing: string;
    property_adequately_insulated: string;
    property_double_glazed_windows: string;
    formal_agreement_landlord: string;
    access_external_locked: string;
    access_private_space: string;
    current_living_space: string;
    household_currently_have_clothing: string;
    two_weeks_household: string;
    receive_shelter_assistance: string;
    receive_shelter_assistance_no: string;
    needs_community_currently: string;
    needs_community_currently_other: string;
    any_member_household: string;
    any_member_household_yes: string;
    provide_someone_commission: string;
    provide_someone_commission_yes: string;
    provide_someone_commission_yes_other: string;
    feel_safe_travelling: string;
    feel_safe_travelling_bad: string;
    feel_treated_respect: string;
    know_address_suggestions: string;
    know_address_suggestions_yes: string;
    know_address_suggestions_yes_ndnp: string;
    know_address_suggestions_yes_ndnp_other: string;
    know_address_suggestions_no: string;
    know_address_suggestions_no_other: string;
    submitted_feedback_complaint: string;
    feedback_reporting_channels: string;
    feedback_reporting_channels_other: string;
    comment: string;
    not_thank: string;
  }

  export const dataMap = (_: Meal_pdmStandardised.T): Record<string, any> => {

    const statusPersonMapping: Record<string, Meal_pdmStandardised.Option<'status_person'>> = {
      'idp': 'yesidp',
    }

    const mappedStatusPerson = statusPersonMapping[_.status_person as keyof typeof statusPersonMapping] || undefined

    const validPdmTypes: Meal_cashPdm.Option<'pdmtype'>[] = ['empca', 'bnmpca', 'caren']

    const pdmtype = validPdmTypes.includes(_.pdmtype as Meal_cashPdm.Option<'pdmtype'>)
      ? [_.pdmtype as Meal_cashPdm.Option<'pdmtype'>]
      : []

    return {
      start: _.start,
      end: _.end,
      'metadata/interviever_name': _.interviewer_name,
      'metadata/date_interview': undefined,
      'metadata/donor': undefined,
      'metadata/donor_other': _.donor,
      'metadata/office': _.office as Meal_cashPdm.Option<'office'>,
      'metadata/unique_number': _.unique_number,
      'metadata/not_loc': _.not_loc,
      'metadata/ben_det_oblast': _.ben_det_oblast as Meal_cashPdm.Option<'ben_det_oblast'>,
      'metadata/ben_det_raion': _.ben_det_raion,
      'metadata/ben_det_hromada': _.ben_det_hromada,
      'metadata/place_distribution': undefined,
      'overview/age': _.age,
      'overview/sex': _.sex as Meal_cashPdm.Option<'sex'>,
      'overview/status_person': mappedStatusPerson as Meal_cashPdm.Option<'status_person'> as Meal_cashPdm.Option<'status_person'>,
      'overview/how_many_family': _.how_many_family,
      'overview/number_female': undefined,
      'overview/number_male': undefined,
      'overview/number_disabilities': undefined,
      'overview/did_receive_cash': _.did_receive_cash as Meal_cashPdm.Option<'any_member_household'>,
      'overview/did_receive_cash_no': _.did_receive_cash_no,
      'overview/pdmtype': pdmtype,
      'overview/not_mpca': _.not_mpca,
      'overview/not_cash_for_rent': _.not_cash_for_rent,
      'overview/not_cash_for_repair': _.not_cash_for_repair,
      'ic/agree_interviewed': _.agree_interviewed as Meal_cashPdm.Option<'any_member_household'>,
      'ic/spent_cash_assistance_received': undefined,
      'ic/spent_cash_assistance_received_no': undefined,
      'ic/spent_cash_assistance_received_no_mait_reason': undefined,
      'ic/spend_cash_received': undefined,
      'use_mpca_assistance/sectors_cash_assistance': _.sectors_cash_assistance as Meal_cashPdm.Option<'sectors_cash_assistance'>[],
      'use_mpca_assistance/sectors_cash_assistance_other': _.sectors_cash_assistance_other,
      'use_mpca_assistance/sectors_cash_assistance_food': _.sectors_cash_assistance_food,
      'use_mpca_assistance/sectors_cash_assistance_hh_nfis': undefined,
      'use_mpca_assistance/sectors_cash_assistance_clothing': _.sectors_cash_assistance_clothing,
      'use_mpca_assistance/sectors_cash_assistance_heating': _.sectors_cash_assistance_utilities_heating,
      'use_mpca_assistance/sectors_cash_assistance_healthcare': _.sectors_cash_assistance_healthcare,
      'use_mpca_assistance/sectors_cash_assistance_utilities': undefined,
      'use_mpca_assistance/sectors_cash_assistance_renovation_materials': undefined,
      'use_mpca_assistance/sectors_cash_assistance_rent': undefined,
      'use_mpca_assistance/sectors_cash_assistance_agricultural_inputs': undefined,
      'use_mpca_assistance/sectors_cash_assistance_hygiene_items': _.sectors_cash_assistance_hygiene_items,
      'use_mpca_assistance/sectors_cash_assistance_medication': undefined,
      'use_mpca_assistance/sectors_cash_assistance_education_materials': undefined,
      'use_mpca_assistance/sectors_cash_assistance_other_001': undefined,
      'use_mpca_assistance/receive_additional_5000': undefined,
      'delivery_process/assistance_delivered': _.assistance_delivered as Meal_cashPdm.Option<'assistance_delivered'>,
      'delivery_process/assistance_delivered_other': _.assistance_delivered_other,
      'delivery_process/satisfied_process': _.satisfied_process as Meal_cashPdm.Option<'satisfied_process'>,
      'delivery_process/satisfied_process_no': _.satisfied_process_no,
      'delivery_process/satisfied_cash_amount': _.satisfied_cash_amount as Meal_cashPdm.Option<'any_member_household'>,
      'delivery_process/amount_cash_received_correspond': undefined,
      'delivery_process/amount_cash_received_correspond_yes': undefined,
      'delivery_process/time_registered_assistance': undefined,
      'delivery_process/experience_problems': undefined,
      'delivery_process/experience_problems_yes': [_.experience_problems_yes] as Meal_cashPdm.Option<'experience_problems_yes'>[],
      'delivery_process/assistance_delivered_other_001': _.assistance_delivered_other_001,
      'delivery_process/organization_provide_information': _.organization_provide_information as Meal_cashPdm.Option<'any_member_household'>,
      'delivery_process/better_inform_distribution': [_.better_inform_distribution] as Meal_cashPdm.Option<'better_inform_distribution'>[],
      'delivery_process/better_inform_distribution_other': _.better_inform_distribution_other,
      'sufficiency/amount_paid_april': undefined,
      'sufficiency/amount_paid_april_no': undefined,
      'sufficiency/amount_paid_april_long': undefined,
      'sufficiency/amount_paid_april_long_other': undefined,
      'sufficiency/level_heating_improved': undefined,
      'sufficiency/level_heating_improved_dec_other': undefined,
      'sufficiency/type_fuel_most': undefined,
      'sufficiency/type_fuel_most_other': undefined,
      'sufficiency/received_feed_livestock_winter': undefined,
      'sufficiency/received_feed_livestock_winter_no': undefined,
      'sufficiency/received_feed_livestock_winter_long': undefined,
      'sufficiency/received_feed_livestock_winter_no_other': undefined,
      'sufficiency/amount_received_renovation_shelter': undefined,
      'sufficiency/amount_received_renovation_shelter_no': undefined,
      'sufficiency/completed_renovation_livestock': undefined,
      'sufficiency/completed_renovation_livestock_no': undefined,
      'sufficiency/completed_renovation_livestock_no_other': undefined,
      'sufficiency/plan_finish_renovation': undefined,
      'sufficiency/type_renovation': undefined,
      'sufficiency/type_renovation_other': undefined,
      'sufficiency/received_enough_agricultural_needs': undefined,
      'sufficiency/received_enough_agricultural_needs_no': undefined,
      'sufficiency/received_enough_agricultural_needs_long': undefined,
      'sufficiency/received_enough_agricultural_needs_long_other': undefined,
      'sufficiency/rent_benefit': _.rent_benefit as Meal_cashPdm.Option<'any_member_household'>,
      'sufficiency/rent_benefit_no': _.rent_benefit_no,
      'sufficiency/access_adequate_housing': _.access_adequate_housing as Meal_cashPdm.Option<'any_member_household'>,
      'sufficiency/improve_living': _.improve_living as Meal_cashPdm.Option<'improve_living'>,
      'sufficiency/improve_living_other': _.improve_living_other,
      'sufficiency/spent_cash_assistance': _.spent_cash_assistance as Meal_cashPdm.Option<'any_member_household'>,
      'sufficiency/spent_cash_assistance_yes': _.spent_cash_assistance_yes,
      'sufficiency/spent_cash_assistance_rent': _.spent_cash_assistance_rent as Meal_cashPdm.Option<'assistance_other_repairs_rate'>,
      'sufficiency/money_received': _.money_received as Meal_cashPdm.Option<'money_received'>,
      'sufficiency/money_received_other': _.money_received_other,
      'sufficiency/assistance_enough': _.assistance_enough as Meal_cashPdm.Option<'any_member_household'>,
      'sufficiency/assistance_enough_no': _.assistance_enough_no,
      'sufficiency/who_assisted': _.who_assisted as Meal_cashPdm.Option<'who_assisted'>,
      'sufficiency/who_assisted_other': _.who_assisted_other,
      'sufficiency/assistance_other_repairs': _.assistance_other_repairs as Meal_cashPdm.Option<'any_member_household'>,
      'sufficiency/assistance_other_repairs_yes': _.assistance_other_repairs_yes,
      'sufficiency/assistance_other_repairs_rate': _.assistance_other_repairs_rate as Meal_cashPdm.Option<'assistance_other_repairs_rate'>,
      'sufficiency/cash_assistance_timely': undefined,
      'sufficiency/brochure_provided': _.brochure_provided as Meal_cashPdm.Option<'brochure_provided'>,
      'income_generation/food_expenditures_assistance': undefined,
      'income_generation/food_expenditures_assistance_inc_dec': undefined,
      'income_generation/food_expenditures_assistance_inc': undefined,
      'income_generation/food_expenditures_assistance_other': undefined,
      'income_generation/household_increase_decrease_livestock_receiving': undefined,
      'income_generation/household_increase_decrease_livestock_receiving_inc_dec': undefined,
      'income_generation/household_increase_decrease_livestock_receiving_decreased': undefined,
      'income_generation/household_increase_decrease_livestock_receiving_other': undefined,
      'income_generation/comparison_last_year': undefined,
      'income_generation/comparison_last_year_other': undefined,
      'income_generation/consume_majority_crops': undefined,
      'income_generation/consume_majority_crops_no': undefined,
      'income_generation/opportunity_sell_production_excesses': undefined,
      'income_generation/opportunity_sell_production_excesses_no': undefined,
      'income_generation/after_assistance_natural_products': undefined,
      'income_generation/after_assistance_natural_products_inc_dec': undefined,
      'income_generation/after_assistance_natural_products_dec': undefined,
      'income_generation/after_assistance_natural_products_other': undefined,
      'income_generation/contacted_pay_amount': undefined,
      'income_generation/contacted_pay_amount_tax_local': undefined,
      'ability_cover_bn/currently_able_basic_needs': undefined,
      'ability_cover_bn/household_currently_have_clothing': _.household_currently_have_clothing as Meal_cashPdm.Option<'any_member_household'>,
      'ability_cover_bn/household_currently_have_clothing_no': undefined,
      'ability_cover_bn/household_currently_have_clothing_no_other': undefined,
      'ability_cover_bn/enough_water_household': undefined,
      'ability_cover_bn/enough_water_household_no': undefined,
      'ability_cover_bn/two_weeks_household': _.two_weeks_household as Meal_cashPdm.Option<'two_weeks_household'>,
      'coping_strategies/resort_any_following': undefined,
      'coping_strategies/lcs_sell_hh_assets': undefined,
      'coping_strategies/lcs_spent_savings': undefined,
      'coping_strategies/lcs_forrowed_food': undefined,
      'coping_strategies/lcs_eat_elsewhere': undefined,
      'coping_strategies/lcs_sell_productive_assets': undefined,
      'coping_strategies/lcs_reduce_health_expenditures': undefined,
      'coping_strategies/lcs_reduce_education_expenditures': undefined,
      'coping_strategies/lcs_sell_house': undefined,
      'coping_strategies/lcs_move_elsewhere': undefined,
      'coping_strategies/lcs_degrading_income_source': undefined,
      'coping_strategies/lcs_ask_stranger': undefined,
      'coping_strategies/lcs_reason': undefined,
      'coping_strategies/lcs_reason_other': undefined,
      'outcome/extent_household_basic_needs': undefined,
      'outcome/extent_household_basic_needs_define': undefined,
      'outcome/basic_needs_unable_fulfill_bha345': undefined,
      'outcome/basic_needs_unable_fulfill_other_bha345': undefined,
      'outcome/basic_needs_unable_fully_reason_bha345': undefined,
      'outcome/basic_needs_unable_fully_reason_other_bha345': undefined,
      'outcome/feel_safe_travelling': _.feel_safe_travelling as Meal_cashPdm.Option<'know_address_suggestions'>,
      'outcome/feel_safe_travelling_bad': _.feel_safe_travelling_bad,
      'outcome/feel_treated_respect': _.feel_treated_respect as Meal_cashPdm.Option<'know_address_suggestions'>,
      'outcome/feel_treated_respect_bad': undefined,
      'outcome/satisfied_assistance_provided': undefined,
      'outcome/satisfied_assistance_provided_bad': undefined,
      'outcome/know_people_needing': _.know_people_needing as Meal_cashPdm.Option<'know_address_suggestions'>,
      'outcome/know_people_needing_yes': _.know_people_needing_yes,
      'outcome/feel_informed_assistance': undefined,
      'outcome/feel_informed_assistance_bad': undefined,
      'outcome/account_organization_assistance': undefined,
      'outcome/account_organization_assistance_bad': undefined,
      'outcome/where_are_staying': undefined,
      'outcome/where_are_staying_other': undefined,
      'outcome/sufficient_living_spaces': undefined,
      'outcome/separate_space_adolescent_girls': undefined,
      'outcome/shelter_safe_wind': undefined,
      'outcome/issues_regarding_repaired': _.issues_regarding_repaired as Meal_cashPdm.Option<'any_member_household'>,
      'outcome/issues_regarding_repaired_yes': _.issues_regarding_repaired_yes,
      'outcome/shelter_assistance_return': _.shelter_assistance_return as Meal_cashPdm.Option<'any_member_household'>,
      'outcome/shelter_assistance_return_no': _.shelter_assistance_return_no,
      'outcome/planning_staying_repaired': _.planning_staying_repaired as Meal_cashPdm.Option<'planning_staying_repaired'>,
      'outcome/planning_staying_repaired_other': _.planning_staying_repaired_other,
      'outcome/planning_staying_repaired_no': _.planning_staying_repaired_no,
      'hi/square_metres': _.square_metres,
      'hi/sealed_bad_weather': undefined,
      'hi/access_running_water': _.access_running_water as Meal_cashPdm.Option<'access_heating'>,
      'hi/access_hot_water': _.access_hot_water as Meal_cashPdm.Option<'access_heating'>,
      'hi/access_washing_facilities': _.access_washing_facilities as Meal_cashPdm.Option<'access_heating'>,
      'hi/access_sanitation_facilities': _.access_sanitation_facilities as Meal_cashPdm.Option<'access_heating'>,
      'hi/access_heating': _.access_heating as Meal_cashPdm.Option<'access_heating'>,
      'hi/property_draft_proofing': _.property_draft_proofing as Meal_cashPdm.Option<'any_member_household'>,
      'hi/property_adequately_insulated': _.property_adequately_insulated as Meal_cashPdm.Option<'any_member_household'>,
      'hi/property_double_glazed_windows': _.property_double_glazed_windows as Meal_cashPdm.Option<'any_member_household'>,
      'hi/formal_agreement_landlord': _.formal_agreement_landlord as Meal_cashPdm.Option<'any_member_household'>,
      'hi/access_external_locked': _.access_external_locked as Meal_cashPdm.Option<'any_member_household'>,
      'hi/access_private_space': undefined,
      'hi/access_basic_electricity_gas': undefined,
      'safe/rent_assistance_timely_manner': undefined,
      'safe/feel_place_secure': undefined,
      'safe/feel_place_secure_other': undefined,
      'safe/feel_place_secure_no': undefined,
      'safe/living_conditions_result': undefined,
      'safe/current_living_space': _.current_living_space as Meal_cashPdm.Option<'any_member_household'>,
      'safe/access_basic_facilities': undefined,
      'safe/access_basic_facilities_no': undefined,
      'safe/living_conditions_deteriorated': undefined,
      'safe/living_conditions_deteriorated_no': undefined,
      'safe/assistance_dwelling_sufficiently': undefined,
      'safe/assistance_dwelling_sufficiently_no': undefined,
      'on/receive_shelter_assistance': _.receive_shelter_assistance as Meal_cashPdm.Option<'receive_shelter_assistance'>,
      'on/receive_shelter_assistance_no': _.receive_shelter_assistance_no,
      'on/needs_community_currently': _.needs_community_currently as Meal_cashPdm.Option<'needs_community_currently'>[],
      'on/needs_community_currently_other': _.needs_community_currently_other,
      'aap/any_member_household': _.any_member_household as Meal_cashPdm.Option<'any_member_household'>,
      'aap/any_member_household_yes': _.any_member_household_yes,
      'aap/provide_someone_commission': _.provide_someone_commission as Meal_cashPdm.Option<'provide_someone_commission'>,
      'aap/provide_someone_commission_yes': _.provide_someone_commission_yes as Meal_cashPdm.Option<'provide_someone_commission_yes'>,
      'aap/provide_someone_commission_yes_other': _.provide_someone_commission_yes_other,
      'aap/know_address_suggestions': _.know_address_suggestions as Meal_cashPdm.Option<'know_address_suggestions'>,
      'aap/know_address_suggestions_yes': _.know_address_suggestions_yes as Meal_cashPdm.Option<'know_address_suggestions_yes'>,
      'aap/know_address_suggestions_yes_ndnp': _.know_address_suggestions_yes_ndnp as Meal_cashPdm.Option<'know_address_suggestions_yes_ndnp'>,
      'aap/know_address_suggestions_yes_ndnp_other': _.know_address_suggestions_yes_ndnp_other,
      'aap/know_address_suggestions_no': _.know_address_suggestions_no as Meal_cashPdm.Option<'know_address_suggestions_no'>,
      'aap/know_address_suggestions_no_other': _.know_address_suggestions_no_other,
      'aap/submitted_feedback_complaint': _.submitted_feedback_complaint as Meal_cashPdm.Option<'submitted_feedback_complaint'>,
      'aap/comment': _.comment,
      not_thank: _.not_thank,
    }
  }
}