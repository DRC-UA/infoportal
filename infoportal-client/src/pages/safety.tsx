import React from 'react'
import {Safety} from '@/features/Safety/Safety'
import {SessionProvider} from '@/core/Session/SessionContext'

const SafetyPage = () => {
  return (
    <SessionProvider>
      <Safety/>
    </SessionProvider>
  )
}

export default SafetyPage