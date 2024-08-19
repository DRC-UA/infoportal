import React, {ReactNode, useContext, useEffect} from 'react'
import {UseSafetyIncidentData, useSafetyIncidentData} from '@/features/Safety/IncidentsDashboard/useSafetyIncidentData'

export type SafetyIncidentContext = UseSafetyIncidentData

const Context = React.createContext({} as SafetyIncidentContext)

export const useSafetyIncidentContext = () => useContext<SafetyIncidentContext>(Context)

export const SafetyIncidentProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const data = useSafetyIncidentData()

  useEffect(() => {
    data.fetcherAnswer.fetch({})
    data.fetcherPeriod.fetch({})
  }, [])

  return (
    <Context.Provider value={data}>
      {children}
    </Context.Provider>
  )
}
