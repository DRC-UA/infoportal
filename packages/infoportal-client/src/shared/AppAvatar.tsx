import {Box, BoxProps, Icon, styled} from '@mui/material'

import {useAppSettings} from '@/core/context/ConfigContext'

const BoxWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'size' && prop !== 'url',
})<{size: number; url?: string}>(({theme, size, url}) => ({
  height: size,
  width: size,
  minWidth: size,
  backgroundSize: 'cover',
  borderRadius: 5000,
  backgroundImage: `url(${url})`,
  backgroundColor: theme.palette.grey['400'],
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

export const AppAvatar = ({
  email,
  size,
  ...props
  // hideTooltip,
}: {
  email?: string
  size: number
  // hideTooltip?: boolean
} & BoxProps) => {
  const {api} = useAppSettings()

  return (
    <BoxWrapper title={email} url={email ? api.user.avatarUrl(email) : undefined} size={size} {...props}>
      {!email && <Icon sx={{color: 'white', fontSize: size - 2}}>person</Icon>}
    </BoxWrapper>
  )
}
