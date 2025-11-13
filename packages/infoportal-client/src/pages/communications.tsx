import {ProtectRoute} from '@/core/Session/SessionContext'
import {Communications} from '@/features/Communications'

export default () => (
  <ProtectRoute>
    <Communications />
  </ProtectRoute>
)
