import {NextFunction, Request, Response} from 'express'
import {PrismaClient} from '@prisma/client'
import {KoboAnswerHistory} from '../../../feature/kobo/history/KoboAnswerHistoryType'
import {KoboAnswerHistoryService} from '../../../feature/kobo/history/KoboAnswerHistoryService'

export class ControllerKoboAnswerHistory {

  constructor(
    private prisma: PrismaClient,
    private service = new KoboAnswerHistoryService(prisma),
  ) {
  }

  readonly search = async (req: Request, res: Response, next: NextFunction) => {
    const body = await KoboAnswerHistory.validation.search.validate(req.body)
    const data = await this.service.search(body)
    res.send(data)
  }
}
