import React from 'react'
import {SessionProvider} from '@/core/Session/SessionContext'
import {ActivityInfo} from '@/features/ActivityInfo/ActivityInfo'

const _ = () => {
  return (
    <SessionProvider>
      <ActivityInfo/>
    </SessionProvider>
  )
}

export default _