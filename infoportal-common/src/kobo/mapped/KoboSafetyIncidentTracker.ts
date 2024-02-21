import {Safety_incidentTracker} from '../generated/Safety_incidentTracker'
import {OblastIndex} from '../../location/oblastIndex'

export namespace KoboSafetyIncidentHelper {

  export const mapData = (_: any) => {
    const d = Safety_incidentTracker.map(_)
    return {...d, oblastISO: OblastIndex.byKoboName(d.oblast!).iso}
  }

  export type Type = ReturnType<typeof mapData>
}