import {useCallback} from 'react'
import {Obj} from '@axanc/ts-utils'
import {alpha, Icon, IconButton, MenuItem, useTheme, type BoxProps} from '@mui/material'
import Link from 'next/link'

import {useAppSettings} from '@/core/context/ConfigContext'
import {useI18n} from '@/core/i18n'
import {styleUtils} from '@/core/theme'
import {Txt} from '@/shared'
import {AppHeaderFeatures} from '@/shared/Layout/Header/AppHeaderFeatures'
import {AppHeaderMenu} from '@/shared/Layout/Header/AppHeaderMenu'
import {IpIconBtn} from '@/shared/IconBtn'
import {AppHeaderContainer} from '@/shared/Layout/Header/AppHeaderContainer'
import {PopoverWrapper} from '@/shared/PopoverWrapper'

import {layoutConfig} from '..'
import {useLayoutContext} from '../LayoutContext'

const lightThemeIcons = {
  light: 'light_mode',
  dark: 'dark_mode',
  auto: 'brightness_medium',
} as const

export const AppHeader = ({children, sx, id = 'aa-header-id', ...props}: BoxProps) => {
  const {sidebarOpen, showSidebarButton, setSidebarOpen, title} = useLayoutContext()
  const {m, availableLangs, currentLang, setLang} = useI18n()
  const t = useTheme()
  const {
    theme: {brightness, setBrightness},
  } = useAppSettings()
  const handleLanguageOptionClick = useCallback(
    ({option, callback}: {option: (typeof availableLangs)[number]; callback: () => void}) => {
      return (): void => {
        setLang(option)
        callback()
      }
    },
    [setLang],
  )
  const handleThemeOptionClick = useCallback(
    ({option, callback}: {option: keyof typeof lightThemeIcons; callback: () => void}) => {
      return (): void => {
        setBrightness(option)
        callback()
      }
    },
    [setBrightness],
  )

  return (
    <AppHeaderContainer
      component="header"
      sx={{
        minHeight: layoutConfig.headerHeight,
        px: layoutConfig.headerPx,
        py: 0.5,
        display: 'flex',
        alignItems: 'center',
        ...sx,
      }}
      id={id}
      {...props}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {showSidebarButton && (
          <IpIconBtn
            size="small"
            sx={{
              mr: 1,
              border: (t) => `2px solid ${t.palette.primary.main}`,
              background: (t) => (sidebarOpen ? 'none' : alpha(t.palette.primary.main, 0.1)),
              color: (t) => t.palette.primary.main,
              '&:hover': {
                background: (t) => alpha(t.palette.primary.main, 0.1),
              },
            }}
            onClick={() => setSidebarOpen((_) => !_)}
            children="menu"
          />
        )}
        <Txt
          sx={{ml: 1, ...styleUtils(t).truncate}}
          size="title"
          bold
          dangerouslySetInnerHTML={{__html: title ?? ''}}
        />
        {children}
      </div>
      <PopoverWrapper
        popoverProps={{anchorOrigin: {vertical: 'bottom', horizontal: 'left'}}}
        content={(close) =>
          availableLangs.map((languageOption) => (
            <MenuItem
              key={languageOption}
              selected={currentLang === languageOption}
              onClick={handleLanguageOptionClick({
                option: languageOption,
                callback: close,
              })}
            >
              {languageOption}
            </MenuItem>
          ))
        }
      >
        <IconButton size="medium" sx={{width: 37, height: 37, fontSize: 'medium'}}>
          {currentLang}
        </IconButton>
      </PopoverWrapper>
      <PopoverWrapper
        popoverProps={{anchorOrigin: {vertical: 'bottom', horizontal: 'right'}}}
        content={(close) =>
          Obj.entries(lightThemeIcons).map(([theme, icon]) => (
            <MenuItem
              key={theme}
              selected={brightness === theme}
              onClick={handleThemeOptionClick({
                option: theme,
                callback: close,
              })}
            >
              <Icon sx={{mr: 1}}>{icon}</Icon>
              {m.lightTheme[theme]}
            </MenuItem>
          ))
        }
      >
        <IpIconBtn children={lightThemeIcons[brightness ?? 'auto']} />
      </PopoverWrapper>
      <Link href="/">
        <IpIconBtn children="home" />
      </Link>
      <AppHeaderFeatures sx={{mr: 1}} />
      <AppHeaderMenu />
    </AppHeaderContainer>
  )
}
