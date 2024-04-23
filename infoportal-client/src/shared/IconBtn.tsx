import {Box, Icon, Tooltip} from '@mui/material'
import {IconBtnProps} from 'mui-extension/lib/IconBtn/IconBtn'
import React, {ReactNode} from 'react'
import {IconBtn} from 'mui-extension'

export interface IpIconBtnProps extends Omit<IconBtnProps, 'tooltip' | 'children'> {
  tooltip?: ReactNode
  children: string
  href?: string
  target?: '_blank'
}

export const IpIconBtn = ({
  tooltip,
  children,
  size,
  ...props
}: IpIconBtnProps) => {
  const content = (
    <IconBtn {...props} size={size}>
      <Icon fontSize={size/* === 'small' ? 'small' : size*/}>{children}</Icon>
    </IconBtn>
  )
  return tooltip ? (
    <Tooltip title={tooltip}>
      {props.disabled ? <Box component="span">{content}</Box> : content}
    </Tooltip>
  ) : content
}