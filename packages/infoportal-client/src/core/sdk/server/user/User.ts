import {DrcJob, DrcOffice} from 'infoportal-common'

export interface User {
  email: string
  name: string
  accessToken: string
  admin?: boolean
  drcJob?: DrcJob
  createdAt?: Date
  lastConnectedAt?: Date
  drcOffice?: DrcOffice
}

export class User {
  static readonly map = (u: Record<keyof User, any>): User => {
    return {
      ...u,
      lastConnectedAt: u.lastConnectedAt ? new Date(u.lastConnectedAt) : undefined,
      createdAt: u.createdAt ? new Date(u.createdAt) : undefined,
    }
  }
}
