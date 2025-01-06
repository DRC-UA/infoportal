import {Bn_re, Ecrec_cashRegistration} from '../generated'
import {Person} from '../../type/Person'

export namespace KoboGeneralMapping2 {
  export namespace Persons {
    export namespace Disability {
      const common = (person: NonNullable<Ecrec_cashRegistration.T['hh_char_hh_det']>[0]) => {
        
      }
    }

    const common = (
      row: Pick<
        Ecrec_cashRegistration.T,
        | 'hh_char_dis_select'
        | 'hh_char_dis_level'
        // 'hh_char_hh_det' |
        | 'hh_char_hhh_dis_level'
        | 'hh_char_hhh_dis_select'
        | 'hh_char_hhh_age'
        | 'hh_char_hhh_gender'
        | 'hh_char_res_dis_level'
        | 'hh_char_res_dis_select'
        | 'hh_char_res_age'
        | 'hh_char_res_gender'
        | 'hh_char_hh_det'
      >,
    ) => {
      const all = row.hh_char_hh_det?.map((_) => ({}))
    }

    const bnre = (_: Bn_re.T): Person.PersonDetails[] => {}
  }
}
