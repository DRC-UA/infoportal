import {KoboSdk} from 'infoportal-common'
import {appConf} from './appConf'
import winston from 'winston'
import {PrismaClient} from '@prisma/client'

export const koboSdk = new KoboSdk({
  urlv1: appConf.kobo.urlV1 + '/api/v1',
  urlv2: appConf.kobo.url + '/api',
  token: appConf.kobo.token,
  log: winston.createLogger(),
});

(async () => {
  const prisma = new PrismaClient()
  const users = await prisma.user.findMany({where: {name: ''}})
  users.map(_ => _.name)
})()