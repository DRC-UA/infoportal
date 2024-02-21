import {EcrecGetDataFilters} from '../../feature/connector/ecrec/EcrecSdkType'
import {EcrecSdk} from '../../feature/connector/ecrec/EcrecSdk'
import {StatsFilters} from './ServiceStats'

export class ServiceEcrec {

  constructor(private sdk: EcrecSdk) {
  }

  readonly getStats = async (statsFilters: StatsFilters) => {
    const filters: Partial<EcrecGetDataFilters<any>> = {
      fundingDateStart: statsFilters.start,
      fundingDateEnd: statsFilters.end,
      funded: true,
      limit: 100
    }
    return await Promise.all([
      this.sdk.fetchMsd(filters),
      this.sdk.fetchVet(filters),
      this.sdk.fetchSme(filters),
      this.sdk.fetchMicro(filters),
    ]).then(_ => _.map(a => a.totalCount))
      .then(([msd, vet, sme, micro]) => ({msd, vet, sme, micro, womanTeaching: 130}))
  }
}
