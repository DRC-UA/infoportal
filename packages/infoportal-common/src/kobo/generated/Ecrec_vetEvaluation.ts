export namespace Ecrec_vetEvaluation {
  export type Option<T extends keyof typeof options> = keyof (typeof options)[T]
  // Form id: a4iDDoLpUJHbu6cwsn2fnG
  export interface T {
    start: string
    end: string
    // general_information/id_form_vet [text] 1.1 ID form Training grants - we are now accepting applications
    id_form_vet: string | undefined
    // general_information/back_office [select_one] 1.2 Select Office
    back_office: undefined | Option<'back_office'>
    // general_information/back_enum [select_multiple] 1.3 Enumerator
    back_enum: undefined | Option<'back_enum'>[]
    // general_information/date_interview [date] 1.4 Date of the interview
    date_interview: Date | undefined
    // general_information/place_address [text] 1.5 Place, address:
    place_address: string | undefined
    // general_information/name_and_settlement [text] 1.6 Potential beneficiary name and settlement:
    name_and_settlement: string | undefined
    // general_information/tax_id [integer] 1.8 Potential beneficiary’s tax ID
    tax_id: number | undefined
    // training_needs/name_training [text] 2.1 The name of training the candidate wants to obtain
    name_training: string | undefined
    // training_needs/length_training [integer] 2.2 The length of the training, months
    length_training: number | undefined
    // training_needs/provider_training [text] 2.3 Possible provider of the training
    provider_training: string | undefined
    // training_needs/provide_formal_agreement [select_one] 2.4 Could the educational institution provide an official agreement and invoices that can confirm payment for the training in two installments?
    provide_formal_agreement: undefined | Option<'hh_char_preg'>
    // training_needs/modality_training [select_one] 2.5 The modality of the training and the capacity:
    modality_training: undefined | Option<'modality_training'>
    // training_needs/technical_capacity [select_one] 2.6 Do you a technical capacity?
    technical_capacity: undefined | Option<'hh_char_preg'>
    // training_needs/travel_training [select_one] 2.7 Do you have a possibility to travel for the training?
    travel_training: undefined | Option<'hh_char_preg'>
    // training_needs/cost_training [integer] 2.8 Total cost of the training, UAH
    cost_training: number | undefined
    // training_needs/grant_amount [integer] 2.9 Grant amount requested, UAH
    grant_amount: number | undefined
    // candidates_evaluation/motivation_training [text] 3.1 What is your motivation to enrol in the vocational training course?
    motivation_training: string | undefined
    // candidates_evaluation/motivation_training_rate [select_one] 3.1.1 Rate
    motivation_training_rate: undefined | Option<'training_benefit_individual_rate'>
    // candidates_evaluation/experience_field_training [text] 3.2 Experience in the field of the training requested
    experience_field_training: string | undefined
    // candidates_evaluation/experience_field_training_rate [select_one] 3.2.1 Rate
    experience_field_training_rate: undefined | Option<'training_benefit_individual_rate'>
    // candidates_evaluation/purpose_training [text] 3.3 The purpose of the training (employment/ self-employment)
    purpose_training: string | undefined
    // candidates_evaluation/purpose_training_rate [select_one] 3.3.1 Rate
    purpose_training_rate: undefined | Option<'training_benefit_individual_rate'>
    // candidates_evaluation/outline_new_skills [text] 3.4 Outline how exactly the new skills obtained will increase competitiveness in the job market or support the start of an own business
    outline_new_skills: string | undefined
    // candidates_evaluation/understand_market_demand [text] 3.5 Outline how you understand the market demand for the selected skill
    understand_market_demand: string | undefined
    // candidates_evaluation/primary_barriers_employment [text] 3.6 Primary barriers preventing your employment/self-employment
    primary_barriers_employment: string | undefined
    // candidates_evaluation/primary_barriers_employment_rate [select_one] 3.6.1 Rate
    primary_barriers_employment_rate: undefined | Option<'training_benefit_individual_rate'>
    // candidates_evaluation/assets_employment_skills [text] 3.7 Existing assets for employment/self-employment, such as skills, equipment, business plan starting capital etc
    assets_employment_skills: string | undefined
    // candidates_evaluation/assets_employment_skills_rate [select_one] 3.7.1 Rate
    assets_employment_skills_rate: undefined | Option<'training_benefit_individual_rate'>
    // candidates_evaluation/obstacles_covering_course [text] 3.8 Obstacles to covering the course expenses with your own funds
    obstacles_covering_course: string | undefined
    // candidates_evaluation/obstacles_covering_course_rate [select_one] 3.8.1 Rate
    obstacles_covering_course_rate: undefined | Option<'training_benefit_individual_rate'>
    // candidates_evaluation/similar_programs_ngo [text] 3.9 Participation in similar programs from others NGO, which and when
    similar_programs_ngo: string | undefined
    // candidates_evaluation/similar_programs_ngo_rate [select_one] 3.9.1 Rate
    similar_programs_ngo_rate: undefined | Option<'training_benefit_individual_rate'>
    // candidates_evaluation/training_benefit_individual [text] 3.10 How would this training programme benefit this individual in obtaining long-term employment?
    training_benefit_individual: string | undefined
    // candidates_evaluation/training_benefit_individual_rate [select_one] 3.10.1 Rate
    training_benefit_individual_rate: undefined | Option<'training_benefit_individual_rate'>
    // candidates_evaluation/confirm_able_regularly_training [select_one] 3.11 Please confirm that you will be able to regularly attend the training course sessions for the entire duration of the course
    confirm_able_regularly_training: undefined | Option<'hh_char_preg'>
    // candidates_evaluation/training_costs_yourself [select_one] 3.12 if you are required to commute to the training venue, are you able to bear these costs yourself?
    training_costs_yourself: undefined | Option<'hh_char_preg'>
    // candidates_evaluation/estimated_transportations_costs [integer] 3.13 What would be the estimated transportations costs for the entire duration of the course?
    estimated_transportations_costs: number | undefined
    // hh_char/ben_det_hh_size [integer] 4.1 Indicate the total number of people in your household, including the head of household
    ben_det_hh_size: number | undefined
    // hh_char/info [note] This information is being collected to gather more information about the level of vulnerability of you and your household
    info: string
    // hh_char/hh_char_hh_det [begin_repeat] 4.2 Household Members
    hh_char_hh_det:
      | {
          hh_char_hh_det_gender: undefined | Option<'hh_char_hh_det_gender'> | undefined
          hh_char_hh_det_age: number | undefined | undefined
          hh_char_hh_det_dis_select: undefined | Option<'hh_char_hh_det_dis_select'>[] | undefined
          hh_char_hh_det_dis_level: undefined | Option<'hh_char_hh_det_dis_level'> | undefined
          'calc_female_1-6': string | undefined
          calc_female_7_17: string | undefined
          calc_female_18_25: string | undefined
          calc_female_26_49: string | undefined
          calc_female_50_59: string | undefined
          calc_female_over_60: string | undefined
          'calc_male_1-6': string | undefined
          calc_male_7_17: string | undefined
          calc_male_18_25: string | undefined
          calc_male_26_49: string | undefined
          calc_male_50_59: string | undefined
          calc_male_over_60: string | undefined
          calc_det_dis_level: string | undefined
          calc_preg: string | undefined
        }[]
      | undefined
    // hh_char/calc_tot_female_1-6 [calculate] Total number of female aged 1 to 6 years
    'calc_tot_female_1-6': string
    // hh_char/calc_tot_female_7_17 [calculate] Total number of female aged 7 to 17 years
    calc_tot_female_7_17: string
    // hh_char/calc_tot_female_18_25 [calculate] Total number of female aged 18 to 25 years
    calc_tot_female_18_25: string
    // hh_char/calc_tot_female_26_49 [calculate] Total number of female aged 26 to 49 years
    calc_tot_female_26_49: string
    // hh_char/calc_tot_female_50_59 [calculate] Total number of female aged 50 to 59 years
    calc_tot_female_50_59: string
    // hh_char/calc_tot_female_over_60 [calculate] Total number of female aged over 59 years
    calc_tot_female_over_60: string
    // hh_char/calc_tot_male_1-6 [calculate] Total number of male aged 1 to 6 years
    'calc_tot_male_1-6': string
    // hh_char/calc_tot_male_7_17 [calculate] Total number of male aged 7 to 17 years
    calc_tot_male_7_17: string
    // hh_char/calc_tot_male_18_25 [calculate] Total number of male aged 18 to 25 years
    calc_tot_male_18_25: string
    // hh_char/calc_tot_male_26_49 [calculate] Total number of male aged 26 to 49 years
    calc_tot_male_26_49: string
    // hh_char/calc_tot_male_50_59 [calculate] Total number of male aged 50 to 59 years
    calc_tot_male_50_59: string
    // hh_char/calc_tot_male_over_60 [calculate] Total number of male aged over 59 years
    calc_tot_male_over_60: string
    // hh_char/calc_tot_female [calculate] Total number of female
    calc_tot_female: string
    // hh_char/calc_tot_male [calculate] Total number of male
    calc_tot_male: string
    // hh_char/calc_tot_1-6 [calculate] Total number of people aged 1 to 6 years
    'calc_tot_1-6': string
    // hh_char/calc_tot_7_17 [calculate] Total number of people aged 7 to 17 years
    calc_tot_7_17: string
    // hh_char/calc_tot_18_25 [calculate] Total number of people aged 18 to 25 years
    calc_tot_18_25: string
    // hh_char/calc_tot_26_49 [calculate] Total number of people aged 26 to 49 years
    calc_tot_26_49: string
    // hh_char/calc_tot_50_59 [calculate] Total number of people aged 50 to 59 years
    calc_tot_50_59: string
    // hh_char/calc_tot_over_60 [calculate] Total number of people aged over 59 years
    calc_tot_over_60: string
    // hh_char/calc_tot_dis_level [calculate] Total number of people with disabilities
    calc_tot_dis_level: string
    // hh_char/beneficiarys_status [select_one] 4.3 Beneficiary’s marital status
    beneficiarys_status: undefined | Option<'beneficiarys_status'>
    // hh_char/beneficiarys_age [integer] 4.4 Potential beneficiary’s age
    beneficiarys_age: number | undefined
    // hh_char/you_breadwinner [select_one] 4.5 Are you the breadwinner for your HH?
    you_breadwinner: undefined | Option<'hh_char_preg'>
    // hh_char/hh_char_preg [select_one] 4.6 Are any of the women in your household pregnant or lactating?
    hh_char_preg: undefined | Option<'hh_char_preg'>
    // hh_char/numb_hh_char_preg [integer] 4.6.1 How many women in your household are pregnant or breastfeeding?
    numb_hh_char_preg: number | undefined
    // hh_char/hh_char_chh [note] This is a child headed household (high risk protection case), please refer immediately to a DRC Protection colleague and complete internal referral form.
    hh_char_chh: string
    // income/type_income [select_multiple] 5.1 The household income, UAH
    type_income: undefined | Option<'type_income'>[]
    // income/income_profit_business [integer] 5.1.1 Income for Profit from business or self-employment
    income_profit_business: number | undefined
    // income/income_formal_employment [integer] 5.1.2 Income for Formal Employment
    income_formal_employment: number | undefined
    // income/income_informal_employment [integer] 5.1.3 Income for Informal Employment
    income_informal_employment: number | undefined
    // income/income_pensions [integer] 5.1.4 Income for Pensions
    income_pensions: number | undefined
    // income/income_government_idp [integer] 5.1.5 Income for Government Allowance for IDPs
    income_government_idp: number | undefined
    // income/income_social_benefits_idp [integer] 5.1.6 Income for Social Benefits other than Pensions or Government Allowance for IDPs
    income_social_benefits_idp: number | undefined
    // income/income_remittances [integer] 5.1.7 Income for Remittances
    income_remittances: number | undefined
    // income/income_private [integer] 5.1.8 Income for Private Income such as Rents, Interest, etc.
    income_private: number | undefined
    // income/income_borrow_money [integer] 5.1.9 Income for Borrow Money from Family or Friends
    income_borrow_money: number | undefined
    // income/income_savings [integer] 5.1.10 Income for Savings
    income_savings: number | undefined
    // income/type_income_other [text] 5.1.11 If "Other", please specify
    type_income_other: string | undefined
    // income/income_other [integer] 5.1.11.1 Income for Other
    income_other: number | undefined
    // income/total_income [calculate] Total income
    total_income: string
    // income/disp_total_income [note] Total income : ${total_income}
    disp_total_income: string
    // income/family_impacted_conflict [select_multiple] 5.2 How have you or your family been impacted by the conflict?
    family_impacted_conflict: undefined | Option<'family_impacted_conflict'>[]
    // income/family_impacted_conflict_other [text] 5.2.1 If "Other", please specify
    family_impacted_conflict_other: string | undefined
    // fin_det/total_score [calculate] Total score
    total_score: string
    // fin_det/disp_total_score [note] Total score: ${total_score}
    disp_total_score: string
    // fin_det/detailed_household [text] 6.1 Detailed description of the household situation:
    detailed_household: string | undefined
  }
  export const options = {
    hh_char_preg: {
      yes: `Yes`,
      no: `No`,
    },
    modality_training: {
      online: `Online`,
      offline: `Offline`,
      hybrid: `Hybrid`,
    },
    training_benefit_individual_rate: {
      one: `1`,
      two: `2`,
      three: `3`,
      four: `4`,
      five: `5`,
    },
    beneficiarys_status: {
      married: `Married`,
      not_married: `Not married`,
    },
    type_income: {
      profit_business: `Profit from business or self-employment`,
      formal_employment: `Formal Employment`,
      informal_employment: `Informal Employment`,
      pensions: `Pensions`,
      government_idp: `Government Allowance for IDPs`,
      social_benefits_idp: `Social Benefits other than Pensions or Government Allowance for IDPs`,
      remittances: `Remittances`,
      private_income: `Private Income such as Rents, Interest, etc.`,
      borrow_money: `Borrow Money from Family or Friends`,
      savings: `Savings`,
      other: `Other`,
    },
    hh_char_hh_det_dis_select: {
      diff_see: `Have difficulty seeing, even if wearing glasses`,
      diff_hear: `Have difficulty hearing, even if using a hearing aid`,
      diff_walk: `Have difficulty walking or climbing steps`,
      diff_rem: `Have difficulty remembering or concentrating`,
      diff_care: `Have difficulty with self-care such as washing all over or dressing`,
      diff_comm: `Have difficulty communicating, for example understanding or being understood`,
      diff_none: `None of the above apply`,
    },
    hh_char_hh_det_dis_level: {
      zero: `No, no difficulty`,
      one: `Yes, some difficulty`,
      two: `Yes, a lot of difficulty`,
      fri: `Cannot do at all`,
    },
    hh_char_hh_det_gender: {
      male: `Male`,
      female: `Female`,
    },
    back_office: {
      dnk: `Dnipro (DNK)`,
      nlv: `Mykloaiv (NLV)`,
    },
    back_enum: {
      alina_bondarenko: `Alina Bondarenko`,
      maksym_mykytas: `Maksym Mykytas`,
      vita_zolotarevska: `Vita Zolotarevska`,
      olha_sakharnova: `Olha Sakharnova`,
      andrii_matvieiev: `Andrii Matvieiev`,
      sofiia_berezhna: `Sofiia Berezhna`,
      illia_kutsenko: `Illia Kutsenko`,
      tetiana_tsapii: `Tetiana Tsapii`,
      nataliia_lanina: `Nataliia Lanina`,
      svitlana_labunska: `Svitlana Labunska`,
      olena_suhoniak: `Olena Suhoniak`,
      mykola_marchenko: `Mykola Marchenko`,
      oleksii_marchenko: `Oleksii Marchenko`,
      nikita_zubenko: `Nikita Zubenko`,
    },
    undefined: {
      yes: `Yes`,
      no_option: `No option`,
    },
    family_impacted_conflict: {
      being_internally_displaced: `Being internally displaced`,
      house_damaged_destroyed: `House has been damaged or destroyed`,
      lost_job_income: `Lost job or other income source(s) due to conflict dynamics`,
      loss_business: `Loss of business due to conflict-related market disruptions`,
      injury_loss_breadwinner: `Injury/traumatisation of or loss of breadwinner`,
      hosing_idp: `Hosing IDPs (free of charge)`,
      being_returnee: `Being a returnee`,
      living_area_conflict_affected: `Living in an area designated by the government as conflict-affected`,
      other: `Other`,
    },
  } as const

  const extractQuestionName = (_: Record<string, any>) => {
    const output: any = {}
    Object.entries(_).forEach(([k, v]) => {
      const arr = k.split('/')
      const qName = arr[arr.length - 1]
      output[qName] = v
    })
    return output
  }

  export const map = (_: Record<keyof T, any>): T =>
    ({
      ..._,
      back_enum: _.back_enum?.split(' '),
      date_interview: _.date_interview ? new Date(_.date_interview) : undefined,
      tax_id: _.tax_id ? +_.tax_id : undefined,
      length_training: _.length_training ? +_.length_training : undefined,
      cost_training: _.cost_training ? +_.cost_training : undefined,
      grant_amount: _.grant_amount ? +_.grant_amount : undefined,
      estimated_transportations_costs: _.estimated_transportations_costs
        ? +_.estimated_transportations_costs
        : undefined,
      ben_det_hh_size: _.ben_det_hh_size ? +_.ben_det_hh_size : undefined,
      hh_char_hh_det: _['hh_char_hh_det']?.map(extractQuestionName).map((_: any) => {
        _['hh_char_hh_det_age'] = _.hh_char_hh_det_age ? +_.hh_char_hh_det_age : undefined
        _['hh_char_hh_det_dis_select'] = _.hh_char_hh_det_dis_select?.split(' ')
        return _
      }),
      beneficiarys_age: _.beneficiarys_age ? +_.beneficiarys_age : undefined,
      numb_hh_char_preg: _.numb_hh_char_preg ? +_.numb_hh_char_preg : undefined,
      type_income: _.type_income?.split(' '),
      income_profit_business: _.income_profit_business ? +_.income_profit_business : undefined,
      income_formal_employment: _.income_formal_employment ? +_.income_formal_employment : undefined,
      income_informal_employment: _.income_informal_employment ? +_.income_informal_employment : undefined,
      income_pensions: _.income_pensions ? +_.income_pensions : undefined,
      income_government_idp: _.income_government_idp ? +_.income_government_idp : undefined,
      income_social_benefits_idp: _.income_social_benefits_idp ? +_.income_social_benefits_idp : undefined,
      income_remittances: _.income_remittances ? +_.income_remittances : undefined,
      income_private: _.income_private ? +_.income_private : undefined,
      income_borrow_money: _.income_borrow_money ? +_.income_borrow_money : undefined,
      income_savings: _.income_savings ? +_.income_savings : undefined,
      income_other: _.income_other ? +_.income_other : undefined,
      family_impacted_conflict: _.family_impacted_conflict?.split(' '),
    }) as T
}
