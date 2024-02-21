import React from 'react'
import {SessionProvider} from '@/core/Session/SessionContext'
import {Shelter} from '@/features/Shelter/Shelter'

const ShelterPage = () => {

  return (
    <SessionProvider>
      <Shelter/>
    </SessionProvider>
  )
}

export default ShelterPage