import React, {useEffect} from 'react'
import {NavLink, Outlet} from 'react-router-dom'
import {useKoboSchemaContext} from '@/features/KoboSchema/KoboSchemaContext'
import {Tab, Tabs} from '@mui/material'
import {mealIndex} from '@/features/Meal/Meal'
import {useLocation} from 'react-router'
import {useI18n} from '@/core/i18n'
import {CashPdmProvider} from '@/features/Meal/Cash/Context/CashContext'

export const MealCash: React.FC = () => {
  const ctx = useKoboSchemaContext()
  const {m} = useI18n()
  const {pathname} = useLocation()

  useEffect(() => {
    ctx.fetchByName('meal_cashPdm')
    ctx.fetchByName('ecrec_cashRegistration')
  }, [])

  return (
    <CashPdmProvider>
      <>
        <Tabs value={pathname} sx={{borderBottom: (t) => `1px solid ${t.palette.divider}`}}>
          <Tab
            sx={{minHeight: 34, py: 1}}
            component={NavLink}
            value={mealIndex.siteMap.pdmCash.mpca}
            to={mealIndex.siteMap.pdmCash.mpca}
            label={m.mealMonitoringPdm.mpca}
          />
          <Tab
            sx={{minHeight: 34, py: 1}}
            component={NavLink}
            value={mealIndex.siteMap.pdmCash.agri}
            to={mealIndex.siteMap.pdmCash.agri}
            label={m.mealMonitoringPdm.cashAgriculture}
          />
          <Tab
            sx={{minHeight: 34, py: 1}}
            component={NavLink}
            value={mealIndex.siteMap.pdmCash.vetMsme}
            to={mealIndex.siteMap.pdmCash.vetMsme}
            label={m.mealMonitoringPdm.vetMsme}
          />
          <Tab
            sx={{minHeight: 34, py: 1}}
            component={NavLink}
            value={mealIndex.siteMap.pdmCash.animalShelter}
            to={mealIndex.siteMap.pdmCash.animalShelter}
            label={m.mealMonitoringPdm.animalShelter}
          />
          <Tab
            sx={{minHeight: 34, py: 1}}
            component={NavLink}
            value={mealIndex.siteMap.pdmCash.rentRepair}
            to={mealIndex.siteMap.pdmCash.rentRepair}
            label={m.mealMonitoringPdm.cashRentRepair}
          />
        </Tabs>
        <Outlet />
      </>
    </CashPdmProvider>
  )
}
