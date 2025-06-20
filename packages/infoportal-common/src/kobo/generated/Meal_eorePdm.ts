export namespace Meal_eorePdm {
  export type Option<T extends keyof typeof options> = keyof (typeof options)[T]

  // Form id: aTHMDjqm7jodctcrBE4bS7
  export interface T {
    start: string
    end: string
    // note_tp17z50 [note] Post-assistance monitoring form – Explosive Ordnance Risk Education (EORE)
    note_tp17z50: string
    // note_tx9vt44 [note] Danish Refugee Council in Ukraine provides Explosive Ordnance Risk Education sessions for population.  We would like to ask for your help in determining the quality of our assistance provided and answer a few questions. This survey is conducted solely for the purpose of research, as well as to improve the quality of our work. You do not need to provide your name or contact information. We undertake to maintain the confidentiality of the answers you've provided.  We are grateful to you for your consent to respond to our questions, your opinion is extremely important to us!
    note_tx9vt44: string
    // begin/office [select_one] Responsible office:
    office: undefined | Option<'office'>
    // begin/project_id [select_one] Project ID:
    project_id: undefined | Option<'project_id'>
    // begin/date_session [date] Date of session:
    date_session: Date | undefined
    // begin/oblast [select_one] Oblast
    oblast: undefined | Option<'oblast'>
    // begin/text_gd3dp26 [text] Specify the location where you received EORE:
    text_gd3dp26: string | undefined
    // begin/select_one_hs54l01 [select_one] Your gender
    select_one_hs54l01: undefined | Option<'select_one_hs54l01'>
    // begin/_age [integer] Your Age
    _age: number | undefined
    // begin/safety [select_one] 1. Did you feel safe in the place where EORE session was conducted? (SHD 1)
    safety: undefined | Option<'info_clear'>
    // begin/safety_no [text] 1.1 Please provide comments why you think so:
    safety_no: string | undefined
    // begin/respect [select_one] 2. Did you feel that the DRC staff treated you with respect during the session? (SHD 2)
    respect: undefined | Option<'info_clear'>
    // begin/respect_no [text] 2.2 Please provide comments why you think so:
    respect_no: string | undefined
    // begin/info_sharing [select_one] 3. Do you think you will share what you have learned in the session today with your family members/friends/neighbors, etc.?
    info_sharing: undefined | Option<'accountability'>
    // begin/usefulness [select_one] 4. Do you think you will find what you have learned useful in your everyday life?
    usefulness: undefined | Option<'info_clear'>
    // begin/usefulness_no [text] 4.1 Please provide comments why you think so:
    usefulness_no: string | undefined
    // begin/satisfaction [select_one] 5. Are you satisfied with the service provided (materials used, organisation of the informationdelivery process)? (MEA 1)
    satisfaction: undefined | Option<'info_clear'>
    // begin/satisfaction_no [text] 5.1 Please provide comments why you think so:
    satisfaction_no: string | undefined
    // begin/accountability [select_one] 6. Do you know how and where you could address your suggestions, comments or complaints related to the work of the Danish Refugee Council, if any? (ACC 1)
    accountability: undefined | Option<'accountability'>
    // begin/accountability_no [text] 6.1 Please provide comments why you think so (CFM contacts were not received/unclear process of data sharing)
    accountability_no: string | undefined
    // begin/trainer_answers [select_one] 7. Did the EORE assistant provide answers to your questions (related to EORE and other requests for informaiton/assistance) (PEM 1)
    trainer_answers: undefined | Option<'info_clear'>
    // begin/trainer_answers_no [text] 7.1 Please provide comments why you think so:
    trainer_answers_no: string | undefined
    // begin/info_clear [select_one] 8. To what extent is the material presented in the session understandable/clear for you?
    info_clear: undefined | Option<'info_clear'>
    // begin/info_clear_no [text] 8.1 Please provide comments why you think so:
    info_clear_no: string | undefined
    // begin/comments [text] Do you have any comments?
    comments: string | undefined
  }

  export const options = {
    office: {
      dnk: `Dnipro (DNK)`,
      hrk: `Kharkiv (HRK)`,
      lwo: `Lviv (LWO)`,
      cej: `Chernihiv (CEJ)`,
      iev: `Kyiv (IEV)`,
      nlv: `Mykolaiv (NLV)`,
      umy: `Sumy (UMY)`,
      slo: `Sloviansk (SLO)`,
    },
    project_id: {
      dutch1: `Dutch I`,
      dutch2: `Dutch II`,
      uhf5: `UHF 5`,
      echo322: `ECHO 322`,
      gffo331: `GFFO 331`,
      sida350: `SIDA 350`,
      uhf8_363: `UHF 8 363`,
      ech372: `ECHO 372`,
      novonordisk373: `Novo Nordisk 373`,
      danida380: `Danida 380`,
    },
    select_one_hs54l01: {
      male: `Male`,
      female: `Female`,
      other: `Other`,
    },
    info_clear: {
      yes_completely: `Yes, completely`,
      mostly_yes: `Mostly yes`,
      not_really: `Not really`,
      not_at_all: `Not at all`,
      do_not_know: `Don’t know`,
      no_answer: `No answer`,
    },
    accountability: {
      yes: `Yes`,
      no: `No`,
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
      date_session: _.date_session ? new Date(_.date_session) : undefined,
      _age: _._age ? +_._age : undefined,
    }) as T
}
