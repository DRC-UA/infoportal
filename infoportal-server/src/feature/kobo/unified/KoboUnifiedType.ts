import {DrcDonor, DrcOffice, DrcProject, DrcSector, UUID} from '@infoportal-common'
import {KoboAnswerFlat, KoboAnswerId, KoboAnswerMetaData, KoboId} from '../../connector/kobo/KoboClient/type/KoboAnswer'
import {MpcaProgram} from '../../mpca/db/MpcaDbType'
import {koboFormsId} from '../../../core/conf/KoboFormsId'
import {OblastName, Person} from '@infoportal-common'
import {KoboUnifiedBasicneeds} from './KoboUnifiedMapperBasicneeds'

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
  disStatus?: KoboUnifiedDisplacementStatus
  sector: DrcSector
  activity?: MpcaProgram[]
  office?: DrcOffice
  project?: DrcProject[]
  donor?: DrcDonor[]
  individualsCount?: number
  individuals?: KoboIndividual[]
}

export type KoboUnifiedOrigin<T extends Record<string, any> = any> = {
  formId: KoboAnswerMetaData['id']
  uuid: KoboAnswerMetaData['uuid']
  answers: T
  date: KoboAnswerMetaData['date']
  id: KoboAnswerMetaData['id']
}
//
// export class KoboUnifiedHelper {
//   static readonly fromPrisma = (d: Omit<KoboUnified, 'date'> & {answers: {uuid: UUID}})
// }

export type KoboUnifiedCreate = KoboUnified

export enum KoboUnifiedDisplacementStatus {
  IDP = 'IDP',
  LongTermResident = 'LongTermResident',
  Returnee = 'Returnee',
  Refugee = 'Refugee'
}

export type KoboIndividual = {
  gender?: Person.Gender
  age?: number
  disability?: string
}
