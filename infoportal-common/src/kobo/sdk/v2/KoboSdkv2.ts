import {ApiPaginate, KoboAnswer, KoboAnswerId, KoboApiSchema, KoboId} from '../../../index'
import {ApiClient} from '../../../api-client/ApiClient'
import {ApiKoboAnswerMetaData, KoboAnswerParams, KoboAnswerUtils, KoboApiList, KoboApiVersion} from './type/KoboAnswer'
import {map} from '@alexandreannic/ts-utils'
import axios from 'axios'
import {KoboHook} from './type/KoboHook'
import {KoboSdkv2FixedUpdated, KoboUpdateDataParams, KoboUpdateDataParamsData} from './KoboSdkv2FixedUpdated'

const koboToApiPaginate = <T>(_: KoboApiList<T>): ApiPaginate<T> => {
  return {
    total: _.count,
    data: _.results,
  }
}

export class KoboSdkv2 {
  constructor(
    private api: ApiClient,
    private editSdk = new KoboSdkv2FixedUpdated(api),
  ) {
  }

  static readonly webHookName = 'InfoPortal'

  static readonly parseDate = (_: Date) => _.toISOString()

  static readonly makeDateFilter = (name: string, operator: 'gte' | 'lte', date: Date) => {
    return {[name]: {['$' + operator]: KoboSdkv2.parseDate(date)}}
  }

  readonly getForm = (form: string) => {
    return this.api.get<KoboApiSchema>(`/v2/assets/${form}`).then(_ => {
      _.content.survey.forEach(q => {
        q.name = q.$autoname ?? q.name
      })
      return _
    })
  }

  readonly getHook = (formId: KoboId): Promise<ApiPaginate<KoboHook>> => {
    return this.api.get<KoboApiList<KoboHook>>(`/v2/assets/${formId}/hooks/`).then(koboToApiPaginate)
  }

  readonly createWebHook = (formId: KoboId, destinationUrl: string) => {
    return this.api.post(`/v2/assets/${formId}/hooks/`, {
      body: {
        'name': KoboSdkv2.webHookName,
        endpoint: destinationUrl,
        // 'endpoint': this.conf.baseUrl + `/kobo-api/webhook`,
        'active': true,
        'subset_fields': [],
        'email_notification': true,
        'export_type': 'json',
        'auth_level': 'no_auth',
        'settings': {'custom_headers': {}},
        'payload_template': ''
      }
    })
  }

  readonly edit = (formId: KoboId, answerId: KoboAnswerId) => {
    return this.api.get<{url: string, detail?: string}>(`/v2/assets/${formId}/data/${answerId}/enketo/edit/?return_url=false`)
  }

  readonly getVersions = (formId: string) => {
    return this.api.get<KoboApiList<KoboApiVersion>>(`/v2/assets/${formId}/versions`)
      .then(_ => {
        _.results.forEach(r => {
          r.date_modified = new Date(r.date_modified)
          r.date_deployed = new Date(r.date_deployed)
        })
        return _
      })
  }

  readonly updateDataSimple = ({
    formId,
    submissionIds,
    group,
    questionName,
    newValue,
  }: {
    formId: KoboId,
    submissionIds: string[],
    group?: string,
    questionName: string,
    newValue: string
  }) => {
    // return this.api.patch(`/v2/assets/${formId}/data/${submissionId}/`, {
    //   body: {
    //     'start': new Date().toISOString(),
    //   }
    // })
    return this.api.patch(`/v2/assets/${formId}/data/bulk/`, {
      // qs: {format: 'json'},
      body: {
        payload: {
          submission_ids: submissionIds,
          data: {[(group ? group + '/' : '') + questionName]: newValue}
        }
      }
    })
  }

  readonly updateData = <TData extends KoboUpdateDataParamsData>(p: KoboUpdateDataParams<TData>): Promise<void> => {
    return this.editSdk.enqueue(p)
  }

  readonly getFormByVersion = (formId: KoboId, versionId: string) => {
    return this.api.get<KoboApiSchema>(`/v2/assets/${formId}/versions/${versionId}`)
  }

  readonly getAnswersByVersion = (formId: KoboId, versionId: string) => {
    return this.api.get<KoboApiSchema>(`/v2/assets/${formId}/versions/${versionId}/data.json`)
  }

  readonly getAnswersRaw = (form: KoboId, params: KoboAnswerParams = {}) => {
    const start = map(params.start, _ => KoboSdkv2.makeDateFilter('start', 'gte', _))
    const end = map(params.end, _ => KoboSdkv2.makeDateFilter('start', 'lte', _))
    const query = start && end ? {'$and': [start, end]} : start ?? end
    return this.api.get<KoboApiList<ApiKoboAnswerMetaData & Record<string, any>>>(`/v2/assets/${form}/data`, {qs: {query: query ? JSON.stringify(query) : undefined}})
  }

  readonly getAnswers = (form: KoboId, params: KoboAnswerParams = {}): Promise<ApiPaginate<KoboAnswer>> => {
    return this.getAnswersRaw(form, params)
      .then(res => {
        return ({
          ...res,
          results: res.results
            .map(KoboAnswerUtils.mapAnswer)
            .sort((a, b) => a.submissionTime.getTime() - b.submissionTime.getTime())
        })
      })
      .then(koboToApiPaginate)
  }

  private readonly removeGroup = () => {

  }

  readonly getForms = () => {
    // return this.api.get(`/v2/assets/`)
    return this.api.get<KoboApiList<KoboApiSchema>>(`/v2/assets/?q=asset_type%3Asurvey&limit=200`)
  }

  readonly getAttachement = (path: string) => {
    return axios.create().request({
      url: this.api.params.baseUrl + path,
      method: 'GET',
      headers: this.api.params.headers,
      responseType: 'arraybuffer',
    }).then(_ => _.data)
  }
}
