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
    // begin_group_eCcGd9p3r/sub_category [select_one] Please specify Sub-Category ?
    sub_category: undefined | Option<'sub_category'>
    // begin_group_eCcGd9p3r/name_event [text] Зазначте, будь ласка, НАЗВУ ЗАХОДУ (або тему чи місце проведення)
    name_event: string | undefined
    // begin_group_eCcGd9p3r/thanks_feedback [text] У разі подяки, будь ласка, опишіть вид отриманої допомоги, поділіться вашими враженнями та досвідом співпраці з Данською радою у справах біженців:
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
      partner: `Партнер`,
      none: `Жодного`,
    },
    no_phone: {
      dont_want: `Я не надаю свій номер телефону`,
    },
    sub_category: {
      activity: `1.1 Інформація про діяльність ДРБ як організацію`,
      loc: `1.2 Інформація про місце або час наступної реєстрації або видачі`,
      criteria: `1.3 Інформація про критерії програм допомоги`,
      register: `1.4 Інформація щодо різних етапів реєстрації`,
      payment: `1.5 Інформація про терміни виплат від ДРБ`,
      refusal: `1.6 Інформація щодо причин відмови у наданні допомоги`,
      deadline: `1.7 Інформація про строки та процедури проведення ремонтних робіт (у т.ч грошовий переказ)`,
      ukrpost: `1.8 Інформація щодо діяльності Укрпошти (строки виплат, смс повідомлення, затримки)`,
      personal: `1.9 Інформація про зміни особистих даних (ім'я, місцезнаходження, адреса, телефон, статус)`,
      hh_change: `1.10 Інформація про зміни в домогосподарстві (кількість членів тощо)`,
      other_ngo: `1.11 Інформація щодо контактів іншої НГО`,
      cash: `2.1 Запит на грошову допомогу`,
      nfi: `2.2 Запит на допомогу, пов'язану з непродовольчими товарами (NFI)`,
      food: `2.3 Запит на допомогу, пов'язану з продовольчими товарами`,
      medical: `2.4 Запит на допомогу, пов'язану із лікуванням, діагноситкою, лікарськиими зщасобами тощо`,
      reconstruction: `2.5 Запит на допомогу у відновленні житла`,
      business: `2.6 Запит на допомогу щодо грантів для бізнесу`,
      education: `2.7 Запит щодо гранту на навчання`,
      agriculture: `2.8 Запит щодо пфдтримки с/г активностей`,
      legal: `2.9 Запит щодо надання правової допомоги`,
      relocation: `2.10 Запит на переселення або евакуацію`,
      other: `2.11 Запит на інші види підтримки, окрім запропонованої`,
      area: `2.12 Запит на проведення заходів, які можуть бути реалізовані ДРБ у певній місцевості`,
      proj_change: `2.13 Запит на внесення змін у реалізацію проєкту`,
      criteria_select: `3.1 Незадоволеність критеріями відбору`,
      not_listed: `3.2 Не були включені до списків для цільової допомоги`,
      misuse: `3.3 Органи влади зловживають наділеними владними повноваженнями`,
      quality: `3.4 Незадоволеність якістю отриманої допомоги`,
      contractor: `3.5 Проблеми з підрядниками (відсутність контролю, неякісний ремонт)`,
      house_reconstruction: `3.6 Проблеми з обсягом робіт для відновлення житла (не розуміють або не згодні з тим, що буде зроблено з їхнім житлом, хотіли б більш серйозного залучення)`,
      event: `3.7 Нестача інформації про майбутні заходи (комунікація)`,
      registration: `3.8 Проблеми, пов'язані з реєстрацією, видачею (організаційні проблеми)`,
      delay: `3.9 Затримка з реагуванням (оперативність)`,
      amount: `3.10 Зміни в кількості отриманої допомоги`,
      location: `3.11 Пункт видачі або місце реєстрації знаходиться занадто далеко, занадто переповнене або небезпечне (доречність/відчуття безпеки)`,
      time: `3.12 Час очікування на отримання допомоги був занадто довгим (оперативність/затримки)`,
      communication: `3.13 Мова подачі інформації є неприйнятною та/або образливою (комунікація)`,
      training: `3.14 Проблеми, пов'язані з організацією тренінгів`,
      not_include: `3.15 Не були включені/запрошені до участі в тендерному процесі (комунікація/контракти)`,
      shelling: `4.1 Постраждали від обстрілів/збройного конфлікту/вибуху`,
      movement: `4.2 Обмеження свободи пересування (включаючи самоізоляцію)`,
      trafficking: `4.3 Постраждали від торгівлі людьми`,
      violence: `4.4 Фізичне та психологічне насильство, в тому числі побиття та знущання (не ГЗН)`,
      torture: `4.5 Постраждалі від катування та/або свавільного утримання під вартою`,
      justice: `4.6 Відмова у доступі до правосуддя`,
      GBV: `4.7 Гендерно-зумовлене насильство (ГЗН) - у тому числі сексуальне, психологічне, фізичне, соціально-економічне`,
      child: `4.8 Соцільно-правовий захист дітей`,
      displacement: `4.9 Примусове переміщення`,
      extortion: `4.10 Вимагання - особа погрожує насильством з метою отримання грошей`,
      service: `4.11 Відмова в доступі до послуг`,
      sexual: `4.12 Сексуальні домагання та сексуальна експлуатація`,
      occupation: `4.13 Незаконне заволодіння житлом, землею та майном`,
      confiscation: `4.14 Конфіскація майна та особистих речей`,
      family: `4.15 Примусове розлучення сім'ї`,
      discrimination: `4.16 Дискримінація та/або стигматизація`,
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
      living_abroad: `Перебуваю за кордоном`,
    },
    feedback_type: {
      thanks: `Я хочу висловити подяку за отриману допомогу`,
      thanks_event: `Я хочу висловити подяку за проведений тренінг, навчальну сесію, зустріч тощо`,
      feedback: `Я хочу залишити відгук`,
      request: `Я хочу звернутися з проханням про допомогу`,
      complaint: `Я хочу залишити скаргу`,
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
      no_phone: _.no_phone?.split(' '),
    }) as T
}
