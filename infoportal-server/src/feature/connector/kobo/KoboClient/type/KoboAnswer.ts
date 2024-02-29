import {ApiPaginate, Period, UUID} from '@infoportal-common'
import {seq} from '@alexandreannic/ts-utils'

export type KoboId = string

export type KoboAnswerId = string

export interface KoboAnswerParams extends Partial<Period> {
}

export interface KoboAnswerStatus {
  SubmittedViaWeb: 'submitted_via_web'
}

export type KoboAttachment = any
// export type KoboAttachment = {
//   download_url: string
//   filename: string
//   download_small_url: string
//   id: string
// }

export type KoboAnswerGeolocation = any
export type KoboAnswerTags = any
export type KoboAnswerNotes = any

export type KoboAnswerMetaData<TTag extends Record<string, any> | undefined = undefined> = Pick<ApiKoboAnswerMetaData, 'start' | 'end'> & {
  version?: ApiKoboAnswerMetaData['__version__']
  attachments?: KoboAttachment[]
  geolocation: ApiKoboAnswerMetaData['_geolocation']
  /** Extracted from question `date` when exists. */
  date: Date
  submissionTime: ApiKoboAnswerMetaData['_submission_time']
  id: ApiKoboAnswerMetaData['_id']
  uuid: ApiKoboAnswerMetaData['_uuid']
  validationStatus?: string//'validation_status_approved'
  validatedBy?: string
  submittedBy?: string
  lastValidatedTimestamp?: number
  source?: string
  tags?: TTag
}

export const koboAnswerMetaData: (keyof KoboAnswerMetaData)[] = [
  'version',
  'attachments',
  'geolocation',
  'submissionTime',
  'id',
  'uuid',
  'validationStatus',
  'validatedBy',
  'lastValidatedTimestamp',
]

export interface ApiKoboAnswerMetaData {
  _id: string,
  start: Date,
  end: Date,
  __version__?: string,
  _xform_id_string: string,
  _uuid: UUID,
  _attachments?: KoboAttachment[],
  _status: KoboAnswerStatus,
  _geolocation: KoboAnswerGeolocation,
  _submission_time: Date,
  _tags: KoboAnswerTags[],
  _notes: KoboAnswerNotes[],
  _validation_status: {
    timestamp: number
    uid: 'validation_status_approved'
    by_whom: string
  },
  _submitted_by: any
  // 'formhub/uuid': string,
  // 'meta/instanceID': string,
}

export type ApiKoboAnswer = ApiKoboAnswerMetaData & Record<string, any>

// export interface KoboAnswer extends KoboAnswerMetaData {
//   [key: string]: string
// }
export type KoboAnswer<
  T extends Record<string, any> = Record<string, any>,
  TTag extends Record<string, any> | undefined = undefined
> = KoboAnswerMetaData<TTag> & {answers: T}

export type KoboAnswerFlat<
  T extends Record<string, any> = Record<string, string | undefined>,
  TTag extends Record<string, any> | undefined = undefined
> = (KoboAnswerMetaData<TTag> & T)

export type DbKoboAnswer<
  T extends Record<string, any> = Record<string, any>,
> = KoboAnswer<T, any> & {formId: KoboId}

export interface KoboApiList<T> {
  count: number,
  results: T[]
}

export class KoboAnswerUtils {

  static readonly mapAnswersMetaData = (k: ApiPaginate<Record<keyof ApiKoboAnswerMetaData, any>>): ApiPaginate<KoboAnswerMetaData> => {
    return {
      ...k,
      data: k.data.map(KoboAnswerUtils.mapAnswer)
    }
  }

  static readonly mapKoboSubmissionTime = (_: any): Date => {
    return new Date(_)
  }

  static readonly mapAnswer = (k: ApiKoboAnswer): KoboAnswer => {
    delete k['formhub/uuid']
    delete k['meta/instanceId']
    const {
      _id,
      start,
      end,
      __version__,
      _xform_id_string,
      _uuid,
      _attachments,
      _status,
      _geolocation,
      _submission_time,
      _tags,
      _notes,
      _validation_status,
      _submitted_by,
      ...answers
    } = k
    const submissionTime = KoboAnswerUtils.mapKoboSubmissionTime(_submission_time)
    return {
      attachments: _attachments,
      geolocation: _geolocation,
      date: k.date ? new Date(k.date) : submissionTime,
      start: start ? new Date(start) : submissionTime,
      end: end ? new Date(end) : submissionTime,
      submissionTime,
      version: __version__,
      id: '' + _id,
      uuid: _uuid,
      submittedBy: _submitted_by,
      validationStatus: _validation_status?.uid,
      lastValidatedTimestamp: _validation_status?.timestamp,
      validatedBy: _validation_status?.by_whom,
      answers: KoboAnswerUtils.removeGroup(answers),
    }
  }

  static readonly removeGroup = (answers: Record<string, any>): Record<string, any> => {
    return seq(Object.entries(answers)).reduceObject(([k, v]) => {
      const nameWithoutGroup = k.replace(/^.*\//, '')
      if (Array.isArray(v)) {
        return [nameWithoutGroup, v.map(KoboAnswerUtils.removeGroup)]
      }
      return [nameWithoutGroup, v]
    })
  }
  // static readonly mapAnswerMetaData = (k: Record<keyof KoboAnswerMetaData, any>): KoboAnswerMetaData => {
  //   return {
  //     ...k,
  //     start: new Date(k.start),
  //     end: new Date(k.end),
  //     _submission_time: new Date(k._submission_time),
  //   }
  // }
}

export interface KoboApiVersion {
  uid: string
  url: string
  content_hash: string
  date_deployed: Date
  date_modified: Date
}
