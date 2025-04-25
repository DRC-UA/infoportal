export namespace Conflict_trainings {
export type Option<T extends keyof typeof options> = keyof (typeof options)[T]
	// Form id: arEDCmKLXgKRcxoddunFgq
	export interface T {
	    'start': string,
	    'end': string,
	  // first_name [text] First Name
  'first_name': string | undefined,
	  // last_name [text] Last Name
  'last_name': string | undefined,
	  // age [select_one] Age
  'age': undefined | Option<'age'>,
	  // gender [select_one] Gender
  'gender': undefined | Option<'gender'>,
	  // organisation [select_one] Organisation
  'organisation': undefined | Option<'organisation'>,
	  // sector_team [select_one] Sector/Team
  'sector_team': undefined | Option<'sector_team'>,
	  // office [select_one] Area/Base Office (Duty station)
  'office': undefined | Option<'office'>,
	  // organisation_other [text] If "Other Organisation " Please specify:
  'organisation_other': string | undefined,
	  // role_organisation [select_one] Role in Organisation
  'role_organisation': undefined | Option<'role_organisation'>,
	  // first_training [select_one] First training on Conflict Sensitivity
  'first_training': undefined | Option<'first_training'>,
	  // training_format [select_one] Training Format
  'training_format': undefined | Option<'training_format'>,
	  // training_duration [select_one] Training Duration
  'training_duration': undefined | Option<'training_duration'>,
	}
export const options = {
age: {
	'bellow_30y': `Below 30 years old`,
	'30_40y': `30-40 years old`,
	'40_50y': `40-50 years old`,
	'above_50y': `Above 50 years old`
},
gender: {
	'female': `Female`,
	'male': `Male`,
	'other': `Other`,
	'pns': `Prefer not to say`
},
organisation: {
	'drc': `DRC`,
	'other': `Other Organisation`
},
sector_team: {
	'hdp': `HDP`,
	'ecrec': `Economic Recovery`,
	'shelter': `Shelter & Settlement`,
	'protection': `Protection`,
	'meal': `MEAL`,
	'partnership': `Partnership`,
	'support': `Support Services`,
	'bn': `Basic Needs Team`
},
office: {
	'kyiv': `Kyiv (CO)`,
	'chernihiv': `Chernihiv`,
	'sumy': `Sumy`,
	'kharkiv': `Kharkiv`,
	'mykolaiv': `Mykolaiv`,
	'kherson': `Kherson`,
	'ivankiv': `Ivankiv`,
	'sloviansk': `Sloviansk`,
	'dnipro': `Dnipro`
},
role_organisation: {
	'manager': `Manager Role / Non-manager Role`,
	'support': `Support / Program Role`
},
first_training: {
	'yes': `Yes`,
	'no': `No`
},
training_format: {
	'offline': `Offline`,
	'online': `Online`
},
training_duration: {
	'half_day': `Half-day`,
	'1_2days': `1-2 days`,
	'3days': `3 days`
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