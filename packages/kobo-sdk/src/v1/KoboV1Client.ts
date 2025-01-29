import {Logger} from '../Kobo'
import {ApiClient} from '../api-client/ApiClient'
import {KoboV1ClientSurvey} from './KoboV1ClientSurvey'
import {KoboV1ClientSubmission} from './KoboV1ClientSubmission'

export class KoboV1Client {
  constructor(
    private api: ApiClient,
    private log: Logger,
  ) {
    this.survey = new KoboV1ClientSurvey(api, log)
    this.submissions = new KoboV1ClientSubmission(api, this, log)
  }

  readonly survey: KoboV1ClientSurvey
  readonly submissions: KoboV1ClientSubmission
}
