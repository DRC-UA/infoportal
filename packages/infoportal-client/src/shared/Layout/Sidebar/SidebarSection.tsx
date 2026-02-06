import {Box, Collapse} from '@mui/material'
import {useLayoutEffect, useState, type ReactNode} from 'react'
import {Txt} from '@/shared/Txt'
import {IpIconBtn} from '@/shared/IconBtn'

export const SidebarSection = ({
  title,
  children,
  dense,
  defaultOpen = true,
  forceCollapsed,
}: {
  defaultOpen?: boolean
  dense?: boolean
  title: ReactNode
  children: ReactNode
  forceCollapsed?: boolean | null
}) => {
  const [open, setOpen] = useState(defaultOpen)
  const margin = 1 / (dense ? 4 : 2)

  useLayoutEffect(() => {
    if (forceCollapsed !== undefined && forceCollapsed !== null) {
      setOpen(!forceCollapsed)
    }
  }, [forceCollapsed])

  return (
    <Box
      sx={{
        mt: margin,
        pb: margin,
        '&:not(:last-of-type)': {
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        },
      }}
    >
      <Box sx={{pl: 0.5, mb: 0, display: 'flex', alignItems: 'center'}}>
        <IpIconBtn onClick={() => setOpen((_) => !_)} size="small" sx={{mr: 1}}>
          {open ? 'expand_less' : 'expand_more'}
        </IpIconBtn>
        <Txt uppercase bold color="disabled" sx={{fontSize: '.825em', flex: 1}}>
          {title}
        </Txt>
      </Box>
      <Collapse in={open}>{children}</Collapse>
    </Box>
  )
}
