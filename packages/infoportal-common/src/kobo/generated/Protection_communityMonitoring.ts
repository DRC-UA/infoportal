export namespace Protection_communityMonitoring {
  export type Option<T extends keyof typeof options> = keyof (typeof options)[T]
  // Form id: aQHBhYgevdzw8TR2Vq2ZdR
  export interface T {
    start: string
    end: string
    // introduction/date [date] Date
    date: Date | undefined
    // introduction/staff_to_insert_their_DRC_office [select_one] DRC office
    staff_to_insert_their_DRC_office: undefined | Option<'staff_to_insert_their_DRC_office'>
    // introduction/staff_code [select_one] Staff code (facilitator)
    staff_code: undefined | Option<'staff_code_001'>
    // introduction/staff_code_001 [select_one] Staff code (notetaker)
    staff_code_001: undefined | Option<'staff_code_001'>
    // introduction/ben_det_oblast [select_one] Select oblast
    ben_det_oblast: undefined | Option<'ben_det_oblast'>
    // introduction/ben_det_raion [select_one] Select raion
    ben_det_raion: undefined | string
    // introduction/ben_det_hromada [select_one] Select hromada
    ben_det_hromada: undefined | string
    // introduction/ben_det_hromada_001 [select_one_from_file] Specify settlement/village/city neighborhood
    ben_det_hromada_001: string
    // introduction/ben_det_type_site [select_one] Type of site
    ben_det_type_site: undefined | Option<'ben_det_type_site'>
    // gi/activity [select_one] Which activity have you conducted?
    activity: undefined | Option<'activity'>
    // gi/pmt_npc [select_one] Is it a PMT KII (NPC)?
    pmt_npc: undefined | Option<'pmt_interviewed_before'>
    // gi/pmt_interviewed_before [select_one] Have they been interviewed before?
    pmt_interviewed_before: undefined | Option<'pmt_interviewed_before'>
    // gi/informant_role [select_one] Key informant role
    informant_role: undefined | Option<'informant_role'>
    // gi/informant_role_other [text] If "Other", please specify
    informant_role_other: string | undefined
    // gi/informant_gender [select_one] Key informant gender
    informant_gender: undefined | Option<'hh_char_hh_det_gender'>
    // gi/informant_age [integer] Key informant age
    informant_age: number | undefined
    // gi/informant_status [select_one] Key informant displacement status
    informant_status: undefined | Option<'hh_char_hh_det_status'>
    // gi/key_informant_difficulty [select_multiple] Indicate if key informant has a lot of difficulty (or cannot do at all) any of the following:
    key_informant_difficulty: undefined | Option<'key_informant_difficulty'>[]
    // gi/disability_status_government [select_one] Indicate if key informant has a disability status from the Government of Ukraine:
    disability_status_government: undefined | Option<'disability_status_government'>
    // gi/numb_part [integer] Number of participants
    numb_part: number | undefined
    // gi/hh_char_hh_det [begin_repeat] FGD participant
    hh_char_hh_det:
      | {
          hh_char_hh_det_gender: undefined | Option<'hh_char_hh_det_gender'> | undefined
          hh_char_hh_det_age: number | undefined | undefined
          hh_char_hh_det_status: undefined | Option<'hh_char_hh_det_status'> | undefined
        }[]
      | undefined
    // gi/category_topic [select_multiple] Category of topics
    category_topic: undefined | Option<'category_topic'>[]
    calc_type_activity: string
    calc_essential_services: string
    calc_protection_concerns: string
    calc_persons_specific_needs: string
    calc_economic_opportunities: string
    calc_other: string
    // gi/topic [select_multiple] Topic
    topic: undefined | Option<'topic'>[]
    // gi/topic_other [text] If "Other", please specify
    topic_other: string | undefined
    // gi/challenges_faced_PwDs/ongoing_conflict_affected_disability_q [text] Question 1: (challenges faced PwDs)
    ongoing_conflict_affected_disability_q: string | undefined
    // gi/challenges_faced_PwDs/ongoing_conflict_affected_disability_a [text] Answer 1: (challenges faced PwDs)
    ongoing_conflict_affected_disability_a: string | undefined
    // gi/challenges_faced_PwDs/types_governmental_services_provided_q [text] Question 2: (challenges faced PwDs)
    types_governmental_services_provided_q: string | undefined
    // gi/challenges_faced_PwDs/types_governmental_services_provided_a [text] Answer 2: (challenges faced PwDs)
    types_governmental_services_provided_a: string | undefined
    // gi/challenges_faced_PwDs/assistance_support_humanitarian_organizations_q [text] Question 3: (challenges faced PwDs)
    assistance_support_humanitarian_organizations_q: string | undefined
    // gi/challenges_faced_PwDs/assistance_support_humanitarian_organizations_a [text] Answer 3: (challenges faced PwDs)
    assistance_support_humanitarian_organizations_a: string | undefined
    // gi/challenges_faced_PwDs/get_information_available_services_q [text] Question 4: (challenges faced PwDs)
    get_information_available_services_q: string | undefined
    // gi/challenges_faced_PwDs/get_information_available_services_a [text] Answer 4: (challenges faced PwDs)
    get_information_available_services_a: string | undefined
    // gi/challenges_faced_PwDs/specific_types_equipment_need_q [text] Question 5: (challenges faced PwDs)
    specific_types_equipment_need_q: string | undefined
    // gi/challenges_faced_PwDs/specific_types_equipment_need_a [text] Answer 5: (challenges faced PwDs)
    specific_types_equipment_need_a: string | undefined
    // gi/challenges_faced_PwDs/types_rehabilitation_services_q [text] Question 6: (challenges faced PwDs)
    types_rehabilitation_services_q: string | undefined
    // gi/challenges_faced_PwDs/types_rehabilitation_services_a [text] Answer 6: (challenges faced PwDs)
    types_rehabilitation_services_a: string | undefined
    // gi/challenges_faced_PwDs/specialized_institutions_disabilities_q [text] Question 7: (challenges faced PwDs)
    specialized_institutions_disabilities_q: string | undefined
    // gi/challenges_faced_PwDs/specialized_institutions_disabilities_a [text] Answer 7: (challenges faced PwDs)
    specialized_institutions_disabilities_a: string | undefined
    // gi/challenges_faced_PwDs/suffering_forms_discrimination_stigmatization_q [text] Question 8: (challenges faced PwDs)
    suffering_forms_discrimination_stigmatization_q: string | undefined
    // gi/challenges_faced_PwDs/suffering_forms_discrimination_stigmatization_a [text] Answer 8: (challenges faced PwDs)
    suffering_forms_discrimination_stigmatization_a: string | undefined
    // gi/challenges_faced_PwDs/legal_help_support_q [text] Question 9: (challenges faced PwDs)
    legal_help_support_q: string | undefined
    // gi/challenges_faced_PwDs/legal_help_support_a [text] Answer 9: (challenges faced PwDs)
    legal_help_support_a: string | undefined
    // gi/challenges_faced_PwDs/other_issues_concerns_disability_q [text] Question 10: (challenges faced PwDs)
    other_issues_concerns_disability_q: string | undefined
    // gi/challenges_faced_PwDs/other_issues_concerns_disability_a [text] Answer 10: (challenges faced PwDs)
    other_issues_concerns_disability_a: string | undefined
    // gi/social_cohesion_kii/experience_dynamics_between_communities_q [text] Question 1: (social cohesion kii)
    experience_dynamics_between_communities_q: string | undefined
    // gi/social_cohesion_kii/experience_dynamics_between_communities_a [text] Answer 1: (social cohesion kii)
    experience_dynamics_between_communities_a: string | undefined
    // gi/social_cohesion_kii/main_challenges_displaced_communities_q [text] Question 2: (social cohesion kii)
    main_challenges_displaced_communities_q: string | undefined
    // gi/social_cohesion_kii/main_challenges_displaced_communities_a [text] Answer 2: (social cohesion kii)
    main_challenges_displaced_communities_a: string | undefined
    // gi/social_cohesion_kii/forms_social_tensions_communities_q [text] Question 3: (social cohesion kii)
    forms_social_tensions_communities_q: string | undefined
    // gi/social_cohesion_kii/forms_social_tensions_communities_a [text] Answer 3: (social cohesion kii)
    forms_social_tensions_communities_a: string | undefined
    // gi/social_cohesion_kii/efforts_made_promote_integration_q [text] Question 4: (social cohesion kii)
    efforts_made_promote_integration_q: string | undefined
    // gi/social_cohesion_kii/efforts_made_promote_integration_a [text] Answer 4: (social cohesion kii)
    efforts_made_promote_integration_a: string | undefined
    // gi/social_cohesion_kii/stakeholders_involved_social_communities_q [text] Question 5: (social cohesion kii)
    stakeholders_involved_social_communities_q: string | undefined
    // gi/social_cohesion_kii/stakeholders_involved_social_communities_a [text] Answer 5: (social cohesion kii)
    stakeholders_involved_social_communities_a: string | undefined
    // gi/social_cohesion_kii/steps_strategies_social_tensions_q [text] Question 6: (social cohesion kii)
    steps_strategies_social_tensions_q: string | undefined
    // gi/social_cohesion_kii/steps_strategies_social_tensions_a [text] Answer 6: (social cohesion kii)
    steps_strategies_social_tensions_a: string | undefined
    // gi/social_cohesion_kii/question7_social_cohesion_kii [text] Question 7: (social cohesion kii)
    question7_social_cohesion_kii: string | undefined
    // gi/social_cohesion_kii/answer7_social_cohesion_kii [text] Answer 7: (social cohesion kii)
    answer7_social_cohesion_kii: string | undefined
    // gi/social_cohesion_kii/question8_social_cohesion_kii [text] Question 8: (social cohesion kii)
    question8_social_cohesion_kii: string | undefined
    // gi/social_cohesion_kii/answer8_social_cohesion_kii [text] Answer 8: (social cohesion kii)
    answer8_social_cohesion_kii: string | undefined
    // gi/social_cohesion_kii/question9_social_cohesion_kii [text] Question 9: (social cohesion kii)
    question9_social_cohesion_kii: string | undefined
    // gi/social_cohesion_kii/answer9_social_cohesion_kii [text] Answer 9: (social cohesion kii)
    answer9_social_cohesion_kii: string | undefined
    // gi/social_cohesion_kii/question10_social_cohesion_kii [text] Question 10: (social cohesion kii)
    question10_social_cohesion_kii: string | undefined
    // gi/social_cohesion_kii/answer10_social_cohesion_kii [text] Answer 10: (social cohesion kii)
    answer10_social_cohesion_kii: string | undefined
    // gi/social_cohesion_fgd/relationship_host_community_q [text] Question 1: (social cohesion fgd)
    relationship_host_community_q: string | undefined
    // gi/social_cohesion_fgd/relationship_host_community_a [text] Answer 1: (social cohesion fgd)
    relationship_host_community_a: string | undefined
    // gi/social_cohesion_fgd/community_local_authorities_support_q [text] Question 2: (social cohesion fgd)
    community_local_authorities_support_q: string | undefined
    // gi/social_cohesion_fgd/community_local_authorities_support_a [text] Answer 2: (social cohesion fgd)
    community_local_authorities_support_a: string | undefined
    // gi/social_cohesion_fgd/any_forms_social_tensions_q [text] Question 3: (social cohesion fgd)
    any_forms_social_tensions_q: string | undefined
    // gi/social_cohesion_fgd/any_forms_social_tensions_a [text] Answer 3: (social cohesion fgd)
    any_forms_social_tensions_a: string | undefined
    // gi/social_cohesion_fgd/humanitarian_organizations_community_relevant_q [text] Question 4: (social cohesion fgd)
    humanitarian_organizations_community_relevant_q: string | undefined
    // gi/social_cohesion_fgd/humanitarian_organizations_community_relevant_a [text] Answer 4: (social cohesion fgd)
    humanitarian_organizations_community_relevant_a: string | undefined
    // gi/social_cohesion_fgd/activities_think_strengthen_social_q [text] Question 5: (social cohesion fgd)
    activities_think_strengthen_social_q: string | undefined
    // gi/social_cohesion_fgd/activities_think_strengthen_social_a [text] Answer 5: (social cohesion fgd)
    activities_think_strengthen_social_a: string | undefined
    // gi/social_cohesion_fgd/question6_social_cohesion_fgd [text] Question 6: (social cohesion fgd)
    question6_social_cohesion_fgd: string | undefined
    // gi/social_cohesion_fgd/answer6_social_cohesion_fgd [text] Answer 6: (social cohesion fgd)
    answer6_social_cohesion_fgd: string | undefined
    // gi/social_cohesion_fgd/question7_social_cohesion_fgd [text] Question 7: (social cohesion fgd)
    question7_social_cohesion_fgd: string | undefined
    // gi/social_cohesion_fgd/answer7_social_cohesion_fgd [text] Answer 7: (social cohesion fgd)
    answer7_social_cohesion_fgd: string | undefined
    // gi/social_cohesion_fgd/question8_social_cohesion_fgd [text] Question 8: (social cohesion fgd)
    question8_social_cohesion_fgd: string | undefined
    // gi/social_cohesion_fgd/answer8_social_cohesion_fgd [text] Answer 8: (social cohesion fgd)
    answer8_social_cohesion_fgd: string | undefined
    // gi/social_cohesion_fgd/question9_social_cohesion_fgd [text] Question 9: (social cohesion fgd)
    question9_social_cohesion_fgd: string | undefined
    // gi/social_cohesion_fgd/answer9_social_cohesion_fgd [text] Answer 9: (social cohesion fgd)
    answer9_social_cohesion_fgd: string | undefined
    // gi/social_cohesion_fgd/question10_social_cohesion_fgd [text] Question 10: (social cohesion fgd)
    question10_social_cohesion_fgd: string | undefined
    // gi/social_cohesion_fgd/answer10_social_cohesion_fgd [text] Answer 10: (social cohesion fgd)
    answer10_social_cohesion_fgd: string | undefined
    // gi/access_healthcare_services/main_healthcare_available_area_q [text] Question 1: (access healthcare services kii)
    main_healthcare_available_area_q: string | undefined
    // gi/access_healthcare_services/main_healthcare_available_area_a [text] Answer 1: (access healthcare services kii)
    main_healthcare_available_area_a: string | undefined
    // gi/access_healthcare_services/primary_types_specialized_health_q [text] Question 2: (access healthcare services kii)
    primary_types_specialized_health_q: string | undefined
    // gi/access_healthcare_services/primary_types_specialized_health_a [text] Answer 2: (access healthcare services kii)
    primary_types_specialized_health_a: string | undefined
    // gi/access_healthcare_services/medication_available_accessible_area_q [text] Question 3: (access healthcare services kii)
    medication_available_accessible_area_q: string | undefined
    // gi/access_healthcare_services/medication_available_accessible_area_a [text] Answer 3: (access healthcare services kii)
    medication_available_accessible_area_a: string | undefined
    // gi/access_healthcare_services/population_groups_access_healthcare_q [text] Question 4: (access healthcare services kii)
    population_groups_access_healthcare_q: string | undefined
    // gi/access_healthcare_services/population_groups_access_healthcare_a [text] Answer 4: (access healthcare services kii)
    population_groups_access_healthcare_a: string | undefined
    // gi/access_healthcare_services/local_initiatives_aimed_health_q [text] Question 5: (access healthcare services kii)
    local_initiatives_aimed_health_q: string | undefined
    // gi/access_healthcare_services/local_initiatives_aimed_health_a [text] Answer 5: (access healthcare services kii)
    local_initiatives_aimed_health_a: string | undefined
    // gi/access_healthcare_services/issues_share_today_q [text] Question 6: (access healthcare services kii)
    issues_share_today_q: string | undefined
    // gi/access_healthcare_services/issues_share_today_a [text] Answer 6: (access healthcare services kii)
    issues_share_today_a: string | undefined
    // gi/access_healthcare_services/question7_access_healthcare_services [text] Question 7: (access healthcare services kii)
    question7_access_healthcare_services: string | undefined
    // gi/access_healthcare_services/answer7_access_healthcare_services [text] Answer 7: (access healthcare services kii)
    answer7_access_healthcare_services: string | undefined
    // gi/access_healthcare_services/question8_access_healthcare_services [text] Question 8: (access healthcare services kii)
    question8_access_healthcare_services: string | undefined
    // gi/access_healthcare_services/answer8_access_healthcare_services [text] Answer 8: (access healthcare services kii)
    answer8_access_healthcare_services: string | undefined
    // gi/access_healthcare_services/question9_access_healthcare_services [text] Question 9: (access healthcare services kii)
    question9_access_healthcare_services: string | undefined
    // gi/access_healthcare_services/answer9_access_healthcare_services [text] Answer 9: (access healthcare services kii)
    answer9_access_healthcare_services: string | undefined
    // gi/access_healthcare_services/question10_access_healthcare_services [text] Question 10: (access healthcare services kii)
    question10_access_healthcare_services: string | undefined
    // gi/access_healthcare_services/answer10_access_healthcare_services [text] Answer 10: (access healthcare services kii)
    answer10_access_healthcare_services: string | undefined
    // gi/access_social_services_fgd/question1_access_social_services_fgd [text] Question 1: (access social services fgd)
    question1_access_social_services_fgd: string | undefined
    // gi/access_social_services_fgd/answer1_access_social_services_fgd [text] Answer 1: (access social services fgd)
    answer1_access_social_services_fgd: string | undefined
    // gi/access_social_services_fgd/question2_access_social_services_fgd [text] Question 2: (access social services fgd)
    question2_access_social_services_fgd: string | undefined
    // gi/access_social_services_fgd/answer2_access_social_services_fgd [text] Answer 2: (access social services fgd)
    answer2_access_social_services_fgd: string | undefined
    // gi/access_social_services_fgd/question3_access_social_services_fgd [text] Question 3: (access social services fgd)
    question3_access_social_services_fgd: string | undefined
    // gi/access_social_services_fgd/answer3_access_social_services_fgd [text] Answer 3: (access social services fgd)
    answer3_access_social_services_fgd: string | undefined
    // gi/access_social_services_fgd/question4_access_social_services_fgd [text] Question 4: (access social services fgd)
    question4_access_social_services_fgd: string | undefined
    // gi/access_social_services_fgd/answer4_access_social_services_fgd [text] Answer 4: (access social services fgd)
    answer4_access_social_services_fgd: string | undefined
    // gi/access_social_services_fgd/question5_access_social_services_fgd [text] Question 5: (access social services fgd)
    question5_access_social_services_fgd: string | undefined
    // gi/access_social_services_fgd/answer5_access_social_services_fgd [text] Answer 5: (access social services fgd)
    answer5_access_social_services_fgd: string | undefined
    // gi/access_social_services_fgd/question6_access_social_services_fgd [text] Question 6: (access social services fgd)
    question6_access_social_services_fgd: string | undefined
    // gi/access_social_services_fgd/answer6_access_social_services_fgd [text] Answer 6: (access social services fgd)
    answer6_access_social_services_fgd: string | undefined
    // gi/access_social_services_fgd/question7_access_social_services_fgd [text] Question 7: (access social services fgd)
    question7_access_social_services_fgd: string | undefined
    // gi/access_social_services_fgd/answer7_access_social_services_fgd [text] Answer 7: (access social services fgd)
    answer7_access_social_services_fgd: string | undefined
    // gi/access_social_services_fgd/question8_access_social_services_fgd [text] Question 8: (access social services fgd)
    question8_access_social_services_fgd: string | undefined
    // gi/access_social_services_fgd/answer8_access_social_services_fgd [text] Answer 8: (access social services fgd)
    answer8_access_social_services_fgd: string | undefined
    // gi/access_social_services_fgd/question9_access_social_services_fgd [text] Question 9: (access social services fgd)
    question9_access_social_services_fgd: string | undefined
    // gi/access_social_services_fgd/answer9_access_social_services_fgd [text] Answer 9: (access social services fgd)
    answer9_access_social_services_fgd: string | undefined
    // gi/access_social_services_fgd/question10_access_social_services_fgd [text] Question 10: (access social services fgd)
    question10_access_social_services_fgd: string | undefined
    // gi/access_social_services_fgd/answer10_access_social_services_fgd [text] Answer 10: (access social services fgd)
    answer10_access_social_services_fgd: string | undefined
    // gi/access_social_services_kii_decision_makers/question1_access_social_services_kii_decision_makers [text] Question 1: (access social services kii decision makers)
    question1_access_social_services_kii_decision_makers: string | undefined
    // gi/access_social_services_kii_decision_makers/answer1_access_social_services_kii_decision_makers [text] Answer 1: (access social services kii decision makers)
    answer1_access_social_services_kii_decision_makers: string | undefined
    // gi/access_social_services_kii_decision_makers/question2_access_social_services_kii_decision_makers [text] Question 2: (access social services kii decision makers)
    question2_access_social_services_kii_decision_makers: string | undefined
    // gi/access_social_services_kii_decision_makers/answer2_access_social_services_kii_decision_makers [text] Answer 2: (access social services kii decision makers)
    answer2_access_social_services_kii_decision_makers: string | undefined
    // gi/access_social_services_kii_decision_makers/question3_access_social_services_kii_decision_makers [text] Question 3: (access social services kii decision makers)
    question3_access_social_services_kii_decision_makers: string | undefined
    // gi/access_social_services_kii_decision_makers/answer3_access_social_services_kii_decision_makers [text] Answer 3: (access social services kii decision makers)
    answer3_access_social_services_kii_decision_makers: string | undefined
    // gi/access_social_services_kii_decision_makers/question4_access_social_services_kii_decision_makers [text] Question 4: (access social services kii decision makers)
    question4_access_social_services_kii_decision_makers: string | undefined
    // gi/access_social_services_kii_decision_makers/answer4_access_social_services_kii_decision_makers [text] Answer 4: (access social services kii decision makers)
    answer4_access_social_services_kii_decision_makers: string | undefined
    // gi/access_social_services_kii_decision_makers/question5_access_social_services_kii_decision_makers [text] Question 5: (access social services kii decision makers)
    question5_access_social_services_kii_decision_makers: string | undefined
    // gi/access_social_services_kii_decision_makers/answer5_access_social_services_kii_decision_makers [text] Answer 5: (access social services kii decision makers)
    answer5_access_social_services_kii_decision_makers: string | undefined
    // gi/access_social_services_kii_decision_makers/question6_access_social_services_kii_decision_makers [text] Question 6: (access social services kii decision makers)
    question6_access_social_services_kii_decision_makers: string | undefined
    // gi/access_social_services_kii_decision_makers/answer6_access_social_services_kii_decision_makers [text] Answer 6: (access social services kii decision makers)
    answer6_access_social_services_kii_decision_makers: string | undefined
    // gi/access_social_services_kii_decision_makers/question7_access_social_services_kii_decision_makers [text] Question 7: (access social services kii decision makers)
    question7_access_social_services_kii_decision_makers: string | undefined
    // gi/access_social_services_kii_decision_makers/answer7_access_social_services_kii_decision_makers [text] Answer 7: (access social services kii decision makers)
    answer7_access_social_services_kii_decision_makers: string | undefined
    // gi/access_social_services_kii_decision_makers/question8_access_social_services_kii_decision_makers [text] Question 8: (access social services kii decision makers)
    question8_access_social_services_kii_decision_makers: string | undefined
    // gi/access_social_services_kii_decision_makers/answer8_access_social_services_kii_decision_makers [text] Answer 8: (access social services kii decision makers)
    answer8_access_social_services_kii_decision_makers: string | undefined
    // gi/access_social_services_kii_decision_makers/question9_access_social_services_kii_decision_makers [text] Question 9: (access social services kii decision makers)
    question9_access_social_services_kii_decision_makers: string | undefined
    // gi/access_social_services_kii_decision_makers/answer9_access_social_services_kii_decision_makers [text] Answer 9: (access social services kii decision makers)
    answer9_access_social_services_kii_decision_makers: string | undefined
    // gi/access_social_services_kii_decision_makers/question10_access_social_services_kii_decision_makers [text] Question 10: (access social services kii decision makers)
    question10_access_social_services_kii_decision_makers: string | undefined
    // gi/access_social_services_kii_decision_makers/answer10_access_social_services_kii_decision_makers [text] Answer 10: (access social services kii decision makers)
    answer10_access_social_services_kii_decision_makers: string | undefined
    // gi/access_social_services_kii_poc/question1_access_social_services_kii_poc [text] Question 1: (access social services kii poc)
    question1_access_social_services_kii_poc: string | undefined
    // gi/access_social_services_kii_poc/answer1_access_social_services_kii_poc [text] Answer 1: (access social services kii poc)
    answer1_access_social_services_kii_poc: string | undefined
    // gi/access_social_services_kii_poc/question2_access_social_services_kii_poc [text] Question 2: (access social services kii poc)
    question2_access_social_services_kii_poc: string | undefined
    // gi/access_social_services_kii_poc/answer2_access_social_services_kii_poc [text] Answer 2: (access social services kii poc)
    answer2_access_social_services_kii_poc: string | undefined
    // gi/access_social_services_kii_poc/question3_access_social_services_kii_poc [text] Question 3: (access social services kii poc)
    question3_access_social_services_kii_poc: string | undefined
    // gi/access_social_services_kii_poc/answer3_access_social_services_kii_poc [text] Answer 3: (access social services kii poc)
    answer3_access_social_services_kii_poc: string | undefined
    // gi/access_social_services_kii_poc/question4_access_social_services_kii_poc [text] Question 4: (access social services kii poc)
    question4_access_social_services_kii_poc: string | undefined
    // gi/access_social_services_kii_poc/answer4_access_social_services_kii_poc [text] Answer 4: (access social services kii poc)
    answer4_access_social_services_kii_poc: string | undefined
    // gi/access_social_services_kii_poc/question5_access_social_services_kii_poc [text] Question 5: (access social services kii poc)
    question5_access_social_services_kii_poc: string | undefined
    // gi/access_social_services_kii_poc/answer5_access_social_services_kii_poc [text] Answer 5: (access social services kii poc)
    answer5_access_social_services_kii_poc: string | undefined
    // gi/access_social_services_kii_poc/question6_access_social_services_kii_poc [text] Question 6: (access social services kii poc)
    question6_access_social_services_kii_poc: string | undefined
    // gi/access_social_services_kii_poc/answer6_access_social_services_kii_poc [text] Answer 6: (access social services kii poc)
    answer6_access_social_services_kii_poc: string | undefined
    // gi/access_social_services_kii_poc/question7_access_social_services_kii_poc [text] Question 7: (access social services kii poc)
    question7_access_social_services_kii_poc: string | undefined
    // gi/access_social_services_kii_poc/answer7_access_social_services_kii_poc [text] Answer 7: (access social services kii poc)
    answer7_access_social_services_kii_poc: string | undefined
    // gi/access_social_services_kii_poc/question8_access_social_services_kii_poc [text] Question 8: (access social services kii poc)
    question8_access_social_services_kii_poc: string | undefined
    // gi/access_social_services_kii_poc/answer8_access_social_services_kii_poc [text] Answer 8: (access social services kii poc)
    answer8_access_social_services_kii_poc: string | undefined
    // gi/access_social_services_kii_poc/question9_access_social_services_kii_poc [text] Question 9: (access social services kii poc)
    question9_access_social_services_kii_poc: string | undefined
    // gi/access_social_services_kii_poc/answer9_access_social_services_kii_poc [text] Answer 9: (access social services kii poc)
    answer9_access_social_services_kii_poc: string | undefined
    // gi/access_social_services_kii_poc/question10_access_social_services_kii_poc [text] Question 10: (access social services kii poc)
    question10_access_social_services_kii_poc: string | undefined
    // gi/access_social_services_kii_poc/answer10_access_social_services_kii_poc [text] Answer 10: (access social services kii poc)
    answer10_access_social_services_kii_poc: string | undefined
    // gi/access_social_services_kii_service_providers/question1_access_social_services_kii_service_providers [text] Question 1: (access social services kii service providers)
    question1_access_social_services_kii_service_providers: string | undefined
    // gi/access_social_services_kii_service_providers/answer1_access_social_services_kii_service_providers [text] Answer 1: (access social services kii service providers)
    answer1_access_social_services_kii_service_providers: string | undefined
    // gi/access_social_services_kii_service_providers/question2_access_social_services_kii_service_providers [text] Question 2: (access social services kii service providers)
    question2_access_social_services_kii_service_providers: string | undefined
    // gi/access_social_services_kii_service_providers/answer2_access_social_services_kii_service_providers [text] Answer 2: (access social services kii service providers)
    answer2_access_social_services_kii_service_providers: string | undefined
    // gi/access_social_services_kii_service_providers/question3_access_social_services_kii_service_providers [text] Question 3: (access social services kii service providers)
    question3_access_social_services_kii_service_providers: string | undefined
    // gi/access_social_services_kii_service_providers/answer3_access_social_services_kii_service_providers [text] Answer 3: (access social services kii service providers)
    answer3_access_social_services_kii_service_providers: string | undefined
    // gi/access_social_services_kii_service_providers/question4_access_social_services_kii_service_providers [text] Question 4: (access social services kii service providers)
    question4_access_social_services_kii_service_providers: string | undefined
    // gi/access_social_services_kii_service_providers/answer4_access_social_services_kii_service_providers [text] Answer 4: (access social services kii service providers)
    answer4_access_social_services_kii_service_providers: string | undefined
    // gi/access_social_services_kii_service_providers/question5_access_social_services_kii_service_providers [text] Question 5: (access social services kii service providers)
    question5_access_social_services_kii_service_providers: string | undefined
    // gi/access_social_services_kii_service_providers/answer5_access_social_services_kii_service_providers [text] Answer 5: (access social services kii service providers)
    answer5_access_social_services_kii_service_providers: string | undefined
    // gi/access_social_services_kii_service_providers/question6_access_social_services_kii_service_providers [text] Question 6: (access social services kii service providers)
    question6_access_social_services_kii_service_providers: string | undefined
    // gi/access_social_services_kii_service_providers/answer6_access_social_services_kii_service_providers [text] Answer 6: (access social services kii service providers)
    answer6_access_social_services_kii_service_providers: string | undefined
    // gi/access_social_services_kii_service_providers/question7_access_social_services_kii_service_providers [text] Question 7: (access social services kii service providers)
    question7_access_social_services_kii_service_providers: string | undefined
    // gi/access_social_services_kii_service_providers/answer7_access_social_services_kii_service_providers [text] Answer 7: (access social services kii service providers)
    answer7_access_social_services_kii_service_providers: string | undefined
    // gi/access_social_services_kii_service_providers/question8_access_social_services_kii_service_providers [text] Question 8: (access social services kii service providers)
    question8_access_social_services_kii_service_providers: string | undefined
    // gi/access_social_services_kii_service_providers/answer8_access_social_services_kii_service_providers [text] Answer 8: (access social services kii service providers)
    answer8_access_social_services_kii_service_providers: string | undefined
    // gi/access_social_services_kii_service_providers/question9_access_social_services_kii_service_providers [text] Question 9: (access social services kii service providers)
    question9_access_social_services_kii_service_providers: string | undefined
    // gi/access_social_services_kii_service_providers/answer9_access_social_services_kii_service_providers [text] Answer 9: (access social services kii service providers)
    answer9_access_social_services_kii_service_providers: string | undefined
    // gi/access_social_services_kii_service_providers/question10_access_social_services_kii_service_providers [text] Question 10: (access social services kii service providers)
    question10_access_social_services_kii_service_providers: string | undefined
    // gi/access_social_services_kii_service_providers/answer10_access_social_services_kii_service_providers [text] Answer 10: (access social services kii service providers)
    answer10_access_social_services_kii_service_providers: string | undefined
    // gi/mental_health_services_fgd/question1_mental_health_services_fgd [text] Question 1: (mental health services fgd)
    question1_mental_health_services_fgd: string | undefined
    // gi/mental_health_services_fgd/answer1_mental_health_services_fgd [text] Answer 1: (mental health services fgd)
    answer1_mental_health_services_fgd: string | undefined
    // gi/mental_health_services_fgd/question2_mental_health_services_fgd [text] Question 2: (mental health services fgd)
    question2_mental_health_services_fgd: string | undefined
    // gi/mental_health_services_fgd/answer2_mental_health_services_fgd [text] Answer 2: (mental health services fgd)
    answer2_mental_health_services_fgd: string | undefined
    // gi/mental_health_services_fgd/question3_mental_health_services_fgd [text] Question 3: (mental health services fgd)
    question3_mental_health_services_fgd: string | undefined
    // gi/mental_health_services_fgd/answer3_mental_health_services_fgd [text] Answer 3: (mental health services fgd)
    answer3_mental_health_services_fgd: string | undefined
    // gi/mental_health_services_fgd/question4_mental_health_services_fgd [text] Question 4: (mental health services fgd)
    question4_mental_health_services_fgd: string | undefined
    // gi/mental_health_services_fgd/answer4_mental_health_services_fgd [text] Answer 4: (mental health services fgd)
    answer4_mental_health_services_fgd: string | undefined
    // gi/mental_health_services_fgd/question5_mental_health_services_fgd [text] Question 5: (mental health services fgd)
    question5_mental_health_services_fgd: string | undefined
    // gi/mental_health_services_fgd/answer5_mental_health_services_fgd [text] Answer 5: (mental health services fgd)
    answer5_mental_health_services_fgd: string | undefined
    // gi/mental_health_services_fgd/question6_mental_health_services_fgd [text] Question 6: (mental health services fgd)
    question6_mental_health_services_fgd: string | undefined
    // gi/mental_health_services_fgd/answer6_mental_health_services_fgd [text] Answer 6: (mental health services fgd)
    answer6_mental_health_services_fgd: string | undefined
    // gi/mental_health_services_fgd/question7_mental_health_services_fgd [text] Question 7: (mental health services fgd)
    question7_mental_health_services_fgd: string | undefined
    // gi/mental_health_services_fgd/answer7_mental_health_services_fgd [text] Answer 7: (mental health services fgd)
    answer7_mental_health_services_fgd: string | undefined
    // gi/mental_health_services_kii_poc/question1_mental_health_services_kii_poc [text] Question 1: (mental health services kii poc)
    question1_mental_health_services_kii_poc: string | undefined
    // gi/mental_health_services_kii_poc/answer1_mental_health_services_kii_poc [text] Answer 1: (mental health services kii poc)
    answer1_mental_health_services_kii_poc: string | undefined
    // gi/mental_health_services_kii_poc/question2_mental_health_services_kii_poc [text] Question 2: (mental health services kii poc)
    question2_mental_health_services_kii_poc: string | undefined
    // gi/mental_health_services_kii_poc/answer2_mental_health_services_kii_poc [text] Answer 2: (mental health services kii poc)
    answer2_mental_health_services_kii_poc: string | undefined
    // gi/mental_health_services_kii_poc/question3_mental_health_services_kii_poc [text] Question 3: (mental health services kii poc)
    question3_mental_health_services_kii_poc: string | undefined
    // gi/mental_health_services_kii_poc/answer3_mental_health_services_kii_poc [text] Answer 3: (mental health services kii poc)
    answer3_mental_health_services_kii_poc: string | undefined
    // gi/mental_health_services_kii_poc/question4_mental_health_services_kii_poc [text] Question 4: (mental health services kii poc)
    question4_mental_health_services_kii_poc: string | undefined
    // gi/mental_health_services_kii_poc/answer4_mental_health_services_kii_poc [text] Answer 4: (mental health services kii poc)
    answer4_mental_health_services_kii_poc: string | undefined
    // gi/mental_health_services_kii_poc/question5_mental_health_services_kii_poc [text] Question 5: (mental health services kii poc)
    question5_mental_health_services_kii_poc: string | undefined
    // gi/mental_health_services_kii_poc/answer5_mental_health_services_kii_poc [text] Answer 5: (mental health services kii poc)
    answer5_mental_health_services_kii_poc: string | undefined
    // gi/mental_health_services_kii_poc/question6_mental_health_services_kii_poc [text] Question 6: (mental health services kii poc)
    question6_mental_health_services_kii_poc: string | undefined
    // gi/mental_health_services_kii_poc/answer6_mental_health_services_kii_poc [text] Answer 6: (mental health services kii poc)
    answer6_mental_health_services_kii_poc: string | undefined
    // gi/mental_health_services_kii_poc/question7_mental_health_services_kii_poc [text] Question 7: (mental health services kii poc)
    question7_mental_health_services_kii_poc: string | undefined
    // gi/mental_health_services_kii_poc/answer7_mental_health_services_kii_poc [text] Answer 7: (mental health services kii poc)
    answer7_mental_health_services_kii_poc: string | undefined
    // gi/mental_health_services_kii_poc/question8_mental_health_services_kii_poc [text] Question 8: (mental health services kii poc)
    question8_mental_health_services_kii_poc: string | undefined
    // gi/mental_health_services_kii_poc/answer8_mental_health_services_kii_poc [text] Answer 8: (mental health services kii poc)
    answer8_mental_health_services_kii_poc: string | undefined
    // gi/mental_health_services_kii_service_providers/question1_mental_health_services_kii_service_providers [text] Question 1: (mental health services kii service providers)
    question1_mental_health_services_kii_service_providers: string | undefined
    // gi/mental_health_services_kii_service_providers/answer1_mental_health_services_kii_service_providers [text] Answer 1: (mental health services kii service providers)
    answer1_mental_health_services_kii_service_providers: string | undefined
    // gi/mental_health_services_kii_service_providers/question2_mental_health_services_kii_service_providers [text] Question 2: (mental health services kii service providers)
    question2_mental_health_services_kii_service_providers: string | undefined
    // gi/mental_health_services_kii_service_providers/answer2_mental_health_services_kii_service_providers [text] Answer 2: (mental health services kii service providers)
    answer2_mental_health_services_kii_service_providers: string | undefined
    // gi/mental_health_services_kii_service_providers/question3_mental_health_services_kii_service_providers [text] Question 3: (mental health services kii service providers)
    question3_mental_health_services_kii_service_providers: string | undefined
    // gi/mental_health_services_kii_service_providers/answer3_mental_health_services_kii_service_providers [text] Answer 3: (mental health services kii service providers)
    answer3_mental_health_services_kii_service_providers: string | undefined
    // gi/mental_health_services_kii_service_providers/question4_mental_health_services_kii_service_providers [text] Question 4: (mental health services kii service providers)
    question4_mental_health_services_kii_service_providers: string | undefined
    // gi/mental_health_services_kii_service_providers/answer4_mental_health_services_kii_service_providers [text] Answer 4: (mental health services kii service providers)
    answer4_mental_health_services_kii_service_providers: string | undefined
    // gi/mental_health_services_kii_service_providers/question5_mental_health_services_kii_service_providers [text] Question 5: (mental health services kii service providers)
    question5_mental_health_services_kii_service_providers: string | undefined
    // gi/mental_health_services_kii_service_providers/answer5_mental_health_services_kii_service_providers [text] Answer 5: (mental health services kii service providers)
    answer5_mental_health_services_kii_service_providers: string | undefined
    // gi/mental_health_services_kii_service_providers/question6_mental_health_services_kii_service_providers [text] Question 6: (mental health services kii service providers)
    question6_mental_health_services_kii_service_providers: string | undefined
    // gi/mental_health_services_kii_service_providers/answer6_mental_health_services_kii_service_providers [text] Answer 6: (mental health services kii service providers)
    answer6_mental_health_services_kii_service_providers: string | undefined
    // gi/mental_health_services_kii_service_providers/question7_mental_health_services_kii_service_providers [text] Question 7: (mental health services kii service providers)
    question7_mental_health_services_kii_service_providers: string | undefined
    // gi/mental_health_services_kii_service_providers/answer7_mental_health_services_kii_service_providers [text] Answer 7: (mental health services kii service providers)
    answer7_mental_health_services_kii_service_providers: string | undefined
    // gi/mental_health_services_kii_service_providers/question8_mental_health_services_kii_service_providers [text] Question 8: (mental health services kii service providers)
    question8_mental_health_services_kii_service_providers: string | undefined
    // gi/mental_health_services_kii_service_providers/answer8_mental_health_services_kii_service_providers [text] Answer 8: (mental health services kii service providers)
    answer8_mental_health_services_kii_service_providers: string | undefined
    // gi/mental_health_services_kii_service_providers/question9_mental_health_services_kii_service_providers [text] Question 9: (mental health services kii service providers)
    question9_mental_health_services_kii_service_providers: string | undefined
    // gi/mental_health_services_kii_service_providers/answer9_mental_health_services_kii_service_providers [text] Answer 9: (mental health services kii service providers)
    answer9_mental_health_services_kii_service_providers: string | undefined
    // gi/idp_allowance_cuts_kii/question1_idp_allowance_cuts_kii [text] Question 1: (idp allowance cuts kii)
    question1_idp_allowance_cuts_kii: string | undefined
    // gi/idp_allowance_cuts_kii/answer1_idp_allowance_cuts_kii [text] Answer 1: (idp allowance cuts kii)
    answer1_idp_allowance_cuts_kii: string | undefined
    // gi/idp_allowance_cuts_kii/question2_idp_allowance_cuts_kii [text] Question 2: (idp allowance cuts kii)
    question2_idp_allowance_cuts_kii: string | undefined
    // gi/idp_allowance_cuts_kii/answer2_idp_allowance_cuts_kii [text] Answer 2: (idp allowance cuts kii)
    answer2_idp_allowance_cuts_kii: string | undefined
    // gi/idp_allowance_cuts_kii/question3_idp_allowance_cuts_kii [text] Question 3: (idp allowance cuts kii)
    question3_idp_allowance_cuts_kii: string | undefined
    // gi/idp_allowance_cuts_kii/answer3_idp_allowance_cuts_kii [text] Answer 3: (idp allowance cuts kii)
    answer3_idp_allowance_cuts_kii: string | undefined
    // gi/idp_allowance_cuts_kii/question4_idp_allowance_cuts_kii [text] Question 4: (idp allowance cuts kii)
    question4_idp_allowance_cuts_kii: string | undefined
    // gi/idp_allowance_cuts_kii/answer4_idp_allowance_cuts_kii [text] Answer 4: (idp allowance cuts kii)
    answer4_idp_allowance_cuts_kii: string | undefined
    // gi/idp_allowance_cuts_kii/question5_idp_allowance_cuts_kii [text] Question 5: (idp allowance cuts kii)
    question5_idp_allowance_cuts_kii: string | undefined
    // gi/idp_allowance_cuts_kii/answer5_idp_allowance_cuts_kii [text] Answer 5: (idp allowance cuts kii)
    answer5_idp_allowance_cuts_kii: string | undefined
    // gi/idp_allowance_cuts_kii/question6_idp_allowance_cuts_kii [text] Question 6: (idp allowance cuts kii)
    question6_idp_allowance_cuts_kii: string | undefined
    // gi/idp_allowance_cuts_kii/answer6_idp_allowance_cuts_kii [text] Answer 6: (idp allowance cuts kii)
    answer6_idp_allowance_cuts_kii: string | undefined
    // gi/idp_allowance_cuts_kii/question7_idp_allowance_cuts_kii [text] Question 7: (idp allowance cuts kii)
    question7_idp_allowance_cuts_kii: string | undefined
    // gi/idp_allowance_cuts_kii/answer7_idp_allowance_cuts_kii [text] Answer 7: (idp allowance cuts kii)
    answer7_idp_allowance_cuts_kii: string | undefined
    // gi/idp_allowance_cuts_kii/question8_idp_allowance_cuts_kii [text] Question 8: (idp allowance cuts kii)
    question8_idp_allowance_cuts_kii: string | undefined
    // gi/idp_allowance_cuts_kii/answer8_idp_allowance_cuts_kii [text] Answer 8: (idp allowance cuts kii)
    answer8_idp_allowance_cuts_kii: string | undefined
    // gi/idp_allowance_cuts_kii/question9_idp_allowance_cuts_kii [text] Question 9: (idp allowance cuts kii)
    question9_idp_allowance_cuts_kii: string | undefined
    // gi/idp_allowance_cuts_kii/answer9_idp_allowance_cuts_kii [text] Answer 9: (idp allowance cuts kii)
    answer9_idp_allowance_cuts_kii: string | undefined
    // gi/idp_allowance_cuts_kii/question10_idp_allowance_cuts_kii [text] Question 10: (idp allowance cuts kii)
    question10_idp_allowance_cuts_kii: string | undefined
    // gi/idp_allowance_cuts_kii/answer10_idp_allowance_cuts_kii [text] Answer 10: (idp allowance cuts kii)
    answer10_idp_allowance_cuts_kii: string | undefined
    // gi/idp_allowance_cuts_kii/question11_idp_allowance_cuts_kii [text] Question 11: (idp allowance cuts kii)
    question11_idp_allowance_cuts_kii: string | undefined
    // gi/idp_allowance_cuts_kii/answer11_idp_allowance_cuts_kii [text] Answer 11: (idp allowance cuts kii)
    answer11_idp_allowance_cuts_kii: string | undefined
    // gi/idp_allowance_cuts_fgd/question1b_idp_allowance_cuts_fgd [text] Question 1: (idp allowance cuts fgd)
    question1b_idp_allowance_cuts_fgd: string | undefined
    // gi/idp_allowance_cuts_fgd/answer1b_idp_allowance_cuts_fgd [text] Answer 1: (idp allowance cuts fgd)
    answer1b_idp_allowance_cuts_fgd: string | undefined
    // gi/idp_allowance_cuts_fgd/question2_idp_allowance_cuts_fgd [text] Question 2: (idp allowance cuts fgd)
    question2_idp_allowance_cuts_fgd: string | undefined
    // gi/idp_allowance_cuts_fgd/answer2_idp_allowance_cuts_fgd [text] Answer 2: (idp allowance cuts fgd)
    answer2_idp_allowance_cuts_fgd: string | undefined
    // gi/idp_allowance_cuts_fgd/question3_idp_allowance_cuts_fgd [text] Question 3: (idp allowance cuts fgd)
    question3_idp_allowance_cuts_fgd: string | undefined
    // gi/idp_allowance_cuts_fgd/answer3_idp_allowance_cuts_fgd [text] Answer 3: (idp allowance cuts fgd)
    answer3_idp_allowance_cuts_fgd: string | undefined
    // gi/idp_allowance_cuts_fgd/question4_idp_allowance_cuts_fgd [text] Question 4: (idp allowance cuts fgd)
    question4_idp_allowance_cuts_fgd: string | undefined
    // gi/idp_allowance_cuts_fgd/answer4_idp_allowance_cuts_fgd [text] Answer 4: (idp allowance cuts fgd)
    answer4_idp_allowance_cuts_fgd: string | undefined
    // gi/idp_allowance_cuts_fgd/question5_idp_allowance_cuts_fgd [text] Question 5: (idp allowance cuts fgd)
    question5_idp_allowance_cuts_fgd: string | undefined
    // gi/idp_allowance_cuts_fgd/answer5_idp_allowance_cuts_fgd [text] Answer 5: (idp allowance cuts fgd)
    answer5_idp_allowance_cuts_fgd: string | undefined
    // gi/idp_allowance_cuts_fgd/question6_idp_allowance_cuts_fgd [text] Question 6: (idp allowance cuts fgd)
    question6_idp_allowance_cuts_fgd: string | undefined
    // gi/idp_allowance_cuts_fgd/answer6_idp_allowance_cuts_fgd [text] Answer 6: (idp allowance cuts fgd)
    answer6_idp_allowance_cuts_fgd: string | undefined
    // gi/idp_allowance_cuts_fgd/question7_idp_allowance_cuts_fgd [text] Question 7: (idp allowance cuts fgd)
    question7_idp_allowance_cuts_fgd: string | undefined
    // gi/idp_allowance_cuts_fgd/answer7_idp_allowance_cuts_fgd [text] Answer 7: (idp allowance cuts fgd)
    answer7_idp_allowance_cuts_fgd: string | undefined
    // gi/idp_allowance_cuts_fgd/question8_idp_allowance_cuts_fgd [text] Question 8: (idp allowance cuts fgd)
    question8_idp_allowance_cuts_fgd: string | undefined
    // gi/idp_allowance_cuts_fgd/answer8_idp_allowance_cuts_fgd [text] Answer 8: (idp allowance cuts fgd)
    answer8_idp_allowance_cuts_fgd: string | undefined
    // gi/changes_mobilization_law_kii/question1_changes_mobilization_law_kii [text] Question 1: (changes mobilization law kii)
    question1_changes_mobilization_law_kii: string | undefined
    // gi/changes_mobilization_law_kii/answer1_changes_mobilization_law_kii [text] Answer 1: (changes mobilization law kii)
    answer1_changes_mobilization_law_kii: string | undefined
    // gi/changes_mobilization_law_kii/question2_changes_mobilization_law_kii [text] Question 2: (changes mobilization law kii)
    question2_changes_mobilization_law_kii: string | undefined
    // gi/changes_mobilization_law_kii/answer2_changes_mobilization_law_kii [text] Answer 2: (changes mobilization law kii)
    answer2_changes_mobilization_law_kii: string | undefined
    // gi/changes_mobilization_law_kii/question3_changes_mobilization_law_kii [text] Question 3: (changes mobilization law kii)
    question3_changes_mobilization_law_kii: string | undefined
    // gi/changes_mobilization_law_kii/answer3_changes_mobilization_law_kii [text] Answer 3: (changes mobilization law kii)
    answer3_changes_mobilization_law_kii: string | undefined
    // gi/changes_mobilization_law_kii/question4_changes_mobilization_law_kii [text] Question 4: (changes mobilization law kii)
    question4_changes_mobilization_law_kii: string | undefined
    // gi/changes_mobilization_law_kii/answer4_changes_mobilization_law_kii [text] Answer 4: (changes mobilization law kii)
    answer4_changes_mobilization_law_kii: string | undefined
    // gi/changes_mobilization_law_kii/question5_changes_mobilization_law_kii [text] Question 5: (changes mobilization law kii)
    question5_changes_mobilization_law_kii: string | undefined
    // gi/changes_mobilization_law_kii/answer5_changes_mobilization_law_kii [text] Answer 5: (changes mobilization law kii)
    answer5_changes_mobilization_law_kii: string | undefined
    // gi/changes_mobilization_law_kii/question6_changes_mobilization_law_kii [text] Question 6: (changes mobilization law kii)
    question6_changes_mobilization_law_kii: string | undefined
    // gi/changes_mobilization_law_kii/answer6_changes_mobilization_law_kii [text] Answer 6: (changes mobilization law kii)
    answer6_changes_mobilization_law_kii: string | undefined
    // gi/changes_mobilization_law_kii/question7_changes_mobilization_law_kii [text] Question 7: (changes mobilization law kii)
    question7_changes_mobilization_law_kii: string | undefined
    // gi/changes_mobilization_law_kii/answer7_changes_mobilization_law_kii [text] Answer 7: (changes mobilization law kii)
    answer7_changes_mobilization_law_kii: string | undefined
    // gi/changes_mobilization_law_kii/question8_changes_mobilization_law_kii [text] Question 8: (changes mobilization law kii)
    question8_changes_mobilization_law_kii: string | undefined
    // gi/changes_mobilization_law_kii/answer8_changes_mobilization_law_kii [text] Answer 8: (changes mobilization law kii)
    answer8_changes_mobilization_law_kii: string | undefined
    // gi/changes_mobilization_law_iwg/question1_changes_mobilization_law_iwg_fgd [text] Question 1: (changes mobilization law iwg fgd)
    question1_changes_mobilization_law_iwg_fgd: string | undefined
    // gi/changes_mobilization_law_iwg/answer1_changes_mobilization_law_iwg_fgd [text] Answer 1: (changes mobilization law iwg fgd)
    answer1_changes_mobilization_law_iwg_fgd: string | undefined
    // gi/changes_mobilization_law_iwg/question2_changes_mobilization_law_iwg_fgd [text] Question 2: (changes mobilization law iwg fgd)
    question2_changes_mobilization_law_iwg_fgd: string | undefined
    // gi/changes_mobilization_law_iwg/answer2_changes_mobilization_law_iwg_fgd [text] Answer 2: (changes mobilization law iwg fgd)
    answer2_changes_mobilization_law_iwg_fgd: string | undefined
    // gi/changes_mobilization_law_iwg/question3_changes_mobilization_law_iwg_fgd [text] Question 3: (changes mobilization law iwg fgd)
    question3_changes_mobilization_law_iwg_fgd: string | undefined
    // gi/changes_mobilization_law_iwg/answer3_changes_mobilization_law_iwg_fgd [text] Answer 3: (changes mobilization law iwg fgd)
    answer3_changes_mobilization_law_iwg_fgd: string | undefined
    // gi/changes_mobilization_law_iwg/question4_changes_mobilization_law_iwg_fgd [text] Question 4: (changes mobilization law iwg fgd)
    question4_changes_mobilization_law_iwg_fgd: string | undefined
    // gi/changes_mobilization_law_iwg/answer4_changes_mobilization_law_iwg_fgd [text] Answer 4: (changes mobilization law iwg fgd)
    answer4_changes_mobilization_law_iwg_fgd: string | undefined
    // gi/changes_mobilization_law_iwg/question5_changes_mobilization_law_iwg_fgd [text] Question 5: (changes mobilization law iwg fgd)
    question5_changes_mobilization_law_iwg_fgd: string | undefined
    // gi/changes_mobilization_law_iwg/answer5_changes_mobilization_law_iwg_fgd [text] Answer 5: (changes mobilization law iwg fgd)
    answer5_changes_mobilization_law_iwg_fgd: string | undefined
    // gi/changes_mobilization_law_iwg/question6_changes_mobilization_law_iwg_fgd [text] Question 6: (changes mobilization law iwg fgd)
    question6_changes_mobilization_law_iwg_fgd: string | undefined
    // gi/changes_mobilization_law_iwg/answer6_changes_mobilization_law_iwg_fgd [text] Answer 6: (changes mobilization law iwg fgd)
    answer6_changes_mobilization_law_iwg_fgd: string | undefined
    // gi/changes_mobilization_law_iwg/question7_changes_mobilization_law_iwg_fgd [text] Question 7: (changes mobilization law iwg fgd)
    question7_changes_mobilization_law_iwg_fgd: string | undefined
    // gi/changes_mobilization_law_iwg/answer7_changes_mobilization_law_iwg_fgd [text] Answer 7: (changes mobilization law iwg fgd)
    answer7_changes_mobilization_law_iwg_fgd: string | undefined
    // gi/women_roles_armed_conflic/typical_roles_women_q [text] Question 1 (women_roles_armed_conflic)
    typical_roles_women_q: string | undefined
    // gi/women_roles_armed_conflic/typical_roles_women_a [text] Answer 1 (women_roles_armed_conflic)
    typical_roles_women_a: string | undefined
    // gi/women_roles_armed_conflic/conflict_changed_role_q [text] Question 2 (women_roles_armed_conflic)
    conflict_changed_role_q: string | undefined
    // gi/women_roles_armed_conflic/conflict_changed_role_a [text] Answer 2 (women_roles_armed_conflic)
    conflict_changed_role_a: string | undefined
    // gi/women_roles_armed_conflic/learn_new_professions_q [text] Question 3 (women_roles_armed_conflic)
    learn_new_professions_q: string | undefined
    // gi/women_roles_armed_conflic/learn_new_professions_a [text] Answer 3 (women_roles_armed_conflic)
    learn_new_professions_a: string | undefined
    // gi/women_roles_armed_conflic/change_household_task_q [text] Question 4 (women_roles_armed_conflic)
    change_household_task_q: string | undefined
    // gi/women_roles_armed_conflic/change_household_task_a [text] Answer 4 (women_roles_armed_conflic)
    change_household_task_a: string | undefined
    // gi/women_roles_armed_conflic/different_coping_strategies_q [text] Question 5 (women_roles_armed_conflic)
    different_coping_strategies_q: string | undefined
    // gi/women_roles_armed_conflic/different_coping_strategies_a [text] Answer 5 (women_roles_armed_conflic)
    different_coping_strategies_a: string | undefined
    // gi/women_roles_armed_conflic/women_cope_challenges_q [text] Question 6 (women_roles_armed_conflic)
    women_cope_challenges_q: string | undefined
    // gi/women_roles_armed_conflic/women_cope_challenges_a [text] Answer 6 (women_roles_armed_conflic)
    women_cope_challenges_a: string | undefined
    // gi/women_roles_armed_conflic/different_resources_support_q [text] Question 7 (women_roles_armed_conflic)
    different_resources_support_q: string | undefined
    // gi/women_roles_armed_conflic/different_resources_support_a [text] Answer 7 (women_roles_armed_conflic)
    different_resources_support_a: string | undefined
    // gi/women_roles_armed_conflic/role_women_making_q [text] Question 8 (women_roles_armed_conflic)
    role_women_making_q: string | undefined
    // gi/women_roles_armed_conflic/role_women_making_a [text] Answer 8 (women_roles_armed_conflic)
    role_women_making_a: string | undefined
    // gi/women_roles_armed_conflic/initiatives_women_propose_q [text] Question 9 (women_roles_armed_conflic)
    initiatives_women_propose_q: string | undefined
    // gi/women_roles_armed_conflic/initiatives_women_propose_a [text] Answer 9 (women_roles_armed_conflic)
    initiatives_women_propose_a: string | undefined
    // gi/women_roles_armed_conflic/government_initiatives_women_q [text] Question 10 (women_roles_armed_conflic)
    government_initiatives_women_q: string | undefined
    // gi/women_roles_armed_conflic/government_initiatives_women_a [text] Answer 10 (women_roles_armed_conflic)
    government_initiatives_women_a: string | undefined
    // gi/evacuations_fgd/evac_process_q_fgd [text] Question 1 (evacuations_fgd)
    evac_process_q_fgd: string | undefined
    // gi/evacuations_fgd/evac_process_a_fgd [text] Answer 1 (evacuations_fgd)
    evac_process_a_fgd: string | undefined
    // gi/evacuations_fgd/evac_access_information_service_q_fgd [text] Question 2 (evacuations_fgd)
    evac_access_information_service_q_fgd: string | undefined
    // gi/evacuations_fgd/evac_access_information_service_a_fgd [text] Answer 2 (evacuations_fgd)
    evac_access_information_service_a_fgd: string | undefined
    // gi/evacuations_fgd/evac_safety_intentions_q_fgd [text] Question 3 (evacuations_fgd)
    evac_safety_intentions_q_fgd: string | undefined
    // gi/evacuations_fgd/evac_safety_intentions_a_fgd [text] Answer 3 (evacuations_fgd)
    evac_safety_intentions_a_fgd: string | undefined
    // gi/evacuations_fgd/evac_freedom_movement_q_fgd [text] Question 4 (evacuations_fgd)
    evac_freedom_movement_q_fgd: string | undefined
    // gi/evacuations_fgd/evac_freedom_movement_a_fgd [text] Answer 4 (evacuations_fgd)
    evac_freedom_movement_a_fgd: string | undefined
    // gi/evacuations_fgd/evac_child_protection_q_fgd [text] Question 5 (evacuations_fgd)
    evac_child_protection_q_fgd: string | undefined
    // gi/evacuations_fgd/evac_child_protection_a_fgd [text] Answer 5 (evacuations_fgd)
    evac_child_protection_a_fgd: string | undefined
    // gi/evacuations_fgd/evac_priority_needs_q_fgd [text] Question 6 (evacuations_fgd)
    evac_priority_needs_q_fgd: string | undefined
    // gi/evacuations_fgd/evac_priority_needs_a_fgd [text] Answer 6 (evacuations_fgd)
    evac_priority_needs_a_fgd: string | undefined
    // gi/evacuations_fgd/evac_social_cohesion_q_fgd [text] Question 7 (evacuations_fgd)
    evac_social_cohesion_q_fgd: string | undefined
    // gi/evacuations_fgd/evac_social_cohesion_a_fgd [text] Answer 7 (evacuations_fgd)
    evac_social_cohesion_a_fgd: string | undefined
    // gi/evacuations_fgd/evac_host_community_q_fgd [text] Question 8 (evacuations_fgd)
    evac_host_community_q_fgd: string | undefined
    // gi/evacuations_fgd/evac_host_community_a_fgd [text] Answer 8 (evacuations_fgd)
    evac_host_community_a_fgd: string | undefined
    // gi/evacuations_kii/profile_evacuated_population_q_kii [text] Question 1 (evacuations_kii)
    profile_evacuated_population_q_kii: string | undefined
    // gi/evacuations_kii/profile_evacuated_population_a_kii [text] Answer 1 (evacuations_kii)
    profile_evacuated_population_a_kii: string | undefined
    // gi/evacuations_kii/evac_process_q_kii [text] Question 2 (evacuations_kii)
    evac_process_q_kii: string | undefined
    // gi/evacuations_kii/evac_process_a_kii [text] Answer 2 (evacuations_kii)
    evac_process_a_kii: string | undefined
    // gi/evacuations_kii/evac_access_information_q_kii [text] Question 3 (evacuations_kii)
    evac_access_information_q_kii: string | undefined
    // gi/evacuations_kii/evac_access_information_a_kii [text] Answer 3 (evacuations_kii)
    evac_access_information_a_kii: string | undefined
    // gi/evacuations_kii/evac_safety_intentions_q_kii [text] Question 4 (evacuations_kii)
    evac_safety_intentions_q_kii: string | undefined
    // gi/evacuations_kii/evac_safety_intentions_a_kii [text] Answer 4 (evacuations_kii)
    evac_safety_intentions_a_kii: string | undefined
    // gi/evacuations_kii/evac_social_cohesion_q_kii [text] Question 5 (evacuations_kii)
    evac_social_cohesion_q_kii: string | undefined
    // gi/evacuations_kii/evac_social_cohesion_a_kii [text] Answer 5 (evacuations_kii)
    evac_social_cohesion_a_kii: string | undefined
    // gi/evacuations_kii_sp/profile_evacuated_population_q_kii_sp [text] Question 1 (evacuations_kii)
    profile_evacuated_population_q_kii_sp: string | undefined
    // gi/evacuations_kii_sp/profile_evacuated_population_a_kii_sp [text] Answer 1 (evacuations_kii)
    profile_evacuated_population_a_kii_sp: string | undefined
    // gi/evacuations_kii_sp/evac_process_q_kii_sp [text] Question 2 (evacuations_kii)
    evac_process_q_kii_sp: string | undefined
    // gi/evacuations_kii_sp/evac_process_a_kii_sp [text] Answer 2 (evacuations_kii)
    evac_process_a_kii_sp: string | undefined
    // gi/evacuations_kii_sp/evac_access_information_q_kii_sp [text] Question 3 (evacuations_kii)
    evac_access_information_q_kii_sp: string | undefined
    // gi/evacuations_kii_sp/evac_access_information_a_kii_sp [text] Answer 3 (evacuations_kii)
    evac_access_information_a_kii_sp: string | undefined
    // gi/power_outages/po_general_impact_q [text] Question 1 (power_outages)
    po_general_impact_q: string | undefined
    // gi/power_outages/po_general_impact_a [text] Answer 1 (power_outages)
    po_general_impact_a: string | undefined
    // gi/power_outages/po_safety_security_a [text] Question 2 (power_outages)
    po_safety_security_a: string | undefined
    // gi/power_outages/po_safety_security_q [text] Answer 2 (power_outages)
    po_safety_security_q: string | undefined
    // gi/power_outages/po_housing_safety_q [text] Question 3 (power_outages)
    po_housing_safety_q: string | undefined
    // gi/power_outages/po_housing_safety_a [text] Answer 3 (power_outages)
    po_housing_safety_a: string | undefined
    // gi/power_outages/po_access_services_q [text] Question 4 (power_outages)
    po_access_services_q: string | undefined
    // gi/power_outages/po_access_services_a [text] Answer 4 (power_outages)
    po_access_services_a: string | undefined
    // gi/power_outages/po_mental_health_q [text] Question 5 (power_outages)
    po_mental_health_q: string | undefined
    // gi/power_outages/po_mental_health_a [text] Answer 5 (power_outages)
    po_mental_health_a: string | undefined
    // gi/power_outages/po_coping_mechanisms_q [text] Question 6 (power_outages)
    po_coping_mechanisms_q: string | undefined
    // gi/power_outages/po_coping_mechanisms_a [text] Answer 6 (power_outages)
    po_coping_mechanisms_a: string | undefined
    // gi/access_compensation_mechanisms/acm_introduction_q [text] Question 1 (access_compensation_mechanisms)
    acm_introduction_q: string | undefined
    // gi/access_compensation_mechanisms/acm_introduction_a [text] Answer 1 (access_compensation_mechanisms)
    acm_introduction_a: string | undefined
    // gi/access_compensation_mechanisms/acm_administrative_barriers_q [text] Question 2 (access_compensation_mechanisms)
    acm_administrative_barriers_q: string | undefined
    // gi/access_compensation_mechanisms/acm_administrative_barriers_a [text] Answer 2 (access_compensation_mechanisms)
    acm_administrative_barriers_a: string | undefined
    // gi/access_compensation_mechanisms/acm_fg_barriers_q [text] Question 3 (access_compensation_mechanisms)
    acm_fg_barriers_q: string | undefined
    // gi/access_compensation_mechanisms/acm_fg_barriers_a [text] Answer 3 (access_compensation_mechanisms)
    acm_fg_barriers_a: string | undefined
    // gi/access_compensation_mechanisms/acm_information_barriers_q [text] Question 4 (access_compensation_mechanisms)
    acm_information_barriers_q: string | undefined
    // gi/access_compensation_mechanisms/acm_information_barriers_a [text] Answer 4 (access_compensation_mechanisms)
    acm_information_barriers_a: string | undefined
    // gi/access_compensation_mechanisms/acm_process_q [text] Question 5 (access_compensation_mechanisms)
    acm_process_q: string | undefined
    // gi/access_compensation_mechanisms/acm_process_a [text] Answer 5 (access_compensation_mechanisms)
    acm_process_a: string | undefined
    // gi/access_compensation_mechanisms/acm_impact_q [text] Question 6 (access_compensation_mechanisms)
    acm_impact_q: string | undefined
    // gi/access_compensation_mechanisms/acm_impact_a [text] Answer 6 (access_compensation_mechanisms)
    acm_impact_a: string | undefined
    // gi/access_compensation_mechanisms/acm_recommendations_q [text] Question 7 (access_compensation_mechanisms)
    acm_recommendations_q: string | undefined
    // gi/access_compensation_mechanisms/acm_recommendations_a [text] Answer 7 (access_compensation_mechanisms)
    acm_recommendations_a: string | undefined
    // gi/denial_access_resources/dar_introduction_q [text] Question 1 (denial_access_resources)
    dar_introduction_q: string | undefined
    // gi/denial_access_resources/dar_introduction_a [text] Answer 1 (denial_access_resources)
    dar_introduction_a: string | undefined
    // gi/denial_access_resources/dar_challenges_access_q [text] Question 2 (denial_access_resources)
    dar_challenges_access_q: string | undefined
    // gi/denial_access_resources/dar_challenges_access_a [text] Answer 2 (denial_access_resources)
    dar_challenges_access_a: string | undefined
    // gi/denial_access_resources/dar_consequences_risks_q [text] Question 3 (denial_access_resources)
    dar_consequences_risks_q: string | undefined
    // gi/denial_access_resources/dar_consequences_risks_a [text] Answer 3 (denial_access_resources)
    dar_consequences_risks_a: string | undefined
    // gi/denial_access_resources/dar_coping_mechanisms_q [text] Question 4 (denial_access_resources)
    dar_coping_mechanisms_q: string | undefined
    // gi/denial_access_resources/dar_coping_mechanisms_a [text] Answer 4 (denial_access_resources)
    dar_coping_mechanisms_a: string | undefined
    // gi/denial_access_resources/dar_recommendations_q [text] Question 5 (denial_access_resources)
    dar_recommendations_q: string | undefined
    // gi/denial_access_resources/dar_recommendations_a [text] Answer 5 (denial_access_resources)
    dar_recommendations_a: string | undefined
    // gi/access_documentation/ad_challenges_civil_q [text] Question 1 (access_documentation )
    ad_challenges_civil_q: string | undefined
    // gi/access_documentation/ad_challenges_civil_a [text] Answer 1 (access_documentation )
    ad_challenges_civil_a: string | undefined
    // gi/access_documentation/ad_lack_documentation_q [text] Question 2 (access_documentation )
    ad_lack_documentation_q: string | undefined
    // gi/access_documentation/ad_lack_documentation_a [text] Answer 2 (access_documentation )
    ad_lack_documentation_a: string | undefined
    // gi/access_documentation/ad_challenges_hlp_q [text] Question 3 (access_documentation )
    ad_challenges_hlp_q: string | undefined
    // gi/access_documentation/ad_challenges_hlp_a [text] Answer 3 (access_documentation )
    ad_challenges_hlp_a: string | undefined
    // gi/access_documentation/ad_lack_hlp_q [text] Question 4 (access_documentation )
    ad_lack_hlp_q: string | undefined
    // gi/access_documentation/ad_lack_hlp_a [text] Answer 4 (access_documentation )
    ad_lack_hlp_a: string | undefined
    // gi/access_documentation/ad_recommendations_q [text] Question 5 (access_documentation )
    ad_recommendations_q: string | undefined
    // gi/access_documentation/ad_recommendations_a [text] Answer 5 (access_documentation )
    ad_recommendations_a: string | undefined
    // gi/transportation_challenges/tc_introduction_q [text] Question 1 (transportation_challenges)
    tc_introduction_q: string | undefined
    // gi/transportation_challenges/tc_introduction_a [text] Answer 1 (transportation_challenges)
    tc_introduction_a: string | undefined
    // gi/transportation_challenges/tc_access_service_q [text] Question 2 (transportation_challenges)
    tc_access_service_q: string | undefined
    // gi/transportation_challenges/tc_access_service_a [text] Answer 2 (transportation_challenges)
    tc_access_service_a: string | undefined
    // gi/transportation_challenges/tc_education_q [text] Question 3 (transportation_challenges)
    tc_education_q: string | undefined
    // gi/transportation_challenges/tc_education_a [text] Answer 3 (transportation_challenges)
    tc_education_a: string | undefined
    // gi/transportation_challenges/tc_safety_q [text] Question 4 (transportation_challenges)
    tc_safety_q: string | undefined
    // gi/transportation_challenges/tc_safety_a [text] Answer 4 (transportation_challenges)
    tc_safety_a: string | undefined
    // gi/transportation_challenges/tc_coping_mechanisms_q [text] Question 5 (transportation_challenges)
    tc_coping_mechanisms_q: string | undefined
    // gi/transportation_challenges/tc_coping_mechanisms_a [text] Answer 5 (transportation_challenges)
    tc_coping_mechanisms_a: string | undefined
    // gi/secure_afforable_housing/sah_access_accommodation_q [text] Question 1 (secure_afforable_housing)
    sah_access_accommodation_q: string | undefined
    // gi/secure_afforable_housing/sah_access_accommodation_a [text] Answer 1 (secure_afforable_housing)
    sah_access_accommodation_a: string | undefined
    // gi/secure_afforable_housing/sah_security_tenure_q [text] Question 2 (secure_afforable_housing)
    sah_security_tenure_q: string | undefined
    // gi/secure_afforable_housing/sah_security_tenure_a [text] Answer 2 (secure_afforable_housing)
    sah_security_tenure_a: string | undefined
    // gi/secure_afforable_housing/sah_risk_eviction_q [text] Question 3 (secure_afforable_housing)
    sah_risk_eviction_q: string | undefined
    // gi/secure_afforable_housing/sah_risk_eviction_a [text] Answer 3 (secure_afforable_housing)
    sah_risk_eviction_a: string | undefined
    // gi/secure_afforable_housing/sah_damaged_housing_q [text] Question 4 (secure_afforable_housing)
    sah_damaged_housing_q: string | undefined
    // gi/secure_afforable_housing/sah_damaged_housing_a [text] Answer 4 (secure_afforable_housing)
    sah_damaged_housing_a: string | undefined
    // gi/secure_afforable_housing/sah_aob_q [text] Question 5 (secure_afforable_housing)
    sah_aob_q: string | undefined
    // gi/secure_afforable_housing/sah_aob_a [text] Answer 5 (secure_afforable_housing)
    sah_aob_a: string | undefined
    // gi/inclusion_accessibility/ia_general_questions_q [text] Question 1 (inclusion_accessibility)
    ia_general_questions_q: string | undefined
    // gi/inclusion_accessibility/ia_general_questions_a [text] Answer 1 (inclusion_accessibility)
    ia_general_questions_a: string | undefined
    // gi/inclusion_accessibility/ia_physical_accessibility_q [text] Question 2 (inclusion_accessibility)
    ia_physical_accessibility_q: string | undefined
    // gi/inclusion_accessibility/ia_physical_accessibility_a [text] Answer 2 (inclusion_accessibility)
    ia_physical_accessibility_a: string | undefined
    // gi/inclusion_accessibility/ia_transport_accessibility_q [text] Question 3 (inclusion_accessibility)
    ia_transport_accessibility_q: string | undefined
    // gi/inclusion_accessibility/ia_transport_accessibility_a [text] Answer 3 (inclusion_accessibility)
    ia_transport_accessibility_a: string | undefined
    // gi/inclusion_accessibility/ia_information_accessibility_q [text] Question 4 (inclusion_accessibility)
    ia_information_accessibility_q: string | undefined
    // gi/inclusion_accessibility/ia_information_accessibility_a [text] Answer 4 (inclusion_accessibility)
    ia_information_accessibility_a: string | undefined
    // gi/inclusion_accessibility/ia_ [text] Question 5 (inclusion_accessibility)
    ia_: string | undefined
    // gi/inclusion_accessibility/ia [text] Answer 5 (inclusion_accessibility)
    ia: string | undefined
    // gi/topic_all/main_healthcare_available_area_q_all [text] Question 1: (other topic)
    main_healthcare_available_area_q_all: string | undefined
    // gi/topic_all/main_healthcare_available_area_a_all [text] Answer 1: (other topic)
    main_healthcare_available_area_a_all: string | undefined
    // gi/topic_all/primary_types_specialized_health_q_all [text] Question 2: (other topic)
    primary_types_specialized_health_q_all: string | undefined
    // gi/topic_all/primary_types_specialized_health_a_all [text] Answer 2: (other topic)
    primary_types_specialized_health_a_all: string | undefined
    // gi/topic_all/medication_available_accessible_area_q_all [text] Question 3: (other topic)
    medication_available_accessible_area_q_all: string | undefined
    // gi/topic_all/medication_available_accessible_area_a_all [text] Answer 3: (other topic)
    medication_available_accessible_area_a_all: string | undefined
    // gi/topic_all/population_groups_access_healthcare_q_all [text] Question 4: (other topic)
    population_groups_access_healthcare_q_all: string | undefined
    // gi/topic_all/population_groups_access_healthcare_a_all [text] Answer 4: (other topic)
    population_groups_access_healthcare_a_all: string | undefined
    // gi/topic_all/local_initiatives_aimed_health_q_all [text] Question 5: (other topic)
    local_initiatives_aimed_health_q_all: string | undefined
    // gi/topic_all/local_initiatives_aimed_health_a_all [text] Answer 5: (other topic)
    local_initiatives_aimed_health_a_all: string | undefined
    // gi/topic_all/issues_share_today_q_all [text] Question 6: (other topic)
    issues_share_today_q_all: string | undefined
    // gi/topic_all/issues_share_today_a_all [text] Answer 6: (other topic)
    issues_share_today_a_all: string | undefined
    // gi/topic_all/other_issues_concerns_disability_q_all [text] Question 7: (other topic)
    other_issues_concerns_disability_q_all: string | undefined
    // gi/topic_all/other_issues_concerns_disability_a_all [text] Answer 7: (other topic)
    other_issues_concerns_disability_a_all: string | undefined
    // gi/topic_all/question8_topic_all [text] Question 8: (other topic)
    question8_topic_all: string | undefined
    // gi/topic_all/answer8_topic_all [text] Answer 8: (other topic)
    answer8_topic_all: string | undefined
    // gi/topic_all/question9_topic_all [text] Question 9: (other topic)
    question9_topic_all: string | undefined
    // gi/topic_all/answer9_topic_all [text] Answer 9: (other topic)
    answer9_topic_all: string | undefined
    // gi/topic_all/question10_topic_all [text] Question 10: (other topic)
    question10_topic_all: string | undefined
    // gi/topic_all/answer10_topic_all [text] Answer 10: (other topic)
    answer10_topic_all: string | undefined
    // gi/comments [text] Comments
    comments: string | undefined
  }
  export const options = {
    staff_to_insert_their_DRC_office: {
      chernihiv: `Chernihiv`,
      dnipro: `Dnipro`,
      kharkiv: `Kharkiv`,
      lviv: `Lviv`,
      mykolaiv: `Mykolaiv`,
      sumy: `Sumy`,
      slovyansk: `Slovyansk`,
    },
    staff_code_001: {
      CEJ001: `CEJ001`,
      CEJ002: `CEJ002`,
      CEJ003: `CEJ003`,
      CEJ004: `CEJ004`,
      CEJ005: `CEJ005`,
      CEJ006: `CEJ006`,
      CEJ007: `CEJ007`,
      CEJ008: `CEJ008`,
      CEJ009: `CEJ009`,
      CEJ010: `CEJ010`,
      CEJ011: `CEJ011`,
      CEJ012: `CEJ012`,
      CEJ013: `CEJ013`,
      CEJ014: `CEJ014`,
      CEJ015: `CEJ015`,
      CEJ016: `CEJ016`,
      CEJ017: `CEJ017`,
      CEJ018: `CEJ018`,
      CEJ019: `CEJ019`,
      CEJ020: `CEJ020`,
      UMY001: `UMY001`,
      UMY002: `UMY002`,
      UMY003: `UMY003`,
      UMY004: `UMY004`,
      UMY005: `UMY005`,
      UMY006: `UMY006`,
      UMY007: `UMY007`,
      UMY008: `UMY008`,
      UMY009: `UMY009`,
      UMY010: `UMY010`,
      UMY011: `UMY011`,
      UMY012: `UMY012`,
      UMY013: `UMY013`,
      UMY014: `UMY014`,
      UMY015: `UMY015`,
      UMY016: `UMY016`,
      UMY017: `UMY017`,
      UMY018: `UMY018`,
      UMY019: `UMY019`,
      UMY020: `UMY020`,
      HRK001: `HRK001`,
      HRK002: `HRK002`,
      HRK003: `HRK003`,
      HRK004: `HRK004`,
      HRK005: `HRK005`,
      HRK006: `HRK006`,
      HRK007: `HRK007`,
      HRK008: `HRK008`,
      HRK009: `HRK009`,
      HRK010: `HRK010`,
      HRK011: `HRK011`,
      HRK012: `HRK012`,
      HRK013: `HRK013`,
      HRK014: `HRK014`,
      HRK015: `HRK015`,
      HRK016: `HRK016`,
      HRK017: `HRK017`,
      HRK018: `HRK018`,
      HRK019: `HRK019`,
      HRK020: `HRK020`,
      DNK001: `DNK001`,
      DNK002: `DNK002`,
      DNK003: `DNK003`,
      DNK004: `DNK004`,
      DNK005: `DNK005`,
      DNK006: `DNK006`,
      DNK007: `DNK007`,
      DNK008: `DNK008`,
      DNK009: `DNK009`,
      DNK010: `DNK010`,
      DNK011: `DNK011`,
      DNK012: `DNK012`,
      DNK013: `DNK013`,
      DNK014: `DNK014`,
      DNK015: `DNK015`,
      DNK016: `DNK016`,
      DNK017: `DNK017`,
      DNK018: `DNK018`,
      DNK019: `DNK019`,
      DNK020: `DNK020`,
      LWO001: `LWO001`,
      LWO002: `LWO002`,
      LWO003: `LWO003`,
      LWO004: `LWO004`,
      LWO005: `LWO005`,
      LWO006: `LWO006`,
      LWO007: `LWO007`,
      LWO008: `LWO008`,
      LWO009: `LWO009`,
      LWO010: `LWO010`,
      LWO011: `LWO011`,
      LWO012: `LWO012`,
      LWO013: `LWO013`,
      LWO014: `LWO014`,
      LWO015: `LWO015`,
      NVL001: `NLV001`,
      NVL002: `NLV002`,
      NVL003: `NLV003`,
      NVL004: `NLV004`,
      NVL005: `NLV005`,
      NVL006: `NLV006`,
      NVL007: `NLV007`,
      NVL008: `NLV008`,
      NVL009: `NLV009`,
      NVL010: `NLV010`,
      NVL011: `NLV011`,
      NVL012: `NLV012`,
      NVL013: `NLV013`,
      NVL014: `NLV014`,
      NVL015: `NLV015`,
      NVL016: `NLV016`,
      NVL017: `NLV017`,
      NVL018: `NLV018`,
      NVL019: `NLV019`,
      NVL020: `NLV020`,
      SLO001: `SLO001`,
      SLO002: `SLO002`,
      SLO003: `SLO003`,
      SLO004: `SLO004`,
      SLO005: `SLO005`,
      SLO006: `SLO006`,
      SLO007: `SLO007`,
      SLO008: `SLO008`,
      SLO009: `SLO009`,
      SLO010: `SLO010`,
      SLO011: `SLO011`,
      SLO012: `SLO012`,
      SLO013: `SLO013`,
      SLO014: `SLO014`,
      SLO015: `SLO015`,
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
    ben_det_type_site: {
      rural: `Rural area`,
      urban: `Urban area`,
    },
    activity: {
      kll: `KII`,
      fgd: `FGD`,
      observation: `Observation`,
    },
    pmt_interviewed_before: {
      yes: `Yes`,
      no: `No`,
    },
    informant_role: {
      loau: `Local authority representative`,
      cogr: `Community group representative`,
      rein: `Representative of international NGO`,
      rena: `Representative of national NGO`,
      reor: `Representative of CSOs/community-based organizations`,
      sowo: `Social worker`,
      teacher: `Teacher`,
      hewo: `Health worker`,
      huwo: `Humanitarian/social worker`,
      other: `Other`,
    },
    hh_char_hh_det_gender: {
      male: `Male`,
      female: `Female`,
      other: `Other`,
      unspecified: `Unspecified`,
    },
    hh_char_hh_det_status: {
      idp: `IDP`,
      returnee: `Returnee`,
      'non-displaced': `Non-displaced`,
      unspec: `Unspecified`,
      other: `Other`,
    },
    category_topic: {
      essential_services: `Essential services`,
      protection_concerns: `Protection concerns`,
      persons_specific_needs: `Persons with specific needs`,
      economic_opportunities: `Economic opportunities`,
      other: `Other`,
    },
    topic: {
      social_cohesion: `Social cohesion`,
      idp_allowance_cuts: `IDP Allowance Cuts`,
      changes_mobilization_law: `Changes in Mobilization Law`,
      changes_mobilization_law_iwg: `Changes in mobilization law – Impact on women and girls`,
      access_protection_service: `Access to social protection services`,
      access_healthcare: `Access to Healthcare services`,
      access_social: `Civil status and access to social services and benefits`,
      access_basic: `Access to basic services`,
      access_information: `Access to information on available services`,
      challenges_faced_elderly: `Challenges faced by elderly people`,
      challenges_faced_disabilities_pwds: `Challenges faced by People with Disabilities (PwDs)`,
      access_accommodation: `Access to accommodation in collective sites`,
      access_employment: `Access to employment`,
      perception_safety: `Perception of Safety and Security Conditions`,
      access_mhpss: `Access to MHPSS services`,
      access_education: `Access to education in rural hromadas`,
      challenges_related: `Challenges related to accessing clean water`,
      transportation_issues: `Transportation issues in rural areas`,
      transportation_challenges: `Transportation challenges`,
      power_outages: `Power outages`,
      limited_mobility: `Limited mobility and access to services for PwDs`,
      employment_challenges: `Employment challenges for men subjected to military conscription`,
      existing_risks_online_education: `Existing risks in online education of children`,
      access_rehabilitation: `Issues in ensuring access to rehabilitation resources for PwDs`,
      evacuations: `Evacuations`,
      denial_access_resources: `Denial of access to resources and services`,
      access_compensation_mechanisms: `Access to compensation mechanisms`,
      access_documentation: `Access to documentation`,
      women_roles_armed_conflic: `Women Roles During Armed Conflict`,
      secure_afforable_housing: `Access to secure and afforable housing parallel`,
      inclusion_accessibility: `Inclusion and Accessibility`,
      other: `Other`,
    },
    key_informant_difficulty: {
      no: `No`,
      seeing: `Seeing, even if wearing glasses`,
      hearing: `Hearing, even if using a hearing aid`,
      walking: `Walking or climbing steps`,
      remembering_concentrating: `Remembering or concentrating`,
      self_care: `Self-care, such as washing all over or dressing`,
      using_usual_language: `Using your usual (customary) language, have difficulty communicating, for example understanding or being understood?`,
      uu: `Unable/unwilling to answer`,
    },
    disability_status_government: {
      yes: `Yes`,
      no: `No`,
      uu: `Unable/unwilling to answer`,
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
      informant_age: _.informant_age ? +_.informant_age : undefined,
      key_informant_difficulty: _.key_informant_difficulty?.split(' '),
      numb_part: _.numb_part ? +_.numb_part : undefined,
      hh_char_hh_det: _['hh_char_hh_det']?.map(extractQuestionName).map((_: any) => {
        _['hh_char_hh_det_age'] = _.hh_char_hh_det_age ? +_.hh_char_hh_det_age : undefined
        return _
      }),
      category_topic: _.category_topic?.split(' '),
      topic: _.topic?.split(' '),
    }) as T
}
