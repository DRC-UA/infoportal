import React from 'react'
import {DrcProject, DrcProjectHelper} from 'infoportal-common'
import {IpSelectMultiple, IpSelectMultipleProps} from '@/shared/Select/SelectMultiple'
import {IpSelectSingle, IpSelectSingleProps} from '@/shared/Select/SelectSingle'
import {useI18n} from '@/core/i18n'

export const SelectDrcProjects = (
  props: Omit<IpSelectMultipleProps<DrcProject>, 'options'> & {
    options?: DrcProject[]
  },
) => {
  const {m} = useI18n()
  return <IpSelectMultiple<DrcProject> label={m.project} options={DrcProjectHelper.list} {...props} />
}

export const SelectDrcProject = (
  props: Omit<IpSelectSingleProps<DrcProject>, 'onChange' | 'hideNullOption' | 'options'> & {
    options?: DrcProject[]
    onChange: (_: DrcProject | null) => void
  },
) => {
  const {m} = useI18n()
  return (
    <IpSelectSingle<DrcProject> hideNullOption={false} label={m.project} options={DrcProjectHelper.list} {...props} />
  )
}
