import React, {useEffect, useMemo} from 'react'
import {Outlet} from 'react-router-dom'
import {useKoboSchemaContext} from '@/features/KoboSchema/KoboSchemaContext'
import {KoboFormName} from 'infoportal-common'
import {MealPdmProvider} from '@/features/Meal/Pdm/Context/MealPdmContext'

export const MealPdm: React.FC<{forms?: KoboFormName | KoboFormName[]}> = ({forms}) => {
  const ctx = useKoboSchemaContext()
  const list = useMemo(() => (Array.isArray(forms) ? forms : forms ? [forms] : []), [forms])

  useEffect(() => {
    list.forEach((f) => ctx.fetchByName(f))
  }, [ctx, list])

  const ready = list.length === 0 || list.every((f) => ctx.byName[f]?.get)
  if (!ready) return null

  return (
    <MealPdmProvider>
      <Outlet />
    </MealPdmProvider>
  )
}
