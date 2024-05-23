import {PrismaClient} from '@prisma/client'
import {logger, Logger} from '../../../helper/Logger'
import {KoboAnswerHistory} from './KoboAnswerHistoryType'
import {DbHelper} from '../../../db/DbHelper'


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
}