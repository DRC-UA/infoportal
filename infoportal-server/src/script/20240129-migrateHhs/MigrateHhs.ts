import {PrismaClient} from '@prisma/client'
import {KoboSdkGenerator} from '../../feature/kobo/KoboSdkGenerator'
import {PromisePool} from '@supercharge/promise-pool'
import {ApiKoboAnswerMetaData, KoboAnswer} from '../../feature/connector/kobo/KoboClient/type/KoboAnswer'
import {scriptConf} from '../ScriptConf'
import {Protection_hhs} from '@infoportal-common'
import {mapFor} from '@alexandreannic/ts-utils'
import {KoboIndex} from '@infoportal-common'
import {Protection_hhs3Create} from '@infoportal-common'

const retryIds = []
const problemId = [
    424769397,
    // 531802905
  ]

;(async () => {
  const config = {
    server: 'prod',
    importConcurrency: 200,
  } as const
  const serverConfig = {
    dev: {
      formId: 'a89UuhpXnPusPbK3SwQzBU',
      newFormId: 'a5Q6vAMXRpv859ZUP3gDHR',
    },
    prod: {
      formId: KoboIndex.byName('protection_hhs2_1').id,
      newFormId: KoboIndex.byName('protection_hhs3').id,
    }
  }[config.server]

  const prisma = new PrismaClient()
  const sdk = await new KoboSdkGenerator(prisma).get(scriptConf.kobo[config.server].serverId)
  const sdkv1 = await new KoboSdkGenerator(prisma).getV1(scriptConf.kobo[config.server].serverId)

  // const getAllIds = await sdk
  //   .getAnswersRaw(serverConfig.formId)
  //   .then(x => x.results.map(a => {
  //     return {
  //       ...a,
  //     }
  //   }))
  // console.log(getAllIds)

  const getAllIds: KoboAnswer<Protection_hhs.T>[] = await sdk
    .getAnswers(serverConfig.formId)
    .then(x => x.data
      // .filter(_ => retryIds.includes(+_.id))
      .map(a => {
        return {
          ...a,
          answers: Protection_hhs.map(a.answers)
        }
      }))

  const newFromUuid = await sdkv1.getForms().then(_ => _.find(f => f.id_string === serverConfig.newFormId)?.uuid)

  await PromisePool.withConcurrency(config.importConcurrency).for(getAllIds).process(async (row, i) => {
    try {
      const d = row.answers
      const res = await sdkv1.submit<ApiKoboAnswerMetaData & Protection_hhs3Create.T>({
        formId: serverConfig.newFormId,
        uuid: newFromUuid,
        data: {
          prev_id: row.id,
          start: new Date(d.start ?? row.submissionTime).toISOString() as any,
          end: new Date(d.end ?? row.submissionTime).toISOString() as any,
          __version__: row.version,
          _uuid: row.uuid,
          deviceid: d.deviceid,
          date: row.submissionTime,
          group_introduction: {
            staff_to_insert_their_DRC_office: d.staff_to_insert_their_DRC_office,
            staff_code: d.staff_code,
            type_of_site: d.type_of_site,
            present_yourself: d.present_yourself,
            thanks_the_respondant: d.thanks_the_respondant,
            have_you_filled_out_this_form_before: d.have_you_filled_out_this_form_before,
            have_you_filled_out_this_form_before_yes: d.have_you_filled_out_this_form_before_yes,
          },
          group_basic_bio_data: {
            where_are_you_current_living_label: d.where_are_you_current_living_label,
            where_are_you_current_living_oblast: d.where_are_you_current_living_oblast,
            where_are_you_current_living_raion: d.where_are_you_current_living_raion,
            where_are_you_current_living_hromada: d.where_are_you_current_living_hromada,
            settlement: d.settlement,
            what_is_your_citizenship: d.what_is_your_citizenship,
            if_nonukrainian_what_is_your_citizenship: d.if_nonukrainian_what_is_your_citizenship,
            please_specifyif_nonukrainian_what_is_your_citizenship: d.please_specifyif_nonukrainian_what_is_your_citizenship,
            if_ukrainian_do_you_or_your_household_members_identify_as_member_of_a_minority_group: d.if_ukrainian_do_you_or_your_household_members_identify_as_member_of_a_minority_group,
            please_specifyif_ukrainian_do_you_or_your_household_members_identify_as_member_of_a_minority_group: d.please_specifyif_ukrainian_do_you_or_your_household_members_identify_as_member_of_a_minority_group,
            what_is_the_primary_language_spoken_in_your_household: d.what_is_the_primary_language_spoken_in_your_household,
          },
          group_hh_composition: {
            what_is_the_type_of_your_household: d.what_is_the_type_of_your_household,
            what_is_the_type_of_your_household_min: d.what_is_the_type_of_your_household_min,
            what_is_the_type_of_your_household_max: d.what_is_the_type_of_your_household_max,
            ben_det_hh_size: d.how_many_ind,
            hh_char_hh_det: mapFor(d.how_many_ind ?? 0, i => i + 1).map(i => ({
              // @ts-ignore
              hh_char_hh_det_age: d['hh_age_' + i],
              // @ts-ignore
              hh_char_hh_det_gender: d['hh_sex_' + i],
              // hh_char_hh_det_disability: d.do_you_have_a_household_member_that_has_a_lot_of_difficulty,
            }) as any,),
            // hh_char_hh_det: d.hh_char_hh_det,
            //   hh_char_hh_det_gender: d.hh_char_hh_det_gender,
            //   hh_char_hh_det_age: d.hh_char_hh_det_age,
            //   do_you_have_a_household_member_that_has_a_lot_of_difficulty: d.do_you_have_a_household_member_that_has_a_lot_of_difficulty,
            //   have6_15: d.have6_15,
            //   haveBoy: d.haveBoy,
            //   haveOtherSex: d.haveOtherSex,
            //   haveGirl: d.haveGirl,
            //   haveAdultMale: d.haveAdultMale,
            //   haveAdultFemale: d.haveAdultFemale,
            // }[] | undefined,
            are_you_separated_from_any_of_your_households_members: d.are_you_separated_from_any_of_your_households_members,
            where_is_your_partner: d.where_is_your_partner,
            please_specifywhere_is_your_partner: d.please_specifywhere_is_your_partner,
            where_is_your_partner_remain_behind_in_the_area_of_origin: d.where_is_your_partner_remain_behind_in_the_area_of_origin,
            please_specifywhere_is_your_partner_remain_behind_in_the_area_of_origin: d.please_specifywhere_is_your_partner_remain_behind_in_the_area_of_origin,
            where_is_your_child_lt_18: d.where_is_your_child_lt_18,
            please_specifywhere_is_your_child_lt_18: d.please_specifywhere_is_your_child_lt_18,
            where_is_your_child_lt_18_remain_behind_in_the_area_of_origin: d.where_is_your_child_lt_18_remain_behind_in_the_area_of_origin,
            please_specifywhere_is_your_child_lt_18_remain_behind_in_the_area_of_origin: d.please_specifywhere_is_your_child_lt_18_remain_behind_in_the_area_of_origin,
            where_is_your_child_gte_18: d.where_is_your_child_gte_18,
            please_specifywhere_is_your_child_gte_18: d.please_specifywhere_is_your_child_gte_18,
            where_is_your_child_gte_18_remain_behind_in_the_area_of_origin: d.where_is_your_child_gte_18_remain_behind_in_the_area_of_origin,
            please_specifywhere_is_your_child_gte_18_remain_behind_in_the_area_of_origin: d.please_specifywhere_is_your_child_gte_18_remain_behind_in_the_area_of_origin,
            where_is_your_mother: d.where_is_your_mother,
            please_specifywhere_is_your_mother: d.please_specifywhere_is_your_mother,
            where_is_your_mother_remain_behind_in_the_area_of_origin: d.where_is_your_mother_remain_behind_in_the_area_of_origin,
            please_specifywhere_is_your_mother_remain_behind_in_the_area_of_origin: d.please_specifywhere_is_your_mother_remain_behind_in_the_area_of_origin,
            where_is_your_father: d.where_is_your_father,
            please_specifywhere_is_your_father: d.please_specifywhere_is_your_father,
            where_is_your_father_remain_behind_in_the_area_of_origin: d.where_is_your_father_remain_behind_in_the_area_of_origin,
            please_specifywhere_is_your_father_remain_behind_in_the_area_of_origin: d.please_specifywhere_is_your_father_remain_behind_in_the_area_of_origin,
            where_is_your_caregiver: d.where_is_your_caregiver,
            please_specifywhere_is_your_caregiver: d.please_specifywhere_is_your_caregiver,
            where_is_your_caregiver_remain_behind_in_the_area_of_origin: d.where_is_your_caregiver_remain_behind_in_the_area_of_origin,
            please_specifywhere_is_your_caregiver_remain_behind_in_the_area_of_origin: d.please_specifywhere_is_your_caregiver_remain_behind_in_the_area_of_origin,
            where_is_your_other_relative: d.where_is_your_other_relative,
            please_specifywhere_is_your_other_relative: d.please_specifywhere_is_your_other_relative,
            where_is_your_other_relative_remain_behind_in_the_area_of_origin: d.where_is_your_other_relative_remain_behind_in_the_area_of_origin,
            please_specifywhere_is_your_other_relative_remain_behind_in_the_area_of_origin: d.please_specifywhere_is_your_other_relative_remain_behind_in_the_area_of_origin,
          },
          group_specific_needs: {
            do_any_of_these_specific_needs_categories_apply_to_the_head_of_this_household: d.do_any_of_these_specific_needs_categories_apply_to_the_head_of_this_household,
            please_specifydo_any_of_these_specific_needs_categories_apply_to_the_head_of_this_household: d.please_specifydo_any_of_these_specific_needs_categories_apply_to_the_head_of_this_household,
            do_you_have_a_household_member_that_has_a_lot_of_difficulty: d.do_you_have_a_household_member_that_has_a_lot_of_difficulty,
            how_many_children_have_one_or_more_of_the_functional_limitations: d.how_many_children_have_one_or_more_of_the_functional_limitations,
            how_many_adults_members_have_one_or_more_of_the_functional_limitations: d.how_many_adults_members_have_one_or_more_of_the_functional_limitations,
            do_you_or_anyone_in_your_household_have_a_disability_status_from_the_gov: d.do_you_or_anyone_in_your_household_have_a_disability_status_from_the_gov,
            why_dont_they_have_status: d.why_dont_they_have_status,
            please_specifywhy_dont_they_have_status: d.please_specifywhy_dont_they_have_status,
            do_you_or_anyone_in_your_household_receive_state_allowance_for_disability: d.do_you_or_anyone_in_your_household_receive_state_allowance_for_disability,
            does_the_household_host_children_who_are_relatives: d.does_the_household_host_children_who_are_relatives,
            does_the_household_host_children_who_are_not_relatives: d.does_the_household_host_children_who_are_not_relatives,
          },
          group_displacement_status_and_info: {
            do_you_identify_as_any_of_the_following: d.do_you_identify_as_any_of_the_following,
            are_you: d.are_you,
            what_is_your_area_of_origin_label: d.what_is_your_area_of_origin_label,
            what_is_your_area_of_origin_oblast: d.what_is_your_area_of_origin_oblast,
            what_is_your_area_of_origin_raion: d.what_is_your_area_of_origin_raion,
            what_is_your_area_of_origin_hromada: d.what_is_your_area_of_origin_hromada,
            why_did_you_leave_your_area_of_origin: d.why_did_you_leave_your_area_of_origin,
            please_specifywhy_did_you_leave_your_area_of_origin: d.please_specifywhy_did_you_leave_your_area_of_origin,
            when_did_you_leave_your_area_of_origin: d.when_did_you_leave_your_area_of_origin,
            how_did_you_travel_to_your_displacement_location: d.how_did_you_travel_to_your_displacement_location,
            please_specifyhow_did_you_travel_to_your_displacement_location: d.please_specifyhow_did_you_travel_to_your_displacement_location,
            when_did_you_first_leave_your_area_of_origin: d.when_did_you_first_leave_your_area_of_origin,
            when_did_you_return_to_your_area_of_origin: d.when_did_you_return_to_your_area_of_origin,
            why_did_you_decide_to_return_to_your_area_of_origin: d.why_did_you_decide_to_return_to_your_area_of_origin,
            please_specifywhy_did_you_decide_to_return_to_your_area_of_origin: d.please_specifywhy_did_you_decide_to_return_to_your_area_of_origin,
            have_you_received_any_form_of_compensation_for_leaving_your_area_of_origin: d.have_you_received_any_form_of_compensation_for_leaving_your_area_of_origin,
            have_you_received_any_form_of_compensation_for_returnee_your_area_of_origin: d.have_you_received_any_form_of_compensation_for_returnee_your_area_of_origin,
            was_your_movement_to_return_to_your_area_of_origin_supported_or_facilitated_by_any_of_the_following: d.was_your_movement_to_return_to_your_area_of_origin_supported_or_facilitated_by_any_of_the_following,
            please_specifywas_your_movement_to_return_to_your_area_of_origin_supported_or_facilitated_by_any_of_the_following: d.please_specifywas_your_movement_to_return_to_your_area_of_origin_supported_or_facilitated_by_any_of_the_following,
            did_you_or_any_member_of_your_household_on_your_displacement_journey_experience_safety_or_security_concerns: d.did_you_or_any_member_of_your_household_on_your_displacement_journey_experience_safety_or_security_concerns,
            please_specifydid_you_or_any_member_of_your_household_on_your_displacement_journey_experience_safety_or_security_concerns: d.please_specifydid_you_or_any_member_of_your_household_on_your_displacement_journey_experience_safety_or_security_concerns,
            have_you_been_displaced_prior_to_your_current_displacement: d.have_you_been_displaced_prior_to_your_current_displacement,
            get_status: d.get_status,
            what_are_your_households_intentions_in_terms_of_place_of_residence: d.what_are_your_households_intentions_in_terms_of_place_of_residence,
            what_factors_would_be_key_to_support_your_successful_integration_into_the_local_community: d.what_factors_would_be_key_to_support_your_successful_integration_into_the_local_community,
            please_specifywhat_factors_would_be_key_to_support_your_successful_integration_into_the_local_community: d.please_specifywhat_factors_would_be_key_to_support_your_successful_integration_into_the_local_community,
            what_would_be_the_deciding_factor_in_your_return_to_your_area_of_origin: d.what_would_be_the_deciding_factor_in_your_return_to_your_area_of_origin,
            why_are_planning_to_relocate_from_your_current_place_of_residence: d.why_are_planning_to_relocate_from_your_current_place_of_residence,
            please_specifywhy_are_planning_to_relocate_from_your_current_place_of_residence: d.please_specifywhy_are_planning_to_relocate_from_your_current_place_of_residence,
          },
          group_registration_documentation: {
            as_nonUkrainian_do_you_have_documentation: d.as_nonUkrainian_do_you_have_documentation,
            as_stateless_person_household_do_you_have_a_stateless_registration_certificate: d.as_stateless_person_household_do_you_have_a_stateless_registration_certificate,
            are_you_and_your_hh_members_registered_as_idps: d.are_you_and_your_hh_members_registered_as_idps,
            hh_char_hh_doc: mapFor(d.how_many_ind ?? 0, i => i + 1).map(i => ({
              // @ts-ignore
              is_member_registered: d[`is_member_${i}_registered`],
              // @ts-ignore
              does_lack_doc: d[`does_${i}_lack_doc`]?.join(' '),
              // @ts-ignore
              please_specifydoes_lack_doc: d[`please_specifydoes_${i}_lack_doc`],
            })),
            do_you_have_any_of_the_following: d.do_you_have_any_of_the_following,
            do_you_and_your_hh_members_receive_the_idp_allowance: d.do_you_and_your_hh_members_receive_the_idp_allowance,
            why_they_do_not_receive: d.why_they_do_not_receive,
            please_specifywhy_they_do_not_receive: d.please_specifywhy_they_do_not_receive,
            why_are_you_not_registered: d.why_are_you_not_registered,
            please_specifywhy_are_you_not_registered: d.please_specifywhy_are_you_not_registered,
            why_not_registered: d.why_not_registered,
            please_specifywhy_not_registered: d.please_specifywhy_not_registered,
            what_housing_land_and_property_documents_do_you_lack: d.what_housing_land_and_property_documents_do_you_lack,
            please_specifywhat_housing_land_and_property_documents_do_you_lack: d.please_specifywhat_housing_land_and_property_documents_do_you_lack,
            have_you_experienced_any_barriers_in_obtaining_or_accessing_identity_documentation_and_or_hlp_documentation: d.have_you_experienced_any_barriers_in_obtaining_or_accessing_identity_documentation_and_or_hlp_documentation,
            please_specifyhave_you_experienced_any_barriers_in_obtaining_or_accessing_identity_documentation_and_or_hlp_documentation: d.please_specifyhave_you_experienced_any_barriers_in_obtaining_or_accessing_identity_documentation_and_or_hlp_documentation,
          },
          group_safety_n_movement: {
            please_rate_your_sense_of_safety_in_this_location: d.please_rate_your_sense_of_safety_in_this_location,
            what_are_the_main_factors_that_make_this_location_feel_unsafe: d.what_are_the_main_factors_that_make_this_location_feel_unsafe,
            please_specifywhat_are_the_main_factors_that_make_this_location_feel_unsafe: d.please_specifywhat_are_the_main_factors_that_make_this_location_feel_unsafe,
            how_would_you_describe_the_relationship_between_member_of_the_host_community: d.how_would_you_describe_the_relationship_between_member_of_the_host_community,
            what_factors_are_affecting_the_relationship_between_communities_in_this_location: d.what_factors_are_affecting_the_relationship_between_communities_in_this_location,
            please_specifywhat_factors_are_affecting_the_relationship_between_communities_in_this_location: d.please_specifywhat_factors_are_affecting_the_relationship_between_communities_in_this_location,
            have_you_or_your_household_members_experienced_incidents_with_host_community_members_idps_returnees: d.have_you_or_your_household_members_experienced_incidents_with_host_community_members_idps_returnees,
            please_specifyhave_you_or_your_household_members_experienced_incidents_with_host_community_members_idps_returnees: d.please_specifyhave_you_or_your_household_members_experienced_incidents_with_host_community_members_idps_returnees,
            do_you_or_your_household_members_experience_any_barriers_to_movements_in_and_around_the_area: d.do_you_or_your_household_members_experience_any_barriers_to_movements_in_and_around_the_area,
            please_specifydo_you_or_your_household_members_experience_any_barriers_to_movements_in_and_around_the_area: d.please_specifydo_you_or_your_household_members_experience_any_barriers_to_movements_in_and_around_the_area,
          },
          group_violence_coercion_n_deprivation: {
            get_tag_if_is_displaced: d.get_tag_if_is_displaced,
            group_violence_adult_male: {
              has_any_adult_male_member_experienced_violence: d.has_any_adult_male_member_experienced_violence,
              what_type_of_incidents_took_place_has_any_adult_male_member_experienced_violence: d.what_type_of_incidents_took_place_has_any_adult_male_member_experienced_violence,
              please_specifywhat_type_of_incidents_took_place_has_any_adult_male_member_experienced_violence: d.please_specifywhat_type_of_incidents_took_place_has_any_adult_male_member_experienced_violence,
              when_did_the_incidents_occur_has_any_adult_male_member_experienced_violence: d.when_did_the_incidents_occur_has_any_adult_male_member_experienced_violence,
              who_were_the_perpetrators_of_the_incident_has_any_adult_male_member_experienced_violence: d.who_were_the_perpetrators_of_the_incident_has_any_adult_male_member_experienced_violence,
              please_specifywho_were_the_perpetrators_of_the_incident_has_any_adult_male_member_experienced_violence: d.please_specifywho_were_the_perpetrators_of_the_incident_has_any_adult_male_member_experienced_violence,
            },
            group_violence_adult_female: {
              has_any_adult_female_member_experienced_violence: d.has_any_adult_female_member_experienced_violence,
              what_type_of_incidents_took_place_has_any_adult_female_member_experienced_violence: d.what_type_of_incidents_took_place_has_any_adult_female_member_experienced_violence,
              please_specifywhat_type_of_incidents_took_place_has_any_adult_female_member_experienced_violence: d.please_specifywhat_type_of_incidents_took_place_has_any_adult_female_member_experienced_violence,
              when_did_the_incidents_occur_has_any_adult_female_member_experienced_violence: d.when_did_the_incidents_occur_has_any_adult_female_member_experienced_violence,
              who_were_the_perpetrators_of_the_incident_has_any_adult_female_member_experienced_violence: d.who_were_the_perpetrators_of_the_incident_has_any_adult_female_member_experienced_violence,
              please_specifywho_were_the_perpetrators_of_the_incident_has_any_adult_female_member_experienced_violence: d.please_specifywho_were_the_perpetrators_of_the_incident_has_any_adult_female_member_experienced_violence,
            },
            group_violence_boy: {
              has_any_boy_member_experienced_violence: d.has_any_boy_member_experienced_violence,
              what_type_of_incidents_took_place_has_any_boy_member_experienced_violence: d.what_type_of_incidents_took_place_has_any_boy_member_experienced_violence,
              please_specifywhat_type_of_incidents_took_place_has_any_boy_member_experienced_violence: d.please_specifywhat_type_of_incidents_took_place_has_any_boy_member_experienced_violence,
              when_did_the_incidents_occur_has_any_boy_member_experienced_violence: d.when_did_the_incidents_occur_has_any_boy_member_experienced_violence,
              who_were_the_perpetrators_of_the_incident_has_any_boy_member_experienced_violence: d.who_were_the_perpetrators_of_the_incident_has_any_boy_member_experienced_violence,
              please_specifywho_were_the_perpetrators_of_the_incident_has_any_boy_member_experienced_violence: d.please_specifywho_were_the_perpetrators_of_the_incident_has_any_boy_member_experienced_violence,
            },
            group_violence_girl: {
              has_any_girl_member_experienced_violence: d.has_any_girl_member_experienced_violence,
              what_type_of_incidents_took_place_has_any_girl_member_experienced_violence: d.what_type_of_incidents_took_place_has_any_girl_member_experienced_violence,
              please_specifywhat_type_of_incidents_took_place_has_any_girl_member_experienced_violence: d.please_specifywhat_type_of_incidents_took_place_has_any_girl_member_experienced_violence,
              when_did_the_incidents_occur_has_any_girl_member_experienced_violence: d.when_did_the_incidents_occur_has_any_girl_member_experienced_violence,
              who_were_the_perpetrators_of_the_incident_has_any_girl_member_experienced_violence: d.who_were_the_perpetrators_of_the_incident_has_any_girl_member_experienced_violence,
              please_specifywho_were_the_perpetrators_of_the_incident_has_any_girl_member_experienced_violence: d.please_specifywho_were_the_perpetrators_of_the_incident_has_any_girl_member_experienced_violence,
            },
            group_violence_other: {
              has_any_other_member_experienced_violence: d.has_any_other_member_experienced_violence,
              what_type_of_incidents_took_place_has_any_other_member_experienced_violence: d.what_type_of_incidents_took_place_has_any_other_member_experienced_violence,
              please_specifywhat_type_of_incidents_took_place_has_any_other_member_experienced_violence: d.please_specifywhat_type_of_incidents_took_place_has_any_other_member_experienced_violence,
              when_did_the_incidents_occur_has_any_other_member_experienced_violence: d.when_did_the_incidents_occur_has_any_other_member_experienced_violence,
              who_were_the_perpetrators_of_the_incident_has_any_other_member_experienced_violence: d.who_were_the_perpetrators_of_the_incident_has_any_other_member_experienced_violence,
              please_specifywho_were_the_perpetrators_of_the_incident_has_any_other_member_experienced_violence: d.please_specifywho_were_the_perpetrators_of_the_incident_has_any_other_member_experienced_violence,
            },
            do_you_or_members_of_your_household_experience_discrimination_or_stigmatization_in_your_current_area_of_residence: d.do_you_or_members_of_your_household_experience_discrimination_or_stigmatization_in_your_current_area_of_residence,
            on_what_ground: d.on_what_ground,
            please_specifyon_what_ground: d.please_specifyon_what_ground,
            is_are_any_adult_memberof_your_household_displaying_any_of_the_following_signs: d.is_are_any_adult_memberof_your_household_displaying_any_of_the_following_signs,
            please_specifyis_are_any_adult_memberof_your_household_displaying_any_of_the_following_signs: d.please_specifyis_are_any_adult_memberof_your_household_displaying_any_of_the_following_signs,
            is_are_any_child_member_of_your_household_displaying_any_of_the_following_signs: d.is_are_any_child_member_of_your_household_displaying_any_of_the_following_signs,
            please_specifyis_are_any_child_member_of_your_household_displaying_any_of_the_following_signs: d.please_specifyis_are_any_child_member_of_your_household_displaying_any_of_the_following_signs,
            do_household_members_experiencing_distress_have_access_to_relevant_care_and_services: d.do_household_members_experiencing_distress_have_access_to_relevant_care_and_services,
            what_are_the_barriers_to_access_services: d.what_are_the_barriers_to_access_services,
            please_specifywhat_are_the_barriers_to_access_services: d.please_specifywhat_are_the_barriers_to_access_services,
            what_do_you_think_feel_are_the_major_stress_factors_for_you_and_your_household_members: d.what_do_you_think_feel_are_the_major_stress_factors_for_you_and_your_household_members,
            please_specifywhat_do_you_think_feel_are_the_major_stress_factors_for_you_and_your_household_members: d.please_specifywhat_do_you_think_feel_are_the_major_stress_factors_for_you_and_your_household_members,
          },
          group_coping_strategies: {
            what_are_the_main_sources_of_income_of_your_household: d.what_are_the_main_sources_of_income_of_your_household,
            please_specifywhat_are_the_main_sources_of_income_of_your_household: d.please_specifywhat_are_the_main_sources_of_income_of_your_household,
            what_type_of_allowances_do_you_receive: d.what_type_of_allowances_do_you_receive,
            please_specifywhat_type_of_allowances_do_you_receive: d.please_specifywhat_type_of_allowances_do_you_receive,
            what_is_the_average_month_income_per_household: d.what_is_the_average_month_income_per_household,
            including_yourself_are_there_members_of_your_household_who_are_out_of_work_and_seeking_employment: d.including_yourself_are_there_members_of_your_household_who_are_out_of_work_and_seeking_employment,
            what_are_the_reasons_for_being_out_of_work: d.what_are_the_reasons_for_being_out_of_work,
            please_specifywhat_are_the_reasons_for_being_out_of_work: d.please_specifywhat_are_the_reasons_for_being_out_of_work,
            are_there_gaps_in_meeting_your_basic_needs: d.are_there_gaps_in_meeting_your_basic_needs,
            what_are_the_strategies_that_your_household_uses_to_cope_with_these_challenges: d.what_are_the_strategies_that_your_household_uses_to_cope_with_these_challenges,
            please_specifywhat_are_the_strategies_that_your_household_uses_to_cope_with_these_challenges: d.please_specifywhat_are_the_strategies_that_your_household_uses_to_cope_with_these_challenges,
          },
          group_access_to_education: {
            are_schoolaged_children_in_your_household_regularly_attending_primary_or_secondary_education: d.are_schoolaged_children_in_your_household_regularly_attending_primary_or_secondary_education,
            is_it: d.is_it,
            what_are_the_reasons_preventing_children_in_your_household_from_regularly_attending_education_services: d.what_are_the_reasons_preventing_children_in_your_household_from_regularly_attending_education_services,
          },
          group_housing: {
            please_specifywhat_are_the_reasons_preventing_children_in_your_household_from_regularly_attending_education_services: d.please_specifywhat_are_the_reasons_preventing_children_in_your_household_from_regularly_attending_education_services,
            what_is_your_current_housing_structure: d.what_is_your_current_housing_structure,
            what_is_the_tenure_status_of_your_accommodation_private: d.what_is_the_tenure_status_of_your_accommodation_private,
            please_specifywhat_is_the_tenure_status_of_your_accommodation_private: d.please_specifywhat_is_the_tenure_status_of_your_accommodation_private,
            what_is_the_tenure_status_of_your_accommodation_public: d.what_is_the_tenure_status_of_your_accommodation_public,
            please_specifywhat_is_the_tenure_status_of_your_accommodation_public: d.please_specifywhat_is_the_tenure_status_of_your_accommodation_public,
            do_you_have_formal_rental_documents_to_stay_in_your_accommodation: d.do_you_have_formal_rental_documents_to_stay_in_your_accommodation,
            what_is_the_general_condition_of_your_accommodation: d.what_is_the_general_condition_of_your_accommodation,
            what_are_your_main_concerns_regarding_your_accommodation: d.what_are_your_main_concerns_regarding_your_accommodation,
          },
          group_access_to_health: {
            do_you_have_access_to_health_care_in_your_current_location: d.do_you_have_access_to_health_care_in_your_current_location,
            what_are_the_barriers_to_accessing_health_services: d.what_are_the_barriers_to_accessing_health_services,
            please_specifywhat_are_the_barriers_to_accessing_health_services: d.please_specifywhat_are_the_barriers_to_accessing_health_services,
          },
          group_sec_priority_needs: {
            what_is_your_1_priority: d.what_is_your_1_priority,
            please_specifywhat_is_your_1_priority: d.please_specifywhat_is_your_1_priority,
            what_is_your_2_priority: d.what_is_your_2_priority,
            please_specifywhat_is_your_2_priority: d.please_specifywhat_is_your_2_priority,
            what_is_your_3_priority: d.what_is_your_3_priority,
            please_specifywhat_is_your_3_priority: d.please_specifywhat_is_your_3_priority,
            thanks: d.thanks,
          },
          group_sec_additional_information: {
            additional_information_shared_by_respondent: d.additional_information_shared_by_respondent,
            comments_observations_of_the_protection_monitor: `{Previous Kobo ID ${row.id}}. This submission has been generated from a previous Kobo form.} ` + d.comments_observations_of_the_protection_monitor,
          },
          group_sec_followup: {
            need_for_assistance: d.need_for_assistance,
          }
        }
      })
      console.log(i, res.message)
    } catch (e) {
      console.log(e)
      console.error(row.id)
    }
  })


})()