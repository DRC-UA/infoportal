import {PrismaClient} from '@prisma/client'
import {KoboApiService} from '../feature/kobo/KoboApiService'

export const KoboFillMissingStartEndDate = async ({
  prisma,
  serverId,
  formId,
  koboApiService = new KoboApiService(prisma)
}: {
  prisma: PrismaClient
  serverId: string
  formId: string
  koboApiService?: KoboApiService
}) => {
  const answers = await koboApiService.fetchAnswers(serverId, formId).then(_ => _.data.filter(_ => !_.start || !_.end))
  const sdk = await koboApiService.constructSdk(serverId)
  const promises = answers.map(answer => {
    return sdk.updateDataSimple({
      formId,
      submissionIds: [answer.id],
      questionName: 'start',
      newValue: answer.submissionTime.toISOString(),
    })
  })
  return Promise.all(promises)
}