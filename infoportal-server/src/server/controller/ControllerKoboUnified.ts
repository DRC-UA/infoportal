import {PrismaClient} from '@prisma/client'
import {KoboMetaService} from '../../feature/kobo/meta/KoboMetaService'
import {NextFunction, Request, Response} from 'express'
import {DbHelper} from '../../db/DbHelper'

export class ControllerKoboUnified {

  constructor(
    private prisma: PrismaClient,
    private service = new KoboMetaService(prisma),
  ) {
  }

  readonly search = async (req: Request, res: Response, next: NextFunction) => {
    const data = await this.service.search()
    res.send(DbHelper.toPaginate()(data))
  }
}
