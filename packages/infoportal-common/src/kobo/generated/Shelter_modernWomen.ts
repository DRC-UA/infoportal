export namespace Shelter_modernWomen {
  export type Option<T extends keyof typeof options> = keyof (typeof options)[T]

  // Form id: aAqFiUJAgEVHnKSfhq2HA4
  export interface T {
    start: string
    end: string
    // date [date] Дата
    date: Date | undefined
    // background/receptionist [select_one] Реєстратор
    receptionist: undefined | Option<'receptionist'>
    // background/back_prog_type [select_one] Тип програми
    back_prog_type: undefined | Option<'back_prog_type'>
    // background/donor [select_one] Донор
    donor: undefined | Option<'donor'>
    // background/back_consent [select_one] Згода
    back_consent: undefined | Option<'receive_pss'>
    // background/consent_signature [image] Якщо так, будь ласка, підпишіть, або зробіть позначку "V", якщо це була усна згода
    consent_signature: string
    // background/case_identified [select_one] Як було надано цей випадок:
    case_identified: undefined | Option<'case_identified'>
    // background/back_consen_no_reas [text] Зазначте, будь ласка, причину, з якої Ви не погоджуєтеся заповнити анкету?
    back_consen_no_reas: string | undefined
    // background/back_consent_no_note [note] Щиро дякуємо за ваш час, ми не будемо продовжувати заповнення анкети без вашої згоди.
    back_consent_no_note: string
    // ben_det/ben_det_surname [text] Яке ваше прізвище (як вказано в паспорті)?
    ben_det_surname: string | undefined
    // ben_det/ben_det_first_name [text] Яке ваше ім'я (як зазначено в паспорті)?
    ben_det_first_name: string | undefined
    // ben_det/ben_det_pat_name [text] Яке ваше по-батькові?
    ben_det_pat_name: string | undefined
    // ben_det/ben_det_ph_number [integer] Ваш контактний номер телефону?
    ben_det_ph_number: number | undefined
    // ben_det/ben_det_site [text] Назва місця реєстрації, де проводиться захід
    ben_det_site: string | undefined
    // ben_det/ben_det_oblast [select_one] Виберіть область, фактичного місця проживання
    ben_det_oblast: undefined | Option<'ben_det_prev_oblast'>
    // ben_det/ben_det_raion [select_one] Виберіть район, фактичного місця проживання
    ben_det_raion: undefined | string
    // ben_det/ben_det_hromada [select_one] Виберіть громаду, фактичного місця проживання
    ben_det_hromada: undefined | string
    // ben_det/ben_det_settlement [select_one_from_file] Виберіть Поселення, фактичного місця проживання
    ben_det_settlement: string
    // ben_det/ben_det_res_stat [select_one] Виберіть статус проживання
    ben_det_res_stat: undefined | Option<'hh_char_res_stat'>
    // ben_det/ben_det_prev_oblast [select_one] Оберіть регіон з якого ви перемістились (Виберіть область)
    ben_det_prev_oblast: undefined | Option<'ben_det_prev_oblast'>
    // ben_det/ben_det_hh_size [integer] Кількість членів домогосподарства (включно з головою домогосподарства)
    ben_det_hh_size: number | undefined
    // ben_det/ben_det_income [integer] Якою була загальна вартість у гривнях усіх ресурсів, отриманих Вашим домогосподарством за останній один місяць?
    ben_det_income: number | undefined
    // hh_char/vulnerability_groups [select_multiple] Особи, які належать до однієї або декількох соціально-економічних вразливих груп.
    vulnerability_groups: undefined | Option<'vulnerability_groups'>[]
    // hh_char/hh_char_civ_stat [select_one] Який цивільно-правовий статус голови домогосподарства?
    hh_char_civ_stat: undefined | Option<'hh_char_civ_stat'>
    // hh_char/hh_char_pensioner [select_one] Чи є в домогосподарстві кого-небудь, хто отримує пенсію?
    hh_char_pensioner: undefined | Option<'receive_pss'>
    calc_char_civ_stat: string
    cal_head_tax: string
    // hh_char/hh_char_hh_det [begin_repeat] Члени домогосподарства
    hh_char_hh_det:
      | {
          hh_chart_note_resp: string | undefined
          hh_char_tax_id_yn: undefined | Option<'receive_pss'> | undefined
          head_tax_id: string | undefined
          hh_char_tax_id_num: string | undefined | undefined
          photo_hh_char_tax_id_num: string | undefined
          hh_char_date_birth: Date | undefined | undefined
          taxid_weightedsum: string | undefined
          taxid_roundedsum: string | undefined
          hh_char_hh_det_gender: undefined | Option<'hh_char_hh_det_gender'> | undefined
          hh_char_hh_det_age: number | undefined | undefined
          hh_char_student: undefined | Option<'receive_pss'> | undefined
          hh_char_res_stat: undefined | Option<'hh_char_res_stat'> | undefined
          hh_char_hh_det_dis_select: undefined | Option<'hh_char_hh_det_dis_select'>[] | undefined
          hh_char_hh_det_dis_level: undefined | Option<'hh_char_hh_det_dis_level'> | undefined
          calc_u5: string | undefined
          calc_u18: string | undefined
          calc_o60: string | undefined
          calc_ed_age: string | undefined
          calc_baby_age: string | undefined
          calc_preg: string | undefined
          calc_det_dis_level: string | undefined
          cal_student: string | undefined
          cal_scoring_difficulty_level: string | undefined
        }[]
      | undefined
    // hh_char/hh_char_chh [note] Це домогосподарство, яке очолює дитина (ситуація з високим рівнем ризику у сфері соціального захисту), будь ласка, негайно зверніться до колеги з відділу соцыально-правового захисту ДРБ та заповніть внутрішню форму перенаправлення .
    hh_char_chh: string
    calc_tot_baby_age: string
    calc_tot_calc_u5: string
    calc_tot_chi: string
    calc_tot_ed_age: string
    calc_tot_eld: string
    calc_tot_student: string
    cal_tot_scoring_difficulty_level: string
    // casf_utilities_fuel/type_accommodation [select_one] У якому типі житла ви зараз проживаєте?
    type_accommodation: undefined | Option<'type_accommodation'>
    // casf_utilities_fuel/type_accommodation_other [text] Якщо "Інше", будь ласка, вкажіть
    type_accommodation_other: string | undefined
    // casf_utilities_fuel/paying_heating_cost [select_one] Чи сплачуєте Ви витрати на опалення (комунальні послуги, придбання скрапленого газу, твердого палива, палива для печей)?
    paying_heating_cost: undefined | Option<'receive_pss'>
    // casf_utilities_fuel/type_property_living [select_one] В якому стані житла ви живете?
    type_property_living: undefined | Option<'type_property_living'>
    // casf_utilities_fuel/recent_shock [select_one] Чи це тому, що ваш будинок був пошкоджений нещодавнім ударом (вікна, дахи або двері пошкоджені обстрілом або вибухами)? Або це тому, що ваш будинок старий і більше не може захистити вас від стихій (старі вікна, протікаючий дах тощо)?
    recent_shock: undefined | Option<'recent_shock'>
    // casf_utilities_fuel/repair_home_there [select_one] Чи можете ви відремонтувати свій будинок, щоб жити в ньому безпечно? Або вам потрібна допомога?
    repair_home_there: undefined | Option<'repair_home_there'>
    // casf_utilities_fuel/current_gov_assist_cff [select_one] Чи отримуєте ви зараз або очікуєте отримати фінансову допомогу для покриття ваших потреб в оплаті палива/комунальних послуг?
    current_gov_assist_cff: undefined | Option<'current_gov_assist_cff'>
    // casf_utilities_fuel/gap_assistance_received [integer] Яка різниця ( у грн) між отриманою/очікуваною допомогою та сумою, необхідною для покриття потреб?
    gap_assistance_received: number | undefined
    // casf_utilities_fuel/utilities_fuel [select_one] Яким було ваше основне джерело опалення в цьому році (наприклад, газ, електрика, централізоване опалення) чи від твердого палива (дрова, пелети, деревне вугілля, кам'яне вугілля тощо)?
    utilities_fuel: undefined | Option<'utilities_fuel'>
    // casf_utilities_fuel/utilities_fuel_other [text] Якщо "Інше", будь ласка, вкажіть
    utilities_fuel_other: string | undefined
    // casf_utilities_fuel/utilities_fuel_portable_plug_heater [image] Будь ласка, надайте фото цього портативного обігрівача або дров'яної печі
    utilities_fuel_portable_plug_heater: string
    // casf_utilities_fuel/functioning_fuel_delivery [select_one] Чи є у вашому регіоні функціонуюча доставка/постачальник пального?
    functioning_fuel_delivery: undefined | Option<'functioning_fuel_delivery'>
    // casf_utilities_fuel/cal_scoring_sfu [calculate] undefined
    cal_scoring_sfu: string
    calc_vulnerability_cff: string
    calc_gen_cff_inc: string
    // ass_inc_cff/ass_inc_cff_inc [note] **Ви відповідаєте критеріям для включення в програму грошової допомоги на паливо. Ми проведемо подальші внутрішні перевірки та повідомимо Вам остаточний результат.**
    ass_inc_cff_inc: string
    // ass_inc_cff/ass_inc_cff_ben [note] **Попередня розрахована загальна допомога для цього домогосподарства:  <span style="color: red">Не зачитуйте це домогосподарству</span>
    ass_inc_cff_ben: string
    // ass_inc_cff/ass_inc_cff_not_vul [note] **На жаль, за нашими критеріями Ви не відповідаєте вимогам для участі у програмі грошової допомоги на паливо, оскільки рівень Ваш рівень не відповідає порогу вразливості.**
    ass_inc_cff_not_vul: string
    calc_vulnerability_cfu: string
    calc_gen_cfu_inc: string
    // ass_inc_cfu/ass_inc_cfu_inc [note] **Ви відповідаєте критеріям для включення в програму грошової допомоги на комунальні послуги. Ми проведемо подальші внутрішні перевірки та повідомимо Вам остаточний результат.**
    ass_inc_cfu_inc: string
    // ass_inc_cfu/ass_inc_cfu_ben [note] **Попередня розрахована загальна допомога для цього домогосподарства:  <span style="color: red">Не зачитуйте це домогосподарству</span>
    ass_inc_cfu_ben: string
    // ass_inc_cfu/ass_inc_cfu_not_vul [note] **На жаль, за нашими критеріями Ви не відповідаєте вимогам для участі у програмі грошової допомоги на комунальні послуги, оскільки рівень Ваш рівень не відповідає порогу вразливості.**
    ass_inc_cfu_not_vul: string
    // pay_det/pay_consent [select_one] Дякуємо за відповіді на вищезазначені питання, чи готові ви надати свої платіжні реквізити?
    pay_consent: undefined | Option<'receive_pss'>
    // pay_det/pay_det_s/pay_det_id_type [select_one] Яка у Вас форма посвідчення особи?
    pay_det_id_type: undefined | Option<'pay_det_id_type'>
    // pay_det/pay_det_s/pay_det_id_type_oth [text] Яка інша форма посвідчення особи у Вас є?
    pay_det_id_type_oth: string | undefined
    // pay_det/pay_det_s/pay_det_pass_ser [text] Серія паспорта
    pay_det_pass_ser: string | undefined
    // pay_det/pay_det_s/pay_det_pass_num [text] Номер ID
    pay_det_pass_num: string | undefined
    // pay_det/pay_det_s/pay_det_id_ph [image] Сфотографуйте посвідчення особи
    pay_det_id_ph: string
    // pay_det/pay_det_s/pay_det_tax_id_yn [select_one] Чи має бенефіціар індивідуальний податковий номер (ІПН)?
    pay_det_tax_id_yn: undefined | Option<'receive_pss'>
    // pay_det/pay_det_s/pay_det_tax_id_num [text] Ідентифікаційний номер (ІПН) бенефіціара
    pay_det_tax_id_num: string | undefined
    // pay_det/pay_det_s/pay_det_tax_id_ph [image] Сфотографуйте посвідчення платника податків
    pay_det_tax_id_ph: string
    // pay_det/pay_det_s/pay_det_tax_exempt [select_one] Підтвердження відсутності ІПН
    pay_det_tax_exempt: undefined | Option<'receive_pss'>
    // pay_det/pay_det_s/pay_det_tax_exempt_im [image] Сфотографуйте пільговий документ
    pay_det_tax_exempt_im: string
    // pay_det/pay_det_s/pay_det_pay_meth [select_one] Який у Вас бажаний спосіб оплати?
    pay_det_pay_meth: undefined | Option<'pay_det_pay_meth'>
    // pay_det/pay_det_s/pay_det_iban [text] Який у Вас IBAN-код?
    pay_det_iban: string | undefined
    // pay_det/pay_det_s/pay_det_iban_im [image] Сфотографуйте IBAN-код (якщо такий є)
    pay_det_iban_im: string
    // pay_det/pay_det_s/pay_address [text] Яка Ваша адреса?
    pay_address: string | undefined
    // pay_det/pay_det_s/pay_zip [text] Поштовий індекс
    pay_zip: string | undefined
    // pay_det/pay_det_s/pay_det_add_im [image] Сфотографуйте сторінку з адресою в паспорті
    pay_det_add_im: string
    // pay_det/pay_det_s/pay_det_pay_meth_oth [text] Яким іншим способам оплати Ви віддаєте перевагу?
    pay_det_pay_meth_oth: string | undefined
    // pay_det/pay_det_s/pay_det_pay_meth_none [text] Чи можете Ви навести головну причину того, що жоден із цих способів оплати Вам не підходить?
    pay_det_pay_meth_none: string | undefined
    // protection_questions/legal_support [select_one] 1. Чи потрібна вам юридична допомога з будь-якого з наступних питань?
    legal_support: undefined | Option<'legal_support'>
    // protection_questions/not_legal_support [note] *Примітка для співробітників ДРБ/Партнерів*: Якщо так, зверніться до юридичного відділу
    not_legal_support: string
    // protection_questions/not_shelter_support [note] *Примітка для співробітників ДРБ/Партнерів*: Якщо так, зверніться до відділу ремонту житла
    not_shelter_support: string
    // protection_questions/not_legal_va [note] *Примітка для співробітників ДРБ/Партнерів*: Якщо так, зверніться до VA
    not_legal_va: string
    // protection_questions/member_injured_mine [select_one] 2. ДРБ надає підтримку людям, які постраждали від обстрілів або вибухових пристроїв. Чи постраждали ви або хтось із ваших рідних від цього? Якщо так, ми можемо допомогти вам скористатися нашими послугами.
    member_injured_mine: undefined | Option<'stressful_events'>
    // protection_questions/members_require_medical [select_one] 2.1. Якщо так, чи потребуєте ви або члени вашої родини допомоги у вигляді медичного/реабілітаційного лікування або іншої підтримки?
    members_require_medical: undefined | Option<'stressful_events'>
    // protection_questions/not_va [note] *Примітка для співробітників DRC*: Якщо так, зверніться до VA
    not_va: string
    // protection_questions/stressful_events [select_one] 3. Чи вплинули на вас емоційно недавні стресові події, наприклад, викликавши такі почуття, як тривога, страх, гнів, дратівливість, паніка або смуток?
    stressful_events: undefined | Option<'stressful_events'>
    // protection_questions/receive_pss [select_one] 3.1. Якщо так, чи хотіли б ви отримати психологічну підтримку?
    receive_pss: undefined | Option<'receive_pss'>
    // protection_questions/not_pss [note] *Примітка для співробітників ДРБ//Партнерів*: Якщо так, зверніться до PSS.
    not_pss: string
    // protection_questions/protection_ref_dep [hidden] hidden
    protection_ref_dep: string
    // fin_det/not_thank_sfu [note] **Дякуємо, що відповіли на наші запитання.  Ми підтвердимо деталі вашої реєстрації та підтвердимо, що ви не отримуєте допомогу від інших сторін, будь ласка, зверніть увагу, що це може зайняти до 5 робочих днів.  Після успішної реєстрації ми підтвердимо, чи зможемо ми допомогти вам і на який рівень підтримки ви можете розраховувати**
    not_thank_sfu: string
    // fin_det/fin_det_res [text] Інші коментарі респондента
    fin_det_res: string | undefined
    // fin_det/fin_det_enum [text] Інші коментарі особи, яка проводила оцінювання
    fin_det_enum: string | undefined
    // fin_det/fin_det_oth_doc_im [image] Сфотографуйте будь-який інший відповідний документ
    fin_det_oth_doc_im: string
    // fin_det/fin_det_oth_doc_im2 [image] Сфотографуйте будь-який інший відповідний документ
    fin_det_oth_doc_im2: string
  }

  export const options = {
    receptionist: {
      np: `Ніколаєнко Павло`,
      sy: `Соломаха Яна`,
      ky: `Кучкова Яніна`,
      cv: `Черкашина Вікторія`,
      ga: `Геренко Анастасія`,
      ke: `Кузнєцова Єлизавета`,
      ko: `Ковальчук Олена`,
    },
    back_prog_type: {
      csf: `Cash for Fuel`,
      cfu: `Cash for Utilities`,
    },
    donor: {
      ukr000399_sdc3: `UKR-000399 SDC3`,
    },
    receive_pss: {
      yes: `Так`,
      no: `Ні`,
    },
    case_identified: {
      local_authority: `Направлені місцевими органами влади`,
      drc_partner: `Безпосередньо ідентифіковані DRC/партнером`,
    },
    ben_det_prev_oblast: {
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
    hh_char_res_stat: {
      idp: `A = Внутрішньо-переміщена особа (ВПО)`,
      long_res: `B = Довгостроковий мешканець`,
      ret: `C = Особа, яка повернулася`,
      ref_asy: `D = Біженець/особа, що потребує прихистку`,
    },
    vulnerability_groups: {
      pwc: `Люди з хронічними захворюваннями або серйозними медичними проблемами`,
      women_risk: `Жінки та дівчата, які перебувають у групі ризику: включаючи домогосподарства, очолювані одинокими жінками, жінок, які доглядають за іншими, вагітних або жінок, що годують груддю, жертв або тих, хто перебуває у групі ризику гендерного насильства, торгівлі людьми або експлуатації`,
      minority_groups: `Члени меншин: включаючи ромів, кримських татар, осіб без громадянства, осіб з невизначеним громадянством та ЛГБТІК+ осіб`,
      foster_families: `Прийомні сім'ї, які опікуються дітьми, що перебувають у групі ризику: включаючи дітей без супроводу або сиріт, дітей, розлучених з батьками, дітей, які проживають на лінії фронту, дітей, які перебувають під опікою держави, включаючи дітей або підлітків ЛГБТІК+.`,
      socio_economic_hardship: `Особи, які зазнають серйозних соціально-економічних труднощів: включаючи безробітних (особливо віком 40–60 років), сім'ї, які втратили основного годувальника через конфлікт (смерть, поранення, зникнення), особи, які не мають доступу до соціального захисту, та особи, які не можуть задовольнити основні потреби, такі як харчування, житло, одяг, опалення або медична допомога.`,
      none: `Нічого з перерахованого вище`,
    },
    hh_char_civ_stat: {
      single: `A = Неодружений(-а) (ніколи не був(-ла) одружений(-а))`,
      dom_part: `B = Неодружений(-а), але живе у сімейному партнерстві`,
      married: `C = Одружений(-а)`,
      div_sep: `D = Розлучений(-а)/ проживає окремо`,
      widow: `E = Удівець/ вдова`,
      abandoned: `F = Покинутий(-а)`,
    },
    hh_char_hh_det_gender: {
      male: `A = Чоловік`,
      female: `B = Жінка`,
    },
    hh_char_hh_det_dis_select: {
      diff_see: `A = Маєте труднощі із зором, навіть якщо носите окуляри`,
      diff_hear: `B = Маєте проблеми зі слухом, навіть якщо користуєтеся слуховим апаратом`,
      diff_walk: `C = Маєте труднощі з ходьбою або підйомом по сходах`,
      diff_rem: `D = Маєте труднощі з запам'ятовуванням або концентрацією уваги`,
      diff_care: `E = Мають труднощі з самообслуговуванням, наприклад, з миттям або одяганням`,
      diff_comm: `F = Маєте труднощі у спілкуванні, наприклад, у розумінні чи розумінні інших людей`,
      diff_none: `G = Ніщо з перерахованого вище не стосується`,
    },
    hh_char_hh_det_dis_level: {
      zero: `A = Ні, труднощі відсутні`,
      one: `B = Так, є деякі труднощі`,
      two: `C = Так, багато труднощів`,
      fri: `D = Взагалі не можу(-е) робити`,
    },
    type_accommodation: {
      house: `Будинок/квартира`,
      collective_site: `Колективне житло`,
      other: `Інше`,
    },
    type_property_living: {
      external_walls: `Житло із зовнішніми стінами з дерева або спресованих ґрунтових блоків/саман/тин (може включати їх комбінацію)`,
      damaged_windows: `Житло з одинарним склінням або пошкодженими вікнами`,
      poor_insulation: `Житло з поганою ізоляцією, пошкодженим дахом або стінами`,
      substantial_repairs: `Житло, що потребує значного ремонту, наприклад, з потрісканими або пошкодженими стінами, поганою ізоляцією та неефективною теплоізоляцією.`,
      none: `Нічого з перерахованого вище`,
    },
    recent_shock: {
      new: `Пошкоджений нещодавнім ударом`,
      old: `Старе помешкання, яке є у поганому стані`,
    },
    repair_home_there: {
      yes: `Так, я можу.`,
      no: `Ні, мені потрібна допомога.`,
    },
    current_gov_assist_cff: {
      yes: `Так, державна підтримка`,
      yes_another_agency: `Так, від іншої гуманітарної організації або подібної`,
      yes_but: `Так, але недостатньо для покриття потреб`,
      no: `Ні`,
    },
    utilities_fuel: {
      mains_piped_gas: `Мережевий/трубопровідний газ`,
      community_heating: `Громадське опалення`,
      portable_plug_heater: `Портативний обігрівач, що вставляється в розетку`,
      mains_electricity: `Мережева електрика`,
      fuel: `Тверде паливо`,
      other: `Інше`,
      utilities: `Основні комунальні послуги`,
    },
    functioning_fuel_delivery: {
      yes: `Так`,
      no: `Ні`,
      dk: `Не знаю`,
    },
    pay_det_id_type: {
      nat_pass_card: `A = Національний паспорт (карта)`,
      nat_pass_book: `B = Національний паспорт (книжка)`,
      nat_pass_diia: `C = Національний паспорт (додаток Дія)`,
      pass_ussr_red: `D = Паспорт (Червона книга СРСР)`,
      pass_int: `E = Закордонний паспорт`,
      birth_certificate: `F = Свідоцтво про народження`,
      driver_lic: `G = Водійські права`,
      pen_cert: `H = Посвідчення пенсіонера`,
      oth_id: `I = Інша форма ідентифікатора`,
      no_id: `J = Немає іншого типу`,
    },
    pay_det_pay_meth: {
      raiff_trans: `A = Переказ через «Райффайзен Банк АВАЛЬ»`,
      ukrpost: `B = Укрпошта`,
      bank_card: `C = Банківська картка`,
      other_pay: `D = Інший спосіб оплати`,
      none_pay: `E = Жодний з перелічених способів мені не підходить`,
    },
    legal_support: {
      lost_documents: `Втрачені або пошкоджені особисті документи або документи про право власності на майно`,
      damaged_housing: `Пошкоджене або зруйноване житло.`,
      injuries_explosive: `Травми, спричинені вибуховими пристроями`,
      no: `Ні`,
      pns: `Не хочу відповідати`,
    },
    stressful_events: {
      yes: `Так`,
      no: `Ні`,
      pns: `Не хочу відповідати`,
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
      ben_det_ph_number: _.ben_det_ph_number ? +_.ben_det_ph_number : undefined,
      ben_det_hh_size: _.ben_det_hh_size ? +_.ben_det_hh_size : undefined,
      ben_det_income: _.ben_det_income ? +_.ben_det_income : undefined,
      vulnerability_groups: _.vulnerability_groups?.split(' '),
      hh_char_hh_det: _['hh_char_hh_det']?.map(extractQuestionName).map((_: any) => {
        _['hh_char_date_birth'] = _.hh_char_date_birth ? new Date(_.hh_char_date_birth) : undefined
        _['hh_char_hh_det_age'] = _.hh_char_hh_det_age ? +_.hh_char_hh_det_age : undefined
        _['hh_char_hh_det_dis_select'] = _.hh_char_hh_det_dis_select?.split(' ')
        return _
      }),
      gap_assistance_received: _.gap_assistance_received ? +_.gap_assistance_received : undefined,
    }) as T
}
