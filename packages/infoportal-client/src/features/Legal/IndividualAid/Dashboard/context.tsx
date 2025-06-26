import {createContext, useContext, useEffect, type ReactNode} from 'react'

import {useIndividualAidData} from './hooks'

type IndividualAidContext = UseIndividualAidData

const Context = createContext({} as IndividualAidContext)

const useIndividualAidContext = () => useContext<IndividualAidContext>(Context)

const IndividualAidProvider = ({children}: {children: ReactNode}) => {
  const individualAidContext = useIndividualAidData()

  useEffect(() => {
    individualAidContext.fetcherAnswer.fetch({})
  }, [])

  return <Context.Provider value={individualAidContext}>{children}</Context.Provider>
}

type UseIndividualAidData = ReturnType<typeof useIndividualAidData>

export {IndividualAidProvider, useIndividualAidContext, type UseIndividualAidData, type IndividualAidContext}
