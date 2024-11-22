import {Prisma, PrismaClient} from '@prisma/client'
import {app, AppLogger} from '../../../index'
import {KoboAnswerHistory} from './KoboAnswerHistoryType'
import {ApiPaginateHelper, KoboAnswerId, KoboId} from 'infoportal-common'
import {seq} from '@alexandreannic/ts-utils'

type Create = {
  authorEmail: string
  formId: KoboId
  answerIds: KoboAnswerId[]
} & ({
  type: 'answer' | 'tag'
  newValue: any
  property: string
} | {
  type: 'delete'
  newValue?: undefined
  property?: undefined
})

export class KoboAnswerHistoryService {

  constructor(
    private prisma: PrismaClient,
    private log: AppLogger = app.logger('KoboAnswerHistoryService')
  ) {
  }

  readonly search = (params: KoboAnswerHistory.Search) => {
    return this.prisma.koboAnswersHistory.findMany({
      where: {
        formId: params.formId,
      },
      orderBy: {date: 'desc'},
    }).then(ApiPaginateHelper.wrap())
  }

  readonly create = async ({
    authorEmail,
    formId,
    answerIds,
    property,
    newValue,
    type,
  }: Create) => {
    const currentAnswers = await this.prisma.koboAnswers.findMany({
      where: {
        id: {in: answerIds,}
      }
    }).then(res => seq(res).groupByFirst(_ => _.id))
    return this.prisma.koboAnswersHistory.create({
      data: {
        answers: {
          connect: answerIds.map(id => ({id})),
        },
        by: authorEmail,
        type: type,
        formId,
        ...type !== 'delete' && {
          property,
          newValue: newValue ?? Prisma.JsonNull,
          oldValue: (currentAnswers[_][type === 'tag' ? 'tags' : 'answers'] as any)?.[property] as any,
        }
      }
    })
  }
}