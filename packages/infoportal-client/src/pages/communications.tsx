import type {FC} from 'react'

import {ProtectRoute} from '@/core/Session/SessionContext'
import {Communications} from '@/features/Communications'

const CommunicationsPage: FC = () => {
  return (
    <ProtectRoute>
      <Communications />
    </ProtectRoute>
  )
}

export default CommunicationsPage
