import {PrismaClient} from '@prisma/client'
import {KoboMetaParams, KoboMetaService} from '../../feature/kobo/meta/KoboMetaService'
import {NextFunction, Request, Response} from 'express'
import {DbHelper} from '../../db/DbHelper'
import {app, AppCacheKey} from '../../index'

export class ControllerKoboMeta {

  constructor(
    private prisma: PrismaClient,
    private service = new KoboMetaService(prisma),
    private cache = app.cache
  ) {
  }

  readonly search = async (req: Request, res: Response, next: NextFunction) => {
    const body = await KoboMetaParams.schemaSearchFilter.validate(req.body)
    const data = await this.service.search(body)
    res.send(DbHelper.toPaginate()(data))
  }

  readonly sync = async (req: Request, res: Response, next: NextFunction) => {
    this.service.sync()
    res.send()
  }

  readonly killCache = async (req: Request, res: Response, next: NextFunction) => {
    this.cache.clear(AppCacheKey.Meta)
    res.send()
  }
}
