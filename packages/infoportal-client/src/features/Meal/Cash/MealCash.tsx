import React, {useEffect} from 'react'
import {Outlet} from 'react-router-dom'
import {useKoboSchemaContext} from '@/features/KoboSchema/KoboSchemaContext'
import {CashPdmProvider} from '@/features/Meal/Cash/Context/CashContext'

export const MealCash: React.FC = () => {
  const ctx = useKoboSchemaContext()

  useEffect(() => {
    ctx.fetchByName('meal_cashPdm')
    ctx.fetchByName('ecrec_cashRegistration')
    ctx.fetchByName('bn_pam')
  }, [ctx])

  return (
    <CashPdmProvider>
      <Outlet />
    </CashPdmProvider>
  )
}
