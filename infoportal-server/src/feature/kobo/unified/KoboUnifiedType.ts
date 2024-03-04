import {DisplacementStatus, DrcDonor, DrcOffice, DrcProgram, DrcProject, DrcSector, OblastName, PersonDetails, UUID} from '@infoportal-common'
import {KoboAnswerMetaData, KoboId} from '../../connector/kobo/KoboClient/type/KoboAnswer'

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

export type KoboUnifiedOrigin<T extends Record<string, any> = any> = {
  formId: KoboAnswerMetaData['id']
  uuid: KoboAnswerMetaData['uuid']
  answers: T
  date: KoboAnswerMetaData['date']
  id: KoboAnswerMetaData['id']
}

export type KoboUnifiedCreate = KoboUnified
