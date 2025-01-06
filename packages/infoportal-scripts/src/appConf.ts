import {defaultValue, env, int, required} from '@alexandreannic/ts-utils'
import * as dotenv from 'dotenv'

dotenv.config()

const e = env(process.env)

export const appConf = {
  rootProjectDir: e(required)('ROOT_PROJECT_DIR'),
  db: {
    maxConcurrency: e(int, defaultValue(50))('DATABASE_MAX_CONCURRENCY'),
    url: e(required)('DATABASE_URL'),
  },
  activityInfo: {
    apiToken: e(required)('ACTIVITY_INFO_API_TOKEN'),
  },
  //   host: e(required)('DB_HOST'),
  //   user: e(required)('DB_USER'),
  //   database: e(required)('DB_NAME'),
  //   password: e(required)('DB_PASSWORD'),
  //   port: e(int, defaultValue(5432))('DB_PORT')
  // },
  kobo: {
    url: e(defaultValue('https://kobo.humanitarianresponse.info'))('KOBO_URL'),
    urlV1: e(defaultValue('https://kc-eu.kobotoolbox.org'))('KOBO_URLV1'),
    token: e(required)('KOBO_TOKEN'),
  },
}

export type AppConf = typeof appConf
