import {fnSwitch} from '@alexandreannic/ts-utils'
import {
  AILocationHelper,
  DrcOffice,
  DrcProgram,
  DrcProject,
  DrcProjectHelper,
  DrcSector,
  fnTry,
  KoboGeneralMapping,
  KoboMetaStatus,
  KoboTagStatus,
  OblastIndex,
  Protection_communityMonitoring,
  Protection_gbv,
  Protection_groupSession,
  Protection_hhs3,
  Protection_pss,
  ProtectionCommunityMonitoringTags,
  ProtectionHhsTags,
  safeArray
} from '@infoportal-common'
import {KoboMetaOrigin} from './KoboMetaType'
import {KoboMetaMapper, MetaMapperInsert} from './KoboMetaService'

export class KoboMetaMapperProtection {

  static readonly communityMonitoring: MetaMapperInsert<KoboMetaOrigin<Protection_communityMonitoring.T, ProtectionCommunityMonitoringTags>> = row => {
    const answer = Protection_communityMonitoring.map(row.answers)
    const persons = KoboGeneralMapping.collectXlsKoboIndividuals(answer).map(KoboGeneralMapping.mapPerson)
    return {
      office: fnSwitch(answer.staff_to_insert_their_DRC_office!, {
        chernihiv: DrcOffice.Chernihiv,
        dnipro: DrcOffice.Dnipro,
        kharkiv: DrcOffice.Kharkiv,
        lviv: DrcOffice.Lviv,
        mykolaiv: DrcOffice.Mykolaiv,
        sumy: DrcOffice.Sumy,
      }, () => undefined),
      oblast: OblastIndex.byKoboName(answer.ben_det_oblast)?.name!,
      raion: KoboGeneralMapping.searchRaion(answer.ben_det_raion),
      hromada: KoboGeneralMapping.searchHromada(answer.ben_det_hromada),
      sector: DrcSector.Protection,
      activity: answer.activity ? fnSwitch(answer.activity, {
        fgd: DrcProgram.FGD,
        kll: DrcProgram.CommunityLevelPm,
        observation: DrcProgram.Observation,
      }) : undefined,
      persons,
      personsCount: persons.length,
      project: row.tags?.project ? [row.tags?.project] : [],
      donor: row.tags?.project ? [DrcProjectHelper.donorByProject[row.tags?.project]] : [],
      status: KoboMetaStatus.Committed,
      lastStatusUpdate: row.date,
    }
  }

  static readonly groupSession: MetaMapperInsert<KoboMetaOrigin<Protection_groupSession.T>> = row => {
    const answer = Protection_groupSession.map(row.answers)
    if (answer.activity as any === 'gbv' || answer.activity === 'pss' || answer.activity === 'other' || answer.activity === 'let') return
    const persons = KoboGeneralMapping.collectXlsKoboIndividuals(answer).map(KoboGeneralMapping.mapPerson)
    const project = answer.project ? fnSwitch(answer.project, {
      bha: DrcProject['UKR-000345 BHA2'],
      echo: DrcProject['UKR-000322 ECHO2'],
      okf: DrcProject['UKR-000309 OKF'],
      uhf4: DrcProject['UKR-000314 UHF4'],
      uhf6: DrcProject['UKR-000336 UHF6'],
      novo: DrcProject['UKR-000360 Novo-Nordisk'],
    }) : undefined
    return {
      office: fnSwitch(answer.staff_to_insert_their_DRC_office!, {
        chernihiv: DrcOffice.Chernihiv,
        dnipro: DrcOffice.Dnipro,
        kharkiv: DrcOffice.Kharkiv,
        lviv: DrcOffice.Lviv,
        mykolaiv: DrcOffice.Mykolaiv,
        sumy: DrcOffice.Sumy,
      }, () => undefined),
      oblast: OblastIndex.byKoboName(answer.ben_det_oblast)?.name!,
      raion: KoboGeneralMapping.searchRaion(answer.ben_det_raion),
      hromada: KoboGeneralMapping.searchHromada(answer.ben_det_hromada),
      sector: DrcSector.Protection,
      activity: fnSwitch(answer.activity!, {
        gpt: DrcProgram.AwarenessRaisingSession,
      }),
      persons,
      personsCount: persons.length,
      project: project ? [project] : [],
      donor: project ? [DrcProjectHelper.donorByProject[project]] : [],
      status: KoboMetaStatus.Committed,
      lastStatusUpdate: row.date,
    }
  }

  static readonly hhs: MetaMapperInsert<KoboMetaOrigin<Protection_hhs3.T, ProtectionHhsTags>> = row => {
    const answer = Protection_hhs3.map(row.answers)
    const persons = KoboGeneralMapping.collectXlsKoboIndividuals(answer).map(KoboGeneralMapping.mapPerson)
    const projects = safeArray(row.tags?.projects)
    if (answer.have_you_filled_out_this_form_before === 'yes' || answer.present_yourself === 'no') return
    return KoboMetaMapper.make({
      office: fnSwitch(answer.staff_to_insert_their_DRC_office!, {
        chernihiv: DrcOffice.Chernihiv,
        dnipro: DrcOffice.Dnipro,
        kharkiv: DrcOffice.Kharkiv,
        lviv: DrcOffice.Lviv,
        mykolaiv: DrcOffice.Mykolaiv,
        sumy: DrcOffice.Sumy,
      }, () => undefined),
      oblast: OblastIndex.byIso(answer.where_are_you_current_living_oblast)?.name!,
      raion: AILocationHelper.findRaionByIso(answer.where_are_you_current_living_raion)?.en,
      hromada: AILocationHelper.findHromadaByIso(answer.where_are_you_current_living_hromada!)?.en,
      sector: DrcSector.Protection,
      activity: DrcProgram.ProtectionMonitoring,
      persons,
      personsCount: persons.length,
      project: projects,
      donor:  projects.map(_ => DrcProjectHelper.donorByProject[_]),
      status: KoboMetaStatus.Committed,
      lastStatusUpdate: row.date,
    })
  }

  static readonly pss: MetaMapperInsert<KoboMetaOrigin<Protection_pss.T, KoboTagStatus>> = row => {
    const answer = Protection_pss.map(row.answers)
    if (answer.new_ben === 'no') return
    const persons = answer.hh_char_hh_det
      ?.filter(_ => {
        if (answer.activity !== 'pgs') return true
        if (_.hh_char_hh_new_ben === 'no' || !_.hh_char_hh_session) return false
        if (answer.cycle_type === 'long') return _.hh_char_hh_session.length >= 5
        if (answer.cycle_type === 'short') return _.hh_char_hh_session.length >= 3
        return false
      })
      .map(KoboGeneralMapping.mapPersonDetails) ?? []
    const oblast = OblastIndex.byKoboName(answer.ben_det_oblast!)!
    const project = answer.project ? fnSwitch(answer.project, {
      uhf6: DrcProject['UKR-000336 UHF6'],
      okf: DrcProject['UKR-000309 OKF'],
      uhf4: DrcProject['UKR-000314 UHF4'],
      echo: DrcProject['UKR-000322 ECHO2'],
      bha: DrcProject['UKR-000284 BHA'],
      bha2: DrcProject['UKR-000345 BHA2'],
      uhf8: DrcProject['UKR-000363 UHF8'],
    }) : undefined
    return {
      office: fnSwitch(answer.staff_to_insert_their_DRC_office!, {
        chernihiv: DrcOffice.Chernihiv,
        dnipro: DrcOffice.Dnipro,
        kharkiv: DrcOffice.Kharkiv,
        lviv: DrcOffice.Lviv,
        mykolaiv: DrcOffice.Mykolaiv,
        sumy: DrcOffice.Sumy,
      }, () => undefined),
      oblast: oblast.name,
      raion: KoboGeneralMapping.searchRaion(answer.ben_det_raion),
      hromada: KoboGeneralMapping.searchHromada(answer.ben_det_hromada),
      sector: DrcSector.Protection,
      activity: DrcProgram.PSS,
      personsCount: persons.length,
      persons,
      project: project ? [project] : [],
      donor: project ? [DrcProjectHelper.donorByProject[project]] : [],
      status: KoboMetaStatus.Committed,
      lastStatusUpdate: answer.cycle_finished_at ?? row.date,
    }
  }

  static readonly gbv: MetaMapperInsert<KoboMetaOrigin<Protection_gbv.T, KoboTagStatus>> = row => {
    const answer = Protection_gbv.map(row.answers)
    if (answer.new_ben === 'no') return
    const persons = answer.hh_char_hh_det
      ?.filter(_ => _.hh_char_hh_new_ben !== 'no')
      .map(KoboGeneralMapping.mapPersonDetails) ?? []
    const oblast = OblastIndex.byKoboName(answer.ben_det_oblast!)
    const project = answer.project ? fnSwitch(answer.project, {
      bha: DrcProject['UKR-000345 BHA2'],
      sdc: DrcProject['UKR-000226 SDC'],
      danida: DrcProject['UKR-000347 DANIDA']
    }) : undefined
    return {
      office: fnSwitch(answer.staff_to_insert_their_DRC_office!, {
        chernihiv: DrcOffice.Chernihiv,
        dnipro: DrcOffice.Dnipro,
        kharkiv: DrcOffice.Kharkiv,
        mykolaiv: DrcOffice.Mykolaiv,
      }, () => undefined),
      oblast: oblast.name,
      raion: KoboGeneralMapping.searchRaion(answer.ben_det_raion),
      hromada: KoboGeneralMapping.searchHromada(answer.ben_det_hromada),
      sector: DrcSector.Protection,
      activity: DrcProgram.GBV,
      personsCount: persons.length,
      persons,
      project: project ? [project] : [],
      donor: project ? [DrcProjectHelper.donorByProject[project]] : [],
      status: KoboMetaStatus.Committed,
      lastStatusUpdate: row.date,
    }
  }
}
