import {ApiClient, RequestOption} from '../ApiClient'
import {KoboAnswerId, KoboApiSchema, KoboId} from 'infoportal-common'
import {appConfig, AppConfig} from '@/conf/AppConfig'
import {ApiPagination} from '@/core/sdk/server/_core/ApiSdkUtils'
import {Method} from 'axios'
import {UUID} from 'infoportal-common'


export interface FilterBy {
  column: string
  value: (string | null)[]
  type?: 'array',
}

export interface AnswersFilters<T extends FilterBy[] = FilterBy[]> {
  start?: Date
  end?: Date
  ids?: KoboId[]
  filterBy?: T
}

export interface FiltersProps {
  paginate?: ApiPagination;
  filters?: AnswersFilters
}

export interface FnMap<T> {
  fnMap?: (_: Record<string, string | undefined>) => T
}


export class KoboApiSdk {

  constructor(private client: ApiClient, private conf: AppConfig = appConfig) {
  }

  readonly synchronizeAnswers = (formId: KoboId) => {
    return this.client.post(`/kobo-api/${formId}/sync`)
  }

  readonly getSchema = ({id}: {id: KoboId}): Promise<KoboApiSchema> => {
    return this.client.get(`/kobo-api/${id}/schema`)
  }

  readonly getEditUrl = ({formId, answerId}: {
    formId: KoboId,
    answerId: KoboAnswerId
  }): string => {
    return `${this.conf.apiURL}/kobo-api/${formId}/edit-url/${answerId}`
  }

  readonly searchSchemas = (body: {serverId: UUID}): Promise<KoboApiSchema[]> => {
    return this.client.post(`/kobo-api/schema`, {body}).then(_ => _.results.map((_: Record<keyof KoboApiSchema, any>): KoboApiSchema => {
      return {
        ..._,
        date_created: new Date(_.date_created),
        date_modified: new Date(_.date_modified),
      }
    }))
  }

  static readonly getAttachementUrl = ({baseUrl = appConfig.apiURL, path, formId}: {baseUrl: string, formId: KoboId, path: string}) => {
    return baseUrl + `/kobo-api/${formId}/attachment?path=${path}`
  }

  readonly proxy = <T = any>({url, method, options}: {method: Method, url: string, options?: RequestOption}) => {
    return this.client.post<T>(`/kobo-api/proxy`, {
      // responseType: 'blob',
      body: {
        method,
        url,
        body: options?.body,
        headers: options?.headers,
        mapData: (_: any) => _
      }
    })
  }
}
