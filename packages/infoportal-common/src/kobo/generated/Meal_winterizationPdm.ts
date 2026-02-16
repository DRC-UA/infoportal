export namespace Meal_winterizationPdm {
  export type Option<T extends keyof typeof options> = keyof (typeof options)[T]
  // Form id: aj5hf3xf3jH7Uq5z7nYny4
  export interface T {
    start: string
    end: string
    // date [date] Date
    date: Date | undefined
    // metadata/interviever_name [text] Interviever's name
    interviever_name: string | undefined
    // metadata/date_interview [date] Date of interview
    date_interview: Date | undefined
    // metadata/is_partner [select_one] Filled for partner?
    is_partner: undefined | Option<'any_member_household'>
    // metadata/donor [select_one] Donor
    donor: undefined | Option<'donor'>
    // metadata/donor_other [text] If "Other", please specify
    donor_other: string | undefined
    // metadata/office [select_one] Office responsible for implementation of the project
    office: undefined | Option<'office'>
    // metadata/unique_number [integer] Beneficiary unique number
    unique_number: number | undefined
    // metadata/not_loc [note] Please, indicate your current location
    not_loc: string
    // metadata/ben_det_oblast [select_one] Select oblast
    ben_det_oblast: undefined | Option<'ben_det_oblast'>
    // metadata/ben_det_raion [select_one] Select raion
    ben_det_raion: undefined | Option<'ben_det_raion'>
    // metadata/ben_det_hromada [select_one] Select hromada
    ben_det_hromada: undefined | string
    // metadata/place_distribution [select_one_from_file] Select settlement
    place_distribution: string
    // overview/age [integer] What is your age?
    age: number | undefined
    // overview/parent_consent [select_one] Has the parent or guardian provided their consent for this individual to participate in the interview?
    parent_consent: undefined | Option<'parent_consent'>
    // overview/sex [select_one] What is your sex?
    sex: undefined | Option<'sex'>
    // overview/status_person [select_one] What is your residential status?
    status_person: undefined | Option<'status_person'>
    // overview/condition_affects_daily [select_one] Do you have any condition that affects your daily activities?
    condition_affects_daily: undefined | Option<'any_member_household'>
    // overview/number_female [integer] Number of female in the family
    number_female: number | undefined
    // overview/number_male [integer] Number of male in the family
    number_male: number | undefined
    // overview/how_many_family [integer] Number of members reside with you in the apartment/house
    how_many_family: number | undefined
    // overview/number_disabilities [integer] Number of family members with disabilities
    number_disabilities: number | undefined
    // overview/did_receive_cash [select_one] Did you receive Cash assistance from DRC?
    did_receive_cash: undefined | Option<'any_member_household'>
    // overview/did_receive_cash_no [text] If "No", please specify
    did_receive_cash_no: string | undefined
    // overview/pdmtype [select_one] What type of cash assistance have you received?
    pdmtype: undefined | Option<'pdmtype'>
    // ic/agree_interviewed [select_one] Do you agree to be interviewed?
    agree_interviewed: undefined | Option<'any_member_household'>
    // ic/spent_cash_assistance_received [select_one] Have you spent the cash assistance you received yet?
    spent_cash_assistance_received: undefined | Option<'barriers_pwd_join'>
    // ic/spent_cash_assistance_received_no [text] When do you plan to use the assistance received? (cash for fuel, cash for utilities, cash for animal feed, cash for animal shelter, agricultural needs)
    spent_cash_assistance_received_no: string | undefined
    // ic/spent_cash_assistance_received_no_mait_reason [text] What is the main reason you have not spent money yet?
    spent_cash_assistance_received_no_mait_reason: string | undefined
    // ic/spent_cash_dk [text] Why the individual does not know if they have not spent the cash?
    spent_cash_dk: string | undefined
    // use_mpca_assistance/spend_cash_received [select_one] Did you spend the cash on what you received it for? (i.e. if you received cash for utilities, did you spend it on utilities?) (if you received cash for solid fuel, did you spend it on solid fuel?)
    spend_cash_received: undefined | Option<'any_member_household'>
    // use_mpca_assistance/sectors_cash_assistance [select_multiple] Please indicate top 3 sectors what did you spend the cash assistance on?
    sectors_cash_assistance: undefined | Option<'sectors_cash_assistance'>[]
    // use_mpca_assistance/sectors_cash_assistance_other [text] If "Other", please specify
    sectors_cash_assistance_other: string | undefined
    // use_mpca_assistance/sectors_cash_assistance_food [integer] If yes, how much (%) did you spend approximately? (Food- %)
    sectors_cash_assistance_food: number | undefined
    // use_mpca_assistance/sectors_cash_assistance_hh_nfis [integer] If yes, how much (%) did you spend approximately? (HH NFIs %)
    sectors_cash_assistance_hh_nfis: number | undefined
    // use_mpca_assistance/sectors_cash_assistance_clothing [integer] If yes, how much (%) did you spend approximately? (Clothing %)
    sectors_cash_assistance_clothing: number | undefined
    // use_mpca_assistance/sectors_cash_assistance_heating [integer] If yes, how much (%) did you spend approximately? (Heating - %)
    sectors_cash_assistance_heating: number | undefined
    // use_mpca_assistance/sectors_cash_assistance_healthcare [integer] If yes, how much (%) did you spend approximately? (Health Care Regular %)
    sectors_cash_assistance_healthcare: number | undefined
    // use_mpca_assistance/sectors_cash_assistance_utilities [integer] If yes, how much (%) did you spend approximately? (Utilities - %)
    sectors_cash_assistance_utilities: number | undefined
    // use_mpca_assistance/sectors_cash_assistance_renovation_materials [integer] If yes, how much (%) did you spend approximately? (Renovation materials - %)
    sectors_cash_assistance_renovation_materials: number | undefined
    // use_mpca_assistance/sectors_cash_assistance_rent [integer] If yes, how much (%) did you spend approximately? (Rent - %)
    sectors_cash_assistance_rent: number | undefined
    // use_mpca_assistance/sectors_cash_assistance_agricultural_inputs [integer] If yes, how much (%) did you spend approximately? (Agricultural inputs - %)
    sectors_cash_assistance_agricultural_inputs: number | undefined
    // use_mpca_assistance/sectors_cash_assistance_hygiene_items [integer] If yes, how much (%) did you spend approximately? (Hygiene items - %)
    sectors_cash_assistance_hygiene_items: number | undefined
    // use_mpca_assistance/sectors_cash_assistance_medication [integer] If yes, how much (%) did you spend approximately? (Medication - %)
    sectors_cash_assistance_medication: number | undefined
    // use_mpca_assistance/sectors_cash_assistance_education_materials [integer] If yes, how much (%) did you spend approximately? (Education materials - %)
    sectors_cash_assistance_education_materials: number | undefined
    // use_mpca_assistance/sectors_cash_assistance_other_001 [integer] If yes, how much (%) did you spend approximately? (${sectors_cash_assistance_other} - %)
    sectors_cash_assistance_other_001: number | undefined
    // delivery_process/assistance_delivered [select_one] How was the assistance delivered to you?
    assistance_delivered: undefined | Option<'assistance_delivered'>
    // delivery_process/assistance_delivered_other [text] If "Other", please specify
    assistance_delivered_other: string | undefined
    // delivery_process/satisfied_process [select_one] Are you satisfied with the process you went through to receive cash assistance?
    satisfied_process: undefined | Option<'satisfied_process'>
    // delivery_process/satisfied_process_no [text] If "Not very satisfied" or "Not satisfied at all" then: could you tell us why you were not satisfied?
    satisfied_process_no: string | undefined
    // delivery_process/type_utilities_use [select_one] Which type of heating utilities did you use the assistance for
    type_utilities_use: undefined | Option<'type_utilities_use'>
    // delivery_process/informed_cash_heating [select_one] Were you informed that the cash assistance you received was intended to cover heating expenses?
    informed_cash_heating: undefined | Option<'any_member_household'>
    // delivery_process/satisfied_cash_amount [select_one] Are you satisfied with the cash amount received?
    satisfied_cash_amount: undefined | Option<'any_member_household'>
    // delivery_process/experience_problems [select_one] Did you experience any problems with the registration for cash assistance?
    experience_problems: undefined | Option<'any_member_household'>
    // delivery_process/experience_problems_yes [select_multiple] If "Yes", what was the problem?
    experience_problems_yes: undefined | Option<'experience_problems_yes'>[]
    // delivery_process/assistance_delivered_other_001 [text] If "Other", please specify
    assistance_delivered_other_001: string | undefined
    // delivery_process/organization_provide_information [select_one] Did the organization provide you with all the information you needed about the cash transfer?
    organization_provide_information: undefined | Option<'any_member_household'>
    // delivery_process/better_inform_distribution [select_multiple] What could DRC have done to better inform you about the assistance or distribution?
    better_inform_distribution: undefined | Option<'better_inform_distribution'>[]
    // delivery_process/better_inform_distribution_other [text] If "Other", please specify
    better_inform_distribution_other: string | undefined
    // sufficiency/extent_cash_correspond [select_one] To what extent did the cash assistance correspond to your energy needs this winter?
    extent_cash_correspond: undefined | Option<'extent_cash_correspond'>
    // sufficiency/extent_cash_correspond_bad [text] If "Partly corresponds" or "Does not correspond at all", please specify
    extent_cash_correspond_bad: string | undefined
    // sufficiency/level_heating_improved [select_one] Has assistance helped to improved thermal comfort or level of heating for your household during winter season?
    level_heating_improved: undefined | Option<'level_heating_improved'>
    // sufficiency/level_heating_improved_dec_other [text] If “Other”, "decreased" - Please, specify
    level_heating_improved_dec_other: string | undefined
    // sufficiency/helped_thermal_comfort [select_one] Has assistance helped to improved thermal comfort for your household during winter season?
    helped_thermal_comfort: undefined | Option<'helped_thermal_comfort'>
    // sufficiency/helped_thermal_comfort_no [text] Please, specify
    helped_thermal_comfort_no: string | undefined
    // sufficiency/type_fuel_most [select_multiple] What type of home heating fuel is most common in your community ?
    type_fuel_most: undefined | Option<'type_fuel_most'>[]
    // sufficiency/type_fuel_most_other [text] If “Other” - Please, specify
    type_fuel_most_other: string | undefined
    // sufficiency/cash_modality_inkind [select_one] Did you prefer the cash modality, or would you have liked to receive in-kind assistance?
    cash_modality_inkind: undefined | Option<'cash_modality_inkind'>
    // sufficiency/cash_modality_inkind_yes [text] If yes, please explain why:
    cash_modality_inkind_yes: string | undefined
    // cluster_question/type_fuel_receive [select_one] What type of solid fuel did you receive?
    type_fuel_receive: undefined | Option<'types_fuels_available'>
    // cluster_question/amout_solid_fuel [decimal] What amout of solid fuel did you obtain?
    amout_solid_fuel: number | undefined
    // cluster_question/informed_amount_fuel [select_one] Were you informed in advance about the amount of solid fuel you would receive?
    informed_amount_fuel: undefined | Option<'were_informed_timeframe'>
    // cluster_question/informed_amount_fuel_yes [select_one] Did the amount of solid fuel received correspond to the amount communicated to you?
    informed_amount_fuel_yes: undefined | Option<'were_informed_timeframe'>
    // cluster_question/informed_amount_fuel_no [decimal] What quantity of solid fuel did you expect to receive?
    informed_amount_fuel_no: number | undefined
    // cluster_question/heating_appliances_use [select_multiple] What kind of heating appliances do you use?
    heating_appliances_use: undefined | Option<'heating_appliances_use'>[]
    // cluster_question/amount_cash_receive [integer] What amount of cash did you receive?
    amount_cash_receive: number | undefined
    // cluster_question/informed_amount_cash_receive [select_one] Were you informed in advance about the amount of cash you would receive?
    informed_amount_cash_receive: undefined | Option<'were_informed_timeframe'>
    // cluster_question/amount_received_correspond [select_one] Did the amount of cash received correspond to the amount communicated to you?
    amount_received_correspond: undefined | Option<'were_informed_timeframe'>
    // cluster_question/amount_received_correspond_no [integer] How much money did you expect to receive?
    amount_received_correspond_no: number | undefined
    // cluster_question/problem_receiving_cash [select_one] Did you experience any problem receiving and having the cash available for expenditures?
    problem_receiving_cash: undefined | Option<'were_informed_timeframe'>
    // cluster_question/problem_receiving_cash_yes [select_multiple] What was/were the problem(s)?
    problem_receiving_cash_yes: undefined | Option<'problem_receiving_cash_yes'>[]
    // cluster_question/problem_receiving_cash_yes_other [text] If other, please specify
    problem_receiving_cash_yes_other: string | undefined
    // cluster_question/manage_solid_fuel [select_one] Did you manage to buy solid fuel ?
    manage_solid_fuel: undefined | Option<'were_informed_timeframe'>
    // cluster_question/manage_solid_fuel_no [select_multiple] If no, what was/were the problem(s)?
    manage_solid_fuel_no: undefined | Option<'manage_solid_fuel_no'>[]
    // cluster_question/manage_solid_fuel_no_other [text] If other, please specify
    manage_solid_fuel_no_other: string | undefined
    // cluster_question/type_fuel_purchase [select_one] What type of solid fuel did you purchase?
    type_fuel_purchase: undefined | Option<'types_fuels_available'>
    // cluster_question/what_fuel_cost [integer] What is the solid fuel cost?
    what_fuel_cost: number | undefined
    // cluster_question/manage_solid_fuel_no_other_unit [select_one] Please select the unit of measure
    manage_solid_fuel_no_other_unit: undefined | Option<'enough_hh_winter_season_measure'>
    // cluster_question/quantiy_fuel_purchase [integer] What quantiy of solid fuel did you manage to purchase?
    quantiy_fuel_purchase: number | undefined
    // cluster_question/enough_hh_winter_season [select_one] Is it enough for your HH whole winter season?
    enough_hh_winter_season: undefined | Option<'any_member_household'>
    // cluster_question/enough_hh_winter_season_no [decimal] If no, could you please provide the amount of solid fuel that would be sufficient for your HH for the whole winter season?
    enough_hh_winter_season_no: number | undefined
    // cluster_question/enough_hh_winter_season_measure [select_one] Please select the unit of measure
    enough_hh_winter_season_measure: undefined | Option<'enough_hh_winter_season_measure'>
    // cluster_question/enough_hh_winter_season_cash_no [decimal] If no, could you please provide the amount of cash that would be sufficient for your HH for the whole winter season?
    enough_hh_winter_season_cash_no: number | undefined
    // cluster_question/enough_hh_winter_season_cover [select_one] For how long will the assistance you receive cover your heating needs?
    enough_hh_winter_season_cover: undefined | Option<'time_elapsed_registration'>
    // cluster_question/delivery_services_cost [integer] What does delivery services cost?
    delivery_services_cost: number | undefined
    // cluster_question/types_fuels_available [select_multiple] What types of solid fuels are available in local markets?
    types_fuels_available: undefined | Option<'types_fuels_available'>[]
    // cluster_question/use_fuel_cooking [select_one] Did you use the solid fuel you received for cooking?
    use_fuel_cooking: undefined | Option<'any_member_household'>
    // cluster_question/where_fuel_stored [select_one] Where is the fuel you stored?
    where_fuel_stored: undefined | Option<'where_fuel_stored'>
    // cluster_question/cost_heating_oct_apr [integer] Average cost of heating per month form October-April
    cost_heating_oct_apr: number | undefined
    // cluster_question/cover_heating_debt [select_one] To cover your household’s heating expenses, did you incur on new debt?
    cover_heating_debt: undefined | Option<'any_member_household'>
    // cluster_question/debts_cut_heating [select_one] Do your debts cause your household to be cut off from heating utility services ?
    debts_cut_heating: undefined | Option<'any_member_household'>
    // income_generation/contacted_pay_amount [select_multiple] Have you been contacted by the tax office or local authorities to pay tax on the amount you received?
    contacted_pay_amount: undefined | Option<'contacted_pay_amount'>[]
    // income_generation/contacted_pay_amount_tax_local [select_one] Have you paid tax on this cash received?
    contacted_pay_amount_tax_local: undefined | Option<'contacted_pay_amount_tax_local'>
    // outcome/feel_safe_travelling [select_one] Did you feel safe at all times travelling to receive the assistance/service (to/from your place), while receiving the assistance/service, and upon return to your place (SDH.1) (Cluster)?
    feel_safe_travelling: undefined | Option<'report_drc_employee'>
    // outcome/feel_safe_travelling_bad [text] If "Mostly yes" or "Not really" or "Not at all", please specify:
    feel_safe_travelling_bad: string | undefined
    // outcome/feel_treated_respect [select_one] Did you feel you were treated with respect by DRC or partner staff during the intervention (SDH.2) (Cluster)?
    feel_treated_respect: undefined | Option<'report_drc_employee'>
    // outcome/feel_treated_respect_bad [text] If "Mostly yes" or "Not really" or "Not at all", please specify:
    feel_treated_respect_bad: string | undefined
    // outcome/satisfied_assistance_provided [select_one] Are you satisfied with the assistance provided (MEA.1) (Cluster)?
    satisfied_assistance_provided: undefined | Option<'report_drc_employee'>
    // outcome/satisfied_assistance_provided_bad [text] If "Mostly yes" or "Not really" or "Not at all", please specify:
    satisfied_assistance_provided_bad: string | undefined
    // outcome/know_people_needing [select_one] Do you know of people needing assistance who were excluded from the assistance provided (MEA.2) (Cluster)?
    know_people_needing: undefined | Option<'report_drc_employee'>
    // outcome/know_people_needing_yes [text] If "Yes, completely" or "Mostly yes", please specify:
    know_people_needing_yes: string | undefined
    // outcome/feel_informed_assistance [select_one] Did you feel well informed about the assistance available (PEM.2) (Cluster)?
    feel_informed_assistance: undefined | Option<'report_drc_employee'>
    // outcome/feel_informed_assistance_bad [text] If "Mostly yes" or "Not really" or "Not at all", please specify:
    feel_informed_assistance_bad: string | undefined
    // outcome/account_organization_assistance [select_one] Were your views taken into account by the organization about the assistance you received (PEM.1) (Cluster)?
    account_organization_assistance: undefined | Option<'report_drc_employee'>
    // outcome/account_organization_assistance_bad [text] If "Mostly yes" or "Not really" or "Not at all", please specify:
    account_organization_assistance_bad: string | undefined
    // outcome/know_selection_process [select_one] Do you know how the selection process was and why you/the participants were chosen for this program? (Cluster)
    know_selection_process: undefined | Option<'any_member_household'>
    // outcome/time_elapsed_registration [select_one] How much time elapsed between registration and receiving the assistance? (Cluster)
    time_elapsed_registration: undefined | Option<'time_elapsed_registration'>
    // outcome/were_informed_timeframe [select_one] Were you informed about timeframe? (Cluster)
    were_informed_timeframe: undefined | Option<'were_informed_timeframe'>
    // outcome/satisfied_timing_assistance [select_one] Are you satisfied with timing of the assistance?
    satisfied_timing_assistance: undefined | Option<'satisfied_communication_assistance'>
    // outcome/satisfied_timing_assistance_bad [select_multiple] Please, specify why?
    satisfied_timing_assistance_bad: undefined | Option<'satisfied_timing_assistance_bad'>[]
    // outcome/satisfied_timing_assistance_bad_other [text] If other, please specify
    satisfied_timing_assistance_bad_other: string | undefined
    // outcome/satisfied_communication_assistance [select_one] Are you satisfied with communication level during providing the assistance?
    satisfied_communication_assistance: undefined | Option<'satisfied_communication_assistance'>
    // outcome/satisfied_communication_assistance_bad [select_multiple] Please, specify why?
    satisfied_communication_assistance_bad: undefined | Option<'satisfied_communication_assistance_bad'>[]
    // outcome/satisfied_communication_assistance_bad_other [text] If other, please specify
    satisfied_communication_assistance_bad_other: string | undefined
    // outcome/assistance_timely [select_one] Could you please tell us whether the assistance provided was timely for you?
    assistance_timely: undefined | Option<'any_member_household'>
    // outcome/assistance_timely_no [text] If "No", please explain why:
    assistance_timely_no: string | undefined
    // access_pwd_assisstance/barriers_pwd_join [select_one] Did you feel there were any barriers for persons with disabilities to join these activities?
    barriers_pwd_join: undefined | Option<'barriers_pwd_join'>
    // access_pwd_assisstance/barriers_pwd_join_yes [text] If "Yes", please explain why:
    barriers_pwd_join_yes: string | undefined
    // access_pwd_assisstance/difficulties_accessing_cash [select_one] Did you face any difficulties accessing the cash?
    difficulties_accessing_cash: undefined | Option<'any_member_household'>
    // access_pwd_assisstance/difficulties_accessing_cash_yes [text] If "Yes", what issues did you face?
    difficulties_accessing_cash_yes: string | undefined
    // access_pwd_assisstance/location_withdraw_cash [select_one] How far is the location to withdraw cash from your home?
    location_withdraw_cash: undefined | Option<'location_withdraw_cash'>
    // access_pwd_assisstance/go_market_personally_fuel [select_one] Were you (or the caregiver of the person with disability in the household) able to go to the market personally to purchase fuel?
    go_market_personally_fuel: undefined | Option<'any_member_household'>
    // access_pwd_assisstance/go_market_personally_fuel_no [select_multiple] If No: Who made the purchase instead?
    go_market_personally_fuel_no: undefined | Option<'go_market_personally_fuel_no'>[]
    // access_pwd_assisstance/go_market_personally_fuel_no_other [text] If other, please specify
    go_market_personally_fuel_no_other: string | undefined
    // access_pwd_assisstance/barriers_purchase_fuel [select_one] Did you face any barriers when paying the utilities /or  in the purchase of this fuel?
    barriers_purchase_fuel: undefined | Option<'any_member_household'>
    // access_pwd_assisstance/barriers_purchase_fuel_yes [select_multiple] If Yes: What were the main barriers?
    barriers_purchase_fuel_yes: undefined | Option<'barriers_purchase_fuel_yes'>[]
    // access_pwd_assisstance/barriers_purchase_fuel_yes_other [text] If other, please specify
    barriers_purchase_fuel_yes_other: string | undefined
    // safe/access_basic_facilities [select_one] Do you have access to basic facilities (electricity, water, gas)?
    access_basic_facilities: undefined | Option<'any_member_household'>
    // safe/access_basic_facilities_no [text] If "No", please explain why:
    access_basic_facilities_no: string | undefined
    // safe/living_conditions_deteriorated [select_one] Have your family's living conditions deteriorated due to the onset of the winter period?
    living_conditions_deteriorated: undefined | Option<'any_member_household'>
    // safe/living_conditions_deteriorated_no [text] If "No", please explain why:
    living_conditions_deteriorated_no: string | undefined
    // safe/assistance_dwelling_sufficiently [select_one] After receiving assistance, have you been able to heat your dwelling sufficiently?
    assistance_dwelling_sufficiently: undefined | Option<'any_member_household'>
    // safe/assistance_dwelling_sufficiently_no [text] If "No", please explain why:
    assistance_dwelling_sufficiently_no: string | undefined
    // on/receive_shelter_assistance [select_one] How would your HH prefer to receive shelter assistance in the future?
    receive_shelter_assistance: undefined | Option<'receive_shelter_assistance'>
    // on/receive_shelter_assistance_no [text] If "Other", please explain why:
    receive_shelter_assistance_no: string | undefined
    // on/needs_community_currently [select_multiple] In your opinion, what are the top 3 priority needs in your community currently?
    needs_community_currently: undefined | Option<'needs_community_currently'>[]
    // on/needs_community_currently_other [text] If "Other", please specify
    needs_community_currently_other: string | undefined
    // on/community_purchase_fuel [select_one] Did members of the community take any steps to purchase solid fuel collectively or negotiate for prices/delivery with vendors as a group?
    community_purchase_fuel: undefined | Option<'community_purchase_fuel'>
    // on/community_purchase_fuel_other [text] If "Other", please specify
    community_purchase_fuel_other: string | undefined
    // on/multiple_forms_assistance [select_one] Would you like to receive multiple forms of assistance at one registration? For example registration for cash, psychosocial support, legal advice, and risk education?
    multiple_forms_assistance: undefined | Option<'any_member_household'>
    // on/multiple_forms_assistance_why [text] Explain why.
    multiple_forms_assistance_why: string | undefined
    // aap/any_member_household [select_one] Have you or any member of your household been exposed to any risk as a consequence of receiving the assistance?
    any_member_household: undefined | Option<'any_member_household'>
    // aap/any_member_household_yes [text] If "Yes", you have experienced any challenge or insecurity situation as consequence of receiving  the assistance, can you tell us what happened?
    any_member_household_yes: string | undefined
    // aap/provide_someone_commission [select_one] Have you ever had to provide someone with a commission, a gift, a tip, a service or a favor to get in the list of project participants, or to receive the assistance?
    provide_someone_commission: undefined | Option<'provide_someone_commission'>
    // aap/provide_someone_commission_yes [select_one] If "Yes", to whom did you had to provide the rate, gift, tip, favor, or service?
    provide_someone_commission_yes: undefined | Option<'provide_someone_commission_yes'>
    // aap/provide_someone_commission_yes_other [text] If "To another person", please specify
    provide_someone_commission_yes_other: string | undefined
    // aap/know_address_suggestions [select_one] Do you know how and where you could address your suggestions, feedback or complaints regarding the work of the Danish Refugee Council, if any? (АСС.1)
    know_address_suggestions: undefined | Option<'report_drc_employee'>
    // aap/know_address_suggestions_yes [select_one] If "Yes", have you provided any feedback/ suggestions, complaints, or questions?
    know_address_suggestions_yes: undefined | Option<'know_address_suggestions_yes'>
    // aap/know_address_suggestions_yes_ndnp [select_one] If "No did not provide any", why?
    know_address_suggestions_yes_ndnp: undefined | Option<'know_address_suggestions_yes_ndnp'>
    // aap/know_address_suggestions_yes_ndnp_other [text] If "Other", please specify
    know_address_suggestions_yes_ndnp_other: string | undefined
    // aap/know_address_suggestions_no [select_one] If "No", why?
    know_address_suggestions_no: undefined | Option<'know_address_suggestions_no'>
    // aap/know_address_suggestions_no_other [text] If "Other", please specify
    know_address_suggestions_no_other: string | undefined
    // aap/submitted_feedback_complaint [select_one] If you submitted any feedback and complaint, did you receive a response from the program and organization (Cluster)?
    submitted_feedback_complaint: undefined | Option<'submitted_feedback_complaint'>
    // aap/report_drc_employee [select_one] Do you know how and where to report if a DRC employee requested something from you in exchange for receiving assistance, made you feel uncomfortable in anyway, or insulted you? (misconduct)
    report_drc_employee: undefined | Option<'report_drc_employee'>
    // aap/comment [text] Interviewer's comment
    comment: string | undefined
    // not_thank [note] Thank you for taking the time to fill out this form.
    not_thank: string
  }
  export const options = {
    pdmtype: {
      cfu: `Cash for utilities`,
      csf: `Cash for solid fuel`,
      cfu_partner: `Cash for utilities (partners only)`,
      csf_partner: `Cash for solid fuel in cash (partners only)`,
      csfk_partner: `Solid fuel in kind (partners only)`,
    },
    any_member_household: {
      yes: `Yes`,
      no: `No`,
    },
    sex: {
      male: `Male`,
      female: `Female`,
      pnd: `Prefer not to disclose`,
    },
    status_person: {
      idp: `Internally Displaced Person (IDP)`,
      long: `Long - Term Resident`,
      returnee: `Returnee`,
    },
    contacted_pay_amount: {
      tax_office: `Tax Office`,
      local_authority: `Local Authority`,
      no: `No`,
    },
    contacted_pay_amount_tax_local: {
      yes: `Yes`,
      due_pay: `I am due to pay tax on this but have not paid yet`,
      no: `No`,
    },
    undefined: {
      yes: `Yes`,
      no: `No`,
      not_applicable: `Not applicable as we don't have such members`,
      no_had_no_need_to_use_this_coping_strategy: `No, had no need to use this coping strategy`,
      no_have_already_exhausted_this_coping_strategy_and_cannot_use_it_again: `No, have already exhausted this coping strategy and cannot use it again`,
      not_applicable_this_coping_strategy_is_not_available_to_me: `Not applicable / This coping strategy is not available to me`,
      prefer_not_to_answer: `Prefer not to answer`,
    },
    assistance_delivered: {
      asba: `Bank transfer without card`,
      asuk: `Ukrposhta`,
      asbc: `Bank account`,
      asca: `Card`,
      asnp: `Nova Poshta office`,
      aswu: `Western Union`,
      other: `Other`,
    },
    experience_problems_yes: {
      pbrl: `Registration took too long`,
      pbrc: `Registration excluded/left out certain groups`,
      pbrp: `Registration process was unclear or confusing`,
      pbrm: `Registration required too many documents`,
      pbna: `No answer`,
      other: `Other`,
    },
    satisfied_process: {
      ndyl: `Yes, very satisfied`,
      ndyf: `Yes, somewhat satisfied`,
      ndnr: `Not very satisfied`,
      ndna: `Not satisfied at all`,
    },
    better_inform_distribution: {
      dbbd: `Improved communication before the distribution`,
      dbdd: `Improved communication during the distribution`,
      dbcd: `Improved communication after the distribution`,
      all_fine: `Everything was fine`,
      dbad: `More information about the date of the distribution`,
      dbtd: `More information about the time of the distribution`,
      other: `Other`,
    },
    sectors_cash_assistance: {
      stfo: `Food`,
      sthh: `HH NFIs`,
      stcl: `Clothing`,
      sthe: `Heating (fuel)`,
      stha: `Healthcare (services)`,
      strn: `Renovation materials`,
      stre: `Rent`,
      star: `Agricultural inputs`,
      sthg: `Hygiene items`,
      stut: `Utilities`,
      stme: `Medication`,
      steu: `Education materials (i.e., books)`,
      other: `Other`,
    },
    barriers_pwd_join: {
      yes: `Yes`,
      no: `No`,
      ydk: `Dont know`,
    },
    helped_thermal_comfort: {
      yes: `Yes`,
      no: `No`,
      other: `Other`,
    },
    receive_shelter_assistance: {
      rsca: `Cash`,
      rsmk: `Building materials in kind (distribution)`,
      rsmc: `Building materials in kind + cash for labour`,
      other: `Other`,
    },
    needs_community_currently: {
      tpfo: `Food`,
      tpdw: `Drinking water`,
      tphi: `Household Non-Food Items`,
      tpcs: `Clothing/shoes`,
      tphe: `Heating (fuel)`,
      tphs: `Healthcare services/Medication`,
      tpsp: `Shelter repair`,
      tpre: `Rent`,
      tpai: `Agricultural inputs`,
      tpht: `Hygiene items`,
      tput: `Utilities`,
      tped: `Education`,
      tpdr: `Debt repayment`,
      tpla: `Legal assistance/documents`,
      tptr: `Transport`,
      other: `Other`,
      tpdk: `I don’t know / I don’t want to answer`,
    },
    provide_someone_commission_yes: {
      wpds: `To the DRC staff`,
      wplo: `To a local organization that is part of the project`,
      wpvo: `To a volunteer`,
      wpap: `To another person`,
    },
    report_drc_employee: {
      rcyc: `Yes, completely`,
      rcmy: `Mostly yes`,
      rcnr: `Not really`,
      rcnt: `Not at all`,
      rcdk: `Don't know`,
      rcna: `No answer`,
    },
    know_address_suggestions_yes: {
      pvyc: `Yes, with a complaint`,
      pvyf: `Yes, with feedback`,
      pvyq: `Yes, with a question`,
      pvnp: `No did not provide any`,
    },
    know_address_suggestions_yes_ndnp: {
      pfnp: `I did not need to provide feedback`,
      pfpf: `I do not feel comfortable providing feedback/ suggestions, complaints, or questions`,
      pfhf: `I have provided feedback/ suggestions, complaints, or questions in the past and I was never responded to.`,
      other: `Other`,
    },
    know_address_suggestions_no: {
      nkhb: `The helpline has not been shared with me before`,
      nknk: `I do not know where to find the helpline number`,
      other: `Other`,
    },
    submitted_feedback_complaint: {
      smyc: `Yes, completely`,
      smry: `Rather yes than no`,
      smnn: `Not answered at all`,
      smna: `No answer`,
    },
    type_fuel_most: {
      seasoned_wood: `Seasoned Wood`,
      scrap_wood: `Scrap wood`,
      coal: `Coal`,
      charcoal: `Charcoal`,
      pallets: `Pellets`,
      central_heating: `Central heating`,
      gas: `Gas`,
      electricity: `Electricity`,
      other: `Other`,
    },
    type_utilities_use: {
      natural_gas: `Natural gas`,
      electricity: `Electricity`,
      centralized_heating: `Centralized heating`,
    },
    level_heating_improved: {
      increased: `Increased`,
      same: `Remained the same`,
      decreased: `Decreased`,
      other: `Other`,
    },
    provide_someone_commission: {
      yes: `Yes`,
      no: `No`,
      refuse: `Refuse to answer`,
    },
    cash_modality_inkind: {
      yes: `Yes, I prefer cash modality`,
      no: `No I would have preferred in kind`,
    },
    were_informed_timeframe: {
      yes: `Yes`,
      no: `No`,
      dwa: `I dont want to answer`,
    },
    enough_hh_winter_season_measure: {
      stacked: `Stacked m3`,
      m3: `m3`,
      tons: `Tons`,
    },
    time_elapsed_registration: {
      less_1m: `Less than 1 month`,
      '1-2m': `1-2 months`,
      '3-4m': `3-4 months`,
      '5-6m': `5-6 months`,
      more_6m: `More than 6 months`,
    },
    heating_appliances_use: {
      traditional_stove: `The traditional stove`,
      burzhuika: `Burzhuika/Buleryan type stove`,
      gas_heater: `Gas heater (convector)`,
      electric_heater: `Electric heater`,
      gas_electric_boiler: `Gas/electric boiler`,
    },
    problem_receiving_cash_yes: {
      long_distance_atm: `Long distance to ATM/bank`,
      banks_not_functional: `ATMs/banks are not functional`,
      lack_cash_distribution: `Lack of cash at distribution points`,
      long_queues_distribution: `Long queues at the distribution points`,
      dangerous_atm: `It was dangerous to get ATMs/banks`,
      other: `Other`,
    },
    manage_solid_fuel_no: {
      market_far_away: `The market is too far away`,
      dangerous_access_market: `It is dangerous to access the market`,
      service_not_functional: `The market / service is not functional in the area`,
      markets_limited_capacity: `Markets had limited capacity and did not provide suitable type of fuel`,
      fuel_very_expensive: `Solid fuel was very expensive`,
      delivery_services_expensive: `Delivery services were too expensive`,
      card_not_working: `Card payments were not working`,
      spend_other_urgent: `I had to spend the money on HHs other urgent needs.`,
      other: `Other`,
    },
    types_fuels_available: {
      coal: `Coal`,
      firewood: `Firewood`,
      briquettes: `Briquettes`,
      pellets: `Pellets`,
    },
    where_fuel_stored: {
      in_shed: `In a shed`,
      outside_shed: `Outside without a shed`,
    },
    satisfied_communication_assistance: {
      fully: `Yes, fully`,
      mostly: `Yes, mostly`,
      not_really: `Not really`,
      not_all: `Not at all`,
      dk: `Do not know`,
      no_answer: `No answer`,
    },
    satisfied_timing_assistance_bad: {
      faster: `Assistance was provided faster than I expected`,
      slight_delay: `Assistance was provided, but with a slight delay`,
      significant_delay: `Assistance was provided with a significant delay`,
      late: `Assistance was rendered too late`,
      other: `Other`,
    },
    satisfied_communication_assistance_bad: {
      not_enough_detail: `I did not get enough detail in the assistance I received`,
      information_delivery_times: `There was insufficient information on delivery times`,
      no_opportunity_questions: `There was no opportunity to ask questions or get more information`,
      answers_not_clear: `The answers to my questions were not clear or understandable enough`,
      failed_show_respect: `Representatives failed to show due respect and consideration`,
      other: `Other`,
    },
    community_purchase_fuel: {
      some: `Some members of the community purchased together to negotiate`,
      all: `All purchased individually`,
      other: `Other`,
    },
    parent_consent: {
      yes: `Yes, consent has been provided`,
      no: `No, consent has not been provided`,
    },
    location_withdraw_cash: {
      less_500m: `Less than 500 m`,
      '500m_2km': `500 m – 2 km`,
      more_2km: `More than 2 km`,
    },
    go_market_personally_fuel_no: {
      family: `Family`,
      neighbour: `Neighbour`,
      volunteer: `Volunteer`,
      vendor_delivered: `Vendor delivered`,
      other: `Other`,
    },
    barriers_purchase_fuel_yes: {
      distance: `Distance`,
      no_accessible_transport: `No accessible transport`,
      inaccessible_terrain: `Inaccessible terrain or stairs`,
      heavy_weigh: `Heavy weight of the fuel`,
      safety: `Safety/security concerns`,
      lack_assistance: `Lack of assistance`,
      other: `Other`,
    },
    donor: {
      ukr000399_sdc3: `SDC Winterization (UKR-000399)`,
      ukr000423_echo4: `ECHO (UKR-000423)`,
      ukr000441_uhf11: `UHF (UKR-0000441)`,
      ukr000372_echo: `ECHO (UKR-000372)`,
      ukr000390_uhf9: `UHF 9 (UKR-000390)`,
      other: `Other`,
    },
    office: {
      dnipro: `DNK (Dnipro)`,
      empca: `HRK (Kharkiv)`,
      chernihiv: `CEJ (Chernihiv)`,
      sumy: `UMY (Sumy)`,
      mykolaiv: `NLV (Mykolaiv)`,
      zaporizhzhya: `ZPR (Zaporizhzhya)`,
      slovyansk: `SLO (Slovyansk)`,
    },
    extent_cash_correspond: {
      fully: `Fully corresponds`,
      mostly: `Mostly corresponds`,
      partly: `Partly corresponds`,
      does_not: `Does not correspond at all`,
    },
    ben_det_oblast: {
      volynska: `Volyn`,
      dnipropetrovska: `Dnipropetrovsk`,
      donetska: `Donetsk`,
      zhytomyrska: `Zhytomyr`,
      zakarpatska: `Zakarpattia`,
      zaporizka: `Zaporizhzhia`,
      'ivano-frankivska': `Ivano-Frankivsk`,
      kyivska: `Kyiv`,
      kirovohradska: `Kirovohrad`,
      luhanska: `Luhansk`,
      lvivska: `Lviv`,
      mykolaivska: `Mykolaiv`,
      odeska: `Odesa`,
      poltavska: `Poltava`,
      rivnenska: `Rivne`,
      sumska: `Sumy`,
      ternopilska: `Ternopil`,
      kharkivska: `Kharkiv`,
      khersonska: `Kherson`,
      khmelnytska: `Khmelnytskyi`,
      cherkaska: `Cherkasy`,
      chernivetska: `Chernivtsi`,
      chernihivska: `Chernihiv`,
      citykyiv: `City Kyiv`,
      sevastopilska: `Sevastopil`,
    },
    ben_det_raion: {
      zvenyhorodskyi: `Zvenyhorodskyi`,
      zolotoniskyi: `Zolotoniskyi`,
      umanskyi: `Umanskyi`,
      cherkaskyi: `Cherkaskyi`,
      koriukivskyi: `Koriukivskyi`,
      nizhynskyi: `Nizhynskyi`,
      'novhorod-siverskyi': `Novhorod-Siverskyi`,
      prylutskyi: `Prylutskyi`,
      chernihivskyi: `Chernihivskyi`,
      vyzhnytskyi: `Vyzhnytskyi`,
      dnistrovskyi: `Dnistrovskyi`,
      cnernivetskyi: `Cnernivetskyi`,
      dniprovskyi: `Dniprovskyi`,
      kamianskyi: `Kamianskyi`,
      kryvorizkyi: `Kryvorizkyi`,
      nikopolskyi: `Nikopolskyi`,
      novomoskovskyi: `Novomoskovskyi`,
      pavlohradskyi: `Pavlohradskyi`,
      synelnykivskyi: `Synelnykivskyi`,
      bakhmutskyi: `Bakhmutskyi`,
      volnovaskyi: `Volnovaskyi`,
      horlivskyi: `Horlivskyi`,
      donetskyi: `Donetskyi`,
      kalmiuskyi: `Kalmiuskyi`,
      kramatorskyi: `Kramatorskyi`,
      mariupolskyi: `Mariupolskyi`,
      pokrovskyi: `Pokrovskyi`,
      verkhovynskyi: `Verkhovynskyi`,
      'ivano-frankivskyi': `Ivano-Frankivskyi`,
      kaluskyi: `Kaluskyi`,
      kolomyiskyi: `Kolomyiskyi`,
      kosivskyi: `Kosivskyi`,
      nadvirnianskyi: `Nadvirnianskyi`,
      bohodukhivskyi: `Bohodukhivskyi`,
      iziumskyi: `Iziumskyi`,
      krasnohradskyi: `Krasnohradskyi`,
      kupianskyi: `Kupianskyi`,
      lozivskyi: `Lozivskyi`,
      kharkivskyi: `Kharkivskyi`,
      chuhuivskyi: `Chuhuivskyi`,
      beryslavskyi: `Beryslavskyi`,
      henicheskyi: `Henicheskyi`,
      kakhovskyi: `Kakhovskyi`,
      skadovskyi: `Skadovskyi`,
      khersonskyi: `Khersonskyi`,
      'kamianets-podilskyi': `Kamianets-Podilskyi`,
      khmelnytskyi: `Khmelnytskyi`,
      shepetivskyi: `Shepetivskyi`,
      holovanivskyi: `Holovanivskyi`,
      kropyvnytskyi: `Kropyvnytskyi`,
      novoukrainskyi: `Novoukrainskyi`,
      oleksandriiskyi: `Oleksandriiskyi`,
      'chornobylska zona vidchuzhennia': `Chornobylska Zona Vidchuzhennia`,
      bilotserkivskyi: `Bilotserkivskyi`,
      boryspilskyi: `Boryspilskyi`,
      brovarskyi: `Brovarskyi`,
      buchanskyi: `Buchanskyi`,
      vyshhorodskyi: `Vyshhorodskyi`,
      obukhivskyi: `Obukhivskyi`,
      fastivskyi: `Fastivskyi`,
      kyivska: `Kyivska`,
      alchevskyi: `Alchevskyi`,
      dovzhanskyi: `Dovzhanskyi`,
      luhanskyi: `Luhanskyi`,
      rovenkivskyi: `Rovenkivskyi`,
      svativskyi: `Svativskyi`,
      sievierodonetskyi: `Sievierodonetskyi`,
      starobilskyi: `Starobilskyi`,
      shchastynskyi: `Shchastynskyi`,
      drohobytskyi: `Drohobytskyi`,
      zolochivskyi: `Zolochivskyi`,
      lvivskyi: `Lvivskyi`,
      sambirskyi: `Sambirskyi`,
      stryiskyi: `Stryiskyi`,
      chervonohradskyi: `Chervonohradskyi`,
      yavorivskyi: `Yavorivskyi`,
      bashtanskyi: `Bashtanskyi`,
      voznesenskyi: `Voznesenskyi`,
      mykolaivskyi: `Mykolaivskyi`,
      pervomaiskyi: `Pervomaiskyi`,
      berezivskyi: `Berezivskyi`,
      'bilhorod-dnistrovskyi': `Bilhorod-Dnistrovskyi`,
      bolhradskyi: `Bolhradskyi`,
      izmailskyi: `Izmailskyi`,
      odeskyi: `Odeskyi`,
      podilskyi: `Podilskyi`,
      rozdilnianskyi: `Rozdilnianskyi`,
      kremenchutskyi: `Kremenchutskyi`,
      lubenskyi: `Lubenskyi`,
      myrhorodskyi: `Myrhorodskyi`,
      poltavskyi: `Poltavskyi`,
      varaskyi: `Varaskyi`,
      dubenskyi: `Dubenskyi`,
      rivnenskyi: `Rivnenskyi`,
      sarnenskyi: `Sarnenskyi`,
      sevastopilska: `Sevastopilska`,
      konotopskyi: `Konotopskyi`,
      okhtyrskyi: `Okhtyrskyi`,
      romenskyi: `Romenskyi`,
      sumskyi: `Sumskyi`,
      shostkynskyi: `Shostkynskyi`,
      kremenetskyi: `Kremenetskyi`,
      ternopilskyi: `Ternopilskyi`,
      chortkivskyi: `Chortkivskyi`,
      vinnytskyi: `Vinnytskyi`,
      haisynskyi: `Haisynskyi`,
      zhmerynskyi: `Zhmerynskyi`,
      'mohyliv-podilskyi': `Mohyliv-Podilskyi`,
      tulchynskyi: `Tulchynskyi`,
      khmilnytskyi: `Khmilnytskyi`,
      'volodymyr-volynskyi': `Volodymyr-Volynskyi`,
      'kamin-kashyrskyi': `Kamin-Kashyrskyi`,
      kovelskyi: `Kovelskyi`,
      lutskyi: `Lutskyi`,
      berehivskyi: `Berehivskyi`,
      mukachivskyi: `Mukachivskyi`,
      rakhivskyi: `Rakhivskyi`,
      tiachivskyi: `Tiachivskyi`,
      uzhhorodskyi: `Uzhhorodskyi`,
      khustskyi: `Khustskyi`,
      berdianskyi: `Berdianskyi`,
      vasylivskyi: `Vasylivskyi`,
      zaporizkyi: `Zaporizkyi`,
      melitopolskyi: `Melitopolskyi`,
      polohivskyi: `Polohivskyi`,
      berdychivskyi: `Berdychivskyi`,
      zhytomyrskyi: `Zhytomyrskyi`,
      korostenskyi: `Korostenskyi`,
      'novohrad-volynskyi': `Novohrad-Volynskyi`,
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
      date_interview: _.date_interview ? new Date(_.date_interview) : undefined,
      unique_number: _.unique_number ? +_.unique_number : undefined,
      age: _.age ? +_.age : undefined,
      number_female: _.number_female ? +_.number_female : undefined,
      number_male: _.number_male ? +_.number_male : undefined,
      how_many_family: _.how_many_family ? +_.how_many_family : undefined,
      number_disabilities: _.number_disabilities ? +_.number_disabilities : undefined,
      sectors_cash_assistance: _.sectors_cash_assistance?.split(' '),
      sectors_cash_assistance_food: _.sectors_cash_assistance_food ? +_.sectors_cash_assistance_food : undefined,
      sectors_cash_assistance_hh_nfis: _.sectors_cash_assistance_hh_nfis
        ? +_.sectors_cash_assistance_hh_nfis
        : undefined,
      sectors_cash_assistance_clothing: _.sectors_cash_assistance_clothing
        ? +_.sectors_cash_assistance_clothing
        : undefined,
      sectors_cash_assistance_heating: _.sectors_cash_assistance_heating
        ? +_.sectors_cash_assistance_heating
        : undefined,
      sectors_cash_assistance_healthcare: _.sectors_cash_assistance_healthcare
        ? +_.sectors_cash_assistance_healthcare
        : undefined,
      sectors_cash_assistance_utilities: _.sectors_cash_assistance_utilities
        ? +_.sectors_cash_assistance_utilities
        : undefined,
      sectors_cash_assistance_renovation_materials: _.sectors_cash_assistance_renovation_materials
        ? +_.sectors_cash_assistance_renovation_materials
        : undefined,
      sectors_cash_assistance_rent: _.sectors_cash_assistance_rent ? +_.sectors_cash_assistance_rent : undefined,
      sectors_cash_assistance_agricultural_inputs: _.sectors_cash_assistance_agricultural_inputs
        ? +_.sectors_cash_assistance_agricultural_inputs
        : undefined,
      sectors_cash_assistance_hygiene_items: _.sectors_cash_assistance_hygiene_items
        ? +_.sectors_cash_assistance_hygiene_items
        : undefined,
      sectors_cash_assistance_medication: _.sectors_cash_assistance_medication
        ? +_.sectors_cash_assistance_medication
        : undefined,
      sectors_cash_assistance_education_materials: _.sectors_cash_assistance_education_materials
        ? +_.sectors_cash_assistance_education_materials
        : undefined,
      sectors_cash_assistance_other_001: _.sectors_cash_assistance_other_001
        ? +_.sectors_cash_assistance_other_001
        : undefined,
      experience_problems_yes: _.experience_problems_yes?.split(' '),
      better_inform_distribution: _.better_inform_distribution?.split(' '),
      type_fuel_most: _.type_fuel_most?.split(' '),
      heating_appliances_use: _.heating_appliances_use?.split(' '),
      amount_cash_receive: _.amount_cash_receive ? +_.amount_cash_receive : undefined,
      amount_received_correspond_no: _.amount_received_correspond_no ? +_.amount_received_correspond_no : undefined,
      problem_receiving_cash_yes: _.problem_receiving_cash_yes?.split(' '),
      manage_solid_fuel_no: _.manage_solid_fuel_no?.split(' '),
      what_fuel_cost: _.what_fuel_cost ? +_.what_fuel_cost : undefined,
      quantiy_fuel_purchase: _.quantiy_fuel_purchase ? +_.quantiy_fuel_purchase : undefined,
      delivery_services_cost: _.delivery_services_cost ? +_.delivery_services_cost : undefined,
      types_fuels_available: _.types_fuels_available?.split(' '),
      cost_heating_oct_apr: _.cost_heating_oct_apr ? +_.cost_heating_oct_apr : undefined,
      contacted_pay_amount: _.contacted_pay_amount?.split(' '),
      satisfied_timing_assistance_bad: _.satisfied_timing_assistance_bad?.split(' '),
      satisfied_communication_assistance_bad: _.satisfied_communication_assistance_bad?.split(' '),
      go_market_personally_fuel_no: _.go_market_personally_fuel_no?.split(' '),
      barriers_purchase_fuel_yes: _.barriers_purchase_fuel_yes?.split(' '),
      needs_community_currently: _.needs_community_currently?.split(' '),
    }) as T
}
