import {UUID} from '../type/Generic'
import {OblastName} from '../location'
import {DrcDonor, DrcOffice, DrcProgram, DrcProject, DrcSector} from '../type/Drc'
import {DisplacementStatus, KoboId, PersonDetails} from './mapper'

export type KoboUnified = {
  id: UUID
  uuid: UUID
  formId: KoboId
  referencedFormId?: KoboId

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
  individualsCount?: number
  individuals?: PersonDetails[]
}