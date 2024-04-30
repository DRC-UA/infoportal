import React, {useEffect, useMemo} from 'react'
import {useDatabaseContext} from '@/features/Database/DatabaseContext'
import {useParams} from 'react-router'
import {useAppSettings} from '@/core/context/ConfigContext'
import {useEffectFn} from '@alexandreannic/react-hooks-lib'
import {map} from '@alexandreannic/ts-utils'
import {Page} from '@/shared/Page'
import {Panel} from '@/shared/Panel'
import {databaseUrlParamsValidation} from '@/features/Database/Database'
import {useIpToast} from '@/core/useToast'
import {DatabaseKoboTableContent} from '@/features/Database/KoboTable/DatabaseKoboTableContent'
import {useSession} from '@/core/Session/SessionContext'
import {Access, AccessLevel} from '@/core/sdk/server/access/Access'
import {AppFeatureId} from '@/features/appFeatureId'
import {DatabaseKoboTableProvider} from '@/features/Database/KoboTable/DatabaseKoboContext'
import {KoboId, KoboIndex, koboIndex, UUID} from '@infoportal-common'
import {KoboForm, KoboMappedAnswer} from '@/core/sdk/server/kobo/Kobo'
import {Skeleton} from '@mui/material'
import {SheetFilterValue} from '@/shared/Sheet/util/sheetType'
import {SheetSkeleton} from '@/shared/Sheet/SheetSkeleton'
import {useFetcher} from '@/shared/hook/useFetcher'
import {KoboSchemaHelper} from '@/features/KoboSchema/koboSchemaHelper'
import {useI18n} from '@/core/i18n'
import {useKoboSchemaContext} from '@/features/KoboSchema/KoboSchemaContext'
import {ApiPaginate} from '@/core/sdk/server/_core/ApiSdkUtils'

export const DatabaseTableRoute = () => {
  const ctx = useDatabaseContext()
  const {serverId, formId} = databaseUrlParamsValidation.validateSync(useParams())
  return (
    <>
      {map(ctx.getForm(formId), form =>
        <Page width="full" sx={{p: 0}}>
          <Panel>
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
  onFiltersChange?: (_: Record<string, SheetFilterValue>) => void
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
  const {m} = useI18n()
  const {accesses, session} = useSession()
  const {toastHttpError} = useIpToast()
  const ctxSchema = useKoboSchemaContext()
  const fetcherSchemaIfUnknown = useFetcher(() => api.koboApi.getForm({serverId, id: formId}))
  const formName = KoboIndex.searchById(formId)?.name

  useEffect(function getSchema() {
    if (formName) ctxSchema.fetchers.fetch({force: false}, formName)
    else fetcherSchemaIfUnknown.fetch()
  }, [formId])

  const schemaBundle = useMemo(() => {
    return formName ? ctxSchema.schema[formName] : fetcherSchemaIfUnknown.get ? KoboSchemaHelper.buildBundle({
      m,
      schema: fetcherSchemaIfUnknown.get,
      langIndex: ctxSchema.langIndex
    }) : undefined
  }, [fetcherSchemaIfUnknown.get, ctxSchema.schema, ctxSchema.langIndex])

  const _form = useFetcher(() => form ? Promise.resolve(form) : api.kobo.form.get(formId))
  const _answers = useFetcher(() => api.kobo.answer.searchByAccess({formId}))

  const access = useMemo(() => {
    const list = accesses.filter(Access.filterByFeature(AppFeatureId.kobo_database)).filter(_ => _.params?.koboFormId === formId)
    const admin = session.admin || !!list.find(_ => _.level === AccessLevel.Admin)
    const write = admin || !!list.find(_ => _.level === AccessLevel.Write)
    const read = write || list.length > 0
    return {admin, write, read}
  }, [accesses])

  useEffect(() => {
    _answers.fetch({})
    _form.fetch()
  }, [serverId, formId])

  useEffectFn(_answers.error, toastHttpError)

  return (
    <>
      {(ctxSchema.fetchers.anyLoading || fetcherSchemaIfUnknown.loading || _answers.loading) && !_answers.get && (
        <>
          <Skeleton sx={{mx: 1, height: 54}}/>
          <SheetSkeleton/>
        </>
      )}
      {_answers.get && _form.get && schemaBundle && (
        <DatabaseKoboTableProvider
          schema={schemaBundle}
          dataFilter={dataFilter}
          canEdit={overrideEditAccess ?? access.write}
          serverId={serverId}
          fetcherAnswers={_answers}
          data={_answers.get?.data}
          form={_form.get!}
        >
          <DatabaseKoboTableContent
            onFiltersChange={onFiltersChange}
            onDataChange={onDataChange}
          />
        </DatabaseKoboTableProvider>
      )}
    </>
  )
}
