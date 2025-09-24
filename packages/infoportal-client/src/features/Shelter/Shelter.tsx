import {NavLink, Route, Routes, useLocation} from 'react-router-dom'
import {Sidebar, SidebarBody, SidebarItem} from '@/shared/Layout/Sidebar'
import {Layout} from '@/shared/Layout'
import {useI18n} from '@/core/i18n'
import React, {useEffect, useMemo} from 'react'
import {AppHeader} from '@/shared/Layout/Header/AppHeader'
import {useSession} from '@/core/Session/SessionContext'
import {AppFeatureId, appFeaturesIndex} from '@/features/appFeatureId'
import {NoFeatureAccessPage} from '@/shared/NoFeatureAccessPage'
import {ShelterTable} from '@/features/Shelter/Data/ShelterTable'
import {ShelterProvider} from '@/features/Shelter/ShelterContext'
import {KoboFormName, KoboIndex, Shelter_nta} from 'infoportal-common'
import {useAppSettings} from '@/core/context/ConfigContext'
import Link from 'next/link'
import {databaseIndex} from '@/features/Database/databaseIndex'
import {ShelterDashboard} from '@/features/Shelter/Dasbhoard/ShelterDashboard'
import {useShelterData} from '@/features/Shelter/useShelterData'
import {seq} from '@axanc/ts-utils'
import {Access} from '@/core/sdk/server/access/Access'
import {SidebarSection} from '@/shared/Layout/Sidebar/SidebarSection'
import {getKoboFormRouteProps, SidebarKoboLink} from '@/features/SidebarKoboLink'
import {useKoboSchemaContext} from '@/features/KoboSchema/KoboSchemaContext'
import {useReactRouterDefaultRoute} from '@/core/useReactRouterDefaultRoute'
import {CommonSpacesTable} from '@/features/Shelter/CommonSpaces/CommonSpacesTable'

const relatedKoboForms: KoboFormName[] = ['shelter_nta', 'shelter_ta']

export const shelterIndex = {
  basePath: '/shelter',
  siteMap: {
    data: '/data',
    common: '/data/common-spaces',
    access: '/access',
    dashboard: '/dashboard',
    form: (id: KoboFormName = ':id' as any) => '/form/' + id,
  },
}

const ShelterSidebar = () => {
  const path = (page: string) => '' + page
  const {m} = useI18n()
  const {conf} = useAppSettings()
  return (
    <Sidebar>
      <SidebarBody>
        <NavLink to={path(shelterIndex.siteMap.dashboard)} end>
          {({isActive}) => (
            <SidebarItem icon="insights" active={isActive}>
              {m.dashboard}
            </SidebarItem>
          )}
        </NavLink>
        <NavLink to={path(shelterIndex.siteMap.data)} end>
          {({isActive}) => (
            <SidebarItem icon="table_chart" active={isActive}>
              {m.data}
            </SidebarItem>
          )}
        </NavLink>
        <NavLink to={path(shelterIndex.siteMap.common)} end>
          {({isActive}) => (
            <SidebarItem icon="table_chart" active={isActive}>
              {m.common}
            </SidebarItem>
          )}
        </NavLink>
        <Link
          href={conf.linkToFeature(
            AppFeatureId.kobo_database,
            databaseIndex.siteMap.access.absolute(KoboIndex.byName('shelter_nta').id),
          )}
        >
          <SidebarItem icon="person_add" iconEnd="open_in_new">
            {m.accesses}
          </SidebarItem>
        </Link>
        <SidebarSection title={m.koboForms}>
          {relatedKoboForms.map((_) => (
            <SidebarKoboLink key={_} path={path(shelterIndex.siteMap.form(_))} name={_} />
          ))}
        </SidebarSection>
      </SidebarBody>
    </Sidebar>
  )
}

export const Shelter = () => {
  const {session, accesses} = useSession()
  const canOpen = useMemo(() => !!appFeaturesIndex.shelter.showIf?.(session, accesses), [accesses, session])
  return canOpen ? <ShelterWithAccess /> : <NoFeatureAccessPage />
}

export const ShelterWithAccess = () => {
  const {session, accesses} = useSession()
  const ctxSchema = useKoboSchemaContext()
  const location = useLocation()
  useReactRouterDefaultRoute(shelterIndex.siteMap.data)
  const {access, allowedOffices} = useMemo(() => {
    const dbAccesses = seq(accesses).filter(Access.filterByFeature(AppFeatureId.kobo_database))
    const allowedOffices = dbAccesses
      .flatMap((_) => _.params?.filters?.back_office as Shelter_nta.T['back_office'][] | undefined)
      .compact()
    return {access: Access.toSum(dbAccesses, session.admin), allowedOffices}
  }, [session, accesses])

  const isCommon = location.pathname.startsWith(shelterIndex.siteMap.common)
  const fetcherData = useShelterData()

  useEffect(() => {
    if (isCommon) {
      ctxSchema.fetchByName('shelter_commonSpaces')
    } else {
      ctxSchema.fetchByName('shelter_nta')
      ctxSchema.fetchByName('shelter_ta')
      fetcherData.fetchAll()
    }
  }, [isCommon])

  return (
    <Layout
      loading={ctxSchema.anyLoading}
      title={appFeaturesIndex.shelter.name}
      sidebar={<ShelterSidebar />}
      header={<AppHeader id="app-header" />}
    >
      {isCommon ? (
        <Routes>
          <Route path={shelterIndex.siteMap.common} element={<CommonSpacesTable />} />
        </Routes>
      ) : (
        ctxSchema.byName.shelter_nta.get &&
        ctxSchema.byName.shelter_ta.get && (
          <ShelterProvider
            access={access}
            data={fetcherData}
            allowedOffices={allowedOffices}
            langIndex={ctxSchema.langIndex}
            setLangIndex={ctxSchema.setLangIndex}
            schemaNta={ctxSchema.byName.shelter_nta.get}
            schemaTa={ctxSchema.byName.shelter_ta.get}
          >
            <Routes>
              <Route path={shelterIndex.siteMap.dashboard} element={<ShelterDashboard />} />
              <Route path={shelterIndex.siteMap.data} element={<ShelterTable />} />
              {relatedKoboForms.map((_) => (
                <Route key={_} {...getKoboFormRouteProps({path: shelterIndex.siteMap.form(_), name: _})} />
              ))}
            </Routes>
          </ShelterProvider>
        )
      )}
    </Layout>
  )
}
