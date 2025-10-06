export namespace Gbv_girl_shine {
  export type Option<T extends keyof typeof options> = keyof (typeof options)[T]

  // Form id: aCPnDw5RmgYAbrnfFqYivj
  export interface T {
    start: string
    end: string
    // general_information/date [date] Date:
    date: Date | undefined
    // general_information/project_code [select_one] Please enter the project code
    project_code: undefined | Option<'project_code'>
    // general_information/age [integer] Age of Participant:
    age: number | undefined
    // general_information/not_thank [note] **Thank you for participating in the Girl Shine programme. We hope that you have enjoyed our time working together, learnt new things and made new friends. We would like to get your feedback on the Girl Shine programme and the information you share will only be used by staff to help improve the programme and curriculum content.**
    not_thank: string
    // general_information/not_questionnaire [note] **This questionnaire is voluntary and do not have to answer any questions that you do not want to answer. The questionnaire is anonymous so you do not have to share your name or any identifying information.**
    not_questionnaire: string
    // feedback_questions/explain_gs_friend [text] 1. How would you explain Girl Shine to a friend?
    explain_gs_friend: string | undefined
    // feedback_questions/favourite_session [text] 2. What was your favourite session or activity in Girl Shine and why?
    favourite_session: string | undefined
    // feedback_questions/session_like_least [text] 3. What session did you like the least and why?
    session_like_least: string | undefined
    // feedback_questions/skills_gs_use_life [text] 4. What knowledge or skills from Girl Shine have you be able to use in your daily life?
    skills_gs_use_life: string | undefined
    // feedback_questions/started_attending_sessions [text] 5. Since you first started attending the session, Since you first started attending sessions, what have you learned about the available services for girls who have experienced violence?
    started_attending_sessions: string | undefined
    // feedback_questions/learned_health [text] 6. Since you first started attending sessions, what have you learned about health, relating to menstruation, pregnancy?
    learned_health: string | undefined
    // feedback_questions/think_about_facilitator [select_one] 7. Was the person leading the session friendly, able to answer your questions, explain things clearly, and treat you kindly and with respect?
    think_about_facilitator: undefined | Option<'knew_enough_participate'>
    // feedback_questions/timing_length_sessions [text] 8. What did you think about the timing and length of the sessions?
    timing_length_sessions: string | undefined
    // feedback_questions/safe_whole_time [select_one] 9. Did you feel safe the whole time — when coming here, while participating in Girl Shine, and when going home?
    safe_whole_time: undefined | Option<'knew_enough_participate'>
    // feedback_questions/happy_gs [select_one] 10. Are you happy with the Girl Shine sessions?
    happy_gs: undefined | Option<'knew_enough_participate'>
    // feedback_questions/idea_make_better [select_one] 11. If you had an idea to make things better, or if something was wrong, do you think you could tell someone about it?
    idea_make_better: undefined | Option<'knew_enough_participate'>
    // feedback_questions/ideas_complaints_people [select_one] 12. Do you know if ideas or complaints people shared were answered or acted on?
    ideas_complaints_people: undefined | Option<'knew_enough_participate'>
    // feedback_questions/ideas_complaints_people_no [text] 12.1 If no, would you mind telling me which are the issues / what happened?
    ideas_complaints_people_no: string | undefined
    // feedback_questions/facilitators_listen_opinion [select_one] 13. Did the facilitators listen to your opinion/preferences in topics you would like to discuss during Girl Shine?
    facilitators_listen_opinion: undefined | Option<'knew_enough_participate'>
    // feedback_questions/facilitators_listen_opinion_no [text] 13.1 If no, would you mind telling how is it that your views were not taken into account?
    facilitators_listen_opinion_no: string | undefined
    // feedback_questions/knew_enough_participate [select_one] 14. Did you feel you knew enough about how to participate in Girl Shine program?
    knew_enough_participate: undefined | Option<'knew_enough_participate'>
    // feedback_questions/knew_enough_participate_no [text] 14.1 If no, what could have been done to better inform you about Girl Shine?
    knew_enough_participate_no: string | undefined
    // feedback_questions/anything_suggest_changing [text] 15. Is there anything you would suggest changing for future sessions?
    anything_suggest_changing: string | undefined
  }

  export const options = {
    project_code: {
      'UKR-000423': `UKR-000423 ECHO4`,
    },
    knew_enough_participate: {
      yes: `Yes`,
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
      date: _.date ? new Date(_.date) : undefined,
      age: _.age ? +_.age : undefined,
    }) as T
}
