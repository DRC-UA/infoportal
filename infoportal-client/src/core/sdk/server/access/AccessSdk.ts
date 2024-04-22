import {ApiClient} from '../ApiClient'
import {Access, AccessSearch, KoboDatabaseAccessParams, WfpDeduplicationAccessParams} from '@/core/sdk/server/access/Access'
import {AppFeatureId} from '@/features/appFeatureId'
import {DrcJob, UUID} from '@infoportal-common'

interface SearchByFeature {
  ({featureId, email}: {featureId: AppFeatureId.kobo_database, email?: string}): Promise<Access<KoboDatabaseAccessParams>[]>
  ({featureId, email}: {featureId: AppFeatureId.wfp_deduplication, email?: string}): Promise<Access<WfpDeduplicationAccessParams>[]>
  ({featureId, email}: {featureId?: AppFeatureId, email?: string}): Promise<Access<any>[]>
}

type FeatureCreateBase = Omit<Access, 'drcJob' | 'id' | 'createdAt' | 'updatedAt' | 'featureId' | 'params'> & {
  drcJob?: DrcJob[]
  groupId?: UUID
}

interface AccessUpdate extends Pick<Access, 'drcJob' | 'drcOffice' | 'level'> {

}

interface AccessCreate {
  (_: FeatureCreateBase & {featureId: AppFeatureId.kobo_database, params: KoboDatabaseAccessParams}): Promise<Access<KoboDatabaseAccessParams>>
  (_: FeatureCreateBase & {featureId: AppFeatureId.wfp_deduplication, params: KoboDatabaseAccessParams}): Promise<Access<WfpDeduplicationAccessParams>>
  (_: FeatureCreateBase & {featureId?: AppFeatureId, params?: any}): Promise<Access<any>>
}

export class AccessSdk {

  constructor(private client: ApiClient) {
  }

  static readonly filterByFeature: {
    (_: AppFeatureId.kobo_database): (a: Access<any>) => a is Access<KoboDatabaseAccessParams>
    (_: AppFeatureId.wfp_deduplication): (a: Access<any>) => a is Access<WfpDeduplicationAccessParams>
    (_?: AppFeatureId): (a: Access<any>) => a is Access<any>
  } = (featureId): any => (access: Access<any>) => {
    return !featureId || access.featureId === featureId
  }

  readonly create: AccessCreate = (body) => {
    return this.client.put<Access>(`/access`, {body})
  }

  readonly update = (id: UUID, body: AccessUpdate) => {
    return this.client.post<Access>(`/access/${id}`, {body})
  }

  readonly remove = (id: UUID) => {
    return this.client.delete<Access>(`/access/${id}`)
  }

  readonly search: SearchByFeature = <T = any>(params: AccessSearch): Promise<Access<T>[]> => {
    return this.client.get<Record<keyof Access, any>[]>(`/access`, {qs: params}).then(_ => _.map(Access.map))
  }

  readonly searchForConnectedUser: SearchByFeature = <T = any>(params: AccessSearch): Promise<Access<T>[]> => {
    return this.client.get<Record<keyof Access, any>[]>(`/access/me`, {qs: params}).then(_ => _.map(Access.map))
  }

  // readonly searchByFeature: SearchByFeature = (featureId) => {
  //   switch (featureId) {
  //     case AppFeatureId.kobo_database:
  //       return this.search<KoboDatabaseFeatureParams>({featureId})
  //     default:
  //       throw new Error('To implement')
  //   }
  // }
}
