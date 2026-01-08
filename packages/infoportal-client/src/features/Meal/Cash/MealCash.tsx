import {useEffect, type FC} from 'react'
import {Outlet} from 'react-router-dom'

import {useKoboSchemaContext} from '@/features/KoboSchema/KoboSchemaContext'
import {CashPdmProvider} from '@/features/Meal/Cash/Context/CashContext'

export const MealCash: FC = () => {
  const ctx = useKoboSchemaContext()

  useEffect(() => {
    ctx.fetchByName('meal_cashPdm')
    ctx.fetchByName('ecrec_cashRegistration')
    ctx.fetchByName('bn_pam')
  }, [ctx.fetchByName])

  return (
    <CashPdmProvider>
      <Outlet />
    </CashPdmProvider>
  )
}
