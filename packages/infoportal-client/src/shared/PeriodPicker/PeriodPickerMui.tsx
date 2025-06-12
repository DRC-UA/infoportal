import {DateRange, DateRangePicker, PickersShortcutsItem, SingleInputDateRangeField} from '@mui/x-date-pickers-pro'
import {endOfMonth, format, startOfMonth, subMonths} from 'date-fns'

import type {PeriodPickerProps} from '@/shared/PeriodPicker/PeriodPickerNative'

const shortcutsItems: PickersShortcutsItem<DateRange<Date>>[] = (() => {
  const today = new Date()
  const limit = 7
  return Array.from({length: limit}, (_, i) => {
    const currentDate = subMonths(today, limit - 1 - i)
    return {
      label: format(currentDate, 'MMMM yyyy'),
      getValue: () => [startOfMonth(currentDate), endOfMonth(currentDate)],
    }
  })
})()

const toDateRange = (_?: [Date | undefined, Date | undefined]): DateRange<Date> => {
  const [start, end] = _ ?? []
  return [start ?? null, end ?? null]
}

const revertNulls = (_?: [Date | null, Date | null]): [Date | undefined, Date | undefined] => {
  const [start, end] = _ ?? []
  return [start ?? undefined, end ?? undefined]
}

type DateChangeHandler = (range: DateRange<Date>) => void

export const PeriodPickerMui = ({
  min,
  max,
  defaultValue,
  value,
  onChange,
  label,
  fullWidth = true,
  sx,
}: PeriodPickerProps) => {
  const handleChange: DateChangeHandler = (range: DateRange<Date>) => onChange(revertNulls(range))

  return (
    <DateRangePicker
      minDate={min}
      maxDate={max}
      localeText={{start: label?.[0], end: label?.[1]}}
      sx={{mt: -0.5, ...sx}}
      defaultValue={toDateRange(defaultValue)}
      value={toDateRange(value)}
      onChange={handleChange}
      slotProps={{
        field: {
          clearable: true,
        },
        textField: {
          size: 'small',
          variant: 'standard',
          fullWidth,
          sx: {mb: 0.5},
        },
        shortcuts: {items: shortcutsItems},
        openPickerButton: {
          size: 'small',
          sx: {mr: -1, mb: 0.5},
        },
        clearButton: {
          size: 'small',
          sx: {mb: 0.5},
        },
      }}
      slots={{field: SingleInputDateRangeField}}
    />
  )
}
