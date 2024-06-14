import nodemailer = require('nodemailer')
import {appConf} from './conf/AppConf'

class EmailHelper {
  private transporter: nodemailer.Transporter

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: appConf.email.user,
        pass: appConf.email.password,
      },
    })
  }

  public async send(to: string, subject: string, text: string): Promise<void> {
    const mailOptions = {
      from: appConf.email.user,
      to,
      subject,
      text,
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