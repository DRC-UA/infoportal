import {ApiClient} from '../api-client/ApiClient'
import {Logger} from '../Kobo'
import {KoboV1Form} from './KoboV1'

export class KoboV1ClientForm {
  constructor(
    private api: ApiClient,
    private log: Logger,
  ) {}

  readonly getAll = async (): Promise<KoboV1Form[]> => {
    return this.api.get(`/forms`)
  }
}
