import {Bn_RapidResponse, Bn_Re, Ecrec_cashRegistration, Protection_pss} from '../generated'
import {DrcOffice, DrcProjectHelper} from '../../type/Drc'
import {fnSwitch, seq} from '@alexandreannic/ts-utils'
import {OblastIndex} from '../../location'
import {Person} from '../../type/Person'
import {DisplacementStatus, KoboAnswer, KoboBaseTags, KoboTagStatus, PersonDetails, WgDisability} from './Common'

export namespace KoboGeneralMapping {

  type XlsIndividualBase = NonNullable<Ecrec_cashRegistration.T['hh_char_hh_det']>[0]
  export type XlsKoboIndividual = Pick<XlsIndividualBase,
    'hh_char_hh_det_gender' |
    'hh_char_hh_det_age'
  > & Partial<Pick<XlsIndividualBase,
    'hh_char_hh_det_dis_select' |
    'hh_char_hh_det_dis_level'
  >> & Partial<Pick<Ecrec_cashRegistration.T, 'ben_det_res_stat'>>

  export type XlsKoboIndividuals = Partial<Pick<Ecrec_cashRegistration.T,
    'hh_char_dis_select' |
    'hh_char_dis_level' |
    // 'hh_char_hh_det' |
    'hh_char_hhh_dis_level' |
    'hh_char_hhh_dis_select' |
    'hh_char_hhh_age' |
    'hh_char_hhh_gender' |
    'hh_char_res_dis_level' |
    'hh_char_res_dis_select' |
    'hh_char_res_age' |
    'ben_det_res_stat' |
    'hh_char_res_gender'
  >> & {
    hh_char_hh_det?: XlsKoboIndividual[]
  }

  export const mapOffice = (o?: Protection_pss.Option<'staff_to_insert_their_DRC_office'>): undefined | DrcOffice => fnSwitch(o!, {
    chernihiv: DrcOffice.Chernihiv,
    dnipro: DrcOffice.Dnipro,
    lviv: DrcOffice.Lviv,
    sumy: DrcOffice.Sumy,
    kharkiv: DrcOffice.Kharkiv,
    mykolaiv: DrcOffice.Mykolaiv,
  }, () => undefined)

  type XlsDisplacementStatus = NonNullable<Protection_pss.T['hh_char_hh_det']>[0]['hh_char_hh_det_status'] | Bn_Re.T['ben_det_res_stat']

  export const mapDisplacementStatus = (_?: XlsDisplacementStatus): DisplacementStatus | undefined => {
    return fnSwitch(_!, {
      idp: DisplacementStatus.Idp,
      long_res: DisplacementStatus.NonDisplaced,
      ret: DisplacementStatus.Returnee,
      ref_asy: DisplacementStatus.Refugee,
      returnee: DisplacementStatus.Returnee,
      'non-displaced': DisplacementStatus.NonDisplaced,
    }, () => undefined)
  }

  export const mapProject = (_?: string) => {
    if (!_) return
    const extractCode = _.match(/UKR-000\d{3}/)?.[0]
    if (extractCode) return DrcProjectHelper.searchByCode(extractCode)
    throw new Error(`Cannot find project from ${_}.`)
  }

  export const mapOblast = OblastIndex.byKoboName

  export const mapRaion = (_?: Bn_Re.T['ben_det_raion']) => _

  export const mapHromada = (_?: Bn_Re.T['ben_det_hromada']) => _

  export const searchRaion = (_?: string) => (Bn_Re.options.ben_det_raion as any)[_!]

  export const searchHromada = (_?: string) => (Bn_Re.options.ben_det_hromada as any)[_!]

  export const getRaionLabel = (_?: Bn_Re.T['ben_det_raion']) => (Bn_Re.options.ben_det_raion as any)[_!]

  export const getHromadaLabel = (_?: Bn_Re.T['ben_det_hromada']) => (Bn_Re.options.ben_det_hromada as any)[_!]

  export const mapPersonDetails = (p: {
    hh_char_hh_det_gender?: string
    hh_char_hh_det_age?: number
    hh_char_hh_det_dis_select?: NonNullable<Bn_Re.T['hh_char_hh_det']>[0]['hh_char_hh_det_dis_select']
    hh_char_hh_det_dis_level?: NonNullable<Bn_Re.T['hh_char_hh_det']>[0]['hh_char_hh_det_dis_level']
    hh_char_hh_det_status?: NonNullable<Protection_pss.T['hh_char_hh_det']>[0]['hh_char_hh_det_status']
    ben_det_res_stat?: NonNullable<Bn_Re.T['ben_det_res_stat']>
  }): PersonDetails => {
    const res: PersonDetails = KoboGeneralMapping.mapPerson(p as any)
    if (p.hh_char_hh_det_status)
      res.displacement = mapDisplacementStatus(p.hh_char_hh_det_status)
    else
      res.displacement = fnSwitch(p.ben_det_res_stat!, {
        idp: DisplacementStatus.Idp,
        long_res: DisplacementStatus.NonDisplaced,
        ret: DisplacementStatus.Returnee,
        ref_asy: DisplacementStatus.Refugee,
      }, () => undefined)
    if (p.hh_char_hh_det_dis_level !== undefined && p.hh_char_hh_det_dis_level !== 'zero')
      res.disability = seq(p.hh_char_hh_det_dis_select ?? []).map(_ => fnSwitch(_!, {
        diff_see: WgDisability.See,
        diff_hear: WgDisability.Hear,
        diff_walk: WgDisability.Walk,
        diff_rem: WgDisability.Rem,
        diff_care: WgDisability.Care,
        diff_comm: WgDisability.Comm,
        diff_none: WgDisability.None,
      }, () => undefined)).compact()
    return res
  }

  export const mapPerson = (_: {
    hh_char_hh_det_gender?: 'male' | 'female' | string
    hh_char_hh_det_age?: number
  }): Person.Person => {
    return {
      age: _.hh_char_hh_det_age ? +_.hh_char_hh_det_age : undefined,
      gender: fnSwitch(_.hh_char_hh_det_gender!, {
        'male': Person.Gender.Male,
        'female': Person.Gender.Female,
      }, () => Person.Gender.Other)
    }
  }

  export type IndividualBreakdown = {
    disabilities: WgDisability[]
    disabilitiesCount: number
    elderlyCount: number
    childrenCount: number
    adultCount: number
    persons: PersonDetails[]
  }

  export const addIndividualBreakdownColumn = <T extends XlsKoboIndividuals>(row: T): T & {custom: IndividualBreakdown} => {
    const p = KoboGeneralMapping.collectXlsKoboIndividuals(row).map(mapPersonDetails)
    const custom = KoboGeneralMapping.getIndividualBreakdown(p)
    ;(row as any).custom = custom
    return (row as any)
  }

  export const handleStatus = <T extends KoboAnswer<{}, KoboBaseTags & KoboTagStatus>>(row: T): T => {
    if (row.tags?.lastStatusUpdate) row.tags.lastStatusUpdate = new Date(row.tags?.lastStatusUpdate)
    return row
  }

  export const addIndividualBreakdownColumnForRrm = (row: Bn_RapidResponse.T): Bn_RapidResponse.T & {custom: IndividualBreakdown} => {
    const p = KoboGeneralMapping.collectXlsKoboIndividualsForRrm(row).map(mapPersonDetails)
    const custom = KoboGeneralMapping.getIndividualBreakdown(p)
    ;(row as any).custom = custom
    return (row as any)
  }

  export const getIndividualBreakdown = (hh: PersonDetails[]): IndividualBreakdown => {
    const disabilities = new Set<WgDisability>()
    let pwdCount = 0
    let childrenCount = 0
    let elderlyCount = 0
    let adultCount = 0
    hh?.forEach(_ => {
      _.disability?.forEach(disabilities.add, disabilities)
      if (_.age && _.age < 18) childrenCount++
      if (_.age && _.age >= 18 && _.age < 60) adultCount++
      if (_.age && _.age >= 60) elderlyCount++
      if (_.disability && !_.disability.includes(WgDisability.None)) pwdCount++
    })
    disabilities.delete(WgDisability.None)
    return {
      persons: hh,
      adultCount: adultCount,
      elderlyCount: elderlyCount,
      childrenCount: childrenCount,
      disabilitiesCount: pwdCount,
      disabilities: Array.from(disabilities),
    }
  }

  export const collectXlsKoboIndividuals = (d: XlsKoboIndividuals): XlsKoboIndividual[] => {
    return [
      ...collectXlsKoboIndividualsFromStandardizedKoboForm(d),
      {
        hh_char_hh_det_dis_level: d.hh_char_hhh_dis_level,
        hh_char_hh_det_dis_select: d.hh_char_hhh_dis_select,
        hh_char_hh_det_age: d.hh_char_hhh_age,
        hh_char_hh_det_gender: d.hh_char_hhh_gender,
        ben_det_res_stat: d.ben_det_res_stat,
      },
      {
        hh_char_hh_det_dis_level: d.hh_char_res_dis_level,
        hh_char_hh_det_dis_select: d.hh_char_res_dis_select,
        hh_char_hh_det_age: d.hh_char_res_age,
        hh_char_hh_det_gender: d.hh_char_res_gender,
        ben_det_res_stat: d.ben_det_res_stat,
      },
    ].filter(_ => _.hh_char_hh_det_age !== undefined || _.hh_char_hh_det_gender !== undefined)
  }

  export const collectXlsKoboIndividualsFromStandardizedKoboForm = (d: XlsKoboIndividuals): XlsKoboIndividual[] => {
    return d.hh_char_hh_det?.map(_ => {
      (_ as unknown as XlsKoboIndividual).ben_det_res_stat = d.ben_det_res_stat
      return _ as unknown as XlsKoboIndividual
    }) ?? []
  }

  export const collectXlsKoboIndividualsForRrm = (d: Bn_RapidResponse.T): XlsKoboIndividual[] => {
    return [
      ...collectXlsKoboIndividualsFromStandardizedKoboForm({
        ben_det_res_stat: d.ben_det_res_stat_l,
        hh_char_hh_det: d.hh_char_hh_det_l?.map(_ => ({
          hh_char_hh_det_dis_level: _.hh_char_hh_det_dis_level_l,
          hh_char_hh_det_dis_select: _.hh_char_hh_det_dis_select_l,
          hh_char_hh_det_age: _.hh_char_hh_det_age_l,
          hh_char_hh_det_gender: _.hh_char_hh_det_gender_l,
        }))
      }),
      {
        hh_char_hh_det_dis_level: d.hh_char_hhh_dis_level_l,
        hh_char_hh_det_dis_select: d.hh_char_hhh_dis_select_l,
        hh_char_hh_det_age: d.hh_char_hhh_age_l,
        hh_char_hh_det_gender: d.hh_char_hhh_gender_l,
        ben_det_res_stat: d.ben_det_res_stat_l,
      },
      {
        hh_char_hh_det_dis_level: d.hh_char_res_dis_level_l,
        hh_char_hh_det_dis_select: d.hh_char_res_dis_select_l,
        hh_char_hh_det_age: d.hh_char_res_age_l,
        hh_char_hh_det_gender: d.hh_char_res_gender_l,
        ben_det_res_stat: d.ben_det_res_stat_l,
      },
    ].filter(_ => _.hh_char_hh_det_age !== undefined || _.hh_char_hh_det_gender !== undefined)
  }
}