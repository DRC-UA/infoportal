import {Person} from '../../type/Person'
import {UUID} from '../../type/Generic'

export type KoboId = string

export type KoboAnswerId = string

export enum KoboValidation {
  Approved = 'Approved',
  Rejected = 'Rejected',
  Pending = 'Pending',
  UnderReview = 'UnderReview',
  Flagged = 'Flagged',
}

export interface KoboBaseTags {
  _validation?: KoboValidation
}

export interface KoboTagStatus<T = CashStatus> {
  status?: T,
  lastStatusUpdate?: Date
}

export interface PersonDetails extends Person.Person {
  displacement?: DisplacementStatus
  disability?: WgDisability[]
}

export enum DisplacementStatus {
  Idp = 'Idp',
  Returnee = 'Returnee',
  Refugee = 'Refugee',
  NonDisplaced = 'NonDisplaced',
}

export enum WgDisability {
  See = 'See',
  Hear = 'Hear',
  Walk = 'Walk',
  Rem = 'Rem',
  Care = 'Care',
  Comm = 'Comm',
  None = 'None',
}

export enum CashStatus {
  Selected = 'Selected',
  Pending = 'Pending',
  Paid = 'Paid',
  Rejected = 'Rejected',
  Referred = 'Referred',

  // Paid = 'Paid',
  // Rejected = 'Rejected',
  // Referred = 'Referred',
  // Received = 'Received',
}

export enum CashForRentStatus {
  FirstPending = 'FirstPending',
  FirstPaid = 'FirstPaid',
  FirstRejected = 'FirstRejected',
  SecondPending = 'SecondPending',
  SecondPaid = 'SecondPaid',
  SecondRejected = 'SecondRejected',
  Selected = 'Selected',
  Referred = 'Referred',
}

export enum VetApplicationStatus {
  Approved = 'Approved',
  FirstPending = 'FirstPending',
  FirstPaid = 'FirstPaid',
  SecondPending = 'SecondPending',
  SecondPaid = 'SecondPaid',
  CertificateSubmitted = 'CertificateSubmitted',
}

export type KoboAnswerMetaData<TTag extends Record<string, any> | undefined = undefined> = {
  start: Date,
  end: Date,
  version?: string
  attachments: KoboAttachment[]
  geolocation: KoboAnswerGeolocation
  /** Extracted from question `date` when exists. */
  date: Date
  submissionTime: Date
  id: KoboAnswerId
  uuid: UUID
  validationStatus?: 'validation_status_approved'//'validation_status_approved'
  validatedBy?: string
  submittedBy?: string
  lastValidatedTimestamp?: number
  source?: string
  updatedAt?: Date
  tags?: TTag
}

export type KoboAnswerGeolocation = [number, number]
export type KoboAnswerTags = any
export type KoboAnswerNotes = any

export type KoboAttachment = {
  download_url: string
  filename: string
  download_small_url: string
  id: string
}

export type KoboAnswer<
  T extends Record<string, any> = Record<string, any>,
  TTag extends Record<string, any> | undefined = undefined
> = KoboAnswerMetaData<TTag> & {answers: T}

export type KoboAnswerFlat<
  T extends Record<string, any> = Record<string, string | undefined>,
  TTag extends Record<string, any> | undefined = KoboBaseTags
> = (KoboAnswerMetaData<TTag> & T)