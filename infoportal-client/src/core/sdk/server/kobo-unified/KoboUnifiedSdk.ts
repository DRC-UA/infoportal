import {ApiClient} from '@/core/sdk/server/ApiClient'
import {KoboUnifiedHelper} from '@/core/sdk/server/kobo-unified/KoboUnified'
import {ApiPaginate, ApiSdkUtils} from '@/core/sdk/server/_core/ApiSdkUtils'
import {KoboUnified} from '@infoportal-common'

export class KoboUnifiedSdk {

  constructor(private client: ApiClient) {
  }

  readonly search = (): Promise<ApiPaginate<KoboUnified>> => {
    return this.client.post(`/kobo-unified/search`)
      .then(ApiSdkUtils.mapPaginate(KoboUnifiedHelper.mapEntity))
  }
}