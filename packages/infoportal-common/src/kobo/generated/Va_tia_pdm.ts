export namespace Va_tia_pdm {
  export type Option<T extends keyof typeof options> = keyof (typeof options)[T]

  // Form id: aM29e4jscqujByABmvDLcW
  export interface T {
    start: string
    end: string
    // not_ind [note] Danish Refugee Council in Ukraine provides the targeted individual assistance to EO victims. We are conducting final review now. Please, answer a few questions to help us assess and improve the quality of our services.
    not_ind: string
    // project_ID [select_one] Project ID
    project_ID: undefined | Option<'project_ID'>
    // office [select_one] Office DRC
    office: undefined | Option<'office'>
    // case_id [text] Сase #
    case_id: string | undefined
    // tia_id [text] TIA ID
    tia_id: string | undefined
    // phone_number [integer] Phone number
    phone_number: number | undefined
    // date_receiving [date] Date of cash receiving
    date_receiving: Date | undefined
    // accessibility_interview [select_one] Accessibility of beneficiary for interview:
    accessibility_interview: undefined | Option<'receive_help_drc'>
    // accessibility_interview_no [text] If no, please provide your comment
    accessibility_interview_no: string | undefined
    // agree_survey [select_one] Are you agree to participate in survey?
    agree_survey: undefined | Option<'receive_help_drc'>
    // general_information/date [date] Date:
    date: Date | undefined
    // general_information/gender [select_one] Gender
    gender: undefined | Option<'gender'>
    // general_information/age [integer] Age
    age: number | undefined
    // general_information/receive_help_drc [select_one] Did you receive help from DRC representatives?
    receive_help_drc: undefined | Option<'receive_help_drc'>
    // general_information/what_assistance_drc [select_multiple] What assistance was approved by DRC?
    what_assistance_drc: undefined | Option<'what_assistance_drc'>[]
    // general_information/what_assistance_drc_other [text] If "Other", please specify
    what_assistance_drc_other: string | undefined
    // general_information/what_assistance_drc_exactly [text] What assistance from the DRC was approved: what exactly
    what_assistance_drc_exactly: string | undefined
    // general_information/money_spent_yn [select_one] Was the received financial assistance spent?
    money_spent_yn: undefined | Option<'money_spent'>
    // general_information/money_spent_yn_why [text] If "No" or "Partially", why?
    money_spent_yn_why: string | undefined
    // general_information/money_spent_yn_when [text] If "No" or "Partially", when do you plan to spend money?
    money_spent_yn_when: string | undefined
    // form_partially/rate_satisfaction_assistance_partially [select_one] With reference to the following scale, how would you rate the level of your satisfaction with the assistance received? (MEA 1)
    rate_satisfaction_assistance_partially: undefined | Option<'feel_drc_staff_security_no_001'>
    // form_partially/rate_satisfaction_assistance_partially_bad [select_multiple] If 'not really', 'not at all', 'don't know', please specify
    rate_satisfaction_assistance_partially_bad: undefined | Option<'rate_satisfaction_assistance_no_bad'>[]
    // form_partially/rate_satisfaction_assistance_partially_bad_other [text] Please, specify if other
    rate_satisfaction_assistance_partially_bad_other: string | undefined
    // form_partially/scale_situation_consideration_partially [select_one] With reference to the following scale, were your view or situation taken into consideration during provision of assistance? (PEM 1)
    scale_situation_consideration_partially: undefined | Option<'without_DRC_no'>
    // form_partially/scale_situation_consideration_partially_bad [text] If 'not really', 'not at all', 'don't know', please specify
    scale_situation_consideration_partially_bad: string | undefined
    // form_partially/informing_partially [select_one] With reference to the following scale, were you made aware of the services available to EO survivors (financial support, legal support etc.)? (PEM 2)
    informing_partially: undefined | Option<'without_DRC_no'>
    // form_partially/informing_partially_partially_bad [text] If not at all/A little/Not sure, please, specify /
    informing_partially_partially_bad: string | undefined
    // form_partially/scale_challenges_accessing_drc_assistance_partially [select_one] With reference to the following scale, did you have any challenges in accessing DRC assistance?
    scale_challenges_accessing_drc_assistance_partially:
      | undefined
      | Option<'scale_challenges_accessing_drc_assistance_no'>
    // form_partially/scale_challenges_accessing_drc_assistance_partially_yes [text] If Greatly/A little/Not sure, please, specify
    scale_challenges_accessing_drc_assistance_partially_yes: string | undefined
    // form_partially/without_DRC_partially [select_one] With reference to the following scale, will you be able to access the services you need in the future without DRC's support?
    without_DRC_partially: undefined | Option<'without_DRC_no'>
    // form_partially/without_DRC_partially_if [text] If not at all/A little/Not sure, please, specify
    without_DRC_partially_if: string | undefined
    // form_partially/scale_assistance_time_partially [select_one] With reference to the following scale, do you consider assistance to be on time?
    scale_assistance_time_partially: undefined | Option<'scale_assistance_time_no'>
    // form_partially/scale_assistance_time_partially_bad [text] If not at all/A little/Not sure, please, specify
    scale_assistance_time_partially_bad: string | undefined
    // form_partially/know_address_feedback_partially [select_one] Do you know how and where you could address your suggestions, feedback or complaints regarding the work of the DRC, if any? (AAC 1)
    know_address_feedback_partially: undefined | Option<'feel_drc_staff_security_no_001'>
    // form_partially/know_address_feedback_partially_no [note] To provide feedback (complaints, feedback, thanks, recommendations) you can use the phone number 0 800 33 95 18
    know_address_feedback_partially_no: string
    // form_partially/feel_drc_staff_security_partially [select_one] Did you feel safe all time communicating with DRC staff? (SDH 1)
    feel_drc_staff_security_partially: undefined | Option<'feel_drc_staff_security_no_001'>
    // form_partially/feel_drc_staff_security_partially_no [text] If not at all/A little/Not sure, please, specify
    feel_drc_staff_security_partially_no: string | undefined
    // form_partially/feel_drc_staff_respect_partially [select_one] Did you feel that DRC staff treated you with respect during provision of the assistance? (SDH 2)
    feel_drc_staff_respect_partially: undefined | Option<'supported_improving_life_no_intended'>
    // form_partially/feel_drc_staff_respect_partially_no [text] If no, please provide comments, why do you think so
    feel_drc_staff_respect_partially_no: string | undefined
    // form_partially/supported_improving_life_partially [select_one] Do you feel that the assistance provided by DRC has supported in improving your quality of life?
    supported_improving_life_partially: undefined | Option<'supported_improving_life_no_intended'>
    // form_partially/money_spent_yn_end [note] #####<span style="color: red">The survey will be continued after the period indicated by the beneficiary, for which he promised to spend the received assistance</span>
    money_spent_yn_end: string
    // form/money_spent [select_one] Was the received financial assistance spent as intended?
    money_spent: undefined | Option<'money_spent'>
    // form/money_spent_specific_no [text] If not, why was the money misused?
    money_spent_specific_no: string | undefined
    // form/money_spent_specific [text] What exactly was it spent on?
    money_spent_specific: string | undefined
    // if_yes_partially/rate_satisfaction_assistance [select_one] With reference to the following scale, how would you rate the level of your satisfaction with the assistance received? (MEA 1)
    rate_satisfaction_assistance: undefined | Option<'feel_drc_staff_security_no_001'>
    // if_yes_partially/rate_satisfaction_assistance_bad [select_multiple] If 'not really', 'not at all', 'don't know', please specify
    rate_satisfaction_assistance_bad: undefined | Option<'rate_satisfaction_assistance_no_bad'>[]
    // if_yes_partially/rate_satisfaction_assistance_bad_other [text] Please, specify if other
    rate_satisfaction_assistance_bad_other: string | undefined
    // if_yes_partially/scale_situation_consideration [select_one] With reference to the following scale, were your view or situation taken into consideration during provision of assistance? (PEM 1)
    scale_situation_consideration: undefined | Option<'without_DRC_no'>
    // if_yes_partially/scale_situation_consideration_bad [text] If 'not really', 'not at all', 'don't know', please specify
    scale_situation_consideration_bad: string | undefined
    // if_yes_partially/informing [select_one] With reference to the following scale, were you made aware of the services available to EO survivors (financial support, legal support etc.)? (PEM 2)
    informing: undefined | Option<'without_DRC_no'>
    // if_yes_partially/informing_consideration_bad [text] If not at all/A little/Not sure, please, specify /
    informing_consideration_bad: string | undefined
    // if_yes_partially/scale_resolve_problem [select_one] With reference to the following scale, did the assistance help to resolve/mitigate your problem?
    scale_resolve_problem: undefined | Option<'without_DRC_no'>
    // if_yes_partially/scale_resolve_problem_bad [text] If not at all/A little/Not sure, please, specify /
    scale_resolve_problem_bad: string | undefined
    // if_yes_partially/scale_changed_family [select_one] With reference to the following scale, to what extent the assistance changed the situation of the individual/family?
    scale_changed_family: undefined | Option<'scale_changed_family'>
    // if_yes_partially/scale_changed_family_bad [text] If not at all/A little/Not sure, please, specify
    scale_changed_family_bad: string | undefined
    // if_yes_partially/scale_changed_family_great [text] If greatly, please, specify, what was changed
    scale_changed_family_great: string | undefined
    // if_yes_partially/without_DRC [select_one] With reference to the following scale, will you be able to access the services you need in the future without DRC's support?
    without_DRC: undefined | Option<'without_DRC_no'>
    // if_yes_partially/without_DRC_if [text] If not at all/A little/Not sure, please, specify
    without_DRC_if: string | undefined
    // if_yes_partially/scale_challenges_accessing_drc_assistance [select_one] With reference to the following scale, did you have any challenges in accessing DRC assistance?
    scale_challenges_accessing_drc_assistance: undefined | Option<'scale_challenges_accessing_drc_assistance_no'>
    // if_yes_partially/scale_challenges_accessing_drc_assistance_yes [text] If Greatly/A little/Not sure, please, specify
    scale_challenges_accessing_drc_assistance_yes: string | undefined
    // if_yes_partially/scale_assistance_time [select_one] With reference to the following scale, do you consider assistance to be on time?
    scale_assistance_time: undefined | Option<'scale_assistance_time_no'>
    // if_yes_partially/scale_assistance_time_bad [text] If not at all/A little/Not sure, please, specify
    scale_assistance_time_bad: string | undefined
    // if_yes_partially/know_address_feedback [select_one] Do you know how and where you could address your suggestions, feedback or complaints regarding the work of the DRC, if any? (AAC 1)
    know_address_feedback: undefined | Option<'feel_drc_staff_security_no_001'>
    // if_yes_partially/know_address_feedback_no [note] To provide feedback (complaints, feedback, thanks, recommendations) you can use the phone number 0 800 33 95 18
    know_address_feedback_no: string
    // if_yes_partially/feel_drc_staff_security [select_one] Did you feel safe all time communicating with DRC staff? (SDH 1)
    feel_drc_staff_security: undefined | Option<'feel_drc_staff_security_no_001'>
    // if_yes_partially/feel_drc_staff_security_no [text] If not at all/A little/Not sure, please, specify
    feel_drc_staff_security_no: string | undefined
    // if_yes_partially/feel_drc_staff_respect [select_one] Did you feel that DRC staff treated you with respect during provision of the assistance? (SDH 2)
    feel_drc_staff_respect: undefined | Option<'supported_improving_life_no_intended'>
    // if_yes_partially/feel_drc_staff_respect_no [text] If no, please provide comments, why do you think so
    feel_drc_staff_respect_no: string | undefined
    // if_yes_partially/supported_improving_life_yes_partially [select_one] Do you feel that the assistance provided by DRC has supported in improving your quality of life?
    supported_improving_life_yes_partially: undefined | Option<'supported_improving_life_no_intended'>
    // money_spent_no_intended/rate_satisfaction_assistance_no [select_one] With reference to the following scale, how would you rate the level of your satisfaction with the assistance received? (MEA 1)
    rate_satisfaction_assistance_no: undefined | Option<'feel_drc_staff_security_no_001'>
    // money_spent_no_intended/rate_satisfaction_assistance_no_bad [select_multiple] If 'not really', 'not at all', 'don't know', please specify
    rate_satisfaction_assistance_no_bad: undefined | Option<'rate_satisfaction_assistance_no_bad'>[]
    // money_spent_no_intended/rate_satisfaction_assistance_no_bad_other [text] Please, specify if other
    rate_satisfaction_assistance_no_bad_other: string | undefined
    // money_spent_no_intended/scale_situation_consideration_no [select_one] With reference to the following scale, were your view or situation taken into consideration during provision of assistance? (PEM 1)
    scale_situation_consideration_no: undefined | Option<'without_DRC_no'>
    // money_spent_no_intended/scale_situation_consideration_no_bad [text] If 'not really', 'not at all', 'don't know', please specify
    scale_situation_consideration_no_bad: string | undefined
    // money_spent_no_intended/informing_no [select_one] With reference to the following scale, were you made aware of the services available to EO survivors (financial support, legal support etc.)? (PEM 2)
    informing_no: undefined | Option<'without_DRC_no'>
    // money_spent_no_intended/informing_partially_no_bad [text] If not at all/A little/Not sure, please, specify /
    informing_partially_no_bad: string | undefined
    // money_spent_no_intended/scale_challenges_accessing_drc_assistance_no [select_one] With reference to the following scale, did you have any challenges in accessing DRC assistance?
    scale_challenges_accessing_drc_assistance_no: undefined | Option<'scale_challenges_accessing_drc_assistance_no'>
    // money_spent_no_intended/scale_challenges_accessing_drc_assistance_no_yes [text] If Greatly/A little/Not sure, please, specify
    scale_challenges_accessing_drc_assistance_no_yes: string | undefined
    // money_spent_no_intended/without_DRC_no [select_one] With reference to the following scale, will you be able to access the services you need in the future without DRC's support?
    without_DRC_no: undefined | Option<'without_DRC_no'>
    // money_spent_no_intended/without_DRC_no_if [text] If not at all/A little/Not sure, please, specify
    without_DRC_no_if: string | undefined
    // money_spent_no_intended/scale_assistance_time_no [select_one] With reference to the following scale, do you consider assistance to be on time?
    scale_assistance_time_no: undefined | Option<'scale_assistance_time_no'>
    // money_spent_no_intended/scale_assistance_time_no_bad [text] If not at all/A little/Not sure, please, specify
    scale_assistance_time_no_bad: string | undefined
    // money_spent_no_intended/know_address_feedback_no_001 [select_one] Do you know how and where you could address your suggestions, feedback or complaints regarding the work of the DRC, if any? (AAC 1)
    know_address_feedback_no_001: undefined | Option<'feel_drc_staff_security_no_001'>
    // money_spent_no_intended/know_address_feedback_no_bad [note] To provide feedback (complaints, feedback, thanks, recommendations) you can use the phone number 0 800 33 95 18
    know_address_feedback_no_bad: string
    // money_spent_no_intended/feel_drc_staff_security_no_001 [select_one] Did you feel safe all time communicating with DRC staff? (SDH 1)
    feel_drc_staff_security_no_001: undefined | Option<'feel_drc_staff_security_no_001'>
    // money_spent_no_intended/feel_drc_staff_security_no_bad [text] If not at all/A little/Not sure, please, specify
    feel_drc_staff_security_no_bad: string | undefined
    // money_spent_no_intended/feel_drc_staff_respect_no_001 [select_one] Did you feel that DRC staff treated you with respect during provision of the assistance? (SDH 2)
    feel_drc_staff_respect_no_001: undefined | Option<'supported_improving_life_no_intended'>
    // money_spent_no_intended/feel_drc_staff_respect_no_bad [text] If no, please provide comments, why do you think so
    feel_drc_staff_respect_no_bad: string | undefined
    // money_spent_no_intended/supported_improving_life_no_intended [select_one] Do you feel that the assistance provided by DRC has supported in improving your quality of life?
    supported_improving_life_no_intended: undefined | Option<'supported_improving_life_no_intended'>
    // money_spent_no_intended/money_spent_no_end [note] #####<span style="color: red">The survey will be continued after the period indicated by the beneficiary, for which he promised to spend the received assistance</span>
    money_spent_no_end: string
    // comments [text] Do you have feedback/recommendations to improve our work and improve the process of providing such assistance in the future?
    comments: string | undefined
    // comments_int [text] Interviewer's comments
    comments_int: string | undefined
  }

  export const options = {
    project_ID: {
      ukr000350_sida: `Sida Ukr-000350`,
      ukr000372_echo3: `ECHO Ukr-000372`,
      ukr000306_dutch: `Dutch II Ukr-000306`,
      ukr000363_uhf8: `UHF 8 Ukr-000363`,
      ukr000386_mass_appeal: `MAF UKR-000386`,
      ukr000397_gffo: `GFFO Ukr-000397 (consortium)`,
      ukr000423_echo4: `ECHO4 UKR-000423`,
    },
    office: {
      iev: `Kyiv`,
      dnk: `Dnipro`,
      nlv: `Mykolaiv`,
      umy: `Sumy`,
      cej: `Chernihiv`,
      hrk: `Kharkiv`,
      slo: `Slovyansk`,
    },
    receive_help_drc: {
      yes: `Yes`,
      no: `No`,
    },
    gender: {
      male: `Male`,
      female: `Female`,
      other: `Other`,
    },
    what_assistance_drc: {
      access_education_employment: `Access to education and/or employment: special individual items for education in school or at home (e.g. individual chair or desk to meet specific needs of a child, computer) or afterschool curricula (lessons) or equiping workplace as well as procuring new equipment for self-employment`,
      inclusive_living_conditions: `Creating inclusive living conditions, such as renovating or adapting bathrooms for people with disabilities`,
      costs_restoration_documents: `Costs for restoration/obtaining essential documents or legal fees`,
      emergency_transportation: `Facilitate emergency transportation where access to a medical facility is not restricted for security reasons and where this type of assistance is not provided by other agencies or national medical services`,
      allowance_services: `Travel allowance to access requires services (including costs for accommodation)`,
      psychological_assistance: `Psychological assistance (consultations, coaching)`,
      assistive_devices: `Assistive devices e.g. prosthetic limbs, wheelchair, walking aids, hearing aid, back bandage etc.`,
      medical_assistance: `Medical assistance (medicines, examination etc.)`,
      rehabilitation_recovery: `Rehabilitation and recovery (medical procedures, visits to medical specialists (neurologist, ortoped, dentist etc.)`,
      other: `Other`,
    },
    money_spent: {
      yes: `Yes, if full scale`,
      partially: `Partially`,
      no: `No`,
    },
    feel_drc_staff_security_no_001: {
      very_satisfied: `Yes, completely`,
      satisfied: `Mostly yes`,
      dissatisfied: `Not really`,
      very_dissatisfied: `Not at all`,
      dk: `Don’t know`,
      no_answer: `No answer`,
    },
    rate_satisfaction_assistance_no_bad: {
      expectations: `Service did not meet expectations`,
      additional_required: `Additional service required`,
      did_not_respond: `Assistance did not respond to the needs`,
      delayed: `Assistance was delayed`,
      other: `Other (please specify)`,
    },
    without_DRC_no: {
      greatly: `Yes, completely`,
      nostly_yes: `Mostly yes`,
      little: `​A little`,
      not_all: `Not at all`,
      not_sure: `Don't know`,
      no_answer: `No answer`,
    },
    scale_challenges_accessing_drc_assistance_no: {
      greatly: `Greatly`,
      little: `​A little`,
      not_all: `Not at all`,
      not_sure: `Not sure`,
    },
    scale_assistance_time_no: {
      greatly: `Greatly`,
      little: `​A little`,
      not_all: `Not at all`,
      not_sure: `Not sure`,
    },
    scale_changed_family: {
      greatly: `Greatly`,
      little: `​A little`,
      not_all: `Not at all`,
      not_sure: `Not sure`,
    },
    supported_improving_life_no_intended: {
      yes: `Yes`,
      partially: `Partially`,
      no: `No`,
      pns: `Prefer not to answer`,
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
      phone_number: _.phone_number ? +_.phone_number : undefined,
      date_receiving: _.date_receiving ? new Date(_.date_receiving) : undefined,
      date: _.date ? new Date(_.date) : undefined,
      age: _.age ? +_.age : undefined,
      what_assistance_drc: _.what_assistance_drc?.split(' '),
      rate_satisfaction_assistance_partially_bad: _.rate_satisfaction_assistance_partially_bad?.split(' '),
      rate_satisfaction_assistance_bad: _.rate_satisfaction_assistance_bad?.split(' '),
      rate_satisfaction_assistance_no_bad: _.rate_satisfaction_assistance_no_bad?.split(' '),
    }) as T
}
