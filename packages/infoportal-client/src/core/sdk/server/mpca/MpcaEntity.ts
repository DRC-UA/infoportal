import {DrcProject, KoboBaseTags, KoboTagStatus, MpcaEntity} from 'infoportal-common'
import {Obj} from '@alexandreannic/ts-utils'

export interface MpcaTypeTag extends KoboBaseTags, KoboTagStatus {
  projects?: DrcProject[]
}

export class MpcaHelper {
  static readonly projects = Obj.keys({
    // [DrcProject['Novo-Nordisk (UKR-000274)']]: true,
    [DrcProject['UKR-000322 ECHO2']]: true,
    [DrcProject['UKR-000340 Augustinus Fonden']]: true,
    [DrcProject['UKR-000284 BHA']]: true,
    [DrcProject['UKR-000347 DANIDA']]: true,
    [DrcProject['UKR-000341 Hoffmans & Husmans']]: true,
    [DrcProject['UKR-000298 Novo-Nordisk']]: true,
    [DrcProject['UKR-000309 OKF']]: true,
    [DrcProject['UKR-000270 Pooled Funds']]: true,
    [DrcProject['UKR-000342 Pooled Funds']]: true,
    [DrcProject['UKR-000306 Dutch II']]: true,
    [DrcProject['UKR-000330 SDC2']]: true,
  })

  static readonly map = (_: MpcaEntity): MpcaEntity => {
    _.date = new Date(_.date)
    if (_?.lastStatusUpdate) _.lastStatusUpdate = new Date(_.lastStatusUpdate)
    return _
  }
}
