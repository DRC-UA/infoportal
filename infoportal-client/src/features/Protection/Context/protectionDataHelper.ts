import {
  AILocationHelper,
  allProjects,
  DisplacementStatus,
  DrcProjectHelper,
  KoboGeneralMapping,
  KoboProtection_hhs3,
  OblastIndex,
  Protection_gbv,
  Protection_groupSession,
  Protection_pss
} from '@infoportal-common'
import {ProtectionActivity} from '@/features/Protection/Context/protectionType'
import {KoboAnswer} from '@/core/sdk/server/kobo/Kobo'
import {fnSwitch} from '@alexandreannic/ts-utils'
import {KoboUnwrapAnswer} from '@/core/sdk/server/kobo/KoboTypedAnswerSdk'
import {AiMapper} from '@/features/ActivityInfo/shared/AiMapper'

export class ProtectionDataHelper {

  static readonly koboForms = [
    'protection_gbv',
    'protection_pss',
    'protection_hhs2_1',
    'protection_groupSession'
  ] as const

  static readonly mapPss = (d: KoboAnswer<Protection_pss.T>): ProtectionActivity => {
    const project = KoboGeneralMapping.mapProject(Protection_pss.options.project[d.project!])
    const aiLoc = AiMapper.getLocation(d)
    return {
      ...d,
      date: d.date,
      koboForm: 'protection_pss',
      office: KoboGeneralMapping.mapOffice(d.staff_to_insert_their_DRC_office),
      oblast: KoboGeneralMapping.mapOblast(d.ben_det_oblast)!,
      raion: aiLoc.Raion,
      hromada: aiLoc.Hromada,
      project: project ? [project] : [],
      donor: [DrcProjectHelper.donorByProject[project!]],
      persons: d.hh_char_hh_det?.map(KoboGeneralMapping.mapPersonDetails),
    }
  }

  static readonly mapGbv = (d: KoboUnwrapAnswer<'searchProtection_gbv'>): ProtectionActivity => {
    const project = KoboGeneralMapping.mapProject(Protection_gbv.options.project[d.project!])
    const aiLoc = AiMapper.getLocation(d)
    return {
      ...d,
      date: d.date,
      koboForm: 'protection_gbv',
      office: KoboGeneralMapping.mapOffice(d.staff_to_insert_their_DRC_office),
      oblast: KoboGeneralMapping.mapOblast(d.ben_det_oblast)!,
      raion: aiLoc.Raion,
      hromada: aiLoc.Hromada,
      project: project ? [project] : [],
      donor: [DrcProjectHelper.donorByProject[project!]],
      persons: d.hh_char_hh_det?.map(KoboGeneralMapping.mapPersonDetails),
    }
  }

  static readonly mapGroupSession = (d: KoboAnswer<Protection_groupSession.T>): ProtectionActivity => {
    const project = KoboGeneralMapping.mapProject(Protection_groupSession.options.project[d.project!])
    const aiLoc = AiMapper.getLocation(d)
    return {
      ...d,
      date: d.date,
      koboForm: 'protection_groupSession',
      office: KoboGeneralMapping.mapOffice(d.staff_to_insert_their_DRC_office),
      oblast: KoboGeneralMapping.mapOblast(d.ben_det_oblast)!,
      raion: aiLoc.Raion,
      hromada: aiLoc.Hromada,
      project: project ? [project] : [],
      donor: [DrcProjectHelper.donorByProject[project!]],
      persons: d.hh_char_hh_det?.map(KoboGeneralMapping.mapPersonDetails),
      // ?.filter((_: any) => _.hh_char_hh_new_ben !== 'no')
    }
  }

  static readonly mapHhs = (d: KoboProtection_hhs3.T): ProtectionActivity => {
    return {
      ...d,
      date: d.date!,
      koboForm: 'protection_hhs3',
      office: KoboGeneralMapping.mapOffice(d.staff_to_insert_their_DRC_office),
      oblast: OblastIndex.byIso(d.where_are_you_current_living_oblast)!,
      raion: AILocationHelper.findRaionByIso(d.where_are_you_current_living_raion)?._5w as any,
      hromada: AILocationHelper.findHromadaByIso(d.where_are_you_current_living_hromada!)?._5w as any,
      project: allProjects,
      donor: d.tags?.projects?.map(_ => DrcProjectHelper.donorByProject[_!]),
      persons: d.persons,
      hhDisplacementStatus: fnSwitch(d.do_you_identify_as_any_of_the_following!, {
        returnee: DisplacementStatus.Returnee,
        non_displaced: DisplacementStatus.NonDisplaced,
        idp: DisplacementStatus.Idp,
        refugee: DisplacementStatus.Refugee,
        unable_unwilling_to_answer: undefined,
      }, () => undefined),
    }
  }

  // static readonly mapHhsOld = (d: KoboProtection_hhs3.T): ProtectionActivity => {
  //   return {
  //     ...Kobo.extraxtAnswerMetaData(d),
  //     date: d.submissionTime,
  //     koboForm: 'protection_hhs2_1',
  //     office: KoboGeneralMapping.mapOffice(d.staff_to_insert_their_DRC_office),
  //     oblast: OblastIndex.byIso(d.where_are_you_current_living_oblast),
  //     raion: AILocationHelper.findRaionByIso(d.where_are_you_current_living_raion)?._5w as any,
  //     hromada: AILocationHelper.findHromadaByIso(d.where_are_you_current_living_hromada!)?._5w as any,
  //     project: [...d.tags?.projects ?? [], DrcProject['UKR-000322 ECHO2']],
  //     donor: d.tags?.projects?.map(_ => DrcProjectHelper.donorByProject[_!]),
  //     persons: d.persons
  //   }
  // }
}