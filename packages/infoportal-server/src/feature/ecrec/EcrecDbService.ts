import {PrismaClient} from '@prisma/client'
import type {Request, Response} from 'express'

import {type ApiPaginate, ApiPaginateHelper} from 'infoportal-common'
import type {IKoboMeta} from 'infoportal-common/kobo/IKoboMeta'

import {app, AppCacheKey} from '../../index'
import {KoboMetaService} from '../kobo/meta/KoboMetaService'

export class EcrecDbService {
  constructor(
    private prisma: PrismaClient,
    private meta = new KoboMetaService(prisma),
    private cache = app.cache,
  ) {}

  readonly search = async (): Promise<ApiPaginate<IKoboMeta>> => {
    const meta = await this.meta.search({
      formNames: ['ecrec_vet_bha388', 'ecrec_msmeGrantReg'],
    })

    return ApiPaginateHelper.make()(meta)
  }

  readonly killCache = async (req: Request, res: Response) => {
    this.cache.clear(AppCacheKey.Meta)
    res.send()
  }
}
