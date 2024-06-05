import {IpBtn} from '@/shared/Btn'
import {TableIconBtn} from '@/features/Mpca/MpcaData/TableIcon'
import React, {useMemo, useState} from 'react'
import {useI18n} from '@/core/i18n'
import {KoboAnswerFlat, KoboAnswerId, KoboValidation} from '@infoportal-common'
import {AaSelect} from '@/shared/Select/Select'
import {renderExportKoboSchema} from '@/features/Database/KoboTable/DatabaseKoboTableExportBtn'
import {DatabaseKoboTableGroupModal} from '@/features/Database/KoboTable/DatabaseKoboTableGroupModal'
import {IpIconBtn} from '@/shared/IconBtn'
import {Switch, Theme} from '@mui/material'
import {usePersistentState} from '@/shared/hook/usePersistantState'
import {DatabaseColumnProps, getColumnBySchema} from '@/features/Database/KoboTable/getColumnBySchema'
import {useDatabaseKoboTableContext} from '@/features/Database/KoboTable/DatabaseKoboContext'
import {useCustomColumns} from '@/features/Database/KoboTable/customization/useCustomColumns'
import {DatabaseTableProps} from '@/features/Database/KoboTable/DatabaseKoboTable'
import {DatabaseKoboSyncBtn} from '@/features/Database/KoboTable/DatabaseKoboSyncBtn'
import {useKoboSchemaContext} from '@/features/KoboSchema/KoboSchemaContext'
import {Datatable} from '@/shared/Datatable/Datatable'
import {DatatableColumn} from '@/shared/Datatable/util/datatableType'
import {DatatableUtils} from '@/shared/Datatable/util/datatableUtils'
import {useCustomSelectedHeader} from '@/features/Database/KoboTable/customization/useCustomSelectedHeader'
import {useCustomHeader} from '@/features/Database/KoboTable/customization/useCustomHeader'
import {OptionLabelTypeCompact, SelectStatusBy, SelectStatusConfig} from '@/shared/customInput/SelectStatus'
import {Enum, Obj, seq} from '@alexandreannic/ts-utils'
import {GenerateXlsFromArrayParams} from '@/shared/Sheet/util/generateXLSFile'
import {useKoboEditAnswerContext} from '@/core/context/KoboEditAnswersContext'
import {useKoboEditTagContext} from '@/core/context/KoboEditTagsContext'
import {TableEditCellBtn} from '@/shared/TableEditCellBtn'
import {useKoboAnswersContext} from '@/core/context/KoboAnswers'
import {DatatableColumnToggle} from '@/shared/Datatable/DatatableColumnsToggle'
import {DatatableHeadTypeIconByKoboType} from '@/shared/Datatable/DatatableHead'
import {appConfig} from '@/conf/AppConfig'
import {useSession} from '@/core/Session/SessionContext'

export const DatabaseKoboTableContent = ({
  onFiltersChange,
  onDataChange,
}: Pick<DatabaseTableProps, 'onFiltersChange' | 'onDataChange'>) => {
  const {m} = useI18n()
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

  const extraColumns = useCustomColumns({selectedIds})
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
    const action: DatatableColumn.Props<any> = {
      id: 'actions',
      head: '',
      width: 0,
      noCsvExport: true,
      render: _ => {
        return {
          value: null as any,
          label: (
            <>
              <TableIconBtn tooltip={m.view} children="visibility" onClick={() => ctxAnswers.openAnswerModal({answer: _, formId: ctx.form.id})}/>
              <TableIconBtn disabled={!ctx.canEdit} tooltip={m.editKobo} target="_blank" href={ctx.asyncEdit(_.id)} children="edit"/>
            </>
          )
        }
      }
    }
    const validation: DatatableColumn.Props<any> = {
      id: 'validation',
      head: m.validation,
      subHeader: selectedIds.length > 0 && <TableEditCellBtn onClick={() => ctxEditTag.open({
        formId: ctx.form.id,
        answerIds: selectedIds,
        type: 'select_one',
        options: Obj.values(KoboValidation).map(_ => ({
          value: _, label: _, before: <OptionLabelTypeCompact sx={{alignSelf: 'center', mr: 1}} type={SelectStatusConfig.statusType.KoboValidation[_]}/>
        })),
        tag: '_validation',
      })}/>,
      width: 0,
      type: 'select_one',
      render: (row: KoboAnswerFlat) => {
        const value = row.tags?._validation
        return {
          export: value ? m[value] : DatatableUtils.blank,
          value: value ?? DatatableUtils.blank,
          option: value ? m[value] : DatatableUtils.blank,
          label: (
            <SelectStatusBy
              enum="KoboValidation"
              compact
              disabled={!ctx.canEdit}
              value={value}
              onChange={(e) => {
                ctxEditTag.asyncUpdateById.call({
                  formId: ctx.form.id,
                  answerIds: [row.id],
                  tag: '_validation',
                  value: e,
                })
              }}
            />
          )
        }
      }
    }
    return [action, validation, ...extraColumns, ...schemaColumns]
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
        contentProps={{sx: {maxHeight: 'calc(100vh - 204px)'}}}
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
                href={ctx.schema.schemaUnsanitized.deployment__links.url}
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
