import {PrismaClient} from '@prisma/client'
import {KoboIndex} from '@infoportal-common'
import {seq} from '@alexandreannic/ts-utils'
import {KoboService} from '../../feature/kobo/KoboService'
import {PromisePool} from '@supercharge/promise-pool'

export const runMigrateTagShelter = async () => {
  const prisma = new PrismaClient()
  const config = {
    server: 'dev',
    importConcurrency: 200,
  } as const
  const serverConfig = {
    dev: {
      formId: 'a89UuhpXnPusPbK3SwQzBU',
      newFormId: 'a5Q6vAMXRpv859ZUP3gDHR',
    },
    prod: {
      formId: KoboIndex.byName('protection_hhs2_1').id,
      newFormId: KoboIndex.byName('protection_hhs3').id,
    }
  }[config.server]
  const service = new KoboService(prisma)
  const [tas, ntas] = await Promise.all([
    // service.searchShelter_Ta().then(_ => _.data),
    // service.searchShelter_Nta().then(_ => seq(_.data).groupByFirst(_ => _.id)),
    prisma.koboAnswers.findMany({
      where: {
        formId: KoboIndex.byName('shelter_ta').id
      }
    }),
    prisma.koboAnswers.findMany({
      where: {
        formId: KoboIndex.byName('shelter_nta').id
      }
    }).then(_ => seq(_).groupByFirst(_ => _.id)),
  ])
  // const cashsNtaId = seq(tas).map((ta: any) => {
  //   if (ta.tags?.contractor1 === 'Cash' || ta.tags?.contractor2 === 'Cash') {
  //     return ntas[ta.answers.nta_id]?.id
  //   }
  // }).compact()
  //
  // const contractorNtaId = seq(tas).map((ta: any) => {
  //   if (ta.tags?.contractor1 && ta.tags?.contractor1 !== 'Cash'
  //     || ta.tags?.contractor2 && ta.tags?.contractor2 !== 'Cash') {
  //     if ((ntas[ta.answers.nta_id]?.answers as any)?.modality !== 'contractor')
  //       return ntas[ta.answers.nta_id]?.id
  //   }
  // }).compact()
  // console.log(cashsNtaId.length)
  // console.log(contractorNtaId.length)
  // // await service.updateAnswers({
  // //   answerIds: cashsNtaId,
  // //   formId: KoboIndex.byName('shelter_nta').id,
  // //   question: 'modality',
  // //   answer: 'cash_for_repair',
  // // })
  // await service.updateAnswers({
  //   answerIds: contractorNtaId,
  //   formId: KoboIndex.byName('shelter_nta').id,
  //   question: 'modality',
  //   answer: 'contractor',
  // })
  // console.log('done')

  await PromisePool.withConcurrency(100).for(tas).process(async (ta: any, i) => {
    const relatedNta = ntas[ta.answers.nta_id]
    if (!relatedNta) return
    await prisma.koboAnswers.update({
      where: {id: relatedNta.id},
      data: {
        tags: {
          ...relatedNta.tags as any,
          agreement: ta.tags?.agreement,
          workOrder: ta.tags?.workOrder,
          project: ta.tags?.project,
        }
      }
    })
    console.log(i)
  })
  console.log('done')
}