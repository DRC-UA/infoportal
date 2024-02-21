import {Box, Collapse} from '@mui/material'
import {ReactNode} from 'react'
import {Txt} from 'mui-extension'
import {IpIconBtn} from '@/shared/IconBtn'
import {usePersistentState} from '@/shared/hook/usePersistantState'

export const SidebarSection = ({
  title,
  children,
  dense,
}: {
  dense?: boolean
  title: ReactNode
  children: ReactNode
}) => {
  const [open, setOpen] = usePersistentState(true, {storageKey: 'sidebar-section-' + title})
  const margin = 1 / (dense ? 4 : 2)
  return (
    <Box sx={{
      mt: margin,
      pb: margin,
      '&:not(:last-of-type)': {
        borderBottom: t => `1px solid ${t.palette.divider}`,
      }
    }}>
      <Box sx={{pl: .5, mb: 0}}>
        <IpIconBtn onClick={() => setOpen(_ => !_)} size="small" sx={{mr: 1}}>
          {open ? 'expand_less' : 'expand_more'}
        </IpIconBtn>
        <Txt uppercase bold color="disabled" sx={{fontSize: '.825em'}}>{title}</Txt>
      </Box>
      <Collapse in={open}>
        {children}
      </Collapse>
    </Box>
  )
}