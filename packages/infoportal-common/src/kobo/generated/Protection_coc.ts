export namespace Protection_coc {
  export type Option<T extends keyof typeof options> = keyof (typeof options)[T]
  // Form id: aRBEzakmsMPpw8VoJG8Gpk
  export interface T {
    start: string
    end: string
    // not_hello [note] We thank you for training with us on the Code of Conduct and/or Protection from Sexual Exploitation, Abuse and Harassment (SEA).DRC is an organization that protects the most vulnerable, advocates for their rights and empowers them for a better future.  To ensure your participation is counted, please fill out this form and submit your response.
    not_hello: string
    // begin_group_qS00qeNhn/round [select_one] Round
    round: undefined | Option<'round'>
    // begin_group_qS00qeNhn/date [date] Date
    date: Date | undefined
    // begin_group_qS00qeNhn/facilitator [select_one] Are you a facilitator?
    facilitator: undefined | Option<'facilitator'>
    // begin_group_qS00qeNhn/faciliator_name_1 [select_one] Training faciliator name
    faciliator_name_1: undefined | Option<'faciliator_name_2'>
    // begin_group_qS00qeNhn/faciliator_position_1 [text] Training faciliator position
    faciliator_position_1: string | undefined
    // begin_group_qS00qeNhn/faciliator_name_2 [select_one] Training faciliator name
    faciliator_name_2: undefined | Option<'faciliator_name_2'>
    // begin_group_qS00qeNhn/faciliator_position_2 [text] Training faciliator position
    faciliator_position_2: string | undefined
    // begin_group_qS00qeNhn/date_training [date] Date of training
    date_training: Date | undefined
    // begin_group_qS00qeNhn/office_staff_trained [select_one] Area/base office where the staff trained are based
    office_staff_trained: undefined | Option<'office_staff_trained'>
    // begin_group_qS00qeNhn/office_staff_trained_other [text] If “Other” - Please, specify
    office_staff_trained_other: string | undefined
    // begin_group_qS00qeNhn/name_operation [calculate] Операційна діяльність
    name_operation: string
    // begin_group_qS00qeNhn/modality_training [select_one] Modality of training
    modality_training: undefined | Option<'modality_training'>
    // begin_group_qS00qeNhn/training_topic [select_one] Training topic
    training_topic: undefined | Option<'training_topic'>
    // begin_group_qS00qeNhn/training_topic_other [text] If “Other” - Please, specify
    training_topic_other: string | undefined
    // begin_group_qS00qeNhn/duration_training [select_one] Duration of training
    duration_training: undefined | Option<'duration_training'>
    // begin_group_qS00qeNhn/num_part [integer] Number of training participants
    num_part: number | undefined
    // training_participants [begin_repeat] Training participants
    training_participants:
      | {
          staff_email: string | undefined | undefined
          staff_name: string | undefined | undefined
          staff_position: string | undefined | undefined
          staff_gender: undefined | Option<'staff_gender'> | undefined
        }[]
      | undefined
  }
  export const options = {
    round: {
      round1: `Round 1`,
      round2: `Round 2`,
    },
    office_staff_trained: {
      dnipro: `Dnipro`,
      kharkiv: `Kharkiv`,
      sloviansk: `Sloviansk`,
      mykolaiv: `Mykolaiv`,
      kyiv: `Kyiv`,
      ivankiv: `Ivankiv`,
      kherson: `Kherson`,
      sumy: `Sumy`,
      ichna: `Ichna`,
      other: `Other`,
      lviv: `Lviv`,
      chernihiv: `Chernihiv`,
    },
    modality_training: {
      online: `Online`,
      inperson: `In-person`,
    },
    training_topic: {
      coc_employees_1h: `Code of Conduct - Employees (1h)`,
      coc_employees_2h: `Code of Conduct - Employees (2h)`,
      coc_employees_3h: `Code of Conduct - Employees (3h)`,
      coc_employees_4h: `Code of Conduct - Employees (4h)`,
      coc_managers: `Code of Conduct - Managers`,
      pseah: `PSEAH`,
      pseah_safeguarding: `PSEAH + Safeguarding`,
      safeguarding: `Safeguarding`,
      code_conduct: `Code of Conduct`,
      code_conduct_pseah_safeguarding: `Code of Conduct + PSEAH/Safeguarding`,
      other: `Other`,
    },
    duration_training: {
      '2_hour': `2 hour`,
      '3_hour': `3 hour`,
      half_day: `Half day`,
      full_day: `Full day`,
    },
    staff_gender: {
      male: `Male`,
      female: `Female`,
      other: `Other`,
    },
    facilitator: {
      yes: `Yes`,
      no: `No`,
    },
    faciliator_name_2: {
      dmytro_skopienkov: `Dmytro Skopienkov`,
      inna_naiborodina: `Inna Naiborodina`,
      veronika_kudlaienko: `Veronika Kudlaienko`,
      ihor_tereshchenko: `Ihor Tereshchenko`,
      mariia_hrodska: `Mariia Hrodska`,
      olga_nasieka: `Olga Nasieka`,
      anastasiia_rezvin: `Anastasiia Rezvin`,
      andrii_terokhin: `Andrii Terokhin`,
      yevhen_bolotskyi: `Yevhen Bolotskyi`,
      taras_stomin: `Taras Stomin`,
      vitalii_murai: `Vitalii Murai`,
      oleksii_reshetnikov: `Oleksii Reshetnikov`,
      daria_pisteleva: `Daria Pisteleva`,
      maryna_ivanchenko: `Maryna Ivanchenko`,
      anna_chernukha: `Anna Chernukha`,
      natalia_synytsia: `Natalia Synytsia`,
      natalia_trybushenko: `Natalia Trybushenko`,
      natalia_baryshevska: `Natalia Baryshevska`,
      viktoriia_sheliekhova: `Viktoriia Sheliekhova`,
      sacha_kuilman: `Sacha Kuilman`,
      shaun_booth: `Shaun Booth`,
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
      date_training: _.date_training ? new Date(_.date_training) : undefined,
      num_part: _.num_part ? +_.num_part : undefined,
      training_participants: _['training_participants']?.map(extractQuestionName).map((_: any) => {
        return _
      }),
    }) as T
}
