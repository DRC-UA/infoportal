import * as React from 'react'
import {ReactNode, useState} from 'react'
import {Alert, AlertProps} from '@mui/material'
import {usePersistentState} from '@/shared/hook/usePersistantState'

export type IpAlertProps = Omit<AlertProps, 'id'> & {
  hidden?: boolean
  action?: ReactNode
} & ({
  id: string
  deletable: 'transient' | 'permanent'
} | {
  id?: string
  deletable?: undefined
})

export const IpAlert = ({
  content,
  hidden,
  action,
  deletable,
  sx,
  onClose,
  ...props
}: IpAlertProps) => {
  const [isPersistentVisible, setPersistentIsVisible] = usePersistentState<boolean>(true, {storageKey: props.id ?? 'NOT NEEDED'})
  const [isVisible, setIsVisible] = useState<boolean>(true)

  return (
    <Alert {...props} sx={{
      ...sx,
      ...(hidden || !isVisible || (deletable === 'permanent' && !isPersistentVisible)) && {
        minHeight: '0 !important',
        height: '0 !important',
        opacity: '0 !important',
        margin: '0 !important',
      },
    }} onClose={deletable ? ((e) => {
      setIsVisible(false)
      onClose?.(e)
      if (deletable === 'permanent') setPersistentIsVisible(false)
    }) : onClose}/>
  )
}
