import {duration, seq} from '@alexandreannic/ts-utils'
import {KoboId, KoboSdk, UUID} from 'infoportal-common'
import {KoboServer, PrismaClient} from '@prisma/client'
import {app, AppCacheKey} from '../../index'
import {AppError} from '../../helper/Errors'

export class KoboSdkGenerator {

  static instance: KoboSdkGenerator | null = null

  static readonly getSingleton = (pgClient: PrismaClient) => {
    if (!this.instance) {
      this.instance = new KoboSdkGenerator(pgClient)
    }
    return this.instance
  }

  private constructor(
    private prisma: PrismaClient,
    private log = app.logger('KoboSdkGenerator')
  ) {
  }

  readonly getServerBy = (() => {
    const id = async (koboServerId: UUID): Promise<KoboServer> => {
      return this.prisma.koboServer.findFirstOrThrow({where: {id: koboServerId}})
        .catch(() => this.prisma.koboServer.findFirstOrThrow())
    }
    const formId = async (formId: UUID): Promise<KoboServer> => {
      return this.getServerId(formId).then(id)
    }
    return {formId, id}
  })()

  readonly getBy = {
    formId: async (formId: KoboId): Promise<KoboSdk> => {
      return this.getServerId(formId).then(this.getBy.serverId)
    },
    serverId: app.cache.request({
      key: AppCacheKey.KoboSdk,
      ttlMs: duration(7, 'day'),
      genIndex: _ => _,
      fn: async (serverId: UUID): Promise<KoboSdk> => {
        this.log.info(`Rebuilding KoboSdk form server ${serverId}`)
        const server = await this.getServerBy.id(serverId)
        return this.buildSdk(server)
      }
    })
  }

  private readonly getServerIndex = app.cache.request({
    key: AppCacheKey.KoboServerIndex,
    ttlMs: duration(7, 'day'),
    fn: async (): Promise<Record<KoboId, UUID>> => {
      return this.prisma.koboForm.findMany({
        select: {id: true, serverId: true,}
      }).then(_ => {
        this.log.info(`Recalculate server index`)
        return seq(_).groupByAndApply(_ => _.id, _ => _[0].serverId)
      })
    }
  })

  private readonly getServerId = async (formId: KoboId): Promise<UUID> => {
    return await this.getServerIndex()
      .then(_ => _[formId])
      .then(AppError.throwNotFoundIfUndefined(`No serverId for form ${formId}`))
  }

  private readonly buildSdk = (server: KoboServer): KoboSdk => {
    return new KoboSdk({
      urlv1: server.urlV1 + '/api/v1',
      urlv2: server.url + '/api',
      token: server.token,
      log: app.logger('KoboSdk'),
    })
  }
}