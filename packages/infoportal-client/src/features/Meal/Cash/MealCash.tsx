import type {FC} from 'react'
import {Outlet} from 'react-router-dom'

import {CashPdmProvider} from '@/features/Meal/Cash/Context/CashContext'

export const MealCash: FC = () => (
  <CashPdmProvider>
    <Outlet />
  </CashPdmProvider>
)
