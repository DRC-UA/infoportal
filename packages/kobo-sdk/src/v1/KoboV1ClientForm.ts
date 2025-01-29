import {ApiClient} from '../api-client/ApiClient'
import {Kobo, Logger} from '../Kobo'

export class KoboV1ClientForm {
  constructor(
    private api: ApiClient,
    private log: Logger,
  ) {}

  readonly getAll = async (): Promise<Kobo.V1.KoboV1Form[]> => {
    return this.api.get(`/forms`)
  }
}
