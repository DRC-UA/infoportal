export namespace Gbv_csPdm {
  export type Option<T extends keyof typeof options> = keyof (typeof options)[T]

  // Form id: aHAGjH9mL5kXT9jmpdceBt
  export interface T {
    start: string
    end: string
    // project_code [select_one] Please enter the project code
    project_code: undefined | Option<'project_code'>
    // not_inst [note] Kobo form instructions for client:
    not_inst: string
    // questionnaire/age [integer] What is your age?
    age: number | undefined
    // questionnaire/sex [select_one] What is your sex?
    sex: undefined | Option<'sex'>
    // questionnaire/location [select_one] What is your location
    location: undefined | Option<'location'>
    // questionnaire/location_other [text] If ‘other’, please share the name of the oblast where you received support:
    location_other: string | undefined
    // questionnaire/find_about_services [select_multiple] How did you find out about our services
    find_about_services: undefined | Option<'find_about_services'>[]
    // questionnaire/find_about_services_other [text] Other (please specify)
    find_about_services_other: string | undefined
    // questionnaire/views_into_account [select_one] Were your views taken into account by the organization about the assistance you received?
    views_into_account: undefined | Option<'satisfied_assistance'>
    // questionnaire/views_into_account_no [text] If no, would you mind telling me how is it that your views were not taken into account?
    views_into_account_no: string | undefined
    // questionnaire/received_information_available [select_one] I received information about what services were available and what my options were in accessing services.
    received_information_available: undefined | Option<'satisfied_assistance'>
    // questionnaire/same_person_return_visit [select_one] I could see the same person at each return visit.
    same_person_return_visit: undefined | Option<'satisfied_assistance'>
    // questionnaire/offered_having_support [select_one] I was offered the option of having a support person with me.
    offered_having_support: undefined | Option<'caseworker_other_staff_private'>
    // questionnaire/access_support_drawing_attention [select_one] I could access support without drawing attention to myself.
    access_support_drawing_attention: undefined | Option<'caseworker_other_staff_private'>
    // questionnaire/staff_respects_confidentiality [select_one] The staff respects confidentiality.
    staff_respects_confidentiality: undefined | Option<'satisfied_assistance'>
    // questionnaire/caseworker_other_staff_private [select_one] I met with a caseworker or other staff in private without being overheard.
    caseworker_other_staff_private: undefined | Option<'caseworker_other_staff_private'>
    // questionnaire/staff_treated_respect [select_one] Did you feel that the staff treated you with respect during the intervention?
    staff_treated_respect: undefined | Option<'satisfied_assistance'>
    // questionnaire/staff_treated_respect_no [text] If ‘no’, please, specify
    staff_treated_respect_no: string | undefined
    // questionnaire/staff_open_minded [select_one] The staff were open-minded. I did not feel judged.
    staff_open_minded: undefined | Option<'satisfied_assistance'>
    // questionnaire/staff_answer_questions [select_one] The staff were able to answer all my questions to my satisfaction.
    staff_answer_questions: undefined | Option<'satisfied_assistance'>
    // questionnaire/staff_used_language [select_one] The staff used language and terminology that I could understand.
    staff_used_language: undefined | Option<'satisfied_assistance'>
    // questionnaire/staff_allowed_time [select_one] The staff allowed time to let me express my problems in my own words.
    staff_allowed_time: undefined | Option<'satisfied_assistance'>
    // questionnaire/caseworker_provide_complaint [select_one] Did the caseworker explain to you how to provide a complaint or feedback if you wanted to?
    caseworker_provide_complaint: undefined | Option<'satisfied_assistance'>
    // questionnaire/made_complaint_responded [select_one] If you have ever given feedback or made a complaint, was it responded to or followed up?
    made_complaint_responded: undefined | Option<'satisfied_assistance'>
    // questionnaire/made_complaint_responded_no [text] If no, would you mind telling me which are the issues / what happened?
    made_complaint_responded_no: string | undefined
    // questionnaire/recommend_friend_gbv [select_one] Would you recommend a friend who has experienced GBV to come here for help?
    recommend_friend_gbv: undefined | Option<'satisfied_assistance'>
    // questionnaire/recommend_friend_gbv_explain [text] Explain
    recommend_friend_gbv_explain: string | undefined
    // questionnaire/satisfied_assistance [select_one] Are you satisfied with the assistance provided?
    satisfied_assistance: undefined | Option<'satisfied_assistance'>
    // questionnaire/satisfied_assistance_no [text] If ‘no’, please, specify
    satisfied_assistance_no: string | undefined
    // questionnaire/comments [text] Are there any improvements that you would like to suggest or other comments you would like to include
    comments: string | undefined
  }

  export const options = {
    undefined: {
      '15_17_years': `15- 17 years old`,
      '18_24_years': `18- 24 years old`,
      '25_40_years': `25- 40 years old`,
      '41_65_years': `41- 65 years old`,
      '65_more_years': `65 years or older`,
      yes: `Yes`,
      no: `No`,
      not_applicable: `Not applicable`,
    },
    find_about_services: {
      friend_family_member: `Friend or family member`,
      neighbour_community_member: `Neighbour or community member`,
      flyer_leaflet_received: `Flyer or leaflet you saw or received`,
      referral_another_organisation: `Referral from another organisation`,
      information_session: `Information session`,
      other: `Other`,
    },
    satisfied_assistance: {
      yes: `Yes`,
      no: `No`,
      not_answer: `Prefer not to answer`,
    },
    caseworker_other_staff_private: {
      yes: `Yes`,
      no: `No`,
      not_applicable: `Not applicable`,
      not_answer: `Prefer not to answer`,
    },
    sex: {
      male: `Male`,
      female: `Female`,
      other: `Other`,
    },
    location: {
      chernihivska: `Chernihivska`,
      sumska: `Sumska`,
      dnipropetrovsk: `Dnipropetrovsk`,
      zaphorzhizhia: `Zaphorzhizhia`,
      khersonska: `Khersonska`,
      mykolaivska: `Mykolaivska`,
      kharkivska: `Kharkivska`,
      donetska: `Donetska`,
      online: `Online/remote support provided`,
      other: `Other`,
    },
    project_code: {
      ukr000423_echo4: `UKR-000423 ECHO4`,
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
      age: _.age ? +_.age : undefined,
      find_about_services: _.find_about_services?.split(' '),
    }) as T
}
