import {DateRangePicker} from '@mui/x-date-pickers-pro/DateRangePicker'
import React, {useMemo} from 'react'
import {useSlotProps} from '@mui/base'
import {DateRange, MultiInputFieldSlotTextFieldProps, PickersShortcutsItem} from '@mui/x-date-pickers-pro'
import {unstable_useMultiInputDateRangeField as useMultiInputDateRangeField} from '@mui/x-date-pickers-pro/MultiInputDateRangeField'
import {Box, TextField} from '@mui/material'
import {mapFor} from '@alexandreannic/ts-utils'
import {endOfMonth, format, startOfMonth, subMonths} from 'date-fns'
import {PeriodPickerProps} from '@/shared/PeriodPicker/PeriodPickerNative'

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
  const shortcutsItems: PickersShortcutsItem<DateRange<Date>>[] = useMemo(() => {
    const today = new Date()
    const limit = 7
    const months: PickersShortcutsItem<DateRange<Date>>[] = mapFor(limit, i => {
      const currentDate = subMonths(today, limit - 1 - i)
      return ({
        label: format(currentDate, 'MMMM yyyy'),
        getValue: () => [startOfMonth(currentDate), endOfMonth(currentDate)],
      })
    })
    return [
      ...months,
      {label: 'Reset', getValue: () => [null, null]},
    ]
  }, [])

  return (
    <DateRangePicker
      minDate={min}
      maxDate={max}
      localeText={{start: label?.[0], end: label?.[1]}}
      sx={{...sx, mb: -.25, mt: -.5}}
      defaultValue={defaultValue}
      value={(value && (value[0] || value[1])) ? value : undefined}
      onChange={onChange as any}
      slotProps={{
        shortcuts: {
          items: shortcutsItems,
        },
      }}
      slots={{field: BrowserMultiInputDateRangeField}}
      // slots={{field: SingleInputDateRangeField}}
      // slotProps={{textField: {InputProps: {endAdornment: <Icon>today</Icon>}}}}
    />
  )
}

const BrowserMultiInputDateRangeField = React.forwardRef((props: any, ref: React.Ref<HTMLDivElement>) => {
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

  const {inputRef: startInputRef, ...startTextFieldProps} = useSlotProps({
    elementType: null as any,
    externalSlotProps: slotProps?.textField,
    ownerState: {...props, position: 'start'},
  }) as MultiInputFieldSlotTextFieldProps

  const {inputRef: endInputRef, ...endTextFieldProps} = useSlotProps({
    elementType: null as any,
    externalSlotProps: slotProps?.textField,
    ownerState: {...props, position: 'end'},
  }) as MultiInputFieldSlotTextFieldProps

  const {
    startDate: {ref: startRef, ...startDateProps},
    endDate: {ref: endRef, ...endDateProps},
  } = useMultiInputDateRangeField<Date, MultiInputFieldSlotTextFieldProps>({
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
    startInputRef,
    endInputRef,
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
        fullWidth={true}
        size="small"
        InputLabelProps={{shrink: true}}
        {...startDateProps}
        sx={{minWidth: 115, marginRight: '-1px'}}
        InputProps={{
          ...startDateProps.InputProps,
          sx: _ => ({
            borderBottomRightRadius: 0,
            borderTopRightRadius: 0,
          }),
        }}
        inputRef={startRef}
      />
      <TextField
        type="text"
        margin="dense"
        variant="outlined"
        fullWidth={true}
        size="small"
        sx={{minWidth: 115}}
        InputLabelProps={{shrink: true}}
        {...endDateProps}
        InputProps={{
          ...endDateProps.InputProps,
          sx: _ => ({
            borderBottomLeftRadius: 0,
            borderTopLeftRadius: 0,
          }),
        }}
        inputRef={endRef}
      />
    </Box>
  )
},) as any
