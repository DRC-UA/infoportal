import {appendSearchQuery, type RiskEducationDirectSessionResponseData} from 'infoportal-common'

import {ApiClient} from '@/core/sdk/server/ApiClient'
import type {AiMinactionSqlType} from '@/core/sdk/server/hdp/HdpSdkType'

export class HdpSdk {
  constructor(private client: ApiClient) {}

  readonly fetchAiRiskEducation = (): Promise<AiMinactionSqlType[]> => {
    return this.client.get(`/hdp/ai-risk-education`)
  }

  readonly fetchRiskEducationFilters = () => {
    return this.client.get('/hdp/risk-education-filters')
  }

  readonly fetchRiskEducation = (
    query?: Record<string, unknown> | null | undefined,
  ): Promise<RiskEducationDirectSessionResponseData> => {
    return this.client.get(
      appendSearchQuery(`/hdp/risk-education`, {
        ...query,
        filters: {...query.filters},
      }),
    )
  }
}
