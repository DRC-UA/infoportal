import {KoboEcrec_cashRegistration, KoboIndex} from 'infoportal-common'
import {KoboXmlMapper} from 'infoportal-common'

export const databaseCustomMapping: Record<any, (_: any) => any> = {
  [KoboIndex.byName('ecrec_cashRegistration').id]: (_: KoboEcrec_cashRegistration.T) =>
    KoboEcrec_cashRegistration.calculateVulnerabilities(_),
  [KoboIndex.byName('ecrec_cashRegistrationBha').id]: (_: KoboEcrec_cashRegistration.T) =>
    KoboEcrec_cashRegistration.calculateVulnerabilities(_),
  [KoboIndex.byName('ecrec_vetApplication').id]: (_) =>
    KoboXmlMapper.Breakdown.addProperty(_, KoboXmlMapper.Persons.ecrec_vetApplication),
  [KoboIndex.byName('ecrec_vetEvaluation').id]: (_) =>
    KoboXmlMapper.Breakdown.addProperty(_, KoboXmlMapper.Persons.ecrec_vetEvaluation),
  [KoboIndex.byName('ecrec_msmeGrantEoi').id]: (_) =>
    KoboXmlMapper.Breakdown.addProperty(_, KoboXmlMapper.Persons.ecrec_msmeGrantEoi),
  [KoboIndex.byName('ecrec_msmeGrantReg').id]: (_) =>
    KoboXmlMapper.Breakdown.addProperty(_, KoboXmlMapper.Persons.ecrec_msmeGrantReg),
  [KoboIndex.byName('ecrec_vet_bha388').id]: (_) => ({
    ...KoboXmlMapper.Breakdown.addProperty(_, KoboXmlMapper.Persons.ecrec_vet_bha388),
    alter_donor: _.alter_donor ?? 'UKR-000388 BHA', // draw default donor in Datatable, becuase Pool Funds were introduced as replacement for selected beneficiaries
  }),
  [KoboIndex.byName('ecrec_vet2_dmfa').id]: (_) =>
    KoboXmlMapper.Breakdown.addProperty(_, KoboXmlMapper.Persons.ecrec_vet2_dmfa),
  [KoboIndex.byName('bn_re').id]: (_) => KoboXmlMapper.Breakdown.addProperty(_, KoboXmlMapper.Persons.bn_re),
  [KoboIndex.byName('bn_rapidResponse').id]: (_) =>
    KoboXmlMapper.Breakdown.addProperty(_, KoboXmlMapper.Persons.bn_rapidResponse),
  [KoboIndex.byName('bn_rapidResponse2').id]: (_) =>
    KoboXmlMapper.Breakdown.addProperty(_, KoboXmlMapper.Persons.bn_rapidResponse2),
  [KoboIndex.byName('bn_cashForRentRegistration').id]: (_) =>
    KoboXmlMapper.Breakdown.addProperty(_, KoboXmlMapper.Persons.bn_cashForRentRegistration),
  [KoboIndex.byName('bn_cashForRentApplication').id]: (_) =>
    KoboXmlMapper.Breakdown.addProperty(_, KoboXmlMapper.Persons.bn_cashForRentApplication),
  [KoboIndex.byName('shelter_cashForShelter').id]: (_) =>
    KoboXmlMapper.Breakdown.addProperty(_, KoboXmlMapper.Persons.shelter_cashForShelter),
  [KoboIndex.byName('shelter_nta').id]: (_) =>
    KoboXmlMapper.Breakdown.addProperty(_, KoboXmlMapper.Persons.shelter_nta),
  [KoboIndex.byName('protection_pss').id]: (_) =>
    KoboXmlMapper.Breakdown.addProperty(_, KoboXmlMapper.Persons.protection_pss),
  [KoboIndex.byName('protection_hhs3').id]: (_) =>
    KoboXmlMapper.Breakdown.addProperty(_, KoboXmlMapper.Persons.protection_hhs3),
  [KoboIndex.byName('protection_groupSession').id]: (_) =>
    KoboXmlMapper.Breakdown.addProperty(_, KoboXmlMapper.Persons.protection_groupSession),
  [KoboIndex.byName('meal_cashPdm').id]: (_) => KoboXmlMapper.Breakdown.addProperty(_, KoboXmlMapper.Persons.cash_pdm),
  [KoboIndex.byName('partner_lampa').id]: (_) =>
    KoboXmlMapper.Breakdown.addProperty(_, KoboXmlMapper.Persons.partner_lampa),
  [KoboIndex.byName('ecrec_subsistance').id]: (_) =>
    KoboXmlMapper.Breakdown.addProperty(_, KoboXmlMapper.Persons.ecrec_subsistance),
  [KoboIndex.byName('ecrec_small_scale').id]: (_) =>
    KoboXmlMapper.Breakdown.addProperty(_, KoboXmlMapper.Persons.ecrec_small_scale),
  [KoboIndex.byName('protection_communityMonitoring').id]: (_) =>
    KoboXmlMapper.Breakdown.addProperty(_, KoboXmlMapper.Persons.protection_communityMonitoring),
  [KoboIndex.byName('legal_individual_aid').id]: (_) =>
    KoboXmlMapper.Breakdown.addProperty(_, KoboXmlMapper.Persons.legal_individual_aid),
}
