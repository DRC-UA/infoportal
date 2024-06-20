import {logger, Logger} from '../helper/Logger'
import {GlobalEvent} from './GlobalEvent'
import EmailHelper from './EmailHelper'
import {KoboIndex} from '@infoportal-common'

class EmailService {

  private log: Logger

  constructor(
    private event = GlobalEvent.Class.getInstance(),
    private emailHelper: EmailHelper,
  ) {
    this.log = logger('EmailService')
    this.initializeListeners()
  }

  private initializeListeners() {
    this.event.listen(GlobalEvent.Event.KOBO_TAG_EDITED, this.handleTagEdited)
  }

  private handleTagEdited = async (params: GlobalEvent.KoboTagEditedParams) => {
    const {formId, answerIds, tags} = params

    if (this.isCfmForm(formId) && tags.focalPointEmail) {
      await this.sendCfmNotification(tags.focalPointEmail, formId, answerIds)
    }
  }

  private isCfmForm(formId: string): boolean {
    const cfmFormIds = [
      KoboIndex.byName('meal_cfmInternal').id,
      KoboIndex.byName('meal_cfmExternal').id,
    ]
    return cfmFormIds.includes(formId)
  }

  private async sendCfmNotification(email: string, formId: string, answerIds: string[]) {
    try {
      for (const answerId of answerIds) {
        await this.emailHelper.send(
          email,
          'New CFM Request',
          formId,
          answerId
        )
        this.log.info(`Email sent to ${email} for form ${formId} and answer ${answerId}`)
      }
    } catch (error) {
      this.log.error(`Failed to send email to ${email} for form ${formId} and answers ${answerIds.join(', ')}`, error)
    }
  }
}

export default EmailService