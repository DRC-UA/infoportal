import {ApiClient} from '@/core/sdk/server/ApiClient'
import {getDrcSuggestion, WfpDeduplication} from 'infoportal-common'
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

  readonly search = (filters: WfpDeduplicationSearch = {}): Promise<ApiPaginate<WfpDeduplication>> => {
    return this.client.post<ApiPaginate<any>>(`/wfp-deduplication/search`, {body: filters}).then((_) => ({
      ..._,
      data: _.data.map(WfpDeduplicationSdk.map),
    }))
  }

  static readonly map = (
    _: Record<keyof WfpDeduplication, any> & {beneficiary?: {taxId?: string}},
  ): WfpDeduplication => {
    _.fileName = _.fileName?.replace('.gpg', '')
    _.createdAt = new Date(_.createdAt)
    _.validFrom = new Date(_.validFrom)
    _.expiry = new Date(_.expiry)
    _.existingStart = _.existingStart ? new Date(_.existingStart) : undefined
    _.existingEnd = _.existingEnd ? new Date(_.existingEnd) : undefined
    _.taxId = _.beneficiary?.taxId
    const {suggestion, suggestionDurationInMonths} = getDrcSuggestion(_)
    _.suggestion = suggestion
    _.suggestionDurationInMonths = suggestionDurationInMonths
    return _
  }
}
