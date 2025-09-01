import React, {useEffect} from 'react'
import {NavLink, Outlet} from 'react-router-dom'
import {useKoboSchemaContext} from '@/features/KoboSchema/KoboSchemaContext'
import {KoboFormName} from 'infoportal-common'
import {MealPdmProvider} from '@/features/Meal/Pdm/Context/MealPdmContext'
import {useLocation} from 'react-router'
import {useI18n} from '@/core/i18n'
import {Tab, Tabs} from '@mui/material'
import {mealIndex} from '@/features/Meal/Meal'

export const MealPdm = ({formName}: {formName: KoboFormName}) => {
  const ctx = useKoboSchemaContext()
  const {pathname} = useLocation()
  const {m} = useI18n()

  useEffect(() => {
    ctx.fetchByName(formName)
  }, [formName])

  if (ctx.byName[formName]?.get) {
    return (
      <MealPdmProvider>
        <>
          <Tabs value={pathname} sx={{borderBottom: (t) => `1px solid ${t.palette.divider}`}}>
            <Tab
              sx={{minHeight: 34, py: 1}}
              component={NavLink}
              value={mealIndex.siteMap.pdm.shelterPdmDashboard}
              to={mealIndex.siteMap.pdm.shelterPdmDashboard}
              label={m.mealMonitoringPdm.shelterPdmDashboard}
            />
            <Tab
              sx={{minHeight: 34, py: 1}}
              component={NavLink}
              value={mealIndex.siteMap.pdm.nfiPdmDashboard}
              to={mealIndex.siteMap.pdm.nfiPdmDashboard}
              label={m.mealMonitoringPdm.nfiPdmDashboard}
            />
            <Tab
              sx={{minHeight: 34, py: 1}}
              component={NavLink}
              value={mealIndex.siteMap.pdm.gbvPdmDashboard}
              to={mealIndex.siteMap.pdm.gbvPdmDashboard}
              label={m.mealMonitoringPdm.gbvPdmDashboard}
            />
            <Tab
              sx={{minHeight: 34, py: 1}}
              component={NavLink}
              value={mealIndex.siteMap.pdm.legalPdmDashboard}
              to={mealIndex.siteMap.pdm.legalPdmDashboard}
              label={m.mealMonitoringPdm.legalPdmDashboard}
            />
            <Tab
              sx={{minHeight: 34, py: 1}}
              component={NavLink}
              value={mealIndex.siteMap.pdm.pssPdmDashboard}
              to={mealIndex.siteMap.pdm.pssPdmDashboard}
              label={m.mealMonitoringPdm.pssPdmDashboard}
            />
            <Tab
              sx={{minHeight: 34, py: 1}}
              component={NavLink}
              value={mealIndex.siteMap.pdm.eorePdmDashboard}
              to={mealIndex.siteMap.pdm.eorePdmDashboard}
              label={m.mealMonitoringPdm.eorePdmDashboard}
            />
          </Tabs>
          <Outlet />
        </>
      </MealPdmProvider>
    )
  }
}
