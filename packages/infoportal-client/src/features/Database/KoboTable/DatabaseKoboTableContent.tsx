import {IpBtn} from '@/shared/Btn'
import React, {useMemo, useState} from 'react'
import {useI18n} from '@/core/i18n'
import {KoboAnswerFlat, KoboAnswerId} from 'infoportal-common'
import {AaSelect} from '@/shared/Select/Select'
import {renderExportKoboSchema} from '@/features/Database/KoboTable/DatabaseKoboTableExportBtn'
import {DatabaseKoboTableGroupModal} from '@/features/Database/KoboTable/DatabaseKoboTableGroupModal'
import {IpIconBtn} from '@/shared/IconBtn'
import {Alert, Icon, Switch, Theme, useTheme} from '@mui/material'
import {usePersistentState} from '@/shared/hook/usePersistantState'
import {DatabaseColumnProps, getColumnBySchema} from '@/features/Database/KoboTable/columns/getColumnBySchema'
import {useDatabaseKoboTableContext} from '@/features/Database/KoboTable/DatabaseKoboContext'
import {getColumnsCustom} from '@/features/Database/KoboTable/columns/getColumnsCustom'
import {DatabaseTableProps} from '@/features/Database/KoboTable/DatabaseKoboTable'
import {DatabaseKoboSyncBtn} from '@/features/Database/KoboTable/DatabaseKoboSyncBtn'
import {useKoboSchemaContext} from '@/features/KoboSchema/KoboSchemaContext'
import {Datatable} from '@/shared/Datatable/Datatable'
import {useCustomSelectedHeader} from '@/features/Database/KoboTable/customization/useCustomSelectedHeader'
import {useCustomHeader} from '@/features/Database/KoboTable/customization/useCustomHeader'
import {Enum, seq} from '@alexandreannic/ts-utils'
import {GenerateXlsFromArrayParams} from '@/shared/Datatable/util/generateXLSFile'
import {useKoboEditAnswerContext} from '@/core/context/KoboEditAnswersContext'
import {useKoboEditTagContext} from '@/core/context/KoboEditTagsContext'
import {useKoboAnswersContext} from '@/core/context/KoboAnswers'
import {DatatableColumnToggle} from '@/shared/Datatable/DatatableColumnsToggle'
import {DatatableHeadTypeIconByKoboType} from '@/shared/Datatable/DatatableHead'
import {appConfig} from '@/conf/AppConfig'
import {useSession} from '@/core/Session/SessionContext'
import {getColumnsBase} from '@/features/Database/KoboTable/columns/getColumnsBase'
// import { Alert } from '@/shared'

export const DatabaseKoboTableContent = ({
  onFiltersChange,
  onDataChange,
}: Pick<DatabaseTableProps, 'onFiltersChange' | 'onDataChange'>) => {
  const {m} = useI18n()
  const t = useTheme()
  const {session} = useSession()
  const ctx = useDatabaseKoboTableContext()
  const ctxSchema = useKoboSchemaContext()
  const ctxAnswers = useKoboAnswersContext()
  const ctxEditAnswer = useKoboEditAnswerContext()
  const ctxEditTag = useKoboEditTagContext()
  const [repeatGroupsAsColumns, setRepeatGroupAsColumns] = usePersistentState<boolean>(false, {storageKey: `database-${ctx.form.id}-repeat-groups`})
  const [selectedIds, setSelectedIds] = useState<KoboAnswerId[]>([])
  const [groupModalOpen, setOpenGroupModalAnswer] = useState<{
    columnId: string,
    group: KoboAnswerFlat[],
    event: any
  } | undefined>()

  const extraColumns = useMemo(() => getColumnsCustom({
    selectedIds,
    formId: ctx.form.id,
    canEdit: ctx.canEdit,
    m,
    asyncUpdateTagById: ctxEditTag.asyncUpdateById,
    openEditTag: ctxEditTag.open,
  }), [selectedIds, ctx.form.id])

  const schemaColumns = useMemo(() => {
    return getColumnBySchema({
      formId: ctx.form.id,
      selectedIds: selectedIds,
      data: ctx.data,
      schema: ctx.schema.schemaHelper.sanitizedSchema.content.survey,
      groupSchemas: ctx.schema.schemaHelper.groupSchemas,
      translateQuestion: ctx.schema.translate.question,
      translateChoice: ctx.schema.translate.choice,
      choicesIndex: ctx.schema.schemaHelper.choicesIndex,
      m,
      externalFilesIndex: ctx.externalFilesIndex,
      repeatGroupsAsColumn: repeatGroupsAsColumns,
      onOpenGroupModal: setOpenGroupModalAnswer,
      onSelectColumn: (columnName: string) => ctxEditAnswer.open({
        formId: ctx.form.id,
        question: columnName,
        answerIds: selectedIds,
      })
    })
  }, [ctx.schema.schemaUnsanitized, ctxSchema.langIndex, selectedIds, repeatGroupsAsColumns, ctx.externalFilesIndex])

  const columns: DatabaseColumnProps<any>[] = useMemo(() => {
    const base = getColumnsBase({
      selectedIds,
      formId: ctx.form.id,
      canEdit: ctx.canEdit,
      m,
      openAnswerModal: ctxAnswers.openAnswerModal,
      asyncEdit: ctx.asyncEdit,
      asyncUpdateTagById: ctxEditTag.asyncUpdateById,
      openEditTag: ctxEditTag.open,
    })
    return [...base, ...extraColumns, ...schemaColumns]
  }, [schemaColumns])

  const toggleColumns = useMemo(() => {
    return columns.map(_ => {
      return {
        ..._,
        type: _.koboType,
        typeLabel: _.koboType && <DatatableHeadTypeIconByKoboType color="disabled" children={_.koboType}/>
      }
    })
  }, [columns])

  const selectedHeader = useCustomSelectedHeader(selectedIds)
  const header = useCustomHeader()
  const [hiddenColumns, setHiddenColumns] = usePersistentState<string[]>([], {storageKey: 'database-' + ctx.form.id})

  return (
    <>
      <Datatable
        loading={ctx.loading}
        defaultHiddenColumns={hiddenColumns}
        hideColumnsToggle
        contentProps={{sx: {maxHeight: 'calc(100vh - 211px)'}}}
        showExportBtn
        rowsPerPageOptions={[20, 50, 100, 200]}
        onFiltersChange={onFiltersChange}
        onDataChange={onDataChange}
        select={ctx.canEdit ? {
          onSelect: setSelectedIds,
          selectActions: selectedHeader,
          getId: _ => _.id,
        } : undefined}
        exportAdditionalSheets={data => {
          const questionToAddInGroups = ctx.schema.schemaHelper.sanitizedSchema.content.survey.filter(_ => ['id', 'submissionTime', 'start', 'end'].includes(_.name))
          return Enum.entries(ctx.schema.schemaHelper.groupSchemas).map(([groupName, questions]) => {
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
        data={ctx.data}
        header={params =>
          <>
            <DatatableColumnToggle
              columns={toggleColumns}
              hiddenColumns={hiddenColumns}
              onChange={setHiddenColumns}
            />
            <AaSelect<number>
              sx={{maxWidth: 128, mr: 1}}
              defaultValue={ctxSchema.langIndex}
              onChange={ctxSchema.setLangIndex}
              options={[
                {children: 'XML', value: -1},
                ...ctx.schema.schemaHelper.sanitizedSchema.content.translations.map((_, i) => ({children: _, value: i}))
              ]}
            />
            {ctx.schema.schemaHelper.groupsCount > 0 && (
              <IpBtn
                icon="move_up"
                variant="outlined"
                sx={{mr: 1}}
                iconSx={{color: (t: Theme) => t.palette.text.disabled, transform: 'rotate(90deg)'}}
                onClick={() => setRepeatGroupAsColumns(_ => !_)}
                tooltip={m._koboDatabase.repeatGroupsAsColumns}
              >
                <Switch size="small" sx={{mr: -1}} checked={repeatGroupsAsColumns}/>
              </IpBtn>
            )}
            {header?.(params)}

            {ctx.form.deploymentStatus === 'archived' && (
              <Alert color="info" icon={<Icon sx={{mr: -1}}>archive</Icon>} sx={{pr: t.spacing(1), pl: t.spacing(.5), pt: 0, pb: 0}}>
                {m._koboDatabase.isArchived}
              </Alert>
            )}

            <div style={{marginLeft: 'auto'}}>
              {session.admin && (
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

