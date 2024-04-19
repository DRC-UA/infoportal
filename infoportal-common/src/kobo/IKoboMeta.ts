import {StateStatus, UUID} from '../type/Generic'
import {OblastName} from '../location'
import {DrcDonor, DrcOffice, DrcProgram, DrcProject, DrcSector} from '../type/Drc'
import {CashStatus, DisplacementStatus, KoboId, PersonDetails, ShelterTaPriceLevel} from './mapper'
import {fnSwitch} from '@alexandreannic/ts-utils'

export type IKoboMeta<TTag = any> = {
  id: UUID
  uuid: UUID
  koboId: KoboId
  formId: KoboId
  referencedFormId?: KoboId
  updatedAt?: Date
  date: Date

  oblast: OblastName
  enumerator?: string
  raion?: string
  hromada?: string
  settlement?: string
  firstName?: string
  lastName?: string
  patronymicName?: string
  phone?: string
  displacement?: DisplacementStatus
  sector: DrcSector
  activity?: DrcProgram
  office?: DrcOffice
  project: DrcProject[]
  donor: DrcDonor[]
  persons?: PersonDetails[]
  personsCount?: number
  status?: KoboMetaStatus
  lastStatusUpdate?: Date

  taxId?: string
  taxIdFileName?: string
  taxIdFileUrl?: string

  idFileName?: string
  idFileUrl?: string

  passportSerie?: string
  passportNum?: string

  tags?: TTag
}

export enum KoboMetaStatus {
  Committed = 'Committed',
  Pending = 'Pending',
  Rejected = 'Rejected',
}

export const koboMetaStatusLabel: Record<KoboMetaStatus, StateStatus> = {
  Committed: 'success',
  Pending: 'warning',
  Rejected: 'error',
}

export type KoboMetaShelterRepairTags = {
  damageLevel?: ShelterTaPriceLevel
}

export namespace KoboMetaHelper {

  const cashStatus: Partial<Record<CashStatus, KoboMetaStatus>> = {
    Selected: KoboMetaStatus.Pending,
    Pending: KoboMetaStatus.Pending,
    Paid: KoboMetaStatus.Committed,
    Rejected: KoboMetaStatus.Rejected,
  }

  export const mapCashStatus = (_?: CashStatus): KoboMetaStatus | undefined => {
    return fnSwitch(_!, cashStatus, () => undefined)
  }
}
