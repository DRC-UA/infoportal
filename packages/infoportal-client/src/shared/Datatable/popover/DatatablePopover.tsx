import {ReactNode, useMemo} from 'react'
import {seq} from '@axanc/ts-utils'
import {Box, Popover, PopoverProps} from '@mui/material'

import {KeyOf} from 'infoportal-common'

import {useI18n} from '@/core/i18n'
import {IpBtn} from '@/shared/Btn'
import {ChartBar} from '@/shared/charts/ChartBar'
import {ChartHelper} from '@/shared/charts/chartHelper'
import {ChartLineByDate} from '@/shared/charts/ChartLineByDate'
import {DatatableOptions, DatatableRow} from '@/shared/Datatable/util/datatableType'
import {PanelBody, PanelHead} from '@/shared/Panel'
import {PanelFoot} from '@/shared/Panel/PanelFoot'
import {Txt} from '@/shared/Txt'

const RenderRow = ({label, value}: {label: ReactNode; value: ReactNode}) => {
  return (
    <Box sx={{display: 'flex', '&:not(:last-of-type)': {mb: 1.5}}}>
      <Txt color="hint" sx={{flex: 1, mr: 2}}>
        {label}
      </Txt>
      <Txt block bold>
        {value}
      </Txt>
    </Box>
  )
}

export const NumberChoicesPopover = <T,>({
  question,
  data,
  mapValues,
  anchorEl,
  onClose,
}: {
  mapValues?: (_: any, i: number) => any
  question: KeyOf<T>
  data: T[]
} & Pick<PopoverProps, 'anchorEl' | 'onClose'>) => {
  const {m, formatLargeNumber} = useI18n()
  const chart = useMemo(() => {
    const mapped = seq(data)
      .map((row, i) => (mapValues ? mapValues(row, i) : row[question]))
      .filter((cell) => cell !== undefined && cell !== '' && !isNaN(cell))
      .map((cell) => Number(cell))
    const min = Math.min(...mapped)
    const max = Math.max(...mapped)
    const sum = mapped.sum()
    const avg = sum / mapped.length
    return {mapped, min, max, sum, avg}
  }, [data, question])

  return (
    <Popover open={!!anchorEl} anchorEl={anchorEl} onClose={onClose}>
      <PanelHead>{question as string}</PanelHead>
      <PanelBody>
        <RenderRow label={m.count} value={formatLargeNumber(chart.mapped.length)} />
        <RenderRow label={m.sum} value={formatLargeNumber(chart.sum)} />
        <RenderRow label={m.average} value={formatLargeNumber(chart.avg, {maximumFractionDigits: 2})} />
        <RenderRow label={m.min} value={formatLargeNumber(chart.min)} />
        <RenderRow label={m.max} value={formatLargeNumber(chart.max)} />
      </PanelBody>
      <PanelFoot alignEnd>
        <IpBtn color="primary" onClick={onClose as any}>
          {m.close}
        </IpBtn>
      </PanelFoot>
    </Popover>
  )
}

export const MultipleChoicesPopover = <T extends DatatableRow>({
  getValue,
  title,
  data,
  anchorEl,
  onClose,
  multiple,
  translations,
}: {
  title?: ReactNode
  translations?: DatatableOptions[]
  data: T[]
} & Pick<PopoverProps, 'anchorEl' | 'onClose'> &
  (
    | {
        multiple: true
        getValue: (_: T) => string[]
      }
    | {
        multiple?: false
        getValue: (_: T) => string
      }
  )) => {
  const {m, currentLang} = useI18n()
  const chart = useMemo(() => {
    const chart = (() => {
      if (multiple) {
        const mapped = seq(data).map(getValue).compact()
        return ChartHelper.multiple({data: mapped})
      } else {
        const mapped = seq(data).map(getValue).compact()
        return ChartHelper.single({data: mapped})
      }
    })()

    return chart
      .setLabel(seq(translations).reduceObject<Record<string, ReactNode>>((_) => [_.value!, _.label!]))
      .sortBy.value()
      .get()
  }, [getValue, data, translations, currentLang])

  return (
    <Popover
      open={!!anchorEl}
      anchorEl={anchorEl}
      onClose={onClose}
      slotProps={{paper: {sx: {minWidth: 400, maxWidth: 500}}}}
    >
      <PanelHead>
        <Txt truncate>{title}</Txt>
      </PanelHead>
      <PanelBody sx={{maxHeight: '50vh', overflowY: 'auto'}}>
        <ChartBar data={chart} />
      </PanelBody>
      <PanelFoot alignEnd>
        <IpBtn color="primary" onClick={onClose as any}>
          {m.close}
        </IpBtn>
      </PanelFoot>
    </Popover>
  )
}

export const DatesPopover = <T,>({
  getValue,
  data,
  anchorEl,
  onClose,
  title,
}: {
  getValue: (_: T) => Date | undefined
  data: T[]
  title: string
} & Pick<PopoverProps, 'anchorEl' | 'onClose'>) => {
  const {m} = useI18n()

  return (
    <Popover open={!!anchorEl} anchorEl={anchorEl} onClose={onClose}>
      <PanelHead>{title}</PanelHead>
      <PanelBody sx={{maxHeight: '50vh', overflowY: 'auto'}}>
        <ChartLineByDate data={data} curves={{[title]: getValue}} sx={{minWidth: 360}} />
      </PanelBody>
      <PanelFoot alignEnd>
        <IpBtn color="primary" onClick={onClose as any}>
          {m.close}
        </IpBtn>
      </PanelFoot>
    </Popover>
  )
}
