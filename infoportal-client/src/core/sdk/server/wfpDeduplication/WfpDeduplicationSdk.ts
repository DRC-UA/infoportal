import {ApiClient} from '@/core/sdk/server/ApiClient'
import {WfpDeduplication} from '@/core/sdk/server/wfpDeduplication/WfpDeduplication'

import {ApiPaginate} from '@/core/sdk/server/_core/ApiSdkUtils'

interface WfpDeduplicationSearch {
  limit?: number
  offset?: number
  taxId?: string[]
  createdAtStart?: Date
  createdAtEnd?: Date
}

export class WfpDeduplicationSdk {

  constructor(private client: ApiClient) {
  }

  readonly refresh = () => {
    return this.client.post(`/wfp-deduplication/refresh`)
  }

  readonly uploadTaxIdsMapping = (file: File) => {
    return this.client.postFile(`/wfp-deduplication/upload-taxid`, {file})
  }

  readonly search = (filters: WfpDeduplicationSearch = {}): Promise<ApiPaginate<WfpDeduplication>> => {
    return this.client.post<ApiPaginate<any>>(`/wfp-deduplication/search`, {body: filters}).then(_ => ({
      ..._,
      data: _.data.map(WfpDeduplication.map),
    }))
  }
}