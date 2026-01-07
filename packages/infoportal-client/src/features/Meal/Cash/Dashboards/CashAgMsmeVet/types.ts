import type {Meal_cashPdm} from 'infoportal-common'

import {Meal_ecrec_agMsmeVetPam} from 'infoportal-common'

import type {CashPdmData} from '@/features/Meal/Cash/Context/CashContext'

type EcrecPdmDataType = Omit<CashPdmData<Meal_cashPdm.T>, 'answers'> & {
  familySize: number
  answers: Meal_ecrec_agMsmeVetPam.T
}

export type {EcrecPdmDataType}
