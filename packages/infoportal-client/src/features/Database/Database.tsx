import {useAppSettings} from '@/core/context/ConfigContext'
import React, {useEffect, useMemo} from 'react'
import {Sidebar, SidebarItem} from '@/shared/Layout/Sidebar'
import {useI18n} from '@/core/i18n'
import * as yup from 'yup'
import {databaseIndex} from '@/features/Database/databaseIndex'
import {Navigate, NavLink, Outlet, Route, Routes} from 'react-router-dom'
import {AppHeader} from '@/shared/Layout/Header/AppHeader'
import {Layout} from '@/shared/Layout'
import {Icon, Skeleton, Tab, Tabs, Tooltip} from '@mui/material'
import {useLocation, useParams} from 'react-router'
import {IpBtn} from '@/shared/Btn'
import {DatabaseNew} from '@/features/Database/DatabaseNew/DatabaseNew'
import {DatabaseProvider, useDatabaseContext} from '@/features/Database/DatabaseContext'
import {DatabaseAccessRoute} from '@/features/Database/Access/DatabaseAccess'
import {DatabaseTableRoute} from '@/features/Database/KoboTable/DatabaseKoboTable'
import {Txt} from '@/shared'
import {useLayoutContext} from '@/shared/Layout/LayoutContext'
import {Obj, Seq, seq} from '@alexandreannic/ts-utils'
import {SidebarSection} from '@/shared/Layout/Sidebar/SidebarSection'
import {DatabaseList} from '@/features/Database/DatabaseList'
import {DatabaseKoboAnswerViewPage} from '@/features/Database/KoboEntry/DatabaseKoboAnswerView'
import {DatabaseHistory} from '@/features/Database/History/DatabaseHistory'
import {customForms, DatabaseTableCustomRoute} from '@/features/Database/KoboTableCustom/DatabaseKoboTableCustom'
import {IpIconBtn} from '@/shared/IconBtn'
import {useAsync} from '@/shared/hook/useAsync'
import {KoboIndex} from 'infoportal-common'
import {KoboForm} from '@/core/sdk/server/kobo/Kobo'
import {Fender} from '@/shared/Fender'
import {useReactRouterDefaultRoute} from '@/core/useReactRouterDefaultRoute'
import {useKoboSchemaContext} from '@/features/KoboSchema/KoboSchemaContext'
import {appConfig} from '@/conf/AppConfig'
import {useKoboAnswersContext} from '@/core/context/KoboAnswersContext'
import {DatabaseKoboRepeatRoute} from '@/features/Database/RepeatGroup/DatabaseKoboRepeatGroup'

export const databaseUrlParamsValidation = yup.object({
  formId: yup.string().required(),
})

export const Database = () => {
  return (
    <DatabaseProvider>
      <DatabaseWithContext/>
    </DatabaseProvider>
  )
}

type Form = KoboForm & {
  parsedName: KoboIndex.ParsedForm
}

export const DatabaseWithContext = () => {
  const {m} = useI18n()
  const {conf, api} = useAppSettings()
  const ctx = useDatabaseContext()
  useReactRouterDefaultRoute(databaseIndex.siteMap.index)
  const parsedFormNames: Record<string, Seq<Form>> = useMemo(() => {
    const grouped = seq(ctx.formAccess)?.map(_ => ({..._, parsedName: KoboIndex.parseFormName(_.name)})).groupBy(_ => _.parsedName.program ?? m.others)
    return new Obj(grouped).map((k, v) => [k, v.sort((a, b) => a.name.localeCompare(b.name))]).sort(([ak], [bk]) => ak.localeCompare(bk)).get()
  }, [ctx.formAccess])

  const asyncSyncAll = useAsync(api.kobo.form.refreshAll)

  return (
    <Layout
      title={m._koboDatabase.title()}
      sidebar={
        <Sidebar headerId="app-header">
          <NavLink to={databaseIndex.siteMap.index}>
            {({isActive, isPending}) => (
              <SidebarItem icon="home">
                All forms
                {ctx.isAdmin && (
                  <IpIconBtn
                    sx={{ml: 'auto'}}
                    color="primary"
                    loading={asyncSyncAll.loading}
                    onClick={asyncSyncAll.call}
                  >
                    refresh
                  </IpIconBtn>
                )}
                {ctx.isAdmin && (
                  <DatabaseNew onAdded={() => ctx._forms.fetch({force: true, clean: false})}>
                    <IpBtn size="small" sx={{my: '1px'}} variant="contained" tooltip={m._koboDatabase.registerNewForm}>
                      <Icon>add</Icon>
                    </IpBtn>
                  </DatabaseNew>
                )}
              </SidebarItem>
            )}
          </NavLink>
          <SidebarSection dense title={m.customDb}>
            {customForms.map(_ => (
              <NavLink to={databaseIndex.siteMap.custom(_.id)} key={_.id}>
                <SidebarItem onClick={() => undefined} icon="join_inner" size="small">
                  {_.name}
                </SidebarItem>
              </NavLink>
            ))}
          </SidebarSection>
          {ctx._forms.loading ? (
            <>
              <SidebarItem>
                <Skeleton sx={{width: 160, height: 30}}/>
              </SidebarItem>
              <SidebarItem>
                <Skeleton sx={{width: 160, height: 30}}/>
              </SidebarItem>
              <SidebarItem>
                <Skeleton sx={{width: 160, height: 30}}/>
              </SidebarItem>
            </>
          ) : Obj.entries(parsedFormNames)?.map(([category, forms]) => (
            <SidebarSection dense title={category} key={category}>
              {forms.map((_: Form) =>
                <Tooltip key={_.id} title={_.parsedName.name} placement="right-end">
                  <NavLink to={databaseIndex.siteMap.home(_.id)}>
                    {({isActive, isPending}) => (
                      <SidebarItem
                        size={forms.length > 30 ? 'tiny' : 'small'}
                        sx={{height: 26}}
                        onClick={() => undefined}
                        key={_.id}
                        active={isActive}
                        iconEnd={_.deploymentStatus === 'archived' ? (
                          <Icon
                            fontSize="small"
                            color="disabled"
                            sx={{marginLeft: '4px', marginRight: '-4px', verticalAlign: 'middle'}}
                          >archive</Icon>
                        ) : undefined}
                      >
                        <Txt color={_.deploymentStatus === 'archived' ? 'disabled' : undefined}>{_.parsedName.name}</Txt>
                      </SidebarItem>
                    )}
                  </NavLink>
                </Tooltip>
              )}
            </SidebarSection>
          ))}
        </Sidebar>
      }
      header={<AppHeader id="app-header"/>}
    >
      {ctx.formAccess?.length === 0 && (
        <Fender type="empty" sx={{mt: 2}}>
          <Txt block color="disabled" size="big">{m._koboDatabase.noAccessToForm}</Txt>
          <Txt block color="disabled" dangerouslySetInnerHTML={{__html: m.contact(conf.contact)}}/>
        </Fender>
      )}
      <Routes>
        <Route path={databaseIndex.siteMap.index} element={<DatabaseList forms={ctx.formAccess}/>}/>
        <Route path={databaseIndex.siteMap.custom()} element={<DatabaseTableCustomRoute/>}/>
        <Route path={databaseIndex.siteMap.home()} element={<DatabaseHome/>}>
          <Route index element={<Navigate to={databaseIndex.siteMap.database.relative}/>}/>
          <Route path={databaseIndex.siteMap.answer.relative()} element={<DatabaseKoboAnswerViewPage/>}/>
          <Route path={databaseIndex.siteMap.access.relative} element={<DatabaseAccessRoute/>}/>
          <Route path={databaseIndex.siteMap.history.relative} element={<DatabaseHistory/>}/>
          <Route path={databaseIndex.siteMap.group.relative()} element={<DatabaseKoboRepeatRoute/>}/>
          {/*Persisted components across routes: */}
          <Route path={databaseIndex.siteMap.database.relative} element={<></>}/>
        </Route>
      </Routes>
    </Layout>
  )
}

export const DatabaseHome = () => {
  const {formId} = databaseUrlParamsValidation.validateSync(useParams())
  const {m} = useI18n()
  const {setTitle} = useLayoutContext()
  const ctx = useDatabaseContext()
  const ctxSchema = useKoboSchemaContext()
  const fetcherAnswers = useKoboAnswersContext().byId(formId)
  const {pathname} = useLocation()

  useEffect(() => {
    if (ctx.getForm(formId)?.name) setTitle(m._koboDatabase.title(ctx.getForm(formId)?.name))
    ctxSchema.fetchById(formId)
    fetcherAnswers.fetch({force: false})
  }, [formId])

  const schema = ctxSchema.byId[formId]?.get
  const repeatGroups = useMemo(() => {
    return schema?.helper.group.search().map(_ => _.name)
  }, [schema])

  return (
    <>
      <Tabs
        variant="scrollable"
        scrollButtons="auto"
        value={pathname}
        sx={{
          borderBottom: t => `1px solid ${t.palette.divider}`
        }}
      >
        <Tab
          icon={<Icon>{appConfig.icons.dataTable}</Icon>}
          iconPosition="start"
          sx={{minHeight: 34, py: 1}}
          component={NavLink}
          value={databaseIndex.siteMap.database.absolute(formId)}
          to={databaseIndex.siteMap.database.absolute(formId)}
          label={m.data}
        />
        <Tab
          icon={<Icon>lock</Icon>}
          iconPosition="start"
          sx={{minHeight: 34, py: 1}}
          component={NavLink}
          value={databaseIndex.siteMap.access.absolute(formId)}
          to={databaseIndex.siteMap.access.absolute(formId)}
          label={m.access}
        />
        <Tab
          icon={<Icon>history</Icon>}
          iconPosition="start"
          sx={{minHeight: 34, py: 1}}
          component={NavLink}
          value={databaseIndex.siteMap.history.absolute(formId)}
          to={databaseIndex.siteMap.history.absolute(formId)}
          label={m.history}
        />
        {schema && repeatGroups?.map((_ =>
            <Tab
              icon={<Icon color="disabled">repeat</Icon>}
              iconPosition="start"
              key={_}
              sx={{minHeight: 34, py: 1}}
              component={NavLink}
              value={databaseIndex.siteMap.group.absolute(formId, _)}
              to={databaseIndex.siteMap.group.absolute(formId, _)}
              label={schema.translate.question(_)}
            />
        ))}
      </Tabs>
      <div style={{display: pathname === databaseIndex.siteMap.database.absolute(formId) ? 'block' : 'none'}}>
        <DatabaseTableRoute/>
      </div>
      <Outlet/>
    </>
  )
}

