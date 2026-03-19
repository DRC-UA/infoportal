import {useCallback, useState, type ChangeEventHandler} from 'react'
import {BoxProps, Checkbox, FormControlLabel, FormGroup, styled, TextField} from '@mui/material'

import {useI18n} from '@/core/i18n'
import {Txt, useMultipleChoices} from '@/shared'
import {DatatableOptions} from '@/shared/Datatable/util/datatableType'

import {DashboardFilterLabel} from './DashboardFilterLabel'

const FormControlLabelDense = styled(FormControlLabel, {
  shouldForwardProp: (prop) => prop !== 'dense',
})<{
  dense?: boolean
}>(({theme, dense}) => ({
  whiteSpace: 'nowrap',
  paddingRight: theme.spacing(1),
  paddingLeft: theme.spacing(1),
  marginRight: 0,
  fontSize: dense ? '.825em' : undefined,
  transition: theme.transitions.create('all'),
  height: dense ? 28 : undefined,
  '&:hover': {
    background: theme.palette.action.hover,
  },
}))

type SelectProps = {
  onChange: (_: string[]) => void
  value: string[]
  addBlankOption?: boolean
  options: () => undefined | DatatableOptions[]
}

export const DashboardFilterOptions = ({
  value = [],
  label,
  icon,
  onChange,
  ...props
}: {
  icon?: string
  label: string
  dense?: boolean
  searchable?: boolean
} & SelectProps &
  Pick<BoxProps, 'sx'>) => {
  const options = useCallback(() => props.options(), [props.options])
  const valuesLabel = useCallback(() => {
    return value.map((_) => (options() ?? []).find((o) => o.value === _)?.label)
  }, [value, options])

  return (
    <DashboardFilterLabel
      icon={icon}
      active={value.length > 0}
      label={
        <>
          {value.length > 0 ? valuesLabel()[0] : label}
          {value.length > 1 && <>&nbsp;+ {value.length - 1}</>}
        </>
      }
      children={(open) => open && <DashboardFilterOptionsContent {...props} value={value} onChange={onChange} />}
      {...props}
    />
  )
}

export const DashboardFilterOptionsContent = ({
  addBlankOption,
  onChange,
  value,
  options: optionsFromProps,
  dense,
  searchable = false,
}: SelectProps & {
  dense?: boolean
  searchable?: boolean
}) => {
  const {m} = useI18n()
  const choices = useMultipleChoices({
    addBlankOption,
    value,
    options: optionsFromProps(),
    onChange,
  })
  const [query, setQuery] = useState('')
  const handleQuery: ChangeEventHandler<HTMLInputElement> = (event) => {
    setQuery(event.target.value.toLowerCase())
  }

  return (
    <>
      <FormControlLabelDense
        onClick={choices.toggleAll}
        dense={dense}
        control={
          <Checkbox
            size="small"
            checked={choices.allChecked}
            indeterminate={choices.allChecked && choices.someChecked}
          />
        }
        label={
          // <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
          <Txt bold sx={{mr: 1.5}} fontSize={dense ? 'small' : undefined}>
            {m.selectAll}
          </Txt>
          // <AAIconBtn icon="clear" size="small" sx={{ml: 1.5}}/>
          // </Box>
        }
        sx={{
          display: 'block',
          borderBottom: `1px solid`,
          borderBottomColor: 'palette.divider',
          height: dense ? 32 : undefined,
        }}
      />
      {searchable && <TextField variant="standard" fullWidth sx={{padding: 1}} onChange={handleQuery} />}
      <FormGroup
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          choices.onClick(e.target.name)
        }}
      >
        {choices.options
          .filter(({value}) => (query ? value.toLocaleLowerCase().includes(query) : true))
          .map((o) => (
            <FormControlLabelDense
              key={o.value}
              dense={dense}
              control={<Checkbox size="small" name={o.value ?? undefined} checked={o.checked} />}
              label={<Txt fontSize={dense ? 'small' : undefined}>{o.label}</Txt>}
            />
          ))}
      </FormGroup>
    </>
  )
}
