export namespace Meal_cfmExternal {
export type Option<T extends keyof typeof options> = keyof (typeof options)[T]
	// Form id: aJaGLvGEdpYWk5ift8k87y
	export interface T {
	    'start': string,
	    'end': string,
	  // benef_origin [select_one] Beneficiary origin
  'benef_origin': undefined | Option<'benef_origin'>,
	  // consent [note] Зверніть увагу, що ви збираєтеся поділитися своїми особистими контактними даними, щоб фахівці DRC мали змогу відповісти на ваш запит.
  'consent': string,
	  // begin_group_QpVWZ8qgD/not_before [note] Перед заповненням даної он-лайн форми просимо ознайомитися з найбільш поширеними питаннями та відповідями стосовно діяльності Данської Ради у справах біженців:
  'not_before': string,
	  // begin_group_QpVWZ8qgD/not_assistance [note] ####Яку допомогу ви надаєте?
  'not_assistance': string,
	  // begin_group_QpVWZ8qgD/not_provide [note] ####Як отримати допомогу від DRC?
  'not_provide': string,
	  // begin_group_QpVWZ8qgD/not_decided [note] ####Як приймається рішення про те, де і коли пройде реєстрація на допомогу?
  'not_decided': string,
	  // begin_group_QpVWZ8qgD/not_registration [note] ####Просимо зауважити, що ця форма НЕ є реєстрацією на допомогу.
  'not_registration': string,
	  // begin_group_QpVWZ8qgD/not_prefer [note] ####Для отримання додаткової інформації, ви можете зателефонувати нам за номером: #### 📞 0 800 33 95 18
  'not_prefer': string,
	  // begin_group_QpVWZ8qgD/existing_beneficiary [select_one] Чи отримували ви вже якусь допомогу від DRC безпосередньо або від партнерів DRC?
  'existing_beneficiary': undefined | Option<'prot_support'>,
	  // begin_group_QpVWZ8qgD/explain_beneficiary [text] Якщо так, опишіть Вашу взаємодію за підтримки DRC
  'explain_beneficiary': string | undefined,
	  // begin_group_QpVWZ8qgD/name [text] Ім'я
  'name': string | undefined,
	  // begin_group_QpVWZ8qgD/gender [select_one] Стать
  'gender': undefined | Option<'gender'>,
	  // begin_group_QpVWZ8qgD/date [date] Дата
  'date': Date | undefined,
	  // begin_group_QpVWZ8qgD/no_phone [select_multiple] Я віддаю перевагу не надавати свій номер телефону і розумію, що може бути обмежена можливість у відповіді від команди підтримки.
  'no_phone': undefined | Option<'no_phone'>[],
	  // begin_group_QpVWZ8qgD/phone [text] Контактний номер
  'phone': string | undefined,
	  // begin_group_QpVWZ8qgD/email [text] Електронна адреса
  'email': string | undefined,
	  // begin_group_QpVWZ8qgD/ben_det_oblast [select_one] Виберіть область в якій проживаєте
  'ben_det_oblast': undefined | Option<'ben_det_oblast'>,
	  // begin_group_QpVWZ8qgD/ben_det_raion [select_one] Виберіть район в якому проживаєте
  'ben_det_raion': undefined | string,
	  // begin_group_QpVWZ8qgD/ben_det_hromada [select_one] Виберіть громаду в якій проживаєте
  'ben_det_hromada': undefined | string,
	  // begin_group_QpVWZ8qgD/ben_det_settlement [text] Населений пункт в якому проживаєте
  'ben_det_settlement': string | undefined,
	  // begin_group_eCcGd9p3r/feedback_type [select_one] Як ми можемо Вам допомогти?
  'feedback_type': undefined | Option<'feedback_type'>,
	  // begin_group_eCcGd9p3r/sub_category [select_one] Please specify Sub-Category ?
  'sub_category': undefined | Option<'sub_category'>,
	  // begin_group_eCcGd9p3r/name_event [text] Зазначте, будь ласка, НАЗВУ ЗАХОДУ (або тему чи місце проведення)
  'name_event': string | undefined,
	  // begin_group_eCcGd9p3r/thanks_feedback [text] У разі подяки, будь ласка, опишіть вид отриманої допомоги, поділіться вашими враженнями та досвідом співпраці з Данською радою у справах біженців:
  'thanks_feedback': string | undefined,
	  // begin_group_eCcGd9p3r/complaint [text] Будь ласка, надайте інформацію щодо вашої скарги
  'complaint': string | undefined,
	  // begin_group_eCcGd9p3r/prot_support [select_one] Ви готові обговорити це з нашою командою DRC, чи Ви хотіли поговорити зі спеціалістом з чутливих випадків?
  'prot_support': undefined | Option<'prot_support'>,
	  // begin_group_eCcGd9p3r/request [text] Будь ласка, надайте детальну інформацію щодо ваших потреб:
  'request': string | undefined,
	  // begin_group_eCcGd9p3r/comments [text] Коментар
  'comments': string | undefined,
	  // begin_group_eCcGd9p3r/thanks [note] Дякуємо, що пройшли опитування. Ви можете будь-коли скористатися цим інструментом зворотного зв'язку або звернутися на телефонну лінію Механізму реагування на скарги та відгуки
  'thanks': string,
	}
export const options = {
prot_support: {
	'yes': `Так`,
	'no': `Ні`
},
gender: {
	'male': `Чоловік`,
	'female': `Жінка`,
	'other': `Інше`
},
benef_origin: {
	'drc': `DRC`,
	'partner': `Partner`,
	'none': `None`
},
no_phone: {
	'dont_want': `Я не надаю свій номер телефону`
},
sub_category: {
	'activity': `1.1 Information about the activities of the DRC as an organization`,
	'loc': `1.2 Information about location or time of the next registration or distribution`,
	'criteria': `1.3 Information about the criteria for assistance programs`,
	'payment': `1.4 Information about the terms of payments from the DRC`,
	'deadline': `1.5 Information on deadlines and procedures for repair work (including money transfers)`,
	'ukrpost': `1.6 Information about Ukrposhta's operations (payment deadlines, SMS notifications, delays)`,
	'personal': `1.7 Information about changes in personal data (name, location, address, phone, status)`,
	'hh_change': `1.8 Information about changes in the household (number of members, etc.)`,
	'other_ngo': `1.9 Information about the contacts of another NGO`,
	'cash': `2.1 Request for to cash assistance`,
	'nfi': `2.2 Request for assistance related to non-food items (NFI)`,
	'food': `2.3 Request for assistance related to food items`,
	'medical': `2.4 Request for assistance related to treatment, diagnostics, medical supplies, etc.`,
	'reconstruction': `2.5 Request for assistance in housing reconstruction`,
	'business': `2.6 Request for assistance related to business grants`,
	'education': `2.7 Request for a grant for education`,
	'agriculture': `2.8 Request for support for agricultural activities`,
	'legal': `2.9 Request for legal assistance`,
	'relocation': `2.10 Request for relocation or evacuation`,
	'other': `2.11 Request for other types of assistance besides the offered one`,
	'area': `2.12 Request for activities that can be implemented by the DRC in a specific area`,
	'proj_change': `2.13 Request for changes to the implementation of the project`,
	'criteria_select': `3.1 Dissatisfaction of selection criteria`,
	'not_listed': `3.2 Not included in the lists for targeted assistance`,
	'misuse': `3.3 Authorities misuse their granted power`,
	'quality': `3.4 Dissatisfaction with the quality of assistance received`,
	'contractor': `3.5 Problems with contractors (lack of control, poor quality repairs)`,
	'house_reconstruction': `3.6 Problems with the scope of work for housing reconstruction (do not understand or do not agree with what will be done to their home, would like more serious involvement)`,
	'event': `3.7 Lack of information about upcoming events (communication issues)`,
	'registration': `3.8 Problems with registration, distribution (organizational problems)`,
	'delay': `3.9 Delay in responding (responsiveness)`,
	'amount': `3.10 Changes in the amount of assistance received`,
	'location': `3.11 Distribution point or registration location is too far, too crowded or unsafe (relevance/feeling of safety)`,
	'time': `3.12 Waiting time to receive assistance was too long (responsiveness/delays)`,
	'communication': `3.13 Language of information is unacceptable and/or offensive (communication)`,
	'training': `3.14 Problems with organizing trainings`,
	'not_include': `3.15 Not included/invited to participate in the tender process (communication/contracts)`,
	'shelling': `4.1 Affected by shelling/armed conflict/explosion`,
	'movement': `4.2 Restrictions on freedom of movement (including self-isolation)`,
	'trafficking': `4.3 Victims of human trafficking`,
	'violence': `4.4 Physical and psychological violence, including assault and abuse (non GBV)`,
	'torture': `4.5 Victim of torture and/or abirtary detention`,
	'justice': `4.6 Denied access to justice`,
	'GBV': `4.7 Gender-based violence (GBV)- including sexual, psychological, physical, socio-economic`,
	'child': `4.8 Child protection`,
	'displacement': `4.9 Forced displacement`,
	'extortion': `4.10 Extortion – a person threatening violence in order to receive money`,
	'service': `4.11 Denial of access to services`,
	'sexual': `4.12 Sexual Harrassment and sexual exploitation`,
	'occupation': `4.13 Unlawful occupation of housing, land and property`,
	'confiscation': `4.14 Confiscation of property and belongings`,
	'family': `4.15 Forced family separation`,
	'discrimination': `4.16 Discrimination and/or stigmatisation`
},
ben_det_oblast: {
	'cherkaska': `Черкаська`,
	'chernihivska': `Чернігівська`,
	'chernivetska': `Чернівецька`,
	'dnipropetrovska': `Дніпропетровська`,
	'donetska': `Донецька`,
	'ivano-frankivska': `Івано-Франківська`,
	'kharkivska': `Харківська`,
	'khersonska': `Херсонська`,
	'khmelnytska': `Хмельницька`,
	'kirovohradska': `Кіровоградська`,
	'kyivska': `Київська`,
	'luhanska': `Луганська`,
	'lvivska': `Львівська`,
	'mykolaivska': `Миколаївська`,
	'odeska': `Одеська`,
	'poltavska': `Полтавська`,
	'rivnenska': `Рівненська`,
	'crimea': `АР Крим`,
	'sumska': `Сумська`,
	'ternopilska': `Тернопільська`,
	'vinnytska': `Вінницька`,
	'volynska': `Волинська`,
	'zakarpatska': `Закарпатська`,
	'zaporizka': `Запорізька`,
	'zhytomyrska': `Житомирська`
},
feedback_type: {
	'thanks': `Я хочу висловити подяку за отриману допомогу`,
	'thanks_event': `Я хочу висловити подяку за проведений тренінг, навчальну сесію, зустріч тощо`,
	'feedback': `Я хочу залишити відгук`,
	'request': `Я хочу звернутися з проханням про допомогу`,
	'complaint': `Я хочу залишити скаргу`
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
	no_phone: _.no_phone?.split(' '),
}) as T
}