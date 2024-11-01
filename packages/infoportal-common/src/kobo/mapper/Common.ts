import {Person} from '../../type/Person'
import {KoboAnswerMetaData} from '../sdk'

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
  PaymentRejected = 'PaymentRejected',

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

export type KoboAnswer<
  T extends Record<string, any> = Record<string, any>,
  TTag extends Record<string, any> | undefined = undefined
> = KoboAnswerMetaData<TTag> & {answers: T}

export type KoboAnswerFlat<
  T extends Record<string, any> = Record<string, string | undefined>,
  TTag extends Record<string, any> | undefined = KoboBaseTags
> = (KoboAnswerMetaData<TTag> & T)