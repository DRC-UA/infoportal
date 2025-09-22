import React, {useEffect} from 'react'
import {Outlet} from 'react-router-dom'
import {useKoboSchemaContext} from '@/features/KoboSchema/KoboSchemaContext'
import {MealWinterizationProvider} from '@/features/Meal/Winter/MealWinterizationContext'

export const MealWinterization: React.FC = () => {
  const ctx = useKoboSchemaContext()
  useEffect(() => {
    ctx.fetchByName('meal_winterizationPdm')
  }, [ctx])

  const ready = !!ctx.byName.meal_winterizationPdm?.get
  if (!ready) return null

  return (
    <MealWinterizationProvider>
      <Outlet />
    </MealWinterizationProvider>
  )
}
