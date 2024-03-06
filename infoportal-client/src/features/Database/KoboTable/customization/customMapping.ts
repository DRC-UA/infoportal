import {KoboGeneralMapping, KoboIndex, addIndividualBreakdownColumnForRrm} from '@infoportal-common'

export const databaseCustomMapping: Record<any, (_: any) => any> = {
  [KoboIndex.byName('ecrec_cashRegistration').id]: KoboGeneralMapping.addIndividualBreakdownColumn,
  [KoboIndex.byName('ecrec_cashRegistrationBha').id]: KoboGeneralMapping.addIndividualBreakdownColumn,
  [KoboIndex.byName('bn_re').id]: KoboGeneralMapping.addIndividualBreakdownColumn,
  [KoboIndex.byName('bn_rapidResponse').id]: KoboGeneralMapping.addIndividualBreakdownColumnForRrm,
  [KoboIndex.byName('shelter_nta').id]: KoboGeneralMapping.addIndividualBreakdownColumn,
  [KoboIndex.byName('bn_cashForRentRegistration').id]: KoboGeneralMapping.addIndividualBreakdownColumn,
  [KoboIndex.byName('bn_cashForRentApplication').id]: KoboGeneralMapping.addIndividualBreakdownColumn,
  [KoboIndex.byName('shelter_cashForShelter').id]: KoboGeneralMapping.addIndividualBreakdownColumn,
}