import React from 'react'
import {SessionProvider} from '@/core/Session/SessionContext'

const HdpPage = () => {
  return (
    <SessionProvider>
      <div>In dev</div>
    </SessionProvider>
  )
}

export default HdpPage