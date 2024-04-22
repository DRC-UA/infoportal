import {IKoboMeta} from '../kobo/IKoboMeta'
import {WfpDeduplication} from './WfpDeduplication'
import {KoboBaseTags, KoboTagStatus} from '../kobo/mapper'
import {DrcProject} from './Drc'

export interface MpcaEntityTags extends KoboBaseTags, KoboTagStatus {
  projects?: DrcProject[]
}

export interface MpcaEntity extends IKoboMeta {
  deduplication?: WfpDeduplication
  amountUahSupposed?: number
  amountUahDedup?: number
  amountUahFinal?: number
  amountUahCommitted?: number
}
