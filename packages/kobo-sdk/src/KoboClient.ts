import {KoboV2Client} from './v2/KoboV2Client'
import {KoboV1Client} from './v1/KoboV1Client'
import {ApiClient, ApiClientParams} from './api-client/ApiClient'
import {Logger} from './Kobo'

export class KoboClient {
  constructor({
    urlv1,
    urlv2,
    token,
    ApiClientClass = ApiClient,
    log,
  }: {
    urlv1: string
    urlv2: string
    token: string
    ApiClientClass?: new (_: ApiClientParams) => ApiClient
    log: Logger
  }) {
    this.v1 = new KoboV1Client(
      new ApiClientClass({
        baseUrl: urlv1,
        headers: {
          Authorization: KoboClient.makeAuthorizationHeader(token),
        },
      }),
      log,
    )
    this.v2 = new KoboV2Client(
      new ApiClientClass({
        baseUrl: urlv2,
        headers: {
          Authorization: KoboClient.makeAuthorizationHeader(token),
        },
      }),
      log,
    )
  }

  readonly v1: KoboV1Client
  readonly v2: KoboV2Client
  static readonly makeAuthorizationHeader = (token: string) => `Token ${token}`
}
