import type {FC} from 'react'

import {ProtectRoute} from '@/core/Session/SessionContext'
import {Hdp} from '@/features/Hdp'

const HdpPage: FC = () => {
  return (
    <ProtectRoute>
      <Hdp />
    </ProtectRoute>
  )
}

export default HdpPage
