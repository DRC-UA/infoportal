import React, {useMemo} from 'react'
import {DateRange, DateRangePicker, PickersShortcutsItem, SingleInputDateRangeField} from '@mui/x-date-pickers-pro'
import {unstable_useMultiInputDateRangeField as useMultiInputDateRangeField} from '@mui/x-date-pickers-pro/MultiInputDateRangeField'
import {Box, TextField} from '@mui/material'
import {endOfMonth, format, startOfMonth, subMonths} from 'date-fns'
import {PeriodPickerProps} from '@/shared/PeriodPicker/PeriodPickerNative'

const shortcutsItems: PickersShortcutsItem<DateRange<Date>>[] = (() => {
  const today = new Date()
  const limit = 7
  return Array.from({length: limit}, (_, i) => {
    const currentDate = subMonths(today, limit - 1 - i)
    return {
      label: format(currentDate, 'MMMM yyyy'),
      getValue: () => [startOfMonth(currentDate), endOfMonth(currentDate)],
    }
    // }).concat({label: 'Reset', getValue: () => [null, null]})
  })
})()

const toDateRange = (_?: [Date | undefined, Date | undefined]): DateRange<Date> => {
  const [start, end] = _ ?? []
  return [start ?? null, end ?? null]
}

export const PeriodPickerMui = ({
  min,
  max,
  defaultValue,
  value,
  onChange,
  label,
  fullWidth,
  sx,
  ...props
}: PeriodPickerProps) => {
  return (
    <DateRangePicker
      minDate={min}
      maxDate={max}
      localeText={{start: label?.[0], end: label?.[1]}}
      sx={{mb: -0.25, mt: -0.5, ...sx}}
      defaultValue={toDateRange(defaultValue)}
      value={toDateRange(value)}
      onChange={onChange as any}
      slotProps={{
        textField: {
          size: 'small',
          variant: 'outlined',
          margin: 'dense',
          sx: {minWidth: 218, ...sx},
          fullWidth: true,
        },
        shortcuts: {items: shortcutsItems},
      }}
      slots={{field: SingleInputDateRangeField}}
      // slots={{field: () => <SingleInputDateRangeField margin="dense" variant="outlined" sx={{minWidth: 115}} fullWidth/>}}
    />
  )
}

const BrowserMultiInputDateRangeField = React.forwardRef<HTMLDivElement, any>((props, ref) => {
  const {
    slotProps,
    value,
    defaultValue,
    format,
    onChange,
    readOnly,
    disabled,
    onError,
    fullWidth,
    shouldDisableDate,
    minDate,
    maxDate,
    disableFuture,
    disablePast,
    sx,
    selectedSections,
    onSelectedSectionsChange,
    className,
  } = props

  const {inputRef: startInputRef, ...startTextFieldProps} = slotProps?.textField || {}

  const {inputRef: endInputRef, ...endTextFieldProps} = slotProps?.textField || {}

  const {
    startDate: {sectionListRef: startRef, ...startDateProps},
    endDate: {sectionListRef: endRef, ...endDateProps},
  } = useMultiInputDateRangeField({
    // } = useMultiInputDateRangeField<Date, MultiInputFieldSlotTextFieldProps>({
    sharedProps: {
      value,
      defaultValue,
      format,
      onChange,
      readOnly,
      disabled,
      onError,
      shouldDisableDate,
      minDate,
      maxDate,
      disableFuture,
      disablePast,
      selectedSections,
      onSelectedSectionsChange,
    },
    startTextFieldProps,
    endTextFieldProps,
    unstableStartFieldRef: startInputRef,
    unstableEndFieldRef: endInputRef,
  })

  return (
    <Box
      ref={ref}
      className={className}
      sx={{
        display: 'flex',
        alignItems: 'center',
        ...(fullWidth && {width: '100%'}),
        ...sx,
      }}
    >
      <TextField
        type="text"
        margin="dense"
        variant="outlined"
        fullWidth
        size="small"
        InputLabelProps={{shrink: true}}
        {...startDateProps}
        sx={{minWidth: 115, marginRight: '-1px'}}
        InputProps={{
          ...startDateProps.InputProps,
          sx: {borderBottomRightRadius: 0, borderTopRightRadius: 0},
        }}
        inputRef={startRef}
      />
      <TextField
        type="text"
        margin="dense"
        variant="outlined"
        fullWidth
        size="small"
        sx={{minWidth: 115}}
        InputLabelProps={{shrink: true}}
        {...endDateProps}
        InputProps={{
          ...endDateProps.InputProps,
          sx: {borderBottomLeftRadius: 0, borderTopLeftRadius: 0},
        }}
        inputRef={endRef}
      />
    </Box>
  )
})

BrowserMultiInputDateRangeField.displayName = 'BrowserMultiInputDateRangeField'
