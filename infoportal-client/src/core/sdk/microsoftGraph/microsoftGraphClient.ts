import {ApiClient} from '../server/ApiClient'
import {appConfig} from '../../../conf/AppConfig'

export interface ExcelWorksheet {
  text: string[][]
}

/** @deprecated use WfpDeduplication.ts SDK*/
enum MPCADeduplicationResult {
  Removed = 'Assistance Removed',
  Deduplicated = 'Deduplicated - see deduplication report.',
  Failed = 'Failed - Transaction and beneficiary update skipped. ID is expected to be in 0123456789 format.',
  Partially = 'Partially deduplicated - loaded using incremental delta option with keep option',
  Success = 'Success - loaded using incremental delta option with keep option',
}

/** @deprecated use WfpDeduplication.ts SDK*/
type MPCADeduplicationOffice = 'HRK' | 'DNK' | 'CEJ'

/** @deprecated use WfpDeduplication.ts SDK*/
interface MPCASheetDeduplication {
  list: string
  taxId: string
  deduplicatedAmount: number
  loadedStart: Date
  loadedEnd: Date
  existingOrganization: string
  existingAmount: number
  existingLoad: Date
  existingStart: Date
  existingEnd: Date
  type: 'HoH Tax ID'
}

/** @deprecated use WfpDeduplication.ts SDK*/
interface MPCASheetTransaction {
  list: string
  taxId: string
  res: MPCADeduplicationResult
  tentativeAmount: number
  tentativeStart: Date
  tentativeEnd: Date
  actualAmount: number
  actualStart: Date
  actualEnd: Date
  duplicatedDonor?: string
  recommendedDrcSupport: string
  confirmedPaymentAmount: number
}

const parseMsDate = (date: string) => date as any//parse(date, 'yyyyMMdd', new Date())

  /** @deprecated use WfpDeduplication.ts SDK*/
const excelIds = {
  HRK: '01CKP6OHZNTVVLUNB7HNCLMK2FYE7MQ32N',
  DNK: '01CKP6OHZNTVVLUNB7HNCLMK2FYE7MQ32N',
  CEJ: '01CKP6OHZNTVVLUNB7HNCLMK2FYE7MQ32N',
  // HRK: '01CKP6OHZBQZ3EAACYB5GJDYAC27AZ3ZE5',
  // DNK: '01CKP6OH6UKUSLHRW2TBGZHZJG7R4OKFTJ',
  // CEJ: '01CKP6OH7HGOLS3C7YIRG2FYUHFG6XRWPX',
}

export class MicrosoftGraphClient {

  constructor(
    private token: string = appConfig.microsoft.bearerToken,
    private client = new ApiClient({
      baseUrl: 'https://graph.microsoft.com/v1.0',
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    })
  ) {
  }

  readonly fetchExcelData = (driveItemId: string, sheetName: string) => {
    return this.client.get<ExcelWorksheet>(`/me/drive/items/01CKP6OH3VP5DKGSHMEREZELJDANZDU6UJ/workbook/worksheets('Trans_Res')/usedRange`)
  }


  /** @deprecated use WfpDeduplication.ts SDK*/
  private readonly fetchMPCATransaction = (office: 'HRK' | 'DNK' | 'CEJ', sheetName = 'Trans_Res'): Promise<MPCASheetTransaction[]> => {
    return this.fetchExcelData(excelIds[office], sheetName).then(_ => {
      const z: MPCASheetTransaction[] = _.text.map(row => ({
        list: row[2],
        taxId: row[3],
        // @ts-ignore
        res: MPCADeduplicationResult[row[4]],
        tentativeAmount: +row[8],
        tentativeStart: parseMsDate(row[9]),
        tentativeEnd: parseMsDate(row[10]),
        actualAmount: +row[11],
        actualStart: parseMsDate(row[12]),
        actualEnd: parseMsDate(row[13]),
        duplicatedDonor: row[14] === '' ? undefined : row[14],
        recommendedDrcSupport: row[15],
        confirmedPaymentAmount: +(row[16].replace('UAH', '').trim()),
      }))
      return z
    })
  }

  /** @deprecated use WfpDeduplication.ts SDK*/
  private readonly fetchMPCADeduplication = (office: 'HRK' | 'DNK' | 'CEJ', sheetName = 'DeDup_Res'): Promise<MPCASheetDeduplication[]> => {
    return this.fetchExcelData(excelIds[office], sheetName).then(_ => {
      const z: MPCASheetDeduplication[] = _.text.map(row => ({
        list: row[2],
        taxId: row[3],
        deduplicatedAmount: +row[7],
        loadedStart: parseMsDate(row[8]),
        loadedEnd: parseMsDate(row[8]),
        existingOrganization: row[11],
        existingAmount: +row[13],
        existingLoad: parseMsDate(row[14]),
        existingStart: parseMsDate(row[15]),
        existingEnd: parseMsDate(row[16]),
        type: 'HoH Tax ID',
      }))
      return z
    })
  }
}

