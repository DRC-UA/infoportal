export namespace Ecrec_cashRegistration {
  export type Option<T extends keyof typeof options> = keyof (typeof options)[T]
  // Form id: aE5md7RfHiy4LJmddoFAQH
  export interface T {
    start: string
    end: string
    // background/back_office [select_one] 1.1 Офіс
    back_office: undefined | Option<'back_office'>
    // background/back_enum [select_one] 1.2 Переписувач
    back_enum: undefined | Option<'back_enum'>
    // background/back_donor [select_one] 1.3 Проект
    back_donor: undefined | Option<'back_donor'>
    // background/back_refer [select_one] 1.4 Чи було це направлення здійснено у межах ДРБ?
    back_refer: undefined | Option<'pay_det_tax_exempt'>
    // background/back_refer_who [select_one] 1.4.1 З якого відділу було здійснено це направлення?
    back_refer_who: undefined | Option<'back_refer_who'>
    // background/back_consent [select_one] 1.5 Згода
    back_consent: undefined | Option<'pay_det_tax_exempt'>
    // background/back_consen_no_reas [text] 1.5.1 Зазначте, будь ласка, причину, з якої Ви не погоджуєтеся заповнити анкету?
    back_consen_no_reas: string | undefined
    // background/back_consent_no_note [note] Щиро дякуємо за ваш час, ми не будемо продовжувати заповнення анкети без вашої згоди.
    back_consent_no_note: string
    // ben_det/ben_det_surname [text] 2.1 Яке ваше прізвище (як вказано в паспорті)?
    ben_det_surname: string | undefined
    // ben_det/ben_det_first_name [text] 2.2 Яке ваше ім'я (як зазначено в паспорті)?
    ben_det_first_name: string | undefined
    // ben_det/ben_det_pat_name [text] 2.3 Яке ваше по-батькові?
    ben_det_pat_name: string | undefined
    // ben_det/ben_det_ph_number [integer] 2.4 Ваш контактний номер телефону?
    ben_det_ph_number: number | undefined
    // ben_det/ben_det_oblast [select_one] 2.5.1 Виберіть область, де буде проходити реєстрація
    ben_det_oblast: undefined | Option<'hh_char_origin_oblast'>
    // ben_det/ben_det_raion [select_one] 2.5.2 Виберіть район, де буде проходити реєстрація
    ben_det_raion: undefined | string
    // ben_det/ben_det_hromada [select_one] 2.5.3 Виберіть громаду, де відбувається реєстрація
    ben_det_hromada: undefined | string
    // ben_det/ben_det_settlement [select_one_from_file] 2.5.4 Виберіть Поселення, де відбувається реєстрація
    ben_det_settlement: string
    // ben_det/ben_det_res_stat [select_one] Виберіть статус проживання
    ben_det_res_stat: undefined | Option<'hh_char_hh_res_stat'>
    // ben_det/ben_det_prev_oblast [select_one] З якого регіону Ви перемістилися? (Виберіть область)
    ben_det_prev_oblast: undefined | Option<'hh_char_origin_oblast'>
    // ben_det/ben_det_income [integer] 2.6 Якою була загальна вартість у гривнях усіх ресурсів, отриманих Вашим домогосподарством за останній один місяць?
    ben_det_income: number | undefined
    // ben_det/ben_det_hh_size [integer] 2.7 Кількість членів домогосподарства (включно з головою домогосподарства)
    ben_det_hh_size: number | undefined
    // ben_det/ben_det_single_parent [select_one] 2.8 Чи є ви одиноким батьком / одинокою матір'ю?
    ben_det_single_parent: undefined | Option<'pay_det_tax_exempt'>
    // hh_char/hh_char_hhh [select_one] Ви голова домогосподарства?
    hh_char_hhh: undefined | Option<'pay_det_tax_exempt'>
    // hh_char/hh_char_res_gender [select_one] Виберіть стать респондента
    hh_char_res_gender: undefined | Option<'hh_char_hh_det_gender'>
    // hh_char/hh_char_res_age [integer] Вік респондента
    hh_char_res_age: number | undefined
    // hh_char/hh_char_res_dis_select [select_multiple] Будь ласка, оберіть будь-який з наведених нижче пунктів, які стосуються респондента
    hh_char_res_dis_select: undefined | Option<'hh_char_dis_select'>[]
    // hh_char/hh_char_res_dis_level [select_one] Який рівень складності обраних варіантів відповідей на попередні запитання?
    hh_char_res_dis_level: undefined | Option<'hh_char_dis_level'>
    // hh_char/hh_char_hhh_gender [select_one] 3.1.1 Яка стать голови домогосподарства?
    hh_char_hhh_gender: undefined | Option<'hh_char_hh_det_gender'>
    // hh_char/hh_char_hhh_age [integer] 3.1.2 Скільки років голові домогосподарства?
    hh_char_hhh_age: number | undefined
    // hh_char/hh_char_civ_stat [select_one] 3.1.3 Який цивільно-правовий статус голови домогосподарства?
    hh_char_civ_stat: undefined | Option<'hh_char_civ_stat'>
    // hh_char/hh_char_hhh_res_stat [select_one] 3.1.4 Виберіть статус проживання голови домогосподарства?
    hh_char_hhh_res_stat: undefined | Option<'hh_char_hh_res_stat'>
    // hh_char/hh_char_hhh_how_idp [select_one] 3.1.4.1 Як довго Ви є ВПО?
    hh_char_hhh_how_idp: undefined | Option<'hh_char_hh_how_idp'>
    // hh_char/hh_char_origin_oblast [select_one] 3.1.4.2 З якого регіону Ви перемістилися? (Виберіть область)
    hh_char_origin_oblast: undefined | Option<'hh_char_origin_oblast'>
    // hh_char/hh_char_hhh_dis_select [select_multiple] 3.1.5 Будь ласка, оберіть будь-який з наведених нижче пунктів, які стосуються голови домогосподарства
    hh_char_hhh_dis_select: undefined | Option<'hh_char_dis_select'>[]
    // hh_char/hh_char_hhh_dis_level [select_one] 3.1.6 Який рівень складності обраних варіантів відповідей на попередні запитання?
    hh_char_hhh_dis_level: undefined | Option<'hh_char_dis_level'>
    // hh_char/hh_char_hhh_chronic_disease [select_one] 3.1.7 У вас є хронічні захворювання?
    hh_char_hhh_chronic_disease: undefined | Option<'pay_det_tax_exempt'>
    calc_hhh_res_dis_level: string
    calc_char_civ_stat: string
    // hh_char/hh_char_chh [note] Це домогосподарство, яке очолює дитина (випадок захисту з високим рівнем ризику), будь ласка, негайно зверніться до відділу із захисту дітей.
    hh_char_chh: string
    // hh_char/hh_char_hh_det [begin_repeat] 3.2  Члени домогосподарства
    hh_char_hh_det:
      | {
          hh_char_hh_det_gender: undefined | Option<'hh_char_hh_det_gender'> | undefined
          hh_char_hh_det_age: number | undefined | undefined
          hh_char_hh_res_stat: undefined | Option<'hh_char_hh_res_stat'> | undefined
          hh_char_hh_how_idp: undefined | Option<'hh_char_hh_how_idp'> | undefined
          hh_char_hh_det_dis_select: undefined | Option<'hh_char_dis_select'>[] | undefined
          hh_char_hh_det_dis_level: undefined | Option<'hh_char_dis_level'> | undefined
          hh_char_hh_chronic_disease: undefined | Option<'pay_det_tax_exempt'> | undefined
          calc_u18: string | undefined
          calc_o60: string | undefined
          calc_ed_age: string | undefined
          calc_baby_age: string | undefined
          calc_preg: string | undefined
          calc_det_dis_level: string | undefined
          cal_chronic_disease: string | undefined
          cal_idp: string | undefined
          cal_idp_less_1y: string | undefined
          cal_idp_more_1y: string | undefined
          cal_long_res: string | undefined
          cal_ret: string | undefined
        }[]
      | undefined
    calc_tot_chi: string
    calc_tot_ed_age: string
    calc_tot_eld: string
    // hh_char/calc_tot_dis [calculate] Загальна кількість людей з інвалідністю
    calc_tot_dis: string
    // hh_char/cal_tot_chronic_disease [calculate] Загальна кількість людей з хронічними захворюваннями
    cal_tot_chronic_disease: string
    // hh_char/cal_tot_idp [calculate] Загальна кількість внутрішньо переміщених осіб (ВПО)
    cal_tot_idp: string
    // hh_char/cal_tot_idp_less_1y [calculate] Загальна кількість внутрішньо переміщених осіб (ВПО) Менше 1 року
    cal_tot_idp_less_1y: string
    // hh_char/cal_tot_idp_more_1y [calculate] Загальна кількість внутрішньо переміщених осіб (ВПО) Більше 1 року
    cal_tot_idp_more_1y: string
    // hh_char/cal_tot_long_res [calculate] Загальна кількість довгострокових жителів
    cal_tot_long_res: string
    // hh_char/cal_tot_ret [calculate] Загальна кількість осіб, які повернулися
    cal_tot_ret: string
    // hh_char/hh_char_preg [select_one] 3.3.1 Чи є у домогосподарстві жінки, які вагітні чи годують грудьми?
    hh_char_preg: undefined | Option<'pay_det_tax_exempt'>
    // hh_char/pregnant_count [integer] 3.3.3.1 Якщо так, то скільки жінок вагітні?
    pregnant_count: number | undefined
    // hh_char/lactating_count [integer] 3.3.1.2 Якщо так, то скільки жінок годують грудьми?
    lactating_count: number | undefined
    // hh_char/disease_higher_expenditures [select_one] 3.3.2 Якщо так, то чи витрачає родина більше коштів на такі речі, як охорона здоров'я?
    disease_higher_expenditures: undefined | Option<'pay_det_tax_exempt'>
    // hh_char/disease_does_working [select_one] 3.3.2.1 Якщо так, то чи має хтось з родини перешкоду з можливістю працювати внаслідок виконання обов'язків по догляду за людиною з хронічним захворюванням?
    disease_does_working: undefined | Option<'pay_det_tax_exempt'>
    // hh_char/household_agricultural_activities [select_one] 3.3.3 Чи має домогосподарство фізичну можливість займатися легкою сільськогосподарською діяльністю?
    household_agricultural_activities: undefined | Option<'pay_det_tax_exempt'>
    // hh_char/financial_manage_livestock [select_one] 3.3.3.1 Якщо ні, то чи має родина фінансові або соціальні ресурси, які вони можуть використовувати для обробки землі або утримання домашньої худоби?
    financial_manage_livestock: undefined | Option<'pay_det_tax_exempt'>
    // hh_char/hh_char_dis_note [note] Нижче наведені питання стосуються труднощів, з якими Ви або члени Вашого домогосподарства можете зіткнутися під час виконання певних дій. Ці запитання стосуються лише членів домогосподарства віком понад 5 років.**
    hh_char_dis_note: string
    // hh_char/hh_char_dis_select [select_multiple] Будь ласка, оберіть будь-який з наведених нижче пунктів, які стосуються вас або члена вашого домогосподарства
    hh_char_dis_select: undefined | Option<'hh_char_dis_select'>[]
    // hh_char/hh_char_dis_level [select_one] Який рівень складності обраних варіантів відповідей на попередні запитання?
    hh_char_dis_level: undefined | Option<'hh_char_dis_level'>
    calc_dis_level: string
    // cash_farmers/know_contamination_farming [select_one] Чи знаєте ви про будь-яке можливе забруднення (наприклад, боєприпасами, що не розірвалися) на землі, яку ви обробляєте?
    know_contamination_farming: undefined | Option<'know_contamination_neighbour'>
    // cash_farmers/know_contamination_neighbour [select_one] Чи знаєте ви про будь-яке можливе забруднення (наприклад, нерозірваними боєприпасами) на землі сусіда або дрібного фермера, що знаходиться поблизу?
    know_contamination_neighbour: undefined | Option<'know_contamination_neighbour'>
    // cash_farmers/know_contamination_neighbour_yes [select_one] Чи знаєте ви, що ця/ці особи все ще продовжують обробляти свою землю?
    know_contamination_neighbour_yes: undefined | Option<'know_contamination_neighbour_yes'>
    // cash_farmers/what_primary_livelihood [select_one] Основне джерело, що забезпечує продуктами харчування Ваше домогосподарство:
    what_primary_livelihood: undefined | Option<'what_primary_livelihood'>
    // cash_farmers/what_primary_livelihood_other [text] Якщо "Інше", вкажіть яке саме
    what_primary_livelihood_other: string | undefined
    // cash_farmers/consume_majority [select_one] Чи споживає Ваше домогосподарство значну частину того, що ви вирощуєте:
    consume_majority: undefined | Option<'pay_det_tax_exempt'>
    // cash_farmers/land_own [decimal] Скільки землі у власності Вашого домогосподарства:
    land_own: number | undefined
    // cash_farmers/land_cultivate [decimal] Скільки землі обробляє Ваше домогосподарство:
    land_cultivate: number | undefined
    // cash_farmers/depend_basic_needs [select_one] Чи робить сільське господарство та/або тваринництво значний внесок у те, що домогосподарство може задовольнити свої основні потреби?
    depend_basic_needs: undefined | Option<'pay_det_tax_exempt'>
    // cash_farmers/eligible_assistance_agricultural [select_multiple] Якщо ви маєте право на отримання допомоги, які сільськогосподарські засоби виробництва ви маєте намір придбати:
    eligible_assistance_agricultural: undefined | Option<'eligible_assistance_agricultural'>[]
    // cash_farmers/eligible_assistance_agricultural_other [text] Якщо "Інше", вкажіть що саме
    eligible_assistance_agricultural_other: string | undefined
    // cash_farmers/not_many_livestock [note] ##### Скільки у вас є такої худоби:
    not_many_livestock: string
    // cash_farmers/many_sheep_goat [integer] Вівці/кози:
    many_sheep_goat: number | undefined
    // cash_farmers/many_milking [integer] Доїльна/лактуюча корова:
    many_milking: number | undefined
    // cash_farmers/many_cow [integer] Суха корова:
    many_cow: number | undefined
    // cash_farmers/many_cattle [integer] Велика рогата худоба
    many_cattle: number | undefined
    // cash_farmers/many_pig [integer] Свиня:
    many_pig: number | undefined
    // cash_farmers/many_poultry [integer] Свійська птиця,кролик:
    many_poultry: number | undefined
    cal_cost_sheep_goat: string
    cal_cost_milking: string
    cal_cost_cow: string
    cal_cost_pig: string
    cal_cost_poultry: string
    lim_cal_cost_sheep_goat: string
    lim_cal_cost_milking: string
    lim_cal_cost_cow: string
    lim_cal_cost_pig: string
    lim_cal_cost_poultry: string
    no_cal_cost_all: string
    cal_cost_all: string
    cal_cost_450: string
    // cash_farmers/not_cost_all [note] undefined
    not_cost_all: string
    // cash_farmers/not_cost_assist [note] undefined
    not_cost_assist: string
    // cash_farmers/barriers_providing_sufficient [select_one] Чи стикаєтесь ви з бар'єрами у забезпеченні достатньої кількості та якості кормів для вашої худоби?
    barriers_providing_sufficient: undefined | Option<'pay_det_tax_exempt'>
    // cash_farmers/barriers_providing_sufficient_yes [text] Якщо "Так", будь ласка, вкажіть
    barriers_providing_sufficient_yes: string | undefined
    // cash_farmers/eligible_cash_feed [select_multiple] Якщо ви маєте право на отримання готівки на корми для тварин, які корми ви маєте намір придбати?
    eligible_cash_feed: undefined | Option<'eligible_cash_feed'>[]
    // cash_farmers/eligible_cash_feed_other [text] Якщо "Інше", будь ласка, вкажіть
    eligible_cash_feed_other: string | undefined
    // cash_farmers/animal_shelter_need [select_one] Чи потребує ваш притулок реабілітації?
    animal_shelter_need: undefined | Option<'pay_det_tax_exempt'>
    // cash_farmers/cash_animal_shelter [select_multiple] Якщо ви маєте право на отримання грошової допомоги для притулку для тварин, які будівельні матеріали ви маєте намір придбати?
    cash_animal_shelter: undefined | Option<'cash_animal_shelter'>[]
    // cash_farmers/cash_animal_shelter_other [text] Якщо "Інше", будь ласка, вкажіть
    cash_animal_shelter_other: string | undefined
    // livelihoods_score/income_spent_food [integer] Яка сума загального доходу домогосподарства була витрачена на продукти харчування (споживання людиною) за останні 7 днів?
    income_spent_food: number | undefined
    // livelihoods_score/income_spent_nonfood [integer] Яка сума загального доходу домогосподарства була витрачена на непродовольчі товари та послуги, такі як послуги, пов'язані з охороною здоров'я та освітою за останні 7 днів?
    income_spent_nonfood: number | undefined
    // livelihoods_score/lcs_sell_hh_assets [select_one] Чи продавало Ваше домогосподарство протягом останніх 30 днів домашнє майно/товари (меблі/побутову техніку, наприклад, телевізор, радіо, пральну машину, смартфон, ювелірні вироби тощо) через нестачу ресурсів для задоволення основних потреб (таких як їжа, житло, охорона здоров'я, освіта, комунальні послуги, паливо для опалення, питна вода тощо)?
    lcs_sell_hh_assets: undefined | Option<'lost_breadwiner'>
    // livelihoods_score/lcs_spent_savings [select_one] Чи витрачало Ваше домогосподарство за останні 30 днів свої заощадження через брак коштів на задоволення основних потреб (таких як їжа, житло, охорона здоров'я, освіта, комунальні послуги, паливо для опалення житла, питна вода тощо)?
    lcs_spent_savings: undefined | Option<'lost_breadwiner'>
    // livelihoods_score/lcs_forrowed_food [select_one] Чи купувало Ваше домогосподарство за останні 30 днів продукти у кредит або позичало продукти через брак коштів на задоволення основних потреб (таких як їжа, житло, охорона здоров'я, освіта, паливо для опалення житла, питна вода тощо)?
    lcs_forrowed_food: undefined | Option<'lost_breadwiner'>
    // livelihoods_score/lcs_eat_elsewhere [select_one] Чи відправляло Ваше домогосподарство за останні 30 днів своїх членів харчуватися/ проживати до іншої сім'ї чи друзів або харчуватися в пункті видачі їжі / безкоштовній їдальні / МКП, через брак коштів на задоволення основних потреб (таких як їжа, житло, охорона здоров'я, освіта, паливо для опалення житла, питна вода тощо)?
    lcs_eat_elsewhere: undefined | Option<'lost_breadwiner'>
    // livelihoods_score/lcs_sell_productive_assets [select_one] Чи продавало Ваше домогосподарство протягом останніх 30 днів виробничі активи або транспортні засоби (швейну машинку, велосипед, автомобіль тощо) через брак коштів для задоволення основних потреб (таких як їжа, житло, охорона здоров'я, освіта, комунальні послуги, паливо для опалення, питна вода тощо)?
    lcs_sell_productive_assets: undefined | Option<'lost_breadwiner'>
    // livelihoods_score/lcs_reduce_health_expenditures [select_one] Чи скорочувало Ваше домогосподарство витрати на охорону здоров'я ( у т.ч. на ліки) протягом останніх 30 днів через брак коштів на задоволення основних потреб (таких як їжа, житло, охорона здоров'я, освіта, комунальні послуги, паливо для опалення, питна вода тощо)?
    lcs_reduce_health_expenditures: undefined | Option<'lost_breadwiner'>
    // livelihoods_score/lcs_decrease_fertilizer [select_one] Чи доводилося комусь із членів вашого домогосподарства за останні 30 днів зменшувати витрати на добрива, пестициди, фураж, корм для тварин, ветеринарну допомогу тощо через брак продуктів харчування або грошей на їх купівлю?
    lcs_decrease_fertilizer: undefined | Option<'lost_breadwiner'>
    // livelihoods_score/lcs_reduce_education_expenditures [select_one] Чи скорочувало Ваше домогосподарство витрати на освіту протягом останніх 30 днів через брак коштів на задоволення основних потреб (таких як їжа, житло, охорона здоров'я, освіта, комунальні послуги, паливо для опалення, питна вода тощо)?
    lcs_reduce_education_expenditures: undefined | Option<'lost_breadwiner'>
    // livelihoods_score/lcs_sell_house [select_one] Чи продавало Ваше домогосподарство за останні 30 днів будинок або землю через брак коштів на задоволення основних потреб (таких як їжа, житло, охорона здоров'я, освіта, паливо для опалення житла, питна вода тощо)?
    lcs_sell_house: undefined | Option<'lost_breadwiner'>
    // livelihoods_score/lcs_move_elsewhere [select_one] Чи виїхав хтось із членів Вашого домогосподарства за останні 30 днів в інше місце у пошуках роботи через брак коштів для задоволення основних потреб через брак коштів на задоволення основних потреб (таких як їжа, житло, охорона здоров'я, освіта, паливо для опалення житла, питна вода тощо)?
    lcs_move_elsewhere: undefined | Option<'lost_breadwiner'>
    // livelihoods_score/lcs_degrading_income_source [select_one] Чи вдавалися члени Вашого домогосподарства протягом останніх 30 днів до принизливих джерел доходу, нелегальної роботи або роботи з підвищеним ризиком через брак коштів на задоволення основних потреб (таких як їжа, житло, охорона здоров'я, освіта, паливо для опалення житла, бутильована вода тощо)?
    lcs_degrading_income_source: undefined | Option<'lost_breadwiner'>
    // livelihoods_score/lcs_ask_stranger [select_one] Чи доводилося Вашому домогосподарству протягом останніх 30 днів просити гроші у незнайомих людей для задоволення основних потреб (таких як їжа, житло, охорона здоров'я, освіта, комунальні послуги, паливо для опалення, питна вода тощо)?
    lcs_ask_stranger: undefined | Option<'lost_breadwiner'>
    // livelihoods_score/lcs_reason [select_multiple] З яких основних причин Ваше домогосподарство вирішило застосувати ці стратегії?
    lcs_reason: undefined | Option<'lcs_reason'>[]
    // livelihoods_score/lcs_reason_other [text] Якщо інше, вкажіть
    lcs_reason_other: string | undefined
    // livelihoods_score/lost_breadwiner [select_one] Чи втратили родина годувальника?
    lost_breadwiner: undefined | Option<'lost_breadwiner'>
    // livelihoods_score/lost_breadwiner_conflict [select_one] Чи втратили родина годувальника внаслідок конфлікту (з 2014 року)?
    lost_breadwiner_conflict: undefined | Option<'pay_det_tax_exempt'>
    // Documented_loss_Assets [select_one] Чи є у вас документально підтверджені втрати виробничих активів?
    Documented_loss_Assets: undefined | Option<'pay_det_tax_exempt'>
    // baseline_indicator/basic_needs_prioritize [select_one] Наскільки ваше домогосподарство здатне задовольнити свої базові потреби, згідно з тим, як ви їх визначаєте та приорітезуєте ?
    basic_needs_prioritize: undefined | Option<'basic_needs_prioritize'>
    // baseline_indicator/basic_needs_unable_fulfil [select_multiple] Які базові потреби ваше домогосподарство наразі не може задовольнити?
    basic_needs_unable_fulfil: undefined | Option<'basic_needs_unable_fulfil'>[]
    // baseline_indicator/basic_needs_unable_fulfil_other [text] Якщо інше, будь ласка, поясніть
    basic_needs_unable_fulfil_other: string | undefined
    // baseline_indicator/unable_fulfil_basic_food [select_one] Якими були причини того, що Базові потреби в харчуванні залишилися незадоволеними?
    unable_fulfil_basic_food: undefined | Option<'unable_fulfil_other'>
    // baseline_indicator/unable_fulfil_basic_food_other [text] Якщо інше, будь ласка, поясніть
    unable_fulfil_basic_food_other: string | undefined
    // baseline_indicator/unable_fulfil_food_children [select_one] Якими були причини того, що Особливі потреби у харчуванні ваших дітей віком 0-23 місяці залишилися незадоволеними?
    unable_fulfil_food_children: undefined | Option<'unable_fulfil_other'>
    // baseline_indicator/unable_fulfil_food_children_other [text] Якщо інше, будь ласка, поясніть
    unable_fulfil_food_children_other: string | undefined
    // baseline_indicator/unable_fulfil_food_pregnant [select_one] Якими були причини того, що Особливі потреби у харчуванні вагітних та жінок, що годують груддю залишилися незадоволеними?
    unable_fulfil_food_pregnant: undefined | Option<'unable_fulfil_other'>
    // baseline_indicator/unable_fulfil_food_pregnant_other [text] Якщо інше, будь ласка, поясніть
    unable_fulfil_food_pregnant_other: string | undefined
    // baseline_indicator/unable_fulfil_water_needs [select_one] Якими були причини того, що Потреби у воді залишилися незадоволеними?
    unable_fulfil_water_needs: undefined | Option<'unable_fulfil_other'>
    // baseline_indicator/unable_fulfil_water_needs_other [text] Якщо інше, будь ласка, поясніть
    unable_fulfil_water_needs_other: string | undefined
    // baseline_indicator/unable_fulfil_hygiene_needs [select_one] Якими були причини того, що Гігієнічні потреби залишилися незадоволеними?
    unable_fulfil_hygiene_needs: undefined | Option<'unable_fulfil_other'>
    // baseline_indicator/unable_fulfil_hygiene_needs_other [text] Якщо інше, будь ласка, поясніть
    unable_fulfil_hygiene_needs_other: string | undefined
    // baseline_indicator/unable_fulfil_shelter_needs [select_one] Якими були причини того, що Потреби у притулку/житлі залишилися незадоволеними?
    unable_fulfil_shelter_needs: undefined | Option<'unable_fulfil_other'>
    // baseline_indicator/unable_fulfil_shelter_needs_other [text] Якщо інше, будь ласка, поясніть
    unable_fulfil_shelter_needs_other: string | undefined
    // baseline_indicator/unable_fulfil_healthcare_needs [select_one] Якими були причини того, що Потреби в охороні здоров'я ваших домогосподарств залишилися незадоволеними?
    unable_fulfil_healthcare_needs: undefined | Option<'unable_fulfil_other'>
    // baseline_indicator/unable_fulfil_healthcare_needs_other [text] Якщо інше, будь ласка, поясніть
    unable_fulfil_healthcare_needs_other: string | undefined
    // baseline_indicator/unable_fulfil_healthcare_children [select_one] Якими були причини того, що Особливі медичні потреби Ваших дітей віком 0-23 місяці залишилися незадоволеними?
    unable_fulfil_healthcare_children: undefined | Option<'unable_fulfil_other'>
    // baseline_indicator/unable_fulfil_healthcare_children_other [text] Якщо інше, будь ласка, поясніть
    unable_fulfil_healthcare_children_other: string | undefined
    // baseline_indicator/unable_fulfil_healthcare_pregnant [select_one] Якими були причини того, що Особливі медичні потреби вагітних та жінок, що годують груддю залишилися незадоволеними?
    unable_fulfil_healthcare_pregnant: undefined | Option<'unable_fulfil_other'>
    // baseline_indicator/unable_fulfil_healthcare_pregnant_other [text] Якщо інше, будь ласка, поясніть
    unable_fulfil_healthcare_pregnant_other: string | undefined
    // baseline_indicator/unable_fulfil_transportation_needs [select_one] Якими були причини того, що Транспортні потреби залишилися незадоволеними?
    unable_fulfil_transportation_needs: undefined | Option<'unable_fulfil_other'>
    // baseline_indicator/unable_fulfil_transportation_needs_other [text] Якщо інше, будь ласка, поясніть
    unable_fulfil_transportation_needs_other: string | undefined
    // baseline_indicator/unable_fulfil_communication_needs [select_one] Якими були причини того, що Потреби у спілкуванні залишилися незадоволеними?
    unable_fulfil_communication_needs: undefined | Option<'unable_fulfil_other'>
    // baseline_indicator/unable_fulfil_communication_needs_other [text] Якщо інше, будь ласка, поясніть
    unable_fulfil_communication_needs_other: string | undefined
    // baseline_indicator/unable_fulfil_education_needs [select_one] Якими були причини того, що Потреби в освіті для дітей залишилися незадоволеними?
    unable_fulfil_education_needs: undefined | Option<'unable_fulfil_other'>
    // baseline_indicator/unable_fulfil_education_needs_other [text] Якщо інше, будь ласка, поясніть
    unable_fulfil_education_needs_other: string | undefined
    // baseline_indicator/unable_fulfil_clothing_needs [select_one] Якими були причини того, що Потреби в одязі залишилися незадоволеними?
    unable_fulfil_clothing_needs: undefined | Option<'unable_fulfil_other'>
    // baseline_indicator/unable_fulfil_clothing_needs_other [text] Якщо інше, будь ласка, поясніть
    unable_fulfil_clothing_needs_other: string | undefined
    // baseline_indicator/unable_fulfil_utilities [select_one] Якими були причини того, що Комунальні послуги залишилися незадоволеними?
    unable_fulfil_utilities: undefined | Option<'unable_fulfil_other'>
    // baseline_indicator/unable_fulfil_utilities_other [text] Якщо інше, будь ласка, поясніть
    unable_fulfil_utilities_other: string | undefined
    // baseline_indicator/unable_fulfil_other [select_one] Якими були причини того, що Інше залишилися незадоволеними?
    unable_fulfil_other: undefined | Option<'unable_fulfil_other'>
    // baseline_indicator/unable_fulfil_other_specify [text] Якщо інше, будь ласка, поясніть
    unable_fulfil_other_specify: string | undefined
    // ass_inc/not_information [note] Ваша інформація була зібрана і буде розглянута відповідно до критеріїв відбору та вразливості. Ми зв'яжемося з вами, щоб повідомити про рішення щодо прийнятності
    not_information: string
    // pay_det/pay_consent [select_one] 6.0 Дякуємо за відповіді на вищезазначені питання, чи готові ви надати свої платіжні реквізити?
    pay_consent: undefined | Option<'pay_det_tax_exempt'>
    // pay_det/pay_det_s/pay_det_id_type [select_one] 6.1 Яка у Вас форма посвідчення особи?
    pay_det_id_type: undefined | Option<'pay_det_id_type'>
    // pay_det/pay_det_s/pay_det_id_type_oth [text] 6.1.1 Яка інша форма посвідчення особи у Вас є?
    pay_det_id_type_oth: string | undefined
    // pay_det/pay_det_s/pay_det_pass_ser [text] 6.2.1 Серія паспорта
    pay_det_pass_ser: string | undefined
    // pay_det/pay_det_s/pay_det_pass_num [text] 6.2.2 Номер ID
    pay_det_pass_num: string | undefined
    // pay_det/pay_det_s/pay_det_id_ph [image] 6.2.3 Сфотографуйте посвідчення особи
    pay_det_id_ph: string
    // pay_det/pay_det_s/begin_group_vdIM9ogQb/pay_det_tax_id_yn [select_one] 6.3.1 Чи має бенефіціар індивідуальний податковий номер (ІПН)?
    pay_det_tax_id_yn: undefined | Option<'pay_det_tax_exempt'>
    // pay_det/pay_det_s/begin_group_vdIM9ogQb/pay_det_tax_id_num [text] 6.3.2 Ідентифікаційний номер (ІПН) бенефіціара
    pay_det_tax_id_num: string | undefined
    // pay_det/pay_det_s/begin_group_vdIM9ogQb/pay_det_tax_id_ph [image] 6.3.3 Сфотографуйте посвідчення платника податків
    pay_det_tax_id_ph: string
    // pay_det/pay_det_s/begin_group_vdIM9ogQb/pay_det_tax_exempt [select_one] 6.3.4 Підтвердження відсутності ІПН
    pay_det_tax_exempt: undefined | Option<'pay_det_tax_exempt'>
    // pay_det/pay_det_s/begin_group_vdIM9ogQb/pay_det_tax_exempt_im [image] 6.3.5 Сфотографуйте пільговий документ
    pay_det_tax_exempt_im: string
    // pay_det/pay_det_s/pay_det_pay_meth [select_one] 6.4.1 Який у Вас бажаний спосіб оплати?
    pay_det_pay_meth: undefined | Option<'pay_det_pay_meth'>
    // pay_det/pay_det_s/pay_det_iban [text] 6.4.2 Який у Вас IBAN-код?
    pay_det_iban: string | undefined
    // pay_det/pay_det_s/pay_det_iban_im [image] 6.4.3 Сфотографуйте IBAN-код (якщо такий є)
    pay_det_iban_im: string
    // pay_det/pay_det_s/pay_address [text] 6.4.4 Яка Ваша адреса?
    pay_address: string | undefined
    // pay_det/pay_det_s/pay_zip [text] 6.4.5 Яким іншим способам оплати Ви віддаєте перевагу?
    pay_zip: string | undefined
    // pay_det/pay_det_s/pay_det_add_im [image] 6.4.6 Сфотографуйте сторінку з адресою в паспорті
    pay_det_add_im: string
    // pay_det/pay_det_s/pay_det_pay_meth_oth [text] 6.4.7 Яким іншим способам оплати Ви віддаєте перевагу?
    pay_det_pay_meth_oth: string | undefined
    // pay_det/pay_det_s/pay_det_pay_meth_none [text] 6.4.8 Чи можете Ви навести головну причину того, що жоден із цих способів оплати Вам не підходить?
    pay_det_pay_meth_none: string | undefined
    // fin_det/fin_det_res [text] 7.1 Інші коментарі респондента
    fin_det_res: string | undefined
    // fin_det/fin_det_enum [text] 7.2 Інші коментарі особи, яка проводила оцінювання
    fin_det_enum: string | undefined
    // fin_det/fin_det_oth_doc_im [image] 7.3 Сфотографуйте будь-який інший відповідний документ
    fin_det_oth_doc_im: string
    // fin_det/additional_photo1 [image] Додаткові фотографії
    additional_photo1: string
    // fin_det/additional_photo2 [image] Додаткові фотографії
    additional_photo2: string
    // fin_det/additional_photo3 [image] Додаткові фотографії
    additional_photo3: string
    // fin_det/additional_photo4 [image] Додаткові фотографії
    additional_photo4: string
    // fin_det/additional_photo5 [image] Додаткові фотографії
    additional_photo5: string
    // fin_det/additional_photo6 [image] Додаткові фотографії
    additional_photo6: string
    // fin_det/additional_photo7 [image] Додаткові фотографії
    additional_photo7: string
    // cal_eligibility [calculate] undefined
    cal_eligibility: string
    // cal_lim_income [calculate] undefined
    cal_lim_income: string
    // cal_spending_savings [calculate] undefined
    cal_spending_savings: string
    // cal_selling_household [calculate] undefined
    cal_selling_household: string
    // cal_decrease_fertilizer [calculate] undefined
    cal_decrease_fertilizer: string
    // cal_purchasing_food [calculate] undefined
    cal_purchasing_food: string
    // cal_selling_productive_assets [calculate] undefined
    cal_selling_productive_assets: string
    // cal_reducing_essential_health [calculate] undefined
    cal_reducing_essential_health: string
    // cal_sending_members_eat [calculate] undefined
    cal_sending_members_eat: string
    // cal_moving_elsewhere_work [calculate] undefined
    cal_moving_elsewhere_work: string
    // cal_strangers_money_cover [calculate] undefined
    cal_strangers_money_cover: string
    // cal_sellling_house_land [calculate] undefined
    cal_sellling_house_land: string
    // cal_reducing_essential_education [calculate] undefined
    cal_reducing_essential_education: string
    // cal_degrading_sources_income [calculate] undefined
    cal_degrading_sources_income: string
    // cal_size_hh_v1 [calculate] undefined
    cal_size_hh_v1: string
    // cal_residence_status_v2_ue [calculate] undefined
    cal_residence_status_v2_ue: string
    // cal_dis_chr_v2 [calculate] undefined
    cal_dis_chr_v2: string
    // cal_chr_v4_ue [calculate] undefined
    cal_chr_v4_ue: string
    // cal_single_parent_children_v3 [calculate] undefined
    cal_single_parent_children_v3: string
    // cal_elderly_people_v4 [calculate] undefined
    cal_elderly_people_v4: string
    // cal_perg_woman_v5 [calculate] undefined
    cal_perg_woman_v5: string
    // cal_breadwinner_conflict_v6 [calculate] undefined
    cal_breadwinner_conflict_v6: string
    // cal_doc_loss [calculate] undefined
    cal_doc_loss: string
    // cal_negative_coping_strategies_v8 [calculate] undefined
    cal_negative_coping_strategies_v8: string
    // cal_income [calculate] undefined
    cal_income: string
    // cal_tot_vulnerability [calculate] undefined
    cal_tot_vulnerability: string
  }
  export const options = {
    back_office: {
      lwo: `Lviv (LWO)`,
      chj: `Chernihiv (CHJ)`,
      dnk: `Dnipro (DNK)`,
      hrk: `Kharkiv (HRK)`,
      nlv: `Mykloaiv (NLV)`,
      khe: `Kherson`,
      zap: `Zaporizia`,
      umy: `Sumy(UMY)`,
    },
    back_enum: {
      dmytro_ivanov: `Іванов Дмитро`,
      henadii_petrychenko: `Петриченко Геннадій`,
      nadiia_yudaieva: `Юдаєва Надія`,
      dmytro_tsaruk: `Царук Дмитро`,
      viktoria_ushan: `Ушань Вікторія`,
      kostiantyn_yefimchuk: `Єфімчук Костянтин`,
      viktoriia_lytvynova: `Вікторія Литвинова`,
      valerii_vietrov: `Валерій Вєтров`,
      daria_kokalia: `Кокаля Дар'я`,
      lwo_ex1: `Додатковий 1`,
      lwo_ex2: `Додатковий 1`,
      oleksandr_havrylov: `Олександр Гаврилов`,
      ievgen_kylymenniy: `Євген Килименний`,
      oleksandr_shmunk: `Олександр Шмунк`,
      inna_kovalchuk: `Інна Ковальчук`,
      polina_prusakova: `Поліна Прусакова`,
      artem_chernukha_1: `Чернуха Артем`,
      nlv_ex1: `Додатковий 1`,
      nlv_ex2: `Додатковий 1`,
      alina_bondarenko: `Alina Bondarenko`,
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
      andrii_matvieiev: `Андрій Матвєєв`,
      sofiia_berezhna: `Софія Бережна`,
      illia_kutsenko: `Ілля Кутценко`,
      dnk_ex1: `Додатковий 1`,
      dnk_ex2: `Додатковий 1`,
      yurii_volkov: `Юрій Волков`,
      andrii_zagoruiev: `Андрій Загоруєв`,
      olena_sydorenko: `Олена Сидоренко`,
      svitlana_smyrnova: `Світлана Смирнова`,
      tetiana_konovshii: `Тетяна Коновшій`,
      bohdan_taranushchenko: `Богдан Таранущенко`,
      olena_buglo: `Олена Бугло`,
      vitalii_shapoval: `Віталій Шаповал`,
      hrk_ex1: `Додатковий 1`,
      hrk_ex2: `Додатковий 1`,
      dmytro_chernukha: `Чернуха Дмитро`,
      anastasiia_reshynska: `Анастасія Решинська`,
      nataliia_pushenko: `Пушенко Наталія`,
      tetiana_gorbatiuk: `Горбатюк Тетяна`,
      oleksandr_lukomets: `Лукомець Олександр`,
      katerina_severin: `Северін Катерина`,
      maksim_sedun: `Седун Максим`,
      surzhyk_oleksandr: `Суржик Олександр`,
      chj_ex1: `Додатковий 1`,
      chj_ex2: `Додатковийv2`,
      khe_ex1: `Додатковий 1`,
      khe_ex2: `Додатковий 2`,
      khe_ex3: `Додатковий 3`,
      khe_ex4: `Додатковий 4`,
      zap_ex1: `Додатковий 1`,
      zap_ex2: `Додатковий 2`,
      zap_ex3: `Додатковий 3`,
      zap_ex4: `Додатковий 4`,
      honcharov_oleksandr: `Гончаров Олександр`,
      vceronika_kaliuzhna: `Калюжна Вероніка`,
      margaryta_pustova: `Пустова Маргарита`,
      inna_mishchenko: `Інна Міщенко`,
      umy_ex1: `Анна Артюх`,
      umy_ex2: `Євгеній Мусієнко`,
      umy_ex3: `Виталій Гриненко`,
      umy_ext1: `Додатковий 1`,
      umy_ext2: `Додатковий 2`,
      umy_ext3: `Додатковий 3`,
      umy_ex4: `Додатковий 4`,
      oleh_vyshnevskyi: `Oleh Vyshevskyi`,
    },
    back_donor: {
      uhf6: `UHF-6 (UKR-000336)`,
      uhf7: `UHF-7 (UKR-000352)`,
      '363_uhf8': `UHF-8 (UKR-000363)`,
      '372_echo': `ECHO (UKR-000372)`,
    },
    pay_det_tax_exempt: {
      yes: `Так`,
      no: `Ні`,
    },
    know_contamination_neighbour: {
      yes: `Так`,
      no: `Ні`,
      unwilling: `Не бажають або не можуть відповісти`,
    },
    back_refer_who: {
      prot: `A = Захист`,
      legal: `B = Юридичний`,
      shelter: `C = Відновлення житла`,
    },
    hh_char_hh_how_idp: {
      less_1y: `Менше 1 року`,
      more_1y: `Більше 1 року`,
    },
    lost_breadwiner: {
      yes: `Так`,
      no_had_no_need_to_use_this_coping_strategy: `Ні, не було потреби використовувати цю стратегію подолання труднощів`,
      no_have_already_exhausted_this_coping_strategy_and_cannot_use_it_again: `Ні, ми вже вичерпали цю стратегію виживання та не можемо використовувати її знову`,
      not_applicable_this_coping_strategy_is_not_available_to_me: `Не застосовно / Для мене ця стратегія недоступна`,
      prefer_not_to_answer: `Не хочу відповідати`,
    },
    lcs_reason: {
      to_access_or_pay_for_food: `Щоб отримати доступ до або оплатити харчування;`,
      to_access_or_pay_for_healthcare: `Щоб отримати доступ до медичних послуг або ліків або або оплатити їх;`,
      to_access_or_pay_for_shelter: `Щоб отримати доступ до житла або оплатити його;`,
      to_access_or_pay_for_education: `Щоб отримати доступ до навчання або оплатити його;`,
      other: `Інше`,
      dont_know: `Не знаю`,
    },
    eligible_cash_feed: {
      hay: `Сіно`,
      concentrated_feed: `Концентровані корми`,
      mineral_blocks: `Мінеральні блоки`,
      wheat_seeds: `Насіння пшениці`,
      barley_seeds: `Насіння ячменю`,
      other: `Інше`,
    },
    cash_animal_shelter: {
      bricks: `Цегла`,
      wood: `Дерево`,
      plywood: `Фанера`,
      metal_panel: `Металева панель`,
      roof_panel: `Покрівельна панель`,
      cement: `Цемент`,
      nails: `Цвяхи`,
      other: `Інше`,
    },
    know_contamination_neighbour_yes: {
      still: `Досі обробляє цю землю`,
      partially: `Частково обробляє землю`,
      stopped: `Припинили обробляти цю землю`,
      uu: `Не можу/не хочу відповісти`,
    },
    basic_needs_prioritize: {
      all: `Всі`,
      most: `Більшість`,
      about_half: `Близько половини`,
      some: `Деякі (менше половини)`,
      none: `Жодної`,
      dont_wish: `Я не хочу відповідати`,
    },
    basic_needs_unable_fulfil: {
      basic_food: `Базові потреби в харчуванні`,
      food_children: `Особливі потреби у харчуванні ваших дітей віком 0-23 місяці`,
      food_pregnant: `Особливі потреби у харчуванні вагітних та жінок, що годують груддю`,
      water_needs: `Потреби у воді`,
      hygiene_needs: `Гігієнічні потреби`,
      shelter_needs: `Потреби у притулку/житлі`,
      healthcare_needs: `Потреби в охороні здоров'я ваших домогосподарств`,
      healthcare_children: `Особливі медичні потреби Ваших дітей віком 0-23 місяці`,
      healthcare_pregnant: `Особливі медичні потреби вагітних та жінок, що годують груддю`,
      transportation_needs: `Транспортні потреби`,
      communication_needs: `Потреби у спілкуванні`,
      education_needs: `Потреби в освіті для дітей`,
      clothing_needs: `Потреби в одязі`,
      utilities: `Комунальні послуги`,
      other: `Інше`,
    },
    unable_fulfil_other: {
      financial_reasons: `Фінансові причини`,
      not_available: `Відсутній на місцевому ринку`,
      other: `Інше`,
    },
    hh_char_origin_oblast: {
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
    hh_char_hh_res_stat: {
      idp: `A = Внутрішньо-переміщена особа (ВПО)`,
      long_res: `B = Довгостроковий мешканець`,
      ret: `C = Особа, яка повернулася`,
      ref_asy: `D = Біженець/особа, що потребує прихистку`,
    },
    hh_char_hh_det_gender: {
      male: `A = Чоловік`,
      female: `B = Жінка`,
    },
    hh_char_civ_stat: {
      single: `A = Неодружений(-а) (ніколи не був(-ла) одружений(-а))`,
      dom_part: `B = Неодружений(-а), але живе у сімейному партнерстві`,
      married: `C = Одружений(-а)`,
      div_sep: `D = Розлучений(-а)/ проживає окремо`,
      widow: `E = Удівець/ вдова`,
      abandoned: `F = Покинутий(-а)`,
    },
    hh_char_dis_select: {
      diff_see: `A = Маєте труднощі із зором, навіть якщо носите окуляри`,
      diff_hear: `B = Маєте проблеми зі слухом, навіть якщо користуєтеся слуховим апаратом`,
      diff_walk: `C = Маєте труднощі з ходьбою або підйомом по сходах`,
      diff_rem: `D = Маєте труднощі з запам'ятовуванням або концентрацією уваги`,
      diff_care: `E = Мають труднощі з самообслуговуванням, наприклад, з миттям або одяганням`,
      diff_comm: `F = Маєте труднощі у спілкуванні, наприклад, у розумінні чи розумінні інших людей`,
      diff_none: `G = Ніщо з перерахованого вище не стосується`,
    },
    hh_char_dis_level: {
      zero: `A = Ні, труднощі відсутні`,
      one: `B = Так, є деякі труднощі`,
      two: `C = Так, багато труднощів`,
      fri: `D = Взагалі не можу(-е) робити`,
    },
    undefined: {
      no_damage: `Відсутність структурних пошкоджень`,
      minor_damage: `Незначні пошкодження (легкі або середні пошкодження, такі як розбиті вікна та двері, незначні пошкодження даху)`,
      heavy_damage: `Сильні пошкодження`,
      rent: `B = Орендувати житло`,
      host: `B = Проживання з друзями/ родиною/ стороною, яка приймає`,
      own_prop: `C = Проживання у власному житлі`,
      coll_cen: `D = Проживання у центрі тимчасового розміщення`,
      homeless: `E = Безхатній(-я)`,
      other_accom: `F = Інше`,
      secure: `A = Забезпечення на середній/ довгий строк`,
      unable_pay: `B = Зараз не в змозі сплачувати орендну плату/ платити за центр тимчасового розміщення`,
      dan_unable_pay: `C = Існує небезпека неможливості сплачувати орендну плату/ платити за центр тимчасового розміщення`,
      unsuit_accom: `D = Житло, яке не відповідає моїм потребам`,
      eviction: `E = Виселення з інших причин`,
      remain: `A = Залишатися у поточному місці`,
      not_sure: `C = Не впевнений(-а)/ не знаю`,
      always: `A = Постійно`,
      not_always: `B = Не постійно, але щодня приходить`,
      intermittent: `C = Приходить у різні дні`,
      rarely: `D = Рідко`,
      never: `E = Ніколи`,
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
    what_primary_livelihood: {
      agricul: `Сільське господарство та/або тваринництво`,
      grocery: `Продукти, магазин`,
      smalls: `Невеликий магазин/кіоск`,
      carpentry: `Столярні, різьбярські або деревообробні роботи`,
      mechanic: `Механіка`,
      plumber: `Сантехнік`,
      electrical: `Електромонтажні роботи`,
      construct: `Будівельні роботи`,
      textiel: `Текстиль та пошиття одягу`,
      education: `Освітній центр`,
      heath: `Оздоровчий центр`,
      manufacturing: `Виробництво / робота на заводі`,
      computer: `Комп'ютер, технології`,
      administration: `Адміністрування,`,
      graphic: `Графічний дизайн`,
      transport: `Транспортне обслуговування`,
      hairdressing: `Перукарня/барбер`,
      pscoffe: `Надання послуг (наприклад, кава/чай, невеликий ресторан, кулінарія тощо)`,
      pscleaning: `Надання послуг (прибирання, охорона)`,
      ngo: `НУО / агенції ООН`,
      government: `Уряд`,
      other: `Інше`,
      none: `Жоден з них`,
    },
    eligible_assistance_agricultural: {
      seeds: `Насіння`,
      fertilizers: `Добрива`,
      irrigationp: `Зрошувальні труби (краплинні лінії)`,
      fuel: `Паливо (для сільськогосподарської техніки)`,
      agriculser: `Сільськогосподарські послуги (тракторний сервіс, збір врожаю)`,
      livestock: `Тваринництво (кури, свині, корови тощо)`,
      agricultool: `Сільськогосподарські інструменти (лопата, граблі тощо)`,
      livestockf: `Корми для худоби`,
      buildingm: `Будівельні матеріали,`,
      other: `Інше`,
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
      ben_det_ph_number: _.ben_det_ph_number ? +_.ben_det_ph_number : undefined,
      ben_det_income: _.ben_det_income ? +_.ben_det_income : undefined,
      ben_det_hh_size: _.ben_det_hh_size ? +_.ben_det_hh_size : undefined,
      hh_char_res_age: _.hh_char_res_age ? +_.hh_char_res_age : undefined,
      hh_char_res_dis_select: _.hh_char_res_dis_select?.split(' '),
      hh_char_hhh_age: _.hh_char_hhh_age ? +_.hh_char_hhh_age : undefined,
      hh_char_hhh_dis_select: _.hh_char_hhh_dis_select?.split(' '),
      hh_char_hh_det: _['hh_char_hh_det']?.map(extractQuestionName).map((_: any) => {
        _['hh_char_hh_det_age'] = _.hh_char_hh_det_age ? +_.hh_char_hh_det_age : undefined
        _['hh_char_hh_det_dis_select'] = _.hh_char_hh_det_dis_select?.split(' ')
        return _
      }),
      pregnant_count: _.pregnant_count ? +_.pregnant_count : undefined,
      lactating_count: _.lactating_count ? +_.lactating_count : undefined,
      hh_char_dis_select: _.hh_char_dis_select?.split(' '),
      eligible_assistance_agricultural: _.eligible_assistance_agricultural?.split(' '),
      many_sheep_goat: _.many_sheep_goat ? +_.many_sheep_goat : undefined,
      many_milking: _.many_milking ? +_.many_milking : undefined,
      many_cow: _.many_cow ? +_.many_cow : undefined,
      many_cattle: _.many_cattle ? +_.many_cattle : undefined,
      many_pig: _.many_pig ? +_.many_pig : undefined,
      many_poultry: _.many_poultry ? +_.many_poultry : undefined,
      eligible_cash_feed: _.eligible_cash_feed?.split(' '),
      cash_animal_shelter: _.cash_animal_shelter?.split(' '),
      income_spent_food: _.income_spent_food ? +_.income_spent_food : undefined,
      income_spent_nonfood: _.income_spent_nonfood ? +_.income_spent_nonfood : undefined,
      lcs_reason: _.lcs_reason?.split(' '),
      basic_needs_unable_fulfil: _.basic_needs_unable_fulfil?.split(' '),
    }) as T
}
