import {Logger} from '../Kobo'
import {ApiClient} from '../api-client/ApiClient'
import {KoboV1ClientForm} from './KoboV1ClientForm'
import {KoboV1ClientSubmission} from './KoboV1ClientSubmission'

export class KoboV1Client {
  constructor(
    private api: ApiClient,
    private log: Logger,
  ) {
    this.form = new KoboV1ClientForm(api, log)
    this.submission = new KoboV1ClientSubmission(api, this, log)
  }

  readonly form: KoboV1ClientForm
  readonly submission: KoboV1ClientSubmission
}
