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
  OblastIndex,
  Person,
  safeNumber
} from '@infoportal-common'
import {KoboMetaCreate, KoboMetaOrigin} from './KoboMetaType'

export class KoboMetaMapperEcrec {

  static readonly cashRegistration = (answer: KoboMetaOrigin<Ecrec_cashRegistration.T>): KoboMetaCreate => {
    const _ = Ecrec_cashRegistration.map(answer.answers)
    const group = KoboGeneralMapping.collectXlsKoboIndividuals(_)
    const oblast = OblastIndex.byKoboName(_.ben_det_oblast!)
    const project = KoboGeneralMapping.mapProject(Ecrec_cashRegistration.options.back_donor[_.back_donor!])

    return {
      id: answer.id,
      uuid: answer.uuid,
      date: answer.date,
      formId: KoboIndex.byName('ecrec_cashRegistration').id,
      enumerator: Ecrec_cashRegistration.options.back_enum[_.back_enum!],
      office: fnSwitch(_.back_office!, {
        chj: DrcOffice.Chernihiv,
        dnk: DrcOffice.Dnipro,
        hrk: DrcOffice.Kharkiv,
        lwo: DrcOffice.Lviv,
        nlv: DrcOffice.Mykolaiv,
        umy: DrcOffice.Sumy,
      }, () => undefined),
      oblast: oblast.name,
      raion: KoboGeneralMapping.searchRaion(_.ben_det_raion),
      hromada: KoboGeneralMapping.searchHromada(_.ben_det_hromada),
      sector: DrcSector.Livelihoods,
      activity: [DrcProgram.SectoralCash],
      personsCount: safeNumber(_.ben_det_hh_size),
      persons: group.map(KoboGeneralMapping.mapPersonDetails),
      project: project ? [project] : [],
      donor: map(project, _ => [DrcProjectHelper.donorByProject[_]]),
      lastName: _.ben_det_surname,
      firstName: _.ben_det_first_name,
      patronymicName: _.ben_det_pat_name,
      taxId: _.pay_det_tax_id_num,
      phone: _.ben_det_ph_number ? '' + _.ben_det_ph_number : undefined,
    }
  }

  static readonly cashRegistrationBha = (answer: KoboMetaOrigin<Ecrec_cashRegistrationBha.T>): KoboMetaCreate => {
    const _ = Ecrec_cashRegistrationBha.map(answer.answers)
    const group = KoboGeneralMapping.collectXlsKoboIndividuals(_)
    const oblast = OblastIndex.byKoboName(_.ben_det_oblast!)
    const project = KoboGeneralMapping.mapProject(Ecrec_cashRegistrationBha.options.back_donor[_.back_donor!])

    return {
      id: answer.id,
      uuid: answer.uuid,
      date: answer.date,
      formId: KoboIndex.byName('ecrec_cashRegistrationBha').id,
      enumerator: Ecrec_cashRegistrationBha.options.back_enum[_.back_enum!],
      office: fnSwitch(_.back_office!, {
        chj: DrcOffice.Chernihiv,
        dnk: DrcOffice.Dnipro,
        hrk: DrcOffice.Kharkiv,
        lwo: DrcOffice.Lviv,
        nlv: DrcOffice.Mykolaiv,
        umy: DrcOffice.Sumy,
      }, () => undefined),
      oblast: oblast.name,
      raion: KoboGeneralMapping.searchRaion(_.ben_det_raion),
      hromada: KoboGeneralMapping.searchHromada(_.ben_det_hromada),
      sector: DrcSector.Livelihoods,
      activity: [DrcProgram.SectoralCash],
      personsCount: safeNumber(_.ben_det_hh_size),
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
      lastName: _.ben_det_surname,
      firstName: _.ben_det_first_name,
      patronymicName: _.ben_det_pat_name,
      taxId: _.pay_det_tax_id_num,
      phone: _.ben_det_ph_number ? '' + _.ben_det_ph_number : undefined,
    }
  }
}
