export namespace Protection_gbv {
export type Option<T extends keyof typeof options> = keyof (typeof options)[T]
	// Form id: a5Noq6Wf9a8aE2cmi74FyS
	export interface T {
	    start: string,
	    end: string,
	  // introduction/date [date] Date of activity
  date: Date | undefined,
	  // introduction/staff_to_insert_their_DRC_office [select_one] DRC office
  staff_to_insert_their_DRC_office: undefined | Option<'staff_to_insert_their_DRC_office'>,
	  // introduction/staff_code [select_one] Staff code (facilitator 1)
  staff_code: undefined | Option<'staff_code_001'>,
	  // introduction/staff_code_001 [select_one] Staff code (facilitator 2)
  staff_code_001: undefined | Option<'staff_code_001'>,
	  // introduction/project [select_one] Project code
  project: undefined | Option<'project'>,
	  // introduction/ben_det_oblast [select_one] Select oblast
  ben_det_oblast: undefined | Option<'ben_det_oblast'>,
	  // introduction/ben_det_raion [select_one] Select raion
  ben_det_raion: undefined | string,
	  // introduction/ben_det_hromada [select_one] Select hromada
  ben_det_hromada: undefined | string,
	  // introduction/ben_det_hromada_001 [text] Specify settlement/village/city neighborhood
  ben_det_hromada_001: string | undefined,
	  // introduction/location [select_one] Location
  location: undefined | Option<'location'>,
	  // introduction/location_other [text] If "Other", please specify
  location_other: string | undefined,
	  // gi/activity [select_one] Which activity have you conducted?
  activity: undefined | Option<'activity'>,
	  // gi/activity_other [text] If "Other", please specify
  activity_other: string | undefined,
	  // gi/new_ben [select_one] Are there new beneficiaries in the group activity?
  new_ben: undefined | Option<'new_ben'>,
	  // gi/new_ben_yes [integer] If yes there are new beneficairies, how many new beneficiaries in the session?
  new_ben_yes: number | undefined,
	  // gi/numb_part [integer] Number of participants
  numb_part: number | undefined,
	  // gi/hh_char_hh_det [begin_repeat] Participant
  hh_char_hh_det: {hh_char_hh_new_ben: undefined | Option<'hh_char_hh_new_ben'> | undefined,hh_char_hh_det_gender: undefined | Option<'hh_char_hh_det_gender'> | undefined,hh_char_hh_det_age: number | undefined | undefined,hh_char_hh_det_status: undefined | Option<'hh_char_hh_det_status'> | undefined}[] | undefined,
	  // gi/topic_activity [text] Topic/Type of activity
  topic_activity: string | undefined,
	  // gi/comments [text] Comments
  comments: string | undefined,
	}
export const options = {
staff_to_insert_their_DRC_office: {
	'chernihiv': `Chernihiv`,
	'dnipro': `Dnipro`,
	'kharkiv': `Kharkiv`,
	'mykolaiv': `Mykolaiv`
},
new_ben: {
	'yes': `Yes`,
	'no': `No`,
	'bno': `Both new and old beneficiaries`
},
staff_code_001: {
	'CEJ001': `CEJ-A`,
	'CEJ002': `CEJ-B`,
	'CEJ003': `CEJ-C`,
	'CEJ004': `CEJ-D`,
	'CEJ005': `CEJ-E`,
	'CEJ006': `CEJ-F`,
	'CEJ007': `CEJ-G`,
	'CEJ008': `CEJ-H`,
	'CEJ009': `CEJ-I`,
	'CEJ010': `CEJ-J`,
	'CEJ011': `CEJ-K`,
	'CEJ012': `CEJ-L`,
	'HRK001': `HRK-A`,
	'HRK002': `HRK-B`,
	'HRK003': `HRK-C`,
	'HRK004': `HRK-D`,
	'HRK005': `HRK-E`,
	'HRK006': `HRK-F`,
	'HRK007': `HRK-G`,
	'HRK008': `HRK-H`,
	'HRK009': `HRK-I`,
	'HRK010': `HRK-J`,
	'HRK011': `HRK-K`,
	'HRK012': `HRK- L`,
	'DNK001': `DNK-A`,
	'DNK002': `DNK-B`,
	'DNK003': `DNK-C`,
	'DNK004': `DNK-D`,
	'DNK005': `DNK-E`,
	'DNK006': `DNK-F`,
	'DNK007': `DNK-G`,
	'DNK008': `DNK-H`,
	'DNK009': `DNK-I`,
	'DNK010': `DNK-J`,
	'DNK011': `DNK-K`,
	'DNK012': `DNK- L`,
	'NVL001': `NLV-A`,
	'NVL002': `NLV-B`,
	'NVL003': `NLV-C`,
	'NVL004': `NLV-D`,
	'NVL005': `NLV-E`,
	'NVL006': `NLV-F`,
	'NVL007': `NLV-G`,
	'NVL008': `NLV-H`,
	'NVL009': `NLV-I`,
	'NVL010': `NLV-J`,
	'NVL011': `NLV-K`,
	'NVL012': `NLV-L`
},
project: {
	'sdc': `UKR-000330 (SDC)`,
	'bha': `UKR-000345 (BHA)`,
	'danida': `UKR-000347 (Danida)`
},
location: {
	'wgssd': `Women and Girls Safe Space (operated by DRC)`,
	'wgsso': `Women and Girls Safe Space (operated by another organisation)`,
	'logow': `Governmental collective site`,
	'lopri': `Private collective site`,
	'locso': `CSO/CBO premises`,
	'lohum': `Humanitarian hub`,
	'sash': `Safe shelter`,
	'crro': `Crisis room`,
	'dace': `Day centre`,
	'locom': `Community space`,
	'loedu': `Educational facility`,
	'rehu': `Resilience hub`,
	'gobu': `Government building/space`,
	'online': `Online`,
	'other': `Other`
},
hh_char_hh_det_gender: {
	'male': `Male`,
	'female': `Female`,
	'other': `Other`,
	'unspecified': `Unspecified`
},
activity: {
	'pssac': `PSS activiities provided outside the WGSS`,
	'wgss': `Activities provided in the WGSS, including recreational, livelihoods, vocational, information sessions`,
	'ddk': `Distribution of dignity kits (in-kind, vouchers)`,
	'gbvis': `GBV information sesssions outside the WGSS`,
	'ngbv': `Non-GBV actors trained on GBV`,
	'gbva': `GBV actors trained in GBV`,
	'gcva': `GBV survivors and those at risk supported with cash/voucher assistance.`,
	'glac': `GBV survivors and those at risk supported with legal assistance and counselling.`,
	'other': `Other`
},
hh_char_hh_new_ben: {
	'yes': `Yes`,
	'no': `No`
},
hh_char_hh_det_status: {
	'idp': `IDP`,
	'returnee': `Returnee`,
	'non-displaced': `Non-displaced`,
	'unspec': `Unspecified`,
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
	new_ben_yes: _.new_ben_yes ? +_.new_ben_yes : undefined,
	numb_part: _.numb_part ? +_.numb_part : undefined,
	hh_char_hh_det: _.hh_char_hh_det?.map(extractQuestionName).map((_: any) => {
		_['hh_char_hh_det_age'] = _.hh_char_hh_det_age ? +_.hh_char_hh_det_age : undefined
		return _	
}),
}) as T
}