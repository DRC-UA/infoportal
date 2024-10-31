import {ApiClient, ApiClientParams} from '../../api-client/ApiClient'
import {KoboSdkv2} from './v2/KoboSdkv2'
import {KoboSdkv1} from './v1/KoboSdkv1'
import {Logger} from '../../types'
import {Obj} from '@alexandreannic/ts-utils'

export class KoboSdk {

  constructor({
    urlv1,
    urlv2,
    token,
    ApiClientClass = ApiClient,
    log,
  }: {
    urlv1: string,
    urlv2: string,
    token: string,
    ApiClientClass?: new (_: ApiClientParams) => ApiClient
    log: Logger
  }) {
    this.v1 = new KoboSdkv1(new ApiClientClass({
      baseUrl: urlv1,
      headers: {
        Authorization: KoboSdk.makeAuthorizationHeader(token),
      }
    }))
    this.v2 = new KoboSdkv2(new ApiClientClass({
      baseUrl: urlv2,
      headers: {
        Authorization: KoboSdk.makeAuthorizationHeader(token),
      },
    }), log)
  }

  readonly v1: KoboSdkv1
  readonly v2: KoboSdkv2
  static readonly makeAuthorizationHeader = (token: string) => `Token ${token}`

}
