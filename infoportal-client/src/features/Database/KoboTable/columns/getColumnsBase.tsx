import {DatatableColumn} from '@/shared/Datatable/util/datatableType'
import {TableIconBtn} from '@/features/Mpca/MpcaData/TableIcon'
import {TableEditCellBtn} from '@/shared/TableEditCellBtn'
import {Obj} from '@alexandreannic/ts-utils'
import {OptionLabelTypeCompact, SelectStatusBy, SelectStatusConfig} from '@/shared/customInput/SelectStatus'
import {DatatableUtils} from '@/shared/Datatable/util/datatableUtils'
import React from 'react'
import {Messages} from '@/core/i18n/localization/en'
import {KoboAnswerFlat, KoboAnswerId, KoboId, KoboValidation} from '@infoportal-common'
import {KoboEditTagsContext} from '@/core/context/KoboEditTagsContext'
import {KoboAnswersContext} from '@/core/context/KoboAnswers'
import {DatabaseKoboContext} from '@/features/Database/KoboTable/DatabaseKoboContext'

export const getColumnsBase = ({
  selectedIds,
  formId,
  asyncUpdateTagById,
  canEdit,
  m,
  asyncEdit,
  openEditTag,
  openAnswerModal,
}: {
  asyncEdit: DatabaseKoboContext['asyncEdit']
  openEditTag: KoboEditTagsContext['open']
  openAnswerModal: KoboAnswersContext['openAnswerModal']
  formId: KoboId
  selectedIds: KoboAnswerId[]
  asyncUpdateTagById: KoboEditTagsContext['asyncUpdateById']
  canEdit?: boolean
  m: Messages
}) => {
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
            <TableIconBtn tooltip={m.view} children="visibility" onClick={() => openAnswerModal({answer: _, formId: formId})}/>
            <TableIconBtn disabled={!canEdit} tooltip={m.editKobo} target="_blank" href={asyncEdit(_.id)} children="edit"/>
          </>
        )
      }
    }
  }
  const validation: DatatableColumn.Props<any> = {
    id: 'validation',
    head: m.validation,
    subHeader: selectedIds.length > 0 && <TableEditCellBtn onClick={() => openEditTag({
      formId: formId,
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
            disabled={!canEdit}
            value={value}
            onChange={(e) => {
              asyncUpdateTagById.call({
                formId: formId,
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
  return [
    action,
    validation,
  ]
}