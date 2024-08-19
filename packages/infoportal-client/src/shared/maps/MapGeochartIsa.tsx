import React, {useEffect} from 'react'
import {Box, GlobalStyles, useTheme} from '@mui/material'
import {useAppSettings} from '../../core/context/ConfigContext'
import {Theme} from '@mui/material/styles'
import {OblastIndex} from 'infoportal-common'
import {getGoogle} from '@/core/google'

const generalStyles = <GlobalStyles styles={{
  '#map-isa-ua path': {
    stroke: '#bfbfbf',
    strokeWidth: 1,
  },
  '#map-isa-offices svg path[fill="none"]': {
    strokeWidth: 0
  },
  '#map-isa-ua svg path[fill="none"]': {
    strokeWidth: 0
  }
}}/>

const occupiedColor = '#ffdcd2'

interface Office {
  city: string
  closed?: boolean
  align?: 'right'
}

const officeStyle = (t: Theme) => ({
  open: {
    icon: 'business',
    color: t.palette.primary.main,
    label: 'Operational office'
  },
  closed: {
    icon: 'domain_disabled',
    color: '#afafaf',
    label: 'Temporary closed office',
  }
})

const offices: Office[] = [
  // {city: 'Kyiv'},
  // {city: 'Dnipro'},
  // {city: 'Mykolaiev'},
  // {city: 'Lviv'},
  // {city: 'Chernihiv'},
  // {city: 'Poltava'},
  // {city: 'Chernivtsi'},
  // {city: 'Sloviansk', closed: true},
  // {city: 'Slevlerodonetsk', closed: true, align: 'right'},
  {city: 'Mariupol', closed: true},
]

let google: any

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
  let trys = 0
  google = await getGoogle()
  google.charts.load('current', {
    'packages': ['geochart'],
    'mapsApiKey': apiKey
  })
  google.charts.setOnLoadCallback(() => {
    drawUA(mapUaSelector, theme)
    drawOffices(mapOfficeSelector)
    // setTimeout(() => drawOfficeMarkers(mapOfficeSelector, theme), 2000)
  })
}

const occupiedOblasts = [
  'UA65',
  'UA12',
  'UA48',
  'UA23',
]

const drawOffices = (selector: string) => {
  // const data = google.visualization.arrayToDataTable([
  //   ['City', 'Population', 'Area'],
  //   ...offices.map(o => [o.city, 100, 100]),
  // ])

  const data = google.visualization.arrayToDataTable([
    ['State', 'Population'],
    // ...Enum.keys(OblastIndex.oblastByISO).map(_ => [_.replace('UA', 'UA-'), occupiedOblasts.includes(_) ? 100 : 0]),
  ])

  const chart = new google.visualization.GeoChart(document.querySelector(selector)!)
  chart.draw(data, {
    legend: 'none',
    colorAxis: {
      colors: ['#f8f8f8', '#000000'],
    },
    backgroundColor: {
      fill: 'transparent',
    },
    datalessRegionColor: 'transparent',
    displayMode: 'text',
    region: 'UA',
    resolution: 'provinces',
    // colorAxis: {
    //   colors: ['#fafafa']
    // }
  })
}

const drawUA = (selector: string, theme: Theme) => {
  const data = google.visualization.arrayToDataTable([
    ['State', 'Population'],
    ...OblastIndex.isos.map(_ => [_.replace('UA', 'UA-'), occupiedOblasts.includes(_) ? 2 : 1]),
  ])

  const chart = new google.visualization.GeoChart(document.querySelector(selector)!)
  chart.draw(data, {
    legend: 'none',
    colorAxis: {
      colors: ['#f8f8f8', occupiedColor],
    },
    backgroundColor: {
      fill: 'transparent',
      stroke: '#000000',
    },
    datalessRegionColor: 'transparent',
    displayMode: 'regions',
    region: 'UA',
    resolution: 'provinces',
  })
}

export const MapGeochartIsa = () => {
  const theme = useTheme()
  const {conf} = useAppSettings()
  useEffect(() => {
    drawMaps({
      apiKey: conf.gooogle.apiKey,
      theme,
      mapUaSelector: '#map-isa-ua',
      mapOfficeSelector: '#map-isa-offices',
    })
  }, [])

  const offset = 280
  return (
    <Box>
      {generalStyles}
      <Box sx={{display: 'inline-flex', alignItems: 'center', background: 'white', position: 'relative'}}>
        <Box sx={{position: 'relative', height: 500, width: 700}}>
          <Box sx={{textAlign: 'center', fontSize: '1.6em'}}>Areas of Intervention (Oblast Level)</Box>
          <Box id="map-isa-ua" sx={{top: 0, right: 0, bottom: 0, left: 0, position: 'absolute'}}/>
          <Box id="map-isa-offices" sx={{top: 0, right: 0, bottom: 0, left: 0, position: 'absolute'}}/>
        </Box>
        <Box sx={{fontSize: '.9em'}}>
          <Box sx={{position: 'absolute', top: 249, right: 450 - offset}}>Dnipropetrovska</Box>
          <Box sx={{position: 'absolute', top: 334, right: 514 - offset}}>Khersonska</Box>
          <Box sx={{position: 'absolute', top: 294, right: 570 - offset}}>Mykolaivska</Box>
          <Box sx={{position: 'absolute', top: 300, right: 445 - offset}}>Zaporizka</Box>
        </Box>
      </Box>
    </Box>
  )
}
