import React, {useEffect} from 'react'
import {Outlet} from 'react-router-dom'
import {KoboFormName} from 'infoportal-common'
import {useKoboSchemaContext} from '@/features/KoboSchema/KoboSchemaContext'
import {CashPdmProvider} from '@/features/Meal/Cash/Context/CashContext'
import {MealPdmProvider} from '@/features/Meal/Pdm/Context/MealPdmContext'
import {MealWinterizationProvider} from '@/features/Meal/Winter/MealWinterizationContext'

const WithSchemas: React.FC<{forms: KoboFormName[]}> = ({forms}) => {
  const ctx = useKoboSchemaContext()
  useEffect(() => { forms.forEach((f) => ctx.fetchByName(f)) }, [ctx, forms])
  return <Outlet/>
}

export const CashPdmOutlet: React.FC = () => {
  const ctx = useKoboSchemaContext()
  useEffect(() => {
    ctx.fetchByName('meal_cashPdm')
    ctx.fetchByName('ecrec_cashRegistration')
    ctx.fetchByName('bn_pam')
  }, [ctx])
  return (
    <CashPdmProvider>
      <Outlet/>
    </CashPdmProvider>
  )
}

export const MealPdmOutlet: React.FC<{forms: KoboFormName[]}> = ({forms}) => (
  <MealPdmProvider>
    <WithSchemas forms={forms}/>
  </MealPdmProvider>
)

export const WinterizationOutlet: React.FC = () => (
  <MealWinterizationProvider>
    <Outlet/>
  </MealWinterizationProvider>
)
