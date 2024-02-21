import React from 'react'
import {SessionProvider} from '@/core/Session/SessionContext'
import {Meal} from '@/features/Meal/Meal'

export default () => {
  return (
    <SessionProvider>
      <Meal/>
    </SessionProvider>
  )
}
