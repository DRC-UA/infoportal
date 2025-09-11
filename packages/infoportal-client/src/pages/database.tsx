import {ProtectRoute} from '@/core/Session/SessionContext'
import {Database} from '@/features/Database/Database'

const DashboardProtectionHouseholdSurvey = () => {
  return (
    <ProtectRoute>
      <Database />
    </ProtectRoute>
  )
}

export default DashboardProtectionHouseholdSurvey
