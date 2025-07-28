export namespace Protection_pss {
export type Option<T extends keyof typeof options> = keyof (typeof options)[T]
	// Form id: a52hN5iiCW73mxqqfmEAfp
	export interface T {
	    'start': string,
	    'end': string,
	  // introduction/date [date] Date
  'date': Date | undefined,
	  // introduction/staff_to_insert_their_DRC_office [select_one] DRC office
  'staff_to_insert_their_DRC_office': undefined | Option<'staff_to_insert_their_DRC_office'>,
	  // introduction/staff_code [select_one] Staff code (facilitator)
  'staff_code': undefined | Option<'staff_code_001'>,
	  // introduction/staff_code_001 [select_one] Staff code (facilitator)
  'staff_code_001': undefined | Option<'staff_code_001'>,
	  // introduction/project [select_one] Project code
  'project': undefined | Option<'project'>,
	  // introduction/ben_det_oblast [select_one] Select oblast
  'ben_det_oblast': undefined | Option<'ben_det_oblast'>,
	  // introduction/ben_det_raion [select_one] Select raion
  'ben_det_raion': undefined | string,
	  // introduction/ben_det_hromada [select_one] Select hromada
  'ben_det_hromada': undefined | string,
	  // introduction/ben_det_hromada_001 [select_one_from_file] Specify settlement/village/city neighborhood
  'ben_det_hromada_001': string,
	  // introduction/location [select_one] Location
  'location': undefined | Option<'location'>,
	  // introduction/location_other [text] If "Other", please specify
  'location_other': string | undefined,
	  // gi/activity [select_one] Which activity have you conducted?
  'activity': undefined | Option<'activity'>,
	  // gi/activity_other [text] If "Other", please specify
  'activity_other': string | undefined,
	  // gi/activity_other_001 [select_one] What is this session?
  'activity_other_001': undefined | Option<'activity_other_001'>,
	  // gi/cycle_code [text] Group code
  'cycle_code': string | undefined,
	  // gi/new_ben [select_one] Are they new beneficiaries?
  'new_ben': undefined | Option<'new_ben'>,
	  // gi/new_ben_no [integer] Session number
  'new_ben_no': number | undefined,
	  // gi/cycle_type [select_one] Cycle duration
  'cycle_type': undefined | Option<'cycle_type'>,
	  // gi/cycle_finished_at [date] Cycle finish date
  'cycle_finished_at': Date | undefined,
	  // gi/numb_part [integer] Number of participants
  'numb_part': number | undefined,
	  // gi/participant_code [text] Participant code
  'participant_code': string | undefined,
	    'cal_invidual_session': string,
	  // gi/hh_char_hh_det [begin_repeat] Participant
  'hh_char_hh_det': {'hh_char_hh_name': string | undefined | undefined,'hh_char_hh_new_ben': undefined | Option<'registered_person_disability'> | undefined,'hh_char_hh_det_gender': undefined | Option<'hh_char_hh_det_gender'> | undefined,'hh_char_hh_det_age': number | undefined | undefined,'hh_char_hh_det_status': undefined | Option<'hh_char_hh_det_status'> | undefined,'hh_char_civ_stat': undefined | Option<'hh_char_civ_stat'> | undefined,'hh_char_hh_session': undefined | Option<'hh_char_hh_session'>[] | undefined,'calc_session_comp': string | undefined}[] | undefined,
	  // gi/calc_sum_session_comp [calculate] Number of people who attended 60% of the sessions
  'calc_sum_session_comp': string,
	  // gi/individual_session/not_barriers_participation [note] #####Barriers to participation
  'not_barriers_participation': string,
	  // gi/individual_session/not_questions_difficulties [note] **The next questions ask about difficulties you may have doing certain activities because of a health problem.**
  'not_questions_difficulties': string,
	  // gi/individual_session/difficulty [select_one] Detail
  'difficulty': undefined | Option<'difficulty_usual_language'>,
	  // gi/individual_session/difficulty_seeing [select_one] Do you have difficulty seeing, even if wearing glasses?
  'difficulty_seeing': undefined | Option<'difficulty_usual_language'>,
	  // gi/individual_session/difficulty_hearing [select_one] Do you  have difficulty hearing, even if using a hearing aid?
  'difficulty_hearing': undefined | Option<'difficulty_usual_language'>,
	  // gi/individual_session/difficulty_walking [select_one] Do you  have difficulty walking or climbing steps?
  'difficulty_walking': undefined | Option<'difficulty_usual_language'>,
	  // gi/individual_session/difficulty_remembering [select_one] Do you have difficulty remembering or concentrating?
  'difficulty_remembering': undefined | Option<'difficulty_usual_language'>,
	  // gi/individual_session/difficulty_washing [select_one] Do you  have difficulty (with self-care such as) washing all over or dressing?
  'difficulty_washing': undefined | Option<'difficulty_usual_language'>,
	  // gi/individual_session/difficulty_usual_language [select_one] Using your usual (customary) language, do you have difficulty communicating, for example understanding or being understood by others?
  'difficulty_usual_language': undefined | Option<'difficulty_usual_language'>,
	  // gi/individual_session/disability_status [select_one] Disability Status (staff only):
  'disability_status': undefined | Option<'registered_person_disability'>,
	  // gi/individual_session/registered_person_disability [select_one] Are you registered as a person with disability with the Government of Ukraine?
  'registered_person_disability': undefined | Option<'registered_person_disability'>,
	  // gi/individual_session/date_first_consultation [date] Date of first consultation:
  'date_first_consultation': Date | undefined,
	  // gi/individual_session/from [select_one] From
  'from': undefined | Option<'from'>,
	  // gi/individual_session/from_other [text] If "Other", please specify
  'from_other': string | undefined,
	  // gi/individual_session/distress_factors [select_multiple] Distress factors
  'distress_factors': undefined | Option<'distress_factors'>[],
	  // gi/individual_session/distress_factors_other [text] If "Other", please specify
  'distress_factors_other': string | undefined,
	  // gi/individual_session/main_distress_factor [text] Main distress factor from the perspective of the person of concern
  'main_distress_factor': string | undefined,
	  // gi/individual_session/main_presented_symptoms [select_multiple] Main cluster of presented symptoms
  'main_presented_symptoms': undefined | Option<'main_presented_symptoms'>[],
	  // gi/individual_session/main_presented_symptoms_other [text] If "Other", please specify
  'main_presented_symptoms_other': string | undefined,
	  // gi/individual_session/psychiatry_history [select_one] Psychiatry History :
  'psychiatry_history': undefined | Option<'psychiatry_history'>,
	  // gi/individual_session/diagnosed [text] Diagnosed specify:
  'diagnosed': string | undefined,
	  // gi/individual_session/medical_treatment [select_one] Medical treatment:
  'medical_treatment': undefined | Option<'medical_treatment'>,
	  // gi/individual_session/date_session1 [date] Session 1
  'date_session1': Date | undefined,
	  // gi/individual_session/date_session2 [date] Session 2
  'date_session2': Date | undefined,
	  // gi/individual_session/date_session3 [date] Session 3
  'date_session3': Date | undefined,
	  // gi/individual_session/date_session4 [date] Session 4
  'date_session4': Date | undefined,
	  // gi/individual_session/date_session5 [date] Session 5
  'date_session5': Date | undefined,
	  // gi/individual_session/date_session6 [date] Session 6
  'date_session6': Date | undefined,
	  // gi/individual_session/date_session7 [date] Session 7
  'date_session7': Date | undefined,
	  // gi/individual_session/date_session8 [date] Session 8
  'date_session8': Date | undefined,
	  // gi/individual_session/psychological_distress_pre [text] Psychological distress
  'psychological_distress_pre': string | undefined,
	  // gi/individual_session/psychological_distress_post [text] Psychological distress
  'psychological_distress_post': string | undefined,
	  // gi/individual_session/psychosocial_coping_pre [text] Psychosocial Coping
  'psychosocial_coping_pre': string | undefined,
	  // gi/individual_session/psychosocial_coping_post [text] Psychosocial Coping
  'psychosocial_coping_post': string | undefined,
	  // gi/individual_session/not_cluster_symptoms [note] **Improvement according to distress in the last follow up**
  'not_cluster_symptoms': string,
	  // gi/individual_session/beneficiary_perspective [text] Beneficiary perspective
  'beneficiary_perspective': string | undefined,
	  // gi/individual_session/mhpss_practitioners [text] MHPSS practitioners/psychologist perspective
  'mhpss_practitioners': string | undefined,
	  // gi/individual_session/date_closure [date] Date of closure
  'date_closure': Date | undefined,
	  // gi/individual_session/reason_closure [select_one] Reason for closure
  'reason_closure': undefined | Option<'reason_closure'>,
	  // gi/individual_session/reason_closure_other [text] If "Other", please specify
  'reason_closure_other': string | undefined,
	  // gi/individual_session/referred [select_one] Referred to
  'referred': undefined | Option<'referred'>,
	  // gi/individual_session/referred_other [text] If "Other", please specify
  'referred_other': string | undefined,
	  // gi/top_type_act [text] Topic/Type of activity
  'top_type_act': string | undefined,
	  // gi/comments [text] Comments
  'comments': string | undefined,
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
	'CEJ016': `CEJ016`,
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
	'UMY016': `UMY016`,
	'UMY017': `UMY017`,
	'UMY018': `UMY018`,
	'UMY019': `UMY019`,
	'UMY020': `UMY020`,
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
	'DNK016': `DNK016`,
	'DNK017': `DNK017`,
	'DNK018': `DNK018`,
	'DNK019': `DNK019`,
	'DNK020': `DNK020`,
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
	'NVL001': `NVL001`,
	'NVL002': `NVL002`,
	'NVL003': `NVL003`,
	'NVL004': `NVL004`,
	'NVL005': `NVL005`,
	'NVL006': `NVL006`,
	'NVL007': `NVL007`,
	'NVL008': `NVL008`,
	'NVL009': `NVL009`,
	'NVL010': `NVL010`,
	'NVL011': `NVL011`,
	'NVL012': `NVL012`,
	'NVL013': `NVL013`,
	'NVL014': `NVL014`,
	'NVL015': `NVL015`,
	'NVL016': `NVL016`,
	'NVL017': `NVL017`,
	'NVL018': `NVL018`,
	'NVL019': `NVL019`,
	'NVL020': `NVL020`
},
project: {
	'ukr000309_okf': `UKR-000309 OKF`,
	'ukr000329_sida': `UKR-000329 SIDA H2R`,
	'ukr000336_uhf6': `UKR-000336 UHF VI`,
	'ukr000345_bha2': `UKR-000345 BHA`,
	'ukr000355_dmfa': `UKR-000355 DMFA`,
	'ukr000363_uhf8': `UKR-000363 UHF VIII`,
	'ukr000372_echo3': `UKR-000372 ECHO`,
	'ukr000397_gffo': `UKR-000397 GFFO`,
	'ukr000423_echo4': `UKR-000423 ECHO`,
	'ukr000284_bha': `UKR-000284 BHA`,
	'ukr000314_uhf4': `UKR-000314 UHF IV`,
	'ukr000322_echo2': `UKR-000322 ECHO`
},
location: {
	'logow': `Governmental collective site`,
	'lopri': `Private collective site`,
	'lohum': `Humanitarian hub`,
	'locso': `CSO/CBO premises`,
	'loloc': `Local authorities' premises`,
	'locom': `Community space`,
	'loedu': `Educational facility`,
	'lopub': `Public service building`,
	'loeres': `Resilience hubs`,
	'other': `Other`
},
hh_char_hh_det_gender: {
	'male': `Male`,
	'female': `Female`,
	'other': `Other`,
	'unspecified': `Unspecified`
},
activity: {
	'mhpss': `MHPSS awareness session`,
	'pfa': `Psychological first aid (PFA)`,
	'rsa': `Recreational/Social Activity`,
	'fra': `Focused recreational activity`,
	'pgs': `Psychosocial group session`,
	'ace': `Commemorative event / community event`,
	'ais': `Individual session`,
	'p2p': `Peer to peer training`,
	'other': `Other`
},
new_ben: {
	'yes': `Yes`,
	'no': `No`,
	'bno': `Both new and old beneficiaries`
},
hh_char_hh_det_status: {
	'idp': `IDP`,
	'idp_returnee': `IDP Returnee`,
	'refugee_returnee': `Refugee Returnee`,
	'returnee': `Returnee`,
	'non-displaced': `Non-displaced`,
	'unspec': `Unspecified`,
	'other': `Other`,
	'refugee': `Refugee`,
	'pnd': `Prefers not to disclose`
},
registered_person_disability: {
	'yes': `Yes`,
	'no': `No`
},
cycle_type: {
	'short': `Short (5 sessions)`,
	'short_6': `Short new cycle (6 sessions)`,
	'long': `Long (8 sessions)`
},
activity_other_001: {
	'fise': `First session`,
	'fose': `Follow session`,
	'bofi': `Both first session and follow session`
},
undefined: {
	'idp': `IDP`,
	'idp_returnee': `IDP Returnee`,
	'refugee_returnee': `Refugee Returnee`,
	'non_displaced': `Non-displaced`,
	'refugee': `Refugee`,
	'pnd': `Prefers not to disclose`
},
difficulty_usual_language: {
	'no': `NO – no difficulty`,
	'yes_some': `YES – some difficulty`,
	'yes_lot': `YES – a lot of difficulty`,
	'cannot_all': `Cannot do at all`
},
hh_char_civ_stat: {
	'single': `Single`,
	'married': `Married`,
	'partner_abroad': `Partner abroad`,
	'partner_missing': `Partner is missing`,
	'divorced': `Divorced/separated`,
	'widow': `Widow(er)`
},
from: {
	'self': `Self`,
	'family_friends': `Family, friends`,
	'community': `Community`,
	'local_health': `Local health structures`,
	'sensitization_activity': `Sensitization/Information activity`,
	'other_drc_program': `Other DRC program`,
	'other': `Other`
},
distress_factors: {
	'experienced_violence': `Experienced of violence`,
	'gbv': `GBV`,
	'killing_family_member': `Killing of family member/loved one`,
	'experienced_torture': `Experienced torture/ill-treatment`,
	'female_head_household': `Female head of household (stress due to new responsibilities )`,
	'natural_death_loved_more2': `Natural death of loved one (more than 2 years ago)`,
	'severe_chronic_mental': `Severe or chronic mental health condition`,
	'lack_social_support': `Lack of social support/network`,
	'forced_flee': `Forced to flee  (as IDP, refugee)`,
	'witness_violence': `Witness of violence`,
	'kidnapping_hostage': `Kidnapping/hostage`,
	'disappearance_family': `Disappearance of family member/loved one`,
	'destroyed_property': `Destroyed/lost property and/or income`,
	'natural_death_loved_less2': `Natural death of loved one (less than 2 years ago)`,
	'severe_chronic_medical': `Severe or chronic medical/physical condition`,
	'discrimination_stigma': `Discrimination/stigma/marginalization`,
	'detention_incarceration': `Detention / incarceration`,
	'victim_explosive_ordnance': `Victim of Explosive Ordnance`,
	'other': `Other`
},
main_presented_symptoms: {
	'cognitive_problems': `Cognitive problems (concentration, memory, decisions)`,
	'eating_appetite_problems': `Eating / appetite problems`,
	'fatigue': `Fatigue`,
	'irritability': `Irritability`,
	'mania': `Mania`,
	'alcohol_substances': `Alcohol / substances / medication abuse`,
	'constant_worrying': `Constant worrying`,
	'sad_mood': `Sad mood / constant crying`,
	'hopeless_despair': `Hopeless / despair`,
	'feeling_worthless': `Feeling worthless / lack of confidence`,
	'suicidal_thoughts': `Suicidal thoughts / ideation`,
	'nightmares': `Nightmares / night terror`,
	'hypervigilance': `Hypervigilance /Exaggerated startle responses`,
	'inability_carry_daily': `Inability to carry out daily work`,
	'hallucinations': `Hallucinations`,
	'selfharm': `Self-harm`,
	'social_interpersonal_isolation': `Social / interpersonal isolation and withdrawal`,
	'general_body_pain': `General body pain and psychosomatic complaints`,
	'sleeping_problems': `Sleeping problems`,
	'thinking_much': `Thinking too much`,
	'aggressiveness': `Aggressiveness`,
	'sexual_problems': `Sexual problems / dysfunction`,
	'anxiety': `Anxiety`,
	'excessive_fear': `Excessive fear / phobia / feeling threatened`,
	'loss_interest': `Loss of interest / anhedonia`,
	'guilt_selfblame': `Guilt / self-blame`,
	'excessive_anger': `Excessive anger`,
	'suicide_attempt': `Suicide attempt`,
	'flashbacks': `Flashbacks / reliving experiences`,
	'avoidance': `Avoidance (of things that remind of the event)`,
	'delusions': `Delusions`,
	'compulsive_repetitive_behaviour': `Compulsive or repetitive behaviour or thoughts`,
	'antisocial_behaviour': `Antisocial behaviour`,
	'reduction_family_attachment': `Reduction of family attachment / involvement`,
	'other': `Other`
},
psychiatry_history: {
	'none': `None`,
	'present': `Present`,
	'past': `Past`,
	'both': `Both`
},
medical_treatment: {
	'yes': `Yes`,
	'no': `No`,
	'refused': `Refused`
},
reason_closure: {
	'objective_achieved': `Objective achieved`,
	'symptoms_decreased': `Symptoms decreased`,
	'person_referred': `Person referred`,
	'person_improved_emotional': `Person improved their emotional well being`,
	'drop_out_loss': `Drop out / loss of follow up`,
	'different_expectations': `Different expectations`,
	'dissatisfied_service': `Dissatisfied with service`,
	'moved_away': `Moved away`,
	'unable_trace': `Unable to trace`,
	'other': `Other`
},
referred: {
	'other_psychology': `Other Psychology`,
	'health': `Health (PHC, hospital, etc.)`,
	'economic_employment_support': `Economic / employment support`,
	'protection': `Protection (PPC/PCP)`,
	'legal_support': `Legal support`,
	'local_ngo': `local NGO`,
	'not_referred': `Not referred`,
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
hh_char_hh_session: {
	'session1': `Session 1`,
	'session2': `Session 2`,
	'session3': `Session 3`,
	'session4': `Session 4`,
	'session5': `Session 5`,
	'session6': `Session 6`,
	'session7': `Session 7`,
	'session8': `Session 8`
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
	new_ben_no: _.new_ben_no ? +_.new_ben_no : undefined,
	cycle_finished_at: _.cycle_finished_at ? new Date(_.cycle_finished_at) : undefined,
	numb_part: _.numb_part ? +_.numb_part : undefined,
	hh_char_hh_det: _['hh_char_hh_det']?.map(extractQuestionName).map((_: any) => {
		_['hh_char_hh_det_age'] = _.hh_char_hh_det_age ? +_.hh_char_hh_det_age : undefined
		_['hh_char_hh_session'] = _.hh_char_hh_session?.split(' ')
		return _	
}),
	date_first_consultation: _.date_first_consultation ? new Date(_.date_first_consultation) : undefined,
	distress_factors: _.distress_factors?.split(' '),
	main_presented_symptoms: _.main_presented_symptoms?.split(' '),
	date_session1: _.date_session1 ? new Date(_.date_session1) : undefined,
	date_session2: _.date_session2 ? new Date(_.date_session2) : undefined,
	date_session3: _.date_session3 ? new Date(_.date_session3) : undefined,
	date_session4: _.date_session4 ? new Date(_.date_session4) : undefined,
	date_session5: _.date_session5 ? new Date(_.date_session5) : undefined,
	date_session6: _.date_session6 ? new Date(_.date_session6) : undefined,
	date_session7: _.date_session7 ? new Date(_.date_session7) : undefined,
	date_session8: _.date_session8 ? new Date(_.date_session8) : undefined,
	date_closure: _.date_closure ? new Date(_.date_closure) : undefined,
}) as T
}