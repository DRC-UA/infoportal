import {lazy} from '@alexandreannic/ts-utils'
import {KoboSdk, UUID} from '@infoportal-common'
import {KoboServer, PrismaClient} from '@prisma/client'
import {appConf} from '../../core/conf/AppConf'
import {app} from '../../index'

export class KoboSdkGenerator {

  constructor(
    private pgClient: PrismaClient,
    private conf = appConf,
    private log = app.logger('KoboSdkGenerator')
  ) {
  }

  readonly getServer = lazy(async (koboServerId?: UUID): Promise<KoboServer> => {
    this.log.info(`Get KoboSdk for server ${koboServerId} (default: ${this.conf.kobo.dbDefaultServerId})`)
    return this.pgClient.koboServer.findFirstOrThrow({where: {id: koboServerId ?? this.conf.kobo.dbDefaultServerId}})
      .catch(() => this.pgClient.koboServer.findFirstOrThrow())
  })

  readonly get = async (koboServerId?: UUID): Promise<KoboSdk> => {
    const k = await this.getServer(koboServerId)
    return new KoboSdk({
      urlv1: k.urlV1 + '/api',
      urlv2: k.url + '/api',
      token: k.token,
      log: app.logger('KoboSdk'),
    })
  }
}