import React, {ReactNode, useEffect, useMemo, useState} from 'react'
import {SxProps, Theme} from '@mui/material'
import {compareArray} from '@infoportal-common'

interface MultipleChoicesBase<T, V> {
  label?: ReactNode
  options: {value: T, children: ReactNode, key?: number | string}[]
  sx?: SxProps<Theme>
}

interface MultipleChoicesMultiple<T extends string, V> extends MultipleChoicesBase<T, V> {
  initialValue?: T[]
  value?: T[]
  onChange: (t: T[], e?: any) => void
  children: (_: {
    allChecked?: boolean,
    someChecked?: boolean,
    toggleAll?: () => void,
    options: {
      value: T
      checked?: boolean
      children?: ReactNode
      key?: string | number
      onChange: () => void
    }[]
  }) => React.JSX.Element
}

type MultipleChoices<T extends string, V> = MultipleChoicesMultiple<T, V> //| MultipleChoicesSimple<T, V>

export const MultipleChoices = <T extends string, V extends string = string>({
  initialValue,
  value,
  onChange,
  options,
  children,
  sx
}: MultipleChoices<T, V>) => {

  const [innerValue, setInnerValue] = useState<T[]>(value ?? initialValue ?? [])

  const allValues = useMemo(() => options.map(_ => _.value), [options])

  const someChecked = !!allValues.find(_ => innerValue?.includes(_))

  const allChecked = allValues.length === innerValue?.length

  const toggleAll = () => {
    setInnerValue(innerValue?.length === 0 ? allValues : [])
  }

  const onClick = (v: T) => {
    setInnerValue(prev => prev.includes(v)
      ? prev.filter(_ => _ !== v)
      : [...prev, v])
  }

  useEffect(() => {
    if (!compareArray(value, innerValue))
      setInnerValue(value ?? [])
  }, [value])

  useEffect(() => {
    if (!compareArray(innerValue, initialValue))
      onChange(innerValue)
  }, [innerValue])

  return children({
    someChecked,
    allChecked,
    toggleAll,
    options: options.map(_ => ({
      ..._,
      key: _.key ?? _.value,
      checked: innerValue.includes(_.value),
      onChange: () => onClick(_.value)
    }))
  })
}