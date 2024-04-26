import {KoboQuestionSchema} from '@/core/sdk/server/kobo/KoboApi'
import {Enum} from '@alexandreannic/ts-utils'
import {KoboAnswerFlat, KoboAnswerId, KoboBaseTags, KoboAttachment, KoboId} from '@infoportal-common'
import {ApiPaginate} from '@/core/sdk/server/_core/ApiSdkUtils'

export type KoboServer = {
  id: string
  url: string
  token: string
}

export interface KoboForm {
  server: KoboServer
  createdAt: Date
  updatedAt: Date
  id: KoboId
  name: string
  serverId: string
  uploadedBy?: string
}

export class KoboFormHelper {
  static readonly map = (_: Record<keyof KoboForm, any>): KoboForm => {
    _.updatedAt = new Date(_.updatedAt)
    _.createdAt = new Date(_.createdAt)
    return _
  }
}

export type KoboAnswerMetaData<TTag extends KoboBaseTags = KoboBaseTags> = {
  start: Date
  end: Date
  date: Date
  version?: string
  submissionTime: Date
  submittedBy?: string
  id: KoboAnswerId
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
  attachments: KoboAttachment[],
  // // _status: KoboAnswerStatus,
  // _geolocation: [number, number],
  // _submission_time: Date,
  // // _tags: KoboAnswerTags[],
  // // _notes: KoboAnswerNotes[],
  // // _validation_status: any,
  // // _submitted_by: any
}

export type KoboMappedAnswerType = string | string[] | Date | number | undefined | KoboAnswerFlat<any>[]

export type KoboMappedAnswer<T extends Record<string, any> = Record<string, KoboMappedAnswerType>> = (KoboAnswerMetaData & T)

export class Kobo {

  static readonly mapPaginateAnswerMetaData = <
    TKoboAnswer extends Record<string, any>,
    TTags extends KoboBaseTags,
    TCustomAnswer extends KoboAnswerFlat<TKoboAnswer, TTags>
  >(
    fnMap: (x: any) => TKoboAnswer,
    fnMapTags: (x: any) => TTags,
    fnMapCustom?: (x: KoboAnswerFlat<TKoboAnswer, TTags>) => TCustomAnswer
  ) => (_: ApiPaginate<Record<string, any>>): ApiPaginate<TCustomAnswer> => {
    return ({
      ..._,
      data: _.data.map(({answers, ...meta}) => {
        const r = {
          ...fnMap(answers),
          ...Kobo.mapAnswerMetaData(meta, fnMapTags),
        }
        return fnMapCustom ? fnMapCustom(r) : r
      })
    })
  }

  static readonly mapAnswerBySchema = (indexedSchema: Record<string, KoboQuestionSchema>, answers: KoboAnswerFlat): KoboMappedAnswer => {
    const mapped: KoboMappedAnswer = {...answers}
    Enum.entries(mapped).forEach(([question, answer]) => {
      const type = indexedSchema[question]?.type
      if (!type || !answer) return
      switch (type) {
        case 'today':
        case 'date': {
          (mapped as any)[question] = new Date(answer as Date)
          break
        }
        case 'select_multiple': {
          mapped[question] = (answer as string).split(' ')
          break
        }
        case 'begin_repeat': {
          if (mapped[question]) {
            mapped[question] = (mapped[question] as any).map((_: any) => Kobo.mapAnswerBySchema(indexedSchema, _))
          }
          break
        }
        default:
          break
      }
    })
    return mapped
  }

  static readonly mapAnswerMetaData = (
    k: Partial<Record<keyof KoboAnswerMetaData, any>>,
    fnMapTags: (x: any) => any = _ => _
  ): KoboAnswerFlat<any, KoboBaseTags> => {
    delete (k as any)['deviceid']
    return {
      ...k,
      start: new Date(k.start),
      end: new Date(k.end),
      date: new Date(k.date),
      submissionTime: new Date(k.submissionTime),
      version: k.version,
      id: k.id,
      validationStatus: k.validationStatus,
      validatedBy: k.validatedBy,
      lastValidatedTimestamp: k.lastValidatedTimestamp,
      geolocation: k.geolocation,
      tags: fnMapTags(k.tags) ?? {},
    }
  }

  static readonly extraxtAnswerMetaData = (
    k: KoboAnswerMetaData,
    fnMapTags: (x: any) => any = _ => _
  ): KoboAnswerFlat<any, KoboBaseTags> => {
    return {
      start: k.start,
      end: k.end,
      submissionTime: k.submissionTime,
      version: k.version,
      id: k.id,
      validationStatus: k.validationStatus,
      validatedBy: k.validatedBy,
      lastValidatedTimestamp: k.lastValidatedTimestamp,
      geolocation: k.geolocation,
      tags: fnMapTags(k.tags) ?? {},
    }
  }
}

export interface ApiKoboForm {
  // access_types: null
  // asset_type: "survey"
  // children: {count: 0}
  // data: "https://kobo.humanitarianresponse.info/api/v2/assets/aRHsewShwZhXiy8jrBj9zf/data/"
  // data_sharing: {}
  date_created: Date
  date_modified: Date
  deployed_version_id: string
  deployment__active: boolean
  // deployment__identifier: "https://kc.humanitarianresponse.info/alexandre_annic_drc/forms/aRHsewShwZhXiy8jrBj9zf"
  deployment__submission_count: 0
  // downloads: [,…]
  // export_settings: []
  has_deployment: boolean
  // kind: "asset"
  name: string
  // owner: "https://kobo.humanitarianresponse.info/api/v2/users/alexandre_annic_drc/"
  owner__username: string
  // parent: null
  // permissions: [{,…}, {,…}, {,…}, {,…}, {,…}, {,…}, {,…}, {,…}]
  // settings: {sector: {label: "Humanitarian - Coordination / Information Management",…},…}
  // status: "private"
  subscribers_count: 0
  // summary: {geo: false,…}
  // tag_string: ""
  uid: string
  // url: "https://kobo.humanitarianresponse.info/api/v2/assets/aRHsewShwZhXiy8jrBj9zf/"
  version_id: string
}
