import {fnSwitch, map} from '@alexandreannic/ts-utils'
import {
  Bn_cashForRentRegistration,
  Bn_Re,
  DrcOffice,
  DrcProgram,
  DrcProjectHelper,
  DrcSector,
  DrcSectorHelper,
  KoboGeneralMapping,
  KoboIndex,
  KoboMetaHelper,
  KoboMetaShelterRepairTags,
  KoboMetaStatus,
  KoboTagStatus,
  OblastIndex,
  safeNumber,
  Shelter_cashForShelter,
  Shelter_NTA,
  Shelter_TA,
  ShelterTaTags
} from '@infoportal-common'
import {KoboMetaOrigin} from './KoboMetaType'
import {MetaMapperInsert, MetaMapperMerge} from './KoboMetaService'

export namespace KoboMetaMapperShelter {

  const harmonizeNtaDisability = (disabilities: Shelter_NTA.T['hh_char_hhh_dis_select']): Bn_Re.T['hh_char_dis_select'] => {
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

  export const createCfRent: MetaMapperInsert<KoboMetaOrigin<Bn_cashForRentRegistration.T>> = row => {
    const answer = Bn_cashForRentRegistration.map(row.answers)
    const group = KoboGeneralMapping.collectXlsKoboIndividuals(answer).map(KoboGeneralMapping.mapPerson)
    const oblast = OblastIndex.byKoboName(answer.ben_det_oblast!)
    return {
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
    }
  }

  export const createCfShelter: MetaMapperInsert<KoboMetaOrigin<Shelter_cashForShelter.T, KoboTagStatus>> = row => {
    const answer = Shelter_cashForShelter.map(row.answers)
    const group = KoboGeneralMapping.collectXlsKoboIndividuals(answer).map(KoboGeneralMapping.mapPerson)
    const oblast = OblastIndex.byKoboName(answer.ben_det_oblast!)
    return {
      enumerator: Shelter_cashForShelter.options.name_enum[answer.name_enum!],
      office: answer.back_office ? fnSwitch(answer.back_office, {
        cej: DrcOffice.Chernihiv,
        dnk: DrcOffice.Dnipro,
        hrk: DrcOffice.Kharkiv,
        nlv: DrcOffice.Mykolaiv,
        umy: DrcOffice.Sumy,
        // lwo: DrcOffice.Lviv,
      }) : undefined,
      oblast: oblast.name,
      // displacement: KoboGeneralMapping.mapDisplacementStatus(answer.),
      raion: KoboGeneralMapping.searchRaion(answer.ben_det_raion),
      hromada: KoboGeneralMapping.searchHromada(answer.ben_det_hromada),
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
    }
  }

  export const createNta: MetaMapperInsert<KoboMetaOrigin<Shelter_NTA.T, KoboTagStatus>> = row => {
    const answer = Shelter_NTA.map(row.answers)
    const group = KoboGeneralMapping.collectXlsKoboIndividuals(harmonizeNtaDisabilityAll(answer)).map(KoboGeneralMapping.mapPerson)
    const oblast = OblastIndex.byKoboName(answer.ben_det_oblast!)
    const isCfRepair = answer.modality === 'cash_for_repair'
    return {
      enumerator: Shelter_NTA.options.enum_name[answer.enum_name!],
      office: fnSwitch(answer.back_office!, {
        cej: DrcOffice.Chernihiv,
        dnk: DrcOffice.Dnipro,
        hrk: DrcOffice.Kharkiv,
        nlv: DrcOffice.Mykolaiv,
        umy: DrcOffice.Sumy,
      }, () => undefined),
      oblast: oblast.name,
      displacement: KoboGeneralMapping.mapDisplacementStatus(answer.ben_det_res_stat),
      raion: KoboGeneralMapping.searchRaion(answer.ben_det_raion),
      hromada: KoboGeneralMapping.searchHromada(answer.ben_det_hromada),
      sector: DrcSector.Shelter,
      activity: isCfRepair ? DrcProgram.CashForRepair : DrcProgram.ShelterRepair,
      personsCount: safeNumber(answer.ben_det_hh_size),
      persons: group,
      lastName: answer.ben_det_surname_l,
      firstName: answer.ben_det_first_name_l,
      patronymicName: answer.ben_det_pat_name_l,
      taxId: answer.pay_det_tax_id_num,
      phone: answer.ben_det_ph_number_l ? '' + answer.ben_det_ph_number_l : undefined,
      status: KoboMetaHelper.mapCashStatus(row.tags?.status),
      lastStatusUpdate: row.tags?.lastStatusUpdate,
    }
  }

  export const updateTa: MetaMapperMerge<KoboMetaOrigin<Shelter_TA.T, ShelterTaTags>, KoboMetaShelterRepairTags> = row => {
    if (!row.tags || !row.answers.nta_id) return
    const project = row.tags.project
    return [
      row.answers.nta_id,
      {
        referencedFormId: KoboIndex.byName('shelter_ta').id,
        project: project ? [project] : undefined,
        donor: map(project, _ => [DrcProjectHelper.donorByProject[_]]),
        status: row.tags.workDoneAt ? KoboMetaStatus.Committed : KoboMetaStatus.Pending,
        lastStatusUpdate: row.tags.workDoneAt,
        tags: row.tags?.damageLevel ? {damageLevel: row.tags?.damageLevel} : {}
      }
    ]
  }
}
