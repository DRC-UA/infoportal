import {useEffect, useMemo, useState} from 'react'

import {Page} from '@/shared/Page'
import {useI18n} from '@/core/i18n'
import {Panel} from '@/shared/Panel'
import {Box} from '@mui/material'
import {DatatableUtils} from '@/shared/Datatable/util/datatableUtils'
import {IpDatepicker} from '@/shared/Datepicker/IpDatepicker'
import {IpSelectOption, IpSelectSingle} from '@/shared/Select/SelectSingle'
import {TableInput} from '@/shared/TableInput'
import {DatabaseKoboSyncBtn} from '@/features/Database/KoboTable/DatabaseKoboSyncBtn'
import {Datatable} from '@/shared/Datatable/Datatable'
import {useKoboUpdateContext} from '@/core/context/KoboUpdateContext'
import {useKoboAnswersContext} from '@/core/context/KoboAnswersContext'
import {TableEditCellBtn} from '@/shared/TableEditCellBtn'
import {DatatableHeadIconByType} from '@/shared/Datatable/DatatableHead'
import {KoboEditAnswer} from '@/shared/koboEdit/KoboEditAnswer'
import {useKoboSchemaContext} from '@/features/KoboSchema/KoboSchemaContext'
import {Shelter_commonSpaces} from 'infoportal-common/kobo/generated/Shelter_commonSpaces'
import {KoboIndex} from 'infoportal-common'

export const CommonSpacesTable = () => {
  const {m, formatDate} = useI18n()
  const ctxAnswers = useKoboAnswersContext()
  const ctxKoboUpdate = useKoboUpdateContext()
  const ctxSchema = useKoboSchemaContext()

  const form = KoboIndex.byName('shelter_commonSpaces')
  const answers = ctxAnswers.byName('shelter_commonSpaces')
  const schema = ctxSchema.byName.shelter_commonSpaces.get!

  useEffect(() => {
    if (!answers.get?.data) {
      answers.fetch({})
    }
  }, [answers.get?.data])

  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const statusSelectOptions: IpSelectOption<Shelter_commonSpaces.Option<'status'>>[] = useMemo(
    () =>
      Object.entries(Shelter_commonSpaces.options.status).map(([value, text]) => ({
        value: value as Shelter_commonSpaces.Option<'status'>,
        children: text,
      })),
    [],
  )
  const modalitySelectOptions: IpSelectOption<Shelter_commonSpaces.Option<'modality_assistance'>>[] = useMemo(
    () =>
      Object.entries(Shelter_commonSpaces.options.modality_assistance).map(([value, text]) => ({
        value: value as Shelter_commonSpaces.Option<'modality_assistance'>,
        children: text,
      })),
    [],
  )
   const repairstandardsSelectOptions: IpSelectOption<Shelter_commonSpaces.Option<'compliance_standards'>>[] = useMemo(
    () =>
      Object.entries(Shelter_commonSpaces.options.compliance_standards).map(([value, text]) => ({
        value: value as Shelter_commonSpaces.Option<'compliance_standards'>,
        children: text,
      })),
    [],
  )
  const columns = useMemo(() => {
    if (!schema) return []
    const trC = (q: string, v?: string) => (v ? schema.translate.choice(q, v) : '')
    const arr = (v?: string | string[]) => (Array.isArray(v) ? v : v ? v.split(' ').filter(Boolean) : [])
    return DatatableUtils.buildColumns<Shelter_commonSpaces.T & {id: string; submissionTime?: string | Date}>([
      {
        id: 'id',
        head: 'ID',
        type: 'id',
        className: 'td-id',
        typeIcon: <DatatableHeadIconByType type="id" />,
        renderQuick: (_) => _.id,
      },
      {
        id: 'submissionTime',
        head: m.submissionTime,
        type: 'date',
        render: (row: Shelter_commonSpaces.T & {id: string; submissionTime?: string | Date}) => {
          const date = row.submissionTime ? new Date(row.submissionTime) : undefined
          return {
            value: date,
            label: date ? formatDate(date) : '',
          }
        },
      },
      {
        id: 'reporting_date',
        head: m.reportDate,
        type: 'date',
        width: 140,
        render: (row) => ({
          value: row.reporting_date,
          label: row.reporting_date ? formatDate(row.reporting_date) : '',
        }),
      },
      {
        id: 'office',
        head: m.office,
        type: 'select_one',
        options: () =>
          schema.helper.getOptionsByQuestionName('office').map((o) => ({value: o.name, label: trC('office', o.name)})),
        render: (row) => ({
          value: row.office,
          option: row.office,
          label: trC('office', row.office),
        }),
      },
      {
        id: 'project',
        head: m.project,
        type: 'select_one',
        width: 174,
        typeIcon: null,
        options: () => Object.entries(Shelter_commonSpaces.options.project).map(([value, label]) => ({value, label})),
        subHeader: selectedIds.length > 0 && (
          <TableEditCellBtn
            onClick={() =>
              ctxKoboUpdate.openByName({
                target: 'answer',
                params: {
                  formName: 'shelter_commonSpaces',
                  answerIds: selectedIds,
                  question: 'project',
                },
              })
            }
          />
        ),
        render: (row) => ({
          option: row.project,
          value: row.project,
          label: <KoboEditAnswer formId={form.id} answerId={row.id} columnName="project" value={row.project} />,
        }),
      },
      {
        id: 'oblast',
        head: m.oblast,
        type: 'select_one',
        options: () =>
          schema.helper
            .getOptionsByQuestionName('ben_det_oblast')
            .map((o) => ({value: o.name, label: trC('ben_det_oblast', o.name)})),
        render: (row) => ({
          value: row.ben_det_oblast,
          option: row.ben_det_oblast,
          label: trC('ben_det_oblast', row.ben_det_oblast),
        }),
      },
      {
        id: 'ben_det_raion',
        head: m.raion,
        type: 'string',
        renderQuick: (_) => _.ben_det_raion,
      },
      {
        id: 'ben_det_hromada',
        head: m.hromada,
        type: 'string',
        renderQuick: (_) => _.ben_det_hromada,
      },
      {
        id: 'ben_det_settlement',
        head: m._shelter.settlement,
        type: 'string',
        renderQuick: (_) => _.ben_det_settlement,
      },
      {
        id: 'address',
        head: m._shelter.street,
        type: 'string',
        width: 220,
        renderQuick: (_) => _.address,
      },
      {
        id: 'damaged_conflict',
        head: m._shelter.damagedConflict,
        type: 'select_one',
        width: 220,
        options: () =>
          schema.helper
            .getOptionsByQuestionName('damaged_conflict')
            .map((o) => ({value: o.name, label: trC('damaged_conflict', o.name)})),
        render: (row) => ({
          value: row.damaged_conflict,
          option: row.damaged_conflict,
          label: trC('damaged_conflict', row.damaged_conflict),
        }),
      },
      {
        id: 'damage',
        head: m._shelter.damage,
        type: 'select_multiple',
        width: 220,
        options: () =>
          schema.helper.getOptionsByQuestionName('damage').map((o) => ({value: o.name, label: trC('damage', o.name)})),
        render: (row) => {
          const values = arr(row.damage)
          return {
            value: values,
            option: values,
            label: values.map((v) => trC('damage', v)).join(', '),
          }
        },
      },
      {
        id: 'management_model',
        head: m._shelter.managementModel, // или trQ('management_model')
        type: 'select_multiple',
        width: 220,
        options: () =>
          schema.helper
            .getOptionsByQuestionName('management_model')
            .map((o) => ({value: o.name, label: trC('management_model', o.name)})),
        render: (row) => {
          const values = arr(row.management_model)
          return {
            value: values,
            option: values,
            label: values.map((v) => trC('management_model', v)).join(', '),
          }
        },
      },
      {
        id: 'person',
        head: m._shelter.personResponsible,
        type: 'string',
        width: 180,
        renderQuick: (_) => _.person_responsible,
      },
      {
        id: 'work_order',
        head: m._shelter.workOrder,
        type: 'string',
        typeIcon: null,
        width: 180,
        subHeader: selectedIds.length > 0 && (
          <TableEditCellBtn
            onClick={() =>
              ctxKoboUpdate.openByName({
                target: 'answer',
                params: {
                  formName: 'shelter_commonSpaces',
                  answerIds: selectedIds,
                  question: 'work_order',
                },
              })
            }
          />
        ),
        render: (row) => ({
          value: row.work_order,
          label: (
            <TableInput
              originalValue={row.work_order ?? null}
              value={row.work_order}
              onChange={(val) =>
                ctxKoboUpdate.asyncUpdateByName.answer.call({
                  formName: 'shelter_commonSpaces',
                  answerIds: [row.id],
                  question: 'work_order',
                  answer: val ?? undefined,
                })
              }
            />
          ),
        }),
      },
      {
        id: 'status',
        head: m._shelter.progressStatus,
        type: 'select_one',
        width: 190,
        options: () =>
          Object.entries(Shelter_commonSpaces.options.status).map(([value, text]) => ({
            value,
            label: text,
          })),
        subHeader: selectedIds.length > 0 && (
          <TableEditCellBtn
            onClick={() =>
              ctxKoboUpdate.openByName({
                target: 'answer',
                params: {
                  formName: 'shelter_commonSpaces',
                  answerIds: selectedIds,
                  question: 'status',
                },
              })
            }
          />
        ),
        render: (row) => ({
          option: row.status,
          value: row.status,
          label: (
            <IpSelectSingle<Shelter_commonSpaces.Option<'status'>>
              value={(row.status ?? null) as Shelter_commonSpaces.Option<'status'> | null}
              onChange={(status) =>
                ctxKoboUpdate.asyncUpdateByName.answer.call({
                  formName: 'shelter_commonSpaces',
                  answerIds: [row.id],
                  question: 'status',
                  answer: (status ?? undefined) as Shelter_commonSpaces.Option<'status'> | undefined,
                })
              }
              options={statusSelectOptions}
            />
          ),
        }),
      },
      {
        id: 'work_done',
        head: m._shelter.workDoneAt,
        type: 'date',
        width: 160,
        typeIcon: null,
        subHeader: selectedIds.length > 0 && (
          <TableEditCellBtn
            onClick={() =>
              ctxKoboUpdate.openByName({
                target: 'answer',
                params: {
                  formName: 'shelter_commonSpaces',
                  answerIds: selectedIds,
                  question: 'work_done',
                },
              })
            }
          />
        ),
        render: (row) => ({
          value: row.work_done,
          label: (
            <IpDatepicker
              value={row.work_done}
              onChange={(date) =>
                ctxKoboUpdate.asyncUpdateByName.answer.call({
                  formName: 'shelter_commonSpaces',
                  answerIds: [row.id],
                  question: 'work_done',
                  answer: date ?? undefined,
                })
              }
            />
          ),
        }),
      },
      {
        id: 'modality_assistance',
        head: m.modality,
        type: 'select_one',
        width: 190,
        options: () =>
          Object.entries(Shelter_commonSpaces.options.modality_assistance).map(([value, text]) => ({
            value,
            label: text,
          })),
        subHeader: selectedIds.length > 0 && (
          <TableEditCellBtn
            onClick={() =>
              ctxKoboUpdate.openByName({
                target: 'answer',
                params: {
                  formName: 'shelter_commonSpaces',
                  answerIds: selectedIds,
                  question: 'modality_assistance',
                },
              })
            }
          />
        ),
        render: (row) => ({
          option: row.modality_assistance,
          value: row.modality_assistance,
          label: (
            <IpSelectSingle<Shelter_commonSpaces.Option<'modality_assistance'>>
              value={(row.modality_assistance ?? null) as Shelter_commonSpaces.Option<'modality_assistance'> | null}
              onChange={(modality_assistance) =>
                ctxKoboUpdate.asyncUpdateByName.answer.call({
                  formName: 'shelter_commonSpaces',
                  answerIds: [row.id],
                  question: 'modality_assistance',
                  answer: (modality_assistance ?? undefined) as
                    | Shelter_commonSpaces.Option<'modality_assistance'>
                    | undefined,
                })
              }
              options={modalitySelectOptions}
            />
          ),
        }),
      },
      {
        id: 'repairstandards',
        head: m._shelter.repairStandards,
        type: 'select_one',
        width: 190,
        options: () =>
          Object.entries(Shelter_commonSpaces.options.compliance_standards).map(([value, text]) => ({
            value,
            label: text,
          })),
        subHeader: selectedIds.length > 0 && (
          <TableEditCellBtn
            onClick={() =>
              ctxKoboUpdate.openByName({
                target: 'answer',
                params: {
                  formName: 'shelter_commonSpaces',
                  answerIds: selectedIds,
                  question: 'compliance_standards',
                },
              })
            }
          />
        ),
        render: (row) => ({
          option: row.compliance_standards,
          value: row.compliance_standards,
          label: (
            <IpSelectSingle<Shelter_commonSpaces.Option<'compliance_standards'>>
              value={(row.compliance_standards ?? null) as Shelter_commonSpaces.Option<'compliance_standards'> | null}
              onChange={(compliance_standards) =>
                ctxKoboUpdate.asyncUpdateByName.answer.call({
                  formName: 'shelter_commonSpaces',
                  answerIds: [row.id],
                  question: 'compliance_standards',
                  answer: (compliance_standards ?? undefined) as
                    | Shelter_commonSpaces.Option<'compliance_standards'>
                    | undefined,
                })
              }
              options={repairstandardsSelectOptions}
            />
          ),
        }),
      },
      {
        id: 'notRepairStandards',
        head: m._shelter.notRepairStandards,
        type: 'string',
        typeIcon: null,
        width: 180,
        subHeader: selectedIds.length > 0 && (
          <TableEditCellBtn
            onClick={() =>
              ctxKoboUpdate.openByName({
                target: 'answer',
                params: {
                  formName: 'shelter_commonSpaces',
                  answerIds: selectedIds,
                  question: 'compliance_standards_no',
                },
              })
            }
          />
        ),
        render: (row) => ({
          value: row.compliance_standards_no,
          label:
      row.compliance_standards === 'no' ? (
      <TableInput
          originalValue={row.compliance_standards_no ?? null}
          value={row.compliance_standards_no}
          onChange={(val) =>
            ctxKoboUpdate.asyncUpdateByName.answer.call({
              formName: 'shelter_commonSpaces',
              answerIds: [row.id],
              question: 'compliance_standards_no',
              answer: val ?? undefined,
            })
              }
            />
          ):
          (
        row.compliance_standards_no ?? ''
      ),
        }),
      },
    ])
  }, [selectedIds, ctxAnswers, ctxKoboUpdate, schema, m, formatDate, form.id])

  return (
    <Page width="full">
      <Panel>
        <Datatable
          id="shelter_commonSpaces"
          title="Shelter-CommonSpaces"
          select={{
            onSelect: setSelectedIds,
            getId: (_) => _.id,
          }}
          header={
            <Box sx={{ml: 'auto'}}>
              <DatabaseKoboSyncBtn
                loading={!!answers.loading}
                onClick={async () => {
                  await Promise.all([
                    ctxSchema.fetchByName('shelter_commonSpaces'),
                    answers.fetch({force: true, clean: false}),
                  ])
                }}
              />
            </Box>
          }
          data={answers.get?.data as any[] | undefined}
          loading={!!answers.loading}
          getRenderRowKey={(_) => _.id}
          columns={columns}
          showExportBtn
        />
      </Panel>
    </Page>
  )
}
