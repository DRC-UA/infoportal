import {AppFeature} from '@/features/appFeatureId'
import React from 'react'
import {ButtonBase, ButtonBaseProps, Icon, useTheme} from '@mui/material'
import {Txt, TxtProps} from 'mui-extension'
import Link from 'next/link'
import {styleUtils} from '@/core/theme'

export const FeatureLogo = ({
  feature,
  sx,
  iconSize = 80,
  fontSize,
  ...props
}: {
  feature: AppFeature
  iconSize?: number
  fontSize?: TxtProps['fontSize']
} & ButtonBaseProps) => {
  const t = useTheme()
  return (
    <Link href={feature.path} key={feature.path} style={{width: '100%'}}>
      <ButtonBase sx={{
        p: 2,
        width: '100%',
        alignSelf: 'center',
        justifySelf: 'center',
        display: 'inline-block',
        textAlign: 'center',
        overflow: 'hidden',
        borderRadius: t.shape.borderRadius + 'px',
        transition: t.transitions.create('background'),
        '&:hover': {
          background: t.palette.action.hover,
        },
        ...sx,
      }} {...props}>
        <Icon sx={{color: feature.color, fontSize: iconSize + 'px !important'}}>
          {feature.materialIcons}
        </Icon>
        <Txt block bold sx={{fontSize: styleUtils(t).fontSize.small, mt: .5}} truncate>{feature.name}</Txt>
      </ButtonBase>
    </Link>
  )
}