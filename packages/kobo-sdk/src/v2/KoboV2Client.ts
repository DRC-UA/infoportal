import {Logger} from '../Kobo'
import {ApiClient} from '../api-client/ApiClient'
import {KoboV2ClientSubmission} from './KoboV2ClientSubmission'
import {KoboV2ClientForm} from './KoboV2ClientForm'
import {KoboV2ClientHook} from './KoboV2ClientHook'

export class KoboV2Client {
  constructor(
    private api: ApiClient,
    private log: Logger,
  ) {
    this.submission = new KoboV2ClientSubmission(api, log, this)
    this.form = new KoboV2ClientForm(api, log)
    this.hook = new KoboV2ClientHook(api, log)
  }

  readonly submission: KoboV2ClientSubmission
  readonly form: KoboV2ClientForm
  readonly hook: KoboV2ClientHook
}
