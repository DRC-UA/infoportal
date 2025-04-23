import {appendSearchQuery, type RiskEducationDirectSessionResponseData} from 'infoportal-common'

import {ApiClient} from '@/core/sdk/server/ApiClient'
import type {AiMinactionSqlType} from '@/core/sdk/server/hdp/HdpSdkType'

export class HdpSdk {
  constructor(private client: ApiClient) {}

  readonly fetchAiRiskEducation = (): Promise<AiMinactionSqlType[]> => {
    return this.client.get(`/hdp/ai-risk-education`)
  }

  readonly fetchRiskEducation = (
    query?: Record<string, unknown> | null | undefined,
  ): Promise<RiskEducationDirectSessionResponseData> => {
    return this.client.get(
      appendSearchQuery(`/hdp/risk-education`, {
        ...query,
        // @ts-ignore
        filters: {...query.filters},
      }),
    )
  }
}
