import {PrismaClient} from '@prisma/client'
import {KoboSdkGenerator} from '../../feature/kobo/KoboSdkGenerator'
import {scriptConf} from '../ScriptConf'
import {ImportMpca} from './ImporterMpca'
import {KoboAnswer, Meal_pdmStandardised} from '@infoportal-common'
import * as process from 'process'
import dataMap = ImportMpca.dataMap


export const importMpcaToCash = (async () => {
  const config = {
    server: 'dev',
    importComment: (i: number) => `Imported programmatically from tracker. Index: ${i}`
  } as const

  const serverConfig = Object.freeze({
    prod: {
      mpcaId: 'aCWKwfvJ6F48HxUZTrr9L7',
      cashId: 'aEKoPVd36PLRrmqWgk42DG'
    },
    dev: {
      mpcaId: 'aCWKwfvJ6F48HxUZTrr9L7',
      cashId: 'aEKoPVd36PLRrmqWgk42DG'
    },
  })[config.server]

  const prisma = new PrismaClient()
  const sdk = await new KoboSdkGenerator(prisma).get(scriptConf.kobo[config.server].serverId)

  const oldData = await sdk.v2.getAnswers(serverConfig.mpcaId).then(_ => _.data as KoboAnswer<Meal_pdmStandardised.T>[])
  const mappedData = oldData.map(_ => dataMap(_.answers))

  const submit = async <TData>({
    formId,
    data,
    activity,
  }: {
    formId: string;
    data: TData[];
    activity: (item: TData, i: number) => any;
  }): Promise<void> => {
    console.log(`Submitting data to formId ${formId}`)
    for (const [i, item] of data.entries()) {
      try {
        const res = await sdk.v1.submit({
          formId,
          data: activity(item, i),
        })
        console.log(`Record ${i}:`, res.message ?? res.error)
      } catch (e: any) {
        console.error(`Error with record ${i}:`, e, activity(item, i))
      }
      if (i === 1) process.exit(0)
    }
    console.log('Data submission completed.')
  }

  await submit<Record<string, any>>({
    formId: serverConfig.cashId,
    data: mappedData,
    activity: (item, i) => ({
      // ...item,
      'metadata/ben_det_raion': 'zolochivskyi',
      // 'aap/comment': config.importComment(i),
    }),
  })

  console.log('Import process completed.')
})