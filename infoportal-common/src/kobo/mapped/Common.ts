import {Protection_pss} from '../generated/Protection_pss'
import {fnSwitch} from '@alexandreannic/ts-utils'
import {Bn_Re} from '../generated/Bn_Re'
import {Ecrec_cashRegistration} from '../generated/Ecrec_cashRegistration'
import {Person} from '../../type/Person'
import {DrcOffice, DrcProjectHelper} from '../../type/Drc'
import {OblastIndex} from '../../location/oblastIndex'

export enum KoboValidation {
  Approved = 'Approved',
  Rejected = 'Rejected',
  Pending = 'Pending',
}

export interface KoboBaseTags {
  _validation?: KoboValidation
}

export interface PersonDetails extends Person.Person {
  status?: Protection_pss.Option<'hh_char_hh_det_status'>
  disability?: Bn_Re.Option<'hh_char_dis_select'>[]
}

export enum CashStatus {
  Paid = 'Paid',
  Rejected = 'Rejected',
  Referred = 'Referred',
  Received = 'Received',
}

export type KoboAnswerMetaData<TTag extends KoboBaseTags = KoboBaseTags> = {
  start: Date
  end: Date
  version: string
  submissionTime: Date
  submittedBy?: string
  id: string
  uuid: string
  validationStatus?: 'validation_status_approved'
  validatedBy?: string
  lastValidatedTimestamp?: number
  geolocation?: [number, number]
  tags?: TTag
  //
  // _id: number,
  // // 'formhub/uuid': string,
  // start: Date,
  // end: Date,
  // // __version__: string,
  // // 'meta/instanceID': string,
  // // _xform_id_string: string,
  // _uuid: UUID,
  attachments: any[],
  // // _status: KoboAnswerStatus,
  // _geolocation: [number, number],
  // _submission_time: Date,
  // // _tags: KoboAnswerTags[],
  // // _notes: KoboAnswerNotes[],
  // // _validation_status: any,
  // // _submitted_by: any
}

export type KoboAnswer<
  TQuestion extends Record<string, any> = Record<string, any>,
  TTags extends KoboBaseTags = KoboBaseTags
> = (KoboAnswerMetaData<TTags> & TQuestion)

export namespace KoboGeneralMapping {

  type StandardKoboFormQuestion = Pick<Ecrec_cashRegistration.T,
    'hh_char_hh_det' |
    'hh_char_hhh_dis_select' |
    'hh_char_hhh_age' |
    'hh_char_hhh_gender' |
    'hh_char_res_dis_select' |
    'hh_char_res_age' |
    'hh_char_res_gender'
  >

  import Gender = Person.Gender
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

  export const getRaionLabel = (_?: Bn_Re.T['ben_det_raion']) => (Bn_Re.options.ben_det_raion as any)[_!]

  export const getHromadaLabel = (_?: Bn_Re.T['ben_det_hromada']) => (Bn_Re.options.ben_det_hromada as any)[_!]

  export const mapPersonWithStatus = (_: {
    hh_char_hh_det_gender?: string
    hh_char_hh_det_age?: number
    hh_char_hh_det_dis_select?: NonNullable<Bn_Re.T['hh_char_hh_det']>[0]['hh_char_hh_det_dis_select']
    hh_char_hh_det_status?: NonNullable<Protection_pss.T['hh_char_hh_det']>[0]['hh_char_hh_det_status']
  }): PersonDetails => {
    const res: PersonDetails = KoboGeneralMapping.mapPerson(_ as any)
    res.status = _.hh_char_hh_det_status
    res.disability = _.hh_char_hh_det_dis_select
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
    disabilities: Ecrec_cashRegistration.Option<'hh_char_dis_select'>[]
    disabilitiesCount: number
    elderlyCount: number
    childrenCount: number
    adultCount: number
  }

  export const addIndividualBreakdownColumn = <T extends StandardKoboFormQuestion>(row: T): T & {custom: IndividualBreakdown} => {
    const p = KoboGeneralMapping.getPersonsFromStupidKoboForm(row)
    ;(row as any).custom = KoboGeneralMapping.getIndividualBreakdown(p)
    return (row as any)
  }

  export const getIndividualBreakdown = (hh: Person.PersonWDisability[]): IndividualBreakdown => {
    const disabilities = new Set<Ecrec_cashRegistration.Option<'hh_char_dis_select'>>()
    let disabilitiesCount = 0
    let childrenCount = 0
    let elderlyCount = 0
    let adultCount = 0
    hh?.forEach(_ => {
      _.disabilities?.forEach(disabilities.add, disabilities)
      if (_.age && _.age < 18) childrenCount++
      if (_.age && _.age >= 18) adultCount++
      if (_.age && _.age >= 60) elderlyCount++
      if (_.disabilities && !_.disabilities.includes('diff_none')) disabilitiesCount++
    })
    disabilities.delete('diff_none')
    return {
      adultCount: adultCount,
      elderlyCount: elderlyCount,
      childrenCount: childrenCount,
      disabilitiesCount: disabilitiesCount,
      disabilities: Array.from(disabilities),
    }
  }

  export const getPersonsFromStupidKoboForm = (d: StandardKoboFormQuestion): Person.PersonWDisability[] => {
    return [
      ...(d.hh_char_hh_det ?? []),
      {
        hh_char_hh_det_dis_select: d.hh_char_hhh_dis_select,
        hh_char_hh_det_age: d.hh_char_hhh_age,
        hh_char_hh_det_gender: d.hh_char_hhh_gender,
      },
      {
        hh_char_hh_det_dis_select: d.hh_char_res_dis_select,
        hh_char_hh_det_age: d.hh_char_res_age,
        hh_char_hh_det_gender: d.hh_char_res_gender,
      },
    ].map(_ => ({
      age: _.hh_char_hh_det_age,
      gender: fnSwitch(_.hh_char_hh_det_gender!, {
        female: Gender.Female,
        male: Gender.Male,
      }, () => Gender.Other),
      disabilities: _.hh_char_hh_det_dis_select
    }))
  }

  export const getPersonsFromStandardizedKoboForm = (d: StandardKoboFormQuestion): Person.PersonWDisability[] => {
    return (d.hh_char_hh_det ?? []).map(_ => ({
      age: _.hh_char_hh_det_age,
      gender: fnSwitch(_.hh_char_hh_det_gender!, {
        female: Gender.Female,
        male: Gender.Male,
      }, () => Gender.Other),
      disabilities: _.hh_char_hh_det_dis_select
    }))
  }
}