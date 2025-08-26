import {createContext, useContext, useEffect, useMemo, useState, type ReactNode} from 'react'
import {Obj} from '@axanc/ts-utils'

import {en, ua} from './localization'

export interface I18nContextProps {
  currentLang: AppLang
  setLang: (_: AppLang) => void
  m: (typeof en)['messages']
  availableLangs: AppLang[]
  formatLargeNumber: (typeof en)['formatLargeNumber']
  formatDuration: (typeof en)['formatDuration']
  formatDate: (typeof en)['formatDate']
  dateFromNow: (typeof en)['dateFromNow']
  formatTime: (typeof en)['formatTime']
  formatDateTime: (typeof en)['formatDateTime']
}

export const appLangs = {
  ua,
  en,
}

export type AppLang = keyof typeof appLangs

const I18nContext = createContext<I18nContextProps>({} as any)

export const useI18n = () => useContext<I18nContextProps>(I18nContext as any)

export const withI18n = (Component: any) => (props: any) => (
  <I18nContext.Consumer>{(other: any) => <Component {...props} {...other} />}</I18nContext.Consumer>
)

export const I18nProvider = ({children, defaultLang = 'en'}: {readonly defaultLang?: AppLang; children: ReactNode}) => {
  const [lang, setLang] = useState<AppLang>(defaultLang)

  useEffect(() => {
    setLang(defaultLang)
  }, [defaultLang])

  const {messages: m, ...others}: typeof en = useMemo(() => {
    switch (lang) {
      case 'ua':
        return ua as any
      default:
        return en
    }
  }, [lang])

  return (
    <I18nContext.Provider
      value={{
        currentLang: lang,
        setLang,
        availableLangs: Obj.keys(appLangs),
        m,
        ...others,
      }}
    >
      {children}
    </I18nContext.Provider>
  )
}
