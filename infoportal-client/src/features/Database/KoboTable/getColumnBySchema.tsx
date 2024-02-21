import {KoboSchemaHelper} from '@/features/KoboSchema/koboSchemaHelper'
import {I18nContextProps} from '@/core/i18n/I18n'
import {KoboApiColType, KoboQuestionSchema} from '@/core/sdk/server/kobo/KoboApi'
import {KoboAnswer, KoboMappedAnswer} from '@/core/sdk/server/kobo/Kobo'
import {SheetHeadTypeIcon} from '@/shared/Sheet/SheetHead'
import {KoboAttachedImg} from '@/shared/TableImg/KoboAttachedImg'
import {mapFor, seq} from '@alexandreannic/ts-utils'
import {formatDate, formatDateTime} from '@/core/i18n/localization/en'
import {IpBtn} from '@/shared/Btn'
import {TableIcon} from '@/features/Mpca/MpcaData/TableIcon'
import React from 'react'

import {SheetUtils} from '@/shared/Sheet/util/sheetUtils'
import {KoboTranslateChoice, KoboTranslateQuestion} from '@/features/KoboSchema/KoboSchemaContext'
import {DatatableColumn} from '@/shared/Datatable/util/datatableType'
import {removeHtml} from '@infoportal-common'

const ignoredColType: KoboApiColType[] = [
  'begin_group',
  'end_group',
  'deviceid',
  'end_repeat',
  // 'begin_repeat',
  // 'note',
]

interface GetColumnBySchemaProps<T extends Record<string, any> = any> {
  data?: T[]
  choicesIndex: KoboSchemaHelper.Index['choicesIndex']
  m: I18nContextProps['m']
  translateChoice: KoboTranslateChoice
  translateQuestion: KoboTranslateQuestion
  groupSchemas: Record<string, KoboQuestionSchema[]>
  onOpenGroupModal?: (_: {
    columnId: string,
    group: KoboAnswer[],
    event: any
  }) => void,
  groupIndex?: number
  groupName?: string
  repeatGroupsAsColumn?: boolean
}

export const getColumnByQuestionSchema = <T extends Record<string, any | undefined>>({
  data,
  m,
  q,
  groupSchemas,
  translateQuestion,
  translateChoice,
  onOpenGroupModal,
  choicesIndex,
  groupIndex,
  getRow = _ => _ as unknown as KoboMappedAnswer,
  groupName,
  repeatGroupsAsColumn,
}: GetColumnBySchemaProps<T> & {
  q: KoboQuestionSchema,
  getRow?: (_: T) => KoboMappedAnswer
}): DatatableColumn.Props<T>[] => {
  const {
    getId,
    getHead,
    getVal,
  } = (() => {
    if (groupIndex && groupName)
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

  const common = {
    id: getId(q),
    head: removeHtml(getHead(translateQuestion(q.name))),
  }
  const res: DatatableColumn.Props<T>[] | DatatableColumn.Props<T> | undefined = (() => {
    switch (q.type) {
      case 'image': {
        return {
          ...common,
          type: 'string',
          typeIcon: <SheetHeadTypeIcon children="short_text" tooltip={q.type}/>,
          render: row => {
            const value = getVal(row, q.name)
            return {
              value,
              tooltip: value,
              export: value,
              label: <KoboAttachedImg attachments={row.attachments} fileName={value}/>
            }
          }
        }
      }
      case 'calculate': {
        return {
          ...common,
          type: 'select_one',
          typeIcon: <SheetHeadTypeIcon children="functions" tooltip="calculate"/>,
          head: removeHtml(getHead(translateQuestion(q.name))),
          renderQuick: row => getVal(row, q.name) as string,
          options: () => seq(data).map(_ => getRow(_)[q.name] ?? SheetUtils.blank).distinct(_ => _).map(_ => ({label: _ as string, value: _ as string})),
        }
      }
      case 'select_one_from_file': {
        return {
          ...common,
          type: 'string',
          typeIcon: <SheetHeadTypeIcon children="attach_file" tooltip="select_one_from_file"/>,
          renderQuick: row => getVal(row, q.name) as string
        }
      }
      case 'username':
      case 'text': {
        return {
          ...common,
          type: 'string',
          typeIcon: <SheetHeadTypeIcon children="short_text" tooltip={q.type}/>,
          renderQuick: row => getVal(row, q.name) as string,
        }
      }
      case 'decimal':
      case 'integer': {
        return {
          ...common,
          type: 'number',
          typeIcon: <SheetHeadTypeIcon children="tag" tooltip={q.type}/>,
          renderQuick: row => getVal(row, q.name) as number,
        }
      }
      case 'note': {
        return {
          ...common,
          type: 'string',
          typeIcon: <SheetHeadTypeIcon children="info" tooltip="note"/>,
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
          typeIcon: <SheetHeadTypeIcon children="event" tooltip={q.type}/>,
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
          ...common,
          type: 'number',
          typeIcon: <SheetHeadTypeIcon children="repeat" tooltip="begin_repeat"/>,
          render: row => {
            const group = row[q.name] as KoboAnswer[] | undefined
            return {
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
          ...common,
          type: 'select_one',
          typeIcon: <SheetHeadTypeIcon children="radio_button_checked" tooltip={q.type}/>,
          // options: () => choicesIndex[q.select_from_list_name!].map(_ => ({value: _.name, label: translateChoice(q.name, _.name)})),
          render: row => {
            const v = getVal(row, q.name) as string | undefined
            const render = translateChoice(q.name, v)
            return {
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
          ...common,
          type: 'select_multiple',
          typeIcon: <SheetHeadTypeIcon children="check_box" tooltip={q.type}/>,
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
          ...common,
          type: 'string',
          typeIcon: <SheetHeadTypeIcon children="location_on" tooltip="geopoint"/>,
          renderQuick: row => JSON.stringify(row)
        }
      }
      default: {
        return {
          ...common,
          type: 'string',
          typeIcon: <SheetHeadTypeIcon children="short_text" tooltip={q.type}/>,
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
  return schema.filter(_ => !ignoredColType.includes(_.type)).flatMap(q => getColumnByQuestionSchema({
    q,
    ...props,
  }))
}