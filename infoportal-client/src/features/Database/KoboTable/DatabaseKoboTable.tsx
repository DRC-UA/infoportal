import React, {useCallback, useEffect, useMemo} from 'react'
import {useDatabaseContext} from '@/features/Database/DatabaseContext'
import {useParams} from 'react-router'
import {useAppSettings} from '@/core/context/ConfigContext'
import {map} from '@alexandreannic/ts-utils'
import {Page} from '@/shared/Page'
import {Panel} from '@/shared/Panel'
import {databaseUrlParamsValidation} from '@/features/Database/Database'
import {DatabaseKoboTableContent} from '@/features/Database/KoboTable/DatabaseKoboTableContent'
import {useSession} from '@/core/Session/SessionContext'
import {Access, AccessLevel} from '@/core/sdk/server/access/Access'
import {AppFeatureId} from '@/features/appFeatureId'
import {DatabaseKoboTableProvider} from '@/features/Database/KoboTable/DatabaseKoboContext'
import {KoboId, koboIndex, UUID} from '@infoportal-common'
import {KoboForm, KoboMappedAnswer} from '@/core/sdk/server/kobo/Kobo'
import {Skeleton} from '@mui/material'
import {DatatableFilterValue} from '@/shared/Datatable/util/datatableType'
import {useFetcher} from '@/shared/hook/useFetcher'
import {useKoboSchemaContext} from '@/features/KoboSchema/KoboSchemaContext'
import {ApiPaginate} from '@/core/sdk/server/_core/ApiSdkUtils'
import {useKoboAnswersContext} from '@/core/context/KoboAnswers'
import {FetchParams} from '@/shared/hook/useFetchers'
import {DatatableSkeleton} from '@/shared/Datatable/DatatableSkeleton'

export const DatabaseTableRoute = () => {
  const ctx = useDatabaseContext()
  const {serverId, formId} = databaseUrlParamsValidation.validateSync(useParams())
  return (
    <>
      {map(ctx.getForm(formId), form =>
        <Page width="full" sx={{p: 0, pb: 0, mb: 0,}}>
          <Panel sx={{mb: 0}}>
            <DatabaseTable
              serverId={serverId}
              form={form}
              formId={formId}
            />
          </Panel>
        </Page>
      )}
    </>
  )
}

export interface DatabaseTableProps {
  form?: KoboForm
  serverId?: UUID
  formId: KoboId
  dataFilter?: (_: KoboMappedAnswer) => boolean
  onFiltersChange?: (_: Record<string, DatatableFilterValue>) => void
  onDataChange?: (_: {
    data?: KoboMappedAnswer[]
    filteredData?: KoboMappedAnswer[]
    filteredAndSortedData?: KoboMappedAnswer[]
    filteredSortedAndPaginatedData?: ApiPaginate<KoboMappedAnswer>
  }) => void
  overrideEditAccess?: boolean
}

export const DatabaseTable = ({
  serverId = koboIndex.drcUa.server.prod,
  form,
  formId,
  onFiltersChange,
  onDataChange,
  dataFilter,
  overrideEditAccess,
}: DatabaseTableProps) => {
  const {api} = useAppSettings()
  const {accesses, session} = useSession()
  const ctxSchema = useKoboSchemaContext()
  const ctxAnswers = useKoboAnswersContext()

  useEffect(() => {
    ctxSchema.fetchById(formId)
  }, [formId])

  const _form = useFetcher(() => form ? Promise.resolve(form) : api.kobo.form.get(formId))

  const access = useMemo(() => {
    const list = accesses.filter(Access.filterByFeature(AppFeatureId.kobo_database)).filter(_ => _.params?.koboFormId === formId)
    const admin = session.admin || !!list.find(_ => _.level === AccessLevel.Admin)
    const write = admin || !!list.find(_ => _.level === AccessLevel.Write)
    const read = write || list.length > 0
    return {admin, write, read}
  }, [accesses])

  useEffect(() => {
    ctxAnswers.byId.fetch({}, formId)
    _form.fetch()
  }, [serverId, formId])


  const loading = ctxAnswers.byId.loading(formId)
  const refetch = useCallback(async (p: FetchParams = {}) => {
    await ctxAnswers.byId.fetch(p, formId)
  }, [formId])

  return (
    <>
      {ctxSchema.anyLoading && loading && (
        <>
          <Skeleton sx={{mx: 1, height: 54}}/>
          <DatatableSkeleton/>
        </>
      )}
      {/*{(ctxSchema.anyLoading || loading) && !ctxAnswers.byId.get(formId) && (*/}
      {/*  <>*/}
      {/*  </>*/}
      {/*)}*/}
      {map(_form.get, ctxSchema.byId[formId]?.get, (form, schema) => (
        <DatabaseKoboTableProvider
          schema={schema}
          dataFilter={dataFilter}
          canEdit={overrideEditAccess ?? access.write}
          serverId={serverId}
          refetch={refetch}
          loading={loading}
          data={ctxAnswers.byId.get(formId)?.data}
          form={form}
        >
          <DatabaseKoboTableContent
            onFiltersChange={onFiltersChange}
            onDataChange={onDataChange}
          />
        </DatabaseKoboTableProvider>
      ))}
    </>
  )
}
