import {match} from '@axanc/ts-utils'
import {Kobo} from 'kobo-sdk'

import {OblastName} from '../location/index.js'
import {DrcDonor, DrcOffice, DrcProgram, DrcProject, DrcSector} from '../type/Drc.js'
import {StateStatus, UUID} from '../type/Generic.js'
import {Person} from '../type/Person.js'

import {CashStatus, KoboValidation, ShelterTaPriceLevel} from './mapper/index.js'

export type IKoboMeta<TTag = any> = {
  id: UUID
  uuid: UUID
  koboId: Kobo.SubmissionId
  formId: Kobo.FormId
  referencedFormId?: Kobo.FormId
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
  displacement?: Person.DisplacementStatus
  sector: DrcSector
  activity?: DrcProgram
  office?: DrcOffice
  project: DrcProject[]
  donor: DrcDonor[]

  persons?: Person.Details[]
  personsCount?: number

  status?: KoboMetaStatus
  lastStatusUpdate?: Date

  taxId?: string
  taxIdFileName?: string
  taxIdFileId?: number
  idFileName?: string
  idFileId?: number
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

export type KoboMetaTag = KoboMetaShelterRepairTags & KoboMetaTagNfi & KoboMetaEcrecTags

export type KoboMetaEcrecTags = {
  amount?: number
  employeesCount?: number
}
export type KoboMetaShelterRepairTags = {
  damageLevel?: ShelterTaPriceLevel
}

export type KoboMetaTagNfi = {
  HKF?: number
  NFKF_KS?: number
  FoldingBed?: number
  FKS?: number
  CollectiveCenterKits?: number
  BK?: number
  WKB?: number
  HKMV?: number
  ESK?: number
}

export namespace KoboMetaHelper {
  const cashStatus: Partial<Record<CashStatus, KoboMetaStatus>> = {
    Selected: KoboMetaStatus.Pending,
    Pending: KoboMetaStatus.Pending,
    Paid: KoboMetaStatus.Committed,
    Rejected: KoboMetaStatus.Rejected,
  }

  const msmeStatus: Partial<Record<string, KoboMetaStatus>> = {
    pending: KoboMetaStatus.Pending,
    done: KoboMetaStatus.Committed,
  }

  const validationStatus: Partial<Record<KoboValidation, KoboMetaStatus>> = {
    [KoboValidation.Approved]: KoboMetaStatus.Committed,
    [KoboValidation.Rejected]: KoboMetaStatus.Rejected,
    [KoboValidation.Pending]: KoboMetaStatus.Pending,
    [KoboValidation.UnderReview]: KoboMetaStatus.Pending,
    [KoboValidation.Flagged]: KoboMetaStatus.Pending,
  }

  export const mapCashStatus = (status: CashStatus | undefined): KoboMetaStatus | undefined => {
    return match(status).cases(cashStatus).default(undefined)
  }

  export const mapMsmeStatus = (status: 'done' | 'pending' | undefined): KoboMetaStatus | undefined => {
    return match(status).cases(msmeStatus).default(undefined)
  }

  export const mapValidationStatus = (status: KoboValidation | undefined): KoboMetaStatus | undefined => {
    return match(status).cases(validationStatus).default(undefined)
  }
}
