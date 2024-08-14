import {PrismaClient} from '@prisma/client'
import {KoboMappedAnswersService} from '../../feature/kobo/KoboMappedAnswersService'
import {KoboSdkGenerator} from '../../feature/kobo/KoboSdkGenerator'
import {scriptConf} from '../ScriptConf'
import {KoboIndex, KoboSdkv1} from '@infoportal-common'
import {duration, fnSwitch, Obj, seq, sleep} from '@alexandreannic/ts-utils'
import {updateBnreShitsDonorMap} from './UpdateBnreShits'

export const updateBnreShits2 = async () => {
  const prisma = new PrismaClient()
  const idsCff = new Set()
  const service = new KoboMappedAnswersService(prisma)
  console.log('Fetch...')
  const answerGroups = await service.searchBn_re()
    .then(_ => _.data.filter(_ => idsCff.has(_.id)))
    .then(_ => seq(_))
    .then(_ => _.groupByAndApply(_ => _.donor_cff!, _ => _.map(_ => _.id)))
  const sdk = await new KoboSdkGenerator(prisma).get(scriptConf.kobo.prod.serverId)
  console.log('Fetch... Done ')

  let index = 0
  for (const donorCff of Obj.keys(answerGroups)) {
    index++
    console.log(`Batch... ${index}/${Obj.keys(answerGroups).length} ${donorCff}`)
    const ids = answerGroups[donorCff]
    await Promise.all([
      sdk.v2.updateData({
        formId: KoboIndex.byName('bn_re').id,
        submissionIds: ids,
        data: KoboSdkv1.parseBody({
          'background/donor_cff': fnSwitch(donorCff, updateBnreShitsDonorMap, () => undefined),
        })
      }),
      prisma.koboAnswers.updateMany({
        where: {id: {in: ids}},
        data: {
          uuid: '-2'
        }
      })
    ])
    await sleep(duration(15, 'second'))
  }
  // await Promise.all(answers.map(update))

  // for (let i = 0; i < answers.length; i++) {
  //   await update(answers[i], i)
  // }

  // await PromisePool.withConcurrency(50).for(answerGroups).process(update)
  console.log('Complete')
}