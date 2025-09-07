import {Meal_cashPdm, Bn_pam} from 'infoportal-common'
import {pick, yn} from './utils'
import {MapFields} from '@/features/Meal/Cash/Mappers/mapFields'

const manualAliases: Partial<Record<keyof typeof Meal_cashPdm.options, Record<string, string>>> = {
  satisfied_process: {
    very_satisfied: 'ndyl',
    somewhat_satisfied: 'ndyf',
    not_very_satisfied: 'ndnr',
    not_satisfied_all: 'ndna',
  },
  sectors_cash_assistance: {
    food: 'stfo',
    nfi: 'sthh',
    clothing: 'stcl',
    heating: 'sthe',
    healtcare: 'stha',
    renovation_materials: 'strn',
    rent: 'stre',
    agricultural_inputs: 'star',
    hygiene_items: 'sthg',
    utilities: 'stut',
    medication: 'stme',
    education: 'steu',
    other: 'other',
  },
  time_registered_assistance: {
    less_week: 'trlw',
    one_week: 'trow',
    two_week: 'trtw',
    three_week: 'trhw',
    four_more: 'trfw',
    havent_received: 'trrm',
  },
  experience_problems_yes: {
    long: 'pbrl',
    excluded_groups: 'pbrc',
    unclear: 'pbrp',
    many_documents: 'pbrm',
    other: 'other',
  },
  better_inform_distribution: {
    before_distribution: 'dbbd',
    during_distribution: 'dbdd',
    after_distribution: 'dbcd',
    date_distribution: 'dbad',
    time_distribution: 'dbtd',
    all_fine: 'all_fine',
    other: 'other',
  },
  know_address_suggestions: {
    yes_completely: 'rcyc',
    mostly_yes: 'rcmy',
    not_really: 'rcnr',
    not_all: 'rcnt',
    dk: 'rcdk',
    na: 'rcna',
  },
  assistance_delivered: {
    transfer_without_card: 'asba',
    ukrposhta: 'asuk',
    bank_account: 'asbc',
    card: 'asca',
    nova_poshta: 'asnp',
    western_union: 'aswu',
    other: 'other',
  },
  submitted_feedback_complaint: {
    completely: 'smyc',
    rather: 'smry',
    not_answered: 'smnn',
    na: 'smna',
  },
  office: {
    hrk: 'kharkiv',
    chernihiv: 'chernihiv',
    sumy: 'sumy',
    mykolaiv: 'mykolaiv',
    lviv: 'lviv',
    zaporizhzhya: 'zaporizhzhya',
    slovyansk: 'slovyansk',
    dnipro: 'dnipro',
  },
}

function buildAutoAliases(
  srcOptions: Record<string, any>,
  dstOptions: Record<string, any>,
): Record<string, Record<string, string>> {
  const res: Record<string, Record<string, string>> = {}
  const fields = Object.keys(dstOptions)
  for (const field of fields) {
    const dst = dstOptions[field]
    const src = (srcOptions as any)[field]
    if (!dst || typeof dst !== 'object' || Array.isArray(dst)) continue
    if (!src || typeof src !== 'object' || Array.isArray(src)) continue

    const map: Record<string, string> = {}

    for (const key of Object.keys(src)) {
      if (key in dst) map[key] = key
    }
    const dstByLabel = new Map<string, string>()
    for (const [k, v] of Object.entries(dst)) dstByLabel.set(String(v), k)
    for (const [sKey, sLbl] of Object.entries(src)) {
      const hit = dstByLabel.get(String(sLbl))
      if (hit) map[sKey] = hit
    }

    if (Object.keys(map).length) res[field] = map
  }
  return res
}

const autoAliases = buildAutoAliases(Bn_pam.options as any, Meal_cashPdm.options as any)

function toMealKey<K extends keyof typeof Meal_cashPdm.options>(
  val: string | undefined,
  field: K | undefined,
): keyof (typeof Meal_cashPdm.options)[K] | undefined {
  if (!val || !field) return undefined

  const dst = Meal_cashPdm.options[field] as Record<string, string>
  const src = (Bn_pam.options as any)[field] as Record<string, string> | undefined
  const manual = (manualAliases[field] || {}) as Record<string, string>
  const auto = (autoAliases[field as string] || {}) as Record<string, string>

  if (val in dst) return val as any
  if (val in manual) return manual[val] as any
  if (val in auto) return auto[val] as any
  const byDstLabel = Object.entries(dst).find(([, lbl]) => lbl === val)?.[0]
  if (byDstLabel) return byDstLabel as any
  if (src) {
    const srcKey = Object.entries(src).find(([, lbl]) => lbl === val)?.[0]
    if (srcKey) {
      if (srcKey in manual) return manual[srcKey] as any
      if (srcKey in auto) return auto[srcKey] as any
      if (srcKey in dst) return srcKey as any
    }
  }
  return undefined
}

function toMealKeys<K extends keyof typeof Meal_cashPdm.options>(
  val: string | string[] | undefined,
  field: K | undefined,
): string | undefined {
  if (!val || !field) return undefined
  const items = Array.isArray(val) ? val : String(val).split(' ').filter(Boolean)
  const mapped = items.map((v) => toMealKey(v, field)).filter(Boolean) as string[]
  return mapped.length ? mapped.join(' ') : undefined
}

const map1 = <K extends keyof typeof Meal_cashPdm.options>(v?: string, k?: K) => toMealKey(v, k)
const mapM = <K extends keyof typeof Meal_cashPdm.options>(v?: string | string[], k?: K) => toMealKeys(v, k)

export function normalizeBnPamToMealPdmAnswers(src: Bn_pam.T): Meal_cashPdm.T {
  const pdmtype = MapFields.mapCashTypeBnToMeal((src as any).did_receive_cash_yes)

  const out: any = {
    start: src.start,
    end: src.end,
    date: src.date,
    interviever_name: src.interviever_name,
    date_interview: src.date_interview,
    donor: MapFields.donorIfExact(src.donor),
    donor_other: src.donor_other,
    office: MapFields.officeIfExact(src.office),

    unique_number: src.unique_number,

    not_loc: pick(src, 'not_location') ?? ('' as string),
    ben_det_oblast: src.ben_det_oblast,
    ben_det_raion: src.ben_det_raion,
    ben_det_hromada: src.ben_det_hromada,
    place_distribution: pick(src, 'ben_det_settelment'),

    age: src.age,
    sex: src.sex,
    status_person: src.status_person,
    how_many_family: src.how_many_family,
    number_female: undefined,
    number_male: undefined,
    number_disabilities: src.number_disabilities,

    agree_interviewed: yn(src.agree_interviewed) as any,

    did_receive_cash: src.did_receive_cash
      ? (src.did_receive_cash as unknown as Meal_cashPdm.Option<'any_member_household'>)
      : undefined,
    did_receive_cash_no: undefined,

    pdmtype: pdmtype ?? undefined,

    spent_cash_assistance_received: yn(src.spent_cash_assistance_received) as any,
    spent_cash_assistance_received_no: src.spent_cash_assistance_received_no,
    spent_cash_assistance_received_no_mait_reason: src.spent_cash_assistance_received_no_mait_reason,
    spend_cash_received: undefined,

    sectors_cash_assistance: mapM(src.sectors_cash_assistance, 'sectors_cash_assistance'),
    sectors_cash_assistance_other: src.sectors_cash_assistance_other,
    sectors_cash_assistance_food: src.sectors_cash_assistance_food,
    sectors_cash_assistance_hh_nfis: src.sectors_cash_assistance_hh_nfis,
    sectors_cash_assistance_clothing: src.sectors_cash_assistance_clothing,
    sectors_cash_assistance_heating: src.sectors_cash_assistance_heating,
    sectors_cash_assistance_healthcare: src.sectors_cash_assistance_healthcare,
    sectors_cash_assistance_utilities: src.sectors_cash_assistance_utilities,
    sectors_cash_assistance_renovation_materials: src.sectors_cash_assistance_renovation_materials,
    sectors_cash_assistance_rent: src.sectors_cash_assistance_rent,
    sectors_cash_assistance_agricultural_inputs: src.sectors_cash_assistance_agricultural_inputs,
    sectors_cash_assistance_hygiene_items: src.sectors_cash_assistance_hygiene_items,
    sectors_cash_assistance_medication: src.sectors_cash_assistance_medication,
    sectors_cash_assistance_education_materials: src.sectors_cash_assistance_education_materials,
    sectors_cash_assistance_other_001: src.sectors_cash_assistance_other_spend,

    receive_additional_5000: undefined,

    assistance_delivered: map1((src as any).assistance_delivered, 'assistance_delivered'),
    assistance_delivered_other: undefined,
    satisfied_process: map1(src.satisfied_process, 'satisfied_process'),
    satisfied_process_no: src.satisfied_process_no,
    satisfied_cash_amount: yn(src.satisfied_cash_amount) as any,
    amount_cash_received_correspond: yn(src.amount_cash_received_correspond) as any,
    amount_cash_received_correspond_yes: undefined,
    time_registered_assistance: map1(src.time_registered_assistance, 'time_registered_assistance'),
    experience_problems: yn(src.experience_problems) as any,
    experience_problems_yes: mapM(src.experience_problems_yes, 'experience_problems_yes'),
    assistance_delivered_other_001: src.experience_problems_yes_other,
    organization_provide_information: yn(src.organization_provide_information) as any,
    better_inform_distribution: mapM(src.better_inform_distribution, 'better_inform_distribution'),
    better_inform_distribution_other: src.better_inform_distribution_other,

    received_enough_agricultural_needs_long: map1(
      src.received_enough_agricultural_needs_long,
      'received_enough_agricultural_needs_long',
    ),
    received_enough_agricultural_needs_long_other: src.received_enough_agricultural_needs_long_other,

    extent_household_basic_needs_define: map1(pick(src, 'extent_needs_define'), 'extent_household_basic_needs_define'),

    feel_safe_travelling: map1(src.feel_safe_travelling, 'know_address_suggestions'),
    feel_safe_travelling_bad: src.feel_safe_travelling_bad,
    feel_treated_respect: map1(src.feel_treated_respect, 'know_address_suggestions'),
    feel_treated_respect_bad: src.feel_treated_respect_bad,
    satisfied_assistance_provided: map1(src.satisfied_assistance_provided, 'know_address_suggestions'),
    satisfied_assistance_provided_bad: src.satisfied_assistance_provided_bad,
    know_people_needing: map1(src.know_people_needing, 'know_address_suggestions'),
    know_people_needing_yes: src.know_people_needing_yes,
    account_organization_assistance: map1(src.account_organization_assistance, 'know_address_suggestions'),
    account_organization_assistance_bad: src.account_organization_assistance_bad,
    feel_informed_assistance: map1(src.feel_informed_assistance, 'know_address_suggestions'),
    feel_informed_assistance_bad: src.feel_informed_assistance_bad,
    where_are_staying: map1(src.where_are_staying, 'where_are_staying'),
    where_are_staying_other: src.where_are_staying_other,

    any_member_household: yn(src.any_member_household) as any,
    any_member_household_yes: src.any_member_household_yes,
    provide_someone_commission: map1(src.provide_someone_commission, 'provide_someone_commission'),
    provide_someone_commission_yes: map1(src.provide_someone_commission_yes, 'provide_someone_commission_yes'),
    provide_someone_commission_yes_other: src.provide_someone_commission_yes_other,
    know_address_suggestions: map1(src.know_address_suggestions, 'know_address_suggestions'),
    know_address_suggestions_yes: map1(src.know_address_suggestions_yes, 'know_address_suggestions_yes'),
    know_address_suggestions_yes_ndnp: map1(src.know_address_suggestions_yes_ndnp, 'know_address_suggestions_yes_ndnp'),
    know_address_suggestions_yes_ndnp_other: src.know_address_suggestions_yes_ndnp_other,
    know_address_suggestions_no: map1(src.know_address_suggestions_no, 'know_address_suggestions_no'),
    know_address_suggestions_no_other: src.know_address_suggestions_no_other,
    submitted_feedback_complaint: map1((src as any).submitted_complaint, 'submitted_feedback_complaint'),

    comment: src.comment,
    not_thank: src.not_thank,
  }

  if ((src as any).needs_community_currently) {
    out.needs_community_currently = (src as any).needs_community_currently
    out.needs_community_currently_other = (src as any).needs_community_currently_other
  }

  return Meal_cashPdm.map(out)
}
