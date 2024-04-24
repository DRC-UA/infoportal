import {IpSelectOption, IpSelectSingle, IpSelectSingleNullableProps} from '@/shared/Select/SelectSingle'
import {fnSwitch, KeyOf, Obj} from '@alexandreannic/ts-utils'
import React, {ReactNode, useMemo} from 'react'
import {CashForEduStatus, CashForRentStatus, CashStatus, StateStatus} from '@infoportal-common'
import {Box, Icon, useTheme} from '@mui/material'
import {useI18n} from '@/core/i18n'
import {KoboValidation} from '@/core/sdk/server/kobo/Kobo'

export enum ShelterCashStatus {
  Selected = 'Selected',
  Rejected = 'Rejected',
  FirstPayment = 'FirstPayment',
  Paid = 'Paid',
}

export namespace SelectStatusConfig {
  export const enumStatus = {
    ShelterCashStatus: ShelterCashStatus,
    CashStatus: CashStatus,
    KoboValidation: KoboValidation,
    CashForRentStatus: CashForRentStatus,
    CashForEduStatus: CashForEduStatus
  }

  export type EnumStatus = keyof typeof enumStatus

  export const statusType = {
    ShelterCashStatus: {
      Selected: 'warning',
      Rejected: 'error',
      FirstPayment: 'info',
      Paid: 'success',
    } as Record<ShelterCashStatus, StateStatus>,
    CashStatus: {
      Paid: 'success',
      Rejected: 'error',
      Referred: 'disabled',
      Pending: 'warning',
      Selected: 'info'
    } as Record<CashStatus, StateStatus>,
    KoboValidation: {
      [KoboValidation.Approved]: 'success',
      [KoboValidation.Pending]: 'warning',
      [KoboValidation.Rejected]: 'error',
    } as Record<KoboValidation, StateStatus>,
    CashForRentStatus: {
      [CashForRentStatus.FirstPending]: 'warning',
      [CashForRentStatus.FirstPaid]: 'success',
      [CashForRentStatus.FirstRejected]: 'error',
      [CashForRentStatus.SecondPending]: 'warning',
      [CashForRentStatus.SecondPaid]: 'success',
      [CashForRentStatus.SecondRejected]: 'error',
      [CashForRentStatus.Selected]: 'info',
      [CashForRentStatus.Referred]: 'disabled',
    } as Record<CashForRentStatus, StateStatus>,
    CashForEduStatus: {
      [CashForEduStatus.Verified]: 'success',
      [CashForEduStatus.Approved]: 'success',
      [CashForEduStatus.FirstPending]: 'warning',
      [CashForEduStatus.FirstPaid]: 'success',
      [CashForEduStatus.SecondPending]: 'warning',
      [CashForEduStatus.SecondPaid]: 'success',
      [CashForEduStatus.CertificateSubmitted]: 'success',
    } as Record<CashForEduStatus, StateStatus>
  }
}

const commonProps = {borderRadius: '20px', px: 1}

export const OptionLabelType = ({
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
  }, () => undefined)
}

export const OptionLabelTypeCompact = ({
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
  }, () => undefined)
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

export const SelectStatusBy = <
  K extends SelectStatusConfig.EnumStatus,
  V extends typeof SelectStatusConfig.enumStatus[K][KeyOf<typeof SelectStatusConfig.enumStatus[K]>]
>(
// @ts-ignore
  props: Omit<SelectStatusProps<V>, 'status' | 'labels'> & {
    enum: K
  }
) => {
  return (
    // @ts-ignore
    <SelectStatus {...props} labels={SelectStatusConfig.statusType[props.enum]} status={SelectStatusConfig.enumStatus[props.enum]}/>
  )
}

