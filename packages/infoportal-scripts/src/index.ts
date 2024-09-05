import {KoboSdk} from 'infoportal-common'
import {appConf} from './appConf'
import winston from 'winston'
import {BuildKoboType} from './kobo/BuildTypeKobo'

export const koboSdk = new KoboSdk({
  urlv1: appConf.kobo.urlV1 + '/api/v1',
  urlv2: appConf.kobo.url + '/api',
  token: appConf.kobo.token,
  log: winston.createLogger(),
});

(async () => {
  await new BuildKoboType().buildAll()
})()