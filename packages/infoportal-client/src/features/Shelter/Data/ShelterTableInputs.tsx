import {Shelter_ta, ShelterContractor, ShelterContractorPrices, ShelterProgress} from 'infoportal-common'
import {AaSelectBase} from '@/shared/Select/Select'
import React from 'react'
import {Obj} from '@alexandreannic/ts-utils'
import {useI18n} from '@/core/i18n'
import {IpSelectSingle, IpSelectSingleNullableProps} from '@/shared/Select/SelectSingle'

export const ShelterSelectStatus = (props: Pick<IpSelectSingleNullableProps<ShelterProgress>, 'value' | 'defaultValue' | 'onChange'> & Pick<AaSelectBase, 'disabled' | 'sx' | 'label'>) => {
  const {m} = useI18n()
  return (
    <IpSelectSingle<ShelterProgress>
      {...props}
      options={Obj.values(ShelterProgress).map(_ => ({value: _, children: m._shelter.progress[_],}))}
    />
  )
}

export const ShelterSelectContractor = ({
  oblast,
  ...props
}: Pick<IpSelectSingleNullableProps<ShelterContractor>, 'value' | 'defaultValue' | 'onChange'> & Pick<AaSelectBase, 'disabled' | 'sx' | 'label'> & {
  oblast?: keyof typeof Shelter_ta.options['ben_det_oblast']
}) => {
  return (
    <IpSelectSingle
      options={ShelterContractorPrices.findContractor({
        // oblast, Return all to make our life easier
        lot: 1
      })}
      {...props}
    />
  )
}