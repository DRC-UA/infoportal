import {Kobo} from '../Kobo'

export interface SubmitResponse {
  message?: 'Successful submission.',
  formid?: Kobo.Answer.Id
  encrypted?: boolean,
  instanceID?: string,
  submissionDate?: string,
  markedAsCompleteDate?: string
  error?: 'Duplicate submission'
}

export interface KoboV1Form {
  uuid: string
  id_string: Kobo.Answer.Id
}