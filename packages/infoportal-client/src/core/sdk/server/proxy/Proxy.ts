import {UUID} from 'infoportal-common'

export interface Proxy {
  id: UUID
  createdAt: Date
  expireAt?: Date
  createdBy?: string
  name: string
  slug: string
  url: string
  disabled: boolean
}

export class Proxy {
  static readonly map = (_: any): Proxy => {
    return {
      ..._,
      createdAt: new Date(_.createdAt),
      expireAt: _.expireAt ? new Date(_.expireAt) : undefined,
      disabled: !!_.disabled,
    }
  }

  static readonly makeUrl = (_: Proxy) => window.location.origin + '/proxy/' + _.slug
}
