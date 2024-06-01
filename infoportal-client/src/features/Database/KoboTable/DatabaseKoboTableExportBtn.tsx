import {generateXLSFromArray, GenerateXlsFromArrayParams} from '@/shared/Sheet/util/generateXLSFile'
import {KoboApiQuestionSchema, KoboId, slugify} from '@infoportal-common'
import {Enum, map, mapFor, seq} from '@alexandreannic/ts-utils'
import {koboImgHelper} from '@/shared/TableImg/KoboAttachedImg'
import React from 'react'
import {useI18n} from '@/core/i18n'
import {KoboMappedAnswer} from '@/core/sdk/server/kobo/Kobo'
import {IpIconBtn, IpIconBtnProps} from '@/shared/IconBtn'
import {useDatabaseKoboTableContext} from '@/features/Database/KoboTable/DatabaseKoboContext'
import {useAsync} from '@/shared/hook/useAsync'
import {DatatableColumn} from '@/shared/Datatable/util/datatableType'
import {KoboTranslateChoice, KoboTranslateQuestion} from '@infoportal-common'

export const renderExportKoboSchema = <T extends KoboMappedAnswer>({
  schema,
  translateQuestion,
  translateChoice,
  repeatGroupsAsColumns,
  groupSchemas,
  groupIndex,
  groupName,
  formId,
}: {
  repeatGroupsAsColumns?: boolean
  translateQuestion: KoboTranslateQuestion
  translateChoice: KoboTranslateChoice
  schema: KoboApiQuestionSchema[],
  groupSchemas: Record<string, KoboApiQuestionSchema[]>
  groupIndex?: number
  formId: KoboId
  groupName?: string
}): GenerateXlsFromArrayParams['schema'] => {
  const getVal = (groupIndex && groupName)
    ? (row: KoboMappedAnswer, name: string) => (row as any)[groupName]?.[groupIndex]?.[name]
    : (row: KoboMappedAnswer, name: string) => row[name]
  return schema.flatMap(q => {
    switch (q.type) {
      case 'start':
        return {
          head: groupIndex ? `[${groupIndex}] ${translateQuestion(q.name)}` : translateQuestion(q.name),
          render: (row: T) => row.start,
        }
      case 'end':
        return {
          head: groupIndex ? `[${groupIndex}] ${translateQuestion(q.name)}` : translateQuestion(q.name),
          render: (row: T) => row.start,
        }
      case 'date':
        return {
          head: groupIndex ? `[${groupIndex}] ${translateQuestion(q.name)}` : translateQuestion(q.name),
          render: (row: T) => getVal(row, q.name),
        }
      case 'image':
        return {
          head: groupIndex ? `[${groupIndex}] ${translateQuestion(q.name)}` : translateQuestion(q.name),
          render: (row: T) => {
            return koboImgHelper({formId, answerId: row.id, attachments: row.attachments, fileName: getVal(row, q.name)}).fullUrl
          },
        }
      case 'select_one': {
        return {
          head: groupIndex ? `[${groupIndex}] ${translateQuestion(q.name)}` : translateQuestion(q.name),
          render: (row: T) => {
            const value = getVal(row, q.name)
            return translateChoice(q.name, value) ?? value
          },
        }
      }
      case 'select_multiple':
        return {
          head: groupIndex ? `[${groupIndex}] ${translateQuestion(q.name)}` : translateQuestion(q.name),
          render: (row: T) => map(getVal(row, q.name) as any, (v: string[]) => {
            try {
              return v.map(choiceName => translateChoice(q.name, choiceName)).join(' | ')
            } catch (e) {
              // Some issue looks to occur after deleting and recreating question
              return v
            }
          })
        }
      case 'calculate':
        return {
          head: groupIndex ? `[${groupIndex}] ${translateQuestion(q.name)}` : translateQuestion(q.name),
          render: (row: T) => map(getVal(row, q.name), (_: any) => isNaN(_) ? _ : +_)
        }
      case 'integer':
        return {
          head: groupIndex ? `[${groupIndex}] ${translateQuestion(q.name)}` : translateQuestion(q.name),
          render: (row: T) => map(getVal(row, q.name), _ => +(_ as string))
        }
      case 'begin_repeat': {
        if (repeatGroupsAsColumns) {
          return mapFor(17, i => renderExportKoboSchema({
            groupSchemas,
            formId,
            schema: groupSchemas[q.name],
            translateQuestion,
            translateChoice,
            groupIndex: i,
            groupName: q.name,
          })).flat()
        }
        return []
      }
      default:
        return {
          head: groupIndex ? `[${groupIndex}] ${translateQuestion(q.name)}` : translateQuestion(q.name),
          render: (row: T) => getVal(row, q.name) as any,
        }
    }
  })
}

export const DatabaseKoboTableExportBtn = <T extends KoboMappedAnswer, >({
  data,
  columns,
  formId,
  repeatGroupsAsColumns,
  ...props
}: {
  formId: KoboId
  columns: DatatableColumn.Props<T, any>[]
  repeatGroupsAsColumns?: boolean
  data: T[] | undefined
} & Pick<IpIconBtnProps, 'sx' | 'tooltip'>) => {
  const _generateXLSFromArray = useAsync(generateXLSFromArray)
  const ctx = useDatabaseKoboTableContext()
  const {formatDateTime} = useI18n()

  const exportToCSV = () => {
    if (data) {
      const questionToAddInGroups = ctx.schema.schemaHelper.sanitizedSchema.content.survey.filter(_ => ['id', 'submissionTime', 'start', 'end'].includes(_.name))
      _generateXLSFromArray.call(slugify(ctx.schema.schemaUnsanitized.name) + '_' + formatDateTime(new Date()), [
        {
          sheetName: slugify(ctx.schema.schemaUnsanitized.name),
          data: data,
          schema: renderExportKoboSchema({
            formId,
            schema: ctx.schema.schemaHelper.sanitizedSchema.content.survey,
            groupSchemas: ctx.schema.schemaHelper.groupSchemas,
            translateQuestion: ctx.schema.translate.question,
            translateChoice: ctx.schema.translate.choice,
            repeatGroupsAsColumns,
          })
        },
        ...Enum.entries(ctx.schema.schemaHelper.groupSchemas).map(([groupName, questions]) => {
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
              formId,
              schema: [...questionToAddInGroups, ...questions],
              groupSchemas: ctx.schema.schemaHelper.groupSchemas,
              translateQuestion: ctx.schema.translate.question,
              translateChoice: ctx.schema.translate.choice,
            })
          }
          return _
        })
      ])
    }
  }
  return (
    <IpIconBtn sx={{color: t => t.palette.text.secondary}} loading={_generateXLSFromArray.loading} onClick={exportToCSV} children="download" {...props}/>
  )
}
