import {logger} from '../helper/Logger'
import {GlobalEvent} from './GlobalEvent'
import sendEmail from './EmailHelper'

const log = logger('EmailService')

class EmailService {
  constructor(private event = GlobalEvent.Class.getInstance()) {
    this.initializeListeners()
  }

  private initializeListeners() {
    this.event.listen(GlobalEvent.Event.KOBO_TAG_EDITED, this.handleTagEdited)
  }

  private handleTagEdited = async (params: GlobalEvent.KoboTagEditedParams) => {
    const {formId, answerIds, tags} = params

    if (tags.focalPointEmail) {
      try {
        await sendEmail(
          tags.focalPointEmail,
          'New CFM Request',
          'A new request has been added with you as the focal point.'
        )
        log.info(`Email sent to ${tags.focalPointEmail} for form ${formId} and answers ${answerIds.join(', ')}`)
      } catch (error) {
        log.error(`Failed to send email to ${tags.focalPointEmail} for form ${formId} and answers ${answerIds.join(', ')}`, error)
      }
    }
  }
}

export default EmailService