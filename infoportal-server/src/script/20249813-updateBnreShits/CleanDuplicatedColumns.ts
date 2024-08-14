import {PrismaClient} from '@prisma/client'
import {KoboMappedAnswersService} from '../../feature/kobo/KoboMappedAnswersService'
import {KoboIndex} from '@infoportal-common'
import {KoboSdkGenerator} from '../../feature/kobo/KoboSdkGenerator'
import {scriptConf} from '../ScriptConf'

export const cleanDuplicatedColumns = async () => {
  const prisma = new PrismaClient()
  const service = new KoboMappedAnswersService(prisma)
  const sdk = await new KoboSdkGenerator(prisma).get(scriptConf.kobo.prod.serverId)
  console.log('Update kobo...')
  const ids = [
    554934130,
    554933499,
    554928837,
    554924811,
    554923929,
    554923195,
    554922030,
    554921237,
    554920930,
    554919180,
    554918681,
    554918231,
    554916819,
    554916227,
    554915533,
    554914459,
    554914320,
    554913437,
    554913120,
    554911853,
    554911455,
    554911450,
    554909996,
    554909987,
    554909971,
    554909949,
    554902901,
    554902687,
    554901275,
    554901018,
    554899367,
    554899126,
    554897347,
    554896008,
    554895263,
    502794800,
    502793778,
    502792795,
    502791087,
    502790793,
    502787332,
    502787056,
    502785057,
    502784984,
    498907687,
    496966161,
    495369364,
    495367325,
    495279128,
    495277377,
    494928362,
    494927237,
    494926383,
    494925681,
    494925293,
    536773364,
    530794806,
  ].map(_ => _ + '')
  await sdk.v2.updateData({
    submissionIds: ids,
    data: {
      'donor_mpca': null,
      'donor_esk': null,
    },
    formId: KoboIndex.byName('bn_re').id
  })

  console.log('Reset uuid')
  await prisma.koboAnswers.updateMany({
    where: {id: {in: ids}},
    data: {
      uuid: '-'
    }
  })
  console.log('Complete')
}