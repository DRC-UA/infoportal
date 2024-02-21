import {WfpDeduplicationStatus} from '@/core/sdk/server/wfpDeduplication/WfpDeduplication'
import {ScRadioGroup, ScRadioGroupItem} from '@/shared/RadioGroup'
import {Lazy} from '@/shared/Lazy'
import {format} from 'date-fns'
import {Enum, Seq, seq} from '@alexandreannic/ts-utils'
import {ChartLine} from '@/shared/charts/ChartLine'
import React, {useState} from 'react'
import {MpcaEntity} from '@/core/sdk/server/mpca/MpcaEntity'
import {useI18n} from '@/core/i18n'
import {Box, Checkbox, Theme, useTheme} from '@mui/material'
import {Txt} from 'mui-extension'
import {Panel, PanelHead} from '@/shared/Panel'

const colors = (t: Theme) => ({
  Total: t.palette.text.disabled,
  [WfpDeduplicationStatus.Deduplicated]: t.palette.primary.main,
  [WfpDeduplicationStatus.PartiallyDeduplicated]: 'orange',
  Sum: 'red',
})

const defaultDisplayedCurves = {
  Total: true,
  [WfpDeduplicationStatus.Deduplicated]: true,
  [WfpDeduplicationStatus.PartiallyDeduplicated]: false,
  Sum: false,
}

export const MpcaDashboardDeduplication = ({
  data,
}: {
  data: Seq<MpcaEntity>
}) => {
  const {m} = useI18n()
  const theme = useTheme()
  const [curveType, setCurveType] = useState<'ratio' | 'value'>('ratio')
  const [displayedCurves, setDisplayedCurves] = useState<{
    Total: boolean
    Sum: boolean
    [WfpDeduplicationStatus.PartiallyDeduplicated]: boolean
    [WfpDeduplicationStatus.Deduplicated]: boolean
  }
  >(defaultDisplayedCurves)

  return (
    <Panel>
      <PanelHead action={
        <ScRadioGroup inline dense value={curveType} onChange={setCurveType} sx={{mb: 1}}>
          <ScRadioGroupItem hideRadio value="ratio">%</ScRadioGroupItem>
          <ScRadioGroupItem hideRadio value="value">{m.value}</ScRadioGroupItem>
        </ScRadioGroup>
      }>
        {m.deduplication}
      </PanelHead>
      <Lazy deps={[data, curveType, displayedCurves]} fn={() => {
        const gb = data.groupBy(d => format(d.date, 'yyyy-MM'))
        return new Enum(gb)
          .transform((k, v) => {
            const seqv = seq(v)
            const total = seqv.length
            const deduplicated = seqv.filter(_ => _.deduplication?.status === WfpDeduplicationStatus.Deduplicated).length
            const partiallyDeduplicated = seqv.filter(_ => _.deduplication?.status === WfpDeduplicationStatus.PartiallyDeduplicated).length
            const sum = deduplicated + partiallyDeduplicated
            const res = curveType === 'value' ? {
              Total: total,
              [WfpDeduplicationStatus.Deduplicated]: deduplicated,
              [WfpDeduplicationStatus.PartiallyDeduplicated]: partiallyDeduplicated,
              Sum: sum,
            } : {
              [WfpDeduplicationStatus.Deduplicated]: deduplicated / total * 100,
              [WfpDeduplicationStatus.PartiallyDeduplicated]: partiallyDeduplicated / total * 100,
              Sum: sum / total * 100,
            }
            return [k, new Enum(res).filter((k) => displayedCurves[k]).get()]
          })
          .sort(([ka], [kb]) => ka.localeCompare(kb))
          .entries()
          .map(([k, v]) => ({name: k, ...v}))
      }}>
        {_ => (
          <ChartLine
            colorsByKey={colors}
            data={_ as any}
            height={190}
            hideLabelToggle
            hideLegend
          />
        )}
      </Lazy>
      <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        {Enum.keys(defaultDisplayedCurves).map(key => !(key === 'Total' && curveType === 'ratio') &&
          <Txt size="small" key={key}>
            <Checkbox
              size="small"
              sx={{ml: .5, '& svg': {fill: colors(theme)[key] + ' !important'}}}
              checked={displayedCurves[key]}
              onChange={(e, checked) => setDisplayedCurves(prev => ({...prev, [key]: checked}))}
            />
            {key}
          </Txt>
        )}
      </Box>
    </Panel>
  )
}