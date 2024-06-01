import {PrismaClient} from '@prisma/client'

export const runFixProjectsArray = async (prisma: PrismaClient) => {
  const answers = await prisma.koboAnswers.findMany({where: {formId: 'aTP5nwZjpyR7oy7bdMZktC'}})
  console.log(answers.filter(_ => {
    if (!_.tags || !Array.isArray((_.tags as any).project)) return false
    let projects: string[] = (_.tags as any).project as any
    return projects.find((p: string) => p.includes('["'))
  }).map(_ => _.tags))

  // const fixed = answers.filter((_: any) => {
  //   if (!_.tags) return
  //   if (!_.tags.project) return
  //   if (!Array.isArray(_.tags.project)) return
  //   return _.tags.project.length === 1 && _.tags.project[0] === '["UKR-000298 Novo-Nordisk", "UKR-000314 UHF4"]'
  // }).map(_ => {
  //   (_ as any).tags.project = ["UKR-000298 Novo-Nordisk", "UKR-000314 UHF4"]
  //   return _
  // })
  // await PromisePool.withConcurrency(20).for(fixed).process(f => {
  //   console.log('updating... ' + f.id)
  //   return prisma.koboAnswers.update({
  //     where: {id: f.id},
  //     data: {tags: f.tags as any},
  //   })
  // })
  // console.log(fixed.map(_ => _.tags))
  // console.log(fixed.length)
}