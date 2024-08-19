import {Checkbox, FormControl, FormControlProps, InputLabel, MenuItem, OutlinedInput, Select, SxProps, Theme} from '@mui/material'
import React, {ReactNode, useEffect, useMemo, useState} from 'react'
import {useI18n} from '../../core/i18n'
import {makeSx} from '@/core/theme'

type Option<T extends string | number = string> = {value: T, children: ReactNode, key?: string}

export interface AaSelectBase<T extends string | number = string> extends Pick<FormControlProps, 'disabled' | 'id'> {
  label?: ReactNode
  showUndefinedOption?: boolean
  options: Option<T>[] | string[]
  sx?: SxProps<Theme>
}

export interface AaSelectMultiple<T extends string | number = string> extends AaSelectBase<T> {
  defaultValue?: T[]
  value: T[]
  multiple: true
  onChange: (t: T[], e: any) => void
}

export interface AaSelectSimple<T extends string | number = string> extends AaSelectBase<T> {
  defaultValue?: T
  value?: T
  multiple?: false
  onChange: (t: T, e: any) => void
}

export type AaSelectProps<T extends string | number = string> = AaSelectSimple<T> | AaSelectMultiple<T>

const style = makeSx({
  item: {
    py: 0,
    minHeight: '38px !important',
  }
})

/** @deprecated*/
export const AaSelect = <T extends string | number>({
  defaultValue,
  value,
  multiple,
  showUndefinedOption,
  label,
  id,
  onChange,
  sx,
  ...props
}: AaSelectProps<T>) => {
  const {m} = useI18n()
  const [innerValue, setInnerValue] = useState<undefined | T | T[]>(multiple ? [] : undefined)
  const IGNORED_VALUE_FOR_SELECT_ALL_ITEM = 'IGNORED_VALUE'

  const options = useMemo(() => {
    const _options = props.options ?? []
    if (typeof _options[0] === 'string') {
      return props.options.map(_ => ({value: _, children: _})) as Option<T>[]
    }
    return _options as Option<T>[]
  }, [props.options])

  useEffect(() => {
    if (innerValue !== undefined)
      onChange(innerValue === '' ? undefined : innerValue as any, {})
  }, [innerValue])

  const isMultiple = multiple && Array.isArray(innerValue)

  const onSelectAll = (e: any) => {
    if (isMultiple) {
      if (options.length === innerValue.length)
        setInnerValue([])
      else {
        setInnerValue(_ => options.map(_ => _.value))
      }
    }
  }

  return (
    <FormControl size="small" sx={{width: '100%', ...sx}}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Select
        // endAdornment={
        //   // <InputAdornment position="start">
        //     <CircularProgress size={20}/>
        //   // </InputAdornment>
        // }
        disabled={props.disabled}
        label={label}
        size="small"
        margin="dense"
        id={id}
        value={value}
        defaultValue={defaultValue ?? (multiple ? [] : '')}
        multiple={multiple}
        // renderValue={_ => {
        //   console.log('https://ee.humanitarianresponse.info/x/5on180Ku', _)
        //   return JSON.stringify(_)
        onChange={e => {
          const value = e.target.value
          if (![value].flat().includes(IGNORED_VALUE_FOR_SELECT_ALL_ITEM as any)) {
            setInnerValue(value as any)
          }
        }}
        input={
          <OutlinedInput
            label={label}
            // endAdornment={
            //   <CircularProgress size={24} color="secondary"/>
          />
        }
        {...props}
      >
        {isMultiple && options.length > 5 && (
          <MenuItem dense value={IGNORED_VALUE_FOR_SELECT_ALL_ITEM} onClick={onSelectAll} divider sx={{
            py: 0,
            fontWeight: t => t.typography.fontWeightBold,
          }}>
            <Checkbox size="small" checked={innerValue.length === options.length} sx={{
              paddingTop: `8px !important`,
              paddingBottom: `8px !important`,
            }}/>
            {m.selectAll}
          </MenuItem>
        )}
        {showUndefinedOption && (
          <MenuItem dense value={null as any} sx={style.item}/>
        )}
        {options.map((option, i) => (
          <MenuItem dense key={option.key ?? option.value} value={option.value} sx={style.item}>
            {isMultiple && (
              <Checkbox size="small" checked={innerValue.includes(option.value)} sx={{
                paddingTop: `8px !important`,
                paddingBottom: `8px !important`,
              }}/>
            )}
            {option.children}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
