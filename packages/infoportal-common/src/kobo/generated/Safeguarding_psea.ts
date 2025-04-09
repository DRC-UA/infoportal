export namespace Safeguarding_psea {
  export type Option<T extends keyof typeof options> = keyof (typeof options)[T]

  // Form id: afq5ayhc2kssnomB8LR4oX
  export interface T {
    start: string
    end: string
    // general_information/date_training [date] Дата тренінгу
    date_training: Date | undefined
    // general_information/training_format [select_one] Формат тренінгу
    training_format: undefined | Option<'training_format'>
    // general_information/name_event [text] Назва заходу ?
    name_event: string | undefined
    // general_information/name_trainer [text] Ім'я та Прізвище тренера
    name_trainer: string | undefined
    // general_information/position_trainer [text] Посада тренера/ки
    position_trainer: string | undefined
    // general_information/name_trainer_second [text] Ім'я та Прізвище тренера
    name_trainer_second: string | undefined
    // general_information/position_trainer_second [text] Посада тренера/ки
    position_trainer_second: string | undefined
    // general_information/name_partner_organisation [select_one] Назва Партнерської організації
    name_partner_organisation: undefined | Option<'name_partner_organisation'>
    // general_information/name_partner_organisation_other [text] Якщо «Інше», будь ласка, вкажіть
    name_partner_organisation_other: string | undefined
    // general_information/implementation_area [select_multiple] Область імплементації проєкту за підтримки DRC
    implementation_area: undefined | Option<'implementation_area'>[]
    // general_information/numb_part [integer] Кількість учасників
    numb_part: number | undefined
    // participant [begin_repeat] Учасник
    participant:
      | {
          name_participant: string | undefined | undefined
          position_participant: string | undefined | undefined
          email_participant: string | undefined | undefined
        }[]
      | undefined
  }

  export const options = {
    training_format: {
      online: `Онлайн`,
      offline: `Офлайн`,
    },
    implementation_area: {
      cherkaska: `Черкаська`,
      chernihivska: `Чернігівська`,
      chernivetska: `Чернівецька`,
      dnipropetrovska: `Дніпропетровська`,
      donetska: `Донецька`,
      'ivano-frankivska': `Івано-Франківська`,
      kharkivska: `Харківська`,
      khersonska: `Херсонська`,
      khmelnytska: `Хмельницька`,
      kirovohradska: `Кіровоградська`,
      kyivska: `Київська`,
      luhanska: `Луганська`,
      lvivska: `Львівська`,
      mykolaivska: `Миколаївська`,
      odeska: `Одеська`,
      poltavska: `Полтавська`,
      rivnenska: `Рівненська`,
      sevastopilska: `Севастопільська`,
      sumska: `Сумська`,
      ternopilska: `Тернопільська`,
      vinnytska: `Вінницька`,
      volynska: `Волинська`,
      zakarpatska: `Закарпатська`,
      zaporizka: `Запорізька`,
      zhytomyrska: `Житомирська`,
    },
    name_partner_organisation: {
      lampa: `Громадська організація "ЛАМПА" (ГО "ЛАМПА")`,
      tenth_april: `Громадська організація "ДЕСЯТЕ КВІТНЯ"`,
      league_modern_women: `Громадська організація "ЛІГА СУЧАСНИХ ЖІНОК"(ГО "ЛІГА СУЧАСНИХ ЖІНОК")`,
      angels_salvation: `Благодійна організація "БЛАГОДІЙНИЙ ФОНД "ЯНГОЛИ СПАСІННЯ" (БО "БФ " "ЯНГОЛИ СПАСІННЯ")`,
      pomogaem: `Благодійний Фонд "Помагаєм" (БФ "Помагаєм")`,
      misto_syly: `Громадська організація "Місто сили" (ГО "Місто сили")`,
      alliance_global: `Громадська організація "АЛЬЯНС.ГЛОБАЛ" (ГО "АЛЬЯНС.ГЛОБАЛ")`,
      caritas_kharkiv: `Благодійна організація "Благодійний Фонд "Карітас Харків"`,
      institute_analytics_advocacy: `Громадська організація "Інститут аналітики та адвокації"`,
      mart: `Громадська організація "МАРТ"`,
      step: `Громадська організація“Стратегії і технології ефективного партнерства” (ГО «СТЕП»)`,
      caritas_mariupol: `Благодійна організація "Парафіяльний Благодійний Фонд "Карітас Маріуполь"`,
      icf_saved: `Благодійна організація "Міжнародний благодійний фонд "СЕЙВД" (МБФ "СЕЙВД")`,
      lviv_medical_center: `Lviv Mediation Centre`,
      relief_coordination_center: `Charitable organization “Relief Coordination Centre”`,
      green_landiya: `Green-Landiya`,
      bery_slav: `PO "Bery i Slav"`,
      blagomay: `СF "Blagomay"`,
      feminist_workshop: `Feminist Workshop`,
      turbota_dii: `PO "Turbota v Dii"`,
      ecoclub: `ГО "Екоклуб"`,
      other: `Інша`,
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
      date_training: _.date_training ? new Date(_.date_training) : undefined,
      implementation_area: _.implementation_area?.split(' '),
      numb_part: _.numb_part ? +_.numb_part : undefined,
      participant: _['participant']?.map(extractQuestionName).map((_: any) => {
        return _
      }),
    }) as T
}
