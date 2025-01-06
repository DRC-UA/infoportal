export namespace Meal_cashPdm {
  export type Option<T extends keyof typeof options> = keyof (typeof options)[T]
  // Form id: aEKoPVd36PLRrmqWgk42DG
  export interface T {
    start: string
    end: string
    // date [date] Date
    date: Date | undefined
    // auto_imported [text] Auto imported?
    auto_imported: string | undefined
    // metadata/interviever_name [text] Interviever's name
    interviever_name: string | undefined
    // metadata/date_interview [date] Date of interview
    date_interview: Date | undefined
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
    ben_det_raion: undefined | string
    // metadata/ben_det_hromada [select_one] Select hromada
    ben_det_hromada: undefined | string
    // metadata/place_distribution [text] Select settlement
    place_distribution: string | undefined
    // overview/age [integer] What is your age?
    age: number | undefined
    // overview/sex [select_one] What is your sex?
    sex: undefined | Option<'sex'>
    // overview/status_person [select_one] What is your residential status?
    status_person: undefined | Option<'status_person'>
    // overview/how_many_family [integer] How many family members reside with you in the apartment/house?
    how_many_family: number | undefined
    // overview/number_female [integer] Number of female in the family
    number_female: number | undefined
    // overview/number_male [integer] Number of male in the family
    number_male: number | undefined
    // overview/number_disabilities [integer] Number of family members with disabilities
    number_disabilities: number | undefined
    // overview/did_receive_cash [select_one] Did you receive Cash assistance from DRC?
    did_receive_cash: undefined | Option<'any_member_household'>
    // overview/did_receive_cash_no [text] If "No", please specify
    did_receive_cash_no: string | undefined
    // overview/pdmtype [select_multiple] What type of cash assistance have you received?
    pdmtype: undefined | Option<'pdmtype'>[]
    // ic/not_mpca [note] For MPCA Hello I am from DRC organization (please mention your organization name)! We want to ask you some questions to obtain information about the Cash Assistance that you and your household have received from us. We want to hear your thoughts so we can improve the way that we are doing our job. Your participation is voluntary and the questions will take around 20-30 minutes to answer. If you accept to participate, you have the option to stop answering or to not answer any question that you don't want to. This information will help us to understand what has been done appropriately in the process, what hasn't worked that good and what we should be doing differently. The information you share will be kept protected and will only be shared with a small group of people in the organization (please mention your organization name). Finally, please know that if you provide negative feedback about our work, this will not have any negative consequences to your permanence in this or future activities of this project.
    not_mpca: string
    // ic/not_cash_for_rent [note] Cash for Rent Hello, my name is {insert name} I am from DRC.   We want to ask you some questions to obtain information about the Cash for Rent Assistance that you and your household have received from us. Your participation is voluntary and the questions will take around 20-30 minutes to answer. If you accept to participate, you have the option to stop answering or to not answer any question that you don't want to. This information will help us to understand what has been done appropriately in the process, what hasn't worked that good and what we should be doing differently. We want to hear your thoughts, so we can improve the way that we are doing our job in the future.   The information we collect about your personal identity will only be used to identify you for follow up questions if necessary, and will not be shared wider than internal DRC Staff. The information you share will be kept protected and will only be shared with a small group of people in DRC. Finally, please know that if you provide negative feedback about our work, this will not have any negative consequences to your permanence in this or future activities of this project.
    not_cash_for_rent: string
    // ic/not_cash_for_repair [note] Cash for repair The purpose of this interview is to obtain information about the shelter programs to understand whether they are being implemented properly and whether we are addressing the needs of vulnerable people. Your information and the data will be obtained from you are considered as confidential. The information will be used to prepare reports, but will not include any specific names. We would appreciate providing us with the most accurate answers that you can.
    not_cash_for_repair: string
    // ic/agree_interviewed [select_one] Do you agree to be interviewed?
    agree_interviewed: undefined | Option<'any_member_household'>
    // ic/spent_cash_assistance_received [select_one] Have you spent the cash assistance you received yet?
    spent_cash_assistance_received: undefined | Option<'sufficient_living_spaces'>
    // ic/spent_cash_assistance_received_no [text] When do you plan to use the assistance received? (cash for fuel, cash for utilities, cash for animal feed, cash for animal shelter, agricultural needs)
    spent_cash_assistance_received_no: string | undefined
    // ic/spent_cash_assistance_received_no_mait_reason [text] What is the main reason you have not spent money yet?
    spent_cash_assistance_received_no_mait_reason: string | undefined
    // use_mpca_assistance/spend_cash_received [select_one] Did you spend the cash on what you received it for? (i.e. if you received cash for utilities, did you spend it on utilities?)
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
    // use_mpca_assistance/receive_additional_5000 [select_one] Did you receive an additional 5,000 UAH as a top-up?
    receive_additional_5000: undefined | Option<'sufficient_living_spaces'>
    // delivery_process/assistance_delivered [select_one] How was the assistance delivered to you?
    assistance_delivered: undefined | Option<'assistance_delivered'>
    // delivery_process/assistance_delivered_other [text] If "Other", please specify
    assistance_delivered_other: string | undefined
    // delivery_process/satisfied_process [select_one] Are you satisfied with the process you went through to receive cash assistance?
    satisfied_process: undefined | Option<'satisfied_process'>
    // delivery_process/satisfied_process_no [text] If "Not very satisfied" or "Not satisfied at all" then:  If you were not satisfied, could you tell us why you were not satisfied?
    satisfied_process_no: string | undefined
    // delivery_process/satisfied_cash_amount [select_one] Are you satisfied with the cash amount received?
    satisfied_cash_amount: undefined | Option<'any_member_household'>
    // delivery_process/amount_cash_received_correspond [select_one] Did the amount of cash received correspond to the amount communicated to you?
    amount_cash_received_correspond: undefined | Option<'sufficient_living_spaces'>
    // delivery_process/amount_cash_received_correspond_yes [select_one] Did you receive less, the same or more money than the amount you were told you would be receiving?
    amount_cash_received_correspond_yes: undefined | Option<'amount_cash_received_correspond_yes'>
    // delivery_process/time_registered_assistance [select_one] How much time did it take from the moment your household registered into the CASH assistance program to the moment you actually received the money in your bank account?
    time_registered_assistance: undefined | Option<'time_registered_assistance'>
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
    // sufficiency/amount_paid_april [select_one] Was the amount paid enough for the whole heating season (until April)?
    amount_paid_april: undefined | Option<'sufficient_living_spaces'>
    // sufficiency/amount_paid_april_no [text] How much more you would have needed instead to cover your solid fuel/utilities needs
    amount_paid_april_no: string | undefined
    // sufficiency/amount_paid_april_long [select_one] How long was the amount received enough for you to heat your home or pay for utilities?
    amount_paid_april_long: undefined | Option<'received_feed_livestock_winter_long'>
    // sufficiency/amount_paid_april_long_other [text] If “Other” - Please, specify
    amount_paid_april_long_other: string | undefined
    // sufficiency/level_heating_improved [select_one] Has the level of heating in your home improved after receiving of cash assistance for solid fuel or utility?
    level_heating_improved: undefined | Option<'after_assistance_natural_products'>
    // sufficiency/level_heating_improved_dec_other [text] If “Other”, "decreased" - Please, specify
    level_heating_improved_dec_other: string | undefined
    // sufficiency/type_fuel_most [select_multiple] What type of home heating fuel is most common in your community ?
    type_fuel_most: undefined | Option<'type_fuel_most'>[]
    // sufficiency/type_fuel_most_other [text] If “Other” - Please, specify
    type_fuel_most_other: string | undefined
    // sufficiency/received_feed_livestock_winter [select_one] Was the assistance you received sufficient to maintain your  animal feedneeds/livestock activities  for the winter and early spring season?
    received_feed_livestock_winter: undefined | Option<'any_member_household'>
    // sufficiency/received_feed_livestock_winter_no [text] How much more you would have needed instead to cover your cash animal feed needs
    received_feed_livestock_winter_no: string | undefined
    // sufficiency/received_feed_livestock_winter_long [select_one] How long will the purchased feed be enough for your livestock?
    received_feed_livestock_winter_long: undefined | Option<'received_feed_livestock_winter_long'>
    // sufficiency/received_feed_livestock_winter_no_other [text] If “Other” - Please, specify
    received_feed_livestock_winter_no_other: string | undefined
    // sufficiency/amount_received_renovation_shelter [select_one] Was the assisstance you received sufficient to renovate your shelter for animals?
    amount_received_renovation_shelter: undefined | Option<'any_member_household'>
    // sufficiency/amount_received_renovation_shelter_no [text] If “No” - Please, specify
    amount_received_renovation_shelter_no: string | undefined
    // sufficiency/completed_renovation_livestock [select_one] At this point, have you completed the renovation of your livestock shelter?
    completed_renovation_livestock: undefined | Option<'any_member_household'>
    // sufficiency/completed_renovation_livestock_no [select_multiple] What prevented you?
    completed_renovation_livestock_no: undefined | Option<'completed_renovation_livestock_no'>[]
    // sufficiency/completed_renovation_livestock_no_other [text] If “Other” - Please, specify
    completed_renovation_livestock_no_other: string | undefined
    // sufficiency/plan_finish_renovation [text] When do you plan to finish renovation?
    plan_finish_renovation: string | undefined
    // sufficiency/type_renovation [select_one] Did you do (or planning to do) the renovation yourself or will you hire workers?
    type_renovation: undefined | Option<'type_renovation'>
    // sufficiency/type_renovation_other [text] If “Other” - Please, specify
    type_renovation_other: string | undefined
    // sufficiency/received_enough_agricultural_needs [select_one] Was the amount received enough for you to cover agricultural needs during the current spring period
    received_enough_agricultural_needs: undefined | Option<'any_member_household'>
    // sufficiency/received_enough_agricultural_needs_no [text] How much more you would have needed instead to cover your agricultural needs
    received_enough_agricultural_needs_no: string | undefined
    // sufficiency/received_enough_agricultural_needs_long [select_one] How long did it take to spend the money received?
    received_enough_agricultural_needs_long: undefined | Option<'received_enough_agricultural_needs_long'>
    // sufficiency/received_enough_agricultural_needs_long_other [text] If “Other” - Please, specify
    received_enough_agricultural_needs_long_other: string | undefined
    // sufficiency/rent_benefit [select_one] Was the cash for rent benefit enough to cover your rent for the specified period?
    rent_benefit: undefined | Option<'any_member_household'>
    // sufficiency/rent_benefit_no [text] If "No", how much extra did you have to pay?
    rent_benefit_no: string | undefined
    // sufficiency/access_adequate_housing [select_one] Do you have access to adequate housing after receiving the cash assistance?
    access_adequate_housing: undefined | Option<'any_member_household'>
    // sufficiency/improve_living [select_one] What has been done to improve your living conditions?
    improve_living: undefined | Option<'improve_living'>
    // sufficiency/improve_living_other [text] If "Other", please specify
    improve_living_other: string | undefined
    // sufficiency/spent_cash_assistance [select_one] Have you spent the Cash assistance for things other than rent
    spent_cash_assistance: undefined | Option<'any_member_household'>
    // sufficiency/spent_cash_assistance_yes [text] If "Yes", please specify
    spent_cash_assistance_yes: string | undefined
    // sufficiency/spent_cash_assistance_rent [select_one] If "Yes", How much of the allowance did you use?
    spent_cash_assistance_rent: undefined | Option<'assistance_other_repairs_rate'>
    // sufficiency/money_received [select_one] What have you spent the money you had received on?
    money_received: undefined | Option<'money_received'>
    // sufficiency/money_received_other [text] If "Other", please specify
    money_received_other: string | undefined
    // sufficiency/assistance_enough [select_one] Was the cash assistance enough to cover the expenditures?
    assistance_enough: undefined | Option<'any_member_household'>
    // sufficiency/assistance_enough_no [text] If "No", please explain why:
    assistance_enough_no: string | undefined
    // sufficiency/who_assisted [select_one] Who assisted you with the house repairs?
    who_assisted: undefined | Option<'who_assisted'>
    // sufficiency/who_assisted_other [text] If "Other", please specify
    who_assisted_other: string | undefined
    // sufficiency/assistance_other_repairs [select_one] Have you spent the Cash assistance for things other than repairs?
    assistance_other_repairs: undefined | Option<'any_member_household'>
    // sufficiency/assistance_other_repairs_yes [text] If "Yes", please specify
    assistance_other_repairs_yes: string | undefined
    // sufficiency/assistance_other_repairs_rate [select_one] If "Yes", how much of the rent allowance did you use for these things?
    assistance_other_repairs_rate: undefined | Option<'assistance_other_repairs_rate'>
    // sufficiency/cash_assistance_timely [select_one] Was the cash assistance timely for you?
    cash_assistance_timely: undefined | Option<'any_member_household'>
    // sufficiency/brochure_provided [select_one] Did you use the brochure provided as guidance on how to spend money on repairs?
    brochure_provided: undefined | Option<'brochure_provided'>
    // income_generation/food_expenditures_assistance [select_one] Did your household's food expenditures increase or decrease after receiving assistance?
    food_expenditures_assistance: undefined | Option<'after_assistance_natural_products'>
    // income_generation/food_expenditures_assistance_inc_dec [text] By how many percent did you increase/decrease household's food expenditures?
    food_expenditures_assistance_inc_dec: string | undefined
    // income_generation/food_expenditures_assistance_inc [text] What was the reason for the increase of food expenditures?
    food_expenditures_assistance_inc: string | undefined
    // income_generation/food_expenditures_assistance_other [text] If “Other” - Please, specify
    food_expenditures_assistance_other: string | undefined
    // income_generation/food_expenditures_assistance_detail [text] Please, feel free to comment
    food_expenditures_assistance_detail: string | undefined
    // income_generation/prior_proportion_spent_food [select_one] Before you received this assistance, what proportion of your household income did you spend on food?
    prior_proportion_spent_food: undefined | Option<'prior_proportion_spent_food'>
    // income_generation/since_proportion_spend_food [select_one] Currently, after receiving this assistance, what proportion of your household income do you spend on food?
    since_proportion_spend_food: undefined | Option<'since_proportion_spend_food'>
    // income_generation/spend_food_month [text] How much money (UAH) did your household spend on food this month?
    spend_food_month: string | undefined
    // income_generation/reason_change_expenditures [text] What is the reason for the change in food expenditures?
    reason_change_expenditures: string | undefined
    // income_generation/household_increase_decrease_livestock_receiving [select_one] Did your household  increase or decrease number of livestock/poultry for fattering after receiving assistance?
    household_increase_decrease_livestock_receiving: undefined | Option<'after_assistance_natural_products'>
    // income_generation/household_increase_decrease_livestock_receiving_inc_dec [text] By how many percent did you increase/decrease number of livestock/poultry?
    household_increase_decrease_livestock_receiving_inc_dec: string | undefined
    // income_generation/household_increase_decrease_livestock_receiving_decreased [text] What was the reason for the decrease the number of livestock/poultry?
    household_increase_decrease_livestock_receiving_decreased: string | undefined
    // income_generation/household_increase_decrease_livestock_receiving_other [text] If “Other” - Please, specify
    household_increase_decrease_livestock_receiving_other: string | undefined
    // income_generation/comparison_last_year [select_one] How has the cash you received affected your agricultural outputs/ production in comparison to last year?
    comparison_last_year: undefined | Option<'after_assistance_natural_products'>
    // income_generation/comparison_last_year_other [text] If “Other”, "decreased" - Please, specify
    comparison_last_year_other: string | undefined
    // income_generation/consume_majority_crops [select_one] Do you consume a majority of the crops you produce / livestock that you manage?
    consume_majority_crops: undefined | Option<'any_member_household'>
    // income_generation/consume_majority_crops_no [text] If "No", please explain why:
    consume_majority_crops_no: string | undefined
    // income_generation/opportunity_sell_production_excesses [select_one] Do you have the opportunity to sell any animal products you don't use for your own consumption or any animals after fattening?
    opportunity_sell_production_excesses: undefined | Option<'any_member_household'>
    // income_generation/opportunity_sell_production_excesses_no [text] If “No” - Please, specify
    opportunity_sell_production_excesses_no: string | undefined
    // income_generation/after_assistance_natural_products [select_one] After receiving assistance, has the income from the sale of natural/agricultura products (milk, eggs, cottage cheese, meat products, etc.) increased or decreased?
    after_assistance_natural_products: undefined | Option<'after_assistance_natural_products'>
    // income_generation/after_assistance_natural_products_inc_dec [text] By what percentage do you estimate that your income has changed from selling natural products (milk, eggs, cottage cheese, meat products, etc.)?
    after_assistance_natural_products_inc_dec: string | undefined
    // income_generation/after_assistance_natural_products_dec [text] What was the reason for the decrease the income generation?
    after_assistance_natural_products_dec: string | undefined
    // income_generation/after_assistance_natural_products_other [text] If “Other” - Please, specify
    after_assistance_natural_products_other: string | undefined
    // income_generation/contacted_pay_amount [select_multiple] Have you been contacted by the tax office or local authorities to pay tax on the amount you received?
    contacted_pay_amount: undefined | Option<'contacted_pay_amount'>[]
    // income_generation/contacted_pay_amount_tax_local [select_one] Have you paid tax on this cash received?
    contacted_pay_amount_tax_local: undefined | Option<'contacted_pay_amount_tax_local'>
    // ability_cover_bn/currently_able_basic_needs [select_one] Are you currently able to cover your basic needs: access to water, cooking/getting food, shelter, sleeping space hygiene, etc.).
    currently_able_basic_needs: undefined | Option<'any_member_household'>
    // ability_cover_bn/household_currently_have_clothing [select_one] Does your household currently have enough clothing, bedding, cooking supplies, fuel, lighting, and other items needed to provide a basic level of comfort?
    household_currently_have_clothing: undefined | Option<'any_member_household'>
    // ability_cover_bn/household_currently_have_clothing_no [select_multiple] What basic items do you still feel you need?
    household_currently_have_clothing_no: undefined | Option<'household_currently_have_clothing_no'>[]
    // ability_cover_bn/household_currently_have_clothing_no_other [text] If “Other” - Please, specify
    household_currently_have_clothing_no_other: string | undefined
    // ability_cover_bn/enough_water_household [select_one] Does your home have enough safe water for everyone in your household to drink, cook and wash?
    enough_water_household: undefined | Option<'any_member_household'>
    // ability_cover_bn/enough_water_household_no [text] If “No” - Please, specify
    enough_water_household_no: string | undefined
    // ability_cover_bn/two_weeks_household [select_one] During the past two weeks, did your household purchase more, fewer, or the usual amount of items to meet your basic water, sanitation, and hygiene needs?
    two_weeks_household: undefined | Option<'two_weeks_household'>
    // coping_strategies/resort_any_following [note] ####During the last 3 months, did your household have to resort to any of the following coping mechanisms?
    resort_any_following: string
    // coping_strategies/lcs_sell_hh_assets [select_one] In the last 30 days, did your household sell household assets/goods (furniture/household appliances (i.e. TV, radio, washing machine, etc.) smart phone/jewellery,...) due to a lack of resources to cover basic needs (such as food, shelter, health, education, utilities, fuel for heating, drinking water, etc.)?
    lcs_sell_hh_assets: undefined | Option<'lcs_ask_stranger'>
    // coping_strategies/lcs_spent_savings [select_one] In the last 30 days, did your household spend savings or сonsumed stocks "for a rainy day" due to a lack of resources to cover basic needs (such as food, shelter, health, education, utilities, fuel for heating, drinking water, etc.)?
    lcs_spent_savings: undefined | Option<'lcs_ask_stranger'>
    // coping_strategies/lcs_forrowed_food [select_one] In the last 30 days, did your household purchase food on credit or borrowed food  due to a lack of resources to cover basic needs (such as food, shelter, health, education, utilities, fuel for heating, drinking water, etc.)?
    lcs_forrowed_food: undefined | Option<'lcs_ask_stranger'>
    // coping_strategies/lcs_eat_elsewhere [select_one] In the last 30 days, did your household send household members to eat/live with another family or friends or eat at a food bank/soup kitchen/collective centre distributing food due to a lack of resources to cover to cover basic needs (such as food, shelter, health, education, utilities, fuel for heating, drinking water, etc.)?
    lcs_eat_elsewhere: undefined | Option<'lcs_ask_stranger'>
    // coping_strategies/lcs_sell_productive_assets [select_one] In the last 30 days, did your household sell productive assets or means of transport (sewing machine, bicycle, car, etc.) due to a lack of resources to cover basic needs (such as food, shelter, health, education, utilities, fuel for heating, drinking water, etc.)?
    lcs_sell_productive_assets: undefined | Option<'lcs_ask_stranger'>
    // coping_strategies/lcs_reduce_health_expenditures [select_one] In the last 30 days, did your household reduce essential health expenditures (including drugs,) due to a lack of resources to cover basic needs (such as food, shelter, health, education, utilities,  fuel for heating, drinking water, etc.)?
    lcs_reduce_health_expenditures: undefined | Option<'lcs_ask_stranger'>
    // coping_strategies/lcs_reduce_education_expenditures [select_one] In the last 30 days, did your household reduce essential education expenditures due to a lack of resources to cover basic needs (such as food, shelter, health, education, utilities, fuel for heating, drinking water,  etc.)?
    lcs_reduce_education_expenditures: undefined | Option<'lcs_ask_stranger'>
    // coping_strategies/lcs_sell_house [select_one] In the last 30 days, did your household sell house or land due to a lack of resources to cover basic needs (such as food, shelter, health, education, utilities, fuel for heating, drinking water, etc.)?
    lcs_sell_house: undefined | Option<'lcs_ask_stranger'>
    // coping_strategies/lcs_move_elsewhere [select_one] In the last 30 days, did your HH member(-s) move elsewhere in search of work due to a lack of resources to cover basic needs (such as food, shelter, health, education, utilities, fuel for heating, drinking water, etc.)?
    lcs_move_elsewhere: undefined | Option<'lcs_ask_stranger'>
    // coping_strategies/lcs_degrading_income_source [select_one] In the last 30 days, did your household use degrading sources of income, illegal work, or high risk jobs due to a lack of resources to cover basic needs (such as food, shelter, health, education, utilities, fuel for heating, drinking water, etc.)?
    lcs_degrading_income_source: undefined | Option<'lcs_ask_stranger'>
    // coping_strategies/lcs_ask_stranger [select_one] In the last 30 days, did your household have to ask strangers for money to cover essential needs (such as food, shelter, health, education, utilities, fuel for heating, drinking water, etc.)?
    lcs_ask_stranger: undefined | Option<'lcs_ask_stranger'>
    // coping_strategies/lcs_reason [select_multiple] What were the main reasons why your household decided to use these strategies?
    lcs_reason: undefined | Option<'lcs_reason'>[]
    // coping_strategies/lcs_reason_other [text] If other, specify
    lcs_reason_other: string | undefined
    // outcome/extent_household_basic_needs [select_one] In your opinion, to what extent was your household able to meet your most essential or immediate basic needs after receiving assistance: access to water, cooking/getting food, shelter, sleeping space, hygiene, etc.)?
    extent_household_basic_needs: undefined | Option<'extent_household_basic_needs'>
    // outcome/extent_household_basic_needs_define [select_one] To what extent is your household able to meet its basic needs after receiving the assistance as you define and prioritize them ?
    extent_household_basic_needs_define: undefined | Option<'extent_household_basic_needs_define'>
    // outcome/basic_needs_unable_fulfill_bha345 [select_multiple] Which basic needs is your household currently unable to fulfill?
    basic_needs_unable_fulfill_bha345: undefined | Option<'basic_needs_unable_fulfill_bha345'>[]
    // outcome/basic_needs_unable_fulfill_other_bha345 [text] If other, specify
    basic_needs_unable_fulfill_other_bha345: string | undefined
    // outcome/basic_needs_unable_fully_reason_bha345 [select_multiple] Why are you unable to fully meet this need?
    basic_needs_unable_fully_reason_bha345: undefined | Option<'basic_needs_unable_fully_reason_bha345'>[]
    // outcome/basic_needs_unable_fully_reason_other_bha345 [text] If other, specify
    basic_needs_unable_fully_reason_other_bha345: string | undefined
    // outcome/feel_safe_travelling [select_one] Did you feel safe at all times travelling to receive the assistance/service (to/from your place), while receiving the assistance/service, and upon return to your place (SDH.1)?
    feel_safe_travelling: undefined | Option<'know_address_suggestions'>
    // outcome/feel_safe_travelling_bad [text] If "Mostly yes" or "Not really" or "Not at all", please specify:
    feel_safe_travelling_bad: string | undefined
    // outcome/feel_treated_respect [select_one] Did you feel you were treated with respect by NGO/agency staff during the intervention (SDH.2)?
    feel_treated_respect: undefined | Option<'know_address_suggestions'>
    // outcome/feel_treated_respect_bad [text] If "Mostly yes" or "Not really" or "Not at all", please specify:
    feel_treated_respect_bad: string | undefined
    // outcome/satisfied_assistance_provided [select_one] Are you satisfied with the assistance provided (MEA.1)?
    satisfied_assistance_provided: undefined | Option<'know_address_suggestions'>
    // outcome/satisfied_assistance_provided_bad [text] If "Mostly yes" or "Not really" or "Not at all", please specify:
    satisfied_assistance_provided_bad: string | undefined
    // outcome/know_people_needing [select_one] Do you know of people needing assistance who were excluded from the assistance provided (MEA.2)?
    know_people_needing: undefined | Option<'know_address_suggestions'>
    // outcome/know_people_needing_yes [text] If "Yes, completely" or "Mostly yes", please specify:
    know_people_needing_yes: string | undefined
    // outcome/feel_informed_assistance [select_one] Did you feel well informed about the assistance available (PEM.2)?
    feel_informed_assistance: undefined | Option<'know_address_suggestions'>
    // outcome/feel_informed_assistance_bad [text] If "Mostly yes" or "Not really" or "Not at all", please specify:
    feel_informed_assistance_bad: string | undefined
    // outcome/account_organization_assistance [select_one] Were your views taken into account by the organization about the assistance you received (PEM.1)?
    account_organization_assistance: undefined | Option<'know_address_suggestions'>
    // outcome/account_organization_assistance_bad [text] If "Mostly yes" or "Not really" or "Not at all", please specify:
    account_organization_assistance_bad: string | undefined
    // outcome/where_are_staying [select_one] Where are you staying?
    where_are_staying: undefined | Option<'where_are_staying'>
    // outcome/where_are_staying_other [text] If "Other", please specify
    where_are_staying_other: string | undefined
    // outcome/sufficient_living_spaces [select_one] Do you have sufficient living spaces in your current shelters  (3.5 square meter per person)?
    sufficient_living_spaces: undefined | Option<'sufficient_living_spaces'>
    // outcome/separate_space_adolescent_girls [select_one] Do you have separate space for Adolescent girls and pregnant and lactating women (PLWs) in side your house/shelters?
    separate_space_adolescent_girls: undefined | Option<'separate_space_adolescent_girls'>
    // outcome/shelter_safe_wind [select_one] Is your existing shelter/house is safe from winter, wind (health risks)?
    shelter_safe_wind: undefined | Option<'any_member_household'>
    // outcome/issues_regarding_repaired [select_one] Do you have any HLP issues regarding your repaired apartment / house?
    issues_regarding_repaired: undefined | Option<'any_member_household'>
    // outcome/issues_regarding_repaired_yes [text] If "Yes", please explain why:
    issues_regarding_repaired_yes: string | undefined
    // outcome/shelter_assistance_return [select_one] Did shelter assistance help you to return and reside in the repaired house/apartment?
    shelter_assistance_return: undefined | Option<'any_member_household'>
    // outcome/shelter_assistance_return_no [text] If "No", please explain why:
    shelter_assistance_return_no: string | undefined
    // outcome/planning_staying_repaired [select_one] Are you planning on staying in your repaired  house/apartment for a long time?
    planning_staying_repaired: undefined | Option<'planning_staying_repaired'>
    // outcome/planning_staying_repaired_other [text] If "Other", please specify
    planning_staying_repaired_other: string | undefined
    // outcome/planning_staying_repaired_no [text] If "No", please explain why:
    planning_staying_repaired_no: string | undefined
    // hi/square_metres [integer] In square metres, what is the total space of your accommodation?
    square_metres: number | undefined
    // hi/sealed_bad_weather [select_one] Is your dwelling dry and sealed from bad weather?
    sealed_bad_weather: undefined | Option<'any_member_household'>
    // hi/access_running_water [select_one] Do you have access to running water (inside the home via taps)?
    access_running_water: undefined | Option<'access_heating'>
    // hi/access_hot_water [select_one] Do you have access to hot water?
    access_hot_water: undefined | Option<'access_heating'>
    // hi/access_washing_facilities [select_one] Do you have access to adequate personal washing facilities (Bath, shower or sink)?
    access_washing_facilities: undefined | Option<'access_heating'>
    // hi/access_sanitation_facilities [select_one] Do you have access to adequate sanitation facilities (Toilet)?
    access_sanitation_facilities: undefined | Option<'access_heating'>
    // hi/access_heating [select_one] Do you have access to adequate heating?
    access_heating: undefined | Option<'access_heating'>
    // hi/property_draft_proofing [select_one] Does your property have draft proofing? (Is it possible to make it warm?)
    property_draft_proofing: undefined | Option<'any_member_household'>
    // hi/property_adequately_insulated [select_one] Is your property adequately insulated? (Once heated, is it possible to keep it warm for a reasonable time?)
    property_adequately_insulated: undefined | Option<'any_member_household'>
    // hi/property_double_glazed_windows [select_one] Does your property have double-glazed windows (Minimum two glass panes, one gas space between panes),?
    property_double_glazed_windows: undefined | Option<'any_member_household'>
    // hi/formal_agreement_landlord [select_one] Does you have a formal written agreement of tenancy with your landlord?
    formal_agreement_landlord: undefined | Option<'any_member_household'>
    // hi/access_external_locked [select_one] Do you have access to external locked doors on your property?
    access_external_locked: undefined | Option<'any_member_household'>
    // hi/access_private_space [select_one] Does your houeshold have access to private space (space you don't share with other households)?
    access_private_space: undefined | Option<'any_member_household'>
    // hi/access_basic_electricity_gas [select_one] Do you have access to basic facilities (electricity, gas)?
    access_basic_electricity_gas: undefined | Option<'any_member_household'>
    // safe/rent_assistance_timely_manner [select_one] Do you think that the cash for rent assistance you received was provided in a timely manner?
    rent_assistance_timely_manner: undefined | Option<'any_member_household'>
    // safe/feel_place_secure [select_one] Do you feel that the place where you live is largely secure (in terms of both place and  living conditions)?
    feel_place_secure: undefined | Option<'feel_place_secure'>
    // safe/feel_place_secure_other [text] If "Other", please specify
    feel_place_secure_other: string | undefined
    // safe/feel_place_secure_no [text] Why do you feel that the place where you live is not secure?
    feel_place_secure_no: string | undefined
    // safe/living_conditions_result [select_one] Have living conditions been improved as a result of the project intervention?
    living_conditions_result: undefined | Option<'any_member_household'>
    // safe/current_living_space [select_one] Does your current living space allow you to conduct essential household activities with dignity, security, and provide protection from physical and environmental harm?
    current_living_space: undefined | Option<'any_member_household'>
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
    // aap/any_member_household [select_one] Have you or any member of your household been exposed to any risk as a consequence of receiving the CASH?
    any_member_household: undefined | Option<'any_member_household'>
    // aap/any_member_household_yes [text] If "Yes", you have experienced any challenge or insecurity situation as consequence of receiving CASH, can you tell us what happened?
    any_member_household_yes: string | undefined
    // aap/provide_someone_commission [select_one] Have you ever had to provide someone with a commission, a gift, a tip, a service or a favor to get in the list of project participants, or to receive the cash?
    provide_someone_commission: undefined | Option<'provide_someone_commission'>
    // aap/provide_someone_commission_yes [select_one] If "Yes", to whom did you had to provide the rate, gift, tip, favor, or service?
    provide_someone_commission_yes: undefined | Option<'provide_someone_commission_yes'>
    // aap/provide_someone_commission_yes_other [text] If "To another person", please specify
    provide_someone_commission_yes_other: string | undefined
    // aap/know_address_suggestions [select_one] Do you know how and where you could address your suggestions, comments or complaints related to the work of the Danish Refugee Council, if any?
    know_address_suggestions: undefined | Option<'know_address_suggestions'>
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
    // aap/submitted_feedback_complaint [select_one] If you submitted any feedback and complaint, did you receive a response from the program and organization?
    submitted_feedback_complaint: undefined | Option<'submitted_feedback_complaint'>
    // aap/comment [text] Interviewer's comment
    comment: string | undefined
    // not_thank [note] Thank you for taking the time to fill out this form.
    not_thank: string
  }
  export const options = {
    undefined: {
      carep: `Cash for Repair`,
      inperson: `In-person`,
      remote: `Remote`,
      tamc: `Multi-purpose cash assistance (MPCA)`,
      tacn: `Cash for rent`,
      tacr: `Cash for repairs`,
      rphr: `Cash for the house repairs`,
      rphc: `I hired a contractor`,
      other: `Other`,
      rrip: `In person`,
      rrbp: `By phone`,
      rros: `Online Survey [cash for rent only]`,
      styc: `Yes, completely or mostly`,
      stnr: `No, not really or not at all`,
      stdk: `Don't know`,
      ndyl: `Yes, a lot`,
      ndyf: `Yes, a few`,
      ndnr: `Not really`,
      ndna: `Not at all`,
      nddk: `Don't know`,
      ndnn: `No answer`,
      rtvs: `Very Satisfied`,
      rtsi: `Satisfied`,
      rtsf: `Satisfactory`,
      rtds: `Dissatisfied`,
      rtvd: `Very Dissatisfied`,
      pryf: `Yes- fully`,
      prym: `Yes- most of the priority needs`,
      prys: `Yes- some of the priority needs`,
      prno: `None`,
      prdk: `Don't know`,
      prna: `No answer`,
      piyf: `Yes- greatly`,
      piym: `Yes- mostly`,
      piys: `Yes- some`,
      pino: `None`,
      pidk: `Don't know`,
      pina: `No answer`,
      cnbp: `By phone`,
      cnbe: `By email`,
      cnws: `On Web-site`,
      cnbs: `Complaint box on site`,
      cncd: `Complaint desk on site`,
      cntm: `Text message`,
      cnno: `None`,
      cannot_cover: `Cannot cover`,
      some: `Able to cover some of them`,
      all: `Able to cover all the basic needs`,
      all_extra_costs: `All the basic needs are covered and we can afford extra costs (cinema, café, etc.)`,
    },
    pdmtype: {
      empca: `Emergency MPCA`,
      bnmpca: `Basic Needs MPCA`,
      caren: `Cash for Rent`,
      caf: `Cash for aimal feed`,
      casr: `Cash for animal Shelter repair`,
      cfu: `Cash for utilities`,
      cfg: `Cash for agriculture`,
      csf: `Cash for solid fuel`,
      carep: `Cash for Repair`,
    },
    office: {
      dnipro: `DNK (Dnipro)`,
      kharkiv: `HRK (Kharkiv)`,
      chernihiv: `CEJ (Chernihiv)`,
      sumy: `UMY (Sumy)`,
      mykolaiv: `NLV (Mykolaiv)`,
      lviv: `LWO (Lviv)`,
      zaporizhzhya: `ZPR (Zaporizhzhya)`,
      slovyansk: `DOC (Slovyansk)`,
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
    amount_cash_received_correspond_yes: {
      rele: `Less`,
      rets: `The same`,
      remo: `More`,
    },
    received_enough_agricultural_needs_long: {
      first: `Within the first month`,
      two: `Two months`,
      three: `Three months.`,
      other: `Other`,
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
    separate_space_adolescent_girls: {
      yes: `Yes`,
      no: `No`,
      not_applicable: `Not applicable as we don't have such members`,
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
    time_registered_assistance: {
      trlw: `Less than a week`,
      trow: `One week`,
      trtw: `Two weeks`,
      trhw: `Three weeks`,
      trfw: `Four weeks or more`,
      trrm: `I haven't received the money yet`,
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
    sufficient_living_spaces: {
      yes: `Yes`,
      no: `No`,
      ydk: `Dont know`,
    },
    improve_living: {
      ippr: `Paying rent for the current place (avoiding eviction)`,
      ipnp: `Renting a new place`,
      iprd: `Restoring damaged house/apartment where you currently reside`,
      ipba: `Buying additional HH supplies to improve the level of comfort`,
      other: `Other`,
    },
    assistance_other_repairs_rate: {
      rnct: `0-25%`,
      rntf: `26-50%`,
      rnfs: `51-75%`,
      rnst: `76-100%`,
    },
    money_received: {
      smwi: `Windows`,
      smdi: `Doors interior / doors exterior`,
      smro: `Roof`,
      other: `Other`,
    },
    brochure_provided: {
      yes: `Yes`,
      no: `No`,
      dnb: `I did not receive a brochure`,
    },
    who_assisted: {
      wahd: `I have done it myself`,
      wacd: `Contractor driven approach`,
      wanb: `Nothing has been done yet`,
      other: `Other`,
    },
    planning_staying_repaired: {
      yes: `Yes`,
      no: `No`,
      other: `Other`,
    },
    feel_place_secure: {
      yes: `Yes`,
      no: `No`,
      pidk: `Don't know`,
      other: `Other`,
    },
    access_heating: {
      acal: `A = Always`,
      acna: `B = Not always on but comes daily`,
      acco: `C = Comes on intermittent days`,
      acre: `D = Rarely`,
      acne: `E = Never`,
    },
    two_weeks_household: {
      usmo: `More`,
      usfe: `Fewer`,
      usnc: `No change`,
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
    know_address_suggestions: {
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
    donor: {
      ukr000270_pofu: `Pooled Funds (UKR- 000270)`,
      ukr000298_novo: `Novonordisk (UKR-000298)`,
      ukr000360_novo: `Novonordisk (UKR-000360)`,
      ukr000322_echo: `ECHO (UKR-000322)`,
      ukr000314_uhf4: `UHF4 (UKR-000314)`,
      ukr000336_uhf6: `UHF6 (UKR-000336)`,
      ukr000345_bha: `BHA (UKR-000345)`,
      ukr000348_bha_llh: `BHA LLH (UKR-000348)`,
      ukr000352_uhf7: `UHF7 (UKR-000352)`,
      ukr000347_danida: `DANIDA (UKR-000347)`,
      ukr000330_sdc: `SDC (UKR-000330)`,
      ukr000340_augustinus_fonden_mpca: `Augustinus Fonden  MPCA (UKR-000340)`,
      ukr000341_hoffman_husmans_fond_mpca: `Hoffman & Husmans Fond MPCA (UKR-000341)`,
      ukr000342_private_funds: `Private Funds UKR-000342`,
      other: `Other`,
    },
    received_feed_livestock_winter_long: {
      '1_mount': `1 month`,
      '2_mount': `2 months`,
      '3_mount': `Three months`,
      other: `Other`,
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
    completed_renovation_livestock_no: {
      no_item: `No items available on market`,
      cash: `Cash provided not sufficient to buy items needed`,
      spend_else: `Had to spend the cash on something else`,
      other: `Other`,
    },
    type_renovation: {
      my_own: `On my own`,
      employees: `To hire employees`,
      other: `Other`,
    },
    after_assistance_natural_products: {
      increased: `Increased`,
      same: `Remained the same`,
      decreased: `Decreased`,
      other: `Other`,
    },
    lcs_ask_stranger: {
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
    extent_household_basic_needs: {
      all: `All needs`,
      most: `Most needs`,
      some: `Some needs`,
      vety_few: `Very few of the needs`,
      no_needs: `No needs met`,
      no_response: `No response`,
      dk: `Don't know`,
    },
    household_currently_have_clothing_no: {
      clothing: `Clothing`,
      bedding: `Bedding`,
      cooking_dining_utensils: `Cooking and dining utensils`,
      lighting: `Lighting`,
      fuel_heating: `Fuel/heating`,
      shoes: `Shoes`,
      other: `Other`,
    },
    extent_household_basic_needs_define: {
      all: `All of them`,
      most: `Most of the needs`,
      about_half: `About half of the priority needs`,
      some: `Some of them (less than a half)`,
      none: `None`,
      dk: `Don't know`,
      na: `No answer`,
    },
    basic_needs_unable_fulfill_bha345: {
      food_drink: `Food & drink`,
      rent: `Rent`,
      utilities: `Utilities`,
      clothes: `Clothes`,
      payment_mobile_communications: `Payment for mobile communications`,
      health_care: `Health Care (medical treatment, medicines, etc.)`,
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
    where_are_staying: {
      collective_center: `At a collective/transit center`,
      relatives_friends: `I'm hosted by relatives or friends`,
      hosted_people_dk: `I'm hosted by people I didn’t know before`,
      renting_apartment: `I'm renting an apartment`,
      hotel_hostel: `I'm at hotel/hostel`,
      own_house: `I'm at my own house`,
      housing_yet: `I don’t have housing yet - I don't know where I'll be living`,
      dormitory: `In dormitory`,
      Other: `Other`,
    },
    provide_someone_commission: {
      yes: `Yes`,
      no: `No`,
      refuse: `Refuse to answer`,
    },
    prior_proportion_spent_food: {
      all: `I spent all of my income on food`,
      most: `I spent most (approx. 75% or more) of my income on food`,
      about_half: `I spend about half (50%) of my income on food`,
      small: `I spend a small proportion (25% or less) on food`,
    },
    since_proportion_spend_food: {
      same: `I spend the same proportion as I did before`,
      all: `I spent all of my income on food`,
      most: `I spent most (approx. 75% or more) of my income on food`,
      about_half: `I spend about half (50%) of my income on food`,
      small: `I spend a small proportion (25% or less) on food`,
    },
    ben_det_oblast: {
      aroc: `Autonomous Republic of Crimea`,
      vinnytska: `Vinnytsia`,
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

  export const map = (_: Record<keyof T, any>): T =>
    ({
      ..._,
      date: _.date ? new Date(_.date) : undefined,
      date_interview: _.date_interview ? new Date(_.date_interview) : undefined,
      unique_number: _.unique_number ? +_.unique_number : undefined,
      age: _.age ? +_.age : undefined,
      how_many_family: _.how_many_family ? +_.how_many_family : undefined,
      number_female: _.number_female ? +_.number_female : undefined,
      number_male: _.number_male ? +_.number_male : undefined,
      number_disabilities: _.number_disabilities ? +_.number_disabilities : undefined,
      pdmtype: _.pdmtype?.split(' '),
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
      completed_renovation_livestock_no: _.completed_renovation_livestock_no?.split(' '),
      contacted_pay_amount: _.contacted_pay_amount?.split(' '),
      household_currently_have_clothing_no: _.household_currently_have_clothing_no?.split(' '),
      lcs_reason: _.lcs_reason?.split(' '),
      basic_needs_unable_fulfill_bha345: _.basic_needs_unable_fulfill_bha345?.split(' '),
      basic_needs_unable_fully_reason_bha345: _.basic_needs_unable_fully_reason_bha345?.split(' '),
      square_metres: _.square_metres ? +_.square_metres : undefined,
      needs_community_currently: _.needs_community_currently?.split(' '),
    }) as T
}
