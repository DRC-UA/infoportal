import {IpSelectOption, IpSelectSingle, IpSelectSingleNullableProps} from '@/shared/Select/SelectSingle'
import {fnSwitch, Obj} from '@alexandreannic/ts-utils'
import React, {ReactNode, useMemo} from 'react'
import {StateStatus, CashStatus} from '@infoportal-common'
import {Box, Icon, useTheme} from '@mui/material'
import {useI18n} from '@/core/i18n'
import {KoboValidation} from '@/core/sdk/server/kobo/Kobo'

export enum ShelterCashStatus {
  Selected = 'Selected',
  Rejected = 'Rejected',
  FirstPayment = 'FirstPayment',
  Paid = 'Paid',
}

export const shelterCashStatusType: Record<ShelterCashStatus, StateStatus> = {
  Selected: 'warning',
  Rejected: 'error',
  FirstPayment: 'info',
  Paid: 'success',
}

export const cashStatusType: Record<CashStatus, StateStatus> = {
  Paid: 'success',
  Rejected: 'error',
  Referred: 'disabled',
  Pending: 'warning',
  Selected: 'info'
}

export const koboValidationStatus: Record<KoboValidation, StateStatus> = {
  [KoboValidation.Approved]: 'success',
  [KoboValidation.Pending]: 'warning',
  [KoboValidation.Rejected]: 'error',
}

const commonProps = {borderRadius: '20px', px: 1}

const OptionLabelType = ({
  type,
  children,
}: {
  type: StateStatus
  children: ReactNode
}) => {
  const t = useTheme()
  return fnSwitch(type, {
    'disabled': <Box sx={{...commonProps, background: t.palette.divider, color: t.palette.text.secondary}}>{children}</Box>,
    'error': <Box sx={{...commonProps, background: t.palette.error.main, color: t.palette.error.contrastText}}>{children}</Box>,
    'warning': <Box sx={{...commonProps, background: t.palette.warning.main, color: t.palette.warning.contrastText}}>{children}</Box>,
    'info': <Box sx={{...commonProps, background: t.palette.info.main, color: t.palette.info.contrastText}}>{children}</Box>,
    'success': <Box sx={{...commonProps, background: t.palette.success.main, color: t.palette.success.contrastText}}>{children}</Box>,
  })
}
const OptionLabelTypeCompact = ({
  type,
}: {
  type: StateStatus
}) => {
  const t = useTheme()
  return fnSwitch(type, {
    'disabled': <Icon sx={{color: t.palette.text.disabled}} title={type}>remove_circle</Icon>,
    'error': <Icon sx={{color: t.palette.error.main}} title={type}>error</Icon>,
    'warning': <Icon sx={{color: t.palette.warning.main}} title={type}>schedule</Icon>,
    'info': <Icon sx={{color: t.palette.info.main}} title={type}>info</Icon>,
    'success': <Icon sx={{color: t.palette.success.main}} title={type}>check_circle</Icon>,
  })
}


type SelectStatusProps<T extends string> = Omit<IpSelectSingleNullableProps<T>, 'hideNullOption' | 'options'> & {
  status: Record<T, string>,
  labels: Record<T, StateStatus>
  compact?: boolean
}
export const SelectStatus = <T extends string>({
  status,
  placeholder,
  compact,
  labels,
  ...props
}: SelectStatusProps<T>) => {
  const {m} = useI18n()
  const options: IpSelectOption<any>[] = useMemo(() => {
    return Obj.keys(status).map(_ => ({
      value: _,
      children: compact
        ? <OptionLabelTypeCompact type={labels[_]}/>
        : <OptionLabelType type={labels[_]}>{_ as string}</OptionLabelType>
    }))
  }, [labels, status])
  return (
    <IpSelectSingle placeholder={placeholder ?? m.status} hideNullOption={false} options={options} {...props}/>
  )
}

export const SelectCashStatus = (props: Omit<SelectStatusProps<CashStatus>, 'status' | 'labels'>) => {
  return <SelectStatus status={CashStatus} labels={cashStatusType} {...props}/>
}

export const SelectShelterCashStatus = (props: Omit<SelectStatusProps<ShelterCashStatus>, 'status' | 'labels'>) => {
  return <SelectStatus status={ShelterCashStatus} labels={shelterCashStatusType} {...props}/>
}

export const SelectValidationStatus = (props: Omit<SelectStatusProps<KoboValidation>, 'status' | 'labels'>) => {
  return <SelectStatus status={KoboValidation} labels={koboValidationStatus}{...props}/>
}
