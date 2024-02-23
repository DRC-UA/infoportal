import React from 'react'
import {SessionProvider} from '@/core/Session/SessionContext'
import {Sandbox} from '@/features/Sandbox'

const Page = () => {

  return (
    <SessionProvider>
      <Sandbox/>
    </SessionProvider>
  )
}

export default Page