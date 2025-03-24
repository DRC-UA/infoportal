import React, {useEffect} from 'react'
import {Outlet} from 'react-router-dom'
import {useKoboSchemaContext} from '@/features/KoboSchema/KoboSchemaContext'
import {MealWinterizationProvider} from '@/features/Meal/Winter/MealWinterizationContext'

export const MealWinterization = () => {
  const ctx = useKoboSchemaContext()
  useEffect(() => {
    ctx.fetchByName('meal_winterizationPdm')
  }, [])
  if (ctx.byName.meal_winterizationPdm?.get) {
    return (
      <MealWinterizationProvider>
        <Outlet />
      </MealWinterizationProvider>
    )
  }
}
