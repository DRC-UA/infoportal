import winston from 'winston'
import {FixKoboMigration} from './kobo-migration/20250113-fixKoboMigration'

import {KoboClient} from 'kobo-sdk'

import {appConf} from './appConf'
// import {BuildKoboType} from './kobo/BuildTypeKobo'
// import {FixKoboMigration} from './kobo-migration/20250113-fixKoboMigration'

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
  await FixKoboMigration.resetWrongMigration()
  // await FixKoboMigration.MissingSubmissions.run()
  // await ActivityInfoBuildType.fslc()
  // await new BuildKoboType().build('ecrec_msme_bha388')
  // await new BuildKoboType().build('ecrec_vet2_dmfa')
  // await new BuildKoboType().build('ecrec_msmeGrantReg')
})()
