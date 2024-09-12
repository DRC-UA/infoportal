import {KoboSdk} from 'infoportal-common'
import {appConf} from './appConf'
import winston from 'winston'
import {ActivityInfoBuildType} from './ai/BuildTypeActivityInfo'
import {BuildKoboType} from './kobo/BuildTypeKobo'

export const koboSdk = new KoboSdk({
  urlv1: appConf.kobo.urlV1 + '/api/v1',
  urlv2: appConf.kobo.url + '/api',
  token: appConf.kobo.token,
  log: winston.createLogger(),
});

(async () => {
  await ActivityInfoBuildType.fslc()
  // await new BuildKoboType().buildAll()
})()

// With the release of RAIS+, it has been asked to collect Tax ID for each HH individual. Should we then submit them all to BB?