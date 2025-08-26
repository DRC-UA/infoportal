import {useCallback, type FC, type ReactElement} from 'react'
import {IconButton, MenuItem} from '@mui/material'

import {useI18n} from '@/core/i18n'
import {PopoverWrapper} from '@/shared/PopoverWrapper'

const LanguageSwitch: FC<{children: (currentLang: string) => ReactElement}> = ({children}) => {
  const {m, availableLangs, currentLang, setLang} = useI18n()

  const handleLanguageOptionClick = useCallback(
    ({option, callback}: {option: (typeof availableLangs)[number]; callback: () => void}) => {
      return (): void => {
        setLang(option)
        callback()
      }
    },
    [setLang],
  )

  return (
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
      {children(currentLang)}
    </PopoverWrapper>
  )
}

export {LanguageSwitch}
