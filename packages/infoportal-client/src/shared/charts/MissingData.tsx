import type {FC} from 'react'
import {Box, Icon} from '@mui/material'
import type {SxProps} from '@mui/system'

import {useI18n} from '@/core/i18n'

const MissingData: FC<{sx?: SxProps}> = ({sx, ...props}) => {
  const {m} = useI18n()

  return (
    <Box
      {...props}
      sx={{
        ...sx,
        textAlign: 'center',
        mt: 2,
        color: (t) => t.palette.text.disabled,
      }}
    >
      <Icon sx={{fontSize: '3em !important'}}>block</Icon>
      <Box>{m.noDataAtm}</Box>
    </Box>
  )
}

export {MissingData}
