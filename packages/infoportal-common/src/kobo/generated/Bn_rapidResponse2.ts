export namespace Bn_rapidResponse2 {
  export type Option<T extends keyof typeof options> = keyof (typeof options)[T]
  // Form id: adpuqZypnqHb8LNfX49iA5
  export interface T {
    start: string
    end: string
    // date [date] Date
    date: Date | undefined
    // background/back_un_id [note] Unique ID/Case Number
    back_un_id: string
    // background/back_office [select_one] Select Office
    back_office: undefined | Option<'back_office'>
    // background/back_enum [select_one] Enumerator
    back_enum: undefined | Option<'back_enum'>
    // background/back_prog_type [select_multiple] Programme Type
    back_prog_type: undefined | Option<'back_prog_type'>[]
    // background/back_refer_who [select_one] Is this case targeted through internal referral from DRC? from which department?
    back_refer_who: undefined | Option<'back_refer_who'>
    // background/back_consent [note] Consent
    back_consent: string
    // ben_det/ben_det_surname [text] Surname
    ben_det_surname: string | undefined
    // ben_det/ben_det_first_name [text] First name
    ben_det_first_name: string | undefined
    // ben_det/ben_det_pat_name [text] Patronymic name
    ben_det_pat_name: string | undefined
    // ben_det/ben_det_ph_number [integer] Phone number
    ben_det_ph_number: number | undefined
    // ben_det/ben_det_oblast [select_one] Oblast
    ben_det_oblast: undefined | Option<'ben_det_oblast'>
    // ben_det/ben_det_raion [select_one] Raion
    ben_det_raion: undefined | string
    // ben_det/ben_det_hromada [select_one] Hromada
    ben_det_hromada: undefined | string
    // ben_det/ben_det_settlement [select_one_from_file] Settlement
    ben_det_settlement: string
    // ben_det/leave_regular_place [select_one] Were you forced to leave your regular place of residence due to the attack/evacuation in the last 30 days?
    leave_regular_place: undefined | Option<'receive_pss'>
    // ben_det/reduction_income [select_one] Has your household experienced a reduction in income in the past 30 days due to any of the following events?
    reduction_income: undefined | Option<'reduction_income'>
    // ben_det/documentation_reduction_income [image] Upload supporting documentation (hospital record, sick leave form, death certificate or inclusion in official local authority list)
    documentation_reduction_income: string
    // ben_det/reduction_income_other [text] If other, specify
    reduction_income_other: string | undefined
    // ben_det/safe_room [select_one] Do you have a warm, dry and safe room to spend the night in at your regular place of residence?
    safe_room: undefined | Option<'receive_pss'>
    // ben_det/access_water [select_one] Do you have access to potable/technical water?
    access_water: undefined | Option<'receive_pss'>
    // ben_det/plan_general_living [select_multiple] How do you plan to cover your general living costs for the next two weeks?
    plan_general_living: undefined | Option<'plan_general_living'>[]
    negative_coping: string
    cal_status_negative: string
    // ben_det/recent_shock [select_one] Is this because your home was damaged by a recent shock (windows, roofs or doors damaged by shelling or explosions)? or is it because your home is old and can no longer protect you from the elements (old windows, leaking roofs, etc)
    recent_shock: undefined | Option<'recent_shock'>
    // ben_det/repair_home_there [select_one] Are you able to repair your home so you can live safely there? or do you need support
    repair_home_there: undefined | Option<'repair_home_there'>
    // ben_det/ben_det_income [integer] Total value of HH resources received (UAH) in the last month
    ben_det_income: number | undefined
    // ben_det/ben_det_hh_size [integer] Number of people in HH
    ben_det_hh_size: number | undefined
    cal_head_tax: string
    // hh_char/hh_char_hh_det [begin_repeat] Household members
    hh_char_hh_det:
      | {
          hh_chart_note_resp: string | undefined
          hh_char_hh_det_gender: undefined | Option<'hh_char_hh_det_gender'> | undefined
          hh_char_date_birth: Date | undefined | undefined
          hh_char_hh_det_age: number | undefined | undefined
          hh_char_tax_id_yn: undefined | Option<'receive_pss'> | undefined
          head_tax_id: string | undefined
          hh_char_tax_id_num: string | undefined | undefined
          hh_char_tax_id_photo: string | undefined
          taxid_weightedsum: string | undefined
          taxid_roundedsum: string | undefined
          hh_char_hh_res_stat: undefined | Option<'hh_char_hh_res_stat'> | undefined
          hh_char_hh_det_dis_select: undefined | Option<'hh_char_hh_det_dis_select'>[] | undefined
          hh_char_hh_det_dis_level: undefined | Option<'hh_char_hh_det_dis_level'> | undefined
          calc_u18: string | undefined
          calc_o60: string | undefined
          calc_ed_age: string | undefined
          calc_baby_age: string | undefined
          calc_preg: string | undefined
          calc_det_dis_level: string | undefined
        }[]
      | undefined
    // hh_char/calc_tot_chi [calculate] Sum of -18
    calc_tot_chi: string
    // hh_char/calc_tot_ed_age [calculate] Sum of 5-18
    calc_tot_ed_age: string
    // hh_char/calc_tot_eld [calculate] Sum of +59
    calc_tot_eld: string
    // hh_char/calc_dis_level [calculate] Sum of PwDs
    calc_dis_level: string
    // hh_char/calc_sum_preg [calculate] Sum of women of childbearing age
    calc_sum_preg: string
    // hh_char/hh_char_chh [note] This is a child headed household (high risk protection case), please refer immediately to a DRC Protection colleague and complete internal referral form.
    hh_char_chh: string
    // hh_char/pregnant_count [integer] Number of pregnant/lactating females
    pregnant_count: number | undefined
    // nfi/nfi_donor [select_one] Donor NFI
    nfi_donor: undefined | Option<'mpca_donor'>
    // nfi/nfi_eligibility_summary [note] Based on minimum standards this house is eligible for:
    nfi_eligibility_summary: string
    // nfi/nfi_fam_hy [note] Family Hygiene Kit (HKMV) recommanded
    nfi_fam_hy: string
    // nfi/nfi_fam_nfi [note] Family NFI Kit (NFKF+KS) recommended
    nfi_fam_nfi: string
    // nfi/nfi_kit_disitrbuted [select_one] NFI Kits distributed at the point of registration?
    nfi_kit_disitrbuted: undefined | Option<'receive_pss'>
    // nfi/nfi_dist_hkf [integer] Family Hygiene Kits (HKF)
    nfi_dist_hkf: number | undefined
    // nfi/nfi_dist_hkf_donor [select_one] Donor Family Hygiene Kits (HKF)
    nfi_dist_hkf_donor: undefined | Option<'mpca_donor'>
    // nfi/nfi_dist_nfkf_ks [integer] Family NFI kits distributed (NFKF + KS)
    nfi_dist_nfkf_ks: number | undefined
    // nfi/nfi_dist_nfkf_ks_donor [select_one] Donor Family NFI kits distributed (NFKF + KS)
    nfi_dist_nfkf_ks_donor: undefined | Option<'mpca_donor'>
    // nfi/nfi_kit_cc [integer] NFI Kit for Collective Center distributed
    nfi_kit_cc: number | undefined
    // nfi/nfi_bed [integer] Folding Beds distributed
    nfi_bed: number | undefined
    // nfi/nfi_fks [integer] Family kitchen set (FKS)
    nfi_fks: number | undefined
    // nfi/donor_nfi_fks [select_one] Donor Family kitchen set (FKS)
    donor_nfi_fks: undefined | Option<'mpca_donor'>
    // esk/esk_donor [select_one] Donor Emergency Shelter Kit
    esk_donor: undefined | Option<'mpca_donor'>
    // esk/esk_shelter_damage [select_one] Current shelter damaged?
    esk_shelter_damage: undefined | Option<'esk_shelter_damage'>
    // esk/esk_note_heavy_damage [note] If there is heavy damage to this property, please refer to the shelter team immediately
    esk_note_heavy_damage: string
    // esk/esk_estimate_sqm_damage [integer] Square meter or roof or window that is damaged estimation
    esk_estimate_sqm_damage: number | undefined
    // esk/esk_eligibility_summary_esk [note] Based upon the answers above, the household is eligible for the following:
    esk_eligibility_summary_esk: string
    // esk/esk_note_eligible [integer] Number of kits the household eligible
    esk_note_eligible: number | undefined
    // ass_inc/mpca_donor [select_one] Donor MPCA
    mpca_donor: undefined | Option<'mpca_donor'>
    // ass_inc/mpca_amount [note] Provisional calculated benefit (HH Size × UAH 3,600 × 3 Months)
    mpca_amount: string
    // ass_inc/pay_consent [note] Ensure the interviewee agrees to provide their payment details before completing the form.
    pay_consent: string
    // ass_inc/pay_det_id_type [select_one] Form of ID
    pay_det_id_type: undefined | Option<'pay_det_id_type'>
    // ass_inc/pay_det_id_type_oth [text] Other form of ID
    pay_det_id_type_oth: string | undefined
    // ass_inc/pay_det_pass_ser [text] Input Passport Series
    pay_det_pass_ser: string | undefined
    // ass_inc/pay_det_pass_num [text] Number of ID
    pay_det_pass_num: string | undefined
    // ass_inc/pay_det_id_ph [image] ID photo
    pay_det_id_ph: string
    // ass_inc/pay_det_tax_id_yn [select_one] Have Individual tax number (TIN)?
    pay_det_tax_id_yn: undefined | Option<'receive_pss'>
    // ass_inc/pay_det_tax_id_num [text] Tax number
    pay_det_tax_id_num: string | undefined
    // ass_inc/cal_organization [calculate] Organization
    cal_organization: string
    // ass_inc/cal_category [calculate] Category
    cal_category: string
    // ass_inc/cal_currency [calculate] Currency
    cal_currency: string
    // ass_inc/cal_amount [calculate] Amount
    cal_amount: string
    // ass_inc/cal_date_start [calculate] Start (YYYYMMDD)
    cal_date_start: string
    // ass_inc/cal_date_end [calculate] End (YYYYMMDD)
    cal_date_end: string
    // ass_inc/pay_det_tax_id_ph [image] Tax number photo
    pay_det_tax_id_ph: string
    // ass_inc/pay_det_tax_exempt [select_one] Have a tax exemptions?
    pay_det_tax_exempt: undefined | Option<'receive_pss'>
    // ass_inc/pay_det_tax_exempt_im [image] Proof of the tax of exemptions photo
    pay_det_tax_exempt_im: string
    // ass_inc/pay_det_pay_meth [select_one] Preferred payment method?
    pay_det_pay_meth: undefined | Option<'pay_det_pay_meth'>
    // ass_inc/pay_det_iban [text] IBAN
    pay_det_iban: string | undefined
    pay_det_iban_length: string
    // ass_inc/pay_det_iban_im [image] IBAN number photo if available
    pay_det_iban_im: string
    // ass_inc/pay_address [text] Address
    pay_address: string | undefined
    // ass_inc/pay_zip [text] ZIP code
    pay_zip: string | undefined
    // ass_inc/pay_det_add_im [image] Address page of passport photo
    pay_det_add_im: string
    // ass_inc/pay_det_pay_meth_oth [text] Other Payment methods?
    pay_det_pay_meth_oth: string | undefined
    // ass_inc/pay_det_pay_meth_none [text] Reason why no suitable payment method
    pay_det_pay_meth_none: string | undefined
    // mpca_bha_345/extent_basic_needs_bha345 [select_one] M02. To what extent is your household able to meet the basic needs of your HH according to your priorities?
    extent_basic_needs_bha345: undefined | Option<'extent_basic_needs_bha345'>
    // mpca_bha_345/basic_needs_unable_fulfill_bha345 [select_multiple] M02.1 Which basic needs is your household currently unable to fulfill?
    basic_needs_unable_fulfill_bha345: undefined | Option<'basic_needs_unable_fulfill_bha345'>[]
    // mpca_bha_345/basic_needs_unable_fulfill_other_bha345 [text] M02.1 Which basic needs is your household currently unable to fulfill, if other
    basic_needs_unable_fulfill_other_bha345: string | undefined
    // mpca_bha_345/basic_needs_unable_fully_reason_bha345 [select_multiple] M02.2 Why are you unable to fully meet this need?
    basic_needs_unable_fully_reason_bha345: undefined | Option<'basic_needs_unable_fully_reason_bha345'>[]
    // mpca_bha_345/basic_needs_unable_fully_reason_other_bha345 [text] M02.2 Why are you unable to fully meet this need, if other?
    basic_needs_unable_fully_reason_other_bha345: string | undefined
    // mpca_bha_345/items_basicevel_comfort_bha_345 [select_one] M11. Does your household currently have enough clothing, bedding, cooking supplies, fuel, lighting, and other items needed to provide a basic level of comfort?
    items_basicevel_comfort_bha_345: undefined | Option<'receive_pss'>
    // mpca_bha_345/items_basicevel_comfort_no_bha_345 [select_multiple] M11.1 If no, what items do you still feel you need?
    items_basicevel_comfort_no_bha_345: undefined | Option<'items_basicevel_comfort_no_bha_345'>[]
    // mpca_bha_345/items_basicevel_comfort_no_other_bha_345 [text] M11.1.1 If no, what other items do you still feel you need?
    items_basicevel_comfort_no_other_bha_345: string | undefined
    // mpca_bha_345/member_access_water_bha_345 [select_one] M12. Does your home have enough safe water for everyone in your household to drink, cook and wash?
    member_access_water_bha_345: undefined | Option<'receive_pss'>
    // esk_bha_345_m04/where_staying [select_one] M04. Where are you staying?
    where_staying: undefined | Option<'where_staying'>
    // esk_bha_345_m04/where_staying_other [text] M04.1 Where are you staying, if other?
    where_staying_other: string | undefined
    // esk_bha_345_m04/sufficientiving_spaces [select_one] M04.2 Do you have sufficient living spaces in your current shelters  (3.5 square meter per person)?
    sufficientiving_spaces: undefined | Option<'sufficientiving_spaces'>
    // esk_bha_345_m04/separate_space_girls [select_one] M04.3 Do you have separate space for Adolescent girls and pregnant and lactating women (PLWs) in side your house/shelters?
    separate_space_girls: undefined | Option<'separate_space_girls'>
    // esk_bha_345_m04/shelter_safe_winter [select_one] M04.4 Is your existing shelter/house is safe from winter, wind (health risks)?
    shelter_safe_winter: undefined | Option<'receive_pss'>
    // protection_questions/legal_support [select_one] 1. Do you need legal support regarding any of the following topics?
    legal_support: undefined | Option<'legal_support'>
    // protection_questions/not_legal_support [note] *Note for DRC staff member*: If yes refer to Legal
    not_legal_support: string
    // protection_questions/not_shelter_support [note] *Note for DRC staff member*: If yes refer to shelter*\
    not_shelter_support: string
    // protection_questions/not_legal_va [note] *Note for DRC staff member*: If yes refer to VA
    not_legal_va: string
    // protection_questions/member_injured_mine [select_one] 2. DRC supports people who have been affected by shelling or explosive devices. Have you or someone in your family been affected by this? If so, we can help connect you to our services.
    member_injured_mine: undefined | Option<'stressful_events'>
    // protection_questions/members_require_medical [select_one] 2.1. If yes, would do you or your family members require support for medical/rehabilitative treatment or other support?
    members_require_medical: undefined | Option<'stressful_events'>
    // protection_questions/not_va [note] *Note for DRC staff member*: If yes refer to VA
    not_va: string
    // protection_questions/stressful_events [select_one] 3. Have recent stressful events affected you emotionally—for example, causing feelings such as anxiety, fear, anger, irritability, panic, or sadness
    stressful_events: undefined | Option<'stressful_events'>
    // protection_questions/receive_pss [select_one] 3.1. If yes, would you like to receive psychological support?
    receive_pss: undefined | Option<'receive_pss'>
    // protection_questions/not_pss [note] *Note for DRC staff member*: If yes refer to PSS
    not_pss: string
    protection_ref_dep: string
    // monthly_expenditures_needs/food_expenditures [integer] Food
    food_expenditures: number | undefined
    // monthly_expenditures_needs/hygiene_expenditures [integer] Personal Hygiene items (toothpaste, soap, shampoo, toilet paper, menstrual pads, baby diapers)
    hygiene_expenditures: number | undefined
    // monthly_expenditures_needs/domestic_expenditures [integer] Domestic Cleaning items (sponges, dishwashing soap, etc)
    domestic_expenditures: number | undefined
    // monthly_expenditures_needs/nfi_expenditures [integer] Household non-food items (Towel sets, blankets, kitchen set, jerrycan, bucket, bed linen sets, and reinforced/re-usable bags)
    nfi_expenditures: number | undefined
    // monthly_expenditures_needs/clothing_expenditures [integer] Clothing and shoes
    clothing_expenditures: number | undefined
    // monthly_expenditures_needs/heating_expenditures [integer] Heating (fuel)
    heating_expenditures: number | undefined
    // monthly_expenditures_needs/utilities_expenditures [integer] Utilities (electricity, gas, fuel for cooking)
    utilities_expenditures: number | undefined
    // monthly_expenditures_needs/drinking_expenditures [integer] Drinking safe water
    drinking_expenditures: number | undefined
    // monthly_expenditures_needs/rent_expenditures [integer] Rent
    rent_expenditures: number | undefined
    // monthly_expenditures_needs/healthcare_expenditures [integer] Healthcare needs
    healthcare_expenditures: number | undefined
    // monthly_expenditures_needs/special_expenditures [integer] Special food for children or pregnant women
    special_expenditures: number | undefined
    // monthly_expenditures_needs/transportation_expenditures [integer] Transportation
    transportation_expenditures: number | undefined
    // monthly_expenditures_needs/education_expenditures [integer] Education materials (e.g. books)
    education_expenditures: number | undefined
    // monthly_expenditures_needs/communication_needs [integer] Communication needs
    communication_needs: number | undefined
    // monthly_expenditures_needs/family_budget [integer] Family budget
    family_budget: number | undefined
    // livelihoods_score/not_livelihoods [note] We ask about Livelihood Coping Strategies to understand how your household manages during difficult times.  This shows us if you need to make tough choices, like selling items or reducing meals.  Your answers help us know what kind of support would be most useful for you.
    not_livelihoods: string
    // livelihoods_score/lcs_spent_savings [select_one] In the last 30 days, spent savings due to lack of resources to access essential needs?
    lcs_spent_savings: undefined | Option<'lcs_withdrew_children'>
    // livelihoods_score/lcs_forrowed_food [select_one] In the last 30 days, borrowed money to access essential needs?
    lcs_forrowed_food: undefined | Option<'lcs_withdrew_children'>
    // livelihoods_score/lcs_reduced_utilities [select_one] In the last 30 days, reduced or ceased payments on essential utilities and bills due to lack of resources to access essential needs?
    lcs_reduced_utilities: undefined | Option<'lcs_withdrew_children'>
    // livelihoods_score/lcs_reduce_education_expenditures [select_one] In the last 30 days, reduced expenses on education due to lack of resources to access essential needs?
    lcs_reduce_education_expenditures: undefined | Option<'lcs_withdrew_children'>
    // livelihoods_score/lcs_sell_productive_assets [select_one] In the last 30 days, sold productive assets or means of transport (sewing machine, wheelbarrow, bicycle, car, etc.) due to lack of resources to access essential needs.
    lcs_sell_productive_assets: undefined | Option<'lcs_withdrew_children'>
    // livelihoods_score/lcs_reduce_health_expenditures [select_one] In the last 30 days, reduced expenses on essential health (including medicines) due to lack of resources to access essential needs.
    lcs_reduce_health_expenditures: undefined | Option<'lcs_withdrew_children'>
    // livelihoods_score/lcs_sell_hh_assets [select_one] In the last 30 days, sold household assets (furniture, appliances, jewelry, etc.) due to lack of resources to access essential needs?
    lcs_sell_hh_assets: undefined | Option<'lcs_withdrew_children'>
    // livelihoods_score/lcs_sell_house [select_one] In the last 30 days, selling property (house and/or land) that you did not want to sell
    lcs_sell_house: undefined | Option<'lcs_withdrew_children'>
    // livelihoods_score/lcs_strangers_money [select_one] In the last 30 days, have to ask strangers for money, or search for food which was free outside?
    lcs_strangers_money: undefined | Option<'lcs_withdrew_children'>
    // livelihoods_score/lcs_degrading_income_source [select_one] In the last 30 days, Have to take a job or employment which you would not have preferred to engage with, or makes you feel uncomfortable (for example having to work in contaminated fields, engaging in potentially dangerous or taboo work)
    lcs_degrading_income_source: undefined | Option<'lcs_withdrew_children'>
    // livelihoods_score/lcs_reason [select_multiple] What were the main reasons why your household decided to use these strategies?
    lcs_reason: undefined | Option<'lcs_reason'>[]
    // livelihoods_score/lcs_reason_other [text] If other, specify
    lcs_reason_other: string | undefined
    // livelihoods_score/lcs_move_elsewhere [select_one] During the past 30 days, did your HH member(-s) move elsewhere in search of work due to a lack of resources to cover basic needs (such as food, shelter, health, education, utilities, fuel for heating, drinking water, etc.)?
    lcs_move_elsewhere: undefined | Option<'lcs_withdrew_children'>
    // livelihoods_score/lcs_withdrew_children [select_one] During the past 30 days, did your household withdrew children from school
    lcs_withdrew_children: undefined | Option<'lcs_withdrew_children'>
    // fin_det/fin_det_res [text] Comments Respondent
    fin_det_res: string | undefined
    // fin_det/fin_det_enum [text] Comments Enumerator
    fin_det_enum: string | undefined
    // fin_det/not_add_photo [note] **Picture of any other relevant document The following is a list of non-mandatory but recommended documents that may be requested, depending on availability and the type of group. These documents can help justify the partner’s eligibility for tax exemption, as they relate to conflict-affected populations. It is not required to submit all of them—one or more may be requested based on the context. No documents other than those listed below may be requested or uploaded.** - Police reports, building inspection certificates, official documentation of the damage. - Local authorities lists. - Photos of the damage. Evacuation orders and announcements. - Registration records in official evacuation/transit centers or collective sites. - Transport receipt. - IDP certificate or other registration documents established by local authorities. - Documentation verifying a self-evacuation and new location vs the previous place of origin or habitual residence (place of residence as indicated in Ukraine passport, place of residence as indicated in paper annex to Ukraine ID-card, certificate of actual place of residence, rental agreement).  - Lists/documentation provided by humanitarian organizations, CSOs, and volunteers conducting evacuations)  - Damaged property report
    not_add_photo: string
    // fin_det/fin_det_oth_doc_im [image] Additionals photos
    fin_det_oth_doc_im: string
    // fin_det/additionals_photo1 [image] Additionals photos
    additionals_photo1: string
    // fin_det/additionals_photo2 [image] Additionals photos
    additionals_photo2: string
    // fin_det/additionals_photo3 [image] Additionals photos
    additionals_photo3: string
    // not_thank [note] Thank you for providing these answers, DRC will be in touch with you in the following week to notify if you are eligible for assistance. Please note you have been provided our Complaint and Feedback Mechanism details if you have any feedback on the registration process today.
    not_thank: string
  }
  export const options = {
    back_office: {
      dnk: `Dnipro (DNK)`,
      hrk: `Kharkiv (HRK)`,
      nlv: `Mykloaiv (NLV)`,
      umy: `Sumy (UMY)`,
    },
    back_enum: {
      anna_artiukh: `Anna Artiukh`,
      vitalii_hrynenko: `Vitalii Hrynenko`,
      yevhenii_musiienko: `Yevhenii Musiienko`,
      maksym_sedun: `Maksym Sedun`,
      umy_enum1: `Enumerator 1`,
      umy_enum2: `Enumerator 2`,
      umy_enum3: `Enumerator 3`,
      oleksii_marchenko: `Oleksii Marchenko`,
      artem_chernukha: `Artem Chernukha`,
      svitlana_labunska: `Svitlana Labunska`,
      nataliia_lanina: `Nataliia Lanina`,
      olena_suhoniak: `Olena Suhoniak`,
      mykola_marchenko: `Mykola Marchenko`,
      inna_kovalchuk: `Inna Kovalchuk`,
      oleksandr_shmunk: `Oleksandr Shmunk`,
      mykyta_pokynboroda: `Mykyta Pokynboroda`,
      ievgen_kylymenniy: `Ievgen Kylymenniy`,
      polina_prusakova: `Polina Prusakova`,
      anna_pastushenko: `Anna Pastushenko`,
      nlv_ex1: `Extra 1`,
      nlv_ex2: `Extra 2`,
      serhii_dolzhenko: `Serhii Dolzhenko`,
      viktoria_klymenko: `Viktoria Klymenko`,
      karina_korzh: `Karina Korzh`,
      serhii_nevmyvaka: `Serhii Nevmyvaka`,
      olha_osmukha: `Olha Osmukha`,
      halyna_diachenko: `Halyna Diachenko`,
      mariia_kozachko: `Mariia Kozachko`,
      oleksandr_narsieiev: `Oleksandr Narsieiev`,
      dnk_ex1: `Enumerator 1`,
      dnk_ex2: `Enumerator 2`,
      dnk_ex3: `Enumerator 3`,
      dnk_ex4: `Enumerator 4`,
      yurii_volkov: `Yurii Volkov`,
      andrii_zagoruiev: `Andrii Zagoruiev`,
      olena_sydorenko: `Olena Sydorenko`,
      svitlana_smyrnova: `Svitlana Smyrnova`,
      tetiana_konovshii: `Tetiana Konovshii`,
      bohdan_taranushchenko: `Bohdan Taranushchenko`,
      nataliia_yermolova: `Nataliia Yermolova`,
      ivan_prokopkin: `Ivan Prokopkin`,
      nataliia_bykova: `Nataliia Bykova`,
      oleksii_pohorielov: `Oleksii Pohorielov`,
      vitalii_shapoval: `Vitalii Shapoval`,
      hrk_ex1: `Extra 1`,
      hrk_ex2: `Extra 2`,
    },
    mpca_donor: {
      ukr000270_pooledfunds: `UKR-000270 Pooled Funds`,
      ukr000314_uhf4: `UKR-000314 UHF4`,
      ukr000322_echo2: `UKR-000322 ECHO2`,
      ukr000329_sida: `UKR-000329 SIDA`,
      ukr000330_sdc2: `UKR-000330 SDC2`,
      ukr000336_uhf6: `UKR-000336 UHF6`,
      ukr000342_pooledfunds: `UKR-000342 Pooled Funds`,
      ukr000345_bha2: `UKR-000345 BHA2`,
      ukr000360_novonordisk: `UKR-000360 Novo-Nordisk`,
      ukr000370_sida: `UKR-000370 SIDA`,
      ukr000372_echo3: `UKR-000372 ECHO3`,
      ukr000380_danida: `UKR-000380 DANIDA`,
      ukr000386_mass_appeal: `UKR-000386 Mass Appeal Ukraine 2024`,
      ukr000418_sida: `UKR-000418 SIDA`,
      ukr000423_echo4: `UKR-000423 ECHO4`,
    },
    back_prog_type: {
      mpca: `MPCA`,
      esk: `Emergency Shelter Kit`,
      nfi: `NFI`,
    },
    receive_pss: {
      yes: `Yes`,
      no: `No`,
    },
    back_refer_who: {
      prot: `Protection`,
      legal: `Legal`,
      shelter: `Shelter`,
      ecrec: `EcRec`,
      eore: `EORE`,
      none: `None`,
    },
    sufficientiving_spaces: {
      yes: `Yes`,
      no: `No`,
      dk: `I don't know/No idea`,
    },
    separate_space_girls: {
      yes: `Yes`,
      no: `No`,
      not_applicable: `Not applicable as we don't have such members`,
    },
    lcs_withdrew_children: {
      yes: `Yes`,
      no_had_no_need_to_use_this_coping_strategy: `No, had no need to use this coping strategy`,
      no_have_already_exhausted_this_coping_strategy_and_cannot_use_it_again: `No, have already exhausted this coping strategy and cannot use it again`,
      not_applicable_this_coping_strategy_is_not_available_to_me: `Not applicable / This coping strategy is not available to me`,
      prefer_not_to_answer: `Prefer not to answer`,
    },
    lcs_reason: {
      to_access_or_pay_for_food: `To access or pay for food`,
      to_access_or_pay_for_healthcare: `To access or pay for healthcare`,
      to_access_or_pay_for_shelter: `To access or pay for shelter`,
      to_access_or_pay_for_education: `To access or pay for education`,
      other: `Other`,
      dont_know: `Don't know`,
    },
    ben_det_oblast: {
      cherkaska: `Cherkaska`,
      chernihivska: `Chernihivska`,
      chernivetska: `Chernivetska`,
      dnipropetrovska: `Dnipropetrovska`,
      donetska: `Donetska`,
      'ivano-frankivska': `Ivano-Frankivska`,
      kharkivska: `Kharkivska`,
      khersonska: `Khersonska`,
      khmelnytska: `Khmelnytska`,
      kirovohradska: `Kirovohradska`,
      kyivska: `Kyivska`,
      luhanska: `Luhanska`,
      lvivska: `Lvivska`,
      mykolaivska: `Mykolaivska`,
      odeska: `Odeska`,
      poltavska: `Poltavska`,
      rivnenska: `Rivnenska`,
      sevastopilska: `Sevastopilska`,
      sumska: `Sumska`,
      ternopilska: `Ternopilska`,
      vinnytska: `Vinnytska`,
      volynska: `Volynska`,
      zakarpatska: `Zakarpatska`,
      zaporizka: `Zaporizka`,
      zhytomyrska: `Zhytomyrska`,
    },
    hh_char_hh_res_stat: {
      idp_after_evacuation: `Internally Displaced Person after evacuation`,
      idp: `Internally Displaced Person (IDP)`,
      long_res: `Long - Term Resident`,
      ret: `Returnee`,
      ref_asy: `Refugee/asylum seeker`,
    },
    hh_char_hh_det_gender: {
      male: `Male`,
      female: `Female`,
    },
    undefined: {
      single: `Single (Never Married)`,
      dom_part: `Not Married but Living in Domestic Partnership`,
      married: `Married`,
      div_sep: `Divorced/Seperated`,
      widow: `Widowed`,
      abandoned: `Abandoned`,
      rent: `Find Rental Accommodation`,
      host: `Living with Friends/Family/Host`,
      own_prop: `Living in Own Property`,
      coll_cen: `Living in Collective Center`,
      homeless: `Homeless`,
      other_accom: `Other`,
      secure: `Secure for Medium/Long Term`,
      unable_pay: `Currently Unable to Pay Rent/Contribute to Collective Costs`,
      dan_unable_pay: `In Danger of Being Unable to Pay Rent/Contribute to Collective Costs`,
      unsuit_accom: `Accommodation Unsuitable for my needs`,
      eviction: `Eviction/Removal for Other Reasons`,
      remain: `Remain in Current Place`,
      not_sure: `Not Sure/Don’t Know`,
      always: `Always`,
      not_always: `Not always on but comes daily`,
      intermittent: `Comes on intermittent days`,
      rarely: `Rarely`,
      never: `Never`,
      thermal_comfort: `Thermal comfort`,
      fresh_air: `Fresh air`,
      protection_elements: `Protection from the elements`,
      privacy: `Privacy`,
      safety_health: `Safety and health`,
      drinking: `For drinking`,
      cooking: `For cooking`,
      washing: `For washing`,
      none: `None`,
      police_reports: `Police reports, building inspection certificates, official documentation of the damage.`,
      local_authorities_lists: `Local authorities lists.`,
      photos_damage: `Photos of the damage. Evacuation orders and announcements.`,
      records_official_evacuation: `Registration records in official evacuation/transit centers or collective sites.`,
      transport_receipt: `Transport receipt.`,
      idp_certificate: `IDP certificate or other registration documents established by local authorities.`,
      verifying_self_evacuation: `Documentation verifying a self-evacuation and new location vs the previous place of origin or habitual residence (place of residence as indicated in Ukraine passport, place of residence as indicated in paper annex to Ukraine ID-card, certificate of actual place of residence, rental agreement).`,
      documentation_ngo: `Lists/documentation provided by humanitarian organizations, CSOs, and volunteers conducting evacuations)`,
    },
    hh_char_hh_det_dis_select: {
      diff_see: `Have difficulty seeing, even if wearing glasses`,
      diff_hear: `Have difficulty hearing, even if using a hearing aid`,
      diff_walk: `Have difficulty walking or climbing steps`,
      diff_rem: `Have difficulty remembering or concentrating`,
      diff_care: `Have difficulty with self-care such as washing all over or dressing`,
      diff_comm: `Have difficulty communicating, for example understanding or being understood`,
      diff_none: `None of the above apply`,
    },
    hh_char_hh_det_dis_level: {
      zero: `No, no difficulty`,
      one: `Yes, some difficulty`,
      two: `Yes, a lot of difficulty`,
      fri: `Cannot do at all`,
    },
    esk_shelter_damage: {
      no_damage: `No Structural Damage`,
      minor_damage: `Minor Damage (light or medium damages such as broken windows and doors, minor roof damage)`,
      heavy_damage: `Heavy Damage`,
    },
    pay_det_id_type: {
      nat_pass_card: `National Passport (card)`,
      nat_pass_book: `National Passport (book)`,
      nat_pass_diia: `National Passport (Diia app)`,
      pass_ussr_red: `Passport (USSR red book)`,
      pass_int: `Passport for international travel`,
      birth_certificate: `Birth certificate`,
      driver_lic: `Driver’s license`,
      pen_cert: `Pensioner certificate`,
      oth_id: `Other Form of ID`,
      no_id: `No ID`,
    },
    pay_det_pay_meth: {
      raiff_trans: `Remittance Raiffaisen AVAL`,
      ukrpost: `Ukrposhta`,
      bank_card: `Bank card`,
      other_pay: `Other Payment Method`,
      none_pay: `None of the above fit my needs`,
    },
    extent_basic_needs_bha345: {
      all: `All`,
      most: `Most`,
      about_half: `About half`,
      some: `Some(less than half)`,
      none: `None`,
    },
    basic_needs_unable_fulfill_bha345: {
      food_drink: `Food & drink`,
      rent: `Rent`,
      utilities: `Utilities`,
      clothes: `Clothes`,
      payment_mobile_communications: `Payment for mobile communications`,
      health_care: `Health Care`,
      education: `Education`,
      transportation: `Transportation`,
      debt_repayment: `Debt Repayment`,
      investment_productive_assets: `Investment in productive assets (agricultural inputs, seed capital business….)`,
      shelter_maintenance: `Shelter maintenance (repair work)`,
      protection: `Protection (legal or administrative services [passports, birth certificates…], psychosocial support, transportation to access services, specialized medical assistance)`,
      winter_items: `Winter items (blankets, winter clothes, fuel, wood…)`,
      evacuation_costs: `Evacuation costs`,
      savings: `Savings`,
      remittances: `Remittances`,
      hygiene_items: `Hygiene items`,
      household_items: `Household items (bedding, dishes, mattress, etc.)`,
      shoes: `Shoes`,
      alcoholic_drinks: `Alcoholic drinks`,
      tobacco_products: `Tobacco products`,
      other: `Other`,
    },
    basic_needs_unable_fully_reason_bha345: {
      insufficient_cash: `Insufficient cash resources`,
      lack_services: `Lack of goods/services`,
      lack_access_safety: `Lack of physical access related to safety`,
      other: `Other (specify)`,
    },
    items_basicevel_comfort_no_bha_345: {
      clothing: `Clothing`,
      bedding: `Bedding`,
      cooking_dining_utensils: `Cooking and dining utensils`,
      lighting: `Lighting`,
      fuel_heating: `Fuel/heating`,
      shoes: `Shoes`,
      other: `Other`,
    },
    where_staying: {
      collective_center: `At a collective/transit center`,
      hosted_friends: `I'm hosted by relatives or friends`,
      hosted_people_dk: `I'm hosted by people I didn’t know before`,
      renting_apartment: `I'm renting an apartment`,
      hotel_hostel: `I'm at hotel/hostel`,
      own_house: `I'm at my own house`,
      dh_housing_dk: `I don’t have housing yet - I don't know where I'll be living`,
      dorm: `In dorm`,
      other: `Other`,
    },
    reduction_income: {
      member_injured: `A family member was injured and is currently receiving medical treatment or hospitalized due to a conflict related event`,
      member_passed: `A family member passed away due to a conflict-related event`,
      member_sick_leave: `A family member is on sick leave due to an injury related to the conflict related event`,
      no_events: `No such events occurred`,
      other: `Other`,
    },
    plan_general_living: {
      current_salary: `✅ Current Salary/other income generating activity`,
      borrow_money: `❌ Borrow money from friends and family`,
      buying_credit: `❌ Buying on credit at shops`,
      loan_bank: `❌ Take a loan from a bank or micro-finance institutions`,
      selling_households_items: `❌ Selling of critical households’ items/assets (households goods, means of transportation [car, bike, etc.], land/house)`,
      moving_unsafe_area: `❌ Moving to a more unsafe area / overcrowded dwelling`,
      reduce_health_expenditures: `❌ Reduce/Postpone essential health expenditures (including drugs, etc.)?`,
      reduce_essential_education: `❌ Reduce essential education expenditures?`,
      apply_humanitarian_aid: `✅ Apply for humanitarian aid`,
      look_new_job: `✅ Look for a new/second job`,
      remittances: `✅ Remittances (money from abroad)`,
      dividends_investments: `✅ Dividends from investments/ rental payments from house`,
      decrease_household_expenditures: `❌ Decrease household expenditures`,
      buy_small_amounts: `❌ Buy small amounts of goods/shop at discount stores`,
      received_social_benefits: `✅ Received Social Benefits (Pensions, Disability, ETC)`,
    },
    legal_support: {
      lost_documents: `Lost or damaged personal documents or property ownership documents`,
      damaged_housing: `Damaged or destroyed housing.`,
      injuries_explosive: `Injuries caused by explosive ordnance`,
      no: `No`,
      pns: `Prefer not to say`,
    },
    stressful_events: {
      yes: `Yes`,
      no: `No`,
      pns: `Prefer not to say`,
    },
    recent_shock: {
      new: `Damaged by recent shock`,
      old: `Old and in disrepair`,
    },
    repair_home_there: {
      yes: `Yes, I can`,
      no: `No, I need support`,
    },
  } as const

  const extractQuestionName = (_: Record<string, any>) => {
    const output: any = {}
    Object.entries(_).forEach(([k, v]) => {
      const arr = k.split('/')
      const qName = arr[arr.length - 1]
      output[qName] = v
    })
    return output
  }

  export const map = (_: Record<keyof T, any>): T =>
    ({
      ..._,
      date: _.date ? new Date(_.date) : undefined,
      back_prog_type: _.back_prog_type?.split(' '),
      ben_det_ph_number: _.ben_det_ph_number ? +_.ben_det_ph_number : undefined,
      plan_general_living: _.plan_general_living?.split(' '),
      ben_det_income: _.ben_det_income ? +_.ben_det_income : undefined,
      ben_det_hh_size: _.ben_det_hh_size ? +_.ben_det_hh_size : undefined,
      hh_char_hh_det: _['hh_char_hh_det']?.map(extractQuestionName).map((_: any) => {
        _['hh_char_date_birth'] = _.hh_char_date_birth ? new Date(_.hh_char_date_birth) : undefined
        _['hh_char_hh_det_age'] = _.hh_char_hh_det_age ? +_.hh_char_hh_det_age : undefined
        _['hh_char_hh_det_dis_select'] = _.hh_char_hh_det_dis_select?.split(' ')
        return _
      }),
      pregnant_count: _.pregnant_count ? +_.pregnant_count : undefined,
      nfi_dist_hkf: _.nfi_dist_hkf ? +_.nfi_dist_hkf : undefined,
      nfi_dist_nfkf_ks: _.nfi_dist_nfkf_ks ? +_.nfi_dist_nfkf_ks : undefined,
      nfi_kit_cc: _.nfi_kit_cc ? +_.nfi_kit_cc : undefined,
      nfi_bed: _.nfi_bed ? +_.nfi_bed : undefined,
      nfi_fks: _.nfi_fks ? +_.nfi_fks : undefined,
      esk_estimate_sqm_damage: _.esk_estimate_sqm_damage ? +_.esk_estimate_sqm_damage : undefined,
      esk_note_eligible: _.esk_note_eligible ? +_.esk_note_eligible : undefined,
      basic_needs_unable_fulfill_bha345: _.basic_needs_unable_fulfill_bha345?.split(' '),
      basic_needs_unable_fully_reason_bha345: _.basic_needs_unable_fully_reason_bha345?.split(' '),
      items_basicevel_comfort_no_bha_345: _.items_basicevel_comfort_no_bha_345?.split(' '),
      food_expenditures: _.food_expenditures ? +_.food_expenditures : undefined,
      hygiene_expenditures: _.hygiene_expenditures ? +_.hygiene_expenditures : undefined,
      domestic_expenditures: _.domestic_expenditures ? +_.domestic_expenditures : undefined,
      nfi_expenditures: _.nfi_expenditures ? +_.nfi_expenditures : undefined,
      clothing_expenditures: _.clothing_expenditures ? +_.clothing_expenditures : undefined,
      heating_expenditures: _.heating_expenditures ? +_.heating_expenditures : undefined,
      utilities_expenditures: _.utilities_expenditures ? +_.utilities_expenditures : undefined,
      drinking_expenditures: _.drinking_expenditures ? +_.drinking_expenditures : undefined,
      rent_expenditures: _.rent_expenditures ? +_.rent_expenditures : undefined,
      healthcare_expenditures: _.healthcare_expenditures ? +_.healthcare_expenditures : undefined,
      special_expenditures: _.special_expenditures ? +_.special_expenditures : undefined,
      transportation_expenditures: _.transportation_expenditures ? +_.transportation_expenditures : undefined,
      education_expenditures: _.education_expenditures ? +_.education_expenditures : undefined,
      communication_needs: _.communication_needs ? +_.communication_needs : undefined,
      family_budget: _.family_budget ? +_.family_budget : undefined,
      lcs_reason: _.lcs_reason?.split(' '),
    }) as T
}
