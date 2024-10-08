import {
  DrcOffice,
  KoboAnswerFlat,
  KoboAnswerId,
  OblastISO,
  OblastName,
  Person,
  Shelter_nta,
  Shelter_ta,
  ShelterNtaTags,
  ShelterTaPriceLevel,
  ShelterTaTags
} from '../../../../infoportal-common/src'

export interface ShelterEntity {
  ta?: KoboAnswerFlat<Shelter_ta.T, ShelterTaTags> & {
    _price?: number | null
    _priceLevel?: ShelterTaPriceLevel
  }
  nta?: KoboAnswerFlat<Shelter_nta.T, ShelterNtaTags>
  oblastIso?: OblastISO | ''
  oblast?: OblastName | ''
  office?: DrcOffice | ''
  id: KoboAnswerId
  persons?: Person.Person[]
}

export class ShelterEntityHelper {


}
