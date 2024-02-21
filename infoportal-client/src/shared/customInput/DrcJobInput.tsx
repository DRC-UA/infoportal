import {Autocomplete, AutocompleteProps, Chip} from '@mui/material'
import {Enum} from '@alexandreannic/ts-utils'
import {DrcJob} from '@infoportal-common'
import {IpInput} from '@/shared/Input/Input'
import React from 'react'
import {useI18n} from '@/core/i18n'

export const DrcJobInputMultiple = (props: Omit<AutocompleteProps<DrcJob, any, any, any>, 'renderInput' | 'options'>) => {
  const {m} = useI18n()
  return (
    <Autocomplete
      multiple
      renderTags={(value: string[], getTagProps) =>
        value.map((option: string, index: number) => (
          <Chip
            size="small"
            variant="outlined"
            label={option}
            {...getTagProps({index})}
          />
        ))
      }
      options={Enum.values(DrcJob) ?? []}
      // renderOption={(props, _) => <Txt truncate>{_.label?.[0]?.replace(/<[^>]+>/g, '') ?? _.name}</Txt>}
      renderInput={({InputProps, ...props}) => <IpInput helperText={null} label={m.drcJob} {...InputProps} {...props}/>}
      {...props}
    />
  )
}

export const DrcJobInputSingle = (props: Omit<AutocompleteProps<DrcJob, any, any, any>, 'renderInput' | 'options'>) => {
  const {m} = useI18n()
  return (
    <Autocomplete
      options={Enum.values(DrcJob) ?? []}
      // renderOption={(props, _) => <Txt truncate>{_.label?.[0]?.replace(/<[^>]+>/g, '') ?? _.name}</Txt>}
      renderInput={({InputProps, ...props}) => <IpInput helperText={null} label={m.drcJob} {...InputProps} {...props}/>}
      {...props}
    />
  )
}