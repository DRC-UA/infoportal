import {DrcOffice, OblastISO, OblastName} from '@infoportal-common'
import {KoboAnswerFlat, KoboAnswerId} from '../../connector/kobo/KoboClient/type/KoboAnswer'
import {ShelterNtaTags, ShelterTaTags} from '../../kobo/tags/ShelterTags'
import {Shelter_TA} from '../../../script/output/kobo/Shelter_TA'
import {Shelter_NTA} from '../../../script/output/kobo/Shelter_NTA'

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
