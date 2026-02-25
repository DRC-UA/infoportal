import {match, map, seq} from '@axanc/ts-utils'
import {alpha, IconProps, Theme} from '@mui/material'
import DOMPurify from 'dompurify'
import {Kobo} from 'kobo-sdk'

import {
  KoboCustomDirective,
  KoboFlattenRepeatedGroup,
  KoboSchemaHelper,
  KoboSubmissionMetaData,
  removeHtml,
} from 'infoportal-common'

import {useI18n, formatDate, formatDateTime, type Messages, type AppLang} from '@/core/i18n'
import {KoboExternalFilesIndex} from '@/features/Database/KoboTable/DatabaseKoboContext'
import {TableIcon} from '@/features/Mpca/MpcaData/TableIcon'
import {IpBtn, TableEditCellBtn} from '@/shared'
import {DatatableHeadIcon, DatatableHeadIconByType} from '@/shared/Datatable/DatatableHead'
import {DatatableColumn} from '@/shared/Datatable/util/datatableType'
import {DatatableUtils} from '@/shared/Datatable/util/datatableUtils'
import {getKoboAttachmentUrl, KoboAttachedFile, KoboAttachedImg} from '@/shared/TableMedia/KoboAttachedMedia'

import {isCalculateNumeric} from './helpers'

export const MissingOption = ({value}: {value?: string}) => {
  const {m} = useI18n()
  return (
    <span title={value}>
      <TableIcon color="disabled" tooltip={m._koboDatabase.valueNoLongerInOption} sx={{mr: 1}} children="error" />
      {value}
    </span>
  )
}

const ignoredColType: Set<Kobo.Form.QuestionType> = new Set(['begin_group'])

const noEditableColsId: Set<string> = new Set<
  keyof KoboSubmissionMetaData | 'cal_eligibility' | 'cal_tot_vulnerability'
>([
  'start',
  'end',
  'version',
  // 'date',
  'uuid',
  'validationStatus',
  'validatedBy',
  'lastValidatedTimestamp',
  'geolocation',
  'tags',
  'cal_eligibility',
  'cal_tot_vulnerability',
])

const editableColsType: Set<Kobo.Form.QuestionType | 'hidden'> = new Set([
  'select_one',
  'calculate',
  'select_multiple',
  'text',
  'integer',
  'decimal',
  'date',
  'hidden',
  'datetime',
])

export namespace DirectiveTemplate {
  export type Template = {
    icon: string
    color: string
    label: (q: Kobo.Form.Question, m: Messages) => string
  }
  const make = <T extends KoboCustomDirective.Name>(directive: T, template: Template): Record<T, Template> =>
    ({
      [directive]: template,
    }) as any

  export const render = {
    ...make(KoboCustomDirective.Name.TRIGGER_EMAIL, {
      icon: 'forward_to_inbox',
      color: '#A335EE',
      label: (q, m) => {
        const directiveName = q.name.replace(KoboCustomDirective.make('TRIGGER_EMAIL'), '')
        if (directiveName === '') return m._koboDatabase.autoEmail
        return directiveName.replaceAll('_', ' ')
      },
    }),
  }
}

export const DatatableHeadTypeIconByKoboType = ({
  children,
  ...props
}: {
  children: Kobo.Form.QuestionType
} & Pick<IconProps, 'sx' | 'color'>) => {
  return (
    <DatatableHeadIcon
      children={match(children)
        .cases(koboIconMap)
        .default(() => 'short_text')}
      tooltip={children}
      {...props}
    />
  )
}

export const koboIconMap: Record<Kobo.Form.QuestionType, string> = {
  audio: 'audiofile',
  barcode: 'qrcode',
  begin_group: '',
  begin_repeat: 'repeat',
  calculate: 'functions',
  date: 'event',
  datetime: 'event',
  decimal: 'tag',
  deviceid: '',
  end: 'event',
  end_group: '',
  end_repeat: '',
  file: 'description',
  geopoint: 'location_on',
  geoshape: '',
  geotrace: '',
  image: 'image',
  integer: 'tag',
  note: 'info',
  range: '',
  select_multiple: 'check_box',
  select_one: 'radio_button_checked',
  select_one_from_file: 'attach_file',
  start: 'event',
  text: 'short_text',
  today: 'event',
  username: 'short_text',
  video: 'videofile',
}

type Data = Record<string, any>
type Row = KoboFlattenRepeatedGroup.Data

export type ColumnBySchemaGeneratorProps = {
  m: Messages
  getRow?: (_: Data) => Row
  schema: KoboSchemaHelper.Bundle
  formId: Kobo.FormId
  isAdmin: boolean
  onEdit?: (name: string) => void
  externalFilesIndex?: KoboExternalFilesIndex
  repeatGroupName?: Kobo.Form.Question['name']
  onRepeatGroupClick?: (_: {name: string; row: Row; event: any}) => void
  t: Theme
  currentLang?: AppLang
}

export const colorRepeatedQuestionHeader = (t: Theme) => alpha(t.palette.info.light, 0.22)

export const columnBySchemaGenerator = ({
  getRow = (_) => _ as Row,
  isAdmin,
  onEdit,
  formId,
  externalFilesIndex,
  schema,
  repeatGroupName,
  onRepeatGroupClick,
  m,
  t,
  currentLang,
}: ColumnBySchemaGeneratorProps) => {
  const getCommon = (
    q: Kobo.Form.Question,
  ): Pick<
    DatatableColumn.Props<any>,
    'id' | 'groupLabel' | 'group' | 'typeIcon' | 'typeLabel' | 'head' | 'subHeader'
  > => {
    const isEditable =
      // @ts-expect-error to get rid of the error update kodo-sdk to include 'hidden' type to Kobo.Form.Question
      editableColsType.has(q.type) && !noEditableColsId.has(q.name) && !(isAdmin === false && q.type === 'hidden')
    const isInsideRepeat = !!repeatGroupName && q.$xpath?.split('/').includes(repeatGroupName)
    const showHeaderPencil = !!onEdit && isEditable && !isInsideRepeat
    return {
      id: q.name,
      typeLabel: q.type,
      ...map(q.$xpath.split('/')[0], (v) => ({groupLabel: schema.translate.question(v), group: v})),
      ...(showHeaderPencil
        ? {subHeader: <TableEditCellBtn onClick={() => onEdit!(q.name)} />}
        : {typeIcon: <DatatableHeadTypeIconByKoboType children={q.type} />}),
      head: removeHtml(schema.translate.question(q.name)?.replace(/^#*/, '')),
    }
  }

  const getValue = (row: Row, name: string): any => {
    return getRow(row)[name]
  }

  const getRepeatGroup = (name: string) => {
    const q = schema.helper.questionIndex[name]
    return {
      ...getCommon(q),
      type: 'string',
      styleHead: {
        background: colorRepeatedQuestionHeader(t),
      },
      render: (row: Row) => {
        const value = getValue(row, name) as any[]
        return {
          export: value?.length,
          value: value?.length,
          label: value && (
            <IpBtn
              children={value.length}
              style={{padding: '0 4px'}}
              onClick={(event) => {
                onRepeatGroupClick?.({
                  name,
                  row,
                  event,
                })
              }}
            />
          ),
        }
      },
    }
  }

  const getImage = (name: string) => {
    const q = schema.helper.questionIndex[name]
    return {
      ...getCommon(q),
      type: 'string',
      render: (row: Row) => {
        const value = getValue(row, name) as string
        return {
          value,
          tooltip: value,
          export: getKoboAttachmentUrl({formId, answerId: row.id, attachments: row.attachments, fileName: value}),
          label: <KoboAttachedImg answerId={row.id} formId={formId} attachments={row.attachments} fileName={value} />,
        }
      },
    }
  }

  const getFile = (name: string) => {
    const q = schema.helper.questionIndex[name]
    return {
      ...getCommon(q),
      type: 'string',
      render: (row: Row) => {
        const fileName = getValue(row, name) as string
        const url = getKoboAttachmentUrl({formId, answerId: row.id, fileName, attachments: row.attachments})
        return {
          export: url,
          value: fileName ?? DatatableUtils.blank,
          label: (
            <KoboAttachedFile answerId={row.id} formId={formId} attachments={row.attachments} fileName={fileName} />
          ),
          // label: <Txt link><a href={koboImgHelper({fileName, attachments: row.attachments}).fullUrl} target="_blank">{fileName}</a></Txt>
        }
      },
    }
  }

  // const getCalculate = (name: string) => {
  //   const q = schema.helper.questionIndex[name]
  //   return {
  //     ...getCommon(q),
  //     type: 'select_one',
  //     options: () => seq(data).map(_ => getRow(_)[name]).distinct(_ => _).map(_ => ({label: _ as string, value: _ as string})),
  //     renderQuick: (row: Row) => getValue(row, name) as string,
  //   }
  // }

  const getIpTriggerEmail = (name: string) => {
    const q = schema.helper.questionIndex[name]
    const template = DirectiveTemplate.render.TRIGGER_EMAIL
    const x: DatatableColumn.Props<any> = {
      ...getCommon(q),
      styleHead: {
        color: template.color,
      },
      head: template.label(q, m),
      type: 'string',
      typeIcon: (
        <TableIcon
          fontSize="small"
          sx={{marginRight: 'auto', color: template.color}}
          tooltip={
            <>
              <div style={{marginBottom: t.spacing(1)}}>{m._koboDatabase.autoEmailDesc}</div>
              <div
                style={{
                  background: t.palette.background.paper,
                  color: t.palette.text.primary,
                  marginBottom: t.spacing(0.5),
                  padding: t.spacing(0.5),
                  borderRadius: t.shape.borderRadius - 3,
                }}
              >
                <div style={{fontWeight: 'bold', marginBottom: t.spacing(1)}}>{q.label?.[0]}</div>
                <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(q.hint?.[0] ?? '')}} />
              </div>
            </>
          }
        >
          {template.icon}
        </TableIcon>
      ),
      render: (row: Row) => {
        const value = getValue(row, name)
        return {
          label: value,
          value: value,
        }
      },
    }
    return x
  }

  const getSelectOneFromFile = (name: string) => {
    const q = schema.helper.questionIndex[name]
    return {
      ...getCommon(q),
      type: 'string',
      renderQuick: (row: Row) => {
        return externalFilesIndex?.[q.file!]?.[row[name] as string]?.label ?? getValue(row, name)
      },
    }
  }

  const getText = (name: string) => {
    const q = schema.helper.questionIndex[name]
    return {
      ...getCommon(q),
      type: 'string',
      width: q.appearance === 'multiline' ? 240 : undefined,
      renderQuick: (row: Row) => getValue(row, name) as string,
    }
  }

  const getInteger = (name: string) => {
    const q = schema.helper.questionIndex[name]
    return {
      ...getCommon(q),
      type: 'number',
      renderQuick: (row: Row) => getValue(row, name) as number,
    }
  }

  const getCalculate = (name: string) => {
    const q = schema.helper.questionIndex[name]
    const isNumeric = isCalculateNumeric(formId, name)

    return {
      ...getCommon(q),
      type: isNumeric ? 'number' : 'calculate',
      renderQuick: (row: Row) => {
        const value = getValue(row, name)
        const numericValue = isNaN(Number(value)) ? '' : value // hide nasty NaNs from the view
        return isNumeric ? numericValue : value
      },
    }
  }

  const getNote = (name: string) => {
    const q = schema.helper.questionIndex[name]
    return {
      ...getCommon(q),
      type: 'string',
      renderQuick: (row: Row) => getValue(row, name) as string,
    }
  }

  const getDate = (name: string) => {
    const q = schema.helper.questionIndex[name]

    return {
      ...getCommon(q),
      type: 'date',
      render: (row: Row) => {
        const value = getValue(row, name) ? new Date(getValue(row, name)) : undefined
        const time = formatDateTime(value)

        return {
          label: formatDate(value, currentLang),
          value,
          tooltip: time,
          export: time,
        }
      },
    }
  }

  const getSelectOne = (name: string) => {
    const q = schema.helper.questionIndex[name]
    return {
      ...getCommon(q),
      type: 'select_one',
      render: (row: Row) => {
        const v = getValue(row, name) as string | undefined
        const render = schema.translate.choice(name, v)
        return {
          export: render,
          value: v,
          tooltip: render ?? m._koboDatabase.valueNoLongerInOption,
          label: render ?? <MissingOption value={v} />,
        }
      },
    }
  }

  const getSelectMultiple = (name: string) => {
    const q = schema.helper.questionIndex[name]
    return {
      ...getCommon(q),
      type: 'select_multiple',
      options: () =>
        schema.helper.choicesIndex[q.select_from_list_name!].map((_) => ({
          value: _.name,
          label: schema.translate.choice(name, _.name),
        })),
      render: (row: Row) => {
        const v = getValue(row, name) as string[] | undefined
        try {
          const label = v?.map((_) => schema.translate.choice(name, _)).join(' | ')
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
      },
    }
  }

  const getGeopoint = (name: string) => {
    const q = schema.helper.questionIndex[name]
    return {
      ...getCommon(q),
      type: 'string',
      renderQuick: (row: Row) => JSON.stringify(getValue(row, name)),
    }
  }

  const getDefault = (name: string): DatatableColumn.Props<any> => {
    const q = schema.helper.questionIndex[name]
    return {
      ...getCommon(q),
      type: 'string',
      renderQuick: (row: Row) => JSON.stringify(getValue(row, name)),
    }
  }

  const getBy = {
    image: getImage,
    file: getFile,
    calculate: getCalculate,
    select_one_from_file: getSelectOneFromFile,
    username: getText,
    text: getText,
    deviceid: getText,
    decimal: getInteger,
    integer: getInteger,
    note: getNote,
    end: getDate,
    start: getDate,
    datetime: getDate,
    today: getDate,
    date: getDate,
    begin_repeat: getRepeatGroup,
    select_one: getSelectOne,
    select_multiple: getSelectMultiple,
    geopoint: getGeopoint,
  }

  const getByQuestion = (q: Kobo.Form.Question): undefined | DatatableColumn.Props<any> => {
    if (ignoredColType.has(q.type)) return
    if (q.name?.startsWith(KoboCustomDirective.make('TRIGGER_EMAIL'))) {
      return getIpTriggerEmail(q.name)
    }
    const fn = (getBy as any)[q.type]
    return fn ? fn(q.name) : getDefault(q.name)
  }

  const getByQuestions = (questions: Kobo.Form.Question[]): DatatableColumn.Props<any>[] => {
    return seq(questions).map(getByQuestion).compact()
  }

  const getId = (): DatatableColumn.Props<any> => {
    return {
      type: 'id',
      id: 'id',
      head: 'ID',
      typeIcon: <DatatableHeadIconByType type="id" />,
      className: 'td-id',
      style: (row) => {
        const data = getRow(row) as KoboFlattenRepeatedGroup.Data
        if (data[KoboFlattenRepeatedGroup.INDEX_COL]! > 0) {
          return {
            opacity: '.5',
          }
        }
        return {}
      },
      renderQuick: (row: Row) => {
        const data = getRow(row) as KoboFlattenRepeatedGroup.Data
        const childIndex = data[KoboFlattenRepeatedGroup.INDEX_COL]
        return (data.id ?? '') + (childIndex !== undefined ? '#' + (childIndex + 1) : '')
      },
    }
  }

  const getSubmissionTime = (): DatatableColumn.Props<any> => {
    return {
      head: m.submissionTime,
      id: 'submissionTime',
      type: 'date',
      typeIcon: <DatatableHeadIconByType type="date" />,
      render: (row: Row) => {
        const _ = getRow(row)
        const time = formatDateTime(_.submissionTime)
        return {
          label: formatDate(_.submissionTime, currentLang),
          value: _.submissionTime,
          tooltip: time,
          export: time,
        }
      },
    }
  }

  const getAll = (): DatatableColumn.Props<any>[] => {
    return [getId(), getSubmissionTime(), ...getByQuestions(schema.schemaFlatAndSanitized)]
  }

  return {
    getId,
    getSubmissionTime,
    getBy,
    getAll,
    getByQuestion,
    getByQuestions,
  }
}
