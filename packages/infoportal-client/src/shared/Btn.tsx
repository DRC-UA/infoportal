import {forwardRef, type ReactNode} from 'react'
import {alpha, Button, CircularProgress, Icon, styled, Tooltip, type ButtonProps} from '@mui/material'

export type IpBtnVariant = ButtonProps['variant'] | 'light' | 'input'

export interface IpBtnProps extends Omit<ButtonProps, 'variant'> {
  variant?: IpBtnVariant
  tooltip?: ReactNode
  loading?: boolean
  icon?: string
  /** @deprecated use native endIcon props */
  iconAfter?: string
  before?: ReactNode
  iconSx?: ButtonProps['sx']
  target?: '_blank'
}

const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'loading' && prop !== 'ipVariant',
})<{ipVariant?: IpBtnVariant}>(({theme, ipVariant}) => ({
  fontWeight: 500,
  textTransform: 'inherit',

  ...(ipVariant === 'light' && {
    background: alpha(theme.palette.primary.main, 0.12),
    '&:hover': {
      background: alpha(theme.palette.primary.main, 0.2),
    },
  }),

  ...(ipVariant === 'input' && {
    borderRadius: theme.shape.borderRadius + 'px',
    background: 'rgba(100,100,220,.04)',
    border: '1px solid rgba(0, 0, 0, 0.11)',
    '&:hover': {
      background: alpha(theme.palette.primary.main, 0.2),
    },
  }),
}))

export interface IpBtnProps extends Omit<ButtonProps, 'variant'> {
  variant?: IpBtnVariant
  tooltip?: ReactNode
  loading?: boolean
  icon?: string
  iconAfter?: string
  before?: ReactNode
  iconSx?: ButtonProps['sx']
  target?: '_blank'
}

export const IpBtn = forwardRef(
  (
    {
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
    }: IpBtnProps,
    ref: any,
  ) => {
    const btn = (
      <StyledButton
        {...props}
        ipVariant={variant} // Custom prop to avoid conflict with native variant
        variant={variant === 'light' || variant === 'input' ? undefined : (variant as any)}
        color={color}
        disabled={disabled || loading}
        ref={ref}
        className={className}
        sx={{
          position: 'relative',
          ...props.sx,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            visibility: loading ? 'hidden' : 'visible',
          }}
        >
          {before}
          {icon && (
            <Icon
              fontSize={props.size}
              sx={{
                height: '22px !important',
                lineHeight: '22px !important',
                fontSize: '22px !important',
                mr: 1,
                ...iconSx,
              }}
            >
              {icon}
            </Icon>
          )}
          {children}
          {iconAfter && (
            <Icon
              sx={{
                height: '22px !important',
                lineHeight: '22px !important',
                fontSize: '22px !important',
                ml: 1,
                ...iconSx,
              }}
              fontSize={props.size}
            >
              {iconAfter}
            </Icon>
          )}
        </div>
        {loading && (
          <CircularProgress
            size={24}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              mt: '-12px',
              ml: '-12px',
            }}
          />
        )}
      </StyledButton>
    )

    return tooltip ? <Tooltip title={tooltip}>{btn}</Tooltip> : btn
  },
)
