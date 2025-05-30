import type {FC} from 'react'
import type {DefaultTooltipContentProps} from 'recharts'
import {Paper, Typography} from '@mui/material'

import {useI18n} from '@/core/i18n'

const CustomAvgHHSizeTooltip: FC<DefaultTooltipContentProps<string | number, string>> = ({payload, label}) => {
  const {m} = useI18n()

  if (!payload || !payload.length) return null

  const data = payload[0].payload

  return (
    <Paper sx={{padding: 1}}>
      <Typography fontWeight="bold">{label}</Typography>
      <Typography fontSize="small">
        Average household size:{' '}
        <Typography component="span" fontWeight={500}>
          {data[m.avgHHSize]}
        </Typography>
      </Typography>
      <Typography fontSize="small">
        {`${m.households}: `}
        <Typography component="span" fontWeight={500}>
          {data[m.households]}
        </Typography>
      </Typography>
    </Paper>
  )
}

export {CustomAvgHHSizeTooltip}
