import type {FC} from 'react'
import {Outlet} from 'react-router-dom'

import {KoboFormName} from 'infoportal-common'

import {useKoboSchemaContext} from '@/features/KoboSchema/KoboSchemaContext'
import {CashPdmProvider} from '@/features/Meal/Cash/Context/CashContext'
import {MealPdmProvider} from '@/features/Meal/Pdm/Context/MealPdmContext'
import {MealWinterizationProvider} from '@/features/Meal/Winter/MealWinterizationContext'

export const CashPdmOutlet: FC = () => {
  useKoboSchemaContext({autoFetch: ['meal_cashPdm', 'ecrec_cashRegistration', 'bn_pam']})

  return (
    <CashPdmProvider>
      <Outlet />
    </CashPdmProvider>
  )
}

export const MealPdmOutlet: FC<{forms: KoboFormName[]}> = ({forms}) => {
  useKoboSchemaContext({autoFetch: forms})

  return (
    <MealPdmProvider>
      <Outlet />
    </MealPdmProvider>
  )
}

export const WinterizationOutlet: FC = () => (
  <MealWinterizationProvider>
    <Outlet />
  </MealWinterizationProvider>
)
