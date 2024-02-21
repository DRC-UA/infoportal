import {KoboImportGroupSession} from './KoboImportGroupSession'
import {ImportPssLwo} from './ImporterPssLwo'
import {fnSwitch} from '@alexandreannic/ts-utils'
import {Protection_groupSession} from '../output/kobo/Protection_groupSession'

export namespace ImporterGroupSessionCej {

  export interface Csv {
    'Area code': string
    'Donor': string
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
    'Facilitator': string
    'Settlement type': string
    'Gender': string
    'Age': string
    'Status': string
    'Delivered': string
    'Comments': string
  }

  export interface GroupedRow extends Omit<Csv, 'Age' | 'Gender' | 'Status'> {
    participants: NonNullable<Protection_groupSession.T['hh_char_hh_det']>
  }

  export const map = (a: ImporterGroupSessionCej.GroupedRow, comments: string): KoboImportGroupSession => {
    const date = ImportPssLwo.mapDate(a.Date)
    return {
      start: date,
      end: date,
      introduction: {
        date: date,
        project: 'echo',
        staff_to_insert_their_DRC_office: 'chernihiv',
        location: 'logow',
        ben_det_oblast: 'chernihivska',
        ben_det_raion: fnSwitch(a.Raion, {
          Chernihivskyi: 'chernihivskyi',
          'Novhorod-Siverskyi': 'novhorod-siverskyi',
          Koriukivska: 'koriukivskyi',
          Prylutskyi: 'prylutskyi',
          Koriukivskyi: 'koriukivskyi'
        }),
        ben_det_hromada: fnSwitch(a.Hromada.trim(), {
          Tupychivska: 'tupychivska',
          Horodnianska: 'horodnianska',
          Ichnianska: 'ichnianska',
          Kiptivska: 'kiptivska',
          Snovska: 'snovska',
          Menska: 'menska',
          Novobilouska: 'novobilouska',
          Kyinska: 'kyinska',
          Sednivska: 'sednivska',
          Chernihivska: 'chernihivska_2',
          Ponornytska: 'ponornytska',
          Kulykivska: 'kulykivska',
          Koriukivskyi: 'koriukivska',
          Kyselivska: 'kyselivska',
          'Mykhailo-Kotsiubynska': 'mykhailo-kotsiubynska',
          Koropska: 'koropska',
          Koriukivska: 'koriukivska',
          Kyselivka: 'kyselivska',
        }),
        ben_det_hromada_001: a['Location name'],
      },
      gi: {
        activity: 'gpt',
        activity_topic: a.Topic,
        new_ben: 'yes',
        new_ben_no: +a['Session No'],
        numb_part: a.participants.length,
        comments,
        hh_char_hh_det: a.participants,
      }
    }
  }
}