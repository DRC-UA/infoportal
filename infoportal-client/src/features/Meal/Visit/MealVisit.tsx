import React, {useEffect} from 'react'
import {Outlet} from 'react-router-dom'
import {MealVisitProvider} from '@/features/Meal/Visit/MealVisitContext'
import {useKoboSchemaContext} from '@/features/KoboSchema/KoboSchemaContext'

export const MealVisit = () => {
  const ctx = useKoboSchemaContext()
  useEffect(() => {
    ctx.fetchers.fetch({}, 'meal_visitMonitoring')
  }, [])
  if (ctx.fetchers.get.meal_visitMonitoring) {
    return (
      <MealVisitProvider>
        <Outlet/>
      </MealVisitProvider>
    )
  }
}
