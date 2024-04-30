import {HashRouter as Router, Navigate, NavLink, Route, Routes} from 'react-router-dom'
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
import {KoboFormName, koboIndex, KoboIndex, Shelter_NTA} from '@infoportal-common'
import {useAppSettings} from '@/core/context/ConfigContext'
import Link from 'next/link'
import {databaseIndex} from '@/features/Database/databaseIndex'
import {ShelterDashboard} from '@/features/Shelter/Dasbhoard/ShelterDashboard'
import {useShelterData} from '@/features/Shelter/useShelterData'
import {seq} from '@alexandreannic/ts-utils'
import {Access} from '@/core/sdk/server/access/Access'
import {SidebarSection} from '@/shared/Layout/Sidebar/SidebarSection'
import {getKoboFormRouteProps, SidebarKoboLink} from '@/features/SidebarKoboLink'
import {useKoboSchemaContext} from '@/features/KoboSchema/KoboSchemaContext'

const relatedKoboForms: KoboFormName[] = [
  'shelter_nta',
  'shelter_ta',
]

export const shelterIndex = {
  basePath: '/shelter',
  siteMap: {
    data: '/data',
    access: '/access',
    dashboard: '/dashboard',
    form: (id: KoboFormName = ':id' as any) => '/form/' + id,
  }
}

const ShelterSidebar = () => {
  const path = (page: string) => '' + page
  const {m} = useI18n()
  const {conf} = useAppSettings()
  return (
    <Sidebar>
      <SidebarBody>
        <NavLink to={path(shelterIndex.siteMap.dashboard)}>
          {({isActive, isPending}) => (
            <SidebarItem icon="insights" active={isActive}>{m.dashboard}</SidebarItem>
          )}
        </NavLink>
        <NavLink to={path(shelterIndex.siteMap.data)}>
          {({isActive, isPending}) => (
            <SidebarItem icon="table_chart" active={isActive}>{m.data}</SidebarItem>
          )}
        </NavLink>
        <Link href={conf.linkToFeature(AppFeatureId.kobo_database, databaseIndex.siteMap.access.absolute(koboIndex.drcUa.server.prod, KoboIndex.byName('shelter_nta').id))}>
          <SidebarItem icon="person_add" iconEnd="open_in_new">{m.accesses}</SidebarItem>
        </Link>
        <SidebarSection title={m.koboForms}>
          {relatedKoboForms.map(_ =>
            <SidebarKoboLink key={_} path={path(shelterIndex.siteMap.form(_))} name={_}/>
          )}
        </SidebarSection>
      </SidebarBody>
    </Sidebar>
  )
}

export const Shelter = () => {
  const {session, accesses} = useSession()
  const canOpen = useMemo(() => !!appFeaturesIndex.shelter.showIf?.(session, accesses), [accesses])
  return canOpen ? <ShelterWithAccess/> : <NoFeatureAccessPage/>
}

export const ShelterWithAccess = () => {
  const {session, accesses} = useSession()
  const schemaContext = useKoboSchemaContext()

  const {access, allowedOffices} = useMemo(() => {
    const dbAccesses = seq(accesses).filter(Access.filterByFeature(AppFeatureId.kobo_database))
    const allowedOffices = dbAccesses.flatMap(_ => {
      return _.params?.filters?.back_office as Shelter_NTA.T['back_office'][] | undefined
    }).compact()
    return {
      access: Access.toSum(dbAccesses, session.admin),
      allowedOffices,
    }
  }, [session, accesses])

  const fetcherData = useShelterData()

  useEffect(() => {
    schemaContext.fetchers.fetch({}, 'shelter_ta')
    schemaContext.fetchers.fetch({}, 'shelter_nta')
    fetcherData.fetchAll()
  }, [])

  return (
    <Router>
      <Layout
        loading={schemaContext.fetchers.anyLoading}
        title={appFeaturesIndex.shelter.name}
        sidebar={<ShelterSidebar/>}
        header={<AppHeader id="app-header"/>}
      >
        {schemaContext.schema.shelter_nta && schemaContext.schema.shelter_ta && (
          <ShelterProvider
            access={access}
            data={fetcherData}
            allowedOffices={allowedOffices}
            langIndex={schemaContext.langIndex}
            setLangIndex={schemaContext.setLangIndex}
            schemaNta={schemaContext.schema.shelter_nta}
            schemaTa={schemaContext.schema.shelter_ta}
          >
            <Routes>
              <Route index element={<Navigate to={shelterIndex.siteMap.data}/>}/>
              <Route path={shelterIndex.siteMap.dashboard} element={<ShelterDashboard/>}/>
              <Route path={shelterIndex.siteMap.data} element={<ShelterTable/>}/>
              {relatedKoboForms.map(_ =>
                <Route key={_} {...getKoboFormRouteProps({path: shelterIndex.siteMap.form(_), name: _})}/>
              )}
            </Routes>
          </ShelterProvider>
        )}
      </Layout>
    </Router>
  )
}



