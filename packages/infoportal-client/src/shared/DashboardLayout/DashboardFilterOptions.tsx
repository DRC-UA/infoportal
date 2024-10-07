import React, {useCallback} from 'react'
import {BoxProps, Checkbox, FormControlLabel, FormGroup} from '@mui/material'
import {Txt, useMultipleChoices} from '@/shared'
import {DashboardFilterLabel} from './DashboardFilterLabel'
import {useI18n} from '@/core/i18n'
import {combineSx, makeSx} from '@/core/theme'
import {DatatableOptions} from '@/shared/Datatable/util/datatableType'

const css = makeSx({
  optionSelectAll: {
    display: 'block',
    borderBottom: t => `1px solid ${t.palette.divider}`,
  },
  option: {
    whiteSpace: 'nowrap',
    px: 1,
    mr: 0,
    transition: t => t.transitions.create('all'),
    '&:hover': {
      background: t => t.palette.action.hover,
    }
  }
})

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
} & SelectProps & Pick<BoxProps, 'sx'>) => {
  const options = useCallback(() => props.options(), [props.options])
  const valuesLabel = useCallback(() => {
    return value.map(_ => (options() ?? []).find(o => o.value === _)?.label)
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
      children={open => open && <DashboardFilterOptionsContent {...props} value={value} onChange={onChange}/>}
      {...props}
    />
  )
}

export const DashboardFilterOptionsContent = ({
  addBlankOption,
  onChange,
  value,
  options,
}: SelectProps) => {
  const {m} = useI18n()
  const choices = useMultipleChoices({
    addBlankOption,
    value,
    options: options(),
    onChange,
  })
  return (
    <>
      <FormControlLabel
        onClick={choices.toggleAll}
        control={<Checkbox checked={choices.allChecked} indeterminate={choices.allChecked && choices.someChecked}/>}
        label={
          // <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
          <Txt bold sx={{mr: 1.5}}>{m.selectAll}</Txt>
          // <AAIconBtn icon="clear" size="small" sx={{ml: 1.5}}/>
          // </Box>
        }
        sx={combineSx(css.option, css.optionSelectAll)}
      />
      <FormGroup onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        choices.onClick(e.target.name)
      }}>
        {(choices.options).map(o =>
          <FormControlLabel
            key={o.value}
            control={<Checkbox name={o.value ?? undefined} checked={o.checked}/>}
            label={o.label}
            sx={css.option}
          />
        )}
      </FormGroup>
    </>
  )
}