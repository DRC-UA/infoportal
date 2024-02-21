import {FormControl, FormControlProps, InputLabel, MenuItem, OutlinedInput, Select, SxProps, Theme} from '@mui/material'
import React, {ReactNode, useMemo} from 'react'
import {useI18n} from '@/core/i18n'
import {makeSx} from '@/core/theme'

export type IpSelectOption<T extends string | number = string> = {
  value: T,
  children: ReactNode,
  key?: string
}

type TType = string | number

export type IpSelectSingleBaseProps<T extends TType = string> = Pick<FormControlProps, 'placeholder' | 'disabled' | 'id'> & {
  label?: ReactNode
  options: IpSelectOption<T>[] | string[]
  sx?: SxProps<Theme>
  defaultValue?: T
  value?: T | null
  multiple?: false
  hideNullOption?: boolean
}

export type IpSelectSingleNullableProps<T extends TType = string> = IpSelectSingleBaseProps<T> & {
  hideNullOption?: false
  onChange: (t: T | null, e: any) => void
}

export type IpSelectSingleNonNullableProps<T extends TType = string> = IpSelectSingleBaseProps<T> & {
  hideNullOption: true
  onChange: (t: T, e: any) => void
}

export type IpSelectSingleProps<T extends TType = string> = IpSelectSingleNonNullableProps<T> | IpSelectSingleNullableProps<T>

const style = makeSx({
  item: {
    py: 0,
    minHeight: '38px !important',
  }
})

const IGNORED_VALUE_EMPTY = ''

export const IpSelectSingle = <T extends TType>({
  defaultValue,
  hideNullOption,
  label,
  id,
  onChange,
  sx,
  value,
  placeholder,
  ...props
}: IpSelectSingleProps<T>) => {
  const {m} = useI18n()
  // const [innerValue, setInnerValue] = useState<T | null>(null)

  const options = useMemo(() => {
    const _options = props.options ?? []
    if (typeof _options[0] === 'string') {
      return props.options.map(_ => ({value: _, children: _})) as IpSelectOption<T>[]
    }
    return _options as IpSelectOption<T>[]
  }, [props.options])

  return (
    <FormControl size="small" sx={{width: '100%', ...sx}}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Select
        label={label}
        size="small"
        margin="dense"
        placeholder={placeholder}
        id={id}
        value={value ?? defaultValue ?? IGNORED_VALUE_EMPTY}
        defaultValue={defaultValue}
        multiple={false}
        onChange={e => {
          const value = e.target.value as T
          if (value === IGNORED_VALUE_EMPTY)
            onChange(null as any, e)
          onChange(value, e)
          // setInnerValue(value)
        }}
        input={
          <OutlinedInput
            label={label}
            placeholder={placeholder}
          />
        }
        {...props}
      >
        {!hideNullOption && (
          <MenuItem dense value={null as any} sx={style.item}/>
        )}
        {options.map((option, i) => (
          <MenuItem dense key={option.key ?? option.value} value={option.value} sx={style.item}>
            {option.children}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
