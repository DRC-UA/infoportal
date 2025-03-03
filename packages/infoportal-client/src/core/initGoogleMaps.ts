import {sleep} from '@axanc/ts-utils'
import {appConfig} from '@/conf/AppConfig'

const layers = import('./geojson.json')

/**
 * Was used in old ProtMonito dashboard that had kobo geolocalisation
 */
export const initGoogleMaps = async ({
  mapId = appConfig.gooogle.mapId,
  color,
  bubbles,
  domSelector,
}: {
  domSelector: string
  mapId?: string
  color: string
  bubbles: {
    loc: [number, number]
    size: number
    label: string
    desc: string
  }[]
}) => {
  let trys = 0
  while (!google) {
    await sleep(200 + 100 * trys)
    trys++
    if (trys > 140) break
  }
  const ukraineCenter: google.maps.LatLngLiteral = {lat: 48.96008674231441, lng: 31.702957509661097}
  const map = new google.maps.Map(document.querySelector(domSelector) as HTMLElement, {
    mapId: mapId,
    center: ukraineCenter,
    zoom: 5.1,
    controlSize: 32,
  })
  const layerOpacity = 0.2
  layers.then((_) => {
    map.data.addGeoJson(_)
    map.data.setStyle((feature) => {
      const name = feature.getProperty('name') as string
      switch (name) {
        case 'x2':
        case 'x3':
        case 'x4':
        case 'x6':
        case 'x8':
        case 'x7':
        case 'x10':
        case 'x11':
        case 'x12':
        case 'x13':
        case 'x14':
        case 'x21':
        case 'x16':
        case 'x27':
        case 'x22':
        case 'x1': {
          return {
            fillColor: 'orange',
            fillOpacity: layerOpacity,
            strokeWeight: 0,
          }
        }
        case 'Luhansk Axis':
        case 'Donetsk Axis':
        case "Donetsk and Luhansk People's Republic":
        case 'Crimea':
        case 'Zaporizhia and Kherson Axis':
        case 'x18':
        case 'x17':
        case 'x9': {
          return {
            fillColor: 'transparent',
            fillOpacity: layerOpacity,
            strokeWeight: 0,
          }
        }
        case 'x5':
        case 'x23':
        case 'x24':
        case 'x25':
        case 'x26':
        case 'x28':
        case 'x29':
        case 'x3': {
          return {
            fillColor: 'green',
            fillOpacity: layerOpacity,
            strokeWeight: 0,
          }
        }
        case 'Frontline': {
          return {
            strokeWeight: 2,
            strokeColor: 'red',
          }
        }
        case 'Red Areas': {
          return {
            fillColor: 'red',
            fillOpacity: layerOpacity,
            // strokeColor: 'black',
            strokeWeight: 0,
          }
        }
        default:
          return {
            fillColor: 'transparent',
            strokeWeight: 0,
          }
      }
    })
  })
  const max = Math.max(...bubbles.map((_) => _.size))
  const flatted = bubbles.map((_: any) => {
    _.opacity = (_.size / max) * 0.7
    return _
  })
  flatted.forEach((_) => {
    if (!_.loc?.[0]) return
    const marker = new google.maps.Marker({
      position: new google.maps.LatLng(_.loc[0], _.loc[1]),
      map,
      // title: `${_.label} (${_.size})`,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        fillOpacity: 0.3 + _.opacity,
        fillColor: color,
        // strokeOpacity: 1.0,
        // strokeColor: olor,
        strokeWeight: 0,
        scale: 5, //pixels
      },
    })
    marker.addListener('click', () => {
      new google.maps.InfoWindow({
        content: `<h1 style="margin: 0; line-height: 1; padding: 0; margin-top: -3px">${_.size}</h1><b>${_.label}</b><br/>${_.desc ?? ''}`,
        // ariaLabel: "Uluru",
      }).open({
        anchor: marker,
        map,
      })
    })
    // const circle = new google.maps.Circle({
    //   clickable: true,
    //   strokeColor: color,
    //   strokeOpacity: _.opacity ?? 1,
    //   strokeWeight: .25,
    //   fillColor: color,
    //   fillOpacity: 0.2,
    //   map,
    //   scale: 20,
    //   center: {lat: _.loc[0], lng: _.loc[1]},
    //   radius: Math.sqrt(_.size ?? 1) * 1000,
    // })
    // google.maps.event.addListener(circle, 'mouseover', function () {
    //   map.getDiv().setAttribute('title', (_.opacity ?? _.size) + '')
    // })
  })
}
