import {PrismaClient} from '@prisma/client'
import {KoboSdkGenerator} from '../../feature/kobo/KoboSdkGenerator'
import {scriptConf} from '../ScriptConf'
import {ImportMpca} from './ImporterMpca'
import {KoboAnswer, Meal_cashPdm, Meal_pdmStandardised} from '@infoportal-common'
import dataMap = ImportMpca.dataMap


export const ImportMpcaToCash = (async () => {
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

  const newFormUuid = await sdk.v1.getForms()
    .then(forms => {
      const form = forms.find(f => f.id_string === serverConfig.cashId)
      if (!form) throw new Error(`Form with id_string ${serverConfig.cashId} not found`)
      return form.uuid
    })

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
          uuid: newFormUuid,
          data: activity(item, i),
        })
        console.log(`Record ${i}:`, res.message ?? res.error)
      } catch (e: any) {
        console.error(`Error with record ${i}:`, e, activity(item, i))
      }
    }
    console.log('Data submission completed.')
  }

  await submit<Meal_cashPdm.T>({
    formId: serverConfig.cashId,
    data: mappedData,
    activity: (item, i) => ({
      ...item,
      comment: config.importComment(i),
    }),
  })

  console.log('Import process completed.')
})()