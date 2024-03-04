import React from 'react'
import {MetaDashboard} from '@/features/MetaDashboard/MetaDashboard'
import {SessionProvider} from '@/core/Session/SessionContext'

export default () => {
  return (
    <SessionProvider>
      <MetaDashboard/>
    </SessionProvider>
  )
}
