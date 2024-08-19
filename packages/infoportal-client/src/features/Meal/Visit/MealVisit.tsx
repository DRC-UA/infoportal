import React, {useEffect} from 'react'
import {Outlet} from 'react-router-dom'
import {MealVisitProvider} from '@/features/Meal/Visit/MealVisitContext'
import {useKoboSchemaContext} from '@/features/KoboSchema/KoboSchemaContext'

export const MealVisit = () => {
  const ctx = useKoboSchemaContext()
  useEffect(() => {
    ctx.fetchByName('meal_visitMonitoring')
  }, [])
  if (ctx.byName.meal_visitMonitoring?.get) {
    return (
      <MealVisitProvider>
        <Outlet/>
      </MealVisitProvider>
    )
  }
}
