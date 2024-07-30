import {PrismaClient} from '@prisma/client'
import {KoboSdkGenerator} from '../../feature/kobo/KoboSdkGenerator'
import {scriptConf} from '../ScriptConf'
import {ImportMpca} from './ImporterMpca'
import {KoboAnswer, Meal_pdmStandardised} from '@infoportal-common'
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
  const mappedData = oldData.map(_ => dataMap(_))
  let done = 0
  for (let i = 0; i < mappedData.length; i++) {
    done++
    console.log(done.toString().padStart(4, '') + ' / ' + mappedData.length)
    await sdk.v1.submit({
      formId: serverConfig.cashId,
      data: mappedData[i],
    })
  }
  // await PromisePool.withConcurrency(20).for(mappedData).process(async (data, i) => {
  //   done++
  // })
})