import {ApiClient} from '@/core/sdk/server/ApiClient'
import {KoboMetaHelper} from '@/core/sdk/server/kobo-meta/KoboUnified'
import {ApiPaginate, ApiSdkUtils} from '@/core/sdk/server/_core/ApiSdkUtils'
import {IKoboMeta} from '@infoportal-common'

export class KoboMetaSdk {

  constructor(private client: ApiClient) {
  }

  readonly search = (): Promise<ApiPaginate<IKoboMeta>> => {
    return this.client.post(`/kobo-unified/search`)
      .then(ApiSdkUtils.mapPaginate(KoboMetaHelper.mapEntity))
  }
}