import {Shelter_TA, ShelterContractor, ShelterContractorPrices, ShelterProgress, ShelterTagValidation} from '@infoportal-common'
import {TableIcon} from '@/features/Mpca/MpcaData/TableIcon'
import {AaSelect, AaSelectBase, AaSelectSimple} from '@/shared/Select/Select'
import React from 'react'
import {Enum} from '@alexandreannic/ts-utils'
import {useI18n} from '@/core/i18n'

export const ShelterSelectStatus = (props: Pick<AaSelectSimple<ShelterProgress>, 'value' | 'defaultValue' | 'onChange'> & Pick<AaSelectBase, 'disabled' | 'sx' | 'label'>) => {
  const {m} = useI18n()
  return (
    <AaSelect<ShelterProgress>
      multiple={false}
      showUndefinedOption
      {...props}
      options={Enum.values(ShelterProgress).map(_ => ({value: _, children: m._shelter.progress[_],}))}
    />
  )
}

export const ShelterSelectContractor = ({
  oblast,
  ...props
}: Pick<AaSelectSimple<ShelterContractor>, 'value' | 'defaultValue' | 'onChange'> & Pick<AaSelectBase, 'disabled' | 'sx' | 'label'> & {
  oblast?: keyof typeof Shelter_TA.options['ben_det_oblast']
}) => {
  return (
    <AaSelect
      multiple={false}
      showUndefinedOption
      options={ShelterContractorPrices.findContractor({oblast, lot: 1})}
      {...props}
    />
  )
}