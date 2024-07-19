import fs from 'fs'
import {scriptConf} from '../ScriptConf'
import * as csvToJson from 'csvtojson'
import {AILocationHelper, KoboIndex} from '@infoportal-common'
import {KoboSdkGenerator} from '../../feature/kobo/KoboSdkGenerator'
import {PrismaClient} from '@prisma/client'
import {Obj, seq} from '@alexandreannic/ts-utils'

type Csv = {
  id: string
  oblast: string
  raion: string
  hromada: string
  settlement: string
}
export const runUpdateEcrecSettlements = async () => {
  const stream = fs.createReadStream(scriptConf.rootDir + '/20240718-ecrecSettlements/ecrec-cash-settlements.csv')
  const json: Csv[] = await csvToJson.default({delimiter: ';'}).fromStream(stream)
  const prisma = new PrismaClient()
  const sdk = await new KoboSdkGenerator(prisma).get(scriptConf.kobo.prod.serverId)

  const res = await Promise.all(json.map(async _ => {
    return {
      id: _.id,
      // settlement: await AILocationHelper.findHromada(_.oblast, _.raion, _.hromada)
      settlement: await AILocationHelper.findSettlement(_.oblast, _.raion, _.hromada, _.settlement.split('_')[0]).then(_ => _?.iso)
    }
  }))

  const grouped = seq(res).groupByAndApply(_ => _.settlement!, _ => _.map(_ => _.id))
  // await sdk.v2.updateData({
  //   formId: KoboIndex.byName('ecrec_cashRegistration').id,
  //   data: {
  //     'ben_det/ben_det_settlement': 'UA6308015039:',
  //   },
  //   submissionIds: ['' +
  //   '' +
  //   '' +
  //   ''],
  // })
  console.log(Obj.mapValues(grouped, _ => _.length))
  await Promise.all(Obj.entries(grouped).map(([iso, ids]) => {
    return sdk.v2.updateData({
      formId: KoboIndex.byName('ecrec_cashRegistration').id,
      data: {
        'ben_det/ben_det_settlement': iso,
      },
      submissionIds: ids,
    })
  }))
}
