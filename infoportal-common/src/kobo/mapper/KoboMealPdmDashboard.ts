import {Meal_cashPdm} from '../generated'
import {Person} from '../../type/Person'
import {fnSwitch} from '@alexandreannic/ts-utils'
import {DisplacementStatus, KoboAnswerFlat, KoboBaseTags, PersonDetails} from './Common'
import {KoboAnswerTags} from '../sdk'

export namespace KoboMealPdmDasbhoard {

  export type Person = PersonDetails

  export type T = KoboAnswerFlat<Omit<Meal_cashPdm.T, 'hh_char_hh_det'>, KoboBaseTags> & {
    persons: Person[]
  }

  export const map = (d: KoboAnswerFlat<Meal_cashPdm.T, KoboAnswerTags>): KoboAnswerFlat<T, KoboBaseTags> => {
    const r: T = d as unknown as T
    r.persons = mapPersons(d)
    return r
  }

  export const mapPersons = (_: Meal_cashPdm.T): PersonDetails[] => {
    return [
      {
        age: _.age!,
        gender: _.sex!,
        displacement: _.status_person!,
        disability: undefined,
      },
    ].map(person => ({
        age: person.age,
        gender: fnSwitch(person.gender, {
          'male': Person.Gender.Male,
          'female': Person.Gender.Female,
        }, () => undefined),
        displacement: fnSwitch(person.displacement, {
          'idp': DisplacementStatus.Idp,
          'long': DisplacementStatus.NonDisplaced,
          'returnee': DisplacementStatus.Returnee,
        }, () => undefined),
        disability: person.disability,
      }
    ))
  }
}