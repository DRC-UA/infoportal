import {KoboSchemaHelper} from 'infoportal-common'
import * as xlsx from 'xlsx'
import {PrismaClient} from '@prisma/client'
import {KoboSdkGenerator} from './KoboSdkGenerator'
import {seq} from '@alexandreannic/ts-utils'
import lodash from 'lodash'
import {Kobo, KoboClient, KoboSubmissionFormatter} from 'kobo-sdk'

type KoboData = {_parent_index?: number; _index?: number} & Record<string, any>

export class ImportService {
  constructor(
    private prisma: PrismaClient,
    private koboSdkGenerator = KoboSdkGenerator.getSingleton(prisma),
  ) {}

  readonly processData = async (formId: Kobo.FormId, filePath: string, action: 'create' | 'update') => {
    const sdk = await this.koboSdkGenerator.getBy.formId(formId)
    const schema = await sdk.v2.getForm(formId)
    const schemaHelper = KoboSchemaHelper.buildBundle({schema})

    const sheetData = this.getSheets(xlsx.readFile(filePath))
    const rootSheet = Object.keys(sheetData)[0]

    if (action === 'create') {
      const mergedData = ImportService.mergeNestedSheets(sheetData, schemaHelper)
      const formattedData = KoboSubmissionFormatter.formatData({
        data: mergedData,
        questionIndex: schemaHelper.helper.questionIndex,
        skipNullForCreate: true,
        action: action,
      })
      await this.batchCreate(formattedData, sdk, formId)
    } else if (action === 'update') {
      const transformedData = KoboSubmissionFormatter.transformValues(
        sheetData[rootSheet],
        schemaHelper.helper.questionIndex,
      )
      await ImportService.batchUpdate(sdk, transformedData, formId, schemaHelper)
    }
  }

  private getSheets = (workbook: xlsx.WorkBook): Record<string, KoboData[]> => {
    const sheetData: Record<string, KoboData[]> = {}
    workbook.SheetNames.forEach((sheetName) => {
      const sheet = workbook.Sheets[sheetName]
      const jsonData = xlsx.utils.sheet_to_json(sheet, {header: 1}) as any[][]
      if (jsonData.length > 0) {
        const headers = jsonData[0]
        const rows = jsonData.slice(1)
        sheetData[sheetName] = rows.map((row) => {
          return lodash.zipObject(headers, row)
        })
      }
    })
    return sheetData
  }

  private static mergeNestedSheets = (sheets: Record<string, KoboData[]>, schemaHelper: KoboSchemaHelper.Bundle) => {
    const rootSheet = Object.keys(sheets)[0]
    const rootData = sheets[rootSheet]

    return rootData.map((row) => {
      const groups = schemaHelper.helper.group.search({depth: 1})
      groups.forEach((group) => {
        const indexedChildren = seq(sheets[group.name])
          .compactBy('_parent_index')
          .groupBy((_) => _._parent_index)
        if (sheets[group.name]) {
          row[group.name] = indexedChildren[row._index!] || []
        }
      })
      return row
    })
  }

  private async batchCreate(data: KoboData[], sdk: any, formId: Kobo.FormId) {
    for (const row of data) {
      await sdk.v1.submit({
        formId,
        data: {...row},
        retries: 2,
      })
    }
  }

  private static async batchUpdate(
    sdk: KoboClient,
    data: KoboData[],
    formId: Kobo.FormId,
    schemaHelper: KoboSchemaHelper.Bundle,
  ) {
    for (const row of data) {
      const answerId = row['ID']
      if (!answerId) continue

      const formattedRow = KoboSubmissionFormatter.formatData({
        data: [row],
        questionIndex: schemaHelper.helper.questionIndex,
        skipNullForCreate: false,
        action: 'update',
      })[0]

      await sdk.v2.updateData({
        formId,
        data: formattedRow,
        submissionIds: [answerId],
      })
    }
  }
}
