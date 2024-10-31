import {duration, lazy, seq} from '@alexandreannic/ts-utils'
import {KoboId, KoboSdk, UUID} from 'infoportal-common'
import {KoboServer, PrismaClient} from '@prisma/client'
import {app, AppCacheKey} from '../../index'

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

  readonly getServerById = lazy(async (koboServerId: UUID): Promise<KoboServer> => {
    this.log.info(`Get KoboSdk for server ${koboServerId}`)
    return this.prisma.koboServer.findFirstOrThrow({where: {id: koboServerId}})
      .catch(() => this.prisma.koboServer.findFirstOrThrow())
  })

  readonly getByFormId = async (formId: KoboId): Promise<KoboSdk> => {
    const index = await this.getServerIndex()
    return this.getByServerId(index[formId])
  }

  readonly getByServerId = app.cache.request({
    key: AppCacheKey.KoboSdk,
    ttlMs: duration(7, 'day'),
    genIndex: _ => _,
    fn: async (serverId: UUID): Promise<KoboSdk> => {
      this.log.info(`Rebuilding KoboSdk form server ${serverId}`)
      const server = await this.getServerById(serverId)
      return this.buildSdk(server)
    }
  })

  private readonly buildSdk = (server: KoboServer): KoboSdk => {
    return new KoboSdk({
      urlv1: server.urlV1 + '/api/v1',
      urlv2: server.url + '/api',
      token: server.token,
      log: app.logger('KoboSdk'),
    })
  }
}