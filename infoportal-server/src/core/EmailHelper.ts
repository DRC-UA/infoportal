import nodemailer from 'nodemailer'
import {appConf} from './conf/AppConf'
import {FrontEndSiteMap} from './FrontEndSiteMap'
import {app} from '../index'

export class EmailHelper {

  constructor(
    private conf = appConf,
    private siteMap = new FrontEndSiteMap(),
    private log = app.logger('EmailHelper'),
    private transporter = nodemailer.createTransport({
      host: conf.email.host,
      port: conf.email.port,
      secure: true,
      auth: {
        user: conf.email.address,
        pass: conf.email.password,
      },
    })
  ) {
  }

  public async send({
    to,
    subject,
    html,
  }: {
    html: string,
    to: string,
    subject: string,
  }): Promise<void> {
    const mailOptions = {
      from: appConf.email.address,
      to,
      subject,
      html,
    }
    try {
      await this.transporter.sendMail(mailOptions)
      // this.log.info(`Email sent to ${to}`)
    } catch (error) {
      this.log.error('Failed to send email:', error)
      throw error
    }
  }
}
