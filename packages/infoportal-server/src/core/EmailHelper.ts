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
    cc,
    createdBy,
    context,
    tags,
  }: {
    cc?: string[]
    createdBy?: string
    context: string
    html: string,
    to: string | string[],
    subject: string,
    tags?: any
  }): Promise<void> {
    const ensureStr = (_: string | string[]): string => Array.isArray(_) ? _.join(' ') : _
    try {
      await this.transporter.sendMail({
        from: appConf.email.address,
        cc,
        to,
        subject,
        html,
      })
      this.log.info(`Send email [${context}] ${JSON.stringify({subject, to: ensureStr(to), tags})}.`)
      await this.prisma.emailOutBox.create({
        data: {
          to: ensureStr(to),
          subject,
          content: html,
          createdBy,
          context,
          cc,
          tags,
          deliveredAt: new Date(),
        }
      })
    } catch (error) {
      this.log.error('Failed to send email:', error)
      await this.prisma.emailOutBox.create({
        data: {
          cc,
          to: ensureStr(to),
          subject,
          content: html,
          createdBy,
          context,
          tags,
        },
      })
    }
  }
}
