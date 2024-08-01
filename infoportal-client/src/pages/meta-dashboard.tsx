import React from 'react'
import {ProtectRoute} from '@/core/Session/SessionContext'
import {Meta} from '@/features/Meta/Meta'

export default () => {
  return (
    <ProtectRoute>
      <Meta/>
    </ProtectRoute>
  )
}
