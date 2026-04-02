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
    // introduction/ben_det_hromada_001 [select_one_from_file] Specify settlement(village(city neighborhood
    ben_det_hromada_001: string
    // introduction/ben_det_type_site [select_one] Type of site
    ben_det_type_site: undefined | Option<'ben_det_type_site'>
    // gi/activity [select_one] Which activity have you conducted?
    activity: undefined | Option<'activity'>
    // gi/pmt_npc [select_one] Is it a PMT KII (NPC)?
    pmt_npc: undefined | Option<'informed_rental_subsidy'>
    // gi/pmt_interviewed_before [select_one] Have they been interviewed before?
    pmt_interviewed_before: undefined | Option<'informed_rental_subsidy'>
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
          cal_idp: string | undefined
        }[]
      | undefined
    cal_total_idp: string
    // gi/category_topic [select_multiple] Category of topics
    category_topic: undefined | Option<'category_topic'>[]
    calc_type_activity: string
    calc_essential_services: string
    calc_protection_concerns: string
    calc_persons_specific_needs: string
    calc_economic_opportunities: string
    calc_veterans: string
    calc_community_psychosocial_needs: string
    calc_other: string
    // gi/topic [select_multiple] Topic
    topic: undefined | Option<'topic'>[]
    // gi/topic_other [text] If "Other", please specify
    topic_other: string | undefined
    // gi/challenges_faced_PwDs/ongoing_conflict_affected_disability_a [text] Answer 1: (challenges faced PwDs)
    ongoing_conflict_affected_disability_a: string | undefined
    // gi/challenges_faced_PwDs/types_governmental_services_provided_a [text] What types of governmental services are provided to people with disabilities in the hromada?  Do people with disabilities experience any challenges accessing medical services and medicines, social services, transport, employment, and education? If yes, what specific access barriers do persons with disabilities experience? How could their accessibility for people with disabilities be improved?
    types_governmental_services_provided_a: string | undefined
    // gi/challenges_faced_PwDs/assistance_support_humanitarian_organizations_a [text] What types of help or support do people with disabilities receive from humanitarian organizations? Do you have any suggestions about how to improve these services? What government social programs and benefits are available for people with disabilities in your hromada? Are they barriers arising in the process of receiving social benefits for people with disabilities? If so, please explain.
    assistance_support_humanitarian_organizations_a: string | undefined
    // gi/challenges_faced_PwDs/get_information_available_services_a [text] How do you get information about available services and assistance for people with disabilities? What format or method of communication do you find most convenient and effective?
    get_information_available_services_a: string | undefined
    // gi/challenges_faced_PwDs/specific_types_equipment_need_a [text] Are there any specific types of equipment or devices that people with disabilities need to manage their disability? Are there any barriers or challenges in accessing these equipment(devices? If yes, please explain.
    specific_types_equipment_need_a: string | undefined
    // gi/challenges_faced_PwDs/types_rehabilitation_services_a [text] What types of rehabilitation services are available for people with disabilities in your hromada? Are you satisfied with the quality and availability of these rehabilitation services? What obstacles exist in accessing rehabilitation services for people with disabilities? How can they be overcome?
    types_rehabilitation_services_a: string | undefined
    // gi/challenges_faced_PwDs/specialized_institutions_disabilities_a [text] Are there specialized institutions for people with disabilities in your region? What types of institutions are available (geriatric boarding houses, rehabilitation centers, etc.)? What are the living conditions in such institutions? Are medical care, physical therapy, psychological support, training and vocational rehabilitation available? Are the premises, equipment and areas adapted to meet the needs of people with disabilities?
    specialized_institutions_disabilities_a: string | undefined
    // gi/challenges_faced_PwDs/suffering_forms_discrimination_stigmatization_a [text] Do people with disabilities suffer from forms of discrimination or stigmatization in the hromada? What specific examples or situations of discrimination or stigmatization do you observe in relation to people with disabilities in your hromada? How can we support greater participation of people with disabilities in public life and ensure their social integration?
    suffering_forms_discrimination_stigmatization_a: string | undefined
    // gi/challenges_faced_PwDs/legal_help_support_a [text] Are people with disabilities facing challenges getting legal help or support? Is the procedure to establish(renew disability status clear and transparent? What challenges are reported by people with disabilities during this procedure? Have there been cases of unjustified refusal to establish(renew disability status?
    legal_help_support_a: string | undefined
    // gi/challenges_faced_PwDs/other_issues_concerns_disability_a [text] Are there any other issues or issues related to disability and the ongoing conflict that you would like to discuss or bring to our attention? What additional measures do you consider necessary to improve the living conditions of people with disabilities during a conflict?
    other_issues_concerns_disability_a: string | undefined
    // gi/social_cohesion_kii/experience_dynamics_between_communities_a [text] According to your experience, how would you define dynamics between communities in this location, including between displaced and non_displaced communities? How close do communities feel to each other? How effectively have different communities been able to communicate and understand each others needs and concerns?
    experience_dynamics_between_communities_a: string | undefined
    // gi/social_cohesion_kii/main_challenges_displaced_communities_a [text] What are some of the main challenges faced by the displaced communities in terms of integration or acceptance within the host communities? Is access to education, healthcare, livelihood opportunities and other essential services fair to all communities?
    main_challenges_displaced_communities_a: string | undefined
    // gi/social_cohesion_kii/forms_social_tensions_communities_a [text] Are there any forms of social tensions or conflicts between communities? If yes, what types of social tensions or conflicts have been observed? How have these tensions manifested in terms of interactions, behaviors, or attitudes between communities? What are the key factors or root causes contributing to these tensions from your perspective?
    forms_social_tensions_communities_a: string | undefined
    // gi/social_cohesion_kii/efforts_made_promote_integration_a [text] Have there been any efforts made to promote integration, social cohesion and conflict resolution within the community? If so, what were these initiatives(programs and what was their impact? Are there any existing platforms or mechanisms for dialogue and collaboration between communities? How successful have they been?
    efforts_made_promote_integration_a: string | undefined
    // gi/social_cohesion_kii/stakeholders_involved_social_communities_a [text] Who are the key stakeholders involved in addressing social tensions between communities (e.g., local authorities, community leaders, humanitarian actors, other stakeholders)? How have these stakeholders been engaged, and what roles do they currently play in mitigating tensions? What role do you think they should play in addressing social tensions and promoting social cohesion?
    stakeholders_involved_social_communities_a: string | undefined
    // gi/social_cohesion_kii/steps_strategies_social_tensions_a [text] In your opinion, what steps or strategies could be taken to alleviate the social tensions and foster greater harmony between communities?
    steps_strategies_social_tensions_a: string | undefined
    // gi/social_cohesion_fgd/relationship_host_community_a [text] How is your relationship with the host community(IDP community (to be adjusted based on participant group)?  - a. Why do you feel this way?  - b. What are the main challenges you have with the host(IDP community?
    relationship_host_community_a: string | undefined
    // gi/social_cohesion_fgd/community_local_authorities_support_a [text] Are you your community able to turn to local authorities for support or help?  - a. Why or why not?  - b. What needs to change for you to be able to do this?
    community_local_authorities_support_a: string | undefined
    // gi/social_cohesion_fgd/any_forms_social_tensions_a [text] Are there any forms of social tensions or conflicts between displaced and non displaced communities?  - a. If yes, what types of social tensions or conflicts have been observed experienced? How have these tensions manifested in terms of interactions, behaviors, or attitudes between communities?  - b. Are any groups more affected than other groups?
    any_forms_social_tensions_a: string | undefined
    // gi/social_cohesion_fgd/humanitarian_organizations_community_relevant_a [text] What are local authorities, humanitarian organizations, community stakeholders and other relevant stakeholders doing to address social tensions? How do you think these stakeholders could promote social cohesion(mitigate tensions between communities?
    humanitarian_organizations_community_relevant_a: string | undefined
    // gi/social_cohesion_fgd/activities_think_strengthen_social_a [text] What initiatives or activities do you think could help strengthen social bonds between communities in this location? What would be your role as a community to support connectedness and communal way of living?
    activities_think_strengthen_social_a: string | undefined
    // gi/social_cohesion_ok_kii/scok_overall_relations [text] 1.1 Overall relations
    scok_overall_relations: string | undefined
    // gi/social_cohesion_ok_kii/scok_trend [text] 1.2 Trend:
    scok_trend: string | undefined
    // gi/social_cohesion_ok_kii/scok_tensions_cohesion_risks [text] 1.3 Tensions and cohesion risks:
    scok_tensions_cohesion_risks: string | undefined
    // gi/social_cohesion_ok_kii/scok_inclusion_exclusion_patterns [text] 2.1 Inclusion(exclusion patterns:
    scok_inclusion_exclusion_patterns: string | undefined
    // gi/social_cohesion_ok_kii/scok_provision_humanitarian_assistance [text] 3.1 Provision of humanitarian assistance:
    scok_provision_humanitarian_assistance: string | undefined
    // gi/social_cohesion_ok_kii/scok_humanitarian_assistance_reaching [text] 3.1.1 In your view, is humanitarian assistance reaching the people who need it most? Why or why not?
    scok_humanitarian_assistance_reaching: string | undefined
    // gi/social_cohesion_ok_kii/scok_groups_included_excluded [text] 3.1.2 Are there any groups who you think are consistently included or excluded from assistance? What reasons are usually given for this?
    scok_groups_included_excluded: string | undefined
    // gi/social_cohesion_ok_kii/scok_clear_eligibility_criteria [text] 3.1.3 How clear do people feel the eligibility criteria and selection process for assistance are?
    scok_clear_eligibility_criteria: string | undefined
    // gi/social_cohesion_ok_kii/scok_service_delivery [text] 3.2 Service delivery:
    scok_service_delivery: string | undefined
    // gi/social_cohesion_ok_kii/scok_community_safety_trust [text] 4.1 Community safety and trust
    scok_community_safety_trust: string | undefined
    // gi/social_cohesion_ok_kii/scok_participation_connection [text] 4.2 Participation and connection:
    scok_participation_connection: string | undefined
    // gi/social_cohesion_ok_kii/scok_community_authority_relations [text] 4.3 Community–authority relations:
    scok_community_authority_relations: string | undefined
    // gi/social_cohesion_ok_kii/scok_connectors_strengthen_cohesion [text] 4.4 Connectors that strengthen cohesion:
    scok_connectors_strengthen_cohesion: string | undefined
    // gi/social_cohesion_ok_fgd/scof_social_services_inclusion [text] 1.1 Social services and inclusion:
    scof_social_services_inclusion: string | undefined
    // gi/social_cohesion_ok_fgd/scof_relations_local_authorities [text] 1.2 Relations with local authorities:
    scof_relations_local_authorities: string | undefined
    // gi/social_cohesion_ok_fgd/scof_belonging_shared_goals [text] 1.3 Belonging and shared goals
    scof_belonging_shared_goals: string | undefined
    // gi/social_cohesion_ok_fgd/scof_what_strengthen_cohesion [text] 2.1 What would strengthen cohesion:
    scof_what_strengthen_cohesion: string | undefined
    // gi/social_cohesion_ok_fgd/scof_feels_left_out [text] 2.2 Who feels left out
    scof_feels_left_out: string | undefined
    // gi/social_cohesion_ok_fgd/scof_community_spaces [text] 3.1 Community spaces:
    scof_community_spaces: string | undefined
    // gi/social_cohesion_ok_fgd/scof_stigma_discrimination [text] 3.2 Stigma and discrimination:
    scof_stigma_discrimination: string | undefined
    // gi/social_cohesion_ok_fgd/scof_insecurity_social_life [text] 4.1 Effects of insecurity on social life:
    scof_insecurity_social_life: string | undefined
    // gi/social_cohesion_ok_fgd/scof_trust_between_neighbours [text] 4.2 Trust between neighbours:
    scof_trust_between_neighbours: string | undefined
    // gi/social_cohesion_ok_fgd/scof_fairness_transparency [text] 5.1 Fairness and transparency:
    scof_fairness_transparency: string | undefined
    // gi/access_healthcare_services/main_healthcare_available_area_a [text] What are the main healthcare services available in the area? Are they accessible, including for persons with disabilities? What are the main challenges(gaps community members face in accessing quality healthcare services?
    main_healthcare_available_area_a: string | undefined
    // gi/access_healthcare_services/primary_types_specialized_health_a [text] What are the primary types of specialized health services that are in high demand or particularly essential in this area? What are the key barriers or obstacles that community members encounter when seeking specialized health services?
    primary_types_specialized_health_a: string | undefined
    // gi/access_healthcare_services/medication_available_accessible_area_a [text] Is medication available and accessible in this area? What are the main obstacles faced by community members in accessing medication? Is affordable medication available in this area ?
    medication_available_accessible_area_a: string | undefined
    // gi/access_healthcare_services/population_groups_access_healthcare_a [text] Can all population groups access healthcare services and medication? Are there disparities in healthcare access among different groups (based on age, gender, socioeconomic status, etc.)?
    population_groups_access_healthcare_a: string | undefined
    // gi/access_healthcare_services/local_initiatives_aimed_health_a [text] Are you aware of any local or community(based initiatives aimed at improving access to health services?
    local_initiatives_aimed_health_a: string | undefined
    // gi/access_healthcare_services/issues_share_today_a [text] Are there other issues you would like to share today? Do you have any potential recommendations or solutions you would like to raise for improving access to healthcare?
    issues_share_today_a: string | undefined
    // gi/access_social_services_fgd/answer1_access_social_services_fgd [text] Can you share your knowledge of the social services available in the area, including legal services, educational support, social assistance, and more?
    answer1_access_social_services_fgd: string | undefined
    // gi/access_social_services_fgd/answer2_access_social_services_fgd [text] Are you familiar with any social service providers operating in the area? If so, what can you tell us about their services and impact?
    answer2_access_social_services_fgd: string | undefined
    // gi/access_social_services_fgd/answer3_access_social_services_fgd [text] What do you believe are the primary types of social services that are in high demand or particularly essential in this area?
    answer3_access_social_services_fgd: string | undefined
    // gi/access_social_services_fgd/answer4_access_social_services_fgd [text] From your observations, which categories of the population seem to apply for social services most frequently, and what vulnerabilities do they typically face?
    answer4_access_social_services_fgd: string | undefined
    // gi/access_social_services_fgd/answer5_access_social_services_fgd [text] What are some of the key barriers or obstacles that community members face when they seek out social services?
    answer5_access_social_services_fgd: string | undefined
    // gi/access_social_services_fgd/answer6_access_social_services_fgd [text] Can you discuss any disparities you've observed in access to social services among different groups within the community, such as based on socioeconomic status, age, gender, or other factors?
    answer6_access_social_services_fgd: string | undefined
    // gi/access_social_services_fgd/answer7_access_social_services_fgd [text] Do you believe the existing transportation services adequately provide access to social services for residents living in various types of settlements (e.g., rural, urban)? If not, what are the main reasons for this perceived inadequacy, and what strategies do you think could be employed to improve the situation?
    answer7_access_social_services_fgd: string | undefined
    // gi/access_social_services_fgd/answer8_access_social_services_fgd [text] Are there any NGOs active in the area that you're aware of, either providing social services directly or working to improve access to them? If so, what do you know about their efforts?
    answer8_access_social_services_fgd: string | undefined
    // gi/access_social_services_fgd/answer9_access_social_services_fgd [text] What potential recommendations or solutions do you envision for improving access to social services in the area? Additionally, are there any other issues or perspectives you'd like to share today?
    answer9_access_social_services_fgd: string | undefined
    // gi/access_social_services_fgd/answer10_access_social_services_fgd [text] Answer 10: (access social services fgd)
    answer10_access_social_services_fgd: string | undefined
    // gi/access_social_services_kii_decision_makers/answer1_access_social_services_kii_decision_makers [text] What types of social services are available within the hromada for its residents, and do you perceive a need for additional services?
    answer1_access_social_services_kii_decision_makers: string | undefined
    // gi/access_social_services_kii_decision_makers/answer2_access_social_services_kii_decision_makers [text] Are emergency social support services accessible within this community? If not what can be done to improve access?
    answer2_access_social_services_kii_decision_makers: string | undefined
    // gi/access_social_services_kii_decision_makers/answer3_access_social_services_kii_decision_makers [text] How do you determine which service to provide in specific locations? Is there a prioritization mechanism in place?
    answer3_access_social_services_kii_decision_makers: string | undefined
    // gi/access_social_services_kii_decision_makers/answer4_access_social_services_kii_decision_makers [text] What, in your opinion, are the most significant social service needs in your areas of responsibility? Are there any plans or proposals to address these needs?
    answer4_access_social_services_kii_decision_makers: string | undefined
    // gi/access_social_services_kii_decision_makers/answer5_access_social_services_kii_decision_makers [text] What are the main barriers and problems in accessing social services in this region? Do you have any potential proposals or solutions to overcome these barriers?
    answer5_access_social_services_kii_decision_makers: string | undefined
    // gi/access_social_services_kii_decision_makers/answer6_access_social_services_kii_decision_makers [text] What is the typical timeframe for receiving a result on a social services application? Do you believe the processing time is reasonable, and has the conflict affected this duration?
    answer6_access_social_services_kii_decision_makers: string | undefined
    // gi/access_social_services_kii_decision_makers/answer7_access_social_services_kii_decision_makers [text] If an application for social services is declined, what recourse is available, and is there a mechanism to challenge decisions regarding denied applications? Are there any barriers in the community to access this mechanism?
    answer7_access_social_services_kii_decision_makers: string | undefined
    // gi/access_social_services_kii_decision_makers/answer8_access_social_services_kii_decision_makers [text] What alternative support resources are available for individuals ineligible for social services?
    answer8_access_social_services_kii_decision_makers: string | undefined
    // gi/access_social_services_kii_decision_makers/answer9_access_social_services_kii_decision_makers [text] What procedures should be followed to report suspicions of fraud or misuse related to social services, and do you think they are effective? How can access to this reporting mechanism be improved?
    answer9_access_social_services_kii_decision_makers: string | undefined
    // gi/access_social_services_kii_decision_makers/answer10_access_social_services_kii_decision_makers [text] Are there other issues you would like to discuss today? Do you have any recommendations or solutions you'd like to propose for improving access to social services? ( Чи є інші питання, які ви хотіли б обговорити сьогодні?
    answer10_access_social_services_kii_decision_makers: string | undefined
    // gi/access_social_services_kii_poc/answer1_access_social_services_kii_poc [text] Can you identify the primary social services available in your area and which ones you consider most crucial?
    answer1_access_social_services_kii_poc: string | undefined
    // gi/access_social_services_kii_poc/answer2_access_social_services_kii_poc [text] Who do you believe are the most vulnerable populations in need of social services locally, and what specific services do they require?
    answer2_access_social_services_kii_poc: string | undefined
    // gi/access_social_services_kii_poc/answer3_access_social_services_kii_poc [text] What are the top types of social services that are urgently needed or deemed essential within this community but currently not available?
    answer3_access_social_services_kii_poc: string | undefined
    // gi/access_social_services_kii_poc/answer4_access_social_services_kii_poc [text] What are the primary barriers or challenges that individuals face when attempting to access social services? How do you think these barriers or challenges can be overcome?
    answer4_access_social_services_kii_poc: string | undefined
    // gi/access_social_services_kii_poc/answer5_access_social_services_kii_poc [text] How do individuals typically reach out for social services when needed (e.g., in person, online, via phone.? Do you believe transportation services adequately facilitate access to these services, or do improvements need to be made?
    answer5_access_social_services_kii_poc: string | undefined
    // gi/access_social_services_kii_poc/answer6_access_social_services_kii_poc [text] Do you perceive any disparities or obstacles in accessing social services among different demographic groups, such as based on socioeconomic status, displacement status, or disability? If so, what do you believe are the primary reasons for these disparities or obstacles and how do they manifest themselves?
    answer6_access_social_services_kii_poc: string | undefined
    // gi/access_social_services_kii_poc/answer7_access_social_services_kii_poc [text] Are you familiar with any organizations or agencies (State, NGOs or religious institutions) providing services to overcome these barriers in the area?
    answer7_access_social_services_kii_poc: string | undefined
    // gi/access_social_services_kii_poc/answer8_access_social_services_kii_poc [text] How can community members be better informed about the social services available to them, and what efforts do you think should be made to ensure equitable access for all residents?
    answer8_access_social_services_kii_poc: string | undefined
    // gi/access_social_services_kii_poc/answer9_access_social_services_kii_poc [text] Are there other issues you would like to share today? Do you have any potential recommendations or solutions you'd like to raise for improving access to social services?
    answer9_access_social_services_kii_poc: string | undefined
    // gi/access_social_services_kii_poc/question10_access_social_services_kii_poc [text] Question 10: (access social services kii poc)
    question10_access_social_services_kii_poc: string | undefined
    // gi/access_social_services_kii_poc/answer10_access_social_services_kii_poc [text] Answer 10: (access social services kii poc)
    answer10_access_social_services_kii_poc: string | undefined
    // gi/access_social_services_kii_service_providers/answer1_access_social_services_kii_service_providers [text] What types of social services do social workers provide in the community?  Are there any specialized assistance programs tailored to different demographic groups (e.g., IDPs, GBV survivors) available in the community?
    answer1_access_social_services_kii_service_providers: string | undefined
    // gi/access_social_services_kii_service_providers/answer2_access_social_services_kii_service_providers [text] Which demographic groups most frequently apply for social services (e.g., men, women, elderly, IDPs) and what vulnerabilities do they typically face?
    answer2_access_social_services_kii_service_providers: string | undefined
    // gi/access_social_services_kii_service_providers/answer3_access_social_services_kii_service_providers [text] What are the most common problems or challenges that people seek assistance for from social services?
    answer3_access_social_services_kii_service_providers: string | undefined
    // gi/access_social_services_kii_service_providers/answer4_access_social_services_kii_service_providers [text] In your view, what are some of the key barriers preventing people from accessing social services?
    answer4_access_social_services_kii_service_providers: string | undefined
    // gi/access_social_services_kii_service_providers/answer5_access_social_services_kii_service_providers [text] Do you think that transportation services are adequate to provide equal access to all for accessing social services? If not, are there differences between different settlement types (rural, urban, etc.) and what are the main reasons for that?
    answer5_access_social_services_kii_service_providers: string | undefined
    // gi/access_social_services_kii_service_providers/answer6_access_social_services_kii_service_providers [text] From your perspective, what are the most crucial social services currently lacking in the community, and what measures are needed to enhance the overall quality of social services?
    answer6_access_social_services_kii_service_providers: string | undefined
    // gi/access_social_services_kii_service_providers/answer7_access_social_services_kii_service_providers [text] From your perspective, what are the major challenges that social services are currently facing in your area of responsibility?
    answer7_access_social_services_kii_service_providers: string | undefined
    // gi/access_social_services_kii_service_providers/answer8_access_social_services_kii_service_providers [text] Do you believe IDPs are well_informed about the existing social services, and what are the most common issues they seek assistance for? If their needs differ from the host community, what do you think are the reasons for this?
    answer8_access_social_services_kii_service_providers: string | undefined
    // gi/access_social_services_kii_service_providers/answer9_access_social_services_kii_service_providers [text] What recommendations or solutions do you propose for improving access to social services(addressing the challenges and gaps? Additionally, are there any other issues you would like to address today?
    answer9_access_social_services_kii_service_providers: string | undefined
    // gi/access_social_services_kii_service_providers/question10_access_social_services_kii_service_providers [text] Question 10: (access social services kii service providers)
    question10_access_social_services_kii_service_providers: string | undefined
    // gi/access_social_services_kii_service_providers/answer10_access_social_services_kii_service_providers [text] Answer 10: (access social services kii service providers)
    answer10_access_social_services_kii_service_providers: string | undefined
    // gi/mental_health_services_fgd/answer1_mental_health_services_fgd [text] In what ways has the ongoing conflict affected the mental health and psychosocial wellbeing of this community? What are the most common mental health issues or symptoms in this community? Are there any particular groups that is more affected by psychological distress? If yes, why?
    answer1_mental_health_services_fgd: string | undefined
    // gi/mental_health_services_fgd/answer2_mental_health_services_fgd [text] Have you observed any changes in social relationships or community dynamics related to mental health issues (including social isolation, increased tensions within families, solidarity, etc.)?
    answer2_mental_health_services_fgd: string | undefined
    // gi/mental_health_services_fgd/answer3_mental_health_services_fgd [text] How do people in this community cope with the distress caused by the ongoing conflict?
    answer3_mental_health_services_fgd: string | undefined
    // gi/mental_health_services_fgd/answer4_mental_health_services_fgd [text] Do people in this community usually seek help when they are affected by mental health issues?  What are some reasons why people might not seek help for their mental health problems?  When people do seek support, whom do they generally turn to first?
    answer4_mental_health_services_fgd: string | undefined
    // gi/mental_health_services_fgd/answer5_mental_health_services_fgd [text] What are the main mental health and psychosocial support services available in the area? Are they accessible for all population groups (considering age, gender, socioeconomic(displacement status, etc.)? What are the main challenges(gaps community members face in accessing mental health and psychosocial support services?
    answer5_mental_health_services_fgd: string | undefined
    // gi/mental_health_services_fgd/answer6_mental_health_services_fgd [text] In your opinion, what could be done to improve the psychosocial wellbeing of this community? What could be done to improve access to mental health and psychosocial support services in your community?
    answer6_mental_health_services_fgd: string | undefined
    // gi/mental_health_services_fgd/answer7_mental_health_services_fgd [text] Looking towards the future, what do you think will be the long_term effects of the conflict on mental health and psychosocial wellbeing for individuals and communities in Ukraine?
    answer7_mental_health_services_fgd: string | undefined
    // gi/mental_health_services_kii_poc/answer1_mental_health_services_kii_poc [text] How has the ongoing conflict affected the the mental health and psychosocial wellbeing of this community?  What are the most common mental health issues(symptoms you have observed? Are there any particular groups or demographics within your community that seem to be more affected by psychological distress? If yes, why?
    answer1_mental_health_services_kii_poc: string | undefined
    // gi/mental_health_services_kii_poc/answer2_mental_health_services_kii_poc [text] What are some of the main stressors or sources of anxiety community members face due to the conflict? Are there specific groups that are more exposed to those stressors than others?
    answer2_mental_health_services_kii_poc: string | undefined
    // gi/mental_health_services_kii_poc/answer3_mental_health_services_kii_poc [text] Have you observed any changes in social relationships or community dynamics related to mental health issues (including social isolation, increased tensions within families, solidarity, etc.)?
    answer3_mental_health_services_kii_poc: string | undefined
    // gi/mental_health_services_kii_poc/answer4_mental_health_services_kii_poc [text] What are the main mental health and psychosocial support services available in the area? Are they accessible for all population groups (considering age, gender, socioeconomic(displacement status, etc.)? What are the main challenges(gaps community members face in accessing mental health and psychosocial support services?
    answer4_mental_health_services_kii_poc: string | undefined
    // gi/mental_health_services_kii_poc/answer5_mental_health_services_kii_poc [text] Are there cultural or societal stigmas associated with mental health that affect people’s willingness to seek help?
    answer5_mental_health_services_kii_poc: string | undefined
    // gi/mental_health_services_kii_poc/answer6_mental_health_services_kii_poc [text] How do different groups within the community (displaced people, women, elderly, etc.) cope with the distress caused by the conflict? What role do community networks and support systems play in addressing mental health needs?
    answer6_mental_health_services_kii_poc: string | undefined
    // gi/mental_health_services_kii_poc/answer7_mental_health_services_kii_poc [text] In your opinion, what are the most urgent needs or priorities when it comes to addressing mental health concerns in conflict_affected areas like yours?
    answer7_mental_health_services_kii_poc: string | undefined
    // gi/mental_health_services_kii_poc/answer8_mental_health_services_kii_poc [text] Looking towards the future, what do you think will be the long_term effects of the conflict on mental health and psychosocial wellbeing for individuals and communities in Ukraine?
    answer8_mental_health_services_kii_poc: string | undefined
    // gi/mental_health_services_kii_service_providers/answer1_mental_health_services_kii_service_providers [text] What are the most common mental health challenges that individuals and communities face in your area?
    answer1_mental_health_services_kii_service_providers: string | undefined
    // gi/mental_health_services_kii_service_providers/answer2_mental_health_services_kii_service_providers [text] Can you share any specific cases or experiences (without identifiable information) that highlight the psychosocial impact of the conflict on the people you work with?
    answer2_mental_health_services_kii_service_providers: string | undefined
    // gi/mental_health_services_kii_service_providers/answer3_mental_health_services_kii_service_providers [text] Have you noticed any trends or patterns in the types of mental health or psychosocial problems that have emerged or intensified due to the conflict?
    answer3_mental_health_services_kii_service_providers: string | undefined
    // gi/mental_health_services_kii_service_providers/answer4_mental_health_services_kii_service_providers [text] How have mental health services and support systems evolved or adapted to meet the needs of those affected by the conflict?
    answer4_mental_health_services_kii_service_providers: string | undefined
    // gi/mental_health_services_kii_service_providers/answer5_mental_health_services_kii_service_providers [text] What are the main barriers or challenges you encounter in providing effective mental health care and support to individuals and communities? What are the main barriers or challenges people are facing while trying to access your services?
    answer5_mental_health_services_kii_service_providers: string | undefined
    // gi/mental_health_services_kii_service_providers/answer6_mental_health_services_kii_service_providers [text] How do you navigate cultural or social stigmas surrounding mental health issues and are there any efforts to enhance help_seeking behaviors?
    answer6_mental_health_services_kii_service_providers: string | undefined
    // gi/mental_health_services_kii_service_providers/answer7_mental_health_services_kii_service_providers [text] According to you, what is the level of mental health awareness and education among the people you work with, particularly in conflict_affected areas?
    answer7_mental_health_services_kii_service_providers: string | undefined
    // gi/mental_health_services_kii_service_providers/answer8_mental_health_services_kii_service_providers [text] From your perspective, what are the long_term implications of the conflict on mental health and psychosocial wellbeing, and what strategies are needed to address these challenges effectively?
    answer8_mental_health_services_kii_service_providers: string | undefined
    // gi/mental_health_services_kii_service_providers/answer9_mental_health_services_kii_service_providers [text] What recommendations or solutions do you propose for improving access to MHPSS services(addressing the challenges and gaps? Additionally, are there any other issues you would like to address today?
    answer9_mental_health_services_kii_service_providers: string | undefined
    // gi/idp_allowance_cuts_kii/answer1_idp_allowance_cuts_kii [text] Introduction
    answer1_idp_allowance_cuts_kii: string | undefined
    // gi/idp_allowance_cuts_kii/answer2_idp_allowance_cuts_kii [text] Communication
    answer2_idp_allowance_cuts_kii: string | undefined
    // gi/idp_allowance_cuts_kii/answer3_idp_allowance_cuts_kii [text] Re_registration (eligible IDPs)
    answer3_idp_allowance_cuts_kii: string | undefined
    // gi/idp_allowance_cuts_kii/answer4_idp_allowance_cuts_kii [text] Basic needs
    answer4_idp_allowance_cuts_kii: string | undefined
    // gi/idp_allowance_cuts_kii/answer5_idp_allowance_cuts_kii [text] Coping mechanisms
    answer5_idp_allowance_cuts_kii: string | undefined
    // gi/idp_allowance_cuts_kii/answer6_idp_allowance_cuts_kii [text] Vulnerable groups
    answer6_idp_allowance_cuts_kii: string | undefined
    // gi/idp_allowance_cuts_kii/answer7_idp_allowance_cuts_kii [text] Safety risks
    answer7_idp_allowance_cuts_kii: string | undefined
    // gi/idp_allowance_cuts_kii/answer8_idp_allowance_cuts_kii [text] Unsafe returns
    answer8_idp_allowance_cuts_kii: string | undefined
    // gi/idp_allowance_cuts_kii/answer9_idp_allowance_cuts_kii [text] Mental health
    answer9_idp_allowance_cuts_kii: string | undefined
    // gi/idp_allowance_cuts_kii/answer10_idp_allowance_cuts_kii [text] Support systems
    answer10_idp_allowance_cuts_kii: string | undefined
    // gi/idp_allowance_cuts_kii/answer11_idp_allowance_cuts_kii [text] Next steps
    answer11_idp_allowance_cuts_kii: string | undefined
    // gi/idp_allowance_cuts_fgd/answer1b_idp_allowance_cuts_fgd [text] Introduction
    answer1b_idp_allowance_cuts_fgd: string | undefined
    // gi/idp_allowance_cuts_fgd/answer2_idp_allowance_cuts_fgd [text] Eligibility
    answer2_idp_allowance_cuts_fgd: string | undefined
    // gi/idp_allowance_cuts_fgd/answer3_idp_allowance_cuts_fgd [text] Communication
    answer3_idp_allowance_cuts_fgd: string | undefined
    // gi/idp_allowance_cuts_fgd/answer4_idp_allowance_cuts_fgd [text] Basic needs and coping strategies
    answer4_idp_allowance_cuts_fgd: string | undefined
    // gi/idp_allowance_cuts_fgd/answer5_idp_allowance_cuts_fgd [text] Safety risks
    answer5_idp_allowance_cuts_fgd: string | undefined
    // gi/idp_allowance_cuts_fgd/answer6_idp_allowance_cuts_fgd [text] Unsafe returns
    answer6_idp_allowance_cuts_fgd: string | undefined
    // gi/idp_allowance_cuts_fgd/answer7_idp_allowance_cuts_fgd [text] Mental health
    answer7_idp_allowance_cuts_fgd: string | undefined
    // gi/idp_allowance_cuts_fgd/answer8_idp_allowance_cuts_fgd [text] Support systems
    answer8_idp_allowance_cuts_fgd: string | undefined
    // gi/changes_mobilization_law_kii/answer1_changes_mobilization_law_kii [text] Introduction:
    answer1_changes_mobilization_law_kii: string | undefined
    // gi/changes_mobilization_law_kii/answer2_changes_mobilization_law_kii [text] Communication:
    answer2_changes_mobilization_law_kii: string | undefined
    // gi/changes_mobilization_law_kii/answer3_changes_mobilization_law_kii [text] Challenges and concerns:
    answer3_changes_mobilization_law_kii: string | undefined
    // gi/changes_mobilization_law_kii/answer4_changes_mobilization_law_kii [text] Safety risks:
    answer4_changes_mobilization_law_kii: string | undefined
    // gi/changes_mobilization_law_kii/answer5_changes_mobilization_law_kii [text] Impact on basic rights and freedoms:
    answer5_changes_mobilization_law_kii: string | undefined
    // gi/changes_mobilization_law_kii/answer6_changes_mobilization_law_kii [text] Mental health:
    answer6_changes_mobilization_law_kii: string | undefined
    // gi/changes_mobilization_law_kii/answer7_changes_mobilization_law_kii [text] Coping mechanisms and support systems:
    answer7_changes_mobilization_law_kii: string | undefined
    // gi/changes_mobilization_law_kii/question8_changes_mobilization_law_kii [text] Question 8: (changes mobilization law kii)
    question8_changes_mobilization_law_kii: string | undefined
    // gi/changes_mobilization_law_kii/answer8_changes_mobilization_law_kii [text] Answer 8: (changes mobilization law kii)
    answer8_changes_mobilization_law_kii: string | undefined
    // gi/changes_mobilization_law_iwg/answer1_changes_mobilization_law_iwg_fgd [text] Introduction:
    answer1_changes_mobilization_law_iwg_fgd: string | undefined
    // gi/changes_mobilization_law_iwg/answer2_changes_mobilization_law_iwg_fgd [text] General impact:
    answer2_changes_mobilization_law_iwg_fgd: string | undefined
    // gi/changes_mobilization_law_iwg/answer3_changes_mobilization_law_iwg_fgd [text] Economic impact
    answer3_changes_mobilization_law_iwg_fgd: string | undefined
    // gi/changes_mobilization_law_iwg/answer4_changes_mobilization_law_iwg_fgd [text] Safety risks
    answer4_changes_mobilization_law_iwg_fgd: string | undefined
    // gi/changes_mobilization_law_iwg/answer5_changes_mobilization_law_iwg_fgd [text] Impact on access to services
    answer5_changes_mobilization_law_iwg_fgd: string | undefined
    // gi/changes_mobilization_law_iwg/answer6_changes_mobilization_law_iwg_fgd [text] Mental health
    answer6_changes_mobilization_law_iwg_fgd: string | undefined
    // gi/changes_mobilization_law_iwg/answer7_changes_mobilization_law_iwg_fgd [text] Coping mechanisms and support systems
    answer7_changes_mobilization_law_iwg_fgd: string | undefined
    // gi/women_roles_armed_conflic/typical_roles_women_a [text] What are the typical roles and responsibilities for women in Ukraine? Note for facilitator: probing questions can include what tasks at home or in the hromada are traditionally undertaken by women
    typical_roles_women_a: string | undefined
    // gi/women_roles_armed_conflic/conflict_changed_role_a [text] How has the conflict changed the role of women Ukraine? Have women taken on any new responsibilities or roles that were previously traditionally done by men? What challenges do women face when taking on traditionally dominated male roles during the armed conflict?
    conflict_changed_role_a: string | undefined
    // gi/women_roles_armed_conflic/learn_new_professions_a [text] What opportunities do women in your hromada have to learn new professions and responsibilities during the conflict? How do women adapt to new responsibilities during conflict? How do women contribute to economic recovery and job creation during conflict?
    learn_new_professions_a: string | undefined
    // gi/women_roles_armed_conflic/change_household_task_a [text] Has there been any change in how household tasks are managed in the home since the escalation in conflict? How do women manage to combine household and community responsibilities during an armed conflict?
    change_household_task_a: string | undefined
    // gi/women_roles_armed_conflic/different_coping_strategies_a [text] What are the different coping strategies used by women to cope with the challenges associated with the conflict at the household level?
    different_coping_strategies_a: string | undefined
    // gi/women_roles_armed_conflic/women_cope_challenges_a [text] How do women cope with the challenges of the conflict at the community level? Can you give specific examples of women's actions to cope with these challenges at the community level?
    women_cope_challenges_a: string | undefined
    // gi/women_roles_armed_conflic/different_resources_support_a [text] What are the different resources or support that women are relying on? How can humanitarian actors support these mechanisms?
    different_resources_support_a: string | undefined
    // gi/women_roles_armed_conflic/role_women_making_a [text] What role do women play in decision_making in the hromada? How has this changed since the war escalated? Do women experience any barriers in participating in decision_making processes or civic engagement at the hromada level? Are there any specific groups of women (such as elderly, persons with disabilities) that experience specific challenges?
    role_women_making_a: string | undefined
    // gi/women_roles_armed_conflic/initiatives_women_propose_a [text] What initiatives do women propose to improve the lives of hromada during the conflict? What resources and support do women need to successfully lead hromada initiatives during armed conflict?
    initiatives_women_propose_a: string | undefined
    // gi/women_roles_armed_conflic/government_initiatives_women_a [text] What government initiatives are aimed at supporting women during armed conflict? Do you think these initiatives are effective?
    government_initiatives_women_a: string | undefined
    // gi/evacuations_fgd/evac_process_a_fgd [text] EVACUATION PROCESS :
    evac_process_a_fgd: string | undefined
    // gi/evacuations_fgd/evac_access_information_service_a_fgd [text] ACCESS TO INFORMATION & SERVICES
    evac_access_information_service_a_fgd: string | undefined
    // gi/evacuations_fgd/evac_safety_intentions_a_fgd [text] SAFETY AND INTENTIONS
    evac_safety_intentions_a_fgd: string | undefined
    // gi/evacuations_fgd/evac_freedom_movement_a_fgd [text] FREEDOM OF MOVEMENT
    evac_freedom_movement_a_fgd: string | undefined
    // gi/evacuations_fgd/evac_child_protection_a_fgd [text] CHILD PROTECTION
    evac_child_protection_a_fgd: string | undefined
    // gi/evacuations_fgd/evac_priority_needs_a_fgd [text] PRIORITY NEEDS
    evac_priority_needs_a_fgd: string | undefined
    // gi/evacuations_fgd/evac_social_cohesion_a_fgd [text] SOCIAL COHESION
    evac_social_cohesion_a_fgd: string | undefined
    // gi/evacuations_fgd/evac_host_community_a_fgd [text] Are you able to turn to the host community or local authorities for support or help?
    evac_host_community_a_fgd: string | undefined
    // gi/evacuations_kii/profile_evacuated_population_a_kii [text] Profile of the evacuated population & family unit
    profile_evacuated_population_a_kii: string | undefined
    // gi/evacuations_kii/evac_process_a_kii [text] Evacuation process
    evac_process_a_kii: string | undefined
    // gi/evacuations_kii/evac_access_information_a_kii [text] Access to information & services
    evac_access_information_a_kii: string | undefined
    // gi/evacuations_kii/evac_safety_intentions_a_kii [text] Safety and intentions
    evac_safety_intentions_a_kii: string | undefined
    // gi/evacuations_kii/evac_social_cohesion_a_kii [text] Social Cohesion
    evac_social_cohesion_a_kii: string | undefined
    // gi/evacuations_kii_sp/profile_evacuated_population_a_kii_sp [text] General Information:
    profile_evacuated_population_a_kii_sp: string | undefined
    // gi/evacuations_kii_sp/evac_process_a_kii_sp [text] Evacuation Process:
    evac_process_a_kii_sp: string | undefined
    // gi/evacuations_kii_sp/evac_access_information_a_kii_sp [text] Protection Needs:
    evac_access_information_a_kii_sp: string | undefined
    // gi/power_outages/po_general_impact_a [text] General impact:
    po_general_impact_a: string | undefined
    // gi/power_outages/po_safety_security_q [text] Safety and security risks:
    po_safety_security_q: string | undefined
    // gi/power_outages/po_housing_safety_a [text] Housing safety and living conditions:
    po_housing_safety_a: string | undefined
    // gi/power_outages/po_access_services_a [text] Access to services:
    po_access_services_a: string | undefined
    // gi/power_outages/po_mental_health_a [text] Mental health:
    po_mental_health_a: string | undefined
    // gi/power_outages/po_coping_mechanisms_a [text] Coping mechanisms:
    po_coping_mechanisms_a: string | undefined
    // gi/access_compensation_mechanisms/acm_introduction_a [text] Introduction:
    acm_introduction_a: string | undefined
    // gi/access_compensation_mechanisms/acm_administrative_barriers_a [text] Administrative and procedural barriers:
    acm_administrative_barriers_a: string | undefined
    // gi/access_compensation_mechanisms/acm_fg_barriers_a [text] Financial and geographical barriers:
    acm_fg_barriers_a: string | undefined
    // gi/access_compensation_mechanisms/acm_information_barriers_a [text] Informational barriers:
    acm_information_barriers_a: string | undefined
    // gi/access_compensation_mechanisms/acm_process_a [text] Process:
    acm_process_a: string | undefined
    // gi/access_compensation_mechanisms/acm_impact_a [text] Impact:
    acm_impact_a: string | undefined
    // gi/access_compensation_mechanisms/acm_recommendations_a [text] Recommendations:
    acm_recommendations_a: string | undefined
    // gi/denial_access_resources/dar_introduction_a [text] Introduction:
    dar_introduction_a: string | undefined
    // gi/denial_access_resources/dar_challenges_access_a [text] Challenges in access:
    dar_challenges_access_a: string | undefined
    // gi/denial_access_resources/dar_consequences_risks_a [text] Consequences and risks:
    dar_consequences_risks_a: string | undefined
    // gi/denial_access_resources/dar_coping_mechanisms_a [text] Coping mechanisms:
    dar_coping_mechanisms_a: string | undefined
    // gi/denial_access_resources/dar_recommendations_a [text] Recommendations:
    dar_recommendations_a: string | undefined
    // gi/access_documentation/ad_challenges_civil_a [text] Challenges in accessing civil documentation:
    ad_challenges_civil_a: string | undefined
    // gi/access_documentation/ad_lack_documentation_a [text] Lack of civil documentation & protection risks:
    ad_lack_documentation_a: string | undefined
    // gi/access_documentation/ad_challenges_hlp_a [text] Challenges in accessing HLP documentation:
    ad_challenges_hlp_a: string | undefined
    // gi/access_documentation/ad_lack_hlp_a [text] Lack of HLP documentation & protection risks:
    ad_lack_hlp_a: string | undefined
    // gi/access_documentation/ad_recommendations_a [text] Recommendations:
    ad_recommendations_a: string | undefined
    // gi/transportation_challenges/tc_introduction_a [text] Introduction:
    tc_introduction_a: string | undefined
    // gi/transportation_challenges/tc_access_service_a [text] Access to essential services:
    tc_access_service_a: string | undefined
    // gi/transportation_challenges/tc_education_a [text] Children & Access to education:
    tc_education_a: string | undefined
    // gi/transportation_challenges/tc_safety_a [text] Safety and protection risks:
    tc_safety_a: string | undefined
    // gi/transportation_challenges/tc_coping_mechanisms_a [text] Coping mechanisms:
    tc_coping_mechanisms_a: string | undefined
    // gi/secure_afforable_housing/sah_access_accommodation_a [text] Access to accommodation
    sah_access_accommodation_a: string | undefined
    // gi/secure_afforable_housing/sah_security_tenure_a [text] Security of tenure
    sah_security_tenure_a: string | undefined
    // gi/secure_afforable_housing/sah_risk_eviction_a [text] Risk of Forced Eviction
    sah_risk_eviction_a: string | undefined
    // gi/secure_afforable_housing/sah_damaged_housing_a [text] Damaged housing (optional_ only if relevant)
    sah_damaged_housing_a: string | undefined
    // gi/secure_afforable_housing/sah_aob_a [text] AOB
    sah_aob_a: string | undefined
    // gi/inclusion_accessibility/ia_general_questions_a [text] General questions
    ia_general_questions_a: string | undefined
    // gi/inclusion_accessibility/ia_physical_accessibility_a [text] Questions about physical accessibility
    ia_physical_accessibility_a: string | undefined
    // gi/inclusion_accessibility/ia_transport_accessibility_a [text] Transport  accessibility
    ia_transport_accessibility_a: string | undefined
    // gi/inclusion_accessibility/ia_information_accessibility_a [text] Issues of information accessibility and availability of online services
    ia_information_accessibility_a: string | undefined
    // gi/inclusion_accessibility/ia [text] Security issues
    ia: string | undefined
    // gi/rental_subsidy_idp_kii/informed_rental_subsidy [select_one] 1. Have you ever heard of or been informed about the Rental Housing Subsidy Program for IDPs?
    informed_rental_subsidy: undefined | Option<'informed_rental_subsidy'>
    // gi/rental_subsidy_idp_kii/apply_receive_subsidy [select_one] 2. Did you apply and receive the subsidy?
    apply_receive_subsidy: undefined | Option<'apply_receive_subsidy'>
    // gi/rental_subsidy_idp_kii/not_applied_reason [select_multiple] 3. If not applied – what was the reason?
    not_applied_reason: undefined | Option<'not_applied_reason'>[]
    // gi/rental_subsidy_idp_kii/not_applied_reason_other [text] 3.1 If "Other", please specify
    not_applied_reason_other: string | undefined
    // gi/rental_subsidy_idp_kii/meet_eligibility_criteria [select_multiple] 4. If you don’t meet the eligibility criteria, please specify the reason
    meet_eligibility_criteria: undefined | Option<'meet_eligibility_criteria'>[]
    // gi/rental_subsidy_idp_kii/meet_eligibility_criteria_other [text] 4.1 If "Other", please specify
    meet_eligibility_criteria_other: string | undefined
    // gi/rental_subsidy_idp_kii/written_rental_agreement [select_multiple] 5. If you don’t have written rental agreement, please specify why
    written_rental_agreement: undefined | Option<'written_rental_agreement'>[]
    // gi/rental_subsidy_idp_kii/written_rental_agreement_other [text] 5.1 If "Other", please specify
    written_rental_agreement_other: string | undefined
    // gi/rental_subsidy_idp_kii/not_landlord_approval [select_multiple] 6. If you had written rental agreement, but you could not receive landlord’s approval, please specify the reason
    not_landlord_approval: undefined | Option<'not_landlord_approval'>[]
    // gi/rental_subsidy_idp_kii/not_landlord_approval_other [text] 6.1 If "Other", please specify
    not_landlord_approval_other: string | undefined
    // gi/rental_subsidy_idp_kii/program_attractive_landlords [select_multiple] 7. In your opinion, what could make the program more attractive to landlords?
    program_attractive_landlords: undefined | Option<'program_attractive_landlords'>[]
    // gi/rental_subsidy_idp_kii/program_attractive_landlords_other [text] 7.1 If "Other", please specify
    program_attractive_landlords_other: string | undefined
    // gi/rental_subsidy_idp_kii/program_accessible_idp [select_multiple] 8. And what would make the program more accessible for IDPs?
    program_accessible_idp: undefined | Option<'program_accessible_idp'>[]
    // gi/rental_subsidy_idp_kii/program_accessible_idp_other [text] 8.1 If "Other", please specify
    program_accessible_idp_other: string | undefined
    // gi/rental_subsidy_idp_fgd/not_rental_subsidy [note] Today we’d like to talk about experiences related to rental housing and the new Rental Housing Subsidy Program for IDPs. We are here to learn from you — to hear your stories, opinions, and suggestions. There are no right or wrong answers. Feel free to share honestly, and you don’t have to answer any question you’re uncomfortable with.
    not_rental_subsidy: string
    // gi/rental_subsidy_idp_fgd/awareness_general_impressions_a [text] Awareness and general impressions:
    awareness_general_impressions_a: string | undefined
    // gi/rental_subsidy_idp_fgd/rental_application_experience_a [text] Application experience:
    rental_application_experience_a: string | undefined
    // gi/rental_subsidy_idp_fgd/rental_barriers_clallenges_a [text] Barriers and challenges:
    rental_barriers_clallenges_a: string | undefined
    // gi/rental_subsidy_idp_fgd/rental_program_effectiveness_a [text] Program effectiveness and improvement:
    rental_program_effectiveness_a: string | undefined
    // gi/rental_subsidy_idp_fgd/rental_reflections_suggestions_a [text] Reflections and suggestions:
    rental_reflections_suggestions_a: string | undefined
    // gi/veterans_kii/not_vetk_introduction [note] **Introduction:**
    not_vetk_introduction: string
    // gi/veterans_kii/role_vetk [text] 1. What is your role or your institution’s role in supporting  veterans and their families?
    role_vetk: string | undefined
    // gi/veterans_kii/many_demobilised_vetk [text] 2.Approximately how many demobilised veterans are currently living in your area or within your service coverage?
    many_demobilised_vetk: string | undefined
    // gi/veterans_kii/reintegration_challenges_vetk [text] 3. What are the main reintegration challenges you have observed or been informed about?
    reintegration_challenges_vetk: string | undefined
    // gi/veterans_kii/not_protection_risks_vetk [note] **Protection risks and vulnerabilities: **
    not_protection_risks_vetk: string
    // gi/veterans_kii/common_protection_risks [text] 1. In your view, what are the most common protection risks facing veterans in this area? (e.g., safety(security concerns, family conflict, discrimination, social exclusion)?
    common_protection_risks: string | undefined
    // gi/veterans_kii/family_members_vetk [text] 2. Are there veterans or family members facing heightened risks, such as:
    family_members_vetk: string | undefined
    // gi/veterans_kii/gbv_incident_vetk [text] 3. Have there been GBV incidents, including domestic violence involving veterans?
    gbv_incident_vetk: string | undefined
    // gi/veterans_kii/incidents_aggression_vetk [text] 4. Have there been any incidents of aggression or community tensions linked to veterans? If yes, how are such incidents addressed or referred?
    incidents_aggression_vetk: string | undefined
    // gi/veterans_kii/community_tensions_vetk [text] 5. Are there community-level tensions involving veterans (e.g., with IDPs, returnees, or civilians)? If yes, what efforts exist to reduce those tensions?
    community_tensions_vetk: string | undefined
    // gi/veterans_kii/not_mhpss_vetk [note] **MHPSS:**
    not_mhpss_vetk: string
    // gi/veterans_kii/factors_cause_vetk [text] 1. In your opinion what are the main factors cause you stress for veterans?
    factors_cause_vetk: string | undefined
    // gi/veterans_kii/signs_stress_vetk [text] 2. Are you aware of specific signs of stress in veterans and their families. (Eg. Aggressiveness, sadness, nightmares, negative thinking, etc.)
    signs_stress_vetk: string | undefined
    // gi/veterans_kii/help_recover_vetk [text] 3. In your opinion what are things that help veterans in recover their socio emotional wellbeing ( and (or( what are the things that you think could help you in the recovery process.
    help_recover_vetk: string | undefined
    // gi/veterans_kii/activities_vetk [text] 4. In your opinion, cultural or sport activities (With special focus with people with disabilities) would be of the interest in veterans
    activities_vetk: string | undefined
    // gi/veterans_kii/stigma_problem_vetk [text] 5. Stigma is normally a problem for engagement in MHPSS, what do you consider could be useful for veterans  that come MHPSS activities
    stigma_problem_vetk: string | undefined
    // gi/veterans_kii/not_access_services_vetk [note] **Access to services:**
    not_access_services_vetk: string
    // gi/veterans_kii/services_available_vetk [text] 1. What services are currently available to support veterans (e.g., psychosocial, health, legal aid, livelihoods, housing) government and non-government led?
    services_available_vetk: string | undefined
    // gi/veterans_kii/barriers_accessing_vetk [text] 2. What are the main barriers that veterans face in accessing these services?
    barriers_accessing_vetk: string | undefined
    // gi/veterans_kii/mhpss_vetk [text] 3. Are mental health and psychosocial support (MHPSS) services available, accessible, and appropriate for veterans?
    mhpss_vetk: string | undefined
    // gi/veterans_kii/work_veterans_vetk [text] 4. Are frontline staff trained to work with veterans sensitively? Do you anticipate any kind of support in capacity building or services provision?
    work_veterans_vetk: string | undefined
    // gi/veterans_kii/service_adequately_vetk [text] 5. Do you believe current service provision adequately addresses:
    service_adequately_vetk: string | undefined
    // gi/veterans_kii/rights_services_vetk [text] 6. Are veterans or their families informed of their rights and available services? What kind of sources of access to information are available in the community?
    rights_services_vetk: string | undefined
    // gi/veterans_kii/not_improving_vetk [note] **Improving the response: **
    not_improving_vetk: string
    // gi/veterans_kii/key_priorities_vetk [text] 1. In your opinion, what are the key priorities or gaps  in supporting safe and dignified reintegration of veterans?
    key_priorities_vetk: string | undefined
    // gi/veterans_kii/recommendations_vetk [text] 2. What recommendations would you offer to humanitarian and protection actors to better respond to the needs and protection risks of veterans and their families?
    recommendations_vetk: string | undefined
    // gi/veterans_fgd/veterans_fgd_safety_a [text] Safety and security
    veterans_fgd_safety_a: string | undefined
    // gi/veterans_fgd/veterans_fgd_social_cohesion_a [text] Social cohesion
    veterans_fgd_social_cohesion_a: string | undefined
    // gi/veterans_fgd/veterans_fgd_barriers_a [text] Have you faced barriers accessing services such as healthcare, identification documents, housing, or legal support? What kinds of challenges were faced?
    veterans_fgd_barriers_a: string | undefined
    // gi/veterans_fgd/veterans_fgd_socio_a [text] Socio_economic needs
    veterans_fgd_socio_a: string | undefined
    // gi/veterans_fgd/veterans_fgd_information [text] Do the participants have any questions or any other information that they would like to share?
    veterans_fgd_information: string | undefined
    // gi/veterans_families_fgd/veterans_families_fgd_introduction_a [text] Introduction
    veterans_families_fgd_introduction_a: string | undefined
    // gi/veterans_families_fgd/veterans_families_fgd_safety_a [text] Safety and security
    veterans_families_fgd_safety_a: string | undefined
    // gi/veterans_families_fgd/veterans_families_fgd_cohesion_a [text] Social cohesion
    veterans_families_fgd_cohesion_a: string | undefined
    // gi/veterans_families_fgd/veterans_families_fgd_pss_a [text] Mental Health and Psychosocial Support
    veterans_families_fgd_pss_a: string | undefined
    // gi/veterans_families_fgd/veterans_families_fgd_barriers_a [text] Has your family member faced barriers accessing services such as healthcare, identification documents, housing, or legal support? What kinds of challenges were faced?
    veterans_families_fgd_barriers_a: string | undefined
    // gi/veterans_families_fgd/veterans_families_fgd_socio_a [text] Socio_economic needs
    veterans_families_fgd_socio_a: string | undefined
    // gi/veterans_families_fgd/veterans_families_fgd_information [text] Do the participants have any questions or any other information that they would like to share?
    veterans_families_fgd_information: string | undefined
    // gi/veterans_mhpss_fgd/vet_mhpss_fgd_factors_cause [text] 1. In your current situation what are the main factors that cause you stress?
    vet_mhpss_fgd_factors_cause: string | undefined
    // gi/veterans_mhpss_fgd/vet_mhpss_fgd_signs_stress [text] 2. Have you observed any signs of stress in yourself?  (Eg. Aggressiveness, sadness, nightmares, negative thinking, etc.)
    vet_mhpss_fgd_signs_stress: string | undefined
    // gi/veterans_mhpss_fgd/vet_mhpss_fgd_difficult_control [text] 3. Do you find yourself having very strong feelings difficult to control? Eg. Anger or any other one
    vet_mhpss_fgd_difficult_control: string | undefined
    // gi/veterans_mhpss_fgd/vet_mhpss_fgd_impact_family [text] 4. Do you consider that something of what you have mentioned (repeat some of the answers given from the previous questions) , has an impact in your family members, if yes what and how?
    vet_mhpss_fgd_impact_family: string | undefined
    // gi/veterans_mhpss_fgd/vet_mhpss_fgd_main_challenges [text] 5. What are the main challenges in your life, that you are worried about?
    vet_mhpss_fgd_main_challenges: string | undefined
    // gi/veterans_mhpss_fgd/vet_mhpss_fgd_recovery [text] 6. Since you came back from the frontline, what is the thing or things that have helped to most in recover your socio emotional wellbeing ( and (or( what are the things that you think could help you in the recovery(adaptation process
    vet_mhpss_fgd_recovery: string | undefined
    // gi/veterans_mhpss_fgd/vet_mhpss_fgd_interest [text] 7. Have you any interest in cultural or sport activities (With special focus on people with disabilities, if appropriate) if yes which ones?
    vet_mhpss_fgd_interest: string | undefined
    // gi/veterans_mhpss_fgd/vet_mhpss_fgd_activities [text] 8. If there were more of these activities available, would you be interested in participating? For example, a ping pong league or football league, climbing, etc
    vet_mhpss_fgd_activities: string | undefined
    // gi/veterans_mhpss_fgd/vet_mhpss_fgd_mental [text] 9. Do you consider that mental health and psychosocial support are necessary and useful for people that come back from the frontline?
    vet_mhpss_fgd_mental: string | undefined
    // gi/veterans_mhpss_fgd/vet_mhpss_fgd_familiar [text] 10. Are you familiar with MHPSS services available in your area? If yes, which ones
    vet_mhpss_fgd_familiar: string | undefined
    // gi/veterans_mhpss_fgd/vet_mhpss_fgd_received [text] 11. Have you received MHPSS or would be willing to participate in MHPSS groups or individual activities?
    vet_mhpss_fgd_received: string | undefined
    // gi/idp_integration_fgd/idp_integ_general_a [text] General Integration Experience
    idp_integ_general_a: string | undefined
    // gi/idp_integration_fgd/idp_integ_access_a [text] Access to Services and Information
    idp_integ_access_a: string | undefined
    // gi/idp_integration_fgd/idp_integ_relations_a [text] Relations with the Host Community and Community Participation
    idp_integ_relations_a: string | undefined
    // gi/idp_integration_fgd/idp_integ_needs_a [text] Housing, Livelihoods, Specific Needs and Protection Risks
    idp_integ_needs_a: string | undefined
    // gi/idp_integration_host_kii/idp_integ_host_contextual_a [text] Contextual Information
    idp_integ_host_contextual_a: string | undefined
    // gi/idp_integration_host_kii/idp_integ_host_partipation_a [text] Participation & Inclusion
    idp_integ_host_partipation_a: string | undefined
    // gi/idp_integration_host_kii/idp_integ_host_access_a [text] Access to Services
    idp_integ_host_access_a: string | undefined
    // gi/idp_integration_host_kii/idp_integ_host_housing_a [text] Housing and Livelihoods
    idp_integ_host_housing_a: string | undefined
    // gi/idp_integration_host_kii/idp_integ_host_community_a [text] Community Relations & Perceptions
    idp_integ_host_community_a: string | undefined
    // gi/idp_integration_host_kii/idp_integ_host_recomendations_a [text] Recommendations
    idp_integ_host_recomendations_a: string | undefined
    // gi/idp_integration_idp_kii/idp_integ_idp_experience_a [text] General Integration Experience
    idp_integ_idp_experience_a: string | undefined
    // gi/idp_integration_idp_kii/idp_integ_idp_access_a [text] Access to information and services
    idp_integ_idp_access_a: string | undefined
    // gi/idp_integration_idp_kii/idp_integ_idp_social_a [text] Social connections and integration
    idp_integ_idp_social_a: string | undefined
    // gi/idp_integration_idp_kii/idp_integ_idp_housing_a [text] Housing and Livelihoods
    idp_integ_idp_housing_a: string | undefined
    // gi/idp_integration_idp_kii/idp_integ_idp_recomendations_a [text] Recommendations
    idp_integ_idp_recomendations_a: string | undefined
    // gi/vysokopilska_kii/vys_population_risk [text] 1. Profile of population at risk **NOTE TO THE INTERVIEWER:** *For the population we are assessing, we want to understand the number of families and the composition of the population by age(sex. We want to understand why these persons have been affected and not others. Finally, we want to understand the general physical and psychological condition of the population.*
    vys_population_risk: string | undefined
    // gi/vysokopilska_kii/vys_safety_freedom [text] 2. Safety and freedom of movement **NOTE TO THE INTERVIEWER:** *We want to understand if people can reach a place where they feel safe from conflict. We also want to understand where they want to stay, and whether they can reach that place. If they cannot move freely, then we want to understand everything about these barriers: why they are imposed, who imposes them, for which duration. We also want to understand how people are adapting to these barriers – which could be finding new routes, making agreements with the authorities, returning, etc.*
    vys_safety_freedom: string | undefined
    // gi/vysokopilska_kii/vys_physical_safety [text] 3. Physical safety **NOTE TO THE INTERVIEWER:** *Conflicts create threats to physical safety, and we want to understand which ones are affecting the population: mines(IEDs, presence of armed groups, crime, collapsing buildings, on-going fighting. People who have been displaced can also be forced to stay in inhospitable environments where they face natural hazards like exposure to extreme heat(cold or water shortages. We also want to know what people are doing to protect themselves already. Remember that these risks may be different for men and for women.*
    vys_physical_safety: string | undefined
    // gi/vysokopilska_kii/vys_housing [text] 4. Housing, Land & Property **NOTE TO THE INTERVIEWER:** *We need to understand how the conflict has impacted people’s access to safe housing, whether existing government schemes are effective, if not why not, and whether particular groups are affected more than others if there are issues.*
    vys_housing: string | undefined
    // gi/vysokopilska_kii/vys_adequate_standard [text] 5. Adequate standard of living *NOTE TO THE INTERVIEWER:* **In addition to the general questions, we will want to ask the more about the basic services.  We want to know if they faced any problems.**
    vys_adequate_standard: string | undefined
    // gi/vysokopilska_fgd/vys_housing_general [text] *Housing – General* What is your current housing arrangement? (e.g., own property, renting, hosted for free, public housing) - *If you rent housing, do you have a rental contract with the owner?* - *If not, why not?*
    vys_housing_general: string | undefined
    // gi/vysokopilska_fgd/vys_housing_destroyed [text] *Destroyed( Damaged Housing* How would you describe the condition of your home? (e.g., intact, damaged but livable, uninhabitable, destroyed) - *If uninhabitable, where are you currently residing?*
    vys_housing_destroyed: string | undefined
    // gi/vysokopilska_fgd/vys_recourse_compensation [text] *Damaged ( Destroyed Housing – Recourse to compensation * If your home is damaged(destroyed, have you applied for State compensation through the ‘eRecovery’ program?   - *If yes, have you faced challenges in the application process? Please describe.* - *If no, why have you chosen not to apply?*
    vys_recourse_compensation: string | undefined
    // gi/vysokopilska_fgd/vys_barriers_access [text] *Damaged ( Destroyed Housing – Barriers to access* **(If not already answered above)**: Have you, or others in your community, faced financial, administrative or legal barriers (e.g., unclear procedures, difficulty accessing online services, delays, inheritance disputes, obtaining documents, ID, cost of recovering documents...)? - *If yes, please describe.* - *If documents, which have been the most difficult to access(recover?* - *If online services difficult to access, why?*
    vys_barriers_access: string | undefined
    // gi/vysokopilska_fgd/vys_barriers_populations [text] *Damaged ( Destroyed Housing – Barriers to access* If you needed legal assistance for your housing situation, would you know where ( how to access it?
    vys_barriers_populations: string | undefined
    // gi/vysokopilska_fgd/vys_barriers_assistance [text] *Damaged ( Destroyed Housing – Barriers to access* To your knowledge, do any particular populations face additional obstacles? (e.g. people in remote areas, PWD, people from particular ethnic groups, IDPs, returnees, veterans, elderly people…) - *If yes, please describe.*
    vys_barriers_assistance: string | undefined
    // gi/vysokopilska_fgd/vys_barriers_supporting [text] *Damaged ( Destroyed Housing – Barriers to access* Are you aware of organisations supporting housing repairs? - *If yes, have you experienced difficulties in accessing their services? Please explain.*
    vys_barriers_supporting: string | undefined
    // gi/vysokopilska_fgd/vys_compensation_delays [text] *Damaged ( Destroyed Housing – Recourse to compensation* To your knowledge, do people who have been approved for compensation experience delays in receiving compensation? - *If yes, how have delays affected people’s ability to rebuild?*
    vys_compensation_delays: string | undefined
    // gi/vysokopilska_fgd/vys_compensation_rejected [text] *Damaged ( Destroyed Housing – Recourse to compensation* Do you know of cases where claims were rejected? - *If yes, do you know why they were rejected?*
    vys_compensation_rejected: string | undefined
    // gi/vysokopilska_fgd/vys_compensation_bribers [text] *Damaged ( Destroyed Housing – Recourse to compensation* Do you know of cases where bribes were expected? - *If yes, do you feel comfortable explaining?*
    vys_compensation_bribers: string | undefined
    // gi/vysokopilska_fgd/vys_compensation_approved [text] *Damaged ( Destroyed Housing – Recourse to compensation* To your knowledge, where compensation has been approved, has it been sufficient to cover repair costs? - *If no, please explain.*
    vys_compensation_approved: string | undefined
    // gi/vysokopilska_fgd/vys_housing_idp [text] *Access to suitable housing for IDPs* To your knowledge, is there accessible and adequate housing available for IDPs in this hromada? - *If not, how would you describe the housing challenges faced by IDPs?*
    vys_housing_idp: string | undefined
    // gi/vysokopilska_fgd/vys_protection_risks [text] *Damaged ( Destroyed Housing – Associated Protection Risks* To your knowledge, what are the consequences for people unable to access compensation (e.g., unsafe living, secondary displacement)? - *Are certain groups (e.g., IDPs, returnees, veterans, low-income families) more at risk of harmful coping strategies?* - *To your knowledge, how do people unable to access compensation manage to meet their financial needs?*
    vys_protection_risks: string | undefined
    // gi/vysokopilska_fgd/vys_solutions_changes [text] *Damaged ( Destroyed Housing – Solutions* What changes, if any, do you think could make the compensation system programme more accessible?
    vys_solutions_changes: string | undefined
    // gi/vysokopilska_fgd/vys_solutions_modality [text] *Damaged ( Destroyed Housing – Solutions* What modality(ies) of support do you think would best meet the needs of populations affected by damaged ( destroyed housing? (e.g. online information, leaflets, in-person information sessions, hotlines…)
    vys_solutions_modality: string | undefined
    // gi/eo_shelling_kii/not_eo_shelling_context [note] **Context and Risk Perception**
    not_eo_shelling_context: string
    // gi/eo_shelling_kii/high_risk_eo [text] What areas in your locality are currently considered high-risk due to contamination by landmines or unexploded ordnance (EO)?
    high_risk_eo: string | undefined
    // gi/eo_shelling_kii/high_risk_shelling [text] What areas have recently been affected or are still at risk due to ongoing or recent shelling?
    high_risk_shelling: string | undefined
    // gi/eo_shelling_kii/receive_official_contaminated [text] Have you received any official mapping or updates about contaminated areas?
    receive_official_contaminated: string | undefined
    // gi/eo_shelling_kii/residents_receive_information_risk [text] How do local residents usually receive information about risks (e.g., warnings, public messaging, community networks)?
    residents_receive_information_risk: string | undefined
    // gi/eo_shelling_kii/not_eo_shelling_safety [note] **Impact on safety and movement**
    not_eo_shelling_safety: string
    // gi/eo_shelling_kii/shelling_affected_civilian [text] In your view, how has shelling or bombardment affected civilian safety and freedom of movement?
    shelling_affected_civilian: string | undefined
    // gi/eo_shelling_kii/contamination_affected_freedom [text] How has contamination by landmines or unexploded ordnance (UXO) affected freedom of movement in your locality?
    contamination_affected_freedom: string | undefined
    // gi/eo_shelling_kii/groups_particularly_risk [text] Are certain groups in your community particularly at risk from landmines or UXO? (e.g. farmers, men, children)
    groups_particularly_risk: string | undefined
    // gi/eo_shelling_kii/been_recent_incidents_injury [text] Have there been any recent incidents of civilian injury or death? If so, how are these cases documented and followed up?
    been_recent_incidents_injury: string | undefined
    // gi/eo_shelling_kii/not_eo_shelling_services [note] **Impact on services and infrastructure**
    not_eo_shelling_services: string
    // gi/eo_shelling_kii/contamination_affected_services [text] How has shelling or EO contamination affected the provision or access to:
    contamination_affected_services: string | undefined
    // gi/eo_shelling_kii/facilities_administrative_buildings [text] Have any facilities (e.g. clinics, schools, administrative buildings; infrastructure to access facilities" e.g. roads, rail, bridges) been damaged or become inaccessible due to contamination or attacks?
    facilities_administrative_buildings: string | undefined
    // gi/eo_shelling_kii/contamination_affected_daily_routes [text] How has the risk of EO contamination affected the daily routes of the population (e.g. to work, school, medical facilities)?
    contamination_affected_daily_routes: string | undefined
    // gi/eo_shelling_kii/contamination_risk_daily_routes [text] How has the risk of shelling affected the daily routes of the population (e.g. to work, school, medical facilities)?
    contamination_risk_daily_routes: string | undefined
    // gi/eo_shelling_kii/transport_routes_eo [text] Have the usual public transport routes or the accessibility of public places changed due to the threat of EO?
    transport_routes_eo: string | undefined
    // gi/eo_shelling_kii/transport_routes_shelling [text] Have the usual public transport routes or the accessibility of public places changed due to the threat of shelling?
    transport_routes_shelling: string | undefined
    // gi/eo_shelling_kii/not_eo_shelling_response [note] **Response mechanisms and referral pathways**
    not_eo_shelling_response: string
    // gi/eo_shelling_kii/services_injured_shelling [text] What services are currently available to civilians injured by shelling in your community (e.g., financial assistance from the state emergency response, medical care, psychosocial support, legal aid, rehabilitation)?
    services_injured_shelling: string | undefined
    // gi/eo_shelling_kii/services_injured_eo [text] What services are currently available to civilians injured by EO in your community (e.g., financial assistance from the state emergency response, medical care, psychosocial support, legal aid, rehabilitation)?
    services_injured_eo: string | undefined
    // gi/eo_shelling_kii/survivors_aware_support [text] Are survivors and their families aware of how to access this support?
    survivors_aware_support: string | undefined
    // gi/eo_shelling_kii/referral_pathways_institution [text] What formal or informal referral pathways exist between your institution and humanitarian actors for these cases
    referral_pathways_institution: string | undefined
    // gi/eo_shelling_kii/barriers_accessing_services_eo [text] Are there barriers preventing civilians from accessing essential services after EO incidents (e.g., transportation, documentation, cost, stigma)?
    barriers_accessing_services_eo: string | undefined
    // gi/eo_shelling_kii/information_rights_victims [text] Do you have sufficient information about the rights of victims and the types of state assistance you can receive after incidents?
    information_rights_victims: string | undefined
    // gi/eo_shelling_fgd/not_eo_shelling_fgd_introduction [note] **Introduction - Perception and awareness**
    not_eo_shelling_fgd_introduction: string
    // gi/eo_shelling_fgd/not_eo_shelling_fgd_interviewer [note] **Note for the interviewer**: Some of the questions and this must be flagged to the participants, team members must also explain about the availability of VA services.
    not_eo_shelling_fgd_interviewer: string
    // gi/eo_shelling_fgd/around_community_dangerous [text] Are there areas in or around your community that are dangerous due to contamination by mines or unexploded ordnance (EO)?
    around_community_dangerous: string | undefined
    // gi/eo_shelling_fgd/areas_currently_dangerous_shelling [text] Are there areas that are currently dangerous or have recently become dangerous due to ongoing or recent shelling?
    areas_currently_dangerous_shelling: string | undefined
    // gi/eo_shelling_fgd/more_afraid_areas [text] Are you more afraid of areas contaminated by mines(EO or areas affected by shelling? Why?
    more_afraid_areas: string | undefined
    // gi/eo_shelling_fgd/usually_find_areas_contaminated [text] How do you usually find out which areas are contaminated by explosive ordnance (EO) or mines (e.g., signs, word of mouth, official announcements or after accidents have occurred)?
    usually_find_areas_contaminated: string | undefined
    // gi/eo_shelling_fgd/have_information_risks_associated [text] Do you feel you have enough information to keep yourself and your family safe? If not, what kind of information do you think will be useful?
    have_information_risks_associated: string | undefined
    // gi/eo_shelling_fgd/what_information_risks_associated [text] What information did you receive about the risks associated with EO contamination and shelling? From what sources?
    what_information_risks_associated: string | undefined
    // gi/eo_shelling_fgd/relatives_information_case_eo [text] Did you or your relatives receive information on how to act in case of an EO contamination or shelling?
    relatives_information_case_eo: string | undefined
    // gi/eo_shelling_fgd/not_impact_life_eo_sh [note] **Impact on Daily Life**
    not_impact_life_eo_sh: string
    // gi/eo_shelling_fgd/contamination_impact_ability_earn [text] Has the contamination and shelling had an impact on your ability to earn a living? If yes, how?
    contamination_impact_ability_earn: string | undefined
    // gi/eo_shelling_fgd/services_blocked_contamination [text] Has your access to services (such as schools, health care, or social services) been blocked or limited due to mines or explosive ordnance (EO) contamination?
    services_blocked_contamination: string | undefined
    // gi/eo_shelling_fgd/shelling_caused_damage_difficult [text] Has shelling or bombardment caused damage (e.g., to roads or buildings) that has made it more difficult to access these services?
    shelling_caused_damage_difficult: string | undefined
    // gi/eo_shelling_fgd/infrastructure_damaged_shelling [text] Are there any services or infrastructure damaged or destroyed by shelling (e.g. health centers, roads, schools)?
    infrastructure_damaged_shelling: string | undefined
    // gi/eo_shelling_fgd/transport_routes_changed_eo [text] Have the usual public transport routes or accessibility of public places changed due to the threat of EO?
    transport_routes_changed_eo: string | undefined
    // gi/eo_shelling_fgd/not_protection_risks_eo_sh [note] **Protection Risks and Incidents**
    not_protection_risks_eo_sh: string
    // gi/eo_shelling_fgd/mines_affected_move_freely [text] How has the threat of mines or shelling affected your ability to move freely in your community?
    mines_affected_move_freely: string | undefined
    // gi/eo_shelling_fgd/areas_avoid_mines [text] Are there areas you or others avoid? Why?
    areas_avoid_mines: string | undefined
    // gi/eo_shelling_fgd/accidents_injuries_explosive [text] Have there been any recent accidents or injuries due to explosive ordnance in your community?
    accidents_injuries_explosive: string | undefined
    // gi/eo_shelling_fgd/shelling_affected_civilian_safety [text] In your view, how has shelling affected civilian safety and freedom of movement?
    shelling_affected_civilian_safety: string | undefined
    // gi/eo_shelling_fgd/uxo_affected_civilian_safety [text] In your view, how do landmines or UXO affect freedom of movement?
    uxo_affected_civilian_safety: string | undefined
    // gi/eo_shelling_fgd/certain_groups_particularly_risk [text] Are certain groups particularly at risk (e.g., children, farmers, older persons etc)? How are people coping with the effects of shelling and contamination in the area?
    certain_groups_particularly_risk: string | undefined
    // gi/eo_shelling_fgd/alert_notifications_community [text] Are there shelters and air raid alert notifications in your community? If yes, do people use the shelters during attacks
    alert_notifications_community: string | undefined
    // gi/eo_shelling_fgd/not_access_services_eo_sh [note] **EO survivors access to services**
    not_access_services_eo_sh: string
    // gi/eo_shelling_fgd/people_injured_receiving_support [text] Are people who are affected such as those injured, displaced, or traumatised by shelling or explosive ordnance (EO) receiving any kind of support?
    people_injured_receiving_support: string | undefined
    // gi/eo_shelling_fgd/injured_kind_support_available [text] What kind of support is available (medical, psychosocial, legal, financial assistance from state etc.)?
    injured_kind_support_available: string | undefined
    // gi/eo_shelling_fgd/injured_challenges_getting_support [text] What challenges do people face in getting support?
    injured_challenges_getting_support: string | undefined
    // gi/eo_shelling_fgd/where_injured_needs_help [text] Do you know where to go if someone is injured or needs help after a shelling incident or EO accident?
    where_injured_needs_help: string | undefined
    // gi/eo_shelling_fgd/pwd_official_disability_status [text] Do people who became persons with disabilities as a result of the war apply for official disability status?
    pwd_official_disability_status: string | undefined
    // gi/eo_shelling_fgd/know_apply_disability_status [text] Do people know how to apply for disability status related to EO or war injuries, and what benefits are available to them?
    know_apply_disability_status: string | undefined
    // gi/eo_shelling_fgd/not_priority_needs_eo_sh [note] Priority needs
    not_priority_needs_eo_sh: string
    // gi/eo_shelling_fgd/support_community_need [text] What kind of support does your community need most urgently in relation to EO contamination?
    support_community_need: string | undefined
    // gi/eo_shelling_fgd/groups_targeted_support [text] Are there specific groups that require more targeted support?
    groups_targeted_support: string | undefined
    // gi/eo_shelling_fgd/not_aob_eo_sh [note] **AOB**
    not_aob_eo_sh: string
    // gi/eo_shelling_fgd/eo_sh_fgd_questions [text] Do the participants have any questions or any other information that they would like to share?
    eo_sh_fgd_questions: string | undefined
    // gi/veteran_reintegration_kii/vet_rein_kii_general_questions [text] General questions
    vet_rein_kii_general_questions: string | undefined
    // gi/veteran_reintegration_kii/vet_rein_kii_interaction_participation [text] Interaction and participation
    vet_rein_kii_interaction_participation: string | undefined
    // gi/veteran_reintegration_kii/vet_rein_kii_access_services [text] Access to services
    vet_rein_kii_access_services: string | undefined
    // gi/veteran_reintegration_kii/vet_rein_kii_well_being [text] Safety and psychological well-being
    vet_rein_kii_well_being: string | undefined
    // gi/veteran_reintegration_kii/vet_rein_kii_gbv [text] Gender-based violence
    vet_rein_kii_gbv: string | undefined
    // gi/veteran_reintegration_kii/vet_rein_kii_discrimination [text] Discrimination, stigma, social tension
    vet_rein_kii_discrimination: string | undefined
    // gi/veteran_reintegration_kii/vet_rein_kii_adaptation_development [text] Adaptation and development
    vet_rein_kii_adaptation_development: string | undefined
    // gi/elderly_people_service_providers/epsp_introduction [text] Introduction:
    epsp_introduction: string | undefined
    // gi/elderly_people_service_providers/epsp_protection_risks [text] Protection risks and vulnerabilities:
    epsp_protection_risks: string | undefined
    // gi/elderly_people_service_providers/epsp_mhpss [text] MHPSS:
    epsp_mhpss: string | undefined
    // gi/elderly_people_service_providers/epsp_access_services [text] Access to services:
    epsp_access_services: string | undefined
    // gi/elderly_people_service_providers/epsp_barriers [text] Gaps(Barriers and Recommendations
    epsp_barriers: string | undefined
    // gi/elderly_people/ep_displacement_history [text] Displacement History - *Only relevant for specific locations*
    ep_displacement_history: string | undefined
    // gi/elderly_people/ep_family_unit [text] Family Unit and Communal Support
    ep_family_unit: string | undefined
    // gi/elderly_people/ep_safety [text] Safety and security
    ep_safety: string | undefined
    // gi/elderly_people/ep_psychosocial_condition [text] Psychosocial condition & coping
    ep_psychosocial_condition: string | undefined
    // gi/elderly_people/ep_access_services [text] Access to services
    ep_access_services: string | undefined
    // gi/elderly_people/ep_winterisation [text] Winterisation
    ep_winterisation: string | undefined
    // gi/elderly_people/ep_access_documentation [text] Access to documentation and legal aid
    ep_access_documentation: string | undefined
    // gi/gbv_risks_older/gro_current_situation [text] 1. Can you describe the current situation for older people in your community? How have recent events (such as the conflict or displacement) affected the daily lives and sense of safety of older people like yourselves?
    gro_current_situation: string | undefined
    // gi/gbv_risks_older/gro_safety_concerns [text] 2. What kinds of safety concerns do older people have regarding violence or abuse? (For example, are there worries about harassment, domestic violence, or other kinds of harm?)
    gro_safety_concerns: string | undefined
    // gi/gbv_risks_older/gro_places_unsafe [text] 3. Are there certain places or situations where older people feel most unsafe or at risk of violence? (For instance, when accessing aid, in shelters, at home, or in public spaces?)
    gro_places_unsafe: string | undefined
    // gi/gbv_risks_older/gro_types_violence [text] 4. What types of violence or abuse have older people in this community experienced or heard about? Who were the typical perpetrators in these cases?
    gro_types_violence: string | undefined
    // gi/gbv_risks_older/gro_risk_violence [text] 5. How does being an older person affect someone’s risk of such violence? Are there specific vulnerabilities that older men or women have that others might not? (For example, mobility issues or dependence on caregivers.)
    gro_risk_violence: string | undefined
    // gi/gbv_risks_older/gro_experiences_violence [text] 6. If an older person experiences violence, what do they typically do afterward? Who would they turn to for help or support first?
    gro_experiences_violence: string | undefined
    // gi/gbv_risks_older/gro_organizations_help [text] 7. Are you aware of any services or organizations that help older people who experience GBV or any kind of abuse? (For example, healthcare, counseling, police, hotlines.) Have older people been able to use these services? If not, what are the reasons?
    gro_organizations_help: string | undefined
    // gi/gbv_risks_older/gro_barriers [text] 8. What barriers or difficulties might prevent older people from accessing help or services after experiencing violence? (Consider things like physical accessibility, transportation, fear of stigma, or lack of trust in services.)
    gro_barriers: string | undefined
    // gi/gbv_risks_older/gro_people_respond [text] 9. How do people in the community respond when an older person faces violence? Do neighbors or family members help them, or is it usually kept quiet? Is there any stigma around an older person speaking up about abuse?
    gro_people_respond: string | undefined
    // gi/gbv_risks_older/gro_improve_safety [text] 10. What do you think could be done to improve the safety of older people and reduce the risk of violence? Do you have any suggestions for the community, authorities, or organizations?
    gro_improve_safety: string | undefined
    // gi/gbv_risks_pwd/grp_current_situation [text] 1. Can you describe the current situation for persons with disabilities in your community? How have recent events (such as the conflict or displacement) affected the daily lives and safety of people with disabilities?
    grp_current_situation: string | undefined
    // gi/gbv_risks_pwd/grp_safety_concerns [text] 2. What are the main safety concerns for people with disabilities regarding violence or abuse? (For example, do they worry about harassment, exploitation, or abuse at home or in the community?)
    grp_safety_concerns: string | undefined
    // gi/gbv_risks_pwd/grp_places_unsafe [text] 3. Are there particular places or situations where persons with disabilities feel especially unsafe or at risk of violence? (For instance, while traveling, at aid distribution points, in shelters, or other places?)
    grp_places_unsafe: string | undefined
    // gi/gbv_risks_pwd/grp_types_violence [text] 4. What types of violence or mistreatment have persons with disabilities experienced or heard about here? Who were the typical perpetrators in such cases?
    grp_types_violence: string | undefined
    // gi/gbv_risks_pwd/grp_risk_violence [text] 5. In what ways does having a disability affect someone’s risk of violence? Are certain disabilities (physical, sensory, intellectual) associated with different risks? Are women with disabilities facing any additional risks?
    grp_risk_violence: string | undefined
    // gi/gbv_risks_pwd/grp_experiences_violence [text] 6. If a person with a disability experiences violence or abuse, what do they usually do? Who do they go to first for help or support?
    grp_experiences_violence: string | undefined
    // gi/gbv_risks_pwd/grp_organizations_help [text] 7. What services or organizations are available to help persons with disabilities who experience GBV or other abuse? (For example, medical care, counseling, police, legal aid.) Can people with disabilities access these services easily?
    grp_organizations_help: string | undefined
    // gi/gbv_risks_pwd/grp_barriers [text] 8. What challenges or barriers might stop a person with a disability from getting help after experiencing violence? (Consider things like lack of wheelchair access, difficulty traveling, communication barriers for those who are deaf or hard of hearing, or fear of being treated unfairly.)
    grp_barriers: string | undefined
    // gi/gbv_risks_pwd/grp_people_respond [text] 9. How do family members and the community treat a person with a disability who has experienced violence? Do they support them or is it kept secret? Is there any stigma when a person with a disability speaks up about abuse?
    grp_people_respond: string | undefined
    // gi/gbv_risks_pwd/grp_improve_safety [text] 10. What do you think could help protect persons with disabilities from violence or abuse? Do you have any suggestions for improving safety and support for them (for example, better accessibility, community awareness, or specific programs)?
    grp_improve_safety: string | undefined
    // gi/veteran_reintegration_fgd/vet_rein_fgd_general_questions [text] General questions
    vet_rein_fgd_general_questions: string | undefined
    // gi/veteran_reintegration_fgd/vet_rein_fgd_access_services [text] Access to services
    vet_rein_fgd_access_services: string | undefined
    // gi/veteran_reintegration_fgd/vet_rein_fgd_safety_state [text] Safety, psychological state
    vet_rein_fgd_safety_state: string | undefined
    // gi/veteran_reintegration_fgd/vet_rein_fgd_stigmatization [text] Stigmatization, discrimination, social tension
    vet_rein_fgd_stigmatization: string | undefined
    // gi/veteran_reintegration_fgd/vet_rein_fgd_proposed_changes [text] Proposed changes
    vet_rein_fgd_proposed_changes: string | undefined
    // gi/home_based_care/hbc_general_questions [text] 1. General questions
    hbc_general_questions: string | undefined
    // gi/home_based_care/hbc_barriers [text] 2. Barriers
    hbc_barriers: string | undefined
    // gi/home_based_care/hbc_access_information [text] 3. Access to information
    hbc_access_information: string | undefined
    // gi/home_based_care/hbc_registration_status [text] 4. Registration of caregiver status
    hbc_registration_status: string | undefined
    // gi/home_based_care/hbc_access_services [text] 5. Access to services
    hbc_access_services: string | undefined
    // gi/home_based_care/hbc_challenges [text] 6. Challenges
    hbc_challenges: string | undefined
    // gi/home_based_care/hbc_additional_needs [text] 7. Additional needs
    hbc_additional_needs: string | undefined
    // gi/home_based_care_ser/hbcs_general_questions [text] 1. General questions
    hbcs_general_questions: string | undefined
    // gi/home_based_care_ser/hbcs_informing_public [text] 2. Informing the public
    hbcs_informing_public: string | undefined
    // gi/home_based_care_ser/hbcs_registration_procedure [text] 3. Registration procedure
    hbcs_registration_procedure: string | undefined
    // gi/home_based_care_ser/hbcs_financial_matters [text] 4. Financial matters
    hbcs_financial_matters: string | undefined
    // gi/home_based_care_ser/hbcs_barriers [text] 5. Barriers
    hbcs_barriers: string | undefined
    // gi/home_based_care_ser/hbcs_additional_services [text] 6. Additional services
    hbcs_additional_services: string | undefined
    // gi/home_based_care_ser/hbcs_additional_needs [text] 7. Additional needs
    hbcs_additional_needs: string | undefined
    // gi/needs_vulnerabilities_caregivers/nvc_introduction [text] 1. Introduction:
    nvc_introduction: string | undefined
    // gi/needs_vulnerabilities_caregivers/nvc_establishing_status [text] 2. Establishing official status:
    nvc_establishing_status: string | undefined
    // gi/needs_vulnerabilities_caregivers/nvc_access_services [text] 3. Access to Services
    nvc_access_services: string | undefined
    // gi/needs_vulnerabilities_caregivers/nvc_well_being [text] 4. Emotional Well-Being and Psychosocial Support
    nvc_well_being: string | undefined
    // gi/needs_vulnerabilities_caregivers/nvc_needed_support [text] 5. Needed Support
    nvc_needed_support: string | undefined
    // gi/needs_vulnerabilities_social/nvs_introduction [text] 1. Introduction:
    nvs_introduction: string | undefined
    // gi/needs_vulnerabilities_social/nvs_establishing_status [text] 2. Establishing official status:
    nvs_establishing_status: string | undefined
    // gi/needs_vulnerabilities_social/nvs_access_services [text] 3. Access to Services
    nvs_access_services: string | undefined
    // gi/needs_vulnerabilities_social/nvs_well_being [text] 4. Emotional Well-Being and Psychosocial Support
    nvs_well_being: string | undefined
    // gi/needs_vulnerabilities_social/nvs_needed_support [text] 5. Needed Support
    nvs_needed_support: string | undefined
    // gi/rpa_idp_needs_fgd/rinf_general [text] 1. General Information :
    rinf_general: string | undefined
    // gi/rpa_idp_needs_fgd/rinf_access_housing [text] 2. Access to Housing (Safe Shelter)
    rinf_access_housing: string | undefined
    // gi/rpa_idp_needs_fgd/rinf_access_livelihoods [text] 3. Access to Livelihoods ( Employment
    rinf_access_livelihoods: string | undefined
    // gi/rpa_idp_needs_fgd/rinf_access_services [text] 4. Access to Services (Education, Healthcare, Transportation)
    rinf_access_services: string | undefined
    // gi/rpa_idp_needs_fgd/rinf_basic_needs [text] 5. Basic Needs (Housing Costs, Clothing)
    rinf_basic_needs: string | undefined
    // gi/rpa_idp_needs_fgd/rinf_access_assistance [text] 6. Access to Humanitarian Assistance
    rinf_access_assistance: string | undefined
    // gi/rpa_idp_needs_kii/rink_general [text] 1. General Information :
    rink_general: string | undefined
    // gi/rpa_idp_needs_kii/rink_access_service_provision [text] 2. Access to Service Provision
    rink_access_service_provision: string | undefined
    // gi/rpa_idp_needs_kii/rink_financial_situation [text] 3. Financial Situation and Employment
    rink_financial_situation: string | undefined
    // gi/rpa_idp_needs_kii/rink_coordination_interaction [text] 4. Coordination and Interaction
    rink_coordination_interaction: string | undefined
    // gi/rpa_idp_needs_kii/rink_humanitarian_assistance [text] 5. Humanitarian Assistance
    rink_humanitarian_assistance: string | undefined
    // gi/psychosocial_support_fgd/psf_main_sources_distress [text] 1. Main sources of psychological distress:
    psf_main_sources_distress: string | undefined
    // gi/psychosocial_support_fgd/psf_signs_psychological_distress [text] 2. Signs and symptoms of psychological distress
    psf_signs_psychological_distress: string | undefined
    // gi/psychosocial_support_fgd/psf_impact_distress [text] 3. The impact of distress at different levels:
    psf_impact_distress: string | undefined
    // gi/psychosocial_support_fgd/psf_coping_mechanisms [text] 4. Coping mechanisms and resources:
    psf_coping_mechanisms: string | undefined
    // gi/psychosocial_support_fgd/psf_vulnerable_groups [text] 5. Vulnerable groups and service providers
    psf_vulnerable_groups: string | undefined
    // gi/psychosocial_support_fgd/psf_attitudes_pshs [text] 6. Attitudes toward PSHS and willingness to participate:
    psf_attitudes_pshs: string | undefined
    // gi/psychosocial_support_kii/psk_main_sources_distress [text] 1. Main sources of psychological distress in the community
    psk_main_sources_distress: string | undefined
    // gi/psychosocial_support_kii/psk_signs_psychological_distress [text] 2. Signs and symptoms of psychological distress
    psk_signs_psychological_distress: string | undefined
    // gi/psychosocial_support_kii/psk_impact_distress [text] 3. The impact of distress at different levels:
    psk_impact_distress: string | undefined
    // gi/psychosocial_support_kii/psk_coping_mechanisms [text] 4. Coping mechanisms and resources:
    psk_coping_mechanisms: string | undefined
    // gi/psychosocial_support_kii/psk_vulnerable_groups [text] 5. Vulnerable groups and service providers
    psk_vulnerable_groups: string | undefined
    // gi/psychosocial_support_kii/psk_attitudes_pshs [text] 6. Attitudes toward PSHS and willingness to participate:
    psk_attitudes_pshs: string | undefined
    // gi/rpa_collective_sites_fgd/rcsf_evacuation_process [text] 1. Evacuation process
    rcsf_evacuation_process: string | undefined
    // gi/rpa_collective_sites_fgd/rcsf_safety [text] 2. Safety & Security Situation
    rcsf_safety: string | undefined
    // gi/rpa_collective_sites_fgd/rcsf_support_people [text] 3. Support for People with Mine/Explosive Injuries *depending on the relevance of the topics for the interviewed group*
    rcsf_support_people: string | undefined
    // gi/rpa_collective_sites_fgd/rcsf_housing_access [text] 4. Housing and Access to Compensation
    rcsf_housing_access: string | undefined
    // gi/rpa_collective_sites_fgd/rcsf_living_conditions [text] 5. Living Conditions and Access to Services
    rcsf_living_conditions: string | undefined
    // gi/rpa_collective_sites_fgd/rcsf_psychological_wellbeing [text] 6. Psychological Well-being
    rcsf_psychological_wellbeing: string | undefined
    // gi/rpa_collective_sites_kii/rcsk_general_information [text] 1. General Information
    rcsk_general_information: string | undefined
    // gi/rpa_collective_sites_kii/rcsk_evacuation_process [text] 2. Evacuation Process
    rcsk_evacuation_process: string | undefined
    // gi/rpa_collective_sites_kii/rcsk_safety [text] 3. Safety
    rcsk_safety: string | undefined
    // gi/rpa_collective_sites_kii/rcsk_support_people [text] 4. Explosive Ordnance (EO) Victims
    rcsk_support_people: string | undefined
    // gi/rpa_collective_sites_kii/rcsk_housing_access [text] 5. Housing and Access to Compensation
    rcsk_housing_access: string | undefined
    // gi/rpa_collective_sites_kii/rcsk_living_conditions [text] 6. Living Conditions and Access to Services
    rcsk_living_conditions: string | undefined
    // gi/rpa_collective_sites_kii/rcsk_psychological_wellbeing [text] 7. Psychological well-being and social cohesion
    rcsk_psychological_wellbeing: string | undefined
    // gi/rpa_collective_sites_kii/rcsk_gbv [text] 8. GBV
    rcsk_gbv: string | undefined
    // gi/rpa_collective_sites_kii/rcsk_needed_support [text] 9. Required Support
    rcsk_needed_support: string | undefined
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
      UMY021: `UMY021`,
      UMY022: `UMY022`,
      UMY023: `UMY023`,
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
      HRK021: `HRK021`,
      HRK022: `HRK022`,
      HRK_A: `HRK-A`,
      HRK_B: `HRK-B`,
      HRK_C: `HRK-C`,
      HRK_D: `HRK-D`,
      HRK_E: `HRK-E`,
      HRK_F: `HRK-F`,
      HRK_G: `HRK-G`,
      HRK_H: `HRK-H`,
      HRK_I: `HRK-I`,
      HRK_J: `HRK-J`,
      HRK_K: `HRK-K`,
      'HRK_ L': `HRK- L`,
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
      DNK021: `DNK021`,
      DNK022: `DNK022`,
      DNK023: `DNK023`,
      DNK_A: `DNK-A`,
      DNK_B: `DNK-B`,
      DNK_C: `DNK-C`,
      DNK_D: `DNK-D`,
      DNK_E: `DNK-E`,
      DNK_F: `DNK-F`,
      DNK_G: `DNK-G`,
      DNK_H: `DNK-H`,
      DNK_I: `DNK-I`,
      DNK_J: `DNK-J`,
      DNK_K: `DNK-K`,
      'DNK_ L': `DNK- L`,
      NLV001: `NLV001`,
      NLV002: `NLV002`,
      NLV003: `NLV003`,
      NLV004: `NLV004`,
      NLV005: `NLV005`,
      NLV006: `NLV006`,
      NLV007: `NLV007`,
      NLV008: `NLV008`,
      NLV009: `NLV009`,
      NLV010: `NLV010`,
      NLV011: `NLV011`,
      NLV012: `NLV012`,
      NLV013: `NLV013`,
      NLV014: `NLV014`,
      NLV015: `NLV015`,
      NLV016: `NLV016`,
      NLV017: `NLV017`,
      NLV018: `NLV018`,
      NLV019: `NLV019`,
      NLV020: `NLV020`,
      NLV_B: `NLV-B`,
      NLV_C: `NLV-C`,
      NLV_D: `NLV-D`,
      NLV_E: `NLV-E`,
      NLV_G: `NLV-G`,
      NLV_H: `NLV-H`,
      NLV_I: `NLV-I`,
      NLV_J: `NLV-J`,
      NLV_K: `NLV-K`,
      NLV_L: `NLV-L`,
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
    informed_rental_subsidy: {
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
      individuals: `Individuals (IDP)`,
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
      veterans: `Veterans`,
      community_psychosocial_needs: `Community Psychosocial Needs Assessment`,
      other: `Other`,
    },
    topic: {
      social_cohesion: `Social cohesion`,
      social_cohesion_ok: `Social cohesion`,
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
      rental_subsidy_idp: `Efficiency of the Rental Subsidy for IDPs`,
      idp_integration: `IDP Integration`,
      eo_shelling: `EO and Shelling`,
      gbv_risks_older: `GBV risks for older people`,
      gbv_risks_pwd: `GBV risks for people with disabilities`,
      elderly_people_service_providers: `Elderly people - service providers`,
      elderly_people: `Elderly people`,
      women_roles_armed_conflic: `Women Roles During Armed Conflict`,
      secure_afforable_housing: `Access to secure and afforable housing parallel`,
      inclusion_accessibility: `Inclusion and Accessibility`,
      rpa_vysokopilska: `RPA Vysokopilska`,
      home_based_care_сaregiver: `Home based care (Caregiver)`,
      home_based_care_сaregiver_providers: `Home based care (Service providers)`,
      needs_vulnerabilities_caregivers: `Needs and Vulnerabilities of Caregivers (Questions for caregivers)`,
      needs_vulnerabilities_social: `Needs and Vulnerabilities of Caregivers (Questions for social workers, local authorities, and social protection staff)`,
      veterans: `Veterans`,
      veterans_families: `Veterans families`,
      veterans_mhpss: `Veterans MHPSS`,
      veteran_reintegration: `Veteran Reintegration: Assessing Local Preparedness`,
      rpa_idp_needs: `RPA IDP’s Needs`,
      rpa_collective_sites: `RPA – Collective sites`,
      psychosocial_support: `Psychosocial Support`,
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
    apply_receive_subsidy: {
      received_subsidy: `Yes, we applied, and received the subsidy`,
      application_pending: `Yes, we applied, and application is pending`,
      were_rejected: `Yes, we applied but we were rejected`,
      not_applied: `No, we have not applied`,
    },
    not_applied_reason: {
      meet_eligibility_criteria: `We don’t meet the eligibility criteria`,
      decided_not_apply: `I decided not to apply because I preferred to receive IDP allowance`,
      procedure_complicated: `The procedure was too complicated and/or time-consuming`,
      not_think_landlord: `I did not think that I can find a landlord willing to participate`,
      dk: `I don’t know`,
      other: `Other`,
    },
    meet_eligibility_criteria: {
      not_displaced: `We were not displaced from areas of active hostilities or ToT`,
      minimum_income: `We were not fulfilling the minimum income`,
      no_written_rental: `We had no written rental agreement (please specify: go to question: 5)`,
      not_landlord_approval: `We had written rental agreement, but we could not receive landlord’s approval (please specify: go to question: 6)`,
      another_housing: `I had another housing in Ukraine other than in ToT.`,
      dk: `I don’t know`,
      other: `Other`,
    },
    written_rental_agreement: {
      pay_taxes: `Landlord doesn’t want to pay taxes`,
      formalize_relation: `Landlord does not want to formalize rental relation`,
      lack_information: `Lack of information on how to make written rental agreement`,
      dk: `I don’t know`,
      other: `Other`,
    },
    not_landlord_approval: {
      data_information: `Landlord does not want to reveal data/information to the government / Does not want to engage with government`,
      spend_time: `Landlord does not want to spend time on the subsidy application`,
      pay_taxes: `The landlord did not want to pay taxes`,
      taxation_system: `The landlord finds the taxation system under this program too complicated`,
      dk: `I don’t know`,
      other: `Other`,
    },
    program_attractive_landlords: {
      tax_exemption: `Tax exemption or full tax compensation`,
      simplified_tax_procedures: `Simplified tax procedures`,
      interaction_government: `Less interaction and engagement with the government`,
      no_requirement_sign: `No requirement to sign a formal rental agreement`,
      rental_agreements: `Legal information/awareness on rental agreements`,
      subsidy_program: `Legal information/awareness on rental subsidy program`,
      taxation_system: `Legal information about taxation system / tax law`,
      simplified_application_procedure: `Simplified application procedure`,
      dk: `I don’t know`,
      other: `Other`,
    },
    program_accessible_idp: {
      subsidy_without_consent: `The ability to receive the subsidy without the landlord’s participation (or consent)`,
      subsidy_without_written_agreement: `The ability to receive the subsidy without requiring written rental agreement`,
      rental_agreements: `Legal information/awareness on rental agreements`,
      subsidy_program: `Legal information/awareness on rental subsidy program`,
      assistance_documentation: `Assistance with documentation including rental agreements`,
      dk: `I don’t know`,
      other: `Other`,
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
      not_applied_reason: _.not_applied_reason?.split(' '),
      meet_eligibility_criteria: _.meet_eligibility_criteria?.split(' '),
      written_rental_agreement: _.written_rental_agreement?.split(' '),
      not_landlord_approval: _.not_landlord_approval?.split(' '),
      program_attractive_landlords: _.program_attractive_landlords?.split(' '),
      program_accessible_idp: _.program_accessible_idp?.split(' '),
    }) as T
}
