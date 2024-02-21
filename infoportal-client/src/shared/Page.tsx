import * as React from 'react'
import {ReactNode} from 'react'
import {Box, BoxProps, LinearProgress, Skeleton} from '@mui/material'
import {Page as MxPage, Txt} from 'mui-extension'

export interface PageProps extends BoxProps {
  width?: number | 'xs' | 'md' | 'lg' | 'full'
  animated?: boolean
  className?: any
  style?: object
  loading?: boolean
  children: ReactNode
  disableAnimation?: boolean
}

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

export const Page = ({
  loading,
  children,
  sx,
  disableAnimation,
  ...props
}: PageProps) => {
  const width = typeof props.width === 'string' ? ({
    xs: 780,
    md: 1000,
    lg: 1240,
    full: 3000,
  })[props.width] : props.width

  return (
    <>
      {loading && (
        <LinearProgress/>
      )}
      <MxPage
        {...props}
        width={width}
        animated={!disableAnimation}
        sx={{
          ...sx, my: 1, px: 1, ...disableAnimation && {transform: 'none',}
        }}
      >
        {children}
      </MxPage>
    </>
  )
}
