import {Prisma, PrismaClient} from '@prisma/client'
import {logger, Logger} from '../../../helper/Logger'
import {KoboAnswerHistory} from './KoboAnswerHistoryType'
import {DbHelper} from '../../../db/DbHelper'
import {KoboAnswerId, KoboId} from '@infoportal-common'
import {seq} from '@alexandreannic/ts-utils'


export class KoboAnswerHistoryService {

  constructor(
    private prisma: PrismaClient,
    private log: Logger = logger('KoboAnswerHistoryService')
  ) {
  }

  readonly search = (params: KoboAnswerHistory.Search) => {
    return this.prisma.koboAnswersHistory.findMany({
      where: {
        formId: params.formId,
      }
    }).then(DbHelper.toPaginate())
  }

  readonly create = async ({
    authorEmail,
    formId,
    answerIds,
    property,
    newValue,
  }: {
    authorEmail: string,
    formId: KoboId,
    answerIds: KoboAnswerId[],
    property: string,
    newValue?: any
  }) => {
    const currentAnswers = await this.prisma.koboAnswers.findMany({
      where: {
        id: {in: answerIds,}
      }
    }).then(res => seq(res).groupByFirst(_ => _.id))
    return this.prisma.koboAnswersHistory.createMany({
      data: answerIds.map(_ => {
        return {
          by: authorEmail,
          type: 'answer',
          formId,
          property,
          newValue: newValue ?? Prisma.JsonNull,
          oldValue: (currentAnswers[_].answers as any)[property] as any,
          answerId: _
        }
      })
    })
  }
}