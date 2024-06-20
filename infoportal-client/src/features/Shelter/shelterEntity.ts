import {DrcOffice, KoboAnswerFlat, KoboAnswerId, OblastISO, OblastName, Person, Shelter_NTA, Shelter_TA, ShelterNtaTags, ShelterTaPriceLevel, ShelterTaTags} from '../../../../infoportal-common/src'

export interface ShelterEntity {
  ta?: KoboAnswerFlat<Shelter_TA.T, ShelterTaTags> & {
    _price?: number | null
    _priceLevel?: ShelterTaPriceLevel
  }
  nta?: KoboAnswerFlat<Shelter_NTA.T, ShelterNtaTags>
  oblastIso?: OblastISO | ''
  oblast?: OblastName | ''
  office?: DrcOffice | ''
  id: KoboAnswerId
  persons?: Person.Person[]
}

export class ShelterEntityHelper {


}
