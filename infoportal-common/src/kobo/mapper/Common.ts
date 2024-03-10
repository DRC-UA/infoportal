import {Person} from '../../type/Person'

export type KoboId = string

export type KoboAnswerId = string

export enum KoboValidation {
  Approved = 'Approved',
  Rejected = 'Rejected',
  Pending = 'Pending',
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

export type KoboAnswerMetaData<TTag extends KoboBaseTags = KoboBaseTags> = {
  start: Date
  end: Date
  version: string
  submissionTime: Date
  submittedBy?: string
  id: string
  uuid: string
  validationStatus?: 'validation_status_approved'
  validatedBy?: string
  lastValidatedTimestamp?: number
  geolocation?: [number, number]
  tags?: TTag
  //
  // _id: number,
  // // 'formhub/uuid': string,
  // start: Date,
  // end: Date,
  // // __version__: string,
  // // 'meta/instanceID': string,
  // // _xform_id_string: string,
  // _uuid: UUID,
  attachments: any[],
  // // _status: KoboAnswerStatus,
  // _geolocation: [number, number],
  // _submission_time: Date,
  // // _tags: KoboAnswerTags[],
  // // _notes: KoboAnswerNotes[],
  // // _validation_status: any,
  // // _submitted_by: any
}

export type KoboAnswer<
  TQuestion extends Record<string, any> = Record<string, any>,
  TTags extends KoboBaseTags = KoboBaseTags
> = (KoboAnswerMetaData<TTags> & TQuestion)

