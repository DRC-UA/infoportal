import {KoboImportGroupSession} from './KoboImportGroupSession'
import {ImportPssLwo} from './ImporterPssLwo'
import {fnSwitch, mapFor} from '@alexandreannic/ts-utils'

export namespace ImporterGroupSessionHrk {

  export interface Csv {
    'Area code': string
    'Donor': string
    'Project Code': string
    'Info session #': string
    'Session No': string
    'Oblast': string
    'Raion': string
    'Hromada': string
    'Location name': string
    'Date': string
    'Info session topic': string
    'Language': string
    'Facilitator': string
    'Settlement type': string
    'Female 18-29': string
    'Female 30-49': string
    'Female 50-59': string
    'Female 60+': string
    'Male 18-29': string
    'Male 30-49': string
    'Male 50-59': string
    'Male 60+': string
    'Total': string
    'PoC': string
    'Comments': string
  }

  export const map = (a: Csv, comments: string): KoboImportGroupSession => {
    const date = ImportPssLwo.mapDate(a.Date)
    return {
      start: date,
      end: date,
      introduction: {
        date: date,
        project: 'echo',
        staff_to_insert_their_DRC_office: 'kharkiv',
        location: 'logow',
        ben_det_oblast: fnSwitch(a.Oblast, {
          Donetsk: 'donetska',
          Kharkiv: 'kharkivska',
        }),
        ben_det_raion: fnSwitch(a.Raion, {
          Iziumskyy: 'iziumskyi',
          Kharkiv: 'kharkivskyi',
          Kharkivskiy: 'kharkivskyi',
          Kramatorskiy: 'kramatorskyi',
          Kupiyanskii: 'kupianskyi',
          Kupyansk: 'kupianskyi',
        }),
        ben_det_hromada: fnSwitch(a.Hromada.trim(), {
          Balakliiska: 'balakliiska',
          Dergachivska: 'derhachivska',
          Iziumska: 'iziumska',
          Kharkivska: 'kharkivska_2',
          Shevchenkivska: 'shevchenkivska',
          Svayatogirska: 'sviatohirska',
        }),
        ben_det_hromada_001: a['Location name'],
      },
      gi: {
        activity: 'gpt',
        activity_topic: a['Info session topic'],
        new_ben: 'yes',
        new_ben_no: +a['Session No'],
        numb_part: +a.Total,
        comments,
        hh_char_hh_det: [
          ...mapFor(+a['Female 18-29'], () => ({
            hh_char_hh_det_age: 22,
            hh_char_hh_det_gender: 'female' as any,
            hh_char_hh_det_status: ImportPssLwo.mapStatus(a.PoC),
          })),
          ...mapFor(+a['Female 30-49'], () => ({
            hh_char_hh_det_age: 37,
            hh_char_hh_det_gender: 'female' as any,
            hh_char_hh_det_status: ImportPssLwo.mapStatus(a.PoC),
          })),
          ...mapFor(+a['Female 50-59'], () => ({
            hh_char_hh_det_age: 54,
            hh_char_hh_det_gender: 'female' as any,
            hh_char_hh_det_status: ImportPssLwo.mapStatus(a.PoC),
          })),
          ...mapFor(+a['Female 60+'], () => ({
            hh_char_hh_det_age: 67,
            hh_char_hh_det_gender: 'female' as any,
            hh_char_hh_det_status: ImportPssLwo.mapStatus(a.PoC),
          })),
          ...mapFor(+a['Male 18-29'], () => ({
            hh_char_hh_det_age: 22,
            hh_char_hh_det_gender: 'male' as any,
            hh_char_hh_det_status: ImportPssLwo.mapStatus(a.PoC),
          })),
          ...mapFor(+a['Male 30-49'], () => ({
            hh_char_hh_det_age: 37,
            hh_char_hh_det_gender: 'male' as any,
            hh_char_hh_det_status: ImportPssLwo.mapStatus(a.PoC),
          })),
          ...mapFor(+a['Male 50-59'], () => ({
            hh_char_hh_det_age: 54,
            hh_char_hh_det_gender: 'male',
            hh_char_hh_det_status: ImportPssLwo.mapStatus(a.PoC),
          })),
          ...mapFor(+a['Male 60+'], () => ({
            hh_char_hh_det_age: 67,
            hh_char_hh_det_gender: 'male',
            hh_char_hh_det_status: ImportPssLwo.mapStatus(a.PoC),
          })),
        ],
      }
    }
  }
}