import {map, match} from '@axanc/ts-utils'
import {UaLocation} from 'ua-location'

import {
  DrcOffice,
  DrcProgram,
  DrcProject,
  DrcProjectHelper,
  DrcSector,
  KoboMetaStatus,
  KoboTagStatus,
  KoboXmlMapper,
  OblastIndex,
  Person,
  Protection_communityMonitoring,
  Protection_counselling,
  Protection_gbv,
  Protection_groupSession,
  Protection_hhs3,
  Protection_pss,
  Protection_referral,
  ProtectionCommunityMonitoringTags,
  ProtectionHhsTags,
  safeArray,
} from 'infoportal-common'

import {KoboMetaOrigin} from './KoboMetaType.js'
import {KoboMetaMapper, MetaMapperInsert} from './KoboMetaService.js'

const {Gender} = Person

export class KoboMetaMapperProtection {
  static readonly communityMonitoring: MetaMapperInsert<
    KoboMetaOrigin<Protection_communityMonitoring.T, ProtectionCommunityMonitoringTags>
  > = (row) => {
    const answer = Protection_communityMonitoring.map(row.answers)

    if (answer.pmt_npc !== 'no') return // select non-PMT KII (NPC) only

    const persons = KoboXmlMapper.Persons.protection_communityMonitoring(answer)
    if (answer.informant_gender || answer.informant_age) {
      persons.push({
        age: answer.informant_age,
        gender: match(answer.informant_gender)
          .cases({
            female: Gender.Female,
            male: Gender.Male,
            other: Gender.Other,
            unspecified: undefined,
          })
          .default(() => undefined),
      })
    }

    return {
      office: match(answer.staff_to_insert_their_DRC_office)
        .cases({
          chernihiv: DrcOffice.Chernihiv,
          dnipro: DrcOffice.Dnipro,
          kharkiv: DrcOffice.Kharkiv,
          lviv: DrcOffice.Lviv,
          mykolaiv: DrcOffice.Mykolaiv,
          sumy: DrcOffice.Sumy,
        })
        .default(() => undefined),
      oblast: KoboXmlMapper.Location.mapOblast(answer.ben_det_oblast)?.name!,
      raion: KoboXmlMapper.Location.searchRaion(answer.ben_det_raion),
      hromada: KoboXmlMapper.Location.searchHromada(answer.ben_det_hromada),
      settlement: answer.ben_det_hromada_001,
      sector: DrcSector.GeneralProtection,
      activity: match(answer.activity)
        .cases({
          fgd: DrcProgram.FGD,
          kll: DrcProgram.CommunityLevelPm,
          observation: DrcProgram.Observation,
        })
        .default(() => undefined),
      persons,
      personsCount: persons.length,
      project: (() => {
        // ad-hoc solution for selected forms without project in tags
        if (
          [
            '463335',
            '463998',
            '476680',
            '477480',
            '465576',
            '475060',
            '465577',
            '476696',
            '1141527',
            '476695',
            '1141523',
            '1141741',
            '477484',
            '1141381',
            '461140',
            '477483',
            '1140946',
            '1140947',
            '466081',
            '465639',
            '466106',
            '1142024',
            '1141743',
            '1141740',
            '1142077',
            '1142082',
            '1141735',
            '1141738',
            '1141797',
            '1141732',
            '465578',
          ].includes(row.id)
        )
          return [DrcProject['UKR-000363 UHF8']]

        return row.tags?.project ? [row.tags?.project] : []
      })(),
      donor: row.tags?.project ? [DrcProjectHelper.donorByProject[row.tags?.project]] : [],
      status: KoboMetaStatus.Committed,
      lastStatusUpdate: row.date,
    }
  }

  static readonly groupSession: MetaMapperInsert<KoboMetaOrigin<Protection_groupSession.T>> = (row) => {
    const answer = Protection_groupSession.map(row.answers)
    const activity = match(answer.activity as any)
      .cases({
        gpt: DrcProgram.AwarenessRaisingSession,
        pss: DrcProgram.AwarenessRaisingSession,
        // let:
      })
      .default(() => undefined)
    if (!activity) return
    // if (answer.activity as any === 'gbv' || answer.activity === 'pss' || answer.activity === 'other' || answer.activity === 'let') return
    const persons = KoboXmlMapper.Persons.protection_groupSession(answer)
    const project = match(answer.project)
      .cases({
        bha: DrcProject['UKR-000345 BHA2'],
        echo: DrcProject['UKR-000322 ECHO2'],
        okf: DrcProject['UKR-000309 OKF'],
        uhf4: DrcProject['UKR-000314 UHF4'],
        uhf6: DrcProject['UKR-000336 UHF6'],
        novo: DrcProject['UKR-000360 Novo-Nordisk'],
        uhf8: DrcProject['UKR-000363 UHF8'],
      })
      .default(() => DrcProjectHelper.searchByCode(DrcProjectHelper.searchCode(answer.project)))

    return {
      office: match(answer.staff_to_insert_their_DRC_office)
        .cases({
          chernihiv: DrcOffice.Chernihiv,
          dnipro: DrcOffice.Dnipro,
          kharkiv: DrcOffice.Kharkiv,
          lviv: DrcOffice.Lviv,
          mykolaiv: DrcOffice.Mykolaiv,
          sumy: DrcOffice.Sumy,
        })
        .default(() => undefined),
      oblast: KoboXmlMapper.Location.mapOblast(answer.ben_det_oblast)?.name!,
      raion: KoboXmlMapper.Location.searchRaion(answer.ben_det_raion),
      hromada: KoboXmlMapper.Location.searchHromada(answer.ben_det_hromada),
      settlement: answer.ben_det_hromada_001,
      sector: DrcSector.GeneralProtection,
      activity: activity,
      persons,
      personsCount: persons.length,
      project: project ? [project] : [],
      donor: map(DrcProjectHelper.donorByProject[project!], (_) => [_]) ?? [],
      status: KoboMetaStatus.Committed,
      lastStatusUpdate: row.date,
    }
  }

  static readonly referral: MetaMapperInsert<KoboMetaOrigin<Protection_referral.T, ProtectionHhsTags>> = (row) => {
    const answer = Protection_referral.map(row.answers)
    if (
      !(
        answer.person_successfully_referred_drc === 'no' &&
        answer.incoming_outgoing_referral === 'outgoing' &&
        answer.service_provided === 'yes'
      )
    )
      return
    const project = DrcProjectHelper.searchByCode(DrcProjectHelper.searchCode(answer.project_code))
    const projects = project ? [project] : []

    return KoboMetaMapper.make({
      office: match(answer.staff_to_insert_their_DRC_office)
        .cases({
          chernihiv: DrcOffice.Chernihiv,
          dnipro: DrcOffice.Dnipro,
          kharkiv: DrcOffice.Kharkiv,
          lviv: DrcOffice.Lviv,
          mykolaiv: DrcOffice.Mykolaiv,
          sumy: DrcOffice.Sumy,
          sloviansk: DrcOffice.Sloviansk,
        })
        .default(() => undefined),
      project: projects,
      donor: projects.map((_) => DrcProjectHelper.donorByProject[_]),
      oblast: KoboXmlMapper.Location.mapOblast(answer.oblast)?.name!,
      raion: KoboXmlMapper.Location.searchRaion(answer.raion),
      hromada: KoboXmlMapper.Location.searchHromada(answer.hromada),
      settlement: answer.settement,
      sector: DrcSector.GeneralProtection,
      activity: DrcProgram.Referral,
      status: KoboMetaStatus.Committed,
      lastStatusUpdate: answer.month_provision,
      personsCount: 1,
      persons: KoboXmlMapper.Persons.protection_referral(answer),
      enumerator: answer.staff_code,
    })
  }

  static readonly hhs: MetaMapperInsert<KoboMetaOrigin<Protection_hhs3.T, ProtectionHhsTags>> = (row) => {
    const answer = Protection_hhs3.map(row.answers)
    const persons = KoboXmlMapper.Persons.protection_hhs3(answer)
    const projects = safeArray(row.tags?.projects)
    if (answer.have_you_filled_out_this_form_before === 'yes' || answer.present_yourself === 'no') return

    return KoboMetaMapper.make({
      office: match(answer.staff_to_insert_their_DRC_office)
        .cases({
          chernihiv: DrcOffice.Chernihiv,
          dnipro: DrcOffice.Dnipro,
          kharkiv: DrcOffice.Kharkiv,
          lviv: DrcOffice.Lviv,
          mykolaiv: DrcOffice.Mykolaiv,
          sumy: DrcOffice.Sumy,
        })
        .default(() => undefined),
      oblast: OblastIndex.byIso(answer.where_are_you_current_living_oblast)?.name!,
      raion: UaLocation.Raion.findByIso(answer.where_are_you_current_living_raion!)?.en,
      hromada: UaLocation.Hromada.findByIso(answer.where_are_you_current_living_hromada!)?.en,
      settlement: answer.settlement,
      sector: DrcSector.GeneralProtection,
      activity: DrcProgram.ProtectionMonitoring,
      persons,
      personsCount: persons.length,
      project: projects,
      donor: projects.map((_) => DrcProjectHelper.donorByProject[_]),
      status: KoboMetaStatus.Committed,
      lastStatusUpdate: row.date,
    })
  }

  static readonly counselling: MetaMapperInsert<KoboMetaOrigin<Protection_counselling.T, KoboTagStatus>> = (row) => {
    const answer = Protection_counselling.map(row.answers)
    const persons = KoboXmlMapper.Persons.protection_counselling(answer)
    const project = DrcProjectHelper.search(Protection_counselling.options.project_code[answer.project_code!])

    return KoboMetaMapper.make({
      office: match(answer.staff_to_insert_their_DRC_office)
        .cases({
          chernihiv: DrcOffice.Chernihiv,
          dnipro: DrcOffice.Dnipro,
          kharkiv: DrcOffice.Kharkiv,
          lviv: DrcOffice.Lviv,
          mykolaiv: DrcOffice.Mykolaiv,
          sumy: DrcOffice.Sumy,
        })
        .default(() => undefined),
      oblast: KoboXmlMapper.Location.mapOblast(answer.ben_det_oblast!).name,
      raion: KoboXmlMapper.Location.searchRaion(answer.ben_det_raion),
      hromada: KoboXmlMapper.Location.searchHromada(answer.ben_det_hromada),
      settlement: answer.ben_det_hromada_001,
      sector: DrcSector.GeneralProtection,
      activity: DrcProgram.Counselling,
      persons: persons,
      displacement: persons[0]?.displacement,
      personsCount: persons.length,
      project: project ? [project] : [],
      donor: map(DrcProjectHelper.donorByProject[project!], (_) => [_]) ?? [],
      status: KoboMetaStatus.Committed,
      lastStatusUpdate: row.date,
      enumerator: answer.staff_code,
    })
  }

  static readonly pss: MetaMapperInsert<KoboMetaOrigin<Protection_pss.T, KoboTagStatus>> = (row) => {
    const answer = Protection_pss.map(row.answers)
    if (answer.new_ben === 'no') return
    const persons = KoboXmlMapper.Persons.protection_pss(answer)
    const oblast = KoboXmlMapper.Location.mapOblast(answer.ben_det_oblast!)!
    const project = match(answer.project)
      .cases({
        uhf6: DrcProject['UKR-000336 UHF6'],
        okf: DrcProject['UKR-000309 OKF'],
        uhf4: DrcProject['UKR-000314 UHF4'],
        echo: DrcProject['UKR-000322 ECHO2'],
        bha: DrcProject['UKR-000284 BHA'],
        bha2: DrcProject['UKR-000345 BHA2'],
        uhf8: DrcProject['UKR-000363 UHF8'],
        '372_echo': DrcProject['UKR-000372 ECHO3'],
        'sida h2r': DrcProject['UKR-000329 SIDA H2R'],
      })
      .default(() => DrcProjectHelper.search(answer.project))

    return {
      office: match(answer.staff_to_insert_their_DRC_office)
        .cases({
          chernihiv: DrcOffice.Chernihiv,
          dnipro: DrcOffice.Dnipro,
          kharkiv: DrcOffice.Kharkiv,
          lviv: DrcOffice.Lviv,
          mykolaiv: DrcOffice.Mykolaiv,
          sumy: DrcOffice.Sumy,
        })
        .default(() => undefined),
      oblast: oblast.name,
      raion: KoboXmlMapper.Location.searchRaion(answer.ben_det_raion),
      hromada: KoboXmlMapper.Location.searchHromada(answer.ben_det_hromada),
      settlement: answer.ben_det_hromada_001,
      sector: DrcSector.PSS,
      activity: match(answer.activity)
        .cases({
          mhpss: DrcProgram.MHPSSActivities,
          pgs: DrcProgram.PGS,
          ais: DrcProgram.PIS,
          pfa: DrcProgram.PFA,
          p2p: DrcProgram.P2P,
        })
        .default(() => undefined),
      personsCount: persons.length,
      persons,
      project: project ? [project] : [],
      donor: map(DrcProjectHelper.donorByProject[project!], (_) => [_]) ?? [],
      status: KoboMetaStatus.Committed,
      lastStatusUpdate: answer.cycle_finished_at ?? row.date,
    }
  }

  static readonly gbv: MetaMapperInsert<KoboMetaOrigin<Protection_gbv.T, KoboTagStatus>> = (row) => {
    const answer = Protection_gbv.map(row.answers)

    if (answer.new_ben === 'no') return

    const activities =
      answer.activity
        ?.map((_) =>
          match(_)
            .cases({
              // https://docs.google.com/spreadsheets/d/1SbRr4rRTL3Heap_8XUzZnBBx08Cx9XX5bmtr0CLSQ4w/edit?gid=0#gid=0
              education_sessions: DrcProgram.WGSS,
              dignity_kits: DrcProgram.DignityKits,
              awareness_raising: DrcProgram.AwarenessRaisingSession,
              psychosocial_support: DrcProgram.PSS,
              training_actors: DrcProgram.CapacityBuilding,
              training_providers: DrcProgram.CapacityBuilding,
            })
            .default(() => undefined),
        )
        .filter((_) => _ !== undefined) ?? []
    if (activities.length === 0) return
    const persons = KoboXmlMapper.Persons.protection_gbv(answer)
    const oblast = KoboXmlMapper.Location.mapOblast(answer.ben_det_oblast!)
    const project = match(answer.project)
      .cases({
        bha: DrcProject['UKR-000345 BHA2'],
        sdc: DrcProject['UKR-000226 SDC'],
        danida: DrcProject['UKR-000347 DANIDA'],
        uhf8: DrcProject['UKR-000363 UHF8'],
      })
      .default(() => DrcProjectHelper.search(Protection_gbv.options.project[answer.project!] ?? answer.project))

    return activities.map((activity) => {
      return {
        office: match(answer.staff_to_insert_their_DRC_office)
          .cases({
            chernihiv: DrcOffice.Chernihiv,
            dnipro: DrcOffice.Dnipro,
            kharkiv: DrcOffice.Kharkiv,
            mykolaiv: DrcOffice.Mykolaiv,
          })
          .default(() => undefined),
        oblast: oblast.name,
        raion: KoboXmlMapper.Location.searchRaion(answer.ben_det_raion),
        hromada: KoboXmlMapper.Location.searchHromada(answer.ben_det_hromada),
        settlement: answer.ben_det_hromada_001,
        sector: DrcSector.GBV,
        activity,
        personsCount: persons.length,
        persons,
        project: project ? [project] : [],
        donor: map(DrcProjectHelper.donorByProject[project!], (_) => [_]) ?? [],
        status: KoboMetaStatus.Committed,
        lastStatusUpdate: row.date,
      }
    })
  }
}
