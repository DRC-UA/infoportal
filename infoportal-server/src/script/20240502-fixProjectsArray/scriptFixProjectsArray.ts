import {PrismaClient} from '@prisma/client'
import {PromisePool} from '@supercharge/promise-pool'

export const runFixProjectsArray = async (prisma: PrismaClient) => {
  const answers = await prisma.koboAnswers.findMany({where: {formId: 'aTP5nwZjpyR7oy7bdMZktC'}})
  // console.log(answers.filter(_ => {
  //   if (!_.tags || !Array.isArray((_.tags as any).project)) return false
  //   let projects: string[] = (_.tags as any).project as any
  //   return projects.find((p: string) => p.includes('["'))
  // }).map(_ => _.tags))
  // console.log(answers.filter((_: any) => _.tags && !Array.isArray(_.tags.project)).map(_ => _.tags))

  const fixed = answers.filter((_: any) => {
    if (!_.tags) return
    if (!_.tags.project) return
    // if (typeof _.tags.project === 'string') return true
    return !Array.isArray(_.tags.project)
  }).map(_ => {
    // (_ as any).tags.project = ['UKR-000322 ECHO2']
    return _
  })
  // await PromisePool.withConcurrency(20).for(fixed).process(f => {
  //   console.log('updating... ' + f.id)
  //   return prisma.koboAnswers.update({
  //     where: {id: f.id},
  //     data: {tags: f.tags as any},
  //   })
  // })
  console.log(fixed.map(_ => _.tags))
  console.log(fixed.length)
}