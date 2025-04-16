import {ApiClient} from '@/core/sdk/server/ApiClient'
import {AiMinactionSqlType} from '@/core/sdk/server/hdp/HdpSdkType'

export class HdpSdk {
  constructor(private client: ApiClient) {}

  readonly fetchAiRiskEducation = (): Promise<AiMinactionSqlType[]> => {
    return this.client.get(`/hdp/ai-risk-education`)
  }

  readonly fetchRiskEducation = (): Promise<any[]> => {
    return this.client.get(`/hdp/risk-education`)
  }
}
