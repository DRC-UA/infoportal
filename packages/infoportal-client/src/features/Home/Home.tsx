import {match, Obj, seq} from '@axanc/ts-utils'
import {Box, BoxProps, darken, Grid, useTheme} from '@mui/material'

import {DRCLogo} from '@/shared/logo/logo'
import {Txt} from '@/shared/Txt'
import {appFeatures} from '@/features/appFeatureId'
import {FeatureLogo} from '@/features/FeatureLogo'
import {Page} from '@/shared/Page'
import {useI18n} from '@/core/i18n'
import {useSession} from '@/core/Session/SessionContext'
import {Layout} from '@/shared/Layout'
import {useLayoutContext} from '@/shared/Layout/LayoutContext'
import {AppHeader} from '@/shared/Layout/Header/AppHeader'
import {styleUtils} from '@/core/theme'

export const Home = () => {
  return (
    <Layout header={<AppHeader />}>
      <_Home />
    </Layout>
  )
}

export const HomeTitle = ({sx, ...props}: BoxProps) => {
  const {m} = useI18n()
  return (
    <Box {...props} sx={{textAlign: 'center', ...sx}}>
      <DRCLogo />
      <Txt sx={{textAlign: 'center'}} size="title" block>
        {m.title}
      </Txt>
      <Txt sx={{textAlign: 'center'}} size="big" color="hint" block>
        {m.subTitle}
      </Txt>
    </Box>
  )
}
const _Home = () => {
  const {session, accesses} = useSession()
  const layoutCtx = useLayoutContext()
  const t = useTheme()

  return (
    <Page>
      <Box>
        <HomeTitle sx={{mt: 2, mb: 2}} />
      </Box>
      {new Obj(seq(appFeatures).groupBy((_) => _.category!))
        .mapValues((features) => features.filter((_) => !_.showIf || _.showIf(session, accesses)))
        .filter((_, features) => features.length > 0)
        .entries()
        .map(([category, features]) => (
          <Box
            key={category}
            sx={{
              p: 1,
              background: darken(styleUtils(t).color.toolbar, 0.02),
              mb: 1,
              borderRadius: 2,
            }}
          >
            <Txt bold uppercase color="hint" sx={{fontWeight: '600', ml: 1}}>
              {category}
            </Txt>
            <Grid container spacing={1}>
              {features!.map((feature) => (
                <Grid
                  key={feature.id}
                  size={{md: 2, sm: 3, xs: 4}}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <FeatureLogo
                    feature={feature}
                    iconSize={match(layoutCtx.currentBreakpointDown)
                      .cases({
                        xl: 70,
                        lg: 65,
                        md: 60,
                        sm: 55,
                        xs: 50,
                      })
                      .default(60)}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
    </Page>
  )
}
