import {ApiClient} from '../ApiClient'
import {KoboServer} from './Kobo'

export class KoboServerSdk {

  constructor(private client: ApiClient) {
  }

  readonly getAll = () => {
    return this.client.get<KoboServer[]>(`/kobo/server`)
  }
}
