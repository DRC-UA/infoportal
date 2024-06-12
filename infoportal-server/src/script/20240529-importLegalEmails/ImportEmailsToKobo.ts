import {KoboSdkGenerator} from '../../feature/kobo/KoboSdkGenerator'
import {PrismaClient} from '@prisma/client'
import fs from 'fs'
import {appConf} from '../../core/conf/AppConf'
import * as csvToJson from 'csvtojson'
import {PromisePool} from '@supercharge/promise-pool'
import {Seq, seq} from '@alexandreannic/ts-utils'
import {scriptConf} from '../ScriptConf'

export const ImportEmailsToKobo = (async () => {
  const config = {
    server: 'prod',
    importConcurrency: 2,
    baseFilePath: '/src/script/20240529-importLegalEmails/files/',
    fileNames: [
      'alerts.csv',
      'alertsExpansion',
      'distribution',
    ],
    importComment: (i: number) => `Imported programmatically from CSV tracker. Index: ${i}`
  } as const

  const serverConfig = Object.freeze({
    prod: {
      alertMailingListId: 'atB9Q6Q2Gt6t9dzdabYRZB'
    },
    dev: {
      alertMailingListId: 'atB9Q6Q2Gt6t9dzdabYRZB'
    },
  })[config.server]

  const prisma = new PrismaClient()

  const sdk = await new KoboSdkGenerator(prisma).get(scriptConf.kobo[config.server].serverId)

  const submit = async <TCsv, TCsvTransform = any>({
    formId,
    activity,
    filePath,
    transform,
  }: {
    transform?: (_: Seq<TCsv>) => TCsvTransform[]
    formId: string,
    activity: (csv: TCsvTransform, i: number) => any,
    filePath: string
  }): Promise<void> => {
    console.log(`Submit ${filePath}`)
    const stream = fs.createReadStream(appConf.rootProjectDir + config.baseFilePath + filePath)
    const json: TCsvTransform[] = await csvToJson.default({delimiter: ';'}).fromStream(stream).then(_ => {
      return transform ? transform(seq(_)) : seq(_)
    })
    await PromisePool.withConcurrency(config.importConcurrency).for(json).process(async (j, i) => {
      try {
        const res = await sdk.v1.submit({
          formId,
          data: activity(j, i),
        })
        console.log(i, res.message ?? res.error)
      } catch (e: any) {
        console.error(e, activity(j, i))
      }
    })
  }
  for (const fileName of config.fileNames) {
    await submit<{email: string}>({
      filePath: fileName,
      formId: serverConfig.alertMailingListId,
      transform: (data) => data.map(row => ({email: row.email})),
      activity: (csv, i) => ({
        email: csv.email,
        comment: config.importComment(i),
      }),
    })
  }
})()