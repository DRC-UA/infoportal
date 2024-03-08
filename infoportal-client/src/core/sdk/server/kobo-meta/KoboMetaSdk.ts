import {ApiClient} from '@/core/sdk/server/ApiClient'
import {KoboMetaHelper, KoboMetaSearchParans} from '@/core/sdk/server/kobo-meta/KoboMeta'
import {ApiPaginate, ApiSdkUtils} from '@/core/sdk/server/_core/ApiSdkUtils'
import {IKoboMeta} from '@infoportal-common'

export class KoboMetaSdk {

  constructor(private client: ApiClient) {
  }

  readonly search = (body: KoboMetaSearchParans = {}): Promise<ApiPaginate<IKoboMeta>> => {
    return this.client.post(`/kobo-unified/search`, {body})
      .then(ApiSdkUtils.mapPaginate(KoboMetaHelper.mapEntity))
  }
}