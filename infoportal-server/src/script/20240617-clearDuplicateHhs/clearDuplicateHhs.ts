import {PrismaClient} from '@prisma/client'
import {KoboSdkGenerator} from '../../feature/kobo/KoboSdkGenerator'
import {scriptConf} from '../ScriptConf'
import {KoboAnswer, KoboAnswerId, KoboIndex, Protection_hhs3} from '@infoportal-common'
import {seq, Seq} from '@alexandreannic/ts-utils'

export const clearDuplicateHhs = async () => {
  const prisma = new PrismaClient()
  const sdk = await new KoboSdkGenerator(prisma).get(scriptConf.kobo.prod.serverId)
  const answers = await sdk.v2.getAnswers(KoboIndex.byName('protection_hhs3').id).then(_ => seq(_.data) as Seq<KoboAnswer<Protection_hhs3.T>>).then(_ => _.filter(_ => _.answers.prev_id !== '-1'))
  const idMet = new Set()
  const toDelete = new Set<KoboAnswerId>()
  console.log(answers.length)
  answers.forEach(_ => {
    // console.log(_.answers.prev_id)
    if (idMet.has(_.answers.prev_id)) toDelete.add(_.id)
    idMet.add(_.answers.prev_id)
  })
  const res = await sdk.v2.delete(KoboIndex.byName('protection_hhs3').id, Array.from(toDelete))
  console.log(res)
}