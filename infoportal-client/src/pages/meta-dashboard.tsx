import React from 'react'
import {SessionProvider} from '@/core/Session/SessionContext'
import {Meta} from '@/features/Meta/Meta'

export default () => {
  return (
    <SessionProvider>
      <Meta/>
    </SessionProvider>
  )
}
