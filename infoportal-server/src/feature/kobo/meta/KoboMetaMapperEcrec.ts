import {fnSwitch, map} from '@alexandreannic/ts-utils'
import {
  DrcOffice,
  DrcProgram,
  DrcProject,
  DrcProjectHelper,
  DrcSector,
  Ecrec_cashRegistration,
  Ecrec_cashRegistrationBha,
  KoboGeneralMapping,
  KoboMetaHelper,
  OblastIndex,
  safeNumber
} from '@infoportal-common'
import {KoboMetaOrigin} from './KoboMetaType'
import {EcrecCashRegistrationTags} from '../../../db/koboForm/DbHelperEcrecCashRegistration'
import {KoboMetaMapper, MetaMapperInsert} from './KoboMetaService'
import {KoboAnswerUtils} from '../../connector/kobo/KoboClient/type/KoboAnswer'

export class KoboMetaMapperEcrec {

  static readonly cashRegistration: MetaMapperInsert<KoboMetaOrigin<Ecrec_cashRegistration.T, EcrecCashRegistrationTags>> = row => {
    const answer = Ecrec_cashRegistration.map(row.answers)
    const group = KoboGeneralMapping.collectXlsKoboIndividuals(answer)
    const oblast = OblastIndex.byKoboName(answer.ben_det_oblast!)
    const project = DrcProjectHelper.search(Ecrec_cashRegistration.options.back_donor[answer.back_donor!])
    const activities = project === DrcProject['UKR-000336 UHF6']
      ? [DrcProgram.SectoralCashForAgriculture]
      : [DrcProgram.SectoralCashForAnimalFeed]
    if (answer.animal_shelter_need === 'yes') activities.push(DrcProgram.SectoralCashForAnimalShelterRepair)

    return activities.map(activity => {
      return KoboMetaMapper.make({
        enumerator: Ecrec_cashRegistration.options.back_enum[answer.back_enum!],
        office: fnSwitch(answer.back_office!, {
          chj: DrcOffice.Chernihiv,
          dnk: DrcOffice.Dnipro,
          hrk: DrcOffice.Kharkiv,
          lwo: DrcOffice.Lviv,
          nlv: DrcOffice.Mykolaiv,
          umy: DrcOffice.Sumy,
        }, () => undefined),
        oblast: oblast.name,
        raion: KoboGeneralMapping.searchRaion(answer.ben_det_raion),
        hromada: KoboGeneralMapping.searchHromada(answer.ben_det_hromada),
        sector: DrcSector.Livelihoods,
        activity,
        personsCount: safeNumber(answer.ben_det_hh_size),
        persons: group.map(KoboGeneralMapping.mapPersonDetails),
        project: project ? [project] : [],
        donor: map(project, _ => [DrcProjectHelper.donorByProject[_]]),
        lastName: answer.ben_det_surname,
        firstName: answer.ben_det_first_name,
        patronymicName: answer.ben_det_pat_name,
        taxId: answer.pay_det_tax_id_num,
        phone: answer.ben_det_ph_number ? '' + answer.ben_det_ph_number : undefined,
        status: KoboMetaHelper.mapCashStatus(row.tags?.status),
        lastStatusUpdate: row.tags?.lastStatusUpdate,
        passportNum: answer.pay_det_pass_num,
        taxIdFileName: answer.pay_det_tax_id_ph,
        taxIdFileUrl: KoboAnswerUtils.findFileUrl(row.attachments, answer.pay_det_tax_id_ph),
        idFileName: answer.pay_det_id_ph,
        idFileUrl: KoboAnswerUtils.findFileUrl(row.attachments, answer.pay_det_id_ph),
      })
    })
  }

  static readonly cashRegistrationBha: MetaMapperInsert<KoboMetaOrigin<Ecrec_cashRegistrationBha.T, EcrecCashRegistrationTags>> = row => {
    const answer = Ecrec_cashRegistrationBha.map(row.answers)
    const group = KoboGeneralMapping.collectXlsKoboIndividuals(answer)
    const oblast = OblastIndex.byKoboName(answer.ben_det_oblast!)
    const project = DrcProjectHelper.search(Ecrec_cashRegistrationBha.options.back_donor[answer.back_donor!])

    return KoboMetaMapper.make({
      enumerator: Ecrec_cashRegistrationBha.options.back_enum[answer.back_enum!],
      office: fnSwitch(answer.back_office!, {
        chj: DrcOffice.Chernihiv,
        dnk: DrcOffice.Dnipro,
        hrk: DrcOffice.Kharkiv,
        lwo: DrcOffice.Lviv,
        nlv: DrcOffice.Mykolaiv,
        umy: DrcOffice.Sumy,
      }, () => undefined),
      oblast: oblast.name,
      raion: KoboGeneralMapping.searchRaion(answer.ben_det_raion),
      hromada: KoboGeneralMapping.searchHromada(answer.ben_det_hromada),
      sector: DrcSector.Livelihoods,
      activity: DrcProgram.SectoralCashForAgriculture,
      personsCount: safeNumber(answer.ben_det_hh_size),
      persons: group.map(KoboGeneralMapping.mapPersonDetails),
      // group.map(p => ({
      //   age: safeNumber(p.hh_char_hh_det_age),
      //   gender: fnSwitch(p.hh_char_hh_det_gender!, {
      //     female: Person.Gender.Female,
      //     male: Person.Gender.Male,
      //   }, () => void 0)
      // })),
      project: project ? [project] : [],
      donor: map(project, _ => [DrcProjectHelper.donorByProject[_]]),
      lastName: answer.ben_det_surname,
      firstName: answer.ben_det_first_name,
      patronymicName: answer.ben_det_pat_name,
      taxId: answer.pay_det_tax_id_num,
      phone: answer.ben_det_ph_number ? '' + answer.ben_det_ph_number : undefined,
      status: KoboMetaHelper.mapCashStatus(row.tags?.status),
      lastStatusUpdate: row.tags?.lastStatusUpdate,
      passportNum: answer.pay_det_pass_num,
      taxIdFileName: answer.pay_det_tax_id_ph,
      taxIdFileUrl: KoboAnswerUtils.findFileUrl(row.attachments, answer.pay_det_tax_id_ph),
      idFileName: answer.pay_det_id_ph,
      idFileUrl: KoboAnswerUtils.findFileUrl(row.attachments, answer.pay_det_id_ph),
    })
  }
}
