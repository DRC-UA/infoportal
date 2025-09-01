import {Navigate, NavLink, Route, Routes} from 'react-router-dom'
import {Sidebar, SidebarBody, SidebarItem} from '@/shared/Layout/Sidebar'
import {Layout} from '@/shared/Layout'
import {useI18n} from '@/core/i18n'
import React, {useMemo} from 'react'
import {AppHeader} from '@/shared/Layout/Header/AppHeader'
import {useSession} from '@/core/Session/SessionContext'
import {AppFeatureId, appFeaturesIndex} from '@/features/appFeatureId'
import {NoFeatureAccessPage} from '@/shared/NoFeatureAccessPage'
import {SidebarSection} from '@/shared/Layout/Sidebar/SidebarSection'
import {KoboFormName, KoboIndex} from 'infoportal-common'
import {MealVerificationList} from '@/features/Meal/Verification/MealVerificationList'
import {MealVerificationForm} from '@/features/Meal/Verification/Form/MealVerificationForm'
import {getKoboFormRouteProps, SidebarKoboLink} from '@/features/SidebarKoboLink'
import {MealVisit} from '@/features/Meal/Visit/MealVisit'
import {MealVisitDashboard} from '@/features/Meal/Visit/MealVisitDashboard'
import {MealVisitDetails} from '@/features/Meal/Visit/MealVisitDetails'
import {MealVerification} from '@/features/Meal/Verification/MealVerification'
import {Access} from '@/core/sdk/server/access/Access'
import {appConfig} from '@/conf/AppConfig'
import {MealPdm} from '@/features/Meal/Pdm/Dashboard/MealPdm'
import {useReactRouterDefaultRoute} from '@/core/useReactRouterDefaultRoute'
import {MealVerificationData} from '@/features/Meal/Verification/MealVerificationData'
import {MealPdmCashDashboard} from '@/features/Meal/Pdm/Dashboard/MealPdmCashDashboard'
import {MealPdmShelterDashboard} from '@/features/Meal/Pdm/Dashboard/MealPdmShelterDashboard'
import {MealPdmNfiDashboard} from '@/features/Meal/Pdm/Dashboard/MealPdmNfiDashboard'
import {PdmGbvDashboard} from '@/features/Meal/Pdm/Dashboard/PdmGbvDashboard'
import {MealWinterization} from '@/features/Meal/Winter/MealWinterization'
import {MealWinterizationDashboard} from '@/features/Meal/Winter/MealWinterizationDashboard'
import {PdmLegalDashboard} from '@/features/Meal/Pdm/Dashboard/MealPdmLegalDashboard'
import {MealPdmPssDashboard} from '@/features/Meal/Pdm/Dashboard/MealPdmPssDashboard'
import {MealPdmEoreDashboard} from '@/features/Meal/Pdm/Dashboard/MealPdmEoreDashboard'
import {MealCash} from '@/features/Meal/Cash/MealCash'
import {CashAgriDashboard} from '@/features/Meal/Cash/Dashboards/CashAgriDashboard'
import {CashMpcaDashboard} from '@/features/Meal/Cash/Dashboards/CashMpcaDashboard'
import {CashVetMsmeDashboard} from '@/features/Meal/Cash/Dashboards/CashVetMsmeDashboard'
import {CashAnimalShelterDashboard} from '@/features/Meal/Cash/Dashboards/CashAnimalShelterDashboard'
import {CashRentRepairDashboard} from '@/features/Meal/Cash/Dashboards/CashRentRepairDashboard'

const relatedKoboForms: KoboFormName[] = [
  'meal_verificationWinterization',
  'meal_verificationEcrec',
  'meal_visitMonitoring',
  'meal_cashPdm',
  'meal_shelterPdm',
  'meal_nfiPdm',
  'protection_gbvPdm',
  'meal_winterizationPdm',
  'legal_pam',
  'meal_pssPdm',
  'meal_eorePdm',
  'ecrec_cashRegistration',
]

export const mealIndex = {
  basePath: '/meal',
  siteMap: {
    visit: {
      _: '/visit',
      dashboard: `/visit/dashboard`,
      details: (koboAnswerId = ':id') => `/visit/details/${koboAnswerId}`,
    },
    verification: {
      _: '/verification',
      list: '/verification/list',
      form: '/verification/form',
      data: (_: string = '/:id') => `/verification/${_}`,
    },
    pdm: {
      _: '/pdm',
      cashPdmDashboard: `/pdm/cash/dashboard`,
      shelterPdmDashboard: `/pdm/shelter/dashboard`,
      nfiPdmDashboard: `/pdm/nfi/dashboard`,
      gbvPdmDashboard: `/pdm/gbv/dashboard`,
      legalPdmDashboard: `/pdm/legal/dashboard`,
      pssPdmDashboard: `/pdm/pss/dashboard`,
      eorePdmDashboard: `/pdm/eore/dashboard`,
    },
    pdmCash: {
      _: '/pdm/cash',
      agri: `/pdm/cash/agri`,
      mpca: `/pdm/cash/mpca`,
      vetMsme: `/pdm/cash/vet-msme`,
      animalShelter: `/pdm/cash/animal-shelter`,
      rentRepair: `/pdm/cash/rent-repair`,
    },
    winterization: {
      _: '/winterization',
      winterizationDashboard: `/winterization/dashboard`,
    },
    form: (id: KoboFormName = ':id' as any) => '/form/' + id,
  },
}

const MealSidebar = ({
  access,
}: {
  access: {
    verification: boolean
  }
}) => {
  const path = (page: string) => '' + page
  const {m, formatLargeNumber} = useI18n()
  return (
    <Sidebar>
      <SidebarBody>
        <SidebarSection title={m._meal.visitMonitoring}>
          <NavLink to={path(mealIndex.siteMap.visit.dashboard)}>
            {({isActive, isPending}) => (
              <SidebarItem icon={appConfig.icons.dashboard} active={isActive}>
                {m.dashboard}
              </SidebarItem>
            )}
          </NavLink>
          <a
            href="https://drcngo.sharepoint.com/:x:/s/UKRPortal/EUYPiMkl4n1GqaWinv2OgUoByXCmeVtmsgIINesDzZo66w?e=zrOdMh"
            target="_blank"
          >
            <SidebarItem icon={appConfig.icons.matrix} iconEnd="open_in_new">
              {m._meal.openTracker}
            </SidebarItem>
          </a>
          <SidebarKoboLink path={path(mealIndex.siteMap.form('meal_visitMonitoring'))} name="meal_visitMonitoring" />
        </SidebarSection>
        {access.verification && (
          <SidebarSection title={m._meal.verification}>
            <NavLink to={path(mealIndex.siteMap.verification.list)}>
              {({isActive, isPending}) => (
                <SidebarItem icon="manage_search" active={isActive}>
                  {m.data}
                </SidebarItem>
              )}
            </NavLink>
            <NavLink to={path(mealIndex.siteMap.verification.form)}>
              {({isActive, isPending}) => (
                <SidebarItem icon="add_circle" active={isActive}>
                  {m._mealVerif.newRequest}
                </SidebarItem>
              )}
            </NavLink>
            <SidebarKoboLink
              path={path(mealIndex.siteMap.form('meal_verificationEcrec'))}
              name="meal_verificationEcrec"
            />
            <SidebarKoboLink
              path={path(mealIndex.siteMap.form('meal_verificationWinterization'))}
              name="meal_verificationWinterization"
            />
          </SidebarSection>
        )}
        <SidebarSection title={m._meal.pdm}>
          <NavLink to={path(mealIndex.siteMap.pdm._)}>
            {({isActive, isPending}) => (
              <SidebarItem icon={appConfig.icons.dashboard} active={isActive}>
                {m.dashboard}
              </SidebarItem>
            )}
          </NavLink>
          <SidebarKoboLink path={path(mealIndex.siteMap.form('meal_shelterPdm'))} name="meal_shelterPdm" />
          <SidebarKoboLink path={path(mealIndex.siteMap.form('meal_nfiPdm'))} name="meal_nfiPdm" />
          <SidebarKoboLink path={path(mealIndex.siteMap.form('protection_gbvPdm'))} name="protection_gbvPdm" />
          <SidebarKoboLink path={path(mealIndex.siteMap.form('legal_pam'))} name="legal_pam" />
          <SidebarKoboLink path={path(mealIndex.siteMap.form('meal_pssPdm'))} name="meal_pssPdm" />
          <SidebarKoboLink path={path(mealIndex.siteMap.form('meal_eorePdm'))} name="meal_eorePdm" />
        </SidebarSection>
        <SidebarSection title={m._meal.cashPdm}>
          <NavLink to={path(mealIndex.siteMap.pdmCash._)}>
            {({isActive}) => (
              <SidebarItem icon={appConfig.icons.dashboard} active={isActive}>
                {m.dashboard}
              </SidebarItem>
            )}
          </NavLink>
          <SidebarKoboLink path={path(mealIndex.siteMap.form('meal_cashPdm'))} name="meal_cashPdm" />
          <SidebarKoboLink
            path={path(mealIndex.siteMap.form('ecrec_cashRegistration'))}
            name="ecrec_cashRegistration"
          />
        </SidebarSection>
        <SidebarSection title={m._meal.winterization}>
          <NavLink to={path(mealIndex.siteMap.winterization.winterizationDashboard)}>
            {({isActive, isPending}) => (
              <SidebarItem icon={appConfig.icons.dashboard} active={isActive}>
                {m.dashboard}
              </SidebarItem>
            )}
          </NavLink>
          <SidebarKoboLink path={path(mealIndex.siteMap.form('meal_winterizationPdm'))} name="meal_winterizationPdm" />
        </SidebarSection>
      </SidebarBody>
    </Sidebar>
  )
}

export const Meal = () => {
  const {session, accesses} = useSession()
  useReactRouterDefaultRoute(mealIndex.siteMap.visit.dashboard, mealIndex.siteMap.visit._)
  const access = useMemo(() => {
    return {
      _: !!appFeaturesIndex.meal.showIf?.(session, accesses),
      verification:
        (session && session?.admin) ||
        (accesses &&
          !!accesses.filter(Access.filterByFeature(AppFeatureId.kobo_database)).find((_) => {
            return (
              _.params?.koboFormId === KoboIndex.byName('bn_re').id ||
              _.params?.koboFormId === KoboIndex.byName('ecrec_cashRegistration').id ||
              _.params?.koboFormId === KoboIndex.byName('meal_visitMonitoring').id ||
              _.params?.koboFormId === KoboIndex.byName('meal_cashPdm').id ||
              _.params?.koboFormId === KoboIndex.byName('meal_shelterPdm').id ||
              _.params?.koboFormId === KoboIndex.byName('meal_nfiPdm').id ||
              _.params?.koboFormId === KoboIndex.byName('protection_gbvPdm').id ||
              _.params?.koboFormId === KoboIndex.byName('meal_winterizationPdm').id ||
              _.params?.koboFormId === KoboIndex.byName('legal_pam').id ||
              _.params?.koboFormId === KoboIndex.byName('meal_eorePdm').id
            )
          })),
    }
  }, [accesses, session])

  if (!access._) {
    return <NoFeatureAccessPage />
  }

  return (
    <Layout
      title={appFeaturesIndex.meal.name}
      sidebar={<MealSidebar access={access} />}
      header={<AppHeader id="app-header" />}
    >
      <Routes>
        <Route path={mealIndex.siteMap.visit._} element={<MealVisit />}>
          <Route path={mealIndex.siteMap.visit.dashboard} element={<MealVisitDashboard />} />
          <Route path={mealIndex.siteMap.visit.details()} element={<MealVisitDetails />} />
        </Route>
        {access.verification && (
          <Route path={mealIndex.siteMap.verification._} element={<MealVerification />}>
            <Route index element={<Navigate to={mealIndex.siteMap.verification.list} />} />
            <Route path={mealIndex.siteMap.verification.list} element={<MealVerificationList />} />
            <Route path={mealIndex.siteMap.verification.form} element={<MealVerificationForm />} />
            <Route path={mealIndex.siteMap.verification.data()} element={<MealVerificationData />} />
          </Route>
        )}
        <Route path={mealIndex.siteMap.pdm._} element={<MealPdm formName="meal_cashPdm" />}>
          <Route index element={<Navigate to={mealIndex.siteMap.pdm.shelterPdmDashboard} replace />} />
          <Route path={mealIndex.siteMap.pdm.shelterPdmDashboard} element={<MealPdmShelterDashboard />} />
          <Route path={mealIndex.siteMap.pdm.nfiPdmDashboard} element={<MealPdmNfiDashboard />} />
          <Route path={mealIndex.siteMap.pdm.gbvPdmDashboard} element={<PdmGbvDashboard />} />
          <Route path={mealIndex.siteMap.pdm.legalPdmDashboard} element={<PdmLegalDashboard />} />
          <Route path={mealIndex.siteMap.pdm.pssPdmDashboard} element={<MealPdmPssDashboard />} />
          <Route path={mealIndex.siteMap.pdm.eorePdmDashboard} element={<MealPdmEoreDashboard />} />
        </Route>
        <Route path={mealIndex.siteMap.pdmCash._} element={<MealCash />}>
          <Route index element={<Navigate to={mealIndex.siteMap.pdmCash.mpca} replace />} />
          <Route path={mealIndex.siteMap.pdmCash.mpca} element={<CashMpcaDashboard />} />
          <Route path={mealIndex.siteMap.pdmCash.agri} element={<CashAgriDashboard />} />
          <Route path={mealIndex.siteMap.pdmCash.vetMsme} element={<CashVetMsmeDashboard />} />
          <Route path={mealIndex.siteMap.pdmCash.animalShelter} element={<CashAnimalShelterDashboard />} />
          <Route path={mealIndex.siteMap.pdmCash.rentRepair} element={<CashRentRepairDashboard />} />
        </Route>
        <Route path={mealIndex.siteMap.winterization._} element={<MealWinterization />}>
          <Route
            path={mealIndex.siteMap.winterization.winterizationDashboard}
            element={<MealWinterizationDashboard />}
          />
        </Route>
        <Route index element={<Navigate to={mealIndex.siteMap.visit.dashboard} />} />
        {relatedKoboForms.map((_) => (
          <Route key={_} {...getKoboFormRouteProps({path: mealIndex.siteMap.form(_), name: _})} />
        ))}
      </Routes>
    </Layout>
  )
}
