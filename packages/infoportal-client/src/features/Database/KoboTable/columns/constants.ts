import {KoboIndex} from 'infoportal-common'

const EXCLUDED_COLUMNS_MAP: Map<string, string[]> = new Map([
  [KoboIndex.byName('va_bio_tia').id, ['case_status', 'date_paid']],
])

const REPEAT_GROUP_BUTTON_REPLACEMENT: Record<string, Record<string, string>> = {
  [KoboIndex.byName('meal_impactAssessment').id]: {
    q_types_support: 'types_support',
    q_most_urgent_needs: 'most_urgent_needs',
    q_most_urgent_needs_today: 'most_urgent_needs_today',
    q_discuss_order_support: 'most_discuss_order_support',
    q_combination_support_changed: 'combination_support_changed',
    q_changed_lives_support: 'changed_lives_support',
    q_services_more_useful: 'services_more_useful',
    q_everyone_needed_help: 'everyone_needed_help',
    q_feel_treated_respect: 'feel_treated_respect',
    q_know_give_feedback: 'know_give_feedback',
    q_should_drc_improve: 'should_drc_improve',
  },
  [KoboIndex.byName('meal_fgdPamShelterSpp').id]: {
    q_aware_solar_panels: 'aware_solar_panels',
    q_outages_duration: 'outages_duration',
    q_describe_situation_electricity: 'describe_situation_electricity',
    q_access_electricity_improved: 'access_electricity_improved',
    q_informed_project_goals: 'informed_project_goals',
    q_need_spp_information: 'need_spp_information',
    q_assistance_agreed_energy: 'assistance_agreed_energy',
    q_changes_operation_institution: 'changes_operation_institution',
    q_issues_still_spp: 'issues_still_spp',
    q_concerns_installation_spp: 'concerns_installation_spp',
    q_satisfied_results_spp: 'satisfied_results_spp',
    q_more_energy_secure: 'more_energy_secure',
    q_timely_institution_spp: 'timely_institution_spp',
    q_spp_installation_reliability: 'spp_installation_reliability',
    q_inform_provide_feedback: 'inform_provide_feedback',
    q_cfm_flyers_distributed: 'cfm_flyers_distributed',
    q_employees_requested_exchange: 'employees_requested_exchange',
    q_contractor_requested_exchange: 'contractor_requested_exchange',
  },
}

export {EXCLUDED_COLUMNS_MAP, REPEAT_GROUP_BUTTON_REPLACEMENT}
