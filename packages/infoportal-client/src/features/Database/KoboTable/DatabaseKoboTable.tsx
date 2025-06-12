import {useCallback, useEffect, useMemo} from 'react'
import {map} from '@axanc/ts-utils'
import {Skeleton} from '@mui/material'
import {Kobo} from 'kobo-sdk'
import {useParams} from 'react-router-dom'

import {useAppSettings} from '@/core/context/ConfigContext'
import {useKoboAnswersContext} from '@/core/context/KoboAnswersContext'
import {DatatableSkeleton} from '@/shared/Datatable/DatatableSkeleton'
import {useSession} from '@/core/Session/SessionContext'
import {ApiPaginate} from '@/core/sdk/server/_core/ApiSdkUtils'
import {Access, AccessLevel} from '@/core/sdk/server/access/Access'
import {KoboForm, KoboMappedAnswer} from '@/core/sdk/server/kobo/KoboMapper'
import {AppFeatureId} from '@/features/appFeatureId'
import {databaseUrlParamsValidation} from '@/features/Database/Database'
import {useDatabaseContext} from '@/features/Database/DatabaseContext'
import {DatabaseKoboTableProvider} from '@/features/Database/KoboTable/DatabaseKoboContext'
import {DatabaseKoboTableContent} from '@/features/Database/KoboTable/DatabaseKoboTableContent'
import {useKoboSchemaContext} from '@/features/KoboSchema/KoboSchemaContext'
import {DatatableFilterValue} from '@/shared/Datatable/util/datatableType'
import {Page} from '@/shared/Page'
import {Panel} from '@/shared/Panel'
import {useFetcher} from '@/shared/hook/useFetcher'
import {FetchParams} from '@/shared/hook/useFetchers'

export const DatabaseTableRoute = () => {
  const ctx = useDatabaseContext()
  const {formId} = databaseUrlParamsValidation.validateSync(useParams())
  return (
    <>
      {map(ctx.getForm(formId), (form) => (
        <Page width="full" sx={{p: 0, pb: 0, mb: 0}}>
          <Panel sx={{mb: 0}}>
            <DatabaseTable form={form} formId={formId} />
          </Panel>
        </Page>
      ))}
    </>
  )
}

export interface DatabaseTableProps {
  form?: KoboForm
  formId: Kobo.FormId
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
  const fetcherAnswers = useKoboAnswersContext().byId(formId)
  const fetcherForm = useFetcher(() => (form ? Promise.resolve(form) : api.kobo.form.get(formId)))

  const access = useMemo(() => {
    const list = accesses
      .filter(Access.filterByFeature(AppFeatureId.kobo_database))
      .filter((_) => _.params?.koboFormId === formId)
    const admin = session.admin || !!list.find((_) => _.level === AccessLevel.Admin)
    const write = admin || !!list.find((_) => _.level === AccessLevel.Write)
    const read = write || list.length > 0
    return {admin, write, read}
  }, [accesses])

  useEffect(() => {
    fetcherForm.fetch()
    fetcherAnswers.fetch({force: true, clean: true})
    ctxSchema.fetchById(formId)
  }, [formId])

  const loading = fetcherAnswers.loading
  const refetch = useCallback(
    async (p: FetchParams = {}) => {
      await fetcherAnswers.fetch(p)
    },
    [formId],
  )

  return (
    <>
      {ctxSchema.anyLoading && loading && (
        <>
          <Skeleton sx={{mx: 1, height: 54}} />
          <DatatableSkeleton />
        </>
      )}
      {map(fetcherForm.get, ctxSchema.byId[formId]?.get, (form, schema) => (
        <DatabaseKoboTableProvider
          schema={schema}
          dataFilter={dataFilter}
          access={access}
          refetch={refetch}
          loading={loading}
          data={fetcherAnswers.get?.data}
          form={form}
        >
          <DatabaseKoboTableContent onFiltersChange={onFiltersChange} onDataChange={onDataChange} />
        </DatabaseKoboTableProvider>
      ))}
    </>
  )
}
