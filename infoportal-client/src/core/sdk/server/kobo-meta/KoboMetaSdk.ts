import {ApiClient} from '@/core/sdk/server/ApiClient'
import {KoboMetaHelper, KoboMetaSearchParans} from '@/core/sdk/server/kobo-meta/KoboMeta'
import {ApiPaginate, ApiSdkUtils} from '@/core/sdk/server/_core/ApiSdkUtils'
import {IKoboMeta} from '@infoportal-common'

export class KoboMetaSdk {

  constructor(private client: ApiClient) {
  }

  readonly search = <TTag = any>(body: KoboMetaSearchParans = {}): Promise<ApiPaginate<IKoboMeta<TTag>>> => {
    return this.client.post(`/kobo-meta/search`, {body})
      .then(ApiSdkUtils.mapPaginate(KoboMetaHelper.mapEntity))
  }

  readonly sync = (): Promise<void> => {
    return this.client.post(`/kobo-meta/sync`)
  }

  readonly killCache = (): Promise<void> => {
    return this.client.post(`/kobo-meta/kill-cache`)
  }
}