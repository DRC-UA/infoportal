import {ApiClient} from '../ApiClient'
import {KeyOf, KoboIndex, Period, UUID} from '@infoportal-common'
import {Kobo, KoboAnswer, KoboAnswerId, KoboBaseTags, KoboId} from '@/core/sdk/server/kobo/Kobo'
import {AnswersFilters} from '@/core/sdk/server/kobo/KoboApiSdk'
import {endOfDay, startOfDay} from 'date-fns'
import {map} from '@alexandreannic/ts-utils'
import {ApiPaginate, ApiPagination} from '@/core/sdk/server/_core/ApiSdkUtils'

export interface KoboAnswerFilter {
  readonly paginate?: ApiPagination
  readonly filters?: AnswersFilters
}

export type KoboUpdateAnswers<T extends Record<string, any>, K extends KeyOf<T>> = {
  formId: KoboId
  answerIds: KoboAnswerId[]
  question: K
  answer: T[K]
}

interface KoboAnswerSearch {
  <
    TKoboAnswer extends Record<string, any>,
    TTags extends KoboBaseTags = KoboBaseTags,
    TCustomAnswer extends KoboAnswer<any, TTags> = KoboAnswer<TKoboAnswer, TTags>,
  >(_: KoboAnswerFilter & {
    readonly formId: UUID,
    readonly fnMapKobo?: (_: Record<string, string | undefined>) => TKoboAnswer
    readonly fnMapTags?: (_?: any) => TTags
    readonly fnMapCustom: (_: KoboAnswer<TKoboAnswer, TTags>) => TCustomAnswer
  }): Promise<ApiPaginate<TCustomAnswer>>

  <
    TKoboAnswer extends Record<string, any>,
    TTags extends KoboBaseTags = KoboBaseTags,
  >(_: KoboAnswerFilter & {
    readonly formId: UUID,
    readonly fnMapKobo?: (_: Record<string, string | undefined>) => TKoboAnswer
    readonly fnMapTags?: (_?: any) => TTags
    readonly fnMapCustom?: undefined
  }): Promise<ApiPaginate<KoboAnswer<TKoboAnswer, TTags>>>
}

export class KoboAnswerSdk {

  constructor(private client: ApiClient) {
  }

  readonly searchByAccess: KoboAnswerSearch = ({
    formId,
    filters = {},
    paginate = {offset: 0, limit: 100000},
    fnMapKobo = (_: any) => _,
    fnMapTags = (_?: any) => _,
    fnMapCustom,
  }: any) => {
    return this.client.post<ApiPaginate<Record<string, any>>>(`/kobo/answer/${formId}/by-access`, {body: {...KoboAnswerSdk.mapFilters(filters), ...paginate}})
      .then(Kobo.mapPaginateAnswerMetaData(fnMapKobo, fnMapTags, fnMapCustom))
  }

  readonly search: KoboAnswerSearch = ({
    formId,
    filters = {},
    paginate = {offset: 0, limit: 100000},
    fnMapKobo = (_: any) => _,
    fnMapTags = (_?: any) => _,
    fnMapCustom,
  }: any) => {
    return this.client.post<ApiPaginate<Record<string, any>>>(`/kobo/answer/${formId}`, {body: {...KoboAnswerSdk.mapFilters(filters), ...paginate}})
      .then(x => {
        console.log(x.data)
        return Kobo.mapPaginateAnswerMetaData(fnMapKobo, fnMapTags, fnMapCustom)(x)
      })
  }

  readonly updateAnswers = <T extends Record<string, any>, K extends KeyOf<T>>({
    formId,
    answerIds,
    question,
    answer,
  }: KoboUpdateAnswers<T, K>) => {
    return this.client.patch(`/kobo/answer/${formId}`, {
      body: {
        answerIds: answerIds,
        question,
        answer,
      }
    })
  }

  readonly updateTag = ({formId, answerIds, tags}: {
    formId: KoboId,
    answerIds: KoboAnswerId[],
    tags: Record<string, any>
  }) => {
    for (let k in tags) if (tags[k] === undefined) tags[k] = null
    return this.client.patch(`/kobo/answer/${formId}/tag`, {body: {tags, answerIds: answerIds}})
  }

  readonly getAllFromLocalForm = (filters: AnswersFilters = {}) => {
    return this.client.get<KoboAnswer[]>(`/kobo/local-form`, {qs: filters})
      .then(_ => _.map(x => Kobo.mapAnswerMetaData(x)))
  }

  readonly getPeriod = (formId: KoboId): Promise<Period> => {
    switch (formId) {
      case KoboIndex.byName('protection_hhs3').id:
      case KoboIndex.byName('protection_hhs2_1').id:
        return Promise.resolve({start: new Date(2023, 3, 1), end: startOfDay(new Date())})
      case KoboIndex.byName('meal_visitMonitoring').id:
        return Promise.resolve({start: new Date(2023, 5, 15), end: startOfDay(new Date())})
      case KoboIndex.byName('safety_incident').id:
        return Promise.resolve({start: new Date(2023, 8, 19), end: startOfDay(new Date())})
      default:
        throw new Error('To implement')
    }
  }

  private static mapFilters = (_: AnswersFilters): AnswersFilters => {
    return {
      ..._,
      start: map(_.start ?? undefined, startOfDay),
      end: map(_.end ?? undefined, endOfDay),
    }
  }
}
