import {UUID} from '../type/Generic'
import {OblastName} from '../location'
import {DrcDonor, DrcOffice, DrcProgram, DrcProject, DrcSector} from '../type/Drc'
import {DisplacementStatus, KoboId, PersonDetails, ShelterTaPriceLevel} from './mapper'

export type IKoboMeta<TTag = any> = {
  id: UUID
  uuid: UUID
  formId: KoboId
  referencedFormId?: KoboId
  updatedAt?: Date
  date: Date

  oblast: OblastName
  enumerator?: string
  raion?: string
  hromada?: string
  settlement?: string
  taxId?: string
  firstName?: string
  lastName?: string
  patronymicName?: string
  phone?: string
  displacement?: DisplacementStatus
  sector: DrcSector
  activity: DrcProgram[]
  office?: DrcOffice
  project?: DrcProject[]
  donor?: DrcDonor[]
  personsCount?: number
  persons?: PersonDetails[]
  status?: KoboMetaStatus
  committedAt?: Date
  tags?: TTag
}

export enum KoboMetaStatus {
  Committed = 'Committed',
  Pending = 'Pending',
  Rejected = 'Rejected',
}

export type KoboMetaShelterRepairTags = {
  damageLevel?: ShelterTaPriceLevel
}
