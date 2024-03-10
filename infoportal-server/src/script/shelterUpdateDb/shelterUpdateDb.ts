import * as csvToJson from 'csvtojson'
import fs from 'fs'
import {PrismaClient} from '@prisma/client'
import {PromisePool} from '@supercharge/promise-pool'
import {KoboMappedAnswersService} from '../../feature/kobo/KoboMappedAnswersService'
import {scriptConf} from '../ScriptConf'

interface XLSD {
  ['Contract number']: string
  ['DRC reference number']: string
  // ['City']: string
  // ['Beneficiary name']: string
  // ['Address']: string
  // ['Hromada']: string
  // ['Settlement']: string
  // ['House/Apartment']: string
}


(async () => {
  const prisma = new PrismaClient()
  const service = new KoboMappedAnswersService(prisma)
  const stream = fs.createReadStream(scriptConf.rootDir + '/shelterUpdateDb/shelter-2023-11-03-enrico-agreement.csv')
  const json: XLSD[] = await csvToJson.default({delimiter: ';'}).fromStream(stream)
  const taAnswers = await service.searchShelter_Ta().then(_ => _.data)

  await PromisePool.withConcurrency(50)
    .for(json)
    .process(async j => {
      const ta = taAnswers.find(_ => _.nta_id === j['DRC reference number'])
      if (!ta) throw new Error('')
      if (!ta.tags) ta.tags = {}
      ta.tags.agreement = j['Contract number']
      await prisma.koboAnswers.update({
        where: {id: ta.id},
        data: {
          tags: ta.tags as any
        }
      })
    })
})()
