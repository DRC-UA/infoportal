export namespace Safety_incident {
  export type Option<T extends keyof typeof options> = keyof (typeof options)[T]

  // Form id: aAJNkn7v9fRL2XqQCgEkXf
  export interface T {
    'start': string,
    'end': string,
    // ii/date_time [datetime] Date, time
    'date_time': Date | undefined,
    // ii/oblast [select_one] Oblast
    'oblast': undefined | Option<'oblast'>,
    // ii/raion [select_one] Raion
    'raion': undefined | string,
    // ii/hromada [select_one] Hromada
    'hromada': undefined | string,
    // ii/incident_type [select_multiple] Incident type:
    'incident_type': undefined | Option<'incident_type'>[],
    // ii/alert_green_num [integer] Number of green alerts:
    'alert_green_num': number | undefined,
    // ii/alert_blue_num [integer] Number of blue alerts:
    'alert_blue_num': number | undefined,
    // ii/alert_yellow_num [integer] Number of yellow alerts:
    'alert_yellow_num': number | undefined,
    // ii/alert_red_num [integer] Number of red alerts:
    'alert_red_num': number | undefined,
    // ii/attack [select_one] Attack:
    'attack': undefined | Option<'zie_visit_person'>,
    // ii/attack_type [select_multiple] Attack type:
    'attack_type': undefined | Option<'attack_type'>[],
    // ii/attack_type_other [text] If "Other", please specify
    'attack_type_other': string | undefined,
    // ii/what_destroyed [select_multiple] What was destroyed:
    'what_destroyed': undefined | Option<'what_destroyed'>[],
    // ii/what_destroyed_other [text] If "Other", please specify
    'what_destroyed_other': string | undefined,
    // ii/type_casualties [select_multiple] Type of casualties
    'type_casualties': undefined | Option<'type_casualties'>[],
    // ii/not_number_casualities [note] #### 🔘 Number of casualties:
    'not_number_casualities': string,
    // ii/dead [integer] Dead
    'dead': number | undefined,
    // ii/injured [integer] Injured
    'injured': number | undefined,
    // af/foreign_dignitary_visiting [select_one] Was a foreign dignitary visiting?
    'foreign_dignitary_visiting': undefined | Option<'zie_visit_person'>,
    // af/foreign_dignitary_visiting_yes [text] Who; what; where
    'foreign_dignitary_visiting_yes': string | undefined,
    // af/wuaf [select_one] Was there an advance by the UAF?
    'wuaf': undefined | Option<'drone_attack_activity'>,
    // af/wuaf_yes [select_multiple] What channels was this reported on
    'wuaf_yes': undefined | Option<'zie_visit_person_rep'>[],
    // af/wraf [select_one] Was there an advance by the RAF?
    'wraf': undefined | Option<'drone_attack_activity'>,
    // af/wraf_yes [select_multiple] What channels was this reported on
    'wraf_yes': undefined | Option<'zie_visit_person_rep'>[],
    // af/headline_event [select_one] Was there a headline event: grain deal; sinking of a capital ship; mass surrenders of RAF; mass retreat of RAF; mass capture of RAF
    'headline_event': undefined | Option<'zie_visit_person'>,
    // af/headline_event_rep [select_multiple] What channels was this reported on
    'headline_event_rep': undefined | Option<'zie_visit_person_rep'>[],
    // af/headline_event_wh [text] Please provide more detail on the information provided
    'headline_event_wh': string | undefined,
    // af/zie_statement [select_one] Did Zielenskiy (or other cabinet minister) make a statement to an international body: foreign parliament; UN general assembly/security council/institution; prime minister; president; etc.
    'zie_statement': undefined | Option<'zie_visit_person'>,
    // af/zie_statement_rep [select_multiple] What channels was this reported on
    'zie_statement_rep': undefined | Option<'zie_visit_person_rep'>[],
    // af/zie_statement_wh [text] Please provide more detail on the information provided
    'zie_statement_wh': string | undefined,
    // af/zie_visit_location [select_one] Did Zielenskiy (or other cabinet minister) visit a high-profile location in Ukraine
    'zie_visit_location': undefined | Option<'zie_visit_person'>,
    // af/zie_visit_location_rep [select_multiple] What channels was this reported on
    'zie_visit_location_rep': undefined | Option<'zie_visit_person_rep'>[],
    // af/zie_visit_location_wh [text] Please provide more detail on the information provided
    'zie_visit_location_wh': string | undefined,
    // af/zie_visit_person [select_one] Did Zielenskiy (or other cabinet minister) visit a high-profile person in Ukraine
    'zie_visit_person': undefined | Option<'zie_visit_person'>,
    // af/zie_visit_person_rep [select_multiple] What channels was this reported on
    'zie_visit_person_rep': undefined | Option<'zie_visit_person_rep'>[],
    // af/zie_visit_person_wh [text] Please provide more detail on the information provided
    'zie_visit_person_wh': string | undefined,
    // af/drone_attack_activity [select_one] Was there a drone attack or other partisan activity in the RF
    'drone_attack_activity': undefined | Option<'drone_attack_activity'>,
    // af/level_confidence [select_one] What is your overall level of confidence in the sources used to report on the information surrounding this attack
    'level_confidence': undefined | Option<'level_confidence'>,
    // report_summary [text] Report summary
    'report_summary': string | undefined,
  }

  export const options = {
    oblast: {
      'aroc': `Autonomous Republic of Crimea`,
      'vinnytska': `Vinnytsia`,
      'volynska': `Volyn`,
      'dnipropetrovska': `Dnipropetrovsk`,
      'donetska': `Donetsk`,
      'zhytomyrska': `Zhytomyr`,
      'zakarpatska': `Zakarpattia`,
      'zaporizka': `Zaporizhzhia`,
      'ivano-frankivska': `Ivano-Frankivsk`,
      'kyivska': `Kyiv`,
      'kirovohradska': `Kirovohrad`,
      'luhanska': `Luhansk`,
      'lvivska': `Lviv`,
      'mykolaivska': `Mykolaiv`,
      'odeska': `Odesa`,
      'poltavska': `Poltava`,
      'rivnenska': `Rivne`,
      'sumska': `Sumy`,
      'ternopilska': `Ternopil`,
      'kharkivska': `Kharkiv`,
      'khersonska': `Kherson`,
      'khmelnytska': `Khmelnytskyi`,
      'cherkaska': `Cherkasy`,
      'chernivetska': `Chernivtsi`,
      'chernihivska': `Chernihiv`,
      'citykyiv': `City Kyiv`,
      'sevastopilska': `Sevastopil`
    },
    incident_type: {
      'alert': `Alert`,
      'attack': `Incident`,
      'other': `Other`
    },
    zie_visit_person: {
      'yes': `Yes`,
      'no': `No`
    },
    attack_type: {
      'drone': `Drone`,
      'missile': `Missile`,
      'hypersonic': `Hypersonic`,
      'artillery': `Artillery`,
      'other': `Other`
    },
    what_destroyed: {
      'dtcr': `Critical national infrastructure (bridge; power grid; school; hospital; etc.`,
      'dtgb': `Government building`,
      'dtmt': `Military target`,
      'dtca': `Residential civilian area`,
      'dtcc': `City center`,
      'dtho': `Hotel`,
      'other': `Other`
    },
    type_casualties: {
      'clmi': `Military`,
      'clci': `Civilian`,
      'clgo': `Government`,
      'clin': `International (journalist; humanitarian; foreign fighter)`
    },
    drone_attack_activity: {
      'yes': `Yes`,
      'no': `No`,
      'not': `Not Specified`
    },
    zie_visit_person_rep: {
      'socialmedia': `Social media`,
      'international': `International`,
      'nationalmedia': `National`
    },
    level_confidence: {
      '1': `1`,
      '2': `2`,
      '3': `3`,
      '4': `4`,
      '5': `5`
    }
  }

  const extractQuestionName = (_: Record<string, any>) => {
    const output: any = {}
    Object.entries(_).forEach(([k, v]) => {
      const arr = k.split('/')
      const qName = arr[arr.length - 1]
      output[qName] = v
    })
    return output
  }

  export const map = (_: Record<keyof T, any>): T => ({
    ..._,
    date_time: _.date_time ? new Date(_.date_time) : undefined,
    incident_type: _.incident_type?.split(' '),
    alert_green_num: _.alert_green_num ? +_.alert_green_num : undefined,
    alert_blue_num: _.alert_blue_num ? +_.alert_blue_num : undefined,
    alert_yellow_num: _.alert_yellow_num ? +_.alert_yellow_num : undefined,
    alert_red_num: _.alert_red_num ? +_.alert_red_num : undefined,
    attack_type: _.attack_type?.split(' '),
    what_destroyed: _.what_destroyed?.split(' '),
    type_casualties: _.type_casualties?.split(' '),
    dead: _.dead ? +_.dead : undefined,
    injured: _.injured ? +_.injured : undefined,
    wuaf_yes: _.wuaf_yes?.split(' '),
    wraf_yes: _.wraf_yes?.split(' '),
    headline_event_rep: _.headline_event_rep?.split(' '),
    zie_statement_rep: _.zie_statement_rep?.split(' '),
    zie_visit_location_rep: _.zie_visit_location_rep?.split(' '),
    zie_visit_person_rep: _.zie_visit_person_rep?.split(' '),
  }) as T
}