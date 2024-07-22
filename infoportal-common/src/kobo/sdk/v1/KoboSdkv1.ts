import {ApiClient} from '../../../api-client/ApiClient'
import retry from 'promise-retry'
import {KoboId} from '../../mapper'
import {KoboV1Form, SubmitResponse} from './KoboSdkv1Type'

export class KoboSdkv1 {
  constructor(private api: ApiClient) {
  }

  static readonly parseBody = (obj: Record<string, undefined | string | string[] | number>): Record<string, string> => {
    for (const i in obj) {
      if (obj[i] === undefined || obj[i] === null) {
        delete obj[i]
      }
      if (Array.isArray(obj[i])) {
        obj[i] = (obj[i] as any).join(' ')
      }
      if (typeof obj[i] === 'number') {
        obj[i] = '' + obj[i]
      }
    }
    return obj as any
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
      console.log('api call')
      console.log({
          formhub: {uuid: _uuid},
          ...KoboSdkv1.parseBody(data),
        }
      )
      return this.api.post<SubmitResponse>(`/submissions.json`, {
        body: {
          id: formId,
          submission: {
            formhub: {uuid: _uuid},
            ...KoboSdkv1.parseBody(data),
          }
        }
      }).catch(e => {
        console.log(e)
        return retry(e)
      })
    }, {retries})
  }

  readonly getForms = async (): Promise<KoboV1Form[]> => {
    const formUrlResponse = await this.api.get<{forms: string}>(`/v1`)
    if (!formUrlResponse || !formUrlResponse.forms) {
      throw new Error('Forms URL not found in the response')
    }
    const formsResponse = await this.api.get<KoboV1Form[]>(formUrlResponse.forms)
    if (!Array.isArray(formsResponse)) {
      throw new Error(`Expected an array of forms but got: ${JSON.stringify(formsResponse)}`)
    }
    return formsResponse
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
