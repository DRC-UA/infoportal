import {KoboSdkGenerator} from '../../feature/kobo/KoboSdkGenerator'
import {scriptConf} from '../ScriptConf'
import {PrismaClient} from '@prisma/client'
import {KoboIndex} from '@infoportal-common'

export const run = async () => {
  const prisma = new PrismaClient()
  const config = {
    server: 'prod',
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
  const formId = KoboIndex.byName('ecrec_cashRegistrationBha').id
  const sdk = await new KoboSdkGenerator(prisma).get(scriptConf.kobo[config.server].serverId)
  const answers = await sdk.getAnswersRaw(formId)
  const toUpdate = answers.results.filter(_ => !!_.back_office).map(_ => _._id)
  await sdk.updateData({
    formId: formId,
    data: {
      back_office: null,
    },
    submissionIds: toUpdate
  }).then(console.log)
}