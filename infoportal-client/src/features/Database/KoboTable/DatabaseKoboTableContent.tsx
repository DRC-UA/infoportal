import {KoboAnswer} from '@/core/sdk/server/kobo/Kobo'
import {IpBtn} from '@/shared/Btn'
import {TableIconBtn} from '@/features/Mpca/MpcaData/TableIcon'
import React, {useMemo, useState} from 'react'
import {useI18n} from '@/core/i18n'
import {AaSelect} from '@/shared/Select/Select'
import {DatabaseKoboTableExportBtn, renderExportKoboSchema} from '@/features/Database/KoboTable/DatabaseKoboTableExportBtn'
import {DatabaseKoboTableGroupModal} from '@/features/Database/KoboTable/DatabaseKoboTableGroupModal'
import {IpIconBtn} from '@/shared/IconBtn'
import {DatabaseKoboAnswerView} from '@/features/Database/KoboEntry/DatabaseKoboAnswerView'
import {Switch, Theme, useTheme} from '@mui/material'
import {usePersistentState} from '@/shared/hook/usePersistantState'
import {getColumnBySchema} from '@/features/Database/KoboTable/getColumnBySchema'
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
import {DatatableKoboEditModal} from '@/features/Database/KoboTable/DatatableKoboEditModal'
import {SelectStatus, SelectStatusBy} from '@/shared/customInput/SelectStatus'
import {Enum, seq} from '@alexandreannic/ts-utils'
import {GenerateXlsFromArrayParams} from '@/shared/Sheet/util/generateXLSFile'

export const DatabaseKoboTableContent = ({
  onFiltersChange,
  onDataChange,
}: Pick<DatabaseTableProps, 'onFiltersChange' | 'onDataChange'>) => {
  const ctx = useDatabaseKoboTableContext()
  const {langIndex, setLangIndex} = useKoboSchemaContext()
  const {m} = useI18n()
  const theme = useTheme()
  const [repeatGroupsAsColumns, setRepeatGroupAsColumns] = usePersistentState<boolean>(false, {storageKey: `database-${ctx.form.id}-repeat-groups`})
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [selectedColumn, setSelectedColumn] = useState<string | undefined>()
  const [openModalAnswer, setOpenModalAnswer] = useState<KoboAnswer | undefined>()
  const [groupModalOpen, setOpenGroupModalAnswer] = useState<{
    columnId: string,
    group: KoboAnswer[],
    event: any
  } | undefined>()

  const extraColumns = useCustomColumns()
  const schemaColumns = useMemo(() => {
    return getColumnBySchema({
      selectedIds: selectedIds,
      data: ctx.data,
      schema: ctx.schema.schemaHelper.sanitizedSchema.content.survey,
      groupSchemas: ctx.schema.schemaHelper.groupSchemas,
      translateQuestion: ctx.schema.translate.question,
      translateChoice: ctx.schema.translate.choice,
      choicesIndex: ctx.schema.schemaHelper.choicesIndex,
      m,
      repeatGroupsAsColumn: repeatGroupsAsColumns,
      onOpenGroupModal: setOpenGroupModalAnswer,
      onSelectColumn: setSelectedColumn,
    })
  }, [ctx.schema.schemaUnsanitized, langIndex, selectedIds, repeatGroupsAsColumns])

  const columns = useMemo(() => {
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
              <TableIconBtn tooltip={m.view} children="visibility" onClick={() => setOpenModalAnswer(_)}/>
              <TableIconBtn disabled={!ctx.canEdit} tooltip={m.edit} target="_blank" href={ctx.asyncEdit(_.id)} children="edit"/>
            </>
          )
        }
      }
    }
    const validation: DatatableColumn.Props<any> = {
      id: 'validation',
      head: m.validation,
      width: 0,
      type: 'select_one',
      render: (row: KoboAnswer) => {
        const value = row.tags?._validation
        return {
          export: value ? m[value] : DatatableUtils.blank,
          value: value ?? DatatableUtils.blank,
          option: value ? m[value] : DatatableUtils.blank,
          label: (
            <SelectStatusBy
              enum="KoboValidation"
              compact
              disabled={!ctx.canEdit || ctx.fetcherAnswers.loading}
              value={value}
              onChange={(e) => {
                ctx.updateTag({
                  formId: ctx.form.id,
                  answerIds: [row.id],
                  tags: {_validation: e},
                })
              }}
            />
          )
        }
      }
    }
    return [action, validation, ...extraColumns, ...schemaColumns]
  }, [schemaColumns])

  const selectedHeader = useCustomSelectedHeader(selectedIds)
  const header = useCustomHeader()

  return (
    <>
      <Datatable
        showExportBtn
        rowsPerPageOptions={[20, 50, 100]}
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
            <AaSelect<number>
              sx={{maxWidth: 128, mr: 1}}
              defaultValue={langIndex}
              onChange={setLangIndex}
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

            <IpIconBtn
              href={ctx.schema.schemaUnsanitized.deployment__links.url}
              target="_blank"
              children="file_open"
              tooltip={m._koboDatabase.openKoboForm}
              sx={{marginLeft: 'auto'}}
            />
            <DatabaseKoboSyncBtn
              loading={ctx.asyncRefresh.loading}
              tooltip={<div dangerouslySetInnerHTML={{__html: m._koboDatabase.pullDataAt(ctx.form.updatedAt)}}/>}
              onClick={ctx.asyncRefresh.call}
            />
            <DatabaseKoboTableExportBtn
              columns={columns}
              data={params.filteredAndSortedData}
              repeatGroupsAsColumns={repeatGroupsAsColumns}
              tooltip={'Download as XLS (DEPRECATED VERSION - Without calculated columns - Kept in case of bugs with the new button)'}
              // tooltip={<div dangerouslySetInnerHTML={{__html: m._koboDatabase.downloadAsXLS}}/>}
            />
          </>
        }
      />
      {openModalAnswer && (
        <DatabaseKoboAnswerView
          open={!!openModalAnswer}
          onClose={() => setOpenModalAnswer(undefined)}
          answer={openModalAnswer}
        />
      )}
      {groupModalOpen && (
        <DatabaseKoboTableGroupModal
          name={groupModalOpen.columnId}
          anchorEl={groupModalOpen.event.target}
          groupData={groupModalOpen.group}
          onClose={() => setOpenGroupModalAnswer(undefined)}
        />
      )}
      {selectedColumn && (
        <DatatableKoboEditModal
          formId={ctx.form.id}
          column={selectedColumn}
          answerIds={selectedIds}
          onClose={() => setSelectedColumn(undefined)}
        />
      )}
    </>
  )
}

export const getKoboLabel = (q: {
  name: string,
  label?: string[]
}, langIndex?: number): string => {
  return q.label !== undefined ? (q.label as any)[langIndex as any] ?? q.name : q.name
}

