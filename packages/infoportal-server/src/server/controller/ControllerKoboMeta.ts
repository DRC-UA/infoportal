import {PrismaClient} from '@prisma/client'
import type {Request, Response} from 'express'

import {ApiPaginateHelper} from 'infoportal-common'

import {KoboMetaParams, KoboMetaService} from '../../feature/kobo/meta/KoboMetaService.js'
import {app, AppCacheKey} from '../../index.js'

export class ControllerKoboMeta {
  constructor(
    private prisma: PrismaClient,
    private service = new KoboMetaService(prisma),
    private cache = app.cache,
  ) {}

  readonly search = async (req: Request, res: Response) => {
    const body = await KoboMetaParams.schemaSearchFilter.validate(req.body)
    const data = await this.service.search(body)
    res.send(ApiPaginateHelper.wrap()(data))
  }

  readonly sync = async (_req: Request, res: Response) => {
    await this.service.syncAll()
    res.send()
  }

  readonly killCache = async (_req: Request, res: Response) => {
    this.cache.clear(AppCacheKey.Meta)
    res.send()
  }
}
