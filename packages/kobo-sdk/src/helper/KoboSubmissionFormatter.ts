import {Obj, seq} from '@alexandreannic/ts-utils'
import {Kobo} from '../Kobo'
import QuestionType = Kobo.Form.QuestionType

type QuestionIndex = Record<string, Kobo.Form.Question>

type KoboData = {_parent_index?: number; _index?: number} & Record<string, any>

export class KoboSubmissionFormatter {
  static transformValues = (rows: KoboData[], questionIndex: QuestionIndex): KoboData[] => {
    return rows.map((row) => {
      const transformedRow: KoboData = {}

      if (row['ID']) {
        transformedRow['ID'] = String(row['ID'])
      }

      Obj.keys(row).forEach((key) => {
        const question = questionIndex[key]
        if (key !== 'ID') {
          transformedRow[key] =
            question && this.isValid(question.type, row[key]) ? this.transformValue(question.type, row[key]) : null
        }
      })

      transformedRow['_IP_ADDED_FROM_XLS'] = 'true'
      return transformedRow
    })
  }

  private static isValid = (type: QuestionType, value: any): boolean => {
    if (value == null || value === '') return true

    switch (type) {
      case 'integer':
        return Number.isInteger(Number(value)) && Number(value) >= 0
      case 'decimal':
        return !isNaN(Number(value))
      case 'select_one':
      case 'select_multiple':
        return Array.isArray(value) || typeof value === 'string'
      case 'date':
        return !isNaN(new Date(value).getTime())
      case 'text':
      case 'note':
        return typeof value === 'string'
      default:
        return true
    }
  }

  static readonly buildQuestionIndex = (form: Kobo.Form): QuestionIndex =>
    seq(form.content.survey).groupByFirst((_) => _.name)

  private static transformNestedData(value: any, questionIndex: QuestionIndex): any {
    if (Array.isArray(value)) {
      return value.map((item) => this.transformRow(item, questionIndex))
    }
    return value
  }

  private static transformRow(row: Record<string, any>, questionIndex: QuestionIndex): Record<string, any> {
    const transformedRow: Record<string, any> = {}

    Obj.keys(row).forEach((key) => {
      const question = questionIndex[key]
      if (question) {
        transformedRow[key] = this.isNestedField(question.type)
          ? this.transformNestedData(row[key], questionIndex)
          : this.transformValue(question.type, row[key])
      } else {
        transformedRow[key] = row[key]
      }
    })
    return transformedRow
  }

  private static transformValue = (type: Kobo.Form.QuestionType, value: any): any => {
    if (value == null || value === '') return null

    switch (type) {
      case 'integer':
      case 'decimal':
        return Number.isInteger(value) ? Number(value) : Number(value)
      case 'date':
      case 'datetime':
      case 'today':
      case 'start':
      case 'end':
        return !isNaN(Number(value)) ? this.stupidMicrosoftDateToJSDate(Number(value)) : this.formatDate(value)
      default:
        return String(value).trim()
    }
  }

  private static stupidMicrosoftDateToJSDate(serial: number): string | null {
    const excelEpoch = new Date(Date.UTC(1899, 11, 30))
    if (isNaN(serial)) return null
    const days = Math.floor(serial)
    const timeFraction = serial - days
    const date = new Date(excelEpoch.getTime() + days * 24 * 60 * 60 * 1000)
    const timeInMs = Math.round(timeFraction * 24 * 60 * 60 * 1000)
    date.setTime(date.getTime() + timeInMs)
    return date.toISOString().split('T')[0]
  }

  private static formatDate = (value: any): string | null => {
    const parsedDate = new Date(value)
    return isNaN(parsedDate.getTime()) ? null : parsedDate.toISOString().split('T')[0]
  }

  private static isNestedField(type: string): boolean {
    return ['begin_group', 'begin_repeat'].includes(type)
  }

  static readonly removeGroup = (data: KoboData): KoboData => {
    return seq(Object.entries(data)).reduceObject(([k, v]) => {
      const nameWithoutGroup = k.replace(/^.*\//, '')
      if (Array.isArray(v)) {
        return [nameWithoutGroup, v.map(KoboSubmissionFormatter.removeGroup)]
      }
      return [nameWithoutGroup, v]
    })
  }

  static formatData = ({
    data,
    questionIndex,
    skipNullForCreate,
    action,
  }: {
    data: KoboData[]
    questionIndex: QuestionIndex
    skipNullForCreate: boolean
    action: 'create' | 'update'
  }): KoboData[] => {
    return data.map((row) => {
      const formattedRow: KoboData = {}

      Obj.keys(row).forEach((questionName) => {
        const questionSchema = questionIndex[questionName]
        const xpath = questionSchema?.$xpath

        if (xpath) {
          const transformedValue = questionSchema
            ? this.isNestedField(questionSchema.type)
              ? this.transformNestedData(row[questionName], questionIndex)
              : this.transformValue(questionSchema.type, row[questionName])
            : row[questionName]

          if (action === 'create') {
            xpath.split('/').reduce((acc, key, i, arr) => {
              if (i === arr.length - 1) {
                if (!skipNullForCreate || transformedValue !== null) {
                  acc[key] = transformedValue
                }
              } else {
                acc[key] = acc[key] || {}
              }
              return acc[key]
            }, formattedRow)
          } else {
            if (!skipNullForCreate || transformedValue !== null) {
              formattedRow[xpath] = transformedValue
            }
          }
        } else if (questionName === '_IP_ADDED_FROM_XLS') {
          formattedRow[questionName] = row[questionName]
        }
      })
      return formattedRow
    })
  }
}
