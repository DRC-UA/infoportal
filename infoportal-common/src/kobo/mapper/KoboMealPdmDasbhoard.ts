import {Meal_pdmStandardised} from '../generated'
import {Person} from '../../type/Person'
import {fnSwitch} from '@alexandreannic/ts-utils'
import {DisplacementStatus, KoboAnswerFlat, KoboBaseTags, PersonDetails} from './Common'
import {KoboAnswerTags} from '../sdk'

export namespace KoboMealPdmDasbhoard {

  export type Person = PersonDetails

  export type T = KoboAnswerFlat<Omit<Meal_pdmStandardised.T, 'hh_char_hh_det'>, KoboBaseTags> & {
    persons: Person[]
  }

  export const map = (d: KoboAnswerFlat<Meal_pdmStandardised.T, KoboAnswerTags>): KoboAnswerFlat<T, KoboBaseTags> => {
    const r: T = d as unknown as T
    r.persons = mapPersons(d)
    return r
  }

  export const mapPersons = (_: Meal_pdmStandardised.T): PersonDetails[] => {
    return [
      ...(_.family ?? []).map(p => ({
          age: p.repage,
          gender: p.repgender,
          displacement: _.status_person,
          disability: undefined
        }
      ))
    ].map(_ => (
      {
        age: _.age,
        gender: fnSwitch(_.gender!, {
          'male': Person.Gender.Male,
          'female': Person.Gender.Female,
        }, () => undefined),
        displacement: fnSwitch(_.displacement!, {
          'yesidp': DisplacementStatus.Idp,
          'yescap': DisplacementStatus.NonDisplaced,
        }, () => undefined),
        disability: undefined
      }
    ))
  }
}