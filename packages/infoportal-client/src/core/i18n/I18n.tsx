import {createContext, useContext, useEffect, useMemo, useState, type ReactNode} from 'react'
import {Obj} from '@axanc/ts-utils'
import {LocalizationProvider} from '@mui/x-date-pickers-pro'
import {AdapterDateFns} from '@mui/x-date-pickers-pro/AdapterDateFnsV3'
import {enUS, uk as ukUA} from 'date-fns/locale'

import {
  en,
  uk,
  dateFromNow,
  formatDate,
  formatDateTime,
  formatDuration,
  formatLargeNumber,
  formatTime,
} from './localization'

export interface I18nContextProps {
  currentLang: AppLang
  setLang: (_: AppLang) => void
  m: (typeof en)['messages']
  availableLangs: AppLang[]
  formatLargeNumber: typeof formatLargeNumber
  formatDuration: typeof formatDuration
  formatDate: typeof formatDate
  dateFromNow: typeof dateFromNow
  formatTime: typeof formatTime
  formatDateTime: typeof formatDateTime
}

export const appLangs = {
  uk,
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

  const {messages: m, adapterLocale} = useMemo(() => {
    switch (lang) {
      case 'uk':
        return {...uk, adapterLocale: ukUA}
      default:
        return {...en, adapterLocale: enUS}
    }
  }, [lang])

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={adapterLocale}>
      <I18nContext.Provider
        value={{
          currentLang: lang,
          setLang,
          availableLangs: Obj.keys(appLangs),
          m,
          dateFromNow,
          formatDate: (date) => formatDate(date, lang),
          formatDateTime,
          formatDuration,
          formatLargeNumber,
          formatTime,
        }}
      >
        {children}
      </I18nContext.Provider>
    </LocalizationProvider>
  )
}
