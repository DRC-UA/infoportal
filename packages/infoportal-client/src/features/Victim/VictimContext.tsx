import React, {ReactNode, useContext, useEffect} from 'react'
import {useVictimData, UseVictimData} from '@/features/Victim/useVictimData'

export type VictimContext = UseVictimData

const Context = React.createContext({} as VictimContext)

export const useVictimContext = () => useContext<VictimContext>(Context)

export const VictimProvider = ({children}: {children: ReactNode}) => {
  const data = useVictimData()

  useEffect(() => {
    data.fetcherAnswer.fetch({})
    data.fetcherPeriod.fetch({})
  }, [])

  return <Context.Provider value={data}>{children}</Context.Provider>
}
