export namespace Meal_cfmExternal {
  export type Option<T extends keyof typeof options> = keyof (typeof options)[T]
  // Form id: aJaGLvGEdpYWk5ift8k87y
  export interface T {
    start: string
    end: string
    // benef_origin [select_one] Beneficiary origin
    benef_origin: undefined | Option<'benef_origin'>
    // consent [note] Зверніть увагу, що ви збираєтеся поділитися своїми особистими контактними даними, щоб фахівці DRC мали змогу відповісти на ваш запит.
    consent: string
    // begin_group_QpVWZ8qgD/not_before [note] Перед заповненням даної он-лайн форми просимо ознайомитися з найбільш поширеними питаннями та відповідями стосовно діяльності Данської Ради у справах біженців:
    not_before: string
    // begin_group_QpVWZ8qgD/not_assistance [note] ####Яку допомогу ви надаєте?
    not_assistance: string
    // begin_group_QpVWZ8qgD/not_provide [note] ####Як отримати допомогу від DRC?
    not_provide: string
    // begin_group_QpVWZ8qgD/not_decided [note] ####Як приймається рішення про те, де і коли пройде реєстрація на допомогу?
    not_decided: string
    // begin_group_QpVWZ8qgD/not_registration [note] ####Просимо зауважити, що ця форма НЕ є реєстрацією на допомогу.
    not_registration: string
    // begin_group_QpVWZ8qgD/not_prefer [note] ####Для отримання додаткової інформації, ви можете зателефонувати нам за номером: #### 📞 0 800 33 95 18
    not_prefer: string
    // begin_group_QpVWZ8qgD/existing_beneficiary [select_one] Чи отримували ви вже якусь допомогу від DRC безпосередньо або від партнерів DRC?
    existing_beneficiary: undefined | Option<'prot_support'>
    // begin_group_QpVWZ8qgD/explain_beneficiary [text] Якщо так, опишіть Вашу взаємодію за підтримки DRC
    explain_beneficiary: string | undefined
    // begin_group_QpVWZ8qgD/name [text] Ім'я
    name: string | undefined
    // begin_group_QpVWZ8qgD/gender [select_one] Стать
    gender: undefined | Option<'gender'>
    // begin_group_QpVWZ8qgD/date [date] Дата
    date: Date | undefined
    // begin_group_QpVWZ8qgD/no_phone [select_multiple] Я віддаю перевагу не надавати свій номер телефону і розумію, що може бути обмежена можливість у відповіді від команди підтримки.
    no_phone: undefined | Option<'no_phone'>[]
    // begin_group_QpVWZ8qgD/phone [text] Контактний номер
    phone: string | undefined
    // begin_group_QpVWZ8qgD/email [text] Електронна адреса
    email: string | undefined
    // begin_group_QpVWZ8qgD/ben_det_oblast [select_one] Виберіть область в якій проживаєте
    ben_det_oblast: undefined | Option<'ben_det_oblast'>
    // begin_group_QpVWZ8qgD/ben_det_raion [select_one] Виберіть район в якому проживаєте
    ben_det_raion: undefined | string
    // begin_group_QpVWZ8qgD/ben_det_hromada [select_one] Виберіть громаду в якій проживаєте
    ben_det_hromada: undefined | string
    // begin_group_QpVWZ8qgD/ben_det_settlement [text] Населений пункт в якому проживаєте
    ben_det_settlement: string | undefined
    // begin_group_eCcGd9p3r/feedback_type [select_one] Як ми можемо Вам допомогти?
    feedback_type: undefined | Option<'feedback_type'>
    // begin_group_eCcGd9p3r/thanks_feedback [text] У разі подяки надайте додаткову інформацію
    thanks_feedback: string | undefined
    // begin_group_eCcGd9p3r/complaint [text] Будь ласка, надайте інформацію щодо вашої скарги
    complaint: string | undefined
    // begin_group_eCcGd9p3r/prot_support [select_one] Ви готові обговорити це з нашою командою DRC, чи Ви хотіли поговорити зі спеціалістом з чутливих випадків?
    prot_support: undefined | Option<'prot_support'>
    // begin_group_eCcGd9p3r/request [text] Будь ласка, надайте детальну інформацію щодо ваших потреб:
    request: string | undefined
    // begin_group_eCcGd9p3r/comments [text] Коментар
    comments: string | undefined
    // begin_group_eCcGd9p3r/thanks [note] Дякуємо, що пройшли опитування. Ви можете будь-коли скористатися цим інструментом зворотного зв'язку або звернутися на телефонну лінію Механізму реагування на скарги та відгуки
    thanks: string
  }
  export const options = {
    prot_support: {
      yes: `Так`,
      no: `Ні`,
    },
    gender: {
      male: `Чоловік`,
      female: `Жінка`,
      other: `Інше`,
    },
    benef_origin: {
      drc: `DRC`,
      partner: `Partner`,
      none: `None`,
    },
    no_phone: {
      dont_want: `Я не надаю свій номер телефону`,
    },
    ben_det_oblast: {
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
      crimea: `АР Крим`,
      sumska: `Сумська`,
      ternopilska: `Тернопільська`,
      vinnytska: `Вінницька`,
      volynska: `Волинська`,
      zakarpatska: `Закарпатська`,
      zaporizka: `Запорізька`,
      zhytomyrska: `Житомирська`,
    },
    feedback_type: {
      thanks: `Я хочу висловити подяку`,
      feedback: `Я хочу залишити відгук`,
      request: `Я хочу звернутися з проханням про допомогу`,
      complaint: `Я хочу залишити скаргу`,
    },
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

  export const map = (_: Record<keyof T, any>): T =>
    ({
      ..._,
      date: _.date ? new Date(_.date) : undefined,
      no_phone: _.no_phone?.split(' '),
    }) as T
}
