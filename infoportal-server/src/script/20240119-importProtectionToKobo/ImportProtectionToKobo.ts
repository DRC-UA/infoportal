import {KoboSdkGenerator} from '../../feature/kobo/KoboSdkGenerator'
import {PrismaClient} from '@prisma/client'
import fs from 'fs'
import {appConf} from '../../core/conf/AppConf'
import * as csvToJson from 'csvtojson'
import {PromisePool} from '@supercharge/promise-pool'
import {Enum, fnSwitch, Seq, seq} from '@alexandreannic/ts-utils'
import {ImportPssCej} from './ImporterPssCej'
import {ImporterGroupSessionCej} from './ImporterGroupSessionCej'
import {scriptConf} from '../ScriptConf'

(async () => {
  const config = {
    server: 'prod',
    importConcurrency: 2,
    baseFilePath: '/src/script/2024-01-19-importProtectionToKobo/files/',
    fileName: {
      groupSessionCej: 'group-session-cej.csv',
      groupSessionHrk: 'group-session-hrk.csv',
      groupSessionLwo: 'group-session-lwo.csv',
      pssCej: 'pss-cej.csv',
      pssLwo: 'pss-lwo.csv',
    },
    importComment: (i: number) => `Imported programmatically from CSV tracker. Index: ${i}`
  } as const
  const serverConfig = Object.freeze({
    prod: {
      groupSessionId: 'a8Tn94arrSaH2FQBhUa9Zo',
      pssId: 'a52hN5iiCW73mxqqfmEAfp'
    },
    dev: {
      groupSessionId: 'aMCHFcQ8TkymRqmPz2M3Do',
      pssId: 'aPoqNpPkwfUy4HLaJ7Y7v9'
    },
  })[config.server]

  const prisma = new PrismaClient()

  const sdk = await new KoboSdkGenerator(prisma).getV1(scriptConf.kobo[config.server].serverId)

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
        const res = await sdk.submit({
          formId,
          data: activity(j, i),
        })
        console.log(i, res.message ?? res.error)
      } catch (e: any) {
        console.error(e, activity(j, i))
      }
    })
  }

  // await submit({
  //   filePath: config.fileName.pssLwo,
  //   formId: serverConfig.pssId,
  //   activity: (csv, i) => ImportPssLwo.map(csv, config.importComment(i)),
  // })
  // await submit({
  //   filePath: config.fileName.groupSessionLwo,
  //   formId: serverConfig.groupSessionId,
  //   activity: (csv, i) => ImporterGroupSessionLwo.map(csv, config.importComment(i)),
  // })
  // await submit<ImporterGroupSessionHrk.Csv>({
  //   filePath: config.fileName.groupSessionHrk,
  //   formId: serverConfig.groupSessionId,
  //   activity: (csv, i) => ImporterGroupSessionHrk.map(csv, config.importComment((i))),
  // })
  await submit<ImportPssCej.Csv, ImportPssCej.GroupedRow>({
    filePath: config.fileName.pssCej,
    formId: serverConfig.pssId,
    transform: (data) => {
      const gb = data.groupBy(_ => _['Session No'])
      return Enum.values(gb).map((rows) => {
        return {
          ...rows[0],
          participants: rows.map(_ => ({
            hh_char_hh_det_age: +_.Age,
            hh_char_hh_det_gender: fnSwitch(_.Gender, {
              Male: 'male',
              Female: 'female',
            }, () => 'unspecified'),
            hh_char_hh_det_status: fnSwitch(_.Status, {
              'Conflict affected': 'unspec',
              'IDP': 'idp',
              'Refugee': 'other',
              'Host community': 'other',
              'IDP Returnee': 'returnee',
              '': 'other'
            }),
          }))
        }
      })
    },
    activity: (csv, i) => ImportPssCej.map(csv, config.importComment(i)),
  })
  await submit<ImporterGroupSessionCej.Csv, ImporterGroupSessionCej.GroupedRow>({
    filePath: config.fileName.groupSessionCej,
    formId: serverConfig.groupSessionId,
    transform: (data) => {
      const gb = data.groupBy(_ => _['Session No'])
      return Enum.values(gb).map((rows) => {
        return {
          ...rows[0],
          participants: rows.map(_ => ({
            hh_char_hh_det_age: +_.Age,
            hh_char_hh_det_gender: fnSwitch(_.Gender, {
              Male: 'male',
              Female: 'female',
            }),
            hh_char_hh_det_status: fnSwitch(_.Status, {
              'Conflict affected': 'unspec',
              'IDP': 'idp',
              'Host community': 'other',
            }),
          }))
        }
      })
    },
    activity: (csv, i) => ImporterGroupSessionCej.map(csv, config.importComment(i)),
  })
})()