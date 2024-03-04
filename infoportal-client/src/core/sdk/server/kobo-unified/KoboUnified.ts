import {KoboUnified} from '@infoportal-common'

export class KoboUnifiedHelper {

  static readonly mapEntity = (_: Record<keyof KoboUnified, any>): KoboUnified => {
    if (_.date) _.date = new Date(_.date)
    return _
  }
}