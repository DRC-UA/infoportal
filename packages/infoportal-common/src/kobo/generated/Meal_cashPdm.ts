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
    ben_det_raion: undefined | Option<'ben_det_raion'>
    // metadata/ben_det_hromada [select_one] Select hromada
    ben_det_hromada: undefined | Option<'ben_det_hromada'>
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
    // ic/not_vet [note] Hello I am from DRC organization (please mention your organization name)! We want to ask you some questions to obtain information about the Cash Assistance that you have received from us for vocational training. We want to hear your thoughts so we can improve the way that we are doing our job. Your participation is voluntary and the questions will take around 20-30 minutes to answer. If you accept to participate, you have the option to stop answering or to not answer any question that you don't want to. This information will help us to understand what has been done appropriately in the process, what hasn't worked that good and what we should be doing differently. The information you share will be kept protected and will only be shared with a small group of people in the organization (please mention your organization name). Finally, please know that if you provide negative feedback about our work, this will not have any negative consequences to your permanence in this or future activities of this project.
    not_vet: string
    // ic/not_agriculture [note] Hello I am from DRC organization (please mention your name)! We want to ask you some questions to obtain information about the Cash Assistance that you have received from us for **agriculture**. We want to hear your thoughts so we can improve the way that we are doing our job. Your participation is voluntary and the questions will take around 20-30 minutes to answer. If you accept to participate, you have the option to stop answering or to not answer any question that you don't want to. This information will help us to understand what has been done appropriately in the process, what hasn't worked that good and what we should be doing differently. The information you share will be kept protected and will only be shared with a small group of people in this organization. Finally, please know that if you provide negative feedback about our work, this will not have any negative consequences to your permanence in this or future activities of this project.
    not_agriculture: string
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
    // sufficiency/cash_modality_inkind [select_one] Did you prefer the cash modality, or would you have liked to receive in-kind assistance (e.g., like tools, seeds, maybe poultry)?
    cash_modality_inkind: undefined | Option<'cash_modality_inkind'>
    // sufficiency/training_inductions_agricultural [select_one] Do you need training or inductions to improve your agricultural practices, increase produce?
    training_inductions_agricultural: undefined | Option<'any_member_household'>
    // sufficiency/training_inductions_agricultural_yes [text] If yes, please explain one topic that is the most needed
    training_inductions_agricultural_yes: string | undefined
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
    // sufficiency/type_assistance_agricultural [select_one] Which type of assistance do you think would better support your household’s agricultural needs?
    type_assistance_agricultural: undefined | Option<'type_assistance_agricultural'>
    // sufficiency/cash_modality_inkind_yes [text] If yes, please explain why:
    cash_modality_inkind_yes: string | undefined
    // sufficiency/items_helpful_agriculture [select_one] If you selected in-kind support or a combination, what specific items or resources would be most helpful for your household?
    items_helpful_agriculture: undefined | Option<'items_helpful_agriculture'>
    // sufficiency/training_improve_agricultural [select_one] Would training or additional information on farming or livestock activities help you improve your agricultural practices or use of cash assistance effectively?
    training_improve_agricultural: undefined | Option<'training_improve_agricultural'>
    // sufficiency/type_training_helpful [select_one] What type of training or information would be most helpful for you?
    type_training_helpful: undefined | Option<'type_training_helpful'>
    // sufficiency/type_training_helpful_other [text] If “Other” - Please, specify
    type_training_helpful_other: string | undefined
    // sufficiency_vet/enrol_vocational_center [select_one] Did you enroll in a vocational training center after receiving funding from our organization?
    enrol_vocational_center: undefined | Option<'any_member_household'>
    // sufficiency_vet/enrol_vocational_center_no [text] If no, why not?
    enrol_vocational_center_no: string | undefined
    // sufficiency_vet/training_completed [select_one] Have you completed the vocational training program?
    training_completed: undefined | Option<'training_completed'>
    // sufficiency_vet/training_no_reason [select_one] If no, how much of the training have you completed?
    training_no_reason: undefined | Option<'training_no_reason'>
    // sufficiency_vet/hours_dedicating_vocational [select_one] How many hours per week are you dedicating to vocational training?
    hours_dedicating_vocational: undefined | Option<'hours_dedicating_vocational'>
    // sufficiency_vet/training_type [select_one] What type of vocational training did you attend?
    training_type: undefined | Option<'training_type'>
    // sufficiency_vet/training_type_other [text] If "Other", please specify
    training_type_other: string | undefined
    // sufficiency_vet/skills_usage [select_one] Are you currently using the skills you learned from the vocational training in a new livelihood activity?
    skills_usage: undefined | Option<'skills_usage'>
    // sufficiency_vet/skills_usage_method [select_one] If you are using the skills, in what way are you practicing them?
    skills_usage_method: undefined | Option<'skills_usage_method'>
    // sufficiency_vet/skills_usage_method_other [text] If "Other", please specify
    skills_usage_method_other: string | undefined
    // sufficiency_vet/skills_usage_method_no [text] If no, why not?
    skills_usage_method_no: string | undefined
    // sufficiency_vet/believe_skills_improve [select_one] Do you believe your skills have improved as a result of the vocational training?
    believe_skills_improve: undefined | Option<'any_member_household'>
    // sufficiency_vet/believe_skills_improve_no [text] If no, why not?
    believe_skills_improve_no: string | undefined
    // sufficiency_vet/conf_using_skills [select_one] How confident do you feel about using the skills you have learned in future employment?
    conf_using_skills: undefined | Option<'conf_using_skills'>
    // sufficiency_vet/conf_using_skills_not [text] If selected 'not very confident' or 'not confiedent at all' pelase explain why
    conf_using_skills_not: string | undefined
    // sufficiency_vet/job_started_vocational [select_one] Have you started a job as a result of the assistance or vocational training?
    job_started_vocational: undefined | Option<'any_member_household'>
    // sufficiency_vet/job_started_vocational_no [text] If no, why not?
    job_started_vocational_no: string | undefined
    // sufficiency_vet/worked_other_12m [select_one] Have you worked in any other job in the last 12 months?
    worked_other_12m: undefined | Option<'any_member_household'>
    // sufficiency_vet/job_type [select_one] Is this job permanent or temporary?
    job_type: undefined | Option<'job_type'>
    // sufficiency_vet/job_continuation [select_one] Do you think you will continue working in this job for at least the next 6 months?
    job_continuation: undefined | Option<'job_continuation'>
    // sufficiency_vet/job_duration [integer] For how many months have you been working in this job? (Respond in months)
    job_duration: number | undefined
    // sufficiency_vet/hours_per_week [integer] How many hours per week do you work in this job? (Respond in hours per week)
    hours_per_week: number | undefined
    // sufficiency_vet/income_earned [select_one] Have you earned any income from your new livelihood?
    income_earned: undefined | Option<'any_member_household'>
    // sufficiency_vet/monthly_income [integer] What is your average monthly income from your new livelihood? (specify in UAH)
    monthly_income: number | undefined
    // sufficiency_vet/expenses_made [decimal] What is your average monthly expenses for your livelihood?
    expenses_made: number | undefined
    proft_made: string
    // sufficiency_vet/income_sufficiency [select_one] Do you feel that the income from this job is sufficient to cover your basic needs?
    income_sufficiency: undefined | Option<'income_sufficiency'>
    // sufficiency_vet/income_sufficiency_no [text] If no, why not?
    income_sufficiency_no: string | undefined
    // sufficiency_vet/recommendation [select_one] How likely are you to recommend this vocational training or assistance program to others?
    recommendation: undefined | Option<'recommendation_likelihood'>
    // sufficiency_vet/recommendation_explain [text] Please explain?
    recommendation_explain: string | undefined
    // sufficiency_msme/cash_received_msme [select_one] Did you receive cash assistance as part of the business support program?
    cash_received_msme: undefined | Option<'any_member_household'>
    // sufficiency_msme/cash_not_received_reason [text] If No, why didn’t you receive the cash assistance?
    cash_not_received_reason: string | undefined
    // sufficiency_msme/cash_usage [select_multiple] How did you use the cash assistance for your business? (Select all that apply)
    cash_usage: undefined | Option<'cash_usage'>[]
    // sufficiency_msme/cash_usage_other [text] If “Other” - Please, specify
    cash_usage_other: string | undefined
    // sufficiency_msme/cash_sufficient [select_one] Was the amount of cash assistance sufficient to meet the needs of your business?
    cash_sufficient: undefined | Option<'cash_sufficient'>
    // sufficiency_msme/cash_not_sufficient_reason [text] Please explain why and what amount would have been sufficient?
    cash_not_sufficient_reason: string | undefined
    // sufficiency_msme/business_improvement [select_one] Have you noticed any improvements in your business after receiving the cash assistance?
    business_improvement: undefined | Option<'any_member_household'>
    // sufficiency_msme/improvements_noticed [select_multiple] If Yes, what improvements have you noticed? (Select all that apply)
    improvements_noticed: undefined | Option<'improvements_noticed'>[]
    // sufficiency_msme/improvements_noticed_other [text] If “Other” - Please, specify
    improvements_noticed_other: string | undefined
    // sufficiency_msme/challenges_faced [select_multiple] If No, what challenges are you still facing? (Select all that apply)
    challenges_faced: undefined | Option<'challenges_faced'>[]
    // sufficiency_msme/challenges_faced_other [text] If “Other” - Please, specify
    challenges_faced_other: string | undefined
    // sufficiency_msme/training_attended [select_one] Did you attend the online training provided by the business consultant as part of the business support program?
    training_attended: undefined | Option<'any_member_household'>
    // sufficiency_msme/training_not_attended_reason [text] If No, why didn’t you attend the training?
    training_not_attended_reason: string | undefined
    // sufficiency_msme/training_satisfaction [select_one] How satisfied are you with the quality of the training provided by the business consultant?
    training_satisfaction: undefined | Option<'training_satisfaction'>
    // sufficiency_msme/training_satisfaction_bad [text] If "Unsatisfied" or "very unsatisfied" then:  If you were not satisfied, could you tell us why you were not satisfied?
    training_satisfaction_bad: string | undefined
    // sufficiency_msme/training_expectations_met [select_one] Did the training content provided by the business consultant meet your expectations?
    training_expectations_met: undefined | Option<'training_expectations_met'>
    // sufficiency_msme/training_expectations_not_met_reason [text] If No, what could have been improved?
    training_expectations_not_met_reason: string | undefined
    // sufficiency_msme/training_relevance [select_one] How relevant was the training to the needs of your business?
    training_relevance: undefined | Option<'training_relevance'>
    // sufficiency_msme/training_relevance_improvement [text] If Not relevant, what topics would have been more useful?
    training_relevance_improvement: string | undefined
    // sufficiency_msme/training_format_suitability [select_one] Was the online format suitable for the business consultant’s training?
    training_format_suitability: undefined | Option<'training_format_suitability'>
    // sufficiency_msme/training_format_suitability_reason [text] If No, what format would have been better?
    training_format_suitability_reason: string | undefined
    // sufficiency_msme/training_duration_sufficient [select_one] Do you feel that 5 hours of training from the business consultant were sufficient to cover the topics adequately?
    training_duration_sufficient: undefined | Option<'training_duration_sufficient'>
    // sufficiency_msme/training_duration_additional_needed [text] If No, how much additional time do you think would have been sufficient?
    training_duration_additional_needed: string | undefined
    // sufficiency_msme/training_valuable_part [text] What was the most valuable part of the training for your business?
    training_valuable_part: string | undefined
    // sufficiency_msme/revenue_generated [select_one] Have you generated any revenue from your business since the support from DRC?
    revenue_generated: undefined | Option<'any_member_household'>
    // sufficiency_msme/no_revenue_reason [text] If No, why hasn’t your business generated revenue?
    no_revenue_reason: string | undefined
    // sufficiency_msme/monthly_costs [decimal] On average, what are your business’s monthly costs?
    monthly_costs: number | undefined
    // sufficiency_msme/net_income [select_one] After covering your monthly costs, do you have a net income (profit) from your business?
    net_income: undefined | Option<'any_member_household'>
    // sufficiency_msme/no_net_income_reason [text] If No, what is the main reason for the lack of profit?
    no_net_income_reason: string | undefined
    // sufficiency_msme/recommendation_likelihood [select_one] How likely are you to recommend this business support program to others?
    recommendation_likelihood: undefined | Option<'recommendation_likelihood'>
    // sufficiency_msme/recommendation_explain_msme [text] Please explain?
    recommendation_explain_msme: string | undefined
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
    // income_generation/receiving_cash_purchase_produce [select_one] Since receiving cash assistance, were you able to purchase or produce enough food to meet the basic needs of your household?
    receiving_cash_purchase_produce: undefined | Option<'receiving_cash_purchase_produce'>
    // income_generation/challenges_prevented_meeting [select_multiple] What were the main challenges that prevented you from meeting your household's basic food needs since receiving the cash assistance?
    challenges_prevented_meeting: undefined | Option<'challenges_prevented_meeting'>[]
    // income_generation/challenges_prevented_meeting_other [text] If “Other” - Please, specify
    challenges_prevented_meeting_other: string | undefined
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
    // ability_cover_bn/extent_basic_needs [select_one] To what extent is your household able to meet its basic needs as you define and prioritize them?
    extent_basic_needs: undefined | Option<'extent_basic_needs'>
    // ability_cover_bn/basic_needs_unable_fulfil [select_multiple] Which basic needs is your household currently unable to fulfil?
    basic_needs_unable_fulfil: undefined | Option<'most_important_things'>[]
    // ability_cover_bn/basic_needs_unable_fulfil_other [text] Other, specify:
    basic_needs_unable_fulfil_other: string | undefined
    // ability_cover_bn/unable_fulfil_basic_food [select_multiple] What were the reasons for these Basic food needs being unmet?
    unable_fulfil_basic_food: undefined | Option<'unable_fulfil_other'>[]
    // ability_cover_bn/unable_fulfil_basic_food_other [text] Other, specify:
    unable_fulfil_basic_food_other: string | undefined
    // ability_cover_bn/unable_fulfil_food_children [select_multiple] What were the reasons for these Special food needs of your children 0–23 months being unmet?
    unable_fulfil_food_children: undefined | Option<'unable_fulfil_other'>[]
    // ability_cover_bn/unable_fulfil_food_children_other [text] Other, specify:
    unable_fulfil_food_children_other: string | undefined
    // ability_cover_bn/unable_fulfil_food_pregnant [select_multiple] What were the reasons for these Special food needs of pregnant and lactating women being unmet?
    unable_fulfil_food_pregnant: undefined | Option<'unable_fulfil_other'>[]
    // ability_cover_bn/unable_fulfil_food_pregnant_other [text] Other, specify:
    unable_fulfil_food_pregnant_other: string | undefined
    // ability_cover_bn/unable_fulfil_water_needs [select_multiple] What were the reasons for these Water needs being unmet?
    unable_fulfil_water_needs: undefined | Option<'unable_fulfil_other'>[]
    // ability_cover_bn/unable_fulfil_water_needs_other [text] Other, specify:
    unable_fulfil_water_needs_other: string | undefined
    // ability_cover_bn/unable_fulfil_hygiene_needs [select_multiple] What were the reasons for these Hygiene needs being unmet?
    unable_fulfil_hygiene_needs: undefined | Option<'unable_fulfil_other'>[]
    // ability_cover_bn/unable_fulfil_hygiene_needs_other [text] Other, specify:
    unable_fulfil_hygiene_needs_other: string | undefined
    // ability_cover_bn/unable_fulfil_shelter_needs [select_multiple] What were the reasons for these Shelter/housing needs being unmet?
    unable_fulfil_shelter_needs: undefined | Option<'unable_fulfil_other'>[]
    // ability_cover_bn/unable_fulfil_shelter_needs_other [text] Other, specify:
    unable_fulfil_shelter_needs_other: string | undefined
    // ability_cover_bn/unable_fulfil_healthcare_needs [select_multiple] What were the reasons for these Healthcare needs of your households being unmet?
    unable_fulfil_healthcare_needs: undefined | Option<'unable_fulfil_other'>[]
    // ability_cover_bn/unable_fulfil_healthcare_needs_other [text] Other, specify:
    unable_fulfil_healthcare_needs_other: string | undefined
    // ability_cover_bn/unable_fulfil_healthcare_children [select_multiple] What were the reasons for these Special healthcare needs of your children 0–23 months being unmet?
    unable_fulfil_healthcare_children: undefined | Option<'unable_fulfil_other'>[]
    // ability_cover_bn/unable_fulfil_healthcare_children_other [text] Other, specify:
    unable_fulfil_healthcare_children_other: string | undefined
    // ability_cover_bn/unable_fulfil_healthcare_pregnant [select_multiple] What were the reasons for these Special healthcare needs of pregnant and lactating women being unmet?
    unable_fulfil_healthcare_pregnant: undefined | Option<'unable_fulfil_other'>[]
    // ability_cover_bn/unable_fulfil_healthcare_pregnant_other [text] Other, specify:
    unable_fulfil_healthcare_pregnant_other: string | undefined
    // ability_cover_bn/unable_fulfil_transportation_needs [select_multiple] What were the reasons for these Transportation needs being unmet?
    unable_fulfil_transportation_needs: undefined | Option<'unable_fulfil_other'>[]
    // ability_cover_bn/unable_fulfil_transportation_needs_other [text] Other, specify:
    unable_fulfil_transportation_needs_other: string | undefined
    // ability_cover_bn/unable_fulfil_communication_needs [select_multiple] What were the reasons for these Communication needs being unmet?
    unable_fulfil_communication_needs: undefined | Option<'unable_fulfil_other'>[]
    // ability_cover_bn/unable_fulfil_communication_needs_other [text] Other, specify:
    unable_fulfil_communication_needs_other: string | undefined
    // ability_cover_bn/unable_fulfil_education_needs [select_multiple] What were the reasons for these Education needs for children being unmet?
    unable_fulfil_education_needs: undefined | Option<'unable_fulfil_other'>[]
    // ability_cover_bn/unable_fulfil_education_needs_other [text] Other, specify:
    unable_fulfil_education_needs_other: string | undefined
    // ability_cover_bn/unable_fulfil_clothing_needs [select_multiple] What were the reasons for these Clothing needs being unmet?
    unable_fulfil_clothing_needs: undefined | Option<'unable_fulfil_other'>[]
    // ability_cover_bn/unable_fulfil_clothing_needs_other [text] Other, specify:
    unable_fulfil_clothing_needs_other: string | undefined
    // ability_cover_bn/unable_fulfil_utilities [select_multiple] What were the reasons for these Utilities being unmet?
    unable_fulfil_utilities: undefined | Option<'unable_fulfil_other'>[]
    // ability_cover_bn/unable_fulfil_utilities_other [text] Other, specify:
    unable_fulfil_utilities_other: string | undefined
    // ability_cover_bn/unable_fulfil_other [select_multiple] What were the reasons for these Other being unmet?
    unable_fulfil_other: undefined | Option<'unable_fulfil_other'>[]
    // ability_cover_bn/unable_fulfil_other_specify [text] Other, specify:
    unable_fulfil_other_specify: string | undefined
    // ability_cover_bn/most_important_things [select_multiple] What are the most important things that the cash helped your household to do or buy that you could not do or buy before you received it?
    most_important_things: undefined | Option<'most_important_things'>[]
    // ability_cover_bn/most_important_things_other [text] If "Other", please specify
    most_important_things_other: string | undefined
    // coping_strategies/resort_any_following [note] ####During the last 3 months, did your household have to resort to any of the following coping mechanisms?
    resort_any_following: string
    // coping_strategies/income_spent_food [integer] In the last 7 days, what proportion of the overall household income was spent on food (human consumption)?
    income_spent_food: number | undefined
    // coping_strategies/income_spent_nonfood [integer] In the last 7 days, what proportion of the overall household income was spent on non-food items and services such as health and education related services?
    income_spent_nonfood: number | undefined
    // coping_strategies/lcs_sell_hh_assets [select_one] In the last 30 days, did your household sell household assets/goods (furniture/household appliances (i.e. TV, radio, washing machine, etc.) smart phone/jewellery,...) due to a lack of resources to cover basic needs (such as food, shelter, health, education, utilities, fuel for heating, drinking water, etc.)?
    lcs_sell_hh_assets: undefined | Option<'lcs_decrease_fertilizer'>
    // coping_strategies/lcs_spent_savings [select_one] In the last 30 days, did your household spend savings or сonsumed stocks "for a rainy day" due to a lack of resources to cover basic needs (such as food, shelter, health, education, utilities, fuel for heating, drinking water, etc.)?
    lcs_spent_savings: undefined | Option<'lcs_decrease_fertilizer'>
    // coping_strategies/lcs_forrowed_food [select_one] In the last 30 days, did your household purchase food on credit or borrowed food  due to a lack of resources to cover basic needs (such as food, shelter, health, education, utilities, fuel for heating, drinking water, etc.)?
    lcs_forrowed_food: undefined | Option<'lcs_decrease_fertilizer'>
    // coping_strategies/lcs_eat_elsewhere [select_one] In the last 30 days, did your household send household members to eat/live with another family or friends or eat at a food bank/soup kitchen/collective centre distributing food due to a lack of resources to cover to cover basic needs (such as food, shelter, health, education, utilities, fuel for heating, drinking water, etc.)?
    lcs_eat_elsewhere: undefined | Option<'lcs_decrease_fertilizer'>
    // coping_strategies/lcs_sell_productive_assets [select_one] In the last 30 days, did your household sell productive assets or means of transport (sewing machine, bicycle, car, etc.) due to a lack of resources to cover basic needs (such as food, shelter, health, education, utilities, fuel for heating, drinking water, etc.)?
    lcs_sell_productive_assets: undefined | Option<'lcs_decrease_fertilizer'>
    // coping_strategies/lcs_reduce_health_expenditures [select_one] In the last 30 days, did your household reduce essential health expenditures (including drugs,) due to a lack of resources to cover basic needs (such as food, shelter, health, education, utilities,  fuel for heating, drinking water, etc.)?
    lcs_reduce_health_expenditures: undefined | Option<'lcs_decrease_fertilizer'>
    // coping_strategies/lcs_reduce_education_expenditures [select_one] In the last 30 days, did your household reduce essential education expenditures due to a lack of resources to cover basic needs (such as food, shelter, health, education, utilities, fuel for heating, drinking water,  etc.)?
    lcs_reduce_education_expenditures: undefined | Option<'lcs_decrease_fertilizer'>
    // coping_strategies/lcs_sell_house [select_one] In the last 30 days, did your household sell house or land due to a lack of resources to cover basic needs (such as food, shelter, health, education, utilities, fuel for heating, drinking water, etc.)?
    lcs_sell_house: undefined | Option<'lcs_decrease_fertilizer'>
    // coping_strategies/lcs_move_elsewhere [select_one] In the last 30 days, did your HH member(-s) move elsewhere in search of work due to a lack of resources to cover basic needs (such as food, shelter, health, education, utilities, fuel for heating, drinking water, etc.)?
    lcs_move_elsewhere: undefined | Option<'lcs_decrease_fertilizer'>
    // coping_strategies/lcs_degrading_income_source [select_one] In the last 30 days, did your household use degrading sources of income, illegal work, or high risk jobs due to a lack of resources to cover basic needs (such as food, shelter, health, education, utilities, fuel for heating, drinking water, etc.)?
    lcs_degrading_income_source: undefined | Option<'lcs_decrease_fertilizer'>
    // coping_strategies/lcs_ask_stranger [select_one] In the last 30 days, did your household have to ask strangers for money to cover essential needs (such as food, shelter, health, education, utilities, fuel for heating, drinking water, etc.)?
    lcs_ask_stranger: undefined | Option<'lcs_decrease_fertilizer'>
    // coping_strategies/lcs_decrease_fertilizer [select_one] In the last 30 days, did anyone in your household have to decrease expenditures on fertilizer, pesticide, fodder, animal feed, veterinary care, etc. due to a lack of food or money to buy it?
    lcs_decrease_fertilizer: undefined | Option<'lcs_decrease_fertilizer'>
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
    // outcome/most_help_household [text] What are the most important things that the cash helped your household to do or buy that you could not do or buy before you received it?
    most_help_household: string | undefined
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
    // outcome/account_organization_assistance [select_one] Were your views taken into account by the organization about the assistance you received (PEM.1)?
    account_organization_assistance: undefined | Option<'know_address_suggestions'>
    // outcome/account_organization_assistance_bad [text] If "Mostly yes" or "Not really" or "Not at all", please specify:
    account_organization_assistance_bad: string | undefined
    // outcome/feel_informed_assistance [select_one] Did you feel well informed about the assistance available (PEM.2)?
    feel_informed_assistance: undefined | Option<'know_address_suggestions'>
    // outcome/feel_informed_assistance_bad [text] If "Mostly yes" or "Not really" or "Not at all", please specify:
    feel_informed_assistance_bad: string | undefined
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
      increased: `Increased`,
      decreased: `No, my income has decreased`,
      stayed_same: `Stayed the same`,
      significant_increase: `Yes, I have seen a significant increase`,
      slight_increase: `Yes, I have seen a slight increase`,
      same: `No, income has stayed the same`,
      definitely_yes: `Yes, definitely`,
      probably_yes: `Yes, probably`,
      no: `No, I do not think so`,
      not_sure: `I am not sure`,
      no_change: `No, my income has stayed the same`,
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
      vet: `Vocational training (VET)`,
      msme: `Business support (MSME)`,
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
      ukr000372_echo3: `ECHO (UKR-000372)`,
      ukr000314_uhf4: `UHF4 (UKR-000314)`,
      ukr000336_uhf6: `UHF6 (UKR-000336)`,
      ukr000352_uhf7: `UHF7 (UKR-000352)`,
      ukr000363_uhf8: `UHF8 (UKR-000363)`,
      ukr000345_bha: `BHA (UKR-000345)`,
      ukr000348_bha_llh: `BHA LLH (UKR-000348)`,
      ukr000388_bha: `BHA (UKR-000388)`,
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
    lcs_decrease_fertilizer: {
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
    training_type: {
      technical: `Technical skills  (e.g., carpentry, welding)`,
      service: `Service sector skills`,
      it: `Information technology`,
      other: `Other`,
    },
    skills_usage: {
      regularly: `Yes, I regularly use the skills`,
      sometimes: `Yes, I use the skills sometimes`,
      not_using: `No, I am not using the skills`,
      not_completed_training: `No, I have not completed the training yet`,
    },
    skills_usage_method: {
      job_started: `In a job I started after the training`,
      personal_business: `In a personal business I started`,
      informal: `In informal or part-time work`,
      not_using: `I am not using the skills`,
      other: `Other`,
    },
    training_completed: {
      completed: `Yes, I completed it`,
      attending: `No, I am still attending`,
      dropped: `No, I dropped out`,
    },
    job_type: {
      permanent: `Permanent`,
      temporary: `Temporary`,
      sure: `I am not sure`,
    },
    training_no_reason: {
      less_25: `Less than 25%`,
      '25_50': `25% - 50%`,
      '50_75': `50% - 75%`,
      more_75: `75% - 100%`,
    },
    conf_using_skills: {
      very_confident: `Very confident`,
      somewhat_confident: `Somewhat confident`,
      not_very_confident: `Not very confident`,
      not_all: `Not confident at all`,
    },
    hours_dedicating_vocational: {
      less_10h: `Less than 10 hours`,
      '10_20h': `10-20 hours`,
      more_30h: `More than 30 hours`,
    },
    income_sufficiency: {
      sufficient: `Yes, it is sufficient`,
      somewhat_sufficient: `Somewhat sufficient`,
      not_sufficient: `No, it is not sufficient`,
      not_sure: `I am not sure`,
    },
    job_continuation: {
      definitely: `Yes, definitely`,
      probably: `Yes, probably`,
      unlikely: `No, I don’t think so`,
      not_sure: `I am not sure`,
    },
    recommendation_likelihood: {
      very: `Very likely`,
      somewhat: `Somewhat likely`,
      unlikely: `Unlikely`,
      very_unlikely: `Very unlikely`,
    },
    cash_usage: {
      materials: `Purchase of materials or supplies`,
      equipment: `Purchase of equipment or tools`,
      wages: `Payment of wages`,
      rent_utilities: `Rent or utilities`,
      expanded_customer_base: `Expanded customer base`,
      other: `Other`,
    },
    cash_sufficient: {
      yes: `Yes, it was sufficient`,
      somewhat: `Somewhat sufficient, but more was needed`,
      no: `No, it was not sufficient`,
    },
    improvements_noticed: {
      improved_quality: `Improved product/service quality`,
      increased_capacity: `Increased production or service capacity`,
      hired_employees: `Hired new employees`,
      expand_customer_base: `Expand customer base`,
      increased_revenue: `Increased revenue`,
      other: `Other`,
    },
    challenges_faced: {
      insufficient_cash: `Insufficient cash assistance`,
      low_demand: `Lack of demand for products/services`,
      supply_issues: `Difficulty in accessing supplies or resources`,
      skill_issues: `Insufficient skills or knowledge`,
      other: `Other`,
    },
    training_satisfaction: {
      very_satisfied: `Very satisfied`,
      satisfied: `Satisfied`,
      neutral: `Neutral`,
      unsatisfied: `Unsatisfied`,
      very_unsatisfied: `Very unsatisfied`,
    },
    training_expectations_met: {
      met_expectations: `Met expectations`,
      not_met: `Did not meet expectations`,
    },
    training_relevance: {
      very_relevant: `Very relevant`,
      somewhat_relevant: `Somewhat relevant`,
      not_relevant: `Not relevant`,
    },
    training_format_suitability: {
      suitable: `Suitable`,
      somewhat_suitable: `Somewhat suitable`,
      not_suitable: `Not suitable`,
    },
    training_duration_sufficient: {
      sufficient_duration: `Sufficient duration`,
      additional_time: `Additional time needed`,
    },
    cash_modality_inkind: {
      yes: `Yes, I prefer cash modality`,
      no: `No I would have preferred in kind`,
    },
    receiving_cash_purchase_produce: {
      always: `Yes, always`,
      most_time: `Yes, most of the time`,
      sometimes: `Sometimes`,
      rarely: `Rarely`,
      not_all: `No, not at all`,
    },
    challenges_prevented_meeting: {
      insufficient_assistance: `Insufficient cash assistance`,
      increased_food_prices: `Increased food prices`,
      lack_access_agricultural: `Lack of access to agricultural inputs or resources`,
      poor_harvest: `Poor harvest or low production`,
      other: `Other`,
    },
    type_assistance_agricultural: {
      cash: `Cash assistance`,
      in_kind: `In-kind support (e.g., tools, seeds, poultry)`,
      combination: `A combination of both`,
    },
    items_helpful_agriculture: {
      seeds: `Seeds`,
      tools: `Tools`,
      poultry_livestock: `Poultry or livestock`,
      fertilizer: `Fertilizer`,
      other: `Other`,
    },
    training_improve_agricultural: {
      very: `Yes, very helpful`,
      somewhat: `Yes, somewhat helpful`,
      not: `No, not helpful`,
    },
    type_training_helpful: {
      quality_agricultural_inputs: `How to buy quality agricultural inputs (e.g., seeds, tools, livestock)`,
      practices_farming: `Best practices for farming or crop production`,
      livestock_management: `Livestock care and management`,
      business_planning: `Business planning and development for agriculture`,
      other: `Other`,
    },
    extent_basic_needs: {
      all: `All`,
      most: `Most`,
      about_half: `About half`,
      some: `Some (less than half)`,
      none: `None`,
      dwr: `I don’t wish to respond`,
    },
    most_important_things: {
      basic_food: `Basic food needs`,
      food_children: `Special food needs of your children 0–23 months`,
      food_pregnant: `Special food needs of pregnant and lactating women`,
      water_needs: `Water needs`,
      hygiene_needs: `Hygiene needs`,
      shelter_needs: `Shelter/housing needs`,
      healthcare_needs: `Healthcare needs of your households`,
      healthcare_children: `Special healthcare needs of your children 0–23 months`,
      healthcare_pregnant: `Special healthcare needs of pregnant and lactating women`,
      transportation_needs: `Transportation needs`,
      communication_needs: `Communication needs`,
      education_needs: `Education needs for children`,
      clothing_needs: `Clothing needs`,
      utilities: `Utilities`,
      other: `Other`,
    },
    unable_fulfil_other: {
      financial: `Financial reasons /cannot afford`,
      local_market: `It is not available on the local market`,
      other: `Other`,
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
    ben_det_hromada: {
      abrykosivska: `Abrykosivska`,
      abrykosivska_2: `Abrykosivska`,
      adzhamska: `Adzhamska`,
      ahronomichna: `Ahronomichna`,
      alchevska: `Alchevska`,
      alupkynska: `Alupkynska`,
      alushtynska: `Alushtynska`,
      amurska: `Amurska`,
      amvrosiivska: `Amvrosiivska`,
      ananivska: `Ananivska`,
      andriiashivska: `Andriiashivska`,
      'andriievo-ivanivska': `Andriievo-Ivanivska`,
      andriivska: `Andriivska`,
      andriivska_2: `Andriivska`,
      andrivska: `Andrivska`,
      andrushivska: `Andrushivska`,
      andrushkivska: `Andrushkivska`,
      antoninska: `Antoninska`,
      antonivska: `Antonivska`,
      antratsytivska: `Antratsytivska`,
      apostolivska: `Apostolivska`,
      arbuzynska: `Arbuzynska`,
      armianska: `Armianska`,
      aromatnenska: `Aromatnenska`,
      aromatnivska: `Aromatnivska`,
      artsyzka: `Artsyzka`,
      'askaniia-nova': `Askaniia-Nova`,
      avanhardivska: `Avanhardivska`,
      avdiivska: `Avdiivska`,
      azovska: `Azovska`,
      babanska: `Babanska`,
      babchynetska: `Babchynetska`,
      babynska: `Babynska`,
      bahativska: `Bahativska`,
      baherivska: `Baherivska`,
      baikovetska: `Baikovetska`,
      bakhchysaraiska: `Bakhchysaraiska`,
      bakhmatska: `Bakhmatska`,
      bakhmutska: `Bakhmutska`,
      balakleivska: `Balakleivska`,
      balakliiska: `Balakliiska`,
      baltska: `Baltska`,
      banylivska: `Banylivska`,
      baranivska: `Baranivska`,
      baranynska: `Baranynska`,
      barashivska: `Barashivska`,
      barska: `Barska`,
      barvinkivska: `Barvinkivska`,
      baryshivska: `Baryshivska`,
      bashtanska: `Bashtanska`,
      bashtechkivska: `Bashtechkivska`,
      batalnenska: `Batalnenska`,
      bativska: `Bativska`,
      baturynska: `Baturynska`,
      bedevlianska: `Bedevlianska`,
      bekhterska: `Bekhterska`,
      belzka: `Belzka`,
      berdianska: `Berdianska`,
      berdychivska: `Berdychivska`,
      berehivska: `Berehivska`,
      berehometska: `Berehometska`,
      berehova: `Berehova`,
      berestechkivska: `Berestechkivska`,
      berestivska: `Berestivska`,
      berezanska: `Berezanska`,
      berezanska_2: `Berezanska`,
      berezdivska: `Berezdivska`,
      berezhanska: `Berezhanska`,
      berezivska: `Berezivska`,
      berezivska_2: `Berezivska`,
      berezivska_3: `Berezivska`,
      berezivska_4: `Berezivska`,
      berezivska_5: `Berezivska`,
      bereznehuvatska: `Bereznehuvatska`,
      berezniakivska: `Berezniakivska`,
      bereznianska: `Bereznianska`,
      bereznivska: `Bereznivska`,
      bershadska: `Bershadska`,
      beryslavska: `Beryslavska`,
      bezdrytska: `Bezdrytska`,
      bezliudivska: `Bezliudivska`,
      bibrska: `Bibrska`,
      bielinska: `Bielinska`,
      'bilche-zolotetska': `Bilche-Zolotetska`,
      bilenkivska: `Bilenkivska`,
      biletska: `Biletska`,
      'bilhorod-dnistrovska': `Bilhorod-Dnistrovska`,
      biliaivska: `Biliaivska`,
      biliaivska_2: `Biliaivska`,
      bilkivska: `Bilkivska`,
      bilmatska: `Bilmatska`,
      biloberizka: `Biloberizka`,
      bilobozhnytska: `Bilobozhnytska`,
      bilohirska: `Bilohirska`,
      bilohirska_2: `Bilohirska`,
      bilohorodska: `Bilohorodska`,
      bilokorovytska: `Bilokorovytska`,
      bilokrynytska: `Bilokrynytska`,
      bilokurakynska: `Bilokurakynska`,
      bilolutska: `Bilolutska`,
      bilopilska: `Bilopilska`,
      bilotserkivska: `Bilotserkivska`,
      bilotserkivska_2: `Bilotserkivska`,
      bilovodska: `Bilovodska`,
      bilozerska: `Bilozerska`,
      bilozerska_2: `Bilozerska`,
      bilozirska: `Bilozirska`,
      bilshivtsivska: `Bilshivtsivska`,
      bilytska: `Bilytska`,
      biskovytska: `Biskovytska`,
      blahodatnenska: `Blahodatnenska`,
      blahovishchenska: `Blahovishchenska`,
      blahovishchenska_2: `Blahovishchenska`,
      blyzniukivska: `Blyzniukivska`,
      bobrovytska: `Bobrovytska`,
      bobrynetska: `Bobrynetska`,
      bobrytska: `Bobrytska`,
      bochechkivska: `Bochechkivska`,
      bohdanivska: `Bohdanivska`,
      bohdanska: `Bohdanska`,
      bohodukhivska: `Bohodukhivska`,
      bohorodchanska: `Bohorodchanska`,
      bohuslavska: `Bohuslavska`,
      boianska: `Boianska`,
      boiarska: `Boiarska`,
      boikivska: `Boikivska`,
      bokiimivska: `Bokiimivska`,
      bolekhivska: `Bolekhivska`,
      bolhradska: `Bolhradska`,
      boratynska: `Boratynska`,
      boremelska: `Boremelska`,
      borivska: `Borivska`,
      borodianska: `Borodianska`,
      borodinska: `Borodinska`,
      boromlianska: `Boromlianska`,
      borozenska: `Borozenska`,
      borshchahivska: `Borshchahivska`,
      borshchivska: `Borshchivska`,
      borsukivska: `Borsukivska`,
      borynska: `Borynska`,
      boryslavska: `Boryslavska`,
      boryspilska: `Boryspilska`,
      borznianska: `Borznianska`,
      botanichna: `Botanichna`,
      bozhedarivska: `Bozhedarivska`,
      brahynivska: `Brahynivska`,
      bratska: `Bratska`,
      bratska_2: `Bratska`,
      bratslavska: `Bratslavska`,
      brodivska: `Brodivska`,
      bronykivska: `Bronykivska`,
      'broshniv-osadska': `Broshniv-Osadska`,
      brovarska: `Brovarska`,
      brusnytska: `Brusnytska`,
      brusylivska: `Brusylivska`,
      buchanska: `Buchanska`,
      buchatska: `Buchatska`,
      budyshchenska: `Budyshchenska`,
      buhrynska: `Buhrynska`,
      bukachivska: `Bukachivska`,
      burshtynska: `Burshtynska`,
      burynska: `Burynska`,
      bushtynska: `Bushtynska`,
      buska: `Buska`,
      butska: `Butska`,
      buzhanska: `Buzhanska`,
      buzka: `Buzka`,
      byshivska: `Byshivska`,
      chabanivska: `Chabanivska`,
      chahorska: `Chahorska`,
      chaikynska: `Chaikynska`,
      chapaievska: `Chapaievska`,
      chaplynska: `Chaplynska`,
      chasovoiarska: `Chasovoiarska`,
      chechelnytska: `Chechelnytska`,
      cheliadinivska: `Cheliadinivska`,
      chemerovetska: `Chemerovetska`,
      cherkaska_2: `Cherkaska`,
      cherkaska_3: `Cherkaska`,
      cherkaska_4: `Cherkaska`,
      chernechchynska: `Chernechchynska`,
      chernechchynska_2: `Chernechchynska`,
      chernelytska: `Chernelytska`,
      cherniakhivska: `Cherniakhivska`,
      chernihivska_2: `Chernihivska`,
      chernihivska_3: `Chernihivska`,
      chernivetska_2: `Chernivetska`,
      chernivetska_3: `Chernivetska`,
      chernovska: `Chernovska`,
      chernyshivska: `Chernyshivska`,
      chervonenska: `Chervonenska`,
      chervonohradska: `Chervonohradska`,
      chervonohryhorivska: `Chervonohryhorivska`,
      chervonoslobidska: `Chervonoslobidska`,
      chkalovska: `Chkalovska`,
      chkalovska_2: `Chkalovska`,
      chkalovska_3: `Chkalovska`,
      chmyrivska: `Chmyrivska`,
      chohodarivska: `Chohodarivska`,
      chopovytska: `Chopovytska`,
      chopska: `Chopska`,
      chornobaivska: `Chornobaivska`,
      chornobaivska_2: `Chornobaivska`,
      'chornobylska zona vidchuzhennia_2': `Chornobylska zona vidchuzhennia`,
      chornomorska: `Chornomorska`,
      chornomorska_2: `Chornomorska`,
      chornomorska_3: `Chornomorska`,
      chornomorska_4: `Chornomorska`,
      chornoostrivska: `Chornoostrivska`,
      chornopilska: `Chornopilska`,
      chornozemnenska: `Chornozemnenska`,
      chornukhynska: `Chornukhynska`,
      chortkivska: `Chortkivska`,
      chudeiska: `Chudeiska`,
      chudniv: `Chudniv`,
      chuhuivska: `Chuhuivska`,
      chulakivska: `Chulakivska`,
      chumakivska: `Chumakivska`,
      chupakhivska: `Chupakhivska`,
      chutivska: `Chutivska`,
      chyhyrynska: `Chyhyrynska`,
      chynadiivska: `Chynadiivska`,
      chystenska: `Chystenska`,
      chystiakivska: `Chystiakivska`,
      chystopilska: `Chystopilska`,
      chyzhivska: `Chyzhivska`,
      dachnenska: `Dachnenska`,
      dachnivska: `Dachnivska`,
      dalekivska: `Dalekivska`,
      dalnytska: `Dalnytska`,
      darivska: `Darivska`,
      dashivska: `Dashivska`,
      davydivska: `Davydivska`,
      debaltsivska: `Debaltsivska`,
      deliatynska: `Deliatynska`,
      demydivska: `Demydivska`,
      derazhnenska: `Derazhnenska`,
      derazhnianska: `Derazhnianska`,
      derhachivska: `Derhachivska`,
      desnianska: `Desnianska`,
      devladivska: `Devladivska`,
      diadkovytska: `Diadkovytska`,
      divychkivska: `Divychkivska`,
      dmytrivska: `Dmytrivska`,
      dmytrivska_2: `Dmytrivska`,
      dmytrivska_3: `Dmytrivska`,
      dmytrivska_4: `Dmytrivska`,
      dmytrushkivska: `Dmytrushkivska`,
      dniprorudnenska: `Dniprorudnenska`,
      dniprovska: `Dniprovska`,
      dobrianska: `Dobrianska`,
      dobrivska: `Dobrivska`,
      dobromylska: `Dobromylska`,
      dobropilska: `Dobropilska`,
      dobroslavska: `Dobroslavska`,
      'dobrosynsko-maherivska': `Dobrosynsko-Maherivska`,
      dobrotvirska: `Dobrotvirska`,
      dobrovelychkivska: `Dobrovelychkivska`,
      dobrushynska: `Dobrushynska`,
      dokuchaievska: `Dokuchaievska`,
      dolmativska: `Dolmativska`,
      dolynnenska: `Dolynnenska`,
      dolynska: `Dolynska`,
      dolynska_2: `Dolynska`,
      dolynska_3: `Dolynska`,
      dolynska_4: `Dolynska`,
      domanivska: `Domanivska`,
      donetska: `Donetska`,
      donetska_2: `Donetska`,
      donska: `Donska`,
      doroshivska: `Doroshivska`,
      dorosynivska: `Dorosynivska`,
      dovbyska: `Dovbyska`,
      dovzhanska: `Dovzhanska`,
      dovzhanska_2: `Dovzhanska`,
      drabivska: `Drabivska`,
      drabynivska: `Drabynivska`,
      drahivska: `Drahivska`,
      drofynska: `Drofynska`,
      drohobytska: `Drohobytska`,
      druzhbivska: `Druzhbivska`,
      druzhkivska: `Druzhkivska`,
      dubechnenska: `Dubechnenska`,
      dubenska: `Dubenska`,
      dubivska: `Dubivska`,
      dubivska_2: `Dubivska`,
      dubivska_3: `Dubivska`,
      dubovetska: `Dubovetska`,
      duboviazivska: `Duboviazivska`,
      dubovykivska: `Dubovykivska`,
      dubrivska: `Dubrivska`,
      dubrovytska: `Dubrovytska`,
      'dubrynytska-malobereznianska': `Dubrynytska-Malobereznianska`,
      dunaievetska: `Dunaievetska`,
      dvorichanska: `Dvorichanska`,
      dykanska: `Dykanska`,
      dymerska: `Dymerska`,
      dyviziiska: `Dyviziiska`,
      dzhankoiska: `Dzhankoiska`,
      dzhulynska: `Dzhulynska`,
      dzhurynska: `Dzhurynska`,
      dzvyniatska: `Dzvyniatska`,
      enerhodarska: `Enerhodarska`,
      esmanska: `Esmanska`,
      fastivska: `Fastivska`,
      fedorivska: `Fedorivska`,
      feodosiiska: `Feodosiiska`,
      feodosiivska: `Feodosiivska`,
      filativska: `Filativska`,
      fontanska: `Fontanska`,
      foroska: `Foroska`,
      frunzenska: `Frunzenska`,
      fursivska: `Fursivska`,
      hadiatska: `Hadiatska`,
      haisynska: `Haisynska`,
      haivoronska: `Haivoronska`,
      halytska: `Halytska`,
      halytsynivska: `Halytsynivska`,
      hannivska: `Hannivska`,
      hannopilska: `Hannopilska`,
      hasprynska: `Hasprynska`,
      hatnenska: `Hatnenska`,
      helmiazivska: `Helmiazivska`,
      henicheska: `Henicheska`,
      heroiska: `Heroiska`,
      hertsaivska: `Hertsaivska`,
      hirska: `Hirska`,
      hirska_2: `Hirska`,
      hladkovytska: `Hladkovytska`,
      hlazivska: `Hlazivska`,
      hleiuvatska: `Hleiuvatska`,
      hlevakhivska: `Hlevakhivska`,
      hlobynska: `Hlobynska`,
      hlodoska: `Hlodoska`,
      hlukhivska: `Hlukhivska`,
      hlukhovetska: `Hlukhovetska`,
      hlybochytska: `Hlybochytska`,
      hlybotska: `Hlybotska`,
      hlynianska: `Hlynianska`,
      hnivanska: `Hnivanska`,
      hnizdychivska: `Hnizdychivska`,
      hoholivska: `Hoholivska`,
      holobska: `Holobska`,
      holoprystanska: `Holoprystanska`,
      holovanivska: `Holovanivska`,
      holovnenska: `Holovnenska`,
      holovynska: `Holovynska`,
      holubynska: `Holubynska`,
      honcharivska: `Honcharivska`,
      horinchivska: `Horinchivska`,
      horishnoplavnivska: `Horishnoplavnivska`,
      horishnosherovetska: `Horishnosherovetska`,
      horlivska: `Horlivska`,
      hornostaivska: `Hornostaivska`,
      hornostaivska_2: `Hornostaivska`,
      horodenkivska: `Horodenkivska`,
      horodkivska: `Horodkivska`,
      horodnenska: `Horodnenska`,
      horodnianska: `Horodnianska`,
      horodnytska: `Horodnytska`,
      horodotska: `Horodotska`,
      horodotska_2: `Horodotska`,
      horodotska_3: `Horodotska`,
      horodotska_4: `Horodotska`,
      horodyshchenska: `Horodyshchenska`,
      horodyshchenska_2: `Horodyshchenska`,
      horokhivska: `Horokhivska`,
      horokhivska_2: `Horokhivska`,
      horondivska: `Horondivska`,
      horshchykivska: `Horshchykivska`,
      hoshchanska: `Hoshchanska`,
      hostomelska: `Hostomelska`,
      'hrabovetsko-dulibivska': `Hrabovetsko-Dulibivska`,
      hradyzka: `Hradyzka`,
      hrebinkivska: `Hrebinkivska`,
      hrebinkivska_2: `Hrebinkivska`,
      hrechanopodivska: `Hrechanopodivska`,
      hresivska: `Hresivska`,
      hrodivska: `Hrodivska`,
      hrunska: `Hrunska`,
      hrushivska: `Hrushivska`,
      hrushivska_2: `Hrushivska`,
      hrymailivska: `Hrymailivska`,
      hryshkovetska: `Hryshkovetska`,
      hryshynska: `Hryshynska`,
      hrytsivska: `Hrytsivska`,
      hubynyska: `Hubynyska`,
      hukivska: `Hukivska`,
      huliaipilska: `Huliaipilska`,
      humenetska: `Humenetska`,
      hurivska: `Hurivska`,
      hurzufska: `Hurzufska`,
      husiatynska: `Husiatynska`,
      hvardiiska: `Hvardiiska`,
      hvardiiska_2: `Hvardiiska`,
      hvardiiska_3: `Hvardiiska`,
      hvizdetska: `Hvizdetska`,
      ichnianska: `Ichnianska`,
      ilarionivska: `Ilarionivska`,
      illichivska: `Illichivska`,
      illichivska_2: `Illichivska`,
      illinetska: `Illinetska`,
      illinivska: `Illinivska`,
      illinska: `Illinska`,
      ilovaiska: `Ilovaiska`,
      inhulska: `Inhulska`,
      irkliivska: `Irkliivska`,
      irpinska: `Irpinska`,
      irshanska: `Irshanska`,
      irshavska: `Irshavska`,
      ishunska: `Ishunska`,
      'ivane-pustenska': `Ivane-Pustenska`,
      ivanivska: `Ivanivska`,
      ivanivska_2: `Ivanivska`,
      ivanivska_3: `Ivanivska`,
      ivanivska_4: `Ivanivska`,
      ivanivska_5: `Ivanivska`,
      ivanivska_6: `Ivanivska`,
      ivanivska_7: `Ivanivska`,
      ivankivska_8: `Ivankivska`,
      ivankivska_9: `Ivankivska`,
      'ivano-frankivska_2': `Ivano-Frankivska`,
      'ivano-frankivska_3': `Ivano-Frankivska`,
      ivanovetska: `Ivanovetska`,
      ivanychivska: `Ivanychivska`,
      iziaslavska: `Iziaslavska`,
      iziumska: `Iziumska`,
      izmailska: `Izmailska`,
      izobilnenska: `Izobilnenska`,
      izobilnenska_2: `Izobilnenska`,
      izumrudnivska: `Izumrudnivska`,
      kadiivska: `Kadiivska`,
      kadubovetska: `Kadubovetska`,
      kaharlytska: `Kaharlytska`,
      kakhovska: `Kakhovska`,
      kalanchatska: `Kalanchatska`,
      kalchytska: `Kalchytska`,
      kalininska: `Kalininska`,
      kalininska_2: `Kalininska`,
      kalmiuska: `Kalmiuska`,
      kaluska: `Kaluska`,
      kalynivska: `Kalynivska`,
      kalynivska_2: `Kalynivska`,
      kalynivska_3: `Kalynivska`,
      kalynivska_4: `Kalynivska`,
      kalynivska_5: `Kalynivska`,
      kalytianska: `Kalytianska`,
      kamianetska: `Kamianetska`,
      'kamianets-podilska': `Kamianets-Podilska`,
      'kamianka-buzka': `Kamianka-Buzka`,
      kamianomostivska: `Kamianomostivska`,
      kamianopotokivska: `Kamianopotokivska`,
      kamianska: `Kamianska`,
      kamianska_2: `Kamianska`,
      kamianska_3: `Kamianska`,
      kamianska_4: `Kamianska`,
      'kamiansko-dniprovska': `Kamiansko-Dniprovska`,
      'kamin-kashyrska': `Kamin-Kashyrska`,
      kanivska: `Kanivska`,
      kanonytska: `Kanonytska`,
      karapchivska: `Karapchivska`,
      karlivska: `Karlivska`,
      'karolino-buhazka': `Karolino-Buhazka`,
      karpivska: `Karpivska`,
      kashtanivska: `Kashtanivska`,
      katerynivska: `Katerynivska`,
      katerynopilska: `Katerynopilska`,
      kazankivska: `Kazankivska`,
      kehychivska: `Kehychivska`,
      kelmenetska: `Kelmenetska`,
      kerchenska: `Kerchenska`,
      keretskivska: `Keretskivska`,
      ketrysanivska: `Ketrysanivska`,
      kharkivska_2: `Kharkivska`,
      khartsyzka: `Khartsyzka`,
      kharytonivska: `Kharytonivska`,
      khersonska_2: `Khersonska`,
      khlibodarivska: `Khlibodarivska`,
      khmelivska: `Khmelivska`,
      khmelnytska_2: `Khmelnytska`,
      khmilnytska: `Khmilnytska`,
      khodorivska: `Khodorivska`,
      kholmkivska: `Kholmkivska`,
      kholmynska: `Kholmynska`,
      khorolska: `Khorolska`,
      khoroshivska: `Khoroshivska`,
      khorostkivska: `Khorostkivska`,
      khotinska: `Khotinska`,
      khotynska: `Khotynska`,
      khrestivska: `Khrestivska`,
      khrestivska_2: `Khrestivska`,
      khrustalnenska: `Khrustalnenska`,
      khrystynivska: `Khrystynivska`,
      khustska: `Khustska`,
      khyrivska: `Khyrivska`,
      kiliiska: `Kiliiska`,
      kindrashivska: `Kindrashivska`,
      kindrativska: `Kindrativska`,
      kiptivska: `Kiptivska`,
      kirovska: `Kirovska`,
      kirovska_2: `Kirovska`,
      kirovska_3: `Kirovska`,
      kistochkivska: `Kistochkivska`,
      kitsmanska: `Kitsmanska`,
      kivertsivska: `Kivertsivska`,
      klepyninska: `Klepyninska`,
      klesivska: `Klesivska`,
      klevanska: `Klevanska`,
      klishkovetska: `Klishkovetska`,
      kobeliatska: `Kobeliatska`,
      koblivska: `Koblivska`,
      kochubeivska: `Kochubeivska`,
      kodymska: `Kodymska`,
      koktebelska: `Koktebelska`,
      kolarivska: `Kolarivska`,
      kolchuhynska: `Kolchuhynska`,
      kolchynska: `Kolchynska`,
      kolkivska: `Kolkivska`,
      kolochavska: `Kolochavska`,
      kolodiazhnenska: `Kolodiazhnenska`,
      kolodiazianska: `Kolodiazianska`,
      kolomatska: `Kolomatska`,
      kolomatska_2: `Kolomatska`,
      kolomyichyska: `Kolomyichyska`,
      kolomyiska: `Kolomyiska`,
      koltsovska: `Koltsovska`,
      kolyndianska: `Kolyndianska`,
      komarivska: `Komarivska`,
      komarnivska: `Komarnivska`,
      komarska: `Komarska`,
      kompaniivska: `Kompaniivska`,
      komyshanska: `Komyshanska`,
      komyshnianska: `Komyshnianska`,
      komyshuvaska: `Komyshuvaska`,
      'komysh-zorianska': `Komysh-Zorianska`,
      koniatynska: `Koniatynska`,
      konoplianska: `Konoplianska`,
      konotopska: `Konotopska`,
      kopachivska: `Kopachivska`,
      kopaihorodska: `Kopaihorodska`,
      kopychynetska: `Kopychynetska`,
      koreizka: `Koreizka`,
      koretska: `Koretska`,
      koriukivska: `Koriukivska`,
      kormivska: `Kormivska`,
      kornynska: `Kornynska`,
      kornynska_2: `Kornynska`,
      korolivska: `Korolivska`,
      koropetska: `Koropetska`,
      koropska: `Koropska`,
      korostenska: `Korostenska`,
      korostyshivska: `Korostyshivska`,
      korovynska: `Korovynska`,
      korshivska: `Korshivska`,
      'korsun-shevchenkivska': `Korsun-Shevchenkivska`,
      kosivska: `Kosivska`,
      kosmatska: `Kosmatska`,
      kosonska: `Kosonska`,
      kostiantynivska: `Kostiantynivska`,
      kostiantynivska_2: `Kostiantynivska`,
      kostiantynivska_3: `Kostiantynivska`,
      kostiantynivska_4: `Kostiantynivska`,
      kostopilska: `Kostopilska`,
      kostrynska: `Kostrynska`,
      kostryzhivska: `Kostryzhivska`,
      kotelevska: `Kotelevska`,
      kotelnykivska: `Kotelnykivska`,
      kotsiubynska: `Kotsiubynska`,
      kovalivska: `Kovalivska`,
      kovelska: `Kovelska`,
      kovylnivska: `Kovylnivska`,
      kozeletska: `Kozeletska`,
      kozelshchynska: `Kozelshchynska`,
      kozhanska: `Kozhanska`,
      koziatynska: `Koziatynska`,
      kozivska: `Kozivska`,
      kozivska_2: `Kozivska`,
      kozlivska: `Kozlivska`,
      kozynska: `Kozynska`,
      kozynska_3: `Kozynska`,
      krainenska: `Krainenska`,
      kramatorska: `Kramatorska`,
      krasnenska: `Krasnenska`,
      krasnoarmiiska: `Krasnoarmiiska`,
      krasnoflotska: `Krasnoflotska`,
      krasnohirska: `Krasnohirska`,
      krasnohradska: `Krasnohradska`,
      krasnohvardiiska: `Krasnohvardiiska`,
      krasnohvardiiska_2: `Krasnohvardiiska`,
      krasnoiarska: `Krasnoiarska`,
      krasnoilska: `Krasnoilska`,
      krasnokutska: `Krasnokutska`,
      krasnolutska: `Krasnolutska`,
      krasnomatska: `Krasnomatska`,
      krasnoperekopska: `Krasnoperekopska`,
      krasnopilska: `Krasnopilska`,
      krasnopilska_2: `Krasnopilska`,
      krasnopilska_3: `Krasnopilska`,
      krasnopolianska: `Krasnopolianska`,
      krasnorichenska: `Krasnorichenska`,
      krasnosilska: `Krasnosilska`,
      krasnoznamianska: `Krasnoznamianska`,
      krasylivska: `Krasylivska`,
      kremenchutska: `Kremenchutska`,
      kremenetska: `Kremenetska`,
      kreminska: `Kreminska`,
      krestianivska: `Krestianivska`,
      krolevetska: `Krolevetska`,
      kropyvnytskyi_2: `Kropyvnytskyi`,
      krupetska: `Krupetska`,
      krupetska_2: `Krupetska`,
      krutivska: `Krutivska`,
      krymkivska: `Krymkivska`,
      krymska: `Krymska`,
      krymskorozivska: `Krymskorozivska`,
      krynychanska: `Krynychanska`,
      krynychnenska: `Krynychnenska`,
      krynychnenska_2: `Krynychnenska`,
      kryvoozerska: `Kryvoozerska`,
      kryvorizka: `Kryvorizka`,
      kryvorizka_2: `Kryvorizka`,
      kryzhopilska: `Kryzhopilska`,
      kubeiska: `Kubeiska`,
      kuialnytska: `Kuialnytska`,
      kuibyshevska: `Kuibyshevska`,
      kukushkinska: `Kukushkinska`,
      kulevchanska: `Kulevchanska`,
      kulykivska: `Kulykivska`,
      kulykivska_2: `Kulykivska`,
      kunievska: `Kunievska`,
      kunkivska: `Kunkivska`,
      kupchynetska: `Kupchynetska`,
      kupianska: `Kupianska`,
      kurakhivska: `Kurakhivska`,
      kurisovska: `Kurisovska`,
      kurnenska: `Kurnenska`,
      kurska: `Kurska`,
      kurylivska: `Kurylivska`,
      kushuhumska: `Kushuhumska`,
      kutska: `Kutska`,
      kutsurubska: `Kutsurubska`,
      kvitneva: `Kvitneva`,
      kyinska: `Kyinska`,
      kyivska_2: `Kyivska`,
      kyrykivska: `Kyrykivska`,
      kyrylivska: `Kyrylivska`,
      kyselivska: `Kyselivska`,
      kytaihorodska: `Kytaihorodska`,
      kytaihorodska_2: `Kytaihorodska`,
      ladanska: `Ladanska`,
      ladyzhynska: `Ladyzhynska`,
      ladyzhynska_2: `Ladyzhynska`,
      lanchynska: `Lanchynska`,
      lannivska: `Lannivska`,
      lanovetska: `Lanovetska`,
      lazurnenska: `Lazurnenska`,
      lebedynska: `Lebedynska`,
      leninska: `Leninska`,
      leninska_2: `Leninska`,
      leninska_3: `Leninska`,
      lenkovetska: `Lenkovetska`,
      leskivska: `Leskivska`,
      letychivska: `Letychivska`,
      lhovska: `Lhovska`,
      liashkivska: `Liashkivska`,
      lipliavska: `Lipliavska`,
      lisnivska: `Lisnivska`,
      lisovohrynivetska: `Lisovohrynivetska`,
      litynska: `Litynska`,
      liubarska: `Liubarska`,
      liubashivska: `Liubashivska`,
      liubeshivska: `Liubeshivska`,
      liubetska: `Liubetska`,
      liublynetska: `Liublynetska`,
      liubomlska: `Liubomlska`,
      liubotynska: `Liubotynska`,
      liubymivska: `Liubymivska`,
      liubymivska_2: `Liubymivska`,
      liutenska: `Liutenska`,
      livadiiska: `Livadiiska`,
      livynetska: `Livynetska`,
      lobanivska: `Lobanivska`,
      lokachynska: `Lokachynska`,
      lokhvytska: `Lokhvytska`,
      loknytska: `Loknytska`,
      lopatynska: `Lopatynska`,
      lopushnenska: `Lopushnenska`,
      losynivska: `Losynivska`,
      lozivska: `Lozivska`,
      'lozno-oleksandrivska': `Lozno-Oleksandrivska`,
      lozuvatska: `Lozuvatska`,
      lubenska: `Lubenska`,
      luchystivska: `Luchystivska`,
      luhanska_2: `Luhanska`,
      luhanska_3: `Luhanska`,
      luhivska: `Luhivska`,
      luhynska: `Luhynska`,
      'luka-meleshkivska': `Luka-Meleshkivska`,
      lukivska: `Lukivska`,
      lutska: `Lutska`,
      lutuhynska: `Lutuhynska`,
      lvivska_2: `Lvivska`,
      lychkivska: `Lychkivska`,
      lykhivska: `Lykhivska`,
      lymanska: `Lymanska`,
      lymanska_2: `Lymanska`,
      lymanska_3: `Lymanska`,
      lynovytska: `Lynovytska`,
      lypetska: `Lypetska`,
      lypianska: `Lypianska`,
      lypovetska: `Lypovetska`,
      lypovodolynska: `Lypovodolynska`,
      lysetska: `Lysetska`,
      lysianska: `Lysianska`,
      lystvynska: `Lystvynska`,
      lysychanska: `Lysychanska`,
      lytovezka: `Lytovezka`,
      machukhivska: `Machukhivska`,
      mahalska: `Mahalska`,
      mahazynska: `Mahazynska`,
      mahdalynivska: `Mahdalynivska`,
      maiakivska: `Maiakivska`,
      maiska: `Maiska`,
      makarivska: `Makarivska`,
      makhnivska: `Makhnivska`,
      makiivska: `Makiivska`,
      makiivska_2: `Makiivska`,
      makivska: `Makivska`,
      malobilozerska: `Malobilozerska`,
      malodanylivska: `Malodanylivska`,
      malodivytska: `Malodivytska`,
      maloliubashanska: `Maloliubashanska`,
      malomaiatska: `Malomaiatska`,
      malomykhailivska: `Malomykhailivska`,
      malorichenska: `Malorichenska`,
      malotokmachanska: `Malotokmachanska`,
      malovilshanska: `Malovilshanska`,
      malovyskivska: `Malovyskivska`,
      malynivska: `Malynivska`,
      malynivska_2: `Malynivska`,
      malynska: `Malynska`,
      malynska_2: `Malynska`,
      mamaivska: `Mamaivska`,
      mamalyhivska: `Mamalyhivska`,
      manevytska: `Manevytska`,
      manhushska: `Manhushska`,
      mankivska: `Mankivska`,
      marazliivska: `Marazliivska`,
      marfivska: `Marfivska`,
      marhanetska: `Marhanetska`,
      marianivska: `Marianivska`,
      marianivska_2: `Marianivska`,
      marianivska_3: `Marianivska`,
      marinska: `Marinska`,
      mariupolska: `Mariupolska`,
      marivska: `Marivska`,
      markivska: `Markivska`,
      martynivska: `Martynivska`,
      masandrivska: `Masandrivska`,
      mashivska: `Mashivska`,
      maslivska: `Maslivska`,
      mateievetska: `Mateievetska`,
      matusivska: `Matusivska`,
      matviivska: `Matviivska`,
      mazanska: `Mazanska`,
      medenytska: `Medenytska`,
      medvedivska: `Medvedivska`,
      medvedivska_2: `Medvedivska`,
      medvedivska_3: `Medvedivska`,
      medvynska: `Medvynska`,
      medzhybizka: `Medzhybizka`,
      melitopolska: `Melitopolska`,
      melnychna: `Melnychna`,
      'melnytse-podilska': `Melnytse-Podilska`,
      menska: `Menska`,
      merefianska: `Merefianska`,
      mezhivska: `Mezhivska`,
      mezhyritska: `Mezhyritska`,
      michurinska: `Michurinska`,
      milovska: `Milovska`,
      'mishkovo-pohorilivska': `Mishkovo-Pohorilivska`,
      mizhhirska: `Mizhhirska`,
      mizhrichenska: `Mizhrichenska`,
      mizhvodnenska: `Mizhvodnenska`,
      mizotska: `Mizotska`,
      mliivska: `Mliivska`,
      mlynivska: `Mlynivska`,
      'mohyliv-podilska': `Mohyliv-Podilska`,
      mohylivska: `Mohylivska`,
      mokrokalyhirska: `Mokrokalyhirska`,
      molochanska: `Molochanska`,
      molochnenska: `Molochnenska`,
      molodizhnenska: `Molodizhnenska`,
      molodohvardiiska: `Molodohvardiiska`,
      molohivska: `Molohivska`,
      monastyryshchenska: `Monastyryshchenska`,
      monastyryska: `Monastyryska`,
      morshynska: `Morshynska`,
      morska: `Morska`,
      moshnivska: `Moshnivska`,
      mostivska: `Mostivska`,
      mostyska: `Mostyska`,
      mrynska: `Mrynska`,
      mukachivska: `Mukachivska`,
      murafska: `Murafska`,
      muromska: `Muromska`,
      murovanokurylovetska: `Murovanokurylovetska`,
      murovanska: `Murovanska`,
      muzykivska: `Muzykivska`,
      myhiivska: `Myhiivska`,
      mykhailiutska: `Mykhailiutska`,
      mykhailivska: `Mykhailivska`,
      mykhailivska_2: `Mykhailivska`,
      mykhailivska_3: `Mykhailivska`,
      mykhailivska_4: `Mykhailivska`,
      mykhailivska_5: `Mykhailivska`,
      'mykhailo-kotsiubynska': `Mykhailo-Kotsiubynska`,
      'mykhailo-lukashivska': `Mykhailo-Lukashivska`,
      mykolaivska: `Mykolaivska`,
      mykolaivska_2: `Mykolaivska`,
      mykolaivska_3: `Mykolaivska`,
      mykolaivska_4: `Mykolaivska`,
      mykolaivska_5: `Mykolaivska`,
      mykolaivska_6: `Mykolaivska`,
      mykolaivska_7: `Mykolaivska`,
      mykolaivska_8: `Mykolaivska`,
      mykolaivska_9: `Mykolaivska`,
      mykulynetska: `Mykulynetska`,
      myliatska: `Myliatska`,
      mylivska: `Mylivska`,
      myrhorodska: `Myrhorodska`,
      myrivska: `Myrivska`,
      myrnenska: `Myrnenska`,
      myrnenska_2: `Myrnenska`,
      myrnenska_3: `Myrnenska`,
      myrnivska: `Myrnivska`,
      myrnivska_2: `Myrnivska`,
      myrnivska_3: `Myrnivska`,
      myrnohradska: `Myrnohradska`,
      myrohoshchanska: `Myrohoshchanska`,
      myroliubnenska: `Myroliubnenska`,
      myronivska: `Myronivska`,
      myropilska: `Myropilska`,
      myropilska_2: `Myropilska`,
      mysivska: `Mysivska`,
      mytiaivska: `Mytiaivska`,
      mytrofanivska: `Mytrofanivska`,
      nabutivska: `Nabutivska`,
      nadlatska: `Nadlatska`,
      nadvirnianska: `Nadvirnianska`,
      nahirianska: `Nahirianska`,
      naidonivska: `Naidonivska`,
      naraivska: `Naraivska`,
      narkevytska: `Narkevytska`,
      narodytska: `Narodytska`,
      nasypnivska: `Nasypnivska`,
      natalynska: `Natalynska`,
      nechaianska: `Nechaianska`,
      nedoboivska: `Nedoboivska`,
      nedryhailivska: `Nedryhailivska`,
      nekhvoroshchanska: `Nekhvoroshchanska`,
      nekrasovska: `Nekrasovska`,
      nelipynska: `Nelipynska`,
      nemishaivska: `Nemishaivska`,
      nemovytska: `Nemovytska`,
      nemyrivska: `Nemyrivska`,
      nepolokovetska: `Nepolokovetska`,
      neresnytska: `Neresnytska`,
      nerubaiska: `Nerubaiska`,
      netishynska: `Netishynska`,
      nikolska: `Nikolska`,
      nikopolska: `Nikopolska`,
      nizhynska: `Nizhynska`,
      nosivska: `Nosivska`,
      novenska: `Novenska`,
      novhorodkivska: `Novhorodkivska`,
      'novhorod-siverska': `Novhorod-Siverska`,
      novoaidarska: `Novoaidarska`,
      novoandriivska: `Novoandriivska`,
      novoarkhanhelska: `Novoarkhanhelska`,
      novoazovska: `Novoazovska`,
      novobasanska: `Novobasanska`,
      novobilouska: `Novobilouska`,
      novobohdanivska: `Novobohdanivska`,
      novoborivska: `Novoborivska`,
      novoborysivska: `Novoborysivska`,
      novobuzka: `Novobuzka`,
      novodmytrivska: `Novodmytrivska`,
      novodnistrovska: `Novodnistrovska`,
      novodonetska: `Novodonetska`,
      novofedorivska: `Novofedorivska`,
      novohaleshchynska: `Novohaleshchynska`,
      'novohrad-volynska': `Novohrad-Volynska`,
      novohrodivska: `Novohrodivska`,
      novohryhorivska: `Novohryhorivska`,
      novohuivynska: `Novohuivynska`,
      novoiarychivska: `Novoiarychivska`,
      novoiavorivska: `Novoiavorivska`,
      novoivanivska: `Novoivanivska`,
      novokakhovska: `Novokakhovska`,
      novokalchevska: `Novokalchevska`,
      novokalynivska: `Novokalynivska`,
      novokrymska: `Novokrymska`,
      novolativska: `Novolativska`,
      novomarivska: `Novomarivska`,
      novomoskovska: `Novomoskovska`,
      novomykolaivska: `Novomykolaivska`,
      novomykolaivska_2: `Novomykolaivska`,
      novomykolaivska_3: `Novomykolaivska`,
      novomyrhorodska: `Novomyrhorodska`,
      novoodeska: `Novoodeska`,
      novooleksandrivska: `Novooleksandrivska`,
      novooleksandrivska_2: `Novooleksandrivska`,
      novooleksandrivska_3: `Novooleksandrivska`,
      novoorzhytska: `Novoorzhytska`,
      novoozernivska: `Novoozernivska`,
      novopavlivska: `Novopavlivska`,
      novopavlivska_2: `Novopavlivska`,
      novopilska: `Novopilska`,
      novopokrovska: `Novopokrovska`,
      novopokrovska_3: `Novopokrovska`,
      novopokrovska_4: `Novopokrovska`,
      novoprazka: `Novoprazka`,
      novopskovska: `Novopskovska`,
      novoraiska: `Novoraiska`,
      novorozdilska: `Novorozdilska`,
      novosanzharska: `Novosanzharska`,
      novoselivska: `Novoselivska`,
      novoselivska_2: `Novoselivska`,
      novoselivska_3: `Novoselivska`,
      novoselytska: `Novoselytska`,
      novosilska: `Novosilska`,
      novoslobidska: `Novoslobidska`,
      novosvitska: `Novosvitska`,
      novotroitska: `Novotroitska`,
      novoukrainska: `Novoukrainska`,
      novounaievetska: `Novounaievetska`,
      novoushytska: `Novoushytska`,
      novouspenivska: `Novouspenivska`,
      novovasylivska: `Novovasylivska`,
      novovodolazka: `Novovodolazka`,
      novovolynska: `Novovolynska`,
      novovorontsovska: `Novovorontsovska`,
      novozhylivska: `Novozhylivska`,
      novytska: `Novytska`,
      nyvotrudivska: `Nyvotrudivska`,
      nyzhnoduvanska: `Nyzhnoduvanska`,
      nyzhnohirska: `Nyzhnohirska`,
      nyzhnosirohozka: `Nyzhnosirohozka`,
      nyzhnosyrovatska: `Nyzhnosyrovatska`,
      nyzhnoteplivska: `Nyzhnoteplivska`,
      nyzhnoverbizka: `Nyzhnoverbizka`,
      nyzhnovoritska: `Nyzhnovoritska`,
      obertynska: `Obertynska`,
      obodivska: `Obodivska`,
      obolonska: `Obolonska`,
      obroshynska: `Obroshynska`,
      obukhivska: `Obukhivska`,
      obukhivska_2: `Obukhivska`,
      ochakivska: `Ochakivska`,
      ocheretynska: `Ocheretynska`,
      odeska: `Odeska`,
      okhotnykivska: `Okhotnykivska`,
      okhotska: `Okhotska`,
      okhtyrska: `Okhtyrska`,
      oknianska: `Oknianska`,
      oktiabrska: `Oktiabrska`,
      oktiabrska_2: `Oktiabrska`,
      oktiabrska_3: `Oktiabrska`,
      okunivska: `Okunivska`,
      oleksandriiska: `Oleksandriiska`,
      oleksandriiska_2: `Oleksandriiska`,
      oleksandrivska: `Oleksandrivska`,
      oleksandrivska_3: `Oleksandrivska`,
      oleksandrivska_4: `Oleksandrivska`,
      oleksandrivska_5: `Oleksandrivska`,
      oleksandrivska_6: `Oleksandrivska`,
      oleksiivska: `Oleksiivska`,
      oleksiivska_2: `Oleksiivska`,
      olenivska: `Olenivska`,
      oleshanska: `Oleshanska`,
      oleshkivska: `Oleshkivska`,
      olevska: `Olevska`,
      olhopilska: `Olhopilska`,
      olhynska: `Olhynska`,
      oliivska: `Oliivska`,
      olshanska: `Olshanska`,
      olyshivska: `Olyshivska`,
      olytska: `Olytska`,
      omelianivska: `Omelianivska`,
      omelnytska: `Omelnytska`,
      onokivska: `Onokivska`,
      onufriivska: `Onufriivska`,
      opishnianska: `Opishnianska`,
      orativska: `Orativska`,
      ordzhonikidzevska: `Ordzhonikidzevska`,
      orikhivska: `Orikhivska`,
      orikhivska_2: `Orikhivska`,
      orlivska: `Orlivska`,
      orynynska: `Orynynska`,
      orzhytska: `Orzhytska`,
      oskilska: `Oskilska`,
      ostaninska: `Ostaninska`,
      osterska: `Osterska`,
      ostrovska: `Ostrovska`,
      ostrozhetska: `Ostrozhetska`,
      ostrozka: `Ostrozka`,
      ostrytska: `Ostrytska`,
      osypenkivska: `Osypenkivska`,
      otyniiska: `Otyniiska`,
      ovadnivska: `Ovadnivska`,
      ovidiopolska: `Ovidiopolska`,
      ovrutska: `Ovrutska`,
      ozernianska: `Ozernianska`,
      pakharivska: `Pakharivska`,
      palanska: `Palanska`,
      pantaivska: `Pantaivska`,
      parafiivska: `Parafiivska`,
      partenitska: `Partenitska`,
      partyzanska: `Partyzanska`,
      pasichnianska: `Pasichnianska`,
      pavlivska: `Pavlivska`,
      pavlivska_2: `Pavlivska`,
      pavlivska_3: `Pavlivska`,
      pavlohradska: `Pavlohradska`,
      pechenizhynska: `Pechenizhynska`,
      pechenizka: `Pechenizka`,
      perechynska: `Perechynska`,
      perehinska: `Perehinska`,
      perehonivska: `Perehonivska`,
      pereiaslavсska: `Pereiaslavсska`,
      peremyshlianska: `Peremyshlianska`,
      pererislianska: `Pererislianska`,
      pereshchepynska: `Pereshchepynska`,
      perovska: `Perovska`,
      pershotravenska: `Pershotravenska`,
      pershotravnevska: `Pershotravnevska`,
      pervomaiska: `Pervomaiska`,
      pervomaiska_2: `Pervomaiska`,
      pervomaiska_3: `Pervomaiska`,
      pervomaiska_4: `Pervomaiska`,
      pervomaiska_5: `Pervomaiska`,
      pervomaiska_6: `Pervomaiska`,
      pervozvanivska: `Pervozvanivska`,
      petrivska: `Petrivska`,
      petrivska_2: `Petrivska`,
      petrivska_3: `Petrivska`,
      'petrivsko-romenska': `Petrivsko-Romenska`,
      'petro-mykhailivska': `Petro-Mykhailivska`,
      petropavlivska: `Petropavlivska`,
      petropavlivska_2: `Petropavlivska`,
      petropavlivska_3: `Petropavlivska`,
      petrovetska: `Petrovetska`,
      petrovirivska: `Petrovirivska`,
      petrykivska: `Petrykivska`,
      piadytska: `Piadytska`,
      piatykhatska: `Piatykhatska`,
      piatykhatska_2: `Piatykhatska`,
      pidberiztsivska: `Pidberiztsivska`,
      pidhaichykivska: `Pidhaichykivska`,
      pidhaietska: `Pidhaietska`,
      pidhaitsivska: `Pidhaitsivska`,
      pidhorodnenska: `Pidhorodnenska`,
      pidhorodnianska: `Pidhorodnianska`,
      pidkaminska: `Pidkaminska`,
      pidloztsivska: `Pidloztsivska`,
      pidvolochyska: `Pidvolochyska`,
      pidvysotska: `Pidvysotska`,
      pirnivska: `Pirnivska`,
      pishchanivska: `Pishchanivska`,
      pishchanobridska: `Pishchanobridska`,
      pishchanska: `Pishchanska`,
      pishchanska_2: `Pishchanska`,
      pishchanska_3: `Pishchanska`,
      pishchanska_4: `Pishchanska`,
      pishchanska_5: `Pishchanska`,
      pishchivska: `Pishchivska`,
      piskivska: `Piskivska`,
      pisochynska: `Pisochynska`,
      pivdennomiska: `Pivdennomiska`,
      plakhtiivska: `Plakhtiivska`,
      plodivska: `Plodivska`,
      plodorodnenska: `Plodorodnenska`,
      pluzhnenska: `Pluzhnenska`,
      plyskivska: `Plyskivska`,
      pobiednenska: `Pobiednenska`,
      pobuzka: `Pobuzka`,
      pochaivska: `Pochaivska`,
      pochetnenska: `Pochetnenska`,
      podilska: `Podilska`,
      pohrebyshchenska: `Pohrebyshchenska`,
      pokrovska: `Pokrovska`,
      pokrovska_2: `Pokrovska`,
      pokrovska_3: `Pokrovska`,
      pokrovska_4: `Pokrovska`,
      polianska: `Polianska`,
      polianytska: `Polianytska`,
      poliska: `Poliska`,
      polohivska: `Polohivska`,
      polonska: `Polonska`,
      poltavska_2: `Poltavska`,
      poltavska_3: `Poltavska`,
      polytska: `Polytska`,
      pomichnianska: `Pomichnianska`,
      pomorianska: `Pomorianska`,
      poninkivska: `Poninkivska`,
      ponornytska: `Ponornytska`,
      popasnianska: `Popasnianska`,
      popelnastivska: `Popelnastivska`,
      popilnianska: `Popilnianska`,
      popivska: `Popivska`,
      poromivska: `Poromivska`,
      poshtivska: `Poshtivska`,
      potiivska: `Potiivska`,
      povchanska: `Povchanska`,
      povorska: `Povorska`,
      pozharska: `Pozharska`,
      pravdivska: `Pravdivska`,
      preobrazhenska: `Preobrazhenska`,
      prostornenska: `Prostornenska`,
      prudivska: `Prudivska`,
      pryazovska: `Pryazovska`,
      prybuzhanivska: `Prybuzhanivska`,
      prybuzka: `Prybuzka`,
      pryiutivska: `Pryiutivska`,
      prylisnenska: `Prylisnenska`,
      prylutska: `Prylutska`,
      prymorska: `Prymorska`,
      prymorska_2: `Prymorska`,
      pryozernivska: `Pryozernivska`,
      pryshybska: `Pryshybska`,
      prystolychna: `Prystolychna`,
      prysyvaska: `Prysyvaska`,
      pryvilnenska: `Pryvilnenska`,
      pryvilnenska_2: `Pryvilnenska`,
      pryvitnenska_3: `Pryvitnenska`,
      pryvitnenska_4: `Pryvitnenska`,
      pshenychnenska: `Pshenychnenska`,
      pulynska: `Pulynska`,
      pushkinska: `Pushkinska`,
      pustomytivska: `Pustomytivska`,
      putylska: `Putylska`,
      putyvlska: `Putyvlska`,
      pyiterfolvivska: `Pyiterfolvivska`,
      pylypetska: `Pylypetska`,
      pyriatynska: `Pyriatynska`,
      radekhivska: `Radekhivska`,
      radomyshlska: `Radomyshlska`,
      radsadivska: `Radsadivska`,
      radyvylivska: `Radyvylivska`,
      rafalivska: `Rafalivska`,
      raihorodotska: `Raihorodotska`,
      raihorodska: `Raihorodska`,
      raivska: `Raivska`,
      rakhivska: `Rakhivska`,
      ralivska: `Ralivska`,
      ratnivska: `Ratnivska`,
      raukhivska: `Raukhivska`,
      'rava-ruska': `Rava-Ruska`,
      reniiska: `Reniiska`,
      reshetylivska: `Reshetylivska`,
      richkivska: `Richkivska`,
      ripkynska: `Ripkynska`,
      rivnenska_2: `Rivnenska`,
      rivnenska_3: `Rivnenska`,
      rivnianska: `Rivnianska`,
      rivnivska: `Rivnivska`,
      rodnykivska: `Rodnykivska`,
      rohanska: `Rohanska`,
      rohatynska: `Rohatynska`,
      rokytnianska: `Rokytnianska`,
      rokytnivska: `Rokytnivska`,
      romanivska: `Romanivska`,
      romashkinska: `Romashkinska`,
      romenska: `Romenska`,
      romodanivska: `Romodanivska`,
      roshchynska: `Roshchynska`,
      rotmistrivska: `Rotmistrivska`,
      rovenkivska: `Rovenkivska`,
      rozdilnianska: `Rozdilnianska`,
      rozdolnenska: `Rozdolnenska`,
      rozdolska: `Rozdolska`,
      rozdorska: `Rozdorska`,
      rozhniativska: `Rozhniativska`,
      rozhnivska: `Rozhnivska`,
      rozhyshchenska: `Rozhyshchenska`,
      rozivska: `Rozivska`,
      rozkishnenska: `Rozkishnenska`,
      rozkvitivska: `Rozkvitivska`,
      rozsoshanska: `Rozsoshanska`,
      rozvadivska: `Rozvadivska`,
      rubanivska: `Rubanivska`,
      rubizhanska: `Rubizhanska`,
      ruchivska: `Ruchivska`,
      rudkivska: `Rudkivska`,
      rukshynska: `Rukshynska`,
      rusakivska: `Rusakivska`,
      ruskopolianska: `Ruskopolianska`,
      ruzhynska: `Ruzhynska`,
      rzhyshchivska: `Rzhyshchivska`,
      sadivska: `Sadivska`,
      sadova: `Sadova`,
      safianivska: `Safianivska`,
      sahunivska: `Sahunivska`,
      sakhnovetska: `Sakhnovetska`,
      sakhnovshchynska: `Sakhnovshchynska`,
      saksahanska: `Saksahanska`,
      sakska: `Sakska`,
      samarivska: `Samarivska`,
      sambirska: `Sambirska`,
      samhorodotska: `Samhorodotska`,
      saranchukivska: `Saranchukivska`,
      saratska: `Saratska`,
      sarnenska: `Sarnenska`,
      sartanska: `Sartanska`,
      sarybashivska: `Sarybashivska`,
      satanivska: `Satanivska`,
      savranska: `Savranska`,
      savynska: `Savynska`,
      sednivska: `Sednivska`,
      seliatynska: `Seliatynska`,
      selydivska: `Selydivska`,
      selyshchenska: `Selyshchenska`,
      semenivska: `Semenivska`,
      semenivska_2: `Semenivska`,
      semenivska_3: `Semenivska`,
      semenivska_4: `Semenivska`,
      semydubska: `Semydubska`,
      semysotska: `Semysotska`,
      senchanska: `Senchanska`,
      serebrianska: `Serebrianska`,
      serednianska: `Serednianska`,
      'seredyno-budska': `Seredyno-Budska`,
      serekhovychivska: `Serekhovychivska`,
      serhiivska: `Serhiivska`,
      serhiivska_2: `Serhiivska`,
      sevastopilska_2: `Sevastopilska`,
      sevastopilska_3: `Sevastopilska`,
      severynivska: `Severynivska`,
      shabivska: `Shabivska`,
      shakhivska: `Shakhivska`,
      shakhtarska: `Shakhtarska`,
      shalyhynska: `Shalyhynska`,
      sharhorodska: `Sharhorodska`,
      shatska: `Shatska`,
      shchastynska: `Shchastynska`,
      shchebetovska: `Shchebetovska`,
      shcherbanivska: `Shcherbanivska`,
      shcholkinska: `Shcholkinska`,
      shchyborivska: `Shchyborivska`,
      shchyretska: `Shchyretska`,
      shehynivska: `Shehynivska`,
      shepetivska: `Shepetivska`,
      shevchenkivska: `Shevchenkivska`,
      shevchenkivska_2: `Shevchenkivska`,
      shevchenkivska_3: `Shevchenkivska`,
      shkilnenska: `Shkilnenska`,
      shostkynska: `Shostkynska`,
      shpanivska: `Shpanivska`,
      shpolianska: `Shpolianska`,
      shpykivska: `Shpykivska`,
      shramkivska: `Shramkivska`,
      shtormivska: `Shtormivska`,
      shulhynska: `Shulhynska`,
      shumska: `Shumska`,
      shvaikivska: `Shvaikivska`,
      shyriaivska: `Shyriaivska`,
      shyrokivska: `Shyrokivska`,
      shyrokivska_2: `Shyrokivska`,
      shyrokivska_3: `Shyrokivska`,
      shyrokivska_4: `Shyrokivska`,
      shyrokivska_5: `Shyrokivska`,
      shyshatska: `Shyshatska`,
      sievierodonetska: `Sievierodonetska`,
      simeizka: `Simeizka`,
      simferopolska: `Simferopolska`,
      siurtivska: `Siurtivska`,
      siverska: `Siverska`,
      skadovska: `Skadovska`,
      'skala-podilska': `Skala-Podilska`,
      skalatska: `Skalatska`,
      skalystivska: `Skalystivska`,
      skhidnytska: `Skhidnytska`,
      skolivska: `Skolivska`,
      skorokhodivska: `Skorokhodivska`,
      skorykivska: `Skorykivska`,
      skvortsivska: `Skvortsivska`,
      skvyrska: `Skvyrska`,
      slavhorodska: `Slavhorodska`,
      slavnivska: `Slavnivska`,
      slavska: `Slavska`,
      slavutska: `Slavutska`,
      slavutytska: `Slavutytska`,
      slobidska: `Slobidska`,
      'slobidsko-kulchiievetska': `Slobidsko-Kulchiievetska`,
      slobozhanska: `Slobozhanska`,
      slobozhanska_2: `Slobozhanska`,
      slovechanska: `Slovechanska`,
      slovianska: `Slovianska`,
      slovianska_2: `Slovianska`,
      slovianska_3: `Slovianska`,
      smidynska: `Smidynska`,
      smilianska: `Smilianska`,
      smolinska: `Smolinska`,
      smotrytska: `Smotrytska`,
      smyrnovska: `Smyrnovska`,
      smyzka: `Smyzka`,
      sniatynska: `Sniatynska`,
      snihurivska: `Snihurivska`,
      snizhnianska: `Snizhnianska`,
      snovska: `Snovska`,
      sobolivska: `Sobolivska`,
      sofiivska: `Sofiivska`,
      sofiivska_2: `Sofiivska`,
      sokalska: `Sokalska`,
      sokilnytska: `Sokilnytska`,
      sokolivska: `Sokolivska`,
      sokyrianska: `Sokyrianska`,
      soledarska: `Soledarska`,
      solobkovetska: `Solobkovetska`,
      solonianska: `Solonianska`,
      solonkivska: `Solonkivska`,
      solonytsivska: `Solonytsivska`,
      solotvynska: `Solotvynska`,
      solotvynska_2: `Solotvynska`,
      soniachnodolynska: `Soniachnodolynska`,
      sorokynska: `Sorokynska`,
      soshychnenska: `Soshychnenska`,
      sosnivska: `Sosnivska`,
      sosnytska: `Sosnytska`,
      sovietska: `Sovietska`,
      sovkhoznenska: `Sovkhoznenska`,
      spaska: `Spaska`,
      sribnianska: `Sribnianska`,
      stakhanovska: `Stakhanovska`,
      stalnenska: `Stalnenska`,
      stanislavchytska: `Stanislavchytska`,
      stanislavska: `Stanislavska`,
      'stanychno-luhanska': `Stanychno-Luhanska`,
      stanyshivska: `Stanyshivska`,
      starobeshivska: `Starobeshivska`,
      starobilska: `Starobilska`,
      starobohorodchanska: `Starobohorodchanska`,
      starokostiantynivska: `Starokostiantynivska`,
      starokozatska: `Starokozatska`,
      starokrymska: `Starokrymska`,
      staromaiakivska: `Staromaiakivska`,
      staromlynivska: `Staromlynivska`,
      staroostropilska: `Staroostropilska`,
      starosaltivska: `Starosaltivska`,
      starosambirska: `Starosambirska`,
      starosiletska: `Starosiletska`,
      starosilska: `Starosilska`,
      starosyniavska: `Starosyniavska`,
      staroushytska: `Staroushytska`,
      starovirivska: `Starovirivska`,
      starovyzhivska: `Starovyzhivska`,
      stavchanska: `Stavchanska`,
      stavnenska: `Stavnenska`,
      stavyshchenska: `Stavyshchenska`,
      steblivska: `Steblivska`,
      stepanetska: `Stepanetska`,
      stepanivska: `Stepanivska`,
      stepanivska_2: `Stepanivska`,
      stepankivska: `Stepankivska`,
      stepanska: `Stepanska`,
      stepivska: `Stepivska`,
      stepnenska: `Stepnenska`,
      stepnivska: `Stepnivska`,
      stepnohirska: `Stepnohirska`,
      storozhynetska: `Storozhynetska`,
      stovpivska: `Stovpivska`,
      strilkivska: `Strilkivska`,
      striukivska: `Striukivska`,
      stryiska: `Stryiska`,
      stryivska: `Stryivska`,
      stryzhavska: `Stryzhavska`,
      studenianska: `Studenianska`,
      studenykivska: `Studenykivska`,
      subottsivska: `Subottsivska`,
      suchevenska: `Suchevenska`,
      sudatska: `Sudatska`,
      sudovovyshnianska: `Sudovovyshnianska`,
      sudylkivska: `Sudylkivska`,
      sukhoielanetska: `Sukhoielanetska`,
      sukhopolovianska: `Sukhopolovianska`,
      sumska_3: `Sumska`,
      'sursko-lytovska': `Sursko-Lytovska`,
      susaninska: `Susaninska`,
      sutyskivska: `Sutyskivska`,
      suvorovska: `Suvorovska`,
      suvorovska_2: `Suvorovska`,
      suvorovska_3: `Suvorovska`,
      svaliavska: `Svaliavska`,
      svativska: `Svativska`,
      sveska: `Sveska`,
      sviatohirska: `Sviatohirska`,
      sviatovasylivska: `Sviatovasylivska`,
      svitlivska: `Svitlivska`,
      svitlodarska: `Svitlodarska`,
      svitlovodska: `Svitlovodska`,
      synelnykivska: `Synelnykivska`,
      synevyrska: `Synevyrska`,
      syniukhynobridska: `Syniukhynobridska`,
      synivska: `Synivska`,
      synytsynska: `Synytsynska`,
      syzivska: `Syzivska`,
      tabachnenska: `Tabachnenska`,
      tabachnenska_2: `Tabachnenska`,
      tairovska: `Tairovska`,
      talalaivska: `Talalaivska`,
      talalaivska_2: `Talalaivska`,
      talnivska: `Talnivska`,
      tarakanivska: `Tarakanivska`,
      tarashanska: `Tarashanska`,
      tarashchanska: `Tarashchanska`,
      tarutynska: `Tarutynska`,
      tashanska: `Tashanska`,
      tatarbunarska: `Tatarbunarska`,
      tavriiska: `Tavriiska`,
      tavriiska_3: `Tavriiska`,
      tavrychanska: `Tavrychanska`,
      teofipolska: `Teofipolska`,
      teplodarska: `Teplodarska`,
      teplytska: `Teplytska`,
      teplytska_2: `Teplytska`,
      tereblechenska: `Tereblechenska`,
      terebovlianska: `Terebovlianska`,
      tereshkivska: `Tereshkivska`,
      teresvianska: `Teresvianska`,
      ternivska: `Ternivska`,
      ternivska_2: `Ternivska`,
      ternopilska_3: `Ternopilska`,
      ternuvatska: `Ternuvatska`,
      terpinnivska: `Terpinnivska`,
      teterivska: `Teterivska`,
      tetiivska: `Tetiivska`,
      tiachivska: `Tiachivska`,
      tiahynska: `Tiahynska`,
      tinystivska: `Tinystivska`,
      tlumatska: `Tlumatska`,
      tokarievska: `Tokarievska`,
      tokmatska: `Tokmatska`,
      tomakivska: `Tomakivska`,
      tomashivska: `Tomashivska`,
      tomashpilska: `Tomashpilska`,
      toporivska: `Toporivska`,
      torchynska: `Torchynska`,
      toretska: `Toretska`,
      tovstenska: `Tovstenska`,
      troitska: `Troitska`,
      troitska_2: `Troitska`,
      trostianetska: `Trostianetska`,
      trostianetska_2: `Trostianetska`,
      trostianetska_3: `Trostianetska`,
      trudivska: `Trudivska`,
      truskavetska: `Truskavetska`,
      trybukhivska: `Trybukhivska`,
      tsarychanska: `Tsarychanska`,
      tsebrykivska: `Tsebrykivska`,
      tsilynna: `Tsilynna`,
      tsumanska: `Tsumanska`,
      tsvitochnenska: `Tsvitochnenska`,
      tsyblivska: `Tsyblivska`,
      tsyrkunivska: `Tsyrkunivska`,
      tulchynska: `Tulchynska`,
      tupychivska: `Tupychivska`,
      turbivska: `Turbivska`,
      'turie-remetivska': `Turie-Remetivska`,
      turiiska: `Turiiska`,
      turkivska: `Turkivska`,
      tuzlivska: `Tuzlivska`,
      tyshkivska: `Tyshkivska`,
      tysmenytska: `Tysmenytska`,
      tyvrivska: `Tyvrivska`,
      udachnenska: `Udachnenska`,
      uhlianska: `Uhlianska`,
      uhlivska: `Uhlivska`,
      uhrynivska: `Uhrynivska`,
      uiutnenska: `Uiutnenska`,
      ukrainska: `Ukrainska`,
      ukrainska_2: `Ukrainska`,
      ukromnivska: `Ukromnivska`,
      ulanivska: `Ulanivska`,
      ulashanivska: `Ulashanivska`,
      umanska: `Umanska`,
      urozhainivska: `Urozhainivska`,
      urozhainivska_2: `Urozhainivska`,
      usativska: `Usativska`,
      ushomyrska: `Ushomyrska`,
      uspenivska: `Uspenivska`,
      'ust-chornianska': `Ust-Chornianska`,
      'ust-putylska': `Ust-Putylska`,
      ustyluzka: `Ustyluzka`,
      ustynivska: `Ustynivska`,
      uvarivska: `Uvarivska`,
      uvarivska_2: `Uvarivska`,
      uzhhorodska: `Uzhhorodska`,
      uzynska: `Uzynska`,
      vakulivska: `Vakulivska`,
      valkivska: `Valkivska`,
      vanchykovetska: `Vanchykovetska`,
      vapniarska: `Vapniarska`,
      varaska: `Varaska`,
      varkovytska: `Varkovytska`,
      varvynska: `Varvynska`,
      vashkivetska: `Vashkivetska`,
      vashkovetska: `Vashkovetska`,
      vasylivska: `Vasylivska`,
      vasylivska_2: `Vasylivska`,
      vasylivska_3: `Vasylivska`,
      vasylkivska_4: `Vasylkivska`,
      vasylkivska_5: `Vasylkivska`,
      vasylkovetska: `Vasylkovetska`,
      vatutinska: `Vatutinska`,
      vchoraishenska: `Vchoraishenska`,
      velykoandrusivska: `Velykoandrusivska`,
      velykobahachanska: `Velykobahachanska`,
      velykoberezka: `Velykoberezka`,
      velykobereznianska: `Velykobereznianska`,
      velykoberezovytska: `Velykoberezovytska`,
      velykobilozerska: `Velykobilozerska`,
      velykobirkivska: `Velykobirkivska`,
      velykobudyshchanska: `Velykobudyshchanska`,
      velykobuialytska: `Velykobuialytska`,
      velykoburlutska: `Velykoburlutska`,
      velykobychkivska: `Velykobychkivska`,
      velykobyihanska: `Velykobyihanska`,
      velykodalnytska: `Velykodalnytska`,
      velykodederkalska: `Velykodederkalska`,
      velykodobronska: `Velykodobronska`,
      velykodolynska: `Velykodolynska`,
      velykodymerska: `Velykodymerska`,
      velykohaivska: `Velykohaivska`,
      velykokhutirska: `Velykokhutirska`,
      velykokopanivska: `Velykokopanivska`,
      velykokuchurivska: `Velykokuchurivska`,
      velykolepetyska: `Velykolepetyska`,
      velykoliubinska: `Velykoliubinska`,
      velykoluchkivska: `Velykoluchkivska`,
      velykomezhyritska: `Velykomezhyritska`,
      velykomostivska: `Velykomostivska`,
      velykomykhailivska: `Velykomykhailivska`,
      velykomykhailivska_2: `Velykomykhailivska`,
      velykonovosilkivska: `Velykonovosilkivska`,
      velykooleksandrivska: `Velykooleksandrivska`,
      velykoomelianska: `Velykoomelianska`,
      velykoploskivska: `Velykoploskivska`,
      velykopysarivska: `Velykopysarivska`,
      velykorublivska: `Velykorublivska`,
      velykoseverynivska: `Velykoseverynivska`,
      velykosorochynska: `Velykosorochynska`,
      velymchenska: `Velymchenska`,
      velytska: `Velytska`,
      vendychanska: `Vendychanska`,
      verbkivska: `Verbkivska`,
      verbska: `Verbska`,
      verenchanska: `Verenchanska`,
      veresaievska: `Veresaievska`,
      verkhivtsivska: `Verkhivtsivska`,
      verkhnianska: `Verkhnianska`,
      verkhnodniprovska: `Verkhnodniprovska`,
      verkhnokoropetska: `Verkhnokoropetska`,
      verkhnorohachytska: `Verkhnorohachytska`,
      verkhnosyrovatska: `Verkhnosyrovatska`,
      verkhorichenska: `Verkhorichenska`,
      verkhovynska: `Verkhovynska`,
      vertiivska: `Vertiivska`,
      veselivska: `Veselivska`,
      veselivska_2: `Veselivska`,
      veselivska_3: `Veselivska`,
      veselynivska: `Veselynivska`,
      vesnianska: `Vesnianska`,
      viitovetska: `Viitovetska`,
      viknianska: `Viknianska`,
      vilinska: `Vilinska`,
      vilkhivska: `Vilkhivska`,
      vilkhovetska: `Vilkhovetska`,
      vilkhuvatska: `Vilkhuvatska`,
      vilnenska: `Vilnenska`,
      vilnianska: `Vilnianska`,
      vilnohirska: `Vilnohirska`,
      vilnozaporizka: `Vilnozaporizka`,
      vilshanska: `Vilshanska`,
      vilshanska_2: `Vilshanska`,
      vilshanska_3: `Vilshanska`,
      vilshanska_4: `Vilshanska`,
      vinkovetska: `Vinkovetska`,
      vinnytska_2: `Vinnytska`,
      vladyslavivska: `Vladyslavivska`,
      vodianska: `Vodianska`,
      vodianytska: `Vodianytska`,
      voikovska: `Voikovska`,
      voikovska_2: `Voikovska`,
      voinska: `Voinska`,
      voinylivska: `Voinylivska`,
      volnovaska: `Volnovaska`,
      volochyska: `Volochyska`,
      volodarska: `Volodarska`,
      volodymyretska: `Volodymyretska`,
      volodymyrivska: `Volodymyrivska`,
      'volodymyr-volynska': `Volodymyr-Volynska`,
      volokivska: `Volokivska`,
      volovetska: `Volovetska`,
      volytska: `Volytska`,
      vorobiovska: `Vorobiovska`,
      vorokhtianska: `Vorokhtianska`,
      voronkivska: `Voronkivska`,
      voronovytska: `Voronovytska`,
      vorozhbianska: `Vorozhbianska`,
      voskhodnenska: `Voskhodnenska`,
      voskresenska: `Voskresenska`,
      voskresenska_2: `Voskresenska`,
      vovchanska: `Vovchanska`,
      vovkovynetska: `Vovkovynetska`,
      vozdvyzhivska: `Vozdvyzhivska`,
      voznesenska: `Voznesenska`,
      voznesenska_2: `Voznesenska`,
      vradiivska: `Vradiivska`,
      vuhledarska: `Vuhledarska`,
      vuhlehirska: `Vuhlehirska`,
      vyhodianska: `Vyhodianska`,
      vyhodska: `Vyhodska`,
      vylkivska: `Vylkivska`,
      vylotska: `Vylotska`,
      vynohradivska: `Vynohradivska`,
      vynohradivska_2: `Vynohradivska`,
      vynohradivska_3: `Vynohradivska`,
      vynohradnenska: `Vynohradnenska`,
      vynohradska: `Vynohradska`,
      vyrivska: `Vyrivska`,
      vyshenska: `Vyshenska`,
      vyshevytska: `Vyshevytska`,
      vyshhorodska: `Vyshhorodska`,
      vyshkivska: `Vyshkivska`,
      vyshneva: `Vyshneva`,
      vyshnivetska: `Vyshnivetska`,
      vyshnivska: `Vyshnivska`,
      vyshnivska_2: `Vyshnivska`,
      vyshnivska_3: `Vyshnivska`,
      vysochanska: `Vysochanska`,
      vysochanska_2: `Vysochanska`,
      vysokivska: `Vysokivska`,
      vysokopilska: `Vysokopilska`,
      vysotska: `Vysotska`,
      vytvytska: `Vytvytska`,
      vyzhnytska: `Vyzhnytska`,
      vyzyrska: `Vyzyrska`,
      yablunivska: `Yablunivska`,
      yablunivska_2: `Yablunivska`,
      yahotynska: `Yahotynska`,
      yakushynetska: `Yakushynetska`,
      yakymivska: `Yakymivska`,
      yakymivska_3: `Yakymivska`,
      yaltynska: `Yaltynska`,
      yamnytska: `Yamnytska`,
      yampilska: `Yampilska`,
      yampilska_2: `Yampilska`,
      yampilska_3: `Yampilska`,
      yantarnenska: `Yantarnenska`,
      yaremchanska: `Yaremchanska`,
      yarkivska: `Yarkivska`,
      yarkopolenska: `Yarkopolenska`,
      yarkopolenska_2: `Yarkopolenska`,
      yarmolynetska: `Yarmolynetska`,
      yaroslavytska: `Yaroslavytska`,
      yarunska: `Yarunska`,
      yaryshivska: `Yaryshivska`,
      yasinianska: `Yasinianska`,
      yaskivska: `Yaskivska`,
      yasnopolianska: `Yasnopolianska`,
      yasynuvatska: `Yasynuvatska`,
      yavorivska: `Yavorivska`,
      yelanetska: `Yelanetska`,
      yemilchynska: `Yemilchynska`,
      yenakiievska: `Yenakiievska`,
      yerkivska: `Yerkivska`,
      yermakivska: `Yermakivska`,
      yevpatoriiska: `Yevpatoriiska`,
      yezupilska: `Yezupilska`,
      yunakivska: `Yunakivska`,
      yurivska: `Yurivska`,
      yurkovetska: `Yurkovetska`,
      yuvileina: `Yuvileina`,
      yuzhnenska: `Yuzhnenska`,
      yuzhnoukrainska: `Yuzhnoukrainska`,
      zabolotivska: `Zabolotivska`,
      zabolottivska: `Zabolottivska`,
      zabolottsivska: `Zabolottsivska`,
      zabrodivska: `Zabrodivska`,
      zachepylivska: `Zachepylivska`,
      zahvizdianska: `Zahvizdianska`,
      zaitsivska: `Zaitsivska`,
      zakharivska: `Zakharivska`,
      zakupnenska: `Zakupnenska`,
      zalishchytska: `Zalishchytska`,
      zaliznychnenska: `Zaliznychnenska`,
      zalozetska: `Zalozetska`,
      zaozernenska: `Zaozernenska`,
      zaporizka_2: `Zaporizka`,
      zarichanska: `Zarichanska`,
      zarichnenska: `Zarichnenska`,
      zarichnenska_2: `Zarichnenska`,
      zasluchnenska: `Zasluchnenska`,
      zastavnivska: `Zastavnivska`,
      zaturtsivska: `Zaturtsivska`,
      zatyshanska: `Zatyshanska`,
      zatyshnianska: `Zatyshnianska`,
      zavallivska: `Zavallivska`,
      zavitnenska: `Zavitnenska`,
      zavitnenska_2: `Zavitnenska`,
      'zavito-leninska': `Zavito-Leninska`,
      zavodska: `Zavodska`,
      zavodska_2: `Zavodska`,
      zazymska: `Zazymska`,
      zbarazka: `Zbarazka`,
      zborivska: `Zborivska`,
      zdolbunivska: `Zdolbunivska`,
      zdovbytska: `Zdovbytska`,
      zelenivska: `Zelenivska`,
      zelenodolska: `Zelenodolska`,
      zelenohirska: `Zelenohirska`,
      zelenohirska_2: `Zelenohirska`,
      zelenopidska: `Zelenopidska`,
      zelenska: `Zelenska`,
      zemlianychnenska: `Zemlianychnenska`,
      zernivska: `Zernivska`,
      zernivska_2: `Zernivska`,
      zghurivska: `Zghurivska`,
      zhashkivska: `Zhashkivska`,
      zhdanivska: `Zhdanivska`,
      zhdanivska_3: `Zhdanivska`,
      zhdeniivska: `Zhdeniivska`,
      zheliabovska: `Zheliabovska`,
      zhemchuzhynska: `Zhemchuzhynska`,
      zhmerynska: `Zhmerynska`,
      zhovkivska: `Zhovkivska`,
      zhovtanetska: `Zhovtanetska`,
      zhovtovodska: `Zhovtovodska`,
      zhuravlivska: `Zhuravlivska`,
      zhuravnenska: `Zhuravnenska`,
      zhuravska: `Zhuravska`,
      zhvanetska: `Zhvanetska`,
      zhydachivska: `Zhydachivska`,
      zhytomyrska_2: `Zhytomyrska`,
      zinkivska: `Zinkivska`,
      zinkivska_2: `Zinkivska`,
      zlynska: `Zlynska`,
      zmiivska: `Zmiivska`,
      znamianska: `Znamianska`,
      znamianska_2: `Znamianska`,
      'znob-novhorodska': `Znob-Novhorodska`,
      zolochivska: `Zolochivska`,
      zolochivska_2: `Zolochivska`,
      zolochivska_3: `Zolochivska`,
      zolotnykivska: `Zolotnykivska`,
      zolotoniska: `Zolotoniska`,
      zolotopolenska: `Zolotopolenska`,
      zolotopotitska: `Zolotopotitska`,
      zorianska: `Zorianska`,
      zorivska: `Zorivska`,
      zorkinska: `Zorkinska`,
      zuiska: `Zuiska`,
      zvanivska: `Zvanivska`,
      zvenyhorodska: `Zvenyhorodska`,
      zybynska: `Zybynska`,
      zymnivska: `Zymnivska`,
      zymnovodivska: `Zymnovodivska`,
      zymohirivska: `Zymohirivska`,
      zymynska: `Zymynska`,
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
      job_duration: _.job_duration ? +_.job_duration : undefined,
      hours_per_week: _.hours_per_week ? +_.hours_per_week : undefined,
      monthly_income: _.monthly_income ? +_.monthly_income : undefined,
      cash_usage: _.cash_usage?.split(' '),
      improvements_noticed: _.improvements_noticed?.split(' '),
      challenges_faced: _.challenges_faced?.split(' '),
      challenges_prevented_meeting: _.challenges_prevented_meeting?.split(' '),
      contacted_pay_amount: _.contacted_pay_amount?.split(' '),
      household_currently_have_clothing_no: _.household_currently_have_clothing_no?.split(' '),
      basic_needs_unable_fulfil: _.basic_needs_unable_fulfil?.split(' '),
      unable_fulfil_basic_food: _.unable_fulfil_basic_food?.split(' '),
      unable_fulfil_food_children: _.unable_fulfil_food_children?.split(' '),
      unable_fulfil_food_pregnant: _.unable_fulfil_food_pregnant?.split(' '),
      unable_fulfil_water_needs: _.unable_fulfil_water_needs?.split(' '),
      unable_fulfil_hygiene_needs: _.unable_fulfil_hygiene_needs?.split(' '),
      unable_fulfil_shelter_needs: _.unable_fulfil_shelter_needs?.split(' '),
      unable_fulfil_healthcare_needs: _.unable_fulfil_healthcare_needs?.split(' '),
      unable_fulfil_healthcare_children: _.unable_fulfil_healthcare_children?.split(' '),
      unable_fulfil_healthcare_pregnant: _.unable_fulfil_healthcare_pregnant?.split(' '),
      unable_fulfil_transportation_needs: _.unable_fulfil_transportation_needs?.split(' '),
      unable_fulfil_communication_needs: _.unable_fulfil_communication_needs?.split(' '),
      unable_fulfil_education_needs: _.unable_fulfil_education_needs?.split(' '),
      unable_fulfil_clothing_needs: _.unable_fulfil_clothing_needs?.split(' '),
      unable_fulfil_utilities: _.unable_fulfil_utilities?.split(' '),
      unable_fulfil_other: _.unable_fulfil_other?.split(' '),
      most_important_things: _.most_important_things?.split(' '),
      income_spent_food: _.income_spent_food ? +_.income_spent_food : undefined,
      income_spent_nonfood: _.income_spent_nonfood ? +_.income_spent_nonfood : undefined,
      lcs_reason: _.lcs_reason?.split(' '),
      basic_needs_unable_fulfill_bha345: _.basic_needs_unable_fulfill_bha345?.split(' '),
      basic_needs_unable_fully_reason_bha345: _.basic_needs_unable_fully_reason_bha345?.split(' '),
      square_metres: _.square_metres ? +_.square_metres : undefined,
      needs_community_currently: _.needs_community_currently?.split(' '),
    }) as T
}
