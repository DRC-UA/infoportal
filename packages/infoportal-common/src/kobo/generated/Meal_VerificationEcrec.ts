export namespace Meal_verificationEcrec {
export type Option<T extends keyof typeof options> = keyof (typeof options)[T]
	// Form id: aEN2tkQhpsfX4G3i6Re7bi
	export interface T {
	    'start': string,
	    'end': string,
	  // background/back_office [select_one] 1.1 Select Office
  'back_office': undefined | Option<'back_office'>,
	  // background/back_enum [text] 1.2 Enumerator
  'back_enum': string | undefined,
	    'calc_city': string,
	    'calc_nlv': string,
	  // background/back_donor [select_one] 1.3 Project
  'back_donor': undefined | Option<'back_donor'>,
	  // background/reg_drc [select_one] 1.4 Where you registered by DRC for a cash transfer for livelihoods?
  'reg_drc': undefined | Option<'received_any_assistance_ngo'>,
	    'calc_vet': string,
	    'calc_vet_llh': string,
	  // background/which_support_registered [select_one] 1.4. For which support were you registered for?
  'which_support_registered': undefined | Option<'which_support_registered'>,
	  // background/back_consent [select_one] 1.5.1 Consent
  'back_consent': undefined | Option<'received_any_assistance_ngo'>,
	  // background/back_consen_no_reas [text] 1.5.2 Can you please give the reason for why you do not wish to consent to the questionnaire?
  'back_consen_no_reas': string | undefined,
	  // background/pay_det_tax_id_num [text] 1.6 What is your individual tax number?
  'pay_det_tax_id_num': string | undefined,
	  // background/back_consent_no_note [note] Thank you very much for your time, we will not proceed with the questionnaire without your consent.
  'back_consent_no_note': string,
	  // ben_det/ben_det_surname [text] 2.1 What is your surname name (as shown in personal ID)?
  'ben_det_surname': string | undefined,
	  // ben_det/ben_det_first_name [text] 2.2 What is your first name (as shown in personal ID)?
  'ben_det_first_name': string | undefined,
	  // ben_det/ben_det_pat_name [text] 2.3 What is your patronymic name?
  'ben_det_pat_name': string | undefined,
	  // ben_det/ben_det_ph_number [integer] 2.4 What is your phone number?
  'ben_det_ph_number': number | undefined,
	  // ben_det/ben_det_age [integer] 2.4.1 What is your age?
  'ben_det_age': number | undefined,
	  // ben_det/ben_det_oblast [select_one] 2.5.1 Select oblast where registration is taking place
  'ben_det_oblast': undefined | Option<'ben_det_oblast'>,
	  // ben_det/ben_det_raion [select_one] 2.5.2 Select raion where registration is taking place
  'ben_det_raion': undefined | string,
	  // ben_det/ben_det_hromada [select_one] 2.5.3 Select hromada where registration is taking place
  'ben_det_hromada': undefined | string,
	  // ben_det/ben_det_settlement [select_one_from_file] 2.5.4 Select settlement where registration is taking place
  'ben_det_settlement': string,
	  // ben_det/ben_det_settlement_other [text] 2.5.4.1 If "Other", please specify
  'ben_det_settlement_other': string | undefined,
	  // ben_det/ben_det_res_stat [select_one] 2.5.5 Select residential status
  'ben_det_res_stat': undefined | Option<'ben_det_res_stat'>,
	  // ben_det/ben_det_income [integer] 2.6 What was the total value in UAH of all the resources your household received in the last one month?
  'ben_det_income': number | undefined,
	  // ben_det/ben_det_hh_size [integer] 2.7 Indicate the total number of people in your household, including the HHH
  'ben_det_hh_size': number | undefined,
	  // cash_farmers/know_contamination_farming [select_one] Do you know of any contamination (e.g. unexploded ordnance) on the land which you are farming on?
  'know_contamination_farming': undefined | Option<'know_contamination_neighbour'>,
	  // cash_farmers/know_contamination_neighbour [select_one] Do you know of any contamination (e.g. unexploded ordnance) on land of a neighbour or a small-scale farmer close by?
  'know_contamination_neighbour': undefined | Option<'know_contamination_neighbour'>,
	  // cash_farmers/know_contamination_neighbour_yes [select_one] Do you know if this/these indivudual(s) still continue to farm their land?
  'know_contamination_neighbour_yes': undefined | Option<'know_contamination_neighbour_yes'>,
	  // cash_farmers/has_agriculture_exp [select_one] Is agriculture or farming the primary source of livelihood in your household?
  'has_agriculture_exp': undefined | Option<'received_any_assistance_ngo'>,
	  // cash_farmers/consume_majority [select_one] Do you consume a majority of the crops you produce / livestock that you manage
  'consume_majority': undefined | Option<'received_any_assistance_ngo'>,
	  // cash_farmers/land_own [decimal] How much land do you own:
  'land_own': number | undefined,
	  // cash_farmers/land_cultivate [decimal] How much land do you cultivate or manage for crops and/or livestock (in hectares) :
  'land_cultivate': number | undefined,
	  // cash_farmers/depend_basic_needs [select_one] Do you depend on farming to meet your basic needs?
  'depend_basic_needs': undefined | Option<'received_any_assistance_ngo'>,
	  // cash_farmers/depend_basic_needs_uhf [select_one] Does agriculture and/or livestock management significantly contribute to the household being able to meet its basic needs?
  'depend_basic_needs_uhf': undefined | Option<'received_any_assistance_ngo'>,
	  // cash_farmers/not_many_livestock [note] #### 🔘 How many of the following livestock do you have:
  'not_many_livestock': string,
	  // cash_farmers/many_sheep_goat [integer] Sheep/goat:
  'many_sheep_goat': number | undefined,
	  // cash_farmers/many_milking [integer] Milking/lactating cow:
  'many_milking': number | undefined,
	  // cash_farmers/many_cow [integer] Dry cow:
  'many_cow': number | undefined,
	  // cash_farmers/many_cattle [integer] Cattle
  'many_cattle': number | undefined,
	  // cash_farmers/many_pig [integer] Pig:
  'many_pig': number | undefined,
	  // cash_farmers/many_poultry [integer] Poultry:
  'many_poultry': number | undefined,
	  // cash_farmers/type_assistance [select_multiple] Please indicate what support you received:
  'type_assistance': undefined | Option<'type_assistance'>[],
	  // cash_farmers/barriers_providing_sufficient [select_one] Do you face barriers in providing sufficient quality and quantity of feed to your livestock?
  'barriers_providing_sufficient': undefined | Option<'received_any_assistance_ngo'>,
	  // cash_farmers/barriers_providing_sufficient_yes [text] If "Yes", please specify
  'barriers_providing_sufficient_yes': string | undefined,
	  // cash_businesses/organization_business [select_one] Organization form of business
  'organization_business': undefined | Option<'organization_business_001'>,
	  // cash_businesses/organization_business_other [text] If "Other", please specify
  'organization_business_other': string | undefined,
	  // cash_businesses/main_business_activities [select_multiple] State the main business activities of the household to date
  'main_business_activities': undefined | Option<'main_business_activities'>[],
	  // cash_businesses/main_business_activities_other [text] If "Other", please specify
  'main_business_activities_other': string | undefined,
	  // cash_businesses/long_business_operational [select_one] How long has your business been operational?
  'long_business_operational': undefined | Option<'long_business_operational'>,
	  // cash_businesses/committed_one_person_idp [select_one] Are you committed to hiring at least one person one person who has been affected by the war such as an IDP or returnee?
  'committed_one_person_idp': undefined | Option<'received_any_assistance_ngo'>,
	  // vet_training/you_currently_employed [select_one] 5.1 Are you currently employed:
  'you_currently_employed': undefined | Option<'received_any_assistance_ngo'>,
	  // vet_training/you_currently_employed_no [select_one] 5.1.1 How long have you been unemployed?
  'you_currently_employed_no': undefined | Option<'you_currently_employed_no'>,
	  // vet_training/registered_training_facility [select_one] 5.2 Are you aware of a registered/official training facility that is currently operating and could provide this training?
  'registered_training_facility': undefined | Option<'received_any_assistance_ngo'>,
	  // vet_training/registered_training_facility_yes [text] 5.2.1 If yes, input the information of the training center here:
  'registered_training_facility_yes': string | undefined,
	  // vet_training/training_activities_support [select_one] 5.3 In the last 2 years, have you engaged in any training activities to support re-training or movement into another sector of work?
  'training_activities_support': undefined | Option<'received_any_assistance_ngo'>,
	  // vet_training/training_activities_support_yes_paid [select_one] 5.3.1 Who paid for this training?
  'training_activities_support_yes_paid': undefined | Option<'training_activities_support_yes_paid'>,
	  // vet_training/training_activities_support_yes_consequence [select_one] 5.3.2 Did you obtain employement as a consequence of this training?
  'training_activities_support_yes_consequence': undefined | Option<'received_any_assistance_ngo'>,
	  // msme/name_business_entrepreneur [text] 6.1 Name of business or entrepreneur
  'name_business_entrepreneur': string | undefined,
	  // msme/address_business [text] 6.2 Address of the business
  'address_business': string | undefined,
	  // msme/business_owned_you [select_one] 6.3 Is this business solely owned by you?
  'business_owned_you': undefined | Option<'received_any_assistance_ngo'>,
	  // msme/date_registration [date] 6.4 Date of registration
  'date_registration': Date | undefined,
	  // msme/experience_business [select_one] 6.5.1 How much experience do you have in this business activity?
  'experience_business': undefined | Option<'experience_business'>,
	  // msme/organization_business_001 [select_one] 6.5.2 Organization form of business
  'organization_business_001': undefined | Option<'organization_business_001'>,
	  // msme/many_people_employ [select_one] 6.6 How many people do you employ?
  'many_people_employ': undefined | Option<'many_people_employ'>,
	  // msme/business_currently_operational [select_one] 6.7 Is your business currently operational?
  'business_currently_operational': undefined | Option<'received_any_assistance_ngo'>,
	  // msme/business_main_income_household [select_one] 6.8 Is this business being your main source of income for your household?
  'business_main_income_household': undefined | Option<'received_any_assistance_ngo'>,
	  // msme/recruiting_idp_6mout [select_one] 6.9 As a condition for receiving the grant to restore and/or expand your business operations, would you be willing to commit to recruiting someone affected by the conflict (for instance an IDP or returnee) for a minimum period of 6 months after receiving the grant?
  'recruiting_idp_6mout': undefined | Option<'received_any_assistance_ngo'>,
	  // msme/received_any_assistance_ngo [select_one] 6.10 Has your business received any assistance from an NGO or the government in the past two years?
  'received_any_assistance_ngo': undefined | Option<'received_any_assistance_ngo'>,
	  // fin_det/fin_det_res [text] 7.1 Other Comments from Respondent
  'fin_det_res': string | undefined,
	  // fin_det/fin_det_enum [text] 7.2 Other Comments from Enumerator
  'fin_det_enum': string | undefined,
	  // fin_det/fin_det_oth_doc_im [image] 7.3 Please take picture of any other relevant document
  'fin_det_oth_doc_im': string,
	}
export const options = {
back_office: {
	'lwo': `Lviv (LWO)`,
	'chj': `Chernihiv (CHJ)`,
	'dnk': `Dnipro (DNK)`,
	'hrk': `Kharkiv (HRK)`,
	'nlv': `Mykloaiv (NLV)`,
	'khe': `Kherson`,
	'zap': `Zaporizia`,
	'umy': `Sumy(UMY)`
},
undefined: {
	'oleksandr_havrylov': `Oleksandr Havrylov`,
	'ievgen_kylymenniy': `Ievgen Kylymenniy`,
	'oleksandr_shmunk': `Oleksandr Shmunk`,
	'inna_kovalchuk': `Inna Kovalchuk`,
	'dmytro_ivanov': `Dmytro Ivanov`,
	'henadii_petrychenko': `Henadii Petrychenko`,
	'nadiia_yudaieva': `Nadiia Yudaieva`,
	'dmytro_tsaruk': `Dmytro Tsaruk`,
	'viktoria_ushan': `Viktoria Ushan`,
	'kostiantyn_yefimchuk': `Kostiantyn Yefimchuk`,
	'viktoriia_lytvynova': `Viktoriia Lytvynova`,
	'valerii_vietrov': `Valerii Vietrov`,
	'daria_kokalia': `Daria Kokalia`,
	'artem_chernukha_1': `Artem Chernukha`,
	'lwo_ex1': `Extra 1`,
	'lwo_ex2': `Extra 2`,
	'polina_prusakova': `Polina Prusakova`,
	'nlv_ex1': `Extra 1`,
	'nlv_ex2': `Extra 2`,
	'oleh_vyshnevskyi': `Oleh Vyshevskyi`,
	'alina_bondarenko': `Alina Bondarenko`,
	'serhii_dolzhenko': `Serhii Dolzhenko`,
	'viktoria_klymenko': `Viktoria Klymenko`,
	'andrii_zahoruyev': `Andrii Zahoruyev`,
	'oleh_Ivanov': `Oleh Ivanov`,
	'karina_korzh': `Karina Korzh`,
	'serhii_nevmyvaka': `Serhii Nevmyvaka`,
	'olha_osmukha': `Olha Osmukha`,
	'halyna_diachenko': `Halyna Diachenko`,
	'mariia_kozachko': `Mariia Kozachko`,
	'dnk_ex1': `Extra 1`,
	'dnk_ex2': `Extra 2`,
	'yurii_volkov': `Yurii Volkov`,
	'andrii_zagoruiev': `Andrii Zagoruiev`,
	'olena_sydorenko': `Olena Sydorenko`,
	'svitlana_smyrnova': `Svitlana Smyrnova`,
	'tetiana_konovshii': `Tetiana Konovshii`,
	'bohdan_taranushchenko': `Bohdan Taranushchenko`,
	'hrk_ex1': `Extra 1`,
	'hrk_ex2': `Extra 2`,
	'dmytro_chernukha': `Chernukha Dmytro`,
	'anastasiia_reshynska': `Anastasiia Reshynska`,
	'nataliia_pushenko': `Pushenko Nataliia`,
	'tetiana_gorbatiuk': `Gorbatiuk Tetiana`,
	'oleksandr_lukomets': `Oleksandr Lukomets`,
	'katerina_severin': `Katerina Severin`,
	'maksim_sedun': `Maksim Sedun`,
	'chj_ex1': `Extra 1`,
	'chj_ex2': `Extra 2`,
	'khe_ex1': `Extra 1`,
	'khe_ex2': `Extra 2`,
	'khe_ex3': `Extra 3`,
	'khe_ex4': `Extra 4`,
	'zap_ex1': `Extra 1`,
	'zap_ex2': `Extra 2`,
	'zap_ex3': `Extra 3`,
	'zap_ex4': `Extra 4`,
	'honcharov_oleksandr': `Honcharov Oleksandr`,
	'vceronika_kaliuzhna': `Kaliuzhna Veronika`,
	'margaryta_pustova': `Pustova Margaryta`,
	'umy_ex1': `Extra 1`,
	'umy_ex2': `Extra 2`,
	'umy_ex3': `Extra 3`,
	'umy_ex4': `Extra 4`,
	'ecrec': `MPCA`,
	'prot': `A = Protection`,
	'legal': `B = Legal`,
	'shelter': `C = Shelter`,
	'yes': `Yes`,
	'no_had_no_need_to_use_this_coping_strategy': `No, had no need to use this coping strategy`,
	'no_have_already_exhausted_this_coping_strategy_and_cannot_use_it_again': `No, have already exhausted this coping strategy and cannot use it again`,
	'not_applicable_this_coping_strategy_is_not_available_to_me': `Not applicable / This coping strategy is not available to me`,
	'prefer_not_to_answer': `Prefer not to answer`,
	'to_access_or_pay_for_food': `To access or pay for food`,
	'to_access_or_pay_for_healthcare': `To access or pay for healthcare`,
	'to_access_or_pay_for_shelter': `To access or pay for shelter`,
	'to_access_or_pay_for_education': `To access or pay for education`,
	'other': `Other`,
	'dont_know': `Don't know`,
	'hay': `Hay`,
	'concentrated_feed': `Concentrated feed`,
	'mineral_blocks': `Mineral blocks`,
	'wheat_seeds': `Wheat seeds`,
	'barley_seeds': `Barley seeds`,
	'bricks': `Bricks`,
	'wood': `Wood`,
	'plywood': `Plywood`,
	'metal_panel': `Metal panel`,
	'roof_panel': `Roof Panel`,
	'cement': `Cement`,
	'nails': `Nails`,
	'male': `A = Male`,
	'female': `B = Female`,
	'single': `A = Single (Never Married)`,
	'dom_part': `B = Not Married but Living in Domestic Partnership`,
	'married': `C = Married`,
	'div_sep': `D = Divorced/Seperated`,
	'widow': `E = Widowed`,
	'abandoned': `F = Abandoned`,
	'diff_see': `A = Have difficulty seeing, even if wearing glasses`,
	'diff_hear': `B = Have difficulty hearing, even if using a hearing aid`,
	'diff_walk': `C = Have difficulty walking or climbing steps`,
	'diff_rem': `D = Have difficulty remembering or concentrating`,
	'diff_care': `E = Have difficulty with self-care such as washing all over or dressing`,
	'diff_comm': `F = Have difficulty communicating, for example understanding or being understood`,
	'diff_none': `G = None of the above apply`,
	'zero': `A = No, no difficulty`,
	'one': `B = Yes, some difficulty`,
	'two': `C = Yes, a lot of difficulty`,
	'fri': `D = Cannot do at all`,
	'no_damage': `No Structural Damage`,
	'minor_damage': `Minor Damage (light or medium damages such as broken windows and doors, minor roof damage)`,
	'heavy_damage': `Heavy Damage`,
	'rent': `B = Find Rental Accommodation`,
	'host': `B = Living with Friends/Family/Host`,
	'own_prop': `C = Living in Own Property`,
	'coll_cen': `D = Living in Collective Center`,
	'homeless': `E = Homeless`,
	'other_accom': `F = Other`,
	'secure': `A = Secure for Medium/Long Term`,
	'unable_pay': `B = Currently Unable to Pay Rent/Contribute to Collective Costs`,
	'dan_unable_pay': `C = In Danger of Being Unable to Pay Rent/Contribute to Collective Costs`,
	'unsuit_accom': `D = Accommodation Unsuitable for my needs`,
	'eviction': `E = Eviction/Removal for Other Reasons`,
	'remain': `A = Remain in Current Place`,
	'not_sure': `C = Not Sure/Don’t Know`,
	'always': `A = Always`,
	'not_always': `B = Not always on but comes daily`,
	'intermittent': `C = Comes on intermittent days`,
	'rarely': `D = Rarely`,
	'never': `E = Never`,
	'nat_pass_card': `A = National Passport (card)`,
	'nat_pass_book': `B = National Passport (book)`,
	'nat_pass_diia': `C = National Passport (Diia app)`,
	'pass_ussr_red': `D = Passport (USSR red book)`,
	'pass_int': `E = Passport for international travel`,
	'birth_certificate': `F = Birth certificate`,
	'driver_lic': `G = Driver’s license`,
	'pen_cert': `H = Pensioner certificate`,
	'oth_id': `I = Other Form of ID`,
	'no_id': `J = No ID`,
	'raiff_trans': `A = Remittance Raiffaisen AVAL`,
	'ukrpost': `B = Ukrposhta`,
	'bank_card': `C = Bank card`,
	'other_pay': `D = Other Payment Method`,
	'none_pay': `E = None of the above fit my needs`,
	'agricul': `Agricultural and/or livestock activities`,
	'grocery': `Grocery, shop`,
	'smalls': `Small shop/kiosk`,
	'carpentry': `Carpentry, carving, or woodwork`,
	'mechanic': `Mechanics`,
	'plumber': `Plumber`,
	'electrical': `Electrical work`,
	'construct': `Construction work`,
	'textiel': `Textile and tailoring`,
	'education': `Education centre`,
	'heath': `Heath centre`,
	'manufacturing': `Manufacturing/factory work`,
	'computer': `Computer, technology`,
	'administration': `Administration,`,
	'graphic': `Graphic design`,
	'transport': `Transport service`,
	'hairdressing': `Hairdressing/barber`,
	'pscoffe': `Providing services (such as coffee/tea, small restaurant, cooking, etc.)`,
	'pscleaning': `Providing services (cleaning, security)`,
	'ngo': `NGOs/UN agencies`,
	'government': `Government`,
	'seeds': `Seeds`,
	'fertilizers': `Fertilizers`,
	'irrigationp': `Irrigation pipes (drop lines)`,
	'fuel': `Fuel (for agricultural machinery)`,
	'agriculser': `Agricultural services (tractor service, harvesting)`,
	'livestock': `Livestock (chickens, pigs, cows etc)`,
	'agricultool': `Agricultural tools (shovel, rake etc)`,
	'livestockf': `Livestock feed`,
	'buildingm': `Building materials,`
},
back_donor: {
	'uhf6': `UHF-6`,
	'uhf7': `UHF-7`,
	'uhf8': `UHF-8`,
	'bha_llh_348': `BHA – LLH 348`,
	'danish_mfa_355': `Danish MFA 355`
},
which_support_registered: {
	'scf_iap': `Sectoral Cash for Farmers [Improving Agricultural Production]`,
	'scfb_lr': `Sectoral Cash for Businesses [Livelihood Restoration]`,
	'vet_training': `VET training for New Livelihood Development`,
	'msme': `MSME Sectoral Cash for Businesses [Livelihood Restoration]`
},
received_any_assistance_ngo: {
	'yes': `Yes`,
	'no': `No`
},
know_contamination_neighbour: {
	'yes': `Yes`,
	'no': `No`,
	'unwilling': `Unwilling or unable to answer`
},
type_assistance: {
	'cfas': `Cash for Animal Shelter`,
	'cfaf': `Cash for Animal Feed`
},
organization_business_001: {
	'private_entrepreneur': `Private entrepreneur`,
	'private_enterprise': `Private enterprise`,
	'limited_company': `Limited Liability Company (LLC)`,
	'farming_enterprise': `Farming enterprise`,
	'collective_enterprise': `Collective enterprise`,
	'other': `Other`
},
main_business_activities: {
	'agro_processing': `Agro-processing`,
	'agriculture': `Agriculture (crop and/or livestock)`,
	'transport_services': `Transport services`,
	'construction_Construction': `Construction`,
	'food_services': `Food services`,
	'electrical': `Electrical`,
	'mechanics': `Mechanics`,
	'plumber': `Plumber`,
	'petty_trade': `Petty trade`,
	'retail_trade': `Retail and wholesale trade`,
	'sewing_repair': `Sewing/Shoe repair`,
	'small_manufacturing': `Small manufacturing`,
	'hairdressing_barber': `Hairdressing/barber`,
	'it': `IT`,
	'other': `Other`
},
long_business_operational: {
	'under_two': `Under two years`,
	'over_two': `Over two years`
},
you_currently_employed_no: {
	'0_3_mounths': `0-3 months`,
	'3_6_mounths': `3-6 months`,
	'6_12_mounths': `6-12 months`,
	'12_more_mounths': `12+ months`
},
training_activities_support_yes_paid: {
	'state_service': `State Service`,
	'non_international': `Non-Governmental Organisation [international]`,
	'non_national': `Non-Governmental Organisation [national]`,
	'private_actor': `Private Sector Actor`
},
experience_business: {
	'one_two_years': `1-2 years`,
	'three_five_years': `3-5 years`,
	'more_five_years': `5+ years`
},
many_people_employ: {
	'0_5_people': `0-5 people`,
	'5_10_people': `5-10 people`,
	'10_15_people': `10-15 people`,
	'15_20_people': `15-20 people`,
	'20_more_people': `20+ people`
},
know_contamination_neighbour_yes: {
	'still': `Still farm all the land`,
	'partially': `Partially farm the land`,
	'stopped': `Stopped farming all togehter`,
	'uu': `Unable/unwilling to answer`
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
ben_det_res_stat: {
	'idp': `A = Internally Displaced Person (IDP)`,
	'long_res': `B = Long - Term Resident`,
	'ret': `C = Returnee`,
	'ref_asy': `D = Refugee/asylum seeker`
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
	ben_det_ph_number: _.ben_det_ph_number ? +_.ben_det_ph_number : undefined,
	ben_det_age: _.ben_det_age ? +_.ben_det_age : undefined,
	ben_det_income: _.ben_det_income ? +_.ben_det_income : undefined,
	ben_det_hh_size: _.ben_det_hh_size ? +_.ben_det_hh_size : undefined,
	many_sheep_goat: _.many_sheep_goat ? +_.many_sheep_goat : undefined,
	many_milking: _.many_milking ? +_.many_milking : undefined,
	many_cow: _.many_cow ? +_.many_cow : undefined,
	many_cattle: _.many_cattle ? +_.many_cattle : undefined,
	many_pig: _.many_pig ? +_.many_pig : undefined,
	many_poultry: _.many_poultry ? +_.many_poultry : undefined,
	type_assistance: _.type_assistance?.split(' '),
	main_business_activities: _.main_business_activities?.split(' '),
	date_registration: _.date_registration ? new Date(_.date_registration) : undefined,
}) as T
}