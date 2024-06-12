import React, {Dispatch, ReactNode, SetStateAction, useContext, useEffect, useMemo, useState} from 'react'
import {ApiSdk} from '../sdk/server/ApiSdk'
import {appConfig, AppConfig} from '../../conf/AppConfig'
import {usePersistentState} from '@/shared/hook/usePersistantState'

export interface ConfigContext {
  api: ApiSdk
  conf: AppConfig
  isDarkTheme: boolean
  lightTheme: LightTheme
  setLightTheme: Dispatch<SetStateAction<LightTheme>>
}

export const _ConfigContext = React.createContext({} as ConfigContext)

export const useAppSettings = () => useContext(_ConfigContext)

type LightTheme = 'auto' | 'dark' | 'light'

declare const window: any

const isSystemDarkTheme = () => typeof window !== "undefined" && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

export const AppSettingsProvider = ({
  api,
  children,
}: {
  api: ApiSdk,
  children: ReactNode
}) => {
  const [lightTheme, setLightTheme] = usePersistentState<LightTheme>('auto', {storageKey: 'dark-theme2'})
  const [lightThemeSystem, setLightThemeSystem] = useState(isSystemDarkTheme() ? 'dark' : 'light')

  useEffect(() => {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event: any) => {
      setLightThemeSystem(event.matches ? 'dark' : 'light')
    })
  }, [])

  const isDarkTheme = useMemo(() => {
    return lightTheme === 'dark' || (lightTheme === 'auto' && lightThemeSystem === 'dark')
  }, [lightTheme, lightThemeSystem])

  return (
    <_ConfigContext.Provider value={{
      api,
      isDarkTheme,
      conf: appConfig,
      lightTheme,
      setLightTheme,
    }}>
      {children}
    </_ConfigContext.Provider>
  )
}
