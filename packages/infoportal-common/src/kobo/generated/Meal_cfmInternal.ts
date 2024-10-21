export namespace Meal_cfmInternal {
export type Option<T extends keyof typeof options> = keyof (typeof options)[T]
	// Form id: aN3Y8JeH2fU3GthrWAs9FG
	export interface T {
	    'start': string,
	    'end': string,
	  // begin_group_8qtQfwiWw/benef_origin [select_one] Beneficiary origin
  'benef_origin': undefined | Option<'benef_origin'>,
	  // begin_group_8qtQfwiWw/project_code [select_one] Please enter the project code
  'project_code': undefined | Option<'project_code'>,
	  // begin_group_8qtQfwiWw/project_code_specify [text] Please specify
  'project_code_specify': string | undefined,
	  // begin_group_8qtQfwiWw/name [text] Name
  'name': string | undefined,
	  // begin_group_8qtQfwiWw/gender [select_one] Gender
  'gender': undefined | Option<'gender'>,
	  // begin_group_8qtQfwiWw/date [date] Date
  'date': Date | undefined,
	  // begin_group_8qtQfwiWw/phone [text] Phone
  'phone': string | undefined,
	  // begin_group_8qtQfwiWw/email [text] Email
  'email': string | undefined,
	  // begin_group_8qtQfwiWw/validation_at_least_one_contact [note] <span style="border-radius: 3px; padding: 4px; color: #a94442; font-weight: bold; background: rgb(242, 222, 222)">Please fill email or phone number</span>
  'validation_at_least_one_contact': string,
	  // begin_group_8qtQfwiWw/ben_det_oblast [select_one] Select the oblast of residence
  'ben_det_oblast': undefined | Option<'ben_det_oblast'>,
	  // begin_group_8qtQfwiWw/ben_det_raion [select_one] Select the raion of residence
  'ben_det_raion': undefined | string,
	  // begin_group_8qtQfwiWw/ben_det_hromada [select_one] Select the Hromada of residence
  'ben_det_hromada': undefined | string,
	  // begin_group_8qtQfwiWw/ben_det_settlement [text] Your Settlement of residence
  'ben_det_settlement': string | undefined,
	  // begin_group_UTzxDVd8w/feedback_method [select_one] What is the method for submitting feedback?
  'feedback_method': undefined | Option<'feedback_method'>,
	  // begin_group_UTzxDVd8w/feedback_method_other [text] Please specify
  'feedback_method_other': string | undefined,
	  // begin_group_UTzxDVd8w/feedback_type [select_one] What is the Feedback Category?
  'feedback_type': undefined | Option<'feedback_type'>,
	  // begin_group_UTzxDVd8w/feedback_coc_type [note] ⚠️ Please ensure this is flagged through the appropriate CoC focal point
  'feedback_coc_type': string,
	  // begin_group_UTzxDVd8w/feedback [text] Please enter the feedback
  'feedback': string | undefined,
	}
export const options = {
undefined: {
	'yes': `Yes`,
	'no': `No`
},
benef_origin: {
	'drc': `DRC`,
	'partner': `Partner`,
	'none': `None`
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
	'UKR-000352': `UKR-000352 UHF7`,
	'UKR-000226': `UKR-000226 SDC`,
	'UKR-000230': `UKR-000230 PM WRA`,
	'UKR-000231': `UKR-000231 PM WKA`,
	'UKR-000247': `UKR-000247 FCDO`,
	'UKR-000249': `UKR-000249 Finnish MFA`,
	'UKR-000255': `UKR-000255 EU IcSP`,
	'UKR-000267': `UKR-000267 DANIDA`,
	'UKR-000269': `UKR-000269 ECHO1`,
	'UKR-000270': `UKR-000270 Pooled Funds Old (MPCA)`,
	'UKR-000276': `UKR-000276 UHF3`,
	'UKR-000284': `UKR-000284 BHA`,
	'UKR-000290': `UKR-000290 SDC Shelter`,
	'UKR-000293': `UKR-000293 French MFA`,
	'UKR-000294': `UKR-000294 Dutch I`,
	'UKR-000304': `UKR-000304 PSPU`,
	'UKR-000306': `UKR-000306 Dutch II`,
	'UKR-000309': `UKR-000309 OKF`,
	'UKR-000322': `UKR-000322 ECHO2`,
	'UKR-000330': `UKR-000330 SDC2`,
	'UKR-000340': `UKR-000340 Augustinus Fonden`,
	'UKR-000341': `UKR-000341 Hoffmans & Husmans`,
	'UKR-000342': `UKR-000342 Pooled Funds`,
	'UKR-000347': `UKR-000347 DANIDA`,
	'UKR-000363': `UKR-000363 UHF8`,
	'UKR-000355': `UKR-000355 Danish MFA`,
	'UKR-000372': `UKR-000372 ECHO3`,
	'SIDA 518-570A': `SIDA 518-570A`,
	'UKR-000370': `UKR-000370 SIDA`,
	'UKR-000378': `UKR-000378 Danish MFA`,
	'UKR-000385': `UKR-000385 Pooled Funds`,
	'UKR-000388': `UKR-000388 BHA`,
	'UKR-000396': `UKR-000396 Danish MFA`,
	'UKR-000397': `UKR-000397 GFFO`,
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
}) as T
}