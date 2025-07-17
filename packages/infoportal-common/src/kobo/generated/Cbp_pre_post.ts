export namespace Cbp_pre_post {
export type Option<T extends keyof typeof options> = keyof (typeof options)[T]
	// Form id: aHSQ7cJKbGoBs3F5DGSf8Y
	export interface T {
	    'start': string,
	    'end': string,
	  // topic [select_one] Тема:
  'topic': undefined | Option<'topic'>,
	  // training_gffo [select_one] Чи проводиться цей тренінг за підтримки Федерального міністерства закордонних справ Німеччини (GFFO)?
  'training_gffo': undefined | Option<'staff_respect'>,
	  // date [date] Дата:
  'date': Date | undefined,
	  // unique_code [text] Унікальний код:
  'unique_code': string | undefined,
	  // date_birthday [date] Дата вашого народження:
  'date_birthday': Date | undefined,
	  // location [select_one] Локація проведення тренінгу (місто):
  'location': undefined | Option<'location'>,
	  // location_other [text] Якщо "Інше", будь ласка, вкажіть
  'location_other': string | undefined,
	  // complete_training [select_one] Чи пройшли ви тренінг?
  'complete_training': undefined | Option<'staff_respect'>,
	    'cal_pre_post': string,
	  // hum_pri_pro_mai/humanitarian_principles [select_one] 1. Якими є чотири принципи гуманітарної діяльності
  'humanitarian_principles': undefined | Option<'humanitarian_principles'>,
	  // hum_pri_pro_mai/impartiality_means [select_one] 2. Неупередженість означає, що гуманітарні організації не повинні ставати на бік військових дій або брати участь у суперечках політичного, расового, релігійного чи ідеологічного характеру.
  'impartiality_means': undefined | Option<'pfa_counselling_psychotherapy'>,
	  // hum_pri_pro_mai/protection_humanitarian_action [text] 3. Як Ви розумієте Соціально-правовий захист у гуманітарній діяльності?
  'protection_humanitarian_action': string | undefined,
	  // hum_pri_pro_mai/protection_responsibility_organisations [select_one] 4. Соціально-правовий захист є обов’язком виключно міжнародних та національних неурядових організацій:
  'protection_responsibility_organisations': undefined | Option<'pfa_counselling_psychotherapy'>,
	  // hum_pri_pro_mai/protection_mainstreaming_described [select_one] 5. Включення питань соціально-правового захисту у програмну діяльність може бути описано наступним чином
  'protection_mainstreaming_described': undefined | Option<'protection_mainstreaming_described'>,
	  // hum_pri_pro_mai/elements_protection_mainstreaming [select_one] 6. Якими є чотири основні елементи Включення питань соціально-правового захисту у програмну діяльність
  'elements_protection_mainstreaming': undefined | Option<'elements_protection_mainstreaming'>,
	  // hum_pri_pro_mai/affected_population_information [select_one] 7. Якщо постраждале населення має інформацію про існування та географію надання послуг, то вони мають реальний доступ до цих послуг:
  'affected_population_information': undefined | Option<'pfa_counselling_psychotherapy'>,
	  // safe_referrals/understanding_referral_humanitarian [text] 1. З Вашої точки зору, що є перенаправленням у гуманітарній діяльності
  'understanding_referral_humanitarian': string | undefined,
	  // safe_referrals/referral_considered_safe [select_one] 2. Перенаправлення вважається безпечним якщо воно засноване на виключно на потребах та інформованій згоді:
  'referral_considered_safe': undefined | Option<'pfa_counselling_psychotherapy'>,
	  // safe_referrals/guiding_principles_referrals [select_multiple] 3. Якими є керівні принципи для перенаправлень
  'guiding_principles_referrals': undefined | Option<'guiding_principles_referrals'>[],
	  // safe_referrals/correct_referral_process [select_one] 4. Яким є правильний порядок процесу перенаправлень
  'correct_referral_process': undefined | Option<'correct_referral_process'>,
	  // safe_referrals/sign_posting_humanitarian [text] 5. З Вашої точки зору, що є скеруванням  у гуманітарній діяльності
  'sign_posting_humanitarian': string | undefined,
	  // safe_referrals/key_vulnerable_groups [text] 6. Якими є ключові вразливі групи населення у сфері соціально-правового захисту
  'key_vulnerable_groups': string | undefined,
	  // safe_referrals/service_mapping_identifies [select_one] 7. Мапування послуг визначає прогалини у наданні послуг та спрямовує роботу над питаннями соціально-правового захисту:
  'service_mapping_identifies': undefined | Option<'pfa_counselling_psychotherapy'>,
	  // safe_referrals/not_promise_anything [select_one] 8. Нічого не обіцяти є одним з ключових моментів, які слід пам’ятати під час перенаправлення:
  'not_promise_anything': undefined | Option<'pfa_counselling_psychotherapy'>,
	  // safe_referrals/referrals_personal_data [select_one] 9. Для потреб перенаправлення, персональні дані осіб мають
  'referrals_personal_data': undefined | Option<'referrals_personal_data'>,
	  // safe_referrals/identified_case [text] 10. Якщо Ви ідентифікували справу, яка потребує безпечного прямого перенаправлення, що Вам слід зробити
  'identified_case': string | undefined,
	  // advocacy/what_advocacy [select_one] 1. Що таке адвокація?
  'what_advocacy': undefined | Option<'what_advocacy'>,
	  // advocacy/effective_advocacy_requires [select_one] 2. Ефективна адвокація вимагає чіткого розуміння проблеми, зацікавлених сторін та контексту.
  'effective_advocacy_requires': undefined | Option<'pfa_counselling_psychotherapy'>,
	  // advocacy/problem_tree_advocacy [select_one] 3. Для чого використовується дерево проблем в адвокації?
  'problem_tree_advocacy': undefined | Option<'problem_tree_advocacy'>,
	  // advocacy/advocacy_goal [select_one] 4. Ціль адвокації повинна чітко визначати щодо вирішення проблеми наступне: що зміниться, хто здійснить ці зміни, коли зміни відбудуться і як вони позитивно вплинуть на людей.
  'advocacy_goal': undefined | Option<'pfa_counselling_psychotherapy'>,
	  // advocacy/difference_goal_objectives [select_one] 5. Яка різниця між ціллю адвокації та завданнями адвокації?
  'difference_goal_objectives': undefined | Option<'difference_goal_objectives'>,
	  // advocacy/power_mapping_advocacy [select_one] 6. Для чого використовується картування динаміки влади в адвокації?
  'power_mapping_advocacy': undefined | Option<'power_mapping_advocacy'>,
	  // advocacy/get_message_influence [select_multiple] 7. Як ви можете донести свою думку та вплинути на тих, хто є уповноваженими приймати рішення?
  'get_message_influence': undefined | Option<'get_message_influence'>[],
	  // pfa/elements_define_pfa [select_multiple] 1. Які елементи визначають Першу психологічну допомогу (ППД)?
  'elements_define_pfa': undefined | Option<'elements_define_pfa'>[],
	  // pfa/everyone_stressful_situatuon [select_one] 2. Кожен, хто переживає стресову ситуацію, потребує ППД.
  'everyone_stressful_situatuon': undefined | Option<'pfa_counselling_psychotherapy'>,
	  // pfa/automatic_reactions_situation [select_multiple] 3. Якими існують автоматичні реакції на надзвичайно стресові ситуації?
  'automatic_reactions_situation': undefined | Option<'automatic_reactions_situation'>[],
	  // pfa/pfa_counselling_psychotherapy [select_one] 4. ППД - це форма консультування або психотерапії.
  'pfa_counselling_psychotherapy': undefined | Option<'pfa_counselling_psychotherapy'>,
	  // pfa/technique_active_listening [select_multiple] 5. Які існують техніки активного слухання?
  'technique_active_listening': undefined | Option<'technique_active_listening'>[],
	  // pfa/key_elements_pfa [select_one] 6. Які три ключові елементи ППД?
  'key_elements_pfa': undefined | Option<'key_elements_pfa'>,
	  // pfa/more_help_better [select_one] 7. Під час ППД, чим більше ми допомагаємо, тим краще.
  'more_help_better': undefined | Option<'more_help_better'>,
	  // pfa/prevent_further_harm [select_multiple] 8. Щоб запобігти подальшій шкоді, нам потрібно уникати:
  'prevent_further_harm': undefined | Option<'prevent_further_harm'>[],
	  // pfa/pfa_question [select_one] Запитання
  'pfa_question': undefined | Option<'relevant_skills_pfa'>,
	  // pfa/practised_providing_pfa [select_one] 9. Я практикував надання першої психологічної допомоги (ППД) людині, яка перебувала у стресі
  'practised_providing_pfa': undefined | Option<'relevant_skills_pfa'>,
	  // pfa/feel_confident_pfa [select_one] 10. Я відчуваю себе впевнено, коли надаю ППД
  'feel_confident_pfa': undefined | Option<'relevant_skills_pfa'>,
	  // pfa/relevant_skills_pfa [select_one] 11. Я знаю про відповідні соціальні навички, які є фундаментальними для надання ППД
  'relevant_skills_pfa': undefined | Option<'relevant_skills_pfa'>,
	  // pseah/sex_anyone_over_16 [select_one] 1. Чи це нормально мати секс з будь ким, кому 17 років, якщо вік сексуальної згоди з 16 років
  'sex_anyone_over_16': undefined | Option<'staff_respect'>,
	  // pseah/idp_same_standards_sexual [select_one] 2. Внутрішньо переміщена особа, яка працює в гуманітарній організації, повинна дотримуватися таких самих стандартів поведінки сексуального характеру, як і будь-який інший представник гуманітарної організації
  'idp_same_standards_sexual': undefined | Option<'staff_respect'>,
	  // pseah/anything_recipients_assistance [select_one] 3. Волонтери або особи, які представляють гуманітарну організацію, мають право просити/пропонувати щось від отримувачів допомоги в обмін на допомогу, яку надає організація?
  'anything_recipients_assistance': undefined | Option<'staff_respect'>,
	  // pseah/afterwork_nobody_business [select_one] 4. Чим волонтери або ті, хто представляє гуманатрну організацію займаються після роботи – це нікого не стосується
  'afterwork_nobody_business': undefined | Option<'staff_respect'>,
	  // pseah/sex_with_sexworkers [select_one] 5. Чи припустимо для волонтерів або представників гуманітарних організацій мати секс із секс-працівниками, якщо це легально у відповідній країні?
  'sex_with_sexworkers': undefined | Option<'staff_respect'>,
	  // pseah/sexual_exploitation_abuse [select_one] 6. Чи повинен я повідомляти про підозри, чутки та заяви про те, що волонтери або інші представники гуманітарної організації чи пов'язані з нею партнери (гуманітарні працівники) займаються сексуальною експлуатацією та насильством, навіть якщо я не впевнений, що ці звинувачення правдиві?
  'sexual_exploitation_abuse': undefined | Option<'staff_respect'>,
	  // pseah/sexual_relations_beneficiary [select_one] 7. Сексуальні стосунки між отримувачами допомоги та волонтерами гуманітарної організації або іншими представниками організації заборонені
  'sexual_relations_beneficiary': undefined | Option<'staff_respect'>,
	  // pseah/volunteer_power_influence [select_one] 8. Волонтер або інший представник гуманітарної організації має владу та вплив в очах отримувача допомоги
  'volunteer_power_influence': undefined | Option<'staff_respect'>,
	  // pseah/witnessed_sexual_comment [select_one] 9. Якщо ви стали свідком того, як волонтер або інший представник гуманітарної організації зробив бенефіціару жартівливий коментар сексуального характеру, чи не потрібно повідомляти про це, тому що це був жарт?
  'witnessed_sexual_comment': undefined | Option<'staff_respect'>,
	  // feedback/satisfied_training [select_one] Чи задоволені ви проведеним тренінгом?
  'satisfied_training': undefined | Option<'overall_satisfied'>,
	  // feedback/satisfied_training_bad [text] Якщо “Незадоволений”, будь ласка, прокоментуйте, чому
  'satisfied_training_bad': string | undefined,
	  // feedback/overall_satisfied [select_one] Наскільки ви задоволені навчальними матеріалами на сьогоднішній день?
  'overall_satisfied': undefined | Option<'overall_satisfied'>,
	  // feedback/overall_satisfied_bad [text] Якщо “Незадоволений”, будь ласка, прокоментуйте, чому
  'overall_satisfied_bad': string | undefined,
	  // feedback/useful_training [select_one] Наскільки корисним був тренінг для покращення ваших знань та навичок у цій темі?
  'useful_training': undefined | Option<'useful_training_gffo'>,
	  // feedback/useful_training_gffo [select_one] Наскільки корисним був тренінг для покращення ваших знань, розуміння та навичок у вашій роботі з надання допомоги постраждалим від мін та вибухонебезпечних предметів та особам з інвалідністю?
  'useful_training_gffo': undefined | Option<'useful_training_gffo'>,
	  // feedback/useful_training_bad [text] Якщо “Дещо корисний” або "Некорисний", будь ласка, прокоментуйте, чому
  'useful_training_bad': string | undefined,
	  // feedback/rate_facilitator [select_one] Як ви оцінюєте діяльність фасилітатора?
  'rate_facilitator': undefined | Option<'rate_facilitator'>,
	  // feedback/rate_facilitator_bad [text] Якщо “Задовільно” або "Погано", будь ласка, прокоментуйте, чому
  'rate_facilitator_bad': string | undefined,
	  // feedback/trainer_answers [select_one] Чи відповідав тренер на ваші запитання? (пов'язані з тренінгом або з будь-якою іншою гуманітарною допомогою)
  'trainer_answers': undefined | Option<'staff_respect'>,
	  // feedback/trainer_answers_no [text] Якщо “Ні”, будь ласка, прокоментуйте, чому
  'trainer_answers_no': string | undefined,
	  // feedback/staff_respect [select_one] Чи вважаєте Ви, що співробітники ДРБ під час проведення сесій ставились до Вас з повагою?
  'staff_respect': undefined | Option<'staff_respect'>,
	  // feedback/staff_respect_no [text] Якщо “Ні”, будь ласка, прокоментуйте, чому
  'staff_respect_no': string | undefined,
	  // feedback/give_complaint_feedback [select_one] Чи пояснили Вам, як Ви можете подати скаргу/відгук або поставити запитання щодо допомоги?
  'give_complaint_feedback': undefined | Option<'give_complaint_feedback'>,
	  // feedback/comments [text] Вкажіть у цьому полі будь-які рекомендації щодо покращення тренінгу та/або теми, які варто було б розглянути більш детально, якщо це доречно:
  'comments': string | undefined,
	}
export const options = {
location: {
	'chernihivska': `Чернігівська`,
	'sumska': `Сумська`,
	'kharkivska': `Харківська`,
	'donetska': `Донецька`,
	'dnipropetrovska': `Дніпропетровська`,
	'zaporizka': `Запорізька`,
	'mykolaivska': `Миколаївська`,
	'khersonska': `Херсонська`,
	'other': `Інша`
},
topic: {
	'hum_pri_pro_main': `Гуманітарні принципи, принципи соціально-правового захисту та включення питань соціально-правового захисту у програмну діяльність`,
	'safe_referrals': `Безпечні перенаправлення`,
	'advocacy': `Адвокація`,
	'pfa': `Перша психологічна допомога`,
	'pseah': `Захист від сексуальної експлуатації, наруги та домагань (ЗСЕНД)`
},
humanitarian_principles: {
	'hum_imp_neu_ind': `Гуманність, Неупередженість, Нейтралітет, Незалежність`,
	'uni_inc_tra_pro': `Універсальність, Інклюзія, Прозорість, Захист`,
	'imp_res_hon_tra': `Неупередженість, Повага, Чесність, Прозорість`
},
staff_respect: {
	'yes': `Так`,
	'no': `Ні`
},
pfa_counselling_psychotherapy: {
	'true': `Вірно`,
	'false': `Невірно`
},
protection_mainstreaming_described: {
	'delivering': `Надання продуктової та непродуктової допомоги, а також допомоги у сфері житла для постраждалого населення відповідно до міжнародних стандартів`,
	'informing': `Інформування постраждалого населення про права та як їх реалізувати`,
	'incorporating': `Інтегрування принципів соціально-правового захисту та просування реального доступу, безпеки та гідності у гуманітарній допомозі`
},
elements_protection_mainstreaming: {
	'prioritise_safety': `Пріоритезація безпеки та гідності, а також запобігання заподіянню шкоди; Реальний доступ; Підзвітність; Участь та Розширення прав та можливостей`,
	'accountability_transparency': `Підзвітність; Прозорість та чесність; Різнопланове залучення всіх організацій; Гуманітарна локалізація`,
	'dignified_efficient': `Ефективні інтервенції, засновані на гідності; Просування розбудови потенціалу місцевих організацій; Інклюзія та багатоманітність; Негайні дії`
},
guiding_principles_referrals: {
	'do_no_harm': `Не нашкодь`,
	'integrity': `Доброчесність`,
	'sensitivity': `Чутливість`,
	'confidentiality': `Конфіденційність`,
	'credibility': `Достовірність`,
	'impartiality_objectivity': `Неупередженість/Об’єктивність`,
	'informed_consent': `Інформована згода`,
	'need_know': `Потреба знати/мати інформацію`,
	'data_protection': `Захист даних`,
	'all': `Все з переліченого`,
	'none': `Нічого з переліченого`
},
correct_referral_process: {
	'pri_ref_ser_map': `Пріоретизація, Перенаправлення, Мапування послуг`,
	'ref_ser_map_pri': `Перенаправлення, Мапування послуг, Пріоретизація`,
	'ser_map_pri_ref': `Мапування послуг, Пріоретизація, Перенаправлення`
},
referrals_personal_data: {
	'detailed': `Бути настільки детальними, наскільки можливо`,
	'basic_personal_data': `Містити базові персональні дані, включно з ім’ям, датою народження, контактами, адресою і т.п.`,
	'anonymized': `Бути знеособленими (анонімними), окрім випадків, коли доступ до персональних даних є вкрай важливим`
},
overall_satisfied: {
	'very_satisfied': `Дуже задоволений`,
	'satisfied': `Задоволений`,
	'not_satisfied': `Незадоволений`
},
useful_training_gffo: {
	'very_useful': `Дуже корисний`,
	'useful': `Корисний`,
	'somewhat_useful': `Дещо корисний`,
	'not_useful': `Некорисний`
},
rate_facilitator: {
	'excellent': `Відмінно`,
	'good': `Добре`,
	'adequate': `Задовільно`,
	'poor': `Погано`
},
give_complaint_feedback: {
	'yes': `Так`,
	'no': `Ні`,
	'pns': `Не бажає розголошувати`
},
what_advocacy: {
	'technique_used': `Методика, яка використовується для маркетингу продуктів і послуг.`,
	'fundraising_strategy': `Стратегія залучення коштів для неприбуткових організацій.`,
	'means_change': `Засіб досягнення змін в управлінні, підходах, владі, соціальних відносинах та інституційних функціях.`,
	'process_community': `Процес розвитку підтримки в громаді та підвищення обізнаності щодо ключових питань.`
},
problem_tree_advocacy: {
	'identify_visualize': `Визначити та візуалізувати першопричини та наслідки проблеми.`,
	'track_progress': `Відстежувати прогрес адвокаційних зусиль у часі.`,
	'map_community': `Скласти карту ресурсів та активів громади.`,
	'organize_community': `Організовувати громадські заходи та активності.`
},
difference_goal_objectives: {
	'big_change': `Ціль адвокації - це велика зміна, яку ми хочемо здійснити. Адвокаційні завдання - це маленькі кроки, які нам потрібно зробити, щоб досягти цілі.`,
	'written_community': `Ціль адвокації формулюється громадою. Завдання адвокації визначають зацікавлені сторони.`,
	'written_advocacy': `Ціль адвокації пишеться перед проведенням адвокації. Адвокаційні завдання пишуться після проведення адвокації.`,
	'public_advocacy': `Ціллю адвокації є публічна адвокація. Адвокаційні завдання - це приватна адвокація.`
},
power_mapping_advocacy: {
	'create_maps': `Створити детальні карти ресурсів та послуг громади.`,
	'identify_key': `Визначити ключові зацікавлені сторони та їхній вплив на проблему.`,
	'develop_awareness': `Розробити інформаційні матеріали для адвокаційних кампаній.`
},
get_message_influence: {
	'face_to_face': `Особисті зустрічі`,
	'advocacy': `Адвокаційні брифінги та звіти`,
	'media': `ЗМІ`,
	'developing_partnerships': `Розвиток партнерства/коаліцій/альянсів`,
	'conferences': `Конференції/заходи`,
	'all': `Все перераховане вище`
},
elements_define_pfa: {
	'human_response': `Людська реакція на людину, яка перебуває у стресі`,
	'helping_person': `Допомогти людині відчути спокій і підтримку`,
	'identify_immidiate': `Визначити нагальні та невідкладні потреби`,
	'all': `Все вищезазначене`
},
automatic_reactions_situation: {
	'talking_solve': `Говорити і намагатися вирішити проблему`,
	'fight_flight': `Битись, тікати, завмирати, непритомніти`,
	'asking_help': `Просити про допомогу`,
	'all': `Все вищезазначене`
},
technique_active_listening: {
	'noding': `Кивання`,
	'body_language': `Відкрита мова тіла`,
	'paraphrasing': `Перефразування`,
	'asking_questions': `Поставити запитання`,
	'interrupting': `Переривання`,
	'all': `Все вищезазначене`
},
key_elements_pfa: {
	'linking_listening_normalization': `Встановлення зв'язків, Активне слухання, Нормалізація`,
	'safety_help_person': `Безпека, Допомогти людині відчути себе спокійно, Допомогти людині впоратися`,
	'look_listen_link': `Дивитись, Слухати, Встановлювати зв’язки`
},
more_help_better: {
	'yes': `Так, важливо допомагати, наскільки це можливо, і вирішувати проблеми людей`,
	'no': `Ні, важливо надавати підтримку, але не забирати у людини сили і відчуття здатності піклуватися про себе.`
},
prevent_further_harm: {
	'giving_advices': `Давати поради`,
	'minimizing_feeling': `Нехтувати почуттями іншої людини`,
	'judging_reactions': `Засуджувати будь-які реакції`,
	'asking_details': `Запитувати про деталі`,
	'share_perspectives': `Ділитись власним баченням`,
	'all': `Все вищезазначене`
},
relevant_skills_pfa: {
	'strongly_disagree': `Повністю не згоден`,
	'disagree': `Не згоден`,
	'agree': `Згоден`,
	'strongly_agree': `Повністю згоден`
}} as const

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
	date: _.date ? new Date(_.date) : undefined,
	date_birthday: _.date_birthday ? new Date(_.date_birthday) : undefined,
	guiding_principles_referrals: _.guiding_principles_referrals?.split(' '),
	get_message_influence: _.get_message_influence?.split(' '),
	elements_define_pfa: _.elements_define_pfa?.split(' '),
	automatic_reactions_situation: _.automatic_reactions_situation?.split(' '),
	technique_active_listening: _.technique_active_listening?.split(' '),
	prevent_further_harm: _.prevent_further_harm?.split(' '),
}) as T
}