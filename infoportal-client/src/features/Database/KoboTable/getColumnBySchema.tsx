import {KoboSchemaHelper} from '@/features/KoboSchema/koboSchemaHelper'
import {I18nContextProps} from '@/core/i18n/I18n'
import {KoboApiColType, KoboQuestionSchema} from '@/core/sdk/server/kobo/KoboApi'
import {KoboAnswerMetaData, KoboMappedAnswer} from '@/core/sdk/server/kobo/Kobo'
import {findFileUrl, KoboAttachedImg, koboImgHelper} from '@/shared/TableImg/KoboAttachedImg'
import {mapFor, seq} from '@alexandreannic/ts-utils'
import {formatDate, formatDateTime} from '@/core/i18n/localization/en'
import {IpBtn} from '@/shared/Btn'
import {TableIcon, TableIconBtn} from '@/features/Mpca/MpcaData/TableIcon'
import React from 'react'
import {SheetUtils} from '@/shared/Sheet/util/sheetUtils'
import {KoboTranslateChoice, KoboTranslateQuestion} from '@/features/KoboSchema/KoboSchemaContext'
import {DatatableColumn} from '@/shared/Datatable/util/datatableType'
import {KoboAnswerFlat, KoboAnswerId, removeHtml} from '@infoportal-common'
import {Txt} from 'mui-extension'
import {DatatableUtils} from '@/shared/Datatable/util/datatableUtils'
import {DatatableHeadTypeIcon} from '@/shared/Datatable/DatatableHead'
import {KoboExternalFilesIndex} from '@/features/Database/KoboTable/DatabaseKoboContext'

const imageExtension = new Set([
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
])

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
  'submissionTime',
  'submittedBy',
  'id',
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
  data?: T[]
  externalFilesIndex?: KoboExternalFilesIndex
  choicesIndex: KoboSchemaHelper.Index['choicesIndex']
  m: I18nContextProps['m']
  translateChoice: KoboTranslateChoice
  translateQuestion: KoboTranslateQuestion
  groupSchemas: Record<string, KoboQuestionSchema[]>
  onOpenGroupModal?: (_: {
    columnId: string,
    group: KoboAnswerFlat[],
    event: any
  }) => void,
  groupIndex?: number
  groupName?: string
  repeatGroupsAsColumn?: boolean
  selectedIds?: KoboAnswerId[]
  onSelectColumn?: (_: string) => void
}

export const getColumnByQuestionSchema = <T extends Record<string, any | undefined>>({
  data,
  m,
  q,
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
  q: KoboQuestionSchema,
  getRow?: (_: T) => KoboMappedAnswer
}): DatatableColumn.Props<T>[] => {
  const {
    getId,
    getHead,
    getVal,
  } = (() => {
    if (groupIndex !== undefined && groupName)
      return {
        getId: (q: KoboQuestionSchema) => `${groupIndex}_${q.name}`,
        getHead: (name: string) => `[${groupIndex}] ${name}`,
        getVal: (row: T, name: string) => (getRow(row) as any)[groupName]?.[groupIndex]?.[name]
      }
    return {
      getId: (q: KoboQuestionSchema) => q.name,
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
    ...showEditBtn ? {typeIcon: null} : {},
    subHeader: showEditBtn
      ? <TableIconBtn size="small" color="primary" onClick={() => onSelectColumn(q.name)}>edit</TableIconBtn>
      : undefined,
    head: removeHtml(getHead(translateQuestion(q.name))),
  }
  const res: DatatableColumn.Props<T>[] | DatatableColumn.Props<T> | undefined = (() => {
    if (q.name === 'id') {
      return {
        typeIcon: <DatatableHeadTypeIcon children="key" tooltip={q.type}/>,
        ...common,
        type: 'string',
        className: 'td-id',
        renderQuick: row => row.id,
      }
    }
    switch (q.type) {
      case 'image': {
        return {
          typeIcon: <DatatableHeadTypeIcon children="short_text" tooltip={q.type}/>,
          ...common,
          type: 'string',
          render: row => {
            const value = getVal(row, q.name)
            return {
              value,
              tooltip: value,
              export: koboImgHelper({attachments: row.attachments, fileName: getVal(row, q.name)}).fullUrl,
              label: <KoboAttachedImg attachments={row.attachments} fileName={value}/>
            }
          }
        }
      }
      case 'file': {
        return {
          typeIcon: <DatatableHeadTypeIcon children="functions" tooltip="insert_drive_file"/>,
          ...common,
          type: 'string',
          render: row => {
            const fileName = getVal(row, q.name)
            return {
              export: findFileUrl({fileName, attachments: row.attachments}),
              value: fileName ?? DatatableUtils.blank,
              label: <Txt link><a href={findFileUrl({fileName, attachments: row.attachments})} target="_blank">{fileName}</a></Txt>,
              // label: <Txt link><a href={koboImgHelper({fileName, attachments: row.attachments}).fullUrl} target="_blank">{fileName}</a></Txt>
            }
          }
        }
      }
      case 'calculate': {
        return {
          typeIcon: <DatatableHeadTypeIcon children="functions" tooltip="calculate"/>,
          ...common,
          type: 'select_one',
          head: removeHtml(getHead(translateQuestion(q.name))),
          renderQuick: row => getVal(row, q.name) as string,
          options: () => seq(data).map(_ => getRow(_)[q.name] ?? SheetUtils.blank).distinct(_ => _).map(_ => ({label: _ as string, value: _ as string})),
        }
      }
      case 'select_one_from_file': {
        return {
          typeIcon: <DatatableHeadTypeIcon children="attach_file" tooltip="select_one_from_file"/>,
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
          typeIcon: <DatatableHeadTypeIcon children="short_text" tooltip={q.type}/>,
          ...common,
          type: 'string',
          className: q.name === 'id' ? 'td-id' : undefined,
          renderQuick: row => getVal(row, q.name) as string,
        }
      }
      case 'decimal':
      case 'integer': {
        return {
          typeIcon: <DatatableHeadTypeIcon children="tag" tooltip={q.type}/>,
          ...common,
          type: 'number',
          renderQuick: row => getVal(row, q.name) as number,
        }
      }
      case 'note': {
        return {
          typeIcon: <DatatableHeadTypeIcon children="info" tooltip="note"/>,
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
          typeIcon: <DatatableHeadTypeIcon children="event" tooltip={q.type}/>,
          ...common,
          type: 'date',
          render: row => {
            const _ = getVal(row, q.name) as Date | undefined
            return {
              label: _ && <span title={formatDateTime(_)}>{formatDate(_)}</span>,
              value: _,
              tooltip: formatDateTime(_),
              export: formatDateTime(_),
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
            translateChoice,
            choicesIndex,
            m,
            onOpenGroupModal,
            groupIndex: i,
            groupName: q.name,
          })).flat()
        }
        return {
          typeIcon: <DatatableHeadTypeIcon children="repeat" tooltip="begin_repeat"/>,
          ...common,
          type: 'number',
          render: row => {
            const group = row[q.name] as KoboAnswerFlat[] | undefined
            return {
              export: group?.length,
              value: group?.length,
              label: group && <IpBtn sx={{py: '4px'}} onClick={(event) => onOpenGroupModal?.({
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
          typeIcon: <DatatableHeadTypeIcon children="radio_button_checked" tooltip={q.type}/>,
          ...common,
          type: 'select_one',
          // options: () => choicesIndex[q.select_from_list_name!].map(_ => ({value: _.name, label: translateChoice(q.name, _.name)})),
          render: row => {
            const v = getVal(row, q.name) as string | undefined
            const render = translateChoice(q.name, v)
            return {
              export: render,
              value: v ?? SheetUtils.blank,
              tooltip: render ?? m._koboDatabase.valueNoLongerInOption,
              label: render ?? (
                <span title={v}>
                  <TableIcon color="disabled" tooltip={m._koboDatabase.valueNoLongerInOption} sx={{mr: 1}} children="error"/>
                  {v}
                </span>
              ),
            }
          }
        }
      }
      case 'select_multiple': {
        return {
          typeIcon: <DatatableHeadTypeIcon children="check_box" tooltip={q.type}/>,
          ...common,
          type: 'select_multiple',
          options: () => choicesIndex[q.select_from_list_name!].map(_ => ({value: _.name, label: translateChoice(q.name, _.name)})),
          // renderOption: row => translateChoice(q.name, getVal(row, q.name)) ?? SheetUtils.blank,
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
          typeIcon: <DatatableHeadTypeIcon children="location_on" tooltip="geopoint"/>,
          ...common,
          type: 'string',
          renderQuick: row => JSON.stringify(getVal(row, q.name))
        }
      }
      default: {
        return {
          typeIcon: <DatatableHeadTypeIcon children="short_text" tooltip={q.type}/>,
          ...common,
          type: 'string',
          renderQuick: row => JSON.stringify(getVal(row, q.name))
        }
      }
    }
  })()
  return [res].flat().filter(_ => _ !== undefined) as DatatableColumn.Props<T>[]
}


export const getColumnBySchema = <T extends Record<string, any>>({
  schema,
  ...props
}: GetColumnBySchemaProps<T> & {
  schema: KoboQuestionSchema[]
}): DatatableColumn.Props<T>[] => {
  return schema.filter(_ => !ignoredColType.has(_.type)).flatMap(q => getColumnByQuestionSchema({
    q,
    ...props,
  }))
}