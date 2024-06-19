import {fnSwitch, map} from '@alexandreannic/ts-utils'
import {
  Bn_cashForRentRegistration,
  Bn_re,
  CashForRentStatus,
  DrcDonor,
  DrcOffice,
  DrcProgram,
  DrcProject,
  DrcProjectHelper,
  DrcSector,
  DrcSectorHelper,
  KoboAnswerUtils,
  KoboGeneralMapping,
  KoboIndex,
  KoboMetaHelper,
  KoboMetaShelterRepairTags,
  KoboMetaStatus,
  KoboTagStatus,
  OblastIndex,
  safeArray,
  safeNumber,
  Shelter_cashForShelter,
  Shelter_NTA,
  Shelter_TA,
  ShelterNtaTags,
  ShelterTaTags,
} from '@infoportal-common'
import {KoboMetaOrigin} from './KoboMetaType'
import {KoboMetaMapper, MetaMapperInsert, MetaMapperMerge} from './KoboMetaService'

export namespace KoboMetaMapperShelter {

  const harmonizeNtaDisability = (disabilities: Shelter_NTA.T['hh_char_hhh_dis_select']): Bn_re.T['hh_char_dis_select'] => {
    return disabilities?.map(_ => {
      return fnSwitch(_!, {
        diff_medical: 'diff_care',
        diff_mental: 'diff_rem',
      }, () => _! as any)
    })
  }

  const harmonizeNtaDisabilityAll = (row: Shelter_NTA.T): any => {
    // @ts-ignore
    row.hh_char_hhh_dis_select = harmonizeNtaDisability(row.hh_char_hhh_dis_select)
    // @ts-ignore
    row.hh_char_res_dis_select = harmonizeNtaDisability(row.hh_char_res_dis_select)
    // @ts-ignore
    row.hh_char_hh_det = row.hh_char_hh_det?.map(_ => {
      return {
        ..._,
        hh_char_hh_det_dis_select: harmonizeNtaDisability(_.hh_char_hh_det_dis_select)
      }
    })
    return row
  }

  export const createCfRent: MetaMapperInsert<KoboMetaOrigin<Bn_cashForRentRegistration.T, KoboTagStatus<CashForRentStatus>>> = row => {
    const answer = Bn_cashForRentRegistration.map(row.answers)
    const group = KoboGeneralMapping.collectXlsKoboIndividuals(answer).map(KoboGeneralMapping.mapPersonDetails)
    const oblast = OblastIndex.byKoboName(answer.ben_det_oblast!)
    const status = fnSwitch(row.tags?.status!, {
      FirstPending: KoboMetaStatus.Pending,
      FirstPaid: KoboMetaStatus.Pending,
      FirstRejected: KoboMetaStatus.Pending,
      SecondPending: KoboMetaStatus.Pending,
      SecondPaid: KoboMetaStatus.Committed,
      SecondRejected: KoboMetaStatus.Pending,
      Selected: KoboMetaStatus.Rejected,
      Referred: undefined,
    }, () => undefined)
    return KoboMetaMapper.make({
      enumerator: Bn_cashForRentRegistration.options.back_enum[answer.back_enum!],
      office: answer.back_office ? fnSwitch(answer.back_office, {
        cej: DrcOffice.Chernihiv,
        dnk: DrcOffice.Dnipro,
        // hrk: DrcOffice.Kharkiv,
        // nlv: DrcOffice.Mykolaiv,
        // umy: DrcOffice.Sumy,
        lwo: DrcOffice.Lviv,
      }) : undefined,
      oblast: oblast.name,
      displacement: KoboGeneralMapping.mapDisplacementStatus(answer.ben_det_res_stat),
      raion: KoboGeneralMapping.searchRaion(answer.ben_det_raion),
      hromada: KoboGeneralMapping.searchHromada(answer.ben_det_hromada),
      sector: DrcSectorHelper.findByProgram(DrcProgram.CashForRent),
      activity: DrcProgram.CashForRent,
      personsCount: safeNumber(answer.ben_det_hh_size),
      persons: group,
      lastName: answer.ben_det_surname,
      firstName: answer.ben_det_first_name,
      patronymicName: answer.ben_det_pat_name,
      taxId: answer.pay_det_tax_id_num,
      phone: answer.ben_det_ph_number ? '' + answer.ben_det_ph_number : undefined,
      status,
      donor: [DrcDonor['ECHO']],
      project: [DrcProject['UKR-000322 ECHO2']],
      lastStatusUpdate: row.tags?.lastStatusUpdate,
      passportNum: answer.pay_det_pass_num,
      taxIdFileName: answer.pay_det_tax_id_ph,
      taxIdFileUrl: KoboAnswerUtils.findFileUrl(row.attachments, answer.pay_det_tax_id_ph),
      idFileName: answer.pay_det_id_ph,
      idFileUrl: KoboAnswerUtils.findFileUrl(row.attachments, answer.pay_det_id_ph),
    })
  }

  export const createCfShelter: MetaMapperInsert<KoboMetaOrigin<Shelter_cashForShelter.T, KoboTagStatus>> = row => {
    const answer = Shelter_cashForShelter.map(row.answers)
    const group = KoboGeneralMapping.collectXlsKoboIndividuals(answer).map(KoboGeneralMapping.mapPersonDetails)
    const oblast = OblastIndex.byKoboName(answer.ben_det_oblast!)
    const project = DrcProjectHelper.search(Shelter_cashForShelter.options.donor[answer.donor!])
    return KoboMetaMapper.make({
      enumerator: Shelter_cashForShelter.options.name_enum[answer.name_enum!],
      office: answer.back_office ? fnSwitch(answer.back_office, {
        cej: DrcOffice.Chernihiv,
        dnk: DrcOffice.Dnipro,
        hrk: DrcOffice.Kharkiv,
        nlv: DrcOffice.Mykolaiv,
        umy: DrcOffice.Sumy,
        // lwo: DrcOffice.Lviv,
      }) : undefined,
      project: project ? [project] : [],
      donor: map(project, _ => [DrcProjectHelper.donorByProject[_]]),
      oblast: oblast.name,
      // displacement: KoboGeneralMapping.mapDisplacementStatus(answer.),
      raion: KoboGeneralMapping.searchRaion(answer.ben_det_raion),
      hromada: KoboGeneralMapping.searchHromada(answer.ben_det_hromada),
      settlement: answer.ben_det_settlement,
      sector: DrcSectorHelper.findByProgram(DrcProgram.CashForRepair),
      activity: DrcProgram.CashForRepair,
      personsCount: safeNumber(answer.ben_det_hh_size),
      persons: group,
      lastName: answer.bis,
      firstName: answer.bif,
      patronymicName: answer.bip,
      taxId: answer.pay_det_tax_id_num,
      phone: answer.bin ? '' + answer.bin : undefined,
      status: KoboMetaHelper.mapCashStatus(row.tags?.status),
      lastStatusUpdate: row.tags?.lastStatusUpdate,
      passportNum: answer.pay_det_pass_num,
      taxIdFileName: answer.pay_det_tax_id_ph,
      taxIdFileUrl: KoboAnswerUtils.findFileUrl(row.attachments, answer.pay_det_tax_id_ph),
      idFileName: answer.pay_det_id_ph,
      idFileUrl: KoboAnswerUtils.findFileUrl(row.attachments, answer.pay_det_id_ph),
    })
  }

  export const createNta: MetaMapperInsert<KoboMetaOrigin<Shelter_NTA.T, ShelterNtaTags>> = row => {
    const answer = Shelter_NTA.map(row.answers)
    const group = KoboGeneralMapping.collectXlsKoboIndividuals(harmonizeNtaDisabilityAll(answer)).map(KoboGeneralMapping.mapPersonDetails)
    const oblast = OblastIndex.byKoboName(answer.ben_det_oblast!)
    const project = safeArray(row.tags?.project)
    const isCfRepair = answer.modality === 'cash_for_repair'
    return KoboMetaMapper.make({
      enumerator: Shelter_NTA.options.enum_name[answer.enum_name!],
      office: fnSwitch(answer.back_office!, {
        cej: DrcOffice.Chernihiv,
        dnk: DrcOffice.Dnipro,
        hrk: DrcOffice.Kharkiv,
        nlv: DrcOffice.Mykolaiv,
        umy: DrcOffice.Sumy,
      }, () => undefined),
      oblast: oblast?.name!,
      displacement: KoboGeneralMapping.mapDisplacementStatus(answer.ben_det_res_stat),
      raion: KoboGeneralMapping.searchRaion(answer.ben_det_raion),
      hromada: KoboGeneralMapping.searchHromada(answer.ben_det_hromada),
      settlement: answer.settlement,
      sector: DrcSector.Shelter,
      activity: isCfRepair ? DrcProgram.CashForRepair : DrcProgram.ShelterRepair,
      personsCount: safeNumber(answer.ben_det_hh_size),
      persons: group,
      lastName: answer.ben_det_surname_l,
      project: project,
      donor: project.map(_ => DrcProjectHelper.donorByProject[_]),
      firstName: answer.ben_det_first_name_l,
      patronymicName: answer.ben_det_pat_name_l,
      taxId: answer.pay_det_tax_id_num,
      phone: answer.ben_det_ph_number_l ? '' + answer.ben_det_ph_number_l : undefined,
      status: KoboMetaHelper.mapCashStatus(row.tags?.status),
      lastStatusUpdate: row.tags?.lastStatusUpdate,
      passportNum: answer.pay_det_pass_num,
      taxIdFileName: answer.pay_det_tax_id_ph,
      taxIdFileUrl: KoboAnswerUtils.findFileUrl(row.attachments, answer.pay_det_tax_id_ph),
      idFileName: answer.pay_det_id_ph,
      idFileUrl: KoboAnswerUtils.findFileUrl(row.attachments, answer.pay_det_id_ph),
    })
  }

  export const updateTa: MetaMapperMerge<KoboMetaOrigin<Shelter_TA.T, ShelterTaTags>, KoboMetaShelterRepairTags> = row => {
    const answers = Shelter_TA.map(row.answers)
    if (!row.tags || !answers.nta_id) return
    return [
      answers.nta_id,
      {
        referencedFormId: KoboIndex.byName('shelter_ta').id,
        status: row.tags.workDoneAt ? KoboMetaStatus.Committed : KoboMetaStatus.Pending,
        lastStatusUpdate: row.tags.workDoneAt,
        tags: row.tags?.damageLevel ? {damageLevel: row.tags?.damageLevel} : {}
      }
    ]
  }
}
