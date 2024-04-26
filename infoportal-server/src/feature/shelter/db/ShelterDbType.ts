import {KoboAnswerFlat, KoboAnswerId, DrcOffice, OblastISO, OblastName} from '@infoportal-common'
import {ShelterNtaTags, ShelterTaTags} from '../../kobo/tags/ShelterTags'
import {Shelter_TA} from '@infoportal-common'
import {Shelter_NTA} from '@infoportal-common'

export enum ShelterTaPriceLevel {
  Light = 'Light',
  Medium = 'Medium',
  Heavy = 'Heavy',
}

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
}
