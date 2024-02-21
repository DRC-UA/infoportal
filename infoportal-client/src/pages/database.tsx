import React from 'react'
import {Database} from '@/features/Database/Database'
import {SessionProvider} from '@/core/Session/SessionContext'

const DashboardProtectionHouseholdSurvey = () => {
  return (
    <SessionProvider>
      <Database/>
    </SessionProvider>
  )
}

export default DashboardProtectionHouseholdSurvey