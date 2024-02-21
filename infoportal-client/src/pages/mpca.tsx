import {Mpca} from '@/features/Mpca/Mpca'
import React from 'react'
import {SessionProvider} from '@/core/Session/SessionContext'

const MpcaPage = () => {

  return (
    <SessionProvider>
      <Mpca/>
    </SessionProvider>
  )
}

export default MpcaPage