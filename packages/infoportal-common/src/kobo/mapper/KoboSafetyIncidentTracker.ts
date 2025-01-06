import {Safety_incident} from '../generated/Safety_incident'
import {OblastIndex} from '../../location/oblastIndex'

export namespace KoboSafetyIncidentHelper {
  export const mapData = (_: any) => {
    const d = Safety_incident.map(_)
    return {...d, oblastISO: OblastIndex.byKoboName(d.oblast!).iso}
  }

  export type Type = ReturnType<typeof mapData>
}
