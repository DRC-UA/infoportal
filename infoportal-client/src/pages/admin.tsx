import React from 'react'
import {SessionProvider} from '@/core/Session/SessionContext'
import {Admin} from '@/features/Admin/Admin'

const Adminpage = () => {
  return (
    <SessionProvider>
      <Admin/>
    </SessionProvider>
  )
}

export default Adminpage