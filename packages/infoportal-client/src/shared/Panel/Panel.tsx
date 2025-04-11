import {forwardRef, type ReactNode, type ComponentType, type ComponentProps} from 'react'
import {Box, Card, CardProps, LinearProgress} from '@mui/material'
import {PanelHead} from './PanelHead'
import {PanelFeatures} from '@/shared/Panel/PanelFeatures'

type SlotComponents = {
  titleEndAdornment?: ComponentType<any>
}

type SlotProps<S extends SlotComponents> = {
  [K in keyof S]: S[K] extends ComponentType<any> ? ComponentProps<NonNullable<S[K]>> : never
}

export interface PanelProps<S extends SlotComponents = SlotComponents> extends Omit<CardProps, 'title'> {
  loading?: boolean
  hoverable?: boolean
  stretch?: boolean
  elevation?: number
  title?: ReactNode
  expendable?: boolean
  savableAsImg?: boolean
  slots?: S
  slotProps?: SlotProps<S>
}

interface PanelComponent {
  <S extends SlotComponents>(props: PanelProps<S> & {ref?: React.ForwardedRef<HTMLDivElement>}): ReactNode | undefined
}

export const Panel: PanelComponent = forwardRef(
  <S extends SlotComponents>(
    {
      elevation,
      hoverable,
      loading,
      children,
      stretch,
      sx,
      title,
      expendable,
      savableAsImg,
      slots,
      slotProps,
      ...other
    }: PanelProps<S>,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => {
    const TitleEndAdornment = slots?.titleEndAdornment

    return (
      <Card
        ref={ref}
        elevation={elevation}
        sx={{
          position: 'relative',
          background: (t) => t.palette.background.paper,
          borderRadius: (t) => t.shape.borderRadius + 'px',
          mb: 2,
          ...(hoverable && {
            cursor: 'pointer',
            transition: (t) => t.transitions.create('all'),
            '&:hover': {
              transform: 'scale(1.01)',
              boxShadow: (t) => t.shadows[4],
            },
          }),
          ...(stretch && {
            display: 'flex',
            flexDirection: 'column',
            height: (t) => `calc(100% - ${t.spacing(2)})`,
          }),
          ...(elevation &&
            elevation > 0 && {
              border: 'none',
            }),
          '&:hover .panel-actions': {
            display: 'block',
          },
          ...sx,
        }}
        {...other}
      >
        {title && (
          <PanelHead sx={{display: 'flex', flexDirection: 'row'}}>
            <Box sx={{display: 'flex', alignItems: 'center'}}>{title}</Box>
            {TitleEndAdornment && <TitleEndAdornment {...(slotProps?.titleEndAdornment || {})} />}
          </PanelHead>
        )}
        {loading && <LinearProgress sx={{mb: '-4px'}} />}
        {expendable || savableAsImg ? (
          <PanelFeatures expendable={expendable} savableAsImg={savableAsImg}>
            {children}
          </PanelFeatures>
        ) : (
          children
        )}
      </Card>
    )
  },
)
