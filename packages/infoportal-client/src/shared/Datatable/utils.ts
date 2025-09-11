import {KoboIndex} from 'infoportal-common'

import {DatatableColumn} from './util/datatableType'

type Columns = DatatableColumn.Props<any>[]

const extractFormNameAndColumnsCount = (columns: Columns): {formName: string; columnsCount: number}[] => {
  const formGroups = new Map<string, number>()
  const formOrder: string[] = []

  columns.forEach((column) => {
    // it is dafe to assert non-nullish value on column.formId
    const formName = KoboIndex.searchById(column.formId!)?.translation!

    if (!formGroups.has(formName)) {
      formGroups.set(formName, 0)
      formOrder.push(formName)
    }

    formGroups.set(formName, formGroups.get(formName)! + 1)
  })

  return formOrder.map((formName) => ({formName, columnsCount: formGroups.get(formName)!}))
}

export {extractFormNameAndColumnsCount}
