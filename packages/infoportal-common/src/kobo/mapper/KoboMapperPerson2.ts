import {Bn_re, Ecrec_cashRegistration} from '../generated'
import {Person} from '../../type/Person'
import {fnSwitch} from '@alexandreannic/ts-utils'
import {WgDisability} from './Kobo'

export namespace KoboGeneralMapping2 {
  type ExtractHh<T, K extends keyof T> = T[K] extends any[] | undefined ? NonNullable<T[K]>[0] : never

  export namespace Persons {
    export namespace Displacement {
      const common = (
        person: Pick<ExtractHh<Ecrec_cashRegistration.T, 'hh_char_hh_det'>, 'hh_char_hh_res_stat'>,
      ): undefined | Person.DisplacementStatus[] => {}
    }

    export namespace Disability {
      const common = (
        person: ExtractHh<Ecrec_cashRegistration.T, 'hh_char_hh_det'>,
      ): undefined | Person.WgDisability[] => {
        if (!person.hh_char_hh_det_dis_level) return undefined
        if (person.hh_char_hh_det_dis_level === 'zero') return [Person.WgDisability.None]
        return person.hh_char_hh_det_dis_select
          ?.map((_) =>
            fnSwitch(
              _,
              {
                diff_see: Person.WgDisability.See,
                diff_hear: Person.WgDisability.Hear,
                diff_walk: Person.WgDisability.Walk,
                diff_rem: Person.WgDisability.Rem,
                diff_care: Person.WgDisability.Care,
                diff_comm: Person.WgDisability.Comm,
                diff_none: Person.WgDisability.None,
              },
              () => undefined,
            ),
          )
          .filter((_) => !!_)
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
