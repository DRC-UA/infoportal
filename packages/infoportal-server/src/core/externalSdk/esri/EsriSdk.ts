import {ApplicationCredentialsManager} from '@esri/arcgis-rest-request'
import {searchItems, SearchQueryBuilder, type ISearchOptions} from '@esri/arcgis-rest-portal'

import {appConf} from '../../conf/AppConf.js'

class EsriSdk {
  #authentication: ApplicationCredentialsManager
  #baseQuery: SearchQueryBuilder

  constructor() {
    this.#authentication = ApplicationCredentialsManager.fromCredentials({
      clientId: appConf.esri.arcGisClientId,
      clientSecret: appConf.esri.arcGisClientSecret,
      portal: appConf.esri.arcGisRestPath,
    })
    this.#baseQuery = new SearchQueryBuilder().match(appConf.esri.arcGisDrcId).in('orgid').clone()
  }

  readonly searchItems = async (optionsWithQuery: ISearchOptions) => {
    const {q, ...options} = optionsWithQuery

    return await searchItems({
      q: [this.#baseQuery.toParam(), q].filter(Boolean).join(' AND '),
      ...options,
      authentication: this.#authentication,
    })
  }
}

export {EsriSdk}
