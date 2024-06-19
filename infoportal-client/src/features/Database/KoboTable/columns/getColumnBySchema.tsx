import {
  KoboAnswerFlat,
  KoboAnswerId,
  KoboAnswerMetaData,
  KoboApiColType,
  KoboApiQuestionSchema,
  KoboApiQuestionType,
  KoboId,
  KoboSchemaHelper,
  KoboTranslateChoice,
  KoboTranslateQuestion
} from '../../../../../../infoportal-common/src'
import {I18nContextProps, useI18n} from '@/core/i18n/I18n'
import {KoboMappedAnswer} from '@/core/sdk/server/kobo/Kobo'
import {findFileUrl, KoboAttachedImg, koboImgHelper} from '@/shared/TableImg/KoboAttachedImg'
import {map, mapFor, seq} from '@alexandreannic/ts-utils'
import {formatDate, formatDateTime} from '@/core/i18n/localization/en'
import {IpBtn} from '@/shared/Btn'
import {TableIcon} from '@/features/Mpca/MpcaData/TableIcon'
import React from 'react'
import {DatatableColumn} from '@/shared/Datatable/util/datatableType'
import {Txt} from 'mui-extension'
import {DatatableUtils} from '@/shared/Datatable/util/datatableUtils'
import {KoboExternalFilesIndex} from '@/features/Database/KoboTable/DatabaseKoboContext'
import {TableEditCellBtn} from '@/shared/TableEditCellBtn'
import {DatatableHeadTypeIcon, DatatableHeadTypeIconByKoboType} from '@/shared/Datatable/DatatableHead'

const imageExtension = new Set([
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
])

export const MissingOption = ({value}: {value?: string}) => {
  const {m} = useI18n()
  return (
    <span title={value}>
      <TableIcon color="disabled" tooltip={m._koboDatabase.valueNoLongerInOption} sx={{mr: 1}} children="error"/>
      {value}
    </span>
  )
}
export const keyTypeIcon = <DatatableHeadTypeIcon
  color="info"
  tooltip="ID"
  sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}
  children="key"
/>

const ignoredColType: Set<KoboApiColType> = new Set([
  'begin_group',
  'end_group',
  'deviceid',
  'end_repeat',
  // 'begin_repeat',
  // 'note',
])

const noEditableColumnsId = new Set<keyof KoboAnswerMetaData>([
  'start',
  'end',
  'version',
  'date',
  'uuid',
  'validationStatus',
  'validatedBy',
  'lastValidatedTimestamp',
  'geolocation',
  'tags',
])

const editableColumns: Set<KoboApiColType> = new Set([
  'select_one',
  'select_multiple',
  'text',
  'integer',
  'decimal',
  'date',
  'datetime',
])

interface GetColumnBySchemaProps<T extends Record<string, any> = any> {
  formId: KoboId
  data?: T[]
  externalFilesIndex?: KoboExternalFilesIndex
  choicesIndex: KoboSchemaHelper.Index['choicesIndex']
  m: I18nContextProps['m']
  translateChoice: KoboTranslateChoice
  translateQuestion: KoboTranslateQuestion
  groupSchemas: Record<string, KoboApiQuestionSchema[]>
  onOpenGroupModal?: (_: {
    columnId: string,
    group: KoboAnswerFlat[],
    event: any
  }) => void,
  groupIndex?: number
  groupName?: string
  repeatGroupsAsColumn?: boolean
  selectedIds?: KoboAnswerId[]
  getRow?: (_: T) => KoboMappedAnswer,
  onSelectColumn?: (_: string) => void
}

export type DatabaseColumnProps<T extends Record<string, any | undefined>> = DatatableColumn.Props<T> & {
  koboType?: KoboApiQuestionType
}

export const getColumnByQuestionSchema = <T extends Record<string, any | undefined>>({
  data,
  m,
  q,
  formId,
  groupSchemas,
  translateQuestion,
  translateChoice,
  externalFilesIndex,
  onOpenGroupModal,
  choicesIndex,
  groupIndex,
  getRow = _ => _ as unknown as KoboMappedAnswer,
  groupName,
  repeatGroupsAsColumn,
  selectedIds,
  onSelectColumn,
}: GetColumnBySchemaProps<T> & {
  q: KoboApiQuestionSchema,
}): DatabaseColumnProps<T>[] => {
  const {
    getId,
    getHead,
    getVal,
  } = (() => {
    if (groupIndex !== undefined && groupName)
      return {
        getId: (q: KoboApiQuestionSchema) => `${groupIndex}_${q.name}`,
        getHead: (name: string) => `[${groupIndex}] ${name}`,
        getVal: (row: T, name: string) => (getRow(row) as any)[groupName]?.[groupIndex]?.[name]
      }
    return {
      getId: (q: KoboApiQuestionSchema) => q.name,
      getHead: (name: string) => name,
      getVal: (row: T, name: string) => getRow(row)[name],
    }
  })()

  const showEditBtn = onSelectColumn
    && selectedIds && selectedIds?.length > 0
    && editableColumns.has(q.type)
    && !noEditableColumnsId.has(q.name as any)

  const common = {
    id: getId(q),
    koboType: q.type,
    typeIcon: <DatatableHeadTypeIconByKoboType children={q.type}/>,
    ...map(q.$xpath.split('/')[0], value => ({groupLabel: translateQuestion(value), group: value})),
    ...showEditBtn ? {typeIcon: null} : {},
    subHeader: showEditBtn
      ? <TableEditCellBtn onClick={() => onSelectColumn(q.name)}/>
      : undefined,
    head: getHead(translateQuestion(q.name)),
  }
  const res: DatabaseColumnProps<T>[] | DatabaseColumnProps<T> | undefined = (() => {
    switch (q.type) {
      case 'image': {
        return {
          ...common,
          type: 'string',
          render: row => {
            const value = getVal(row, q.name)
            return {
              value,
              tooltip: value,
              export: koboImgHelper({formId, answerId: row.id, attachments: row.attachments, fileName: getVal(row, q.name)}).fullUrl,
              label: <KoboAttachedImg answerId={row.id} formId={formId} attachments={row.attachments} fileName={value}/>
            }
          }
        }
      }
      case 'file': {
        return {
          ...common,
          type: 'string',
          render: row => {
            const fileName = getVal(row, q.name)
            return {
              export: findFileUrl({formId, answerId: row.id, fileName, attachments: row.attachments}),
              value: fileName ?? DatatableUtils.blank,
              label: <Txt link><a href={findFileUrl({formId, answerId: row.id, fileName, attachments: row.attachments})} target="_blank">{fileName}</a></Txt>,
              // label: <Txt link><a href={koboImgHelper({fileName, attachments: row.attachments}).fullUrl} target="_blank">{fileName}</a></Txt>
            }
          }
        }
      }
      case 'calculate': {
        return {
          ...common,
          type: 'select_one',
          head: getHead(translateQuestion(q.name)),
          options: () => seq(data).map(_ => getRow(_)[q.name]).distinct(_ => _).map(_ => ({label: _ as string, value: _ as string})),
          renderQuick: row => getVal(row, q.name) as string,
        }
      }
      case 'select_one_from_file': {
        return {
          ...common,
          type: 'string',
          renderQuick: row => {
            return externalFilesIndex?.[q.file!]?.[row[q.name]]?.label ?? getVal(row, q.name)
          }
        }
      }
      case 'username':
      case 'text': {
        return {
          ...common,
          type: 'string',
          width: q.appearance === 'multiline' ? 240 : undefined,
          renderQuick: row => getVal(row, q.name) as string,
        }
      }
      case 'decimal':
      case 'integer': {
        return {
          ...common,
          type: 'number',
          renderQuick: row => getVal(row, q.name) as number,
        }
      }
      case 'note': {
        return {
          ...common,
          type: 'string',
          renderQuick: row => getVal(row, q.name) as string,
        }
      }
      case 'end':
      case 'start':
        return
      case 'datetime':
      case 'today':
      case 'date': {
        return {
          ...common,
          type: 'date',
          render: row => {
            const _ = getVal(row, q.name) as Date | undefined
            const time = formatDateTime(_)
            return {
              label: formatDate(_),
              value: _,
              tooltip: time,
              export: time,
            }
          }
        }
      }
      case 'begin_repeat': {
        if (repeatGroupsAsColumn) {
          return mapFor(17, i => getColumnBySchema({
            data: data?.map(_ => getRow(_)[q.name]) as any,
            groupSchemas,
            schema: groupSchemas[q.name],
            translateQuestion,
            formId,
            translateChoice,
            choicesIndex,
            m,
            onOpenGroupModal,
            groupIndex: i,
            groupName: q.name,
          })).flat()
        }
        return {
          ...common,
          type: 'number',
          render: row => {
            const group = row[q.name] as KoboAnswerFlat[] | undefined
            return {
              export: group?.length,
              value: group?.length,
              label: group && <IpBtn style={{padding: '0 4px'}} onClick={(event) => onOpenGroupModal?.({
                columnId: q.name,
                group,
                event,
              })}>{group.length}</IpBtn>
            }
          }
        }
      }
      case 'select_one': {
        return {
          ...common,
          type: 'select_one',
          // options: () => choicesIndex[q.select_from_list_name!].map(_ => ({value: _.name, label: translateChoice(q.name, _.name)})),
          render: row => {
            const v = getVal(row, q.name) as string | undefined
            const render = translateChoice(q.name, v)
            return {
              export: render,
              value: v,
              tooltip: render ?? m._koboDatabase.valueNoLongerInOption,
              label: render ?? <MissingOption value={v}/>,
            }
          }
        }
      }
      case 'select_multiple': {
        return {
          ...common,
          type: 'select_multiple',
          options: () => choicesIndex[q.select_from_list_name!].map(_ => ({value: _.name, label: translateChoice(q.name, _.name)})),
          // renderOption: row => translateChoice(q.name, getVal(row, q.name)),
          render: row => {
            const v = getVal(row, q.name) as string[] | undefined
            try {
              const label = v?.map(_ => translateChoice(q.name, _,)).join(' | ')
              return {
                label,
                export: label,
                tooltip: label,
                value: v,
              }
            } catch (e: any) {
              console.warn('Cannot translate')
              const fixedV = JSON.stringify(v)
              return {
                label: fixedV,
                value: [fixedV],
              }
            }
          }
        }
      }
      case 'geopoint': {
        return {
          ...common,
          type: 'string',
          renderQuick: row => JSON.stringify(getVal(row, q.name))
        }
      }
      default: {
        return {
          ...common,
          type: 'string',
          renderQuick: row => JSON.stringify(getVal(row, q.name))
        }
      }
    }
  })()
  return [res].flat().filter(_ => _ !== undefined) as DatabaseColumnProps<T>[]
}


export const getColumnBySchema = <T extends Record<string, any>>({
  schema,
  getRow = _ => _ as unknown as KoboMappedAnswer,
  ...props
}: GetColumnBySchemaProps<T> & {
  schema: KoboApiQuestionSchema[]
}): DatabaseColumnProps<T>[] => {
  return [
    {
      type: 'id',
      id: 'id',
      head: 'ID',
      className: 'td-id',
      renderQuick: row => getRow(row).id,
    },
    {
      head: props.m.submissionTime,
      id: 'submissionTime',
      type: 'date',
      render: row => {
        const _ = getRow(row)
        const time = formatDateTime(_.submissionTime)
        return {
          label: formatDate(_.submissionTime),
          value: _.submissionTime,
          tooltip: time,
          export: time,
        }
      }
    },
    ...schema.filter(_ => !ignoredColType.has(_.type)).flatMap(q => getColumnByQuestionSchema({
      q,
      getRow,
      ...props,
    }))
  ]
}