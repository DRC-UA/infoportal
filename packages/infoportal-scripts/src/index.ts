import {KoboClient} from 'kobo-sdk'
import winston from 'winston'

import {appConf} from './appConf'
import {ActivityInfoBuildType} from './ActivityInfoBuildType'
import {FixKoboMigration} from './kobo-migration/20250113-fixKoboMigration'
import {BuildKoboType} from './kobo/BuildTypeKobo'

export const koboSdkDrc = new KoboClient({
  urlv1: appConf.kobo.drc.urlV1,
  urlv2: appConf.kobo.drc.url,
  token: appConf.kobo.drc.token,
  log: winston.createLogger(),
})
;(async () => {
  // await FixKoboMigration.resetWrongMigration()
  // await FixKoboMigration.MissingSubmissions.run()
  // await FixKoboMigration.Tags.run()
  await new ActivityInfoBuildType().buildAll()
  // await new BuildKoboType().build('cbp_pre_post')
})()
