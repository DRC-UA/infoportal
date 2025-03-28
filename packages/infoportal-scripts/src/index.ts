import {KoboClient} from 'kobo-sdk'
import {appConf} from './appConf'
import winston from 'winston'
import {ActivityInfoBuildType} from './ActivityInfoBuildType'
import {FixKoboMigration} from './kobo-migration/20250113-fixKoboMigration'
import {BuildKoboType} from './kobo/BuildTypeKobo'

export const koboSdkHumanitarian = new KoboClient({
  urlv1: appConf.kobo.humanitarian.urlV1,
  urlv2: appConf.kobo.humanitarian.url,
  token: appConf.kobo.humanitarian.token,
  log: winston.createLogger(),
})

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
  // await new ActivityInfoBuildType().buildAll()
  // await new BuildKoboType().build('ecrec_msme_bha388')
  // await new BuildKoboType().build('ecrec_vet_bha388')
})()
