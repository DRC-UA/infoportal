import {KoboAnswer, KoboAnswerId} from '@/core/sdk/server/kobo/Kobo'
import {DrcOffice, OblastISO, OblastName, Shelter_NTA, Shelter_TA, ShelterNtaTags, ShelterTaPriceLevel, ShelterTaTags} from '@infoportal-common'

export interface ShelterEntity {
  ta?: KoboAnswer<Shelter_TA.T, ShelterTaTags> & {
    _price?: number | null
    _priceLevel?: ShelterTaPriceLevel
  }
  nta?: KoboAnswer<Shelter_NTA.T, ShelterNtaTags>
  oblastIso?: OblastISO | ''
  oblast?: OblastName | ''
  office?: DrcOffice | ''
  id: KoboAnswerId
}

export class ShelterEntityHelper {


}
