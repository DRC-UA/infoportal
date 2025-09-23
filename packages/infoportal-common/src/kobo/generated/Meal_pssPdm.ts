export namespace Meal_pssPdm {
  export type Option<T extends keyof typeof options> = keyof (typeof options)[T]

  // Form id: a7bAcCujpff6E94FPRubzS
  export interface T {
    start: string
    end: string
    // gi/gin [note] Danish Refugee Council in Ukraine is providing psycho-social support to internally displaced persons and people affected by the armed conflict in Ukraine. We would like to ask for your help in assessing the effectiveness of our assistance by answering the questions below. This survey is conducted solely for the purpose of research, as well as to improve the quality of our work. You do not need to provide your name or contact information. We treat the information received with confidentiality
    gin: string
    // gi/ginn [note] We are grateful to you for your consent to respond to our questions, your opinion is extremely important to us.
    ginn: string
    // gi/gina [select_one] Area:
    gina: undefined | Option<'gina'>
    // gi/gire [select_one] Responsible office:
    gire: undefined | Option<'gire'>
    // gi/gido [select_one] Name of the donor
    gido: undefined | Option<'gido'>
    // gi/oblast [select_one] Oblast, where of the activity
    oblast: undefined | Option<'oblast'>
    // gi/giac [text] You took part in the activity held in:
    giac: string | undefined
    // gi/gid [date] Date:
    gid: Date | undefined
    // gi/gis [select_one] Your sex:
    gis: undefined | Option<'gis'>
    // gi/giage [integer] Your age:
    giage: number | undefined
    new_choices: string
    // q/qac [select_one] 1. Overall, how would you rate your experience of the activities in this session?
    qac: undefined | Option<'rate_activities_session'>
    // q/qacp [text] If you marked "1- Very bad" , "2- Bad" or "3- Satisfactory" , feel free to comment:
    qacp: string | undefined
    // q/qc [select_one] 2. Were you comfortable communicating and interacting in a group?
    qc: undefined | Option<'qka'>
    // q/qcn [text] If "No", feel free to comment:
    qcn: string | undefined
    // q/qah [select_one] 3. How would you rate the approach of the DRC employee(s) conducting the session?
    qah: undefined | Option<'rate_activities_session'>
    // q/qahp [text] If you marked "1- Very bad" , "2- Bad" or "3- Satisfactory" , feel free to comment:
    qahp: string | undefined
    // q/qw [select_one] 4. Were the exercises helpful for you?
    qw: undefined | Option<'qka'>
    // q/qwn [text] If "No", feel free to comment:
    qwn: string | undefined
    // q/qd [select_one] 5. Did this activity meet your expectations/needs?
    qd: undefined | Option<'qka'>
    // q/qdn [text] If "No", feel free to comment:
    qdn: string | undefined
    // q/qhe [select_one] 6. To what extent do you consider that the topics you have discussed in this session will help you support yourself in the future?
    qhe: undefined | Option<'qhe'>
    // q/qhet [text] If you marked "Not helpful at all" or "Not very helpful", feel free to comment:
    qhet: string | undefined
    // q/qfe [select_one] 7. After this session, how do you emotionally feel?
    qfe: undefined | Option<'qfe'>
    // q/qfe_bad [text] If "Worst than prior to the session", feel free to comment:
    qfe_bad: string | undefined
    // q/ql [select_multiple] 8. What did you like most about these activities?
    ql: undefined | Option<'ql'>[]
    // q/qlo [text] If "Other," please specify:
    qlo: string | undefined
    // q/qr [select_one] 9. Would you recommend others to attend this session?
    qr: undefined | Option<'qka'>
    // q/qrn [text] If "No", feel free to comment:
    qrn: string | undefined
    // q/qwt [text] 10. What do you think we could change or add to improve our session and make it more useful for you?
    qwt: string | undefined
    // q/qda [select_one] 11. Did you feel that the DRC staff treated you with respect during this activity?
    qda: undefined | Option<'qka'>
    // q/qdan [text] If "No", feel free to comment:
    qdan: string | undefined
    // q/qdy [select_one] 12. Did you feel safe at all times while communicating with the DRC team?
    qdy: undefined | Option<'qka'>
    // q/qdyn [text] If "No", feel free to comment:
    qdyn: string | undefined
    // q/qka [select_one] 13. Do you know how and where you could address your suggestions, comments or complaints related to the work of the Danish Refugee Council, if any?
    qka: undefined | Option<'qka'>
    // q/not_qka [note] To provide feedback (complaints, feedback, thanks, recommendations) you can use the phone number 0 800 33 95 18
    not_qka: string
    // ques_bey_echo/type_session [select_one] Type of session?
    type_session: undefined | Option<'type_session'>
    // ques_bey_echo/received_similar_pss [select_one] Have you received similar PSS session before?
    received_similar_pss: undefined | Option<'received_similar_pss'>
    // ques_bey_echo/received_similar_pss_yes [select_one] How would you rate that similar session that you had before?
    received_similar_pss_yes: undefined | Option<'rate_activities_session'>
    // ques_bey_echo/received_similar_pss_yes_bad [text] If you marked "1- Very bad" , "2- Bad" or "3- Satisfactory" , feel free to comment:
    received_similar_pss_yes_bad: string | undefined
    // ques_bey_echo/rate_activities_session [select_one] Overall, how would you rate your experience of the activities in this  PSS session?
    rate_activities_session: undefined | Option<'rate_activities_session'>
    // ques_bey_echo/rate_activities_session_bad [text] If you marked "1- Very bad" , "2- Bad" or "3- Satisfactory" , feel free to comment:
    rate_activities_session_bad: string | undefined
    // ques_bey_echo/overall_sessions_helpful [select_one] Overall, do you find DRС PSS sessions were helpful?
    overall_sessions_helpful: undefined | Option<'overall_sessions_helpful'>
    // ques_bey_echo/overall_sessions_helpful_bad [text] If "Satisfactory"; "Not helpful"; "Not helpful at all", feel free to comment:
    overall_sessions_helpful_bad: string | undefined
    // ques_bey_echo/satisfied_activities_provided [select_one] Are you satisfied with the activities provided? (MEA. 1)
    satisfied_activities_provided: undefined | Option<'report_misconduct_employees'>
    // ques_bey_echo/satisfied_activities_provided_bad [select_one] if ‘Mostly yes, Not really/not at all’: Would you mind telling us why you are not satisfied?
    satisfied_activities_provided_bad: undefined | Option<'satisfied_activities_provided_bad'>
    // ques_bey_echo/satisfied_activities_provided_bad_other [text] If "Other," please specify:
    satisfied_activities_provided_bad_other: string | undefined
    // ques_bey_echo/feel_emotional_benefits [select_one] Did you feel any emotional benefits from attending to the PSS sessions?
    feel_emotional_benefits: undefined | Option<'feel_emotional_benefits'>
    // ques_bey_echo/feel_emotional_benefits_bad [text] If "Not very much"; "Not at all", feel free to comment:
    feel_emotional_benefits_bad: string | undefined
    // ques_bey_echo/feel_emotional_benefits_comments [text] Feel free to comment:
    feel_emotional_benefits_comments: string | undefined
    // ques_bey_echo/feel_integrated_activity [select_one] Did you feel integrated during the sessions by the facilitators?
    feel_integrated_activity: undefined | Option<'know_where_address_suggestions'>
    // ques_bey_echo/feel_integrated_activity_no [text] If "No", feel free to comment:
    feel_integrated_activity_no: string | undefined
    // ques_bey_echo/feel_integrated_activity_bad [text] If ‘Mostly yes, Not really/not at all’, feel free to comment:
    feel_integrated_activity_bad: string | undefined
    // ques_bey_echo/feel_staff_respect [select_one] Did you feel that the DRC staff treated you with respect during the  sessions?
    feel_staff_respect: undefined | Option<'know_where_address_suggestions'>
    // ques_bey_echo/feel_staff_respect_no [text] If "No", feel free to comment:
    feel_staff_respect_no: string | undefined
    // ques_bey_echo/feel_staff_respect_bad [text] If ‘Mostly yes, Not really/not at all’, feel free to comment:
    feel_staff_respect_bad: string | undefined
    // ques_bey_echo/well_informed_service [select_one] Did you feel well informed about the PSS service available? (PEM. 2)
    well_informed_service: undefined | Option<'report_misconduct_employees'>
    // ques_bey_echo/well_informed_service_bad [text] If ‘Mostly yes, Not really/not at all’, feel free to comment:
    well_informed_service_bad: string | undefined
    // ques_bey_echo/feel_safe_sessions [select_one] Did you feel safe during the PSS sessions?
    feel_safe_sessions: undefined | Option<'know_where_address_suggestions'>
    // ques_bey_echo/feel_safe_sessions_no [text] If "No", feel free to comment:
    feel_safe_sessions_no: string | undefined
    // ques_bey_echo/feel_safe_sessions_bad [text] If ‘Mostly yes, Not really/not at all’, feel free to comment:
    feel_safe_sessions_bad: string | undefined
    // ques_bey_echo/think_change_sessions [text] What do you think we could change or add to improve our PSS sessions and make it more useful for you?
    think_change_sessions: string | undefined
    // ques_bey_echo/know_people_needing_pss [select_one] Do you know of people needing PSS who were excluded from this activity provided? (MEA. 2)
    know_people_needing_pss: undefined | Option<'report_misconduct_employees'>
    // ques_bey_echo/know_people_needing_pss_yes [text] If yes, who was mainly excluded?
    know_people_needing_pss_yes: string | undefined
    // ques_bey_echo/know_people_needing_pss_yes_new [select_multiple] If yes, who was mainly excluded?
    know_people_needing_pss_yes_new: undefined | Option<'know_people_needing_pss_yes_new'>[]
    // ques_bey_echo/know_people_needing_pss_yes_other [text] If "Other," please specify:
    know_people_needing_pss_yes_other: string | undefined
    // ques_bey_echo/know_where_address_suggestions [select_one] Do you know how and where you could address your suggestions, comments or complaints related to the work of the Danish Refugee Council, if any? (ACC. 1)
    know_where_address_suggestions: undefined | Option<'know_where_address_suggestions'>
    // ques_bey_echo/not_know_where_address_suggestions [note] **To provide feedback (complaints, feedback, thanks, recommendations) you can use the phone number 0 800 33 95 18**
    not_know_where_address_suggestions: string
    // ques_bey_echo/suggestions_complaints_responded [select_one] To your knowledge, have suggestions or complaints raised been responded to or followed up? (ACC. 2)
    suggestions_complaints_responded: undefined | Option<'suggestions_complaints_responded'>
    // ques_bey_echo/suggestions_complaints_responded_no [text] If no, would you mind telling me which are the issues / what happened?
    suggestions_complaints_responded_no: string | undefined
    // ques_bey_echo/report_misconduct_employees [select_one] Do you know how and where to report if a DRC employee requested something from you in exchange for receiving assistance, made you feel uncomfortable in anyway, or insulted you? (misconduct)
    report_misconduct_employees: undefined | Option<'report_misconduct_employees'>
    // oc/ocp [text] Please leave your comments, complaints, remarks or wishes regarding the completed project.
    ocp: string | undefined
    // oc/ocn [note] Thank you very much for your feedback!
    ocn: string
  }

  export const options = {
    gina: {
      north: `North`,
      west: `West`,
      east: `East`,
      south: `South`,
    },
    gire: {
      od: `Dnipro (DNK)`,
      ok: `Kharkiv (HRK)`,
      ol: `Lviv (LWO)`,
      oc: `Chernihiv (CEJ)`,
      oy: `Kyiv (IEV)`,
      om: `Mykolaiv (NLV)`,
      os: `Sumy (UMY)`,
    },
    gis: {
      male: `Male`,
      female: `Female`,
    },
    rate_activities_session: {
      vg: `5- very good`,
      go: `4- good`,
      sa: `3- satisfactory`,
      po: `2- bad`,
      vp: `1- very bad`,
    },
    qka: {
      yes: `Yes`,
      no: `No`,
    },
    undefined: {
      yes: `Yes`,
      no: `No`,
      pns: `Prefer not to answer`,
    },
    qhe: {
      veh: `Very helpful`,
      soh: `Somewhat helpful`,
      nvh: `Not very helpful`,
      nha: `Not helpful at all`,
    },
    qfe: {
      few: `Worst than prior to the session`,
      fen: `No change`,
      feb: `Better than prior to the session`,
      fea: `No answer`,
    },
    ql: {
      lim: `Meet new people`,
      lil: `Learn something new`,
      lib: `Bring home something made with my own hands`,
      lih: `Helped to relax`,
      lij: `Join something positive`,
      lii: `I did not like anything`,
      oth: `Other`,
    },
    gido: {
      ukr000284_bha: `ВНА UKR-000284`,
      ukr000270_pofu: `Pooled Funds UKR- 000270`,
      ukr000298_novo: `Novonordisk UKR-000298`,
      ukr000309_okf: `OKF UKR-000309`,
      ukr000314_uhf4: `UHF4 UKR-000314`,
      ukr000322_echo2: `ECHO UKR-000322`,
      ukr000329_sida: `SIDA H2R UKR-000329`,
      ukr000336_uhf6: `UHF6 UKR-000336`,
      ukr000345_bha: `ВНА UKR-000345`,
      ukr000347_danida: `DANIDA UKR-000347`,
      ukr000355_dmfa: `DMFA UKR-000355`,
      ukr000363_uhf8: `UHF8 UKR-000363`,
      ukr000372_echo3: `ECHO UKR -000372`,
      ukr000423_echo4: `ECHO UKR -000423`,
    },
    received_similar_pss: {
      drc: `Yes, DRC`,
      other_organization: `Yes, other organization(s)`,
      no: `No`,
    },
    feel_emotional_benefits: {
      yes: `Yes`,
      somehow: `Somehow`,
      not_much: `Not very much`,
      not_all: `Not at all (it will take much longer to start feeling the effects)`,
      not: `Not at all`,
      much_longer: `It will take much longer to start feeling the effects`,
    },
    overall_sessions_helpful: {
      vhel: `Very helpful`,
      hel: `Helpful`,
      satis: `Satisfactory`,
      nhel: `Not helpful`,
      nhelall: `Not helpful at all`,
    },
    type_session: {
      group_sessions: `PSS group sessions`,
      individual_session: `PSS individual session`,
      pfa: `Psychological first aid  training (PFA)`,
      peer: `Peer to peer training`,
    },
    report_misconduct_employees: {
      yes_completely: `Yes, completely`,
      mostly_yes: `Mostly yes`,
      not_really: `Not really`,
      not_all: `Not at all`,
      dk: `Don’t know`,
      na: `No answer`,
    },
    suggestions_complaints_responded: {
      no_complaints: `I had no complaints`,
      yes_completely: `Yes, completely`,
      mostly_yes: `Mostly yes`,
      not_really: `Not really`,
      not_all: `Not at all`,
      dk: `Don’t know`,
      na: `No answer`,
    },
    satisfied_activities_provided_bad: {
      not_timely: `it was not timely`,
      not_adequate_needs: `it was not adequate to my needs`,
      other: `Other`,
    },
    know_where_address_suggestions: {
      yes: `Yes`,
      no: `No`,
      yes_completely: `Yes, completely`,
      mostly_yes: `Mostly yes`,
      not_really: `Not really`,
      not_all: `Not at all`,
      dk: `Don’t know`,
      na: `No answer`,
    },
    oblast: {
      crimea: `Autonomous Republic of Crimea`,
      cherkaska: `Cherkasy`,
      chernihivska: `Chernihiv`,
      chernivetska: `Chernivtsi`,
      dnipropetrovska: `Dnipropetrovsk`,
      donetska: `Donetsk`,
      'ivano-frankivska': `Ivano-Frankivsk`,
      kharkivska: `Kharkiv`,
      khersonska: `Kherson`,
      khmelnytska: `Khmelnytskyi`,
      kirovohradska: `Kirovohrad`,
      kyivska: `Kyiv`,
      luhanska: `Luhansk`,
      lvivska: `Lviv`,
      mykolaivska: `Mykolaiv`,
      odeska: `Odesa`,
      poltavska: `Poltava`,
      rivnenska: `Rivne`,
      sumska: `Sumy`,
      ternopilska: `Ternopil`,
      vinnytska: `Vinnytsia`,
      volynska: `Volyn`,
      zakarpatska: `Zakarpattia`,
      zaporizka: `Zaporizhzhia`,
      zhytomyrska: `Zhytomyr`,
      sevastopol: `Sevastopol`,
    },
    know_people_needing_pss_yes_new: {
      child_headed: `Child Headed HH`,
      female_headed: `Female Headed HH`,
      pwd: `People with disability`,
      terminally_people: `Terminally ill people`,
      elderly: `Elderly`,
      minority_groups: `Minority Groups`,
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
      gid: _.gid ? new Date(_.gid) : undefined,
      giage: _.giage ? +_.giage : undefined,
      ql: _.ql?.split(' '),
      know_people_needing_pss_yes_new: _.know_people_needing_pss_yes_new?.split(' '),
    }) as T
}
