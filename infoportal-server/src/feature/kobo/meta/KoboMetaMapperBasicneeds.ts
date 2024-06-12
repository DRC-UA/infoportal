import {fnSwitch, map, seq} from '@alexandreannic/ts-utils'
import {
  Bn_rapidResponse,
  Bn_re,
  CashStatus,
  DrcOffice,
  DrcProgram,
  DrcProject,
  DrcProjectHelper,
  DrcSectorHelper,
  KoboAnswerUtils,
  KoboGeneralMapping,
  KoboMetaHelper,
  KoboTagStatus,
  MpcaEntityTags,
  OblastIndex,
  safeNumber
} from '@infoportal-common'
import {KoboMetaOrigin} from './KoboMetaType'
import {MetaMapped, MetaMapperInsert} from './KoboMetaService'

const nfisPrograms = [DrcProgram.NFI, DrcProgram.ESK, DrcProgram.InfantWinterClothing, DrcProgram.InfantWinterClothing]

export class KoboMetaBasicneeds {

  private static readonly getBnreProject = (back_donor?: Bn_re.Option<'back_donor'> | Bn_rapidResponse.Option<'back_donor_l'>) => {
    return fnSwitch(back_donor!, {
      uhf_chj: DrcProject['UKR-000314 UHF4'],
      uhf_dnk: DrcProject['UKR-000314 UHF4'],
      uhf_hrk: DrcProject['UKR-000314 UHF4'],
      uhf_lwo: DrcProject['UKR-000314 UHF4'],
      uhf_nlv: DrcProject['UKR-000314 UHF4'],
      bha_lwo: DrcProject['UKR-000284 BHA'],
      bha_chj: DrcProject['UKR-000284 BHA'],
      bha_dnk: DrcProject['UKR-000284 BHA'],
      bha_hrk: DrcProject['UKR-000284 BHA'],
      bha_nlv: DrcProject['UKR-000284 BHA'],
      lwo_360_novonordisk: DrcProject['UKR-000360 Novo-Nordisk'],
      hrk_360_novonordisk: DrcProject['UKR-000360 Novo-Nordisk'],
      danida347_lwo: DrcProject['UKR-000347 DANIDA'],
      danida347_hrk: DrcProject['UKR-000347 DANIDA'],
      danida347_chj: DrcProject['UKR-000347 DANIDA'],
      danida347_dnk: DrcProject['UKR-000347 DANIDA'],
      echo322_umy: DrcProject['UKR-000322 ECHO2'],
      echo322_chj: DrcProject['UKR-000322 ECHO2'],
      echo322_dnk: DrcProject['UKR-000322 ECHO2'],
      echo322_lwo: DrcProject['UKR-000322 ECHO2'],
      echo322_hrk: DrcProject['UKR-000322 ECHO2'],
      echo322_nlv: DrcProject['UKR-000322 ECHO2'],
      echo_chj: DrcProject['UKR-000269 ECHO1'],
      echo_dnk: DrcProject['UKR-000269 ECHO1'],
      echo_hrk: DrcProject['UKR-000269 ECHO1'],
      echo_lwo: DrcProject['UKR-000269 ECHO1'],
      echo_nlv: DrcProject['UKR-000269 ECHO1'],
      novo_nlv: DrcProject['UKR-000298 Novo-Nordisk'],
      okf_lwo: DrcProject['UKR-000309 OKF'],
      '341_hoffman_husmans_hrk': DrcProject['UKR-000341 Hoffmans & Husmans'],
      '340_02_augustinus_fonden_lwo': DrcProject['UKR-000340 Augustinus Fonden'],
      '340_augustinus_fonden_dnk': DrcProject['UKR-000340 Augustinus Fonden'],
      pool_chj: DrcProject['UKR-000270 Pooled Funds'],
      pool_dnk: DrcProject['UKR-000270 Pooled Funds'],
      pool_hrk: DrcProject['UKR-000270 Pooled Funds'],
      pool_lwo: DrcProject['UKR-000270 Pooled Funds'],
      pool_nlv: DrcProject['UKR-000270 Pooled Funds'],
      pool_umy: DrcProject['UKR-000270 Pooled Funds'],
      sdc_umy: DrcProject['UKR-000330 SDC2'],
      hrk_umy: DrcProject['UKR-000330 SDC2'],
      uhf6_chj: DrcProject['UKR-000336 UHF6'],
      uhf6_dnk: DrcProject['UKR-000336 UHF6'],
      uhf6_hrk: DrcProject['UKR-000336 UHF6'],
      uhf6_lwo: DrcProject['UKR-000336 UHF6'],
      uhf6_nlv: DrcProject['UKR-000336 UHF6'],
      uhf6_umy: DrcProject['UKR-000336 UHF6'],
      uhf7_chj: DrcProject['UKR-000352 UHF7'],
      uhf7_dnk: DrcProject['UKR-000352 UHF7'],
      uhf7_hrk: DrcProject['UKR-000352 UHF7'],
      uhf7_lwo: DrcProject['UKR-000352 UHF7'],
      uhf7_nlv: DrcProject['UKR-000352 UHF7'],
      uhf7_umy: DrcProject['UKR-000352 UHF7'],
      umy_danida: DrcProject['UKR-000267 DANIDA'],
      '330_sdc_dnk': DrcProject['UKR-000330 SDC2'],
      dnk_danida_347: DrcProject['UKR-000347 DANIDA'],


    }, _ => DrcProjectHelper.searchByCode(DrcProjectHelper.searchCode(_)))
  }

  static readonly bn_re: MetaMapperInsert<KoboMetaOrigin<Bn_re.T, MpcaEntityTags>> = row => {
    const answer = Bn_re.map(row.answers)
    const group = KoboGeneralMapping.collectXlsKoboIndividuals(answer)
    const oblast = OblastIndex.byKoboName(answer.ben_det_oblast!)

    const activities = seq(answer.back_prog_type)?.map(prog => {
      return fnSwitch(prog.split('_')[0], {
        cfr: {activity: DrcProgram.CashForRent, project: row.tags?.projects?.[0] ?? KoboMetaBasicneeds.getBnreProject(answer.donor_cfr ?? answer.back_donor?.[0])},
        cfe: {activity: DrcProgram.CashForEducation, project: row.tags?.projects?.[0] ?? KoboMetaBasicneeds.getBnreProject(answer.donor_cfe ?? answer.back_donor?.[0])},
        mpca: {activity: DrcProgram.MPCA, project: row.tags?.projects?.[0] ?? KoboMetaBasicneeds.getBnreProject(answer.donor_mpca ?? answer.back_donor?.[0])},
        csf: {activity: DrcProgram.CashForFuel, project: row.tags?.projects?.[0] ?? KoboMetaBasicneeds.getBnreProject(answer.donor_cff ?? answer.back_donor?.[0])},
        cfu: {activity: DrcProgram.CashForUtilities, project: row.tags?.projects?.[0] ?? KoboMetaBasicneeds.getBnreProject(answer.donor_cfu ?? answer.back_donor?.[0])},
        nfi: {activity: DrcProgram.NFI, project: row.tags?.projects?.[0] ?? KoboMetaBasicneeds.getBnreProject(answer.donor_nfi ?? answer.back_donor?.[0])},
        esk: {activity: DrcProgram.ESK, project: row.tags?.projects?.[0] ?? KoboMetaBasicneeds.getBnreProject(answer.donor_esk ?? answer.back_donor?.[0])},
        ihk: {activity: DrcProgram.HygieneKit, project: row.tags?.projects?.[0] ?? KoboMetaBasicneeds.getBnreProject(answer.donor_ihk ?? answer.back_donor?.[0])},
      }, () => undefined)
    }).compact().distinct(_ => _.activity) ?? []

    const prepare = (activity: DrcProgram, project?: DrcProject): MetaMapped => {
      const status = row.tags?.status ?? (DrcSectorHelper.isAutoValidatedActivity(activity) ? CashStatus.Paid : undefined)
      return {
        enumerator: Bn_re.options.back_enum[answer.back_enum!],
        office: fnSwitch(answer.back_office!, {
          chj: DrcOffice.Chernihiv,
          dnk: DrcOffice.Dnipro,
          hrk: DrcOffice.Kharkiv,
          lwo: DrcOffice.Lviv,
          nlv: DrcOffice.Mykolaiv,
          umy: DrcOffice.Sumy,
        }, () => undefined),
        oblast: oblast.name,
        raion: Bn_re.options.ben_det_raion[answer.ben_det_raion!],
        hromada: Bn_re.options.ben_det_hromada[answer.ben_det_hromada!],
        settlement: answer.ben_det_settlement,
        sector: DrcSectorHelper.findByProgram(activity),
        activity,
        personsCount: safeNumber(answer.ben_det_hh_size),
        persons: group.map(KoboGeneralMapping.mapPersonDetails),
        project: project ? [project] : [],
        donor: project ? [DrcProjectHelper.donorByProject[project]] : [],
        lastName: answer.ben_det_surname,
        firstName: answer.ben_det_first_name,
        patronymicName: answer.ben_det_pat_name,
        taxId: answer.pay_det_tax_id_num,
        phone: answer.ben_det_ph_number ? '' + answer.ben_det_ph_number : undefined,
        status: KoboMetaHelper.mapCashStatus(status),
        lastStatusUpdate: row.tags?.lastStatusUpdate ?? (status === CashStatus.Paid || nfisPrograms.includes(activity) ? row.date : undefined),
        passportNum: map((answer.pay_det_pass_ser ?? '') + (answer.pay_det_pass_num ?? ''), _ => _ === '' ? undefined : _),
        taxIdFileName: answer.pay_det_tax_id_ph,
        taxIdFileUrl: KoboAnswerUtils.findFileUrl(row.attachments, answer.pay_det_tax_id_ph),
        idFileName: answer.pay_det_id_ph,
        idFileUrl: KoboAnswerUtils.findFileUrl(row.attachments, answer.pay_det_id_ph),
      }
    }
    return activities.map(_ => prepare(
      _.activity,
      _.project ?? KoboMetaBasicneeds.getBnreProject(answer.back_donor?.[0]),
    ))
  }

  static readonly bn_rrm: MetaMapperInsert<KoboMetaOrigin<Bn_rapidResponse.T, KoboTagStatus>> = (row) => {
    const answer = Bn_rapidResponse.map(row.answers)
    if (answer.form_length === 'short') return
    const group = KoboGeneralMapping.collectXlsKoboIndividuals({
      hh_char_hh_det: answer.hh_char_hh_det_l?.map(_ => ({
        hh_char_hh_det_age: _.hh_char_hh_det_age_l,
        hh_char_hh_det_gender: _.hh_char_hh_det_gender_l,
        hh_char_hh_det_dis_level: _.hh_char_hh_det_dis_level_l,
        hh_char_hh_det_dis_select: _.hh_char_hh_det_dis_select_l,
      })),
      hh_char_hhh_age: answer.hh_char_hhh_age_l,
      hh_char_hhh_gender: answer.hh_char_hhh_gender_l,
      hh_char_hhh_dis_level: answer.hh_char_hhh_dis_level_l,
      hh_char_hhh_dis_select: answer.hh_char_hhh_dis_select_l,
      hh_char_res_age: answer.hh_char_res_age_l,
      hh_char_res_gender: answer.hh_char_res_gender_l,
      hh_char_res_dis_level: answer.hh_char_res_dis_level_l,
      hh_char_res_dis_select: answer.hh_char_res_dis_select_l,
      ben_det_res_stat: answer.ben_det_res_stat_l,
    })
    const oblast = OblastIndex.byKoboName(answer.ben_det_oblast_l!)
    const project = fnSwitch(answer.back_donor_l!, {
      sdc_umy: DrcProject[`UKR-000330 SDC2`],
      uhf_chj: DrcProject[`UKR-000314 UHF4`],
      uhf_dnk: DrcProject[`UKR-000314 UHF4`],
      uhf_hrk: DrcProject[`UKR-000314 UHF4`],
      uhf_lwo: DrcProject[`UKR-000314 UHF4`],
      uhf_nlv: DrcProject[`UKR-000314 UHF4`],
      dnk_bha_345: DrcProject['UKR-000345 BHA2'],
      bha_lwo: DrcProject[`UKR-000284 BHA`],
      bha_chj: DrcProject[`UKR-000284 BHA`],
      bha_dnk: DrcProject[`UKR-000284 BHA`],
      bha_hrk: DrcProject[`UKR-000284 BHA`],
      bha_nlv: DrcProject[`UKR-000284 BHA`],
      echo_chj: DrcProject[`UKR-000269 ECHO1`],
      echo_dnk: DrcProject[`UKR-000269 ECHO1`],
      echo_hrk: DrcProject[`UKR-000269 ECHO1`],
      echo_lwo: DrcProject[`UKR-000269 ECHO1`],
      echo_nlv: DrcProject[`UKR-000269 ECHO1`],
      novo_nlv: DrcProject[`UKR-000360 Novo-Nordisk`],
      okf_lwo: DrcProject[`UKR-000309 OKF`],
      pool_chj: DrcProject[`UKR-000270 Pooled Funds`],
      pool_dnk: DrcProject[`UKR-000270 Pooled Funds`],
      pool_hrk: DrcProject[`UKR-000270 Pooled Funds`],
      pool_lwo: DrcProject[`UKR-000270 Pooled Funds`],
      pool_nlv: DrcProject[`UKR-000270 Pooled Funds`],
      nlv_bha_345: DrcProject[`UKR-000345 BHA2`],
      echo2_dnk: DrcProject['UKR-000322 ECHO2'],
    }, _ => _ as DrcProject)
    const donor = DrcProjectHelper.donorByProject[project]

    const programs = seq(answer.back_prog_type_l)
      .map(_ => _.split('_')[0])
      .distinct(_ => _)
      .map(prog => fnSwitch(prog, {
        mpca: DrcProgram.MPCA,
        nfi: DrcProgram.NFI,
        cfr: DrcProgram.CashForRent,
        cfe: DrcProgram.CashForEducation,
        iwk: DrcProgram.InfantWinterClothing,
        ihk: DrcProgram.HygieneKit,
        esk: DrcProgram.ESK,
      }, () => undefined))
      .compact()

    const prepare = (activity: DrcProgram): MetaMapped => {
      const status = row.tags?.status ?? (DrcSectorHelper.isAutoValidatedActivity(activity) ? CashStatus.Paid : undefined)
      return {
        enumerator: Bn_rapidResponse.options.back_enum_l[answer.back_enum_l!],
        office: fnSwitch(answer.back_office ?? answer.back_office_l!, {
          chj: DrcOffice.Chernihiv,
          dnk: DrcOffice.Dnipro,
          hrk: DrcOffice.Kharkiv,
          lwo: DrcOffice.Lviv,
          nlv: DrcOffice.Mykolaiv,
          umy: DrcOffice.Sumy,
        }, () => undefined),
        oblast: oblast.name,
        raion: Bn_rapidResponse.options.ben_det_raion_l[answer.ben_det_raion_l!],
        hromada: Bn_rapidResponse.options.ben_det_hromada_l[answer.ben_det_hromada_l!],
        settlement: answer.ben_det_settlement_l,
        sector: DrcSectorHelper.findByProgram(activity),
        activity: activity,
        personsCount: safeNumber(answer.ben_det_hh_size_l),
        persons: group.map(KoboGeneralMapping.mapPersonDetails),
        project: project ? [project] : [],
        donor: donor ? [donor] : [],
        lastName: answer.ben_det_surname_l,
        firstName: answer.ben_det_first_name_l,
        patronymicName: answer.ben_det_pat_name_l,
        phone: answer.ben_det_ph_number_l ? '' + answer.ben_det_ph_number_l : undefined,
        status: KoboMetaHelper.mapCashStatus(status),
        passportNum: map(
          (answer.pay_det_pass_ser ?? answer.pay_det_pass_ser_l ?? '') + (answer.pay_det_pass_num ?? answer.pay_det_pass_num_l ?? ''),
          _ => _ === '' ? undefined : _
        ),
        taxId: answer.pay_det_tax_id_num ?? answer.pay_det_tax_id_num_l,
        taxIdFileName: answer.pay_det_tax_id_ph ?? answer.pay_det_tax_id_ph_l,
        taxIdFileUrl: KoboAnswerUtils.findFileUrl(row.attachments, answer.pay_det_tax_id_ph ?? answer.pay_det_tax_id_ph_l),
        idFileName: answer.pay_det_id_ph ?? answer.pay_det_id_ph_l,
        idFileUrl: KoboAnswerUtils.findFileUrl(row.attachments, answer.pay_det_id_ph ?? answer.pay_det_id_ph_l),
        lastStatusUpdate: row.tags?.lastStatusUpdate ?? (status === CashStatus.Paid ? row.date : undefined),
      }
    }
    return programs.map(prepare)
  }
}
