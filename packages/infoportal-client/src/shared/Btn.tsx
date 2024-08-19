import * as React from 'react'
import {forwardRef, ReactNode} from 'react'
import {Box, Button, CircularProgress, Icon, Tooltip} from '@mui/material'
import {ButtonProps} from '@mui/material/Button'
import {makeStyles} from 'tss-react/mui'

const useStyles = makeStyles()((t) => ({
  icon: {
    height: '22px !important',
    lineHeight: '22px !important',
    fontSize: '22px !important',
    marginRight: t.spacing(1),
  },
  iconEnd: {
    mr: 0,
    ml: 1,
  }
}))

export interface IpBtnProps extends ButtonProps {
  tooltip?: ReactNode
  loading?: boolean
  icon?: string
  iconAfter?: string
  before?: ReactNode
  iconSx?: ButtonProps['sx']
  target?: '_blank'
}

export const IpBtn = forwardRef(({
  tooltip,
  loading,
  children,
  disabled,
  before,
  icon,
  iconAfter,
  color,
  iconSx,
  ...props
}: IpBtnProps, ref: any) => {
  const {classes, cx} = useStyles()
  const btn = (
    <Button
      {...props}
      color={color}
      disabled={disabled || loading}
      ref={ref}
    >
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        ...loading && {
          visibility: 'hidden',
        }
      }}>
        {before}
        {icon && (
          <Icon fontSize={props.size} className={classes.icon} sx={iconSx}>
            {icon}
          </Icon>
        )}
        {children}
        {iconAfter && (
          <Icon
            className={cx(classes.iconEnd, classes.icon)}
            fontSize={props.size}
            sx={iconSx}
          >
            {iconAfter}
          </Icon>
        )}
      </Box>
      {loading && <CircularProgress size={24} sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        mt: -1.5,
        ml: -1.5,
      }}/>}
    </Button>
  )
  return tooltip ? (
    <Tooltip title={tooltip}>{btn}</Tooltip>
  ) : btn
})
