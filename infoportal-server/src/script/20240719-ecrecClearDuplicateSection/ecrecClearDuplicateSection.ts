import {PrismaClient} from '@prisma/client'
import {KoboMappedAnswersService} from '../../feature/kobo/KoboMappedAnswersService'
import {KoboSdkGenerator} from '../../feature/kobo/KoboSdkGenerator'
import {scriptConf} from '../ScriptConf'
import {KoboIndex} from '@infoportal-common'
import {PromisePool} from '@supercharge/promise-pool'
import {appConf} from '../../core/conf/AppConf'

export const ecrecClearDuplicateSection = async () => {
  const prisma = new PrismaClient()
  const sdk = await new KoboSdkGenerator(prisma).get(scriptConf.kobo.prod.serverId)
  const service = new KoboMappedAnswersService(prisma)
  const answers = await service.searchBn_ecrecCashRegistration().then(_ => _.data)
  const wrong = answers.filter(x =>
    x.income_spent_food_001 ||
    x.income_spent_nonfood_001 ||
    x.lcs_sell_hh_assets_001 ||
    x.lcs_spent_savings_001 ||
    x.lcs_forrowed_food_001 ||
    x.lcs_eat_elsewhere_001 ||
    x.lcs_sell_productive_assets_001 ||
    x.lcs_reduce_health_expenditures_001 ||
    x.lcs_reduce_education_expenditures_001 ||
    x.lcs_sell_house_001 ||
    x.lcs_move_elsewhere_001 ||
    x.lcs_degrading_income_source_001 ||
    x.lcs_ask_stranger_001 ||
    x.lcs_reason_001
  )
  //
  // await PromisePool.withConcurrency(appConf.db.maxConcurrency).for(wrong).process((_, i) => {
  //   console.log(('' + i).padStart(3, '0'), _.id)
  //   return sdk.v2.updateData({
  //     formId: KoboIndex.byName('ecrec_cashRegistration').id,
  //     data: {
  //       'livelihoods_score/income_spent_food': '' + _.income_spent_food_001,
  //       'livelihoods_score/income_spent_nonfood': '' + _.income_spent_nonfood_001,
  //       'livelihoods_score/lcs_sell_hh_assets': _.lcs_sell_hh_assets_001,
  //       'livelihoods_score/lcs_spent_savings': _.lcs_spent_savings_001,
  //       'livelihoods_score/lcs_forrowed_food': _.lcs_forrowed_food_001,
  //       'livelihoods_score/lcs_eat_elsewhere': _.lcs_eat_elsewhere_001,
  //       'livelihoods_score/lcs_sell_productive_assets': _.lcs_sell_productive_assets_001,
  //       'livelihoods_score/lcs_reduce_health_expenditures': _.lcs_reduce_health_expenditures_001,
  //       'livelihoods_score/lcs_reduce_education_expenditures': _.lcs_reduce_education_expenditures_001,
  //       'livelihoods_score/lcs_sell_house': _.lcs_sell_house_001,
  //       'livelihoods_score/lcs_move_elsewhere': _.lcs_move_elsewhere_001,
  //       'livelihoods_score/lcs_degrading_income_source': _.lcs_degrading_income_source_001,
  //       'livelihoods_score/lcs_ask_stranger': _.lcs_ask_stranger_001,
  //       'livelihoods_score/lcs_reason': _.lcs_reason_001?.join(' '),
  //       'livelihoods_score/lost_breadwiner': _.Breadwiner,
  //
  //       'livelihoods_score2/income_spent_food_001': null,
  //       'livelihoods_score2/income_spent_nonfood_001': null,
  //       'livelihoods_score2/lcs_sell_hh_assets_001': null,
  //       'livelihoods_score2/lcs_spent_savings_001': null,
  //       'livelihoods_score2/lcs_forrowed_food_001': null,
  //       'livelihoods_score2/lcs_eat_elsewhere_001': null,
  //       'livelihoods_score2/lcs_sell_productive_assets_001': null,
  //       'livelihoods_score2/lcs_reduce_health_expenditures_001': null,
  //       'livelihoods_score2/lcs_reduce_education_expenditures_001': null,
  //       'livelihoods_score2/lcs_sell_house_001': null,
  //       'livelihoods_score2/lcs_move_elsewhere_001': null,
  //       'livelihoods_score2/lcs_degrading_income_source_001': null,
  //       'livelihoods_score2/lcs_ask_stranger_001': null,
  //       'livelihoods_score2/lcs_reason_001': null,
  //       'livelihoods_score2/Breadwiner': null,
  //     },
  //     submissionIds: [_.id],
  //   })
  // })

  console.log(wrong.length)
  // const answers = await sdk.v2.getAnswers(KoboIndex.byName('ecrec_cashRegistration').id).then(_ => _.data)
  // answers.map(x => x.)
}
