export namespace Protection_communityMonitoring {
export type Option<T extends keyof typeof options> = keyof (typeof options)[T]
	// Form id: aQHBhYgevdzw8TR2Vq2ZdR
	export interface T {
	    start: string,
	    end: string,
	  // introduction/date [date] Date
  date: Date | undefined,
	  // introduction/staff_to_insert_their_DRC_office [select_one] DRC office
  staff_to_insert_their_DRC_office: undefined | Option<'staff_to_insert_their_DRC_office'>,
	  // introduction/staff_code [select_one] Staff code (facilitator)
  staff_code: undefined | Option<'staff_code_001'>,
	  // introduction/staff_code_001 [select_one] Staff code (notetaker)
  staff_code_001: undefined | Option<'staff_code_001'>,
	  // introduction/ben_det_oblast [select_one] Select oblast
  ben_det_oblast: undefined | Option<'ben_det_oblast'>,
	  // introduction/ben_det_raion [select_one] Select raion
  ben_det_raion: undefined | string,
	  // introduction/ben_det_hromada [select_one] Select hromada
  ben_det_hromada: undefined | string,
	  // introduction/ben_det_hromada_001 [text] Specify settlement/village/city neighborhood
  ben_det_hromada_001: string | undefined,
	  // introduction/ben_det_type_site [select_one] Type of site
  ben_det_type_site: undefined | Option<'ben_det_type_site'>,
	  // gi/activity [select_one] Which activity have you conducted?
  activity: undefined | Option<'activity'>,
	  // gi/pmt_npc [select_one] Is it a PMT KII (NPC)?
  pmt_npc: undefined | Option<'pmt_npc'>,
	  // gi/informant_role [select_one] Key informant role
  informant_role: undefined | Option<'informant_role'>,
	  // gi/informant_role_other [text] If "Other", please specify
  informant_role_other: string | undefined,
	  // gi/informant_gender [select_one] Key informant gender
  informant_gender: undefined | Option<'hh_char_hh_det_gender'>,
	  // gi/informant_age [integer] Key informant age
  informant_age: number | undefined,
	  // gi/informant_status [select_one] Key informant displacement status
  informant_status: undefined | Option<'hh_char_hh_det_status'>,
	  // gi/numb_part [integer] Number of participants
  numb_part: number | undefined,
	  // gi/hh_char_hh_det [begin_repeat] FGD participant
  hh_char_hh_det: {hh_char_hh_det_gender: undefined | Option<'hh_char_hh_det_gender'> | undefined,hh_char_hh_det_age: number | undefined | undefined,hh_char_hh_det_status: undefined | Option<'hh_char_hh_det_status'> | undefined}[] | undefined,
	  // gi/topic [text] Topic
  topic: string | undefined,
	  // gi/comments [text] Comments
  comments: string | undefined,
	}
export const options = {
staff_to_insert_their_DRC_office: {
	'chernihiv': `Chernihiv`,
	'dnipro': `Dnipro`,
	'kharkiv': `Kharkiv`,
	'lviv': `Lviv`,
	'mykolaiv': `Mykolaiv`,
	'sumy': `Sumy`
},
staff_code_001: {
	'CEJ001': `CEJ001`,
	'CEJ002': `CEJ002`,
	'CEJ003': `CEJ003`,
	'CEJ004': `CEJ004`,
	'CEJ005': `CEJ005`,
	'CEJ006': `CEJ006`,
	'CEJ007': `CEJ007`,
	'CEJ008': `CEJ008`,
	'CEJ009': `CEJ009`,
	'CEJ010': `CEJ010`,
	'CEJ011': `CEJ011`,
	'CEJ012': `CEJ012`,
	'CEJ013': `CEJ013`,
	'CEJ014': `CEJ014`,
	'CEJ015': `CEJ015`,
	'UMY001': `UMY001`,
	'UMY002': `UMY002`,
	'UMY003': `UMY003`,
	'UMY004': `UMY004`,
	'UMY005': `UMY005`,
	'UMY006': `UMY006`,
	'UMY007': `UMY007`,
	'UMY008': `UMY008`,
	'UMY009': `UMY009`,
	'UMY010': `UMY010`,
	'UMY011': `UMY011`,
	'UMY012': `UMY012`,
	'UMY013': `UMY013`,
	'UMY014': `UMY014`,
	'UMY015': `UMY015`,
	'HRK001': `HRK001`,
	'HRK002': `HRK002`,
	'HRK003': `HRK003`,
	'HRK004': `HRK004`,
	'HRK005': `HRK005`,
	'HRK006': `HRK006`,
	'HRK007': `HRK007`,
	'HRK008': `HRK008`,
	'HRK009': `HRK009`,
	'HRK010': `HRK010`,
	'HRK011': `HRK011`,
	'HRK012': `HRK012`,
	'HRK013': `HRK013`,
	'HRK014': `HRK014`,
	'HRK015': `HRK015`,
	'DNK001': `DNK001`,
	'DNK002': `DNK002`,
	'DNK003': `DNK003`,
	'DNK004': `DNK004`,
	'DNK005': `DNK005`,
	'DNK006': `DNK006`,
	'DNK007': `DNK007`,
	'DNK008': `DNK008`,
	'DNK009': `DNK009`,
	'DNK010': `DNK010`,
	'DNK011': `DNK011`,
	'DNK012': `DNK012`,
	'DNK013': `DNK013`,
	'DNK014': `DNK014`,
	'DNK015': `DNK015`,
	'LWO001': `LWO001`,
	'LWO002': `LWO002`,
	'LWO003': `LWO003`,
	'LWO004': `LWO004`,
	'LWO005': `LWO005`,
	'LWO006': `LWO006`,
	'LWO007': `LWO007`,
	'LWO008': `LWO008`,
	'LWO009': `LWO009`,
	'LWO010': `LWO010`,
	'LWO011': `LWO011`,
	'LWO012': `LWO012`,
	'LWO013': `LWO013`,
	'LWO014': `LWO014`,
	'LWO015': `LWO015`,
	'NVL001': `NLV001`,
	'NVL002': `NLV002`,
	'NVL003': `NLV003`,
	'NVL004': `NLV004`,
	'NVL005': `NLV005`,
	'NVL006': `NLV006`,
	'NVL007': `NLV007`,
	'NVL008': `NLV008`,
	'NVL009': `NLV009`,
	'NVL010': `NLV010`,
	'NVL011': `NLV011`,
	'NVL012': `NLV012`,
	'NVL013': `NLV013`,
	'NVL014': `NLV014`,
	'NVL015': `NLV015`
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
ben_det_type_site: {
	'rural': `Rural area`,
	'urban': `Urban area`
},
activity: {
	'kll': `KII`,
	'fgd': `FGD`,
	'observation': `Observation`
},
pmt_npc: {
	'yes': `Yes`,
	'no': `No`
},
informant_role: {
	'loau': `Local authority representative`,
	'cogr': `Community group representative`,
	'rein': `Representative of international NGO`,
	'rena': `Representative of national NGO`,
	'reor': `Representative of CSOs/community-based organizations`,
	'sowo': `Social worker`,
	'teacher': `Teacher`,
	'hewo': `Health worker`,
	'huwo': `Humanitarian/social worker`,
	'other': `Other`
},
hh_char_hh_det_gender: {
	'male': `Male`,
	'female': `Female`,
	'other': `Other`,
	'unspecified': `Unspecified`
},
hh_char_hh_det_status: {
	'idp': `IDP`,
	'returnee': `Returnee`,
	'non-displaced': `Non-displaced`,
	'unspec': `Unspecified`,
	'other': `Other`
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
	informant_age: _.informant_age ? +_.informant_age : undefined,
	numb_part: _.numb_part ? +_.numb_part : undefined,
	hh_char_hh_det: _.hh_char_hh_det?.map(extractQuestionName),
}) as T
}