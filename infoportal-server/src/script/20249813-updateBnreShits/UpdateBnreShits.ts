import {PrismaClient} from '@prisma/client'
import {KoboMappedAnswersService} from '../../feature/kobo/KoboMappedAnswersService'
import {KoboSdkGenerator} from '../../feature/kobo/KoboSdkGenerator'
import {scriptConf} from '../ScriptConf'
import {Bn_re, KoboAnswerFlat, KoboIndex, KoboSdkv1, PeriodHelper} from '@infoportal-common'
import {fnSwitch} from '@alexandreannic/ts-utils'
import PromiseRetry from 'promise-retry'
import PromisePool from '@supercharge/promise-pool'
import {addDays, subDays} from 'date-fns'

export const updateBnreShits = async () => {
  const flag = '[migration_sucessful]'
  const prisma = new PrismaClient()
  const service = new KoboMappedAnswersService(prisma)
  console.log('Fetch...')
  const answers = await service.searchBn_re().then(_ => _.data
    .filter(_ => PeriodHelper.isDateIn(
      {start: subDays(new Date(), 2), end: addDays(new Date(), 10)},
      _.date,
    ))
    .filter(_ => !_.fin_det_enum || !_.fin_det_enum.includes(flag))
  )
  const sdk = await new KoboSdkGenerator(prisma).get(scriptConf.kobo.prod.serverId)
  const update = (answer: KoboAnswerFlat<Bn_re.T>, index: number) => {
    console.log(`${(index + '').padStart(5, ' ')}/${answers.length} ${answer.id}...`)
    return PromiseRetry((retry, number) => {
      return Promise.all([
        sdk.v2.updateData({
          formId: KoboIndex.byName('bn_re').id,
          submissionIds: [answer.id],
          data: KoboSdkv1.parseBody({
            'background/donor_cff': fnSwitch(answer.donor_mpca!, updateBnreShitsDonorMap, () => undefined),
            'background/donor_mpca': fnSwitch(answer.donor_mpca!, updateBnreShitsDonorMap, () => undefined),
            'background/donor_nfi': fnSwitch(answer.donor_nfi!, updateBnreShitsDonorMap, () => undefined),
            'background/donor_esk': fnSwitch(answer.donor_esk!, updateBnreShitsDonorMap, () => undefined),
            'background/donor_cfr': fnSwitch(answer.donor_cfr!, updateBnreShitsDonorMap, () => undefined),
            'background/donor_cfe': fnSwitch(answer.donor_cfe!, updateBnreShitsDonorMap, () => undefined),
            'background/donor_iwk': fnSwitch(answer.donor_iwk!, updateBnreShitsDonorMap, () => undefined),
            'background/donor_ihk': fnSwitch(answer.donor_ihk!, updateBnreShitsDonorMap, () => undefined),
            'background/donor_cfu': fnSwitch(answer.donor_cfu!, updateBnreShitsDonorMap, () => undefined),
            'background/back_prog_type': answer.back_prog_type?.map(prog => fnSwitch(prog, {
              mpca_chj: 'mpca',
              mpca_dnk: 'mpca',
              mpca_hrk: 'mpca',
              mpca_lwo: 'mpca',
              mpca_nlv: 'mpca',
              mpca_umy: 'mpca',

              csf_chj: 'csf',
              csf_dnk: 'csf',
              csf_hrk: 'csf',
              csf_lwo: 'csf',
              csf_nlv: 'csf',
              csf_umy: 'csf',

              nfi_chj: 'nfi',
              nfi_dnk: 'nfi',
              nfi_hrk: 'nfi',
              nfi_lwo: 'nfi',
              nfi_nlv: 'nfi',
              nfi_umy: 'nfi',

              cfr_chj: 'cfr',
              cfr_dnk: 'cfr',
              cfr_lwo: 'cfr',

              cfe_lwo: 'cfe',

              iwk_lwo: 'iwk',
              ihk_lwo: 'ihk',

              esk_chj: 'esk',
              esk_dnk: 'esk',
              esk_hrk: 'esk',
              esk_lwo: 'esk',
              esk_nlv: 'esk',

              cfu_chj: 'cfu',
              cfu_lwo: 'cfu'

            }, () => undefined)),
            'fin_det/fin_det_enum': (answer.fin_det_enum ?? '') + flag
          })
        }).catch(err => {
          console.error(`${(index + '').padStart(5, ' ')}/${answers.length} Failed to updated ${answer.id}`)
          retry(err)
        }),
        prisma.koboAnswers.update({
          where: {id: answer.id},
          data: {
            uuid: answer.uuid + '-'
          }
        })
      ])
    }, {
      retries: 10,
    })
  }

  // await Promise.all(answers.map(update))

  // for (let i = 0; i < answers.length; i++) {
  //   await update(answers[i], i)
  // }

  await PromisePool.withConcurrency(50).for(answers).process(update)
  console.log('Complete')
}

export const updateBnreShitsDonorMap: Record<NonNullable<Bn_re.T['donor_cfe']>, string> = {
  'chj_360_novonordisk': 'ukr000360_novo2',
  'dnk_360_novonordisk': 'ukr000360_novo2',
  'hrk_360_novonordisk': 'ukr000360_novo2',
  'lwo_360_novonordisk': 'ukr000360_novo2',
  'nlv_360_novonordisk': 'ukr000360_novo2',

  'uhf_chj': 'ukr000314_uhf4',
  'uhf_dnk': 'ukr000314_uhf4',
  'uhf_hrk': 'ukr000314_uhf4',
  'uhf_lwo': 'ukr000314_uhf4',
  'uhf_nlv': 'ukr000314_uhf4',

  'bha_hrk': 'ukr000284_bha',
  'bha_chj': 'ukr000284_bha',
  'bha_dnk': 'ukr000284_bha',
  'bha_lwo': 'ukr000284_bha',
  'bha_nlv': 'ukr000284_bha',

  'echo_chj': 'ukr000269_echo',
  'echo_dnk': 'ukr000269_echo',
  'echo_hrk': 'ukr000269_echo',
  'echo_lwo': 'ukr000269_echo',
  'echo_nlv': 'ukr000269_echo',

  'echo322_chj': 'ukr000322_echo2',
  'echo322_dnk': 'ukr000322_echo2',
  'echo322_hrk': 'ukr000322_echo2',
  'echo322_lwo': 'ukr000322_echo2',
  'echo322_nlv': 'ukr000322_echo2',
  'echo322_umy': 'ukr000322_echo2',

  'novo_nlv': 'ukr000298_novo',
  'okf_lwo': 'ukr000309_okf',

  'pool_chj': 'ukr000270_pf',
  'pool_dnk': 'ukr000270_pf',
  'pool_hrk': 'ukr000270_pf',
  'pool_lwo': 'ukr000270_pf',
  'pool_nlv': 'ukr000270_pf',
  'pool_umy': 'ukr000270_pf',

  'pool_342_chj': 'ukr000342_pf2',
  'pool_342_hrk': 'ukr000342_pf2',
  'pool_342_nlv': 'ukr000342_pf2',
  'pool_342_umy': 'ukr000342_pf2',
  // @ts-ignore
  'pool_342_lwo': 'ukr000342_pf2',

  'sdc_umy': 'ukr000330_sdc2',
  'hrk_umy': 'ukr000330_sdc2',

  'umy_danida': 'ukr000267_danida',
  // @ts-ignore
  'ukr000380_danida': 'ukr000380_danida',

  'uhf6_chj': 'ukr000336_uhf6',
  'uhf6_dnk': 'ukr000336_uhf6',
  'uhf6_hrk': 'ukr000336_uhf6',
  'uhf6_lwo': 'ukr000336_uhf6',
  'uhf6_nlv': 'ukr000336_uhf6',
  'uhf6_umy': 'ukr000336_uhf6',

  'uhf7_chj': 'ukr000352_uhf7',
  'uhf7_dnk': 'ukr000352_uhf7',
  'uhf7_hrk': 'ukr000352_uhf7',
  'uhf7_lwo': 'ukr000352_uhf7',
  'uhf7_nlv': 'ukr000352_uhf7',
  'uhf7_umy': 'ukr000352_uhf7',

  'danida347_chj': 'ukr000347_danida2',
  'danida347_dnk': 'ukr000347_danida2',
  'danida347_hrk': 'ukr000347_danida2',
  'danida347_lwo': 'ukr000347_danida2',
  'danida347_nlv': 'ukr000347_danida2',
  'danida347_umy': 'ukr000347_danida2',

  '341_hoffman_husmans_hrk': 'ukr000341_hoff',
  '340_augustinus_fonden_dnk': 'ukr000340_aug',
  '340_02_augustinus_fonden_lwo': 'ukr000340_aug',
  '329_sida_lwo': 'ukr000329_sida',
}
