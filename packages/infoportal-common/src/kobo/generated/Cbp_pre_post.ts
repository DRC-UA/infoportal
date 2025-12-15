export namespace Cbp_pre_post {
  export type Option<T extends keyof typeof options> = keyof (typeof options)[T]
  // Form id: aHSQ7cJKbGoBs3F5DGSf8Y
  export interface T {
    start: string
    end: string
    // topic [select_one] Тема:
    topic: undefined | Option<'topic'>
    // training_gffo [select_one] Чи проводиться цей тренінг за підтримки Федерального міністерства закордонних справ Німеччини (GFFO)?
    training_gffo: undefined | Option<'staff_respect'>
    // date [date] Дата:
    date: Date | undefined
    // unique_code [text] Унікальний код:
    unique_code: string | undefined
    // date_birthday [date] Дата вашого народження:
    date_birthday: Date | undefined
    // location [select_one] Локація проведення тренінгу (місто):
    location: undefined | Option<'location'>
    // location_other [text] Якщо "Інше", будь ласка, вкажіть
    location_other: string | undefined
    // complete_training [select_one] Ви проходите цей тест:
    complete_training: undefined | Option<'complete_training'>
    cal_pre_post: string
    // hum_pri_pro_mai/humanitarian_principles [select_one] 1. Якими є чотири принципи гуманітарної діяльності
    humanitarian_principles: undefined | Option<'humanitarian_principles'>
    // hum_pri_pro_mai/impartiality_means [select_one] 2. Неупередженість означає, що гуманітарні організації не повинні ставати на бік військових дій або брати участь у суперечках політичного, расового, релігійного чи ідеологічного характеру.
    impartiality_means: undefined | Option<'reducing_protection_risks'>
    // hum_pri_pro_mai/protection_humanitarian_action [select_one] 3. Соціально-правовий захист у гуманітарній діяльності найточніше описується як:
    protection_humanitarian_action: undefined | Option<'protection_humanitarian_action'>
    // hum_pri_pro_mai/protection_responsibility_organisations [select_one] 4. Соціально-правовий захист є обов’язком виключно міжнародних та національних неурядових організацій:
    protection_responsibility_organisations: undefined | Option<'reducing_protection_risks'>
    // hum_pri_pro_mai/protection_mainstreaming_described [select_one] 5. Включення питань соціально-правового захисту у програмну діяльність може бути описано наступним чином
    protection_mainstreaming_described: undefined | Option<'protection_mainstreaming_described'>
    // hum_pri_pro_mai/elements_protection_mainstreaming [select_one] 6. Якими є чотири основні елементи Включення питань соціально-правового захисту у програмну діяльність
    elements_protection_mainstreaming: undefined | Option<'elements_protection_mainstreaming'>
    // hum_pri_pro_mai/affected_population_information [select_one] 7. Якщо постраждале населення має інформацію про існування та географію надання послуг, то вони мають реальний доступ до цих послуг:
    affected_population_information: undefined | Option<'reducing_protection_risks'>
    // hum_pri_pro_mai/cal_total_hum_pri_pro_mai [calculate] Загальна кількість балів за блок
    cal_total_hum_pri_pro_mai: string
    // safe_referrals/understanding_referral_humanitarian [select_one] 1. Що таке перенаправлення у гуманітарній діяльності?
    understanding_referral_humanitarian: undefined | Option<'understanding_referral_humanitarian'>
    // safe_referrals/referral_considered_safe [select_one] 2. Перенаправлення вважається безпечним, якщо воно
    referral_considered_safe: undefined | Option<'referral_considered_safe'>
    // safe_referrals/guiding_principles_referrals [select_multiple] 3. Якими є керівні принципи для перенаправлень
    guiding_principles_referrals: undefined | Option<'guiding_principles_referrals'>[]
    // safe_referrals/correct_referral_process [select_one] 4. Яким є правильний порядок процесу перенаправлень
    correct_referral_process: undefined | Option<'correct_referral_process'>
    // safe_referrals/sign_posting_humanitarian [select_one] 5. Що таке скерування у гуманітарній діяльності?
    sign_posting_humanitarian: undefined | Option<'sign_posting_humanitarian'>
    // safe_referrals/key_vulnerable_groups [select_multiple] 6. Хто вважається основними вразливими групами у сфері захисту?(
    key_vulnerable_groups: undefined | Option<'key_vulnerable_groups'>[]
    // safe_referrals/service_mapping_identifies [select_one] 7. Мапування послуг визначає прогалини у наданні послуг та спрямовує роботу над питаннями соціально-правового захисту:
    service_mapping_identifies: undefined | Option<'reducing_protection_risks'>
    // safe_referrals/not_promise_anything [select_one] 8. *Нічого не обіцяти* є одним з ключових моментів, які слід пам’ятати під час перенаправлення:
    not_promise_anything: undefined | Option<'reducing_protection_risks'>
    // safe_referrals/referrals_personal_data [select_one] 9. Для потреб перенаправлення, персональні дані осіб мають
    referrals_personal_data: undefined | Option<'referrals_personal_data'>
    // safe_referrals/identified_case [select_one] 10. Якщо ви виявили випадок, який потребує безпечного прямого перенаправлення, що слід зробити в першу чергу?
    identified_case: undefined | Option<'identified_case'>
    // safe_referrals/cal_total_safe_referrals [calculate] Загальна кількість балів за блок
    cal_total_safe_referrals: string
    // advocacy/what_advocacy [select_one] 1. Що таке адвокація?
    what_advocacy: undefined | Option<'what_advocacy'>
    // advocacy/effective_advocacy_requires [select_one] 2. Ефективна адвокація вимагає чіткого розуміння проблеми, зацікавлених сторін та контексту.
    effective_advocacy_requires: undefined | Option<'reducing_protection_risks'>
    // advocacy/problem_tree_advocacy [select_one] 3. Для чого використовується дерево проблем в адвокації?
    problem_tree_advocacy: undefined | Option<'problem_tree_advocacy'>
    // advocacy/advocacy_goal [select_one] 4. Ціль адвокації повинна чітко визначати щодо вирішення проблеми наступне: що зміниться, хто здійснить ці зміни, коли зміни відбудуться і як вони позитивно вплинуть на людей.
    advocacy_goal: undefined | Option<'reducing_protection_risks'>
    // advocacy/difference_goal_objectives [select_one] 5. Яка різниця між ціллю адвокації та завданнями адвокації?
    difference_goal_objectives: undefined | Option<'difference_goal_objectives'>
    // advocacy/power_mapping_advocacy [select_one] 6. Для чого використовується картування динаміки влади в адвокації?
    power_mapping_advocacy: undefined | Option<'power_mapping_advocacy'>
    // advocacy/get_message_influence [select_multiple] 7. Як ви можете донести свою думку та вплинути на тих, хто є уповноваженими приймати рішення?
    get_message_influence: undefined | Option<'get_message_influence'>[]
    // advocacy/cal_total_advocacy [calculate] Загальна кількість балів за блок
    cal_total_advocacy: string
    // pfa/elements_define_pfa [select_multiple] 1. Які цілі визначають Першу психологічну допомогу (ППД)?
    elements_define_pfa: undefined | Option<'elements_define_pfa'>[]
    // pfa/everyone_stressful_situatuon [select_one] 2. Кожен, хто переживає стресову ситуацію, потребує ППД.
    everyone_stressful_situatuon: undefined | Option<'reducing_protection_risks'>
    // pfa/automatic_reactions_situation [select_multiple] 3. Якими існують автоматичні реакції на надзвичайно стресові ситуації?
    automatic_reactions_situation: undefined | Option<'automatic_reactions_situation'>[]
    // pfa/pfa_counselling_psychotherapy [select_one] 4. ППД - це форма консультування або психотерапії.
    pfa_counselling_psychotherapy: undefined | Option<'reducing_protection_risks'>
    // pfa/technique_active_listening [select_multiple] 5. Які існують техніки активного слухання?
    technique_active_listening: undefined | Option<'technique_active_listening'>[]
    // pfa/key_elements_pfa [select_one] 6. Які три ключові елементи ППД?
    key_elements_pfa: undefined | Option<'key_elements_pfa'>
    // pfa/more_help_better [select_one] 7. Під час ППД, чим більше ми допомагаємо, тим краще.
    more_help_better: undefined | Option<'more_help_better'>
    // pfa/prevent_further_harm [select_multiple] 8. Щоб запобігти подальшій шкоді, нам потрібно уникати:
    prevent_further_harm: undefined | Option<'prevent_further_harm'>[]
    // pfa/pfa_question [select_one] Запитання
    pfa_question: undefined | Option<'relevant_skills_pfa'>
    // pfa/practised_providing_pfa [select_one] 9. Я практикував надання першої психологічної допомоги (ППД) людині, яка перебувала у стресі
    practised_providing_pfa: undefined | Option<'relevant_skills_pfa'>
    // pfa/feel_confident_pfa [select_one] 10. Я відчуваю себе впевнено, коли надаю ППД
    feel_confident_pfa: undefined | Option<'relevant_skills_pfa'>
    // pfa/relevant_skills_pfa [select_one] 11. Я знаю про відповідні соціальні навички, які є фундаментальними для надання ППД
    relevant_skills_pfa: undefined | Option<'relevant_skills_pfa'>
    // pfa/cal_total_pfa [calculate] Загальна кількість балів за блок
    cal_total_pfa: string
    // pseah/sex_anyone_over_16 [select_one] 1. Чи це нормально мати секс з будь ким, кому 17 років, якщо вік сексуальної згоди з 16 років
    sex_anyone_over_16: undefined | Option<'staff_respect'>
    // pseah/idp_same_standards_sexual [select_one] 2. Внутрішньо переміщена особа, яка працює в гуманітарній організації, повинна дотримуватися таких самих стандартів поведінки сексуального характеру, як і будь-який інший представник гуманітарної організації
    idp_same_standards_sexual: undefined | Option<'staff_respect'>
    // pseah/anything_recipients_assistance [select_one] 3. Волонтери або особи, які представляють гуманітарну організацію, мають право просити/пропонувати щось від отримувачів допомоги в обмін на допомогу, яку надає організація?
    anything_recipients_assistance: undefined | Option<'staff_respect'>
    // pseah/afterwork_nobody_business [select_one] 4. Чим волонтери або ті, хто представляє гуманатрну організацію займаються після роботи – це нікого не стосується
    afterwork_nobody_business: undefined | Option<'staff_respect'>
    // pseah/sex_with_sexworkers [select_one] 5. Чи припустимо для волонтерів або представників гуманітарних організацій мати секс із секс-працівниками, якщо це легально у відповідній країні?
    sex_with_sexworkers: undefined | Option<'staff_respect'>
    // pseah/sexual_exploitation_abuse [select_one] 6. Чи повинен я повідомляти про підозри, чутки та заяви про те, що волонтери або інші представники гуманітарної організації чи пов'язані з нею партнери (гуманітарні працівники) займаються сексуальною експлуатацією та насильством, навіть якщо я не впевнений, що ці звинувачення правдиві?
    sexual_exploitation_abuse: undefined | Option<'staff_respect'>
    // pseah/sexual_relations_beneficiary [select_one] 7. Сексуальні стосунки між отримувачами допомоги та волонтерами гуманітарної організації або іншими представниками організації заборонені
    sexual_relations_beneficiary: undefined | Option<'staff_respect'>
    // pseah/volunteer_power_influence [select_one] 8. Волонтер або інший представник гуманітарної організації має владу та вплив в очах отримувача допомоги
    volunteer_power_influence: undefined | Option<'staff_respect'>
    // pseah/witnessed_sexual_comment [select_one] 9. Якщо ви стали свідком того як волонтер або інший представник гуманітарної організації зробив бенефіціару жартівливий коментар сексуального характеру, чи потрібно повідомляти про це, якщо це був просто жарт?
    witnessed_sexual_comment: undefined | Option<'staff_respect'>
    // pseah/cal_total_pseah [calculate] Загальна кількість балів за блок
    cal_total_pseah: string
    // group_facilitation_skills/techniques_active_listening [select_multiple] 1) Назвіть прийоми активного слухання
    techniques_active_listening: undefined | Option<'techniques_active_listening'>[]
    // group_facilitation_skills/what_empathy [select_one] 2) Що таке емпатія?
    what_empathy: undefined | Option<'what_empathy'>
    // group_facilitation_skills/talking_distress_avoid [select_multiple] 3) Під час розмови з людиною, яка перебуває в емоційному стресі, щоб не зашкодити, нам потрібно уникати:
    talking_distress_avoid: undefined | Option<'talking_distress_avoid'>[]
    // group_facilitation_skills/key_characteristics_team [select_one] 4) Ключова характеристика групи
    key_characteristics_team: undefined | Option<'key_characteristics_team'>
    // group_facilitation_skills/skills_good_leader [select_multiple] 5) Ключові навички хорошого лідера
    skills_good_leader: undefined | Option<'skills_good_leader'>[]
    // group_facilitation_skills/facilitator_not_expert [select_one] 6) Фасилітатор - не є експертом з теми обговорення, а є експертом у проведенні групової роботи. Він створює умови для продуктивної дискусії, допомагає уникнути конфліктів, підтримує учасників у досягненні консенсусу.
    facilitator_not_expert: undefined | Option<'reducing_protection_risks'>
    // group_facilitation_skills/what_facilitator [select_multiple] 7) Фасилітатор -
    what_facilitator: undefined | Option<'what_facilitator'>[]
    // group_facilitation_skills/cal_total_group_facilitation_skills [calculate] Загальна кількість балів за блок
    cal_total_group_facilitation_skills: string
    // roles_responsibilities_cbs/cbs_roles [select_one] 1) Захист на рівні громад (ЗРГ) — це:
    cbs_roles: undefined | Option<'cbs_roles'>
    // roles_responsibilities_cbs/following_principles_cbs [select_multiple] 2) Які з наведених є принципами програм у сфері ЗРГ?
    following_principles_cbs: undefined | Option<'following_principles_cbs'>[]
    // roles_responsibilities_cbs/cbs_include [select_multiple] 3) До місцевих громадських об’єднань (МГО) можуть входити…
    cbs_include: undefined | Option<'cbs_include'>[]
    // roles_responsibilities_cbs/responsibilities_cbs_inclusiveness [select_one] 4) Один із обов’язків МГО — забезпечення інклюзивності, підзвітності громаді та врахування думок вразливих груп.
    responsibilities_cbs_inclusiveness: undefined | Option<'reducing_protection_risks'>
    // roles_responsibilities_cbs/key_roles_cbs [select_multiple] 5) Які ключові ролі ДРБ у ЗРГ?
    key_roles_cbs: undefined | Option<'key_roles_cbs'>[]
    // roles_responsibilities_cbs/shared_responsibility_cbs [select_one] 6) Спільна відповідальність у ЗРГ означає, що МГО діють самостійно, а ДРБ лише спостерігає
    shared_responsibility_cbs: undefined | Option<'reducing_protection_risks'>
    // roles_responsibilities_cbs/cal_total_roles_responsibilities_cbs [calculate] Загальна кількість балів за блок
    cal_total_roles_responsibilities_cbs: string
    // leadership_self_organization/leadership_primarily [select_one] 1) Лідерство у сфері захисту на рівні громад передусім означає:
    leadership_primarily: undefined | Option<'leadership_primarily'>
    // leadership_self_organization/leadership_values [select_multiple] 2) Які з наведених є ключовими цінностями лідерства?
    leadership_values: undefined | Option<'leadership_values'>[]
    // leadership_self_organization/gender_leadership_considers [select_one] 3) Гендерно- та віково-чутливе лідерство враховує потреби жінок, людей старшого віку, осіб з інвалідністю та меншин
    gender_leadership_considers: undefined | Option<'reducing_protection_risks'>
    // leadership_self_organization/types_power_protection [select_multiple] 4) Які типи влади важливі у сфері захисту?
    types_power_protection: undefined | Option<'types_power_protection'>[]
    // leadership_self_organization/leadership_protection_work [select_multiple] 5) Які навички є прикладами лідерських у сфері захисту?
    leadership_protection_work: undefined | Option<'leadership_protection_work'>[]
    // leadership_self_organization/successful_team_balanced [select_one] 6) У груповій самоорганізації успішна команда спирається на збалансовані ролі, структуру та підзвітність
    successful_team_balanced: undefined | Option<'reducing_protection_risks'>
    // leadership_self_organization/smart_goals [select_multiple] 7) SMART-цілі мають бути:
    smart_goals: undefined | Option<'smart_goals'>[]
    // leadership_self_organization/adaptive_thinking_solving [select_one] 8) Адаптивне мислення у вирішенні проблем означає:
    adaptive_thinking_solving: undefined | Option<'adaptive_thinking_solving'>
    // leadership_self_organization/cal_total_leadership_self_organization [calculate] Загальна кількість балів за блок
    cal_total_leadership_self_organization: string
    // protection_risks_analysis/protection_risk [select_one] 1) Ризик у сфері захисту означає
    protection_risk: undefined | Option<'protection_risk'>
    // protection_risks_analysis/types_protection_risks [select_multiple] 2) Які з наведених є типами ризиків у сфері захисту?
    types_protection_risks: undefined | Option<'types_protection_risks'>[]
    // protection_risks_analysis/three_elements_risk [select_one] 3) Загроза, вразливість і спроможність — це три ключові елементи аналізу ризиків у сфері захисту
    three_elements_risk: undefined | Option<'reducing_protection_risks'>
    // protection_risks_analysis/examples_threats_protection [select_multiple] 4) Прикладами загроз у сфері захисту є:
    examples_threats_protection: undefined | Option<'examples_threats_protection'>[]
    // protection_risks_analysis/vulnerability_refers [select_one] 5) Вразливість означає:
    vulnerability_refers: undefined | Option<'vulnerability_refers'>
    // protection_risks_analysis/examples_reduce_risks [select_multiple] 6) Які приклади спроможностей громади знижують ризики у сфері захисту?
    examples_reduce_risks: undefined | Option<'examples_reduce_risks'>[]
    // protection_risks_analysis/reducing_protection_risks [select_one] 7) Зменшення ризиків у сфері захисту потребує зниження загроз, зменшення вразливостей та/або посилення спроможностей
    reducing_protection_risks: undefined | Option<'reducing_protection_risks'>
    // protection_risks_analysis/stakeholder_analysis_protection [select_one] 8) Аналіз зацікавлених сторін у сфері захисту означає:
    stakeholder_analysis_protection: undefined | Option<'stakeholder_analysis_protection'>
    // protection_risks_analysis/cal_total_protection_risks_analysis [calculate] Загальна кількість балів за блок
    cal_total_protection_risks_analysis: string
    // feedback/satisfied_training [select_one] Чи задоволені ви проведеним тренінгом?
    satisfied_training: undefined | Option<'overall_satisfied'>
    // feedback/satisfied_training_bad [text] Якщо “Незадоволений”, будь ласка, прокоментуйте, чому
    satisfied_training_bad: string | undefined
    // feedback/overall_satisfied [select_one] Наскільки ви задоволені навчальними матеріалами на сьогоднішній день?
    overall_satisfied: undefined | Option<'overall_satisfied'>
    // feedback/overall_satisfied_bad [text] Якщо “Незадоволений”, будь ласка, прокоментуйте, чому
    overall_satisfied_bad: string | undefined
    // feedback/useful_training [select_one] Наскільки корисним був тренінг для покращення ваших знань та навичок у цій темі?
    useful_training: undefined | Option<'useful_training_gffo'>
    // feedback/useful_training_gffo [select_one] Наскільки корисним був тренінг для покращення ваших знань, розуміння та навичок у вашій роботі з надання допомоги постраждалим від мін та вибухонебезпечних предметів та особам з інвалідністю?
    useful_training_gffo: undefined | Option<'useful_training_gffo'>
    // feedback/useful_training_bad [text] Якщо “Дещо корисний” або "Некорисний", будь ласка, прокоментуйте, чому
    useful_training_bad: string | undefined
    // feedback/rate_facilitator [select_one] Як ви оцінюєте діяльність фасилітатора?
    rate_facilitator: undefined | Option<'rate_facilitator'>
    // feedback/rate_facilitator_bad [text] Якщо “Задовільно” або "Погано", будь ласка, прокоментуйте, чому
    rate_facilitator_bad: string | undefined
    // feedback/trainer_answers [select_one] Чи відповідав тренер на ваші запитання? (пов'язані з тренінгом або з будь-якою іншою гуманітарною допомогою)
    trainer_answers: undefined | Option<'staff_respect'>
    // feedback/trainer_answers_no [text] Якщо “Ні”, будь ласка, прокоментуйте, чому
    trainer_answers_no: string | undefined
    // feedback/staff_respect [select_one] Чи вважаєте Ви, що співробітники ДРБ під час проведення сесій ставились до Вас з повагою?
    staff_respect: undefined | Option<'staff_respect'>
    // feedback/staff_respect_no [text] Якщо “Ні”, будь ласка, прокоментуйте, чому
    staff_respect_no: string | undefined
    // feedback/give_complaint_feedback [select_one] Чи пояснили Вам, як Ви можете подати скаргу/відгук або поставити запитання щодо допомоги?
    give_complaint_feedback: undefined | Option<'give_complaint_feedback'>
    // feedback/comments [text] Вкажіть у цьому полі будь-які рекомендації щодо покращення тренінгу та/або теми, які варто було б розглянути більш детально, якщо це доречно:
    comments: string | undefined
  }
  export const options = {
    location: {
      chernihivska: `Чернігівська`,
      sumska: `Сумська`,
      kharkivska: `Харківська`,
      donetska: `Донецька`,
      dnipropetrovska: `Дніпропетровська`,
      zaporizka: `Запорізька`,
      mykolaivska: `Миколаївська`,
      khersonska: `Херсонська`,
      other: `Інша`,
    },
    topic: {
      hum_pri_pro_main: `Гуманітарні принципи, принципи соціально-правового захисту та включення питань соціально-правового захисту у програмну діяльність`,
      safe_referrals: `Безпечні перенаправлення`,
      advocacy: `Адвокація`,
      pfa: `Перша психологічна допомога`,
      pseah: `Захист від сексуальної експлуатації, наруги та домагань (ЗСЕНД)`,
      group_facilitation_skills: `Основи фасилітації груп`,
      roles_responsibilities_cbs: `Ролі та обов’язки місцевих громадських об’єднань та DRC в контексті захисту на рівні громад (ЗРГ)`,
      leadership_self_organization: `Лідерські навички та навички самоорганізації у сфері ЗРГ`,
      protection_risks_analysis: `Аналіз у сфері захисту на рівні громад`,
    },
    humanitarian_principles: {
      hum_imp_neu_ind: `Гуманність, Неупередженість, Нейтралітет, Незалежність`,
      uni_inc_tra_pro: `Універсальність, Інклюзія, Прозорість, Захист`,
      imp_res_hon_tra: `Неупередженість, Повага, Чесність, Прозорість`,
    },
    staff_respect: {
      yes: `Так`,
      no: `Ні`,
    },
    reducing_protection_risks: {
      true: `Вірно`,
      false: `Невірно`,
    },
    complete_training: {
      no: `Перед тренінгом`,
      yes: `Після тренінгу`,
    },
    protection_humanitarian_action: {
      legal_advice: `Лише надання юридичних консультацій постраждалим особам`,
      ensure_safety: `Заходи для забезпечення безпеки, гідності та прав людей, запобігання подальшій шкоді, відновлення після насильства чи примусу та допомога у відстоюванні прав`,
      advocacy_campaign: `Організація виключно адвокаційних кампаній`,
    },
    protection_mainstreaming_described: {
      delivering: `Надання продуктової та непродуктової допомоги, а також допомоги у сфері житла для постраждалого населення відповідно до міжнародних стандартів`,
      informing: `Інформування постраждалого населення про права та як їх реалізувати`,
      incorporating: `Інтегрування принципів соціально-правового захисту та просування реального доступу, безпеки та гідності у гуманітарній допомозі`,
    },
    elements_protection_mainstreaming: {
      prioritise_safety: `Пріоритезація безпеки та гідності, а також запобігання заподіянню шкоди; Реальний доступ; Підзвітність; Участь та Розширення прав та можливостей`,
      accountability_transparency: `Підзвітність; Прозорість та чесність; Різнопланове залучення всіх організацій; Гуманітарна локалізація`,
      dignified_efficient: `Ефективні інтервенції, засновані на гідності; Просування розбудови потенціалу місцевих організацій; Інклюзія та багатоманітність; Негайні дії`,
    },
    understanding_referral_humanitarian: {
      connecting_person: `З’єднання людини, яка потребує допомоги, з відповідними послугами на основі її поінформованої згоди`,
      recommending_services: `Рекомендація послуг без обговорення з людиною`,
      calling_emergency_services: `Виклик екстрених служб`,
      telling_someone: `Направлення людини кудись без подальших дій`,
    },
    referral_considered_safe: {
      based_needs: `Базується на потребах та поінформованій згоді людини`,
      shared_many_actor: `Поширюється якомога більшій кількості акторів для забезпечення швидкості`,
      made_without_consent: `Здійснюється без згоди, якщо ви вважаєте, що це буде корисно`,
      only_think: `Базується лише на вашому баченні, що буде краще для людини`,
    },
    guiding_principles_referrals: {
      do_no_harm: `Не нашкодь`,
      integrity: `Доброчесність`,
      sensitivity: `Чутливість`,
      confidentiality: `Конфіденційність`,
      credibility: `Достовірність`,
      impartiality_objectivity: `Неупередженість/Об’єктивність`,
      informed_consent: `Інформована згода`,
      need_know: `Потреба знати/мати інформацію`,
      data_protection: `Захист даних`,
      all: `Все з переліченого`,
      none: `Нічого з переліченого`,
    },
    correct_referral_process: {
      pri_ref_ser_map: `Пріоретизація, Перенаправлення, Мапування послуг`,
      ref_ser_map_pri: `Перенаправлення, Мапування послуг, Пріоретизація`,
      ser_map_pri_ref: `Мапування послуг, Пріоретизація, Перенаправлення`,
    },
    sign_posting_humanitarian: {
      physically_escorting: `Фізичний супровід людини до постачальника послуг`,
      giving_information: `Надання людині чіткої та достовірної інформації про послуги та про те, як/де ними скористатися`,
      referring_someone: `Формальне перенаправлення з письмовою згодою та заповненими формами`,
      recording_person_data: `Збір персональних даних і передача їх партнерам`,
    },
    key_vulnerable_groups: {
      women_girl: `Жінки та дівчата`,
      pwd: `Особи з інвалідністю`,
      elderly_persons: `Літні люди`,
      children: `Діти, особливо ті, які перебувають без супроводу`,
      men_urban: `Чоловіки, які проживають у містах`,
      ethnic_minorities: `Національні спільноти (меншини) та внутрішньо переміщені особи`,
    },
    referrals_personal_data: {
      detailed: `Бути настільки детальними, наскільки можливо`,
      basic_personal_data: `Містити базові персональні дані, включно з ім’ям, датою народження, контактами, адресою і т.п.`,
      anonymized: `Бути знеособленими (анонімними), окрім випадків, коли доступ до персональних даних є вкрай важливим`,
    },
    identified_case: {
      refer_immediately: `Негайно перенаправити, незалежно від згоди особи`,
      much_personal_data: `Зібрати якомога більше персональних даних і передати партнерам`,
      discuss_available_services: `Обговорити з людиною доступні послуги та отримати її поінформовану згоду перед перенаправленням`,
      ask_colleague: `Попросити колегу зробити це за вас`,
    },
    overall_satisfied: {
      very_satisfied: `Дуже задоволений`,
      satisfied: `Задоволений`,
      not_satisfied: `Незадоволений`,
    },
    useful_training_gffo: {
      very_useful: `Дуже корисний`,
      useful: `Корисний`,
      somewhat_useful: `Дещо корисний`,
      not_useful: `Некорисний`,
    },
    rate_facilitator: {
      excellent: `Відмінно`,
      good: `Добре`,
      adequate: `Задовільно`,
      poor: `Погано`,
    },
    give_complaint_feedback: {
      yes: `Так`,
      no: `Ні`,
      pns: `Не бажає розголошувати`,
    },
    what_advocacy: {
      technique_used: `Методика, яка використовується для маркетингу продуктів і послуг.`,
      fundraising_strategy: `Стратегія залучення коштів для неприбуткових організацій.`,
      means_change: `Засіб досягнення змін в управлінні, підходах, владі, соціальних відносинах та інституційних функціях.`,
      process_community: `Процес розвитку підтримки в громаді та підвищення обізнаності щодо ключових питань.`,
    },
    problem_tree_advocacy: {
      identify_visualize: `Визначити та візуалізувати першопричини та наслідки проблеми.`,
      track_progress: `Відстежувати прогрес адвокаційних зусиль у часі.`,
      map_community: `Скласти карту ресурсів та активів громади.`,
      organize_community: `Організовувати громадські заходи та активності.`,
    },
    difference_goal_objectives: {
      big_change: `Ціль адвокації - це велика зміна, яку ми хочемо здійснити. Адвокаційні завдання - це маленькі кроки, які нам потрібно зробити, щоб досягти цілі.`,
      written_community: `Ціль адвокації формулюється громадою. Завдання адвокації визначають зацікавлені сторони.`,
      written_advocacy: `Ціль адвокації пишеться перед проведенням адвокації. Адвокаційні завдання пишуться після проведення адвокації.`,
      public_advocacy: `Ціллю адвокації є публічна адвокація. Адвокаційні завдання - це приватна адвокація.`,
    },
    power_mapping_advocacy: {
      create_maps: `Створити детальні карти ресурсів та послуг громади.`,
      identify_key: `Визначити ключові зацікавлені сторони та їхній вплив на проблему.`,
      develop_awareness: `Розробити інформаційні матеріали для адвокаційних кампаній.`,
    },
    get_message_influence: {
      face_to_face: `Особисті зустрічі`,
      advocacy: `Адвокаційні брифінги та звіти`,
      media: `ЗМІ`,
      developing_partnerships: `Розвиток партнерства/коаліцій/альянсів`,
      conferences: `Конференції/заходи`,
      all: `Все перераховане вище`,
    },
    elements_define_pfa: {
      human_response: `Сформувати відчуття зв'язку з іншими людьми.`,
      helping_person: `Допомогти людині відчути спокій і підтримку`,
      identify_immidiate: `Визначити нагальні та невідкладні потреби`,
      all: `Все вищезазначене`,
    },
    automatic_reactions_situation: {
      talking_solve: `Говорити і намагатися вирішити проблему`,
      fight_flight: `Битись, тікати, завмирати, непритомніти`,
      asking_help: `Просити про допомогу`,
      all: `Все вищезазначене`,
    },
    technique_active_listening: {
      noding: `Кивання`,
      body_language: `Відкрита мова тіла`,
      paraphrasing: `Перефразування`,
      asking_questions: `Поставити запитання`,
      interrupting: `Переривання`,
      all: `Все вищезазначене`,
    },
    key_elements_pfa: {
      linking_listening_normalization: `Встановлення зв'язків, Активне слухання, Нормалізація`,
      safety_help_person: `Безпека, Допомогти людині відчути себе спокійно, Допомогти людині впоратися`,
      look_listen_link: `Дивитись, Слухати, Встановлювати зв’язки`,
    },
    more_help_better: {
      yes: `Так, важливо допомагати, наскільки це можливо, і вирішувати проблеми людей`,
      no: `Ні, важливо надавати підтримку, але не забирати у людини сили і відчуття здатності піклуватися про себе.`,
    },
    prevent_further_harm: {
      giving_advices: `Давати поради`,
      minimizing_feeling: `Нехтувати почуттями іншої людини`,
      judging_reactions: `Засуджувати будь-які реакції`,
      asking_details: `Запитувати про деталі`,
      share_perspectives: `Ділитись власним баченням`,
      all: `Все вищезазначене`,
    },
    relevant_skills_pfa: {
      strongly_disagree: `Повністю не згоден`,
      disagree: `Не згоден`,
      agree: `Згоден`,
      strongly_agree: `Повністю згоден`,
    },
    techniques_active_listening: {
      noding: `Кивок`,
      body_language: `Відкрита мова тіла`,
      paraphrasing: `Перефразування`,
      asking_questions: `Уточнюючі запитання`,
      interrupting: `Перебивати співрозмовника`,
    },
    what_empathy: {
      experience_pain: `Відчувати біль інших людей`,
      judge_reactions: `Засуджувати реакцію людини`,
      understanding: `Розуміти, визнавати, усвідомлювати, бути чутливим до переживань іншої людини`,
    },
    talking_distress_avoid: {
      giving_advice: `Давати поради`,
      minimizing_other_feeling: `Мінімізація почуттів іншої людини`,
      judging_reactions: `Оцінка будь-яких реакцій`,
      asking_details: `Уточнюємо деталі`,
      share_perspectives: `Ділімося власними поглядами`,
      all: `Все вищезазначене`,
    },
    key_characteristics_team: {
      generally_accepted: `Учасники поділяють загальноприйняті цілі та цінності`,
      together_spontaneously: `Учасники можуть збираються спонтанно`,
      structure_instable: `Структура в основному нестійка`,
    },
    skills_good_leader: {
      motivate: `Мотивує та надихає`,
      decision_self: `Всі рішення приймає самостійно`,
      creates_safe_environment: `Створює безпечне середовище для позитивного спілкування`,
      helps_develop: `Сприяє розвитку командного духу та злагодженості`,
      all: `Все вищезазначене`,
    },
    what_facilitator: {
      create_atmosphere: `Допомагає створити атмосферу довіри та взаємоповаги.`,
      listen_reflect: `Прислухається до думки учасників та відображає їх`,
      good_communication_skills: `Має хороші комунікативні навички`,
      all: `Все вищезазначене`,
    },
    cbs_roles: {
      humanitarian: `Гуманітарна логістична діяльність`,
      financial: `Фінансова програма допомоги`,
      sub_sector_protection: `Підсектор сектора захисту, спрямований на посилення спроможностей громад`,
      emergency_shelter: `Тип програми з надання притулку`,
    },
    following_principles_cbs: {
      localization: `Локалізація`,
      conflict_sensitivity: `Чутливість до конфлікту та принцип «не нашкодь»`,
      exclusivity_participation: `Виключення з участі`,
      human_centered: `Орієнтація на людину та інклюзивність`,
      sustainability: `Сталість`,
    },
    cbs_include: {
      idp: `Внутрішньо переміщені особи (ВПО)`,
      pwd: `Особи з інвалідністю`,
      lgbtqi: `Члени ЛГБТІК+ спільноти`,
      local_authorities: `Органи місцевої влади`,
      veterans: `Ветерани та приймаючі громади`,
    },
    key_roles_cbs: {
      technical_support: `Надавати технічну підтримку, інструменти та ресурси`,
      replace_state: `Замінювати державні органи у прийнятті рішень`,
      help_caps: `Допомагати розробляти та впроваджувати Плани дій громад (ПДГ)`,
      capacity_development: `Підтримувати розвиток потенціалу МГО`,
      quality_activities: `Моніторити та забезпечувати якість заходів`,
    },
    leadership_primarily: {
      commanding: `Командувати й контролювати людей`,
      serving_community: `Служити громаді та будувати довіру`,
      formal_authority: `Діяти лише як формальна влада`,
      avoiding_responsibility: `Уникати відповідальності`,
    },
    leadership_values: {
      transparency_honesty: `Прозорість і чесність`,
      respect_every: `Повага до кожної людини`,
      credit_others_work: `Привласнення результатів інших`,
      responsibility_common: `Відповідальність за спільне благо`,
    },
    types_power_protection: {
      formal: `Формальна влада (посадові повноваження)`,
      informal: `Неформальна влада (довіра, авторитет)`,
      relational: `Реляційна влада (партнерства, мережі)`,
      military: `Військова сила`,
    },
    leadership_protection_work: {
      active_listening: `Активне слухання та чітка комунікація`,
      making_uncertainty: `Прийняття рішень в умовах невизначеності`,
      ignoring_conflicts: `Ігнорування конфліктів`,
      facilitation_skills: `Навички фасилітації`,
      motivation_mobilization: `Мотивація та мобілізація інших`,
    },
    smart_goals: {
      specific: `Конкретними`,
      measurable: `Вимірюваними`,
      achievable: `Досяжними`,
      relevant: `Релевантними`,
      time_bound: `Обмеженими в часі`,
      unlimited_abstract: `Необмеженими й абстрактними`,
    },
    adaptive_thinking_solving: {
      avoiding_changes: `Уникати змін і триматися однієї стратегії`,
      learning_mistakes: `Вчитися на помилках і змінювати підходи`,
      delegating_responsibility: `Передавати відповідальність зовнішнім сторонам`,
      ignoring_risks: `Ігнорувати ризики та сценарії`,
    },
    protection_risk: {
      natural_disaster: `Лише можливу природну катастрофу`,
      impact_violence: `Потенційний або фактичний вплив на людей у вигляді насильства, примусу чи умисного позбавлення`,
      inconvenience_daily_life: `Будь-яку незручність у повсякденному житті`,
      economic_difficulties: `Лише економічні труднощі`,
    },
    types_protection_risks: {
      violence: `Насильство`,
      coercion: `Примус`,
      deprivation: `Позбавлення`,
      happiness: `Щастя`,
      mobility: `Мобільність`,
    },
    examples_threats_protection: {
      armed_attacks: `Збройні напади на цивільних`,
      gbv: `Ґендерно зумовлене насильство`,
      lack_access_legal: `Відсутність доступу до правової ідентифікації`,
      celebrations_festivals: `Святкування та культурні фестивалі`,
    },
    vulnerability_refers: {
      factors: `Фактори, які роблять людину чи групу більш схильною зазнати шкоди`,
      fixed_category: `Фіксовану категорію, яка не змінюється`,
      wealth_assets: `Лише багатство й ресурси`,
      privilege_society: `Привілей у суспільстві`,
    },
    examples_reduce_risks: {
      skills_resources: `Навички та ресурси членів громади`,
      access_services: `Доступ до послуг і мобільність`,
      awareness_rights: `Обізнаність про права`,
      organization_leadership: `Організація та лідерство в громаді`,
      denial_access_information: `Позбавлення доступу до інформації`,
    },
    stakeholder_analysis_protection: {
      identifying_key_actors: `Визначення ключових акторів, їхнього впливу та інтересів у вирішенні ризиків у сфері захисту`,
      mapping_cultural_traditions: `Лише картування культурних традицій`,
      focusing_government_structures: `Зосередження виключно на державних структурах`,
      ignoring_local_organizations: `Ігнорування місцевих організацій`,
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
      date_birthday: _.date_birthday ? new Date(_.date_birthday) : undefined,
      guiding_principles_referrals: _.guiding_principles_referrals?.split(' '),
      key_vulnerable_groups: _.key_vulnerable_groups?.split(' '),
      get_message_influence: _.get_message_influence?.split(' '),
      elements_define_pfa: _.elements_define_pfa?.split(' '),
      automatic_reactions_situation: _.automatic_reactions_situation?.split(' '),
      technique_active_listening: _.technique_active_listening?.split(' '),
      prevent_further_harm: _.prevent_further_harm?.split(' '),
      techniques_active_listening: _.techniques_active_listening?.split(' '),
      talking_distress_avoid: _.talking_distress_avoid?.split(' '),
      skills_good_leader: _.skills_good_leader?.split(' '),
      what_facilitator: _.what_facilitator?.split(' '),
      following_principles_cbs: _.following_principles_cbs?.split(' '),
      cbs_include: _.cbs_include?.split(' '),
      key_roles_cbs: _.key_roles_cbs?.split(' '),
      leadership_values: _.leadership_values?.split(' '),
      types_power_protection: _.types_power_protection?.split(' '),
      leadership_protection_work: _.leadership_protection_work?.split(' '),
      smart_goals: _.smart_goals?.split(' '),
      types_protection_risks: _.types_protection_risks?.split(' '),
      examples_threats_protection: _.examples_threats_protection?.split(' '),
      examples_reduce_risks: _.examples_reduce_risks?.split(' '),
    }) as T
}
