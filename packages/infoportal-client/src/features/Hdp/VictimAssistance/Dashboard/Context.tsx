import {ReactNode, useContext, useEffect, createContext} from 'react'

import {useVictimAssistanceData, type UseVictimAssistanceData} from './hooks'

export type VictimContext = UseVictimAssistanceData

const Context = createContext({} as VictimContext)

export const useVictimAssistanceContext = () => useContext<VictimContext>(Context)

export const VictimAssistanceProvider = ({children}: {children: ReactNode}) => {
  const data = useVictimAssistanceData()

  useEffect(() => {
    data.fetcherAnswer.fetch({})
    data.fetcherPeriod.fetch({})
  }, [])

  return <Context.Provider value={data}>{children}</Context.Provider>
}
