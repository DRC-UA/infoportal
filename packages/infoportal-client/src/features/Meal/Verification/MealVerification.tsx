import {MealVerificationProvider} from '@/features/Meal/Verification/MealVerificationContext'
import {Outlet} from 'react-router-dom'

export const MealVerification = () => {
  return (
    <MealVerificationProvider>
      <Outlet/>
    </MealVerificationProvider>
  )
}