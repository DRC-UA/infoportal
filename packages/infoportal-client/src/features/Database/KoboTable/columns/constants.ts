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
}

export {EXCLUDED_COLUMNS_MAP, REPEAT_GROUP_BUTTON_REPLACEMENT}
