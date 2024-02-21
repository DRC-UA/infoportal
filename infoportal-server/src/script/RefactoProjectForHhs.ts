import {PrismaClient} from '@prisma/client'
import {ProtectionHhsTags} from '../db/koboForm/DbHelperProtectionHhs'
import {DrcProject, KoboIndex} from '@infoportal-common'
import {Enum, seq} from '@alexandreannic/ts-utils'

const pattern = /\((UKR-[0-9]{6})\)/

const mapTag = (oldTag: string): undefined | DrcProject => {
  if (Enum.values(DrcProject).find(_ => _ === oldTag)) return Enum.values(DrcProject).find(_ => _ === oldTag)
  if (oldTag === 'undefined') return undefined
  const match = oldTag.match(pattern)
  const code = match?.[1]!
  if (!code) {
    console.warn('Fail to parse', ' - ', oldTag, ' - ', code, ' - ', match)
    throw new Error(oldTag)
  }
  const res = Enum.values(DrcProject).find(_ => _.includes(code))
  if (!res) {
    console.warn('Fail to find code', oldTag, ' - ', match, ' - ', code)
    throw new Error(code)
  }
  return DrcProject[res]
}

export const refactoProjectForHhs = async (prisma: PrismaClient) => {
  const answers = await prisma.koboAnswers.findMany({where: {formId: KoboIndex.byName('protection_hhs2_1').id}})
    .then(_ => _.filter(_ => !!_.tags))

  for (const answer of answers) {
    // Promise.all(answers.map(answer => {
    try {
      const tag = answer.tags as unknown as ProtectionHhsTags
      const projects: DrcProject[] = seq(tag.projects?.map(mapTag) ?? []).compact().get()
      const ipt: DrcProject[] = seq(tag.ipt?.map(mapTag)).compact().get()
      const ai = tag.ai ? mapTag(tag.ai) : tag.ai

      const parsedTag: ProtectionHhsTags = {}
      if (projects.length > 0) parsedTag.projects = projects
      if (ipt.length > 0) parsedTag.ipt = ipt
      if (ai) parsedTag.ai = ai
      if (tag.ai === 'undefined' as any) parsedTag.ai === undefined
      console.log(tag, '>', parsedTag)
      await prisma.koboAnswers.update({
        where: {id: answer.id},
        data: {tags: parsedTag as any}
      })
    } catch (e) {
      console.warn(e)
      console.warn(answer.tags)
      throw Error('answer ' + answer.id)
    }
  }
}

export const refactoProjectForProtCommunitylevel = async (prisma: PrismaClient) => {
  const answers = await prisma.koboAnswers.findMany({where: {formId: KoboIndex.byName('protection_communityMonitoring').id}})
    .then(_ => _.filter(_ => !!_.tags))

  for (const answer of answers) {
    // Promise.all(answers.map(answer => {
    try {
      const tag = answer.tags as {project?: DrcProject}
      const project = tag.project ? mapTag(tag.project) : tag.project
      const parsedTag: {project?: DrcProject} = {}
      if (project) parsedTag.project = project
      if (tag.project === 'undefined' as any) parsedTag.project === undefined
      console.log(answer.id, tag, '>', parsedTag)
      await prisma.koboAnswers.update({
        where: {id: answer.id},
        data: {tags: parsedTag as any}
      })
    } catch (e) {
      console.warn(e)
      console.warn(answer.tags)
      throw Error('answer ' + answer.id)
    }
  }
}

// refactoProjectForProtCommunitylevel(new PrismaClient()).then(console.log)
// refactoProjectForHhs(new PrismaClient()).then(console.log)