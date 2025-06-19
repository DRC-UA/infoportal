import {useMemo, useState} from 'react'
import {Alert, AlertProps, Icon, useTheme} from '@mui/material'
import {Kobo} from 'kobo-sdk'
import {useNavigate} from 'react-router-dom'

import {KoboFlattenRepeatedGroup, KoboIndex} from 'infoportal-common'
import {Legal_individual_aid} from 'infoportal-common/kobo/generated/Legal_individual_aid'

import {appConfig} from '@/conf/AppConfig'
import {useAppSettings} from '@/core/context/ConfigContext'
import {useKoboAnswersContext} from '@/core/context/KoboAnswersContext'
import {useKoboUpdateContext} from '@/core/context/KoboUpdateContext'
import {useI18n} from '@/core/i18n'
import {KoboMappedAnswer} from '@/core/sdk/server/kobo/KoboMapper'
import {useSession} from '@/core/Session/SessionContext'
import {useIpToast} from '@/core/useToast'
import {databaseIndex} from '@/features/Database/databaseIndex'
import {getColumnsBase} from '@/features/Database/KoboTable/columns/columnsBase'
import {columnBySchemaGenerator} from '@/features/Database/KoboTable/columns/columnBySchema'
import {getColumnsCustom} from '@/features/Database/KoboTable/columns/columnsCustom'
import {useCustomHeader} from '@/features/Database/KoboTable/customization/useCustomHeader'
import {useCustomSelectedHeader} from '@/features/Database/KoboTable/customization/useCustomSelectedHeader'
import {DatabaseImportBtn} from '@/features/Database/KoboTable/DatabaseImportBtn'
import {useDatabaseKoboTableContext} from '@/features/Database/KoboTable/DatabaseKoboContext'
import {DatabaseKoboSyncBtn} from '@/features/Database/KoboTable/DatabaseKoboSyncBtn'
import {DatabaseTableProps} from '@/features/Database/KoboTable/DatabaseKoboTable'
import {generateEmptyXlsTemplate} from '@/features/Database/KoboTable/generateEmptyXlsFile'
import {databaseKoboDisplayBuilder} from '@/features/Database/KoboTable/groupDisplay/DatabaseKoboDisplay'
import {DatabaseViewInput} from '@/features/Database/KoboTable/view/DatabaseViewInput'
import {getColumnsForRepeatGroup} from '@/features/Database/RepeatGroup/DatabaseKoboRepeatGroup'
import {useKoboSchemaContext} from '@/features/KoboSchema/KoboSchemaContext'
import {Datatable} from '@/shared/Datatable/Datatable'
import {DatatableHeadIconByType} from '@/shared/Datatable/DatatableHead'
import {DatatableColumn} from '@/shared/Datatable/util/datatableType'
import {DatatableXlsGenerator} from '@/shared/Datatable/util/generateXLSFile'
import {useAsync} from '@/shared/hook/useAsync'
import {IpIconBtn} from '@/shared/IconBtn'
import {IpSelectSingle} from '@/shared/Select/SelectSingle'

import {DatabaseGroupDisplayInput} from './groupDisplay/DatabaseGroupDisplayInput'

export const ArchiveAlert = ({sx, ...props}: AlertProps) => {
  const t = useTheme()
  const {m} = useI18n()
  return (
    <Alert
      color="info"
      icon={<Icon sx={{mr: -1}}>archive</Icon>}
      sx={{pr: t.spacing(1), pl: t.spacing(0.5), pt: 0, pb: 0, ...sx}}
      {...props}
    >
      {m._koboDatabase.isArchived}
    </Alert>
  )
}

export const DatabaseKoboTableContent = ({
  onFiltersChange,
  onDataChange,
}: Pick<DatabaseTableProps, 'onFiltersChange' | 'onDataChange'>) => {
  const {m} = useI18n()
  const t = useTheme()
  const navigate = useNavigate()
  const {session} = useSession()
  const ctx = useDatabaseKoboTableContext()
  const ctxSchema = useKoboSchemaContext()
  const ctxAnswers = useKoboAnswersContext()
  const ctxKoboUpdate = useKoboUpdateContext()
  const [selectedIds, setSelectedIds] = useState<Kobo.SubmissionId[]>([])

  const flatData: KoboMappedAnswer[] | undefined = useMemo(() => {
    if (ctx.groupDisplay.get.repeatAs !== 'rows' || ctx.groupDisplay.get.repeatGroupName === undefined) return ctx.data
    return KoboFlattenRepeatedGroup.run({
      data: ctx.data,
      path: [ctx.groupDisplay.get.repeatGroupName],
      replicateParentData: true,
    }) as (KoboFlattenRepeatedGroup.Cursor & KoboMappedAnswer)[]
  }, [ctx.data, ctx.groupDisplay.get])

  const customColumns: DatatableColumn.Props<any>[] = useMemo(
    () =>
      getColumnsCustom({
        selectedIds,
        formId: ctx.form.id,
        canEdit: ctx.access.write,
        m,
        ctxUpdate: ctxKoboUpdate,
      }).map((_) => ({
        ..._,
        typeIcon: <DatatableHeadIconByType type={_.type} />,
      })),
    [selectedIds, ctx.form.id],
  )

  const schemaColumns = useMemo(() => {
    const schemaColumns = columnBySchemaGenerator({
      formId: ctx.form.id,
      schema: ctx.schema,
      externalFilesIndex: ctx.externalFilesIndex,
      onRepeatGroupClick: (_) =>
        navigate(databaseIndex.siteMap.group.absolute(ctx.form.id, _.name, _.row.id, _.row._index)),
      onEdit:
        selectedIds.length > 0
          ? (questionName) =>
              ctxKoboUpdate.openById({
                target: 'answer',
                params: {
                  formId: ctx.form.id,
                  question: questionName,
                  answerIds: selectedIds,
                },
              })
          : undefined,
      m,
      t,
    }).getAll()

    const processedData = // sort subcases of Individual Legal Aid
      KoboIndex.byName('legal_individual_aid').id === ctx.form.id
        ? (ctx.data as unknown as Legal_individual_aid.T[])?.map((record) => {
            const cases: Legal_individual_aid.T['number_case'] = record.number_case && [...record.number_case]
            const assistanceIndex = cases?.findIndex(({beneficiary_application_type, status_case}) => {
              return beneficiary_application_type === 'assistance' && status_case === 'closed_ready'
            })

            // let's return early, if no complete assistance found, or found in the first record
            switch (assistanceIndex) {
              case undefined:
              case -1:
              case 0:
                return record
              default:
                const completeAssistance = cases!.splice(assistanceIndex, 1)[0] // safe to assert cases !== undefined, since assistanceIndex !== undefined
                cases!.unshift(completeAssistance)
                record.number_case = cases
                return record
            }
          })
        : ctx.data

    return databaseKoboDisplayBuilder({
      data: processedData ?? [],
      formId: ctx.form.id,
      schema: ctx.schema,
      onRepeatGroupClick: (_) =>
        navigate(databaseIndex.siteMap.group.absolute(ctx.form.id, _.name, _.row.id, _.row._index)),
      display: ctx.groupDisplay.get,
      m,
      t,
    }).transformColumns(schemaColumns)
  }, [ctx.data, ctx.schema.schema, ctxSchema.langIndex, selectedIds, ctx.groupDisplay.get, ctx.externalFilesIndex, t])

  const columns: DatatableColumn.Props<any>[] = useMemo(() => {
    const base = getColumnsBase({
      selectedIds,
      formId: ctx.form.id,
      canEdit: ctx.access.write,
      m,
      asyncEdit: ctx.asyncEdit,
      ctxEdit: ctxKoboUpdate,
      openViewAnswer: ctxAnswers.openView,
    })

    return [...base, ...customColumns, ...schemaColumns].map((_) => ({
      ..._,
      width: ctx.view.colsById[_.id]?.width ?? _.width ?? 90,
    }))
  }, [schemaColumns, ctx.view.currentView])

  const {api} = useAppSettings()
  const selectedHeader = useCustomSelectedHeader({access: ctx.access, formId: ctx.form.id, selectedIds})
  const header = useCustomHeader()
  const _importFromXLS = useAsync(api.importData.importFromXLSFile)
  const {toastHttpError} = useIpToast()

  const handleImportData = async (file: File, action: 'create' | 'update') => {
    await _importFromXLS.call(ctx.form.id, file, action).catch(toastHttpError)
  }

  const handleGenerateTemplate = async () => {
    if (ctx.schema && ctx.form) {
      await generateEmptyXlsTemplate(ctx.schema, ctx.form.name + '_Template')
    }
  }

  return (
    <>
      <Datatable
        onResizeColumn={ctx.view.onResizeColumn}
        loading={ctx.loading}
        columnsToggle={{
          disableAutoSave: true,
          hidden: ctx.view.hiddenColumns,
          onHide: ctx.view.setHiddenColumns,
        }}
        contentProps={{sx: {maxHeight: 'calc(100vh - 211px)'}}}
        showExportBtn
        rowsPerPageOptions={[20, 50, 100, 200]}
        onFiltersChange={onFiltersChange}
        onDataChange={onDataChange}
        select={
          ctx.access.write
            ? {
                onSelect: setSelectedIds,
                selectActions: selectedHeader,
                getId: (_) => _.id,
              }
            : undefined
        }
        exportAdditionalSheets={(data) => {
          return ctx.schema.helper.group.search().map((group) => {
            const cols = getColumnsForRepeatGroup({
              formId: ctx.form.id,
              t,
              m,
              schema: ctx.schema,
              groupName: group.name,
            })
            return {
              sheetName: group.name as string,
              data: KoboFlattenRepeatedGroup.run({data, path: group.pathArr}),
              schema: cols.map(DatatableXlsGenerator.columnsToParams),
            }
          })
        }}
        title={ctx.form.name}
        id={ctx.form.id}
        getRenderRowKey={(_) => _.id + (_._index ?? '')}
        columns={columns}
        data={flatData}
        header={(params) => (
          <>
            <DatabaseViewInput sx={{mr: 1}} view={ctx.view} />
            <IpSelectSingle<number>
              hideNullOption
              sx={{maxWidth: 128, mr: 1}}
              defaultValue={ctxSchema.langIndex}
              onChange={ctxSchema.setLangIndex}
              options={[
                {children: 'XML', value: -1},
                ...ctx.schema.schemaSanitized.content.translations.map((_, i) => ({children: _, value: i})),
              ]}
            />
            {ctx.schema.helper.group.size > 0 && <DatabaseGroupDisplayInput sx={{mr: 1}} />}
            {header?.(params)}
            {ctx.form.deploymentStatus === 'archived' && <ArchiveAlert />}

            <div style={{marginLeft: 'auto'}}>
              {ctx.access.admin && (
                <IpIconBtn
                  children="admin_panel_settings"
                  target="_blank"
                  href={appConfig.koboServerUrl + `/#/forms/${ctx.form.id}/landing`}
                  tooltip="Open Kobo admin"
                />
              )}
              <IpIconBtn
                disabled={ctx.form.deploymentStatus === 'archived'}
                href={ctx.schema.schema.deployment__links.offline_url}
                target="_blank"
                children="file_open"
                tooltip={m._koboDatabase.openKoboForm}
              />
              <DatabaseKoboSyncBtn
                loading={ctx.asyncRefresh.loading}
                tooltip={<div dangerouslySetInnerHTML={{__html: m._koboDatabase.pullDataAt(ctx.form.updatedAt)}} />}
                onClick={ctx.asyncRefresh.call}
              />
              {session.admin && (
                <DatabaseImportBtn
                  onUploadNewData={(file) => handleImportData(file, 'create')}
                  onUpdateExistingData={(file) => handleImportData(file, 'update')}
                  onGenerateTemplate={handleGenerateTemplate}
                />
              )}
            </div>
          </>
        )}
      />
    </>
  )
}
