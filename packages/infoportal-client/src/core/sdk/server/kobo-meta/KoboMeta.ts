import {DrcProgram, DrcSector, IKoboMeta, KoboMetaStatus} from 'infoportal-common'

export interface KoboMetaSearchParams {
  activities?: DrcProgram[]
  sectors?: DrcSector[]
  status?: KoboMetaStatus[]
}

export class KoboMetaHelper {
  static readonly mapEntity = (_: Record<keyof IKoboMeta, any>): IKoboMeta => {
    if (_.date) _.date = new Date(_.date)
    if (_.lastStatusUpdate) _.lastStatusUpdate = new Date(_.lastStatusUpdate)
    return _
  }
}
