import {createContext, useContext} from 'react'

import {useCommonSpacesData} from '@/features/Shelter/CommonSpaces/Data/useCommonSpacesData'

type Ctx = ReturnType<typeof useCommonSpacesData>
const Context = createContext({} as Ctx)

export const CommonSpacesProvider: React.FC<React.PropsWithChildren> = ({children}) => {
  const value = useCommonSpacesData()
  return <Context.Provider value={value}>{children}</Context.Provider>
}

export const useCommonSpacesContext = () => useContext(Context)
