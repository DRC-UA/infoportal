export namespace Ecrec_mbg {
  export type Option<T extends keyof typeof options> = keyof (typeof options)[T]
  // Form id: amCfEFHyK5BEwxsAA2Babr
  export interface T {
    start: string
    end: string
    // __IP__TRIGGER_EMAIL [calculate] Confirmation of Your Submission
    __IP__TRIGGER_EMAIL: string
    // shortlisted [select_one] Відібрано до шорт-листу
    shortlisted: undefined | Option<'shortlisted'>
    // cal_office [select_one] Відповідальний офіс
    cal_office: undefined | Option<'cal_office'>
    // vetting_status [select_one] Статус перевірки
    vetting_status: undefined | Option<'vetting_status'>
    // validation_visit [select_one] Валідаційний візит
    validation_visit: undefined | Option<'validation_visit'>
    // committee_decision [select_one] Рішення комітету
    committee_decision: undefined | Option<'committee_decision'>
    // grant_agreement_upload [file] Завантаження договору про надання гранту
    grant_agreement_upload: string
    // status_first_tranche [select_one] Статус виконання першого траншу
    status_first_tranche: undefined | Option<'status_first_tranche'>
    // date_first_tranche [date] Дата першого траншу
    date_first_tranche: Date | undefined
    // status_second_tranche [select_one] Статус виконання другого траншу
    status_second_tranche: undefined | Option<'status_second_tranche'>
    // date_second_tranche [date] Дата другого траншу
    date_second_tranche: Date | undefined
    // post_distribution [select_one] Подальший супровід після дистрибуції
    post_distribution: undefined | Option<'post_distribution'>
    // comments_case_management [text] Коментарі
    comments_case_management: string | undefined
    // not_welcome [note] Дякуємо за ваш інтерес до програми бізнес-грантів Данської ради у справах біженців (DRC). Ця програма спрямована на підтримку підприємств, які займаються переробкою сільськогосподарської продукції, а також підприємств, що здійснюють діяльність, пов'язану з агропромисловим сектором, у цільових громадах Миколаївської області, які мають потенціал для розширення та збільшення доходів. **Критерії відповідності** **Типи підприємств та господарств, які можуть взяти участь у програмі:** - Такі, що займаються переробкою сільськогосподарської продукції. - Фермери та фермерські господарства, які планують переробку врожаю. - Постачальники послуг, які підтримують сільське господарство (логістичні компанії, складські послуги, механічний ремонт тракторів, постачання сільськогосподарських матеріалів та засобів виробництва). - Постачальники товарів та послуг, необхідних для функціонування місцевого ринку (будівельні матеріали, меблі, необхідні для ремонту громадських закладів, виробничі ресурси). - Постачальники товарів і послуг для забезпечення потреб населення (тверде паливо, вода, тощо). **Вимоги:** - Діяльність приносить підтверджену користь для місцевих громад: позитивно впливає на ринок праці; створює додану вартість на регіональному рівні за рахунок залучення місцевих фермерів/дрібних виробників. - Бізнес зареєстровано, і він має 10 і більше оплачуваних працівників та річний (за останні 12 місяців від дати подання заявки) оборот від 9 мільйонів гривень. - Досвід роботи (4+ роки) у запропонованій до реалізації діяльності, що можна відстежити. - Сплата податків протягом останніх 12 місяців. - Співфінансування мінімум 10% від загальної суми гранту (діапазон грантів 20,000$-50,000$). - Відсутні затримки зі сплатою податків, погашення банківських кредитів, юридичні проблеми. - Є бізнес-план, який чітко передбачає розширення або розвиток (збільшення кількості працівників або обсягу виробництва) та демонструє позитивний вплив на добробут місцевої громади. Плани розширення бізнесу мають базуватися на оцінці місцевого ринку. - Бізнес (не домогосподарство) підтверджує наявність або відсутність попередньої підтримки для забезпечення діяльності для отримання доходу, отриманої з 2022 року. Будь ласка, докладно висловіть вашу мотивацію для подання заявки на отримання бізнес-гранту **до 28.02.2025** та заповніть всю інформацію правдиво і повністю. Ваша детальна заявка дозволить нам ухвалити обґрунтоване рішення. Зверніть увагу: подання заявки не означає, що ви автоматично отримаєте бізнес-грант, а лише те, що ваша заявка буде оцінена на основі критеріїв відбору для цієї програми. Ми маємо обмежену кількість грантів, і посилання на реєстрацію може бути закрите, якщо буде досягнуто максимальної кількості місць. Команда DRC зв'яжеться з підприємствами, що потрапили до короткого списку, для проходження наступних етапів процесу відбору.  **DRC цінує кожен відгук щодо наших програм.**  **Будь ласка, надсилайте ваші скарги, звернення та пропозиції на електронну пошту: UKR-feedback@drc.ngo або телефонуйте: 0 800 33 95 18 (пн-пт 9:00-17:00).**  **Грантова програма реалізується завдяки фінансовій підтримці від Міністерства закордонних справ Данії.**
    not_welcome: string
    // consent_personal_data/date [date] Дата реєстрації
    date: Date | undefined
    // consent_personal_data/consent [select_one] Чи надаєте Ви згоду на обробку ДРБ Ваших персональних даних?
    consent: undefined | Option<'quality_resources'>
    // consent_personal_data/business_owner [select_one] Ви є власником бізнесу, на який подаєте заявку?
    business_owner: undefined | Option<'quality_resources'>
    // consent_personal_data/business_owner_no [select_one] Якщо «Ні», то чи належите Ви до однієї з наступних категорій?
    business_owner_no: undefined | Option<'business_owner_no'>
    // consent_personal_data/res_describe_role [text] Будь ласка, опишіть вашу роль
    res_describe_role: string | undefined
    // business_owner_details/surname [text] Ваше прізвище?
    surname: string | undefined
    // business_owner_details/first_name [text] Ваше ім'я?
    first_name: string | undefined
    // business_owner_details/pat_name [text] По батькові?
    pat_name: string | undefined
    // business_owner_details/oblast [select_one] Область
    oblast: undefined | Option<'oblast'>
    // business_owner_details/raion [select_one] Район
    raion: undefined | string
    // business_owner_details/hromada [select_one] Громада
    hromada: undefined | string
    // business_owner_details/settlement [select_one_from_file] Населений пункт
    settlement: string
    // business_owner_details/res_stat [select_one] Статус проживання
    res_stat: undefined | Option<'res_stat'>
    // business_owner_details/res_stat_other [text] Якщо «Інше», будь ласка, вкажіть Ваш статус
    res_stat_other: string | undefined
    // business_owner_details/idp_certificate [select_one] Чи маєте Ви дійсну довідку ВПО?
    idp_certificate: undefined | Option<'quality_resources'>
    // business_owner_details/gender [select_one] Ваша стать?
    gender: undefined | Option<'gender'>
    // business_owner_details/date_birth [date] Дата народження
    date_birth: Date | undefined
    // business_owner_details/age [integer] Вік
    age: number | undefined
    // business_owner_details/ph_number [integer] Будь ласка, вкажіть Ваш номер телефону
    ph_number: number | undefined
    // business_owner_details/email [text] Будь ласка, вкажіть свою електронну адресу
    email: string | undefined
    // business_owner_details/tax_id_num [text] Індивідуальний податковий номер (ІПН)
    tax_id_num: string | undefined
    tax_length: string
    // business_details/business_name [text] Назва бізнесу
    business_name: string | undefined
    // business_details/business_type [select_one] Тип реєстрації підприємства
    business_type: undefined | Option<'business_type'>
    // business_details/business_type_other [text] Якщо «Інше», будь ласка, вкажіть
    business_type_other: string | undefined
    // business_details/enterprise_tax_id [text] Ідентифікаційний номер юридичної особи (ЄДРПОУ)
    enterprise_tax_id: string | undefined
    // business_details/legal_address_business [text] Юридична адреса підприємства
    legal_address_business: string | undefined
    // business_details/date_business_registration [date] Дата реєстрації підприємства
    date_business_registration: Date | undefined
    // business_details/business_currently_operational [select_one] Вкажіть чи ваше підприємство зараз працює?
    business_currently_operational: undefined | Option<'quality_resources'>
    // business_details/key_business_activities [select_multiple] Будь ласка, вкажіть основні види діяльності Вашого підприємства
    key_business_activities: undefined | Option<'indicate_main_activities'>[]
    // business_details/key_business_activities_other [text] Якщо «Інше», будь ласка, вкажіть
    key_business_activities_other: string | undefined
    // business_details/produce_buy_processing [integer] На яку суму ви закупили місцевої продукції або матеріалів  для своєї діяльності з переробки у 2024 році?
    produce_buy_processing: number | undefined
    // business_details/have_data_bought_goods [select_one] Чи є данні скільки фермерських господарств/дрібних виробників купували вашу продукцію, товари та послуги минулого року
    have_data_bought_goods: undefined | Option<'quality_resources'>
    // business_details/how_bought_goods [integer] Зазначте кількість фермерських господарств/дрібних виробників які купували вашу продукцію, товари та послуги минулого року
    how_bought_goods: number | undefined
    // business_details/number_purchased_products [integer] Зазначте кількість фермерських господарств/дрібних виробників, у яких ви закуповували продукцію, товари та послуги минулого року
    number_purchased_products: number | undefined
    // business_details/grant_farms_producers [text] За умови, якщо б ви отримали грант на реалізацію своєї бізнес-ідеї, скільком фермерським господарства/ дрібним виробникам ви змогли б надати свої послуги у 2026 році?
    grant_farms_producers: string | undefined
    // business_details/received_local_produce [integer] За умови, якщо б ви отримали грант на реалізацію своєї бізнес-ідеї, на яку суму місцевої продукції/матеріалів ви плануєте закупити у 2025/2026 році?
    received_local_produce: number | undefined
    // business_details/describe_idea_meets [text] Опишіть, яким чином ваша бізнес-ідея задовольняє потреби місцевих фермерів / дрібних виробників?
    describe_idea_meets: string | undefined
    // business_details/years_experience_business [integer] Який Ваш загальний стаж роботи в обраному Вами виді діяльності?
    years_experience_business: number | undefined
    // business_details/number_employees_business [integer] Будь ласка, вкажіть кількість працівників на Вашому підприємстві
    number_employees_business: number | undefined
    // business_details/turnover_exceeded_9m [select_one] Чи перевищував Ваш загальний обіг коштів за останні 12 місяців 9 000 000 грн?
    turnover_exceeded_9m: undefined | Option<'quality_resources'>
    // business_details/turnover_exceeded_9m_yes [file] Будь ласка, додайте податкову декларацію за останній звітний період ( з квитанцією про отримання від податкової)*
    turnover_exceeded_9m_yes: string
    // business_details/have_debt_repayment [select_one] Чи є у вас боргові зобов'язання або зобов'язання з погашення кредиту?
    have_debt_repayment: undefined | Option<'quality_resources'>
    // business_details/repayment_debt_loan [select_one] Будь ласка, вкажіть, чи є у Вас затримка з виплатами за цим боргом або кредитом
    repayment_debt_loan: undefined | Option<'quality_resources'>
    // business_details/access_business_loans [select_one] Чи маєте Ви доступ до бізнес-позик або кредитів?
    access_business_loans: undefined | Option<'quality_resources'>
    // business_details/not_access_business_loans [select_one] Якщо «Ні», то чому?
    not_access_business_loans: undefined | Option<'not_access_business_loans'>
    // business_details/not_access_business_loans_other [text] Якщо «Інше», будь ласка, вкажіть
    not_access_business_loans_other: string | undefined
    // business_details/your_main_customers [text] Хто є Вашими основними клієнтами?
    your_main_customers: string | undefined
    // business_details/asset_business_own [text] Якими активами володіє Ваш бізнес?
    asset_business_own: string | undefined
    // business_details/main_barriers_business [select_multiple] Які існують основні перешкоди для відновлення або продовження Вашого підприємства?
    main_barriers_business: undefined | Option<'main_barriers_business'>[]
    // business_details/main_barriers_business_other [text] Якщо «Інше», будь ласка, вкажіть
    main_barriers_business_other: string | undefined
    // business_plan/escalation_conflict_affected_business [select_multiple] Як ескалація конфлікту вплинула на Ваше підприємство?
    escalation_conflict_affected_business: undefined | Option<'escalation_conflict_affected_business'>[]
    // business_plan/escalation_conflict_affected_business_other [text] Якщо «Інше», будь ласка, вкажіть
    escalation_conflict_affected_business_other: string | undefined
    // business_plan/describe_plan_spend_grant [text] Будь ласка, опишіть, як ви плануєте використати грантові кошти, якщо будете відібрані на його отримання відповідно до критеріїв? (Короткий опис бізнес-плану)
    describe_plan_spend_grant: string | undefined
    // business_plan/amount_implement_plan [integer] Будь ласка, вкажіть суму в гривнях, необхідну для реалізації цього бізнес-плану?
    amount_implement_plan: number | undefined
    // business_plan/amount_co_funding [integer] Яку суму ви готові інвестувати в якості співфінансування? (не менше 10% від суми бізнес-гранту)
    amount_co_funding: number | undefined
    // business_plan/project_spend_grant [select_one] Зважаючи на характер проєкту, вам необхідно використати кошти за грантом не пізніше кінця вересня 2025 року. Чи ви можете підтвердити, що зможете це зробити?
    project_spend_grant: undefined | Option<'quality_resources'>
    // business_plan/received_previous_support [select_one] Чи отримували ви раніше  фінансову підтримку від уряду, неурядових організацій або інших суб'єктів?
    received_previous_support: undefined | Option<'quality_resources'>
    // business_plan/description_previous_support [text] Якщо так, додайте короткий опис цієї допомоги
    description_previous_support: string | undefined
    // business_plan/scan_copy_extract [file] Додайте, будь ласка, скан або копію Витягу з Єдиного державного реєстру юридичних осіб, фізичних осіб-підприємців та громадських формувань
    scan_copy_extract: string
    // business_plan/have_any_documents [select_one] Чи є у вас додаткові документи/фото/веб-сайти, якими ви хотіли б поділитися з нами?
    have_any_documents: undefined | Option<'quality_resources'>
    // business_plan/additional_file1 [file] Додаткові документи/фото
    additional_file1: string
    // business_plan/additional_file2 [file] Додаткові документи/фото
    additional_file2: string
    // business_plan/additional_file3 [file] Додаткові документи/фото
    additional_file3: string
    // business_plan/additional_file4 [file] Додаткові документи/фото
    additional_file4: string
    // business_plan/additional_file5 [file] Додаткові документи/фото
    additional_file5: string
    // business_plan/additional_text_information [text] Додаткова текстова інформація (веб-сайти або інша інформація якою хочете поділитися)
    additional_text_information: string | undefined
    // business_plan/hear_program [select_one] Як ви дізналися про цю програму?
    hear_program: undefined | Option<'hear_program'>
    // business_plan/hear_program_other [text] Якщо «Інше», будь ласка, вкажіть
    hear_program_other: string | undefined
    // monitoring_visit/general_information/date_visit [date] Дата візиту
    date_visit: Date | undefined
    // monitoring_visit/general_information/staff [text] Ім’я представника DRC
    staff: string | undefined
    // monitoring_visit/general_information/name_ownership_business [text] Назва підприємства та форма власності
    name_ownership_business: string | undefined
    // monitoring_visit/general_information/company_tin [text] ЄДРПОУ або ІНН підприємства
    company_tin: string | undefined
    // monitoring_visit/general_information/business_owner [text] Ім’я власника бізнесу
    business_owner_001: string | undefined
    // monitoring_visit/general_information/number_business_owner [integer] Номер телефона власника
    number_business_owner: number | undefined
    // monitoring_visit/general_information/tin_business_owner [text] ІНН власника бізнесу
    tin_business_owner: string | undefined
    tin_business_owner_length: string
    // monitoring_visit/general_information/location_business [text] Місцерозташування бізнесу
    location_business: string | undefined
    // monitoring_visit/business_description/description_business [text] Опис діяльності бізнесу та його напрямки в роботі
    description_business: string | undefined
    // monitoring_visit/business_description/total_number_employees [integer] Загальна кількість працівників на підприємстві станом на сьогоднішній день
    total_number_employees: number | undefined
    // monitoring_visit/business_description/indicate_main_activities [select_multiple] Будь ласка, вкажіть основні види діяльності Вашого підприємства:
    indicate_main_activities: undefined | Option<'indicate_main_activities'>[]
    // monitoring_visit/business_description/years_experience [select_one] Багаторічний досвід
    years_experience: undefined | Option<'years_experience'>
    // monitoring_visit/business_description/assets_business [text] Якими активами наразі володіє бізнес?
    assets_business: string | undefined
    // monitoring_visit/business_description/risk_employee [select_multiple] Ризик захисту співробітників?
    risk_employee: undefined | Option<'risk_employee'>[]
    // monitoring_visit/business_description/risk_employee_other [text] Якщо «Інше», будь ласка, вкажіть
    risk_employee_other: string | undefined
    // monitoring_visit/business_description/not_work_sectors [select_multiple] Якщо можливо, підтвердіть, що вони не працюють у таких секторах, які не можуть бути розглянуті для виділення грантів.
    not_work_sectors: undefined | Option<'not_work_sectors'>[]
    // monitoring_visit/business_description/climate_environment_protection [text] Чи вживаються заходи щодо захисту клімату/навколишнього середовища?
    climate_environment_protection: string | undefined
    // monitoring_visit/business_description/feedback_hromada [text] Відгуки громади (влади та членів громади) про бізнес.
    feedback_hromada: string | undefined
    // monitoring_visit/business_description/products_positive_communities [text] Чи робить це підприємство та його продукція позитивний внесок у розвиток громади та місцевої економіки?
    products_positive_communities: string | undefined
    // monitoring_visit/suppliers/confirmation_cooperation [note] **Підтвердження співпраці з постачальниками (фермерськими господарствами та іншими підприємствами) та процесу постачання виробничих ресурсів (заповнюється, якщо це можливо відстежити)**
    confirmation_cooperation: string
    // monitoring_visit/suppliers/have_contracts_farmers [select_one] Чи є у вас контракти або угоди з фермерами або іншими постачальниками для забезпечення необхідної сировини для переробки?
    have_contracts_farmers: undefined | Option<'quality_resources'>
    // monitoring_visit/suppliers/total_number_farmers [integer] Загальна кількість ФГ або інших підприємств
    total_number_farmers: number | undefined
    // monitoring_visit/suppliers/have_contracts_farmers_com [text] Коментарі
    have_contracts_farmers_com: string | undefined
    // monitoring_visit/suppliers/suppliers_provide [select_one] Чи забезпечують Вас постачальники необхідними ресурси в достатній кількості?
    suppliers_provide: undefined | Option<'quality_resources'>
    // monitoring_visit/suppliers/suppliers_provide_com [text] Коментарі
    suppliers_provide_com: string | undefined
    // monitoring_visit/suppliers/show_processing_resources [select_one] Чи можете ви показати нам процес отримання та приймання ресурсів? І
    show_processing_resources: undefined | Option<'quality_resources'>
    // monitoring_visit/suppliers/show_processing_resources_com [text] Коментарі
    show_processing_resources_com: string | undefined
    // monitoring_visit/suppliers/quality_resources [select_one] Чи контролюється якість ресурсів, що постачаються на підприємство?
    quality_resources: undefined | Option<'quality_resources'>
    // monitoring_visit/suppliers/quality_resources_com [text] Коментарі
    quality_resources_com: string | undefined
    // monitoring_visit/decent_work_assessment/not_decent_work_assessment [note] Цей розділ ґрунтується на спостереженнях співробітників DRC та, наскільки це можливо, на інформації, отриманій від власників бізнесу.
    not_decent_work_assessment: string
    // monitoring_visit/decent_work_assessment/physically_safe [text] Фізична безпека
    physically_safe: string | undefined
    // monitoring_visit/decent_work_assessment/safe_violence [text] Безпечні від будь-яких форм насильства
    safe_violence: string | undefined
    // monitoring_visit/decent_work_assessment/employment_children [text] Працевлаштування дітей ТІЛЬКИ старше 15 років
    employment_children: string | undefined
    // monitoring_visit/decent_work_assessment/employment_conditions [select_multiple] Умови працевлаштування
    employment_conditions: undefined | Option<'employment_conditions'>[]
    // monitoring_visit/decent_work_assessment/hygiene_infrastructure [text] Гігієнічна інфраструктура (туалети, станції для миття рук, з розбивкою за статтю) - умови на робочому місці
    hygiene_infrastructure: string | undefined
    // monitoring_visit/decent_work_assessment/personal_protective_equipment [text] Засоби індивідуального захисту (ЗІЗ) для зменшення ризиків для безпеки та здоров'я
    personal_protective_equipment: string | undefined
    // monitoring_visit/decent_work_assessment/regularly_paid [text] Регулярна виплата (щонайменше) заробітної плати (щонайменше щомісяця)
    regularly_paid: string | undefined
    // monitoring_visit/comments_photos/comments [text] Інші коментарі та зауваження
    comments: string | undefined
    // monitoring_visit/comments_photos/photos_premises1 [image] Фотографії приміщень
    photos_premises1: string
    // monitoring_visit/comments_photos/photos_premises2 [image] Фотографії приміщень
    photos_premises2: string
    // monitoring_visit/comments_photos/photos_premises3 [image] Фотографії приміщень
    photos_premises3: string
    // monitoring_visit/comments_photos/photos_premises4 [image] Фотографії приміщень
    photos_premises4: string
    // monitoring_visit/comments_photos/photos_premises5 [image] Фотографії приміщень
    photos_premises5: string
    // monitoring_visit/comments_photos/photos_premises6 [image] Фотографії приміщень
    photos_premises6: string
    // monitoring_visit/comments_photos/photos_premises7 [image] Фотографії приміщень
    photos_premises7: string
    // monitoring_visit/comments_photos/photos_premises8 [image] Фотографії приміщень
    photos_premises8: string
    // monitoring_visit/comments_photos/photos_premises9 [image] Фотографії приміщень
    photos_premises9: string
    // monitoring_visit/comments_photos/photos_premises10 [image] Фотографії приміщень
    photos_premises10: string
    // not_thank [note] **Дякуємо, що знайшли час, щоб надати цю інформацію. Якщо ви натиснете кнопку «Надіслати», ми успішно отримаємо вашу заявку. Ми повідомимо вас про результат і будь-які подальші кроки.**
    not_thank: string
  }
  export const options = {
    shortlisted: {
      yes: `✅ Так`,
      no: `❌ Ні`,
      deduplication: `⚠️ Дедуплікація`,
      pending: `🕓 Очікує на розгляд`,
    },
    vetting_status: {
      completed: `✅ Завершено`,
      ongoing: `🕓 Триває`,
      rejected: `❌ Відхилено`,
    },
    validation_visit: {
      completed: `✅ Завершено`,
      rejected: `❌ Відхилено`,
      follow_up_required: `🕓 Потрібні подальші дії`,
    },
    committee_decision: {
      approved: `✅ Затверджено`,
      rejected: `❌ Відхилено`,
      waiting_list: `🕓 Очікується лист`,
    },
    status_first_tranche: {
      done: `✅ Виконано`,
      pending: `🕓 На розгляді`,
      only_first_tranche: `❎ Тільки перший транш`,
    },
    status_second_tranche: {
      done: `✅ Виконано`,
      pending: `🕓 На розгляді`,
      na: `❎ N/A`,
    },
    undefined: {
      done: `✅ Виконано`,
      ongoing: `🕓 Триває`,
      rejected: `❌ Відхилено`,
      diff_see: `Маєте труднощі із зором, навіть якщо носите окуляри`,
      diff_hear: `Маєте проблеми зі слухом, навіть якщо користуєтеся слуховим апаратом`,
      diff_walk: `Маєте труднощі з ходьбою або підйомом по сходах`,
      diff_rem: `Маєте труднощі з запам'ятовуванням або концентрацією уваги`,
      diff_care: `Маєте труднощі з самообслуговуванням, наприклад, з миттям або одяганням`,
      diff_comm: `Маєте труднощі у спілкуванні, наприклад, у розумінні чи розумінні інших людей`,
      diff_none: `Ніщо з перерахованого вище не стосується`,
      zero: `Ні, труднощі відсутні`,
      one: `Так, є деякі труднощі`,
      two: `Так, багато труднощів`,
      fri: `Взагалі не можу(-е) робити`,
      myself: `Я`,
      someone_else: `Хтось інший`,
      relocation_business: `Географічне переміщення бізнесу`,
      mine_contamination: `Мінне забруднення`,
      damaged_assets: `Пошкодження або знищення активів внаслідок обстрілів`,
      other: `Інше`,
      restoration: `Відновлення бізнесу`,
      continuation: `Продовження бізнесу`,
      expansion: `Розширення бізнесу`,
      government: `Уряд`,
      ngo: `Неурядова організація`,
      marketing_sales: `Маркетинг і продажі (включаючи інтернет-маркетинг)`,
      customer_relationships_management: `Управління взаємовідносинами з клієнтами (CRM-системи)`,
      legal_regulatory_compliance: `Дотримання правових та регуляторних норм`,
      human_resources: `Управління персоналом`,
      financial_including_pricing: `Управління фінансами (включаючи ціноутворення)`,
      issues_development_professional: `Актуальні питання щодо розвитку (специфічні професійні питання)`,
      attracting_additional_financing: `Залучення подальшого фінансування (залучення додаткового фінансування)`,
      export: `Експорт`,
      agro_processing: `Переробка сільськогосподарської продукції`,
      agriculture: `Сільське господарство (рослинництво та/або тваринництво)`,
      transport_services: `Транспортні послуги`,
      construction: `Будівництво`,
      food_services: `Харчові послуги`,
      electrical: `Електрика`,
      mechanics: `Механіка`,
      plumber: `Сантехнік`,
      petty_trade: `Дрібна торгівля`,
      retail_wholesale: `Роздрібна та оптова торгівля`,
      sewing_shoe_repair: `Пошиття / ремонт взуття`,
      small_manufacturing: `Мале виробництво`,
      hairdressing: `Перукарня/барбер`,
      it: `ІТ`,
      in_person: `Особисто`,
      remotely: `Дистанційно`,
      relocated: `Підприємство змінило місцезнаходження`,
      online: `Підприємство працює онлайн`,
    },
    post_distribution: {
      completed: `✅ Завершено`,
      ongoing: `🕓 Триває`,
    },
    quality_resources: {
      yes: `Так`,
      no: `Ні`,
    },
    business_owner_no: {
      family_member: `Член сім'ї власника бізнесу`,
      third_party_agency: `Стороннє агентство`,
      accountant_business: `Бухгалтер/ка бізнесу`,
      director_business: `Директор/ка бізнесу`,
    },
    res_stat: {
      idp: `Внутрішньо-переміщена особа (ВПО)`,
      long_res: `Довгостроковий мешканець`,
      ret: `Особа, яка повернулася`,
      other: `Інший`,
    },
    cal_office: {
      kharkiv: `Харків`,
      dnipro: `Дніпро`,
      mykovaiv: `Миколаїв`,
      chernihiv: `Chernihiv`,
      sumy: `Sumy`,
    },
    business_type: {
      fop4: `ФОП 4`,
      entrepreneurs: `Підприємці на загальній системі оподаткування`,
      llc: `ТОВ`,
      farming_enterprise: `Фермерське господарство`,
      other: `Інше`,
    },
    indicate_main_activities: {
      dairy_production: `Виробництво молочних продуктів – переробка молока на йогурти, сири, масла, кефір, ряжанку та інші молочні продукти.`,
      processing_vegetables: `Переробка овочів та фруктів – виготовлення консервів, соків, варення, заморожених овочів та фруктів, а також їх сушка.`,
      meat_processing: `М'ясопереробка – обробка м'яса на ковбаси, консерви, делікатеси, напівфабрикати, риба.`,
      cereal_processing: `Переробка зернових культур – виготовлення борошна, круп, комбікормів, а також продуктів з глютену чи крохмалю.`,
      oilseed_processing: `Олійництво – переробка насіння соняшника, ріпаку, сої на олію, виготовлення шроту для комбікормів.`,
      biofuel_production: `Виготовлення біопалива – переробка біомаси (солома, тріска, лузга) на паливні пелети, біодизель або інші види відновлюваного палива.`,
      processing_potatoes: `Технології глибокої переробки картоплі – виробництво картопляного пюре, чіпсів, сухої картоплі, картопляних напівфабрикатів.`,
      technical_processing: `Технічна переробка сільгосппродукції – виробництво біологічно активних добавок, природних ароматизаторів та консервантів з рослинної сировини.`,
      processing_honey: `Переробка меду та продуктів бджільництва – виготовлення медових продуктів, таких як мед, бджолиний віск, прополіс, а також виробництво натуральних косметичних засобів на основі цих продуктів.`,
      leasing_agricultural: `Здача в оренду або виробництво сільськогосподарської техніки – надання в оренду тракторів, комбайнів, плугів, сівалок та іншої техніки для обробки землі, посіву, збирання врожаю тощо.`,
      production_animal_feed: `Виробництво кормів для тварин – виготовлення комбікормів для сільськогосподарських тварин, таких як корми для свиней, корів, птиці, а також спеціалізованих кормів для риб, собак, котів тощо.`,
      basic_needs: `Забезпечення базових потреб  ( їжа, вода, одяг, засоби гігієни, будівельні матеріали, вивіз сміття і т.д.)`,
      other: `Інші`,
    },
    not_access_business_loans: {
      rate_high: `Занадто висока процентна ставка`,
      lack_assets: `Брак активів`,
      lack_information: `Брак інформації`,
      other: `Інші`,
    },
    main_barriers_business: {
      access_financial_aid: `Доступ до фінансової допомоги для підприємницької діяльності`,
      lack_skilled_workers: `Брак кваліфікованих працівників`,
      increased_prices_materials: `Зростання цін на матеріали`,
      infrastructure_transportation: `Інфраструктурні та транспортні бар'єри`,
      inability_compete_competitors: `Неможливість конкурувати з конкурентами`,
      monopolization_business: `Монополізація цієї сфери підприємницької діяльності`,
      legal_regulatory_environment: `Законодавче та регуляторне середовище`,
      lack_customers: `Відсутність клієнтів`,
      safety_concerns_related: `Занепокоєння щодо безпеки, пов'язані з ескалацією конфлікту`,
      lack_governmental_support: `Відсутність державної підтримки власників малого та середнього бізнесу`,
      lack_financial_resource: `Відсутність фінансового ресурсу для облаштування підприємницької діяльності`,
      damage_business_premises: `Руйнування або пошкодження приміщення підприємства та/або обладнання`,
      other: `Інше`,
    },
    escalation_conflict_affected_business: {
      disruption_logistics: `Переривання постачання і логістики: Конфлікт часто призводить до перебоїв у постачанні товарів і сировини, оскільки можуть бути заблоковані торгові маршрути або введені обмеження на міжнародний рух товарів.`,
      increased_security_costs: `Зростання витрат на безпеку: Підприємства змушені збільшувати витрати на охорону і забезпечення безпеки своїх співробітників та майна, щоб захистити їх у небезпечних умовах.`,
      decreased_demand_products: `Зниження попиту на продукцію: В умовах конфлікту спостерігається зниження споживчого попиту через економічні труднощі, що веде до скорочення обсягів продажів і може ускладнити досягнення фінансових цілей компанії.`,
      relocation_dismissal_employees: `Переміщення або звільнення працівників: Якщо підприємство працює в зонах підвищеного ризику, воно може бути змушене евакуювати працівників або скорочувати штат для зменшення витрат та мінімізації ризиків.`,
      reduced_access_finance: `Зниження доступу до фінансування: Політична і економічна нестабільність, спричинена конфліктами, призводить до того, що підприємства мають менший доступ до кредитних ресурсів і інвестицій, що ускладнює їх розвиток і планування.`,
      inflation: `Зміни у валютних курсах та інфляція: Війна або економічна криза можуть спричинити коливання валютних курсів та зростання інфляції, що негативно впливає на витрати підприємства, особливо в разі міжнародної діяльності.`,
      changes_legal_environment: `Зміни юридичних і регуляторних умов: Підприємства можуть зіткнутися з новими правовими вимогами, змінами в законодавстві та санкціями, які ускладнюють ведення бізнесу і змушують швидко адаптуватися до нових умов`,
      other: `Інше`,
    },
    gender: {
      female: `Жінка`,
      male: `Чоловік`,
      other_pns: `Інша / Не бажаю відповідати`,
    },
    hear_program: {
      drc_staff: `Персонал ДРБ`,
      local_authorities: `Місцеві органи влади`,
      employment_centre: `Центр зайнятості`,
      other: `Інші`,
    },
    years_experience: {
      up_4y: `До 4-х років`,
      from_4_10y: `Від 4 до 10 років`,
      more_10y: `Більше 10 років`,
    },
    risk_employee: {
      labor_protection: `Охорона праці`,
      providing_personnel: `Забезпечення персоналу необхідними засобами індивідуального захисту`,
      production_area: `Виробнича зона спроєктована з урахуванням мінімізації ризиків травмування`,
      other: `Інше`,
    },
    not_work_sectors: {
      weapons_ammunition: `Виробництво або торгівля зброєю та боєприпасами`,
      military: `Бізнес не пов'язаний з військовими, військовим виробництвом`,
      alcoholic_beverages: `Виробництво або торгівля алкогольними напоями`,
      tobacco_products: `Виробництво або торгівля тютюновими виробами`,
      radioactive_materials: `Виробництво або торгівля радіоактивними матеріалами`,
      unbound_asbestos_fibres: `Виробництво, торгівля або використання незв'язаних азбестових волокон.`,
      trade_pharmaceuticals: `Виробництво або торгівля фармацевтичними препаратами`,
      pesticides_herbicides: `Виробництво або торгівля пестицидами/гербіцидами`,
      illegal_harmful_activities: `Компанії підтримують будь-яку незаконну та/або шкідливу діяльність і сприяють забрудненню навколишнього середовища.`,
    },
    employment_conditions: {
      duration_working_hours: `Тривалість робочого часу на день обмежена максимум 12 годинами`,
      breaks_rest: `Перерви для відпочинку та харчування протягом дня`,
      duration_working_days: `Тривалість робочих днів поспіль обмежена 6 днями максимум`,
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
      date_first_tranche: _.date_first_tranche ? new Date(_.date_first_tranche) : undefined,
      date_second_tranche: _.date_second_tranche ? new Date(_.date_second_tranche) : undefined,
      date: _.date ? new Date(_.date) : undefined,
      date_birth: _.date_birth ? new Date(_.date_birth) : undefined,
      age: _.age ? +_.age : undefined,
      ph_number: _.ph_number ? +_.ph_number : undefined,
      date_business_registration: _.date_business_registration ? new Date(_.date_business_registration) : undefined,
      key_business_activities: _.key_business_activities?.split(' '),
      produce_buy_processing: _.produce_buy_processing ? +_.produce_buy_processing : undefined,
      how_bought_goods: _.how_bought_goods ? +_.how_bought_goods : undefined,
      number_purchased_products: _.number_purchased_products ? +_.number_purchased_products : undefined,
      received_local_produce: _.received_local_produce ? +_.received_local_produce : undefined,
      years_experience_business: _.years_experience_business ? +_.years_experience_business : undefined,
      number_employees_business: _.number_employees_business ? +_.number_employees_business : undefined,
      main_barriers_business: _.main_barriers_business?.split(' '),
      escalation_conflict_affected_business: _.escalation_conflict_affected_business?.split(' '),
      amount_implement_plan: _.amount_implement_plan ? +_.amount_implement_plan : undefined,
      amount_co_funding: _.amount_co_funding ? +_.amount_co_funding : undefined,
      date_visit: _.date_visit ? new Date(_.date_visit) : undefined,
      number_business_owner: _.number_business_owner ? +_.number_business_owner : undefined,
      total_number_employees: _.total_number_employees ? +_.total_number_employees : undefined,
      indicate_main_activities: _.indicate_main_activities?.split(' '),
      risk_employee: _.risk_employee?.split(' '),
      not_work_sectors: _.not_work_sectors?.split(' '),
      total_number_farmers: _.total_number_farmers ? +_.total_number_farmers : undefined,
      employment_conditions: _.employment_conditions?.split(' '),
    }) as T
}
