export namespace Bn_cashForRentRegistration {
  export type Option<T extends keyof typeof options> = keyof (typeof options)[T]

  // Form id: ajNzDaUuLkcEvjQhVsAmao
  export interface T {
    start: string,
    end: string,
    // background/application_form_id [text] Application Form ID
    application_form_id: string | undefined,
    // background/back_office [select_one] 1.1 Select Office
    back_office: undefined | Option<'back_office'>,
    // background/back_enum [select_one] 1.2 Enumerator
    back_enum: undefined | Option<'back_enum'>,
    // background/back_project_donor [select_one] 1.3 Project & Donor
    back_project_donor: undefined | Option<'back_project_donor'>,
    // background/back_referral [select_one] 1.4 Was this case an internal DRC referral?
    back_referral: undefined | Option<'pay_det_tax_exempt'>,
    // background/back_refer_who [select_one] 1.4.1 From which Department was the referral?
    back_refer_who: undefined | Option<'back_refer_who'>,
    // background/back_consent [select_one] 1.5 Consent
    back_consent: undefined | Option<'pay_det_tax_exempt'>,
    // ben_det/ben_det_surname [text] 2.1 What is your last name (as shown in personal ID)?
    ben_det_surname: string | undefined,
    // ben_det/ben_det_first_name [text] 2.2 What is your first name (as shown in personal ID)?
    ben_det_first_name: string | undefined,
    // ben_det/ben_det_pat_name [text] 2.3 What is your patronymic name?
    ben_det_pat_name: string | undefined,
    // ben_det/ben_det_ph_number [integer] 2.4 What is your phone number?
    ben_det_ph_number: number | undefined,
    // ben_det/ben_det_oblast [select_one] 2.5 Select oblast where registration is taking place
    ben_det_oblast: undefined | Option<'ben_det_oblast'>,
    // ben_det/ben_det_raion [select_one] 2.6 Select raion where registration is taking place
    ben_det_raion: undefined | string,
    // ben_det/ben_det_hromada [select_one] 2.7 Select hromada where registration is taking place
    ben_det_hromada: undefined | string,
    // ben_det/ben_det_settlement [select_one_from_file] 2.8 Select settlement where registration is taking place
    ben_det_settlement: string,
    // ben_det/ben_det_address [text] 2.9 Exact address
    ben_det_address: string | undefined,
    // ben_det/ben_det_res_stat [select_one] 2.10 Select residential status
    ben_det_res_stat: undefined | Option<'ben_det_res_stat'>,
    // ben_det/ben_det_oblast_displacement [select_one] 2.11 What is your area of origin prior to displacement?
    ben_det_oblast_displacement: undefined | Option<'ben_det_oblast_displacement'>,
    ben_det_cal_displacement: string,
    // ben_det/ben_det_hous_dam [select_one] 2.12 Households whose home has been significantly damaged (i.e., the level of destruction does not allow living in the house) or destroyed by shelling or other disasters such as flood, wildfire, etc., since February 24, 2022
    ben_det_hous_dam: undefined | Option<'pay_det_tax_exempt'>,
    // ben_det/ben_disp_60 [select_one] 2.13 Displaced within last 60 days
    ben_disp_60: undefined | Option<'pay_det_tax_exempt'>,
    // ben_det/ben_det_disp_30 [select_one] 2.14 Displaced within last 30 days
    ben_det_disp_30: undefined | Option<'pay_det_tax_exempt'>,
    // ben_det/ben_det_total_value [integer] 2.15 What was the total value in UAH of all the resources your household received in the last one month?
    ben_det_total_value: number | undefined,
    // ben_det/ben_det_assistance_conditional [select_one] 2.16 This assistance is conditional in that the cash transfers are meant to help you cover the cost of rent. Will you be able to provide DRC with proof of monthly payments?
    ben_det_assistance_conditional: undefined | Option<'pay_det_tax_exempt'>,
    // ben_det/ben_det_receive_assistance [select_one] 2.17 To receive this assistance, DRC will need to confirm that you are living in a rented apartment by conducting monitoring visit at some point during the six-month period. Do you consent to having DRC staff visit the rented apartment?
    ben_det_receive_assistance: undefined | Option<'pay_consent'>,
    // ben_det/ben_det_assistance_6months [select_one] 2.18 As this assistance is only for 6 months, will you be able to continue to cover the cost of the rent independently after this period?
    ben_det_assistance_6months: undefined | Option<'pay_det_tax_exempt'>,
    // characteristics_vulnerability/hh_char_hhh [select_one] 3.1 Are you the head of your household?
    hh_char_hhh: undefined | Option<'pay_det_tax_exempt'>,
    // characteristics_vulnerability/hh_char_res_gender [select_one] 3.2 What is the gender of head of household?
    hh_char_res_gender: undefined | Option<'hh_char_hh_det_gender'>,
    // characteristics_vulnerability/hh_char_res_age [integer] 3.3 What is the age of the Head of Household?
    hh_char_res_age: number | undefined,
    // characteristics_vulnerability/hh_char_civ_stat [select_one] 3.4 What is the civil status of the Head of Household?
    hh_char_civ_stat: undefined | Option<'hh_char_civ_stat'>,
    // characteristics_vulnerability/ben_det_hh_size [integer] 3.5 Indicate the total number of people in your household, including the HHH
    ben_det_hh_size: number | undefined,
    // characteristics_vulnerability/hh_char_hh_det [begin_repeat] 3.6 HH Members
    hh_char_hh_det: {
      hh_char_hh_det_gender: undefined | Option<'hh_char_hh_det_gender'> | undefined,
      hh_char_hh_det_age: number | undefined | undefined,
      calc_u18: string | undefined,
      calc_o60: string | undefined,
      calc_ed_age: string | undefined,
      calc_baby_age: string | undefined,
      calc_preg: string | undefined
    }[] | undefined,
    // characteristics_vulnerability/hh_char_dis_select [select_multiple] 3.7 The next set of questions ask about difficulties you or members of your household may have doing certain activities. These questions only relates to household members over the age of 5 years old.
    hh_char_dis_select: undefined | Option<'hh_char_dis_select'>[],
    // characteristics_vulnerability/hh_char_dis_level [select_one] 3.8 What is the level of difficulty for the selected options in the previous questions?
    hh_char_dis_level: undefined | Option<'hh_char_dis_level'>,
    // characteristics_vulnerability/household_chronic_diseases [select_one] 3.9 Does the household have persons with disabilities or persons with chronic diseases?
    household_chronic_diseases: undefined | Option<'pay_consent'>,
    // characteristics_vulnerability/household_3children [select_one] 3.10 Does the household have 3 or more children under the age of 18?
    household_3children: undefined | Option<'pay_consent'>,
    // characteristics_vulnerability/single_person_1child [select_one] 3.11 Is the household headed by a single person and is there at least one child under the age of 18?
    single_person_1child: undefined | Option<'pay_consent'>,
    // characteristics_vulnerability/Single_elderly_people [select_one] 3.12 Single elderly people or a household of people over 60?
    Single_elderly_people: undefined | Option<'pay_consent'>,
    // characteristics_vulnerability/household_pregnat_lactating [select_one] 3.13 Are any of the females in the household pregnat or lactating?
    household_pregnat_lactating: undefined | Option<'pay_consent'>,
    // characteristics_vulnerability/hh_char_barriers_documentation [select_one] 3.14 Have you experienced any barriers in obtaining or accessing civil documentation, including identity documentation, IDP registration and/or HLP documentation?
    hh_char_barriers_documentation: undefined | Option<'hh_char_barriers_documentation'>,
    // characteristics_vulnerability/hh_char_barriers_documentation_yes [select_one] 3.14.1 Do you agree to a member of our Legal Aid team contacting you in future to understand your challenges and provide information or consultation assistance?
    hh_char_barriers_documentation_yes: undefined | Option<'pay_det_tax_exempt'>,
    // cfr/cfr_support_another_organisation [select_one] 4.1 Are you currently receiving rent support from another organisation?
    cfr_support_another_organisation: undefined | Option<'pay_det_tax_exempt'>,
    // cfr/cfr_curr_accom [select_one] 4.2 What is your current accommodation status?
    cfr_curr_accom: undefined | Option<'cfr_curr_accom'>,
    // cfr/cfr_rent_apartment [select_one] 4.2.1 If you rent an apartment or house, do you have an agreement with the landlord? OR Can you sign a contract?
    cfr_rent_apartment: undefined | Option<'pay_det_tax_exempt'>,
    // cfr/cfr_continue_renting [select_one] 4.3 Do you intend to continue renting your current accommodation?
    cfr_continue_renting: undefined | Option<'pay_det_tax_exempt'>,
    // cfr/cfr_status_current [select_one] 4.4 What is the status of your current rental accommodation?
    cfr_status_current: undefined | Option<'cfr_status_current'>,
    // cfr/cfr_identified_apartment [select_one] 4.5 Have you already identified a potential apartment?
    cfr_identified_apartment: undefined | Option<'pay_det_tax_exempt'>,
    // cfr_accom_cond/cfr_accom_cond_wat_pr [select_one] 5.1 Is your dwelling water proof?
    cfr_accom_cond_wat_pr: undefined | Option<'pay_det_tax_exempt'>,
    // cfr_accom_cond/cfr_accom_cond_run_wat [select_one] 5.2 Do you have access to running water
    cfr_accom_cond_run_wat: undefined | Option<'cfr_accom_cond_heat'>,
    // cfr_accom_cond/cfr_accom_cond_hot_wat [select_one] 5.3 Do you have access to hot water
    cfr_accom_cond_hot_wat: undefined | Option<'cfr_accom_cond_heat'>,
    // cfr_accom_cond/cfr_accom_cond_wash [select_one] 5.4 Do you have access to adequate washing facilities?
    cfr_accom_cond_wash: undefined | Option<'cfr_accom_cond_heat'>,
    // cfr_accom_cond/cfr_accom_cond_san [select_one] 5.5 Do you have access to adequate sanitation facilities?
    cfr_accom_cond_san: undefined | Option<'cfr_accom_cond_heat'>,
    // cfr_accom_cond/cfr_accom_cond_heat [select_one] 5.6 Do you have access to adequate heating?
    cfr_accom_cond_heat: undefined | Option<'cfr_accom_cond_heat'>,
    // cfr_accom_cond/cfr_accom_cond_draft [select_one] 5.7 Does your property have draft proofing?
    cfr_accom_cond_draft: undefined | Option<'pay_det_tax_exempt'>,
    // cfr_accom_cond/cfr_accom_cond_insul [select_one] 5.8 Is your property adequately insulated?
    cfr_accom_cond_insul: undefined | Option<'pay_det_tax_exempt'>,
    // cfr_accom_cond/cfr_accom_cond_lock_doors [select_one] 5.9 Do you have access to external locked doors on your property?
    cfr_accom_cond_lock_doors: undefined | Option<'pay_det_tax_exempt'>,
    // cfr_accom_cond/cfr_accom_cond_accomodation_another [select_one] 5.10 Does your household share accomodation with another household?
    cfr_accom_cond_accomodation_another: undefined | Option<'pay_det_tax_exempt'>,
    // pay_det/pay_consent [select_one] 6.0 Thank you for answering the questions above, are you willing to provide your payment details?
    pay_consent: undefined | Option<'pay_consent'>,
    // pay_det/pay_det_s/pay_det_id_type [select_one] 6.1 What form of ID do you have?
    pay_det_id_type: undefined | Option<'pay_det_id_type'>,
    // pay_det/pay_det_s/pay_det_id_type_oth [text] 6.1.1 What other form of ID do you have?
    pay_det_id_type_oth: string | undefined,
    // pay_det/pay_det_s/pay_det_pass_ser [text] 6.2.1 Input Passport Series
    pay_det_pass_ser: string | undefined,
    // pay_det/pay_det_s/pay_det_pass_num [text] 6.2.2 Number of ID
    pay_det_pass_num: string | undefined,
    // pay_det/pay_det_s/pay_det_id_ph [image] 6.2.3 Take a photo of the ID
    pay_det_id_ph: string,
    // pay_det/pay_det_s/begin_group_vdIM9ogQb/pay_det_tax_id_yn [select_one] 6.3.1 Do you have an individual tax number (TIN)?
    pay_det_tax_id_yn: undefined | Option<'pay_det_tax_exempt'>,
    // pay_det/pay_det_s/begin_group_vdIM9ogQb/pay_det_tax_id_num [text] 6.3.2 What is your individual tax number?
    pay_det_tax_id_num: string | undefined,
    // pay_det/pay_det_s/begin_group_vdIM9ogQb/pay_det_tax_id_ph [image] 6.3.3 Take a photo of the Tax ID
    pay_det_tax_id_ph: string,
    // pay_det/pay_det_s/begin_group_vdIM9ogQb/pay_det_tax_exempt [select_one] 6.3.4 Do you have a tax exemptions?
    pay_det_tax_exempt: undefined | Option<'pay_det_tax_exempt'>,
    // pay_det/pay_det_s/begin_group_vdIM9ogQb/pay_det_tax_exempt_im [image] 6.3.5 Take a photo of the proof of the tax of exemptions
    pay_det_tax_exempt_im: string,
    // pay_det/pay_det_s/pay_det_pay_meth [select_one] 6.4.1 What is your preferred payment method?
    pay_det_pay_meth: undefined | Option<'pay_det_pay_meth'>,
    // pay_det/pay_det_s/pay_det_iban [text] 6.4.2 What is your IBAN number?
    pay_det_iban: string | undefined,
    // pay_det/pay_det_s/pay_det_iban_im [image] 6.4.3 Take a picture of IBAN number if available
    pay_det_iban_im: string,
    // pay_det/pay_det_s/pay_address [text] 6.4.4 Your address
    pay_address: string | undefined,
    // pay_det/pay_det_s/pay_zip [text] 6.4.5 Your ZIP code
    pay_zip: string | undefined,
    // pay_det/pay_det_s/pay_det_add_im [image] 6.4.6 Take a picture of the address page of passport
    pay_det_add_im: string,
    // pay_det/pay_det_s/pay_det_pay_meth_oth [text] 6.4.7 What other Payment methods do you prefer?
    pay_det_pay_meth_oth: string | undefined,
    // pay_det/pay_det_s/pay_det_pay_meth_none [text] 6.4.8 Can you highlight the main reason that none of these payment methods are suitable to you?
    pay_det_pay_meth_none: string | undefined,
    // fin_det/photo_idp [image] 7.1 Take a photo of the IDP certificate
    photo_idp: string,
    // fin_det/photo_rental_1agreement [image] 7.2 Take a picture of the housing rental agreement first page
    photo_rental_1agreement: string,
    // fin_det/photo_rental_2agreement [image] 7.2 Take a picture of the housing rental agreement last page
    photo_rental_2agreement: string,
    // fin_det/photo_other_relevant [image] 7.3 Please take picture of any other relevant document
    photo_other_relevant: string,
    // fin_det/fin_det_res [text] 7.4 Other Comments from Respondent
    fin_det_res: string | undefined,
    // fin_det/fin_det_enum [text] 7.5 Other Comments from Enumerator
    fin_det_enum: string | undefined,
  }

  export const options = {
    back_office: {
      'lwo': `Lviv (LWO)`,
      'cej': `Chernihiv (cej)`,
      'dnk': `Dnipro (DNK)`
    },
    back_enum: {
      'henadii_petrychenko': `Henadii Petrychenko`,
      'dmytro_tsaruk': `Dmytro Tsaruk`,
      'viktoria_ushan': `Viktoria Ushan`,
      'kostiantyn_yefimchuk': `Kostiantyn Yefimchuk`,
      'viktoriia_lytvynova': `Viktoriia Lytvynova`,
      'valerii_vietrov': `Valerii Vietrov`,
      'daria_kokalia': `Daria Kokalia`,
      'artem_chernukha_1': `Artem Chernukha`,
      'lwo_ex1': `Extra 1`,
      'lwo_ex2': `Extra 2`,
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
      'dmytro_chernukha': `Dmytro Chernukha`,
      'anastasiia_reshynska': `Anastasiia Reshynska`,
      'nataliia_pushenko': `Nataliia Pushenko`,
      'tetiana_gorbatiuk': `Tetiana Gorbatiuk`,
      'oleksandr_lukomets': `Oleksandr Lukomets`,
      'katerina_severin': `Katerina Severin`,
      'maksim_sedun': `Maksim Sedun`
    },
    back_project_donor: {
      'uhf4': `UHF-4`,
      'bha': `BHA`,
      'echo': `ECHO`,
      'okf': `OKF`,
      'poolfun': `Pooled Funds`
    },
    pay_det_tax_exempt: {
      'yes': `A = Yes`,
      'no': `B = No`
    },
    pay_consent: {
      'yes': `Yes`,
      'no': `No`
    },
    ben_det_res_stat: {
      'idp': `A = Internally Displaced Person (IDP)`,
      'long_res': `B = Long - Term Resident`,
      'ret': `C = Returnee`,
      'ref_asy': `D = Refugee/asylum seeker`
    },
    undefined: {
      'yes': `A = Yes`,
      'no': `B = No`,
      'other': `C = Other`
    },
    hh_char_hh_det_gender: {
      'male': `A = Male`,
      'female': `B = Female`
    },
    ben_det_oblast_displacement: {
      'aroc': `Autonomous Republic of Crimea`,
      'vinnytska': `Vinnytsia`,
      'volynska': `Volyn`,
      'dnipropetrovska': `Dnipropetrovsk`,
      'donetska': `Donetsk`,
      'zhytomyrska': `Zhytomyr`,
      'zakarpatska': `Zakarpattia`,
      'zaporizka': `Zaporizhzhia`,
      'ivano-frankivska': `Ivano-Frankivsk`,
      'kyivska': `Kyiv`,
      'kirovohradska': `Kirovohrad`,
      'luhanska': `Luhansk`,
      'lvivska': `Lviv`,
      'mykolaivska': `Mykolaiv`,
      'odeska': `Odesa`,
      'poltavska': `Poltava`,
      'rivnenska': `Rivne`,
      'sumska': `Sumy`,
      'ternopilska': `Ternopil`,
      'kharkivska': `Kharkiv`,
      'khersonska': `Kherson`,
      'khmelnytska': `Khmelnytskyi`,
      'cherkaska': `Cherkasy`,
      'chernivetska': `Chernivtsi`,
      'chernihivska': `Chernihiv`,
      'citykyiv': `City Kyiv`,
      'sevastopilska': `Sevastopil`
    },
    back_refer_who: {
      'prot': `A = Protection`,
      'legal': `B = Legal`,
      'shelter': `C = Shelter`
    },
    hh_char_dis_select: {
      'diff_see': `A = Have difficulty seeing, even if wearing glasses`,
      'diff_hear': `B = Have difficulty hearing, even if using a hearing aid`,
      'diff_walk': `C = Have difficulty walking or climbing steps`,
      'diff_rem': `D = Have difficulty remembering or concentrating`,
      'diff_care': `E = Have difficulty with self-care such as washing all over or dressing`,
      'diff_comm': `F = Have difficulty communicating, for example understanding or being understood`,
      'diff_none': `G = None of the above apply`
    },
    hh_char_dis_level: {
      'zero': `A = No, no difficulty`,
      'one': `B = Yes, some difficulty`,
      'two': `C = Yes, a lot of difficulty`,
      'fri': `D = Cannot do at all`
    },
    hh_char_barriers_documentation: {
      'yes': `A = Yes`,
      'no': `B = No`,
      'dokn': `C= Don't Know`,
      'unable': `D = Unable / unwilling to answer`
    },
    cfr_curr_accom: {
      'rent': `A = Renting Accommodation`,
      'host': `B = Living with Friends/Family/Host`,
      'own_prop': `C = Living in Own Property`,
      'coll_cen': `D = Living in Collective Center`,
      'homeless': `E = Homeless`,
      'other': `F = Other`
    },
    cfr_status_current: {
      'scsm': `A = Secure for Medium/Long Term`,
      'sccu': `B = Currently Unable to Pay Rent/Contribute to Collective Costs`,
      'scdb': `C = In Danger of Being Unable to Pay Rent/Contribute to Collective Costs`,
      'scau': `D = Accommodation Unsuitable for my needs`,
      'scer': `E = Eviction/Removal for Other Reasons`
    },
    cfr_accom_cond_heat: {
      'always': `A = Always`,
      'not_always': `B = Not always on but comes daily`,
      'intermittent': `C = Comes on intermittent days`,
      'rarely': `D = Rarely`,
      'never': `E = Never`
    },
    pay_det_id_type: {
      'nat_pass_card': `A = National Passport (card)`,
      'nat_pass_book': `B = National Passport (book)`,
      'nat_pass_diia': `C = National Passport (Diia app)`,
      'pass_ussr_red': `D = Passport (USSR red book)`,
      'pass_int': `E = Passport for international travel`,
      'birth_certificate': `F = Birth certificate`,
      'driver_lic': `G = Driver’s license`,
      'pen_cert': `H = Pensioner certificate`,
      'oth_id': `I = Other Form of ID`,
      'no_id': `J = No ID`
    },
    pay_det_pay_meth: {
      'raiff_trans': `A = Remittance Raiffaisen AVAL`,
      'ukrpost': `B = Ukrposhta`,
      'bank_card': `C = Bank card`,
      'other_pay': `D = Other Payment Method`,
      'none_pay': `E = None of the above fit my needs`
    },
    hh_char_civ_stat: {
      'single': `A = Single (Never Married)`,
      'dom_part': `B = Not Married but Living in Domestic Partnership`,
      'married': `C = Married`,
      'div_sep': `D = Divorced/Seperated`,
      'widow': `E = Widowed`,
      'abandoned': `F = Abandoned`
    },
    ben_det_oblast: {
      'dnipropetrovska': `A = Dnipropetrivska`,
      'chernihivska': `B = Chernihivska`,
      'lvivska': `C = Lvivska`
    }
  }

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
    ben_det_total_value: _.ben_det_total_value ? +_.ben_det_total_value : undefined,
    hh_char_res_age: _.hh_char_res_age ? +_.hh_char_res_age : undefined,
    ben_det_hh_size: _.ben_det_hh_size ? +_.ben_det_hh_size : undefined,
    hh_char_hh_det: _.hh_char_hh_det?.map(extractQuestionName).map((_: any) => {
      _['hh_char_hh_det_age'] = _.hh_char_hh_det_age ? +_.hh_char_hh_det_age : undefined
      return _
    }),
    hh_char_dis_select: _.hh_char_dis_select?.split(' '),
  }) as T
}