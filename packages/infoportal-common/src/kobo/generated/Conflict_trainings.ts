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
	  // project_code [select_one] Please enter the project code
  'project_code': undefined | Option<'project_code'>,
	  // training_type [select_one] Training Type
  'training_type': undefined | Option<'training_type'>,
	}
export const options = {
project_code: {
	'UKR_000270': `UKR-000270 Pooled Funds`,
	'UKR-000304': `UKR-000304 PSPU`,
	'UKR_000306': `UKR-000306 Dutch II`,
	'UKR_000307': `UKR-000307 KG Foundation`,
	'UKR_000350': `UKR-000350 SIDA`,
	'UKR_000355': `UKR-000355 Danish MFA`,
	'UKR_000372': `UKR-000372 ECHO3`,
	'UKR_000373': `UKR-000373 Novo-Nordilsk`,
	'UKR_000378': `UKR-000378 Danish MFA`,
	'UKR_000380': `UKR-000380 DANIDA`,
	'UKR_000385': `UKR-000385 Pooled Funds`,
	'UKR_000386': `UKR-000386 Pooled Funds`,
	'UK_-000387': `UKR-000387 WRA`,
	'UKR_000388': `UKR-000388 BHA`,
	'UKR_000392': `UKR-000392 HGBF HDP`,
	'UKR_000396': `UKR-000396 Danish MFA`,
	'UKR_000397': `UKR-000397 GFFO`,
	'UKR_000398': `UKR-000398 SDC`,
	'UKR_000399': `UKR-000399 SDC3`,
	'UKR_000418': `UKR-000418 SIDA`,
	'UKR_000419': `UKR-000419 Danida SPA`,
	'UKR_000420': `UKR-000419 Danida SPA`,
	'na': `Not approved`,
	'Other': `Other`
},
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
	'partner': `Partner`,
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
},
training_type: {
	'session': `Training Session`,
	'tot': `ToT`
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