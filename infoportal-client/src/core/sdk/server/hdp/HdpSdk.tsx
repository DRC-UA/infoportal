import {ApiClient} from '@/core/sdk/server/ApiClient'
import {AiMinactionSqlType} from '@/core/sdk/server/hdp/HdpSdkType'

export class HdpSdk {

  constructor(private client: ApiClient) {
  }

  readonly fetchRiskEducation = (): Promise<AiMinactionSqlType[]> => {
    return this.client.get(`/hdp/risk-education`)
  }
}

