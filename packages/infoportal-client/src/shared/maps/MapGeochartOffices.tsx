import {fnSwitch, Obj} from '@axanc/ts-utils'
import React, {useEffect} from 'react'
import {Box, GlobalStyles, Icon, useTheme} from '@mui/material'
import {useAppSettings} from '@/core/context/ConfigContext'
import {Theme} from '@mui/material/styles'
import {Txt} from '@/shared/Txt'
import {OblastIndex} from 'infoportal-common'
import {Panel} from '@/shared/Panel'
import {getGoogle} from '@/core/google'

declare let google: any

const mapTheme = {
  occupiedColor: '#ffd0c4',
  baseColor: '#e4e4e4', // #f8f8f8
  borderColor: '#fff',
}
const generalStyles = (
  <GlobalStyles
    styles={{
      '#map-ua path': {
        strokeWidth: 1,
        stroke: mapTheme.borderColor,
      },
      '#map-offices svg path[fill="none"]': {
        strokeWidth: 0,
      },
      '#map-ua svg path[fill="none"]': {
        strokeWidth: 0,
      },
    }}
  />
)

interface Office {
  city: string
  closed?: boolean
  align?: 'right' | 'left'
}

const officeStyle = (t: Theme) => ({
  open: {
    icon: 'business',
    color: t.palette.primary.main,
    label: 'Operational office',
  },
  closed: {
    icon: 'domain_disabled',
    color: '#afafaf',
    label: 'Temporary closed office',
  },
})

const offices: Office[] = [
  {city: 'Sumy'},
  {city: 'Kyiv'},
  {city: 'Dnipro'},
  {city: 'Mykolaiv', align: 'left'},
  {city: 'Lviv'},
  {city: 'Chernihiv'},
  {city: 'Kharkiv'},
  {city: 'Herson'},
  // {city: 'Poltava'},
  // {city: 'Chernivtsi'},
  {city: 'Slovyansk', closed: true},
  {city: 'Severodonetsk', closed: true, align: 'right'},
  {city: 'Mariupol', closed: true},
]

const drawMaps = async ({
  apiKey,
  theme,
  mapOfficeSelector,
  mapUaSelector,
}: {
  mapOfficeSelector: string
  mapUaSelector: string
  apiKey: string
  theme: Theme
}) => {
  google = await getGoogle()
  google.charts.load('current', {
    packages: ['geochart'],
    mapsApiKey: apiKey,
  })
  google.charts.setOnLoadCallback(() => {
    drawUA(mapUaSelector, theme)
    drawOffices(mapOfficeSelector)
    setTimeout(() => drawOfficeMarkers(mapOfficeSelector, theme), 2000)
  })
}

const drawOffices = (selector: string) => {
  const data = google.visualization.arrayToDataTable([
    ['City', 'Population', 'Area'],
    ...offices.map((o) => [o.city, 100, 100]),
  ])

  const chart = new google.visualization.GeoChart(document.querySelector(selector)!)
  chart.draw(data, {
    legend: 'none',
    backgroundColor: 'transparent',
    datalessRegionColor: 'transparent',
    displayMode: 'text',
    region: 'UA',
    resolution: 'provinces',
    colorAxis: {
      colors: ['green', 'blue'],
    },
  })
}

const drawUA = (selector: string, theme: Theme) => {
  const occupiedOblasts = [
    'UA14',
    'UA23',
    'UA43',
    'UA44',
    'UA65',
    'UA44', // Luhanska is UA-44 in Activity Info
  ]

  const data = google.visualization.arrayToDataTable([
    ['State', 'Population'],
    ...OblastIndex.isos.map((_) => [_.replace('UA', 'UA-'), occupiedOblasts.includes(_) ? 2 : 1]),
  ])

  const chart = new google.visualization.GeoChart(document.querySelector(selector)!)
  chart.draw(data, {
    legend: 'none',
    colorAxis: {
      colors: [mapTheme.baseColor, mapTheme.occupiedColor],
    },
    backgroundColor: 'transparent',
    datalessRegionColor: 'transparent',
    displayMode: 'regions',
    region: 'UA',
    resolution: 'provinces',
  })
}

const drawOfficeMarkers = (selector: string, theme: Theme) => {
  document.querySelectorAll(`${selector} text[text-anchor=middle]`).forEach((marker: any) => {
    const office = offices.find((_) => _.city === marker.innerHTML.trim())
    if (!office) {
      return
    }
    const label = marker.cloneNode(true)
    marker.setAttribute('font-family', 'Material Icons')
    marker.setAttribute('font-size', '26')
    if (office.closed) {
      marker.innerHTML = officeStyle(theme).closed.icon
      marker.style.fill = officeStyle(theme).closed.color
    } else {
      marker.innerHTML = officeStyle(theme).open.icon
      marker.style.fill = officeStyle(theme).open.color
    }
    fnSwitch(
      office.align!,
      {
        right: () => {
          label.setAttribute('x', +marker.getAttribute('x') + 16)
          label.setAttribute('y', +marker.getAttribute('y') - 6)
          label.setAttribute('text-anchor', 'right')
        },
        left: () => {
          label.setAttribute('x', +marker.getAttribute('x') - 46 - label.clientWidth)
          label.setAttribute('y', +marker.getAttribute('y') - 6)
        },
      },
      () => {
        label.setAttribute('y', +marker.getAttribute('y') + 12)
      },
    )
    marker.parentNode.insertBefore(label, marker.nextSibling)
    label.setAttribute('font-size', theme.typography.fontSize * 0.875)
    label.setAttribute('font-family', theme.typography.fontFamily)
    label.setAttribute('fill', theme.palette.text)
    label.setAttribute('font-weight', 'bold')
  })
}

export const MapGeochartOffices = () => {
  const theme = useTheme()
  const {conf} = useAppSettings()
  useEffect(() => {
    drawMaps({
      apiKey: conf.gooogle.apiKey,
      theme,
      mapUaSelector: '#map-ua',
      mapOfficeSelector: '#map-offices',
    })
  }, [])

  return (
    <div>
      {generalStyles}
      <Box sx={{m: 2, border: (t) => `1px solid ${t.palette.divider}`}}>
        <Panel savableAsImg={true} sx={{display: 'inline-block'}}>
          <Box sx={{display: 'inline-flex', alignItems: 'center'}}>
            <Box sx={{position: 'relative', height: 500, width: 700}}>
              <Box id="map-ua" sx={{top: 0, right: 0, bottom: 0, left: 0, position: 'absolute'}} />
              <Box id="map-offices" sx={{top: 0, right: 0, bottom: 0, left: 0, position: 'absolute'}} />
            </Box>
            <Box sx={{ml: 3}}>
              <Txt block color="hint" size="big" sx={{mb: 1}}>
                Legend
              </Txt>
              {Obj.values(officeStyle(theme)).map((t) => (
                <Box key={t.label} sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                  <Icon sx={{color: t.color, mr: 1}}>{t.icon}</Icon>
                  {t.label}
                </Box>
              ))}
              <Box sx={{display: 'flex', alignItems: 'center', mb: 1, mr: 4}}>
                <Box
                  sx={{
                    background: mapTheme.occupiedColor,
                    height: 21,
                    width: 21,
                    borderRadius: 21,
                    mr: 1,
                    border: (t) => `2px solid ${t.palette.divider}`,
                  }}
                />
                Oblasts totally or partially
                <br />
                controlled by Russian military
              </Box>
            </Box>
          </Box>
        </Panel>
      </Box>
    </div>
  )
}
