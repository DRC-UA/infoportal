import {DrcProgram, IKoboMeta, KoboMetaStatus} from '@infoportal-common'

export interface KoboMetaSearchParans {
  filters?: {
    activities?: DrcProgram[]
    status?: KoboMetaStatus[]
  }
}

export class KoboMetaHelper {

  static readonly mapEntity = (_: Record<keyof IKoboMeta, any>): IKoboMeta => {
    if (_.date) _.date = new Date(_.date)
    return _
  }
}