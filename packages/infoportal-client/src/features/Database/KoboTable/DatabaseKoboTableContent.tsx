import React, {useMemo, useState} from 'react'
import {useI18n} from '@/core/i18n'
import {KoboAnswerFlat, KoboAnswerId} from 'infoportal-common'
import {renderExportKoboSchema} from '@/features/Database/KoboTable/DatabaseKoboTableExportBtn'
import {DatabaseKoboTableGroupModal} from '@/features/Database/KoboTable/DatabaseKoboTableGroupModal'
import {IpIconBtn} from '@/shared/IconBtn'
import {Alert, Icon, useTheme} from '@mui/material'
import {getColumnBySchema} from '@/features/Database/KoboTable/columns/getColumnBySchema'
import {useDatabaseKoboTableContext} from '@/features/Database/KoboTable/DatabaseKoboContext'
import {getColumnsCustom} from '@/features/Database/KoboTable/columns/getColumnsCustom'
import {DatabaseTableProps} from '@/features/Database/KoboTable/DatabaseKoboTable'
import {DatabaseKoboSyncBtn} from '@/features/Database/KoboTable/DatabaseKoboSyncBtn'
import {useKoboSchemaContext} from '@/features/KoboSchema/KoboSchemaContext'
import {Datatable} from '@/shared/Datatable/Datatable'
import {useCustomSelectedHeader} from '@/features/Database/KoboTable/customization/useCustomSelectedHeader'
import {useCustomHeader} from '@/features/Database/KoboTable/customization/useCustomHeader'
import {Obj, seq} from '@alexandreannic/ts-utils'
import {GenerateXlsFromArrayParams} from '@/shared/Datatable/util/generateXLSFile'
import {useKoboEditAnswerContext} from '@/core/context/KoboEditAnswersContext'
import {useKoboEditTagContext} from '@/core/context/KoboEditTagsContext'
import {useKoboAnswersContext} from '@/core/context/KoboAnswersContext'
import {appConfig} from '@/conf/AppConfig'
import {getColumnsBase} from '@/features/Database/KoboTable/columns/getColumnsBase'
import {IpSelectSingle} from '@/shared/Select/SelectSingle'
import {DatabaseViewInput} from '@/features/Database/KoboTable/view/DatabaseViewInput'
import {DatatableColumn} from '@/shared/Datatable/util/datatableType'
import {DatatableHeadIconByType} from '@/shared/Datatable/DatatableHead'
import {KoboMappedAnswer} from '@/core/sdk/server/kobo/Kobo'
import {DatabaseGroupDisplayInput} from '@/features/Database/KoboTable/groupDisplay/DatabaseGroupDisplayInput'

export const DatabaseKoboTableContent = ({
  onFiltersChange,
  onDataChange,
}: Pick<DatabaseTableProps, 'onFiltersChange' | 'onDataChange'>) => {
  const {m} = useI18n()
  const t = useTheme()
  const ctx = useDatabaseKoboTableContext()
  const ctxSchema = useKoboSchemaContext()
  const ctxAnswers = useKoboAnswersContext()
  const ctxEditAnswer = useKoboEditAnswerContext()
  const ctxEditTag = useKoboEditTagContext()
  const [selectedIds, setSelectedIds] = useState<KoboAnswerId[]>([])
  const [groupModalOpen, setOpenGroupModalAnswer] = useState<{
    columnId: string,
    group: KoboAnswerFlat[],
    event: any
  } | undefined>()

  const flatData = useMemo(() => {
    if (ctx.groupDisplay.repeatAs !== 'rows' || ctx.groupDisplay.repeatedQuestion === 'undefined') return ctx.data
    return ctx.data?.flatMap(answer => {
      if (answer[ctx.groupDisplay.repeatedQuestion!])
        return (answer[ctx.groupDisplay.repeatedQuestion!] as KoboMappedAnswer[]).map((_, i) => ({
          ..._,
          ...answer,
          id: answer.id + '-' + i,
        }) as KoboMappedAnswer)
      return answer
    })
  }, [ctx.data, ctx.groupDisplay.repeatAs, ctx.groupDisplay.repeatedQuestion])

  const extraColumns: DatatableColumn.Props<any>[] = useMemo(() => getColumnsCustom({
    selectedIds,
    formId: ctx.form.id,
    canEdit: ctx.access.write,
    m,
    asyncUpdateTagById: ctxEditTag.asyncUpdateById,
    openEditTag: ctxEditTag.open,
  }).map(_ => ({
    ..._,
    typeIcon: <DatatableHeadIconByType type={_.type}/>
  })), [selectedIds, ctx.form.id])

  const schemaColumns = useMemo(() => {
    return getColumnBySchema({
      formId: ctx.form.id,
      selectedIds: selectedIds,
      data: ctx.data,
      theme: t,
      schema: ctx.schema.schemaHelper.sanitizedSchema.content.survey,
      groupSchemas: ctx.schema.schemaHelper.groupSchemas,
      translateQuestion: ctx.schema.translate.question,
      translateChoice: ctx.schema.translate.choice,
      choicesIndex: ctx.schema.schemaHelper.choicesIndex,
      m,
      externalFilesIndex: ctx.externalFilesIndex,
      repeatAs: ctx.groupDisplay.repeatAs,
      repeatedQuestion: ctx.groupDisplay.repeatedQuestion,
      onOpenGroupModal: setOpenGroupModalAnswer,
      onSelectColumn: (columnName: string) => ctxEditAnswer.open({
        formId: ctx.form.id,
        question: columnName,
        answerIds: selectedIds,
      })
    })
  }, [
    ctx.schema.schemaUnsanitized,
    ctxSchema.langIndex,
    selectedIds,
    ctx.groupDisplay.repeatAs,
    ctx.groupDisplay.repeatedQuestion,
    ctx.externalFilesIndex,
    t
  ])

  const columns: DatatableColumn.Props<any>[] = useMemo(() => {
    const base = getColumnsBase({
      selectedIds,
      formId: ctx.form.id,
      canEdit: ctx.access.write,
      m,
      openAnswerModal: ctxAnswers.openAnswerModal,
      asyncEdit: ctx.asyncEdit,
      asyncUpdateTagById: ctxEditTag.asyncUpdateById,
      openEditTag: ctxEditTag.open,
    })
    return [...base, ...extraColumns, ...schemaColumns].map(_ => ({
      ..._,
      width: ctx.view.colsById[_.id]?.width ?? _.width ?? 90,
    }))
  }, [schemaColumns, ctx.view.currentView])

  const selectedHeader = useCustomSelectedHeader({access: ctx.access, formId: ctx.form.id, selectedIds})
  const header = useCustomHeader()

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
        select={ctx.access.write ? {
          onSelect: setSelectedIds,
          selectActions: selectedHeader,
          getId: _ => _.id,
        } : undefined}
        exportAdditionalSheets={data => {
          const questionToAddInGroups = ctx.schema.schemaHelper.sanitizedSchema.content.survey.filter(_ => ['id', 'submissionTime', 'start', 'end'].includes(_.name!))
          return Obj.entries(ctx.schema.schemaHelper.groupSchemas).map(([groupName, questions]) => {
            const _: GenerateXlsFromArrayParams<any> = {
              sheetName: groupName as string,
              data: seq(data).flatMap(d => (d[groupName] as any[])?.map(_ => ({
                ..._,
                id: d.id,
                start: d.start,
                end: d.end,
                submissionTime: d.submissionTime,
              }))).compact(),
              schema: renderExportKoboSchema({
                formId: ctx.form.id,
                schema: [...questionToAddInGroups, ...questions],
                groupSchemas: ctx.schema.schemaHelper.groupSchemas,
                translateQuestion: ctx.schema.translate.question,
                translateChoice: ctx.schema.translate.choice,
              })
            }
            return _
          })
        }}
        title={ctx.form.name}
        id={ctx.form.id}
        getRenderRowKey={_ => _.id}
        columns={columns}
        data={flatData}
        header={params =>
          <>
            <DatabaseViewInput sx={{mr: 1}} view={ctx.view}/>
            <IpSelectSingle<number>
              hideNullOption
              sx={{maxWidth: 128, mr: 1}}
              defaultValue={ctxSchema.langIndex}
              onChange={ctxSchema.setLangIndex}
              options={[
                {children: 'XML', value: -1},
                ...ctx.schema.schemaHelper.sanitizedSchema.content.translations.map((_, i) => ({children: _, value: i}))
              ]}
            />
            <DatabaseGroupDisplayInput sx={{mr: 1}}/>
            {header?.(params)}
            {ctx.form.deploymentStatus === 'archived' && (
              <Alert color="info" icon={<Icon sx={{mr: -1}}>archive</Icon>} sx={{pr: t.spacing(1), pl: t.spacing(.5), pt: 0, pb: 0}}>
                {m._koboDatabase.isArchived}
              </Alert>
            )}

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
                href={ctx.schema.schemaUnsanitized.deployment__links.offline_url}
                target="_blank"
                children="file_open"
                tooltip={m._koboDatabase.openKoboForm}
              />
              <DatabaseKoboSyncBtn
                loading={ctx.asyncRefresh.loading}
                tooltip={<div dangerouslySetInnerHTML={{__html: m._koboDatabase.pullDataAt(ctx.form.updatedAt)}}/>}
                onClick={ctx.asyncRefresh.call}
              />
            </div>
          </>
        }
      />
      {groupModalOpen && (
        <DatabaseKoboTableGroupModal
          name={groupModalOpen.columnId}
          anchorEl={groupModalOpen.event.target}
          groupData={groupModalOpen.group}
          onClose={() => setOpenGroupModalAnswer(undefined)}
        />
      )}
    </>
  )
}
