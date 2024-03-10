import {fnSwitch, mapFor} from '@alexandreannic/ts-utils'
import {parse, setHours} from 'date-fns'
import {ImportKoboPss} from './KoboImportPss'
import {Bn_Re} from '../output/kobo/Bn_Re'

export namespace ImportPssLwo {

  export interface Csv {
    'Area code': string
    'Donor': string
    'Project Code': string
    'Session No': string
    'Oblast': string
    'Raion': string
    'Hromada': string
    'Location Name': string
    'Date': string
    'Topic': string
    'Language': string
    'Settlement type': string
    'PoC': string
    'Female 18-29': string
    'Female 30-49': string
    'Female 50-59': string
    'Female 60+': string
    'Male 18-29': string
    'Male 30-49': string
    'Male 50-59': string
    'Male 60+': string
    'Total': string
  }

  export const mapStatus = (_: string): any => fnSwitch(_, {
    'Conflict affected': 'unspec',
    'IDP': 'idp',
  }, () => 'other')

  export const mapDate = (_: string): any => {
    try {
      return setHours(parse(_, 'dd.MM.yyyy', new Date()), 11).toISOString()
    } catch (e) {
      new Error(`Failed to parse ${_}.`)
    }
  }

  export const map = (_: Csv, comments: string): ImportKoboPss => {
    const date = mapDate(_.Date)
    return {
      start: date,
      end: date,
      introduction: {
        date: date,
        staff_to_insert_their_DRC_office: 'lviv',
        project: 'echo',
        ben_det_oblast: 'lvivska',
        ben_det_raion: fnSwitch(_.Raion, {
          Lviv: Bn_Re.options.ben_det_raion.lvivskyi,
          Drohobytskyi: Bn_Re.options.ben_det_raion.drohobytskyi,
          Sosnivka: Bn_Re.options.ben_det_raion.rivnenskyi,
          Brody: Bn_Re.options.ben_det_raion.zolochivskyi,
          Skoly: Bn_Re.options.ben_det_raion.stryiskyi,
          // Sosnivka: Bn_Re.options.ben_det_raion.sos,
          // Brody: Bn_Re.options.ben_det_raion.brodivska,
          // Skoly: Bn_Re.options.ben_det_raion.skolivska,
        }),
        ben_det_hromada: fnSwitch(_.Hromada, {
          Lvivska: Bn_Re.options.ben_det_hromada.lvivska_2,
          Chervonogradska: Bn_Re.options.ben_det_hromada.chernovska,
          Brodivska: Bn_Re.options.ben_det_hromada.brodivska,
          Stryiska: Bn_Re.options.ben_det_hromada.stryiska,
        }),
        ben_det_hromada_001: _['Location Name'],
        location: fnSwitch(_['Settlement type'], {
          'Collective centre': 'logow',
          Institution: 'lopub',
        }),
      },
      gi: {
        activity: 'mhpss',
        activity_topic: _.Topic,
        new_ben: 'yes',
        new_ben_no: +_['Session No'],
        numb_part: +_.Total,
        hh_char_hh_det: [
          ...mapFor(+_['Female 18-29'], () => ({
            hh_char_hh_det_age: 22,
            hh_char_hh_det_gender: 'female' as any,
            hh_char_hh_det_status: ImportPssLwo.mapStatus(_.PoC),
          })),
          ...mapFor(+_['Female 30-49'], () => ({
            hh_char_hh_det_age: 37,
            hh_char_hh_det_gender: 'female' as any,
            hh_char_hh_det_status: ImportPssLwo.mapStatus(_.PoC),
          })),
          ...mapFor(+_['Female 50-59'], () => ({
            hh_char_hh_det_age: 54,
            hh_char_hh_det_gender: 'female' as any,
            hh_char_hh_det_status: ImportPssLwo.mapStatus(_.PoC),
          })),
          ...mapFor(+_['Female 60+'], () => ({
            hh_char_hh_det_age: 67,
            hh_char_hh_det_gender: 'female' as any,
            hh_char_hh_det_status: ImportPssLwo.mapStatus(_.PoC),
          })),
          ...mapFor(+_['Male 18-29'], () => ({
            hh_char_hh_det_age: 22,
            hh_char_hh_det_gender: 'male' as any,
            hh_char_hh_det_status: ImportPssLwo.mapStatus(_.PoC),
          })),
          ...mapFor(+_['Male 30-49'], () => ({
            hh_char_hh_det_age: 37,
            hh_char_hh_det_gender: 'male' as any,
            hh_char_hh_det_status: ImportPssLwo.mapStatus(_.PoC),
          })),
          ...mapFor(+_['Male 50-59'], () => ({
            hh_char_hh_det_age: 54,
            hh_char_hh_det_gender: 'male',
            hh_char_hh_det_status: ImportPssLwo.mapStatus(_.PoC),
          })),
          ...mapFor(+_['Male 60+'], () => ({
            hh_char_hh_det_age: 67,
            hh_char_hh_det_gender: 'male',
            hh_char_hh_det_status: ImportPssLwo.mapStatus(_.PoC),
          })),
        ],
        comments,
      }
    }
  }
}
