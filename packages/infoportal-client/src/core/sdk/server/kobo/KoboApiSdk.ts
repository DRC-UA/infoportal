import {ApiClient, RequestOption} from '../ApiClient'
import {KoboAnswerFlat, KoboAnswerId, KoboApiSchema, KoboId, koboIndex, UUID} from 'infoportal-common'
import {Kobo} from './Kobo'
import {appConfig, AppConfig} from '@/conf/AppConfig'
import {ApiPaginate, ApiPagination} from '@/core/sdk/server/_core/ApiSdkUtils'
import {Method} from 'axios'


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

  readonly editAnswer = (serverId: KoboId, formId: KoboId, answerId: number) => {
    return this.client.post(`/kobo-api/${serverId}/${formId}/${answerId}`)
  }

  readonly synchronizeAnswers = (serverId: KoboId, formId: KoboId) => {
    return this.client.post(`/kobo-api/${serverId}/${formId}/sync`)
  }

  readonly getAnswersFromKoboApi = <T extends Record<string, any> = Record<string, string | undefined>>({
    serverId,
    formId,
    filters = {},
    paginate = {offset: 0, limit: 100000},
    fnMap = (_: any) => _,
  }: {
    serverId: UUID,
    formId: UUID,
  } & FiltersProps & FnMap<T>): Promise<ApiPaginate<KoboAnswerFlat<T>>> => {
    return this.client.get<ApiPaginate<KoboAnswerFlat<T>>>(`/kobo-api/${serverId}/${formId}/answers`, {qs: filters})
      .then(_ => {
          return ({
            ..._,
            data: _.data.map(_ => ({
              ..._,
              ...Kobo.mapAnswerMetaData(_),
              ...fnMap(_.answers) as any
            }))
          })
        }
      )
  }

  readonly getForm = ({serverId = koboIndex.drcUa.server.prod, id}: {serverId?: UUID, id: KoboId}): Promise<KoboApiSchema> => {
    return this.client.get(`/kobo-api/${serverId}/${id}`)
  }

  readonly getEditUrl = ({serverId = koboIndex.drcUa.server.prod, formId, answerId}: {
    serverId?: UUID,
    formId: KoboId,
    answerId: KoboAnswerId
  }): string => {
    return `${this.conf.apiURL}/kobo-api/${serverId}/${formId}/${answerId}/edit-url`
  }

  readonly getForms = (serverId: UUID): Promise<KoboApiSchema[]> => {
    return this.client.get(`/kobo-api/${serverId}`).then(_ => _.results.map((_: Record<keyof KoboApiSchema, any>): KoboApiSchema => {
      return {
        ..._,
        date_created: new Date(_.date_created),
        date_modified: new Date(_.date_modified),
      }
    }))
  }

  readonly getAttachement = (serverId: UUID, filepath: string) => {
    return this.client.get<KoboApiSchema[]>(`/kobo-api/${serverId}/attachment/${filepath}`)
  }

  readonly proxy = <T = any>({serverId, url, method, options}: {serverId: UUID, method: Method, url: string, options?: RequestOption}) => {
    return this.client.post<T>(`/kobo-api/proxy`, {
      // responseType: 'blob',
      body: {
        serverId,
        method,
        url,
        body: options?.body,
        headers: options?.headers,
        mapData: (_: any) => _
      }
    })
  }

}
