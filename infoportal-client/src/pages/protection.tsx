import React from 'react'
import {SessionProvider} from '@/core/Session/SessionContext'
import {Protection} from '@/features/Protection/Protection'

const Page = () => {
  return (
    <SessionProvider>
      <Protection/>
    </SessionProvider>
  )
}

export default Page