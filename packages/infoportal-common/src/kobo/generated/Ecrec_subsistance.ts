export namespace Ecrec_subsistance {
export type Option<T extends keyof typeof options> = keyof (typeof options)[T]
	// Form id: acWaJmM4PAj2zbiw75rcRk
	export interface T {
	    'start': string,
	    'end': string,
	  // background/date [date] Date
  'date': Date | undefined,
	  // background/back_office [select_one] 1.1 Select Office
  'back_office': undefined | Option<'back_office'>,
	  // background/back_enum [select_one] 1.2 Staff
  'back_enum': undefined | Option<'back_enum'>,
	  // background/back_donor [select_one] 1.3 Project
  'back_donor': undefined | Option<'back_donor'>,
	  // background/back_refer [select_one] 1.4 Was this case an internal DRC referral?
  'back_refer': undefined | Option<'participating_training_agriculture'>,
	  // background/back_refer_who [select_one] 1.4.1 From which Department was the referral?
  'back_refer_who': undefined | Option<'back_refer_who'>,
	  // background/back_consent [select_one] 1.5 Consent
  'back_consent': undefined | Option<'participating_training_agriculture'>,
	  // background/back_consen_no_reas [text] 1.5.1 Can you please give the reason for why you do not wish to consent to the questionnaire?
  'back_consen_no_reas': string | undefined,
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
	  // ben_det/ben_det_oblast [select_one] 2.5.1 Select oblast where registration is taking place
  'ben_det_oblast': undefined | Option<'ben_det_prev_oblast'>,
	  // ben_det/ben_det_raion [select_one] 2.5.2 Select Raion where registration is taking place
  'ben_det_raion': undefined | string,
	  // ben_det/ben_det_hromada [select_one] 2.5.3 Select hromada where registration is taking place
  'ben_det_hromada': undefined | string,
	  // ben_det/ben_det_settlement [select_one_from_file] 2.5.4 Select settlement where registration is taking place
  'ben_det_settlement': string,
	  // ben_det/ben_det_settlement_other [text] 2.5.4.1 If other, specify
  'ben_det_settlement_other': string | undefined,
	  // ben_det/ben_det_res_stat [select_one] 2.6 Have you been displaced due to the escalation of the conflict after February 24, 2022
  'ben_det_res_stat': undefined | Option<'participating_training_agriculture'>,
	  // ben_det/ben_det_prev_oblast [select_one] 2.6.1 What is your area of origin prior to displacement?
  'ben_det_prev_oblast': undefined | Option<'ben_det_prev_oblast'>,
	  // ben_det/ben_det_long_displaced [select_one] 2.6.2 How long have you been displaced ?
  'ben_det_long_displaced': undefined | Option<'ben_det_long_displaced'>,
	  // ben_det/household_contain_excombatants [select_one] 2.7 Does your household contain any ex-combatants?
  'household_contain_excombatants': undefined | Option<'participating_training_agriculture'>,
	  // ben_det/many_excombatants [integer] 2.7.1 Please specify how many
  'many_excombatants': number | undefined,
	  // ben_det/ben_det_income [integer] 2.8 What was your total household income during the last one month?
  'ben_det_income': number | undefined,
	  // ben_det/ben_det_hh_size [integer] 2.9 Indicate the total number of people in your household, including the HHH
  'ben_det_hh_size': number | undefined,
	  // hh_char/hh_char_civ_stat [select_one] 3.1 What is the civil status of the Head of Household?
  'hh_char_civ_stat': undefined | Option<'hh_char_civ_stat'>,
	    'calc_char_civ_stat': string,
	  // hh_char/hh_char_hh_det [begin_repeat] 3.1.1 HH Members
  'hh_char_hh_det': {'hh_char_hh_det_gender': undefined | Option<'hh_char_hh_det_gender'> | undefined,'hh_char_hh_det_age': number | undefined | undefined,'hh_char_hh_res_stat': undefined | Option<'hh_char_hh_res_stat'> | undefined,'hh_char_hh_how_idp': undefined | Option<'hh_char_hh_how_idp'> | undefined,'hh_char_hh_det_dis_select': undefined | Option<'hh_char_hh_det_dis_select'>[] | undefined,'hh_char_hh_det_dis_level': undefined | Option<'hh_char_hh_det_dis_level'> | undefined,'hh_char_hh_chronic_disease': undefined | Option<'participating_training_agriculture'> | undefined,'calc_u18': string | undefined,'calc_o60': string | undefined,'calc_ed_age': string | undefined,'calc_baby_age': string | undefined,'calc_preg': string | undefined,'calc_det_dis_level': string | undefined,'cal_chronic_disease': string | undefined,'cal_idp': string | undefined,'cal_idp_less_1y': string | undefined,'cal_idp_more_1y': string | undefined,'cal_long_res': string | undefined,'cal_ret': string | undefined}[] | undefined,
	    'calc_tot_chi': string,
	    'calc_tot_ed_age': string,
	    'calc_tot_eld': string,
	  // hh_char/calc_tot_dis [calculate] Total number of people wich disability
  'calc_tot_dis': string,
	  // hh_char/cal_tot_chronic_disease [calculate] Total number of people wich Chronic disease
  'cal_tot_chronic_disease': string,
	  // hh_char/cal_tot_idp [calculate] Total number of Internally Displaced Person (IDP)
  'cal_tot_idp': string,
	  // hh_char/cal_tot_idp_less_1y [calculate] Total number of Internally Displaced Person (IDP) Less 1 year
  'cal_tot_idp_less_1y': string,
	  // hh_char/cal_tot_idp_more_1y [calculate] Total number of Internally Displaced Person (IDP) More 1 year
  'cal_tot_idp_more_1y': string,
	  // hh_char/cal_tot_long_res [calculate] Total number of Long - Term Resident
  'cal_tot_long_res': string,
	  // hh_char/cal_tot_ret [calculate] Total number of Returnees
  'cal_tot_ret': string,
	  // hh_char/hh_char_preg [select_one] 3.2 Are any of the females in the household pregnat or lactating?
  'hh_char_preg': undefined | Option<'participating_training_agriculture'>,
	  // hh_char/hh_char_preg_number [integer] 3.2.1 How many Pregnant/Lactating Females in Household?
  'hh_char_preg_number': number | undefined,
	  // hh_char/household_agricultural_activities [select_one] 3.3.1 Does the Household have the physical ability to engage in light agricultural activities?
  'household_agricultural_activities': undefined | Option<'participating_training_agriculture'>,
	  // hh_char/financial_manage_livestock [select_one] 3.3.1.1 If no, does the household have the financial or social resources they can use to cultivate their land or manage their livestock?
  'financial_manage_livestock': undefined | Option<'participating_training_agriculture'>,
	  // hh_char/hh_char_chh [note] This is a child headed household (high risk protection case), please refer immediately to a DRC Protection colleague and complete internal referral form.
  'hh_char_chh': string,
	  // cash_farmers/what_primary_livelihood [select_one] 4.1 What is the primary source of livelihoods in the household
  'what_primary_livelihood': undefined | Option<'what_primary_livelihood'>,
	  // cash_farmers/what_primary_livelihood_other [text] 4.1.1 If "Other", please specify
  'what_primary_livelihood_other': string | undefined,
	  // cash_farmers/consume_majority [select_one] 4.2 Do you consume a majority of the crops you produce / livestock that you manage
  'consume_majority': undefined | Option<'participating_training_agriculture'>,
	  // cash_farmers/land_own [decimal] 4.3 How much land do you own
  'land_own': number | undefined,
	  // cash_farmers/land_cultivate [decimal] 4.4 How much land do you cultivate for agricultural purposes?
  'land_cultivate': number | undefined,
	  // cash_farmers/land_rent_other [select_one] 4.5.1 Do you have any land that you do not cultivate but rent out to other farmers?
  'land_rent_other': undefined | Option<'participating_training_agriculture'>,
	  // cash_farmers/rent_receive_year [integer] 4.5.2 What is the rent you receive per year in UAH?
  'rent_receive_year': number | undefined,
	  // cash_farmers/not_livestock [note] How many of the following livestock do you own?
  'not_livestock': string,
	  // cash_farmers/poultry [integer] Poultry:
  'poultry': number | undefined,
	  // cash_farmers/cattle [integer] Cattle:
  'cattle': number | undefined,
	  // cash_farmers/sheep [integer] Sheep:
  'sheep': number | undefined,
	  // cash_farmers/goats [integer] Goats:
  'goats': number | undefined,
	  // cash_farmers/pigs [integer] Pigs:
  'pigs': number | undefined,
	  // cash_farmers/ostriches [integer] Ostriches:
  'ostriches': number | undefined,
	  // cash_farmers/rabbits_nutrias [integer] Rabbits/nutrias:
  'rabbits_nutrias': number | undefined,
	  // cash_farmers/bee_families [integer] Bee families:
  'bee_families': number | undefined,
	  // cash_farmers/other_animals [integer] Other
  'other_animals': number | undefined,
	  // cash_farmers/other_animals_details [text] If "Other", please specify
  'other_animals_details': string | undefined,
	  // cash_farmers/depend_basic_needs [select_one] Do your agricultural activities significantly contribute to your household being able to meet its basic food needs?
  'depend_basic_needs': undefined | Option<'participating_training_agriculture'>,
	  // cash_farmers/household_access_water [select_one] 4.6 Does the household have access to water or other means of irrigation?
  'household_access_water': undefined | Option<'participating_training_agriculture'>,
	  // cash_farmers/access_basic_farming_tools [select_one] 4.7 Does the household have access to some basic farming tools and equipment?
  'access_basic_farming_tools': undefined | Option<'participating_training_agriculture'>,
	  // cash_farmers/eligible_assistance_agricultural [select_multiple] 4.8 If eligible for assistance, what agricultural inputs do you intend to purchase
  'eligible_assistance_agricultural': undefined | Option<'eligible_assistance_agricultural'>[],
	  // cash_farmers/eligible_assistance_agricultural_other [text] 4.9 If "Other", please specify
  'eligible_assistance_agricultural_other': string | undefined,
	  // cash_farmers/interested_training_agriculture [select_one] 4.10 Would you be interested in receiving any training in topics related to agriculture?
  'interested_training_agriculture': undefined | Option<'participating_training_agriculture'>,
	  // cash_farmers/interested_training_agriculture_yes [text] 4.10.1 Could you please specify which topic(s)?
  'interested_training_agriculture_yes': string | undefined,
	  // livelihoods_score/income_spent_food [integer] 4a.1 How much UAH did your household spend on food in the past month?
  'income_spent_food': number | undefined,
	  // livelihoods_score/income_spent_nonfood [integer] 4a.2 How much UAH did your household spend on non-food items and services such as health and education in the past month?
  'income_spent_nonfood': number | undefined,
	  // livelihoods_score/lcs_spent_savings [select_one] 4a.3 During the past 30 days, did anyone in your household have to spend savings due to a lack of food or money to buy it?
  'lcs_spent_savings': undefined | Option<'lcs_sell_house'>,
	  // livelihoods_score/lcs_sell_hh_assets [select_one] 4a.4 During the past 30 days, did anyone in your household have to sell household assets/goods (radio, furniture, television, jewellery, etc.) due to a lack of food or money to buy it?
  'lcs_sell_hh_assets': undefined | Option<'lcs_sell_house'>,
	  // livelihoods_score/lcs_decrease_fertilizer [select_one] 4a.5 During the past 30 days, did anyone in your household have to decrease expenditures on fertilizer, pesticide, fodder, animal feed, veterinary care, etc. due to a lack of food or money to buy it?
  'lcs_decrease_fertilizer': undefined | Option<'lcs_sell_house'>,
	  // livelihoods_score/lcs_forrowed_food [select_one] 4a.6 During the past 30 days, did anyone in your household have to borrow money (whether officially or unofficially from friends/family/neighbors) or ask to postpone payments to cover food needs?
  'lcs_forrowed_food': undefined | Option<'lcs_sell_house'>,
	  // livelihoods_score/lcs_sell_productive_assets [select_one] 4a.7 During the past 30 days, did anyone in your household have to sell productive assets or means of transport (sewing machine, wheelbarrow, bicycle, car, etc.) due to a lack of food or money to buy it?
  'lcs_sell_productive_assets': undefined | Option<'lcs_sell_house'>,
	  // livelihoods_score/lcs_reduce_health_expenditures [select_one] 4a.8 During the past 30 days, did anyone in your household have to reduce expenses on essential health (including drugs) due to a lack of food or money to buy it?
  'lcs_reduce_health_expenditures': undefined | Option<'lcs_sell_house'>,
	  // livelihoods_score/lcs_eat_elsewhere [select_one] 4a.9 During the past 30 days, did anyone in your household have to send one or more household members to live elsewhere due to a lack of food or money to buy it?
  'lcs_eat_elsewhere': undefined | Option<'lcs_sell_house'>,
	  // livelihoods_score/lcs_degrading_income_source [select_one] 4a.10 During the past 30 days, did anyone in your household have to engage in illegal, socially degrading, high-risk, exploitive or life-threatening jobs or income-generating activities (e.g., smuggling, theft, joining armed groups, prostitution) due to a lack of food or money to buy it?
  'lcs_degrading_income_source': undefined | Option<'lcs_sell_house'>,
	  // livelihoods_score/lcs_ask_stranger [select_one] 4a.11 During the past 30 days, did anyone in your household have to beg (i.e., ask strangers on the streets for money or food) and/or scavenge due to a lack of food or money to buy it?
  'lcs_ask_stranger': undefined | Option<'lcs_sell_house'>,
	  // livelihoods_score/lcs_sell_house [select_one] 4a.12 During the past 30 days, did your household have to mortgage/sell the house where your household was permanently living in or (in part or in full) land due to a lack of food or money to buy it?
  'lcs_sell_house': undefined | Option<'lcs_sell_house'>,
	  // livelihoods_score/lcs_reason [select_multiple] 4a.13 What were the main reasons why your household decided to use these strategies?
  'lcs_reason': undefined | Option<'lcs_reason'>[],
	  // livelihoods_score/lcs_reason_other [text] 4a.13.1 If other, specify
  'lcs_reason_other': string | undefined,
	  // livelihoods_score/lost_breadwiner_conflict [select_one] 4a.14 Did the household lose their breadwinner as a result of the conflict (since 2014)?
  'lost_breadwiner_conflict': undefined | Option<'participating_training_agriculture'>,
	  // livelihoods_score/documented_loss [select_one] 4a.15 Do you have documented lost of productive assets?
  'documented_loss': undefined | Option<'participating_training_agriculture'>,
	  // contamination/have_concerns_contamination [select_one] 4b.1 Do you have any concerns about contamination on your land?
  'have_concerns_contamination': undefined | Option<'participating_training_agriculture'>,
	  // contamination/known_contamination_your [select_one] 4b.2 Do you know of any contamination (e.g. unexploded ordnance) on your land?
  'known_contamination_your': undefined | Option<'known_contamination_next'>,
	  // contamination/contamination_impact_your [select_one] 4b.3 Has this impacted your ability to farm this land?
  'contamination_impact_your': undefined | Option<'contamination_impact_next'>,
	  // contamination/known_contamination_next [select_one] 4b.4 Do you know of any contamination (e.g. unexploded ordnance) on land of a neighbour or a small-scale farmer close by?
  'known_contamination_next': undefined | Option<'known_contamination_next'>,
	  // contamination/contamination_impact_next [select_one] 4b.5 Do you know if this individual(s) still continues to farm their land?
  'contamination_impact_next': undefined | Option<'contamination_impact_next'>,
	  // ass_inc/not_information [note] Your information has been collected and will be reviewed in line with the selection and vulnerability criteria. We will reach out to you to provide decision on eligibility
  'not_information': string,
	    'calc_gen_sc_inc': string,
	  // ass_inc/ass_inc_sc_inc [note] **You have met the critera for inclusion in programme. We will conduct further internal checks and revert to you with a final result.** <span style="color: red">Do not read this out to the household</span>
  'ass_inc_sc_inc': string,
	  // ass_inc/ass_inc_sc_not_vul [note] **Unfortunately based upon our criteria, you do not qualify for program as you do not meet the threshold for vulnerability.**
  'ass_inc_sc_not_vul': string,
	  // ass_inc/cal_size_hh_v1 [calculate] Size of household
  'cal_size_hh_v1': string,
	  // ass_inc/cal_residence_status_v2 [calculate] Residence status
  'cal_residence_status_v2': string,
	  // ass_inc/cal_dis_v3 [calculate] People with a disability
  'cal_dis_v3': string,
	  // ass_inc/cal_chr_v4 [calculate] People with a chronic disease
  'cal_chr_v4': string,
	  // ass_inc/cal_single_parent_children_v5 [calculate] Single-headed household
  'cal_single_parent_children_v5': string,
	  // ass_inc/cal_elderly_people_v6 [calculate] Elderly people
  'cal_elderly_people_v6': string,
	  // ass_inc/cal_perg_woman_v7 [calculate] Pregnant or lactating woman
  'cal_perg_woman_v7': string,
	  // ass_inc/cal_excombatants_v8 [calculate] Ex-combatants
  'cal_excombatants_v8': string,
	  // ass_inc/cal_breadwinner_conflict_v9 [calculate] Household lost their breadwinner as a result of the conflict
  'cal_breadwinner_conflict_v9': string,
	  // ass_inc/cal_doc_loss_v10 [calculate] Documented loss of assets as a result of the conflict
  'cal_doc_loss_v10': string,
	  // ass_inc/cal_negative_coping_strategies_v11 [calculate] Negative Coping Strategy Indicators
  'cal_negative_coping_strategies_v11': string,
	  // ass_inc/cal_income_v12 [calculate] Income
  'cal_income_v12': string,
	  // ass_inc/cal_tot_vulnerability [calculate] Total Vulnerability
  'cal_tot_vulnerability': string,
	  // pay_det/pay_consent [select_one] 6.0 Thank you for answering the questions above, are you willing to provide your payment details?
  'pay_consent': undefined | Option<'participating_training_agriculture'>,
	  // pay_det/pay_det_s/pay_det_id_type [select_one] 6.1 What form of ID do you have?
  'pay_det_id_type': undefined | Option<'pay_det_id_type'>,
	  // pay_det/pay_det_s/pay_det_id_type_oth [text] 6.1.1 What other form of ID do you have?
  'pay_det_id_type_oth': string | undefined,
	  // pay_det/pay_det_s/pay_det_pass_ser [text] 6.2.1 Input Passport Series
  'pay_det_pass_ser': string | undefined,
	  // pay_det/pay_det_s/pay_det_pass_num [text] 6.2.2 Number of ID
  'pay_det_pass_num': string | undefined,
	  // pay_det/pay_det_s/pay_det_id_ph [image] 6.2.3 Take a photo of the ID
  'pay_det_id_ph': string,
	  // pay_det/pay_det_s/begin_group_vdIM9ogQb/pay_det_tax_id_yn [select_one] 6.3.1 Do you have an individual tax number (TIN)?
  'pay_det_tax_id_yn': undefined | Option<'participating_training_agriculture'>,
	  // pay_det/pay_det_s/begin_group_vdIM9ogQb/pay_det_tax_id_num [text] 6.3.2 What is your individual tax number?
  'pay_det_tax_id_num': string | undefined,
	  // pay_det/pay_det_s/begin_group_vdIM9ogQb/pay_det_tax_id_ph [image] 6.3.3 Take a photo of the Tax ID
  'pay_det_tax_id_ph': string,
	  // pay_det/pay_det_s/begin_group_vdIM9ogQb/pay_det_tax_exempt [select_one] 6.3.4 Do you have a tax exemptions?
  'pay_det_tax_exempt': undefined | Option<'participating_training_agriculture'>,
	  // pay_det/pay_det_s/begin_group_vdIM9ogQb/pay_det_tax_exempt_im [image] 6.3.5 Take a photo of the proof of the tax of exemptions
  'pay_det_tax_exempt_im': string,
	  // pay_det/pay_det_s/pay_det_pay_meth [select_one] 6.4.1 What is your preferred payment method?
  'pay_det_pay_meth': undefined | Option<'pay_det_pay_meth'>,
	  // pay_det/pay_det_s/pay_det_iban [text] 6.4.2 What is your IBAN number?
  'pay_det_iban': string | undefined,
	  // pay_det/pay_det_s/pay_det_iban_im [image] 6.4.3 Take a picture of IBAN number if available
  'pay_det_iban_im': string,
	  // pay_det/pay_det_s/pay_address [text] 6.4.4 Your address
  'pay_address': string | undefined,
	  // pay_det/pay_det_s/pay_zip [text] 6.4.5 Your ZIP code
  'pay_zip': string | undefined,
	  // pay_det/pay_det_s/pay_det_add_im [image] 6.4.6 Take a picture of the address page of passport
  'pay_det_add_im': string,
	  // fin_det/participating_training_agriculture [select_one] Would you be interested in participating in a training related to agriculture and/or livestock?
  'participating_training_agriculture': undefined | Option<'participating_training_agriculture'>,
	  // fin_det/topics_interested_training [select_multiple] What topics would be interested in for the training?
  'topics_interested_training': undefined | Option<'topics_interested_training'>[],
	  // fin_det/topics_interested_training_other [text] If "Other", please specify
  'topics_interested_training_other': string | undefined,
	  // fin_det/fin_det_res [text] 7.1 Other Comments from Respondent
  'fin_det_res': string | undefined,
	  // fin_det/fin_det_enum [text] 7.2 Other Comments from Enumerator
  'fin_det_enum': string | undefined,
	  // fin_det/fin_det_oth_doc_im [image] 7.3 Please take picture of any other relevant document
  'fin_det_oth_doc_im': string,
	  // fin_det/additional_photo1 [image] 7.4.1 Additional photo
  'additional_photo1': string,
	  // fin_det/additional_photo2 [image] 7.4.2 Additional photo
  'additional_photo2': string,
	  // fin_det/additional_photo3 [image] 7.4.3 Additional photo
  'additional_photo3': string,
	  // fin_det/additional_photo4 [image] 7.4.4 Additional photo
  'additional_photo4': string,
	  // fin_det/additional_photo5 [image] 7.4.5 Additional photo
  'additional_photo5': string,
	  // fin_det/additional_photo6 [image] 7.4.6 Additional photo
  'additional_photo6': string,
	  // fin_det/additional_photo7 [image] 7.4.7 Additional photo
  'additional_photo7': string,
	}
export const options = {
back_office: {
	'chj': `Chernihiv (CHJ)`,
	'dnk': `Dnipro (DNK)`,
	'hrk': `Kharkiv (HRK)`,
	'nlv': `Mykloaiv (NLV)`,
	'khe': `Kherson`,
	'zap': `Zaporizia`,
	'umy': `Sumy(UMY)`
},
back_enum: {
	'ievgen_kylymenniy': `Ievgen Kylymenniy`,
	'oleksandr_shmunk': `Oleksandr Shmunk`,
	'inna_kovalchuk': `Inna Kovalchuk`,
	'polina_prusakova': `Polina Prusakova`,
	'mykyta_pokynboroda': `Mykyta Pokynboroda`,
	'artem_chernukha': `Artem Chernukha`,
	'daria_trofymenko': `Daria Trofymenko`,
	'oleksii_marchenko': `Oleksii Marchenko`,
	'mykola_marchenko': `Mykola Marchenko`,
	'olena_sugonyak': `Olena Sugonyak`,
	'natalia_lanina': `Natalia Lanina`,
	'svitlana_labunska': `Svitlana Labunska`,
	'nlv_ex1': `Extra 1`,
	'nlv_ex2': `Extra 2`,
	'tetiana_gorbatiuk': `Gorbatiuk Tetiana`,
	'olha_sakharnova': `Olha Sakharnova`,
	'oleksandr_lukomets': `Oleksandr Lukomets`,
	'sofiia_berezhna': `Sofiia Berezhna`,
	'maksym_mykytas': `Maksym Mykytas`,
	'tatiana_tsapii': `Tatiana Tsapii`,
	'illia_kutsenko': `Illia Kutsenko`,
	'enumerator_1_dnk': `Enumerator 1`,
	'enumerator_2_dnk': `Enumerator 2`,
	'enumerator_3_dnk': `Enumerator 3`,
	'enumerator_4_dnk': `Enumerator 4`,
	'enumerator_5_dnk': `Enumerator 5`,
	'ivan_prokopkin': `Ivan Prokopkin`,
	'nataliia_yermolova': `Nataliia Yermolova`,
	'olena_buglo': `Olena Buglo`,
	'dmytro_maistrenko': `Dmytro Maistrenko`,
	'taras_stomin': `Taras Stomin`,
	'tetiana_konovshii': `Tetiana Konovshii`,
	'vitalii_shapoval': `Vitalii Shapoval`,
	'andrii_zagoruiev': `Andrii Zagoruiev`,
	'hrk_ex1': `Extra 1`,
	'hrk_ex2': `Extra 2`,
	'dmytro_chernukha': `Chernukha Dmytro`,
	'dmytro_nosenko': `Dmytro Nosenko`,
	'anastasiia_reshynska': `Anastasiia Reshynska`,
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
	'olena_osadcha': `Olena Osadcha`,
	'surzhyk_oleksandr': `Surzhyk Oleksandr`,
	'honcharov_oleksandr': `Honcharov Oleksandr`,
	'vceronika_kaliuzhna': `Kaliuzhna Veronika`,
	'halyna_lantukh': `Halyna Lantukh`,
	'umy_ex1': `Extra 1`,
	'umy_ex2': `Extra 2`,
	'umy_ex3': `Extra 3`,
	'umy_ex4': `Extra 4`
},
back_donor: {
	'ukr000348_bha': `BHA (UKR-000348)`,
	'ukr000388_bha': `BHA (UKR-000388)`,
	'ukr000355_dmfa': `DMFA (UKR-000355)`
},
participating_training_agriculture: {
	'yes': `Yes`,
	'no': `No`
},
known_contamination_next: {
	'yes': `Yes`,
	'no': `No`,
	'unable_unwilling_to_answer': `Unable/unwilling to answer`
},
contamination_impact_next: {
	'still_farm_all_of_the_land': `Still farm all of the land`,
	'partially_farm_the_land': `Partially farm the land`,
	'stopped_farming_all_together': `Stopped farming all together`,
	'unable_unwilling_to_answer': `Unable/unwilling to answer`
},
back_refer_who: {
	'prot': `Protection`,
	'legal': `Legal`,
	'shelter': `Shelter`,
	'hdp': `HDP`
},
lcs_sell_house: {
	'yes': `Yes`,
	'no_had_no_need_to_use_this_coping_strategy': `No, had no need to use this coping strategy`,
	'no_have_already_exhausted_this_coping_strategy_and_cannot_use_it_again': `No, have already exhausted this coping strategy and cannot use it again`,
	'not_applicable_this_coping_strategy_is_not_available_to_me': `Not applicable / This coping strategy is not available to me`,
	'prefer_not_to_answer': `Prefer not to answer`
},
lcs_reason: {
	'to_access_or_pay_for_food': `To access or pay for food`,
	'to_access_or_pay_for_healthcare': `To access or pay for healthcare`,
	'to_access_or_pay_for_shelter': `To access or pay for shelter`,
	'to_access_or_pay_for_education': `To access or pay for education`,
	'none': `None of the above`,
	'other': `Other`,
	'dont_know': `Don't know`
},
undefined: {
	'hay': `Hay`,
	'concentrated_feed': `Concentrated feed`,
	'mineral_blocks': `Mineral blocks`,
	'wheat_seeds': `Wheat seeds`,
	'barley_seeds': `Barley seeds`,
	'other': `Other`,
	'bricks': `Bricks`,
	'wood': `Wood`,
	'plywood': `Plywood`,
	'metal_panel': `Metal panel`,
	'roof_panel': `Roof Panel`,
	'cement': `Cement`,
	'nails': `Nails`,
	'no_damage': `No Structural Damage`,
	'minor_damage': `Minor Damage (light or medium damages such as broken windows and doors, minor roof damage)`,
	'heavy_damage': `Heavy Damage`,
	'rent': `Find Rental Accommodation`,
	'host': `Living with Friends/Family/Host`,
	'own_prop': `Living in Own Property`,
	'coll_cen': `Living in Collective Center`,
	'homeless': `Homeless`,
	'other_accom': `Other`,
	'secure': `Secure for Medium/Long Term`,
	'unable_pay': `Currently Unable to Pay Rent/Contribute to Collective Costs`,
	'dan_unable_pay': `In Danger of Being Unable to Pay Rent/Contribute to Collective Costs`,
	'unsuit_accom': `Accommodation Unsuitable for my needs`,
	'eviction': `Eviction/Removal for Other Reasons`,
	'remain': `Remain in Current Place`,
	'not_sure': `Not Sure/Don’t Know`,
	'always': `Always`,
	'not_always': `Not always on but comes daily`,
	'intermittent': `Comes on intermittent days`,
	'rarely': `Rarely`,
	'never': `Never`
},
ben_det_long_displaced: {
	'less_6m': `0-6 months`,
	'6_12m': `6-12 months`,
	'12_24m': `12-24 months`,
	'more_24m': `24+ months`
},
topics_interested_training: {
	'livestock_management': `Livestock management`,
	'climate_smart_agriculture': `Climate-smart agriculture`,
	'crop_management': `Post-harvest crop management`,
	'financing_enterprise': `Cooperatives, financing an agriculture enterprise`,
	'maximize_productivity_farmer': `How to maximize productivity as a farmer`,
	'quality_seeds': `Quality of seeds and/or livestock`,
	'other': `Other`
},
ben_det_prev_oblast: {
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
hh_char_hh_res_stat: {
	'idp': `Internally Displaced Person (IDP)`,
	'long_res': `Long - Term Resident`,
	'ret': `Returnee`,
	'ref_asy': `Refugee/asylum seeker`
},
hh_char_hh_det_gender: {
	'male': `Male`,
	'female': `Female`,
	'other': `Other`,
	'pns': `Prefer not to say`
},
hh_char_civ_stat: {
	'single': `Single (Never Married)`,
	'dom_part': `Not Married but Living in Domestic Partnership`,
	'married': `Married`,
	'div_sep': `Divorced/Seperated`,
	'widow': `Widowed`,
	'abandoned': `Abandoned`
},
hh_char_hh_how_idp: {
	'less_1y': `Less 1 year`,
	'more_1y': `More 1 year`
},
hh_char_hh_det_dis_select: {
	'diff_see': `Have difficulty seeing, even if wearing glasses`,
	'diff_hear': `Have difficulty hearing, even if using a hearing aid`,
	'diff_walk': `Have difficulty walking or climbing steps`,
	'diff_rem': `Have difficulty remembering or concentrating`,
	'diff_care': `Have difficulty with self-care such as washing all over or dressing`,
	'diff_comm': `Have difficulty communicating, for example understanding or being understood`,
	'diff_none': `None of the above apply`
},
hh_char_hh_det_dis_level: {
	'zero': `No, no difficulty`,
	'one': `Yes, some difficulty`,
	'two': `Yes, a lot of difficulty`,
	'fri': `Cannot do at all`
},
pay_det_id_type: {
	'nat_pass_card': `National Passport (card)`,
	'nat_pass_book': `National Passport (book)`,
	'nat_pass_diia': `National Passport (Diia app)`,
	'pass_ussr_red': `Passport (USSR red book)`,
	'pass_int': `Passport for international travel`,
	'birth_certificate': `Birth certificate`,
	'driver_lic': `Driver’s license`,
	'pen_cert': `Pensioner certificate`,
	'oth_id': `Other Form of ID`,
	'no_id': `No ID`
},
pay_det_pay_meth: {
	'raiff_trans': `Remittance Raiffaisen AVAL`,
	'ukrpost': `Ukrposhta`,
	'bank_card': `Bank card`
},
what_primary_livelihood: {
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
	'formal_employment': `Formal employment`,
	'allowances': `Allowances/pensions, etc.`,
	'other': `Other`
},
eligible_assistance_agricultural: {
	'seeds': `Seeds`,
	'fertilizers': `Fertilizers`,
	'irrigationp': `Irrigation pipes (drop lines)`,
	'fuel': `Fuel (for agricultural machinery)`,
	'agriculser': `Agricultural services (tractor service, harvesting)`,
	'livestock': `Livestock (chickens, pigs, cows etc)`,
	'agricultool': `Agricultural tools (shovel, rake etc)`,
	'livestockf': `Livestock feed`,
	'buildingm': `Building materials,`,
	'other': `Other`
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
	ben_det_ph_number: _.ben_det_ph_number ? +_.ben_det_ph_number : undefined,
	many_excombatants: _.many_excombatants ? +_.many_excombatants : undefined,
	ben_det_income: _.ben_det_income ? +_.ben_det_income : undefined,
	ben_det_hh_size: _.ben_det_hh_size ? +_.ben_det_hh_size : undefined,
	hh_char_hh_det: _['hh_char_hh_det']?.map(extractQuestionName).map((_: any) => {
		_['hh_char_hh_det_age'] = _.hh_char_hh_det_age ? +_.hh_char_hh_det_age : undefined
		_['hh_char_hh_det_dis_select'] = _.hh_char_hh_det_dis_select?.split(' ')
		return _	
}),
	hh_char_preg_number: _.hh_char_preg_number ? +_.hh_char_preg_number : undefined,
	rent_receive_year: _.rent_receive_year ? +_.rent_receive_year : undefined,
	poultry: _.poultry ? +_.poultry : undefined,
	cattle: _.cattle ? +_.cattle : undefined,
	sheep: _.sheep ? +_.sheep : undefined,
	goats: _.goats ? +_.goats : undefined,
	pigs: _.pigs ? +_.pigs : undefined,
	ostriches: _.ostriches ? +_.ostriches : undefined,
	rabbits_nutrias: _.rabbits_nutrias ? +_.rabbits_nutrias : undefined,
	bee_families: _.bee_families ? +_.bee_families : undefined,
	other_animals: _.other_animals ? +_.other_animals : undefined,
	eligible_assistance_agricultural: _.eligible_assistance_agricultural?.split(' '),
	income_spent_food: _.income_spent_food ? +_.income_spent_food : undefined,
	income_spent_nonfood: _.income_spent_nonfood ? +_.income_spent_nonfood : undefined,
	lcs_reason: _.lcs_reason?.split(' '),
	topics_interested_training: _.topics_interested_training?.split(' '),
}) as T
}