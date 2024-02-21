import {ApiClient} from '../ApiClient'

export class NfiMPcaSdk {
  constructor(private api: ApiClient) {
    
  }

  readonly index = () => {
    return this.api.get(`/nfi`)
  }
}
