import {map, match} from '@axanc/ts-utils'
import {UaLocation} from 'ua-location'

import {
  AssistanceModality,
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
  Protection_ipaTracker,
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
          slovyansk: DrcOffice.Sloviansk,
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

        return row.tags?.project ? [row.tags.project] : []
      })(),
      donor: row.tags?.project ? [DrcProjectHelper.donorByProject[row.tags.project]] : [],
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
        ukr000345_bha2: DrcProject['UKR-000345 BHA2'],
        ukr000322_echo2: DrcProject['UKR-000322 ECHO2'],
        ukr000309_okf: DrcProject['UKR-000309 OKF'],
        ukr000314_uhf4: DrcProject['UKR-000314 UHF4'],
        ukr000336_uhf6: DrcProject['UKR-000336 UHF6'],
        ukr000298_novo: DrcProject['UKR-000298 Novo-Nordisk'],
        ukr000363_uhf8: DrcProject['UKR-000363 UHF8'],
        ukr000284_bha: DrcProject['UKR-000284 BHA'],
        ukr000350_sida: DrcProject['UKR-000350 SIDA'],
        ukr000355_danish_mofa: DrcProject['UKR-000355 Danish MFA'],
        ukr000372_echo3: DrcProject['UKR-000372 ECHO3'],
        ukr000388_bha: DrcProject['UKR-000388 BHA'],
        ukr000397_gffo: DrcProject['UKR-000397 GFFO'],
        ukr000399_sdc: DrcProject['UKR-000399 SDC'],
        ukr000423_echo4: DrcProject['UKR-000423 ECHO4'],
        ukr000424_dutch_mfa: DrcProject['UKR-000424 Dutch MFA'],
        ukr000426_sdc: DrcProject['UKR-000426 SDC'],
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
        ukr000336_uhf6: DrcProject['UKR-000336 UHF6'],
        ukr000309_okf: DrcProject['UKR-000309 OKF'],
        ukr000314_uhf4: DrcProject['UKR-000314 UHF4'],
        ukr000322_echo2: DrcProject['UKR-000322 ECHO2'],
        ukr000284_bha: DrcProject['UKR-000284 BHA'],
        ukr000345_bha2: DrcProject['UKR-000345 BHA2'],
        ukr000363_uhf8: DrcProject['UKR-000363 UHF8'],
        ukr000372_echo3: DrcProject['UKR-000372 ECHO3'],
        ukr000329_sida: DrcProject['UKR-000329 SIDA H2R'],
        ukr000355_dmfa: DrcProject['UKR-000355 Danish MFA'],
        ukr000397_gffo: DrcProject['UKR-000397 GFFO'],
        ukr000423_echo4: DrcProject['UKR-000423 ECHO4'],
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
        ukr000284_bha: DrcProject['UKR-000284 BHA'],
        ukr000345_bha2: DrcProject['UKR-000345 BHA2'],
        ukr000330_sdc2: DrcProject['UKR-000330 SDC2'],
        ukr000347_danida: DrcProject['UKR-000347 DANIDA'],
        ukr000363_uhf8: DrcProject['UKR-000363 UHF8'],
        ukr000355_dfma: DrcProject['UKR-000355 Danish MFA'],
        ukr000372_echo3: DrcProject['UKR-000372 ECHO3'],
        ukr000386_pooled_funds: DrcProject['UKR-000386 Pooled Funds'],
        ukr000423_echo4: DrcProject['UKR-000423 ECHO4'],
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

  static readonly ipaTracker: MetaMapperInsert<KoboMetaOrigin<Protection_ipaTracker.T>> = (row) => {
    const answer = Protection_ipaTracker.map(row.answers)
    const persons = KoboXmlMapper.Persons.protection_ipaTracker(answer)
    const project = match(answer.project)
      .cases({
        ukr000363_uhf8: [DrcProject['UKR-000363 UHF8']],
        ukr000397_gffo: [DrcProject['UKR-000397 GFFO']],
        ukr000423_echo4: [DrcProject['UKR-000423 ECHO4']],
        ukr000345_bha2: [DrcProject['UKR-000345 BHA2']],
        ukr000372_echo3: [DrcProject['UKR-000372 ECHO3']],
        ukr000355_dmfa: [DrcProject['UKR-000355 Danish MFA']],
        ukr000386_mass_appeal: [DrcProject['UKR-000386 Pooled Funds']],
      })
      .default(undefined)

    return KoboMetaMapper.make({
      office: match(answer.staff_to_insert_their_DRC_office)
        .cases({
          sloviansk: DrcOffice.Sloviansk,
          chernihiv: DrcOffice.Chernihiv,
          dnipro: DrcOffice.Dnipro,
          kharkiv: DrcOffice.Kharkiv,
          mykolaiv: DrcOffice.Mykolaiv,
          sumy: DrcOffice.Sumy,
        })
        .default(undefined),
      oblast: OblastIndex.byKoboName(answer.oblast)?.name!,
      raion: KoboXmlMapper.Location.searchRaion(answer.raion),
      hromada: KoboXmlMapper.Location.searchHromada(answer.hromada),
      sector: DrcSector.GeneralProtection,
      activity: DrcProgram.IPA,
      persons,
      personsCount: persons.length,
      project,
      donor: project && [DrcProjectHelper.donorByProject[project?.[0]]],
      modality: match(answer.type_assistance)
        .cases({
          cash: AssistanceModality.Cash,
          in_kind: AssistanceModality.InKind,
        })
        .default(undefined),
      status: KoboMetaStatus.Committed,
      lastStatusUpdate: answer.assistance_delivery_date,
    })
  }
}
