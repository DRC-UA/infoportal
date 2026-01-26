export namespace Protection_gbv_concepts_pre_post {
  export type Option<T extends keyof typeof options> = keyof (typeof options)[T]
  // Form id: aU7Yxm7sjpoG3tjtQ8NYkT
  export interface T {
    start: string
    end: string
    // topic [select_one] Topic:
    topic: undefined | Option<'topic'>
    // date [date] Date:
    date: Date | undefined
    // unique_code [text] Unique code:
    unique_code: string | undefined
    // project_code [select_one] Please enter the project code
    project_code: undefined | Option<'project_code'>
    // oblast_training [select_one] Oblast where the training was conducted
    oblast_training: undefined | Option<'oblast_training'>
    // location [text] Location where the training was conducted
    location: string | undefined
    // complete_training [select_one] Did you complete the training?
    complete_training: undefined | Option<'complete_training'>
    cal_pre_post: string
    // access/not_access [note] The next questions are about difficulties you may have doing certain activities because of a health problems, this information is collected to help us understand if you face challenges or barriers in participating in the training. Where possible, DRC will support in adapting the training to ensure your participation.
    not_access: string
    // access/difficulty [select_one] Detail
    difficulty: undefined | Option<'difficulty_usual_language'>
    // access/difficulty_seeing [select_one] Do you have difficulty seeing, even if wearing glasses?
    difficulty_seeing: undefined | Option<'difficulty_usual_language'>
    // access/difficulty_hearing [select_one] Do you  have difficulty hearing, even if using a hearing aid?
    difficulty_hearing: undefined | Option<'difficulty_usual_language'>
    // access/difficulty_walking [select_one] Do you  have difficulty walking or climbing steps?
    difficulty_walking: undefined | Option<'difficulty_usual_language'>
    // access/difficulty_remembering [select_one] Do you have difficulty remembering or concentrating?
    difficulty_remembering: undefined | Option<'difficulty_usual_language'>
    // access/difficulty_washing [select_one] Do you  have difficulty (with self-care such as) washing all over or dressing?
    difficulty_washing: undefined | Option<'difficulty_usual_language'>
    // access/difficulty_usual_language [select_one] Using your usual (customary) language, do you have difficulty communicating, for example understanding or being understood by others?
    difficulty_usual_language: undefined | Option<'difficulty_usual_language'>
    // gbv_core_concepts/definition_gender [select_one] 1. What is the definition of gender?
    definition_gender: undefined | Option<'definition_gender'>
    // gbv_core_concepts/causes_gbv [select_one] 2. What is the root cause of GBV
    causes_gbv: undefined | Option<'causes_gbv'>
    // gbv_core_concepts/types_gbv [select_one] 3. What are the types of GBV?
    types_gbv: undefined | Option<'types_gbv'>
    // gbv_core_concepts/principles_working_gbv [select_one] 4. Name the guiding principles for working with GBV survivors
    principles_working_gbv: undefined | Option<'principles_working_gbv'>
    // gbv_core_concepts/not_forced_disclose [select_one] 5. GBV survivors should not be forced to disclose or report their experience to anyone.
    not_forced_disclose: undefined | Option<'sharing_anonymized_data'>
    // gbv_core_concepts/not_fault_blam [select_one] 6. GBV survivors are not at fault or to blame for the violence they experience
    not_fault_blam: undefined | Option<'sharing_anonymized_data'>
    // gbv_core_concepts/speak_truth_violence [select_one] 7. GBV survivors speak the truth about the violence they have experienced.
    speak_truth_violence: undefined | Option<'sharing_anonymized_data'>
    // gbv_core_concepts/not_wish_access [select_one] 8. If a GBV survivor does not wish to access medical care, we should try to persuade them as they need to treat their injuries.
    not_wish_access: undefined | Option<'sharing_anonymized_data'>
    // gbv_core_concepts/woman_approaches_share [select_one] 9. If a woman approaches us and shares that their sister has been affected by GBV, we should contact the sister so that we can provide them with support.
    woman_approaches_share: undefined | Option<'sharing_anonymized_data'>
    // gbv_core_concepts/always_report_case [select_one] 10. GBV survivors should always report their case to the police to ensure their safety
    always_report_case: undefined | Option<'sharing_anonymized_data'>
    // gbv_core_concepts/cal_total_gbv_core_concepts [calculate] Final score : GBV Core Concepts training
    cal_total_gbv_core_concepts: string
    // gbv_case_management/gender_definition [select_one] 1. Which of the following is the definition of gender?
    gender_definition: undefined | Option<'gender_definition'>
    // gbv_case_management/complete_gender_definition [select_one] 2. Which of the following definitions is the most accurate and complete definition of GBV (Gender Based Violence)? Choose only one answer
    complete_gender_definition: undefined | Option<'complete_gender_definition'>
    // gbv_case_management/root_gbv_cause [select_one] 3. What is the root cause of GBV?
    root_gbv_cause: undefined | Option<'root_gbv_cause'>
    // gbv_case_management/survivor_centered_approach_goal [select_multiple] 4. What is the goal of the survivor-centered approach in GBV Case Management? Choose one answer
    survivor_centered_approach_goal: undefined | Option<'survivor_centered_approach_goal'>[]
    // gbv_case_management/cm_guiding_principles [select_multiple] 5. What are the four guiding principles of GBV Case Management? Please choose four answers
    cm_guiding_principles: undefined | Option<'cm_guiding_principles'>[]
    // gbv_case_management/confidentiality_maintenance [select_one] 6. Which of the following is a way to maintain confidentiality?
    confidentiality_maintenance: undefined | Option<'confidentiality_maintenance'>
    // gbv_case_management/cm_specialist_primary_role [select_one] 7. True or False: "The main role of a case management specialist is to act as a guide or facilitator in a process that involves information disclosure, education, decision-making, actions, and personal transformation of survivors."
    cm_specialist_primary_role: undefined | Option<'sharing_anonymized_data'>
    // gbv_case_management/healing_statements [select_multiple] 8. Which of the following phrases are examples of healing statements? Choose all correct answers
    healing_statements: undefined | Option<'healing_statements'>[]
    // gbv_case_management/informed_consent_conditions [select_multiple] 9. To give informed consent, the survivor should: (Choose all correct answers)
    informed_consent_conditions: undefined | Option<'informed_consent_conditions'>[]
    // gbv_case_management/confidential_data_exposure [select_multiple] 10. In which of the following situations can the case manager breach confidentiality? Choose all correct answers
    confidential_data_exposure: undefined | Option<'confidential_data_exposure'>[]
    // gbv_case_management/case_data_storage [select_multiple] 11. Where should case materials be stored? Choose all correct answers
    case_data_storage: undefined | Option<'case_data_storage'>[]
    // gbv_case_management/single_storage [select_one] 12. True or False: All documents (forms) of case should be stored in the same place with consent forms?
    single_storage: undefined | Option<'sharing_anonymized_data'>
    // gbv_case_management/suicide_risk_factors [select_multiple] 13. Which of the following are risk factors for suicide?
    suicide_risk_factors: undefined | Option<'suicide_risk_factors'>[]
    // gbv_case_management/mandatory_reporting [select_one] 14. True or False: It is important to inform the survivor about mandatory reporting because mandatory reporting laws can sometimes put the survivor at risk of further harm
    mandatory_reporting: undefined | Option<'sharing_anonymized_data'>
    // gbv_case_management/closure_steps [select_multiple] 15. Which of the following are always steps in Case Closure? Choose the correct options
    closure_steps: undefined | Option<'closure_steps'>[]
    // gbv_case_management/supervisor_role [select_multiple] 16. What is the role of a supervisor? Choose all that apply
    supervisor_role: undefined | Option<'supervisor_role'>[]
    // gbv_case_management/supervision_features [select_multiple] 17. Supervision should be: (Choose all that apply)
    supervision_features: undefined | Option<'supervision_features'>[]
    // gbv_case_management/stress_is_ok [select_one] 18. True or False: Stress is a normal phenomenon and can be a source of motivation
    stress_is_ok: undefined | Option<'sharing_anonymized_data'>
    // gbv_case_management/self_help_techniques [select_multiple] 19. Which of the following is a useful self-help technique? Choose all that apply.
    self_help_techniques: undefined | Option<'self_help_techniques'>[]
    // gbv_case_management/cm_quiz_score [calculate] Final score : GBV Case Management training
    cm_quiz_score: string
    // gbv_basic_concepts_intimate/intimate_partner_violence [select_one] 1. Who does intimate partner violence occur between?
    intimate_partner_violence: undefined | Option<'intimate_partner_violence'>
    // gbv_basic_concepts_intimate/intimate_violence_live_together [select_one] 2. To be considered intimate partner violence, a couple must live together
    intimate_violence_live_together: undefined | Option<'sharing_anonymized_data'>
    // gbv_basic_concepts_intimate/unwanted_behaviour_type [select_one] 3. Repeated instances of unwanted and threatening behaviour directed at another person that causes them to fear for their safety is an example of what type of violence?
    unwanted_behaviour_type: undefined | Option<'unwanted_behaviour_type'>
    // gbv_basic_concepts_intimate/economic_abuse_isolation [select_one] 4. Economic abuse usually occurs in isolation (by itself, without other forms of violence)
    economic_abuse_isolation: undefined | Option<'sharing_anonymized_data'>
    // gbv_basic_concepts_intimate/example_economic_abuse [select_one] 5. Select an example of economic abuse
    example_economic_abuse: undefined | Option<'example_economic_abuse'>
    // gbv_basic_concepts_intimate/agrees_kiss_also [select_one] 6. A person who agrees to a kiss also agrees to other types of intimate and/or sexual activity
    agrees_kiss_also: undefined | Option<'sharing_anonymized_data'>
    // gbv_basic_concepts_intimate/married_consent_intimate [select_one] 7. Married couples do not need consent for intimate/sexual relations
    married_consent_intimate: undefined | Option<'sharing_anonymized_data'>
    // gbv_basic_concepts_intimate/abusive_behaviour_perpetrators [select_one] 8. Abusive behaviour is not a choice of the perpetrators, it happens because they lose control over their behaviour
    abusive_behaviour_perpetrators: undefined | Option<'sharing_anonymized_data'>
    // gbv_basic_concepts_intimate/drugs_alcohol_violent_behaviour [select_one] 9. Abuser's use of drugs or alcohol or stress causes violent behaviour
    drugs_alcohol_violent_behaviour: undefined | Option<'sharing_anonymized_data'>
    // gbv_ipv/what_ipv [select_one] 1. What is intimate partner violence?
    what_ipv: undefined | Option<'what_ipv'>
    // gbv_ipv/examples_emotional_abuse [select_one] 2. What behaviors are examples of emotional abuse by an intimate partner?
    examples_emotional_abuse: undefined | Option<'examples_emotional_abuse'>
    // gbv_ipv/reflects_physical_abuse [select_one] 3. Which of the following situations best reflects the signs of physical abuse in a relationship?
    reflects_physical_abuse: undefined | Option<'reflects_physical_abuse'>
    // gbv_ipv/describes_violation_consent [select_one] 4. Which of the following best describes a violation of consent in an intimate partner relationship?
    describes_violation_consent: undefined | Option<'describes_violation_consent'>
    // gbv_ipv/violence_affect_mental [select_one] 5. How does intimate partner violence affect the mental state of the survivor?
    violence_affect_mental: undefined | Option<'violence_affect_mental'>
    // gbv_ipv/barriers_survivors_gbv [select_one] 6. What barriers do survivors of gender-based violence most commonly face when seeking services?
    barriers_survivors_gbv: undefined | Option<'barriers_survivors_gbv'>
    // gbv_ipv/strategies_support_ipv [select_one] 7. What strategies can be used to support survivors of intimate partner violence?
    strategies_support_ipv: undefined | Option<'strategies_support_ipv'>
    // gbv_ipv/example_emotional_manipulation [select_one] 8. Which of the following phrases is an example of emotional manipulation in a relationship?
    example_emotional_manipulation: undefined | Option<'example_emotional_manipulation'>
    // gbv_ipv/support_survivor_not_ready_leave [select_one] 9. How can you support a survivor who is not ready to leave an abusive relationship?
    support_survivor_not_ready_leave: undefined | Option<'support_survivor_not_ready_leave'>
    // gbv_ipv/confidentiality_communicating [select_one] 10. How can confidentiality be ensured when communicating with survivors?
    confidentiality_communicating: undefined | Option<'confidentiality_communicating'>
    // gbv_ipv/principle_supporting_ipv [select_one] 11. What is the most important principle when supporting a survivor of intimate partner violence in deciding what to do next?
    principle_supporting_ipv: undefined | Option<'principle_supporting_ipv'>
    // gbv_ipv/principle_self_determination [select_one] 12. What does the principle of self-determination mean in the context of helping survivors of gender-based violence (GBV)?
    principle_self_determination: undefined | Option<'principle_self_determination'>
    // gbv_ipv/situations_ipv [select_one] 13. Which of the following situations is the clearest example of stalking in the context of intimate partner violence?
    situations_ipv: undefined | Option<'situations_ipv'>
    // gbv_ipv/informed_consent_services_ipv [select_one] 14. What does informed consent mean when providing services to survivors of gender-based violence?
    informed_consent_services_ipv: undefined | Option<'informed_consent_services_ipv'>
    // gbv_ipv/respond_not_want_police [select_one] 15. How should you respond if the survivor does not want to contact the police?
    respond_not_want_police: undefined | Option<'respond_not_want_police'>
    // gbv_ipv/score_gbv_ipv [calculate] Final score : GBV -  UPD Basic Concepts of Intimate Partner Violence
    score_gbv_ipv: string
    // legal_aspects_gbv/gbv_associated_women [select_one] 1. Why is gender-based violence (GBV) often associated with violence against women?
    gbv_associated_women: undefined | Option<'gbv_associated_women'>
    // legal_aspects_gbv/first_international_document_fight [select_one] 2. What was the first international document in the fight against discrimination against women?
    first_international_document_fight: undefined | Option<'first_international_document_fight'>
    // legal_aspects_gbv/report_violence_istanbul_convention [select_one] 3. Who has the right to file a report of violence according to the Istanbul Convention?
    report_violence_istanbul_convention: undefined | Option<'report_violence_istanbul_convention'>
    // legal_aspects_gbv/law_enforcement_istanbul_convention [select_one] 4. How should law enforcement agencies act in cases of violence according to the Istanbul Convention?
    law_enforcement_istanbul_convention: undefined | Option<'law_enforcement_istanbul_convention'>
    // legal_aspects_gbv/basis_restricting_parental_rights [select_one] 5. What can be a basis for restricting parental rights according to the Istanbul Convention?
    basis_restricting_parental_rights: undefined | Option<'basis_restricting_parental_rights'>
    // legal_aspects_gbv/actions_signs_domestic_violence [select_one] 6. What actions are signs of domestic violence?
    actions_signs_domestic_violence: undefined | Option<'actions_signs_domestic_violence'>
    // legal_aspects_gbv/what_domestic_violence [select_one] 7. What is domestic violence according to the Law of Ukraine "On Prevention and Combating Domestic Violence"?
    what_domestic_violence: undefined | Option<'what_domestic_violence'>
    // legal_aspects_gbv/measure_immediate_protection [select_one] 8. What measure is applied for the immediate protection of a person affected by violence?
    measure_immediate_protection: undefined | Option<'measure_immediate_protection'>
    // legal_aspects_gbv/restraining_order_entail [select_one] 9. What does a restraining order entail?
    restraining_order_entail: undefined | Option<'restraining_order_entail'>
    // legal_aspects_gbv/safety_planning [select_one] 10. What is safety planning?
    safety_planning: undefined | Option<'safety_planning'>
    // legal_aspects_gbv/safety_planning_irrelevant [select_one] 11. When can safety planning be irrelevant?
    safety_planning_irrelevant: undefined | Option<'safety_planning_irrelevant'>
    // legal_aspects_gbv/role_social_worker_sp [select_one] 12. What is the role of a social worker in safety planning?
    role_social_worker_sp: undefined | Option<'role_social_worker_sp'>
    // legal_aspects_gbv/does_not_safety_plan [select_one] 13. What to do if the survivor does not want to follow the safety plan?
    does_not_safety_plan: undefined | Option<'does_not_safety_plan'>
    // legal_aspects_gbv/current_safety_survivor [select_one] 14. Why is it important to assess the current safety level of the survivor?
    current_safety_survivor: undefined | Option<'current_safety_survivor'>
    // legal_aspects_gbv/appropriate_create_plan [select_one] 15. How to determine if it is appropriate to create a safety plan for a survivor who no longer has contact with the perpetrator?
    appropriate_create_plan: undefined | Option<'appropriate_create_plan'>
    // legal_aspects_gbv/perpetrator_past_experience [select_one] 16. How can the perpetrator’s past experience affect the current risk assessment of violence?
    perpetrator_past_experience: undefined | Option<'perpetrator_past_experience'>
    // legal_aspects_gbv/cal_total_gbv_core_concepts_001 [calculate] Final score : GBV Core Concepts training
    cal_total_gbv_core_concepts_001: string
    // gbv_advanced_concepts_intimate/cycle_violence_helpful [select_one] 1. How can the cycle of violence be helpful when working with survivors?
    cycle_violence_helpful: undefined | Option<'cycle_violence_helpful'>
    // gbv_advanced_concepts_intimate/reflects_partner_violence [select_one] 2. Which statement best reflects the definition of intimate partner violence?
    reflects_partner_violence: undefined | Option<'reflects_partner_violence'>
    // gbv_advanced_concepts_intimate/leave_abusive_partner [select_one] 3. How can the phrase "Leave such an abusive partner" affect a survivor?
    leave_abusive_partner: undefined | Option<'leave_abusive_partner'>
    // gbv_advanced_concepts_intimate/example_control_intimate_relationship [select_one] 4. What is an example of control in an intimate relationship?
    example_control_intimate_relationship: undefined | Option<'example_control_intimate_relationship'>
    // gbv_advanced_concepts_intimate/indicate_control_relationship [select_one] 5. What might indicate an attempt to control in a relationship?
    indicate_control_relationship: undefined | Option<'indicate_control_relationship'>
    // gbv_advanced_concepts_intimate/indicates_manipulation_relationship [select_one] 6. Which option most indicates manipulation in a relationship
    indicates_manipulation_relationship: undefined | Option<'indicates_manipulation_relationship'>
    // gbv_advanced_concepts_intimate/informed_exact_location [select_one] 7. If a partner insists on always being informed of the exact location, what could this mean?
    informed_exact_location: undefined | Option<'informed_exact_location'>
    // gbv_advanced_concepts_intimate/insists_leaving_job [select_one] 8. How can the situation be interpreted when a partner insists on leaving a job because it "takes up too much time"?
    insists_leaving_job: undefined | Option<'insists_leaving_job'>
    // gbv_advanced_concepts_intimate/partner_know_better [select_one] 9. What does it mean when a partner claims to know better what is good for someone else?
    partner_know_better: undefined | Option<'partner_know_better'>
    // gbv_advanced_concepts_intimate/too_sensitive [select_one] 10. Why might a partner say that someone is "too sensitive"?
    too_sensitive: undefined | Option<'too_sensitive'>
    // gbv_advanced_concepts_intimate/stop_communicating_friends [select_one] 11. How can a situation be described where a partner asks to stop communicating with certain friends because it "negatively affects the relationship"?
    stop_communicating_friends: undefined | Option<'stop_communicating_friends'>
    // gbv_advanced_concepts_intimate/indicate_manipulation_relationship [select_one] 12. Which statement can indicate manipulation in a relationship?
    indicate_manipulation_relationship: undefined | Option<'indicate_manipulation_relationship'>
    // gbv_advanced_concepts_intimate/partner_insists_financial [select_one] 13. What could it mean if a partner insists on joint financial planning and requires all expenses to be agreed upon?
    partner_insists_financial: undefined | Option<'partner_insists_financial'>
    // gbv_advanced_concepts_intimate/compares_someone_others [select_one] 14. What does it mean when a partner frequently compares someone to others, saying they should "be like them"?
    compares_someone_others: undefined | Option<'compares_someone_others'>
    // gbv_advanced_concepts_intimate/frequently_criticizes_appearance [select_one] 15. What does it mean when a partner frequently criticizes appearance, even over small details?
    frequently_criticizes_appearance: undefined | Option<'frequently_criticizes_appearance'>
    // gbv_advanced_concepts_intimate/partner_knowing_passwords [select_one] 16. What could it mean if a partner insists on knowing passwords to devices?
    partner_knowing_passwords: undefined | Option<'partner_knowing_passwords'>
    // gbv_advanced_concepts_intimate/who_talked_phone [select_one] 17. What might it mean if a partner constantly asks who you talked to on the phone and what it was about?
    who_talked_phone: undefined | Option<'who_talked_phone'>
    // gbv_advanced_concepts_intimate/consent_intimacy_relationship [select_one] 18. What is considered voluntary consent for intimacy in a relationship?
    consent_intimacy_relationship: undefined | Option<'consent_intimacy_relationship'>
    // gbv_advanced_concepts_intimate/longterm_relationship_intimacy [select_one] 19. Can a partner in a long-term relationship expect consent for intimacy without discussion if it is a usual part of the relationship?
    longterm_relationship_intimacy: undefined | Option<'longterm_relationship_intimacy'>
    // girl_shine/what_girl_shine [select_one] 1. What is Girl Shine:
    what_girl_shine: undefined | Option<'what_girl_shine'>
    // girl_shine/age_corresponding_target [select_one] 2. Whats the age corresponding to the target for Girlshine implementation?
    age_corresponding_target: undefined | Option<'age_corresponding_target'>
    // girl_shine/responsibilities_adolescents_girls [select_multiple] 3. As humanitarians, which are our responsibilities toward adolescents’ girls?  Select all that apply:
    responsibilities_adolescents_girls: undefined | Option<'responsibilities_adolescents_girls'>[]
    // girl_shine/girls_information_srh [select_multiple] 4. Which girls should receive information about SRH (sexual and reproductive health)? Select all that apply:
    girls_information_srh: undefined | Option<'girls_information_srh'>[]
    // girl_shine/factors_influence_experience [select_multiple] 5. What are the factors that could influence the personal experience of adolescents? Select all that apply:
    factors_influence_experience: undefined | Option<'factors_influence_experience'>[]
    // girl_shine/gender_discrimination_statistically [select_one] 6. Gender discrimination, norms and harmful practices mean that adolescents can be affected in different ways. Statistically:
    gender_discrimination_statistically: undefined | Option<'gender_discrimination_statistically'>
    // girl_shine/sessions_disposed_specific [select_one] 7. Why Girl Shine sessions are disposed in a specific order?
    sessions_disposed_specific: undefined | Option<'sessions_disposed_specific'>
    // girl_shine/correct_order_gs [select_one] 8. What is the correct order of the Girl Shine modules?
    correct_order_gs: undefined | Option<'correct_order_gs'>
    // girl_shine/outreach_activities_fundamental [select_one] 9. Why outreach activities are fundamental for Girl Shine implementation?
    outreach_activities_fundamental: undefined | Option<'outreach_activities_fundamental'>
    // girl_shine/structure_gs_session [select_one] 10. What is the structure of a Girl Shine session with adolescent girls?
    structure_gs_session: undefined | Option<'structure_gs_session'>
    // girl_shine/facilitators_level_comfort [select_one] 11. Do you think facilitators’ level of comfort talking about sensible issues (like sexual and reproductive health) with girls is a relevant discussion to address with supervisor before starting implementation of Girl Shine?
    facilitators_level_comfort: undefined | Option<'facilitators_level_comfort'>
    // girl_shine/trust_module_first [select_one] 12. Why is the ‘trust’ module the first one in Life skills Program?
    trust_module_first: undefined | Option<'trust_module_first'>
    // girl_shine/fundamental_principle_sexual [select_one] 13. What is the fundamental principle in sexual and reproductive rights?
    fundamental_principle_sexual: undefined | Option<'fundamental_principle_sexual'>
    // girl_shine/adolescents_rights_sexual [select_multiple] 14. What are adolescents’ rights in the sexual and reproductive health sphere? Select all the apply:
    adolescents_rights_sexual: undefined | Option<'adolescents_rights_sexual'>[]
    // girl_shine/adolescent_girls_positive [select_multiple] 15. Adolescent girls have the right to develop a positive sense of their own bodies and sexuality. They have the right to be free of abuse and inappropriate touching. What values/sphere does the circle of sexuality include? Select all that apply:
    adolescent_girls_positive: undefined | Option<'adolescent_girls_positive'>[]
    // girl_shine/udhr_realizations_sexual [select_one] 16. Are the ‘Right to equality and non-discrimination (UDHR)’ and the ‘Right to information, as well as education (UDHR) part of the rights that support the realizations of sexual health?
    udhr_realizations_sexual: undefined | Option<'udhr_realizations_sexual'>
    // girl_shine/examples_self_harm [select_multiple] 17. Which of the following are examples of self-harm? Select all that apply:
    examples_self_harm: undefined | Option<'examples_self_harm'>[]
    // girl_shine/signs_self_harm [select_one] 18. Which kind of signs of self-harm could you notice as a facilitator during the sessions?
    signs_self_harm: undefined | Option<'signs_self_harm'>
    // girl_shine/case_more_signs [select_multiple] 19. In case you notice some or more signs what would you do? Select all that apply:
    case_more_signs: undefined | Option<'case_more_signs'>[]
    // girl_shine/participant_shares_personal [select_one] 20. What if one participant shares something very personal with one facilitator during the session:
    participant_shares_personal: undefined | Option<'participant_shares_personal'>
    // girl_shine/facilitator_feel_implement [select_one] 21. As a facilitator, do you feel prepared to implement the sessions?
    facilitator_feel_implement: undefined | Option<'facilitator_feel_implement'>
    // girl_shine/cal_total_girl_shine [calculate] Final score : GBV - Girl shine
    cal_total_girl_shine: string
    // crsv/accurately_crsv [select_one] 1. Which of the following statements most accurately reflects the nature of CRSV (conflict-related sexual violence)?
    accurately_crsv: undefined | Option<'accurately_crsv'>
    // crsv/violence_war_crime [select_one] 2. What is the key condition for qualifying sexual violence as a war crime?
    violence_war_crime: undefined | Option<'violence_war_crime'>
    // crsv/characteristic_crime_humanity [select_one] 3. What is the defining characteristic of sexual violence as a crime against humanity?
    characteristic_crime_humanity: undefined | Option<'characteristic_crime_humanity'>
    // crsv/not_crsv_case [select_one] 4. Which of the following is not considered a case of CRSV (conflict-related sexual violence)?
    not_crsv_case: undefined | Option<'not_crsv_case'>
    // crsv/vicarious_trauma [select_one] 5. Which statement relates to the definition of vicarious trauma?
    vicarious_trauma: undefined | Option<'vicarious_trauma'>
    // crsv/vicarious_trauma_accurate [select_one] 6. Which statement about vicarious trauma is the most accurate?
    vicarious_trauma_accurate: undefined | Option<'vicarious_trauma_accurate'>
    // crsv/purpose_informed_consent [select_one] 7. What is the main purpose of informed consent when communicating with a survivor?
    purpose_informed_consent: undefined | Option<'purpose_informed_consent'>
    // crsv/describes_principle_confidentiality [select_one] 8. Which of the following best describes the principle of confidentiality?
    describes_principle_confidentiality: undefined | Option<'describes_principle_confidentiality'>
    // crsv/goal_survivor_centered [select_one] 9. What is the main goal of a survivor-centered approach?
    goal_survivor_centered: undefined | Option<'goal_survivor_centered'>
    // crsv/choose_communicating_survivors [select_one] 10. Which approach will you choose when communicating with survivors?
    choose_communicating_survivors: undefined | Option<'choose_communicating_survivors'>
    // crsv/emotional_stabilization_survivors [select_one] 11. Which statement best corresponds to the approach to emotional stabilization of survivors?
    emotional_stabilization_survivors: undefined | Option<'emotional_stabilization_survivors'>
    // crsv/phrases_principles_sensitive [select_one] 12. Which of the following phrases best reflects the principles of sensitive and supportive communication with survivors?
    phrases_principles_sensitive: undefined | Option<'phrases_principles_sensitive'>
    // crsv/determine_situation_crsv [select_one] 13. Determine whether the following situation is an example of conflict-related sexual violence (CRSV):
    determine_situation_crsv: undefined | Option<'determine_situation_crsv'>
    // crsv/war_sexual_violence_rome [select_one] 14. Which of the following statements is true regarding consent in the context of war-related sexual violence under the Rome Statute?
    war_sexual_violence_rome: undefined | Option<'war_sexual_violence_rome'>
    // crsv/accurately_crsv_ukraine_law [select_one] 15. Which of the following statements most accurately reflects the rights of a survivor of conflict-related sexual violence, as defined by the Law of Ukraine “On the Legal and Social Protection of Persons Affected by Sexual Violence Related to the Armed Aggression of the Russian Federation Against Ukraine”?
    accurately_crsv_ukraine_law: undefined | Option<'accurately_crsv_ukraine_law'>
    // crsv/cal_total_crsv [calculate] Final score : Training on work with people affected by conflict related sexual violence (CRSV)
    cal_total_crsv: string
    // minimum_standards_gbv_emergencies/what_gbv [select_one] 1. What is gender-based violence (GBV)?
    what_gbv: undefined | Option<'what_gbv'>
    // minimum_standards_gbv_emergencies/survivor_centred_principles [select_multiple] 2. Which of the following are part of the survivor centred guiding principles for GBV programming?
    survivor_centred_principles: undefined | Option<'survivor_centred_principles'>[]
    // minimum_standards_gbv_emergencies/standards_gbv_emergencies [select_one] 3. How many minimum standards are part of the Inter Agency Minimum Standards for GBV in Emergencies, and how should they be understood?
    standards_gbv_emergencies: undefined | Option<'standards_gbv_emergencies'>
    // minimum_standards_gbv_emergencies/women_participation_critical [select_one] 4. Why is women’s and girls’ participation critical to GBV programming?
    women_participation_critical: undefined | Option<'women_participation_critical'>
    // minimum_standards_gbv_emergencies/statement_staff_care [select_one] 5. Select the correct statement about staff care and support.
    statement_staff_care: undefined | Option<'statement_staff_care'>
    // minimum_standards_gbv_emergencies/case_management_not_step [select_one] 6. In GBV case management, which of the following is **NOT** a step?
    case_management_not_step: undefined | Option<'case_management_not_step'>
    // minimum_standards_gbv_emergencies/pss_minimum_standards [select_one] 7. Which interventions are part of psychosocial support under the minimum standards?
    pss_minimum_standards: undefined | Option<'pss_minimum_standards'>
    // minimum_standards_gbv_emergencies/misp [select_one] 8. What is the Minimum Initial Service Package (MISP) in GBV programming?
    misp: undefined | Option<'misp'>
    // minimum_standards_gbv_emergencies/collecting_data_followed [select_one] 9. When collecting survivor data, which of the following practices should be followed?
    collecting_data_followed: undefined | Option<'collecting_data_followed'>
    // minimum_standards_gbv_emergencies/coordination_critical_gbv [select_one] 10. Why is coordination critical to GBV programming?
    coordination_critical_gbv: undefined | Option<'coordination_critical_gbv'>
    // minimum_standards_gbv_emergencies/cal_total_minimum_standards_gbv_emergencies [calculate] Final score : Minimum Standards for GBV in Emergencies
    cal_total_minimum_standards_gbv_emergencies: string
    // promoting_gender_equality/tern_unconscious_bias [select_one] 1. Define the term ‘Unconscious Bias’
    tern_unconscious_bias: undefined | Option<'tern_unconscious_bias'>
    // promoting_gender_equality/seeds_bias [select_one] 2. The SEEDS bias model developed by the Neuroleadership Institute provides a framework for understanding and addressing bias. The SEEDS model identifies five key sources of bias:
    seeds_bias: undefined | Option<'seeds_bias'>
    // promoting_gender_equality/three_steps_biases [select_one] 3. List three steps in working with biases:
    three_steps_biases: undefined | Option<'three_steps_biases'>
    // promoting_gender_equality/describes_relationship_stereotypes [select_one] 4. Which statement most accurately describes the relationship between gender stereotypes and the tolerance of violence in society?
    describes_relationship_stereotypes: undefined | Option<'describes_relationship_stereotypes'>
    // promoting_gender_equality/common_characteristic_harassment [select_one] 5. What is the common characteristic of sexual harassment and sexual coercion?
    common_characteristic_harassment: undefined | Option<'common_characteristic_harassment'>
    // promoting_gender_equality/danger_victim_blaming [select_one] 6. Which of the following statements most accurately explains the danger of victim-blaming?
    danger_victim_blaming: undefined | Option<'danger_victim_blaming'>
    // promoting_gender_equality/difference_conflict_interpersonal_relations [select_one] 7. What is the key difference between conflict and violence in the context of interpersonal relations?
    difference_conflict_interpersonal_relations: undefined | Option<'difference_conflict_interpersonal_relations'>
    // promoting_gender_equality/explains_gender_stereotypes [select_one] 8. Which of the following statements most accurately explains the relationship between gender stereotypes and violence?
    explains_gender_stereotypes: undefined | Option<'explains_gender_stereotypes'>
    // promoting_gender_equality/describes_victim_blaming [select_one] 9. Which of the following statements best describes "victim-blaming"?
    describes_victim_blaming: undefined | Option<'describes_victim_blaming'>
    // promoting_gender_equality/example_victim_blaming [select_one] 10. What is an example of victim-blaming?
    example_victim_blaming: undefined | Option<'example_victim_blaming'>
    // promoting_gender_equality/violence_women_international_standards [select_one] 11. What do violence against women and domestic violence have in common according to international standards and Ukrainian legislation?
    violence_women_international_standards: undefined | Option<'violence_women_international_standards'>
    // promoting_gender_equality/gender_discrimination [select_one] 12. What is gender discrimination?
    gender_discrimination: undefined | Option<'gender_discrimination'>
    // promoting_gender_equality/forms_discrimination_prohibited [select_one] 13. Which forms of discrimination are prohibited by Ukrainian law and who can be the perpetrators?
    forms_discrimination_prohibited: undefined | Option<'forms_discrimination_prohibited'>
    // promoting_gender_equality/istanbul_convention_violence_women [select_one] 14. What does the Istanbul Convention say about violence against women?
    istanbul_convention_violence_women: undefined | Option<'istanbul_convention_violence_women'>
    // promoting_gender_equality/no_gender_stereotype [select_one] 15. Which statement is NOT a gender stereotype?
    no_gender_stereotype: undefined | Option<'no_gender_stereotype'>
    // promoting_gender_equality/cal_total_promoting_gender_equality [calculate] Final score : Training on Promoting Gender Equality and Implementing Violence Prevention Standards
    cal_total_promoting_gender_equality: string
    // protection_gbv_im/personal_data [select_one] 1. Personal data refers to any information that can identify an individual.
    personal_data: undefined | Option<'sharing_anonymized_data'>
    // protection_gbv_im/no_personal_data [select_one] 2. Which of the following is NOT an example of personal data?
    no_personal_data: undefined | Option<'no_personal_data'>
    // protection_gbv_im/informed_consent [select_one] 3. “Informed consent” means an individual has been informed how their personal data will be used and has agreed to it.
    informed_consent: undefined | Option<'sharing_anonymized_data'>
    // protection_gbv_im/core_pim_principles [select_multiple] 4. Which of the following are core Protection Information Management (PIM) principles?
    core_pim_principles: undefined | Option<'core_pim_principles'>[]
    // protection_gbv_im/information_defined_purpose [select_one] 5. Information should be collected and used only for a clearly defined purpose.
    information_defined_purpose: undefined | Option<'sharing_anonymized_data'>
    // protection_gbv_im/legal_obligations_data [select_multiple] 6. What are legal/ethical obligations when handling personal data in humanitarian contexts?
    legal_obligations_data: undefined | Option<'legal_obligations_data'>[]
    // protection_gbv_im/personal_data_child [select_one] 7. When collecting personal data from a child (under 18), consent should be obtained from a parent or legal guardian.
    personal_data_child: undefined | Option<'sharing_anonymized_data'>
    // protection_gbv_im/practices_safe_storage [select_multiple] 8. Which practices help ensure safe storage of sensitive protection/GBV data?
    practices_safe_storage: undefined | Option<'practices_safe_storage'>[]
    // protection_gbv_im/personal_data_should [select_one] 9. Personal data should be retained only as long as necessary for its purpose, and then safely deleted or destroyed.
    personal_data_should: undefined | Option<'sharing_anonymized_data'>
    // protection_gbv_im/sharing_anonymized_data [select_one] 10. Sharing anonymized or aggregated data (with no personal identifiers) about GBV cases is generally acceptable, since individuals cannot be identified from it.
    sharing_anonymized_data: undefined | Option<'sharing_anonymized_data'>
    // protection_gbv_im/cal_total_protection_gbv_im [calculate] Final score : Protection & GBV Information Management
    cal_total_protection_gbv_im: string
    // feedback/not_feedback [note] This is an anonymous questionnaire. Your answers will help us improve the quality of future trainings.
    not_feedback: string
    // feedback/overall_satisfied [select_one] Overall, how satisfied are you with the training materials today?
    overall_satisfied: undefined | Option<'overall_satisfied'>
    // feedback/useful_training [select_one] How useful was the training in helping you improve your knowledge and skills in GBV?
    useful_training: undefined | Option<'useful_training'>
    // feedback/rate_facilitator [select_one] How do you rate the performance of facilitator?
    rate_facilitator: undefined | Option<'rate_facilitator'>
    // feedback/provide_suggestions [text] Provide suggestions for improving his/her performance, if any:
    provide_suggestions: string | undefined
    // feedback/overall_training_relevant [select_one] Overall, were the case studies and examples used during the training relevant to the work you do?
    overall_training_relevant: undefined | Option<'overall_training_relevant'>
    // feedback/complaint_feedback_questions [select_one] Do you know how and where you could address your suggestions, comments or complaints related to the work of the Danish Refugee Council, if any?
    complaint_feedback_questions: undefined | Option<'report_employee_requested'>
    // feedback/report_employee_requested [select_one] Do you know how and where to report if a DRC employee requested something from you in exchange for receiving assistance, made you feel uncomfortable in anyway, or insulted you? (misconduct)
    report_employee_requested: undefined | Option<'report_employee_requested'>
    // feedback/comments [text] Use this space to provide any recommendations to improve the training and/or specify any areas that should have been explored in more detail, if applicable:
    comments: string | undefined
  }
  export const options = {
    project_code: {
      ukr000355_dmfa: `UKR-000355 DMFA`,
      ukr000423_echo4: `UKR-000423 ECHO4`,
    },
    topic: {
      gbv_core_concepts: `GBV Core Concepts training`,
      gbv_case_management: `GBV Case Management Training`,
      gbv_basic_concepts_intimate: `GBV- Basic Concepts of Intimate Partner Violence`,
      gbv_ipv: `GBV -  UPD Basic Concepts of Intimate Partner Violence`,
      legal_aspects_gbv: `Legal aspects of GBV in Ukraine`,
      gbv_advanced_concepts_intimate: `GBV- Intimate Partner Violence- Advanced training`,
      girl_shine: `Girl shine`,
      crsv: `Training on work with people affected by conflict related sexual violence (CRSV)`,
      minimum_standards_gbv_emergencies: `Minimum Standards for GBV in Emergencies`,
      promoting_gender_equality: `Training on Promoting Gender Equality and Implementing Violence Prevention Standards`,
      protection_gbv_im: `Protection & GBV Information Management`,
    },
    definition_gender: {
      social: `Gender is the social differences between males and females.`,
      biological: `Gender is the biological differences between males and females.`,
      physical: `Gender is the physical differences between males and females.`,
    },
    causes_gbv: {
      alcohol_misuse: `Alcohol misuse`,
      trauma: `Trauma and psychosocial needs`,
      gender_inequality: `Gender inequality/power imbalance between males and females`,
      abuse_power: `Abuse of power and control`,
      cultural_factors: `Religion and cultural factors`,
      poverty: `Poverty`,
    },
    types_gbv: {
      physical: `Physical`,
      emotional_psychological: `Emotional/psychological`,
      sexual: `Sexual`,
      socio_economic: `Socio-economic`,
      all: `All of the above`,
    },
    principles_working_gbv: {
      confidentiality_safety: `Confidentiality, safety, dignity and self-determination, and non-discrimination.`,
      safety_kindness: `Safety, kindness, freedom, and do no harm.`,
      confidentiality_active: `Confidentiality, active listening, dignity and discrimination.`,
      prioritize_safety: `Prioritize safety & dignity and avoid causing harm.`,
    },
    gender_definition: {
      social_difference: `Gender is the social differences between men and women`,
      biological_difference: `Gender is the biological differences between men and women`,
      physical_difference: `Gender is the physical differences between men and women`,
    },
    complete_gender_definition: {
      child_abuse: `Child abuse`,
      any_gbv_harm: `Any harmful act that is perpetrated against a person’s will, and that is based on socially ascribed (gender) differences between males and females`,
      private_life_harm: `Harmful actions that happen at home within private life`,
      same_gender_harm: `Violence between people of the same gender`,
    },
    root_gbv_cause: {
      alcohol_abuse: `Alcohol abuse`,
      trauma: `Trauma and psychosocial needs`,
      authority_disbalance: `Gender inequality/power imbalance between men and women`,
      culture: `Religious and cultural factors`,
      poverty: `Poverty`,
    },
    survivor_centered_approach_goal: {
      establish_relationships: `Establishing relationships with the survivor`,
      facilitate_safety: `Ensuring the psychological and physical safety of the survivor`,
      build_trust: `Building trust`,
      help_regain_control: `Helping the survivor regain a certain level of stability`,
      all: `All of the above`,
    },
    cm_guiding_principles: {
      right_for_happiness: `Right to happiness`,
      right_for_dignity: `Right to dignity and self-determination`,
      mandatory_reporting: `Mandatory reporting`,
      right_for_confidentiality: `Right to confidentiality`,
      non_discrimination: `Non-discrimination`,
      legal_information: `Legal information`,
      right_for_safety: `Right to safety`,
    },
    confidentiality_maintenance: {
      public_conversations: `Having a conversation in a public place`,
      reveal_data_on_request: `Providing information on request`,
      share_on_consent: `When referring, only the necessary information is shared, and only with the survivor's consent`,
    },
    healing_statements: {
      thanks: `Thank you for telling me`,
      keep_quiet: `Women should stay quiet and silent`,
      i_trust_you: `I believe you`,
      should_be_caused: `It didn’t happen for no reason`,
    },
    informed_consent_conditions: {
      maturity: `Have the ability and maturity to be informed about the services offered and understand their purpose`,
      spouse: `Have a husband/wife or caretaker`,
      legal_ability: `Have the legal ability to give consent`,
    },
    confidential_data_exposure: {
      self_harm_threat: `The survivor threatens to harm themselves`,
      spouse_request: `The survivor's husband comes to the medical facility and asks if his wife has been here`,
      thirteen_yo: `The survivor is 13 years old`,
      missed_scheduled_meeting: `The survivor missed the last meeting with the case manager`,
    },
    case_data_storage: {
      unprotected_device: `On a tablet PC that is not password-protected`,
      locked_cabinet: `In a locked filing cabinet`,
      protected_device: `On a password-protected computer`,
      desktop: `On your desktop`,
    },
    suicide_risk_factors: {
      violence_experience: `Experience of past violence`,
      no_hope: `Feelings of hopelessness`,
      local_trend: `Local suicide epidemics`,
      isolation: `Isolation, feeling disconnected from others`,
      losses: `Losses (family, social, work, or financial)`,
      all: `All of the above`,
    },
    closure_steps: {
      meets_criteria: `Determine if the case meets closure criteria`,
      quick_complete_execution: `Quickly execute the entire action plan`,
      documentation_complete: `Document the Case Closure and the specific reasons for it`,
      secure_storage_provided: `Securely store the Case Closure documents`,
      refer_to_lawyer: `Refer the survivor to a lawyer`,
    },
    supervisor_role: {
      support: `Provide support and piece of advice`,
      staff_training: `Ensure that staff undergo training and are prepared to perform case management duties`,
      alert_to_emergency: `Be ready to consult in emergency situations`,
      staff_penalties: `Apply penalties to case managers if they perform poorly`,
    },
    supervision_features: {
      voluntary: `Voluntary`,
      supportive: `Supportive`,
      educational: `Educational`,
      supervisor_managed: `Managed by the supervisor without involving the case manager`,
    },
    self_help_techniques: {
      exercise: `Exercise`,
      drink_alcohol: `Drinking alcohol`,
      socialize: `Spending time with friends`,
      seek_counseling: `Seeking counseling`,
    },
    sharing_anonymized_data: {
      yes: `True`,
      no: `False`,
    },
    complete_training: {
      yes: `Yes`,
      no: `No`,
    },
    overall_satisfied: {
      very_satisfied: `Very satisfied`,
      satisfied: `Satisfied`,
      not_satisfied: `Not satisfied`,
    },
    useful_training: {
      very_useful: `Very useful`,
      useful: `Useful`,
      somewhat_useful: `Somewhat useful`,
      not_useful: `Not useful`,
    },
    rate_facilitator: {
      excellent: `Excellent`,
      good: `Good`,
      adequate: `Adequate`,
      poor: `Poor`,
    },
    overall_training_relevant: {
      yes: `Yes`,
      some: `Some`,
      no: `No`,
    },
    undefined: {
      yes: `Yes`,
      no: `No`,
      pns: `Prefer not to say`,
    },
    intimate_partner_violence: {
      humanitarian_workers_beneficiaries: `Between humanitarian workers and beneficiaries/affected communities`,
      current_former_partners: `Between current or former partners/spouses`,
      parents_their_children: `Between parents and their children`,
      strangers: `Between strangers`,
    },
    unwanted_behaviour_type: {
      physical_abuse: `Physical abuse`,
      stalking: `Stalking (emotional abuse)`,
      sexual_abuse: `Sexual abuse`,
      socio_economic_abuse: `Socio-economic abuse`,
    },
    example_economic_abuse: {
      harassment_social_media: `Harassment of the victim through social media`,
      hitting_kicking_survivor: `Hitting and kicking the survivor`,
      hiding_banking_information: `Hiding banking information from the survivor`,
      sharing_explicit_pictures: `Sharing explicit pictures or images of the survivor without their consent..`,
    },
    gbv_associated_women: {
      directed_against_women: `Because GBV can only be directed against women`,
      most_survivors_women: `Because most of the survivors are women and girls, and violence arises due to the power imbalance between women and men`,
      men_notexperience_gbv: `Because men do not experience gender-based violence`,
      women_physically_weaker: `Because women are usually physically weaker`,
    },
    first_international_document_fight: {
      universal_declaration_human: `Universal Declaration of Human Rights`,
      convention_elimination: `Convention on the Elimination of All Forms of Discrimination against Women (CEDAW, 1979)`,
      convention_against_torture: `Convention against Torture`,
      istanbul_convention: `Istanbul Convention`,
    },
    report_violence_istanbul_convention: {
      only_survivor: `Only the survivor`,
      any_person_becomes: `Any person who becomes aware of the violence`,
      only_law_enforcement: `Only law enforcement`,
      only_family_members: `Only family members of the survivor`,
    },
    law_enforcement_istanbul_convention: {
      only_accept_reports: `Only accept reports from survivors`,
      respond_immediately: `Respond immediately, provide protection to survivors, and investigate cases quickly and efficiently`,
      review_reports: `Review reports within 30 days`,
      transfer_cases_organizations: `Transfer cases to international organizations`,
    },
    basis_restricting_parental_rights: {
      any_conflicts_parents: `Any conflicts between parents`,
      acts_domestic_violence: `Acts of domestic violence against a child or another person in the presence of the child`,
      improper_childrearing: `Improper child-rearing`,
      parents_psychological_condition: `Parents' psychological condition`,
    },
    actions_signs_domestic_violence: {
      conflict_family_members: `Any conflict between family members`,
      actions_harm_health: `Intentional physical, psychological, or economic actions that harm physical or mental health`,
      disputes_financial_matters: `Any disputes over financial matters`,
      incompatibility_interests: `Incompatibility of interests and behavior types`,
    },
    what_domestic_violence: {
      committed_exclusively_family: `Acts committed exclusively within the family`,
      acts_violence: `Acts of physical, sexual, psychological, or economic violence committed in the family, between relatives, or among other persons who live or have lived together as a family`,
      only_physical_violence: `Only physical violence committed between spouses`,
      conflict_family_members: `Any conflict between family members`,
    },
    measure_immediate_protection: {
      restraining_order: `Restraining order`,
      emergency_protective_order: `Emergency protective order`,
      preventive_work_perpetrator: `Preventive work with the perpetrator`,
      referral_perpetrator_program: `Referral to a perpetrator program`,
    },
    restraining_order_entail: {
      immediate_removal_perpetrator: `Immediate removal of the perpetrator from the survivor’s place of residence`,
      temporary_restriction_communication: `Temporary restriction on communication with the survivor`,
      prohibition_approaching_survivor: `Prohibition of approaching the survivor at any distance`,
      restriction_rights_child: `Restriction of rights regarding the child`,
    },
    safety_planning: {
      financial_planning_process: `A financial planning process`,
      structured_process_preventingdangers: `A structured process for preventingdangers`,
      mechanism_help_survivor: `A mechanism to help the survivor minimize harm done by the perpetrator.`,
      ensuring_career_growth: `A process for ensuring career growth`,
    },
    safety_planning_irrelevant: {
      nolonger_contact_perpetrator: `If the survivor no longer has contact with the perpetrator`,
      afraid_perpetrator: `If the survivor is afraid of the perpetrator`,
      reported_police: `If the survivor has reported to the police`,
      lives_crisis_room: `If the survivor lives in a crisis room`,
    },
    role_social_worker_sp: {
      create_plan_without_survivor: `Create a plan without the survivor's involvement`,
      assess_survivor_resources: `Assess the survivor's resources and jointly develop a plan`,
      full_responsibility_planning: `Take full responsibility for planning`,
      report_incident_police: `Report the incident to the police`,
    },
    does_not_safety_plan: {
      convince_follow_plan: `Convince her to follow the plan`,
      respect_decision: `Respect her decision`,
      leave_without_help: `Leave her without help`,
      report_police: `Report to the police`,
    },
    current_safety_survivor: {
      determine_legal_intervention: `To determine the need for legal intervention`,
      adjust_safety_plan: `To adjust the safety plan if circumstances change`,
      make_independent_decisions: `To enable the survivor to make independent decisions`,
      survivor_psychological_state: `To assess the survivor's psychological state`,
    },
    appropriate_create_plan: {
      assess_psychological_trauma: `Assess the level of psychological trauma`,
      possibility_renewed_contact: `Analyze if there is a possibility of renewed contact or stalking`,
      collect_legal_evidence: `Collect legal evidence against the perpetrator`,
      communicate_survivor_family: `Communicate with the survivor's family`,
    },
    perpetrator_past_experience: {
      important_violence_past_month: `It is only important if violence occurred in the past month`,
      violence_increases_more_future: `Past violence increases the likelihood of more severe violence in the future`,
      past_actions_notmatter: `The perpetrator's past actions do not matter`,
      past_offenses_considered: `Only past offenses are considered`,
    },
    cycle_violence_helpful: {
      protect: `To protect survivors from violence`,
      explain: `To explain the cyclical and repetitive nature of violence`,
      demonstrate: `To demonstrate the consequences of violence`,
      raise: `To raise awareness about different types of violence`,
    },
    reflects_partner_violence: {
      anger: `A way of expressing anger in a relationship`,
      conflicts: `Conflicts arising from misunderstandings between partners`,
      systematic_control: `The systematic use of control and coercion in an intimate relationship`,
      misunderstandings: `Misunderstandings between partners living under the same roof`,
    },
    leave_abusive_partner: {
      step: `Encourages taking a decisive step`,
      conflicts: `Helps avoid future conflicts`,
      shame: `May lead to feelings of shame and low self-esteem`,
      fight: `Increases readiness to fight against the violence`,
    },
    example_control_intimate_relationship: {
      important_decisions: `Getting your partner's agreement on important decisions`,
      financial_support: `Providing financial support to your partner`,
      planning_expenses: `Jointly planning family expenses`,
      circle_friends: `Choosing your partner's circle of friends`,
    },
    indicate_control_relationship: {
      spent_time: `A partner is interested in who is spent time with to ensure safety.`,
      help_difficulties: `A partner is always ready to help during difficulties.`,
      bad_influence: `A partner claims that some friends are a bad influence and suggests avoiding them.`,
      financial_status: `A partner inquires about financial status to better plan the budget.`,
    },
    indicates_manipulation_relationship: {
      consider_opinion: `A partner asks to consider their opinion before making important decisions.`,
      frequently_emphasizes: `A partner frequently emphasizes that achievements are only possible due to their support.`,
      partner_help: `A partner offers help if they see someone struggling.`,
      tries_attend: `A partner tries to attend all events to offer support.`,
    },
    informed_exact_location: {
      sign_concern: `It is a sign of concern for well-being.`,
      better_plan_time: `It suggests a desire to better plan time for shared activities.`,
      deep_interest: `It is a sign of deep interest in feelings and hobbies.`,
      control_actions: `It is an attempt to control actions and limit independence.`,
    },
    insists_leaving_job: {
      genuine_care: `Genuine care about health and a desire for more time to be spent on rest.`,
      protect_stress: `An attempt to protect from work-related stress.`,
      limit_financial: `A potential effort to limit financial independence and social connections.`,
      more_opportunities: `An effort to create more opportunities for shared activities.`,
    },
    partner_know_better: {
      experience_handling: `Knowledge and experience in handling similar situations.`,
      concern_wellbeing: `Concern for well-being and a desire to help avoid mistakes.`,
      limit_independence: `A method to limit independence and reduce autonomy.`,
      support_decisions: `A desire to provide support during difficult decisions`,
    },
    too_sensitive: {
      sign_care: `A sign of care about emotional well-being.`,
      way_help: `A way to help in learning emotional control.`,
      possible_manipulation: `Possible manipulation to create doubt about personal feelings.`,
      attempt_teach: `An attempt to teach better emotional expression`,
    },
    stop_communicating_friends: {
      concern_relationship: `Concern for the relationship due to possible negative influence from friends.`,
      trust_issues: `A signal of trust issues and an attempt to limit the social circle.`,
      effort_show: `An effort to show more care than the friends.`,
      suggestion_help: `A suggestion to help avoid conflicts.`,
    },
    indicate_manipulation_relationship: {
      giving_gifts: `Giving expensive gifts after arguments to improve mood.`,
      resolved_intimate: `Claiming that conflicts can only be resolved in intimate settings.`,
      apologies_emotions: `Demanding apologies for emotions because "anger was provoked."`,
      avoiding_arguments: `Avoiding arguments by suppressing negative feelings`,
    },
    partner_insists_financial: {
      family_budget: `It could be an attempt to keep the family budget under control.`,
      fair_honest: `It may indicate a desire to be fair and honest.`,
      personal_spending: `It reflects a desire to control personal spending and limit financial freedom.`,
      financial_wellbeing: `It is a sign of readiness to care for the other person's financial well-being`,
    },
    compares_someone_others: {
      personal_developmen: `A desire to encourage personal development by motivating improvement.`,
      achieving_life: `A sign of care about achieving success in life.`,
      hidden_manipulation: `Hidden manipulation causing doubts about self-worth and dependence on the partner’s opinion.`,
      personal_ideals: `A wish for growth based on personal ideals and expectations.`,
    },
    frequently_criticizes_appearance: {
      honesty: `Honesty and a desire for the best look.`,
      care_appearance: `Care about appearance in various situations.`,
      criticism_control: `Using criticism as a way to control and enforce meeting the partner’s standards.`,
      high_standards: `A reflection of high standards considered essential in the relationship.`,
    },
    partner_knowing_passwords: {
      ensure_safety: `A desire to ensure safety and be able to help if necessary.`,
      share_everything: `An intention to share everything in the relationship without secrets.`,
      control_actions: `A way to control actions and limit personal space.`,
      interest_happening: `Interest in what is happening and wanting to stay informed.`,
    },
    who_talked_phone: {
      learn_more: `A desire to learn more about social life and interactions.`,
      personal_elationships: `Interest in personal relationships and contacts.`,
      control_interactions: `An attempt to control interactions with others, reducing social activity.`,
      protect_conflicts: `A way to protect from potential conflicts or troubles.`,
    },
    consent_intimacy_relationship: {
      consent_voluntary: `Consent is voluntary if given without violence.`,
      consent_automatic: `In long-term relationships, consent is automatic if both partners have a stable history of intimacy.`,
      not_refuse: `Consent is voluntary if the partner did not refuse, even without explicitly saying "yes."`,
      clear_informed: `Consent is voluntary if it is clear, informed, and given without pressure at any stage of the relationship.`,
    },
    longterm_relationship_intimacy: {
      yes_regular_intimate: `Yes, if it is part of regular intimate life, discussion is unnecessary.`,
      no_clear_consent: `No, even in long-term relationships, every situation requires clear consent without expectations.`,
      possible_partner_objected: `It is possible if neither partner has objected before.`,
      consent_automatic: `Consent is automatic if partners live together and maintain closeness.`,
    },
    report_employee_requested: {
      yes: `Yes, completely`,
      mostly: `Mostly yes`,
      not_really: `Not really`,
      not_all: `Not at all`,
      dk: `Don’t know`,
      no_answer: `No answer`,
    },
    oblast_training: {
      crimea: `Autonomous Republic of Crimea`,
      cherkaska: `Cherkasy`,
      chernihivska: `Chernihiv`,
      chernivetska: `Chernivtsi`,
      dnipropetrovska: `Dnipropetrovsk`,
      donetska: `Donetsk`,
      'ivano-frankivska': `Ivano-Frankivsk`,
      kharkivska: `Kharkiv`,
      khersonska: `Kherson`,
      khmelnytska: `Khmelnytskyi`,
      kirovohradska: `Kirovohrad`,
      kyivska: `Kyiv`,
      luhanska: `Luhansk`,
      lvivska: `Lviv`,
      mykolaivska: `Mykolaiv`,
      odeska: `Odesa`,
      poltavska: `Poltava`,
      rivnenska: `Rivne`,
      sumska: `Sumy`,
      ternopilska: `Ternopil`,
      vinnytska: `Vinnytsia`,
      volynska: `Volyn`,
      zakarpatska: `Zakarpattia`,
      zaporizka: `Zaporizhzhia`,
      zhytomyrska: `Zhytomyr`,
      sevastopol: `Sevastopol`,
    },
    what_girl_shine: {
      intervention_package: `Girlshine is an humanitarian intervention package that targets adolescents, implemented by any humanitarian actor`,
      intervention_adolescents: `Girlshine is a gender based violence intervention for adolescents girls in humanitarian setting and pre understanding of GBV core concept are needed for humanitarian actor to implement the package`,
      training_package: `Girlshine is a sexual and reproductive health training package for adolescents girls in humanitarian sectors`,
    },
    age_corresponding_target: {
      '10_19': `10–19`,
      '14_19': `14–19`,
      '15_18': `15–18`,
    },
    responsibilities_adolescents_girls: {
      dismantle_system: `Try to dismantle the system of oppression that prevents girls to have access to services;`,
      promoters_information: `Be promoters of clear and reliable information;`,
      ensuring_gbv_services: `Ensuring GBV services are targeting just women and girls;`,
      ensuring_gbv_programming: `Ensure a GBV programming is active in the geographical location while Girlshine is roll-out;`,
      implementing_targeted_programming: `Implementing targeted programming for adolescent girls that can increase their social networks, increase their access to critical, life-saving services and provide a space where they feel safe`,
    },
    girls_information_srh: {
      divorced: `Divorced girls`,
      survivors_gbv: `Girls survivors of GBV`,
      armed_conflict: `Girls direct involved with an armed conflict`,
      young_girls: `Young girls who are not sexually active`,
    },
    factors_influence_experience: {
      social_cultural_norms: `Social and cultural norms;`,
      relationships: `Relationships and changing in habits during adolescence;`,
      hormones: `Hormones;`,
      gender: `Gender;`,
      contextual_issues: `Contextual issues (such as conflict, access to service, movement restrictions, among others)`,
    },
    gender_discrimination_statistically: {
      girls: `Girls experience certain forms of violence at much higher rates than boys (for example, early marriage)`,
      boys: `Boys experience certain forms of violence at much higher rates than girls (for example, early marriage)`,
      average: `On average, Girls experience certain forms of violence as often as boys (for example, early marriage)`,
    },
    sessions_disposed_specific: {
      facilitators_adapt_modules: `Facilitators are encouraged to adapt the modules and change the order depending on specific needs;`,
      session_specifically_constructed: `Every session is specifically constructed following skills that girls can have during the previous session. The order is important.`,
    },
    correct_order_gs: {
      trust_solidarity_social: `Trust, Solidarity, Social & Emotional Skills, Safety, Health & Hygiene, Visioning`,
      trust_social_skills: `Trust, Social & Emotional Skills, Health & Hygiene, Safety, Solidarity, Visioning`,
      solidarity_safety_social: `Solidarity, Safety, Social & Emotional Skills, Health and Hygiene, Visioning, Trust`,
    },
    outreach_activities_fundamental: {
      girls_challenge: `Girls can face additional challenges to access information and access services within the community without tailored programming;`,
      media_needs: `Media needs to know that Girl Shine activities will start to ensure visibility of the organization;`,
      working_adolescents: `Working with adolescents is a part of a women centered intervention`,
    },
    structure_gs_session: {
      depending_sessions: `Depending on the sessions, you can have ‘breaking the ice’ stories, facilitators sharing moment on their personal experience, and direct discussion about GBV with girls in different order`,
      start_practical_activities: `The sessions start with practical activities to make girls feel more active`,
      each_session_same: `Each session has the same structure: welcome story circle, an explore sessions to in deep in the content, activity part and wrap up`,
    },
    facilitators_level_comfort: {
      yes: `Yes, because the comfort level of the facilitators could be a barrier to open up conversation on the topic and girls feeling on safety and acceptance`,
      no: `No, because the facilitator can feel uncomfortable in the beginning but gaining confidence and comfort over and over the sessions`,
    },
    trust_module_first: {
      facilitators_trust: `Facilitators need to trust themselves that they know the answer of any possible questions before starting implementing the other sessions;`,
      level_trust: `The level of trust that the facilitator succeeds in creating within the group will determine the feeling of acceptance and safety that girls will have during the following sessions`,
    },
    fundamental_principle_sexual: {
      contraceptives: `Contraceptives`,
      humanitarian_principles: `UN humanitarian principles`,
      consent: `Consent`,
    },
    adolescents_rights_sexual: {
      adolescent_girls: `Adolescent girls have the right to develop a positive sense of their own bodies and sexuality. ​`,
      right_free_abuse: `They have the right to be free of abuse and inappropriate touching. ​`,
      adolescents_grow: `As adolescents grow and develop their capacities, their rights and responsibilities continue to evolve. ​`,
      young_people: `Young people have the right to obtain information to protect their health, including their sexual and reproductive health.`,
    },
    adolescent_girls_positive: {
      intimacy: `Intimacy`,
      sexual_health: `Sexual health`,
      sexual_identity: `Sexual identity`,
    },
    udhr_realizations_sexual: {
      true: `True`,
      false: `False`,
    },
    examples_self_harm: {
      hitting: `Hitting`,
      cutting: `Cutting`,
      screaming_family: `Screaming toward your family members`,
      biting: `Biting`,
      dnw_school: `Do not want to go to school`,
    },
    signs_self_harm: {
      emotional: `Emotional signs;`,
      physical: `Physical signs`,
      both: `Both emotional and physical signs`,
    },
    case_more_signs: {
      build_time_end: `Build time in at the end of the session to allow girls to approach individually`,
      suggest_how: `Suggest her how you think it would be better for her to address her situation because of your personal experience`,
      be_available: `Be available (this includes body language and facial expression)`,
      refer_situation: `Refer her potential situation after the session to an adult that can ensure consent and access to services`,
      not_ask_girl: `Do not ask the girl to discuss what happened in detail`,
      explain_there: `Explain that there is someone available for her to talk to`,
      think_about: `Think about the process for making this referral and be sure that the girl feels comfortable and understands this`,
    },
    participant_shares_personal: {
      session_confidential: `The session is very confidential, so the facilitator should try to give an answer even though be sure about the impact of that;`,
      facilitator_confident_referral: `The facilitator should be confident about their safe referral’s capacities, and that supervisor and case worker could always support with the step forward.`,
    },
    facilitator_feel_implement: {
      yes_prepared_answer: `Yes, I feel prepared to answer any question`,
      yes_comfortable: `Yes, I feel comfortable with the content and understand that could be questions raised by girls that I would prefer to analyze with the team and supervisors to give the more adapted answer`,
      no_uncomfortable: `No, I still feel uncomfortable about some content and would like to revise them with the supervisor`,
    },
    what_ipv: {
      physical_force: `Using physical force to gain control over a partner`,
      forcing_sex: `Forcing sex without the partner's consent`,
      psychological_pressure: `Any form of psychological pressure or humiliation within intimate relationships`,
      all: `All of the above`,
    },
    examples_emotional_abuse: {
      jokes_degrading: `A partner often jokes in a degrading way, calling it "harmless irony"`,
      ignores_needs: `One partner deliberately ignores the needs and emotions of the other for a long period`,
      constant_threats: `Constant threats to leave the partner without visible reasons`,
      all: `All of the above can indicate emotional abuse`,
    },
    reflects_physical_abuse: {
      raises_voice: `A partner raises their voice and slams doors during a conflict`,
      pushes: `A partner pushes, hits, or restricts the movements of the other`,
      ignoring: `A partner avoids conversations after arguments, ignoring the other`,
      abuses_alcohol: `One partner abuses alcohol, creating tension in the relationship`,
      forces_gym: `A partner forces the other to work out at the gym`,
    },
    describes_violation_consent: {
      communicate: `Both partners communicate openly and agree to sexual activity`,
      pressured_engage: `One partner feels pressured to engage in sexual activity to avoid conflict`,
      check_each: `Both partners check in with each other and respect each other's boundaries`,
      expresses_wait: `One partner expresses a desire to wait, and the other agrees without pressure`,
    },
    violence_affect_mental: {
      increase_stress: `Could increase stress and anxiety levels`,
      cause_depression: `Could cause depression and loss of self-esteem`,
      ptsd: `Could contribute to the development of post-traumatic stress disorder (PTSD)`,
      all: `All of the above`,
    },
    barriers_survivors_gbv: {
      survivors_believe_family: `Survivors believe that all problems should be solved within the family`,
      fear_judgment: `Fear of judgment, distrust of the system or concerns about personal safety and confidentiality`,
      survivors_believe_injuries: `Survivors believe that help is available only in cases of serious injuries`,
      survivors_fear: `Survivors fear that they will not be taken seriously or will be accused of exaggerating`,
      all: `All of the above`,
    },
    strategies_support_ipv: {
      emotional_support: `Providing emotional support and a safe environment`,
      psychological_support: `Psychological support and help in changing circumstances`,
      informing: `Informing about available social and legal resources`,
      all: `All of the above`,
    },
    example_emotional_manipulation: {
      really_love: `"If you really love me, you'll do this for me"`,
      understand: `"I understand you and want to help, but I don't have the opportunity right now"`,
      respect: `"I respect your decision, but I think differently"`,
      proud: `"You should be proud of yourself, and I will support you"`,
    },
    support_survivor_not_ready_leave: {
      acknowledge_experiences: `Acknowledge their experiences, validate their feelings, and let them know you are available to support them whenever they are ready.`,
      encourage_leave: `Encourage them to leave as soon as possible for their own protection.`,
      involve_others: `Involve others to help persuade the survivor to take action.`,
      stop_offering: `Stop offering support to avoid enabling the abusive situation.`,
    },
    confidentiality_communicating: {
      safe_data_storage: `Safe data storage`,
      confidential_communication: `Confidential communication`,
      staff_training: `Staff training`,
      developing_policies: `Developing policies and procedures to protect confidentiality`,
      all: `All of the above`,
    },
    principle_supporting_ipv: {
      encourage_police: `Encourage them to report to the police immediately`,
      leave_relationship: `Tell them to leave the relationship as soon as possible`,
      support_own_decisions: `Support them in making their own informed decisions`,
      advise_medical: `Advise them to seek medical care`,
      tell_friend: `Tell a trusted friend or family member on their behalf`,
    },
    principle_self_determination: {
      encouraging: `It means encouraging survivors to follow the advice of service providers to ensure their safety.`,
      allowing: `It means allowing survivors to make their own informed decisions about their lives, support options, and recovery process.`,
      must: `It means service providers must always involve family members in decision-making to ensure a survivor’s best interest.`,
      ensuring: `It means ensuring the survivor follows legal procedures as advised, regardless of their personal preferences.`,
    },
    situations_ipv: {
      frequently_views: `A person frequently views another person’s social media posts`,
      shows_up_uninvited: `A person repeatedly shows up uninvited at someone’s home, workplace, or other locations`,
      more_attention: `One partner asks for more attention in the relationship`,
      critical_comments: `A person occasionally makes critical comments in public`,
    },
    informed_consent_services_ipv: {
      assumed_first_contact: `Consent is assumed after the first contact with the survivor`,
      family_members: `Family members give permission on behalf of the survivor`,
      consent_once: `Consent is requested once and applies to all future services`,
      voluntarily_agrees: `The survivor voluntarily agrees to services after receiving clear  information about all available options, potential risks, and benefits and consent is obtained throughout the process`,
      verbal_consent: `Verbal consent is enough, even if the purpose of services and data use is not explained`,
    },
    respond_not_want_police: {
      convince_costs: `Convince her at all costs, because her life depends on it`,
      respect_choice: `Respect her choice and provide support`,
      condemn_inaction: `Condemn her inaction`,
      contact_police_yourself: `Contact the police yourself`,
      stop_working: `Stop working with the survivor since she is not ready to do anything`,
    },
    accurately_crsv: {
      indirect_link: `CRSV can have an indirect link to the conflict and be used as a tool of warfare`,
      isolated_act: `CRSV is an isolated act of violence unrelated to military tactics`,
      always_rape: `CRSV always involves rape within active combat zones`,
      violence_women: `CRSV refers exclusively to violence against women during armed conflict`,
    },
    violence_war_crime: {
      unlawful_act: `The unlawful act is committed by a civilian`,
      connection_conflict: `A connection to an armed conflict`,
      medical_report: `The presence of a medical report`,
      complaint_survivor: `A formal complaint filed by the survivor`,
    },
    characteristic_crime_humanity: {
      widespread_violence: `Widespread violence during combat operations`,
      destroy_group: `Intent to destroy a specific ethnic group`,
      physical_harm: `Physical harm inflicted on the victim`,
      widespread_attack: `Committed as part of a widespread or systematic attack against a civilian population`,
    },
    not_crsv_case: {
      rape_conflict_zone: `Rape in a conflict zone by an armed group member`,
      sexual_humiliation: `Sexual humiliation at a checkpoint`,
      rape_soldier_wife: `Beating and rape of a soldier’s wife after his return from deployment`,
      torture_prisoners: `Torture of prisoners of war involving sexual elements`,
    },
    vicarious_trauma: {
      traumatic_experience: `It results from one’s own traumatic experience`,
      professional_misconduct: `It is a sign of professional misconduct`,
      empathizing_trauma: `It is a consequence of empathizing with another person’s trauma`,
      work_exhaustion: `It is regular work-related exhaustion`,
    },
    vicarious_trauma_accurate: {
      develop_empathy: `It can develop in anyone with high empathy`,
      personal_weakness: `It is a sign of personal weakness`,
      lack_professional: `It arises due to a lack of professional training`,
      own_trauma: `It is a result of one’s own trauma`,
    },
    purpose_informed_consent: {
      professional_liability: `To release the professional from liability`,
      legal_regulations: `To explain legal regulations`,
      requirement_court: `A formal requirement for the court`,
      control_situation: `To give the person control over the situation and the ability to choose`,
    },
    describes_principle_confidentiality: {
      data_stored_paper: `Data is stored in paper format`,
      no_information_shared: `No information is shared without the person’s informed consent`,
      professionals_all_information: `Professionals have access to all information`,
      police_full_access: `The police have full access to the case`,
    },
    goal_survivor_centered: {
      ensuring_safety: `Ensuring safety, dignity, and control over one’s own decisions`,
      achieving_compensation: `Achieving compensation through the court`,
      increasing_effectiveness: `Increasing the effectiveness of investigative actions`,
      legal_assessment: `Providing a legal assessment of the crime`,
    },
    choose_communicating_survivors: {
      tell_everything: `“Tell me everything that happened to you, in detail and immediately”`,
      support_you: `“I am here to support you. You decide what and when to talk about”`,
      know_hurts: `“I know how much it hurts, this is terrible”`,
      important_case: `“This is important for handling your case — don’t stay silent”`,
    },
    emotional_stabilization_survivors: {
      stabilization_automatically: `Stabilization happens automatically over time`,
      medical_certificate: `The main task is to provide a medical certificate`,
      stabilization_prerequisite: `Emotional stabilization is a prerequisite for access to resources and justice`,
      not_responsibilit: `Stabilization is not the responsibility of a humanitarian worker`,
    },
    phrases_principles_sensitive: {
      tell_everything: `“Tell everything, don’t be afraid — we need to know the truth”`,
      understand_you: `“I understand you. I would also find it very difficult in such a situation”`,
      quickly_document: `“Let’s quickly document it so you don’t forget the details”`,
      respect_decision: `“I respect your decision to speak or remain silent. You decide what and when to share”`,
    },
    determine_situation_crsv: {
      private_criminal: `No, because this is a private criminal offense`,
      violence_person: `Yes, because the violence was committed by a person connected to the conflict, in the relevant territory`,
      survivor_not_participant: `No, because the survivor is not a participant in the armed conflict`,
      crime_documented: `Yes, only if the crime was documented by law enforcement`,
    },
    war_sexual_violence_rome: {
      no_resistance: `If there was no resistance, it is not considered violence`,
      consent_occupation: `Consent under occupation is considered voluntary`,
      consensual_sexual: `Consensual sexual acts in armed conflict are not prosecuted`,
      consent_conditions: `Sexual consent under conditions of violence or fear is not considered valid`,
    },
    accurately_crsv_ukraine_law: {
      only_medical: `The survivor is entitled only to medical assistance at their place of residence and compensation following a court verdict.`,
      immediate_reparations: `The survivor is entitled to immediate interim reparations, including access to information about their rights, comprehensive rehabilitation, a one-time monetary payment, as well as guarantees of dignity, free legal aid, social services, and temporary shelter.`,
      limited_participation: `The survivor’s rights are limited to participation in criminal proceedings and giving testimony in court.`,
      reparations_survivors: `Reparations for survivors of sexual violence are only foreseen in international law and are not regulated by Ukrainian legislation.`,
    },
    what_gbv: {
      violence_targets_men: `Violence that only targets men.`,
      acts_cause: `Acts that cause physical, sexual or mental harm based on socially ascribed differences (sex, gender).`,
      violence_schools: `A form of violence that happens only in schools.`,
      none: `None of the above.`,
    },
    survivor_centred_principles: {
      safety: `Safety.`,
      confidentiality: `Confidentiality.`,
      discrimination_gender: `Discrimination based on gender.`,
      respect: `Respect.`,
    },
    standards_gbv_emergencies: {
      five: `Five standards that can be implemented separately.`,
      ten: `Ten standards that can be implemented in any order.`,
      sixteen: `Sixteen standards that are interrelated and should be understood as a complete set of interventions.`,
      twenty: `Twenty standards that are optional.`,
    },
    women_participation_critical: {
      leads: `It leads to more effective humanitarian outcomes and restores dignity.`,
      improves_data: `It improves data accuracy and supports risk mitigation.`,
      builds_community: `It builds community resilience.`,
      all: `All of the above.`,
    },
    statement_staff_care: {
      no_unique_threats: `GBV programme staff face no unique threats and do not need special support.`,
      staff_care_not_important: `Staff care is not important if volunteers are available.`,
      need_training: `Staff working on GBV programmes need training, supervision, and self‑care to maintain their well‑being and service quality.`,
      staff_well_being: `Staff well‑being is only important during non‑emergency times.`,
    },
    case_management_not_step: {
      introduction: `Introduction and engagement.`,
      assessment: `Assessment.`,
      punishment_perpetrator: `Immediate punishment of the perpetrator.`,
      action_planning: `Case action planning.`,
    },
    pss_minimum_standards: {
      legal_advice: `Providing legal advice only.`,
      recreational_activities: `Recreational activities and structured groups for survivors and families.`,
      building_shelters: `Building physical shelters for survivors.`,
      none: `None of the above`,
    },
    misp: {
      sexual_reproductive_health: `A standard of care that provides essential sexual and reproductive health services at the onset of an emergency to save lives and prevent morbidity.`,
      financial_aid: `A financial aid package for survivors of GBV.`,
      training_volunteers: `A training programme for volunteers.`,
      international_database_gbv: `An international database of GBV cases.`,
    },
    collecting_data_followed: {
      identifiable_information: `Collect as much identifiable information as possible and share it widely.`,
      informed_consent: `Collect data only with informed consent and protect it; share only when authorized and necessary.`,
      skip_data_collection: `Skip data collection to avoid any responsibilities.`,
      use_data_publicity: `Use survivor data solely for publicity.`,
    },
    coordination_critical_gbv: {
      service_delivery: `It facilitates service delivery and promotes a common understanding of GBV issues among humanitarian actors.`,
      identify_gaps: `It helps identify gaps and avoid duplication.`,
      improves_monitoring: `It improves monitoring and data accuracy.`,
      all: `All of the above.`,
    },
    difficulty_usual_language: {
      no: `NO – no difficulty`,
      yes_some: `YES – some difficulty`,
      yes_lot: `YES – a lot of difficulty`,
      cannot_all: `Cannot do at all`,
    },
    tern_unconscious_bias: {
      automatic_reactions: `Automatic reactions triggered by our brain when we quickly judge and evaluate people and situations`,
      stereotypes: `Stereotypes that we consciously use to classify people`,
      negative_thoughts: `Negative thoughts that we form about others after carefully analysing their behaviour.`,
      random_reactions: `Random reactions that arise after an emotional outburst.`,
    },
    seeds_bias: {
      similarity: `By Similarity. By Expedience. By Experience. By Distance. By Safety`,
      trust: `By Trust. By Intuition. By Conflict. By Reputation. By Flexibility`,
      situation: `By Situation. By Effectiveness. By Expertise. By Design. By Systemic`,
      status: `By Status. By Authority. By Hierarchy. By Regionality. By Culture`,
    },
    three_steps_biases: {
      identification: `Identification, analysis, elimination.`,
      awareness: `Awareness, understanding, transformation.`,
      acceptance: `Acceptance, labelling, mitigation.`,
      recognition: `Recognition, confrontation, rethinking.`,
    },
    describes_relationship_stereotypes: {
      reinforce_power: `Gender stereotypes reinforce power inequalities, creating an environment that justifies violence`,
      mainly_affect: `Gender stereotypes mainly affect only economic roles and are unrelated to violence`,
      reduce_social: `Gender stereotypes reduce social tension by assigning predictable roles to each gender`,
      explain_individual: `Gender stereotypes explain individual psychological differences but do not affect the structure of violence`,
    },
    common_characteristic_harassment: {
      blackmail_using: `Blackmail using official position`,
      unwanted_actions: `Unwanted actions for the survivor`,
      mandatory_sexual: `Mandatory sexual contact`,
      use_physical: `Use of physical violence`,
    },
    danger_victim_blaming: {
      can_lead: `It can lead to biased investigations and the denial of the perpetrator’s responsibility`,
      undermines_confidence: `It undermines the confidence of the victim but has no significant impact on the justice system`,
      increases_conflicts: `It increases conflicts between different groups but is not relevant to individual cases of violence`,
      cultural_norm: `It is a cultural norm that does not affect access to protection or justice`,
    },
    difference_conflict_interpersonal_relations: {
      conflict_implies_absence: `Conflict implies the absence of control, whereas violence is always aimed at control or domination`,
      conflict_resolved_compromise: `Conflict can always be resolved through compromise, violence can never be`,
      violence_escalation_conflict: `Violence is only an inevitable escalation of conflict`,
      conflict_occurs_parties: `Conflict always occurs between equal parties, while violence occurs between unequal parties`,
    },
    explains_gender_stereotypes: {
      reduce_inequality: `Gender stereotypes help reduce inequality and conflicts`,
      contribute_justification: `Gender stereotypes contribute to the justification and reproduction of violent behavior patterns`,
      no_impact: `Gender stereotypes have no impact on manifestations of violence`,
      cultural_context: `Gender stereotypes exist only in a cultural context and are not related to practice`,
    },
    describes_victim_blaming: {
      protecting_victim: `The use of procedures aimed at protecting the victim`,
      blame_victim: `The tendency to blame the victim for the violence committed against them`,
      determining_perpetrator: `Determining the perpetrator’s responsibility for the committed acts`,
      psychological_support: `Providing psychological support to the survivor`,
    },
    example_victim_blaming: {
      circumstances_crime: `Asking about the circumstances of the crime to document evidence`,
      survivor_provoked: `Assuming that the survivor provoked the assault by their behavior or clothing`,
      access_medical: `Ensuring the survivor has access to medical and legal assistance`,
      survivor_rights: `Informing the survivor about their rights`,
    },
    violence_women_international_standards: {
      against_women: `Violence against women and domestic violence are human rights violations, arise from inequality between men and women, and from gender discrimination`,
      criminal_offenses: `Are classified as criminal and administrative offenses but are unrelated to human rights`,
      private_disputes: `Are considered private family disputes to be resolved through the police`,
      forms_antisocial: `Are considered forms of antisocial behavior but are not defined by law as crimes or offenses`,
    },
    gender_discrimination: {
      differential_treatment: `Any form of differential treatment of individuals based on sex, regardless of whether such difference is justified by law`,
      difference_rights: `Any difference in rights between men and women, even if it has a legitimate purpose`,
      situation_individual: `A situation in which an individual or group of individuals is restricted in the recognition, exercise, or enjoyment of rights, freedoms, or privileges based on sex, except when such restrictions have a legitimate purpose and are proportionate`,
      restriction_rights: `Any restriction of rights based on sex that arises exclusively in the context of labor relations`,
    },
    forms_discrimination_prohibited: {
      direct_indirect_discrimination: `Only direct and indirect discrimination are prohibited; perpetrators can only be state authorities and their officials`,
      all_forms_discrimination: `All forms of discrimination are prohibited – direct, indirect, incitement to discrimination, and harassment; perpetrators can include state authorities, local governments and their officials, as well as legal entities and individuals`,
      direct_restriction_rights: `Only direct restriction of rights is prohibited; harassment and incitement are not considered forms of discrimination`,
      all_forms_labor_relations: `All forms of discrimination are prohibited, but only in labor relations and only by employers`,
    },
    istanbul_convention_violence_women: {
      arises_individual_conflicts: `Violence arises only from individual conflicts between people`,
      violence_structural_character: `Violence has a structural character and serves as a social mechanism supporting the subordinate position of women compared to men`,
      violence_affects_equally: `Violence affects men and women equally in all areas of life`,
      eliminated_criminal_punishment: `Violence can be completely eliminated only through criminal punishment`,
    },
    no_gender_stereotype: {
      real_man: `A real man should not show weakness and cannot be a victim`,
      women_mentally: `Women are mentally more vulnerable than men`,
      men_show_emotions: `Men should not show emotions`,
      violence_happen_anyone: `Violence can happen to anyone, regardless of sex/gender`,
    },
    no_personal_data: {
      full_name: `An individual’s full name`,
      phone_number: `Phone number or email address`,
      national_id: `National ID or passport number`,
      statistic: `A statistic like “35% of surveyed people need shelter”`,
    },
    core_pim_principles: {
      no_harm: `Do No Harm`,
      collect_dat_purpose: `Collect data without a specific purpose`,
      informed_consent: `Informed consent and confidentiality`,
      coordination_collaboration: `Coordination and collaboration`,
    },
    legal_obligations_data: {
      obtain_informed_consent: `Obtain informed consent from the individual before collecting their data`,
      keep_personal_data: `Keep personal data secure from unauthorized access`,
      share_personal_data: `Share personal data freely with any partners who request it`,
      use_data_only: `Use the data only for the purpose for which it was collected`,
    },
    practices_safe_storage: {
      store_paper: `Store paper forms with personal data in a locked cabinet, accessible only to authorized staff`,
      password_protect: `Password-protect or encrypt electronic files containing sensitive data`,
      share_login: `Share login passwords with the whole team to ensure everyone can access the data`,
      limit_access: `Limit access to sensitive data only to staff who need that information for their work`,
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
      survivor_centered_approach_goal: _.survivor_centered_approach_goal?.split(' '),
      cm_guiding_principles: _.cm_guiding_principles?.split(' '),
      healing_statements: _.healing_statements?.split(' '),
      informed_consent_conditions: _.informed_consent_conditions?.split(' '),
      confidential_data_exposure: _.confidential_data_exposure?.split(' '),
      case_data_storage: _.case_data_storage?.split(' '),
      suicide_risk_factors: _.suicide_risk_factors?.split(' '),
      closure_steps: _.closure_steps?.split(' '),
      supervisor_role: _.supervisor_role?.split(' '),
      supervision_features: _.supervision_features?.split(' '),
      self_help_techniques: _.self_help_techniques?.split(' '),
      responsibilities_adolescents_girls: _.responsibilities_adolescents_girls?.split(' '),
      girls_information_srh: _.girls_information_srh?.split(' '),
      factors_influence_experience: _.factors_influence_experience?.split(' '),
      adolescents_rights_sexual: _.adolescents_rights_sexual?.split(' '),
      adolescent_girls_positive: _.adolescent_girls_positive?.split(' '),
      examples_self_harm: _.examples_self_harm?.split(' '),
      case_more_signs: _.case_more_signs?.split(' '),
      survivor_centred_principles: _.survivor_centred_principles?.split(' '),
      core_pim_principles: _.core_pim_principles?.split(' '),
      legal_obligations_data: _.legal_obligations_data?.split(' '),
      practices_safe_storage: _.practices_safe_storage?.split(' '),
    }) as T
}
