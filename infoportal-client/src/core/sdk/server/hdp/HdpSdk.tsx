import {ApiClient} from '@/core/sdk/server/ApiClient'


export class HdpSdk {

  constructor(private client: ApiClient) {
  }

  readonly fetchRiskEducation = (): Promise<any[]> => {
    return this.client.get(`/hdp/risk-education`)
  }
}

