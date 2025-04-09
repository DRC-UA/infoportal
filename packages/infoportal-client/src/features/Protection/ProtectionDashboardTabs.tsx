import React, {useState} from 'react'
import {Tabs, Tab, Box} from '@mui/material'
import {ProtectionDashboardPsea} from '@/features/Protection/DashboardPsea/ProtectionDashboardPsea'
import {ProtectionDashboardSafeguard} from '@/features/Protection/DashboardSafe/ProtectionDashboardSafeguard'
import {useI18n} from '@/core/i18n'
import {Page} from '@/shared/Page'

export const ProtectionDashboardTabs = () => {
  const [tab, setTab] = useState(0)
  const {m} = useI18n()

  return (
    <Page>
      <Box sx={{borderBottom: 1, borderColor: 'divider', mb: 2}}>
        <Tabs value={tab} onChange={(_, newValue) => setTab(newValue)}>
          <Tab label={m._protection.pseaDashboard} />
          <Tab label={m._protection.safeDashboard} />
        </Tabs>
      </Box>
      <Box hidden={tab !== 0}>
        <ProtectionDashboardPsea />
      </Box>
      <Box hidden={tab !== 1}>
        <ProtectionDashboardSafeguard />
      </Box>
    </Page>
  )
}
