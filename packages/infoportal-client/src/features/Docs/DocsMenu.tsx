import type {FC} from 'react'
import {NavLink} from 'react-router-dom'
import Stack from '@mui/system/Stack'

import {useI18n} from '@/core/i18n'

const docRoutes = {
  basePath: '/docs',
  siteMap: {
    aiReporting: '/reporting-to-activity-info',
  },
}

const DocsMenu: FC = () => {
  const path = (page: string) => docRoutes.basePath + page
  const {m} = useI18n()

  return (
    <Stack>
      <NavLink to={path(docRoutes.siteMap.aiReporting)}>Reporting to Activity Info</NavLink>
    </Stack>
  )
}

export {DocsMenu}
