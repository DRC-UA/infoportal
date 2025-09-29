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
import {useReactRouterDefaultRoute} from '@/core/useReactRouterDefaultRoute'
import {MealVerificationData} from '@/features/Meal/Verification/MealVerificationData'
import {MealPdmShelterDashboard} from '@/features/Meal/Pdm/Dashboard/MealPdmShelterDashboard'
import {MealPdmNfiDashboard} from '@/features/Meal/Pdm/Dashboard/MealPdmNfiDashboard'
import {PdmGbvDashboard} from '@/features/Meal/Pdm/Dashboard/PdmGbvDashboard'
import {MealWinterizationDashboard} from '@/features/Meal/Winter/MealWinterizationDashboard'
import {MealPdmPssDashboard} from '@/features/Meal/Pdm/Dashboard/MealPdmPssDashboard'
import {CashAgriDashboard} from '@/features/Meal/Cash/Dashboards/CashAgriDashboard'
import {CashMpcaDashboard} from '@/features/Meal/Cash/Dashboards/CashMpcaDashboard'
import {CashVetMsmeDashboard} from '@/features/Meal/Cash/Dashboards/CashVetMsmeDashboard'
import {CashAnimalShelterDashboard} from '@/features/Meal/Cash/Dashboards/CashAnimalShelterDashboard'
import {CashRentRepairDashboard} from '@/features/Meal/Cash/Dashboards/CashRentRepairDashboard'
import {CashPdmOutlet, MealPdmOutlet, WinterizationOutlet} from '@/features/Meal/Pdm/MealRouteOutlets'
import {MealPdmEoreDashboard} from '@/features/Meal/Pdm/Dashboard/MealPdmEoreDashboard'
import {PdmLegalDashboard} from '@/features/Meal/Pdm/Dashboard/MealPdmLegalDashboard'
import {PdmAwarenessDashboard} from '@/features/Meal/Pdm/Dashboard/PdmAwarenessDashboard'
import {MealPdmVaDashboard} from '@/features/Meal/Pdm/Dashboard/MealPdmVaDashboard'

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
  'bn_pam',
  'awareness_raising_feedback',
  'va_tia_pdm',
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
      ecrec: {
        _: '/pdm/ecrec',
        agri: '/pdm/ecrec/agri',
        vetMsme: '/pdm/ecrec/vet-msme',
        animalShelter: '/pdm/ecrec/animal-shelter',
      },
      basicNeeds: {
        _: '/pdm/basic-needs',
        mpca: '/pdm/basic-needs/mpca',
        nfi: '/pdm/basic-needs/nfi',
      },
      shelter: {
        _: '/pdm/shelter',
        pdm: '/pdm/shelter/pdm',
        rentRepair: '/pdm/shelter/rent-repair',
        winterization: '/pdm/shelter/winterization',
      },
      protection: {
        _: '/pdm/protection',
        general: {
          pss: '/pdm/protection/pss',
          victim: '/pdm/protection/victim',
        },
        gbv: {
          gbv: '/pdm/protection/gbv',
        },
        legal: {
          legal: '/pdm/protection/legal',
        },
        awareness: {
          awareness: '/pdm/protection/awareness',
        },
      },
      hdp: {
        _: '/pdm/hdp',
        eore: '/pdm/hdp/eore',
      },
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
          <SidebarSection title={m.ecrec}>
            <NavLink to={path(mealIndex.siteMap.pdm.ecrec.agri)}>
              {({isActive}) => <SidebarItem active={isActive}>{m.mealMonitoringPdm.cashAgriculture}</SidebarItem>}
            </NavLink>
            <NavLink to={path(mealIndex.siteMap.pdm.ecrec.vetMsme)}>
              {({isActive}) => <SidebarItem active={isActive}>{m.mealMonitoringPdm.vetMsme}</SidebarItem>}
            </NavLink>
            <NavLink to={path(mealIndex.siteMap.pdm.ecrec.animalShelter)}>
              {({isActive}) => <SidebarItem active={isActive}>{m.mealMonitoringPdm.animalShelterFood}</SidebarItem>}
            </NavLink>
          </SidebarSection>
          <SidebarSection title={m.basicNeeds}>
            <NavLink to={path(mealIndex.siteMap.pdm.basicNeeds.mpca)}>
              {({isActive}) => <SidebarItem active={isActive}>{m.mpcaNfi}</SidebarItem>}
            </NavLink>
            <NavLink to={path(mealIndex.siteMap.pdm.basicNeeds.nfi)}>
              {({isActive}) => <SidebarItem active={isActive}>{m.nfiPre}</SidebarItem>}
            </NavLink>
          </SidebarSection>
          <SidebarSection title={m.shelter}>
            <NavLink to={path(mealIndex.siteMap.pdm.shelter.pdm)}>
              {({isActive}) => <SidebarItem active={isActive}>{m.mealMonitoringPdm.shelterOld}</SidebarItem>}
            </NavLink>
            <NavLink to={path(mealIndex.siteMap.pdm.shelter.rentRepair)}>
              {({isActive}) => <SidebarItem active={isActive}>{m.mealMonitoringPdm.rentRepairOld}</SidebarItem>}
            </NavLink>
            <NavLink to={path(mealIndex.siteMap.pdm.shelter.winterization)}>
              {({isActive}) => <SidebarItem active={isActive}>{m._meal.winterization}</SidebarItem>}
            </NavLink>
          </SidebarSection>
          <SidebarSection title={m.protection}>
            <SidebarSection title={m.generalProtection}>
              <NavLink to={path(mealIndex.siteMap.pdm.protection.general.pss)}>
                {({isActive}) => <SidebarItem active={isActive}>{m.mealMonitoringPdm.pssPdmDashboard}</SidebarItem>}
              </NavLink>
              <NavLink to={path(mealIndex.siteMap.pdm.protection.general.victim)}>
                {({isActive}) => <SidebarItem active={isActive}>{m.mealMonitoringPdm.victim}</SidebarItem>}
              </NavLink>
            </SidebarSection>
            <SidebarSection title={m.gbv}>
              <NavLink to={path(mealIndex.siteMap.pdm.protection.gbv.gbv)}>
                {({isActive}) => <SidebarItem active={isActive}>{m.mealMonitoringPdm.gbvPdmDashboard}</SidebarItem>}
              </NavLink>
            </SidebarSection>
            <SidebarSection title={m.legalPdm}>
              <NavLink to={path(mealIndex.siteMap.pdm.protection.legal.legal)}>
                {({isActive}) => <SidebarItem active={isActive}>{m.legalPdm}</SidebarItem>}
              </NavLink>
            </SidebarSection>
            <SidebarSection title={m.awarenessSessions}>
              <NavLink to={path(mealIndex.siteMap.pdm.protection.awareness.awareness)}>
                {({isActive}) => <SidebarItem active={isActive}>{m.awareness}</SidebarItem>}
              </NavLink>
            </SidebarSection>
          </SidebarSection>
          <SidebarSection title={m.hdpPdm}>
            <NavLink to={path(mealIndex.siteMap.pdm.hdp.eore)}>
              {({isActive}) => <SidebarItem active={isActive}>{m.eorePdm}</SidebarItem>}
            </NavLink>
          </SidebarSection>
        </SidebarSection>
        <SidebarSection title={m.forms}>
          <SidebarKoboLink path={path(mealIndex.siteMap.form('meal_shelterPdm'))} name="meal_shelterPdm" />
          <SidebarKoboLink path={path(mealIndex.siteMap.form('meal_nfiPdm'))} name="meal_nfiPdm" />
          <SidebarKoboLink path={path(mealIndex.siteMap.form('protection_gbvPdm'))} name="protection_gbvPdm" />
          <SidebarKoboLink path={path(mealIndex.siteMap.form('legal_pam'))} name="legal_pam" />
          <SidebarKoboLink path={path(mealIndex.siteMap.form('meal_pssPdm'))} name="meal_pssPdm" />
          <SidebarKoboLink path={path(mealIndex.siteMap.form('va_tia_pdm'))} name="va_tia_pdm" />
          <SidebarKoboLink path={path(mealIndex.siteMap.form('meal_eorePdm'))} name="meal_eorePdm" />
          <SidebarKoboLink path={path(mealIndex.siteMap.form('meal_cashPdm'))} name="meal_cashPdm" />
          <SidebarKoboLink
            path={path(mealIndex.siteMap.form('awareness_raising_feedback'))}
            name="awareness_raising_feedback"
          />
          <SidebarKoboLink
            path={path(mealIndex.siteMap.form('ecrec_cashRegistration'))}
            name="ecrec_cashRegistration"
          />
          <SidebarKoboLink path={path(mealIndex.siteMap.form('bn_pam'))} name="bn_pam" />
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
              _.params?.koboFormId === KoboIndex.byName('meal_eorePdm').id ||
              _.params?.koboFormId === KoboIndex.byName('awareness_raising_feedback').id ||
              _.params?.koboFormId === KoboIndex.byName('va_tia_pdm').id ||
              _.params?.koboFormId === KoboIndex.byName('meal_pssPdm').id ||
              _.params?.koboFormId === KoboIndex.byName('bn_pam').id
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
        <Route index element={<Navigate to={mealIndex.siteMap.visit.dashboard} />} />
        {relatedKoboForms.map((_) => (
          <Route key={_} {...getKoboFormRouteProps({path: mealIndex.siteMap.form(_), name: _})} />
        ))}
        <Route path={mealIndex.siteMap.pdm._}>
          <Route path={mealIndex.siteMap.pdm.ecrec._} element={<CashPdmOutlet />}>
            <Route index element={<Navigate to={mealIndex.siteMap.pdm.ecrec.agri} replace />} />
            <Route path="agri" element={<CashAgriDashboard />} />
            <Route path="vet-msme" element={<CashVetMsmeDashboard />} />
            <Route path="animal-shelter" element={<CashAnimalShelterDashboard />} />
          </Route>
          <Route path={mealIndex.siteMap.pdm.basicNeeds.mpca} element={<CashPdmOutlet />}>
            <Route index element={<CashMpcaDashboard />} />
          </Route>
          <Route path={mealIndex.siteMap.pdm.basicNeeds.nfi} element={<MealPdmOutlet forms={['meal_nfiPdm']} />}>
            <Route index element={<MealPdmNfiDashboard />} />
          </Route>
          <Route path={mealIndex.siteMap.pdm.shelter.pdm} element={<MealPdmOutlet forms={['meal_shelterPdm']} />}>
            <Route index element={<MealPdmShelterDashboard />} />
          </Route>
          <Route path={mealIndex.siteMap.pdm.shelter.rentRepair} element={<CashPdmOutlet />}>
            <Route index element={<CashRentRepairDashboard />} />
          </Route>
          <Route path={mealIndex.siteMap.pdm.shelter.winterization} element={<WinterizationOutlet />}>
            <Route index element={<MealWinterizationDashboard />} />
          </Route>
          <Route
            path={mealIndex.siteMap.pdm.protection._}
            element={
              <MealPdmOutlet
                forms={['meal_pssPdm', 'protection_gbvPdm', 'legal_pam', 'va_tia_pdm', 'awareness_raising_feedback']}
              />
            }
          >
            <Route index element={<Navigate to={mealIndex.siteMap.pdm.protection.general.pss} replace />} />
            <Route path="pss" element={<MealPdmPssDashboard />} />
            <Route path="victim" element={<MealPdmVaDashboard />} />
            <Route path="gbv" element={<PdmGbvDashboard />} />
            <Route path="legal" element={<PdmLegalDashboard />} />
            <Route path="awareness" element={<PdmAwarenessDashboard />} />
          </Route>
          <Route path={mealIndex.siteMap.pdm.hdp._} element={<MealPdmOutlet forms={['meal_eorePdm']} />}>
            <Route index element={<Navigate to={mealIndex.siteMap.pdm.hdp.eore} replace />} />
            <Route path="eore" element={<MealPdmEoreDashboard />} />
          </Route>
          <Route index element={<Navigate to={mealIndex.siteMap.pdm.ecrec.agri} replace />} />
        </Route>
      </Routes>
    </Layout>
  )
}
