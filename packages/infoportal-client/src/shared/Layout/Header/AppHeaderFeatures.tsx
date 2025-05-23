import {IpIconBtn, IpIconBtnProps} from '@/shared/IconBtn'
import React from 'react'
import {useSession} from '@/core/Session/SessionContext'
import {Box, Popover, useTheme} from '@mui/material'
import {appFeatures} from '@/features/appFeatureId'
import {FeatureLogo} from '@/features/FeatureLogo'
import {Obj, seq} from '@axanc/ts-utils'
import {Txt} from '@/shared/Txt'

const iconSize = 94

export const AppHeaderFeatures = (props: Omit<IpIconBtnProps, 'children'>) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const {session, accesses} = useSession()
  const open = !!anchorEl
  const t = useTheme()
  return (
    <>
      <IpIconBtn children="apps" onClick={(e) => setAnchorEl(e.currentTarget)} {...props} />
      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        onClose={() => setAnchorEl(null)}
        open={open}
      >
        <Box sx={{width: (iconSize + 8) * 4 + 16, p: 0.5, pb: 0}}>
          {new Obj(seq(appFeatures).groupBy((_) => _.category!))
            .mapValues((features) => features.filter((_) => !_.showIf || _.showIf(session, accesses)))
            .filter((_, features) => features.length > 0)
            .entries()
            .map(([category, features]) => (
              <Box
                key={category}
                sx={{
                  p: 1,
                  background: t.palette.background.default,
                  mb: 0.5,
                  borderRadius: t.shape.borderRadius - 2 + 'px',
                }}
              >
                <Txt bold uppercase size="small" color="hint" sx={{fontWeight: '600', ml: 1}}>
                  {category}
                </Txt>
                <Box>
                  {features!.map((feature) => (
                    <FeatureLogo
                      key={feature.id}
                      fontSize="small"
                      feature={feature}
                      iconSize={44}
                      sx={{
                        display: 'inline-block',
                        height: iconSize,
                        width: iconSize,
                        maxWidth: iconSize,
                        margin: 0.25,
                        py: 1,
                        px: 0.5,
                      }}
                    />
                  ))}
                </Box>
              </Box>
            ))}
        </Box>

        {/*<Box sx={{width: (iconSize + 8) * 3, p: .5}}>*/}
        {/*  {features.map(_ =>*/}
        {/*    <FeatureLogo iconSize={40} key={_.id} feature={_} sx={{*/}
        {/*      display: 'inline-block',*/}
        {/*      height: iconSize,*/}
        {/*      width: iconSize,*/}
        {/*      maxWidth: iconSize,*/}
        {/*      margin: .25,*/}
        {/*      py: 1,*/}
        {/*      px: .5,*/}
        {/*    }}/>*/}
        {/*  )}*/}
        {/*</Box>*/}
      </Popover>
    </>
  )
}
