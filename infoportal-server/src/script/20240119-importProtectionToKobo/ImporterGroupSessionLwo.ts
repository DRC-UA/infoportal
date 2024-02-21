import {KoboImportGroupSession} from './KoboImportGroupSession'
import {ImportPssLwo} from './ImporterPssLwo'
import {fnSwitch, mapFor} from '@alexandreannic/ts-utils'

export namespace ImporterGroupSessionLwo {

  export interface Csv {
    'Project Code': string
    'Session No': string
    'legal or protection': string
    'Oblast': string
    'Raion': string
    'Hromada': string
    'Location name': string
    'Date': string
    'Topic': string
    'Language': string
    'Settlement type': string
    'Female 18-49': string
    'Female 50+': string
    'Male 18-49': string
    'Male 50+': string
    'Total': string
    'PoC': string
  }

  export const map = (a: Csv, comments: string): KoboImportGroupSession => {
    const date = ImportPssLwo.mapDate(a.Date)
    return {
      start: date,
      end: date,
      introduction: {
        date: date,
        project: 'echo',
        staff_to_insert_their_DRC_office: 'lviv',
        location: 'logow',
        ben_det_oblast: 'lvivska',
        ben_det_raion: fnSwitch(a.Raion, {
          Chervonohradskyy: 'chervonohradskyi',
          Lvivskiy: 'lvivskyi',
          Kalushsky: 'kaluskyi',
          Stryiskyy: 'stryiskyi',
          Volodymyrsky: 'volodymyr-volynskyi',
          Zolochivsky: 'zolochivskyi',
        }),
        ben_det_hromada: fnSwitch(a.Hromada, {
          Bibrska: 'bibrska',
          Bortiatyn: 'yavorivska',
          Bolehivska: 'bolekhivska',
          Dolynska: 'dolynska',
          Hnizdychivska: 'hnizdychivska',
          Lvivska: 'lvivska_2',
          Novovolynska: 'novovolynska',
          Kalushska: 'kaluska',
          Radehivska: 'radekhivska',
          Sokalska: 'sokalska',
          Zolochivska: 'zolochivska',
        }),
        ben_det_hromada_001: a['Location name'],
      },
      gi: {
        activity: 'gpt',
        activity_topic: a.Topic,
        new_ben: 'yes',
        new_ben_no: +a['Session No'],
        numb_part: +a.Total,
        comments,
        hh_char_hh_det: [
          ...mapFor(+a['Female 18-49'], () => ({
            hh_char_hh_det_age: 30,
            hh_char_hh_det_gender: 'female' as const,
            hh_char_hh_det_status: 'idp' as const,
          })),
          ...mapFor(+a['Female 50+'], () => ({
            hh_char_hh_det_age: 64,
            hh_char_hh_det_gender: 'female' as const,
            hh_char_hh_det_status: 'idp' as const,
          })),
          ...mapFor(+a['Male 18-49'], () => ({
            hh_char_hh_det_age: 30,
            hh_char_hh_det_gender: 'male' as const,
            hh_char_hh_det_status: 'idp' as const,
          })),
          ...mapFor(+a['Male 50+'], () => ({
            hh_char_hh_det_age: 64,
            hh_char_hh_det_gender: 'male' as const,
            hh_char_hh_det_status: 'idp' as const,
          })),
        ]
      }
    }
  }
}