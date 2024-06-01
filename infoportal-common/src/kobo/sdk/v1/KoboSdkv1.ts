import {ApiClient} from '../../../api-client/ApiClient'
import retry from 'promise-retry'
import {KoboId} from '../../mapper'
import {KoboV1Form, SubmitResponse} from './KoboSdkv1Type'

export class KoboSdkv1 {
  constructor(private api: ApiClient) {
  }

  readonly submit = async <T extends Record<string, any>>({
    formId,
    data,
    retries = 8,
    uuid,
  }: {
    uuid?: string
    retries?: number
    data: Partial<T>
    formId: KoboId
  }): Promise<SubmitResponse> => {
    const _uuid = uuid ?? await this.getForms().then(_ => _.find(f => f.id_string === formId)?.uuid)
    if (!_uuid) throw new Error(`Kobo form id ${formId} not found.`)
    return retry((retry, number) => {
      return this.api.post<SubmitResponse>(`/submissions.json`, {
        body: {
          id: formId,
          submission: {
            formhub: {uuid: _uuid},
            ...data,
          }
        }
      }).catch(retry)
    }, {retries})
  }

  readonly getForms = () => {
    return this.api.get<KoboV1Form[]>(`/forms`)
  }
  // static readonly parseDate = (_: Date) => _.toISOString()
  //
  // static readonly makeDateFilter = (name: string, operator: 'gte' | 'lte', date: Date) => {
  //   return {[name]: {['$' + operator]: v2.parseDate(date)}}
  // }
  //
  // // static readonly parseDate = toYYYYMMDD
  //
  // static readonly makeAuthorizationHeader = (token: string) => `Token ${token}`


}
