import React, {useCallback} from 'react'
import {BoxProps, Checkbox, FormControlLabel, FormGroup} from '@mui/material'
import {makeSx, Txt} from 'mui-extension'
import {DashboardFilterLabel} from './DashboardFilterLabel'
import {useI18n} from '@/core/i18n'
import {combineSx} from '@/core/theme'
import {DatatableOptions} from '@/shared/Datatable/util/datatableType'
import {DatatableUtils} from '@/shared/Datatable/util/datatableUtils'

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

export const DashboardFilterOptions = ({
  value = [],
  label,
  addBlankOption,
  icon,
  onChange,
  ...props
}: {
  addBlankOption?: boolean
  icon?: string
  value: string[]
  label: string
  options: () => undefined | DatatableOptions[]// {value: string, label?: string}[]
  onChange?: (_: string[]) => void
} & Pick<BoxProps, 'sx'>) => {
  const {m} = useI18n()

  const options = useCallback(() => props.options(), [props.options])

  const valuesLabel = useCallback(() => {
    return value.map(_ => (options() ?? []).find(o => o.value === _)?.label)
  }, [value, options])

  const allValues = useCallback(() => (options() ?? []).map(_ => _.value), [options])

  const someChecked = useCallback(() => !!allValues().find(_ => value?.includes(_ as any)), [value, allValues])

  const allChecked = useCallback(() => allValues().length === value?.length, [value, allValues])

  const toggleAll = useCallback(() => onChange?.(value?.length === 0 ? allValues() : []), [onChange, allValues])

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
      children={open => open && (
        <>
          <FormControlLabel
            onClick={toggleAll}
            control={<Checkbox checked={allChecked()} indeterminate={!allChecked() && someChecked()}/>}
            label={
              // <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
              <Txt bold sx={{mr: 1.5}}>{m.selectAll}</Txt>
              // <AAIconBtn icon="clear" size="small" sx={{ml: 1.5}}/>
              // </Box>
            }
            sx={combineSx(css.option, css.optionSelectAll)}
          />
          <FormGroup onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (!onChange) return
            if (e.target.checked) {
              onChange([...value, e.target.name])
            } else {
              onChange(value.filter(_ => _ !== e.target.name))
            }
          }}>
            {addBlankOption && (
              <FormControlLabel
                control={<Checkbox name={DatatableUtils.blank} checked={value.includes(DatatableUtils.blank)}/>}
                label={DatatableUtils.blankLabel}
                sx={css.option}
              />
            )}
            {(options() ?? []).map(o =>
              <FormControlLabel
                key={o.value}
                control={<Checkbox name={o.value ?? undefined} checked={value.includes(o.value as any)}/>}
                label={o.label}
                sx={css.option}
              />
            )}
          </FormGroup>
        </>
      )}
      {...props}
    />
  )
}
