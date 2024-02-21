import React from 'react'
import {Partnership} from '@/features/Partnership/Partnership'
import {SessionProvider} from '@/core/Session/SessionContext'

const PartnershipPage = () => {

  return (
    <SessionProvider>
      <Partnership/>
    </SessionProvider>
  )
}

export default PartnershipPage