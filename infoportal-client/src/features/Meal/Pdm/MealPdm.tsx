import React, {useEffect} from 'react'
import {Outlet} from 'react-router-dom'
import {useKoboSchemaContext} from '@/features/KoboSchema/KoboSchemaContext'
import {MealPdmProvider} from '@/features/Meal/Pdm/MealPdmContext'

export const MealPdm = () => {
  const ctx = useKoboSchemaContext()
  useEffect(() => {
    ctx.fetchByName('meal_cashPdm')
  }, [])
  if (ctx.byName.meal_cashPdm?.get) {
    return (
      <MealPdmProvider>
        <Outlet/>
      </MealPdmProvider>
    )
  }
}
