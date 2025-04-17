export namespace Pseah_coc {
export type Option<T extends keyof typeof options> = keyof (typeof options)[T]
	// Form id: akSzE5JsNbepkCQ5Hs7WXV
	export interface T {
	    'start': string,
	    'end': string,
	  // not_hello [note] Ми дякуємо, що ви пройшли тренінг з нами щодо Кодексу Поведінки та/або Захисту відсексуальної експлуатації, наруги та домагань (ЗСЕНД).DRC - організація, яка захищає найбільш вразливі верстви населення, відстоює їхні права та надає їм можливості для кращого майбутнього.  Щоб ваша участь була зарахована, будь ласка, заповніть цю форму і надішліть вашу відповідь.
  'not_hello': string,
	  // name [text] Прізвище та ім'я
  'name': string | undefined,
	  // position [text] Ваша посада
  'position': string | undefined,
	  // email [text] E-mail
  'email': string | undefined,
	  // participant_category [select_one] Категорія учасника
  'participant_category': undefined | Option<'participant_category'>,
	  // name_operation [select_one] Операційна діяльність
  'name_operation': undefined | Option<'name_operation'>,
	  // type_training [select_one] Тип тренінгу
  'type_training': undefined | Option<'type_training'>,
	  // office_staff_trained [select_one] Територія/базовий офіс, де працює персонал, який пройшов навчання
  'office_staff_trained': undefined | Option<'office_staff_trained'>,
	  // office_staff_trained_other [text] Якщо ''інше'', будь ласка, поясніть
  'office_staff_trained_other': string | undefined,
	  // modality_training [select_one] Модальність тренінгу
  'modality_training': undefined | Option<'modality_training'>,
	  // trainer_training [select_one] Будь ласка, оберіть тренера, який/яка проводив тренінг
  'trainer_training': undefined | Option<'trainer_training'>,
	  // feedback/overall_satisfied [select_one] Загалом, наскільки ви задоволені навчальними матеріалами на сьогоднішній день?
  'overall_satisfied': undefined | Option<'overall_satisfied'>,
	  // feedback/useful_training [select_one] Наскільки корисним був тренінг для покращення ваших знань та навичок у питаннях протидії порушенням Кодексу Поведінки та Політики ЗСЕНД (PSEAH)
  'useful_training': undefined | Option<'useful_training'>,
	  // feedback/rate_facilitator [select_one] Як ви оцінюєте діяльність фасилітатора?
  'rate_facilitator': undefined | Option<'rate_facilitator'>,
	  // feedback/provide_suggestions [text] Надайте ваші пропозиції щодо покращення його/її діяльності, якщо такі є:
  'provide_suggestions': string | undefined,
	  // feedback/overall_training_relevant [select_one] Загалом, чи були тематичні дослідження та приклади, використані під час тренінгу, актуальними для вашої роботи?
  'overall_training_relevant': undefined | Option<'overall_training_relevant'>,
	  // feedback/complaint_feedback_questions [select_one] Чи відомо Вам, яким чином і куди Ви могли б адресувати свої пропозиції, відгуки або скарги, пов'язані з роботою Данської ради у справах біженців у разі їх виникнення?
  'complaint_feedback_questions': undefined | Option<'report_employee_requested'>,
	  // feedback/report_employee_requested [select_one] Чи знаєте Ви, куди і як повідомити, якщо працівник Данської Ради у справах Біженців пропонував (або вимагав) щось в обмін на отримання допомоги, чи змусив Вас почуватися незручно або поводився неналежним чином?
  'report_employee_requested': undefined | Option<'report_employee_requested'>,
	  // feedback/comments [text] Вкажіть у цьому полі будь-які рекомендації щодо покращення тренінгу та/або теми, які варто було б розглянути більш детально, якщо це доречно:
  'comments': string | undefined,
	}
export const options = {
participant_category: {
	'io_support': `Команда  Підтримки / International Operation - Support`,
	'io_management': `Команда Управління / International Operation - Management`,
	'io_programme': `Програмна Команда / International Operation -  Programme`,
	'irregular_workers': `Непостійні співробітники / International Operations - Irregular Workers`
},
type_training: {
	'coc_employees_1h': `Кодекс поведінки - Співробітники (1 год)`,
	'coc_employees_2h': `Кодекс поведінки - Співробітники (2 год)`,
	'coc_employees_3h': `Кодекс поведінки - Співробітники (3 год)`,
	'coc_employees_4h': `Кодекс поведінки - Працівники (4 год)`,
	'coc_managers': `Кодекс поведінки для керівників`,
	'pseah': `PSEAH (ЗСЕНД)`
},
office_staff_trained: {
	'dnipro': `Дніпро`,
	'kharkiv': `Харків`,
	'sloviansk': `Слов'янськ`,
	'mykolaiv': `Миколаїв`,
	'kyiv': `Київ`,
	'ivankiv': `Іванків`,
	'sumy': `Суми`,
	'chernihiv': `Чернігів`,
	'ichna': `Ічня`,
	'other': `Інша локація офісу DRC`
},
modality_training: {
	'online': `Онлайн`,
	'inperson': `Персонально (Офлайн)`
},
name_operation: {
	'ukraine': `Україна`
},
trainer_training: {
	'dmytro_skopienkov': `Дмитро Скопєнков`,
	'inna_naiborodina': `Інна Найбородіна`,
	'veronika_kudlaienko': `Вероніка Кудлаєнко`,
	'ihor_tereshchenko': `Ігор Терещенко`,
	'mariia_hrodska': `Марія Гродська`,
	'olga_nasieka': `Ольга Насєка`,
	'anastasiia_rezvin': `Анастасія Резвін`,
	'andrii_terokhin': `Андрій Тєрьохін`,
	'yevhen_bolotskyi': `Євген Болотцький`,
	'taras_stomin': `Тарас Стомін`,
	'vitalii_murai': `Віталій Мурай`,
	'oleksii_reshetnikov': `Олексій Решетніков;`,
	'daria_pisteleva': `Дарія Пістелева`,
	'maryna_ivanchenko': `Марина Іванченко`,
	'anna_chernukha': `Анна Чернуха`,
	'natalia_synytsia': `Наталія Синиця`,
	'natalia_trybushenko': `Наталія Трибушенко`,
	'natalia_baryshevska': `Наталія Баришевська`,
	'viktoriia_sheliekhova': `Вікторія Шелєхова`,
	'sacha_kuilman': `Sacha Kuilman`,
	'shaun_booth': `Shaun Booth`
},
report_employee_requested: {
	'yes': `Так, повністю`,
	'mostly': `Здебільшого так`,
	'not_really': `Не зовсім`,
	'not_all': `Зовсім ні`,
	'dk': `Не знаю`,
	'no_answer': `Не маю відповіді`
},
overall_satisfied: {
	'very_satisfied': `Дуже задоволений`,
	'satisfied': `Задоволений`,
	'not_satisfied': `Незадоволений`
},
useful_training: {
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
overall_training_relevant: {
	'yes': `Так`,
	'some': `Деякі`,
	'no': `Ні`
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

}) as T
}