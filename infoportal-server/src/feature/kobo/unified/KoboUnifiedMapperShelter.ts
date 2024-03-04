import {fnSwitch, seq} from '@alexandreannic/ts-utils'
import {DrcOffice, DrcProgram, DrcProject, DrcProjectHelper, DrcSector, KoboIndex, OblastIndex, Person, safeNumber} from '@infoportal-common'
import {Bn_Re} from '../../../script/output/kobo/Bn_Re'
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

  static readonly bn_re = (row: KoboUnifiedOrigin<Bn_Re.T>): KoboUnifiedCreate => {
    const answer = Bn_Re.map(row.answers)
    // if (row.id === '536773364') {
    // throw new Error()
    // }
    const group = [...answer.hh_char_hh_det ?? [],
      {
        hh_char_hh_det_age: answer.hh_char_hhh_age,
        hh_char_hh_det_gender: answer.hh_char_hhh_gender
      },
      {
        hh_char_hh_det_age: answer.hh_char_res_age,
        hh_char_hh_det_gender: answer.hh_char_res_gender,
      },
    ].filter(_ => _.hh_char_hh_det_gender !== undefined || _.hh_char_hh_det_age !== undefined)
    const oblast = OblastIndex.byKoboName(answer.ben_det_oblast!)
    const project = seq(answer.back_donor ?? []).filter(_ => _ !== '' as any).distinct(_ => _).map(d => fnSwitch(d, {
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
    }, _ => _ as DrcProject))
    const donor = project.map(_ => DrcProjectHelper.donorByProject[_])

    return {
      id: row.id,
      uuid: row.uuid,
      date: row.date.toISOString() as any,
      formId: KoboIndex.byName('bn_re').id,
      enumerator: Bn_Re.options.back_enum[answer.back_enum!],
      office: fnSwitch(answer.back_office!, {
        chj: DrcOffice.Chernihiv,
        dnk: DrcOffice.Dnipro,
        hrk: DrcOffice.Kharkiv,
        lwo: DrcOffice.Lviv,
        nlv: DrcOffice.Mykolaiv,
        umy: DrcOffice.Sumy,
      }, () => undefined),
      oblast: oblast.name,
      raion: Bn_Re.options.ben_det_raion[answer.ben_det_raion!],
      hromada: Bn_Re.options.ben_det_hromada[answer.ben_det_hromada!],
      sector: DrcSector.MPCA,
      activity: seq(answer.back_prog_type)?.map(prog => fnSwitch(prog.split('_')[0], {
        'cfr': DrcProgram.CashForRent,
        'cfe': DrcProgram.CashForEducation,
        'mpca': DrcProgram.MPCA,
        'csf': DrcProgram.CashForFuel,
        'cfu': DrcProgram.CashForUtilities,
        nfi: DrcProgram.NFI,
        esk: DrcProgram.ESK,
        ihk: DrcProgram.InfantHygieneKit
      }, () => undefined)).distinct(_ => _).compact() ?? [],
      individualsCount: safeNumber(answer.ben_det_hh_size),
      individuals: group.map(p => ({
        age: safeNumber(p.hh_char_hh_det_age),
        gender: fnSwitch(p.hh_char_hh_det_gender!, {
          female: Person.Gender.Female,
          male: Person.Gender.Male,
        }, () => void 0)
      })),
      project: project,
      donor: donor,
      lastName: answer.ben_det_surname,
      firstName: answer.ben_det_first_name,
      patronymicName: answer.ben_det_pat_name,
      taxId: answer.pay_det_tax_id_num,
      phone: answer.ben_det_ph_number ? '' + answer.ben_det_ph_number : undefined,

    }
  }
}
