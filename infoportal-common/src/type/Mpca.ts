import {IKoboMeta} from '../kobo/IKoboMeta'
import {WfpDeduplication} from './WfpDeduplication'

export interface MpcaEntity extends IKoboMeta {
  deduplication?: WfpDeduplication
  amountUahSupposed?: number
  amountUahDedup?: number
  amountUahFinal?: number
  amountUahCommitted?: number
}
