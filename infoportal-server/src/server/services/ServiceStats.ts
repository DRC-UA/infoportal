import {Cache} from '@alexandreannic/ts-utils'
import {Period} from '@infoportal-common'

export interface StatsFilters extends Partial<Period> {
}

export const translate = <T extends Record<string, any>>(translation: Record<keyof T, string>) => (data: Record<keyof T, number>): string => {
  return Object.keys(data).map(k =>
    `<div><b>${data[k]}</b> ${translation[k]}</div>`
  ).join('')
}

const translations = {
  ecrec: {
    msd: 'businesses from the agricultural sector',
    vet: 'people were supported financially',
    sme: 'small and medium enterprises received financial assistance',
    micro: 'individuals were provided with micro-business grants',
    womanTeaching: 'women have been selected and will graduate after passing the ‘Full stack’ and ‘UI/UX design’ courses',
  },
  legalAid: {
    individuals: 'individuals received legal aid',
    group: 'people received information on relevant rights and entitlements',
    printedMaterial: 'types of printed materials',
    localAidPartner: 'local legal aid partners',
  },
  nfis: {
    submissions: 'families reached',
    individuals: 'persons reached',
    mpcaSubmissions: 'families supported with cash assistance',
    mpcaIndividuals: 'individuals supported with cash assistance',
    nfiSubmissions: 'families supported with NFIs',
    nfiIndividuals: 'individuals supported with NFIs',
    cashForRentSubmissions: 'families received Cash for rent',
    cashForRentIndividuals: 'individuals received Cash for rent',
    totalNFIs: 'total NFIs distributed',
    totalBabyKits: 'received with baby winter clothing and hygiene kits for children',
    totalWinterizationKits: 'received Winterisation support (blankets, baby winter clothing)',
  }
}

export class ServiceStats {

  constructor(
    // private ecrec: ServiceEcrec,
    // private legalAid: ServiceLegalAid,
    // private nfi: ServiceNfi,
  ) {
  }

  readonly getAll = Cache.request(async (filters: StatsFilters) => {
    // const [ecrec, legalAid, nfi] = await Promise.all([
    //   this.ecrec.getStats(filters).catch(() => ({
    //     msd: 3,
    //     vet: 32,
    //     sme: 12,
    //     micro: 57,
    //     womanTeaching: 130,
    //   })).then(translate(translations.ecrec)),
    //   this.legalAid.getStats(filters).then(translate(translations.legalAid)).catch(console.error),
    //   this.nfi.getStats(filters).then(translate(translations.nfis)).catch(_ => Promise.reject(`Failed to get NFI`))
    // ])
    // return `
    //   <h2>EcRec</h2>
    //   ${ecrec}
    //   <h2>Legal Aid</h2>
    //   ${legalAid}
    //   <h2>NFI / MPCA</h2>
    //   ${nfi}
    // `
  })

}
