import {Box, Collapse, useTheme} from '@mui/material'
import {ReactNode} from 'react'
import {Txt} from 'mui-extension'
import {IpIconBtn} from '@/shared/IconBtn'
import {usePersistentState} from '@/shared/hook/usePersistantState'
import {styleUtils} from '@/core/theme'

export const SidebarSubSection = ({
  id,
  title,
  children,
  dense,
  keepOpen,
  defaultOpen,
}: {
  id?: string
  keepOpen?: boolean
  defaultOpen?: boolean
  dense?: boolean
  title: ReactNode
  children: ReactNode
}) => {
  const t = useTheme()
  const [open, setOpen] = usePersistentState(defaultOpen, {storageKey: 'sidebar-section-' + id + title})
  const margin = 1 / (dense ? 4 : 2)
  return (
    <Box sx={{
      my: margin,
      py: margin,
      borderRadius: t.shape.borderRadius + 'px',
      background: styleUtils(t).color.toolbar,
    }}>
      <Box sx={{pl: keepOpen ? 1 : .5, mb: 0, display: 'flex', alignItems: 'center'}}>
        <Txt bold color="hint" sx={{fontSize: '.825em', flex: 1}}>{title}</Txt>
        {!keepOpen && (
          <IpIconBtn onClick={() => setOpen(_ => !_)} size="small" sx={{mr: 1}}>
            {open ? 'expand_less' : 'expand_more'}
          </IpIconBtn>
        )}
      </Box>
      <Collapse in={keepOpen || open}>
        {children}
      </Collapse>
    </Box>
  )
}