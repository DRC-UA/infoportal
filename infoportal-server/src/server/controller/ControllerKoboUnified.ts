import {PrismaClient} from '@prisma/client'
import {KoboUnifiedService} from '../../feature/kobo/unified/KoboUnifiedService'
import {NextFunction, Request, Response} from 'express'
import {DbHelper} from '../../db/DbHelper'

export class ControllerKoboUnified {

  constructor(
    private prisma: PrismaClient,
    private service = new KoboUnifiedService(prisma),
  ) {
  }

  readonly search = async (req: Request, res: Response, next: NextFunction) => {
    const data = await this.service.search()
    res.send(DbHelper.toPaginate()(data))
  }
}
