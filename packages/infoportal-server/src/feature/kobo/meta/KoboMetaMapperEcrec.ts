import {fnSwitch, map} from '@alexandreannic/ts-utils'
import {
  DrcDonor,
  DrcOffice,
  DrcProgram,
  DrcProject,
  DrcProjectHelper,
  DrcSector,
  Ecrec_cashRegistration,
  Ecrec_cashRegistrationBha,
  Ecrec_msmeGrantSelection,
  Ecrec_vetApplication,
  Ecrec_vetEvaluation,
  KoboAnswerUtils,
  KoboBaseTags,
  KoboEcrec_cashRegistration,
  KoboGeneralMapping,
  KoboMetaHelper,
  KoboMetaStatus,
  KoboTagStatus,
  KoboValidation,
  oblastByDrcOffice,
  OblastIndex,
  safeNumber,
  VetApplicationStatus,
} from 'infoportal-common'
import {KoboMetaOrigin} from './KoboMetaType'
import {EcrecCashRegistrationTags} from '../../../db/koboForm/DbHelperEcrecCashRegistration'
import {KoboMetaMapper, MetaMapperInsert, MetaMapperMerge} from './KoboMetaService'
import {appConf} from '../../../core/conf/AppConf'

export class KoboMetaMapperEcrec {

  static readonly cashRegistration: MetaMapperInsert<KoboMetaOrigin<Ecrec_cashRegistration.T, EcrecCashRegistrationTags>> = row => {
    const answer = Ecrec_cashRegistration.map(row.answers)
    const group = KoboGeneralMapping.collectXlsKoboIndividuals(answer)
    const oblast = OblastIndex.byKoboName(answer.ben_det_oblast!)
    const project = DrcProjectHelper.search(Ecrec_cashRegistration.options.back_donor[answer.back_donor!])
    const activities = KoboEcrec_cashRegistration.getProgram(answer)

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
        settlement: answer.ben_det_settlement,
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

  static readonly vetApplication: MetaMapperInsert<KoboMetaOrigin<Ecrec_vetApplication.T, KoboBaseTags & KoboTagStatus<VetApplicationStatus>>> = row => {
    if (!appConf.db.url.includes('localhost') && row.tags?._validation !== KoboValidation.Approved) return
    const answer = Ecrec_vetApplication.map(row.answers)
    const group = KoboGeneralMapping.collectXlsKoboIndividuals(answer)
    const oblast = OblastIndex.byKoboName(answer.ben_det_oblast!)
    const status = row.tags
      ? row.tags.status === VetApplicationStatus.CertificateSubmitted || row.tags?.status === VetApplicationStatus.SecondPaid
        ? KoboMetaStatus.Committed
        : row.tags._validation === KoboValidation.Rejected ? KoboMetaStatus.Rejected : KoboMetaStatus.Pending
      : undefined

    return KoboMetaMapper.make({
      date: row.submissionTime,
      oblast: oblast.name,
      raion: KoboGeneralMapping.searchRaion(answer.ben_det_raion),
      personsCount: safeNumber(answer.ben_det_hh_size),
      persons: group.map(KoboGeneralMapping.mapPersonDetails),
      hromada: KoboGeneralMapping.searchHromada(answer.ben_det_hromada),
      sector: DrcSector.Livelihoods,
      activity: DrcProgram.VET,
      project: [DrcProject['UKR-000348 BHA3']],
      donor: [DrcDonor.BHA],
      lastName: answer.ben_det_surname,
      firstName: answer.ben_det_first_name,
      patronymicName: answer.ben_det_pat_name,
      phone: answer.ben_det_ph_number ? '' + answer.ben_det_ph_number : undefined,
      status: status,
      lastStatusUpdate: row.tags?.lastStatusUpdate,
    })
  }

  static readonly vetEvaluation: MetaMapperMerge<KoboMetaOrigin<Ecrec_vetEvaluation.T, KoboBaseTags>> = row => {
    if (!row.answers.id_form_vet) return
    const answer = Ecrec_vetEvaluation.map(row.answers)
    const group = KoboGeneralMapping.collectXlsKoboIndividuals(answer)
    return [
      row.answers.id_form_vet,
      {
        office: fnSwitch(answer.back_office!, {
          dnk: DrcOffice.Dnipro,
          nlv: DrcOffice.Mykolaiv,
        }, () => undefined),
        personsCount: safeNumber(answer.ben_det_hh_size),
        persons: group.map(KoboGeneralMapping.mapPersonDetails),
        sector: DrcSector.Livelihoods,
        activity: DrcProgram.VET,
        taxId: answer.tax_id ? ('' + answer.tax_id) : undefined,
        // status: KoboMetaHelper.mapValidationStatus(row.tags?._validation) ?? KoboMetaStatus.Pending,
        // lastStatusUpdate: row.date,
      }
    ]
  }

  // static readonly livelihoodRestoration: MetaMapperInsert<KoboMetaOrigin<Ecrec_livelihoodRestoration.T, EcrecCashRegistrationTags>> = row => {
  //   const answer = Ecrec_livelihoodRestoration.map(row.answers)
  //   const persons = KoboGeneralMapping.collectXlsKoboIndividuals(answer).map(KoboGeneralMapping.mapPersonDetails)
  //   return KoboMetaMapper.make({
  //
  //   })
  // }

  static readonly msme: MetaMapperInsert<KoboMetaOrigin<Ecrec_msmeGrantSelection.T>> = row => {
    const answer = Ecrec_msmeGrantSelection.map(row.answers)
    if (answer.back_consent !== 'yes' && answer.back_consent_lviv !== 'yes') return
    const office = fnSwitch(answer.oblast_business!, {
      dnipropetrovska: DrcOffice.Dnipro,
      zaporizka: DrcOffice.Dnipro,
      mykolaivska: DrcOffice.Dnipro,
      khersonska: DrcOffice.Dnipro,
      lvivska: DrcOffice.Dnipro,
    }, () => undefined)
    if (!office) return
    const group = KoboGeneralMapping.collectXlsKoboIndividuals(answer)
    return KoboMetaMapper.make({
      sector: DrcSector.Livelihoods,
      activity: DrcProgram.MSME,
      office,
      donor: [DrcDonor.BHA],
      project: [DrcProject['UKR-000348 BHA3']],
      oblast: oblastByDrcOffice[office],
      raion: KoboGeneralMapping.searchRaion(answer.ben_det_raion),
      hromada: KoboGeneralMapping.searchHromada(answer.ben_det_hromada),
      personsCount: safeNumber(answer.ben_det_hh_size),
      persons: group.map(KoboGeneralMapping.mapPersonDetails),
      phone: answer.ben_det_ph_number ? '' + answer.ben_det_ph_number : '',
      taxId: answer.ben_det_tax_id_num,
      firstName: answer.ben_det_first_name,
      lastName: answer.ben_det_surname,
      patronymicName: answer.ben_det_pat_name,
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
      settlement: answer.ben_det_settlement,
      sector: DrcSector.Livelihoods,
      activity: DrcProgram.SectoralCashForAgriculture,
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
  }
}
