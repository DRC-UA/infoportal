import {getDrcSuggestion, WfpDeduplication} from 'infoportal-common'

import {ApiClient} from '@/core/sdk/server/ApiClient'
import {ApiPaginate} from '@/core/sdk/server/_core/ApiSdkUtils'

interface WfpDeduplicationSearch {
  limit?: number
  offset?: number
  taxId?: string[]
  createdAtStart?: Date
  createdAtEnd?: Date
}

export class WfpDeduplicationSdk {
  constructor(private client: ApiClient) {}

  readonly refresh = () => {
    return this.client.post(`/wfp-deduplication/refresh`)
  }

  readonly uploadTaxIdsMapping = (file: File) => {
    return this.client.postFile(`/wfp-deduplication/upload-taxid`, {file})
  }

  readonly search = async (filters: WfpDeduplicationSearch = {}): Promise<ApiPaginate<WfpDeduplication>> => {
    return this.client.post<ApiPaginate<any>>(`/wfp-deduplication/search`, {body: filters}).then((response) => ({
      ...response,
      data: response.data.map(WfpDeduplicationSdk.map),
    }))
  }

  static readonly map = (
    record: Record<keyof WfpDeduplication, any> & {beneficiary?: {taxId?: string}},
  ): WfpDeduplication => {
    record.fileName = record.fileName?.replace('.gpg', '')
    record.createdAt = new Date(record.createdAt)
    record.validFrom = new Date(record.validFrom)
    record.expiry = new Date(record.expiry)
    record.existingStart = record.existingStart ? new Date(record.existingStart) : undefined
    record.existingEnd = record.existingEnd ? new Date(record.existingEnd) : undefined
    record.taxId = record.beneficiary?.taxId
    const {suggestion, suggestionDurationInMonths} = getDrcSuggestion(record)
    record.suggestion = suggestion
    record.suggestionDurationInMonths = suggestionDurationInMonths
    return record
  }
}
