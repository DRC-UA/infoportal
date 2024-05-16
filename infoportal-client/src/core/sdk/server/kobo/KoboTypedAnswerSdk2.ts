import {ApiClient} from '@/core/sdk/server/ApiClient'
import {KoboAnswerFilter, KoboAnswerSdk} from '@/core/sdk/server/kobo/KoboAnswerSdk'
import {
  DisplacementStatus,
  KoboFormName,
  KoboIndex,
  Person,
  PersonDetails,
  Protection_gbv,
  Protection_groupSession,
  Shelter_NTA,
  Shelter_TA,
  ShelterNtaTags,
  ShelterTaTagsHelper
} from '@infoportal-common'
import {ApiPaginate} from '@/core/sdk/server/_core/ApiSdkUtils'
import {fnSwitch, seq} from '@alexandreannic/ts-utils'
import {makeMeta} from '@/core/sdk/server/kobo/KoboTypedAnswerSdk'

const make = <K extends KoboFormName, T>(key: K,
  params: (filters: KoboAnswerFilter) => Promise<ApiPaginate<T>>): Record<K, (filters: KoboAnswerFilter) => Promise<ApiPaginate<T>>> => {
  return {[key]: params} as any
}

export type KoboMappedName = keyof KoboTypedAnswerSdk2['search']

export type InferTypedAnswer<N extends KoboMappedName> = Awaited<ReturnType<KoboTypedAnswerSdk2['search'][N]>>['data'][number]

export class KoboTypedAnswerSdk2 {
  constructor(private client: ApiClient, private sdk = new KoboAnswerSdk(client)) {
  }

  private readonly _search = this.sdk.search

  readonly search = {
    ...make('protection_groupSession', (filters: KoboAnswerFilter) => this._search({
      formId: KoboIndex.byName('protection_groupSession').id,
      fnMapKobo: Protection_groupSession.map,
      ...filters,
    })),
    ...make('shelter_nta', (filters: KoboAnswerFilter) => this._search({
      formId: KoboIndex.byName('shelter_nta').id,
      fnMapKobo: Shelter_NTA.map,
      fnMapTags: _ => _ as ShelterNtaTags,
      ...filters,
    })),
    ...make('protection_gbv', (filters: KoboAnswerFilter) => this._search({
      formId: KoboIndex.byName('protection_gbv').id,
      fnMapKobo: Protection_gbv.map,
      fnMapCustom: _ => {
        if (_.new_ben === 'no') return
        const persons: PersonDetails[] | undefined = (_.hh_char_hh_det ?? [])
          .filter(_ => _.hh_char_hh_new_ben !== 'no')
          .map(p => {
            return {
              gender: fnSwitch(p.hh_char_hh_det_gender!, {
                male: Person.Gender.Male,
                female: Person.Gender.Female,
                other: Person.Gender.Other
              }, () => undefined),
              age: p.hh_char_hh_det_age,
              displacement: fnSwitch(p.hh_char_hh_det_status!, {
                idp: DisplacementStatus.Idp,
                returnee: DisplacementStatus.Idp,
                'non-displaced': DisplacementStatus.NonDisplaced,
              }, () => undefined),
            }
          })
        return makeMeta(_, {persons})
      },
      ...filters,
    }).then(_ => ({
      ..._,
      data: seq(_.data).compact(),
    }))),
    ...make('shelter_ta', (filters: KoboAnswerFilter) => this._search({
      formId: KoboIndex.byName('shelter_ta').id,
      fnMapKobo: Shelter_TA.map,
      fnMapTags: ShelterTaTagsHelper.mapTags,
      ...filters,
    })),
  }
}



