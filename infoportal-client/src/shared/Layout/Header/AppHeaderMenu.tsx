import {IpIconBtn, IpIconBtnProps} from '@/shared/IconBtn'
import React, {ReactNode} from 'react'
import {useSession} from '@/core/Session/SessionContext'
import {Box, Icon, Popover} from '@mui/material'
import {useI18n} from '@/core/i18n'
import {Txt} from 'mui-extension'
import {IpBtn} from '@/shared/Btn'
import {alpha} from '@mui/material/styles'

const Row = ({
  icon,
  children,
}: {
  icon: string
  children: ReactNode
}) => {
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
    }}>
      <Icon sx={{mr: 1, color: t => t.palette.text.secondary}} fontSize="small">{icon}</Icon>
      <Txt block color="hint">{children}</Txt>
    </Box>
  )
}

export const AppHeaderMenu = ({sx, ...props}: Partial<IpIconBtnProps>) => {
  const session = useSession()
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const open = (!!anchorEl)
  const {m} = useI18n()
  if (!session.session) {
    return <></>
  }
  return (
    <>
      <IpIconBtn
        children="person"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{
          '&:hover': {
            background: t => alpha(t.palette.primary.main, .6),
          },
          background: t => t.palette.primary.main,
          color: t => t.palette.primary.contrastText,
          ...sx,
        }}
        {...props}
      />
      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        onClose={() => setAnchorEl(null)}
        open={open}
      >
        <Box>
          <Box sx={{p: 2}}>
            <Txt bold block size="big">{session.session.name}</Txt>
            <Row icon="email">{session.session.email}</Row>
            <Row icon="badge">{session.session.drcJob}</Row>
            <Row icon="location_on">{session.session.drcOffice}</Row>
          </Box>
          <Box sx={{px: 2}}>
            <IpBtn icon="logout" variant="outlined" onClick={session.logout} sx={{mb: 2}}>{m.logout}</IpBtn>
          </Box>
        </Box>
      </Popover>
    </>
  )
}