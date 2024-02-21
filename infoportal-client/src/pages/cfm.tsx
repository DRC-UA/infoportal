import React from 'react'
import {SessionProvider} from '@/core/Session/SessionContext'
import {Cfm} from '@/features/Cfm/Cfm'

const CfmPage = () => {

  return (
    <SessionProvider>
      <Cfm/>
    </SessionProvider>
  )
}

export default CfmPage