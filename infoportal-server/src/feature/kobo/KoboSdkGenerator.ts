import {lazy} from '@alexandreannic/ts-utils'
import {UUID} from '@infoportal-common'
import {KoboSdk} from '../connector/kobo/KoboClient/KoboSdk'
import {ApiClient} from '../../core/client/ApiClient'
import {PrismaClient} from '@prisma/client'
import {KoboSdkV1} from '../connector/kobo/KoboSdkV1/KoboSdkV1'

export class KoboSdkGenerator {

  constructor(
    private pgClient: PrismaClient,
  ) {
  }

  readonly get = lazy(async (koboServerId: UUID) => {
    const k = await this.pgClient.koboServer.findFirstOrThrow({where: {id: koboServerId}})
      .catch(() => this.pgClient.koboServer.findFirstOrThrow())
    return new KoboSdk(new ApiClient({
      baseUrl: k.url + '/api',
      headers: {
        Authorization: KoboSdk.makeAuthorizationHeader(k.token),
      }
    }))
  })

  readonly getV1 = lazy(async (koboServerId: UUID) => {
    const k = await this.pgClient.koboServer.findFirstOrThrow({where: {id: koboServerId}})
      .catch(() => this.pgClient.koboServer.findFirstOrThrow())
    return new KoboSdkV1(new ApiClient({
      baseUrl: k.urlV1 + '/api/v1',
      headers: {
        Authorization: KoboSdk.makeAuthorizationHeader(k.token),
      }
    }))
  })
}