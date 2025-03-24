import type {FC} from 'react'
import {Outlet} from 'react-router-dom'
import Typography from '@mui/material/Typography'

import {useI18n} from '@/core/i18n'
import {Page} from '@/shared/Page'

const Docs: FC = () => {
  const {m} = useI18n()

  return (
    <Page width="lg">
      <Typography variant="h1" mt={4} mb={4}>
        {m.docsTitle}
      </Typography>
      <Outlet />
    </Page>
  )
}

export {Docs}
