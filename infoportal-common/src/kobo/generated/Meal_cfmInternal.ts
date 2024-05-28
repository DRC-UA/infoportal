export namespace Meal_cfmInternal {
export type Option<T extends keyof typeof options> = keyof (typeof options)[T]
	// Form id: aN3Y8JeH2fU3GthrWAs9FG
	export interface T {
	    start: string,
	    end: string,
	  // begin_group_8qtQfwiWw/existing_beneficiary [select_one] Is this an existing beneficiary of DRC?
  existing_beneficiary: undefined | Option<'existing_beneficiary'>,
	  // begin_group_8qtQfwiWw/project_code [select_one] If yes, please enter the project code
  project_code: undefined | Option<'project_code'>,
	  // begin_group_8qtQfwiWw/project_code_specify [text] Please specify
  project_code_specify: string | undefined,
	  // begin_group_8qtQfwiWw/name [text] Name
  name: string | undefined,
	  // begin_group_8qtQfwiWw/gender [select_one] Gender
  gender: undefined | Option<'gender'>,
	  // begin_group_8qtQfwiWw/date [date] Date
  date: Date | undefined,
	  // begin_group_8qtQfwiWw/phone [text] Phone
  phone: string | undefined,
	  // begin_group_8qtQfwiWw/email [text] Email
  email: string | undefined,
	  // begin_group_8qtQfwiWw/validation_at_least_one_contact [note] <span style="border-radius: 3px; padding: 4px; color: #a94442; font-weight: bold; background: rgb(242, 222, 222)">Please fill email or phone number</span>
  validation_at_least_one_contact: string,
	  // begin_group_8qtQfwiWw/ben_det_oblast [select_one] Select the oblast of residence
  ben_det_oblast: undefined | Option<'ben_det_oblast'>,
	  // begin_group_8qtQfwiWw/ben_det_raion [select_one] Select the raion of residence
  ben_det_raion: undefined | string,
	  // begin_group_8qtQfwiWw/ben_det_hromada [select_one] Select the Hromada of residence
  ben_det_hromada: undefined | string,
	  // begin_group_UTzxDVd8w/feedback_method [select_one] What is the method for submitting feedback?
  feedback_method: undefined | Option<'feedback_method'>,
	  // begin_group_UTzxDVd8w/feedback_method_other [text] Please specify
  feedback_method_other: string | undefined,
	  // begin_group_UTzxDVd8w/feedback_type [select_one] What is the Feedback Category?
  feedback_type: undefined | Option<'feedback_type'>,
	  // begin_group_UTzxDVd8w/feedback_coc_type [note] ⚠️ Please ensure this is flagged through the appropriate CoC focal point
  feedback_coc_type: string,
	  // begin_group_UTzxDVd8w/feedback [text] Please enter the feedback
  feedback: string | undefined,
	}
export const options = {
existing_beneficiary: {
	'yes': `Yes`,
	'no': `No`
},
project_code: {
	'UKR_000284': `UKR-000284 BHA`,
	'UKR_000270': `UKR-000270 Pooled Funds`,
	'UKR_000298': `UKR-000298 Novo-Nordisk`,
	'UKR_000286': `UKR-000286 DMFA`,
	'UKR_000301': `UKR-000301 DANISH MoFA`,
	'UKR_000314': `UKR-000314 UHF4`,
	'UKR_000322': `UKR-000322 ECHO2`,
	'UKR_000308': `UKR-000308 UNHCR`,
	'UKR_000323': `UKR-000323 PFRU`,
	'UKR-000331': `UKR-000331 GFFO`,
	'UKR-000345': `UKR-000345 BHA2`,
	'UKR-000348': `UKR-000348 BHA3`,
	'UKR-000360': `UKR-000360 Novo-Nordisk`,
	'UKR-000336': `UKR-000336 UHF6`,
	'Other': `Other`
},
gender: {
	'male': `Male`,
	'female': `Female`,
	'other': `Other`
},
ben_det_oblast: {
	'cherkaska': `Cherkaska`,
	'chernihivska': `Chernihivska`,
	'chernivetska': `Chernivetska`,
	'dnipropetrovska': `Dnipropetrovska`,
	'donetska': `Donetska`,
	'ivano-frankivska': `Ivano-Frankivska`,
	'kharkivska': `Kharkivska`,
	'khersonska': `Khersonska`,
	'khmelnytska': `Khmelnytska`,
	'kirovohradska': `Kirovohradska`,
	'kyivska': `Kyivska`,
	'luhanska': `Luhanska`,
	'lvivska': `Lvivska`,
	'mykolaivska': `Mykolaivska`,
	'odeska': `Odeska`,
	'poltavska': `Poltavska`,
	'rivnenska': `Rivnenska`,
	'sevastopilska': `Sevastopilska`,
	'sumska': `Sumska`,
	'ternopilska': `Ternopilska`,
	'vinnytska': `Vinnytska`,
	'volynska': `Volynska`,
	'zakarpatska': `Zakarpatska`,
	'zaporizka': `Zaporizka`,
	'zhytomyrska': `Zhytomyrska`
},
feedback_method: {
	'in_person_complaint': `In person complaint`,
	'feedback_or_complaints_suggestion_box': `Feedback or complaints suggestion box`,
	'community_committee': `Community Committee`,
	'phone': `Phone`,
	'email': `Email`,
	'facebook': `Facebook`,
	'other': `Other`
},
feedback_type: {
	'apprec_com': `0. Appreciation or compliments`,
	'request_info': `1. Request for information`,
	'request_assistance': `2. Request for support or assistance`,
	'non_s_feedback': `3. Non-sensitive programmatic feedback`,
	'sen_feedback': `4. sensitive – protection issue reported`,
	'coc': `5. Sensitive CoC violation by DRC staff and representatives.`,
	'violation_other': `6. Sensitive- seriously violation by other humanitarian actor (non-drc staff)`,
	'sen_safety': `7. sensitive- safety and security threat.`
}}

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
}) as T
}