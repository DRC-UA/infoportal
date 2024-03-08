import {UUID} from '../type/Generic'
import {OblastName} from '../location'
import {DrcDonor, DrcOffice, DrcProgram, DrcProject, DrcSector} from '../type/Drc'
import {DisplacementStatus, KoboId, PersonDetails} from './mapper'

export enum KoboMetaStatus {
  Committed = 'Committed',
  Pending = 'Pending',
  Rejected = 'Rejected',
}

export type IKoboMeta = {
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
  disStatus?: DisplacementStatus
  sector: DrcSector
  activity: DrcProgram[]
  office?: DrcOffice
  project?: DrcProject[]
  donor?: DrcDonor[]
  personsCount?: number
  persons?: PersonDetails[]
  status?: KoboMetaStatus
  committedAt?: Date
}