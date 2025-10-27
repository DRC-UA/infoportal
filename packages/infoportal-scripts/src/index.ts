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
  // await new ActivityInfoBuildType().buildAll()

  // MEMO: groups nested twice are treated as one-level array, so the typing and mapping for HH members shelter_commonSpaces is fixed manually
  ;(() => {
    console.log("PLEASE KEEP MANUAL CHANGES FOR THE SHELTER'S COMMON SPACES FOR THE REASON DESCRIBED ABOVE ")
  })()
  // await new BuildKoboType().build('shelter_commonSpaces')
})()
