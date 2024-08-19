import {KoboId} from '../../mapper'

export interface SubmitResponse {
  message?: 'Successful submission.',
  formid?: KoboId
  encrypted?: boolean,
  instanceID?: string,
  submissionDate?: string,
  markedAsCompleteDate?: string
  error?: 'Duplicate submission'
}

export interface KoboV1Form {
  uuid: string
  id_string: KoboId
}