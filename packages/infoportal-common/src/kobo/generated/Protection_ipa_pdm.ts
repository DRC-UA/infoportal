export namespace Protection_ipa_pdm {
  export type Option<T extends keyof typeof options> = keyof (typeof options)[T]

  // Form id: avUGhsv25KzyPrV6cpaM5h
  export interface T {
    start: string
    end: string
    // note_hello [note] Danish Refugee Council in Ukraine provided individual assistance which was aimed at meeting the protection needs of internally displaced persons and people affected by the armed conflict in Ukraine. We would like to ask for your help in determining the effectiveness of our assistance and answer a few questions. This survey is conducted solely for the purpose of research, as well as to improve the quality of our work. You do not need to provide your name or contact information. We undertake to maintain the confidentiality of the received information. We are grateful to you for your consent to respond to our questions, your opinion is extremely important to us.
    note_hello: string
    // general_information/interwiever_name [text] Interwiever's name
    interwiever_name: string | undefined
    // general_information/date [date] Date
    date: Date | undefined
    // general_information/type_interview [select_one] Type of interview:
    type_interview: undefined | Option<'type_interview'>
    // general_information/back_office [select_one] Office responsible for the implementation of the project:
    back_office: undefined | Option<'back_office'>
    // general_information/donor [select_one] Donor
    donor: undefined | Option<'donor'>
    // general_information/donor_other [text] If "Other" Please specify:
    donor_other: string | undefined
    // beneficiary_data/case_code [text] Case code:
    case_code: string | undefined
    // beneficiary_data/gender [select_one] Gender:
    gender: undefined | Option<'gender'>
    // beneficiary_data/age [integer] Age
    age: number | undefined
    // beneficiary_data/oblast_residence [select_one] Oblast of residence:
    oblast_residence: undefined | Option<'oblast_residence'>
    // beneficiary_data/type_assistance [select_one] Type of assistance provided through IPA/C4P:
    type_assistance: undefined | Option<'type_assistance'>
    // beneficiary_data/specify [select_one] Specify:
    specify: undefined | Option<'specify'>
    // beneficiary_data/specify_other [text] If "Other" Please specify:
    specify_other: string | undefined
    // beneficiary_data/date_assistance [date] Date of provision of assistance:
    date_assistance: Date | undefined
    // metadata/receive_help_drc [select_one] 1. Did you receive help from DRC representatives?
    receive_help_drc: undefined | Option<'provide_staff_commission'>
    // metadata/satisfied_assistance_provided [select_one] 2. Are you satisfied with the DRC assistance provided? (МЕА.1)
    satisfied_assistance_provided: undefined | Option<'know_address_suggestions'>
    // metadata/satisfied_assistance_provided_no [select_one] No really/not at all, because
    satisfied_assistance_provided_no: undefined | Option<'satisfied_assistance_provided_no'>
    // metadata/satisfied_assistance_provided_no_other [text] If "Other" Please specify:
    satisfied_assistance_provided_no_other: string | undefined
    // metadata/assistance_help_problem [select_one] 3. Did the assistance help to solve/mitigate your problem?
    assistance_help_problem: undefined | Option<'assistance_help_problem'>
    // metadata/assistance_help_problem_specify [text] Please, specify
    assistance_help_problem_specify: string | undefined
    // metadata/assistance_provided_timely [select_one] 4. Was the assistance provided to you timely?
    assistance_provided_timely: undefined | Option<'assistance_meet_needs'>
    // metadata/assistance_provided_timely_no [text] If no, please provide comments why you think so
    assistance_provided_timely_no: string | undefined
    // metadata/assistance_meet_needs [select_one] 5. Did the assistance provided meet your needs/expectations?
    assistance_meet_needs: undefined | Option<'assistance_meet_needs'>
    // metadata/assistance_meet_needs_no [text] If no, please provide comments why you think so
    assistance_meet_needs_no: string | undefined
    // metadata/views_needs_assistance [select_one] 6. Were your views and needs taken into account by the organization regarding the assistance you received? (PEM.1)
    views_needs_assistance: undefined | Option<'know_address_suggestions'>
    // metadata/views_needs_assistance_no [text] If not really or not at all, please provide comments why you think so:
    views_needs_assistance_no: string | undefined
    // metadata/exposed_risk_receiving [select_one] 7. Have you or any member of your household been exposed to any risk as a consequence of receiving the CASH?
    exposed_risk_receiving: undefined | Option<'provide_staff_commission'>
    // metadata/exposed_risk_receiving_yes [text] If «yes», please, explain why:
    exposed_risk_receiving_yes: string | undefined
    // metadata/provide_staff_commission [select_one] 8. Were you asked to provide a DRC staff member with a commission, a gift, tip, service and/or a favor to receive this assistance?
    provide_staff_commission: undefined | Option<'provide_staff_commission'>
    // metadata/provide_staff_commission_yes [text] If «yes», please, explain:
    provide_staff_commission_yes: string | undefined
    // metadata/staff_respect_assistance [select_one] 9. Did you feel that the DRC staff treated you with respect during the process of providing assistance? (SDH.2)
    staff_respect_assistance: undefined | Option<'know_address_suggestions'>
    // metadata/staff_respect_assistance_no [text] If not really or not at all, please provide comments why you think so:
    staff_respect_assistance_no: string | undefined
    // metadata/feel_safe_communicating [select_one] 10. Did you feel safe at all times while communicating with the DRC staff member(s)? (SDH. 1)
    feel_safe_communicating: undefined | Option<'know_address_suggestions'>
    // metadata/feel_safe_communicating_no [text] If not really or not at all, please provide comments why you think so:
    feel_safe_communicating_no: string | undefined
    // metadata/know_address_suggestions [select_one] 11. Do you know how and where you could address your suggestions, comments or complaints related to the work of the Danish Refugee Council, if any? (ACC. 1)
    know_address_suggestions: undefined | Option<'know_address_suggestions'>
    // metadata/know_address_suggestions_yes [select_one] 11.1 If so, did you apply?
    know_address_suggestions_yes: undefined | Option<'know_address_suggestions_yes'>
    // metadata/know_address_suggestions_coqu [select_one] 11.1.1 If you submitted a complaint or question, did you receive a response to your appeal? (ACC.2)
    know_address_suggestions_coqu: undefined | Option<'know_address_suggestions_coqu'>
    // metadata/know_address_suggestions_coqu_001 [text] 11.1.1.1 Could you tell us what question you addressed?
    know_address_suggestions_coqu_001: string | undefined
    // metadata/report_employee_requested [select_one] 12. Do you know how and where to report if a DRC employee requested something from you in exchange for receiving assistance, made you feel uncomfortable in anyway, or insulted you? (misconduct)
    report_employee_requested: undefined | Option<'report_employee_requested'>
    // metadata/comments [text] 13. Do you have any feedback/recommendations on what we could improve in providing this type of assistance in the future?
    comments: string | undefined
    // follow_up_protection/assistance_produced_protection [select_one] Has the assistance provided produced the intended protection outcome?
    assistance_produced_protection: undefined | Option<'assistance_produced_protection'>
    // comments_inter [text] Coments for interviewer
    comments_inter: string | undefined
  }

  export const options = {
    type_interview: {
      remote: `Remote`,
      inperson: `In-person`,
    },
    back_office: {
      lwo: `Lviv (LWO)`,
      chj: `Chernihiv (CEJ)`,
      dnk: `Dnipro (DNK)`,
      hrk: `Kharkiv (HRK)`,
      nlv: `Mykloaiv (NLV)`,
      umy: `Sumy (UMY)`,
    },
    gender: {
      female: `Female`,
      male: `Male`,
      other: `Other`,
      unspecified: `Unspecified`,
    },
    oblast_residence: {
      aroc: `Autonomous Republic of Crimea`,
      vinnytska: `Vinnytsia`,
      volynska: `Volyn`,
      dnipropetrovska: `Dnipropetrovsk`,
      donetska: `Donetsk`,
      zhytomyrska: `Zhytomyr`,
      zakarpatska: `Zakarpattia`,
      zaporizka: `Zaporizhzhia`,
      'ivano-frankivska': `Ivano-Frankivsk`,
      kyivska: `Kyiv`,
      kirovohradska: `Kirovohrad`,
      luhanska: `Luhansk`,
      lvivska: `Lviv`,
      mykolaivska: `Mykolaiv`,
      odeska: `Odesa`,
      poltavska: `Poltava`,
      rivnenska: `Rivne`,
      sumska: `Sumy`,
      ternopilska: `Ternopil`,
      kharkivska: `Kharkiv`,
      khersonska: `Kherson`,
      khmelnytska: `Khmelnytskyi`,
      cherkaska: `Cherkasy`,
      chernivetska: `Chernivtsi`,
      chernihivska: `Chernihiv`,
      citykyiv: `City Kyiv`,
      sevastopilska: `Sevastopil`,
    },
    type_assistance: {
      cash: `Cash`,
      inkid: `In-kind`,
    },
    specify: {
      assistive_devices: `Assistive devices`,
      transportation_fees: `Transportation fees`,
      medical_costs: `Medical costs`,
      emergency_items: `Emergency items`,
      costs_restoration: `Costs for restoration/ obtaining essential documents or legal fees`,
      other: `Other`,
    },
    provide_staff_commission: {
      yes: `Yes`,
      no: `No`,
    },
    know_address_suggestions: {
      yesc: `Yes, completely`,
      myes: `Mostly yes`,
      nor: `Not really`,
      noa: `Not at all`,
      dk: `Don’t know`,
      na: `No answer`,
    },
    satisfied_assistance_provided_no: {
      service: `Service did not meet expectations`,
      service_required: `Additional service required`,
      not_needs: `Assistance did not respond to the needs`,
      delayed: `Assistance was delayed`,
      other: `Other`,
    },
    assistance_help_problem: {
      not_changed: `My problem has not changed`,
      little: `A little`,
      greatly: `Greatly`,
      not_sure: `Not sure`,
    },
    assistance_meet_needs: {
      yes: `Yes`,
      no: `No`,
      na: `No answer`,
    },
    know_address_suggestions_yes: {
      complaint: `Yes, with a complaint`,
      feedback: `Yes, with feedback`,
      question: `Yes with a question`,
      ndna: `No did not apply`,
    },
    know_address_suggestions_coqu: {
      yes: `Yes, completely`,
      ryes: `Rather yes than no`,
      not: `Not answered at all`,
      na: `No answer`,
    },
    assistance_produced_protection: {
      successful: `Successful, protection risk mitigated`,
      partially: `Partially successful, protection risk remains`,
      not_successful: `Not successful, intervention did not have an impact`,
    },
    donor: {
      ukr000363_uhf8: `UHF8 UKR-000363`,
      uhf6: `UHF6 UKR-000336`,
      uhf4: `UHF4 UKR-000314`,
      novo: `Novonordisk UKR-000298`,
      sdc: `SDC UKR-000330`,
      bha: `BHA UKR-000345`,
      echo: `ECHO UKR-000322`,
      pool: `PF UKR-000270`,
      okf: `OKF UKR-000309`,
      ukr000423_echo: `ECHO UKR-000423`,
      other: `Other`,
    },
    report_employee_requested: {
      yes: `Yes, completely`,
      mostly: `Mostly yes`,
      not_really: `Not really`,
      not_all: `Not at all`,
      dk: `Don’t know`,
      no_answer: `No answer`,
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
      date: _.date ? new Date(_.date) : undefined,
      age: _.age ? +_.age : undefined,
      date_assistance: _.date_assistance ? new Date(_.date_assistance) : undefined,
    }) as T
}
