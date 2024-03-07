import {IKoboMeta} from '@infoportal-common'

export class KoboMetaHelper {

  static readonly mapEntity = (_: Record<keyof IKoboMeta, any>): IKoboMeta => {
    if (_.date) _.date = new Date(_.date)
    return _
  }
}