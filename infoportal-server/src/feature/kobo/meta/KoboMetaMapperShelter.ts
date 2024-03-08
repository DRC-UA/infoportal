import {fnSwitch, map} from '@alexandreannic/ts-utils'
import {
  DrcOffice,
  DrcProgram,
  DrcProjectHelper,
  DrcSector,
  KoboGeneralMapping,
  KoboIndex,
  OblastIndex,
  safeNumber,
  Shelter_NTA,
  Shelter_TA,
  ShelterTaTags,
  Bn_Re, KoboMetaStatus, KoboId, KoboMetaShelterRepairTags
} from '@infoportal-common'
import {KoboMetaCreate, KoboMetaOrigin} from './KoboMetaType'

export namespace KoboMetaMapperShelter {

  const mapDisability = (disabilities: Shelter_NTA.T['hh_char_hhh_dis_select']): Bn_Re.T['hh_char_dis_select'] => {
    return disabilities?.map(_ => {
      return fnSwitch(_!, {
        diff_medical: 'diff_care',
        diff_mental: 'diff_rem',
      }, () => _! as any)
    })
  }

  const mapDisabilityAll = (row: Shelter_NTA.T): any => {
    // @ts-ignore
    row.hh_char_hhh_dis_select = mapDisability(row.hh_char_hhh_dis_select)
    // @ts-ignore
    row.hh_char_res_dis_select = mapDisability(row.hh_char_res_dis_select)
    // @ts-ignore
    row.hh_char_hh_det = row.hh_char_hh_det?.map(_ => {
      return {
        ..._,
        hh_char_hh_det_dis_select: mapDisability(_.hh_char_hh_det_dis_select)
      }
    })
    return row
  }

  export const createNta = (row: KoboMetaOrigin<Shelter_NTA.T>): KoboMetaCreate => {
    const answer = Shelter_NTA.map(row.answers)
    const group = KoboGeneralMapping.collectXlsKoboIndividuals(mapDisabilityAll(answer)).map(KoboGeneralMapping.mapPerson)
    const oblast = OblastIndex.byKoboName(answer.ben_det_oblast!)

    return {
      id: row.id,
      uuid: row.uuid,
      date: row.date.toISOString() as any,
      formId: KoboIndex.byName('shelter_nta').id,
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
      activity: [DrcProgram.ShelterRepair],
      personsCount: safeNumber(answer.ben_det_hh_size),
      persons: group,
      lastName: answer.ben_det_surname_l,
      firstName: answer.ben_det_first_name_l,
      patronymicName: answer.ben_det_pat_name_l,
      taxId: answer.pay_det_tax_id_num,
      phone: answer.ben_det_ph_number_l ? '' + answer.ben_det_ph_number_l : undefined,
    }
  }

  export const updateTa = (row: KoboMetaOrigin<Shelter_TA.T, ShelterTaTags>): [KoboId, Partial<KoboMetaCreate<KoboMetaShelterRepairTags>>] | undefined => {
    if (!row.tags || !row.answers.nta_id) return
    const project = row.tags.project
    return [
      row.answers.nta_id,
      {
        referencedFormId: KoboIndex.byName('shelter_ta').id,
        project: project ? [project] : undefined,
        donor: map(project, _ => [DrcProjectHelper.donorByProject[_]]),
        status: row.tags.workDoneAt ? KoboMetaStatus.Committed : KoboMetaStatus.Pending,
        committedAt: row.tags.workDoneAt,
        tags: row.tags?.damageLevel ? {damageLevel: row.tags?.damageLevel} : {}
      }
    ]
  }
}
