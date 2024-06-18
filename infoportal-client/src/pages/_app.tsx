import React, {useEffect, useMemo, useState} from 'react'
import type {AppProps} from 'next/app'
import {Provide} from '@/shared/Provide'
import {Box, CssBaseline, Icon, ThemeProvider} from '@mui/material'
import {I18nProvider, useI18n} from '@/core/i18n'
import {ToastProvider, Txt} from 'mui-extension'
import {ApiSdk} from '@/core/sdk/server/ApiSdk'
import {ApiClient} from '@/core/sdk/server/ApiClient'
import {AppSettingsProvider, useAppSettings} from '@/core/context/ConfigContext'
import {appConfig} from '@/conf/AppConfig'
import {MsalProvider} from '@azure/msal-react'
import {getMsalInstance} from '@/core/msal'
import {DRCLogo} from '@/shared/logo/logo'
import {CacheProvider, EmotionCache} from '@emotion/react'
import {CenteredContent} from '@/shared/CenteredContent'
import {ModalProvider} from '@/shared/Modal/ModalProvider'
import createEmotionCache from '@/core/createEmotionCache'
import Head from 'next/head'
import {LocalizationProvider} from '@mui/x-date-pickers'
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns'
import {LicenseInfo} from '@mui/x-license-pro'
import {useRouter} from 'next/router'
import {KoboSchemaProvider} from '@/features/KoboSchema/KoboSchemaContext'
import {KoboEditAnswersProvider} from '@/core/context/KoboEditAnswersContext'
import {KoboAnswersProvider} from '@/core/context/KoboAnswers'
import {KoboEditTagsProvider} from '@/core/context/KoboEditTagsContext'
import {HashRouter} from 'react-router-dom'

LicenseInfo.setLicenseKey(appConfig.muiProLicenseKey ?? '')

const api = new ApiSdk(new ApiClient({
  baseUrl: appConfig.apiURL,
}))

const clientSideEmotionCache = createEmotionCache()

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

const App = ({
  emotionCache = clientSideEmotionCache,
  ...props
}: MyAppProps) => {

  const router = useRouter()
  useEffect(() => {
    // initSentry(appConfigConfig)
    api.session.track(router.pathname)
  }, [router])

  return (
    <Provide providers={[
      ...process.env.NODE_ENV === 'production' ? [] : [(_: any) => <CacheProvider value={emotionCache} children={_}/>],
      _ => <AppSettingsProvider api={api} children={_}/>,
    ]}>
      <>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width"/>
        </Head>
        <AppWithConfig {...props}/>
      </>
    </Provide>
  )
}

const AppWithConfig = (props: AppProps) => {
  const settings = useAppSettings()
  const msal = useMemo(() => getMsalInstance(settings.conf), [settings.conf])
  const [isServer, setIsServer] = useState(true)
  useEffect(() => {
    setIsServer(false)
  }, [])
  return (
    <Provide providers={[
      // _ => <StyledEngineProvider injectFirst children={_}/>,
      _ => <LocalizationProvider children={_} dateAdapter={AdapterDateFns}/>,
      _ => <ToastProvider children={_}/>,
      _ => <ThemeProvider theme={settings.theme.theme} children={_}/>,
      _ => <CssBaseline children={_}/>,
      _ => <I18nProvider children={_}/>,
      _ => <MsalProvider children={_} instance={msal}/>,
      ...!isServer ? [(_: any) => <HashRouter children={_}/>] : [],
      _ => <KoboSchemaProvider children={_}/>,
      _ => <KoboAnswersProvider children={_}/>,
      _ => <KoboEditAnswersProvider children={_}/>,
      _ => <KoboEditTagsProvider children={_}/>,
      _ => <ModalProvider children={_}/>,
    ]}>
      <AppWithBaseContext {...props}/>
    </Provide>
  )
}

const AppWithBaseContext = ({Component, pageProps}: AppProps) => {
  const settings = useAppSettings()
  const {m} = useI18n()
  if (settings.conf.appOff) {
    return (
      <CenteredContent>
        <Box sx={{
          border: t => `1px solid ${t.palette.divider}`,
          padding: 4,
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <DRCLogo sx={{display: 'block', mb: 2}}/>
          <Txt size="title" block>{m.title}</Txt>
          <Txt sx={{mb: 4}} size="big" color="hint" block>{m.appInMaintenance}</Txt>
          <Icon sx={{fontSize: '90px !important', color: t => t.palette.text.disabled}}>
            engineering
          </Icon>
          <Box>
          </Box>
        </Box>
      </CenteredContent>
    )
  }
  return (
    <Component {...pageProps} />
  )
}

export default App
