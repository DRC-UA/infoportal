import type {Meal_cashPdm} from 'infoportal-common'

import type {CashPdmData} from '@/features/Meal/Cash/Context/CashContext'

type EcrecPdmDataType = Omit<CashPdmData<Meal_cashPdm.T>, 'answers'> & {familySize: number}

export type {EcrecPdmDataType}
