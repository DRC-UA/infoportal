import {sleep} from '@alexandreannic/ts-utils'

/**
 * Was used in old ProtMonito dashboard that had kobo geolocalisation
 */
export const initGoogleMaps = async (mapId: string, color: string, bubbles: {loc: [number, number], size: number | undefined}[]) => {
  // return;
  let trys = 0
  while (!google) {
    await sleep(200 + (100 * trys))
    trys++
    if (trys > 140) break
  }
  const ukraineCenter: google.maps.LatLngLiteral = {lat: 48.96008674231441, lng: 31.702957509661097}
  const map = new google.maps.Map(document.querySelector('#map') as HTMLElement, {
    mapId: mapId,
    center: ukraineCenter,
    zoom: 5.1,
  })
  bubbles.forEach(_ => {
    if (!_.loc?.[0]) return
    const circle = new google.maps.Circle({
      clickable: true,
      strokeColor: color,
      strokeOpacity: 1,
      strokeWeight: .25,
      fillColor: color,
      fillOpacity: 0.2,
      map,
      center: {lat: _.loc[0], lng: _.loc[1]},
      radius: Math.sqrt(_.size ?? 1) * 5500,
    })
    google.maps.event.addListener(circle, 'mouseover', function () {
      map.getDiv().setAttribute('title', _.size + '')
    })
  })
}
