import nodemailer = require('nodemailer')
import {appConf} from './conf/AppConf'
import {generateEntryLink} from './LinkGenerator'

class EmailHelper {
  private transporter: nodemailer.Transporter

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.ukr.net',
      port: 465,
      secure: true,
      auth: {
        user: appConf.email.user,
        pass: appConf.email.password,
      },
    })
  }

  public async send(to: string, subject: string, formId: string, answerId: string): Promise<void> {
    const link = generateEntryLink(formId, answerId)
    const mailOptions = {
      from: appConf.email.user,
      to,
      subject,
      html: `A new <a href="${link}">request</a> has been added with you as the focal point.`,
    }

    try {
      await this.transporter.sendMail(mailOptions)
      console.log(`Email sent to ${to}`)
    } catch (error) {
      console.error('Failed to send email:', error)
      throw error
    }
  }
}

export default EmailHelper