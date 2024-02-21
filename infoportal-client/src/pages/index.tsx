import React from 'react'
import {Home} from '@/features/Home/Home'
import {SessionProvider} from '@/core/Session/SessionContext'

const Index = () => {
  return (
    <SessionProvider>
      <Home/>
    </SessionProvider>
  )
}

export default Index