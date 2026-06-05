import type {UctWfpDeduplication} from '@prisma/client'

import {IKoboMeta} from '../kobo/IKoboMeta.js'
import {KoboBaseTags, KoboTagStatus} from '../kobo/mapper/Kobo.js'

import {DrcProject} from './Drc.js'

export interface MpcaEntityTags extends KoboBaseTags, KoboTagStatus {
  projects?: DrcProject[]
}

export interface MpcaEntity extends IKoboMeta {
  deduplication?: UctWfpDeduplication
  amountUahSupposed?: number
  amountUahDedup?: number
  amountUahFinal?: number
  amountUahCommitted?: number
}
