import {Box, Grid} from '@mui/material'
import {DRCLogo} from '@/shared/logo/logo'
import {Txt} from 'mui-extension'
import {appFeatures} from '@/features/appFeatureId'
import {FeatureLogo} from '@/features/FeatureLogo'
import {Page} from '@/shared/Page'
import React from 'react'
import {useI18n} from '@/core/i18n'
import {useSession} from '@/core/Session/SessionContext'
import {Layout} from '@/shared/Layout'
import {useLayoutContext} from '@/shared/Layout/LayoutContext'
import {AppHeader} from '@/shared/Layout/Header/AppHeader'
import {fnSwitch} from '@alexandreannic/ts-utils'

export const Home = () => {
  return (
    <Layout header={<AppHeader/>}>
      <_Home/>
    </Layout>
  )
}

const _Home = () => {
  const {m} = useI18n()
  const {session, accesses} = useSession()
  const layoutCtx = useLayoutContext()
  return (
    <Page>
      <Box sx={{textAlign: 'center'}}>
        <DRCLogo/>
        <Txt sx={{textAlign: 'center'}} size="title" block>{m.title}</Txt>
        <Txt sx={{textAlign: 'center', mb: 4}} size="big" color="hint" block>{m.subTitle}</Txt>
      </Box>
      <Grid container spacing={1}>
        {appFeatures.filter(_ => !_.showIf || _.showIf(session, accesses)).map(feature => (
          <Grid
            key={feature.id} item md={3} sm={3} xs={4}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FeatureLogo feature={feature} iconSize={fnSwitch(layoutCtx.currentBreakpointDown, {
              xl: 85,
              lg: 80,
              md: 75,
              sm: 70,
              xs: 65,
            })}/>
          </Grid>
        ))}
      </Grid>
    </Page>
  )
}
