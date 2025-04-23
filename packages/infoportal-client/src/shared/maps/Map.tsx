import {useState} from 'react'
import {match, Seq} from '@axanc/ts-utils'
import {Box, SxProps} from '@mui/material'

import {OblastISO} from 'infoportal-common'

import {useI18n} from '@/core/i18n'
import {MapSvgByOblast} from '@/shared/maps/MapSvgByOblast'
import {MapGoogleSettlement} from '@/shared/maps/MapGoogleSettlement'
import {Panel, PanelHead} from '@/shared/Panel'
import {ScRadioGroup, ScRadioGroupItem} from '@/shared/RadioGroup'

type Type = 'oblast' | 'settlement'

export const Map = <D extends Record<string, any>>({
  height,
  data,
  sx,
  getOblast,
  getSettlement,
}: {
  height?: number
  data: Seq<D>
  getOblast: (_: D) => OblastISO
  getSettlement: (_: D) => string | undefined
  sx?: SxProps
}) => {
  const {m} = useI18n()
  const [type, setType] = useState<Type>('oblast')
  return (
    <Panel sx={{...sx, height}}>
      <PanelHead
        action={
          <ScRadioGroup inline dense onChange={setType} value={type} sx={{fontSize: 'inherit'}}>
            <ScRadioGroupItem hideRadio value="oblast">
              {m.oblast}
            </ScRadioGroupItem>
            <ScRadioGroupItem hideRadio value="settlement">
              {m.settlement}
            </ScRadioGroupItem>
          </ScRadioGroup>
        }
      >
        {m.location}
      </PanelHead>
      <Box sx={{mt: 1}}>
        {match(type)
          .cases({
            settlement: (
              <MapGoogleSettlement
                data={data}
                getSettlement={(props) => {
                  console.log({before: props, after: getSettlement(props)})
                  return getSettlement(props)
                }}
              />
            ),
          })
          .default(
            // default is oblast
            <MapSvgByOblast
              sx={{mx: 2, maxWidth: 480, margin: 'auto'}}
              getOblast={getOblast}
              data={data}
              fillBaseOn="value"
            />,
          )}
      </Box>
    </Panel>
  )
}
