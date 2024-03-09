import {Prisma, PrismaClient} from '@prisma/client'
import {PromisePool} from '@supercharge/promise-pool'
import {CashStatus} from '@infoportal-common'

export const cleanMpca = async () => {
  const prisma = new PrismaClient()
  const res = await prisma.koboAnswers.findMany({
    where: {
      tags: {
        path: ['committed'],
        not: Prisma.AnyNull
      }
    }
  })
  console.log('update ' + res.length)
  process.stdout.write('0')
  await PromisePool.withConcurrency(10).for(res).process(async (item, i) => {
    process.stdout.write('\r' + i)
    await prisma.koboAnswers.update({
      where: {
        id: item.id
      },
      data: {
        tags: {
          ...item.tags as any,
          status: CashStatus.Paid,
          lastStatusUpdate: (item.tags as any).committed,
        }
      }
    })
  })
}