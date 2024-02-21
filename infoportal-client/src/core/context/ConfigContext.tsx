import React, {Dispatch, ReactNode, SetStateAction, useContext} from 'react'
import {ApiSdk} from '../sdk/server/ApiSdk'
import {appConfig, AppConfig} from '../../conf/AppConfig'
import {usePersistentState} from '@/shared/hook/usePersistantState'

export interface ConfigContext {
  api: ApiSdk
  conf: AppConfig
  darkTheme: boolean
  setDarkTheme: Dispatch<SetStateAction<boolean>>
}

export const _ConfigContext = React.createContext({} as ConfigContext)

export const useAppSettings = () => useContext(_ConfigContext)

export const AppSettingsProvider = ({
  api,
  children,
}: {
  api: ApiSdk,
  children: ReactNode
}) => {
  const [darkTheme, setDarkTheme] = usePersistentState(false, {storageKey: 'dark-theme'})
  return (
    <_ConfigContext.Provider value={{
      api,
      conf: appConfig,
      darkTheme,
      setDarkTheme
    }}>
      {children}
    </_ConfigContext.Provider>
  )
}
