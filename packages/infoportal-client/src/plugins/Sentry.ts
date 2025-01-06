// import * as Sentry from '@sentry/react'
// import {AppConfig} from '@/conf/AppConfig'
//
// export const initSentry = (appConf: AppConfig) => {
//   if (!appConf.sentry.dsn) return
//   Sentry.init({
//     dsn: appConf.sentry.dsn,
//     integrations: [
//       new Sentry.BrowserTracing({
//         tracePropagationTargets: ['localhost', appConf.baseURL],
//       }),
//       new Sentry.Replay(),
//     ],
//     tracesSampleRate: 1.0,
//     replaysSessionSampleRate: 0.1,
//     replaysOnErrorSampleRate: 1.0,
//   })
// }
