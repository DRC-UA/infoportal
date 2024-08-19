import * as React from 'react'
import {ReactNode, useEffect, useState} from 'react'
import {Box, BoxProps, LinearProgress, Skeleton} from '@mui/material'
import {Txt} from '@/shared'

export interface PageProps extends BoxProps {
  width?: number | 'xs' | 'md' | 'lg' | 'full'
  animated?: boolean
  className?: any
  style?: object
  loading?: boolean
  children: ReactNode
  disableAnimation?: boolean
}

let timeout: NodeJS.Timeout | undefined

export const PageHeader = ({
  children,
  action,
  ...props
}: {
  action?: ReactNode
} & BoxProps) => {
  return (
    <Box {...props} sx={{display: 'flex', alignItems: 'center',}}>
      <PageTitle>{children}</PageTitle>
      {action && (
        <Box sx={{marginLeft: 'auto'}}>{action}</Box>
      )}
    </Box>
  )
}
export const PageTitle = ({
  action,
  children,
  subTitle,
  sx,
  logo,
  ...props
}: BoxProps & {
  logo?: ReactNode,
  subTitle?: ReactNode,
  action?: ReactNode
}) => {
  return (
    <Box sx={{display: 'flex', mt: 0, mb: 2, alignItems: 'center', ...sx}}>
      {logo && (
        <Box sx={{mr: 2}}>{logo}</Box>
      )}
      <Box>
        <Box component="h2" sx={{m: 0, p: 0}}>{children}</Box>
        <Txt size="big" color="hint">{subTitle}</Txt>
      </Box>
      {action && (
        <Box sx={{ml: 'auto'}}>{action}</Box>
      )}
    </Box>
  )
}

export const PagePlaceholder = (props: Pick<PageProps, 'width'>) => {
  const width = typeof props.width === 'string' ? ({
    xs: 780,
    md: 1000,
    lg: 1200,
    full: 3000,
  })[props.width] : props.width
  return (
    <Page {...props}>
      <Skeleton variant="rounded" sx={{width: '100%', height: 'calc(100vh - 100px)'}}/>
    </Page>
  )
}


export const Page = ({children, sx, loading, animated = true, ...props}: PageProps) => {
  const [appeared, setAppeared] = useState(false)
  const width = typeof props.width === 'string' ? ({
    xs: 780,
    md: 1000,
    lg: 1240,
    full: 3000,
  })[props.width] : props.width

  useEffect(() => {
    if (animated) timeout = setTimeout(() => setAppeared(true))
    return () => clearTimeout(timeout)
  }, [])

  return (
    <>
      {loading && (
        <LinearProgress/>
      )}
      <Box
        {...props}
        sx={{
          transition: t => t.transitions.create('all', {easing: 'ease', duration: 160}),
          margin: 'auto',
          opacity: 0,
          transform: 'scale(.90)',
          maxWidth: 932,
          mt: 1,
          width: '100%',
          ...(!animated || appeared) && {
            opacity: 1,
            transform: 'scale(1)',
          },
          ...width && {maxWidth: width},
          ...sx,
        }}>
        {children}
      </Box>
    </>
  )
}
