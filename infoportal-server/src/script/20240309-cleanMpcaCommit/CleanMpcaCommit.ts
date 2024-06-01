import {Prisma, PrismaClient} from '@prisma/client'
import {PromisePool} from '@supercharge/promise-pool'
import {CashStatus, KoboAnswerId} from '@infoportal-common'
import {appConf} from '../../core/conf/AppConf'
import {processBatches} from '../../helper/Utils'

export const migrateHhsTags = async () => {
  // v2 id 529987478 = OKF => v3 Empty
  // v2 id 520504109 = OKF => v3 ECHO2
  const prisma = new PrismaClient()
  // await prisma.koboAnswers.findMany({
  //   where: {
  //     answers: {
  //       path: ['prev_id'],
  //       equals: '529987478'
  //     }
  //   },
  // }).then(console.log)
  // await prisma.koboAnswers.updateMany({
  //   where: {
  //     answers: {
  //       path: ['prev_id'],
  //       equals: '529987478',
  //     }
  //   },
  //   data: {
  //     tags: {projects: ['UKR-000309 OKF']}
  //   }
  // })
  // await prisma.koboAnswers.findMany({
  //   where: {
  //     answers: {
  //       path: ['prev_id'],
  //       equals: '529987478'
  //     }
  //   },
  // }).then(console.log)
  const origin = await prisma.koboAnswers.findMany({
    where: {
      formId: 'aQDZ2xhPUnNd43XzuQucVR',
      tags: {
        path: ['projects'],
        not: Prisma.AnyNull
      }
    }
  })
  console.log('update ' + origin.length)
  const newFormIndex = await prisma.koboAnswers.findMany({
    where: {
      formId: 'aDmHHT6QzBSwwy9WZcTRrM',
    },
    select: {
      answers: true,
      tags: true
    }
  }).then(res => {
    const map = new Map<KoboAnswerId, any>()
    res.map(_ => {
      const prevId = (_.answers as any).prev_id
      if (prevId && prevId > 0)
        map.set(prevId, _.tags)
    })
    return map
  })
  process.stdout.write('0')
  // await prisma.$transaction(origin.map((r, i) => {

  const run = (r: any, i: number) => {
    process.stdout.write('\r' + i)
    if (r.id === '529987478') {
      console.log({
        ...r.tags as any,
        ...newFormIndex.get(r.id),
      })
    }
    return prisma.koboAnswers.updateMany({
      where: {
        answers: {
          path: ['prev_id'],
          equals: r.id,
        }
      },
      data: {
        tags: {
          ...r.tags as any,
          ...newFormIndex.get(r.id) ?? {},
        }
      }
    })
  }

  await processBatches({
    data: origin, batchSize: 20, run: (arr, i) => {
      return Promise.all(arr.map(run))
    }
  })
  // await PromisePool.withConcurrency(10).for(origin).process((r, i) => run(r, i))
  // for (let i = 0; i < origin.length; i++) {
  //   await run(origin[i], i)
  // }
}


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
  // await processBatches({
  //   data: res,
  //   batchSize: 100,
  //   run: async (d, i) => {
  //     await prisma.$transaction(res.map((item) => {
  //       process.stdout.write('\r' + i)
  //       const {committed, ...tags} = item.tags as any
  //       return prisma.koboAnswers.update({
  //         where: {
  //           id: item.id
  //         },
  //         data: {
  //           tags: {
  //             ...tags,
  //             status: CashStatus.Paid,
  //             lastStatusUpdate: committed,
  //           }
  //         }
  //       })
  //     }))
  //   }
  // })
  // await prisma.$transaction(res.map((item, i) => {
  //   const {committed, ...tags} = item.tags as any
  //   process.stdout.write('\r' + i)
  //   return prisma.koboAnswers.update({
  //     where: {
  //       id: item.id
  //     },
  //     data: {
  //       tags: {
  //         ...tags,
  //         status: CashStatus.Paid,
  //         lastStatusUpdate: committed,
  //       }
  //     }
  //   })
  // }))
  await PromisePool.withConcurrency(appConf.db.maxConcurrency).for(res).process(async (item, i) => {
    process.stdout.write('\r' + i)
    const {committed, ...tags} = item.tags as any
    await prisma.koboAnswers.update({
      where: {
        id: item.id
      },
      data: {
        tags: {
          ...tags,
          status: CashStatus.Paid,
          lastStatusUpdate: committed,
        }
      }
    })
  })
}