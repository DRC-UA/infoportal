import {TableIconBtn} from '@/features/Mpca/MpcaData/TableIcon'
import {useDatatableContext} from '@/shared/Datatable/context/DatatableContext'
import {DatatableColumn} from '@/shared/Datatable/util/datatableType'
import {alpha, Box, Icon, Popover, useTheme} from '@mui/material'
import {useState} from 'react'
import {IpBtn} from '@/shared'
import {useI18n} from '@/core/i18n'
import {useAppSettings} from '@/core/context/ConfigContext'

export const DatatableHeadCopyIds = ({
  column
}: {
  column: DatatableColumn.InnerProps<any>
}) => {
  const {formatLargeNumber} = useI18n()
  const t = useTheme()
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [copied, setCopied] = useState(0)
  const {theme} = useAppSettings()
  const data = useDatatableContext().data

  const copy = async (data: any[] = []) => {
    await navigator.clipboard.writeText(data.join('\n'))
    const target = data.length
    const speed = 300
    let start: number | null = null

    const increment = (timestamp: number) => {
      if (start === null) start = timestamp
      const progress = timestamp - start
      const newValue = Math.min(Math.floor((progress / speed) * target), target)
      setCopied(newValue)

      if (newValue < target) {
        requestAnimationFrame(increment)
      }
    }
    requestAnimationFrame(increment)
  }

  return (
    <>
      <TableIconBtn disabled={!data.filteredData || data.filteredData.length === 0} onClick={(e) => {
        const {currentTarget} = e
        copy(data.filteredSortedAndPaginatedData?.data.map(_ => column.render(_).value))
        setAnchorEl(currentTarget)
      }}>content_copy</TableIconBtn>
      <Popover
        slotProps={{
          paper: {
            sx: {
              py: 1.5,
              px: 2,
              backdropFilter: 'blur(4px)',
              backgroundColor: alpha(theme.adaptiveLighten(t.palette.success.light, .7), .7),
            },
          },
        }}
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box sx={{display: 'flex', alignItems: 'center'}}>
          <Icon sx={{mr: 1}} color="success">check_circle</Icon>
          <span style={{color: t.palette.success.main, fontWeight: t.typography.fontWeightBold}}>
            <b>{formatLargeNumber(copied)}</b> copied!
          </span>
          <IpBtn
            disabled={copied === data.data?.length}
            variant="outlined"
            icon="content_copy"
            color="success"
            sx={{
              ml: 2,
            }}
            onClick={() => {
              copy(data.data?.map(_ => column.render(_).value))
            }}
          >
            Copy All {formatLargeNumber(data.filteredData?.length)}
          </IpBtn>
        </Box>
      </Popover>
    </>
  )
}
