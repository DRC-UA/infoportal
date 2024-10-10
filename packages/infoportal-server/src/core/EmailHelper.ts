import nodemailer from 'nodemailer'
import {appConf} from './conf/AppConf'
import {app} from '../index'
import {PrismaClient} from '@prisma/client'

export class EmailHelper {

  constructor(
    private prisma = new PrismaClient(),
    private conf = appConf,
    private log = app.logger('EmailHelper'),
    private transporter = nodemailer.createTransport({
      host: conf.email.host,
      port: conf.email.port,
      secure: true,
      pool: true,
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
    createdBy,
    context,
  }: {
    createdBy?: string
    context: string
    html: string,
    to: string,
    subject: string,
  }): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: appConf.email.address,
        to,
        subject,
        html,
      })
      this.prisma.emailOutBox.create({
        data: {
          to, subject, content: html,
          createdBy, context,
          deliveredAt: new Date(),
        }
      })
    } catch (error) {
      this.log.error('Failed to send email:', error)
      await this.prisma.emailOutBox.create({
        data: {
          to, subject, content: html,
          createdBy, context,
        },
      })
      throw error
    }
  }
}
