import React from 'react'
import {SessionProvider} from '@/core/Session/SessionContext'
import {Sandbox} from '@/features/Sandbox'
import {MetaDashboardProvider} from '@/features/Meta/MetaContext'

const Page = () => {

  return (
    <SessionProvider>
      <MetaDashboardProvider>
        <Sandbox/>
      </MetaDashboardProvider>
    </SessionProvider>
  )
}

export default Page