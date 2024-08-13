import {PrismaClient} from '@prisma/client'
import {KoboMappedAnswersService} from '../../feature/kobo/KoboMappedAnswersService'
import {KoboSdkGenerator} from '../../feature/kobo/KoboSdkGenerator'
import {scriptConf} from '../ScriptConf'
import {Bn_re, KoboAnswerFlat, KoboIndex, KoboSdkv1} from '@infoportal-common'
import {fnSwitch} from '@alexandreannic/ts-utils'
import PromiseRetry from 'promise-retry'

export const updateBnreShits = async () => {
  const prisma = new PrismaClient()
  const service = new KoboMappedAnswersService(prisma)
  console.log('Fetch...')
  const answers = await service.searchBn_re().then(_ => _.data.filter(_ => _.id === '583010046'))
  const sdk = await new KoboSdkGenerator(prisma).get(scriptConf.kobo.prod.serverId)
  console.log('Fetch... Done')

  const update = (answer: KoboAnswerFlat<Bn_re.T>, index: number) => {
    return PromiseRetry((retry, number) => {
      return sdk.v2.updateData({
        formId: KoboIndex.byName('bn_re').id,
        submissionIds: [answer.id],
        data: KoboSdkv1.parseBody({
          'background/donor_mpca': fnSwitch(answer.donor_mpca!, {
            'bha_hrk': 'ukr000284_bha',
          }, () => undefined),
          // 'ben_det/donor_mpca': fnSwitch(answer.donor_mpca!, {
          //   '329_sida_lwo': 'ukr000329_sida',
          // }, () => undefined),
          // 'ben_det/donor_nfi': fnSwitch(answer.donor_nfi!, {
          //   '329_sida_lwo': 'ukr000329_sida',
          // }, () => undefined),
          // 'xxx/prog_type': answer.back_prog_type?.map(prog => fnSwitch(prog, {
          //   cfe_lwo: 'cfe',/
          // }, () => undefined))
        })
      }).then(res => {
        console.log(`${index} Successfully updated ${answer.id}`)
        return res
      }).catch(err => {
        console.error(`${index} Failed to updated ${answer.id}`)
        retry(err)
      })
    }, {
      retries: 10,
    })
  }

  await Promise.all(answers.map(update))

  // for (let i = 0; i < answers.length; i++) {
  //   await update(answers[i], i)
  // }

  // await PromisePool.withConcurrency(1).for(answers).process(update)
}