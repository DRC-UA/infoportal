import {Bn_Re, Ecrec_cashRegistration, Protection_pss} from '../generated'
import {DrcOffice, DrcProjectHelper} from '../../type/Drc'
import {fnSwitch, seq} from '@alexandreannic/ts-utils'
import {OblastIndex} from '../../location'
import {Person} from '../../type/Person'
import {DisplacementStatus, PersonDetails, WgDisability} from './Common'

export namespace KoboGeneralMapping {

  type XlsKoboIndividual = Pick<NonNullable<Ecrec_cashRegistration.T['hh_char_hh_det']>[0],
    'hh_char_hh_det_gender' |
    'hh_char_hh_det_age' |
    'hh_char_hh_det_dis_select' |
    'hh_char_hh_det_dis_level'
  >

  type XlsKoboIndividuals = Pick<Ecrec_cashRegistration.T,
    'hh_char_dis_select' |
    'hh_char_dis_level' |
    'hh_char_hh_det' |
    'hh_char_hhh_dis_level' |
    'hh_char_hhh_dis_select' |
    'hh_char_hhh_age' |
    'hh_char_hhh_gender' |
    'hh_char_res_dis_level' |
    'hh_char_res_dis_select' |
    'hh_char_res_age' |
    'hh_char_res_gender'
  >

  export const mapOffice = (o?: Protection_pss.Option<'staff_to_insert_their_DRC_office'>): undefined | DrcOffice => fnSwitch(o!, {
    chernihiv: DrcOffice.Chernihiv,
    dnipro: DrcOffice.Dnipro,
    lviv: DrcOffice.Lviv,
    sumy: DrcOffice.Sumy,
    kharkiv: DrcOffice.Kharkiv,
    mykolaiv: DrcOffice.Mykolaiv,
  }, () => undefined)

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
  }): PersonDetails => {
    const res: PersonDetails = KoboGeneralMapping.mapPerson(p as any)
    res.displacement = fnSwitch(p.hh_char_hh_det_status!, {
      idp: DisplacementStatus.Idp,
      returnee: DisplacementStatus.Returnee,
      'non-displaced': DisplacementStatus.NonDisplaced,
    }, () => undefined)
    if (p.hh_char_hh_det_dis_level !== 'zero')
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
      ...(d.hh_char_hh_det ?? []),
      {
        hh_char_hh_det_dis_level: d.hh_char_hhh_dis_level,
        hh_char_hh_det_dis_select: d.hh_char_hhh_dis_select,
        hh_char_hh_det_age: d.hh_char_hhh_age,
        hh_char_hh_det_gender: d.hh_char_hhh_gender,
      },
      {
        hh_char_hh_det_dis_level: d.hh_char_res_dis_level,
        hh_char_hh_det_dis_select: d.hh_char_res_dis_select,
        hh_char_hh_det_age: d.hh_char_res_age,
        hh_char_hh_det_gender: d.hh_char_res_gender,
      },
    ]
  }

  export const collectXlsKoboIndividualsFromStandardizedKoboForm = (d: XlsKoboIndividuals): XlsKoboIndividual[] => {
    return d.hh_char_hh_det ?? []
  }
}