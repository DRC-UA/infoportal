import {seq} from '@alexandreannic/ts-utils'
import {Kobo} from '../Kobo'

export namespace KoboSubmissionFormatter {
  type Data = Record<string, Date | string | number | null | undefined | Data[]>
  // type NestedData = Record<string, Date | string | number | null | undefined | Data[] | Data>

  type QuestionIndex = Record<string, Kobo.Form.Question>

  export const format = ({
    data,
    output,
    questionIndex,
  }: {
    questionIndex: QuestionIndex
    output: 'toInsert_withNestedSection' | 'toUpdate_withFlatSectionPath'
    data: Data[]
  }) => {
    if (output === 'toInsert_withNestedSection') {
      return data
        .map(removeGroup)
        .map((_) => mapValues(_, questionIndex))
        .map((_) => setGroup(_, questionIndex))
        .map(nestKeyWithPath)
    } else {
      return data
        .map(removeGroup)
        .map((_) => mapValues(_, questionIndex))
        .map((_) => setGroup(_, questionIndex))
    }
  }

  export const removeMetaData = (data: Record<string, any>): Data => {
    return Object.keys(data).reduce((acc, key) => {
      if (!key.startsWith('_') || ['meta/instanceID', 'formhub/uuid'].includes(key)) {
        acc[key] = data[key]
      }
      return acc
    }, {} as any)
  }

  export const buildQuestionIndex = (form: Kobo.Form): QuestionIndex =>
    seq(form.content.survey).groupByFirst((_) => _.name)

  export const nestKeyWithPath = (input: Data): Data => {
    const obj = removeRedondanceInPath(input)
    const result: any = {}

    for (const [path, value] of Object.entries(obj)) {
      const keys = path.split('/')
      let current = result

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        if (i === keys.length - 1) {
          current[key] = Array.isArray(value) ? value.map((item) => nestKeyWithPath(item)) : value
        } else {
          current[key] = current[key] || {}
          current = current[key]
        }
      }
    }

    return result
  }

  export const removeRedondanceInPath = (data: any, currentPath?: string): any => {
    return seq(Object.entries(data)).reduceObject(([k, v]) => {
      const cleanedPath = currentPath ? k.replace(currentPath + '/', '') : k
      if (Array.isArray(v)) {
        return [cleanedPath, v.map((_) => removeRedondanceInPath(_, k))] as any
      }
      return [cleanedPath, v]
    })
  }

  export const removeGroup = (data: Data): Data => {
    return seq(Object.entries(data)).reduceObject(([k, v]) => {
      const nameWithoutGroup = k.replace(/^.*\//, '')
      if (Array.isArray(v)) {
        return [nameWithoutGroup, v.map(removeGroup)]
      }
      // if (typeof v === 'object' && v !== null && !(v instanceof Date)) {
      //   return [nameWithoutGroup, removeGroup(v)] as any
      // }
      return [nameWithoutGroup, v]
    })
  }

  export const setGroup = (data: Data, questionIndex: QuestionIndex): Data => {
    return seq(Object.entries(data)).reduceObject(([k, v]) => {
      const nameWithGroup = questionIndex[k]?.$xpath ?? k
      if (Array.isArray(v)) {
        return [nameWithGroup, v.map((_) => setGroup(_, questionIndex))]
      }
      return [nameWithGroup, v]
    })
  }

  const mapValues = (data: Data, questionIndex: QuestionIndex): Data => {
    return seq(Object.entries(data)).reduceObject(([k, v]) => {
      const type = questionIndex[k]?.type
      const mappedValue = type ? mapValue(type, v) : v
      if (Array.isArray(v)) {
        return [k, v.map((_) => mapValues(_, questionIndex))]
      }
      return [k, mappedValue]
    })
  }

  const mapValue = (type: string, value: any): any => {
    if (value == null || value === '') return null

    switch (type) {
      case 'integer':
      case 'decimal':
        return Number.isInteger(value) ? Number(value) : Number(value)
      case 'date':
      case 'datetime':
      case 'start':
      case 'end':
        return /*!isNaN(Number(value)) ? stupidMicrosoftDateToJSDate(Number(value)) : */ formatDate(value)
      default:
        return String(value).trim()
    }
  }

  const formatDate = (value: any): string | null => {
    const parsedDate = new Date(value)
    return isNaN(parsedDate.getTime()) ? null : parsedDate.toISOString().split('T')[0]
  }
}
