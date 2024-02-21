import {Box, Checkbox, Divider, FormControlLabel, Icon, MenuItem, Popover, PopoverProps, Slider, Switch} from '@mui/material'
import {IpBtn} from '../../Btn'
import {useI18n} from '../../../core/i18n'
import React, {Dispatch, ReactNode, SetStateAction, useEffect, useMemo, useState} from 'react'
import {IpInput} from '../../Input/Input'
import {MultipleChoices} from '../../MultipleChoices'
import {PeriodPicker} from '../../PeriodPicker/PeriodPicker'
import {IpIconBtn} from '../../IconBtn'
import {Txt} from 'mui-extension'
import {OrderBy} from '@alexandreannic/react-hooks-lib'
import {PanelBody, PanelHead} from '@/shared/Panel'
import {PanelFoot} from '@/shared/Panel/PanelFoot'
import {SheetFilterValueDate, SheetFilterValueNumber, SheetFilterValueSelect, SheetFilterValueString, SheetOptions, SheetRow} from '@/shared/Sheet/util/sheetType'
import {type} from 'os'
import {seq} from '@alexandreannic/ts-utils'
import {useSheetContext} from '@/shared/Sheet/context/SheetContext'
import {endOfDay} from 'date-fns'

export type SheetFilterDialogProps = Pick<PopoverProps, 'anchorEl'> & {
  orderBy?: OrderBy
  sortBy?: string
  onOrderByChange?: (_?: OrderBy) => void
  onClose?: () => void
  onClear?: () => void
  columnId: string
  filterActive?: boolean
  title: ReactNode
  data: SheetRow[]
  options?: SheetOptions[]
} & ({
  renderValue: any
  onChange?: (columnName: string, value: SheetFilterValueNumber) => void
  value: SheetFilterValueNumber
  type: 'number'
} | {
  renderValue: any
  onChange?: (columnName: string, value: SheetFilterValueDate) => void
  value: SheetFilterValueDate
  type: 'date'
} | {
  renderValue: any
  onChange?: (columnName: string, value: SheetFilterValueSelect) => void
  value: SheetFilterValueSelect
  type: 'select_one' | 'select_multiple'
} | {
  renderValue: any
  onChange?: (columnName: string, value: SheetFilterValueString) => void
  value: SheetFilterValueString
  type: 'string'
})

export const SheetFilterModal = ({
  data,
  orderBy,
  sortBy,
  onOrderByChange,
  value,
  onChange,
  onClear,
  onClose,
  anchorEl,
  // schema,
  columnId,
  title,
  options,
  filterActive,
  type,
}: SheetFilterDialogProps) => {
  const {m} = useI18n()
  const [innerValue, setInnerValue] = useState<any>(value)
  useEffect(() => {
    value && setInnerValue(value)
  }, [value])

  return (
    <Popover open={!!anchorEl} anchorEl={anchorEl} onClose={onClose}>
      <PanelHead action={
        <IpIconBtn children="filter_alt_off" color={filterActive ? 'primary' : undefined} onClick={() => {
          onClear?.()
          setInnerValue(undefined)
        }}/>
      }>
        <Txt block sx={{maxWidth: 340}} truncate>{title}</Txt>
      </PanelHead>
      <PanelBody>
        <Box sx={{display: 'flex', alignItems: 'center', borderBottom: t => `1px solid ${t.palette.divider}`, mb: 1}}>
          <Txt color="hint" sx={{flex: 1}}>{m.sort}</Txt>
          <MenuItem onClick={() => onOrderByChange?.(orderBy === 'desc' ? undefined : 'desc')}>
            <Icon
              fontSize="small"
              color={sortBy === columnId && orderBy === 'desc' ? 'primary' : undefined}
              children="south"
            />
          </MenuItem>
          <MenuItem onClick={() => onOrderByChange?.(orderBy === 'asc' ? undefined : 'asc')}>
            <Icon
              fontSize="small"
              color={sortBy === columnId && orderBy === 'asc' ? 'primary' : undefined}
              children="north"
            />
          </MenuItem>
        </Box>
        {type && (() => {
          switch (type) {
            case 'date':
              return <PeriodPicker value={innerValue} onChange={_ => {
                if (_[1]) _[1] = endOfDay(_[1])
                setInnerValue(_)
              }}/>
            case 'select_one':
            case 'select_multiple':
              return (
                <SheetFilterDialogSelect options={options} value={innerValue} onChange={setInnerValue}/>
              )
            case 'number': {
              return (
                <SheetFilterDialogNumber data={data} columnId={columnId} value={innerValue} onChange={setInnerValue}/>
              )
            }
            default:
              return (
                <SheetFilterDialogText value={innerValue} onChange={setInnerValue}/>
              )
          }
        })()}
      </PanelBody>
      <PanelFoot alignEnd>
        <IpBtn color="primary" onClick={onClose}>
          {m.close}
        </IpBtn>
        <IpBtn color="primary" onClick={() => onChange && onChange(columnId, innerValue)}>
          {m.filter}
        </IpBtn>
      </PanelFoot>
    </Popover>
  )
}

export const SheetFilterDialogSelect = ({
  value,
  onChange,
  options,
}: {
  value: SheetFilterValueString
  onChange: Dispatch<SetStateAction<SheetFilterValueSelect>>
  options?: SheetOptions[]
}) => {
  const {m} = useI18n()
  const [filter, setFilter] = useState<string>('')
  return (
    <MultipleChoices
      options={options
        ?.filter(_ => filter === '' || ((typeof _.label === 'string' ? _.label : _.value).toLowerCase() ?? '').includes(filter.toLowerCase()))
        .map((_, i) => ({
          key: i,
          value: _.value ?? '',
          children: _.label
        })) ?? []}
      value={value as any}
      onChange={onChange}
    >
      {({options, toggleAll, allChecked, someChecked}) => (
        <>
          <FormControlLabel
            sx={{display: 'block', fontWeight: t => t.typography.fontWeightBold}}
            onClick={toggleAll}
            control={<Checkbox size="small" checked={allChecked} indeterminate={!allChecked && someChecked}/>}
            label={m.selectAll}
          />
          <IpInput label={m.filterPlaceholder} helperText={null} sx={{mb: 1}} onChange={e => setFilter(e.target.value)}/>
          <Divider/>
          <Box sx={{maxHeight: 350, overflowY: 'auto'}}>
            {options.map(o =>
              <FormControlLabel
                sx={{display: 'block'}}
                key={o.key}
                control={<Checkbox size="small" name={o.value} checked={o.checked} onChange={o.onChange}/>}
                label={o.children}
              />
            )}
          </Box>
        </>
      )}
    </MultipleChoices>
  )
}

export const SheetFilterDialogText = ({
  value,
  onChange,
}: {
  value: SheetFilterValueString
  onChange: Dispatch<SetStateAction<SheetFilterValueString>>
}) => {
  const {m} = useI18n()
  return (
    <>
      <FormControlLabel
        sx={{mb: 1}}
        label={m.filterBlanks}
        value={value?.filterBlank}
        control={
          <Switch checked={value?.filterBlank} onChange={e => onChange(prev => ({...prev, filterBlank: e.target.checked}))}/>
        }
      />
      <IpInput value={value?.value} onChange={e => onChange(prev => ({...prev, value: e.target.value}))}/>
    </>
  )
}

export const SheetFilterDialogNumber = ({
  value,
  data,
  columnId,
  onChange,
}: Pick<SheetFilterDialogProps, 'data' | 'columnId'> & {
  value: SheetFilterValueNumber
  onChange: Dispatch<SetStateAction<SheetFilterValueNumber>>
}) => {
  const ctx = useSheetContext()
  const col = ctx.columnsIndex[columnId]
  if (!col.type) return
  const {min, max} = useMemo(() => {
    const values = seq(data).map(_ => col.renderValue(_) as number | undefined).compact()
    return {
      min: Math.min(...values),
      max: Math.max(...values),
    }
  }, [type, data])

  const mappedValue = [value?.[0] ?? min, value?.[1] ?? max]

  useEffect(() => {
    onChange(value)
  }, [value])

  return (
    <>
      <Slider min={min} max={max} value={mappedValue} onChange={(e, _) => onChange(_ as [number, number])}/>
      <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
        <IpInput type="number" sx={{minWidth: 60, mr: .5}} value={mappedValue[0]} onChange={e => onChange(prev => [+e.target.value, prev?.[1]])}/>
        <IpInput type="number" sx={{minWidth: 60, ml: .5}} value={mappedValue[1]} onChange={e => onChange(prev => [prev?.[0], +e.target.value])}/>
      </Box>
    </>
  )
}