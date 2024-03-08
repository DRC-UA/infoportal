import {fnSwitch, map} from '@alexandreannic/ts-utils'
import {
  DrcOffice,
  DrcProgram,
  DrcProjectHelper,
  DrcSector,
  Ecrec_cashRegistration,
  Ecrec_cashRegistrationBha,
  KoboGeneralMapping,
  KoboIndex,
  KoboMetaHelper,
  OblastIndex,
  safeNumber
} from '@infoportal-common'
import {KoboMetaCreate, KoboMetaOrigin} from './KoboMetaType'
import {EcrecCashRegistrationTags} from '../../../db/koboForm/DbHelperEcrecCashRegistration'

export class KoboMetaMapperEcrec {

  static readonly cashRegistration = (row: KoboMetaOrigin<Ecrec_cashRegistration.T, EcrecCashRegistrationTags>): KoboMetaCreate => {
    const answer = Ecrec_cashRegistration.map(row.answers)
    const group = KoboGeneralMapping.collectXlsKoboIndividuals(answer)
    const oblast = OblastIndex.byKoboName(answer.ben_det_oblast!)
    const project = KoboGeneralMapping.mapProject(Ecrec_cashRegistration.options.back_donor[answer.back_donor!])

    return {
      id: row.id,
      uuid: row.uuid,
      date: row.date,
      formId: KoboIndex.byName('ecrec_cashRegistration').id,
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
      activity: [DrcProgram.SectoralCash],
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
    }
  }

  static readonly cashRegistrationBha = (row: KoboMetaOrigin<Ecrec_cashRegistrationBha.T, EcrecCashRegistrationTags>): KoboMetaCreate => {
    const answer = Ecrec_cashRegistrationBha.map(row.answers)
    const group = KoboGeneralMapping.collectXlsKoboIndividuals(answer)
    const oblast = OblastIndex.byKoboName(answer.ben_det_oblast!)
    const project = KoboGeneralMapping.mapProject(Ecrec_cashRegistrationBha.options.back_donor[answer.back_donor!])

    return {
      id: row.id,
      uuid: row.uuid,
      date: row.date,
      formId: KoboIndex.byName('ecrec_cashRegistrationBha').id,
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
      activity: [DrcProgram.SectoralCash],
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
    }
  }
}
