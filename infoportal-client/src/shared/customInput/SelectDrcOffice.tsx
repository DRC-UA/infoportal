import {IpSelectSingle, IpSelectSingleProps} from '@/shared/Select/SelectSingle'
import {useI18n} from '@/core/i18n'
import React from 'react'
import {DrcOffice, drcOffices} from '@infoportal-common'

export const SelectDrcOffice = (props: Omit<IpSelectSingleProps<DrcOffice>, 'onChange' | 'hideNullOption' | 'options'> & {
  options?: DrcOffice[]
  onChange: (_: DrcOffice | null) => void
}) => {
  const {m} = useI18n()
  return (
    <IpSelectSingle<DrcOffice>
      hideNullOption={false}
      label={m.office}
      options={drcOffices}
      {...props}
    />
  )
}