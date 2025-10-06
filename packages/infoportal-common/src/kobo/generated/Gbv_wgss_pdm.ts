export namespace Gbv_wgss_pdm {
  export type Option<T extends keyof typeof options> = keyof (typeof options)[T]

  // Form id: aBNTzGaGVzG34frWk6AqFz
  export interface T {
    start: string
    end: string
    // introduction/office [select_one] Office
    office: undefined | Option<'office'>
    // introduction/project [select_one] Project
    project: undefined | Option<'project'>
    // introduction/date_survey [date] 1. Date of survey:
    date_survey: Date | undefined
    // introduction/location_space [text] 2. Location of Women and Girl Safe Space:
    location_space: string | undefined
    // introduction/age [integer] 3. What is your age?
    age: number | undefined
    // introduction/long_safe_space [select_one] 4. How long have you been coming to the safe space?
    long_safe_space: undefined | Option<'long_safe_space'>
    // introduction/days_safe_space [text] 5. Approximately how many days a month do you come to the safe space?
    days_safe_space: string | undefined
    // introduction/safe_travelling [select_one] 6. Did you feel safe at all times travelling to women and girls safe space (to/from your place), while receiving the assistance/service, and upon return to your place?
    safe_travelling: undefined | Option<'complaint_responded'>
    // introduction/safe_travelling_no [text] 6.1 If no, what could have been done by the organization to make you feel safer?
    safe_travelling_no: string | undefined
    // introduction/staff_treated_respect [select_one] 7. Did you feel that the staff treated you with respect during the intervention?
    staff_treated_respect: undefined | Option<'complaint_responded'>
    // introduction/staff_treated_respect_no [text] 7.1 If no, would you mind telling us when or where? Would you mind telling us why?
    staff_treated_respect_no: string | undefined
    // introduction/difficulties_accessing_safe_space [select_one] 8. Do you have any difficulties accessing the safe space?
    difficulties_accessing_safe_space: undefined | Option<'complaint_responded'>
    // introduction/difficulties_accessing_safe_space_detail [text] 8.1 Please detail:
    difficulties_accessing_safe_space_detail: string | undefined
    // introduction/enjoy_participating_activities [select_one] 9. Do you enjoy participating in group activities in the safe space?
    enjoy_participating_activities: undefined | Option<'staff_considerate_feedback'>
    // introduction/enjoy_participating_activities_comments [text] 9.1 Option for comments:
    enjoy_participating_activities_comments: string | undefined
    // introduction/activities_relevant_needs [select_one] 10. Are the activities in the safe space relevant to your needs?
    activities_relevant_needs: undefined | Option<'staff_considerate_feedback'>
    // introduction/activities_relevant_needs_comments [text] 10.1 Option for comments:
    activities_relevant_needs_comments: string | undefined
    // introduction/feel_staff_problems [select_one] 11. Do you feel able to talk to staff about your problems?
    feel_staff_problems: undefined | Option<'staff_considerate_feedback'>
    // introduction/feel_staff_problems_comments [text] 11.1 Option for comments:
    feel_staff_problems_comments: string | undefined
    // introduction/know_girl_support [select_one] 12. Do you know where a women or girl could go to for support if they experienced violence?
    know_girl_support: undefined | Option<'complaint_responded'>
    // introduction/know_girl_support_yes [text] 12.1 Where could they go?
    know_girl_support_yes: string | undefined
    // introduction/feel_welcomed_staff [select_one] 13. Do you feel welcomed by the staff every time you come to the safe space?
    feel_welcomed_staff: undefined | Option<'staff_considerate_feedback'>
    // introduction/feel_welcomed_staff_comments [text] 13.1 Option for comments:
    feel_welcomed_staff_comments: string | undefined
    // introduction/staff_considerate_feedback [select_one] 14. Do you think the staff working in the safe space are considerate of the feedback and opinions provided by members in the safe space?
    staff_considerate_feedback: undefined | Option<'staff_considerate_feedback'>
    // introduction/staff_considerate_feedback_comments [text] 14.1 Option for comments:
    staff_considerate_feedback_comments: string | undefined
    // introduction/informed_service_available [select_one] 15. Did you feel well informed about the assistance/service available?
    informed_service_available: undefined | Option<'complaint_responded'>
    // introduction/informed_service_available_no [text] 15.1 If no, what could have done to better inform you about the assistance / services available to you?
    informed_service_available_no: string | undefined
    // introduction/activity_safe_space_most [text] 16. What activity in safe space have you liked the most?
    activity_safe_space_most: string | undefined
    // introduction/satisfied_assistance_provided [select_one] 17. Are you satisfied with the assistance provided in the safe space?
    satisfied_assistance_provided: undefined | Option<'complaint_responded'>
    // introduction/satisfied_assistance_provided_no [text] 17.1 Please detail:
    satisfied_assistance_provided_no: string | undefined
    // introduction/channel_complaint [select_one] 18. If you had a suggestion or a problem with the assistance/service, do you think you could channel the suggestion or lodge a complaint?
    channel_complaint: undefined | Option<'complaint_responded'>
    // introduction/complaint_responded [select_one] 19. If you have ever given feedback or made a complaint, was it responded to or followed up?
    complaint_responded: undefined | Option<'complaint_responded'>
    // introduction/complaint_responded_no [text] 19.1 If no, would you mind telling me which are the issues / what happened?
    complaint_responded_no: string | undefined
    // introduction/suggestions [text] 20. Do you have any suggestions or ideas on future activities in the safe space?
    suggestions: string | undefined
  }

  export const options = {
    project: {
      na: `N/A`,
      ukr000345_bha: `BHA (UKR-000345)`,
      ukr000355_dmfa: `DMFA (UKR-000355)`,
      ukr000363_uhf8: `UHF8 (UKR-000363)`,
      ukr000372_echo: `ECHO (UKR-000372)`,
      ukr000423: `ECHO (UKR-000423)`,
    },
    long_safe_space: {
      '0_2_mounth': `0-2 month`,
      '3_5_months': `3- 5 months`,
      '6_8_months': `6- 8 months`,
      pna: `Prefer not to answer`,
    },
    complaint_responded: {
      yes: `Yes`,
      no: `No`,
      pna: `Prefer not to answer`,
    },
    staff_considerate_feedback: {
      yes: `Yes`,
      partially: `Partially`,
      no: `No`,
      pna: `Prefer not to answer`,
    },
    office: {
      umy: `Sumy (UMY)`,
      cej: `Chernihiv (CEJ)`,
      dnk: `Dnipro (DNK)`,
      hrk: `Kharkiv (HRK)`,
      nlv: `Mykolaiv (NLV)`,
      slo: `Sloviansk (SLO)`,
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
      date_survey: _.date_survey ? new Date(_.date_survey) : undefined,
      age: _.age ? +_.age : undefined,
    }) as T
}
