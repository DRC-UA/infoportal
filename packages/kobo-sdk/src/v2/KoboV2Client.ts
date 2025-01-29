import {Logger} from '../Kobo'
import {ApiClient} from '../api-client/ApiClient'
import {KoboV2ClientSubmission} from './KoboV2ClientSubmission'
import {KoboV2ClientSurvey} from './KoboV2ClientSurvey'
import {KoboV2ClientHook} from './KoboV2ClientHook'

export class KoboV2Client {
  constructor(
    private api: ApiClient,
    private log: Logger,
  ) {
    this.submission = new KoboV2ClientSubmission(api, log, this)
    this.survey = new KoboV2ClientSurvey(api, log)
    this.hook = new KoboV2ClientHook(api, log)
  }

  readonly submission: KoboV2ClientSubmission
  readonly survey: KoboV2ClientSurvey
  readonly hook: KoboV2ClientHook
}
