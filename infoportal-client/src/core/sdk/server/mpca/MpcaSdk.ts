import {ApiClient} from '../ApiClient'
import {KoboAnswerFilter} from '@/core/sdk/server/kobo/KoboAnswerSdk'
import {ApiPaginate, ApiSdkUtils} from '@/core/sdk/server/_core/ApiSdkUtils'
import {MpcaEntity, MpcaHelper} from '@/core/sdk/server/mpca/MpcaEntity'

export class MpcaSdk {
  constructor(private client: ApiClient) {
  }

  readonly search = (filters: KoboAnswerFilter = {}): Promise<ApiPaginate<MpcaEntity>> => {
    return this.client.post(`/mpca/search`, {body: {filters}}).then(ApiSdkUtils.mapPaginate(MpcaHelper.map))
  }

  readonly refresh = (): Promise<void> => {
    return this.client.post(`/mpca/refresh`)
  }

}
