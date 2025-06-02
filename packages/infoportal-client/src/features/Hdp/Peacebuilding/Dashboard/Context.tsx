import {ReactNode, useContext, useEffect, createContext} from 'react'

import {usePeacebuildingData, type UsePeacebuildingData} from './hooks'

export type PeaceContext = UsePeacebuildingData

const Context = createContext({} as PeaceContext)

export const usePeacebuildingContext = () => useContext<PeaceContext>(Context)

export const PeacebuildingProvider = ({children}: {children: ReactNode}) => {
  const data = usePeacebuildingData()

  useEffect(() => {
    data.fetcherAnswer.fetch({})
    data.fetcherPeriod.fetch({})
  }, [])

  return <Context.Provider value={data}>{children}</Context.Provider>
}