import {
  FormControl,
  InputLabel,
  InputProps as StandardInputProps,
  OutlinedInput,
  OutlinedInputProps,
  TextFieldProps,
} from '@mui/material'
import {fromZonedTime} from 'date-fns-tz'
import React, {useEffect, useState} from 'react'

export interface DatepickerProps
  extends Omit<OutlinedInputProps, 'onChange' | 'value'>,
    Pick<TextFieldProps, 'InputProps' | 'InputLabelProps'> {
  min?: Date
  max?: Date
  value?: Date
  onChange: (_: Date | undefined) => void
  label?: string
  InputProps?: Partial<StandardInputProps>
  fullWidth?: boolean
  withTime?: boolean
  timeOfDay?: // when picking a date, the Date returned will be at 00:00:000 in the user timezone
  | 'startOfDay'
    // with this, it will be at 23:59:999 in the user timezone
    | 'endOfDay'
}

const formatToInputValue = (date: Date, withTime: boolean): string => {
  const pad = (n: number) => n.toString().padStart(2, '0')
  const yyyy = date.getFullYear()
  const mm = pad(date.getMonth() + 1)
  const dd = pad(date.getDate())
  const hh = pad(date.getHours())
  const mi = pad(date.getMinutes())
  return withTime ? `${yyyy}-${mm}-${dd}T${hh}:${mi}` : `${yyyy}-${mm}-${dd}`
}

const parseFromInputValue = (str: string, withTime: boolean): Date => {
  return new Date(str)
}

const safeFormatDate = (date?: Date, withTime?: boolean): string | undefined => {
  try {
    return date ? formatToInputValue(date, withTime ?? false) : undefined
  } catch (e) {
    return undefined
  }
}

const date2string = (_: Date) => {
  return [
    _.getFullYear(),
    (_.getMonth() + 1).toString().padStart(2, '0'),
    _.getDate().toString().padStart(2, '0'),
  ].join('-')
}

const safeDate2string = (_?: string | Date) => {
  if (_ === undefined || _ === null) return
  try {
    return date2string(_ as any)
  } catch (e) {
    try {
      return date2string(new Date(_))
    } catch (e) {}
  }
}

export const IpDatepicker = ({
  value,
  min,
  max,
  onChange,
  label,
  fullWidth,
  InputLabelProps,
  id,
  withTime = false,
  timeOfDay = 'startOfDay',
  sx,
  ...props
}: DatepickerProps) => {
  const [displayedValue, setDisplayedValue] = useState<string | undefined>()

  useEffect(() => {
    setDisplayedValue(safeFormatDate(value, withTime))
  }, [value, withTime])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const str = e.target.value
    if (str) {
      try {
        const parsed = parseFromInputValue(str, withTime)
        onChange(parsed)
      } catch {
        onChange(undefined)
      }
    } else {
      onChange(undefined)
    }
  }

  return (
    <FormControl size="small" sx={{...sx}}>
      <InputLabel {...InputLabelProps} shrink={true} htmlFor={id}>
        {label}
      </InputLabel>
      <OutlinedInput
        {...props}
        id={id}
        type={withTime ? 'datetime-local' : 'date'}
        inputProps={{
          min: safeFormatDate(min, withTime),
          max: safeFormatDate(max, withTime),
        }}
        margin="dense"
        size="small"
        label={label}
        value={displayedValue ?? ''}
        onChange={handleChange}
        fullWidth={fullWidth}
      />
    </FormControl>
  )
}
