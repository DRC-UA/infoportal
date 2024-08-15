import {PrismaClient} from '@prisma/client'
import {KoboMappedAnswersService} from '../../feature/kobo/KoboMappedAnswersService'
import {KoboSdkGenerator} from '../../feature/kobo/KoboSdkGenerator'
import {scriptConf} from '../ScriptConf'
import {duration, fnSwitch, Obj, seq, sleep} from '@alexandreannic/ts-utils'
import {updateBnreShitsDonorMap} from './UpdateBnreShits'
import {KoboIndex, KoboSdkv1} from '@infoportal-common'

export const updateBnreShits2 = async () => {
  const prisma = new PrismaClient()
  const idsCff = new Set()
  const service = new KoboMappedAnswersService(prisma)
  console.log('Fetch...')
  const answers = await service.searchBn_re()
    // .then(_ => _.data.filter(_ => idsCff.has(_.id)))
    .then(_ => seq(_.data).filter(_ => !_.back_donor?.find(_ => _.includes('ukr'))))
  const sdk = await new KoboSdkGenerator(prisma).get(scriptConf.kobo.prod.serverId)
  console.log(`Fetch... Done ${answers.length}`)
  const answerGroups = answers.groupByAndApply(_ => _.back_donor?.join(' ')!, _ => _.map(_ => _.id))

  let index = 0
  for (const donors of Obj.keys(answerGroups)) {
    index++
    const ids = answerGroups[donors]
    console.log(`Batch... ${index}/${Obj.keys(answerGroups).length} ${donors} (${ids.length})`)
    const res = donors.split(' ').map(_ => fnSwitch(_, updateBnreShitsDonorMap, x => x)).filter(_ => _ !== '')
    // console.log({
    //   formId: KoboIndex.byName('bn_re').id,
    //   submissionIds: ids,
    //   data: KoboSdkv1.parseBody({
    //     'background/back_donor': res,
    //   })
    // })
    await Promise.all([
      sdk.v2.updateData({
        formId: KoboIndex.byName('bn_re').id,
        submissionIds: ids,
        data: KoboSdkv1.parseBody({
          'background/back_donor': res,
        })
      }),
      prisma.koboAnswers.updateMany({
        where: {id: {in: ids}},
        data: {
          uuid: '-2'
        }
      })
    ])
    console.log(`Batch... ${index}/${Obj.keys(answerGroups).length} ${donors} DONE!`)
  }
  // await Promise.all(answers.map(update))

  // for (let i = 0; i < answers.length; i++) {
  //   await update(answers[i], i)
  // }

  // await PromisePool.withConcurrency(50).for(answerGroups).process(update)
  console.log('Complete')
}