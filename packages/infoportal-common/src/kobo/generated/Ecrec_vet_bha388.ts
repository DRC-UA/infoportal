export namespace Ecrec_vet_bha388 {
  export type Option<T extends keyof typeof options> = keyof (typeof options)[T]
  // Form id: aLEGqicGyzkZCeCYeWqEyG
  export interface T {
    start: string
    end: string
    // __IP__TRIGGER_EMAIL [calculate] Confirmation of Your Submission
    __IP__TRIGGER_EMAIL: string
    // age_Hhoh [calculate] Вік голови домогосподарства
    age_Hhoh: string
    // cal_office [select_one] Відповідальний офіс
    cal_office: undefined | Option<'office'>
    // shortlisted [select_one] Відібрано до шорт-листу
    shortlisted: undefined | Option<'shortlisted'>
    // alter_donor [select_one] Донор
    alter_donor: undefined | Option<'alter_donor'>
    // interview_status [select_one] Інтерв'ю
    interview_status: undefined | Option<'interview_status'>
    // total_score_question [calculate] Бали за інтерв'ю
    total_score_question: string
    // final_decision [select_one] Кінцеве рішення
    final_decision: undefined | Option<'final_decision'>
    // pays_taxes [select_one] Хто сплачує податки?
    pays_taxes: undefined | Option<'pays_taxes'>
    // course_payment [select_one] Оплата курсу
    course_payment: undefined | Option<'course_payment'>
    // course_payment_date [date] Дата оплати курсу
    course_payment_date: Date | undefined
    // transportation_payment [select_one] Оплата транспортних витрат
    transportation_payment: undefined | Option<'equipment_payment'>
    // equipment_payment [select_one] Оплата надбавки за спорядження
    equipment_payment: undefined | Option<'equipment_payment'>
    // allowance_payment_date [date] Дата виплати стипендії(и)
    allowance_payment_date: Date | undefined
    // course_started [select_one] Розпочато курс
    course_started: undefined | Option<'course_completed'>
    // course_completed [select_one] Курс завершено
    course_completed: undefined | Option<'course_completed'>
    // date_course_completed [date] Дата завершення курсу
    date_course_completed: Date | undefined
    // certificate_submitted [file] Надіслано сертифікат 1
    certificate_submitted: string
    // certificate_submitted1 [file] Надіслано сертифікат 2
    certificate_submitted1: string
    // certificate_submitted2 [file] Надіслано сертифікат 3
    certificate_submitted2: string
    // comments_case_management [text] Коментарі
    comments_case_management: string | undefined
    // note_hello [note] Данська рада з питань біженців (DRC) розпочинає грантову програму, спрямовану на фінансування професійного навчання. Мета цієї програми — надати можливості для перекваліфікації та підвищення кваліфікації з метою покращення шансів на працевлаштування людей, які постраждали від війни. Програма призначена для мешканців Харківської області, а саме таких громад: Вільхівська, Роганська, Безлюдівська, Мала Данилівська, Височанська, Дергачівська, Солоницівська, Пісочанська, Циркунівська та Золочівська.  **Процес подання заявки** 1. Скористайтеся можливістю якнайповніше висловити свою мотивацію до участі в курсі професійного навчання. Окресліть свої перспективи працевлаштування після завершення курсу, надайте інформацію про вашу сімейну ситуацію та сформулюйте, чому ви вважаєте, що саме ви повинні отримати цей грант. Ваша детальна заявка дозволить нам краще зрозуміти ваші прагнення та прийняти обґрунтоване рішення. Наразі ми маємо обмежену кількість місць на програмі, і посилання на реєстрацію може бути закрите, якщо буде досягнуто максимальної кількості місць. Будь ласка, зверніть увагу, що DRC прагне надавати допомогу найбільш вразливим верствам населення та тим, хто не може самостійно профінансувати навчання на курсах професійної підготовки. Висловлення вашої зацікавленості не означає, що ви автоматично будете прийняті до програми. 2. Кандидати будуть відібрані на основі їхніх індивідуальних потреб та вразливостей, мотивації, навичок та перспектив забезпечення довгострокового працевлаштування після завершення навчання. Після того, як ви подасте заявку, команда DRC розгляне її і, в разі схвалення, зв'яжеться з вами, щоб запросити на співбесіду. Після відбору учасники будуть проінформовані про наступні кроки. 3. Відібрані кандидати отримають фінансову підтримку на обрану ними навчальну програму. 4. Учасники програми зобов'язані подати фінансовий звіт з детальним описом витрат грантових коштів.  **Критерії відбору** Ви можете взяти участь у програмі, якщо ви є безробітним (безробітною) або маєте неповну зайнятість (працюєте на роботі з низьким рівнем оплати, зайняті у неформальному секторі або застрягли на роботі з обмеженими перспективами кар'єрного зростання або взагалі без них), а також ви повинні продемонструвати зацікавленість і мотивацію до навчання. Існує також можливість підвищення кваліфікації у вашій поточній сфері зайнятості або експертизи, якщо ви надасте належне обґрунтування та якщо ви маєте високий рівень вразлив  **Заповнення аплікаційної форми** Будь ласка, заповніть форму нижче, якщо ви вважаєте, що відповідаєте критеріям і зацікавлені в проходженні курсу. Форма містить запитання, які допоможуть нам дізнатися про ваш досвід та мотивацію до навчання. Важливо! Реєстрація через цю форму не означає, що ви будете автоматично відібрані, Наразі ми маємо обмежену кількість місць в програмі, і посилання на реєстрацію може бути закрите, якщо буде досягнуто максимальної кількості місць. Процес відбору буде прозорим і конкурентним, з використанням критеріїв прийнятності, які зосереджуються на вашому рівні вразливості та мотивації до участі в програмі, а також на відповідності обраного вами курсу попиту на ринку праці.   **Кінцевий термін подачі заявок** Будь ласка, надішліть вашу заявку **до 30 квітня 2026 року**. Ми очікуємо отримати велику кількість заявок. Будь ласка, наберіться терпіння, ми опрацюємо вашу заявку і повідомимо вам, чи потрапили ви до короткого списку, протягом максимум трьох місяців.   **DRC високо цінує будь-який зворотній зв'язок, пов'язаний з нашими програмами. Якщо у вас виникли запитання чи побажання, будь ласка, зв'яжіться з нами електронною поштою UKR-feedback@drc.ngo; або за телефоном: 0 800 33 95 18 (понеділок-п'ятниця, з 9:00 до 17:00)**
    note_hello: string
    // consent_personal_data/date [date] Дата реєстрації
    date: Date | undefined
    // consent_personal_data/consent [select_one] Чи надаєте Ви згоду на обробку ДРБ Ваших персональних даних?
    consent: undefined | Option<'household_pregnant_that_breastfeeding_val'>
    // beneficiary_details/surname [text] Ваше прізвище (як вказано в паспорті)?
    surname: string | undefined
    // beneficiary_details/first_name [text] Ваше ім'я (як зазначено в паспорті)?
    first_name: string | undefined
    // beneficiary_details/pat_name [text] По батькові?
    pat_name: string | undefined
    // beneficiary_details/oblast [select_one] Область
    oblast: undefined | Option<'oblast'>
    // beneficiary_details/raion [select_one] Район
    raion: undefined | Option<'raion'>
    // beneficiary_details/hromada [select_one] Громада
    hromada: undefined | string
    // beneficiary_details/settlement [select_one_from_file] Населений пункт
    settlement: string
    // beneficiary_details/res_stat [select_one] Статус проживання
    res_stat: undefined | Option<'res_stat'>
    // beneficiary_details/long_displaced [select_one] Якщо Ви - ВПО, будь ласка, вкажіть, як довго Ви перебуваєте у статусі ВПО
    long_displaced: undefined | Option<'long_displaced'>
    // beneficiary_details/certificate_displaced [select_one] Чи маєте Ви дійсну довідку ВПО?
    certificate_displaced: undefined | Option<'household_pregnant_that_breastfeeding_val'>
    // beneficiary_details/res_stat_other [text] Якщо «Інше», будь ласка, вкажіть Ваш статус
    res_stat_other: string | undefined
    // beneficiary_details/ph_number [integer] Вкажіть Ваш номер телефону
    ph_number: number | undefined
    // beneficiary_details/email [text] Вкажіть Вашу адресу електронної пошти
    email: string | undefined
    // beneficiary_details/tax_id_num [text] Вкажіть Ваш індивідуальний податковий номер
    tax_id_num: string | undefined
    tax_length: string
    // beneficiary_details/number_people [integer] Будь ласка, вкажіть загальну кількість осіб у Вашому домогосподарстві, включаючи Вас. Будь ласка, спочатку заповніть інформацію про себе
    number_people: number | undefined
    // beneficiary_details/family_member [begin_repeat] Ваш наступний член домогосподарства
    family_member:
      | {
          not_first_member: string | undefined
          gender: undefined | Option<'gender'> | undefined
          date_birth: Date | undefined | undefined
          age: number | undefined | undefined
          dis_select: undefined | Option<'dis_select'>[] | undefined
          dis_level: undefined | Option<'dis_level'> | undefined
        }[]
      | undefined
    // beneficiary_details/impact_ability_household [select_one] Чи впливає щось з перерахованого вище на здатність Вашого домогосподарства займатися діяльністю, що забезпечує засоби до існування?
    impact_ability_household: undefined | Option<'household_pregnant_that_breastfeeding_val'>
    // beneficiary_details/single_parent [select_one] Ви виховуєте дитину в одиночку?" or "Ви одинока(-ий) матір/батько?
    single_parent: undefined | Option<'household_pregnant_that_breastfeeding_val'>
    // beneficiary_details/elderly_people [select_one] У вашому домогосподарстві є люди похилого віку?
    elderly_people: undefined | Option<'household_pregnant_that_breastfeeding_val'>
    // beneficiary_details/many_elderly_people [integer] Будь ласка, вкажіть, кількість таких осіб
    many_elderly_people: number | undefined
    // beneficiary_details/household_contain_excombatants [select_one] Чи є у Вашому домогосподарстві колишні учасники бойових дій?
    household_contain_excombatants: undefined | Option<'household_pregnant_that_breastfeeding_val'>
    // beneficiary_details/many_excombatants [integer] Будь ласка, вкажіть, кількість таких осіб
    many_excombatants: number | undefined
    // beneficiary_details/certification_status_excombatants [select_one] Чи мають вони посвідчення, що підтверджують їхній статус учасника бойових дій?
    certification_status_excombatants: undefined | Option<'household_pregnant_that_breastfeeding_val'>
    // beneficiary_details/household_chronic_diseases [select_one] Чи є у Вашому домогосподарстві люди з хронічними захворюваннями, які роблять їх непрацездатними або які потребують постійного догляду?
    household_chronic_diseases: undefined | Option<'household_pregnant_that_breastfeeding_val'>
    // beneficiary_details/many_chronic_diseases [integer] Будь ласка, вкажіть, кількість таких осіб
    many_chronic_diseases: number | undefined
    // beneficiary_details/household_pregnant_that_breastfeeding [select_one] Чи є у вашому домогосподарстві вагітні жінки або жінки, які годують груддю?
    household_pregnant_that_breastfeeding: undefined | Option<'household_pregnant_that_breastfeeding_val'>
    // beneficiary_details/many_pregnant_that_breastfeeding [integer] Будь ласка, вкажіть, кількість таких осіб
    many_pregnant_that_breastfeeding: number | undefined
    // beneficiary_details/household_income [integer] Який загальний дохід Вашого домогосподарства на місяць?
    household_income: number | undefined
    // registration_questions/current_employment_situation [select_one] Як би Ви описали Вашу поточну ситуацію з працевлаштуванням?
    current_employment_situation: undefined | Option<'current_employment_situation'>
    // registration_questions/long_unemployed [select_one] Як довго Ви перебуваєте без роботи?
    long_unemployed: undefined | Option<'long_unemployed'>
    // registration_questions/interested_formally_employed [select_one] Ви вказали, що офіційно працевлаштовані, тому, будь ласка, повідомте нам основну причину, чому ви зацікавлені в подачі заявки на курс професійного навчання
    interested_formally_employed: undefined | Option<'interested_formally_employed'>
    // registration_questions/interested_formally_employed_other [text] Якщо «Інше», будь ласка, вкажіть
    interested_formally_employed_other: string | undefined
    // registration_questions/most_barriers_employment [select_multiple] Що ви вважаєте найсуттєвішою перешкодою на шляху до офіційного працевлаштування?
    most_barriers_employment: undefined | Option<'barrier_experiencing_prevents'>[]
    // registration_questions/most_barriers_employment_other [text] Якщо «Інше», будь ласка, вкажіть
    most_barriers_employment_other: string | undefined
    // registration_questions/course_interest [text] Якщо Ви відповідаєте критеріям цієї програми, який навчальний курс вас би зацікавив?
    course_interest: string | undefined
    // registration_questions/aware_training_facility_operating [select_one] Чи знаєте ви про зареєстрований/офіційний навчальний заклад, який наразі працює і може проводити таке навчання?
    aware_training_facility_operating: undefined | Option<'household_pregnant_that_breastfeeding_val'>
    // registration_questions/information_training_center [text] Якщо так, введіть інформацію про навчальний центр тут
    information_training_center: string | undefined
    // registration_questions/know_cost_training [select_one] Чи знаєте ви загальну вартість навчання, на яке ви хотіли б записатися?
    know_cost_training: undefined | Option<'household_pregnant_that_breastfeeding_val'>
    // registration_questions/cost_training [integer] Якщо так, будь ласка, вкажіть загальну вартість навчання в гривнях.
    cost_training: number | undefined
    // registration_questions/format_training [select_one] Який формат навчання ви обрали
    format_training: undefined | Option<'format_training'>
    // registration_questions/access_computer_internet [select_one] Оскільки обраний вами курс містить онлайн-компоненти, будь ласка, підтвердіть, що у вас є доступ до ноутбука/комп'ютера та підключення до Інтернету, щоб мати можливість проходити цей курс
    access_computer_internet: undefined | Option<'access_computer_internet'>
    // registration_questions/ability_regularly_attend [select_one] Будь ласка, підтвердіть, що ви маєте можливість регулярно відвідувати навчальні курси протягом обраного вами курсу
    ability_regularly_attend: undefined | Option<'household_pregnant_that_breastfeeding_val'>
    // registration_questions/motivation_vocational_training [text] Яка Ваша мотивація для участі в цьому курсі професійної підготовки? Будь ласка, поясніть, як це допоможе Вам у працевлаштуванні?
    motivation_vocational_training: string | undefined
    // registration_questions/details_independently_course [text] Будь ласка, коротко поясніть, чому Ви не можете самостійно оплатити цей курс або можливість навчання?
    details_independently_course: string | undefined
    // registration_questions/enrolled_other_training [select_one] Чи брали Ви участь у будь-якій іншій навчальній програмі протягом останніх двох років?
    enrolled_other_training: undefined | Option<'household_pregnant_that_breastfeeding_val'>
    // registration_questions/who_paid_training [select_one] Хто оплачував це навчання?
    who_paid_training: undefined | Option<'who_paid_training'>
    // final_details/comments [text] Чи є якісь інші коментарі або інформація, якою Ви хотіли б поділитися?
    comments: string | undefined
    // final_details/hear_about_program [select_one] Як Ви дізналися про цю програму?
    hear_about_program: undefined | Option<'hear_about_program'>
    // final_details/hear_about_program_other [text] Якщо «Інше», будь ласка, вкажіть
    hear_about_program_other: string | undefined
    // not_thank [note] Дякуємо, що знайшли час, щоб надати цю інформацію. Якщо ви натиснете кнопку «Надіслати», ми успішно отримаємо вашу заявку. Ми повідомимо вас про результат і будь-які подальші кроки (якщо такі будуть) протягом трьох місяців.
    not_thank: string
    // vte/general_information/tax_id_num_val [text] Індивідуальний податковий номер (ІПН)
    tax_id_num_val: string | undefined
    tax_length_val: string
    // vte/general_information/office [select_one] Оберіть офіс
    office: undefined | Option<'office'>
    // vte/general_information/back_enum [select_one] Переписувач
    back_enum: undefined | Option<'back_enum_extra'>
    // vte/general_information/back_enum_extra [select_one] Переписувач
    back_enum_extra: undefined | Option<'back_enum_extra'>
    // vte/general_information/date_interview [date] Дата співбесіди
    date_interview: Date | undefined
    // vte/training_needs/name_training [text] Назва навчання, яке бажає пройти кандидат
    name_training: string | undefined
    // vte/training_needs/lenth_training [decimal] Тривалість навчання в місяцях
    lenth_training: number | undefined
    // vte/training_needs/possible_provider_training [text] Можливий постачальник послуг з навчання
    possible_provider_training: string | undefined
    // vte/training_needs/modality_training [select_one] Форма проведення навчання
    modality_training: undefined | Option<'modality_training'>
    // vte/training_needs/prerequisites_enrollment [select_one] Чи є у Вас реквізити для зарахування на навчання
    prerequisites_enrollment: undefined | Option<'household_pregnant_that_breastfeeding_val'>
    // vte/training_needs/prerequisites_enrollment_yes [text] Якщо «Так», то вкажіть які реквізити
    prerequisites_enrollment_yes: string | undefined
    // vte/training_needs/understanding_wher_training [select_one] Розуміння того, де можна пройти навчання
    understanding_wher_training: undefined | Option<'score_understand_market_demand'>
    // vte/candidate_evaluation/purpose_training [select_one] З якою метою Ви бажаєте пройти навчальни курс?
    purpose_training: undefined | Option<'purpose_training'>
    // vte/candidate_evaluation/barrier_experiencing_prevents [select_multiple] Які перешкоди заважають Вам отримати «звичайну» роботу на повний робочий день?
    barrier_experiencing_prevents: undefined | Option<'barrier_experiencing_prevents'>[]
    // vte/candidate_evaluation/motivation_training_course [text] Яка Ваша мотивація для участі в навчальному курсі?
    motivation_training_course: string | undefined
    // vte/candidate_evaluation/score_motivation_training_course [select_one] Оцінка "Яка Ваша мотивація для участі в навчальному курсі?"
    score_motivation_training_course: undefined | Option<'score_understand_market_demand'>
    // vte/candidate_evaluation/experience_training_requested [text] Який у Вас досвід роботи у сфері, в якій Ви бажаєте пройти навчання?
    experience_training_requested: string | undefined
    // vte/candidate_evaluation/score_experience_training_requested [select_one] Оцінка "Який у Вас досвід роботи у сфері, в якій Ви бажаєте пройти навчання?"
    score_experience_training_requested: undefined | Option<'score_understand_market_demand'>
    // vte/candidate_evaluation/new_skills_increased [text] Як отримані нові навички будуть сприяти підвищенню конкурентоспроможності на ринку праці або дозволяють отримати доступ до кращих або більш гнучких можливостей працевлаштування?
    new_skills_increased: string | undefined
    // vte/candidate_evaluation/score_new_skills_increased [select_one] Оцінка "Як отримані нові навички будуть сприяти підвищенню конкурентоспроможності на ринку праці або дозволяють отримати доступ до кращих або більш гнучких можливостей працевлаштування?"
    score_new_skills_increased: undefined | Option<'score_understand_market_demand'>
    // vte/candidate_evaluation/covering_course_expenses [text] Які існують перешкоди для покриття витрат на навчання власними коштами?
    covering_course_expenses: string | undefined
    // vte/candidate_evaluation/understand_market_demand [text] Опишіть, як Ви розумієте ринковий попит на обрані навички
    understand_market_demand: string | undefined
    // vte/candidate_evaluation/score_understand_market_demand [select_one] Оцінка "Опишіть, як Ви розумієте ринковий попит на обрані навички"
    score_understand_market_demand: undefined | Option<'score_understand_market_demand'>
    // vte/candidate_evaluation/enrolled_other_training_val [select_one] Чи брали Ви участь у будь-якій іншій навчальній програмі протягом останніх двох років?
    enrolled_other_training_val: undefined | Option<'household_pregnant_that_breastfeeding_val'>
    // vte/candidate_evaluation/participation_similar_programs [text] Які це були програми? Коли Ви брали в них участь?
    participation_similar_programs: string | undefined
    // vte/candidate_evaluation/able_entirety_training [select_one] Підтвердьте, що Ви зможете взяти участь у навчальному курсі в повному обсязі
    able_entirety_training: undefined | Option<'household_pregnant_that_breastfeeding_val'>
    // vte/candidate_evaluation/documentation_completion_course [select_one] Підтвердьте, що Ви готові надати підтверджуючу документацію, що підтверджує зарахування та проходження навчального курсу
    documentation_completion_course: undefined | Option<'household_pregnant_that_breastfeeding_val'>
    // vte/household_characteristics/single_parent_val [select_one] Ви одинока(-ий) матір/батько?
    single_parent_val: undefined | Option<'household_pregnant_that_breastfeeding_val'>
    // vte/household_characteristics/elderly_people_val [select_one] У вашому домогосподарстві є люди похилого віку?
    elderly_people_val: undefined | Option<'household_pregnant_that_breastfeeding_val'>
    // vte/household_characteristics/many_elderly_people_val [integer] Будь ласка, вкажіть, кількість таких осіб
    many_elderly_people_val: number | undefined
    // vte/household_characteristics/household_contain_excombatants_val [select_one] Чи є у Вашому домогосподарстві колишні учасники бойових дій?
    household_contain_excombatants_val: undefined | Option<'household_pregnant_that_breastfeeding_val'>
    // vte/household_characteristics/many_excombatants_val [integer] Будь ласка, вкажіть, кількість таких осіб
    many_excombatants_val: number | undefined
    // vte/household_characteristics/certification_status_excombatants_val [select_one] Чи мають вони посвідчення, що підтверджують їхній статус учасника бойових дій?
    certification_status_excombatants_val: undefined | Option<'household_pregnant_that_breastfeeding_val'>
    // vte/household_characteristics/household_chronic_diseases_val [select_one] Чи є у Вашому домогосподарстві люди з хронічними захворюваннями, які роблять їх непрацездатними, або які потребують постійного догляду?
    household_chronic_diseases_val: undefined | Option<'household_pregnant_that_breastfeeding_val'>
    // vte/household_characteristics/many_chronic_diseases_val [integer] Будь ласка, вкажіть, кількість таких осіб
    many_chronic_diseases_val: number | undefined
    // vte/household_characteristics/household_pregnant_that_breastfeeding_val [select_one] Чи є у вашому домогосподарстві вагітні жінки або жінки, які годують груддю?
    household_pregnant_that_breastfeeding_val: undefined | Option<'household_pregnant_that_breastfeeding_val'>
    // vte/household_characteristics/many_pregnant_that_breastfeeding_val [integer] Будь ласка, вкажіть, кількість таких осіб
    many_pregnant_that_breastfeeding_val: number | undefined
    // vte/household_characteristics/household_income_val [integer] Який загальний дохід Вашого домогосподарства на місяць?
    household_income_val: number | undefined
    // vte/household_characteristics/family_impacted_conflict [select_multiple] Як військовий конфлікт вплинув на Вас або Ваше домогосподарство?
    family_impacted_conflict: undefined | Option<'family_impacted_conflict'>[]
    // vte/household_characteristics/family_impacted_conflict_other [text] Якщо «Інше», будь ласка, вкажіть
    family_impacted_conflict_other: string | undefined
    // vte/household_characteristics/score_family_impacted_conflict [select_one] Оцінка "Як військовий конфлікт вплинув на вас або вашу родину?"
    score_family_impacted_conflict: undefined | Option<'score_family_impacted_conflict'>
    // vte/final_comments/comments_val [text] Якісь інші чи заключні коментарі?
    comments_val: string | undefined
  }
  export const options = {
    shortlisted: {
      yes: `✅ Так`,
      no: `❌ Ні`,
      deduplication: `⚠️ Дедуплікація`,
      pending: `🕓 Очікує на розгляд`,
    },
    interview_status: {
      completed: `✅ Завершено`,
      ongoing: `🕓 Триває`,
      rejected: `❌ Відхилено`,
    },
    final_decision: {
      yes: `✅ Так`,
      no: `❌ Ні`,
      pending: `🕓 Очікує на розгляд`,
    },
    course_payment: {
      done: `✅ Виконано`,
      pending: `🕓 На розгляді`,
      na: `❎ N/A`,
    },
    equipment_payment: {
      done: `✅ Виконано`,
      not_eligible: `❌ Не підходить`,
      pending: `🕓 На розгляді`,
    },
    course_completed: {
      yes: `✅ Так`,
      no: `❌ Ні`,
    },
    pays_taxes: {
      drc: `ДРБ`,
      beneficiary: `Отримувач допомоги`,
      exempted_area: `Звільнена від оподаткування територія`,
      exempted_idp: `Звільнена від оподаткування внутрішньо переміщена особа`,
    },
    alter_donor: {
      ukr000350_sida: `SIDA (UKR-000350)`,
      ukr000386_pooled_funds: `UKR-000386 (Pooled Funds)`,
      ukr000388_bha: `BHA (UKR-000388)`,
    },
    office: {
      kharkiv: `Харків`,
      dnipro: `Дніпро`,
      mykovaiv: `Миколаїв`,
    },
    back_enum_extra: {
      oleksandr_havrylov: `Олександр Гаврилов`,
      ievgen_kylymenniy: `Євген Килименний`,
      oleksandr_shmunk: `Олександр Шмунк`,
      inna_kovalchuk: `Інна Ковальчук`,
      polina_prusakova: `Поліна Прусакова`,
      artem_chernukha: `Чернуха Артем`,
      daria_trofymenko: `Дарина Трофименко`,
      nlv_ex1: `Додатковий 1`,
      nlv_ex2: `Додатковий 1`,
      serhii_dolzhenko: `Serhii Dolzhenko`,
      viktoria_klymenko: `Viktoria Klymenko`,
      andrii_zahoruyev: `Андрій Загоруєв`,
      oleh_Ivanov: `Олег Іванов`,
      karina_korzh: `Каріна Корж`,
      serhii_nevmyvaka: `Сергій Невмивака`,
      olha_osmukha: `Ольга Осьмуха`,
      halyna_diachenko: `Галина Дьяченко`,
      mariia_kozachko: `Марія Козачко`,
      maksym_mykytas: `Максим Микитась`,
      vita_zolotarevska: `Віта Золотаревська`,
      olha_sakharnova: `Ольга Сахарнова`,
      olena_zahriichuk: `Олена Загрійчук`,
      sofiia_berezhna: `Софія Бережна`,
      illia_kutsenko: `Ілля Кутценко`,
      tetiana_tsapii: `Тетяна Цапій`,
      iryna_nezdolina: `Ірина Нездоля`,
      dnk_ex1: `Додатковий 1`,
      dnk_ex2: `Додатковий 1`,
      yurii_volkov: `Юрій Волков`,
      andrii_zagoruiev: `Андрій Загоруєв`,
      olena_sydorenko: `Олена Сидоренко`,
      dmytro_maistrenko: `Дмитро Майстренко`,
      tetiana_konovshii: `Тетяна Коновшій`,
      taras_stomin: `Тарас Стомін`,
      olena_buglo: `Олена Бугло`,
      vitalii_shapoval: `Віталій Шаповал`,
      hrk_ex1: `Додатковий 1`,
      hrk_ex2: `Додатковий 1`,
    },
    modality_training: {
      offline: `У форматі реального відвідування`,
      online: `У форматі онлайн`,
      hybrid: `Змішаний`,
    },
    purpose_training: {
      upskilling: `Підвищення кваліфікації`,
      reskilling: `Перекваліфікація`,
      allowing_flexible: `Дозвіл на гнучкий або онлайн режим роботи`,
    },
    family_impacted_conflict: {
      being_internally_displaced: `Внутрішньо переміщена особа`,
      house_damaged: `Будинок було пошкоджено або зруйновано`,
      lost_job: `Втрата роботи або іншого джерела доходу через перебіг конфлікту`,
      loss_business: `Втрата бізнесу через пов'язані з конфліктом ринкові перебої`,
      loss_breadwinner: `Поранення/травматизація або втрата годувальника`,
      housing_idps: `Розміщення у себе ВПО (безкоштовно)`,
      being_returnee: `Перебування в статусі особи, яка повернулася`,
      living_area: `Проживання на території, що визначена урядом як постраждала від конфлікту`,
      other: `Інше`,
    },
    score_family_impacted_conflict: {
      zero: `0`,
      five: `5`,
      ten: `10`,
      fifteen: `15`,
    },
    score_understand_market_demand: {
      one: `1`,
      two: `2`,
      tfree: `3`,
      four: `4`,
      five: `5`,
    },
    household_pregnant_that_breastfeeding_val: {
      yes: `Так`,
      no: `Ні`,
    },
    undefined: {
      family_member: `Член сім'ї власника бізнесу`,
      third_party_agency: `Стороннє агентство`,
      accountant_business: `Бухгалтер/ка бізнесу`,
      director_business: `Директор/ка бізнесу`,
    },
    res_stat: {
      long_res: `Довгостроковий мешканець`,
      displaced: `ВПО`,
      returnee: `Мешканець котрий повернувся`,
      other: `Інший`,
    },
    dis_select: {
      diff_see: `Маєте труднощі із зором, навіть якщо носите окуляри`,
      diff_hear: `Маєте проблеми зі слухом, навіть якщо користуєтеся слуховим апаратом`,
      diff_walk: `Маєте труднощі з ходьбою або підйомом по сходах`,
      diff_rem: `Маєте труднощі з запам'ятовуванням або концентрацією уваги`,
      diff_care: `Мають труднощі з самообслуговуванням, наприклад, з миттям або одяганням`,
      diff_comm: `Маєте труднощі у спілкуванні, наприклад, у розумінні чи розумінні інших людей`,
      diff_none: `Ніщо з перерахованого вище не стосується`,
    },
    dis_level: {
      zero: `Ні, труднощі відсутні`,
      one: `Так, є деякі труднощі`,
      two: `Так, багато труднощів`,
      fri: `Взагалі не можу(-е) робити`,
    },
    gender: {
      female: `Жінка`,
      male: `Чоловік`,
      other_pns: `Інша / Не бажаю відповідати`,
    },
    long_displaced: {
      less_3m: `0-3 місяці`,
      '3_6m': `3-6 місяців`,
      '6_12m': `6-12 місяців`,
      '12_24m': `12-24 місяці`,
      more_24m: `24+ місяців`,
    },
    current_employment_situation: {
      unemployed: `Безробітний/а`,
      formally_employed: `Офіційно працевлаштований/а`,
      informaly_employed: `Неофіційно працевлаштований/а`,
    },
    long_unemployed: {
      less_3m: `0-3 місяці`,
      '3_6m': `3-6 місяців`,
      '6_12m': `6-12 місяців`,
      more_12m: `12+ місяців`,
    },
    interested_formally_employed: {
      work_part_time: `Я працюю неповний робочий день/частково і хочу працювати на повну ставку`,
      salary_minimum_wage: `Я отримую зарплату нижче мінімальної`,
      limited_prospects_progression: `Маю обмежені перспективи кар'єрного зростання`,
      job_uncertain_prospects: `Маю роботу з невизначеними перспективами`,
      other: `Інше`,
    },
    barrier_experiencing_prevents: {
      business_scaledown_area: `Закриття/скорочення бізнесу в моєму регіоні`,
      mismatch_between_skills: `Невідповідність між моїми навичками та навичками, які вимагають роботодавці`,
      transportation_employment: `Транспортування до місця роботи`,
      pay_rate: `Рівень заробітної плати`,
      working_conditions_hours: `Умови праці/графік роботи`,
      access_training: `Доступ до навчання або характер можливостей для навчання`,
      difficulties_employment_centers: `Труднощі з центрами зайнятості`,
      household_responsibilities_childcare: `Домашні обов'язки, такі як догляд за дітьми`,
      risk_losing_income: `Неможливість ризикувати втратою доходу під час навчання`,
      discrimination: `Дискримінація`,
      other: `Інше`,
    },
    access_computer_internet: {
      yes: `Так`,
      no: `Ні`,
      not_relevant: `Не актуально`,
    },
    who_paid_training: {
      state_sevice: `Державна служба`,
      international_ngo: `Неурядова організація (міжнародна)`,
      national_ngo: `Неурядова організація (національна)`,
      private_sector_actor: `Суб'єкт приватного сектору`,
      private_person: `Приватна особа`,
    },
    hear_about_program: {
      drc_staff: `Співробітники ДРБ`,
      local_authorities: `Місцеві органи влади`,
      employment_centre: `Центр зайнятості`,
      other: `Інакше`,
    },
    format_training: {
      online: `Онлайн`,
      offline: `Офлайн`,
      mixed: `Змішаний`,
    },
    oblast: {
      dnipropetrovska: `Дніпропетровська`,
      donetska: `Донецька`,
      zaporizka: `Запорізька`,
      luhanska: `Луганська`,
      mykolaivska: `Миколаївська`,
      odeska: `Одеська`,
      kharkivska: `Харківська`,
      khersonska: `Херсонська`,
      lvivska: `Львівська`,
      chernihivska: `Чернігівська`,
      sumska: `Сумська`,
      other: `Інша`,
    },
    raion: {
      zvenyhorodskyi: `Звенигородський`,
      zolotoniskyi: `Золотоніський`,
      umanskyi: `Уманський`,
      cherkaskyi: `Черкаський`,
      koriukivskyi: `Корюківський`,
      nizhynskyi: `Ніжинський`,
      'novhorod-siverskyi': `Новгород-Сіверський`,
      prylutskyi: `Прилуцький`,
      chernihivskyi: `Чернігівський`,
      vyzhnytskyi: `Вижницький`,
      dnistrovskyi: `Дністровський`,
      cnernivetskyi: `Чернівецький`,
      dniprovskyi: `Дніпровський`,
      kamianskyi: `Кам’янський`,
      kryvorizkyi: `Криворізький`,
      nikopolskyi: `Нікопольський`,
      novomoskovskyi: `Новомосковський`,
      pavlohradskyi: `Павлоградський`,
      synelnykivskyi: `Синельниківський`,
      bakhmutskyi: `Бахмутський`,
      volnovaskyi: `Волноваський`,
      horlivskyi: `Горлівський`,
      donetskyi: `Донецький`,
      kalmiuskyi: `Кальміуський`,
      kramatorskyi: `Краматорський`,
      mariupolskyi: `Маріупольський`,
      pokrovskyi: `Покровський`,
      verkhovynskyi: `Верховинський`,
      'ivano-frankivskyi': `Івано-Франківський`,
      kaluskyi: `Калуський`,
      kolomyiskyi: `Коломийський`,
      kosivskyi: `Косівський`,
      nadvirnianskyi: `Надвірнянський`,
      bohodukhivskyi: `Богодухівський`,
      iziumskyi: `Ізюмський`,
      krasnohradskyi: `Красноградський`,
      kupianskyi: `Куп'янський`,
      lozivskyi: `Лозівський`,
      kharkivskyi: `Харківський`,
      chuhuivskyi: `Чугуївський`,
      beryslavskyi: `Бериславський`,
      henicheskyi: `Генічеський`,
      kakhovskyi: `Каховський`,
      skadovskyi: `Скадовський`,
      khersonskyi: `Херсонський`,
      'kamianets-podilskyi': `Кам'янець-Подільський`,
      khmelnytskyi: `Хмельницький`,
      shepetivskyi: `Шепетівський`,
      holovanivskyi: `Голованівський`,
      kropyvnytskyi: `Кропивницький`,
      novoukrainskyi: `Новоукраїнський`,
      oleksandriiskyi: `Олександрійський`,
      'chornobylska zona vidchuzhennia': `Чорнобильська зона відчуження`,
      bilotserkivskyi: `Білоцерківський`,
      boryspilskyi: `Бориспільський`,
      brovarskyi: `Броварський`,
      buchanskyi: `Бучанський`,
      vyshhorodskyi: `Вишгородський`,
      obukhivskyi: `Обухівський`,
      fastivskyi: `Фастівський`,
      kyivska: `Київська`,
      alchevskyi: `Алчевський`,
      dovzhanskyi: `Довжанський`,
      luhanskyi: `Луганський`,
      rovenkivskyi: `Ровеньківський`,
      svativskyi: `Сватівський`,
      sievierodonetskyi: `Сєвєродонецький`,
      starobilskyi: `Старобільський`,
      shchastynskyi: `Щастинський`,
      drohobytskyi: `Дрогобицький`,
      stryiskyi: `Стрийський`,
      bashtanskyi: `Баштанський`,
      voznesenskyi: `Вознесенський`,
      mykolaivskyi: `Миколаївський`,
      pervomaiskyi: `Первомайський`,
      berezivskyi: `Березівський`,
      'bilhorod-dnistrovskyi': `Білгород-Дністровський`,
      bolhradskyi: `Болградський`,
      izmailskyi: `Ізмаїльський`,
      odeskyi: `Одеський`,
      podilskyi: `Подільський`,
      rozdilnianskyi: `Роздільнянський`,
      kremenchutskyi: `Кременчуцький`,
      lubenskyi: `Лубенський`,
      myrhorodskyi: `Миргородський`,
      poltavskyi: `Полтавський`,
      varaskyi: `Вараський`,
      dubenskyi: `Дубенський`,
      rivnenskyi: `Рівненський`,
      sarnenskyi: `Сарненський`,
      sevastopilska: `Севастопільська`,
      konotopskyi: `Конотопський`,
      okhtyrskyi: `Охтирський`,
      romenskyi: `Роменський`,
      sumskyi: `Сумський`,
      shostkynskyi: `Шосткинський`,
      kremenetskyi: `Кременецький`,
      ternopilskyi: `Тернопільський`,
      chortkivskyi: `Чортківський`,
      vinnytskyi: `Вінницький`,
      haisynskyi: `Гайсинський`,
      zhmerynskyi: `Жмеринський`,
      'mohyliv-podilskyi': `Могилів-Подільський`,
      tulchynskyi: `Тульчинський`,
      khmilnytskyi: `Хмільницький`,
      'volodymyr-volynskyi': `Володимир-Волинський`,
      'kamin-kashyrskyi': `Камінь-Каширський`,
      kovelskyi: `Ковельський`,
      lutskyi: `Луцький`,
      berehivskyi: `Берегівський`,
      mukachivskyi: `Мукачівський`,
      rakhivskyi: `Рахівський`,
      tiachivskyi: `Тячівський`,
      uzhhorodskyi: `Ужгородський`,
      khustskyi: `Хустський`,
      berdianskyi: `Бердянський`,
      vasylivskyi: `Василівський`,
      zaporizkyi: `Запорізький`,
      melitopolskyi: `Мелітопольський`,
      polohivskyi: `Пологівський`,
      berdychivskyi: `Бердичівський`,
      zhytomyrskyi: `Житомирський`,
      korostenskyi: `Коростенський`,
      'novohrad-volynskyi': `Новоград-Волинський`,
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
      course_payment_date: _.course_payment_date ? new Date(_.course_payment_date) : undefined,
      allowance_payment_date: _.allowance_payment_date ? new Date(_.allowance_payment_date) : undefined,
      date_course_completed: _.date_course_completed ? new Date(_.date_course_completed) : undefined,
      date: _.date ? new Date(_.date) : undefined,
      ph_number: _.ph_number ? +_.ph_number : undefined,
      number_people: _.number_people ? +_.number_people : undefined,
      family_member: _['family_member']?.map(extractQuestionName).map((_: any) => {
        _['date_birth'] = _.date_birth ? new Date(_.date_birth) : undefined
        _['age'] = _.age ? +_.age : undefined
        _['dis_select'] = _.dis_select?.split(' ')
        return _
      }),
      many_elderly_people: _.many_elderly_people ? +_.many_elderly_people : undefined,
      many_excombatants: _.many_excombatants ? +_.many_excombatants : undefined,
      many_chronic_diseases: _.many_chronic_diseases ? +_.many_chronic_diseases : undefined,
      many_pregnant_that_breastfeeding: _.many_pregnant_that_breastfeeding
        ? +_.many_pregnant_that_breastfeeding
        : undefined,
      household_income: _.household_income ? +_.household_income : undefined,
      most_barriers_employment: _.most_barriers_employment?.split(' '),
      cost_training: _.cost_training ? +_.cost_training : undefined,
      date_interview: _.date_interview ? new Date(_.date_interview) : undefined,
      barrier_experiencing_prevents: _.barrier_experiencing_prevents?.split(' '),
      many_elderly_people_val: _.many_elderly_people_val ? +_.many_elderly_people_val : undefined,
      many_excombatants_val: _.many_excombatants_val ? +_.many_excombatants_val : undefined,
      many_chronic_diseases_val: _.many_chronic_diseases_val ? +_.many_chronic_diseases_val : undefined,
      many_pregnant_that_breastfeeding_val: _.many_pregnant_that_breastfeeding_val
        ? +_.many_pregnant_that_breastfeeding_val
        : undefined,
      household_income_val: _.household_income_val ? +_.household_income_val : undefined,
      family_impacted_conflict: _.family_impacted_conflict?.split(' '),
    }) as T
}
