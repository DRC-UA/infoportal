import React from 'react'
import {ProtectRoute} from '@/core/Session/SessionContext'
import {EcrecRoot} from '@/features/Ecrec/Ecrec'

const EcrecPage = () => {
  return (
    <ProtectRoute>
      <EcrecRoot/>
    </ProtectRoute>
  )
}

export default EcrecPage