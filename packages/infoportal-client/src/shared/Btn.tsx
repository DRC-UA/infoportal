import * as React from 'react'
import {forwardRef, ReactNode} from 'react'
import {alpha, Button, CircularProgress, Icon, Tooltip} from '@mui/material'
import {ButtonProps} from '@mui/material/Button'
import {makeStyles} from 'tss-react/mui'

const useStyles = makeStyles<{loading?: boolean, light?: boolean}>()((t, {loading, light}) => ({
  icon: {
    height: '22px !important',
    lineHeight: '22px !important',
    fontSize: '22px !important',
    marginRight: t.spacing(1),
  },
  root: {
    ...light && {
      fontWeight: 500,
      background: alpha(t.palette.primary.main, .12),
      textTransform: 'inherit',
      '&:hover': {
        background: alpha(t.palette.primary.main, .2),
      }
    },
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    ...loading && {
      visibility: 'hidden',
    },
  },
  progress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: t.spacing(-1.5),
    marginLeft: t.spacing(-1.5),
  },
  iconEnd: {
    marginRight: 0,
    marginLeft: t.spacing(1),
  }
}))

export interface IpBtnProps extends Omit<ButtonProps, 'variant'> {
  variant?: ButtonProps['variant'] | 'light'
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
  variant,
  iconAfter,
  color,
  className,
  iconSx,
  ...props
}: IpBtnProps, ref: any) => {
  const {classes, cx} = useStyles({loading, light: variant === 'light'})
  const btn = (
    <Button
      {...props}
      variant={variant === 'light' ? undefined : variant}
      color={color}
      disabled={disabled || loading}
      ref={ref}
      className={cx(className, classes.root)}
    >
      <div className={classes.content}>
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
      </div>
      {loading && <CircularProgress size={24} className={classes.progress}/>}
    </Button>
  )
  return tooltip ? (
    <Tooltip title={tooltip}>{btn}</Tooltip>
  ) : btn
})
