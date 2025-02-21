import React from 'react'
import {ProtectRoute} from '@/core/Session/SessionContext'
import {Victim} from '@/features/Victim/Victim'

const HdpPage = () => {
  return (
    <ProtectRoute>
      <Victim />
    </ProtectRoute>
  )
}

export default HdpPage
