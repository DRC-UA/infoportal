import {defaultValue, env, int, required} from '@axanc/ts-utils'
import * as dotenv from 'dotenv'

dotenv.config()

const e = env(process.env)

export const appConf = {
  rootProjectDir: e(required)('ROOT_PROJECT_DIR'),
  db: {
    maxConcurrency: e(int, defaultValue(50))('DATABASE_MAX_CONCURRENCY'),
    url: e(required)('DATABASE_URL'),
    backgrupUrl: e()('DATABASE_URL_BACKUP'),
  },
  activityInfo: {
    apiToken: e(required)('ACTIVITY_INFO_API_TOKEN'),
  },
  kobo: {
    drc: {
      url: e(required)('KOBO_DRC_URL'),
      urlV1: e(required)('KOBO_DRC_URLV1'),
      token: e(required)('KOBO_DRC_TOKEN'),
    },
    // kf: {
    //   url: e(required)('KOBO_KF_URL'),
    //   urlV1: e(required)('KOBO_KF_URLV1'),
    //   token: e(required)('KOBO_KF_TOKEN'),
    // },
  },
}

export type AppConf = typeof appConf
