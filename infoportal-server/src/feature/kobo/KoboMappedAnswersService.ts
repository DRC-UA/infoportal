import {KoboAnswerFilter, KoboService} from './KoboService'
import {PrismaClient} from '@prisma/client'
import {ApiPaginate, KoboIndex} from '@infoportal-common'
import {DbKoboAnswer, KoboAnswerFlat, KoboId} from '../connector/kobo/KoboClient/type/KoboAnswer'
import {map} from '@alexandreannic/ts-utils'
import {ShelterNtaTags, ShelterTaTags} from './tags/ShelterTags'
import {ProtectionHhsTags} from '../../db/koboForm/DbHelperProtectionHhs'
import {Protection_hhs} from '../../script/output/kobo/Protection_hhs'
import {Shelter_TA} from '../../script/output/kobo/Shelter_TA'
import {Shelter_NTA} from '../../script/output/kobo/Shelter_NTA'
import {Shelter_north} from '../../script/output/kobo/Shelter_north'
import {Shelter_cashForRepair} from '../../script/output/kobo/Shelter_cashForRepair'
import {Bn_Re} from '../../script/output/kobo/Bn_Re'
import {Bn_RapidResponse} from '../../script/output/kobo/Bn_RapidResponse'
import {Bn_OldMpcaNfi} from '../../script/output/kobo/Bn_OldMpcaNfi'
import {Bn_0_mpcaRegNewShort} from '../../script/output/kobo/Bn_0_mpcaRegNewShort'
import {Bn_0_mpcaReg} from '../../script/output/kobo/Bn_0_mpcaReg'
import {Bn_0_mpcaRegESign} from '../../script/output/kobo/Bn_0_mpcaRegESign'
import {Bn_0_mpcaRegNoSig} from '../../script/output/kobo/Bn_0_mpcaRegNoSig'
import {Ecrec_cashRegistration} from '../../script/output/kobo/Ecrec_cashRegistration'

export class KoboMappedAnswersService {

  constructor(
    private prisma: PrismaClient,
    private kobo: KoboService = new KoboService(prisma)
  ) {
  }

  static readonly map = <
    T extends Record<string, any> = Record<string, any>,
    TTag extends Record<string, any> = any
  >(
    fnMap: (_: Record<string, any>) => T,
    fnTag?: (_: Record<string, any>) => TTag,
  ) => (
    data: ApiPaginate<DbKoboAnswer>
  ): ApiPaginate<KoboAnswerFlat<T, TTag>> => {
    return {
      total: data.total,
      data: data.data.map(_ => ({
        ..._,
        ...fnMap(_.answers),
        tags: map(_.tags, fnTag, (tag, fn) => fn(tag)) ?? _.tags
      }))
    }
  }

  private readonly buildMappedSearch = <T extends Record<string, any>, TTag extends Record<string, any>>(
    formId: KoboId,
    fn: (_: any) => T,
    fnTag?: (_: any) => TTag,
  ) => (
    filters: KoboAnswerFilter = {}
  ) => {
    return this.kobo.searchAnswers({
      formId,
      ...filters,
    }).then(KoboMappedAnswersService.map(fn, fnTag))
  }

  readonly searchProtectionHss = this.buildMappedSearch(KoboIndex.byName('protection_hhs2_1').id, Protection_hhs.map, _ => _ as ProtectionHhsTags)
  readonly searchShelter_Ta = this.buildMappedSearch(KoboIndex.byName('shelter_ta').id, Shelter_TA.map, _ => _ as ShelterTaTags)
  readonly searchShelter_Nta = this.buildMappedSearch(KoboIndex.byName('shelter_nta').id, Shelter_NTA.map, _ => _ as ShelterNtaTags)
  readonly searchShelter_north = this.buildMappedSearch(KoboIndex.byName('shelter_north').id, Shelter_north.map, _ => _ as ShelterNtaTags & ShelterTaTags)
  readonly searchShelter_cashForRepair = this.buildMappedSearch(KoboIndex.byName('shelter_cashForRepair').id, Shelter_cashForRepair.map)
  readonly searchBn_re = this.buildMappedSearch(KoboIndex.byName('bn_re').id, Bn_Re.map)
  readonly searchBn_RapidResponseMechanism = this.buildMappedSearch(KoboIndex.byName('bn_rapidResponse').id, Bn_RapidResponse.map)
  readonly searchBn_1_mpcaNfi = this.buildMappedSearch(KoboIndex.byName('bn_1_mpcaNfi').id, Bn_OldMpcaNfi.map)
  readonly searchBn_0_mpcaRegNewShort = this.buildMappedSearch(KoboIndex.byName('bn_0_mpcaRegNewShort').id, Bn_0_mpcaRegNewShort.map)
  readonly searchBn_0_mpcaReg = this.buildMappedSearch(KoboIndex.byName('bn_0_mpcaReg').id, Bn_0_mpcaReg.map)
  readonly searchBn_0_mpcaRegNoSig = this.buildMappedSearch(KoboIndex.byName('bn_0_mpcaRegNoSig').id, Bn_0_mpcaRegNoSig.map)
  readonly searchBn_0_mpcaRegESign = this.buildMappedSearch(KoboIndex.byName('bn_0_mpcaRegESign').id, Bn_0_mpcaRegESign.map)
  readonly searchBn_ecrecCashRegistration = this.buildMappedSearch(KoboIndex.byName('ecrec_cashRegistration').id, Ecrec_cashRegistration.map)
  readonly searchBn_ecrecCashRent = this.buildMappedSearch(KoboIndex.byName('ecrec_cashRegistration').id, Ecrec_cashRegistration.map)
}

