import {fnSwitch, seq} from '@alexandreannic/ts-utils'
import {DrcOffice, DrcProject, DrcProjectHelper, DrcSector, KoboIndex, OblastIndex, Person, safeNumber, Shelter_cashForRepair} from '@infoportal-common'
import {Bn_Re} from '../../../script/output/kobo/Bn_Re'
import {MpcaProgram} from '../../mpca/db/MpcaDbType'
import {KoboUnifiedCreate, KoboUnifiedOrigin} from './KoboUnifiedType'

export class KoboUnifiedBasicneeds {

  // static readonly bn_ashForRentRegistration = (answer: KoboUnifiedOrigin<Shelter_cashForRent.T>): KoboUnifiedCreate => {
  //   const _ = answer.answers
  //   _.
  //   const group = [..._.hh_char_hh_det ?? [],
  //     {
  //       hh_char_hh_det_age: _.hh_char_hhh_age,
  //       hh_char_hh_det_gender: _.hh_char_hhh_gender
  //     },
  //     {
  //       hh_char_hh_det_age: _.hh_char_res_age,
  //       hh_char_hh_det_gender: _.hh_char_res_gender,
  //     },
  //   ]
  // }

  static readonly bn_re = (answer: KoboUnifiedOrigin<Bn_Re.T>): KoboUnifiedCreate => {
    const _ = answer.answers
    const group = [..._.hh_char_hh_det ?? [],
      {
        hh_char_hh_det_age: _.hh_char_hhh_age,
        hh_char_hh_det_gender: _.hh_char_hhh_gender
      },
      {
        hh_char_hh_det_age: _.hh_char_res_age,
        hh_char_hh_det_gender: _.hh_char_res_gender,
      },
    ].filter(_ => _.hh_char_hh_det_gender !== undefined || _.hh_char_hh_det_age !== undefined)
    const oblast = OblastIndex.byKoboName(_.ben_det_oblast!)
    const project = fnSwitch(_.donor_mpca ?? _.donor_cfe ?? _.donor_cfu ?? _.donor_cff ?? _.donor_cfr ?? _.back_donor?.[0]!, {
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
      pool_chj: DrcProject['UKR-000270 Pooled Funds'],
      pool_dnk: DrcProject['UKR-000270 Pooled Funds'],
      pool_hrk: DrcProject['UKR-000270 Pooled Funds'],
      pool_lwo: DrcProject['UKR-000270 Pooled Funds'],
      pool_nlv: DrcProject['UKR-000270 Pooled Funds'],
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
    }, _ => _ as DrcProject)
    return {
      id: answer.id,
      uuid: answer.uuid,
      date: answer.date,
      formId: KoboIndex.byName('bn_re').id,
      enumerator: Bn_Re.options.back_enum[_.back_enum!],
      office: fnSwitch(_.back_office!, {
        chj: DrcOffice.Chernihiv,
        dnk: DrcOffice.Dnipro,
        hrk: DrcOffice.Kharkiv,
        lwo: DrcOffice.Lviv,
        nlv: DrcOffice.Mykolaiv,
        umy: DrcOffice.Sumy,
      }, () => undefined),
      oblast: oblast.name,
      raion: Bn_Re.options.ben_det_raion[_.ben_det_raion!],
      hromada: Bn_Re.options.ben_det_hromada[_.ben_det_hromada!],
      sector: DrcSector.MPCA,
      activity: seq(_.back_prog_type)?.map(prog => fnSwitch(prog.split('_')[0], {
        'cfr': MpcaProgram.CashForRent,
        'cfe': MpcaProgram.CashForEducation,
        'mpca': MpcaProgram.MPCA,
        'csf': MpcaProgram.CashForFuel,
        'cfu': MpcaProgram.CashForUtilities,
      }, () => undefined)).compact(),
      individualsCount: safeNumber(_.ben_det_hh_size),
      individuals: group.map(p => ({
        age: safeNumber(p.hh_char_hh_det_age),
        gender: fnSwitch(p.hh_char_hh_det_gender!, {
          female: Person.Gender.Female,
          male: Person.Gender.Male,
        }, () => void 0)
      })),
      project: [project],
      donor: [DrcProjectHelper.donorByProject[project]],
      lastName: _.ben_det_surname,
      firstName: _.ben_det_first_name,
      patronymicName: _.ben_det_pat_name,
      taxId: _.pay_det_tax_id_num,
      phone: _.ben_det_ph_number ? '' + _.ben_det_ph_number : undefined,

    }
  }
}
